from flask import Flask
from warnings import filterwarnings

from backend.settings import get_config

from backend import firebase
from backend.mongo import mongo
from backend.users import users
from backend.texts import texts

filterwarnings('ignore')


def create_app() -> Flask:
    app = Flask(__name__)

    app_config = get_config()
    app.config.from_object(app_config)

    firebase.init_app(app)
    mongo.init_app(app)
    app.register_blueprint(users)
    app.register_blueprint(texts)

    return app
