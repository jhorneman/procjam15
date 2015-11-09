# -*- coding: utf-8 -*-

import os
import logging
from scene import get_nr_scenes, read_scenes_from_text_file


# DON'T use sys.argv[0] because that makes the path dependent on how the program was started,
# which may be in a different directory.
SCRIPT_DIR = os.path.abspath(os.path.dirname(__file__)) + os.sep

logger = logging.getLogger(__name__)

data_files_for_live_reloading = []


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
                # logger.info("Reading file {0}...".format(full_path))
                read_scenes_from_text_file(f, scene_name)

    if get_nr_scenes() == 0:
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
