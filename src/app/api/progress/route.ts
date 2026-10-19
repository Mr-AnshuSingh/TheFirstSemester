import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthConfigured, getAuthenticatedUser } from '@/lib/auth';
import { MAX_BODY_SIZE_BYTES, progressSyncSchema } from '@/lib/validations/progress';

export async function GET(req: NextRequest) {
  // If server-side auth is not configured, run 100% local-first and return 501
  if (!isAuthConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Server sync disabled: Authentication is not configured. Running in offline/local-first mode.',
        code: 'AUTH_NOT_CONFIGURED',
      },
      { status: 501 }
    );
  }

  // Require authenticated user
  const user = await getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Unauthorized: Valid authentication token required.',
        code: 'UNAUTHORIZED',
      },
      { status: 401 }
    );
  }

  try {
    const [progress, customNotes, flashcards, sessions] = await Promise.all([
      prisma.userProgress.findMany({ where: { userId: user.userId } }),
      prisma.customNotes.findMany({ where: { userId: user.userId } }),
      prisma.flashcardReview.findMany({ where: { userId: user.userId } }),
      prisma.studySession.findMany({
        where: { userId: user.userId },
        orderBy: { startedAt: 'desc' },
        take: 50,
      }),
    ]);

    return NextResponse.json({
      ok: true,
      userId: user.userId,
      progress,
      customNotes,
      flashcards,
      sessions,
    });
  } catch (err) {
    console.error('Failed to query user progress from database:', err);
    return NextResponse.json(
      {
        ok: false,
        error: 'Database error occurred while fetching study progress.',
        detail: process.env.NODE_ENV === 'development' ? String(err) : undefined,
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // 1. If auth is not configured, return 501
  if (!isAuthConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Server sync disabled: Authentication is not configured. Running in offline/local-first mode.',
        code: 'AUTH_NOT_CONFIGURED',
      },
      { status: 501 }
    );
  }

  // 2. Require authenticated user
  const user = await getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Unauthorized: Valid authentication token required.',
        code: 'UNAUTHORIZED',
      },
      { status: 401 }
    );
  }

  // 3. Limit body size
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE_BYTES) {
    return NextResponse.json(
      {
        ok: false,
        error: `Payload Too Large: Request body exceeds maximum allowed size (${MAX_BODY_SIZE_BYTES} bytes).`,
        code: 'PAYLOAD_TOO_LARGE',
      },
      { status: 413 }
    );
  }

  let rawText = '';
  try {
    rawText = await req.text();
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Failed to read request body stream.',
        code: 'BAD_REQUEST',
      },
      { status: 400 }
    );
  }

  if (rawText.length > MAX_BODY_SIZE_BYTES) {
    return NextResponse.json(
      {
        ok: false,
        error: `Payload Too Large: Request body exceeds maximum allowed size (${MAX_BODY_SIZE_BYTES} bytes).`,
        code: 'PAYLOAD_TOO_LARGE',
      },
      { status: 413 }
    );
  }

  let jsonBody: unknown;
  try {
    jsonBody = JSON.parse(rawText);
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

  // 4. Validate body using Zod schema
  const parsed = progressSyncSchema.safeParse(jsonBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Request body failed validation schema.',
        details: parsed.error.flatten(),
        code: 'BAD_REQUEST',
      },
      { status: 400 }
    );
  }

  const { done, customNotes, lab, exam } = parsed.data;

  // 5. Batch writes in one transaction & support deleting unticked topics
  try {
    let upsertedTopics = 0;
    let deletedTopics = 0;
    let syncedNotes = 0;

    await prisma.$transaction(async (tx) => {
      // Process topic progress
      for (const [topicKey, val] of Object.entries(done)) {
        const isCompleted = val === true || val === 1;

        if (!isCompleted) {
          // Explicitly delete unticked topic from database
          const delRes = await tx.userProgress.deleteMany({
            where: {
              userId: user.userId,
              topicKey,
            },
          });
          deletedTopics += delRes.count;
        } else {
          // Upsert completed topic
          const parts = topicKey.split(':');
          const subjectId = parts[0] || 'unknown';
          const unitIndex = Number(parts[1]) || 0;
          const topicIndex = Number(parts[2]) || 0;

          await tx.userProgress.upsert({
            where: {
              userId_topicKey: {
                userId: user.userId,
                topicKey,
              },
            },
            update: {
              completed: true,
              labGroup: lab,
              examDate: exam,
            },
            create: {
              userId: user.userId,
              topicKey,
              subjectId,
              unitIndex,
              topicIndex,
              completed: true,
              labGroup: lab,
              examDate: exam,
            },
          });
          upsertedTopics++;
        }
      }

      // Process custom notes
      for (const [unitKey, content] of Object.entries(customNotes)) {
        const parts = unitKey.split(':');
        const subjectId = parts[0] || 'unknown';
        const unitIndex = Number(parts[1]) || 0;

        if (!content || content.trim() === '') {
          await tx.customNotes.deleteMany({
            where: {
              userId: user.userId,
              unitKey,
            },
          });
        } else {
          await tx.customNotes.upsert({
            where: {
              userId_unitKey: {
                userId: user.userId,
                unitKey,
              },
            },
            update: {
              content,
            },
            create: {
              userId: user.userId,
              unitKey,
              subjectId,
              unitIndex,
              content,
            },
          });
          syncedNotes++;
        }
      }
    });

    return NextResponse.json({
      ok: true,
      userId: user.userId,
      syncedTopics: upsertedTopics,
      deletedTopics,
      syncedNotes,
    });
  } catch (err) {
    console.error('Database transaction error during progress sync:', err);
    return NextResponse.json(
      {
        ok: false,
        error: 'Database transaction error occurred while syncing study state.',
        detail: process.env.NODE_ENV === 'development' ? String(err) : undefined,
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}
