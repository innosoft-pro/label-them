# views.py

from flask import render_template
from flask import send_file

from app import app

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/about')
def about():
    return render_template("about.html")



@app.route('/get_image')
def get_image():
    filename = 'dataset/image.jpg'
    return send_file(filename, mimetype='image/jpeg')
