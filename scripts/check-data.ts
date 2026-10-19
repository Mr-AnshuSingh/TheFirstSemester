import { SUBJECTS } from '../src/data/subjects';
import { SC } from '../src/data/scenes';
import { PPS_EXPERIMENTS } from '../src/data/ppsExperiments';
import { QUIZ_BANK } from '../src/data/quizBank';
import { TOPIC_CONTENT } from '../src/data/topicContent';
import {
  migrateStudyState,
  exportStudyStateAsJSON,
  validateAndParseImportJSON,
  CURRENT_STORAGE_VERSION,
} from '../src/lib/offlineStorage';
import { progressSyncSchema, MAX_BODY_SIZE_BYTES } from '../src/lib/validations/progress';
import { isAuthConfigured, extractAuthToken } from '../src/lib/auth';
import { tutorRequestSchema } from '../src/lib/validations/tutor';
import { checkRateLimit, resetRateLimitStore } from '../src/lib/rateLimit';
import * as fs from 'fs';
import * as path from 'path';

interface CheckResult {
  passed: boolean;
  message: string;
  expected: any;
  actual: any;
}

const checks: CheckResult[] = [];

function assertCheck(name: string, actual: any, expected: any, condition: boolean) {
  checks.push({
    passed: condition,
    message: name,
    expected,
    actual,
  });
}

// 1. Subjects count
assertCheck('Subject count', SUBJECTS.length, 8, SUBJECTS.length === 8);

// 2. Units count
const totalUnits = SUBJECTS.reduce((acc, s) => acc + s.units.length, 0);
assertCheck('Unit count', totalUnits, 43, totalUnits === 43);

// 3. Scenes in SC count
const totalScenes = Object.keys(SC).length;
assertCheck('Scene count in SC', totalScenes, 43, totalScenes === 43);

// 4. Total credits
const totalCredits = SUBJECTS.reduce((acc, s) => acc + s.cr, 0);
assertCheck('Total credits', totalCredits, 20, totalCredits === 20);

// 5. Total topics count
const totalTopics = SUBJECTS.reduce(
  (acc, s) => acc + s.units.reduce((uAcc, u) => uAcc + u.topics.length, 0),
  0
);
assertCheck('Total topics count', totalTopics, 291, totalTopics === 291);

// 6. PPS Experiments count
assertCheck('PPS experiments count', PPS_EXPERIMENTS.length, 17, PPS_EXPERIMENTS.length === 17);

// 7. Each scene has at least 2 steps
const scenesUnderTwoSteps: string[] = [];
for (const [key, scene] of Object.entries(SC)) {
  if (!scene.steps || scene.steps.length < 2) {
    scenesUnderTwoSteps.push(`${key} (${scene.steps?.length ?? 0} steps)`);
  }
}
assertCheck(
  'Each scene has at least 2 steps',
  scenesUnderTwoSteps.length === 0 ? 'All scenes >= 2 steps' : scenesUnderTwoSteps.join(', '),
  '0 scenes under 2 steps',
  scenesUnderTwoSteps.length === 0
);

// 8. Each subject has ex, fm, and hook
const invalidSubjects: string[] = [];
for (const s of SUBJECTS) {
  const hasEx = s.ex && Array.isArray(s.ex.q) && Array.isArray(s.ex.a) && Array.isArray(s.ex.x);
  const hasFm = Array.isArray(s.fm) && s.fm.length > 0;
  const hasHook = typeof s.hook === 'string' && s.hook.trim().length > 0;
  if (!hasEx || !hasFm || !hasHook) {
    invalidSubjects.push(s.id);
  }
}
assertCheck(
  'Each subject has valid ex, fm, and hook',
  invalidSubjects.length === 0 ? 'All subjects valid' : invalidSubjects.join(', '),
  'All subjects valid',
  invalidSubjects.length === 0
);

