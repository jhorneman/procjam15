# -*- coding: utf-8 -*-

import logging
from game_state import constants


logger = logging.getLogger(__name__)


def get_parameter_variable_name(_parameter_name):
    return _parameter_name[1:] if _parameter_name.startswith("$") else None


def get_parameter_value(_state, _parameter_name):
    if _parameter_name.startswith("$"):
        variable_name = _parameter_name[1:]
        if variable_name in constants:
            return constants[variable_name]
        return _state.setdefault(variable_name, 0)

    if _parameter_name.lower() == "random":
        return _state["__rng"].randint(1, 100)

    if _parameter_name.lower() == "true":
        return True

    if _parameter_name.lower() == "false":
        return False

    try:
        value = int(_parameter_name)
    except ValueError:
        value = str(_parameter_name)

    return value
