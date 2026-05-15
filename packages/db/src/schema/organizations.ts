import { sql } from 'drizzle-orm';
import { boolean, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  ein: text('ein'),
  is501c3: boolean('is_501c3').default(false).notNull(),
  address: jsonb('address'),
  timezone: text('timezone').notNull().default('America/New_York'),
  branding: jsonb('branding'),
  type: text('type', { enum: ['weekend_school', 'full_time', 'tutor'] }).notNull(),
  stripeAccountId: text('stripe_account_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
