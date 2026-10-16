# website — Spec

Next.js app. The base ships one route (`/`) demonstrating the full
pipeline: fetch, toast, form, list, delete. Add more routes when a
feature needs them.

## Route map

| Path | Renders                                        |
|------|------------------------------------------------|
| `/`  | Notes list + inline create form                |

## Data fetching

All API calls go through `$fetch` from `utils/fetch.ts`:

```typescript
const { response, json } = await $fetch("/api/v1/notes", {
  method: "POST",
  body: JSON.stringify({ title, body }),
  headers: { "Content-Type": "application/json" },
  isToast: false,
});
```

- Adds `Accept: application/json`.
- Parses JSON safely. `json` is `undefined` on empty bodies.
- Shows a `sonner` toast on error unless `isToast: false`.
- Returns `{ response, json }` — callers check `response.ok`.

The API base URL comes from `NEXT_PUBLIC_API_BASE_URL`. In dev it is
`http://localhost:8000`. In prod the `/api/*` rewrite in
`next.config.ts` proxies to the backend.

## Design tokens

Semantic CSS variables in `app/globals.css`. Never hardcode hex.

```
--primary, --on-primary
--bg, --card, --outline
--on-bg-high, --on-bg-medium, --on-bg-low
--primary-glass, --state-hover
--error, --success, --warning
```

Tailwind reads them via `@theme inline`.

## Component primitives

`components/ui/` — extended from shadcn. **Compose**, never fork.

```
button, card, input, textarea, container, badge, dialog,
dropdown-menu, tooltip, sonner, skeleton, spinner, tabs, …
```

## Adding a route

1. Add `app/<name>/page.tsx` mirroring `app/page.tsx`'s shape.
2. Use `$fetch` for the API. Use `components/ui/*` for the UI.
3. Add a Playwright spec in `e2e/<name>.spec.ts`.
4. Update this spec.

## Adding auth

Not shipped by default. When a feature needs it:

1. Add `app/(auth)/login/page.tsx` + `app/(auth)/register/page.tsx`.
2. Add `providers/auth.tsx` (context + cookie helpers).
3. Wrap the routes that need protection in a client guard component.
4. Spec the flow here, including cookie names, TTLs, and refresh
   behaviour.

Follow the same principle as the rest of the app: keep it in its own
folder, keep the base readable.

## Env vars

| Var                        | Required | Purpose                          |
|----------------------------|----------|----------------------------------|
| `NEXT_PUBLIC_API_BASE_URL` | yes      | Backend origin (e.g. :8000)      |

## Tests

- `npm run typecheck` — tsc, no emit.
- `npm run test` — vitest, jsdom, RTL.
- `npm run test:e2e` — Playwright, dev server must be running.
