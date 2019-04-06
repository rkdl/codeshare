from flask import jsonify


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
