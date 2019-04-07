from flask import Flask

from backend.services import firebase
from backend.services.database import mongo
from backend.settings import get_config

# blueprints
from backend.users import users


def create_app() -> Flask:
    app = Flask(__name__)
    conf = get_config()
    app.config.from_object(conf)
    mongo.init_app(app)
    firebase.init_app(app)
    app.register_blueprint(users)
    return app
