# -*- coding: utf-8 -*-

import types
import string
import re
import logging
from flask import escape


logger = logging.getLogger(__name__)

indefinite_pronoun_re = re.compile(r"^(an? )?([\w_^$]*)$")
words_that_start_with_voiceless_h = ["hour", "honor", "honour", "heir", "honest"]

blank_line = "\n\n"

t_re = re.compile("</?t>")
terminal_style_class_name = "style_terminal"


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


def substitute_text_variables(_text, _substitution_data):
    if _text is None:
        logger.error("Text to be processed is None.")
        return ""
    return formatter.vformat(_text, [], _substitution_data).strip()


def generate_p_tags(_text):
    paragraphs = _text.split(blank_line)
    return u"".join([u"<p>{0}</p>".format(paragraph) for paragraph in paragraphs])


def generate_style_tags(_text):
    return u"<span class=\"{0}\">{1}</span>".format(terminal_style_class_name, _text)


def break_text_into_paragraphs(_text):
    if _text is None:
        logger.error("Text to be broken up is None.")
        return ""

    # Split into parts alternating between not inside style tags and inside style tags.
    parts = t_re.split(_text)
    combined_text = ""
    accumulated_part = ""
    for part_index, part in enumerate(parts):
        # Skip the current part if empty.
        if len(part) == 0:
            continue

        # Is the current part styled?
        # (Is it a part with an odd index?)
        if part_index % 2 == 1:
            # Yes -> Does it contain blank lines?
            if blank_line in part:
                # Yes -> Then we have flush the text we've accumulated so far, if any.
                if len(accumulated_part) > 0:
                    combined_text += generate_p_tags(accumulated_part)
                    accumulated_part = ""

                # Break it into paragraphs, wrap it in style tags, and add it to the combined text.
                combined_text += generate_style_tags(generate_p_tags(part))
            else:
                # No -> Wrap it in style tags and add it to the text we're accumulating.
                accumulated_part += generate_style_tags(part)
        else:
                # No -> Add it to the text we're accumulating.
            accumulated_part += part

    # Flush the text we've accumulated so far, if any.
    if len(accumulated_part) > 0:
        combined_text += generate_p_tags(accumulated_part)

    return combined_text
