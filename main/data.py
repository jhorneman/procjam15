# -*- coding: utf-8 -*-

import os
import re
import logging
import xml.etree.ElementTree as ET
import operator
import random


# DON'T use sys.argv[0] because that makes the path dependent on how the program was started,
# which may be in a different directory.
SCRIPT_DIR = os.path.abspath(os.path.dirname(__file__)) + os.sep

logger = logging.getLogger(__name__)
logger.setLevel(logging.WARNING)

scene_tag_re = re.compile(r"^\s*<scene", re.IGNORECASE)
scene_id_re = re.compile(r"^[a-zA-Z0-9-_ ]*$")

scenes = {}
data_files_for_live_reloading = []
counter_per_tag = {}


def get_scene_description(_scene_id):
    return scenes.get(_scene_id, None)


def tags_are_matched(_desired_tags, _available_tags):
    for desired_tag in _desired_tags:
        if desired_tag not in _available_tags:
            return False
    return True


def get_scene_description_with_tag(_tags, _state):
    tags = []
    for tag in _tags:
        if tag.startswith("$"):
            variable_name = tag[1:]
            if variable_name in _state:
                tag = _state[variable_name]
            else:
                logger.error("Could not find a state variable named '{0}'. Skipping.".format(variable_name))
                continue
        tags.append(tag)

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


def string_to_tags(_tags_as_string):
    if _tags_as_string is None:
        return []
    return [tag.strip() for tag in _tags_as_string.split(",")]


def get_parameter_value(_state, _param):
    if _param.startswith("$"):
        variable_name = _param[1:]
        if variable_name in _state:
            return _state[variable_name]
        else:
            logger.error("Could not find a state variable named '{0}' - using 0 instead.".format(variable_name))
            return 0

    if _param.lower() == "random":
        return random.randint(0, 100)

    if _param.lower() == "true":
        return True

    if _param.lower() == "false":
        return False

    try:
        value = int(_param)
    except ValueError:
        value = _param

    return value


class Condition(object):
    NOOP = "noop"
    ISTRUE = "istrue"
    NOT = "not"
    EQ = "eq"
    NEQ = "neq"
    GT = "gt"
    LT = "lt"
    GTEQ = "gteq"
    LTEQ = "lteq"

    operators = {
        NOT: operator.not_,
        EQ: operator.eq,
        NEQ: operator.ne,
        GT: operator.gt,
        LT: operator.lt,
        GTEQ: operator.ge,
        LTEQ: operator.le
    }

    not_token = ["not"]
    binary_operator_tokens = {
        EQ: ["is", "eq", "=="],
        NEQ: ["neq", "!="],
        GT: ["gt"],
        LT: ["lt"],
        GTEQ: ["gteq"],
        LTEQ: ["lteq"]
    }

    def __init__(self):
        self.param1 = None
        self.param2 = None
        self.operator = Condition.NOOP

    def evaluate(self, _state):
        if self.operator == Condition.NOOP:
            return True

        if self.operator == Condition.ISTRUE:
            return bool(get_parameter_value(_state, self.param1))

        elif self.operator == Condition.NOT:
            value1 = get_parameter_value(_state, self.param1)
            return Condition.operators[self.operator](bool(value1))

        else:
            value1 = get_parameter_value(_state, self.param1)
            value2 = get_parameter_value(_state, self.param2)
            return Condition.operators[self.operator](value1, value2)

    @staticmethod
    def parse_string(_string):
        parsed_tokens = [token.strip() for token in _string.split()]

        new_condition = None

        if len(parsed_tokens) == 1:
            new_condition = Condition()
            new_condition.param1 = parsed_tokens[0]
            new_condition.operator = Condition.ISTRUE

        elif len(parsed_tokens) == 2:
            if parsed_tokens[0].lower() in Condition.not_token:
                new_condition = Condition()
                new_condition.param1 = parsed_tokens[1]
                new_condition.operator = Condition.NOT
            else:
                logger.error("Couldn't parse condition '{0}' - it should be a NOT operator but isn't.".format(_string))

        elif len(parsed_tokens) == 3:
            parsed_operator = parsed_tokens[1].lower()
            for op, tokens in Condition.binary_operator_tokens.items():
                if parsed_operator in tokens:
                    new_condition = Condition()
                    new_condition.param1 = parsed_tokens[0]
                    new_condition.param2 = parsed_tokens[2]
                    new_condition.operator = op
                    break

            if new_condition is None:
                logger.error("Couldn't parse condition '{0}' - didn't recognize operator.".format(_string))

        else:
            logger.error("Couldn't parse condition '{0}'.".format(_string))

        return new_condition


