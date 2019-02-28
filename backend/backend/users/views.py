from flask import request, jsonify

from backend.database import db
from backend.users import users
from backend.users.models import Users


@users.route('/login', methods=['POST'])
def create():
    request_params = request.get_json(force=True)
    service = request_params.get('service')
    identifier = request_params.get('identifier')

    if not service or not identifier:
      return jsonify({
        'type': 'ERROR',
        'errorType': 'MISSING_REQUIRED_PARAMS'
      })

    user_model = Users.query.filter_by(
      login_service=service,
      login_identifier=identifier
    ).first()

    if not user_model:
      user_model = Users.create(service, identifier)
      db.session.flush()

    db.session.commit()
    return jsonify({
      'type': 'OK',
      'data': {
        'userId': user_model.user_id
      }
    })