// 9. Quiz Bank question count and unit coverage
assertCheck('Quiz bank total questions', QUIZ_BANK.length, 86, QUIZ_BANK.length === 86);
const unitsWithTwoQuestions = SUBJECTS.every((s) =>
  s.units.every((_, uIdx) => {
    const qCount = QUIZ_BANK.filter((q) => q.subjectId === s.id && q.unitIndex === uIdx).length;
    return qCount >= 2;
  })
);
assertCheck('All 43 units have at least 2 quiz questions', unitsWithTwoQuestions ? 'All 43 units covered' : 'Missing questions', 'All 43 units covered', unitsWithTwoQuestions);

// 10. Phase 3B Topic Content and 2D Diagram validation (Math-I)
const math = SUBJECTS.find((s) => s.id === 'math');
let mathTopicsCovered = 0;
let mathDiagramsValid = true;
let mathContentValid = true;

if (math) {
  math.units.forEach((u, uIdx) => {
    u.topics.forEach((_, tIdx) => {
      const tc = TOPIC_CONTENT[`math:${uIdx}:${tIdx}`];
      if (tc) {
        mathTopicsCovered++;
        if (!tc.diagram?.svg?.startsWith('<svg') || !tc.diagram?.svg?.endsWith('</svg>')) {
          mathDiagramsValid = false;
        }
        if (!tc.definition || !tc.slip || !tc.examAnswer || tc.examAnswer.length === 0) {
          mathContentValid = false;
        }
      }
    });
  });
}

assertCheck('Math-I topics covered with TopicContent', mathTopicsCovered, 40, mathTopicsCovered === 40);
assertCheck('Math-I 2D diagrams XML valid', mathDiagramsValid ? 'All 40 SVGs valid' : 'Invalid SVG found', 'All 40 SVGs valid', mathDiagramsValid);
assertCheck('Math-I TopicContent definitions and exam answers valid', mathContentValid ? 'All 40 entries complete' : 'Incomplete entries', 'All 40 entries complete', mathContentValid);

// 11. Phase 3B Topic Content and 2D Diagram validation (Physics)
const phy = SUBJECTS.find((s) => s.id === 'phy');
let phyTopicsCovered = 0;
let phyDiagramsValid = true;
let phyContentValid = true;

if (phy) {
  phy.units.forEach((u, uIdx) => {
    u.topics.forEach((_, tIdx) => {
      const tc = TOPIC_CONTENT[`phy:${uIdx}:${tIdx}`];
      if (tc) {
        phyTopicsCovered++;
        if (!tc.diagram?.svg?.startsWith('<svg') || !tc.diagram?.svg?.endsWith('</svg>')) {
          phyDiagramsValid = false;
        }
        if (!tc.definition || !tc.slip || !tc.examAnswer || tc.examAnswer.length === 0) {
          phyContentValid = false;
        }
      }
    });
  });
}

assertCheck('Physics topics covered with TopicContent', phyTopicsCovered, 57, phyTopicsCovered === 57);
assertCheck('Physics 2D diagrams XML valid', phyDiagramsValid ? 'All 57 SVGs valid' : 'Invalid SVG found', 'All 57 SVGs valid', phyDiagramsValid);
assertCheck('Physics TopicContent definitions and exam answers valid', phyContentValid ? 'All 57 entries complete' : 'Incomplete entries', 'All 57 entries complete', phyContentValid);

// 12. Phase 3B Topic Content and 2D Diagram validation (BEEE)
const beee = SUBJECTS.find((s) => s.id === 'beee');
let beeeTopicsCovered = 0;
let beeeDiagramsValid = true;
let beeeContentValid = true;

if (beee) {
  beee.units.forEach((u, uIdx) => {
    u.topics.forEach((_, tIdx) => {
      const tc = TOPIC_CONTENT[`beee:${uIdx}:${tIdx}`];
      if (tc) {
        beeeTopicsCovered++;
        if (!tc.diagram?.svg?.startsWith('<svg') || !tc.diagram?.svg?.endsWith('</svg>')) {
          beeeDiagramsValid = false;
        }
        if (!tc.definition || !tc.slip || !tc.examAnswer || tc.examAnswer.length === 0) {
          beeeContentValid = false;
        }
      }
    });
  });
}

