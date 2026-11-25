import type { ExamSitting } from '@/data/midsemTimetable';

export type MidsemMode =
  | 'notes'
  | 'practice'
  | 'diagrams'
  | 'chapters'
  | 'mcq'
  | 'simulator'
  | 'papers'
  | 'calculator'
  | 'predictor';

export type ModeGroupId = 'study' | 'practice' | 'tools';

export interface ModeDefinition {
  id: MidsemMode;
  group: ModeGroupId;
  label: string;
  shortLabel: string;
}

export const MIDSEM_MODES: ModeDefinition[] = [
  { id: 'notes', group: 'study', label: 'High-Yield Notes', shortLabel: 'Notes' },
  { id: 'practice', group: 'study', label: 'Solved Practice', shortLabel: 'Practice Qs' },
  { id: 'diagrams', group: 'study', label: 'Exam Diagrams', shortLabel: 'Diagrams' },
  { id: 'chapters', group: 'study', label: 'Chapter Index', shortLabel: 'Chapters' },
  { id: 'mcq', group: 'practice', label: 'CBT MCQ Bank', shortLabel: 'MCQs' },
  { id: 'simulator', group: 'practice', label: 'Mock Test', shortLabel: 'Mock Test' },
  { id: 'papers', group: 'practice', label: 'Papers 2026', shortLabel: 'Papers' },
  { id: 'calculator', group: 'tools', label: 'Calculators', shortLabel: 'Calculators' },
  { id: 'predictor', group: 'tools', label: '15-Pillar Score', shortLabel: 'Score' },
];

export const MODE_GROUP_META: { id: ModeGroupId; label: string; defaultMode: MidsemMode }[] = [
  { id: 'study', label: 'Study', defaultMode: 'notes' },
  { id: 'practice', label: 'Practice', defaultMode: 'mcq' },
  { id: 'tools', label: 'Tools', defaultMode: 'calculator' },
];

export interface SubjectChipMeta {
  code: string;
  displayShort: string; // Consistent "AI" naming matching main app
  fullTitle: string;
}

export const MIDSEM_SUBJECT_CHIPS: SubjectChipMeta[] = [
  { code: '100111', displayShort: 'BEEE', fullTitle: 'Basics of Electrical & Electronics Engineering' },
  { code: '100102', displayShort: 'Math-I', fullTitle: 'Engineering Mathematics – I' },
  { code: '100104', displayShort: 'Physics', fullTitle: 'Engineering Physics' },
  { code: '100105', displayShort: 'AI', fullTitle: 'Introduction to AI' },
  { code: '100108', displayShort: 'CFET', fullTitle: 'Computer Fundamentals & Emerging Technology' },
  { code: '100109', displayShort: 'UHV', fullTitle: 'Universal Human Values' },
];

export const SUBJECT_CODE_ALIASES: Record<string, string> = {
  beee: '100111',
  '100111': '100111',
  math: '100102',
  'math-i': '100102',
  maths: '100102',
  '100102': '100102',
  phy: '100104',
  physics: '100104',
  '100104': '100104',
  ai: '100105',
  iai: '100105',
  '100105': '100105',
  cfet: '100108',
  '100108': '100108',
  uhv: '100109',
  '100109': '100109',
};

export interface PersistedPortalState {
  subject: string;
  unit: number;
  mode: MidsemMode;
  scrollY: number;
  notesSubView: 'cards' | 'handbook';
}

export const PORTAL_STORAGE_KEY = 'midsem:portal:v1';
export const MCQ_STORAGE_PREFIX = 'midsem:mcq:v1:';
export const MOCK_STORAGE_PREFIX = 'midsem:mock:v1:';
export const PILLARS_STORAGE_KEY = 'midsem:pillars:v1';

export function normalizeSubjectCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const clean = raw.trim().toLowerCase();
  if (SUBJECT_CODE_ALIASES[clean]) return SUBJECT_CODE_ALIASES[clean];
  return null;
}

export function normalizeUnitNumber(raw: string | number | null | undefined, allowedUnits: number[]): number | null {
  if (raw === null || raw === undefined) return null;
  const num = typeof raw === 'number' ? raw : Number(String(raw).trim());
  if (!Number.isInteger(num)) return null;
  if (num === 0) return 0;
  return allowedUnits.includes(num) ? num : null;
}

export function normalizeMode(raw: string | null | undefined): MidsemMode | null {
  if (!raw) return null;
  const clean = raw.trim().toLowerCase();
  const found = MIDSEM_MODES.find((m) => m.id === clean);
  return found ? found.id : null;
}

export function formatTimeRemaining(targetIso: string, endIso: string, nowMs: number): string {
  const startMs = new Date(targetIso).getTime();
  const endMs = new Date(endIso).getTime();
  if (Number.isNaN(startMs)) return 'Schedule pending';

  const diff = startMs - nowMs;
  if (diff <= 0) {
    if (!Number.isNaN(endMs) && nowMs <= endMs) return 'Sitting live now';
    return 'Sitting completed';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) return `in ${days}d ${hours}h ${mins}m`;
  return `in ${hours}h ${mins}m`;
}

export function formatSittingShortDate(isoDate: string): string {
  // e.g. '2026-11-27' -> '27 Nov'
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIdx = Number(parts[1]) - 1;
  return `${Number(parts[2])} ${months[monthIdx] || parts[1]}`;
}

export function pickSubjectSitting(subjectCode: string, sittings: ExamSitting[]): ExamSitting | undefined {
  const norm = normalizeSubjectCode(subjectCode) || subjectCode;
  const suffix = norm.slice(-3);
  return sittings.find((s) => {
    const parts = s.subjectCode.split('/').map((p) => p.trim());
    return parts.includes(norm) || parts.includes(suffix) || s.subjectCode.includes(norm);
  });
}

export function getDisplaySubjectShort(code: string, fallbackShort?: string): string {
  const found = MIDSEM_SUBJECT_CHIPS.find((s) => code.includes(s.code) || s.code === code);
  if (found) return found.displayShort;
  if (fallbackShort === 'IAI') return 'AI';
  return fallbackShort || code;
}
