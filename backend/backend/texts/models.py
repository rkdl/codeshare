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
    def get_random(cls, expire_datetime=None):
        filter_non_expired = {
            '$match': {
                'expire_datetime': {
                    '$gte': datetime.now(),
                    **({'$lte': expire_datetime} if expire_datetime else {}),
                },
            },
        }
        raw_agg_cursor = mongo.db[cls.collection_name].aggregate([
            filter_non_expired,
            {'$sample': {'size': 1}},
        ])
        return next(raw_agg_cursor, None)

    @classmethod
    def get_statistics(cls, user_identifier=None):
        current_datetime = datetime.now()

        stats_counters_agg = {
            '$facet': {
                'available': [
                    {'$match': {'expire_datetime': {'$gt': current_datetime}}},
                    {'$count': 'available'},
                ],
                'expired': [
                    {'$match': {'expire_datetime': {'$lte': current_datetime}}},
                    {'$count': 'expired'},
                ],
                'expire_in_one_day': [
                    {
                        '$match': {
                            'expire_datetime': {
                                '$gt': current_datetime,
                                '$lte': current_datetime + timedelta(days=1),
                            },
                        },
                    },
                    {'$count': 'expire_in_one_day'},
                ],
                'expire_in_one_hour': [
                    {
                        '$match': {
                            'expire_datetime': {
                                '$gt': current_datetime,
                                '$lte': current_datetime + timedelta(hours=1),
                            },
                        },
                    },
                    {'$count': 'expire_in_one_hour'},
                ],
            }
        }

        pipeline = []
        if user_identifier:
            pipeline.append({'$match': {'user_identifier': user_identifier}})
        pipeline.append(stats_counters_agg)

        agg_result = next(mongo.db[cls.collection_name].aggregate(pipeline))
        return {
            field: agg_result[field][0][field] if agg_result[field] else 0
            for field in [
                'available',
                'expired',
                'expire_in_one_day',
                'expire_in_one_hour',
            ]
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
    def create(cls, text, language, expire_datetime, user_identifier):
        assert isinstance(expire_datetime, datetime), 'don\'t mess with dates'

        return mongo.db[cls.collection_name].insert_one({
            'identifier': get_sha1_hash(
                text + str(user_identifier) + str(datetime.now())
            )[0:10],
            'text': text,
            'language': language,
            'expire_datetime': expire_datetime,
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
