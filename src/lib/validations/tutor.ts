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

export const MAX_IMAGE_PAYLOAD_BYTES = Math.floor(1.5 * 1024 * 1024); // 1.5 MB = 1,572,864 bytes

export const tutorTurnSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string().trim().min(1, 'Turn text cannot be empty').max(2000, 'Turn text exceeds limit of 2000 characters'),
});

export const tutorRequestSchema = z.object({
  subjectId: z.enum(VALID_SUBJECT_IDS),
  unitIndex: z
    .number()
    .int('Unit index must be an integer')
    .min(0, 'Unit index cannot be negative')
    .max(15, 'Unit index exceeds maximum syllabus boundary'),
  question: z
    .string()
    .trim()
    .min(1, 'Question cannot be empty')
    .max(1000, 'Question exceeds maximum limit of 1000 characters'),
  // Max image payload 1.5 MB
  image: z
    .string()
    .max(MAX_IMAGE_PAYLOAD_BYTES, 'Image payload exceeds maximum limit of 1.5MB')
    .optional(),
  // Optional previous conversation history: at most 6 turns, text only, each <= 2000 chars
  history: z
    .array(tutorTurnSchema)
    .max(6, 'History cannot exceed 6 turns')
    .optional(),
  // Accepted for backward compatibility but ignored completely
  topicIndex: z.number().int().optional(),
  stepIndex: z.number().int().optional(),
});

export type TutorRequestInput = z.infer<typeof tutorRequestSchema>;
