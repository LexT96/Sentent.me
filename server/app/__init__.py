from flask import Flask
from flask_pymongo import PyMongo
from flask_apscheduler import APScheduler
from datetime import datetime

# initialize app
app = Flask(__name__, instance_relative_config=True)

# handle routes
from app.routes import main
from app.jobs import fetchCronjob

# cron settings
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.add_job(id="fetchJob",func=fetchCronjob.fetchJob, trigger="cron", hour=6)
scheduler.start()

# apply config
app.config.from_object('config')

