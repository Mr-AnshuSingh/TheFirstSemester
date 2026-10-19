import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [progress, customNotes, flashcards, sessions] = await Promise.all([
      prisma.userProgress.findMany({ where: { userId: 'default-student' } }),
      prisma.customNotes.findMany({ where: { userId: 'default-student' } }),
      prisma.flashcardReview.findMany({ where: { userId: 'default-student' } }),
      prisma.studySession.findMany({
        where: { userId: 'default-student' },
        orderBy: { startedAt: 'desc' },
        take: 25,
      }),
    ]);

    return NextResponse.json({
      ok: true,
      progress,
      customNotes,
      flashcards,
      sessions,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: 'Database offline; using IndexedDB PWA fallback.', error: String(err) },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { done = {}, customNotes = {}, lab = 'G1', exam = '' } = body;

    // Upsert completed topic keys
    const topicKeys = Object.keys(done);
    for (const key of topicKeys) {
      const [subjectId, uStr, tStr] = key.split(':');
      await prisma.userProgress.upsert({
        where: { userId_topicKey: { userId: 'default-student', topicKey: key } },
        update: { completed: !!done[key], labGroup: lab, examDate: exam },
        create: {
          userId: 'default-student',
          topicKey: key,
          subjectId,
          unitIndex: Number(uStr) || 0,
          topicIndex: Number(tStr) || 0,
          completed: !!done[key],
          labGroup: lab,
          examDate: exam,
        },
      });
    }

    // Upsert custom unit notes
    for (const [unitKey, content] of Object.entries(customNotes)) {
      const [subjectId, uStr] = unitKey.split(':');
      await prisma.customNotes.upsert({
        where: { userId_unitKey: { userId: 'default-student', unitKey } },
        update: { content: String(content) },
        create: {
          userId: 'default-student',
          unitKey,
          subjectId,
          unitIndex: Number(uStr) || 0,
          content: String(content),
        },
      });
    }

    return NextResponse.json({ ok: true, syncedCount: topicKeys.length });
  } catch (err) {
    return NextResponse.json(
      { ok: false, fallback: 'IndexedDB', detail: String(err) },
      { status: 200 }
    );
  }
}
