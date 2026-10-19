import { z } from 'zod';

/**
 * 1 MB maximum request body payload limit
 */
export const MAX_BODY_SIZE_BYTES = 1024 * 1024;

/**
 * Strict schema for /api/progress synchronization requests
 */
export const progressSyncSchema = z.object({
  done: z
    .record(
      z.string().min(1).max(100),
      z.union([z.boolean(), z.number().int().min(0).max(1)])
    )
    .default({}),
  customNotes: z
    .record(
      z.string().min(1).max(50),
      z.string().max(50000, 'Custom note content exceeds 50,000 character limit')
    )
    .default({}),
  lab: z.string().trim().max(20).default('G1'),
  exam: z.string().trim().max(100).default(''),
  confidence: z
    .record(
      z.string().min(1).max(100),
      z.union([z.number().int().min(0).max(3), z.enum(['low', 'med', 'high'])])
    )
    .optional()
    .default({}),
  starred: z
    .array(z.string().min(1).max(100))
    .max(1000, 'Exceeded maximum starred topics threshold')
    .optional()
    .default([]),
});

export type ProgressSyncInput = z.infer<typeof progressSyncSchema>;
