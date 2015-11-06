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


def f(_text):
    substitution_data = {
        "amount_of_data": session["amount_of_data"]
    }
    return formatter.vformat(_text, [], substitution_data)


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
        "options": scene.options
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
    session.permanent = True


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

    # TODO: Make sure scene_data is converted to pure dumb and mutable! data here

    if scene_data:
        for option in scene_data["options"]:
            if type(option) == type(dict()):
                if "params" not in option:
                    option["params"] = {}
        scene_data["text"] = f(scene_data["text"])
        return scene_data

    else:
        logger.error("'{0}' is an unknown action type.".format(action))
        return None
