from firebase_admin import auth
from datetime import datetime, timedelta

ACCESS_TOKEN_EXPIRE_COOKIE_TIME_DAYS = 365


def verify_firebase_id_token(id_token):
    try:
        return auth.verify_id_token(id_token)
    except:
        return False


def set_cookie_access_token(response, access_token):
    response.set_cookie(
        'access_token',
        access_token,
        expires=datetime.now() + timedelta(days=ACCESS_TOKEN_EXPIRE_COOKIE_TIME_DAYS),
    )
    return response
