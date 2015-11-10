# -*- coding: utf-8 -*-

# TODO: Consider implementing this: http://flask.pocoo.org/snippets/51/

from flask import session
from text_blocks import get_data_name_with_tag


# Remember that the Flask session does not pick up modifications on mutable structures automatically.
# In that situation we have to explicitly set the modified attribute to True ourselves.
# See http://flask.pocoo.org/docs/0.10/api/#sessions

initial_game_state = {
    "flesh_act": "flesh_act1",
    "has_mcguffin": False,
    "amount_of_data": 0,
    "data": "data"
}

def generate_player_character():
    return {
        "PC_first": "Mary",
        "PC_last": "Placeholder",
        "PC_she": "she",
        "PC_her": "her",
        "PC_man": "woman",
        "PC_male": "female",
    }


def generate_data_var():
    session["data"] = get_data_name_with_tag(session["flesh_act"])


def restart():
    session.clear()
    session.update(initial_game_state)
    session.update(generate_player_character())


def prepare_game_state():
    if session.new:
        session.update(initial_game_state)
    else:
        for k, v in initial_game_state.items():
            if k not in session:
                session[k] = v
