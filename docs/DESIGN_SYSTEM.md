# MyWora Design System

Phase 2 foundation. Single source of truth for tokens and UI primitives —
every future phase (auth, dashboards, portals) must build on this layer.

## Brand colors

| Token             | Value                   | Usage                                |
| ----------------- | ----------------------- | ------------------------------------ |
| `navy`            | `#0D153F`               | Headings, body ink, primary contrast |
| `brand` (blue)    | `#1455E8` (ramp 50–900) | Primary actions, links, focus rings  |
| `accent` (orange) | `#FF6A32` (ramp 50–700) | Highlights, secondary accents        |
| `mist`            | `#E9EEF0`               | Page background                      |
| `cream`           | `#F7F3EA`               | Alternating section background       |
| `page`            | `#F7F8FA`               | Admin/dashboard app background       |
| `success`         | `#10B981` ramp          | Positive states                      |
| `danger`          | `#EF4444` ramp          | Errors, destructive states           |
| `warning`         | `#F59E0B` ramp          | Cautions                             |

Semantic tokens are mirrored as CSS variables in `src/index.css`
(`--wora-navy`, `--wora-success`, …).

## Typography

Manrope Variable (self-hosted via `@fontsource-variable/manrope`).
Editorial style: medium weight, tight tracking, no heavy bold headings.

| Class           | Styles                               | Usage             |
| --------------- | ------------------------------------ | ----------------- |
| `.text-display` | clamp(2.6rem → 5.4rem), leading 1.02 | Hero headline     |
| `.text-h1`      | clamp(2.1rem → 3.4rem), leading 1.06 | Section headlines |
| `.text-h2`      | 24→30px, bold                        | Panel titles      |
| `.text-h3`      | 16px, extrabold                      | Small headings    |
| `.text-lead`    | 15→16px, relaxed                     | Intro paragraphs  |
| `.eyebrow`      | 12px bold uppercase, blue            | Section labels    |

## Layout & helpers (`src/index.css`)

- `.container-x` — max-w-7xl + responsive padding (use via `<Container />`)
- `.container-narrow` / `.container-wide` — max-width overrides
- `.focus-ring` — shared focus-visible treatment
- `.card`, `.icon-tile`, `.btn*`, `.dot-grid`, `.dot-grid-light` — building blocks

## Motion

- `<Reveal>` — IntersectionObserver fade/slide with `delay` staggering
- `.animate-float` — gentle looping float (hero mockup)
- All motion respects `prefers-reduced-motion`

## Components (`src/components/ui/`)

### Button

Variants: `primary` · `outline` · `white` · `ghostLight` — Sizes: `sm` · `md` · `lg`
Props: `to` (router link) · `href` (anchor) · `withArrow` · `loading` · `disabled`

```tsx
<Button to="/register" size="lg">Start Free</Button>
<Button variant="outline" loading>Save</Button>
```

### Input / Textarea / Select

Shared API: `label`, `hint`, `error`, `required`, `disabled`.
Input adds `leadingIcon`; Select takes `options` + `placeholder`.
Error state wires `aria-invalid` + `aria-describedby` automatically.

```tsx
<Input label="Workshop name" placeholder="FA Auto" required />
<Select label="City" options={cities} error="Required" />
```

### Badge

Tones: `brand` · `accent` · `success` · `danger` · `warning` · `neutral`
Sizes: `sm` · `md`

### Card

`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

### Others

`Avatar` (initials, no images) · `Spinner` · `Skeleton` · `Container` ·
`SectionHeading` · `Reveal` · `PageHeader` · `EmptyState` (variants: `boxed` ·
`plain` — plain sits directly on a card) · `StatCard` (dashboard metric tile:
tinted icon, label, value, caption; tones incl. `danger`)

Date-range display helpers (`src/lib/dateRange.ts`) produce range labels and
axis ticks for the Super Admin dashboard — pure utilities, no data attached.

Platform constants (e.g. `PLATFORM_PLANS`) live in `src/config/` and are
clearly marked when they are frontend-only stand-ins for future API data.

## Rules for future phases

1. Never hardcode hex values in components — use tokens.
2. New primitives belong in `src/components/ui/` with a unit test.
3. Marketing mockups (`components/landing/mockups/`) never import from
   application data layers — and application code never imports them.
