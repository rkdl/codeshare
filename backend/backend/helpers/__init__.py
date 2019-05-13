from hashlib import sha1

from .response import jsonify_ok, jsonify_error  # noqa
from .case_utils import snake_to_camelcase_strategy  # noqa


def get_sha1_hash(value: str) -> str:
    return sha1(value.encode()).hexdigest()
