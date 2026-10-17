# Website — Agent Rules

Service: `website`. Next.js 16 App Router + React 19 + Tailwind v4 +
Radix + shadcn.

## Layout

```
app/                   routes (App Router)
components/
  ui/                  design system primitives
  layout/              header, logo, theme-switcher
lib/utils.ts           cn()
providers/             theme
utils/                 fetch, constants, interfaces
```

## Rules

- Icons: `@phosphor-icons/react` only. Never hand-roll SVG paths.
- API calls go through `$fetch` from `utils/fetch.ts`. Never raw `fetch`.
- Use design tokens from `globals.css` (`--primary`, `--bg`,
  `--outline`, `--on-bg-high`, …). Never hardcode hex.
- Full-height blocks: `min-h-[100dvh]`, not `h-screen`.
- Client components start with `"use client"`. Everything else is RSC.
- Compose with `components/ui/*`. Edit a primitive only to fix a bug.
- Adding features is expected. When you add auth, uploads, or complex
  state, put it in its own folder (`app/(auth)/`, `providers/auth.tsx`,
  `entities/<x>/`) — the base stays thin on purpose.

## Do not

- Add a state library for a single screen. `useState` + `useEffect` is
  enough. Reach for Zustand / Jotai only when prop-drilling actually hurts.
- Add an icon library.

## Testing

```bash
npm run typecheck    # tsc --noEmit
npm run test         # vitest run
npm run test:e2e     # playwright (needs dev server running)
```

- Every util in `utils/` needs a `__tests__/*.test.ts`.
- Non-trivial components need a vitest test.
- User-visible flows need a Playwright spec in `e2e/`.
- Mock `fetch` with `vi.fn()`. Never hit the real API in unit tests.

## When done

Update `docs/website/spec.md` and add or extend tests. Bump
`docs/VERSION` if a public route or shape changed.
