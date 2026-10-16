# Spec — how this repo works

This repository is spec-driven. The `docs/` folder **is** the product.
Any AI that reads `docs/` end-to-end and follows it produces a functionally
equivalent application, regardless of who runs it or which model is used.

## What this template is

A **lean, opinionated base**. It ships one resource (`notes`) end-to-end —
model, migration, endpoint, page, tests — so the full pipeline is
demonstrated and every future feature has a working example to copy.

Everything else is **yours to build**. Auth, uploads, payments, queues,
websockets, cron, search, multi-tenancy, i18n — none of it is included by
default, and all of it is expected to be added when a feature needs it.
The template is deliberately thin so that adding is cheap and nothing is
fighting you.

## What this template is not

Not a framework. Not a library. Not a set of hard limits. The rules below
describe how to keep it consistent, not what you're allowed to build.

## Compatibility

- `docs/VERSION` is the contract version for the **shipped base**. Same
  version = same baseline interfaces.
- `docs/<service>/spec.md` describes what the service **currently
  exposes**. When you add a feature, extend the spec — the docs are
  living, not frozen.
- `docs/<service>/AGENTS.md` describes conventions — file layout, allowed
  libraries, forbidden patterns, test requirements. Follow them; then
  extend them if a new feature needs a new convention.

## Contract

Every change respects the following order:

1. Update the spec.
2. Update the code to match.
3. Update the tests.
4. Bump `docs/VERSION` if a public interface changed.

A PR that changes code without changing its spec is incomplete. A PR that
changes a spec without changing code is a plan, not a fix.

## Reading order for a new agent

```
docs/VERSION                which baseline you're on
docs/architecture.md        how the pieces fit
docs/SPEC.md                this file — the rules
docs/TESTING.md             how to verify your work
docs/<service>/AGENTS.md    conventions for the service you're touching
docs/<service>/spec.md      what the service currently exposes
docs/<service>/<svc>.dbml   DB schema (backend only)
```

## Principles

- **Lean by default.** Ship the smallest thing that works. Delete unused
  code before adding new.
- **One working example of each pattern.** `notes` is that example. When
  you add a second resource, mirror the shape so future readers learn the
  pattern once.
- **Add, don't bloat the base.** Auth lives in its own module, not
  scattered through `main.py`. Same for uploads, queues, anything else.
- **No global mutable state.** Each request is independent.
- **The website never talks to the DB.** It calls the backend over HTTP.
- **The bot is stateless** until it needs not to be — then add state
  deliberately, in its own module.

## Adding a feature

The template gives you:

- A working DB + migration pipeline (Alembic).
- A working API shape (`models/` → `schemas/` → `api/v1/`).
- A working page with fetch + toasts.
- A working test harness for backend, frontend, and bot.

When you need something not in the base — auth, files, payments — add it
following the same shape:

1. Spec it in `docs/<service>/spec.md`.
2. Add the model + migration (backend) or the hook / context (frontend).
3. Wire it into `router.py` (backend) or the page (frontend).
4. Test it.
5. Bump `docs/VERSION`.

There is no gatekeeping. The base is thin so this is fast.
