# tg-bot — Agent Rules

Service: `tg-bot`. aiogram 3, long polling, single file `app/bot.py`.

The base ships hello world so the bot boots, polls, and registers
commands — nothing more. Extend it when a feature needs it.

## Rules

- Everything stays in `app/bot.py` until it grows past ~500 lines, then
  split into `handlers/`, `filters/`, `services/`.
- Handlers registered via decorators (`@dp.message(...)`).
- No global mutable state. If a flow needs steps, use FSM
  (`aiogram.fsm.state.State`).
- Escape user-controlled text before sending to Telegram.
- Do not log chat ids, usernames, or message contents above `DEBUG`.
- Adding features is expected — DB access, HTTP calls to `main-service`,
  background jobs, webhooks. Put each in its own module and update the
  spec when you do.

## Do not

- Switch to webhook unless the deployment needs it. Long-poll is the
  default because it needs no inbound routing.
- Add a scheduler or worker without a reason. When you need one, give it
  its own container and spec it.

## Testing

- Every command gets a test in `tg-bot/tests/`.
- Call the handler coroutine directly with a `MagicMock` message whose
  `.answer` is an `AsyncMock`. Never hit real Telegram.
- Run: `pytest -q`.

## When done

Update `docs/tg-bot/spec.md` and add or extend tests.
