from backend.helpers import get_sha1_hash
from backend.mongo import mongo
from datetime import datetime
from random import sample

class Texts:
    collection_name = 'texts'

    @classmethod
    def get_by_mongo_id(cls, id):
        return mongo.db[cls.collection_name].find_one({
            '_id': id
        })

    @classmethod
    def get_random(cls, expire_time):
        all_texts = mongo.db[cls.collection_name].find()

        filter_text_documents = lambda text_document: \
            text_document['expire_time'] >= datetime.now() \
                and (expire_time or text_document['expire_time'] <= expire_time)

        filtered_texts = list(filter(filter_text_documents, all_texts))
        return sample(filtered_texts, 1)[0]

 

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
