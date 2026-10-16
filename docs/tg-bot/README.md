# tg-bot

Minimal aiogram 3 template. Long polling. Hello world only.

## Run

```bash
docker compose -f tg-bot/docker-compose.yml up -d tg-bot
```

Logs:

```bash
docker compose -f tg-bot/docker-compose.yml logs -f tg-bot
```

## Commands

| Command  | Does                   |
|----------|------------------------|
| `/start` | Reply with hello world |
| `/help`  | List commands          |

## See also

- `spec.md` — behaviour, env vars
- `AGENTS.md` — conventions
