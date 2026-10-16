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

## When done

Update BOTH:
- `docs/backend/spec.md` — if any endpoint / env var / flow changed
- `docs/backend/main-service.dbml` — if any table / column / enum changed
