# -*- coding: utf-8 -*-

import logging
from tags import tags_are_matched

# TODO: Make a named tuple for text blocks

logger = logging.getLogger(__name__)

text_blocks = []
counter_per_tag = {}


def register_text_blocks(_new_blocks):
    global text_blocks
    text_blocks += [(d[0], d[1]["text"]) for d in _new_blocks]


# TODO: Make this independent of text blocks.
def get_text_block_with_tag(_tags):
    if len(_tags) == 0:
        logger.error("Can't find a text block with an empty tag list.")
        return None

    indices_of_eligible_text_blocks = []
    for text_block_index, text_block in enumerate(text_blocks):
        if tags_are_matched(_tags, text_block[0]):
            indices_of_eligible_text_blocks.append(text_block_index)

    if len(indices_of_eligible_text_blocks) == 0:
        logger.error("Couldn't find a text block with tags {0}.".format(_tags))
        return None

    # TODO: Actually cache the list of scene IDs, and then shuffle it as well.
    cache_key = ".".join(_tags)
    counter = counter_per_tag.setdefault(cache_key, 0)
    try:
        text_block_index = indices_of_eligible_text_blocks[counter]
    except IndexError:
        logger.error("Index out of range for tags {0}.".format(_tags))
        return None
    counter += 1
    if counter >= len(indices_of_eligible_text_blocks):
        counter = 0
    counter_per_tag[cache_key] = counter

    return text_blocks[text_block_index]
