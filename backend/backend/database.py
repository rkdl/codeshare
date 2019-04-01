from pymongo import MongoClient


class db:
    client = {}
    instance = {}

    @classmethod
    def init_app(cls, app):
        client = MongoClient(app.config['PYMONGO_DATABASE_URI'], connect=False)

        cls.client = client
        cls.instance = client['db']