assertCheck('BEEE topics covered with TopicContent', beeeTopicsCovered, 61, beeeTopicsCovered === 61);
assertCheck('BEEE 2D diagrams XML valid', beeeDiagramsValid ? 'All 61 SVGs valid' : 'Invalid SVG found', 'All 61 SVGs valid', beeeDiagramsValid);
assertCheck('BEEE TopicContent definitions and exam answers valid', beeeContentValid ? 'All 61 entries complete' : 'Incomplete entries', 'All 61 entries complete', beeeContentValid);

// 13. Phase 3B Topic Content and 2D Diagram validation (AI)
const ai = SUBJECTS.find((s) => s.id === 'ai');
let aiTopicsCovered = 0;
let aiDiagramsValid = true;
let aiContentValid = true;

if (ai) {
  ai.units.forEach((u, uIdx) => {
    u.topics.forEach((_, tIdx) => {
      const tc = TOPIC_CONTENT[`ai:${uIdx}:${tIdx}`];
      if (tc) {
        aiTopicsCovered++;
        if (!tc.diagram?.svg?.startsWith('<svg') || !tc.diagram?.svg?.endsWith('</svg>')) {
          aiDiagramsValid = false;
        }
        if (!tc.definition || !tc.slip || !tc.examAnswer || tc.examAnswer.length === 0) {
          aiContentValid = false;
        }
      }
    });
  });
}

assertCheck('AI topics covered with TopicContent', aiTopicsCovered, 39, aiTopicsCovered === 39);
assertCheck('AI 2D diagrams XML valid', aiDiagramsValid ? 'All 39 SVGs valid' : 'Invalid SVG found', 'All 39 SVGs valid', aiDiagramsValid);
assertCheck('AI TopicContent definitions and exam answers valid', aiContentValid ? 'All 39 entries complete' : 'Incomplete entries', 'All 39 entries complete', aiContentValid);

// 14. Phase 3B Topic Content and 2D Diagram validation (CFET)
const cfet = SUBJECTS.find((s) => s.id === 'cfet');
let cfetTopicsCovered = 0;
let cfetDiagramsValid = true;
let cfetContentValid = true;

if (cfet) {
  cfet.units.forEach((u, uIdx) => {
    u.topics.forEach((_, tIdx) => {
      const tc = TOPIC_CONTENT[`cfet:${uIdx}:${tIdx}`];
      if (tc) {
        cfetTopicsCovered++;
        if (!tc.diagram?.svg?.startsWith('<svg') || !tc.diagram?.svg?.endsWith('</svg>')) {
          cfetDiagramsValid = false;
        }
        if (!tc.definition || !tc.slip || !tc.examAnswer || tc.examAnswer.length === 0) {
          cfetContentValid = false;
        }
      }
    });
  });
}

assertCheck('CFET topics covered with TopicContent', cfetTopicsCovered, 42, cfetTopicsCovered === 42);
assertCheck('CFET 2D diagrams XML valid', cfetDiagramsValid ? 'All 42 SVGs valid' : 'Invalid SVG found', 'All 42 SVGs valid', cfetDiagramsValid);
assertCheck('CFET TopicContent definitions and exam answers valid', cfetContentValid ? 'All 42 entries complete' : 'Incomplete entries', 'All 42 entries complete', cfetContentValid);

// 15. Phase 3B Topic Content and 2D Diagram validation (UHV)
const uhv = SUBJECTS.find((s) => s.id === 'uhv');
let uhvTopicsCovered = 0;
let uhvDiagramsValid = true;
let uhvContentValid = true;

if (uhv) {
  uhv.units.forEach((u, uIdx) => {
    u.topics.forEach((_, tIdx) => {
      const tc = TOPIC_CONTENT[`uhv:${uIdx}:${tIdx}`];
      if (tc) {
        uhvTopicsCovered++;
        if (!tc.diagram?.svg?.startsWith('<svg') || !tc.diagram?.svg?.endsWith('</svg>')) {
          uhvDiagramsValid = false;
        }
        if (!tc.definition || !tc.slip || !tc.examAnswer || tc.examAnswer.length === 0) {
          uhvContentValid = false;
        }
      }
    });
  });
}

