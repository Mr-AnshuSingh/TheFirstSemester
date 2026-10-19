import { z } from 'zod';

export const VALID_SUBJECT_IDS = [
  'math',
  'phy',
  'beee',
  'ai',
  'cfet',
  'uhv',
  'pps',
  'eic',
] as const;

export const tutorRequestSchema = z.object({
  subjectId: z.enum(VALID_SUBJECT_IDS),
  unitIndex: z
    .number()
    .int('Unit index must be an integer')
    .min(0, 'Unit index cannot be negative')
    .max(15, 'Unit index exceeds maximum syllabus boundary'),
  stepIndex: z
    .number()
    .int('Step index must be an integer')
    .min(0, 'Step index cannot be negative')
    .max(25, 'Step index exceeds maximum step boundary'),
  question: z
    .string()
    .trim()
    .min(1, 'Question cannot be empty')
    .max(1000, 'Question exceeds maximum limit of 1000 characters'),
});

export type TutorRequestInput = z.infer<typeof tutorRequestSchema>;
