from flask import Flask, render_template, abort
from data import load_data, scenes


initial_scene_id = 'mess-hall'

app = Flask(__name__)


@app.context_processor
def inject_common_values():
    return {
        "page_title"       : "Mainframe",
        "page_description" : "A horror IF game for ProcJam 2015",
        "page_authors"     : "Liz England & Jurie Horneman"
    }


@app.route("/")
@app.route("/<scene_name>")
def show_scene(scene_name=initial_scene_id):
    if scene_name in scenes:
        scene = scenes[scene_name]
        text = scene.desc
        options = scene.options
        return render_template('scene.html', text=text, options=options)
    else:
        abort(404)


if __name__ == '__main__':
    load_data()
    app.run(debug=True)
