# Skooly — handoff

Pick this up cold and you'll have everything you need to keep building.

## What Skooly is

A **parent-first school management platform for North American Islamic schools** — weekend Sunday schools, full-time Islamic academies, and independent Quran tutors. The product replaces the three things every Islamic school currently runs on:

- **WhatsApp class groups** → a quiet, per-child feed with attendance, hifz, praise, and homework
- **Paper attendance sheets** → tap-to-mark teacher app that wraps a class in 60 seconds
- **Zelle screenshots and paper checks** → Stripe-powered tuition with autopay, sibling discounts, and a reconciled ledger

Three personas, one platform:
- **Parents** want to know how their kid did at Quran class without scrolling 47 WhatsApps
- **Teachers** want post-class admin done before they reach the parking lot
- **Principals** want a single dashboard for attendance, tuition, hifz progress, and board reports

## The critical path

The load-bearing feature is the **teacher 60-second class wrap (F-TC-1)**. Every other v1 feature exists to support it (so teachers can fill it out) or to surface its output (parent feed, principal dashboard). If F-TC-1 isn't fast and good, nothing else matters.

A class wrap is four taps:
1. Attendance — bulk-mark present, tap exceptions
2. Record hifz audio — tap mic, child recites, tap stop
3. Praise + homework — pick category (Adab, Effort, Improvement, Helpfulness), type one line
4. Confirm + send — publish to every parent

Targets: total time ≤ 60 seconds, works offline, recordings queue locally and sync when wifi returns (many weekend schools meet in masjid basements with terrible signal).

## What's built right now

Two things on `main`:

### 1. Bootstrap monorepo
- Turborepo + pnpm workspace skeleton
- Empty Next.js (web) and Expo (mobile) app shells with stub pages
- Drizzle schema for the v1 data model in `packages/db/src/schema/`
- Shared TS types and Zod schemas in `packages/shared`
- **No business logic yet** — these are placeholders, not implementations

### 2. Marketing site
- Five Next.js App Router routes: `/`, `/for-parents`, `/for-teachers`, `/for-principals`, `/pricing`
- Shared chrome in `apps/web/src/components/marketing/`: nav, footer, CTA, persona sidebar, page hero
- Product UI mocks in `marketing/mocks.tsx`: hifz player (playable), class wrap (live timer), principal dashboard, payments card
- ~2100 lines of design CSS in `apps/web/src/app/globals.css` keyed off CSS variables — no Tailwind utilities used for marketing styling

**The marketing site is the canonical source for brand voice, palette, typography, and product narrative.** When you change copy elsewhere, mirror the tone there.

### What's not built
- Real auth (Supabase Auth not wired up; no sign-in UI)
- Any of the actual product flows: parent feed, teacher class wrap, principal dashboard, tuition
- Mobile app beyond Expo boilerplate
- API routes (no `apps/web/src/app/api/` directory yet)
- Database (schema exists but no migrations have been pushed; no Supabase project provisioned)
- Stripe wiring

## Brand system

### Palette

Defined as CSS variables in `apps/web/src/app/globals.css`. Mirror these when adding components — don't reach for Tailwind colors.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#fafaf9` | page background |
| `--bg-warm` | `#f5f5f4` | section bands |
| `--surface` | `#ffffff` | cards |
| `--fg` | `#0c0a09` | primary text + dark sections |
| `--fg-2` | `#1c1917` | body text variant |
| `--muted` | `#57534e` | secondary text |
| `--subtle` | `#a8a29e` | tertiary text |
| `--border` | `#e7e5e4` | hairlines |
| `--accent` | `#059669` | emerald: brand accent, buttons, hifz |
| `--accent-700` | `#047857` | accent hover |
| `--accent-soft` | `#ecfdf5` | tinted backgrounds |
| `--warn` | `#f59e0b` | late attendance, praise, warnings |
| `--rose` | `#e11d48` | record button, errors, absent |
| `--indigo` | `#6366f1` | homework cards |

Warm stone neutrals + emerald accent. Don't use cool slate grays — they break the warmth.

### Typography

Three families, loaded via `next/font/google` in `apps/web/src/app/layout.tsx`:

- **Geist Sans** (`--font-geist-sans`) — body and headings
- **Geist Mono** (`--font-geist-mono`) — labels, timestamps, monospaced numbers, eyebrow text
- **Instrument Serif** (`--font-instrument-serif`) — used italic for accent words inside headlines ("Islamic", "sixty seconds") and for pull-quotes. Apply via the `.serif` class.

