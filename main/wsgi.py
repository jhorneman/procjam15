# -*- coding: utf-8 -*-

import logging
from main.log_utils import init_logging
from main.data import load_data
from main import create_app

init_logging(logging.WARN)

data_loaded = load_data()
if data_loaded:
    app = create_app("heroku")
    if app:
        app.run(port=app.config["PORT_NR"], host="0.0.0.0", debug=app.debug)
