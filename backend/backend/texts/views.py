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


def get_user_identifier():
    access_token = request.cookies.get('access_token')
    if access_token:
        user_document = Users.get_by_access_token(access_token)
        if not user_document:
            raise Exception('USER_NOT_FOUND')
        else:
            return user_document['identifier']
    else:
        raise Exception("MISSING_ACCESS_TOKEN")


@texts.route('/create', methods=['POST'])
def create():
    request_params = request.get_json(force=True)
    text = request_params.get('text')
    language = request_params.get('language')
    expire_time = request_params.get('expireTime')

    if not text or not language or not expire_time:
        return jsonify_error(error_type='MISSING_REQUIRED_PARAMS')

    try:
        user_identifier = get_user_identifier()
    except Exception as error:
        return jsonify_error(error_type=error.args)

    result = Texts.create(text, language, expire_time, user_identifier)
    inserted_id = result.inserted_id
    text_document = Texts.get_by_mongo_id(inserted_id)

    return jsonify_ok(data={
        'identifier': text_document['identifier']
    })


@texts.route('/get_all', methods=['POST'])
def get_all():
    try:
        user_identifier = get_user_identifier()
    except Exception as error:
        return jsonify_error(error_type=error.args)

    all_texts = Texts.get_all_by_user_itentifier(user_identifier)
    
    result = list()
    for text_document in all_texts:
        result.append(
            prepare_text_document_structure(text_document)
        )

    return jsonify_ok(data=result)


@texts.route('/random', methods=['POST'])
def get_random():
    request_params = request.get_json(force=True)
    expire_time = request_params.get('expireTime')
    
    text_document = Texts.get_random(expire_time)

    return jsonify_ok(
        prepare_text_document_structure(text_document)
    )


@texts.route('/statistics', methods=['POST'])
def get_statictics():
    try:
        user_identifier = get_user_identifier()
    except Exception as error:
        return jsonify_error(error_type=error.args)

    return jsonify_ok(data=Texts.get_statistics_by_user(user_identifier))


@texts.route('/read', methods=['POST'])
def read():
    try:
        user_identifier = get_user_identifier()
    except Exception as error:
        return jsonify_error(error_type=error.args)

    text_document = Texts.get_by_identifier(user_identifier)

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
        try:
            user_identifier = get_user_identifier()
        except Exception as error:
            return jsonify_error(error_type=error.args)
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
        try:
            user_identifier = get_user_identifier()
        except Exception as error:
            return jsonify_error(error_type=error.args)
        
        if text_document['user_identifier'] != user_identifier:
            return jsonify_error(error_type='ACCESS_DENIED')

    Texts.delete({'identifier': identifier})

    return jsonify_ok(data=None)
