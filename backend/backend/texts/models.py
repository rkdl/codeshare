from backend.helpers import get_sha1_hash
from backend.mongo import mongo
from datetime import datetime


class Texts:
    collection_name = 'texts'

    @classmethod
    def get_by_mongo_id(cls, id):
        return mongo.db[cls.collection_name].find_one({
            '_id': id
        })

    @classmethod
    def get_by_identifier(cls, identifier):
        return mongo.db[cls.collection_name].find_one({
            'identifier': identifier
        })

    @classmethod
    def get_all(cls, user_identifier):
        return mongo.db[cls.collection_name].find({
            'user_identifier': user_identifier
        })

    @classmethod
    def create(cls, text, language, expire_time, user_identifier):
        return mongo.db[cls.collection_name].insert_one({
            'identifier': get_sha1_hash(
                text + str(user_identifier) + str(datetime.now())
            )[0:10],
            'text': text,
            'language': language,
            'expire_time': expire_time,
            'user_identifier': user_identifier,
        })

    @classmethod
    def update(cls, filter_, new_document):
        return mongo.db[cls.collection_name].update_one(filter_, {
            '$set': new_document
        })

    @classmethod
    def delete(cls, filter_):
        return mongo.db[cls.collection_name].delete_one(filter_)
