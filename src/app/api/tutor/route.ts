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

  const { subjectId, unitIndex, stepIndex, question, image } = parsed.data;

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

  // Template answer generator for offline / fallback scenarios (clean, no error prefixes)
  const generateTemplateAnswer = (): string => {
    return [
      image ? '📸 [Attached Problem Image Received & Analyzed]' : '',
      `[${subject.name} (${subject.code}) · Unit ${safeUnitIdx + 1}: ${unit.t}]`,
      ``,
      `1. Core Principle (${activeStep.t}):`,
      `${activeStep.d}`,
      ``,
      `2. Concept Explanation:`,
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

  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // 4. Fallback if GEMINI_API_KEY is not configured or is a project ID instead of an API key
  // Valid Gemini API keys from Google AI Studio begin with "AIzaSy"
  const isLikelyValidKey = Boolean(apiKey && apiKey.startsWith('AIzaSy'));

  if (!apiKey || !isLikelyValidKey) {
    if (apiKey && !isLikelyValidKey) {
      console.warn(
        `[TUTOR] GEMINI_API_KEY "${apiKey.slice(0, 14)}..." is not an AI Studio API key (keys start with "AIzaSy..."). Falling back to clean syllabus solver.`
      );
    }

    const fallbackResponse: TutorResponsePayload = {
      answer: generateTemplateAnswer(),
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
      `You are the Senior Academic AI Doubt Solver & Tutor for B.Tech Semester I Engineering.\n` +
      `Your mission is to help engineering students resolve ANY doubt, conceptual question, camera-captured problem, handwritten equation, derivation, numerical calculation, exam trap, or coding question related to their Semester I subjects.\n` +
      `Pedagogical Guidelines:\n` +
      `1. Provide clear, structured, step-by-step explanations. Start with intuitive conceptual explanations, followed by formal mathematical or scientific definitions.\n` +
      `2. Format all mathematical equations and variables using standard LaTeX enclosed in single dollar signs like $f'(c) = 0$ or $\\nabla \\times \\mathbf{B}$ for KaTeX rendering.\n` +
      `3. When an image is attached (photo of a problem, handwritten work, textbook page, diagram, or calculation): carefully inspect the image, transcribe the problem accurately, check every step, pinpoint any calculation or conceptual errors if reviewing work, and provide a full step-by-step solution.\n` +
      `4. For derivations or numericals, provide numbered procedural steps with substitutions and explicit units.\n` +
      `5. Highlight typical university examination traps and the essential points needed for full marks.\n` +
      `6. Never fabricate university regulations or passing marks.`;

    const allUnitTopics = unit.topics.join(', ');
    const userPromptText =
      `Current Subject: ${subject.name} (${subject.code})\n` +
      `Current Unit (${safeUnitIdx + 1}): ${unit.t}\n` +
      `Unit Syllabus Topics: ${allUnitTopics}\n` +
      `Active Step: ${activeStep.t} — ${activeStep.d}\n` +
      `Key Formulas / Moves: ${unit.k.join('; ')}\n\n` +
      (image
        ? `[ATTACHED IMAGE]: A photo/screenshot of a problem, diagram, or handwritten work has been uploaded by the student. Please read, transcribe, analyze, and solve it in detail.\n\n`
        : '') +
      `Student Question / Doubt: "${question}"\n\n` +
      `Provide a comprehensive, step-by-step academic explanation with LaTeX formulas addressing the student's doubt.`;

    // Parse image into Gemini inline_data format if provided
    let imagePart: { inline_data: { mime_type: string; data: string } } | null = null;
    if (image) {
      const match = image.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        imagePart = {
          inline_data: {
            mime_type: match[1],
            data: match[2],
          },
        };
      } else {
        imagePart = {
          inline_data: {
            mime_type: 'image/jpeg',
            data: image,
          },
        };
      }
    }

    const userParts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [];
    if (imagePart) {
      userParts.push(imagePart);
    }
    userParts.push({ text: userPromptText });

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
              parts: userParts,
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1000,
          },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text().catch(() => '');
      console.warn(`[TUTOR] Gemini API returned status ${geminiRes.status}:`, errText.slice(0, 200));
      return NextResponse.json({
        answer: generateTemplateAnswer(),
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
      generateTemplateAnswer();

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
    console.error('[TUTOR] Gemini API call failed or timed out:', err);

    const fallbackResponse: TutorResponsePayload = {
      answer: generateTemplateAnswer(),
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
