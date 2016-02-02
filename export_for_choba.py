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

unsupported_condition_operators = set()
unsupported_option_types = set()
unsupported_action_types = set()


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


# def value_to_type_and_string(_value):
#     if isinstance(_value, type(True)):
#         var_type = 'boolean'
#         var = str(_value).lower()
#     elif isinstance(_value, type(1)):
#         var_type = 'integer'
#         var = str(_value)
#     else:
#         var_type = 'string'
#         var = '"' + _value + '"'
#
#     return var_type, var


def literal_or_var_to_JSON(_value):
    if isinstance(_value, types.StringTypes) and _value.startswith("$"):
        return '["var", "{0}"]'.format(_value[1:])
    else:
        value_type, value = parameter_to_type_and_value(_value)
        # value_type, value = value_to_type_and_string(_value)
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
            literal_or_var_to_JSON("true")
        )
    else:
        unsupported_condition_operators.add(_condition.operator)
        return ""


def parameter_to_type_and_value(_value):
    if isinstance(_value, type(True)):
        return 'boolean', str(_value).lower()

    if isinstance(_value, type(1)):
        return 'integer', str(_value)

    if _value.lower() == "true":
        return 'boolean', 'true'

    if _value.lower() == "false":
        return 'boolean', 'false'

    value_type = 'integer'
    try:
        value = int(_value)
    except ValueError:
        value = '"' + str(_value) + '"'
        value_type = 'string'

    return value_type, value


def action_to_JSON(_action):
    if _action.action == 'set':
        if _action.value.startswith("$"):
            return '["set", "{0}", ["var", "{1}"]]'\
                .format(_action.variable_name[1:], _action.value[1:])
        else:
            parameter_type, value = parameter_to_type_and_value(_action.value)
            return '["set", "{0}", ["literal", {{"type": "{1}", "value": {2}}}]]'\
                .format(_action.variable_name[1:], parameter_type, value)

    elif _action.action == 'inc':
        return '["set", "{0}", ["add", ["var", "{1}"], ["literal", {{"type": "integer", "value": 1}}]]]'\
            .format(_action.variable_name[1:], _action.variable_name[1:])

    elif _action.action == 'dec':
        return '["set", "{0}", ["subtract", ["var", "{1}"], ["literal", {{"type": "integer", "value": 1}}]]]'\
            .format(_action.variable_name[1:], _action.variable_name[1:])

    else:
        unsupported_action_types.add(_action.action)
        return ""


def write_block_as_JSON(_output, _block_type, _block):
        if _block_type == "InjectBlock":
            if is_empty_condition(_block.condition):
                tags = desired_tags_to_JSON(_block.desired_tags)
                _output.write('\t\t\t["injectBlock", {0}],\n'.format(tags))
            else:
                print _block_type, "has non-empty condition"

        elif _block_type == "OneOf":
            if is_empty_condition(_block.condition):
                pass
            else:
                print _block_type, "has non-empty condition"

        elif _block_type == "InjectOption":
            if is_empty_condition(_block.condition):
                tags = desired_tags_to_JSON(_block.desired_tags)
                _output.write('\t\t\t["injectOption", {0}],\n'.format(tags))
            else:
                print _block_type, "has non-empty condition"

        elif _block_type == "Option":
            if is_empty_condition(_block.condition):
                if _block.action == goto_action:
                    _output.write('\t\t\t["goto", {{"text": "{0}", "nextScene": "{1}"}}],\n'
                                  .format(_block.text, _block.params["next_scene"]))
                else:
                    unsupported_option_types.add(_block.action)
            else:
                print _block_type, "has non-empty condition"

        elif _block_type == "StyledText":
            for child in _block.children:
                child_type = block_to_type_name(child)
                write_block_as_JSON(_output, child_type, child)

        elif _block_type == "Raw":
            _output.write('\t\t\t["text", `{0}`],\n'.format(escape_text(_block.raw_text)))

        elif _block_type == "Br":
            _output.write('\t\t\t["text", "\\n"],\n')

        elif _block_type == "Action":
            if is_empty_condition(_block.condition):
                json = action_to_JSON(_block.action)
                if json:
                    _output.write('\t\t\t{0},\n'.format(json))
            else:
                print _block_type, "has non-empty condition"

        elif _block_type == "If":
            condition = condition_to_JSON(_block.condition)
            _output.write('\t\t\t["if", {0}, ["seq",\n'.format(condition))
            for child in _block.children:
                child_type = block_to_type_name(child)
                write_block_as_JSON(_output, child_type, child)
            _output.write('\t\t\t]],\n')

        elif _block_type == "Block":
            if is_empty_condition(_block.condition):
                pass
            else:
                print _block_type, "has non-empty condition"

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
    # These are variables that are used but not declared in initial_game_state.
    combined_vars = {
        'is_fed': 0,
        'sacrifice': 0,
        'injury': '',
        'commands': 0
    }
    combined_vars.update(initial_game_state)
    combined_vars.update(constants)

    for var_name, var in write_dict_as_JSON_object(_output, "initialVars", combined_vars):
        var_type, var = parameter_to_type_and_value(var)
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

    print

    if unsupported_condition_operators:
        print "Unsupported condition operator:"
        print ",".join(unsupported_condition_operators)
        print

    if unsupported_option_types:
        print "Unsupported option types:"
        print ",".join(unsupported_option_types)
        print

    if unsupported_action_types:
        print "Unsupported action types:"
        print ",".join(unsupported_action_types)
        print
