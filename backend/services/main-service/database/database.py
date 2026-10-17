import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = (
    f"postgresql+psycopg2://{os.getenv('MAIN_DB_USER')}:{os.getenv('MAIN_DB_PASSWORD')}"
    f"@{os.getenv('MAIN_DB_HOST')}:{os.getenv('MAIN_DB_PORT')}/{os.getenv('MAIN_DB_NAME')}"
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
