# -*- coding: utf-8 -*-

import os
import re
import logging
import xml.etree.ElementTree as ET


# DON'T use sys.argv[0] because that makes the path dependent on how the program was started,
# which may be in a different directory.
SCRIPT_DIR = os.path.abspath(os.path.dirname(__file__)) + os.sep

logger = logging.getLogger(__name__)

scene_tag_re = re.compile(r"^\s*<scene", re.IGNORECASE)

scenes = {}
data_files_for_live_reloading = []
counter_per_tag = {}


def get_scene_description(_scene_id):
    return scenes.get(_scene_id, None)


def get_scene_description_with_tag(_tag):
    ids_of_eligible_scenes = [k for k in scenes.keys() if _tag in scenes[k].tags]
    if len(ids_of_eligible_scenes) == 0:
        logger.error("Couldn't find a scene with tag '{0}'.".format(_tag))
        return None

    counter = counter_per_tag.setdefault(_tag, 0)
    scene_id = ids_of_eligible_scenes[counter]
    counter += 1
    if counter >= len(ids_of_eligible_scenes):
        counter = 0
    counter_per_tag[_tag] = counter

    return scenes.get(scene_id)


class Option(object):
    GOTO = 'goto'
    COMPUTER = 'computer-room'
    QUEST = 'quest'
    FOUND_DATA = 'found-data'
    actions = [GOTO, COMPUTER, QUEST, FOUND_DATA]

    def __init__(self):
        self.action = Option.GOTO
        self.text = ""

    @property
    def params(self):
        if self.action == Option.GOTO:
            return {
                'next_scene': self.next_scene
            }
        return {}

    @staticmethod
    def from_el(_el, _index):
        new_option = Option()

        # Get action, if any.
        new_option.action = _el.get("action", Option.GOTO)
        if new_option.action not in Option.actions:
            logger.error("Option {0} has action'{1}' which is not a valid action (those are {2}). Skipping."
                .format(_index, new_option.action, ', '.join(Option.actions)))
            return None

        # GOTO.
        if new_option.action == Option.GOTO:
            # Get next scene.
            new_option.next_scene = _el.get("nextScene")
            if new_option.next_scene is None:
                logger.error("Option {0} has a GOTO action but no next scene attribute. Skipping.".format(_index))
                return None

            # Get text.
            new_option.text = _el.text.strip()
            if new_option.text is None or len(new_option.text) == 0:
                logger.error("Option {0} has a GOTO action but does not contain any text. Skipping.".format(_index))
                return None

        # COMPUTER action.
        elif new_option.action == Option.COMPUTER:
            # Get text.
            new_option.text = _el.text.strip()
            if new_option.text is None or len(new_option.text) == 0:
                logger.error("Option {0} has a GOTO action but does not contain any text. Skipping.".format(_index))
                return None

        return new_option


class Scene(object):
    STANDARD = 'STANDARD'
    types = [STANDARD]

    def __init__(self):
        self.id = None
        self.type = Scene.STANDARD
        self.tags = []
        self.desc = ""
        self.short_desc = ""
        self.options = []


def read_scenes_from_text_file(_file, _scene_name):
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
    for scene_index, scene_el in enumerate(scene_els):
        new_scene = Scene()

        # Find meta element, skip if not found.
        meta_el = scene_el.find("meta")
        if meta_el is not None:
            # Get scene ID, use scene name if not found and there's only one scene, otherwise skip.
            new_scene.id = meta_el.get("id")
            if new_scene.id is None:
                if len(scene_els) == 1:
                    new_scene.id = _scene_name
                else:
                    logger.error("Scene {0} has a meta element without an id attribute. Skipping.".format(scene_index+1))
                    continue

            # Get scene type, if any.
            new_scene.type = meta_el.get("type", Scene.STANDARD)
            if new_scene.type not in Scene.types:
                logger.error("Scene {0} has type '{1}' which is not a valid type (those are {2}). Skipping."
                    .format(scene_index+1, new_scene.type, ', '.join(Scene.types)))
                continue

            # Get scene tags, if any.
            tags = meta_el.get("tags", None)
            if tags:
                new_scene.tags = [tag.strip() for tag in tags.split(",")]
        else:
            if len(scene_els) == 1:
                new_scene.id = _scene_name
                new_scene.type = Scene.STANDARD
            else:
                logger.error("Scene {0} does not contain a meta element. Skipping.".format(scene_index+1))
                continue

        # Build scene description from all texts at the root of the scene element.
        # This includes the tails of child elements.
        new_scene.desc = scene_el.text if scene_el.text is not None else ""
        for child in scene_el:
            if child.tail:
                new_scene.desc += child.tail

        # Get short description, if any.
        # short_desc_el = scene_el.find("repeat")
        # if short_desc_el is not None:
        #     new_scene.short_desc = short_desc_el.text

        # Iterate over all option elements.
        for option_index, option_el in enumerate(scene_el.findall("option")):
            new_option = Option.from_el(option_el, option_index + 1)
            if new_option:
                new_scene.options.append(new_option)

        # if len(new_scene.options) == 0:
        #     # Skip if no option elements were found.
        #     logger.error("Scene {0} does not contain any valid option elements. Skipping.".format(scene_index+1))
        #     continue

        logger.info("Read scene {0}.".format(scene_index+1))
        scenes[new_scene.id] = new_scene


def load_scene_descriptions():
    # Iterate over all files in the scenes directory.
    scenes_dir = os.path.join(SCRIPT_DIR, "data", "scenes")
    for path, dirs, files in os.walk(scenes_dir):
        for filename in files:
            # Skip hidden files and anything not ending in .txt.
            if filename.startswith("."):
                continue
            if not filename.endswith(".txt"):
                continue

            full_path = os.path.join(path, filename)
            scene_name = os.path.splitext(filename)[0]

            # Open the file and read the scenes from it.
            with open(full_path, "r") as f:
                data_files_for_live_reloading.append(full_path)
                logger.info("Reading file {0}...".format(full_path))
                read_scenes_from_text_file(f, scene_name)

    if len(scenes) == 0:
        logger.error("No valid scenes were found in {0}.".format(scenes_dir))
        return False

    return True


def load_data():
    return load_scene_descriptions()


if __name__ == "__main__":
    from log_utils import init_logging
    init_logging()
    load_data()
