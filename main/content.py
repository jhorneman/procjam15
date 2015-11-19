# -*- coding: utf-8 -*-

import types
import logging
from condition import make_empty_condition, parse_condition_from_string
from action import parse_action_from_string
from tags import string_to_tags, evaluate_desired_tags
from text_blocks import get_text_block_with_tag


logger = logging.getLogger(__name__)

goto_action = "goto"
respawn_action = "respawn"
restart_action = "restart"


class ContentNode(object):
    def __init__(self):
        self.condition = make_empty_condition()

    def check_for_condition(self, _el):
        self.condition = parse_condition_from_string(_el.get("cond"))

    def is_condition_true(self, _state):
        return self.condition.evaluate(_state)

    @staticmethod
    def check_element_is_empty(_el, _el_name):
        if len(list(_el)) > 0:
            logger.warning("Encountered {0} element with child elements. These will be ignored!".format(_el_name))
        if _el.text and len(_el.text) > 0:
            logger.warning("Encountered {0} element with text inside. This will be ignored!".format(_el_name))


class Raw(ContentNode):
    def __init__(self, _text):
        super(Raw, self).__init__()
        self.raw_text = _text

    def evaluate(self, _state, _deep=True):
        if not _deep:
            return None
        return self.raw_text


class StyledText(ContentNode):
    def __init__(self, _el):
        super(StyledText, self).__init__()
        # Can check _el.tag here to select different styles, if need be.
        # self.style_class = "style_terminal"
        self.blocks = parse_content_of_xml_element(_el)

    def evaluate(self, _state, _deep=True):
        content = evaluate_content_blocks(self.blocks, _state)
        content["text"] = "<t>{0}</t>".format(content["text"])
        return content


class If(ContentNode):
    def __init__(self, _el):
        super(If, self).__init__()
        self.check_for_condition(_el)
        self.blocks = parse_content_of_xml_element(_el)

    def evaluate(self, _state, _deep=True):
        if self.is_condition_true(_state):
            return evaluate_content_blocks(self.blocks, _state)
        else:
            return None


class OneOf(ContentNode):
    def __init__(self, _el):
        super(OneOf, self).__init__()
        self.check_for_condition(_el)
        self.blocks = parse_content_of_xml_element(_el)

    def evaluate(self, _state, _deep=True):
        if self.is_condition_true(_state):
            index = _state["__rng"].randint(0, len(self.blocks)-1)
            return evaluate_content_blocks([self.blocks[index]], _state)
        else:
            return None


class Block(ContentNode):
    def __init__(self, _el):
        super(Block, self).__init__()
        self.check_for_condition(_el)
        self.tags = read_tags(_el, "block")
        self.blocks = parse_content_of_xml_element(_el)

    def evaluate(self, _state, _deep=True):
        if self.is_condition_true(_state):
            return evaluate_content_blocks(self.blocks, _state)
        else:
            return None


class Br(ContentNode):
    def __init__(self, _el):
        super(Br, self).__init__()

    def evaluate(self, _state, _deep=True):
        if not _deep:
            return None
        return "<br/>"


class LeadIn(ContentNode):
    def __init__(self, _el):
        super(LeadIn, self).__init__()
        self.check_for_condition(_el)
        self.leadin = _el.text

    def evaluate(self, _state, _deep=True):
        if self.is_condition_true(_state):
            return {
                "leadin": self.leadin
            }
        else:
            return None


class Option(ContentNode):
    def __init__(self, _el):
        super(Option, self).__init__()
        self.check_for_condition(_el)

        self.action = None
        self.params = {}
        self.text = None

        # Get option parameters.
        action = _el.get("action", goto_action)
        next_scene = _el.get("nextScene")
        text = _el.text.strip()

        # Check parameters.
        if action == goto_action:
            if next_scene is None:
                logger.error("Option has a GOTO action but neither a next scene nor tag attributes. Skipping.")
                return
        if text is None or len(text) == 0:
            logger.error("Option does not contain any text. Skipping.")
            return

        self.action = action
        self.params = {"next_scene": next_scene}
        self.text = text

    def evaluate(self, _state, _deep=True):
        if not _deep:
            return None
        if self.is_condition_true(_state):
            return {
                "options": {
                    "action": self.action,
                    "params": self.params,
                    "text": self.text
                }
            }
        else:
            return None


