# Global Agent Rules

Read `docs/SPEC.md` first — it defines the contract. Then read the
`AGENTS.md` for the service you are touching.

## Repository shape

```
backend/services/main-service/   FastAPI app
website/                         Next.js app
tg-bot/                          aiogram Telegram bot
docs/                            the spec — source of truth
```

## Dev vs prod

```
Dev:    docker-compose.dev.yml   → backend + bot (hot reload)
        website runs on host:    cd website && npm run dev

Prod:   docker-compose.yml       → everything, behind Traefik
```

**The website is not in `docker-compose.dev.yml`.** Do not add it. Its
`Dockerfile` targets prod only. See `docs/DEV.md`.

## Rules

- Smallest diff that solves the problem. Deletion beats addition.
- No comments except WHY. English only.
- No new dependencies without a strong reason. Prefer the stdlib and
  what's already in `requirements.txt` / `package.json`.
- When you change a public interface, update its `spec.md` in the same
  change. If a table changes, update the `.dbml` too. If a public
  interface changes, bump `docs/VERSION`.
- Extending is expected. The base is thin on purpose. Add auth, uploads,
  queues, whatever a feature needs — just keep each concern in its own
  module and update the spec.

## Adding a feature

1. Spec it in `docs/<service>/spec.md`.
2. Add the code, mirroring the shape of the `notes` resource.
3. Add tests.
4. Bump `docs/VERSION` if any public interface changed.

## Testing is part of done

```bash
(cd backend/services/main-service && pytest -q)
(cd website && npm run typecheck && npm run test -- --run)
(cd tg-bot && pytest -q)
```

See `docs/TESTING.md`.

## Where to look

| Task                       | Read first                        |
|----------------------------|-----------------------------------|
| Dev workflow               | `docs/DEV.md`                     |
| Backend endpoint / model   | `docs/backend/spec.md`            |
| DB schema                  | `docs/backend/main-service.dbml`  |
| Frontend route / component | `docs/website/spec.md`            |
| Bot command                | `docs/tg-bot/spec.md`             |
| Cross-service change       | `docs/architecture.md`            |
| How to run tests           | `docs/TESTING.md`                 |

## Service extraction

Each service folder is self-contained. When a service moves to its own
repository: `mv docs/<service>/ new-repo/docs/`. No cross-links to break.
