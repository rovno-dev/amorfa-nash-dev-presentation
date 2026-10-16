# tg-bot

Minimal aiogram 3 template. Long polling. Hello world only.

## Run

Prod stack:

```bash
docker compose -f tg-bot/docker-compose.yml up -d tg-bot
```

Dev stack:

```bash
docker compose -f tg-bot/docker-compose.dev.yml up -d tg-bot
```

Logs:

```bash
docker compose -f tg-bot/docker-compose.yml logs -f tg-bot
```

## Env

Only one var is required, read from the root `.env`:

- `TELEGRAM_BOT_TOKEN` — from BotFather.

## Commands

| Command  | Does                   |
|----------|------------------------|
| `/start` | Reply with hello world |
| `/help`  | List commands          |

## Extending

1. Add a handler in `app/bot.py`:
   `@dp.message(Command("ping"))`.
2. Reply with `await message.answer("pong")`.
3. Register it in `main()` via `bot.set_my_commands([...])`.
4. Update `docs/tg-bot/spec.md`.

No database, no state, no shared volume. If you need data, call
`main-service` over HTTP.
