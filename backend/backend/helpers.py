from flask import jsonify
from hashlib import sha1


def get_sha1_hash(value: str) -> str:
    return sha1(value.encode()).hexdigest()


def jsonify_ok(data):
    return jsonify({
        'status': 'OK',
        'data': data,
    })


def jsonify_error(*, error_type):
    return jsonify({
        'status': 'ERROR',
        'errorType': error_type,
    })
