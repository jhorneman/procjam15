# -*- coding: utf-8 -*-

import logging
import operator
from parameters import get_parameter_value, get_parameter_variable_name


logger = logging.getLogger(__name__)


class Condition(object):
    IDENT = "identity"
    ISTRUE = "istrue"
    NOT = "not"
    EQ = "eq"
    NEQ = "neq"
    GT = "gt"
    LT = "lt"
    GTEQ = "gteq"
    LTEQ = "lteq"

    operators = {
        NOT: operator.not_,
        EQ: operator.eq,
        NEQ: operator.ne,
        GT: operator.gt,
        LT: operator.lt,
        GTEQ: operator.ge,
        LTEQ: operator.le
    }

    unary_operators = [ISTRUE, NOT]

    not_token = ["not"]
    binary_operator_tokens = {
        EQ: ["is", "eq", "=="],
        NEQ: ["neq", "!="],
        GT: ["gt"],
        LT: ["lt"],
        GTEQ: ["gteq"],
        LTEQ: ["lteq"]
    }

    def __init__(self):
        self.param1 = None
        self.param2 = None
        self.operator = Condition.IDENT

    def is_unary(self):
        return self.operator in Condition.unary_operators

    def get_read_variables(self):
        if self.operator == Condition.IDENT:
            return []

        read_variables = []
        variable_name = get_parameter_variable_name(self.param1)
        if variable_name:
            read_variables.append(variable_name)

        if not self.is_unary():
            variable_name = get_parameter_variable_name(self.param2)
            if variable_name:
                read_variables.append(variable_name)

        return read_variables

    def evaluate(self, _state):
        if self.operator == Condition.IDENT:
            return True

        if self.operator == Condition.ISTRUE:
            return bool(get_parameter_value(_state, self.param1))

        elif self.operator == Condition.NOT:
            value1 = get_parameter_value(_state, self.param1)
            return Condition.operators[self.operator](bool(value1))

        else:
            value1 = get_parameter_value(_state, self.param1)
            value2 = get_parameter_value(_state, self.param2)
            return Condition.operators[self.operator](value1, value2)


def make_empty_condition():
    return Condition()


def parse_condition_from_string(_string):
    new_condition = Condition()

    if _string:
        parsed_tokens = [token.strip() for token in _string.split()]

        if len(parsed_tokens) == 1:
            new_condition.param1 = parsed_tokens[0]
            new_condition.operator = Condition.ISTRUE

        elif len(parsed_tokens) == 2:
            if parsed_tokens[0].lower() in Condition.not_token:
                new_condition.param1 = parsed_tokens[1]
                new_condition.operator = Condition.NOT
            else:
                logger.error("Couldn't parse condition '{0}' - it should be a NOT operator but isn't.".format(_string))

        elif len(parsed_tokens) == 3:
            parsed_operator = parsed_tokens[1].lower()
            for op, tokens in Condition.binary_operator_tokens.items():
                if parsed_operator in tokens:
                    new_condition.param1 = parsed_tokens[0]
                    new_condition.param2 = parsed_tokens[2]
                    new_condition.operator = op
                    break

            if new_condition is None:
                logger.error("Couldn't parse condition '{0}' - didn't recognize operator.".format(_string))

        else:
            logger.error("Couldn't parse condition '{0}'.".format(_string))

    return new_condition
