import uuid

from app.services.otp_service import save_otp


def _auth_headers(client, password: str = "Passw0rd!") -> dict:
    email = f"user-{uuid.uuid4().hex[:8]}@test.local"
    client.post("/api/v1/register/email", json={"email": email, "password": password})
    save_otp(email, "123456")
    tokens = client.post(
        "/api/v1/verify-email", json={"email": email, "code": "123456"}
    ).json()
    return {"Authorization": f"Bearer {tokens['access_token']}"}


def test_update_profile(client):
    headers = _auth_headers(client)
    r = client.patch(
        "/api/v1/me",
        json={"name": "Ada", "surname": "Lovelace"},
        headers=headers,
    )
    assert r.status_code == 200
    assert r.json()["name"] == "Ada"
    assert r.json()["surname"] == "Lovelace"


def test_change_password_requires_current(client):
    headers = _auth_headers(client)
    r = client.post(
        "/api/v1/me/change-password",
        json={"current_password": "wrong", "new_password": "NewPassw0rd!"},
        headers=headers,
    )
    assert r.status_code == 400


def test_change_password_success_and_login(client):
    headers = _auth_headers(client)
    r = client.post(
        "/api/v1/me/change-password",
        json={"current_password": "Passw0rd!", "new_password": "NewPassw0rd!"},
        headers=headers,
    )
    assert r.status_code == 200

    me = client.get("/api/v1/me", headers=headers).json()
    r = client.post(
        "/api/v1/login/email",
        json={"email": me["email"], "password": "NewPassw0rd!"},
    )
    assert r.status_code == 200
