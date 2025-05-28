import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url = os.environ.get("DB_CONNECTION_STRING")
engine = create_engine(db_url)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    with SessionLocal() as session:
        yield session
