from backend.database import db
from sqlalchemy import func

class LoginService:
    FACEBOOK = 'facebook'
    GOOGLE = 'google'
    NONE = 'none'
    ITEMS = [GOOGLE, FACEBOOK, NONE]


class Users(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.INT, primary_key=True)
    insert_time = db.Column(db.TIMESTAMP)
    update_time = db.Column(db.TIMESTAMP)
    login_service = db.Column(
        db.Enum(*LoginService.ITEMS), default=LoginService.NONE)
    login_identifier = db.Column(db.VARCHAR)

    @classmethod
    def create(cls, service, identifier):
        new_user = cls(
            login_service=service,
            login_identifier=identifier,
            insert_time=func.now()
        )
        db.session.add(new_user)
        return new_user
