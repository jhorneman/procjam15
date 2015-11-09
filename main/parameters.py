# -*- coding: utf-8 -*-

import logging
import random


logger = logging.getLogger(__name__)


def get_lhs_parameter_value(_state, _parameter_name):
    if _parameter_name.startswith("$"):
        variable_name = _parameter_name[1:]
        if variable_name in _state:
            return _state[variable_name]
        else:
            logger.error("Could not find a state variable named '{0}'. A parameter on the left hand of an operator MUST refer to a state variable.".format(variable_name))
            return None
    else:
        logger.error("A parameter on the left hand of an operator MUST refer to a state variable. '{0}' is invalid.".format(_parameter_name))
        return None


def get_rhs_parameter_value(_state, _parameter_name):
    if _parameter_name.startswith("$"):
        variable_name = _parameter_name[1:]
        if variable_name in _state:
            return _state[variable_name]
        else:
            logger.error("Could not find a state variable named '{0}'.".format(variable_name))
            return 0

    if _parameter_name.lower() == "random":
        return random.randint(0, 100)

    try:
        value = int(_parameter_name)
    except ValueError:
        value = str(_parameter_name)

    return value
