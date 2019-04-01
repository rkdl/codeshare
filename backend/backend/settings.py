class DebugConfig(object):
    DEBUG = True
    SECRET_KEY = 'secret_key'

    PYMONGO_DATABASE_URI = 'mongodb://database:27017'
    FIREBASE_CREDENTIALS = \
        'config/code-editor-f5df0-firebase-adminsdk-byomg-953cd56e88.json'


class ProdConfig(DebugConfig):
    DEBUG = False
