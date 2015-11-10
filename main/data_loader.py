# -*- coding: utf-8 -*-

import os
import logging
import xlrd
from xlrd.sheet import ctype_text
from scene import get_nr_scenes, read_scenes_from_text_file
from text_blocks import register_text_blocks


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
                logger.debug("Reading file {0}...".format(full_path))
                read_scenes_from_text_file(f, scene_name)

    if get_nr_scenes() == 0:
        logger.error("No valid scenes were found in {0}.".format(scenes_dir))
        return False

    return True


def get_string_from_excel_cell(_xl_sheet, _row_index, _column_index):
    cell_obj = _xl_sheet.cell(_row_index, _column_index)
    cell_type_str = ctype_text.get(cell_obj.ctype, "unknown type")
    if cell_type_str == "text":
        return cell_obj.value.strip()
    else:
        return ""


def extract_tagged_texts_from_excel_file(_excel_full_path):
    data_files_for_live_reloading.append(_excel_full_path)

    # Open the workbook.
    xl_workbook = xlrd.open_workbook(_excel_full_path)

    # Iterate over the worksheets.
    for sheet_name in xl_workbook.sheet_names():
        xl_sheet = xl_workbook.sheet_by_name(sheet_name)

        # Skip the current worksheet if it's empty.
        if xl_sheet.nrows == 0:
            continue

        # Determine which columns contain tags and which contain text.
        tag_column_indices = []
        text_column_indices = []

        for column_index in range(xl_sheet.ncols):
            cell_value = get_string_from_excel_cell(xl_sheet, 0, column_index)
            if len(cell_value) > 0:
                if cell_value == "tag":
                    tag_column_indices.append(column_index)
                else:
                    text_column_indices.append((column_index, cell_value))

        if len(tag_column_indices) == 0:
            logger.error("Couldn't find any 'tag' columns in sheet {0} of Excel file {1}. Skipping sheet.".format(sheet_name, _excel_full_path))
            continue
        if len(text_column_indices) == 0:
            logger.error("Couldn't find any text columns in sheet {0} of Excel file {1}. Skipping sheet.".format(sheet_name, _excel_full_path))
            continue

        # Read texts.
        for row_index in range(1, xl_sheet.nrows):
            tags = []
            for tag_column_index in tag_column_indices:
                tag = get_string_from_excel_cell(xl_sheet, row_index, tag_column_index)
                if len(tag) > 0:
                    tags.append(tag)

            if len(tags) == 0:
                logger.error("No tags in row {0} of sheet {1} of Excel file {2}. Skipping row.".format(row_index+1, sheet_name, _excel_full_path))
                continue

            texts = {}
            for text_column_index, text_column_name in text_column_indices:
                text = get_string_from_excel_cell(xl_sheet, row_index, text_column_index)
                texts[text_column_name] = text

            yield tags, texts


def load_data():
    success = load_scene_descriptions()
    if not success:
        return False

    texts_dir = os.path.join(SCRIPT_DIR, "data", "texts")

    text_blocks = []
    for text_block in extract_tagged_texts_from_excel_file(os.path.join(texts_dir, "text_blocks.xls")):
        text_blocks.append(text_block)
    register_text_blocks(text_blocks)

    return True


if __name__ == "__main__":
    from log_utils import init_logging
    init_logging(logging.DEBUG)
    load_data()
