from pymongo import MongoClient
from pymongo.database import Database as _Database


class Database:
    client: MongoClient
    db: _Database

    def init_app(self, app):
        client = MongoClient(app.config['PYMONGO_DATABASE_URI'], connect=False)

        self.client = client
        self.db = client.db


mongo = Database()
