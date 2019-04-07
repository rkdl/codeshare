from pymongo import MongoClient
from pymongo.database import Database


class ClientMaker:
    client: MongoClient
    db: Database

    def init_app(self, app):
        client = MongoClient(app.config['PYMONGO_DATABASE_URI'], connect=False)

        self.client = client
        self.db = client.db


mongo = ClientMaker()
