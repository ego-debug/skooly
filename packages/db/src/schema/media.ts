import { sql } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { users } from './users';

export const mediaUploads = pgTable('media_uploads', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id),
  uploadedBy: uuid('uploaded_by')
    .notNull()
    .references(() => users.id),
  relatedEntityType: text('related_entity_type', {
    enum: ['hifz_record', 'student_note', 'message'],
  }).notNull(),
  relatedEntityId: uuid('related_entity_id').notNull(),
  storageUrl: text('storage_url').notNull(),
  mimeType: text('mime_type'),
  durationSeconds: integer('duration_seconds'),
  consentVerified: boolean('consent_verified').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type MediaUpload = typeof mediaUploads.$inferSelect;
export type NewMediaUpload = typeof mediaUploads.$inferInsert;
