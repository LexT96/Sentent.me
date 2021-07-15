from flask import render_template

from app import app

@app.route('/')
def index():
    return "Hello"


@app.route('/about')
def about():
    return render_template("about.html")