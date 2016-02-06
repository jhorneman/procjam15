# -*- coding: utf-8 -*-

import logging
from main.log_utils import init_logging
from main.data_loader import load_data
from main import create_app

init_logging(logging.WARN)

data_loaded = load_data()
if data_loaded:
    application = create_app("heroku")
