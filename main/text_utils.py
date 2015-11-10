# -*- coding: utf-8 -*-

import types
import string
import re
import logging
from flask import escape


logger = logging.getLogger(__name__)

indefinite_pronoun_re = re.compile(r"^(an? )?([\w_^$]*)$")
words_that_start_with_voiceless_h = ["hour", "honor", "honour", "heir", "honest"]


class CustomFormatter(string.Formatter):
    def get_value(self, key, args, kwargs):
        # Original code from /lib/python2.7/string.py.
        # If the key is a number, it's a positional argument, which we don't actually support,
        # so just let this fail gracefully.
        if isinstance(key, (int, long)):
            return args[key]
        else:
            # Split into modifiers and the actual variable name.
            m = indefinite_pronoun_re.match(key)
            if not m:
                logger.error("Could not parse '{0}'.".format(key))
                return escape("<'{0}' NOT PARSED>".format(key))

            add_indefinite_article = m.group(1) is not None
            key = m.group(2)

            # Determine if we want the value to be capitalized.
            capitalize = False
            if key.startswith("^"):
                capitalize = True
                key = key[1:]

            # Remove the optional $ sign, if it's there.
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

                # Prepend indefinite article, if needed.
                if add_indefinite_article:
                    starts_with_voiceless_h = any([value.lower().startswith(word) for word in words_that_start_with_voiceless_h])
                    starts_with_vowel = value[0].lower() in "aeiou"
                    if starts_with_vowel or starts_with_voiceless_h:
                        value = "an " + value
                    else:
                        value = "a " + value

                return value

            else:
                # No -> Complain.
                logger.error("Text substitution key '{0}' was not found.".format(key))
                return escape("<'{0}' NOT FOUND>".format(key))

formatter = CustomFormatter()


def substitute_text(_text, _substitution_data):
    if _text is None:
        logger.error("Text to be converted is None.")
        return ''
    return formatter.vformat(_text, [], _substitution_data)
