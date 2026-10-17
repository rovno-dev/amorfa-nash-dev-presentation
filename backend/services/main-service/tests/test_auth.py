import uuid

from app.services.otp_service import save_otp
from database.cache import cache_client


def _email() -> str:
    return f"user-{uuid.uuid4().hex[:8]}@test.local"


def _register(client, email: str, password: str = "Passw0rd!") -> None:
    r = client.post("/api/v1/register/email", json={"email": email, "password": password})
    assert r.status_code == 200, r.text


def _verify(client, email: str, code: str) -> dict:
    r = client.post("/api/v1/verify-email", json={"email": email, "code": code})
    assert r.status_code == 200, r.text
    return r.json()


def test_register_sends_otp(client):
    email = _email()
    _register(client, email)
    assert cache_client.get(f"otp:{email}") is not None


def test_register_duplicate_email_fails(client):
    email = _email()
    _register(client, email)
    r = client.post("/api/v1/register/email", json={"email": email, "password": "Passw0rd!"})
    assert r.status_code == 422


def test_register_weak_password_rejected(client):
    r = client.post(
        "/api/v1/register/email",
        json={"email": _email(), "password": "short"},
    )
    assert r.status_code == 422


def test_verify_wrong_code(client):
    email = _email()
    _register(client, email)
    r = client.post("/api/v1/verify-email", json={"email": email, "code": "000000"})
    assert r.status_code == 401


def test_login_after_verify(client):
    email = _email()
    _register(client, email)
    save_otp(email, "123456")
    tokens = _verify(client, email, "123456")
    assert "access_token" in tokens and "refresh_token" in tokens

    r = client.post("/api/v1/login/email", json={"email": email, "password": "Passw0rd!"})
    assert r.status_code == 200
    assert "access_token" in r.json()


def test_login_unverified_rejected(client):
    email = _email()
    _register(client, email)
    r = client.post("/api/v1/login/email", json={"email": email, "password": "Passw0rd!"})
    assert r.status_code == 403


def test_refresh_returns_new_access(client):
    email = _email()
    _register(client, email)
    save_otp(email, "123456")
    tokens = _verify(client, email, "123456")

    r = client.post("/api/v1/refresh", json={"refresh_token": tokens["refresh_token"]})
    assert r.status_code == 200
    assert "access_token" in r.json()


def test_me_requires_token(client):
    r = client.get("/api/v1/me")
    assert r.status_code == 403  # HTTPBearer returns 403 on missing header


def test_me_returns_profile(client):
    email = _email()
    _register(client, email)
    save_otp(email, "123456")
    tokens = _verify(client, email, "123456")

    r = client.get(
        "/api/v1/me",
        headers={"Authorization": f"Bearer {tokens['access_token']}"},
    )
    assert r.status_code == 200
    body = r.json()
    assert body["email"] == email
    assert body["role"] == "user"
