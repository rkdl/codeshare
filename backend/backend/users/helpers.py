from datetime import datetime, timedelta

from firebase_admin.auth import AuthError, verify_id_token

ACCESS_TOKEN_EXPIRE_COOKIE_TIME_DAYS = 365


def is_auth_allowed(service: str, identifier: str, id_token: str) -> bool:
    try:
        id_token_information = verify_id_token(id_token)
    except (AuthError, ValueError):
        return False

    firebase_identities = id_token_information['firebase']['identities']
    try:
        return firebase_identities[service][0] == identifier
    except (KeyError, IndexError):
        return False


def set_cookie_access_token(response, access_token):
    response.set_cookie(
        'access_token',
        access_token,
        expires=datetime.now() + timedelta(days=ACCESS_TOKEN_EXPIRE_COOKIE_TIME_DAYS),
    )
    return response
