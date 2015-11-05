# -*- coding: utf-8 -*-

from main.data import load_data
from main import create_app

data_loaded = load_data()
if data_loaded:
    app = create_app("dev")
    if app:
        app.run(debug=True)