Type scale:
- Hero headlines: clamp(40px, 5.4vw, 68px), weight 600, letter-spacing -0.035em
- Section headers: clamp(32px, 4vw, 48px)
- Body text: 15-17px, line-height 1.5-1.6, color `--muted`
- Eyebrows: 11px, monospace, uppercase, letter-spacing 0.12em

### Voice

The marketing site copy is the source of truth. Rules followed when writing it (apply to UI copy too):

- **No em-dashes anywhere.** Use periods or commas.
- **Contractions are fine.** "Don't", "won't", "you'll".
- **Short sentences.** Two clauses max. Prefer two periods over one comma.
- **No parallel triplets.** "Fast, friendly, and intuitive" reads like AI slop.
- **Specific over vague.** "Marked late at 9:18. You'll know by 9:19." not "Real-time notifications."
- **Islamic phrases used naturally, not gratuitously.** Mashallah, jazakAllah khair, ummah — fine where they fit, never sprinkled in for flavor.
- **Concrete examples in mocks.** Sister Sumayya, Aisha R., Surah Al-Fatihah ayah 5. Not Lorem Ipsum.
- **Honest about scope.** If something's not in v1, say so. The marketing site explicitly excludes features the main competitor (Ilmify) advertises but Skooly doesn't have: biometric attendance, hostel/transport/library/medical modules, ISO/GDPR badges, certificate generation, multi-language UI.

## Tech stack

| Layer | Choice |
|---|---|
| Web framework | Next.js 16 App Router |
| Mobile | Expo + React Native (TypeScript) |
| Styling | Tailwind 4 for app surfaces, plain CSS + CSS variables for marketing |
| Backend | Next.js API routes (v1 monolith — no separate server) |
| Database | Postgres on Supabase, schema via Drizzle ORM |
| Auth / Storage / Realtime | Supabase |
| Payments | Stripe Connect + Billing + Tax |
| Email / SMS / Push | Resend, Twilio, Expo Push |
| Lint / Format | Biome (not ESLint/Prettier) |
| Monorepo | Turborepo + pnpm workspaces |
| Type system | TypeScript strict, Zod for runtime validation |

### Conventions

- File paths use `@/` alias → `apps/web/src/` (see `apps/web/tsconfig.json`)
- Server components by default in App Router; mark `'use client'` only when you need state, effects, or browser APIs
- Don't reach for ESLint, Prettier, or shadcn — Biome handles lint/format, design components are bespoke
- Route groups: `(admin)`, `(parent)`, `(teacher)` already exist with stub pages; marketing routes are flat
- Mock data for the marketing UI lives inline in `marketing/mocks.tsx` — when wiring real product flows, swap these out, don't import them in product code

## Repo layout

```
skooly/
├── apps/
│   ├── web/                                    Next.js (admin + parent web + marketing)
│   │   └── src/
│   │       ├── app/
│   │       │   ├── (admin)/admin/             principal dashboard route group (stub)
│   │       │   ├── (parent)/parent/           parent web app route group (stub)
│   │       │   ├── (teacher)/teacher/         teacher web app route group (stub)
│   │       │   ├── for-parents/               marketing: persona page
│   │       │   ├── for-teachers/              marketing: persona page
│   │       │   ├── for-principals/            marketing: persona page
│   │       │   ├── pricing/                   marketing: pricing
│   │       │   ├── page.tsx                   marketing: landing
│   │       │   ├── layout.tsx                 root layout, fonts
│   │       │   └── globals.css                full design system
│   │       └── components/marketing/          shared marketing chrome + product mocks
│   └── mobile/                                Expo (parent + teacher mobile app)
├── packages/
│   ├── shared/                                Zod schemas, TS types (Role, NoteType, etc.)
│   ├── db/                                    Drizzle schema, client
│   ├── ui/                                    shared design primitives (empty for now)
│   └── api-client/                            typed API client (empty for now)
├── infra/                                     Supabase migrations, Stripe webhooks
├── biome.json                                 lint + format config
├── turbo.json                                 task pipeline
└── pnpm-workspace.yaml
```

## Running locally

```bash
# Node 22, pnpm 9+
pnpm install
cp .env.example .env.local
pnpm dev                                       # runs all apps via turbo
# or just web:
pnpm --filter @skooly/web dev                  # http://localhost:3000
```

