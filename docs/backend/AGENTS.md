# Backend — Agent Rules

Service: `backend/services/main-service`. FastAPI + SQLAlchemy 2 + Alembic.

## Layout

```
app/
  api/v1/     routers — one file per resource
  models/     SQLAlchemy models
  schemas/    Pydantic v2 request/response
  services/   business logic (email, otp, users)
  shared/     cross-cutting (auth, guards)
config/       logging, rate_limiter
database/     engine, session, cache client
alembic/      migrations
tests/        pytest suite
```

## Rules

- New resource = `models/<x>.py` + `schemas/<x>/` + `api/v1/<x>.py`.
  Register the router ONLY in `app/api/router.py`.
- Never edit an applied Alembic migration. New one:
  `alembic revision --autogenerate -m "..."`.
- Protect endpoints with `Depends(get_current_user)`.
  Admin-only with `Depends(get_admin_user)` from `app/api/v1/admin.py`.
- Rate limit anything that sends mail/SMS: `Depends(limit_otp_send)`.
- Business logic goes in `app/services/`, not in routers.
- Error responses: `HTTPException` for 4xx; auth-style errors use
  `JSONResponse({"message": "..."})` (see `app/api/v1/auth.py`).
- Do not log PII above `DEBUG`.

## Testing

- Every new endpoint or service function gets a test in
  `backend/services/main-service/tests/`.
- Follow the fixtures in `tests/conftest.py` — do not roll your own DB
  or client setup.
- Mock outbound side effects: monkeypatch `send_email`, use `fakeredis`
  for `cache_client` (already wired in conftest).
- Run: `pytest -q` from `backend/services/main-service`.

## When done

Update all three:
- `docs/backend/spec.md` — endpoints, env vars, flows
- `docs/backend/main-service.dbml` — tables, columns, enums
- `backend/services/main-service/tests/` — add or update tests
