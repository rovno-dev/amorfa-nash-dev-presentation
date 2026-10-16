# main-service

FastAPI service. One resource: `notes`. No auth.

## Run

```bash
docker compose -f backend/docker-compose.yml up -d main-service
```

Swagger: http://localhost:8000/docs. Health: `/health`.

## See also

- `spec.md` — endpoints, env vars
- `main-service.dbml` — DB schema (dbdiagram.io)
- `AGENTS.md` — conventions
