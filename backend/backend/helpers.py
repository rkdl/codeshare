from flask import jsonify


def OK_RESPONSE(*args, **kwargs):
    return jsonify({
        'status': 'OK',
        'data': kwargs['data']
    })


def ERROR_RESPONSE(*args, **kwargs):
    return jsonify({
        'status': 'ERROR',
        'errorType': kwargs['errorType']
    })
