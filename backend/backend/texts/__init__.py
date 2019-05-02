from flask import Blueprint


texts = Blueprint(
    'texts',
    __name__,
    url_prefix='/api/texts'
)

from . import views  # noqa: F401,E402
