# Dev workflow

Three services. Two run in Docker with hot reload, one runs on the host.

| Service        | Where     | How                              |
|----------------|-----------|----------------------------------|
| main-service   | Docker    | `docker compose -f docker-compose.dev.yml up -d main-service` |
| tg-bot         | Docker    | `docker compose -f docker-compose.dev.yml up -d tg-bot` |
| website        | **Host**  | `cd website && npm run dev`      |

## One-shot

```bash
docker compose -f docker-compose.dev.yml up -d
cd website && npm install && npm run dev
```

Ports:

- API:      http://localhost:8000
- Swagger:  http://localhost:8000/docs
- Postgres: localhost:5432
- Website:  http://localhost:3000

## Why website is not in Docker on dev

- `next dev` on the host has instant HMR. Proxying file watching, the
  HMR websocket, and TLS through a container boundary adds latency and
  edge cases for no benefit.
- The website `Dockerfile` targets **prod only**. It builds a standalone
  Next.js server (`output: 'standalone'`), which is what runs behind
  Traefik in production.
- Dev parity for the frontend comes from running the same `package.json`
  scripts on the host. Nothing in the app knows the difference.

## Hot reload

| Service        | Mechanism                                        |
|----------------|--------------------------------------------------|
| main-service   | `uvicorn --reload` + bind mount `./services/main-service:/app` |
| tg-bot         | `watchfiles --filter python` + bind mount `./app:/app/app` |
| website        | `next dev` — built-in HMR                        |

Editing a file under `backend/services/main-service/app/` or
`tg-bot/app/` restarts the relevant container process. No rebuild.

Rebuild only when dependencies change (`requirements.txt`):

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

## Database

- Dev DB is a separate volume: `main_db_dev_data`.
- Not shared with prod (`main_db_data` in `backend/docker-compose.yml`).
- Migrations run automatically on `main-service` container start.
- Reset it:

```bash
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d
```

## Network

Everything in dev joins `main-network-dev`. Prod uses `main-network`.
Different names, so both stacks can run side-by-side without collisions.

## Env

Read from the root `.env`. Copy the example once:

```bash
cp .env.example .env
```

Website reads its own env vars from `website/.env` (Next.js convention).

## What is not in dev compose

- Traefik — no reverse proxy needed. Ports are published directly.
- Valkey / Redis — not used by the base. Add it when a feature needs a
  cache or a queue.
- Website — see above.

## Prod compose

Unchanged from before. Everything is containerised:

```bash
docker compose up -d --build
```

Website runs from the `prod` target of `website/Dockerfile`, behind
Traefik on the `main-network`.
