# main-service — Spec

Source of truth for the notes resource. This is the base the template
ships — add more resources following the same pattern when a feature
needs them.

## DB schema

See [`main-service.dbml`](./main-service.dbml). Authoritative — if this
spec and the .dbml disagree, the .dbml wins until both are fixed.

## Endpoints

Base: `/api/v1`. All JSON.

| Method | Path             | Body              | Returns           |
|--------|------------------|-------------------|-------------------|
| GET    | `/notes`         | —                 | `NoteResponse[]`  |
| POST   | `/notes`         | `NoteCreate`      | `NoteResponse` 201 |
| GET    | `/notes/{id}`    | —                 | `NoteResponse`    |
| PATCH  | `/notes/{id}`    | `NoteUpdate`      | `NoteResponse`    |
| DELETE | `/notes/{id}`    | —                 | 204               |

Plus `GET /health` → `{"status": "healthy", "service": "main-service"}`.

### Models

```python
class NoteCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    body:  str = Field(default="", max_length=10_000)

class NoteUpdate(BaseModel):
    title: str | None = None
    body:  str | None = None

class NoteResponse(BaseModel):
    id: UUID
    title: str
    body: str
    created_at: datetime
    updated_at: datetime
```

### Errors

- `404 {"detail": "Note not found"}` — id does not exist.
- `422 {"detail": [...]}` — validation, FastAPI default.

## Env vars

| Var               | Required | Purpose                                |
|-------------------|----------|----------------------------------------|
| `MAIN_DB_USER`    | yes      | Postgres user                          |
| `MAIN_DB_PASSWORD`| yes      | Postgres password                      |
| `MAIN_DB_HOST`    | yes      | Postgres host                          |
| `MAIN_DB_PORT`    | yes      | Postgres port                          |
| `MAIN_DB_NAME`    | yes      | Postgres database                      |
| `ALLOWED_ORIGINS` | no       | Comma-separated CORS origins           |

## Extending

When a feature needs a new resource:

1. Add a table to `main-service.dbml`.
2. `alembic revision --autogenerate -m "<resource>"`.
3. Add `models/<x>.py`, `schemas/<x>.py`, `api/v1/<x>.py` — copy the
   shape of `notes`.
4. Register the router in `app/api/router.py`.
5. Add tests in `tests/test_<x>.py`.
6. Add a section to this spec.

When a feature needs auth, files, or a queue: create a new folder
(`app/auth/`, `app/files/`, `app/tasks/`), give it its own spec section,
and keep `notes` as the simple reference.

## Tests

`pytest -q`. Real Postgres via testcontainers, migrations applied at
session start. One test per endpoint behaviour.
