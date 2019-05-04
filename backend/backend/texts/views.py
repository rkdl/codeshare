from flask import request
from datetime import datetime
from backend.mongo import mongo
from backend.texts import texts
from backend.texts.models import Texts
from backend.users.models import Users
from backend.texts.helpers import prepare_text_document_structure
from backend.helpers import (
    jsonify_error,
    jsonify_ok,
)


@texts.route('/create', methods=['POST'])
def create():
    request_params = request.get_json(force=True)
    text = request_params.get('text')
    language = request_params.get('language')
    expire_time = request_params.get('expireTime')

    if not text or not language or not expire_time:
        return jsonify_error(error_type='MISSING_REQUIRED_PARAMS')

    access_token = request.cookies.get('access_token')
    user_identifier = None
    if access_token:
        user_document = Users.get_by_access_token(access_token)
        if not user_document:
            return jsonify_error(error_type='USER_NOT_FOUND')

        user_identifier = user_document['identifier']

    result = Texts.create(text, language, expire_time, user_identifier)
    inserted_id = result.inserted_id
    text_document = Texts.get_by_mongo_id(inserted_id)

    return jsonify_ok(data={
        'identifier': text_document['identifier']
    })


@texts.route('/all', methods=['POST'])
def read_all():
    access_token = request.cookies.get('access_token')
    user_identifier = None
    if access_token:
        user_document = Users.get_by_access_token(access_token)
        if not user_document:
            return jsonify_error(error_type='USER_NOT_FOUND')

        user_identifier = user_document['identifier']

    all_texts = Texts.get_all(user_identifier)
    result = None
    for text in all_texts:
        if text['expire_time'] > datetime.now():
            result.append(text)

    return jsonify_ok(
        data=prepare_text_document_structure(result)
    )

@texts.route('/random', methods=['POST'])
def get_random():
    request_params = request.get_json(force=True)
    will_expire = request_params.get('will_expire')

    return jsonify_ok(Texts.get_random(will_expire))


@texts.route('/read', methods=['POST'])
def read():
    request_params = request.get_json(force=True)
    identifier = request_params.get('identifier')
    if not identifier:
        return jsonify_error(error_type='MISSING_REQUIRED_PARAMS')

    text_document = Texts.get_by_identifier(identifier)

    if text_document['expire_time'] < datetime.now():
        return jsonify_error(error_type='TEXT_IS_EXPIRED')

    if not text_document:
        return jsonify_error(error_type='TEXT_NOT_FOUND')

    return jsonify_ok(
        data=prepare_text_document_structure(text_document)
    )

@texts.route('/update', methods=['POST'])
def update():
    request_params = request.get_json(force=True)

    text = request_params.get('text')
    language = request_params.get('language')
    expire_time = request_params.get('expireTime')
    identifier = request_params.get('identifier')

    if not text or not language or not expire_time:
        return jsonify_error(error_type='MISSING_REQUIRED_PARAMS')

    text_document = Texts.get_by_identifier(identifier)

    if not text_document:
        return jsonify_error(error_type='TEXT_NOT_FOUND')


    if text_document['expire_time'] < datetime.now():
        return jsonify_error(error_type='TEXT_IS_EXPIRED')

    if text_document['user_identifier']:
        access_token = request.cookies.get('access_token')
        user_document = Users.get_by_access_token(access_token)
        if not user_document:
            return jsonify_error(error_type='USER_NOT_FOUND')

        user_identifier = user_document['identifier']
        if text_document['user_identifier'] != user_identifier:
            return jsonify_error(error_type='ACCESS_DENIED')

    text_document['text'] = text
    text_document['language'] = language
    text_document['expire_time'] = expire_time
    Texts.update(
        {'identifier': text_document['identifier']},
        text_document
    )

    return jsonify_ok(data=None)


@texts.route('/delete', methods=['POST'])
def delete():
    request_params = request.get_json(force=True)
    identifier = request_params.get('identifier')
    text_document = Texts.get_by_identifier(identifier)
    if not text_document:
        return jsonify_error(error_type='TEXT_NOT_FOUND')

    if text_document['user_identifier']:
        access_token = request.cookies.get('access_token')
        user_document = Users.get_by_access_token(access_token)
        if not user_document:
            return jsonify_error(error_type='USER_NOT_FOUND')

        user_identifier = user_document['identifier']
        if text_document['user_identifier'] != user_identifier:
            return jsonify_error(error_type='ACCESS_DENIED')

    Texts.delete({'identifier': identifier})

    return jsonify_ok(data=None)
