# -*- coding: utf-8 -*-

import logging
from collections import namedtuple


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


TaggedItem = namedtuple('TaggedItem', ['tags', 'item'])


class TaggedItemCache(object):
    def __init__(self, _item_indices):
        self.item_indices = _item_indices
        self.index = 0


class TaggedCollection(object):
    def __init__(self):
        self.tagged_items = []
        self.cache = {}

    def add_item(self, _tags, _item):
        if len(_tags) > 0:
            self.tagged_items.append(TaggedItem(_tags, _item))

    def get_item_by_tags(self, _desired_tags, _repeat=True):
        if len(_desired_tags) == 0:
            logger.error("List of desired tags may not be empty.")
            return None

        cache_key = ".".join(_desired_tags)
        if cache_key not in self.cache:
            indices_of_eligible_items = []
            for item_index, tagged_item in enumerate(self.tagged_items):
                if tags_are_matched(_desired_tags, tagged_item.tags):
                    indices_of_eligible_items.append(item_index)

            if len(indices_of_eligible_items) == 0:
                logger.error("Couldn't find an item with tags {0}.".format(_desired_tags))
                return None

            self.cache[cache_key] = TaggedItemCache(indices_of_eligible_items)

        indices_of_eligible_items = self.cache[cache_key].item_indices
        index_in_list_of_eligible_items = self.cache[cache_key].index
        item_index = indices_of_eligible_items[index_in_list_of_eligible_items]

        index_in_list_of_eligible_items += 1
        if index_in_list_of_eligible_items >= len(indices_of_eligible_items):
            if _repeat:
                index_in_list_of_eligible_items = 0
            else:
                return None

        self.cache[cache_key].index = index_in_list_of_eligible_items

        return self.tagged_items[item_index].item
