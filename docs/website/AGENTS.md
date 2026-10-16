# Website — Agent Rules

Service: `website`. Next.js 16 App Router + React 19 + Tailwind v4 +
Radix + shadcn.

## Layout

```
app/                   routes (App Router)
components/
  ui/                  design system primitives — extend, don't fork
  layout/              header, sidebar, logo, theme-switcher
entities/              domain models
hooks/                 reusable hooks
lib/utils.ts           cn()
providers/             theme
utils/                 fetch, cookies, constants
e2e/                   Playwright specs
```

## Rules

- Icons: `@phosphor-icons/react` only. Never hand-roll SVG paths.
- API calls go through `$fetch` from `utils/fetch.ts`. Never raw `fetch`.
- Tokens via `safeCookieStorage`. Never `localStorage`.
- Use design tokens from `globals.css` (`--primary`, `--bg`,
  `--outline`, `--on-bg-high`, …). Never hardcode hex.
- Full-height blocks: `min-h-[100dvh]`, not `h-screen`.
- Client components start with `"use client"`. Everything else is RSC.

## Do not

- Edit `components/ui/*` primitives unless fixing a bug. Compose.
- Add a new state library. `UserContext` + local state is enough.
- Add a new icon library.
- Break the `/api/*` rewrite in `next.config.ts`.

## Testing

Three commands, run all before declaring done:

```bash
npm run typecheck    # tsc --noEmit -p tsconfig.json
npm run test         # vitest run
npm run test:e2e     # playwright
```

- Every pure util in `utils/` needs a `.test.ts` beside it.
- Every non-trivial component needs a vitest test with Testing Library.
- User-visible flows (login, profile edit, admin nav) need a Playwright
  spec in `e2e/`.
- Mock `fetch` with `vi.fn()`. Never hit the real API in unit tests.
- Playwright uses the dev server — start the stack first
  (`docker compose -f docker-compose.dev.yml up -d`).

## When done

Update `docs/website/spec.md` and add or extend tests.
