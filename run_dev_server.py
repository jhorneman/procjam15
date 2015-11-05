# -*- coding: utf-8 -*-

from main.log_utils import init_logging
from main.data import load_data
from main import create_app

init_logging()

data_loaded = load_data()
if data_loaded:
    app = create_app("dev")
    if app:
        app.run(debug=True)
