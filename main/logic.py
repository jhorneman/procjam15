# -*- coding: utf-8 -*-

import types
import random
import logging
from flask import request, session
from scene import get_scene_description, get_scene_description_with_tag
from text_utils import substitute_text_variables, break_text_into_paragraphs
from game_state import prepare_game_state, generate_player_character, restart, has_compatible_version
from content import evaluate_content_blocks, goto_action, respawn_action, restart_action


logger = logging.getLogger(__name__)

first_scene_id = "start"


# From http://stackoverflow.com/a/28186447/1057708
# TODO: Use better random so behavior is non-deterministic with a single player.
def generate_nonce(length=8):
    return "".join([str(random.randint(0, 9)) for i in range(length)])


def get_current_scene_data():
    """Takes the request and the session and returns a dictionary with all the variables needed
       to render the current scene."""

    prepare_game_state()

    if not has_compatible_version():
        logger.error("Incompatible session version number.")
        return "We've updated the game and your save game data is no longer compatible. Please restart. Sorry!"

    # Get the nonce from the session and the one from the request parameter.
    session_nonce = session.get("__nonce", generate_nonce())
    url_nonce = request.args.get("nonce", session_nonce)

    # If they are not the same, the player reloaded the page.
    # EXCEPT WITH A CLEAN URL. So this doesn't work in the first scene. I don't see a way around this.
    player_reloaded = (session_nonce != url_nonce)

    # Did the player reload?
    if not player_reloaded:
        # No -> Store the current state, so we can restore it if the player reloads.
        backup = {}
        for k, v in session.items():
            if k.startswith("__"):
                continue
            if isinstance(v, types.ListType):
                backup[k] = v[:]
            else:
                backup[k] = v
        session["__backup"] = backup
    else:
        # Yes -> Restore the state from when this page was originally rendered.
        # We can only ever get here when there is already something in the session (the nonce).
        backup = session.get("__backup", None)
        if backup:
            session.clear()
            session.update(backup)
            session["__backup"] = backup
            # Nonce will be set at the end, no need to restore it.
        else:
            logger.error("Wanted to restore state but couldn't find backup.")

    # Provide a random number generator that produces the same numbers if the player reloaded the page.
    session["__rng"] = random.WichmannHill(url_nonce)

    action = request.args.get("action", restart_action)

    if action == restart_action:
        restart()
        current_scene_id = first_scene_id
        session["previous_scene"] = ""

    elif action == goto_action:
        current_scene_id = request.args.get("next_scene", None)
        if current_scene_id is None:
            logger.error("Couldn't find next_scene argument.")
            # TODO: Find a cleaner way to deal with this.
            del session["__rng"]
            return None

    elif action == respawn_action:
        session.update(generate_player_character())

        wake_up_tags = ["pc_start", session["flesh_act"]]
        wake_up_scene = get_scene_description_with_tag(wake_up_tags)
        if not wake_up_scene:
            logger.error("Couldn't find a valid respawn scene.")
            # TODO: Find a cleaner way to deal with this.
            del session["__rng"]
            return None

        current_scene_id = wake_up_scene.id
        session["previous_scene"] = ""

    else:
        logger.error("'{0}' is an unknown action type.".format(action))
        # TODO: Find a cleaner way to deal with this.
        del session["__rng"]
        return None

    scene_desc = get_scene_description(current_scene_id)
    if not scene_desc:
        logger.error("Couldn't find scene description for scene '{0}'.".format(current_scene_id))
        # TODO: Find a cleaner way to deal with this.
        del session["__rng"]
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

    # We don't need this anymore.
    del session["__rng"]

    # Set this for next time we evaluate.
    session["previous_scene"] = current_scene_id

    # Flask will catch most modifications of the session automatically, but this way we are sure.
    # See http://flask.pocoo.org/docs/0.10/api/#sessions
    session.modified = True

    # Make sure we generated a valid scene.
    if len(scene_data["options"]) == 0:
        logger.error("Generated a scene with NO options. Session: {0}.".format(str(session)))
        return None

    return scene_data
