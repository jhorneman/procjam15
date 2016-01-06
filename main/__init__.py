# -*- coding: utf-8 -*-

import os
import logging
from flask import Flask
from jinja_filters import set_up_jinja_filters
from log_utils import init_stdout_handler, set_up_logger


app = None


def create_app(_run_mode=None):
    # Create Flask app.
    global app
    base_dir = os.path.dirname(os.path.abspath(__file__))
    template_dir = os.path.join(base_dir, 'templates')
    static_dir = os.path.join(base_dir, 'static')
    app = Flask("procjam15", template_folder=template_dir, static_folder=static_dir)

    # Dev run mode.
    if _run_mode == "dev":
        app.config["DEBUG"] = True
        app.config["SECRET_KEY"] = "WeDontCareAboutSecretsInDev"

    # Heroku run mode.
    elif _run_mode == "heroku":
        # Get port number and secret key from Heroku environment variable.
        app.config["PORT_NR"] = int(os.environ["PORT"])
        app.config["SECRET_KEY"] = os.environ["FLASK_SECRET_KEY"]
        app.config["DEBUG"] = False

        init_stdout_handler()
        set_up_logger(app.logger)

    # Dreamhost run mode.
    elif _run_mode == "dreamhost":
        # Get port number and secret key from Heroku environment variable.
        app.config["SECRET_KEY"] = os.environ["FLASK_SECRET_KEY"]
        app.config["DEBUG"] = False

        init_stdout_handler()
        set_up_logger(app.logger)

    # Unrecognized run mode.
    else:
        logging.error("Did not recognize run mode '%s'." % _run_mode)
        return None

    app.debug = app.config["DEBUG"]

    # Import the views, to apply the decorators which use the global app object.
    import main.views

    # Set up Jinja 2 filters.
    set_up_jinja_filters(app)

    return app
