# Testing

Three layers, all fast, all runnable from the repo root.

| Layer       | Tool                            | Scope                                  |
|-------------|---------------------------------|----------------------------------------|
| Types       | `tsc --noEmit`                  | website — static types                 |
| Unit        | `pytest` / `vitest`             | one module / function in isolation     |
| E2E         | `pytest` (async) / Playwright   | real process, real HTTP / browser      |

## Run everything

```bash
# Backend
cd backend/services/main-service
pip install -r requirements-dev.txt
pytest

# Website
cd website
npm install
npm run typecheck   # tsc --noEmit
npm run test        # vitest run
npm run test:e2e    # playwright

# Bot
cd tg-bot
pip install -r requirements-dev.txt
pytest
```

## Rules

- **A change without a test is incomplete work.** No exceptions.
- Every new endpoint → at least one backend test.
- Every new util / hook / pure function → at least one vitest test.
- Every new bot command → at least one tg-bot test.
- Bug fixes start with a failing test that reproduces the bug.
- Tests are deterministic and offline. Mock the network, the mail server,
  and Telegram. Never hit real services.
- Prefer one meaningful test over three trivial ones.
