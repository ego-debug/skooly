import { sql } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { students } from './students';
import { users } from './users';

export const consents = pgTable('consents', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id),
  studentId: uuid('student_id')
    .notNull()
    .references(() => students.id),
  guardianUserId: uuid('guardian_user_id')
    .notNull()
    .references(() => users.id),
  consentType: text('consent_type', {
    enum: ['photo', 'audio', 'data_sharing'],
  }).notNull(),
  granted: boolean('granted').notNull(),
  grantedAt: timestamp('granted_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Consent = typeof consents.$inferSelect;
export type NewConsent = typeof consents.$inferInsert;