assertCheck('UHV topics covered with TopicContent', uhvTopicsCovered, 18, uhvTopicsCovered === 18);
assertCheck('UHV 2D diagrams XML valid', uhvDiagramsValid ? 'All 18 SVGs valid' : 'Invalid SVG found', 'All 18 SVGs valid', uhvDiagramsValid);
assertCheck('UHV TopicContent definitions and exam answers valid', uhvContentValid ? 'All 18 entries complete' : 'Incomplete entries', 'All 18 entries complete', uhvContentValid);

// 16. Phase 3B Topic Content and 2D Diagram validation (PPS Lab)
const pps = SUBJECTS.find((s) => s.id === 'pps');
let ppsTopicsCovered = 0;
let ppsDiagramsValid = true;
let ppsContentValid = true;

if (pps) {
  pps.units.forEach((u, uIdx) => {
    u.topics.forEach((_, tIdx) => {
      const tc = TOPIC_CONTENT[`pps:${uIdx}:${tIdx}`];
      if (tc) {
        ppsTopicsCovered++;
        if (!tc.diagram?.svg?.startsWith('<svg') || !tc.diagram?.svg?.endsWith('</svg>')) {
          ppsDiagramsValid = false;
        }
        if (!tc.definition || !tc.slip || !tc.examAnswer || tc.examAnswer.length === 0) {
          ppsContentValid = false;
        }
      }
    });
  });
}

assertCheck('PPS Lab topics covered with TopicContent', ppsTopicsCovered, 17, ppsTopicsCovered === 17);
assertCheck('PPS Lab 2D diagrams XML valid', ppsDiagramsValid ? 'All 17 SVGs valid' : 'Invalid SVG found', 'All 17 SVGs valid', ppsDiagramsValid);
assertCheck('PPS Lab TopicContent definitions and exam answers valid', ppsContentValid ? 'All 17 entries complete' : 'Incomplete entries', 'All 17 entries complete', ppsContentValid);

// 17. Phase 3B Topic Content and 2D Diagram validation (EIC)
const eic = SUBJECTS.find((s) => s.id === 'eic');
let eicTopicsCovered = 0;
let eicDiagramsValid = true;
let eicContentValid = true;

if (eic) {
  eic.units.forEach((u, uIdx) => {
    u.topics.forEach((_, tIdx) => {
      const tc = TOPIC_CONTENT[`eic:${uIdx}:${tIdx}`];
      if (tc) {
        eicTopicsCovered++;
        if (!tc.diagram?.svg?.startsWith('<svg') || !tc.diagram?.svg?.endsWith('</svg>')) {
          eicDiagramsValid = false;
        }
        if (!tc.definition || !tc.slip || !tc.examAnswer || tc.examAnswer.length === 0) {
          eicContentValid = false;
        }
      }
    });
  });
}

assertCheck('EIC topics covered with TopicContent', eicTopicsCovered, 17, eicTopicsCovered === 17);
assertCheck('EIC 2D diagrams XML valid', eicDiagramsValid ? 'All 17 SVGs valid' : 'Invalid SVG found', 'All 17 SVGs valid', eicDiagramsValid);
assertCheck('EIC TopicContent definitions and exam answers valid', eicContentValid ? 'All 17 entries complete' : 'Incomplete entries', 'All 17 entries complete', eicContentValid);

// 18. Phase 3B Global Coverage: 291 / 291 topics across all 8 subjects
let totalCoveredAcrossApp = 0;
SUBJECTS.forEach((s) => {
  s.units.forEach((u, uIdx) => {
    u.topics.forEach((_, tIdx) => {
      if (TOPIC_CONTENT[`${s.id}:${uIdx}:${tIdx}`]) {
        totalCoveredAcrossApp++;
      }
    });
  });
});

assertCheck('Total TopicContent coverage across all 8 subjects', totalCoveredAcrossApp, 291, totalCoveredAcrossApp === 291);

