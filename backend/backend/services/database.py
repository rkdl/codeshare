from abc import ABCMeta, abstractmethod

from pymongo import MongoClient
from pymongo.database import Collection, Database


class MetaModel(ABCMeta):
    @abstractmethod
    @property
    def __collection_name__(cls) -> str:
        pass

    @abstractmethod
    @property
    def __db__(cls) -> Database:
        pass

    @property
    def collection(cls) -> Collection:
        return cls.__db__[cls.__collection_name__]


class ClientMaker:
    client: MongoClient
    db: Database

    def init_app(self, app):
        client = MongoClient(app.config['PYMONGO_DATABASE_URI'], connect=False)

        self.client = client
        self.db = client.db


mongo = ClientMaker()
