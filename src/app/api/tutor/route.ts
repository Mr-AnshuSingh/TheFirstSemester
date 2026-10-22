import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { tutorRequestSchema } from '@/lib/validations/tutor';
import {
  buildUnitContext,
  buildTutorPrompt,
  buildOfflineTutorAnswer,
  Turn,
} from '@/lib/tutorContext';
import { TutorResponsePayload } from '@/types/syllabus';

export const runtime = 'nodejs';
export const maxDuration = 60;

// Total time budget (approx 25 seconds) shared by both model attempts
const TOTAL_BUDGET_MS = 25000;

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
        error: `Rate limit reached (15 requests/min). Please wait ${rateLimit.resetSeconds}s before asking another question.`,
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
  } catch {
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

  const { subjectId, unitIndex, question, image, history } = parsed.data;

  // Sanitize question: strip control characters and limit excessive whitespace
  const sanitizedQuestion = question
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '')
    .trim();

  // 3. Locate unit context (choke point: unit-level only, no topics/steps/worked)
  const ctx = buildUnitContext(subjectId, unitIndex);
  if (!ctx) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Unknown subject or unit identifier.',
        code: 'BAD_REQUEST',
      },
      { status: 400 }
    );
  }

  const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_AI_API_KEY || '').trim();

  // 4. Fallback if API key is not configured (offline syllabus grounded)
  if (!apiKey) {
    const fallbackAnswer = buildOfflineTutorAnswer(ctx, sanitizedQuestion);
    const fallbackResponse: TutorResponsePayload = {
      answer: fallbackAnswer,
      source: 'offline_template',
      isLiveAi: false,
      contextUsed: {
        subjectName: ctx.subjectName,
        subjectCode: ctx.subjectCode,
        unitNumber: ctx.unitNumber,
        unitTitle: ctx.unitTitle,
      },
    };

    return NextResponse.json(fallbackResponse);
  }

  // 5. Call Live AI with resilient dual-model fallback within a shared 25s budget
  try {
    const turns: Turn[] = (history || []).map((h) => ({
      role: h.role,
      text: h.text,
    }));

    const { system, user } = buildTutorPrompt(ctx, sanitizedQuestion, turns);

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
    userParts.push({ text: user });

    const modelsToTry = ['gemini-flash-latest', 'gemini-flash-lite-latest'];
    let aiAnswer: string | null = null;
    let blockReasonDetected: string | null = null;
    const startTime = Date.now();

    for (const modelName of modelsToTry) {
      const elapsedMs = Date.now() - startTime;
      const remainingBudgetMs = TOTAL_BUDGET_MS - elapsedMs;

      // Stop if budget is depleted
      if (remainingBudgetMs <= 1500) {
        break;
      }

      // Dev-only debug log with key redacted and images shown as [image N bytes]
      if (process.env.TUTOR_DEBUG === '1' && process.env.NODE_ENV !== 'production') {
        const debugParts = userParts.map((p) => {
          if (p.inline_data) {
            const byteCount = p.inline_data.data ? Math.round((p.inline_data.data.length * 3) / 4) : 0;
            return { inline_data: { mime_type: p.inline_data.mime_type, data: `[image ${byteCount} bytes]` } };
          }
          return p;
        });
        console.log('[TUTOR_DEBUG] Outgoing Gemini Payload:', JSON.stringify({
          model: modelName,
          endpoint: `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
          system_instruction: system,
          contents: [{ role: 'user', parts: debugParts }],
        }, null, 2));
      }

      // Endpoint without key in URL query parameter
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;

      const controller = new AbortController();
      const attemptTimeoutMs = Math.min(13000, remainingBudgetMs);
      const timeoutId = setTimeout(() => controller.abort(), attemptTimeoutMs);

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey.trim(),
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: system }],
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
            promptFeedback?: {
              blockReason?: string;
            };
            candidates?: Array<{
              finishReason?: string;
              content?: {
                parts?: Array<{ text?: string }>;
              };
            }>;
          };

          if (geminiData?.promptFeedback?.blockReason) {
            blockReasonDetected = geminiData.promptFeedback.blockReason;
          }

          const candidate = geminiData?.candidates?.[0];
          const parts = candidate?.content?.parts || [];
          // Join all text parts from response
          const joinedCandidate = parts
            .map((p) => p.text || '')
            .join('')
            .trim();

          if (joinedCandidate) {
            aiAnswer = joinedCandidate;

            // Handle MAX_TOKENS truncation gracefully with a friendly note
            if (candidate?.finishReason === 'MAX_TOKENS') {
              aiAnswer += '\n\n*(Note: This solution was capped at maximum output length. Ask a follow-up doubt for additional derivations or steps.)*';
            }
            break; // Success, break model fallback loop
          }
        }
      } catch {
        // Fall back gracefully to next model attempt
      } finally {
        clearTimeout(timeoutId);
      }
    }

    // If model answer was not obtained, return offline template
    if (!aiAnswer) {
      let fallbackText = buildOfflineTutorAnswer(ctx, sanitizedQuestion);
      if (blockReasonDetected) {
        fallbackText = `> *Notice: Input was flagged by content safety filters (${blockReasonDetected}). Displaying syllabus-grounded response below.*\n\n` + fallbackText;
      }

      return NextResponse.json({
        answer: fallbackText,
        source: 'offline_template',
        isLiveAi: false,
        contextUsed: {
          subjectName: ctx.subjectName,
          subjectCode: ctx.subjectCode,
          unitNumber: ctx.unitNumber,
          unitTitle: ctx.unitTitle,
        },
      });
    }

    const liveResponse: TutorResponsePayload = {
      answer: aiAnswer,
      source: 'gemini',
      isLiveAi: true,
      contextUsed: {
        subjectName: ctx.subjectName,
        subjectCode: ctx.subjectCode,
        unitNumber: ctx.unitNumber,
        unitTitle: ctx.unitTitle,
      },
    };

    return NextResponse.json(liveResponse);
  } catch (err: unknown) {
    console.error('Tutor route error:', err);

    const fallbackAnswer = buildOfflineTutorAnswer(ctx, sanitizedQuestion);
    const fallbackResponse: TutorResponsePayload = {
      answer: fallbackAnswer,
      source: 'offline_template',
      isLiveAi: false,
      contextUsed: {
        subjectName: ctx.subjectName,
        subjectCode: ctx.subjectCode,
        unitNumber: ctx.unitNumber,
        unitTitle: ctx.unitTitle,
      },
    };

    return NextResponse.json(fallbackResponse);
  }
}
