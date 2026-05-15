# Skooly

Parent-first school management platform for North American Islamic schools, full-time academies, and Quran tutors.

See `outputs/ISLAMI~1.MD` (Islamic School Platform — Build Specification) for the full v1 spec.

## Stack

- **Frontend (web):** Next.js 16 (App Router) + TypeScript + Tailwind 4
- **Frontend (mobile):** Expo + React Native + TypeScript
- **Backend:** Next.js API routes (v1 monolith)
- **Database:** Postgres via Supabase, Drizzle ORM
- **Auth/Storage/Realtime:** Supabase
- **Payments:** Stripe (Connect + Billing + Tax)
- **Email/SMS/Push:** Resend, Twilio, Expo Push
- **Lint/Format:** Biome
- **Monorepo:** Turborepo + pnpm workspaces

## Layout

```
skooly/
├── apps/
│   ├── web/         # Next.js admin + parent web app
│   └── mobile/      # Expo React Native app
├── packages/
│   ├── shared/      # Shared types + Zod schemas
│   ├── db/          # Drizzle schema + client
│   ├── ui/          # Shared component primitives
│   └── api-client/  # Typed API client
└── infra/           # Supabase migrations, Stripe webhooks
```

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts

- `pnpm dev` — start all apps in dev mode
- `pnpm build` — build all packages and apps
- `pnpm lint` — lint via Biome
- `pnpm typecheck` — typecheck all workspaces
- `pnpm --filter @skooly/db db:generate` — generate Drizzle migrations
- `pnpm --filter @skooly/db db:push` — push schema to dev database

## v1 scope

See spec section 12. The critical path is the teacher 60-second class wrap (F-TC-1) — every other v1 feature exists to support it or to give parents/principals visibility into the data it produces.
