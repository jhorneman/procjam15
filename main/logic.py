# -*- coding: utf-8 -*-

from main.data import get_scene_description


def get_scene_data(_scene_id):
    scene = get_scene_description(_scene_id)
    if not scene:
        return None

    return {
        'text': scene.desc,
        'options': scene.options
    }
