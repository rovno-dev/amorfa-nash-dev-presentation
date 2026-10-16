# tg-bot — Agent Rules

Service: `tg-bot`. aiogram 3, long polling, single file `app/bot.py`.

## Rules

- Everything stays in `app/bot.py` until it grows past ~500 lines, then
  split into `handlers/`, `filters/`, `services/`.
- Handlers registered via decorators (`@dp.message(...)`).
- No DB access. If you need data, call `main-service` over HTTP.
- No global mutable state. Use FSM (`aiogram.fsm.state.State`) for flows.
- Escape user-controlled text before sending to Telegram.
- Do not log chat ids, usernames, or message contents above `DEBUG`.

## Do not

- Do not switch to webhook — long-poll only by default.
- Do not add a scheduler, queue, or background worker without a reason.
- Do not add a DB driver.

## Testing

- Every command gets a test in `tg-bot/tests/`.
- Use the `bot` and `dp` fixtures from `tests/conftest.py` — they wire
  aiogram's test harness so `dispatch()` returns a mocked Bot.
- Assert on `bot.send_message.await_args`, not on real Telegram.
- Run: `pytest -q` from `tg-bot`.

## When done

Update `docs/tg-bot/spec.md` and add or extend tests.
