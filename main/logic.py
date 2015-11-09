# -*- coding: utf-8 -*-

import logging
from flask import request, session
from scene import get_scene_description, get_scene_description_with_tag
from option import Option
from text_utils import substitute_text
from game_state import prepare_game_state
from content import evaluate_content_blocks


logger = logging.getLogger(__name__)

first_scene_id = 'start'


def get_standard_scene_data(_next_scene):
    scene_desc = get_scene_description(_next_scene)
    if not scene_desc:
        logger.error("Couldn't find scene description for scene '{0}'.".format(_next_scene))
        return None

    e = evaluate_content_blocks(scene_desc.blocks, session)
    scene_data = {
        "text": e.text,
        "options": [{
            "action": option.action if hasattr(option, "action") else option["action"],
            "text": option.text if hasattr(option, "text") else option["text"],
            "params": option.params if hasattr(option, "params") else option["params"],
            "condition": option.condition if hasattr(option, "condition") else option.get("condition", None)
            } for option in e.options
        ]
    }

    return scene_data


def get_scene_data():
    prepare_game_state()

    action = request.args.get('action', None)

    if action is None:
        scene_data = get_standard_scene_data(first_scene_id)

    elif action == Option.GOTO:
        next_scene = request.args.get('next_scene', None)
        if next_scene is None:
            logger.error("Couldn't find next_scene argument.")
            return None
        scene_data = get_standard_scene_data(next_scene)

    else:
        logger.error("'{0}' is an unknown action type.".format(action))
        return None

    if not scene_data:
        logger.error("Couldn't find scene data.")
        return None

    # Evaluate option conditions.
    for (index, option) in enumerate(scene_data["options"]):
        condition = option.get("condition", None)
        if condition:
            if not condition.evaluate(session):
                del scene_data["options"][index]

    # scene_data must consist of dumb dictionaries here because we're going to mutate the text.

    scene_data["text"] = substitute_text(scene_data["text"], session)
    for option in scene_data["options"]:
        option["text"] = substitute_text(option["text"], session)

    scene_data["body_classes"] = session["flesh_act"]

    return scene_data
