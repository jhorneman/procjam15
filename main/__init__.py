# -*- coding: utf-8 -*-

import os
import logging
from flask import Flask
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

    # Production run mode.
    elif _run_mode == "heroku":
        # Get port number from Heroku environment variable.
        app.config['PORT_NR'] = int(os.environ['PORT'])
        app.config["DEBUG"] = False

        init_stdout_handler()
        set_up_logger(app.logger)

    # Unrecognized run mode.
    else:
        logging.error("Did not recognize run mode '%s'" % _run_mode)
        return None

    # Import the views, to apply the decorators which use the global app object.
    import main.views

    return app
