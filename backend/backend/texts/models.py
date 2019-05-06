from backend.helpers import get_sha1_hash
from backend.mongo import mongo
from datetime import datetime
from random import shuffle

class Texts:
    collection_name = 'texts'

    @classmethod
    def get_by_mongo_id(cls, id):
        return mongo.db[cls.collection_name].find_one({
            '_id': id
        })

    @classmethod
    def get_random(cls, will_expire):
        all_texts = mongo.db[cls.collection_name].find()

        shuffle(all_texts)

        for text_document in all_texts:
            if will_expire:
                if text_document['expire_time']:
                    if text_document['expire_time'] >= datetime.now():
                        return text_document
            else:
                if not text_document['expire_time']:
                    return text_document
        
        return None

 

    @classmethod
    def get_by_identifier(cls, identifier):
        return mongo.db[cls.collection_name].find_one({
            'identifier': identifier
        })

    @classmethod
    def get_all_by_user_itentifier(cls, user_identifier):
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
