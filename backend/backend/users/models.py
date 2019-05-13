from backend.mongo import mongo
from backend.helpers import get_sha1_hash


class Users:
    collection_name = 'users'

    @classmethod
    def get_by_service_and_identifier(cls, service, identifier):
        return mongo.db[cls.collection_name].find_one({
            'service': service,
            'identifier': identifier
        })

    @classmethod
    def get_by_access_token(cls, access_token):
        return mongo.db[cls.collection_name].find_one({
            'access_token': access_token
        })

    @classmethod
    def get_by_mongo_id(cls, id):
        return mongo.db[cls.collection_name].find_one({
            '_id': id
        })

    @classmethod
    def create(cls, service, identifier):
        return mongo.db[cls.collection_name].insert_one({
            'service': service,
            'identifier': identifier,
            'access_token': get_sha1_hash(str(service) + str(identifier))
        })
