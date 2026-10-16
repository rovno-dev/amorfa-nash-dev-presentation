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

## Testing is part of done

A change without a test is incomplete. Before declaring a task finished:

```bash
(cd backend/services/main-service && pytest -q)
(cd website && npm run typecheck && npm run test -- --run)
(cd tg-bot && pytest -q)
```

Read `docs/TESTING.md` for the full contract. Bug fixes start with a
failing test. New endpoints, hooks, and bot commands ship with at least
one test each. Never hit the network, mail, or Telegram in a test — mock
them.

## Where to look

| Task                       | Read first                        |
|----------------------------|-----------------------------------|
| Backend endpoint / model   | `docs/backend/spec.md`            |
| DB schema                  | `docs/backend/main-service.dbml`  |
| Frontend route / component | `docs/website/spec.md`            |
| Bot command                | `docs/tg-bot/spec.md`             |
| Cross-service change       | `docs/architecture.md`            |
| How to run tests           | `docs/TESTING.md`                 |

## Service extraction

Each service folder is self-contained. When a service moves to its own
repository: `mv docs/<service>/ new-repo/docs/`. No cross-links to break.
