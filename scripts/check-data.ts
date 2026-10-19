import { SUBJECTS } from '../src/data/subjects';
import { SC } from '../src/data/scenes';
import { PPS_EXPERIMENTS } from '../src/data/ppsExperiments';
import { QUIZ_BANK } from '../src/data/quizBank';
import { TOPIC_CONTENT } from '../src/data/topicContent';

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
