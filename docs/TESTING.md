# Testing

Every change is verified by three commands. Run all three before
declaring done.

## The three commands

```bash
(cd backend/services/main-service && pytest -q)
(cd website && npm run typecheck && npm run test -- --run)
(cd tg-bot && pytest -q)
```

| Layer  | Tool                       | Scope                            |
|--------|----------------------------|----------------------------------|
| Types  | `tsc --noEmit`             | website — static types           |
| Unit   | `pytest` / `vitest`        | one module / function in isolation |
| E2E    | Playwright (opt-in)        | login-free flows only            |

## Rules

- A change without a test is incomplete work.
- Every endpoint → at least one backend test.
- Every util / hook → at least one vitest test.
- Every bot command → at least one tg-bot test.
- Bug fixes start with a failing test.
- Tests are deterministic and offline. Mock the network and Telegram.
- Prefer one meaningful test over three trivial ones.
