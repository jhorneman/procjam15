# -*- coding: utf-8 -*-

from flask import session


initial_game_state = {
    "flesh_act": "flesh_act1",
    "has_mcguffin": False,
    "amount_of_data": 0
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
