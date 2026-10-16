# main-service

FastAPI service for auth, users, and content.

## Run

```bash
docker compose -f backend/docker-compose.yml up -d main-service
```

Swagger: http://localhost:8000/docs. Health: `/health`.

## See also

- `spec.md` — endpoints, auth flow, env vars
- `main-service.dbml` — DB schema (open in dbdiagram.io)
- `AGENTS.md` — conventions for AI changes
