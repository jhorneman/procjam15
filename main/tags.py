# -*- coding: utf-8 -*-

import logging


logger = logging.getLogger(__name__)


def string_to_tags(_tags_as_string):
    if _tags_as_string is None:
        return []
    return [tag.strip() for tag in _tags_as_string.split(",")]


def evaluate_tags(_tags, _state):
    tags = []
    for tag in _tags:
        if tag.startswith("$"):
            variable_name = tag[1:]
            if variable_name in _state:
                tag = _state[variable_name]
            else:
                logger.error("Could not find a state variable named '{0}'. Skipping.".format(variable_name))
                continue
        tags.append(tag)
    return tags


def tags_are_matched(_desired_tags, _available_tags):
    for desired_tag in _desired_tags:
        if desired_tag not in _available_tags:
            return False
    return True