// 19. Phase 4 Persistence and Migration Verification
const legacyV1 = {
  done: { 'math:0:0': 1 },
  confidence: { 'math:0:0': 2, bad_conf: 99 },
  customNotes: { 'math:0': 'My notes' },
};
const migrated = migrateStudyState(legacyV1);
const migrationPassed =
  migrated.version === CURRENT_STORAGE_VERSION &&
  migrated.done['math:0:0'] === 1 &&
  migrated.confidence['math:0:0'] === 2 &&
  (migrated.confidence as Record<string, unknown>)['bad_conf'] === undefined &&
  migrated.customNotes['math:0'] === 'My notes' &&
  migrated.lab === 'G1';

assertCheck('Persistence schema v2 migration integrity', migrationPassed, true, migrationPassed);

// Round-trip export and import validation
const exportedJSON = exportStudyStateAsJSON(migrated);
const importResult = validateAndParseImportJSON(exportedJSON);
const importValid = importResult.valid && importResult.data?.done['math:0:0'] === 1;
assertCheck('Persistence backup JSON export/import round-trip', importValid, true, importValid);

// Malformed JSON rejection
const badImport = validateAndParseImportJSON('{ invalid json ...');
assertCheck('Malformed JSON import rejection', badImport.valid, false, badImport.valid === false);

// 20. Phase 5 Backend Security & Validation Verification
const prismaSchemaPath = path.resolve(__dirname, '../prisma/schema.prisma');
const prismaSchemaText = fs.readFileSync(prismaSchemaPath, 'utf-8');
const usesPostgres = prismaSchemaText.includes('provider = "postgresql"');
const noDefaultStudentInSchema = !prismaSchemaText.includes('default-student');

assertCheck('Prisma schema uses PostgreSQL provider', usesPostgres, true, usesPostgres);
assertCheck('Prisma schema has removed hardcoded default-student', noDefaultStudentInSchema, true, noDefaultStudentInSchema);

const envExamplePath = path.resolve(__dirname, '../.env.example');
const envExampleText = fs.readFileSync(envExamplePath, 'utf-8');
const envExampleHasPostgres = envExampleText.includes('postgresql://');
const envExampleNoSqlite = !envExampleText.includes('file:./dev.db');

assertCheck('.env.example documents PostgreSQL connection string', envExampleHasPostgres, true, envExampleHasPostgres);
assertCheck('.env.example removes SQLite assumption', envExampleNoSqlite, true, envExampleNoSqlite);

// Zod validation testing
const validSyncPayload = {
  done: { 'math:0:0': true, 'math:0:1': false, 'math:0:2': 1 },
  customNotes: { 'math:0': 'Important Taylor series tips' },
  lab: 'G2',
  exam: '2026-11-15',
  confidence: { 'math:0:0': 2 },
  starred: ['math:0:0'],
};
const zodValidParse = progressSyncSchema.safeParse(validSyncPayload);
assertCheck('Zod schema accepts valid progress sync payload', zodValidParse.success, true, zodValidParse.success);

const invalidSyncPayload = {
  done: 'not an object',
  customNotes: { 'math:0': 12345 }, // invalid: notes must be string
};
const zodInvalidParse = progressSyncSchema.safeParse(invalidSyncPayload);
assertCheck('Zod schema rejects malformed payload with bad types', zodInvalidParse.success, false, zodInvalidParse.success === false);

assertCheck('Progress body size limit configured to 1MB', MAX_BODY_SIZE_BYTES, 1024 * 1024, MAX_BODY_SIZE_BYTES === 1048576);

// Auth extraction testing
const mockReqWithBearer = {
  headers: new Headers({ authorization: 'Bearer mock-supabase-jwt-token-123' }),
  cookies: { get: () => undefined },
} as any;
const extractedBearer = extractAuthToken(mockReqWithBearer);
assertCheck('extractAuthToken correctly parses Bearer token', extractedBearer, 'mock-supabase-jwt-token-123', extractedBearer === 'mock-supabase-jwt-token-123');

