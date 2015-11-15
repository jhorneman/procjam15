# -*- coding: utf-8 -*-

import logging
from parameters import get_parameter_value, set_parameter_value
from game_state import generate_data_var


logger = logging.getLogger(__name__)


class Action(object):
    actions = {
        1: ["gen_data"],
        2: ["inc", "dec"],
        3: ["set"]
    }

    def __init__(self, _action):
        self.action = _action
        self.variable_name = None
        self.value = None

    def execute(self, _state):
        if self.action == "gen_data":
            generate_data_var()

        elif self.action == "inc":
            value = get_parameter_value(_state, self.variable_name)
            set_parameter_value(_state, self.variable_name, value + 1)

        elif self.action == "dec":
            value = get_parameter_value(_state, self.variable_name)
            set_parameter_value(_state, self.variable_name, value - 1)

        elif self.action == "set":
            value = get_parameter_value(_state, self.value)
            set_parameter_value(_state, self.variable_name, value)


def parse_action_from_string(_string):
    parsed_tokens = [token.strip() for token in _string.split()]
    nr_tokens = len(parsed_tokens)

    new_action = None

    if parsed_tokens[0] in Action.actions.get(nr_tokens, []):
        new_action = Action(parsed_tokens[0])
        if nr_tokens > 1:
            new_action.variable_name = parsed_tokens[1]
        if nr_tokens > 2:
            new_action.value = parsed_tokens[2]
    else:
        logger.error("Couldn't parse action '{0}'.".format(_string))

    return new_action