class Option(object):
    GOTO = "goto"
    COMPUTER = "computer-room"
    MISSION = "mission"
    FOUND_DATA = "found-data"
    actions = [GOTO, COMPUTER, MISSION, FOUND_DATA]

    def __init__(self):
        self.action = Option.GOTO
        self.text = ""
        self.condition = None
        self.next_scene = ""
        self.tags = []

    @property
    def params(self):
        if self.action == Option.GOTO:
            return {
                "next_scene": self.next_scene,
                "tags": self.tags
            }
        return {}

    @staticmethod
    def from_el(_el, _index):
        new_option = Option()

        # Get action, if any.
        new_option.action = _el.get("action", Option.GOTO)
        if new_option.action not in Option.actions:
            logger.error("Option {0} has action'{1}' which is not a valid action (those are {2}). Skipping."
                .format(_index, new_option.action, ", ".join(Option.actions)))
            return None

        # GOTO.
        if new_option.action == Option.GOTO:
            # Get next scene and tags.
            new_option.next_scene = _el.get("nextScene")
            new_option.tags = string_to_tags(_el.get("tags"))

            if new_option.next_scene is None and new_option.tags is None:
                logger.error("Option {0} has a GOTO action but neither a next scene nor tag attributes. Skipping.".format(_index))
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
                logger.error("Option {0} has a COMPUTER action but does not contain any text. Skipping.".format(_index))
                return None

        # Parse condition, if any.
        condition_string = _el.get("cond")
        if condition_string:
            condition = Condition.parse_string(condition_string)
            if condition:
                new_option.condition = condition

        return new_option


class Scene(object):
    STANDARD = "STANDARD"
    types = [STANDARD]

    def __init__(self):
        self.id = None
        self.type = Scene.STANDARD
        self.tags = []
        self.text_blocks = []
        self.options = []
        self.leadin = None
        self.injected_options = []

    def build_main_text(self, _state):
        text = ""
        for text_block in self.text_blocks:
            if text_block[0] == "raw":
                text += text_block[1]
            elif text_block[0] == "text":
                if text_block[2].evaluate(_state):
                    text += text_block[1]
            elif text_block[0] == "inject":
                text += "[injected text for tags {0}]".format(text_block[1])
            elif text_block[0] == "br":
                text += "<br/>"
            else:
                logger.error("Unknown text block type '{0}'.".format(text_block[0]))
        return text


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

        # Find meta element.
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
            else:
                new_scene.id = new_scene.id.strip()
                if not scene_id_re.match(new_scene.id):
                    logger.error("Scene {0} has an invalid id '{1}'. Scene ids must consist of letters, underscores, hyphens, spaces, and numbers. Skipping.".format(scene_index+1, new_scene.id))
                    continue

            # Get scene type, if any.
            new_scene.type = meta_el.get("type", Scene.STANDARD)
            if new_scene.type not in Scene.types:
                logger.error("Scene {0} has type '{1}' which is not a valid type (those are {2}). Skipping."
                    .format(scene_index+1, new_scene.type, ", ".join(Scene.types)))
                continue

            # Get scene tags, if any.
            tags = meta_el.get("tags", None)
            if tags:
                new_scene.tags = string_to_tags(tags)
        else:
            if len(scene_els) == 1:
                new_scene.id = _scene_name
                new_scene.type = Scene.STANDARD
            else:
                logger.error("Scene {0} does not contain a meta element. Skipping.".format(scene_index+1))
                continue

        if new_scene.id in scenes:
            logger.error("Scene {0} has id {1} which already exists. Skipping.".format(scene_index+1, new_scene.id))
            continue

        # Build scene description from all texts at the root of the scene element.
        # This includes the tails of child elements.
        if scene_el.text:
            new_scene.text_blocks.append(("raw", scene_el.text))

        for child_el in scene_el:
            if child_el.tag == "text":
                condition_string = child_el.get("cond")
                if condition_string:
                    condition = Condition.parse_string(condition_string)
                    if condition:
                        new_scene.text_blocks.append(("text", child_el.text, condition))
                else:
                    logger.error("Scene {0} contains a conditional text block without a condition. Skipping.".format(scene_index+1))

            elif child_el.tag == "injectText":
                tags_string = child_el.get("tags")
                if tags_string:
                    tags = string_to_tags(tags_string)
                    if len(tags) > 0:
                        new_scene.text_blocks.append(("inject", tags))
                    else:
                        logger.error("Scene {0} contains an injected text block with empty tags. Skipping.".format(scene_index+1))
                else:
                    logger.error("Scene {0} contains an injected text block without tags. Skipping.".format(scene_index+1))

            elif child_el.tag == 'br':
                new_scene.text_blocks.append(("br",))

            if child_el.tail:
                new_scene.text_blocks.append(("raw", child_el.tail))

        # Get leadin, if any.
        leadin_el = scene_el.find("leadin")
        if leadin_el is not None:
            new_scene.leadin = leadin_el.text

        # Get injected options, if any.
        for injected_option_index, injected_option_el in enumerate(scene_el.findall("injectOption")):
            tags_string = injected_option_el.get("tags", None)
            if tags_string:
                tags = string_to_tags(tags_string)
                if len(tags) > 0:
                    new_scene.injected_options.append(tags)
                else:
                    logger.error("Scene {0} contains an injected option {1} with empty tags. Skipping.".format(scene_index+1, injected_option_index+1))
            else:
                logger.error("Scene {0} contains an injected option {1} without tags. Skipping.".format(scene_index+1, injected_option_index+1))
                continue

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
    logger.setLevel(logging.INFO)
    init_logging()
    load_data()
