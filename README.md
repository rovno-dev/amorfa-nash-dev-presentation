# Amorfa

Spec-driven fullstack template: FastAPI + Next.js + aiogram, one
spec folder (`docs/`) that describes every service.

## Directory

```
backend/services/main-service/   FastAPI app
website/                         Next.js app
tg-bot/                          aiogram Telegram bot
docs/                            the spec — source of truth
```

Read [`docs/SPEC.md`](docs/SPEC.md) first. Then [`docs/architecture.md`](docs/architecture.md).

## Dev

Two halves, deliberately split:

```bash
# 1. Infra in Docker — backend + bot, hot reload, source bind-mounted.
docker compose -f docker-compose.dev.yml up -d

# 2. Frontend on the host — Next.js is NOT containerised in dev.
cd website
npm install
npm run dev
```

- API:         http://localhost:8000        (Swagger: /docs)
- Postgres:    localhost:5432
- Website:     http://localhost:3000
- Bot:         long polling, no port

Logs:

```bash
docker compose -f docker-compose.dev.yml logs -f main-service
docker compose -f docker-compose.dev.yml logs -f tg-bot
```

Down:

```bash
docker compose -f docker-compose.dev.yml down
# add -v to also drop the dev database volume
```

**Why Next.js is not in dev Docker:** hot reload via Docker on a Node
project is slower than `next dev` on the host — file watching, HMR
socket, and TLS all get proxied through the container boundary. The
`Dockerfile` for the website targets **prod** only (`docker-compose.yml`
at the repo root). Dev is host-native.

## Prod-parity

Everything containerised, including the website, behind Traefik.

```bash
cp .env.example .env
docker compose up -d --build
```

- Web:      http://localhost
- API docs: http://localhost/docs

## Tests

```bash
(cd backend/services/main-service && pytest -q)
(cd website && npm run typecheck && npm run test -- --run)
(cd tg-bot && pytest -q)
```

See [`docs/TESTING.md`](docs/TESTING.md).

## Deployment

`.github/workflows/deploy.yml` — on push to `main`, the runner SSHes to
the server, pulls, diffs against the previously-deployed commit, rebuilds
only the changed services, and reconciles the prod compose stack.
