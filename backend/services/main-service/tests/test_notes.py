def test_list_empty(client):
    r = client.get("/api/v1/notes")
    assert r.status_code == 200
    assert r.json() == []


def test_create_and_get(client):
    r = client.post("/api/v1/notes", json={"title": "Hello", "body": "world"})
    assert r.status_code == 201
    note = r.json()
    assert note["title"] == "Hello"

    r = client.get(f"/api/v1/notes/{note['id']}")
    assert r.status_code == 200
    assert r.json()["id"] == note["id"]


def test_create_empty_title_rejected(client):
    r = client.post("/api/v1/notes", json={"title": "", "body": "x"})
    assert r.status_code == 422


def test_update_note(client):
    note = client.post("/api/v1/notes", json={"title": "old"}).json()
    r = client.patch(f"/api/v1/notes/{note['id']}", json={"title": "new"})
    assert r.status_code == 200
    assert r.json()["title"] == "new"
    assert r.json()["body"] == ""


def test_update_missing_note(client):
    r = client.patch(
        "/api/v1/notes/00000000-0000-0000-0000-000000000000",
        json={"title": "x"},
    )
    assert r.status_code == 404


def test_delete_note(client):
    note = client.post("/api/v1/notes", json={"title": "bye"}).json()
    assert client.delete(f"/api/v1/notes/{note['id']}").status_code == 204
    assert client.get(f"/api/v1/notes/{note['id']}").status_code == 404


def test_list_order_newest_first(client):
    a = client.post("/api/v1/notes", json={"title": "first"}).json()
    b = client.post("/api/v1/notes", json={"title": "second"}).json()
    rows = client.get("/api/v1/notes").json()
    ids = [r["id"] for r in rows]
    assert ids.index(b["id"]) < ids.index(a["id"])
