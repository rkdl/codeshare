from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import exc
from sqlalchemy import event
from sqlalchemy.pool import Pool


@event.listens_for(Pool, "checkout")
def ping_connection(dbapi_connection, connection_record, connection_proxy):
    cursor = dbapi_connection.cursor()
    try:
        cursor.execute("SELECT 1")
    except Exception:
        raise exc.DisconnectionError()
    cursor.close()


db = SQLAlchemy(session_options={'autoflush': False})
