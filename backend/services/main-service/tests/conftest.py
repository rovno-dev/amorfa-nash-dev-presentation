"""Session-scoped Postgres container + migrations + client."""
import os
import subprocess

import pytest
from testcontainers.postgres import PostgresContainer


@pytest.fixture(scope="session")
def _postgres():
    with PostgresContainer("postgres:15-alpine") as pg:
        url = pg.get_connection_url()
        creds, hostport_db = url.split("@", 1)
        user, password = creds.split("://", 1)[1].split(":", 1)
        hostport, db = hostport_db.split("/", 1)
        host, port = hostport.split(":", 1)

        os.environ.update(
            MAIN_DB_USER=user,
            MAIN_DB_PASSWORD=password,
            MAIN_DB_HOST=host,
            MAIN_DB_PORT=port,
            MAIN_DB_NAME=db,
            ALLOWED_ORIGINS="http://testserver",
        )
        yield pg


@pytest.fixture(scope="session")
def _migrated(_postgres):
    subprocess.run(
        ["alembic", "upgrade", "head"],
        cwd=os.path.dirname(os.path.dirname(__file__)),
        check=True,
    )
    yield


@pytest.fixture()
def client(_migrated):
    from fastapi.testclient import TestClient
    from main import app
    with TestClient(app) as c:
        yield c


@pytest.fixture()
def db(_migrated):
    from database.database import SessionLocal
    s = SessionLocal()
    try:
        yield s
    finally:
        s.close()
