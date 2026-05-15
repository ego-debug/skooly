import { sql } from 'drizzle-orm';
import { date, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { users } from './users';

export const students = pgTable('students', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id),
  userId: uuid('user_id').references(() => users.id),
  fullName: text('full_name').notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  gender: text('gender'),
  photoUrl: text('photo_url'),
  medicalNotes: text('medical_notes'),
  emergencyContacts: jsonb('emergency_contacts'),
  enrolledAt: date('enrolled_at'),
  graduatedAt: date('graduated_at'),
  status: text('status').default('active').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
