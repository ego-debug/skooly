import { sql } from 'drizzle-orm';
import { boolean, jsonb, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { classes } from './classes';
import { organizations } from './organizations';
import { students } from './students';
import { users } from './users';

export const messageThreads = pgTable('message_threads', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id),
  scope: text('scope', { enum: ['direct', 'class', 'school_wide'] }).notNull(),
  classId: uuid('class_id').references(() => classes.id),
  studentId: uuid('student_id').references(() => students.id),
  subject: text('subject'),
  requiresAck: boolean('requires_ack').default(false).notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  threadId: uuid('thread_id')
    .notNull()
    .references(() => messageThreads.id),
  senderUserId: uuid('sender_user_id')
    .notNull()
    .references(() => users.id),
  content: text('content').notNull(),
  contentTranslations: jsonb('content_translations'),
  attachments: jsonb('attachments'),
  isPinned: boolean('is_pinned').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const messageReads = pgTable(
  'message_reads',
  {
    messageId: uuid('message_id')
      .notNull()
      .references(() => messages.id),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    readAt: timestamp('read_at', { withTimezone: true }).defaultNow().notNull(),
    acknowledged: boolean('acknowledged').default(false).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.messageId, t.userId] }),
  }),
);

export type MessageThread = typeof messageThreads.$inferSelect;
export type NewMessageThread = typeof messageThreads.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type MessageRead = typeof messageReads.$inferSelect;
