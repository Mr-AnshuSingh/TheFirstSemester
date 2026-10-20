import { NextRequest, NextResponse } from 'next/server';
import { SUBJECTS } from '@/data/subjects';
import { SC } from '@/data/scenes';
import { WORKED } from '@/data/worked';
import { TutorResponsePayload } from '@/types/syllabus';
import { checkRateLimit } from '@/lib/rateLimit';
import { tutorRequestSchema } from '@/lib/validations/tutor';

// 18 second timeout for external Gemini API calls
const GEMINI_TIMEOUT_MS = 18000;

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

  // Sanitize question: strip control characters and limit excessive whitespace
  const sanitizedQuestion = question
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '')
    .trim();

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
  const qLower = sanitizedQuestion.toLowerCase();
  const matchedMoves = unit.k.filter((move) =>
    qLower
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .some((w) => move.toLowerCase().includes(w))
  );
  const formulaHighlight = matchedMoves.length > 0 ? matchedMoves : unit.k.slice(0, 4);

  // Template answer generator for offline / fallback scenarios (clean markdown, zero UI emojis)
  const generateTemplateAnswer = (): string => {
    return [
      image ? '**[Attached Problem Analyzed]**\n' : '',
      `### Academic Syllabus Solution: ${subject.name} (${subject.code}) — Unit ${safeUnitIdx + 1}: ${unit.t}`,
      ``,
      `#### 1. Core Principle (${activeStep.t})`,
      `${activeStep.d}`,
      ``,
      `#### 2. Concept Explanation & Working`,
      `${unit.s}`,
      workedExample
        ? `\n#### 3. University Exam Worked Pattern\n${workedExample.replace(/<[^>]+>/g, '')}`
        : '',
      ``,
      `> **Exam Chant to Remember**: "${subject.hook}"`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const apiKey = process.env.GEMINI_API_KEY;

  // 4. Fallback if API key is not configured
  if (!apiKey || apiKey.trim() === '') {
    const fallbackAnswer = generateTemplateAnswer();

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

  // 5. Call Live AI with resilient dual-model fallback (flash-latest -> flash-lite-latest)
  try {
    const systemInstructionText =
      `You are the Senior Academic AI Doubt Solver & Tutor for B.Tech Semester I Engineering (LNJPIT Chapra).\n` +
      `Your mission is to help engineering students resolve ANY doubt, conceptual question, camera-captured problem, handwritten equation, derivation, numerical calculation, exam trap, or coding question related to their Semester I subjects.\n` +
      `Pedagogical & Formatting Guidelines:\n` +
      `1. Provide clear, structured, step-by-step explanations using Markdown (##, ###, bullet points, and numbered lists).\n` +
      `2. Format inline mathematical equations and variables using standard LaTeX enclosed in single dollar signs like $f'(c) = 0$ or $\\nabla \\times \\mathbf{B}$.\n` +
      `3. Format standalone formulas or multi-line derivations using display math blocks with double dollar signs: $$\\dots$$.\n` +
      `4. When an image is attached (photo of a problem, handwritten work, textbook page, diagram, or calculation): carefully inspect the image, transcribe the problem accurately, check every step, pinpoint any calculation or conceptual errors if reviewing work, and provide a full step-by-step solution.\n` +
      `5. For derivations or numericals, provide numbered procedural steps with substitutions and explicit units.\n` +
      `6. Highlight typical university examination traps and the essential points needed for full marks.\n` +
      `7. Do not use UI emojis in your explanation text; maintain a clean, authoritative academic textbook tone.`;

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
      `Student Question / Doubt: "${sanitizedQuestion}"\n\n` +
      `Provide a comprehensive, step-by-step academic explanation with LaTeX formulas addressing the student's doubt.`;

    // Parse image into inline_data format if provided
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

    const modelsToTry = ['gemini-flash-latest', 'gemini-flash-lite-latest'];
    let aiAnswer: string | null = null;

    for (const modelName of modelsToTry) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(
        apiKey.trim()
      )}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      try {
        const res = await fetch(endpoint, {
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
              maxOutputTokens: 2500,
            },
          }),
          signal: controller.signal,
        });

        if (res.ok) {
          const geminiData = (await res.json()) as {
            candidates?: Array<{
              content?: {
                parts?: Array<{ text?: string }>;
              };
            }>;
          };
          const textCandidate = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (textCandidate) {
            aiAnswer = textCandidate;
            break; // Successfully got answer, stop fallback loop
          }
        }
      } catch {
        // Try fallback model silently
      } finally {
        clearTimeout(timeoutId);
      }
    }

    if (!aiAnswer) {
      const fallbackAnswer = generateTemplateAnswer();
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
    console.error('Tutor call error:', err);

    const fallbackAnswer = generateTemplateAnswer();

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
