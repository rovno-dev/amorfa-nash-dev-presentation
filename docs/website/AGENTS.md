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

## When done

Update `docs/website/spec.md`.
