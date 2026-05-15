import { sql } from 'drizzle-orm';
import { date, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { classes } from './classes';
import { organizations } from './organizations';
import { students } from './students';
import { users } from './users';

export const attendanceRecords = pgTable('attendance_records', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id),
  classId: uuid('class_id')
    .notNull()
    .references(() => classes.id),
  studentId: uuid('student_id')
    .notNull()
    .references(() => students.id),
  sessionDate: date('session_date').notNull(),
  status: text('status', { enum: ['present', 'absent', 'late', 'excused'] }).notNull(),
  arrivalTime: timestamp('arrival_time', { withTimezone: true }),
  notes: text('notes'),
  recordedBy: uuid('recorded_by')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type AttendanceRecord = typeof attendanceRecords.$inferSelect;
export type NewAttendanceRecord = typeof attendanceRecords.$inferInsert;
