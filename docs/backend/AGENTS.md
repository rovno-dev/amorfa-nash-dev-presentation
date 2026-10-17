# Backend — Agent Rules

Service: `backend/services/main-service`. FastAPI + SQLAlchemy 2 + Alembic.

## Layout

```
app/
  api/v1/    routers — one file per resource
  models/    SQLAlchemy models
  schemas/   Pydantic v2 request/response
  services/  business logic (create this folder when a router grows)
config/      logging
database/    engine, session
alembic/     migrations
tests/       pytest suite
```

## Rules

- New resource = `models/<x>.py` + `schemas/<x>.py` + `api/v1/<x>.py`.
  Register the router ONLY in `app/api/router.py`. Mirror the shape of
  the `notes` resource — that is the canonical example.
- Never edit an applied Alembic migration. Add a new one:
  `alembic revision --autogenerate -m "..."`.
- Router bodies contain DB calls only. When a router grows past ~100
  lines or mixes concerns, extract business logic to
  `app/services/<x>.py` — the same way `notes` stays in one file.
- Errors: `HTTPException` for 4xx. `{"detail": "..."}` for all.
- Never log PII. Never write to another service's tables.
- Adding auth, uploads, queues, or anything else is expected. Put each in
  its own folder (`app/auth/`, `app/files/`, `app/tasks/`) so the base
  stays readable. Update the spec when you do.

## Testing

- Every endpoint gets a test in `tests/`.
- Use the fixtures in `tests/conftest.py` — a real Postgres via
  testcontainers, migrations applied, session-scoped.
- Mock outbound side effects (mail, HTTP, third-party SDKs).
- Run: `pytest -q`.

## When done

Update all three:
- `docs/backend/spec.md` — interfaces
- `docs/backend/main-service.dbml` — schema
- `tests/` — coverage

If a new public interface was added, bump `docs/VERSION`.
