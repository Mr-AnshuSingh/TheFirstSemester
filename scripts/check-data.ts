import { SUBJECTS } from '../src/data/subjects';
import { SC } from '../src/data/scenes';
import { PPS_EXPERIMENTS } from '../src/data/ppsExperiments';
import { QUIZ_BANK } from '../src/data/quizBank';

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
