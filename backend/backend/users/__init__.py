from flask import Blueprint


users = Blueprint(
    'users',
    __name__,
    url_prefix='/api/users'
)

from . import views  # noqa: F401,E402
