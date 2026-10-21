import { NextRequest } from 'next/server';
import { SUBJECTS } from '../src/data/subjects';
import { buildUnitContext } from '../src/lib/tutorContext';
import { POST } from '../src/app/api/tutor/route';

interface CheckResult {
  title: string;
  passed: boolean;
  actual: unknown;
  expected: unknown;
}

const checks: CheckResult[] = [];

function assertCheck(title: string, passed: boolean, actual: unknown, expected: unknown) {
  checks.push({ title, passed, actual, expected });
}

export async function runTutorContextChecks(): Promise<boolean> {
  console.log('--------------------------------------------------');
  console.log('LNJPIT Semester I: Tutor Context & API Security Checks');
  console.log('--------------------------------------------------');

  const EXPECTED_EXACT_KEYS = [
    'keyMoves',
    'subjectCode',
    'subjectName',
    'summary',
    'unitHours',
    'unitNumber',
    'unitTitle',
  ];

  // --------------------------------------------------------------------------
  // a. buildUnitContext returns allowed fields only for all 43 units
  // --------------------------------------------------------------------------
  let totalUnitsTested = 0;
  let allExactKeysMatch = true;
  let noExtraneousFields = true;

  for (const subject of SUBJECTS) {
    for (let uIdx = 0; uIdx < subject.units.length; uIdx++) {
      totalUnitsTested++;
      const ctx = buildUnitContext(subject.id, uIdx);
      if (!ctx) {
        allExactKeysMatch = false;
        continue;
      }

      const keys = Object.keys(ctx).sort();
      const keysMatch = JSON.stringify(keys) === JSON.stringify(EXPECTED_EXACT_KEYS);
      if (!keysMatch) {
        allExactKeysMatch = false;
      }

      // Explicitly verify NO forbidden fields exist
      const asAny = ctx as Record<string, unknown>;
      if ('topics' in asAny || 'steps' in asAny || 'worked' in asAny || 'scene' in asAny) {
        noExtraneousFields = false;
      }
    }
  }

  assertCheck(
    'buildUnitContext tested for all 43 units',
    totalUnitsTested === 43,
    totalUnitsTested,
    43
  );
  assertCheck(
    'buildUnitContext returns EXACT allowed keys only (no topics/steps/worked)',
    allExactKeysMatch && noExtraneousFields,
    true,
    true
  );

  // --------------------------------------------------------------------------
  // b, c, d, e: Mock global fetch, call POST handler, capture body & headers
  // --------------------------------------------------------------------------
  const unitsToSample = [
    { subjectId: 'math', unitIndex: 0 },
    { subjectId: 'phy', unitIndex: 1 },
    { subjectId: 'pps', unitIndex: 2 },
    { subjectId: 'beee', unitIndex: 0 },
    { subjectId: 'uhv', unitIndex: 0 },
    { subjectId: 'ai', unitIndex: 0 },
  ];

  const originalFetch = global.fetch;
  const originalKey = process.env.GEMINI_API_KEY;
  const TEST_KEY = 'test-gemini-key-secure-12345';
  process.env.GEMINI_API_KEY = TEST_KEY;

  const validOverlapsReported: Array<{ subject: string; unit: number; topic: string }> = [];
  let headerKeyVerified = true;
  let urlCleanVerified = true;
  let titleAndSummaryVerified = true;
  let keyMovesVerified = true;
  let forbiddenSectionsVerified = true;
  let forbiddenTopicsVerified = true;
  let otherUnitTitlesVerified = true;

  try {
    for (const sample of unitsToSample) {
      const subject = SUBJECTS.find((s) => s.id === sample.subjectId)!;
      const unit = subject.units[sample.unitIndex];

      let capturedUrl = '';
      let capturedHeaders: Record<string, string> = {};
      let capturedBody: any = null;

      global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        capturedUrl = input.toString();
        capturedHeaders = (init?.headers as Record<string, string>) || {};
        capturedBody = init?.body ? JSON.parse(init.body as string) : null;

        return new Response(
          JSON.stringify({
            candidates: [
              {
                content: {
                  parts: [
                    {
                      text: `### Answer in one line\nMock solution for ${unit.t}.\n### Step by step\n1. Step one\n### Formula used\n$E=mc^2$\n### Common slip\nSign error\n### How to write it for full marks\nWrite units`,
                    },
                  ],
                },
              },
            ],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      };

      const req = new NextRequest('http://localhost:3000/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${sample.unitIndex + 1}`,
        },
        body: JSON.stringify({
          subjectId: sample.subjectId,
          unitIndex: sample.unitIndex,
          question: `Explain core concepts of ${unit.t} in detail`,
        }),
      });

      const res = await POST(req);
      if (res.status !== 200) {
        titleAndSummaryVerified = false;
        continue;
      }

      // Assert e: key in header and NOT in URL
      if (capturedHeaders['x-goog-api-key'] !== TEST_KEY) {
        headerKeyVerified = false;
      }
      if (capturedUrl.includes(TEST_KEY) || capturedUrl.includes('key=')) {
        urlCleanVerified = false;
      }

      // Extract user prompt from Gemini payload
      const contents = capturedBody?.contents?.[0];
      const userTextPart = contents?.parts?.find((p: any) => typeof p.text === 'string');
      const userPrompt: string = userTextPart?.text || '';

      // Assert c: CONTAINS unit title, summary, and every key move
      if (!userPrompt.includes(unit.t) || !userPrompt.includes(unit.s)) {
        titleAndSummaryVerified = false;
      }
      for (const move of unit.k) {
        if (!userPrompt.includes(move)) {
          keyMovesVerified = false;
        }
      }

      // Assert d: Does NOT contain labelled sections "Syllabus Topics", "Active Step", "Worked"
      if (
        userPrompt.includes('Syllabus Topics') ||
        userPrompt.includes('Active Step') ||
        userPrompt.includes('Worked')
      ) {
        forbiddenSectionsVerified = false;
      }

      // Assert d: Does NOT contain topic strings of that unit (unless valid substring overlap)
      for (const rawTopic of unit.topics) {
        const cleanTopic = rawTopic.replace(/^★\s*/, '').trim();
        const inSummary = unit.s.includes(cleanTopic);
        const inMoves = unit.k.some((k) => k.includes(cleanTopic));

        if (inSummary || inMoves) {
          validOverlapsReported.push({
            subject: subject.id,
            unit: sample.unitIndex + 1,
            topic: cleanTopic,
          });
          continue; // Valid overlap: allowed to appear as part of summary or key moves
        }

        if (userPrompt.includes(cleanTopic)) {
          forbiddenTopicsVerified = false;
        }
      }

      // Assert d: No title of any other unit appears
      for (const otherSubject of SUBJECTS) {
        for (const otherUnit of otherSubject.units) {
          if (otherUnit.t === unit.t) continue;
          if (userPrompt.includes(otherUnit.t)) {
            otherUnitTitlesVerified = false;
          }
        }
      }
    }
  } finally {
    global.fetch = originalFetch;
    if (originalKey !== undefined) {
      process.env.GEMINI_API_KEY = originalKey;
    } else {
      delete process.env.GEMINI_API_KEY;
    }
  }

  assertCheck(
    'Gemini API key is passed in x-goog-api-key header and never in URL',
    headerKeyVerified && urlCleanVerified,
    true,
    true
  );
  assertCheck(
    'Prompt contains unit title, summary, and all key moves',
    titleAndSummaryVerified && keyMovesVerified,
    true,
    true
  );
  assertCheck(
    'Prompt contains NO forbidden sections ("Syllabus Topics", "Active Step", "Worked")',
    forbiddenSectionsVerified,
    true,
    true
  );
  assertCheck(
    'Prompt contains NO unshared unit topic strings',
    forbiddenTopicsVerified,
    true,
    true
  );
  assertCheck(
    'Prompt contains NO titles from any other unit',
    otherUnitTitlesVerified,
    true,
    true
  );

  if (validOverlapsReported.length > 0) {
    console.log(
      `[INFO] Valid topic overlaps (topic string is natural substring of summary/moves, skipped from topic check): ${validOverlapsReported.length}`
    );
  }

  // --------------------------------------------------------------------------
  // f. Mock cases: success, 429, timeout, blocked content, MAX_TOKENS, multi-part, no key, image too large
  // --------------------------------------------------------------------------

  // 1. Success case
  {
    process.env.GEMINI_API_KEY = TEST_KEY;
    global.fetch = async () =>
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [{ text: '### Answer in one line\nSuccess live solution.' }],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    const req = new NextRequest('http://localhost:3000/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.1' },
      body: JSON.stringify({ subjectId: 'math', unitIndex: 0, question: 'Solve equation' }),
    });

    const res = await POST(req);
    const data = await res.json();
    assertCheck('Mock case: Success returns 200 with isLiveAi: true', res.status === 200 && data.isLiveAi === true, true, true);
  }

  // 2. 429 Rate Limit case
  {
    let rateLimited = false;
    for (let i = 0; i < 18; i++) {
      const req = new NextRequest('http://localhost:3000/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.200.0.99' },
        body: JSON.stringify({ subjectId: 'math', unitIndex: 0, question: `Spam query ${i}` }),
      });
      const res = await POST(req);
      if (res.status === 429) {
        const data = await res.json();
        if (data.code === 'RATE_LIMIT_EXCEEDED') {
          rateLimited = true;
          break;
        }
      }
    }
    assertCheck('Mock case: 429 Rate limit triggered with code RATE_LIMIT_EXCEEDED', rateLimited, true, true);
  }

  // 3. Timeout / Abort case
  {
    process.env.GEMINI_API_KEY = TEST_KEY;
    global.fetch = async () => {
      throw new Error('The operation was aborted due to timeout');
    };

    const req = new NextRequest('http://localhost:3000/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.2' },
      body: JSON.stringify({ subjectId: 'phy', unitIndex: 0, question: 'Explain corrosion' }),
    });

    const res = await POST(req);
    const data = await res.json();
    assertCheck(
      'Mock case: Timeout gracefully falls back to syllabus offline response',
      res.status === 200 && data.isLiveAi === false && typeof data.answer === 'string',
      true,
      true
    );
  }

  // 4. Blocked content case
  {
    process.env.GEMINI_API_KEY = TEST_KEY;
    global.fetch = async () =>
      new Response(
        JSON.stringify({
          promptFeedback: { blockReason: 'SAFETY' },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    const req = new NextRequest('http://localhost:3000/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.3' },
      body: JSON.stringify({ subjectId: 'beee', unitIndex: 0, question: 'Sensitive query' }),
    });

    const res = await POST(req);
    const data = await res.json();
    const hasNotice = data.answer?.includes('SAFETY');
    assertCheck(
      'Mock case: Blocked content displays safety notice and syllabus fallback',
      res.status === 200 && hasNotice && data.isLiveAi === false,
      true,
      true
    );
  }

  // 5. MAX_TOKENS case
  {
    process.env.GEMINI_API_KEY = TEST_KEY;
    global.fetch = async () =>
      new Response(
        JSON.stringify({
          candidates: [
            {
              finishReason: 'MAX_TOKENS',
              content: { parts: [{ text: '### Long derivation\nPart 1...' }] },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    const req = new NextRequest('http://localhost:3000/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.4' },
      body: JSON.stringify({ subjectId: 'math', unitIndex: 1, question: 'Derive Taylor theorem' }),
    });

    const res = await POST(req);
    const data = await res.json();
    const hasTruncationNote = data.answer?.includes('capped at maximum output length');
    assertCheck(
      'Mock case: MAX_TOKENS includes continuation / truncation notice',
      res.status === 200 && hasTruncationNote,
      true,
      true
    );
  }

  // 6. Multi-part response case
  {
    process.env.GEMINI_API_KEY = TEST_KEY;
    global.fetch = async () =>
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  { text: '### Answer in one line\nHeader text.\n' },
                  { text: '### Step by step\nBody explanation.' },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    const req = new NextRequest('http://localhost:3000/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.5' },
      body: JSON.stringify({ subjectId: 'pps', unitIndex: 0, question: 'What is a pointer?' }),
    });

    const res = await POST(req);
    const data = await res.json();
    const joinedParts =
      data.answer?.includes('Header text.') && data.answer?.includes('Body explanation.');
    assertCheck(
      'Mock case: Multi-part candidate joined seamlessly into complete solution',
      res.status === 200 && joinedParts,
      true,
      true
    );
  }

  // 7. No key (offline template) case
  {
    delete process.env.GEMINI_API_KEY;

    const req = new NextRequest('http://localhost:3000/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.6' },
      body: JSON.stringify({ subjectId: 'uhv', unitIndex: 0, question: 'What is trust?' }),
    });

    const res = await POST(req);
    const data = await res.json();
    const hasFiveSections =
      data.answer?.includes('### Answer in one line') &&
      data.answer?.includes('### Step by step') &&
      data.answer?.includes('### Formula used') &&
      data.answer?.includes('### Common slip') &&
      data.answer?.includes('### How to write it for full marks');

    assertCheck(
      'Mock case: No API key returns offline_template with 5-section layout',
      res.status === 200 && data.source === 'offline_template' && data.isLiveAi === false && hasFiveSections,
      true,
      true
    );
  }

  // 8. Image too large (>4MB) case
  {
    const oversizedBase64 = 'a'.repeat(5 * 1024 * 1024); // 5MB payload
    const req = new NextRequest('http://localhost:3000/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.7' },
      body: JSON.stringify({
        subjectId: 'pps',
        unitIndex: 0,
        question: 'Solve this diagram',
        image: `data:image/png;base64,${oversizedBase64}`,
      }),
    });

    const res = await POST(req);
    assertCheck(
      'Mock case: Image exceeding 4MB rejected with HTTP 400',
      res.status === 400,
      res.status,
      400
    );
  }

  // Reset environment
  global.fetch = originalFetch;
  if (originalKey !== undefined) {
    process.env.GEMINI_API_KEY = originalKey;
  } else {
    delete process.env.GEMINI_API_KEY;
  }

  // --------------------------------------------------------------------------
  // Summary
  // --------------------------------------------------------------------------
  let allPassed = true;
  for (const c of checks) {
    const mark = c.passed ? '[PASS]' : '[FAIL]';
    if (!c.passed) allPassed = false;
    console.log(`${mark} ${c.title}: actual=${c.actual}, expected=${c.expected}`);
  }
  console.log('--------------------------------------------------');

  return allPassed;
}

if (require.main === module || !module.parent) {
  runTutorContextChecks().then((success) => {
    if (!success) {
      console.error('Tutor context checks failed!');
      process.exit(1);
    } else {
      console.log('All tutor context & security assertions passed successfully!');
      process.exit(0);
    }
  });
}