For the marketing site alone, `.env.local` can stay empty. For anything touching Supabase, Stripe, or Resend, fill in the relevant keys (see `.env.example`).

Useful scripts:
- `pnpm lint` — Biome
- `pnpm typecheck` — TS across all workspaces
- `pnpm --filter @skooly/db db:generate` — generate Drizzle migrations from schema
- `pnpm --filter @skooly/db db:push` — apply schema to dev DB

## Domain model (snapshot)

Defined in `packages/shared/src/types.ts`:

- **Roles**: `admin | principal | teacher | parent | student`
- **Org types**: `weekend_school | full_time | tutor` (the three customer segments)
- **Attendance**: `present | absent | late | excused`
- **Hifz streams**: `sabak | sabqi | manzil` (daily new lesson / recent revision / cumulative review)
- **Notes**: `praise | concern | general | homework`
- **Payments**: `pending | succeeded | failed | refunded`
- **Message scope**: `direct | class | school_wide`
- **Consents**: `photo | audio | data_sharing` (parent opt-in per type — needed before any media goes home)

Drizzle tables in `packages/db/src/schema/` — one file per aggregate. They're the source of truth for IDs, FKs, and required fields.

## What's next (suggested order)

1. **Provision Supabase** — create the project, run `db:generate` + `db:push` to land the schema, wire `DATABASE_URL` and the public keys into `.env.local`
2. **Auth** — Supabase Auth with magic-link sign-in for parents and teachers, role + membership checks at the layout level for the three route groups
3. **Seed data** — minimal seed script: one school, one class, three teachers, twenty students with two parents each, ten days of attendance
4. **F-TC-1 teacher class wrap** — the load-bearing flow. Start with the web version (`apps/web/src/app/(teacher)/teacher/wrap/page.tsx`), then port to Expo. Audio recording for hifz is the hardest sub-problem — queue locally with IndexedDB / MMKV, sync on reconnect
5. **F-PA-1 parent feed** — once class wraps produce data, render it as a per-child timeline. Push notifications via Expo Push (mobile) and Web Push (browser)
6. **F-PR-1 principal dashboard** — read-only aggregations off the class wrap data: attendance roll-up, hifz wins, message queue
7. **Tuition** — Stripe Connect Standard accounts per school, Billing for autopay, sibling discount rules at the org level

The marketing site mocks (`apps/web/src/components/marketing/mocks.tsx`) are the visual target for these flows. Match the layout, swap the data source.

## Context that isn't in code

- **Main competitor**: Ilmify. Serves a similar audience but the UX is heavy and they over-index on admin features (biometric attendance, hostel modules) that small weekend schools don't need. Skooly's wedge is parent-first and teacher-fast.
- **Pricing posture**: every tier includes every feature for parents and teachers. The tiers only differ at the principal layer. See `apps/web/src/app/pricing/pricing-tiers.tsx`:
  - Quran Tutor — $19/mo, ≤25 students
  - Weekend School — $79/mo + $1.50/student
  - Full-time Academy — $249/mo + $1/student
  Per-student, not per-parent. Parents are free — you want as many of them in the feed as possible.
- **Geographic scope**: North America for v1 (Stripe Connect, Resend, Twilio support, English-only UI). Arabic / Urdu / French interfaces are explicitly on the roadmap but not v1.
- **Compliance**: no FERPA / COPPA claims yet — get a lawyer's eyes before promising any. Parent consent flow (`consent_type` in schema) covers photo / audio / data sharing.

## For AI assistants picking this up

If you're an AI agent helping continue this work:

- Treat the marketing site copy as your style guide. Match its voice and palette anywhere you add new UI.
- Read `apps/web/src/app/globals.css` before adding styles. Don't fight the design system — extend it via the same CSS variables.
- The `marketing/mocks.tsx` components are *prototypes for the marketing site*. When wiring real flows, base the new components on these visually but pull data from real sources. Don't import from `marketing/mocks` in product code.
- Biome is the formatter. Run `pnpm lint` before committing. On Windows, CRLF/LF issues can appear — let `biome check --write` auto-resolve.
- **No em-dashes in copy. Anywhere.**
- When in doubt about scope or copy, the marketing pages are the source of truth — they were iterated on directly with the founder and reflect the current product positioning.
