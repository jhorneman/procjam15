from flask import render_template, abort
from main.data import get_scene
from main import app


initial_scene_id = 'mess-hall'


@app.context_processor
def inject_common_values():
    return {
        "page_title"       : "Mainframe",
        "page_description" : "A horror IF game for ProcJam 2015",
        "page_authors"     : "Liz England & Jurie Horneman"
    }


@app.route("/")
@app.route("/<scene_id>")
def show_scene(scene_id=initial_scene_id):
    scene = get_scene(scene_id)
    if scene:
        text = scene.desc
        options = scene.options
        return render_template('scene.html', text=text, options=options)
    else:
        abort(404)
