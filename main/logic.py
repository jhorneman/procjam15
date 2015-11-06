# -*- coding: utf-8 -*-

import logging
from flask import request, render_template, abort, session
from main.data import get_scene_description, Option


logger = logging.getLogger(__name__)

first_scene_id = 'start'

default_game_state = {
    "current_scene": None,
    "visited_scenes": [],
    "has_data": False,
    "generated_scenes": {}
}


def get_standard_scene_data(_next_scene):
    scene = get_scene_description(_next_scene)
    if not scene:
        logger.error("Couldn't find scene description for scene '{0}'.".format(_next_scene))
        return None

    session["current_scene"] = _next_scene
    session["visited_scenes"].append(_next_scene)

    session.modified = True
    session.permanent = True

    return {
        "text": scene.desc,
        "options": scene.options
    }


def prepare_session():
    if session.new:
        for k, v in default_game_state.items():
            session[k] = v
    else:
        for k, v in default_game_state.items():
            if k not in session:
                session[k] = v


def get_scene_data():
    prepare_session()

    action = request.args.get('action', None)

    if action is None:
        return get_standard_scene_data(first_scene_id)

    elif action == Option.GOTO:
        next_scene = request.args.get('next_scene', None)
        if next_scene is None:
            logger.error("Couldn't find next_scene argument.")
            return None
        return get_standard_scene_data(next_scene)

    logger.error("'{0}' is an unknown action type.".format(action))
    return None
