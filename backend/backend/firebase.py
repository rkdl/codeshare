import firebase_admin
from firebase_admin import credentials


def init_app(app):
    credential = credentials.Certificate(app.config['FIREBASE_CREDENTIALS'])
    firebase_admin.initialize_app(credential)