const mockReqWithoutBearer = {
  headers: new Headers({ authorization: 'Basic dXNlcjpwYXNz' }),
  cookies: { get: () => undefined },
} as any;
const extractedInvalidBearer = extractAuthToken(mockReqWithoutBearer);
assertCheck('extractAuthToken rejects non-Bearer auth schemes', extractedInvalidBearer, null, extractedInvalidBearer === null);

// 21. Phase 6 AI Tutor Grounding, Rate Limiting, & Security Verification
const validTutorReq = {
  subjectId: 'math',
  unitIndex: 0,
  stepIndex: 1,
  question: 'What are the three conditions required for Rolle theorem?',
};
const tutorParseSuccess = tutorRequestSchema.safeParse(validTutorReq);
assertCheck('Tutor schema accepts valid syllabus question', tutorParseSuccess.success, true, tutorParseSuccess.success);

const emptyQuestionReq = {
  subjectId: 'math',
  unitIndex: 0,
  stepIndex: 1,
  question: '   ',
};
const emptyQuestionParsed = tutorRequestSchema.safeParse(emptyQuestionReq);
assertCheck('Tutor schema rejects blank/whitespace question', emptyQuestionParsed.success, false, emptyQuestionParsed.success === false);

const badSubjectReq = {
  subjectId: 'advanced-quantum-robotics',
  unitIndex: 0,
  stepIndex: 0,
  question: 'Explain quantum circuits',
};
const badSubjectParsed = tutorRequestSchema.safeParse(badSubjectReq);
assertCheck('Tutor schema rejects non-existent subject ID', badSubjectParsed.success, false, badSubjectParsed.success === false);

// Rate limiter testing
resetRateLimitStore();
const testIp = '10.0.0.42';
let allFifteenAllowed = true;
for (let i = 0; i < 15; i++) {
  const res = checkRateLimit(testIp, { maxRequests: 15, windowMs: 60000 });
  if (!res.allowed) allFifteenAllowed = false;
}
assertCheck('Rate limiter permits requests within quota (15/min)', allFifteenAllowed, true, allFifteenAllowed);

const sixteenthRes = checkRateLimit(testIp, { maxRequests: 15, windowMs: 60000 });
assertCheck('Rate limiter blocks 16th request from same IP', sixteenthRes.allowed, false, sixteenthRes.allowed === false);

const differentIpRes = checkRateLimit('10.0.0.43', { maxRequests: 15, windowMs: 60000 });
assertCheck('Rate limiter does not bleed across independent IPs', differentIpRes.allowed, true, differentIpRes.allowed === true);
resetRateLimitStore();

// Security: Verify GEMINI_API_KEY is server-only and never exposed to the client
const tutorPanelPath = path.resolve(__dirname, '../src/components/study/AiTutorPanel.tsx');
const tutorPanelCode = fs.readFileSync(tutorPanelPath, 'utf-8');
const noSecretInClient = !tutorPanelCode.includes('GEMINI_API_KEY');
assertCheck('Client component AiTutorPanel contains no GEMINI_API_KEY reference', noSecretInClient, true, noSecretInClient);

const envExampleNoPublicGemini = !envExampleText.includes('NEXT_PUBLIC_GEMINI');
assertCheck('GEMINI_API_KEY is server-only (not prefixed with NEXT_PUBLIC_)', envExampleNoPublicGemini, true, envExampleNoPublicGemini);

// Print summary
console.log('--------------------------------------------------');
console.log('LNJPIT Semester I: Data Integrity Verification');
console.log('--------------------------------------------------');
let allPassed = true;
for (const c of checks) {
  const status = c.passed ? '[PASS]' : '[FAIL]';
  if (!c.passed) allPassed = false;
  console.log(`${status} ${c.message}: actual=${c.actual}, expected=${c.expected}`);
}
console.log('--------------------------------------------------');

if (!allPassed) {
  console.error('Data integrity check failed! Please review the errors above.');
  process.exit(1);
} else {
  console.log('All data integrity assertions passed successfully!');
  process.exit(0);
}
