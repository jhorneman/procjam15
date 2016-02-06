# -*- coding: utf-8 -*-

import logging
from tags import TaggedCollection


logger = logging.getLogger(__name__)

text_blocks = TaggedCollection("block")
data_names = TaggedCollection("data_name")


def register_text_blocks(_new_blocks):
    global text_blocks
    for d in _new_blocks:
        if d:
            text_blocks.add_item(d.tags, d)


def register_data_names(_new_data_names):
    global data_names
    for d in _new_data_names:
        data_names.add_item(d[0], d[1]["name"])


def get_text_block_with_tag(_desired_tags, _repeat=True):
    return text_blocks.get_item_by_tags(_desired_tags, _repeat)


def get_data_name_with_tag(_desired_tags, _repeat=True):
    return data_names.get_item_by_tags(_desired_tags, _repeat)


def analyze_all_text_blocks(_analysis):
    for tagged_item in text_blocks:
        _analysis.analyze_blocks([tagged_item.item])
