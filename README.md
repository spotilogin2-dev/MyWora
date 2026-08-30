# MyWora

Multi-tenant B2B SaaS platform for automobile workshops.
This repository is built in **strict sequential phases** — one phase at a time,
verified and frozen before the next begins.

## Current status

| Phase | Scope                                 | Status         |
| ----- | ------------------------------------- | -------------- |
| 1     | Landing page (`/`)                    | ✅ Complete    |
| 2     | Project foundation + design system    | ✅ Complete    |
| 3     | Super Admin frontend (`/super-admin`) | ✅ Complete    |
| 4     | Business Registration (`/register`)   | ✅ Complete    |
| 5+    | Auth, database, dashboards, portals…  | ⏳ Not started |

The landing page and the business registration wizard are the public surfaces
today. `/login` still renders a minimal "coming soon" page — no authentication
has been built yet — and `/signup` redirects to `/register`.

A frontend-only **Super Admin console** lives at `/super-admin` — a dashboard-style
UI (white sidebar, metric tiles, empty chart, businesses table) matching the
approved reference design. Sections: overview, businesses, plans, analytics,
activity, settings, support and platform admins. It is intentionally ungated
until authentication lands in Phase 5, and it shows real empty states — no demo
data anywhere.

A frontend-only **Business Registration wizard** lives at `/register` — a
three-step flow (Business Information → Owner Account → Review & Confirm) with
the brand panel, live workspace-URL preview and "What's Next?" rail from the
approved reference design. Everything validates client-side, including a
reserved-subdomain availability check; nothing is stored — accounts go live in
Phase 5 and workspace provisioning in Phase 6.

## Tech stack

- Vite + React 18 + TypeScript (strict)
- Tailwind CSS (design tokens in `tailwind.config.js`)
- React Router
- Vitest + Testing Library
- ESLint 9 (flat config) + Prettier

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `npm run dev`        | Start the dev server              |
| `npm run build`      | Type-check + production build     |
| `npm run preview`    | Preview the production build      |
| `npm run lint`       | Lint with ESLint                  |
| `npm run format`     | Format with Prettier              |
| `npm run typecheck`  | TypeScript only                   |
| `npm test`           | Run unit tests (Vitest, run once) |
| `npm run test:watch` | Vitest in watch mode              |

## Project structure

```
src/
├─ components/
│  ├─ landing/        # Landing page sections (Phase 1)
│  │  └─ mockups/     # Static visual mockups — marketing content only
│  ├─ ui/             # Design-system primitives (Phase 2)
│  ├─ Reveal.tsx      # Scroll-reveal wrapper
│  └─ Logo.tsx
├─ hooks/             # useScrolled, useRegistration, …
├─ lib/               # cn(), env, registration
├─ pages/             # Route-level pages
└─ test/              # Vitest setup
```

## Conventions

- **Path alias** — `@/*` maps to `src/*`. New code imports via `@/`; the
  Phase 1 landing page intentionally keeps its short relative imports.
- **Class merging** — compose classes with `cn()` from `@/lib/cn` so
  overrides win deterministically.
- **Design tokens** — colors, typography and shadows live in
  `tailwind.config.js` + `src/index.css`. See `docs/DESIGN_SYSTEM.md`.
- **Content honesty** — marketing mockups contain illustrative values only;
  they are never treated as application data, and no database exists yet.
- **Environment** — public config goes through `VITE_*` vars
  (see `.env.example`) read via `@/lib/env`. No secrets in the client.
