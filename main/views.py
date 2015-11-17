import types
from flask import render_template, abort, redirect, url_for, session
from main.logic import get_current_scene_data
from game_state import restart, get_game_state_vars
from main import app


@app.context_processor
def inject_common_values():
    return {
        "game_state": get_game_state_vars(),
        "debug": app.config["DEBUG"]
    }


@app.route("/")
def show_scene():
    scene_data = get_current_scene_data()
    if scene_data:
        if isinstance(scene_data, types.DictionaryType):
            return render_template("scene.html", **scene_data)
        if isinstance(scene_data, types.StringTypes):
            return render_template("error.html", error=scene_data), 500
    abort(500)


@app.route("/restart")
def restart_game():
    restart()
    return redirect(url_for("show_scene"))


@app.route("/about")
def about():
    return render_template("about.html")


@app.errorhandler(500)
def server_error(error):
    return render_template("error.html", error=error), 500


@app.errorhandler(404)
def page_not_found(error):
    return render_template("error.html", error=error), 404
