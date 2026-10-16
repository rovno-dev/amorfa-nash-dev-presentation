# Global Agent Rules

Read this first. Then read `docs/<service>/AGENTS.md` for the service you
are touching.

## Repository shape

```
backend/services/main-service/   FastAPI app
website/                         Next.js app
tg-bot/                          aiogram Telegram bot
docs/                            this folder
```

## Rules

- Smallest diff that solves the problem. Deletion beats addition.
- No comments except WHY. English only.
- No new dependencies without a strong reason.
- Do not invent new top-level folders. Use what exists.
- When you change a public interface (endpoint, route, command, entity,
  env var, event, table), update `docs/<service>/spec.md` **and** the
  matching `docs/<service>/<service>.dbml` in the same change.

## Where to look

| Task                       | Read first                    |
|----------------------------|-------------------------------|
| Backend endpoint / model   | `docs/backend/spec.md`        |
| DB schema                  | `docs/backend/main-service.dbml` |
| Frontend route / component | `docs/website/spec.md`        |
| Bot command                | `docs/tg-bot/spec.md`         |
| Cross-service change       | `docs/architecture.md`        |

## Service extraction

Each service folder is self-contained. When a service moves to its own
repository: `mv docs/<service>/ new-repo/docs/`. No cross-links to break.
