# -*- coding: utf-8 -*-

import string
import logging
from flask import request, session
from main.data import get_scene_description, get_scene_description_with_tag, Option


logger = logging.getLogger(__name__)

first_scene_id = 'start'

default_game_state = {
    "has_mcguffin": False,
    "amount_of_data": 0
}


class CustomFormatter(string.Formatter):
    def check_unused_args(self, used_args, args, kwargs):
        #TODO: Write actual check, report error but don't raise an exception
        pass

formatter = CustomFormatter()


def convert_text(_text, _substitution_data):
    return formatter.vformat(_text, [], _substitution_data)


def restart():
    for k, v in default_game_state.items():
        session[k] = v


def get_standard_scene_data(_next_scene):
    scene = get_scene_description(_next_scene)
    if not scene:
        logger.error("Couldn't find scene description for scene '{0}'.".format(_next_scene))
        return None

    # session["current_scene"] = _next_scene
    # session["visited_scenes"].append(_next_scene)
    # session.modified = True

    return {
        "text": scene.desc,
        "options": [{
            "action": option.action,
            "text": option.text,
            "params": option.params
            } for option in scene.options
        ]
    }


def get_computer_room_data():
    if session.get("has_mcguffin", False):
        session["has_mcguffin"] = False
        session["amount_of_data"] += 1
        if session["amount_of_data"] >= 3:
            return {
                "text": "You're in the computer room. The computer is happy now. The end.",
                "options": []
            }
        else:
            return {
                "text": "You're in the computer room. Computer likes data. Computer wants more data! Current data level: {amount_of_data}.",
                "options": [{
                    "action": Option.QUEST,
                    "text": "Go on a quest for data."
                }]
            }
    else:
        return {
            "text": "You're in the computer room. Computer wants data! Current data level: {amount_of_data}.",
            "options": [{
                "action": Option.QUEST,
                "text": "Go on a quest for data."
            }]
        }


def get_quest_data():
    scene = get_scene_description_with_tag('quest')
    if not scene:
        return None

    return {
        "text": scene.desc,
        "options": [{
            "action": Option.FOUND_DATA,
            "text": "Search this place for lovely but potentially gross data."
        }, {
            "action": Option.COMPUTER,
            "text": "Go back to the computer room, empty-handed."
        }]
    }


def get_found_data_data():
    session["has_mcguffin"] = True
    return {
        "text": "You found... something. Ew. I'm sure the computer will be happy.",
        "options": [{
            "action": Option.COMPUTER,
            "text": "Go back to the computer."
        }]
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

    scene_data = None

    if action is None:
        scene_data = get_standard_scene_data(first_scene_id)

    elif action == Option.GOTO:
        next_scene = request.args.get('next_scene', None)
        if next_scene is None:
            logger.error("Couldn't find next_scene argument.")
            return None
        scene_data = get_standard_scene_data(next_scene)

    elif action == Option.COMPUTER:
        scene_data = get_computer_room_data()

    elif action == Option.QUEST:
        scene_data = get_quest_data()

    elif action == Option.FOUND_DATA:
        scene_data = get_found_data_data()

    if not scene_data:
        logger.error("'{0}' is an unknown action type.".format(action))
        return None

    # scene_data must consist of dumb dictionaries here because we're going to mutate the text.

    substitution_data = {
        "amount_of_data": session["amount_of_data"]
    }

    scene_data["text"] = convert_text(scene_data["text"], substitution_data)
    for option in scene_data["options"]:
        option["text"] = convert_text(option["text"], substitution_data)

    return scene_data