class InjectBlock(ContentNode):
    def __init__(self, _el):
        super(InjectBlock, self).__init__()
        self.check_for_condition(_el)
        self.repeat = _el.get("norepeat", None) is None
        self.desired_tags = read_tags(_el, "injected block")
        self.check_element_is_empty(_el, "injected block")

    def evaluate(self, _state, _deep=True):
        if not _deep:
            return None
        if self.is_condition_true(_state):
            desired_tags = evaluate_desired_tags(self.desired_tags, _state)
            if len(desired_tags) == 0:
                return None
            injected_block = get_text_block_with_tag(desired_tags, self.repeat)
            if injected_block:
                return evaluate_content_blocks([injected_block], _state)
        else:
            return None


class InjectOption(ContentNode):
    def __init__(self, _el):
        super(InjectOption, self).__init__()
        self.check_for_condition(_el)
        self.repeat = _el.get("norepeat", None) is None
        self.desired_tags = read_tags(_el, "injected option")
        self.check_element_is_empty(_el, "injected option")

    def evaluate(self, _state, _deep=True):
        if not _deep:
            return None
        if self.is_condition_true(_state):
            desired_tags = evaluate_desired_tags(self.desired_tags, _state)
            if len(desired_tags) == 0:
                return None
            injected_option = get_tagged_option_to_inject(desired_tags, _state, self.repeat)
            if injected_option:
                return {
                    "options": injected_option
                }
        return None


class Action(ContentNode):
    def __init__(self, _el):
        super(Action, self).__init__()
        self.check_for_condition(_el)

        self.action = None
        action_string = _el.get("act")
        if action_string:
            action = parse_action_from_string(action_string)
            if action:
                self.action = action

    def evaluate(self, _state, _deep=True):
        if not _deep:
            return None
        if self.is_condition_true(_state):
            return {
                "actions": self.action
            }
        return None


tags_to_content_classes = {
    "t": StyledText,
    "if": If,
    "oneOf": OneOf,
    "block": Block,
    "injectBlock": InjectBlock,
    "br": Br,
    "leadin": LeadIn,
    "option": Option,
    "injectOption": InjectOption,
    "action": Action
}


def merge_in_evaluated_content(_content, _new):
    if _new is None:
        return

    if isinstance(_new, types.StringTypes):
        _content["text"] += _new
    else:
        if _new.get("text", None):
            _content["text"] += _new["text"]

        if _new.get("leadin", None):
            if _content["leadin"]:
                logger.error("Encountered more than one lead-in - ignoring.")
            else:
                _content["leadin"] = _new["leadin"]

        if _new.get("options", None):
            if isinstance(_new["options"], types.ListType):
                _content["options"] += _new["options"]
            else:
                _content["options"].append(_new["options"])

        if _new.get("actions", None):
            if isinstance(_new["actions"], types.ListType):
                _content["actions"] += _new["actions"]
            else:
                _content["actions"].append(_new["actions"])


def evaluate_content_blocks(_blocks, _state, _deep=True):
    content = {
        "text": "",
        "leadin": None,
        "options": [],
        "actions": []
    }
    for block in _blocks:
        merge_in_evaluated_content(content, block.evaluate(_state, _deep))
    return content


def parse_content_of_xml_element(_parent_el):
    blocks = []

    # Start with any text appearing in the element itself.
    if _parent_el.text:
        if _parent_el.text.strip():
            blocks.append(Raw(_parent_el.text))

    # Then iterate over the child elements.
    for child_el in _parent_el:
        child_content = parse_xml_element(child_el)
        if child_content:
            blocks.append(child_content)

        if child_el.tail:
            if child_el.tail.strip():
                blocks.append(Raw(child_el.tail))

    return blocks


def parse_xml_element(_el):
    content_class = tags_to_content_classes.get(_el.tag, None)
    if content_class:
        return content_class(_el)
    else:
        return None


def read_tags(_el, _el_name):
    tags = []
    tags_string = _el.get("tags")
    if tags_string:
        tags = string_to_tags(tags_string)
    return tags


def get_tagged_option_to_inject(_desired_tags, _state, _repeat=True):
    # TODO: Ponder circular import problem
    from scene import get_scene_description_with_tag
    injected_scene_desc = get_scene_description_with_tag(_desired_tags, _repeat)
    if injected_scene_desc:
        # DON'T evaluate this scene deeply - we only care about the lead-in.
        evaluated_injected_scene = evaluate_content_blocks(injected_scene_desc.blocks, _state, _deep=False)
        if evaluated_injected_scene["leadin"] is None:
            logger.error("Injected scene '{0}' has no lead-in.".format(injected_scene_desc.id))
            return None

        return {
            "action": goto_action,
            "params": {
                "next_scene": injected_scene_desc.id
            },
            "text": evaluated_injected_scene["leadin"]
        }
    else:
        return None
