import { NextRequest, NextResponse } from 'next/server';
import { SUBJECTS } from '@/data/subjects';
import { SC } from '@/data/scenes';
import { WORKED } from '@/data/worked';
import { TutorRequestPayload, TutorResponsePayload } from '@/types/syllabus';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as TutorRequestPayload;
  const { subjectId, unitIndex, stepIndex, question } = body;

  const subject = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];
  const safeUnitIdx = Math.max(0, Math.min(subject.units.length - 1, unitIndex || 0));
  const unit = subject.units[safeUnitIdx];
  const sceneKey = `${subject.id}:${safeUnitIdx}`;
  const scene = SC[sceneKey];
  const safeStepIdx = scene ? Math.max(0, Math.min(scene.steps.length - 1, stepIndex || 0)) : 0;
  const activeStep = scene?.steps[safeStepIdx] || { t: unit.t, d: unit.s };
  const workedExample = WORKED[sceneKey] || '';

  // Construct university marking-scheme grounded response
  const qLower = (question || '').toLowerCase();
  const matchedMoves = unit.k.filter((move) =>
    qLower
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .some((w) => move.toLowerCase().includes(w))
  );
  const formulaHighlight = matchedMoves.length > 0 ? matchedMoves : unit.k.slice(0, 4);

  const answerLines = [
    `[LNJPIT Chapra · ${subject.name} (${subject.code}) · Unit ${safeUnitIdx + 1}: ${unit.t}]`,
    ``,
    `1. Core Concept (${activeStep.t}):`,
    `${activeStep.d}`,
    ``,
    `2. Plain-English Intuition:`,
    `${unit.s}`,
    workedExample
      ? `\n3. University Exam Worked Pattern:\n${workedExample.replace(/<[^>]+>/g, '')}`
      : '',
    ``,
    `4. Exam Chant to Remember:`,
    `"${subject.hook}"`,
  ]
    .filter(Boolean)
    .join('\n');

  const response: TutorResponsePayload = {
    answer: answerLines,
    markingSchemeSteps: subject.ex.a,
    formulaHighlight,
    trapWarning: subject.ex.x[0] || 'Always write units, signs, and a concluding sentence.',
    contextUsed: {
      subjectName: subject.name,
      subjectCode: subject.code,
      unitTitle: unit.t,
      activeStepTitle: activeStep.t,
    },
  };

  return NextResponse.json(response);
}
