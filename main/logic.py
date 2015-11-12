# -*- coding: utf-8 -*-

import random
import logging
from flask import request, session
from scene import get_scene_description, get_scene_description_with_tag
from text_utils import substitute_text_variables, break_text_into_paragraphs
from game_state import prepare_game_state, generate_player_character, restart
from content import evaluate_content_blocks, goto_action


logger = logging.getLogger(__name__)

first_scene_id = 'start'


# From http://stackoverflow.com/a/28186447/1057708
def generate_nonce(length=8):
    return ''.join([str(random.randint(0, 9)) for i in range(length)])


def get_current_scene_data():
    """Takes the request and the session and returns a dictionary with all the variables needed
       to render the current scene."""

    prepare_game_state()

    session_nonce = session.get("__nonce", generate_nonce())
    url_nonce = request.args.get('nonce', session_nonce)

    # if url_nonce != session_nonce:
    #     return {
    #         "text": "Reloading the page, naughty naughty!",
    #         "options": [],
    #         "body_classes": "",
    #     }

    action = request.args.get('action', None)

    if action is None:
        restart()
        current_scene_id = first_scene_id
        session["previous_scene"] = ""

    elif action == goto_action:
        current_scene_id = request.args.get('next_scene', None)
        if current_scene_id is None:
            logger.error("Couldn't find next_scene argument.")
            return None

    elif action == "respawn":
        session.update(generate_player_character())

        wake_up_tags = ["pc_start", session["flesh_act"]]
        wake_up_scene = get_scene_description_with_tag(wake_up_tags)
        if not wake_up_scene:
            logger.error("Couldn't find a valid respawn scene.")
            return None

        current_scene_id = wake_up_scene.id
        session["previous_scene"] = ""

    else:
        logger.error("'{0}' is an unknown action type.".format(action))
        return None

    scene_desc = get_scene_description(current_scene_id)
    if not scene_desc:
        logger.error("Couldn't find scene description for scene '{0}'.".format(current_scene_id))
        return None

    session["current_scene"] = current_scene_id

    evaluated_scene = evaluate_content_blocks(scene_desc.blocks, session)

    for action in evaluated_scene["actions"]:
        action.execute(session)

    tags_for_body_classes = list(set(scene_desc.tags + [session["flesh_act"]]))

    scene_data = {
        "text": break_text_into_paragraphs(substitute_text_variables(evaluated_scene["text"], session)),
        "options": [{
            "action": option["action"],
            "text": substitute_text_variables(option["text"], session),
            "params": option["params"]
            } for option in evaluated_scene["options"]
        ],
        "body_classes": " ".join(tags_for_body_classes)
    }

    # Add a nonce so we can deal with page reloads.
    new_nonce = generate_nonce()
    for option in scene_data["options"]:
        option["params"]["nonce"] = new_nonce
    session["__nonce"] = new_nonce

    # Set this for next time we evaluate.
    session["previous_scene"] = current_scene_id

    return scene_data
