# -*- coding: utf-8 -*-

import json
from main.data import get_scene_description


player_data = {
    "visited_scenes": [],
    "has_data": False,
    "generated_scenes": {}
}


def get_initial_scene_id():
    return "start"


def get_scene_data(_scene_id):
    scene = get_scene_description(_scene_id)
    if not scene:
        return None

    player_data["visited_scenes"].append(_scene_id)

    return {
        "text": scene.desc,
        "options": scene.options,
        "gameState": json.dumps(player_data)
    }
