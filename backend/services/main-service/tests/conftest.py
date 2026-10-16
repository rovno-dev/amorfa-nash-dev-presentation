"""Shared fixtures. Must set env vars BEFORE importing the app."""
import os
import subprocess

import pytest
from testcontainers.postgres import PostgresContainer


@pytest.fixture(scope="session")
def _postgres():
    with PostgresContainer("postgres:15-alpine") as pg:
        url = pg.get_connection_url()  # postgresql+psycopg2://...
        # Parse into the env vars database.py expects.
        # url: postgresql+psycopg2://user:pass@host:port/dbname
        creds, hostport_db = url.split("@", 1)
        user_pass = creds.split("://", 1)[1]
        user, password = user_pass.split(":", 1)
        hostport, db = hostport_db.split("/", 1)
        host, port = hostport.split(":", 1)

        os.environ["MAIN_DB_USER"] = user
        os.environ["MAIN_DB_PASSWORD"] = password
        os.environ["MAIN_DB_HOST"] = host
        os.environ["MAIN_DB_PORT"] = port
        os.environ["MAIN_DB_NAME"] = db

        # Deterministic secrets for tests.
        os.environ.setdefault("JWT_SECRET_KEY", "test-secret")
        os.environ.setdefault("JWT_ALGORITHM", "HS256")
        os.environ.setdefault("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "15")
        os.environ.setdefault("JWT_REFRESH_TOKEN_EXPIRE_DAYS", "7")
        os.environ.setdefault("ALLOWED_ORIGINS", "http://testserver")

        yield pg


@pytest.fixture(scope="session")
def _cache():
    """Replace the real Redis client with fakeredis before importing app."""
    import fakeredis
    import database.cache as cache_module

    cache_module.cache_client = fakeredis.FakeStrictRedis(decode_responses=True)
    yield cache_module.cache_client


@pytest.fixture(scope="session")
def _migrated(_postgres, _cache):
    """Run alembic upgrade head against the test DB."""
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

    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture(autouse=True)
def _silence_email(monkeypatch):
    """Never actually send mail in tests."""
    async def fake_send(*_args, **_kwargs) -> bool:
        return True

    monkeypatch.setattr("app.services.email_service.send_email", fake_send)
