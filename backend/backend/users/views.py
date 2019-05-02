from flask import request

from backend.mongo import mongo
from backend.users import users
from backend.users.models import Users
from backend.helpers import (
    jsonify_error,
    jsonify_ok,
)
from backend.users.helpers import (
    validate_user_information,
    set_cookie_access_token
)


@users.route('/login', methods=['POST'])
def login():
    request_params = request.get_json(force=True)

    service = request_params.get('service')
    identifier = request_params.get('identifier')
    id_token = request_params.get('idToken')

    if not service or not identifier:
        return jsonify_error(error_type='MISSING_REQUIRED_PARAMS')

    if not validate_user_information(service, identifier, id_token):
        return jsonify_error(error_type='ACCESS_DENIED')

    user_document = Users.get_by_service_and_identifier(
        service,
        identifier
    )

    if not user_document:
        result = Users.create(service, identifier)
        inserted_id = result.inserted_id
        user_document = Users.get_by_mongo_id(inserted_id)

    user_id = str(user_document['_id'])
    access_token = user_document['access_token']

    response = jsonify_ok(data={'userId': user_id})
    return set_cookie_access_token(response, access_token)
