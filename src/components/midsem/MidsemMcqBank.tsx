'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Keyboard,
  ListChecks,
  RotateCcw,
  Target,
  XCircle,
} from 'lucide-react';
import type { MidsemMcq } from '@/data/midsemMCQs';
import { MidsemMathText } from './MidsemKatexRenderer';
import { MCQ_STORAGE_PREFIX } from './midsemTypes';

export interface MidsemMcqBankProps {
  subjectCode: string;
  subjectShort: string;
  mcqs: MidsemMcq[];
  jumpMcqId?: string;
}

export const MidsemMcqBank: React.FC<MidsemMcqBankProps> = ({
  subjectCode,
  subjectShort,
  mcqs,
  jumpMcqId,
}) => {
  const storageKey = `${MCQ_STORAGE_PREFIX}${subjectCode}`;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [retryWrongMode, setRetryWrongMode] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  // Hydrate persisted answers per subject
  useEffect(() => {
    setHydrated(false);
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          setAnswers(parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {});
          setCurrentIdx(0);
          setRetryWrongMode(false);
          setShowSummary(false);
          setHydrated(true);
          return;
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setAnswers({});
    setCurrentIdx(0);
    setRetryWrongMode(false);
    setShowSummary(false);
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers }));
    } catch {
      // ignore storage quota errors
    }
  }, [answers, storageKey, hydrated]);

  const activeDeck = useMemo(() => {
    if (!retryWrongMode) return mcqs;
    return mcqs.filter((m) => answers[m.id] !== undefined && answers[m.id] !== m.ans);
  }, [mcqs, retryWrongMode, answers]);

  // Clamp index and handle search jump
  useEffect(() => {
    if (jumpMcqId) {
      setRetryWrongMode(false);
      setShowSummary(false);
      const foundIdx = mcqs.findIndex((m) => m.id === jumpMcqId);
      if (foundIdx >= 0) {
        setCurrentIdx(foundIdx);
        return;
      }
    }
    setCurrentIdx((prev) => (activeDeck.length === 0 ? 0 : Math.min(prev, activeDeck.length - 1)));
  }, [activeDeck.length, jumpMcqId, mcqs]);

  const currentMcq = activeDeck[currentIdx];

  const stats = useMemo(() => {
    let attempted = 0;
    let correct = 0;
    let wrong = 0;
    for (const m of mcqs) {
      if (answers[m.id] !== undefined) {
        attempted++;
        if (answers[m.id] === m.ans) correct++;
        else wrong++;
      }
    }
    return {
      total: mcqs.length,
      attempted,
      correct,
      wrong,
      pct: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
    };
  }, [mcqs, answers]);

  // Keyboard shortcuts: 1-4 selects option A-D; ArrowRight / ArrowLeft moves cards
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }
      if (!currentMcq || showSummary) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optIndex = Number(e.key) - 1;
        if (optIndex < currentMcq.options.length) {
          e.preventDefault();
          setAnswers((prev) => ({ ...prev, [currentMcq.id]: optIndex }));
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIdx < activeDeck.length - 1) setCurrentIdx((i) => i + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentIdx > 0) setCurrentIdx((i) => i - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentMcq, currentIdx, activeDeck.length, showSummary]);

  const handleRetryWrong = () => {
    const wrongItems = mcqs.filter((m) => answers[m.id] !== undefined && answers[m.id] !== m.ans);
    if (!wrongItems.length) return;
    // Clear answers for wrong items so user re-attempts cleanly
    setAnswers((prev) => {
      const next = { ...prev };
      wrongItems.forEach((w) => delete next[w.id]);
      return next;
    });
    setRetryWrongMode(false);
    setShowSummary(false);
    const firstWrongInMcqs = mcqs.findIndex((m) => m.id === wrongItems[0].id);
    setCurrentIdx(Math.max(0, firstWrongInMcqs));
  };

  return (
    <div className="space-y-5">
      {/* Header & Score Strip */}
      <div className="border-2 border-ink bg-paper2 rounded-2xl p-4 sm:p-5 shadow-sketch flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="midsem-heading text-3xl text-ink flex items-center gap-2">
            <Target className="w-6 h-6 text-accentRed" aria-hidden="true" />
            <span>{subjectShort} CBT MCQ Bank ({mcqs.length} Questions)</span>
          </h2>
          <p className="midsem-meta text-dim flex flex-wrap items-center gap-2 mt-0.5">
            <span>BEU Compulsory 1-Mark drill with instant feedback.</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-paper3 border border-ink/30 text-ink midsem-badge font-mono">
              <Keyboard className="w-3.5 h-3.5" aria-hidden="true" /> Press 1–4 to answer
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-2 rounded-xl border-2 border-ink/40 bg-paper midsem-meta font-mono font-bold">
            Score: <span className="text-accentTeal">{stats.correct}</span> / {stats.attempted} ({stats.pct}%)
          </div>
          <button
            type="button"
            aria-pressed={showSummary}
            onClick={() => setShowSummary((v) => !v)}
            className="midsem-tap px-3.5 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper3 midsem-meta font-bold text-ink inline-flex items-center gap-1.5"
          >
            <ListChecks className="w-4 h-4 text-accentTeal" aria-hidden="true" />
            <span>{showSummary ? 'Back to Question' : 'Summary'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setRetryWrongMode(false);
              setShowSummary(false);
              setCurrentIdx(0);
            }}
            aria-label="Reset MCQ answers"
            className="midsem-tap px-3 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper3 midsem-meta font-bold text-ink inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4 text-dim" aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {activeDeck.length === 0 ? (
        <div className="border-2 border-dashed border-ink/40 bg-paper2 rounded-2xl p-8 text-center midsem-meta text-dim">
          No MCQs available for this filter.
        </div>
      ) : showSummary ? (
        /* Score Summary View */
        <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 sm:p-6 shadow-sketch space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-hair pb-3">
            <div>
              <h3 className="midsem-heading text-3xl text-ink">{subjectShort} Practice Summary</h3>
              <p className="midsem-meta text-dim">
                {stats.attempted} of {stats.total} questions answered · Accuracy {stats.pct}%
              </p>
            </div>
            {stats.wrong > 0 && (
              <button
                type="button"
                onClick={handleRetryWrong}
                className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-accentRed text-paper midsem-meta font-bold shadow-sketchy inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Retry wrong ones ({stats.wrong})</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border-2 border-ink bg-paper text-center">
              <div className="midsem-badge font-mono text-dim uppercase">Total</div>
              <div className="midsem-num text-3xl text-ink">{stats.total}</div>
            </div>
            <div className="p-4 rounded-xl border-2 border-accentTeal bg-accentTeal/10 text-center">
              <div className="midsem-badge font-mono text-accentTeal uppercase font-bold">Correct</div>
              <div className="midsem-num text-3xl text-accentTeal">{stats.correct}</div>
            </div>
            <div className="p-4 rounded-xl border-2 border-accentRed bg-accentRed/10 text-center">
              <div className="midsem-badge font-mono text-accentRed uppercase font-bold">Wrong</div>
              <div className="midsem-num text-3xl text-accentRed">{stats.wrong}</div>
            </div>
            <div className="p-4 rounded-xl border-2 border-ink/40 bg-paper3 text-center">
              <div className="midsem-badge font-mono text-dim uppercase">Remaining</div>
              <div className="midsem-num text-3xl text-ink">{stats.total - stats.attempted}</div>
            </div>
          </div>

          {/* Quick Jump Grid */}
          <div className="flex flex-wrap gap-2 pt-2">
            {mcqs.map((m, idx) => {
              const ua = answers[m.id];
              const cls =
                ua === undefined
                  ? 'border-ink/40 bg-paper text-ink'
                  : ua === m.ans
                  ? 'border-accentTeal bg-accentTeal text-paper'
                  : 'border-accentRed bg-accentRed text-paper';
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setShowSummary(false);
                    setCurrentIdx(idx);
                  }}
                  className={`midsem-tap px-3 py-1.5 rounded-lg border-2 font-mono midsem-meta font-bold ${cls}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Focused One-Question-at-a-Time Card */
        currentMcq && (
          <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 sm:p-6 shadow-sketch space-y-5">
            {/* Progress Meter */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="midsem-meta font-mono font-bold text-accentRed">
                  Question {currentIdx + 1} of {activeDeck.length} · Unit {currentMcq.unitNo} ({currentMcq.topic})
                </span>
                {answers[currentMcq.id] !== undefined && (
                  <span
                    className={`midsem-badge inline-flex items-center gap-1 px-2.5 py-1 rounded-full border font-bold font-mono ${
                      answers[currentMcq.id] === currentMcq.ans
                        ? 'border-accentTeal bg-accentTeal/15 text-accentTeal'
                        : 'border-accentRed bg-accentRed/15 text-accentRed'
                    }`}
                  >
                    {answers[currentMcq.id] === currentMcq.ans ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Correct +1
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" aria-hidden="true" /> Incorrect 0
                      </>
                    )}
                  </span>
                )}
              </div>
              <div className="w-full h-2.5 bg-paper rounded-full border border-ink/40 overflow-hidden">
                <div
                  className="h-full bg-accentTeal transition-all"
                  style={{ width: `${Math.round(((currentIdx + 1) / activeDeck.length) * 100)}%` }}
                />
              </div>
            </div>

            {/* Question Stem */}
            <div className="midsem-body font-bold text-ink bg-paper p-4 rounded-xl border-2 border-ink/30">
              <MidsemMathText text={currentMcq.q} />
            </div>

            {/* 4 Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentMcq.options.map((opt, oIdx) => {
                const userAns = answers[currentMcq.id];
                const isAnswered = userAns !== undefined;
                const isChosen = userAns === oIdx;
                const isCorrectOpt = oIdx === currentMcq.ans;

                let optStyle = 'border-ink/40 bg-paper text-ink hover:bg-paper3 hover:border-ink';
                if (isAnswered) {
                  if (isCorrectOpt) {
                    optStyle = 'border-2 border-accentTeal bg-accentTeal/15 text-ink font-bold shadow-sketchy';
                  } else if (isChosen) {
                    optStyle = 'border-2 border-accentRed bg-accentRed/15 text-accentRed';
                  } else {
                    optStyle = 'border-ink/20 bg-paper/60 text-dim';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    aria-pressed={isChosen}
                    onClick={() => setAnswers((prev) => ({ ...prev, [currentMcq.id]: oIdx }))}
                    className={`midsem-tap p-3.5 rounded-xl border-2 text-left midsem-body transition-colors flex items-center gap-3 ${optStyle}`}
                  >
                    <span className="w-7 h-7 rounded-full border-2 border-ink/50 bg-paper2 inline-flex items-center justify-center font-mono font-bold midsem-meta shrink-0">
                      {oIdx + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-mono font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                      <MidsemMathText text={opt} />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Explanation */}
            {answers[currentMcq.id] !== undefined && (
              <div className="p-4 rounded-xl border-2 border-ink bg-paper3 space-y-1">
                <div className="text-accentTeal font-mono font-bold uppercase midsem-meta">
                  Explanation
                </div>
                <div className="midsem-body text-ink">
                  <MidsemMathText text={currentMcq.explanation} />
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="pt-3 border-t-2 border-hair flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper3 disabled:opacity-40 midsem-meta font-bold text-ink inline-flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Previous</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                {stats.wrong > 0 && (
                  <button
                    type="button"
                    onClick={handleRetryWrong}
                    className="midsem-tap px-3.5 py-2 rounded-xl border-2 border-accentRed bg-accentRed/10 hover:bg-accentRed hover:text-paper text-accentRed midsem-meta font-bold transition-colors"
                  >
                    Retry wrong ({stats.wrong})
                  </button>
                )}

                {currentIdx < activeDeck.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx((i) => Math.min(activeDeck.length - 1, i + 1))}
                    className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-accentTeal text-paper midsem-meta font-bold shadow-sketchy inline-flex items-center gap-1.5"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSummary(true)}
                    className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-accentGold text-paper midsem-meta font-bold shadow-sketchy"
                  >
                    View Score Summary
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
