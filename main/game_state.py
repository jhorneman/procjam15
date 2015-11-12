# -*- coding: utf-8 -*-

# TODO: Consider implementing this: http://flask.pocoo.org/snippets/51/

from flask import session
from text_blocks import get_data_name_with_tag
from pc_names import first_names, last_names, job_titles

# Remember that the Flask session does not pick up modifications on mutable structures automatically.
# In that situation we have to explicitly set the modified attribute to True ourselves.
# See http://flask.pocoo.org/docs/0.10/api/#sessions

initial_game_state = {
    "flesh_act": "flesh_act1",
    "has_mcguffin": False,
    "amount_of_data": 0,
    "data": "data"
}


def extract_non_game_state_from_session():
    return {k: v for k,v in session.items() if k.startswith("__")}


def generate_player_character():
    first_name_index = session.setdefault("first_name_index", 0)
    last_name_index = session.setdefault("last_name_index", 0)
    flesh_act = session.get("flesh_act", initial_game_state["flesh_act"])
    job_title_index = session.setdefault("job_title_index:" + flesh_act, 0)

    if first_name_index >= len(first_names):
        first_name_index = 0

    if last_name_index >= len(last_names):
        last_name_index = 0

    if job_title_index >= len(job_titles[flesh_act]):
        job_title_index = 0

    PC_data = {
        "PC_first": first_names[first_name_index],
        "PC_last": last_names[last_name_index],
        "PC_job": job_titles[flesh_act][job_title_index]
    }

    session["first_name_index"] = first_name_index + 1
    session["last_name_index"] = last_name_index + 1
    session["job_title_index:" + flesh_act] = job_title_index + 1

    return PC_data


def generate_data_var():
    session["data"] = get_data_name_with_tag(session["flesh_act"])


def restart():
    non_game_state = extract_non_game_state_from_session()

    # Reset the session.
    # (This will also automatically reset the tag caches, which is important, or else
    # non-repeating queries will stop returning items.)
    session.clear()

    session.update(non_game_state)
    session.update(initial_game_state)
    session.update(generate_player_character())


def get_game_state_vars():
    return {k: v for k, v in session.items() if ":" not in k and not k.startswith("__")}


def prepare_game_state():
    if session.new:
        session.update(initial_game_state)
    else:
        for k, v in initial_game_state.items():
            if k not in session:
                session[k] = v
