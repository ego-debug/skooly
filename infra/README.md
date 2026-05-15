# Infra

This directory holds:

- Supabase project config and SQL migrations (RLS policies, etc.)
- Stripe webhook handlers and event mappings (when separated from app routes)
- IaC for any deployment-time resources

For v1, most of this is empty — Vercel + Supabase managed environments handle hosting, and Stripe webhooks live under `apps/web/src/app/api/stripe/webhook`. Migrate here when complexity warrants.

## Supabase

```bash
# Install Supabase CLI: https://supabase.com/docs/guides/cli
supabase init
supabase start              # local dev stack
supabase db diff            # diff against migrations
supabase db push            # apply to remote
```

## Drizzle migrations

Schema lives in `packages/db/src/schema`. Generate SQL with:

```bash
pnpm --filter @skooly/db db:generate
```

Generated migrations land in `packages/db/drizzle/`. Apply via Supabase migrations or `db:push` in dev.
