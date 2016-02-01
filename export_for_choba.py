# -*- coding: utf-8 -*-

import types
import os
import logging
import re
from main.log_utils import init_logging
from main.data_loader import load_data
from main.scene import scenes
from main.game_state import initial_game_state, constants
from main.condition import Condition
from main.content import goto_action
from main.text_blocks import text_blocks


SCRIPT_DIR = os.path.abspath(os.path.dirname(__file__)) + os.sep

block_type_regex = re.compile(r"<class 'main\.content\.(\w+)'>")


def write_dict_as_JSON_object(_output, _name, _dict):
    _output.write('export let {0} = {{\n'.format(_name))
    nr_els = len(_dict.keys())
    for index, key in enumerate(_dict.keys()):
        _output.write('\t"{0}": {{\n'.format(key))

        yield key, _dict[key]

        if index < nr_els - 1:
            _output.write('\t},\n')
        else:
            _output.write('\t}\n')
    _output.write('};\n\n')


def write_array_as_JSON_object(_output, _name, _array):
    _output.write('export let {0} = [\n'.format(_name))
    nr_els = len(_array)
    for index, value in enumerate(_array):
        _output.write('\t{\n')

        yield index, value

        if index < nr_els - 1:
            _output.write('\t},\n')
        else:
            _output.write('\t}\n')
    _output.write('];\n\n')


def string_list_to_JSON(_list):
    return '[' + ', '.join(['"{0}"'.format(e) for e in _list]) + ']'


def desired_tags_to_JSON(_tags):
    tags = []
    for tag in _tags:
        if tag.startswith("$"):
            tags.append('["var", "{0}"]'.format(tag[1:]))
        else:
            tags.append('"{0}"'.format(tag))
    return ', '.join(tags)


def value_to_type_and_string(_value):
    if isinstance(_value, type(True)):
        var_type = 'boolean'
        var = str(_value).lower()
    elif isinstance(_value, type(1)):
        var_type = 'integer'
        var = str(_value)
    else:
        var_type = 'string'
        var = '"' + _value + '"'

    return var_type, var


def literal_or_var_to_JSON(_value):
    if isinstance(_value, types.StringTypes) and _value.startswith("$"):
        return '["var", "{0}"]'.format(_value[1:])
    else:
        value_type, value = value_to_type_and_string(_value)
        return '["literal", {{"type": "{0}", value: {1}}}]'.format(value_type, value)


def block_to_type_name(_block):
    type_name = str(type(_block))
    match = block_type_regex.match(type_name)
    if match:
        return match.group(1)
    else:
        print "Didn't understand", type_name
        return None


def traverse_blocks(_blocks):
    for block in _blocks:
        block_type = block_to_type_name(block)
        yield block_type, block


def escape_text(_text):
    return _text
    # text = _text
    # text = text.replace("\\", "\\\\")
    # text = text.replace('"', '\\"')
    # return text


supported_condition_operators = ["eq", "gt", "lt", "gteq", "lteq"]

def condition_to_JSON(_condition):
    if _condition.operator in supported_condition_operators:
        return '["{2}", {0}, {1}]'.format(
            literal_or_var_to_JSON(_condition.param1),
            literal_or_var_to_JSON(_condition.param2),
            _condition.operator
        )
    elif _condition.operator == 'istrue':
        return '["eq", {0}, {1}]'.format(
            literal_or_var_to_JSON(_condition.param1),
            literal_or_var_to_JSON(True)
        )
    else:
        print "Operator", _condition.operator, "not supported"
        return ""


def write_block_as_JSON(_output, _block_type, _block):
        if _block_type == "InjectBlock":
            tags = desired_tags_to_JSON(_block.desired_tags)
            _output.write('\t\t\t["injectBlock", {0}],\n'.format(tags))

        elif _block_type == "OneOf":
            pass

        elif _block_type == "InjectOption":
            tags = desired_tags_to_JSON(_block.desired_tags)
            _output.write('\t\t\t["injectOption", {0}],\n'.format(tags))

        elif _block_type == "Option":
            if _block.action == goto_action:
                _output.write('\t\t\t["goto", {{"text": "{0}", "nextScene": "{1}"}}],\n'
                              .format(_block.text, _block.params["next_scene"]))
            else:
                print "Option action {0} not supported".format(_block.action)

        elif _block_type == "StyledText":
            for child in _block.children:
                child_type = block_to_type_name(child)
                write_block_as_JSON(_output, child_type, child)

        elif _block_type == "Raw":
            _output.write('\t\t\t["text", `{0}`],\n'.format(escape_text(_block.raw_text)))

        elif _block_type == "Br":
            _output.write('\t\t\t["text", "\\n"],\n')

        elif _block_type == "Action":
            pass

        elif _block_type == "If":
            condition = condition_to_JSON(_block.condition)
            _output.write('\t\t\t["if", {0}, ["seq",\n'.format(condition))
            for child in _block.children:
                child_type = block_to_type_name(child)
                write_block_as_JSON(_output, child_type, child)
            _output.write('\t\t\t]],\n')

        elif _block_type == "Block":
            pass

        elif _block_type == "LeadIn":
            pass

        else:
            print "Didn't understand", _block_type


def is_empty_condition(_condition):
    return _condition.operator == Condition.IDENT


def find_leadin(_scene):
    for block_type, block in traverse_blocks(_scene.blocks):
        if block_type == "LeadIn":
            if is_empty_condition(block.condition):
                return block.leadin
            else:
                print "Leadin has non-empty condition"
    return None


def export_vars(_output):
    combined_vars = {}
    combined_vars.update(initial_game_state)
    combined_vars.update(constants)

    for var_name, var in write_dict_as_JSON_object(_output, "initialVars", combined_vars):
        var_type, var = value_to_type_and_string(var)
        _output.write('\t\t"type": "{0}",\n'.format(var_type))
        _output.write('\t\t"value": {0}\n'.format(var))


def export_scenes(_output):
    for scene_id, scene in write_dict_as_JSON_object(_output, "sceneDescriptions", scenes):
        leadin = find_leadin(scene)
        if leadin is not None:
            _output.write('\t\t"leadIn": ["text", "{0}"],\n'.format(leadin))

        if scene.tags is not None and len(scene.tags) > 0:
            _output.write('\t\t"tags": {0},\n'.format(string_list_to_JSON(scene.tags)))

        _output.write('\t\t"content": ["seq",\n')

        for block_type, block in traverse_blocks(scene.blocks):
            write_block_as_JSON(_output, block_type, block)
        _output.write('\t\t]\n')


def export_blocks(_output):
    for block_index, block in write_array_as_JSON_object(_output, "blockDescriptions", text_blocks):
        if block.tags is not None and len(block.tags) > 0:
            _output.write('\t\t"tags": {0},\n'.format(string_list_to_JSON(block.tags)))

        _output.write('\t\t"content": ["seq",\n')

        for block_type, block in traverse_blocks(block.item.children):
            write_block_as_JSON(_output, block_type, block)
        _output.write('\t\t]\n')


def export_PC_names(_output):
    _output.write('export let pcNames = {\n')
    _output.write('};\n\n')



init_logging(logging.INFO)

data_loaded = load_data()
if data_loaded:
    with open(os.path.normpath(os.path.join(SCRIPT_DIR, '..', 'choba', 'data.js')), 'w') as output:
        # Start scene
        output.write('export let firstSceneId = "{0}";\n\n'.format('start'))

        # Vars
        export_vars(output)

        # Scenes
        export_scenes(output)

        # Blocks
        export_blocks(output)

        # PC names
        export_PC_names(output)
