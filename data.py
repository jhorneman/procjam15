# -*- coding: utf-8 -*-

import sys
import os
import xml.etree.ElementTree as ET


SCRIPT_DIR = os.path.abspath(os.path.dirname(sys.argv[0])) + os.sep

scenes = {}


class Option(object):
    def __init__(self):
        self.action = None
        self.text = ''


class Scene(object):
    def __init__(self):
        self.id = None
        self.desc = ''
        self.short_desc = ''
        self.optionals = []
        self.options = []

    @staticmethod
    def from_text_file(_file):
        new_scene = Scene()

        data = '<text>' + _file.read() + '</text>'
        root = ET.fromstring(data)

        new_scene.id = root.find('meta').get('id')

        new_scene.desc = root.text if root.text is not None else ''
        for child in root:
            if child.tail:
                new_scene.desc += child.tail

        new_scene.short_desc = root.find('repeat').text
        new_scene.optionals.append(root.findall('optional'))

        for option in root.findall('option'):
            new_option = Option()
            new_option.action = option.get('action')
            new_option.text = option.text
            new_scene.options.append(new_option)

        scenes[new_scene.id] = new_scene


def load_data():
    with open(SCRIPT_DIR + 'data/test_scene.txt') as f:
        Scene.from_text_file(f)
