'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flag,
  Pause,
  Play,
  RotateCcw,
  Timer,
  XCircle,
} from 'lucide-react';
import type { MidsemMcq } from '@/data/midsemMCQs';
import { MidsemMathText } from './MidsemKatexRenderer';
import { MOCK_STORAGE_PREFIX } from './midsemTypes';

interface PersistedMockState {
  running: boolean;
  paused: boolean;
  secondsLeft: number;
  answers: Record<string, number>;
  flagged: Record<string, boolean>;
  currentIdx: number;
  submitted: boolean;
}

export interface MidsemMockSimulatorProps {
  subjectCode: string;
  subjectShort: string;
  mcqs: MidsemMcq[];
}

const DEFAULT_SECONDS = 900;

export const MidsemMockSimulator: React.FC<MidsemMockSimulatorProps> = ({
  subjectCode,
  subjectShort,
  mcqs,
}) => {
  const deck = useMemo(() => mcqs.slice(0, 15), [mcqs]);
  const storageKey = `${MOCK_STORAGE_PREFIX}${subjectCode}`;

  const [state, setState] = useState<PersistedMockState>({
    running: false,
    paused: false,
    secondsLeft: DEFAULT_SECONDS,
    answers: {},
    flagged: {},
    currentIdx: 0,
    submitted: false,
  });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate per-subject state
  useEffect(() => {
    setHydrated(false);
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          setState({
            running: Boolean(parsed.running),
            paused: Boolean(parsed.paused),
            secondsLeft:
              typeof parsed.secondsLeft === 'number' && parsed.secondsLeft >= 0
                ? parsed.secondsLeft
                : DEFAULT_SECONDS,
            answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
            flagged: parsed.flagged && typeof parsed.flagged === 'object' ? parsed.flagged : {},
            currentIdx: typeof parsed.currentIdx === 'number' ? Math.max(0, parsed.currentIdx) : 0,
            submitted: Boolean(parsed.submitted),
          });
          setHydrated(true);
          return;
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setState({
      running: false,
      paused: false,
      secondsLeft: DEFAULT_SECONDS,
      answers: {},
      flagged: {},
      currentIdx: 0,
      submitted: false,
    });
    setHydrated(true);
  }, [storageKey]);

  // Save on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // ignore storage quota errors
    }
  }, [state, storageKey, hydrated]);

  // Countdown tick only while actively running and unpaused
  useEffect(() => {
    if (!state.running || state.paused || state.submitted) return;
    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.secondsLeft <= 1) {
          return { ...prev, secondsLeft: 0, running: false, paused: false, submitted: true };
        }
        return { ...prev, secondsLeft: prev.secondsLeft - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state.running, state.paused, state.submitted]);

  const safeIdx = deck.length ? Math.min(state.currentIdx, deck.length - 1) : 0;
  const currentQ = deck[safeIdx];

  const stats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    for (const q of deck) {
      if (state.answers[q.id] !== undefined) {
        answered++;
        if (state.answers[q.id] === q.ans) correct++;
      }
    }
    const flaggedCount = deck.filter((q) => state.flagged[q.id]).length;
    return {
      total: deck.length,
      answered,
      unanswered: deck.length - answered,
      flaggedCount,
      correct,
      pct: deck.length > 0 ? Math.round((correct / deck.length) * 100) : 0,
    };
  }, [deck, state.answers, state.flagged]);

  const startMock = () => {
    setState({
      running: true,
      paused: false,
      secondsLeft: DEFAULT_SECONDS,
      answers: {},
      flagged: {},
      currentIdx: 0,
      submitted: false,
    });
  };

  const togglePause = () => {
    setState((prev) => ({ ...prev, paused: !prev.paused }));
  };

  const submitMock = () => {
    setState((prev) => ({ ...prev, running: false, paused: false, submitted: true }));
  };

  const formatTimer = (sec: number) =>
    `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

  return (
    <div className="space-y-5">
      {/* Header + Controls */}
      <div className="border-2 border-ink bg-paper2 rounded-2xl p-4 sm:p-5 shadow-sketch flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="midsem-heading text-3xl text-ink flex items-center gap-2">
            <Timer className="w-6 h-6 text-accentTeal" aria-hidden="true" />
            <span>{subjectShort} 15-Minute Mock Simulator ({deck.length} Qs)</span>
          </h2>
          <p className="midsem-meta text-dim mt-0.5">
            Progress auto-saves per subject. Pause anytime without losing answers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div
            aria-label="Mock exam remaining time"
            className={`midsem-num text-2xl px-4 py-1.5 rounded-xl border-2 font-bold ${
              state.secondsLeft < 180 && state.running
                ? 'border-accentRed bg-accentRed/15 text-accentRed'
                : 'border-ink bg-paper text-ink shadow-sketchy'
            }`}
          >
            {formatTimer(state.secondsLeft)}
          </div>

          {!state.running && !state.submitted && (
            <button
              type="button"
              onClick={startMock}
              className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-accentTeal text-paper midsem-meta font-bold shadow-sketch inline-flex items-center gap-1.5"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              <span>Start Simulator</span>
            </button>
          )}

          {state.running && !state.submitted && (
            <>
              <button
                type="button"
                onClick={togglePause}
                className="midsem-tap px-3.5 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper3 midsem-meta font-bold text-ink inline-flex items-center gap-1.5"
              >
                {state.paused ? (
                  <>
                    <Play className="w-4 h-4 text-accentTeal" aria-hidden="true" />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4 text-accentGold" aria-hidden="true" />
                    <span>Pause</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={submitMock}
                className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-accentGold text-paper midsem-meta font-bold shadow-sketch"
              >
                Submit Mock
              </button>
            </>
          )}

          {state.submitted && (
            <button
              type="button"
              onClick={startMock}
              className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper3 midsem-meta font-bold text-ink inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Retake Mock</span>
            </button>
          )}
        </div>
      </div>

      {deck.length === 0 ? (
        <div className="border-2 border-dashed border-ink/40 bg-paper2 rounded-2xl p-8 text-center midsem-meta text-dim">
          No mock questions match the selected unit filter. Select &ldquo;All&rdquo; units to load full subject questions.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6 items-start">
          {/* Main Active Area */}
          <div className="space-y-4">
            {state.submitted ? (
              /* Result Review */
              <div className="space-y-4">
                <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 shadow-sketch flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="midsem-badge font-mono uppercase text-accentRed font-bold">
                      Mock Result Review
                    </span>
                    <h3 className="midsem-heading text-3xl text-ink">
                      Score: {stats.correct} / {stats.total} ({stats.pct}%)
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-3 py-1.5 rounded-xl border border-accentTeal bg-accentTeal/15 text-accentTeal midsem-meta font-bold">
                      {stats.correct} Correct
                    </span>
                    <span className="px-3 py-1.5 rounded-xl border border-accentRed bg-accentRed/15 text-accentRed midsem-meta font-bold">
                      {stats.total - stats.correct} Missed/Blank
                    </span>
                  </div>
                </div>

                {deck.map((q, idx) => {
                  const chosen = state.answers[q.id];
                  const ok = chosen === q.ans;
                  return (
                    <div key={q.id} className="border-2 border-ink/50 bg-paper rounded-xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="midsem-meta font-mono font-bold text-ink">
                          Q{idx + 1} · {q.topic}
                        </span>
                        <span
                          className={`midsem-badge px-2.5 py-0.5 rounded-full font-mono font-bold border inline-flex items-center gap-1 ${
                            ok
                              ? 'border-accentTeal bg-accentTeal/15 text-accentTeal'
                              : 'border-accentRed bg-accentRed/15 text-accentRed'
                          }`}
                        >
                          {ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {ok ? 'Correct' : chosen === undefined ? 'Unanswered' : 'Incorrect'}
                        </span>
                      </div>
                      <div className="midsem-body font-bold text-ink">
                        <MidsemMathText text={q.q} />
                      </div>
                      <div className="midsem-meta text-ink bg-paper2 p-3 rounded-lg border border-hair/60 space-y-1">
                        <div>
                          <strong>Your choice:</strong>{' '}
                          {chosen !== undefined ? `${String.fromCharCode(65 + chosen)}. ` : 'None'}
                          {chosen !== undefined && <MidsemMathText text={q.options[chosen]} />}
                        </div>
                        <div className="text-accentTeal">
                          <strong>Correct answer:</strong> {String.fromCharCode(65 + q.ans)}.{' '}
                          <MidsemMathText text={q.options[q.ans]} />
                        </div>
                        <div className="text-dim pt-1">
                          <MidsemMathText text={q.explanation} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : state.paused ? (
              /* Paused Overlay Preserving Answers */
              <div className="border-2 border-ink bg-paper2 rounded-2xl p-8 text-center shadow-sketch space-y-4">
                <h3 className="midsem-heading text-3xl text-ink">Mock Test Paused</h3>
                <p className="midsem-body text-dim">
                  Your {stats.answered} answered and {stats.flaggedCount} flagged questions are saved safely at{' '}
                  <strong>{formatTimer(state.secondsLeft)}</strong>.
                </p>
                <button
                  type="button"
                  onClick={togglePause}
                  className="midsem-tap px-5 py-2.5 rounded-xl border-2 border-ink bg-accentTeal text-paper midsem-meta font-bold shadow-sketch inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4" aria-hidden="true" />
                  <span>Resume Mock Test</span>
                </button>
              </div>
            ) : (
              /* Active Question Card */
              currentQ && (
                <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 sm:p-6 shadow-sketch space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hair pb-2.5">
                    <span className="midsem-meta font-mono font-bold text-accentRed">
                      Question {safeIdx + 1} of {deck.length} · Unit {currentQ.unitNo}
                    </span>
                    <button
                      type="button"
                      disabled={!state.running}
                      aria-pressed={Boolean(state.flagged[currentQ.id])}
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          flagged: { ...prev.flagged, [currentQ.id]: !prev.flagged[currentQ.id] },
                        }))
                      }
                      className={`midsem-tap px-3 py-1.5 rounded-xl border-2 midsem-meta font-bold inline-flex items-center gap-1.5 disabled:opacity-40 ${
                        state.flagged[currentQ.id]
                          ? 'border-accentGold bg-accentGold text-paper'
                          : 'border-ink/40 bg-paper text-ink hover:bg-paper3'
                      }`}
                    >
                      <Flag className="w-4 h-4" aria-hidden="true" />
                      <span>{state.flagged[currentQ.id] ? 'Flagged' : 'Flag for review'}</span>
                    </button>
                  </div>

                  {!state.running && (
                    <div className="p-3 rounded-xl border border-accentGold bg-accentGold/15 midsem-meta text-ink">
                      Click <strong>Start Simulator</strong> above to unlock options and start the 15-minute clock.
                    </div>
                  )}

                  <div className="midsem-body font-bold text-ink bg-paper p-4 rounded-xl border-2 border-ink/30">
                    <MidsemMathText text={currentQ.q} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQ.options.map((opt, oIdx) => {
                      const chosen = state.answers[currentQ.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={!state.running}
                          aria-pressed={chosen}
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              answers: { ...prev.answers, [currentQ.id]: oIdx },
                            }))
                          }
                          className={`midsem-tap p-3.5 rounded-xl border-2 text-left midsem-body transition-colors flex items-center gap-3 disabled:opacity-60 ${
                            chosen
                              ? 'border-accentTeal bg-accentTeal/15 text-ink font-bold shadow-sketchy'
                              : 'border-ink/40 bg-paper text-ink hover:bg-paper3'
                          }`}
                        >
                          <span className="w-7 h-7 rounded-full border-2 border-ink/40 bg-paper2 inline-flex items-center justify-center font-mono font-bold midsem-meta shrink-0">
                            {String.fromCharCode(65 + oIdx)}.
                          </span>
                          <span className="flex-1 min-w-0">
                            <MidsemMathText text={opt} />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-hair flex items-center justify-between gap-2">
                    <button
                      type="button"
                      disabled={safeIdx === 0}
                      onClick={() => setState((prev) => ({ ...prev, currentIdx: Math.max(0, safeIdx - 1) }))}
                      className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper3 disabled:opacity-40 midsem-meta font-bold text-ink inline-flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>
                    <button
                      type="button"
                      disabled={safeIdx >= deck.length - 1}
                      onClick={() =>
                        setState((prev) => ({ ...prev, currentIdx: Math.min(deck.length - 1, safeIdx + 1) }))
                      }
                      className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-accentTeal text-paper disabled:opacity-40 midsem-meta font-bold shadow-sketchy inline-flex items-center gap-1.5"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Question Palette Sidebar */}
          <aside className="border-2 border-ink bg-paper2 rounded-2xl p-4 shadow-sketch space-y-3">
            <div className="midsem-meta font-mono uppercase font-bold text-ink border-b border-hair pb-2">
              Question Palette
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center midsem-badge font-mono">
              <div className="p-1.5 rounded bg-accentTeal/15 border border-accentTeal text-accentTeal font-bold">
                {stats.answered} Ans
              </div>
              <div className="p-1.5 rounded bg-accentGold/20 border border-accentGold text-ink font-bold">
                {stats.flaggedCount} Flag
              </div>
              <div className="p-1.5 rounded bg-paper border border-ink/40 text-dim font-bold">
                {stats.unanswered} Left
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {deck.map((q, idx) => {
                const isCurrent = idx === safeIdx && !state.submitted;
                const isAnswered = state.answers[q.id] !== undefined;
                const isFlagged = Boolean(state.flagged[q.id]);
                let cls = 'border-ink/40 bg-paper text-ink hover:bg-paper3';
                if (isFlagged) cls = 'border-accentGold bg-accentGold text-paper';
                else if (isAnswered) cls = 'border-accentTeal bg-accentTeal text-paper';
                return (
                  <button
                    key={q.id}
                    type="button"
                    aria-label={`Jump to mock question ${idx + 1}`}
                    onClick={() => setState((prev) => ({ ...prev, currentIdx: idx }))}
                    className={`midsem-tap rounded-lg border-2 font-mono font-bold midsem-meta ${cls} ${
                      isCurrent ? 'ring-2 ring-accentRed ring-offset-1' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
