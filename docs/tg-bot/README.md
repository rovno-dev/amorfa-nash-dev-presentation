# tg-bot

Minimal aiogram 3 template. Long polling.

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
| -------- | ---------------------- |
| `/start` | Reply with hello world |
| `/help`  | Same as `/start`       |

## See also

- `spec.md` — file layout, env vars
- `AGENTS.md` — conventions for AI changes
