# -*- coding: utf-8 -*-

import sys
import logging


class StdoutHandler(logging.StreamHandler):
    def __init__(self):
        super(StdoutHandler, self).__init__(sys.stdout)

    def emit(self, record):
        super(StdoutHandler, self).emit(record)
        super(StdoutHandler, self).flush()


handler = StdoutHandler()


def set_up_logging(_app, _level=logging.INFO):
    handler.setLevel(_level)
    handler.setFormatter(logging.Formatter('%(message)s'))
    _app.logger.setLevel(_level)
    _app.logger.addHandler(handler)


def add_logger(_logger, _level=logging.INFO):
    _logger.setLevel(_level)
    _logger.addHandler(handler)


def set_up_console_logging(_logger):
    _logger.setLevel(logging.INFO)
    console = logging.StreamHandler()
    formatter = logging.Formatter("%(levelname)s: %(message)s")
    console.setFormatter(formatter)
    _logger.addHandler(console)
