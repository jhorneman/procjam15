# -*- coding: utf-8 -*-

import logging


logger = logging.getLogger(__name__)

constants = {
    "mention_injury_chance": 50
}


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


def set_parameter_value(_state, _parameter_name, _value):
    if _parameter_name.startswith("$"):
        variable_name = _parameter_name[1:]
        if variable_name in constants:
            logger.error("'{0}' is a constant and can't be set.".format(variable_name))
        else:
            # TODO: Isolate places, like this, where the Flask session is mutated.
            _state[variable_name] = _value
    else:
        logger.error("'{0}' should start with a $.".format(_parameter_name))
