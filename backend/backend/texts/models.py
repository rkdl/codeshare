from backend.helpers import get_sha1_hash
from backend.mongo import mongo
from datetime import datetime
import random

class Texts:
    collection_name = 'texts'

    @classmethod
    def get_by_mongo_id(cls, id):
        return mongo.db[cls.collection_name].find_one({
            '_id': id
        })

    @classmethod
    def get_random(cls, will_expired):
        all = mongo.db[cls.collection_name].find()
        # all = [{'name':'lol', 'expire_time': datetime.today()},
        #         {'name':'kek', 'expire_time': None },
        #        {'name':'cheburek', 'expire_time': datetime.today()},
        #        {'name':'memasi', 'expire_time': None}]

        random.shuffle(all)

        for x in all:
            if will_expired == "True":
                if x['expire_time']:
                    if x['expire_time'] >= datetime.now():
                        return x
            else:
                if not x['expire_time']:
                    return x

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
