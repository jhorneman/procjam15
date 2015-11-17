# -*- coding: utf-8 -*-

import types
import logging
import random
import re
from collections import namedtuple
# TODO: Make it so we don't directly access the Flask session here perhaps.
from flask import session


logger = logging.getLogger(__name__)

tag_index_re = re.compile(r"(\w+:.*)_index$")


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
                tag = _state[variable_name].strip()
                if not tag or len(tag) == 0:
                    continue
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


class TaggedCollection(object):
    def __init__(self, _name, _randomize=True):
        self.name = _name
        self.randomize = _randomize
        self.tagged_items = []

    def add_item(self, _tags, _item):
        if len(_tags) > 0:
            self.tagged_items.append(TaggedItem(_tags, _item))

    def get_item_by_tags(self, _desired_tags, _repeat=True):
        # Make sure desired tags are in a list.
        if not isinstance(_desired_tags, types.ListType):
            _desired_tags = [_desired_tags]

        # Exit if there are no desired tags.
        if len(_desired_tags) == 0:
            logger.error("List of desired tags may not be empty.")
            return None

        # Find all items with the right tags.
        indices_of_eligible_items = []
        for item_index, tagged_item in enumerate(self.tagged_items):
            if tags_are_matched(_desired_tags, tagged_item.tags):
                indices_of_eligible_items.append(item_index)

        nr_eligible_items = len(indices_of_eligible_items)

        # Exit if we couldn't find any items.
        if nr_eligible_items == 0:
            logger.error("Couldn't find a {0} with tags {1}.".format(self.name, _desired_tags))
            return None

        key_base = self.name + ":" + ".".join(_desired_tags)

        # Get current index for these tags from the persistent game state.
        index_key = key_base + "_index"
        index_in_list_of_eligible_items = session.setdefault(index_key, 0)

        # (First check, then increase, or we'll never pick anything from collections with only one element.)
        if index_in_list_of_eligible_items >= nr_eligible_items:
            # We've exhausted the list, can we repeat?
            if _repeat:
                # Yes -> Go back to 0.
                index_in_list_of_eligible_items = 0
            else:
                # No -> That's it, we're done.
                # logger.debug("{1} tagged {0}: exhausted".format(cache_key, self.name))
                return None

        # Is this collection randomized?
        if self.randomize:
            # Yes -> Then we need to shuffle the list of eligible items, and we
            # need to make sure that shuffling is always done the same way.
            seed_key = key_base + "_seed"
            seed = session.setdefault(seed_key, session["__rng"].randint(0, 9999))
            rng = random.WichmannHill(seed)
            rng.shuffle(indices_of_eligible_items)

        # Get the index of the item.
        item_index = indices_of_eligible_items[index_in_list_of_eligible_items]

        # Increase the index into the list of eligible items, and store it in the persistent game state.
        index_in_list_of_eligible_items += 1
        session[index_key] = index_in_list_of_eligible_items

        # TODO: REMOVE after a while.
        # DOUBLE CHECK.
        if not tags_are_matched(_desired_tags, self.tagged_items[item_index].tags):
            logger.error("Tried to find a {0} with tags {1}. Found item with tags {2} instead."
                         .format(self.name, _desired_tags, self.tagged_items[item_index].tags))
            return None

        # Return the tagged item.
        return self.tagged_items[item_index].item
