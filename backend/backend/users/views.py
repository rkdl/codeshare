from flask import request, jsonify
from backend.users import users
from backend.users.models import Users
from backend.helpers import (
    OK_RESPONSE,
    ERROR_RESPONSE
)
from backend.users.helpers import (
    verify_firebase_id_token,
    set_cookie_access_token
)


@users.route('/login', methods=['POST'])
def login():
    request_params = request.get_json(force=True)

    service = request_params.get('service')
    identifier = request_params.get('identifier')
    id_token = request_params.get('idToken')

    if not service or not identifier:
        return ERROR_RESPONSE(errorType='MISSING_REQUIRED_PARAMS')

    id_token_information = verify_firebase_id_token(id_token)
    if not id_token_information or \
            id_token_information['firebase']['identities'][service][0] != identifier:
        return ERROR_RESPONSE(errorType='ACCESS_DENIED')

    user_document = Users.get_by_service_and_identifier(
        service,
        identifier
    )

    if not user_document:
        user_document = Users.create(service, identifier)

    user_id = str(user_document['_id'])
    access_token = user_document['access_token']

    return set_cookie_access_token(
        OK_RESPONSE(data={'userId': user_id}),
        access_token
    )
