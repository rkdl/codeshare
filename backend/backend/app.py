import os
from flask import Flask
from backend.database import db
from backend.users import users
from backend import firebase

CONFIG = os.environ.get('CONFIG', 'Debug')


def create_app():
    app = Flask(__name__)
    app.config.from_object('backend.settings.{}Config'.format(CONFIG))
    db.init_app(app)
    firebase.init_app(app)
    app.register_blueprint(users)
    return app
