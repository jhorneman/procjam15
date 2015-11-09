# -*- coding: utf-8 -*-

import re
import logging
import xml.etree.ElementTree as ET
from tags import string_to_tags, evaluate_tags, tags_are_matched
from option import Option
from content import evaluate_content_blocks, parse_content_from_xml


logger = logging.getLogger(__name__)

scene_tag_re = re.compile(r"^\s*<scene", re.IGNORECASE)
scene_id_re = re.compile(r"^[a-zA-Z0-9-_ ]*$")

scenes = {}


def get_nr_scenes():
    return len(scenes)


def get_scene_description(_scene_id):
    return scenes.get(_scene_id, None)


counter_per_tag = {}


# TODO: Make this independent of scenes.
def get_scene_description_with_tag(_tags, _state):
    tags = evaluate_tags(_tags, _state)
    if len(tags) == 0:
        logger.error("Can't find a scene with an empty tag list.")
        return None

    ids_of_eligible_scenes = []
    for scene_id, scene in scenes.items():
        if tags_are_matched(tags, scene.tags):
            ids_of_eligible_scenes.append(scene_id)

    if len(ids_of_eligible_scenes) == 0:
        logger.error("Couldn't find a scene with tags {0}.".format(tags))
        return None

    # TODO: Actually cache the list of scene IDs, and then shuffle it as well.
    cache_key = ".".join(tags)
    counter = counter_per_tag.setdefault(cache_key, 0)
    try:
        scene_id = ids_of_eligible_scenes[counter]
    except IndexError:
        logger.error("Index out of range for tags {0}.".format(tags))
        return None
    counter += 1
    if counter >= len(ids_of_eligible_scenes):
        counter = 0
    counter_per_tag[cache_key] = counter

    return scenes.get(scene_id)


class Scene(object):
    STANDARD = "STANDARD"
    types = [STANDARD]

    def __init__(self):
        self.id = None
        self.type = Scene.STANDARD
        self.tags = []
        self.blocks = []
        self.options = []
        self.leadin = None
        self.injected_options = []

    def build_main_text(self, _state):
        return evaluate_content_blocks(self.blocks, _state)


def read_scenes_from_text_file(_file, _file_name):
    # Read the entire text file.
    data = _file.read()

    # Does this file start with a <scene> element?
    if scene_tag_re.match(data):
        # Yes -> Then wrap it in a <data> element.
        data = "<data>" + data + "</data>"
    else:
        # No -> Then wrap it in a <data> and a <scene> element.
        data = "<data><scene>" + data + "</scene></data>"

    root = ET.fromstring(data)

    # Iterate over all scene elements in the text file.
    scene_els = root.findall("scene")

    if len(scene_els) == 0:
        logger.error("No scene elements found.")
        return

    scene_name = _file_name if len(scene_els) == 1 else None

    for scene_index, scene_el in enumerate(scene_els):
        parse_scene_from_xml(scene_el, scene_index, scene_name)


def parse_scene_from_xml(_scene_el, _scene_index, _scene_name):
        new_scene = Scene()

        # Find meta element.
        meta_el = _scene_el.find("meta")
        if meta_el is not None:
            # Get scene ID, use scene name if not found and there's only one scene, otherwise skip.
            new_scene.id = meta_el.get("id")
            if new_scene.id is None:
                if _scene_name:
                    new_scene.id = _scene_name
                else:
                    logger.error("Scene {0} has a meta element without an id attribute. Skipping.".format(_scene_index+1))
                    return
            else:
                new_scene.id = new_scene.id.strip()
                if not scene_id_re.match(new_scene.id):
                    logger.error("Scene {0} has an invalid id '{1}'. Scene ids must consist of letters, underscores, hyphens, spaces, and numbers. Skipping.".format(_scene_index+1, new_scene.id))
                    return

            # Get scene type, if any.
            new_scene.type = meta_el.get("type", Scene.STANDARD)
            if new_scene.type not in Scene.types:
                logger.error("Scene {0} has type '{1}' which is not a valid type (those are {2}). Skipping."
                    .format(_scene_index+1, new_scene.type, ", ".join(Scene.types)))
                return

            # Get scene tags, if any.
            tags = meta_el.get("tags", None)
            if tags:
                new_scene.tags = string_to_tags(tags)
        else:
            if _scene_name:
                new_scene.id = _scene_name
                new_scene.type = Scene.STANDARD
            else:
                logger.error("Scene {0} does not contain a meta element. Skipping.".format(_scene_index+1))
                return

        if new_scene.id in scenes:
            logger.error("Scene {0} has id {1} which already exists. Skipping.".format(_scene_index+1, new_scene.id))
            return

        new_scene.blocks = parse_content_from_xml(_scene_el)

        # Get lead-in, if any.
        leadin_el = _scene_el.find("leadin")
        if leadin_el is not None:
            new_scene.leadin = leadin_el.text

        # Get injected options, if any.
        for injected_option_index, injected_option_el in enumerate(_scene_el.findall("injectOption")):
            tags_string = injected_option_el.get("tags", None)
            if tags_string:
                tags = string_to_tags(tags_string)
                if len(tags) > 0:
                    new_scene.injected_options.append(tags)
                else:
                    logger.error("Scene {0} contains an injected option {1} with empty tags. Skipping.".format(_scene_index+1, injected_option_index+1))
            else:
                logger.error("Scene {0} contains an injected option {1} without tags. Skipping.".format(_scene_index+1, injected_option_index+1))
                return

        # Iterate over all option elements.
        for option_index, option_el in enumerate(_scene_el.findall("option")):
            new_option = Option.from_el(option_el, option_index + 1)
            if new_option:
                new_scene.options.append(new_option)

        # if len(new_scene.options) == 0:
        #     # Skip if no option elements were found.
        #     logger.error("Scene {0} does not contain any valid option elements. Skipping.".format(_scene_index+1))
        #     return

        logger.info("Read scene {0}.".format(_scene_index+1))
        scenes[new_scene.id] = new_scene
