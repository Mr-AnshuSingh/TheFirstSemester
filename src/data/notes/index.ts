export * from './types';
import type { QuickSubjectConfig, QuickSubjectId } from './types';
import { MATHS_QUICK_NOTES } from './maths';
import { PHYSICS_QUICK_NOTES } from './physics';
import { BEEE_QUICK_NOTES } from './beee';
import { AI_QUICK_NOTES } from './ai';
import { CFET_QUICK_NOTES } from './cfet';
import { UHV_QUICK_NOTES } from './uhv';

export const QUICK_NOTES_SUBJECTS: QuickSubjectConfig[] = [
  MATHS_QUICK_NOTES,
  PHYSICS_QUICK_NOTES,
  BEEE_QUICK_NOTES,
  AI_QUICK_NOTES,
  CFET_QUICK_NOTES,
  UHV_QUICK_NOTES,
];

export const QUICK_NOTES_MAP: Record<QuickSubjectId, QuickSubjectConfig> = {
  maths: MATHS_QUICK_NOTES,
  physics: PHYSICS_QUICK_NOTES,
  beee: BEEE_QUICK_NOTES,
  ai: AI_QUICK_NOTES,
  cfet: CFET_QUICK_NOTES,
  uhv: UHV_QUICK_NOTES,
};
