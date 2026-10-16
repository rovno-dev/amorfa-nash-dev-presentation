# tg-bot — Agent Rules

Service: `tg-bot`. aiogram 3, long polling, single file `app/bot.py`.

This is a **template bot** — hello world only. No DB, no state, no
business logic. Add features only when the project actually needs them.

## Rules

- Everything stays in `app/bot.py` until it grows past ~500 lines, then
  split into `handlers/`, `filters/`, `services/`.
- Handlers registered via decorators (`@dp.message(...)`, `@dp.message(Command(...))`).
- No DB access. If you need data, call `main-service` over HTTP.
- No global mutable state. If a flow needs steps, use FSM
  (`aiogram.fsm.state.State`).
- Escape user-controlled text before sending to Telegram. Use
  `html.escape()` for HTML parse mode, or switch to MarkdownV2 and escape
  accordingly.

## Do not

- Do not switch to webhook — long-poll only by default.
- Do not log chat ids, usernames, or message contents above `DEBUG`.
- Do not add a scheduler, queue, or background worker without a reason.

## When done

Update `docs/tg-bot/spec.md`.
