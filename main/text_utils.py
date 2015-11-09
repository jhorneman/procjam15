# -*- coding: utf-8 -*-

import types
import string
import logging
from flask import escape


logger = logging.getLogger(__name__)


class CustomFormatter(string.Formatter):
    def get_value(self, key, args, kwargs):
        # Original code from /lib/python2.7/string.py.
        # If the key is a number, it's a positional argument, which we don't actually support,
        # so just let this fail gracefully.
        if isinstance(key, (int, long)):
            return args[key]
        else:
            # First determine if we want the value to be capitalized.
            capitalize = False
            if key.startswith("^"):
                capitalize = True
                key = key[1:]

            # Then remove the optional $ sign.
            if key.startswith("$"):
                key = key[1:]

            # Do we have a value with this name?
            if key in kwargs:
                # Yes -> Get it.
                value = kwargs[key]

                # Convert it to a string if need be.
                if not isinstance(value, types.StringType):
                    value = str(value)

                # Capitalize it, if needed.
                if capitalize:
                    value = value[0].capitalize() + value[1:]

                return value

            else:
                # No -> Complain.
                logger.error("Text substitution key '{0}' was not found.".format(key))
                return escape("<NOT FOUND>")

formatter = CustomFormatter()


def substitute_text(_text, _substitution_data):
    if _text is None:
        logger.error("Text to be converted is None.")
        return ''
    return formatter.vformat(_text, [], _substitution_data)
