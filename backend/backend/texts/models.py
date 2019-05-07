from datetime import datetime, timedelta

from backend.helpers import get_sha1_hash
from backend.mongo import mongo


class Texts:
    collection_name = 'texts'

    @classmethod
    def get_by_mongo_id(cls, id_):
        return mongo.db[cls.collection_name].find_one({
            '_id': id_,
        })

    @classmethod
    def get_random(cls, expire_time):
        filter_non_expired = {
            '$match': {
                'expire_time': {
                    '$gte': datetime.now(),
                    **({'$lte': expire_time} if expire_time else {}),
                },
            },
        }
        raw_agg_cursor = mongo.db[cls.collection_name].aggregate([
            filter_non_expired,
            {'$sample': {'size': 1}},
        ])
        return next(raw_agg_cursor, default=None)

    @classmethod
    def get_statistics_by_user(cls, user_identifier):
        all_texts = mongo.db[cls.collection_name].find({
            user_identifier: user_identifier
        })

        available = 0
        expired = 0
        expired_hour = 0
        expired_day = 0
        for text in all_texts:
            if text['expire_time'] > datetime.now():
                available += 1
                if text['expire_time'] <= datetime.now() + timedelta(hours=1):
                    expired_hour += 1
                if text['expire_time'] <= datetime.now() + timedelta(days=1):
                    expired_day += 1
            else:
                expired += 1

        return {
            "available": available,
            "expired": expired,
            "expired_hour": expired_hour,
            "expired_day": expired_day
        }

    @classmethod
    def get_by_identifier(cls, identifier):
        return mongo.db[cls.collection_name].find_one({
            'identifier': identifier
        })

    @classmethod
    def get_all_by_user_identifier(cls, user_identifier):
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
