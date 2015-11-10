# -*- coding: utf-8 -*-

import logging
import operator
from parameters import get_lhs_parameter_value, get_rhs_parameter_value


logger = logging.getLogger(__name__)


class Condition(object):
    NOOP = "noop"
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
        self.operator = Condition.NOOP

    def evaluate(self, _state):
        if self.operator == Condition.NOOP:
            return True

        if self.operator == Condition.ISTRUE:
            return bool(get_lhs_parameter_value(_state, self.param1))

        elif self.operator == Condition.NOT:
            value1 = get_lhs_parameter_value(_state, self.param1)
            return Condition.operators[self.operator](bool(value1))

        else:
            value1 = get_lhs_parameter_value(_state, self.param1)
            value2 = get_rhs_parameter_value(_state, self.param2)
            return Condition.operators[self.operator](value1, value2)


def parse_condition_from_string(_string):
    parsed_tokens = [token.strip() for token in _string.split()]

    new_condition = None

    if len(parsed_tokens) == 1:
        new_condition = Condition()
        new_condition.param1 = parsed_tokens[0]
        new_condition.operator = Condition.ISTRUE

    elif len(parsed_tokens) == 2:
        if parsed_tokens[0].lower() in Condition.not_token:
            new_condition = Condition()
            new_condition.param1 = parsed_tokens[1]
            new_condition.operator = Condition.NOT
        else:
            logger.error("Couldn't parse condition '{0}' - it should be a NOT operator but isn't.".format(_string))

    elif len(parsed_tokens) == 3:
        parsed_operator = parsed_tokens[1].lower()
        for op, tokens in Condition.binary_operator_tokens.items():
            if parsed_operator in tokens:
                new_condition = Condition()
                new_condition.param1 = parsed_tokens[0]
                new_condition.param2 = parsed_tokens[2]
                new_condition.operator = op
                break

        if new_condition is None:
            logger.error("Couldn't parse condition '{0}' - didn't recognize operator.".format(_string))

    else:
        logger.error("Couldn't parse condition '{0}'.".format(_string))

    return new_condition
