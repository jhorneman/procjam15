# -*- coding: utf-8 -*-


import logging
from data_loader import load_data
from game_state import get_initial_variable_names
from scene import analyze_all_scenes
from text_blocks import analyze_all_text_blocks


logger = logging.getLogger(__name__)


class StaticAnalysis(object):
    def __init__(self):
        self.read_variables = set()
        self.mutated_variables = set(get_initial_variable_names())

    def analyze_blocks(self, _blocks):
        for block in _blocks:
            block_result = block.analyze()
            for var in block_result.get("readVariables", []):
                self.read_variables.add(var)
            for var in block_result.get("mutatedVariables", []):
                self.mutated_variables.add(var)

    def get_read_variables(self):
        return list(self.read_variables)

    def get_mutated_variables(self):
        return list(self.mutated_variables)

    def get_read_but_not_mutated_variables(self):
        return list(self.read_variables.difference(self.mutated_variables))

    def get_mutated_but_not_read_variables(self):
        return list(self.mutated_variables.difference(self.read_variables))


if __name__ == "__main__":
    from log_utils import init_logging
    init_logging(logging.INFO)
    load_data()

    analysis = StaticAnalysis()
    analyze_all_scenes(analysis)
    analyze_all_text_blocks(analysis)

    print "Variables that are read from:"
    for variable_name in analysis.get_read_variables():
        print variable_name
    print

    print "Variables that are written to:"
    for variable_name in analysis.get_mutated_variables():
        print variable_name
    print

    print "Variables that are read from but not written to:"
    for variable_name in analysis.get_read_but_not_mutated_variables():
        print variable_name
    print

    print "Variables that are written to but not read from:"
    for variable_name in analysis.get_mutated_but_not_read_variables():
        print variable_name
    print
