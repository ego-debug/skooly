import { z } from 'zod';

export const roleSchema = z.enum(['admin', 'principal', 'teacher', 'parent', 'student']);

export const attendanceStatusSchema = z.enum(['present', 'absent', 'late', 'excused']);

export const hifzStreamSchema = z.enum(['sabak', 'sabqi', 'manzil']);

export const ayahRangeSchema = z
  .object({
    surah_number: z.number().int().min(1).max(114),
    ayah_start: z.number().int().min(1),
    ayah_end: z.number().int().min(1),
  })
  .refine((v) => v.ayah_end >= v.ayah_start, {
    message: 'ayah_end must be >= ayah_start',
  });

export const hifzRecordInputSchema = ayahRangeSchema.and(
  z.object({
    student_id: z.string().uuid(),
    class_id: z.string().uuid().optional(),
    stream: hifzStreamSchema,
    session_date: z.string().date(),
    accuracy_score: z.number().int().min(0).max(100).optional(),
    audio_url: z.string().url().optional(),
    teacher_notes: z.string().max(2000).optional(),
  }),
);

export const attendanceRecordInputSchema = z.object({
  class_id: z.string().uuid(),
  student_id: z.string().uuid(),
  session_date: z.string().date(),
  status: attendanceStatusSchema,
  arrival_time: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
});

export type HifzRecordInput = z.infer<typeof hifzRecordInputSchema>;
export type AttendanceRecordInput = z.infer<typeof attendanceRecordInputSchema>;
