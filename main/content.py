# -*- coding: utf-8 -*-

import types
import logging
from condition import parse_condition_from_string
from tags import string_to_tags, evaluate_tags
from option import Option


logger = logging.getLogger(__name__)


class Content(object):
    def evaluate(self, _state):
        pass


class Raw(Content):
    def __init__(self, _text):
        self.raw_text = _text

    def evaluate(self, _state):
        return self.raw_text


class If(Content):
    def __init__(self, _el):
        self.condition = None
        self.blocks = []

        condition_string = _el.get("cond")
        if condition_string:
            condition = parse_condition_from_string(condition_string)
            if not condition:
                return
            self.condition = condition
        self.blocks = parse_content_from_xml(_el)

    def evaluate(self, _state):
        if self.condition:
            if not self.condition.evaluate(_state):
                return ""
        return evaluate_content_blocks(self.blocks, _state)


class InjectText(Content):
    def __init__(self, _el):
        self.tags = []
        tags_string = _el.get("tags")
        if tags_string:
            self.tags = string_to_tags(tags_string)
            if len(self.tags) == 0:
                logger.error("Encountered an injected text element with empty tags. Skipping.")
            else:
                if len(list(_el)) > 0:
                    logger.warning("Encountered an injected text element with child elements. These will be ignored!")
                if len(_el.text) > 0:
                    logger.warning("Encountered an injected text element with text inside. This will be ignored!")
        else:
            logger.error("Encountered an injected text element without a tags attribute. Skipping.")

    def evaluate(self, _state):
        tags = evaluate_tags(self.tags, _state)
        return "[injected text for tags {0}]".format(tags)


class Br(Content):
    def __init__(self, _el):
        pass

    def evaluate(self, _state):
        return "<br/>"


class LeadIn(Content):
    def __init__(self, _el):
        self.leadin = _el.text

    def evaluate(self, _state):
        e = EvaluatedContent()
        e.leadin = self.leadin
        return e


class OptionContent(Content):
    def __init__(self, _el):
        self.option = Option.from_el(_el)

    def evaluate(self, _state):
        e = EvaluatedContent()
        e.options = [ self.option ]
        return e


def get_tagged_option_to_inject(_tags, _state):
    from scene import get_scene_description_with_tag
    injected_scene_desc = get_scene_description_with_tag(_tags, _state)
    if injected_scene_desc:
        e = evaluate_content_blocks(injected_scene_desc.blocks, _state)
        if e.leadin is None:
            logger.error("Injected scene '{0}' has no lead-in.".format(injected_scene_desc.id))
            return None

        return {
            "action": Option.GOTO,
            "text": e.leadin,
            "params": {
                "next_scene": injected_scene_desc.id
            }
        }
    else:
        return None


class InjectOption(Content):
    def __init__(self, _el):
        self.tags = None
        tags_string = _el.get("tags", None)
        if tags_string:
            tags = string_to_tags(tags_string)
            if len(tags) > 0:
                self.tags = tags
            else:
                logger.error("Encountered an injected option element with empty tags. Skipping.")
        else:
            logger.error("Encountered an injected option element without a tags attribute. Skipping.")

    def evaluate(self, _state):
        if not self.tags:
            return None
        injected_option = get_tagged_option_to_inject(self.tags, _state)
        if injected_option:
            e = EvaluatedContent()
            e.options = [ injected_option ]
            return e
        else:
            logger.warning("Couldn't find a valid scene with tags '{0}' to inject."
                           .format(self.tags))


tags_to_content_classes = {
    "if": If,
    "injectText": InjectText,
    "br": Br,
    "leadin": LeadIn,
    "option": OptionContent,
    "injectOption": InjectOption
}


class EvaluatedContent(object):
    def __init__(self):
        self.text = ""
        self.leadin = ""
        self.options = []

    def add(self, _content):
        if not isinstance(_content, EvaluatedContent):
            return
        if _content.text:
            self.text += _content.text
        if _content.leadin:
            if self.leadin:
                logger.error("Encountered more than one lead-in - ignoring.")
            else:
                self.leadin = _content.leadin
        if _content.options:
            self.options += _content.options


def evaluate_content_blocks(_blocks, _state):
    content = EvaluatedContent()
    for block in _blocks:
        evaluated = block.evaluate(_state)
        if not evaluated:
            continue
        if isinstance(evaluated, types.StringType):
            content.text += evaluated
        else:
            content.add(evaluated)
    return content


def parse_content_from_xml(_parent_el):
    blocks = []

    # Start with any text appearing in the element itself.
    if _parent_el.text:
        blocks.append(Raw(_parent_el.text))

    # Then iterate over the child elements.
    for child_el in _parent_el:
        content_class = tags_to_content_classes.get(child_el.tag, None)
        if content_class:
            blocks.append(content_class(child_el))

        if child_el.tail:
            blocks.append(Raw(child_el.tail))

    return blocks
