# -*- coding: utf-8 -*-

import logging
from tags import TaggedCollection


logger = logging.getLogger(__name__)

text_blocks = TaggedCollection()
data_names = TaggedCollection()


def register_text_blocks(_new_blocks):
    global text_blocks
    for d in _new_blocks:
        text_blocks.add_item(d[0], d[1]["text"])


def register_data_names(_new_data_names):
    global data_names
    for d in _new_data_names:
        data_names.add_item(d[0], d[1]["name"])


def get_text_block_with_tag(_desired_tags):
    return text_blocks.get_item_by_tags(_desired_tags)


def get_data_name_with_tag(_desired_tags):
    return data_names.get_item_by_tags(_desired_tags)