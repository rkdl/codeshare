from hashlib import sha1

from backend.services.database import mongo


def get_sha1_hash(value: str) -> str:
    return sha1(value.encode()).hexdigest()


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
    def create(cls, service, identifier):
        return mongo.db[cls.collection_name].insert_one({
            'service': service,
            'identifier': identifier,
            'access_token': get_sha1_hash(str(service) + str(identifier))
        })
