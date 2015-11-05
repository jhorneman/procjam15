# -*- coding: utf-8 -*-

from main.log_utils import init_logging
from main.data import load_data, data_files_for_live_reloading
from main import create_app

init_logging()

data_loaded = load_data()
if data_loaded:
    app = create_app("dev")
    if app:
        app.run(extra_files=data_files_for_live_reloading, debug=True)
