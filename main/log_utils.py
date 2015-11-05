# -*- coding: utf-8 -*-

import sys
import logging


console_handler = None
stdout_handler = None


class StdoutHandler(logging.StreamHandler):
    def __init__(self):
        super(StdoutHandler, self).__init__(sys.stdout)

    def emit(self, record):
        super(StdoutHandler, self).emit(record)
        super(StdoutHandler, self).flush()


def init_logging():
    # Log warnings.
    logging.captureWarnings(True)

    # Set up the console handler.
    global console_handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(logging.Formatter('%(message)s',
                                                    datefmt="%H:%M:%S"))

    # Set up the root logger.
    set_up_logger(logging.getLogger())


def init_stdout_handler():
    global stdout_handler
    if stdout_handler:
        return

    # Set up the stdout handler.
    stdout_handler = StdoutHandler()
    stdout_handler.setLevel(logging.INFO)
    stdout_handler.setFormatter(logging.Formatter('%(message)s'))

    # Set up the root logger.
    set_up_logger(logging.getLogger())


def set_up_logger(_logger, _level=logging.DEBUG):
    _logger.setLevel(_level)

    global console_handler
    if console_handler:
        _logger.addHandler(console_handler)

    global stdout_handler
    if stdout_handler:
        _logger.addHandler(stdout_handler)
