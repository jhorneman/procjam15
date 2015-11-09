# -*- coding: utf-8 -*-

import logging
from condition import parse_condition_from_string
from tags import string_to_tags, evaluate_tags


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


class Inject(Content):
    def __init__(self, _el):
        self.tags = []
        tags_string = _el.get("tags")
        if tags_string:
            self.tags = string_to_tags(tags_string)
            if len(self.tags) == 0:
                logger.error("Encountered an injected text element with empty tags. Skipping.")
            else:
                if len(list(_el)) > 0:
                    logger.error("Encountered an injected text with child elements. These will be ignored!")
                if len(_el.text) > 0:
                    logger.error("Encountered an injected text with text inside. This will be ignored!")
        else:
            logger.error("Encountered an injected text element without tags. Skipping.")

    def evaluate(self, _state):
        tags = evaluate_tags(self.tags, _state)
        return "[injected text for tags {0}]".format(tags)


class Br(Content):
    def __init__(self, _el):
        pass

    def evaluate(self, _state):
        return "<br/>"


tags_to_content_classes = {
    "text": Br,
    "injectText": Br,
    "br": Br
}


def evaluate_content_blocks(_blocks, _state):
    text = ""
    for block in _blocks:
        block_text = block.evaluate(_state)
        if block_text:
            text += block_text
    return text


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
