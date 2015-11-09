# -*- coding: utf-8 -*-

import logging
from flask import request, session
from scene import get_scene_description
from option import Option
from text_utils import substitute_text
from game_state import prepare_game_state
from content import evaluate_content_blocks


logger = logging.getLogger(__name__)

first_scene_id = 'start'


def get_current_scene_data():
    """Takes the request and the session and returns a dictionary with all the variables needed
       to render the current scene."""

    prepare_game_state()

    action = request.args.get('action', None)

    if action is None:
        next_scene_id = first_scene_id

    elif action == Option.GOTO:
        next_scene_id = request.args.get('next_scene', None)
        if next_scene_id is None:
            logger.error("Couldn't find next_scene argument.")
            return None

    else:
        logger.error("'{0}' is an unknown action type.".format(action))
        return None

    scene_desc = get_scene_description(next_scene_id)
    if not scene_desc:
        logger.error("Couldn't find scene description for scene '{0}'.".format(next_scene_id))
        return None

    e = evaluate_content_blocks(scene_desc.blocks, session)

    scene_data = {
        "text": substitute_text(e.text, session),
        "options": [{
            "action": option.action if hasattr(option, "action") else option["action"],
            "text": option.text if hasattr(option, "text") else option["text"],
            "params": option.params if hasattr(option, "params") else option["params"]
            } for option in e.options
        ]
    }

    for option in scene_data["options"]:
        option["text"] = substitute_text(option["text"], session)

    scene_data["body_classes"] = session["flesh_act"]

    return scene_data
