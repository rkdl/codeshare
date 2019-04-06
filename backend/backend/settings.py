import os
import typing as t

DEFAULT_CONFIG = 'Debug'
CONFIG_TYPE: str = os.environ.get('CONFIG', DEFAULT_CONFIG)


class DebugConfig:
    DEBUG = True
    SECRET_KEY = 'secret_key'

    PYMONGO_DATABASE_URI = 'mongodb://database:27017'
    FIREBASE_CREDENTIALS = \
        'config/code-editor-f5df0-firebase-adminsdk-byomg-953cd56e88.json'


class ProdConfig(DebugConfig):
    DEBUG = False


CONFIG_MAP = {
    'Debug': DebugConfig,
    'Prod': ProdConfig,
}


def get_config() -> t.Type[t.Union[DebugConfig, ProdConfig]]:
    return CONFIG_MAP[CONFIG_TYPE]
