from flask import render_template
from app import app

@app.route('/')
def index():
    return "Hello"


@app.route('/fetch')
def fetch():
    return render_template("about.html")




    
