# -*- coding: utf-8 -*-

import logging
from tags import string_to_tags
from condition import parse_condition_from_string


logger = logging.getLogger(__name__)


class Option(object):
    GOTO = "goto"
    actions = [GOTO]

    def __init__(self):
        self.action = Option.GOTO
        self.text = ""
        self.condition = None
        self.next_scene = ""
        self.tags = []

    @property
    def params(self):
        if self.action == Option.GOTO:
            return {
                "next_scene": self.next_scene,
                "tags": self.tags
            }
        return {}

    @staticmethod
    def from_el(_el, _index=0):  # TODO: Remove index
        new_option = Option()

        # Get action, if any.
        new_option.action = _el.get("action", Option.GOTO)
        if new_option.action not in Option.actions:
            logger.error("Option {0} has action'{1}' which is not a valid action (those are {2}). Skipping."
                .format(_index, new_option.action, ", ".join(Option.actions)))
            return None

        # GOTO.
        if new_option.action == Option.GOTO:
            # Get next scene and tags.
            new_option.next_scene = _el.get("nextScene")
            new_option.tags = string_to_tags(_el.get("tags"))

            if new_option.next_scene is None and new_option.tags is None:
                logger.error("Option {0} has a GOTO action but neither a next scene nor tag attributes. Skipping.".format(_index))
                return None

            # Get text.
            new_option.text = _el.text.strip()
            if new_option.text is None or len(new_option.text) == 0:
                logger.error("Option {0} has a GOTO action but does not contain any text. Skipping.".format(_index))
                return None

        # Parse condition, if any.
        condition_string = _el.get("cond")
        if condition_string:
            condition = parse_condition_from_string(condition_string)
            if condition:
                new_option.condition = condition

        return new_option
