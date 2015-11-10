# -*- coding: utf-8 -*-

import logging
from flask import request, session
from scene import get_scene_description, get_scene_description_with_tag
from text_utils import substitute_text
from game_state import prepare_game_state, generate_player_character
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

    # TODO: Replace with constant.
    # elif action == Option.GOTO:
    elif action == "goto":
        next_scene_id = request.args.get('next_scene', None)
        if next_scene_id is None:
            logger.error("Couldn't find next_scene argument.")
            return None

    elif action == "respawn":
        session.update(generate_player_character())

        wake_up_tags = ["pc_start", session["flesh_act"]]
        wake_up_scene = get_scene_description_with_tag(wake_up_tags, session)
        if not wake_up_scene:
            logger.error("Couldn't find a valid respawn scene.")
            return None

        next_scene_id = wake_up_scene.id

    else:
        logger.error("'{0}' is an unknown action type.".format(action))
        return None

    scene_desc = get_scene_description(next_scene_id)
    if not scene_desc:
        logger.error("Couldn't find scene description for scene '{0}'.".format(next_scene_id))
        return None

    evaluated_scene = evaluate_content_blocks(scene_desc.blocks, session)

    for action in evaluated_scene["actions"]:
        action.execute(session)

    tags_for_body_classes = list(set(scene_desc.tags + [session["flesh_act"]]))

    return {
        "text": substitute_text(evaluated_scene["text"], session),
        "options": [{
            "action": option["action"],
            "text": substitute_text(option["text"], session),
            "params": option["params"]
            } for option in evaluated_scene["options"]
        ],
        "body_classes": " ".join(tags_for_body_classes)
    }
