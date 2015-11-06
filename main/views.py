from flask import render_template, abort, redirect, url_for
from main.logic import get_scene_data, restart
from main import app


@app.context_processor
def inject_common_values():
    return {
        "page_title"       : "Mainframe",
        "page_description" : "A horror IF game for ProcJam 2015",
        "page_authors"     : "Liz England & Jurie Horneman"
    }


@app.route("/")
def show_scene():
    scene_data = get_scene_data()
    if scene_data:
        return render_template("scene.html", **scene_data)
    else:
        abort(404)


@app.route("/restart")
def restart_game():
    restart()
    return redirect(url_for("show_scene"))
