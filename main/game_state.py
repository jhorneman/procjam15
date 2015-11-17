# -*- coding: utf-8 -*-

# TODO: Consider implementing this: http://flask.pocoo.org/snippets/51/

import random
from flask import session
from text_blocks import get_data_name_with_tag
from pc_names import first_names, last_names, job_titles, get_job_title, get_nr_job_titles


current_version_nr = 1
last_compatible_version_nr = 1

initial_game_state = {
    "flesh_act": "flesh_act1",
    "has_mcguffin": False,
    "amount_of_data": 0,
    "data": "data"
}


def generate_player_character():
    # (These uses of random are fine even if the player reloads the page. The results get stored in the session,
    #  so the calls won't get executed twice.)
    first_name_index = session.setdefault("first_name_index", random.randint(0, len(first_names)-1))
    last_name_index = session.setdefault("last_name_index", random.randint(0, len(last_names)-1))
    flesh_act = session.get("flesh_act", initial_game_state["flesh_act"])
    job_title_index = session.setdefault("job_title_index:" + flesh_act, random.randint(0, get_nr_job_titles(flesh_act)-1))

    PC_data = {
        "PC_first": first_names[first_name_index],
        "PC_last": last_names[last_name_index],
        "PC_job": get_job_title(flesh_act, job_title_index)
    }

    first_name_index += 1
    last_name_index += 1
    job_title_index += 1

    if first_name_index >= len(first_names):
        first_name_index = 0

    if last_name_index >= len(last_names):
        last_name_index = 0

    if job_title_index >= get_nr_job_titles(flesh_act):
        job_title_index = 0

    session["first_name_index"] = first_name_index
    session["last_name_index"] = last_name_index
    session["job_title_index:" + flesh_act] = job_title_index

    return PC_data


def generate_data_var():
    session["data"] = get_data_name_with_tag(session["flesh_act"])


def restart():
    non_game_state = {k: v for k, v in session.items() if k.startswith("__")}

    session.clear()

    session.update(non_game_state)

    # (Since we're starting from scratch we can just set the current version number.)
    session["game_state_version"] = current_version_nr

    session.update(initial_game_state)
    session.update(generate_player_character())


def has_compatible_version():
    return session.get("game_state_version") >= last_compatible_version_nr


def get_game_state_vars():
    return {k: v for k, v in session.items() if ":" not in k and not k.startswith("__")}


def prepare_game_state():
    if session.new:
        session["game_state_version"] = current_version_nr
        session.update(initial_game_state)
    else:
        for k, v in initial_game_state.items():
            if k not in session:
                session[k] = v
