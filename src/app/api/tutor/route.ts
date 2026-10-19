import { NextRequest, NextResponse } from 'next/server';
import { SUBJECTS } from '@/data/subjects';
import { SC } from '@/data/scenes';
import { WORKED } from '@/data/worked';
import { TutorResponsePayload } from '@/types/syllabus';
import { checkRateLimit } from '@/lib/rateLimit';
import { tutorRequestSchema } from '@/lib/validations/tutor';

// 10 second timeout for external Gemini API calls
const GEMINI_TIMEOUT_MS = 10000;

export async function POST(req: NextRequest) {
  // 1. Per-IP Rate Limiting (max 15 requests per minute)
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  const rateLimit = checkRateLimit(clientIp, {
    windowMs: 60000,
    maxRequests: 15,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Rate limit exceeded. Too many requests from this IP. Please wait ${rateLimit.resetSeconds}s before asking another question.`,
        code: 'RATE_LIMIT_EXCEEDED',
        resetSeconds: rateLimit.resetSeconds,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.resetSeconds),
        },
      }
    );
  }

  // 2. Validate Request Body with Zod
  let bodyJson: unknown;
  try {
    bodyJson = await req.json();
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Malformed JSON payload: request body must be valid JSON.',
        code: 'BAD_REQUEST',
      },
      { status: 400 }
    );
  }

  const parsed = tutorRequestSchema.safeParse(bodyJson);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Invalid request body schema.',
        details: parsed.error.flatten(),
        code: 'BAD_REQUEST',
      },
      { status: 400 }
    );
  }

  const { subjectId, unitIndex, stepIndex, question } = parsed.data;

  // 3. Locate syllabus context
  const subject = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];
  const safeUnitIdx = Math.max(0, Math.min(subject.units.length - 1, unitIndex));
  const unit = subject.units[safeUnitIdx];
  const sceneKey = `${subject.id}:${safeUnitIdx}`;
  const scene = SC[sceneKey];
  const safeStepIdx = scene ? Math.max(0, Math.min(scene.steps.length - 1, stepIndex)) : 0;
  const activeStep = scene?.steps[safeStepIdx] || { t: unit.t, d: unit.s };
  const workedExample = WORKED[sceneKey] || '';

  // Match key moves relevant to question
  const qLower = question.toLowerCase();
  const matchedMoves = unit.k.filter((move) =>
    qLower
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .some((w) => move.toLowerCase().includes(w))
  );
  const formulaHighlight = matchedMoves.length > 0 ? matchedMoves : unit.k.slice(0, 4);

  // Template answer generator for offline / fallback scenarios
  const generateTemplateAnswer = (noticePrefix: string): string => {
    return [
      noticePrefix,
      `[LNJPIT Chapra · ${subject.name} (${subject.code}) · Unit ${safeUnitIdx + 1}: ${unit.t}]`,
      ``,
      `1. Core Principle (${activeStep.t}):`,
      `${activeStep.d}`,
      ``,
      `2. Intuitive Explanation:`,
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
  };

  const apiKey = process.env.GEMINI_API_KEY;

  // 4. Fallback if GEMINI_API_KEY is not configured
  if (!apiKey || apiKey.trim() === '') {
    const fallbackAnswer = generateTemplateAnswer(
      '[Offline Syllabus Grounded Answer · GEMINI_API_KEY not configured on server]\n'
    );

    const fallbackResponse: TutorResponsePayload = {
      answer: fallbackAnswer,
      markingSchemeSteps: subject.ex.a,
      formulaHighlight,
      trapWarning: subject.ex.x[0] || 'Always write units, signs, and a concluding sentence.',
      contextUsed: {
        subjectName: subject.name,
        subjectCode: subject.code,
        unitTitle: unit.t,
        activeStepTitle: activeStep.t,
      },
      isLiveAi: false,
      source: 'offline_template',
    };

    return NextResponse.json(fallbackResponse);
  }

  // 5. Call Gemini API from the server with syllabus context
  try {
    const systemInstructionText =
      `You are the LNJPIT Chapra B.Tech Semester I Study AI Tutor (Mathematics & Computing, Group A).\n` +
      `Answer the student's question strictly and accurately based on the syllabus context provided below.\n` +
      `Rules:\n` +
      `1. If the provided syllabus context does not cover the question, state: "Not sure from the current syllabus context; please check the standard prescribed textbook or ask your LNJPIT subject faculty."\n` +
      `2. Never invent marks, passing rules, or university policies.\n` +
      `3. Keep your answers short, clear, and structured in step-by-step numbered points suitable for university examinations.\n` +
      `4. Emphasize equations and key derivation steps concisely without unnecessary conversational filler.`;

    const userPromptText =
      `Current Subject: ${subject.name} (${subject.code})\n` +
      `Current Unit (${safeUnitIdx + 1}): ${unit.t}\n` +
      `Unit Overview: ${unit.s}\n` +
      `Current Step: ${activeStep.t} — ${activeStep.d}\n` +
      `Key Moves: ${unit.k.join('; ')}\n\n` +
      `Student Question: "${question}"\n\n` +
      `Provide a step-by-step, exam-focused explanation answering the question.`;

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(
      apiKey.trim()
    )}`;

    // Set timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

    let geminiRes: Response;
    try {
      geminiRes = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstructionText }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: userPromptText }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 800,
          },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!geminiRes.ok) {
      console.warn(`Gemini API returned status ${geminiRes.status}: falling back to syllabus template`);
      const fallbackAnswer = generateTemplateAnswer(
        `[Offline Syllabus Grounded Answer · Gemini API status ${geminiRes.status}]\n`
      );
      return NextResponse.json({
        answer: fallbackAnswer,
        markingSchemeSteps: subject.ex.a,
        formulaHighlight,
        trapWarning: subject.ex.x[0] || 'Always write units, signs, and a concluding sentence.',
        contextUsed: {
          subjectName: subject.name,
          subjectCode: subject.code,
          unitTitle: unit.t,
          activeStepTitle: activeStep.t,
        },
        isLiveAi: false,
        source: 'offline_template',
      });
    }

    const geminiData = (await geminiRes.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const aiAnswer =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      generateTemplateAnswer('[Live AI response empty; falling back to syllabus template]\n');

    const liveResponse: TutorResponsePayload = {
      answer: aiAnswer,
      markingSchemeSteps: subject.ex.a,
      formulaHighlight,
      trapWarning: subject.ex.x[0] || 'Always write units, signs, and a concluding sentence.',
      contextUsed: {
        subjectName: subject.name,
        subjectCode: subject.code,
        unitTitle: unit.t,
        activeStepTitle: activeStep.t,
      },
      isLiveAi: true,
      source: 'gemini',
    };

    return NextResponse.json(liveResponse);
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    console.error('Gemini API call failed or timed out:', err);

    const fallbackAnswer = generateTemplateAnswer(
      isTimeout
        ? '[Offline Syllabus Grounded Answer · Gemini API request timed out (10s)]\n'
        : '[Offline Syllabus Grounded Answer · Live AI connection error]\n'
    );

    const fallbackResponse: TutorResponsePayload = {
      answer: fallbackAnswer,
      markingSchemeSteps: subject.ex.a,
      formulaHighlight,
      trapWarning: subject.ex.x[0] || 'Always write units, signs, and a concluding sentence.',
      contextUsed: {
        subjectName: subject.name,
        subjectCode: subject.code,
        unitTitle: unit.t,
        activeStepTitle: activeStep.t,
      },
      isLiveAi: false,
      source: 'offline_template',
    };

    return NextResponse.json(fallbackResponse);
  }
}
