# -*- coding: utf-8 -*-

import string
import logging
from flask import request, session, escape
from main.data import get_scene_description, get_scene_description_with_tag, Option


logger = logging.getLogger(__name__)

first_scene_id = 'start'

default_game_state = {
    "flesh_act": "flesh_act1",
    "has_mcguffin": False,
    "amount_of_data": 0
}


class CustomFormatter(string.Formatter):
    def get_value(self, key, args, kwargs):
        # Original code from /lib/python2.7/string.py
        if isinstance(key, (int, long)):
            return args[key]
        else:
            if key in kwargs:
                return kwargs[key]
            else:
                logger.error("Text substitution key '{0}' was not found.".format(key))
                return escape("<NOT FOUND>")

formatter = CustomFormatter()


def substitute_text(_text, _substitution_data):
    if _text is None:
        logger.error("Text to be converted is None.")
        return ''
    return formatter.vformat(_text, [], _substitution_data)


def restart():
    session.clear()
    session.update(default_game_state)


def get_standard_scene_data(_next_scene):
    scene_desc = get_scene_description(_next_scene)
    if not scene_desc:
        logger.error("Couldn't find scene description for scene '{0}'.".format(_next_scene))
        return None

    # session["current_scene"] = _next_scene
    # session["visited_scenes"].append(_next_scene)
    # session.modified = True

    scene_data = {
        "text": scene_desc.build_main_text(session),
        "options": [{
            "action": option.action,
            "text": option.text,
            "params": option.params,
            "condition": option.condition
            } for option in scene_desc.options
        ]
    }

    for injected_option_tags in scene_desc.injected_options:
        injected_option = get_tagged_option_to_inject(injected_option_tags)
        if injected_option:
            scene_data["options"].append(injected_option)
        else:
            logger.warning("Couldn't find a valid scene with tags '{1}' to inject into scene {0}."
                           .format(_next_scene, injected_option_tags))

    return scene_data


def get_tagged_option_to_inject(_tags):
    injected_scene_desc = get_scene_description_with_tag(_tags, session)
    if injected_scene_desc:
        if injected_scene_desc.leadin is None:
            logger.error("Injected scene '{0}' has no lead-in.".format(injected_scene_desc.id))
            return None

        return {
            "action": Option.GOTO,
            "text": injected_scene_desc.leadin,
            "params": {
                "next_scene": injected_scene_desc.id
            }
        }
    else:
        return None


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
