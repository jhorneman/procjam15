# -*- coding: utf-8 -*-

import re
import logging
import xml.etree.ElementTree as ET
from tags import string_to_tags, TaggedCollection
from content import parse_content_of_xml_element


logger = logging.getLogger(__name__)

scene_tag_re = re.compile(r"^\s*<scene", re.IGNORECASE)
scene_id_re = re.compile(r"^[a-zA-Z0-9-_ ]*$")

scenes = {}
tagged_scene_ids = TaggedCollection("scene")


def get_nr_scenes():
    return len(scenes)


def get_scene_description(_scene_id):
    return scenes.get(_scene_id, None)


def get_scene_description_with_tag(_desired_tags, _repeat=True):
    scene_id = tagged_scene_ids.get_item_by_tags(_desired_tags, _repeat)
    return scenes.get(scene_id) if scene_id else None


class Scene(object):
    def __init__(self):
        self.id = None
        self.tags = []
        self.blocks = []
        self.options = []
        self.leadin = None
        self.injected_options = []


def read_scenes_from_text_file(_full_path):
    with open(_full_path, "r") as f:
        # Read the entire text file.
        data = f.read()

        # Wrap it in a <data> element.
        data = "<data>" + data + "</data>"

        try:
            root = ET.fromstring(data)
        except ET.ParseError as e:
            logger.error("Couldn't parse the XML inside {0}. Error message: {1}".format(_full_path, str(e)))
            return

        # Iterate over all scene elements in the text file.
        scene_els = root.findall("scene")
        if len(scene_els) == 0:
            logger.error("No scene elements found.")
            return

        for scene_index, scene_el in enumerate(scene_els):
            parse_scene_from_xml(scene_el, scene_index)


def parse_scene_from_xml(_scene_el, _scene_index):
        new_scene = Scene()

        # Find meta element.
        meta_el = _scene_el.find("meta")
        if meta_el is not None:
            # Get scene ID, use scene name if not found and there's only one scene, otherwise skip.
            new_scene.id = meta_el.get("id")
            if new_scene.id is None:
                logger.error("Scene {0} has a meta element without an id attribute. Skipping.".format(_scene_index+1))
                return
            else:
                new_scene.id = new_scene.id.strip()
                if not scene_id_re.match(new_scene.id):
                    logger.error("Scene {0} has an invalid id '{1}'. Scene ids must consist of letters, underscores, hyphens, spaces, and numbers. Skipping.".format(_scene_index+1, new_scene.id))
                    return

            # Get scene tags, if any.
            tags = meta_el.get("tags", None)
            if tags:
                new_scene.tags = string_to_tags(tags)
        else:
            logger.error("Scene {0} does not contain a meta element. Skipping.".format(_scene_index+1))
            return

        if new_scene.id in scenes:
            logger.error("Scene {0} has id {1} which already exists. Skipping.".format(_scene_index+1, new_scene.id))
            return

        new_scene.blocks = parse_content_of_xml_element(_scene_el)

        logger.debug("Read scene {0}.".format(_scene_index+1))

        scenes[new_scene.id] = new_scene
        tagged_scene_ids.add_item(new_scene.tags, new_scene.id)


def analyze_all_scenes(_analysis):
    for scene in scenes.values():
        _analysis.analyze_blocks(scene.blocks)
