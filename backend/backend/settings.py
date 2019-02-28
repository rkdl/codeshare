MYSQL_USERNAME = 'root'
MYSQL_PASSWORD = 'passwd'


class DebugConfig(object):
    DEBUG = True
    SECRET_KEY = 'secret_key'

    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{username}:{password}@database:3306/db?charset=utf8'.format(
        username=MYSQL_USERNAME,
        password=MYSQL_PASSWORD,
    )


class ProdConfig(DebugConfig):
    DEBUG = False
