'use client';

import React, { useState, useMemo } from 'react';
import { Subject, Flashcard, FlashcardProgress } from '@/types/syllabus';
import { FLASHCARDS } from '@/data/flashcards';
import { KatexText } from './KatexRenderer';

interface FlashcardsModalProps {
  open: boolean;
  subjects: Subject[];
  progressMap: Record<string, FlashcardProgress>;
  onUpdateProgress: (cardId: string, progress: FlashcardProgress) => void;
  onClose: () => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  open,
  subjects,
  progressMap,
  onUpdateProgress,
  onClose,
}) => {
  const [selectedSubId, setSelectedSubId] = useState<string>('all');
  const [filterDueOnly, setFilterDueOnly] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Filter cards based on subject and due date
  const filteredCards = useMemo(() => {
    return FLASHCARDS.filter((card) => {
      if (selectedSubId !== 'all' && card.subjectId !== selectedSubId) {
        return false;
      }
      if (filterDueOnly) {
        const prog = progressMap[card.id];
        if (!prog) return true; // never reviewed -> due
        return prog.dueDate <= todayStr;
      }
      return true;
    });
  }, [selectedSubId, filterDueOnly, progressMap, todayStr]);

  // Total due count
  const totalDueCount = useMemo(() => {
    return FLASHCARDS.filter((card) => {
      const prog = progressMap[card.id];
      if (!prog) return true;
      return prog.dueDate <= todayStr;
    }).length;
  }, [progressMap, todayStr]);

  if (!open) return null;

  const currentCard: Flashcard | undefined = filteredCards[currentIdx];
  const cardProg: FlashcardProgress = progressMap[currentCard?.id || ''] || {
    interval: 0,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: todayStr,
  };

  // SuperMemo SM-2 interval calculator
  const applyRating = (quality: number) => {
    if (!currentCard) return;

    let { interval, repetition, easeFactor } = cardProg;

    if (quality < 3) {
      // Again or Failed
      repetition = 0;
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
    } else {
      // Hard (3), Good (4), Easy (5)
      if (repetition === 0) {
        interval = quality === 3 ? 1 : quality === 4 ? 2 : 4;
      } else if (repetition === 1) {
        interval = quality === 3 ? 3 : quality === 4 ? 6 : 9;
      } else {
        const factor = quality === 3 ? 1.2 : quality === 4 ? easeFactor : easeFactor * 1.3;
        interval = Math.round(interval * factor);
      }
      repetition += 1;
      easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + interval);
    const dueDate = nextDate.toISOString().split('T')[0];

    onUpdateProgress(currentCard.id, {
      interval,
      repetition,
      easeFactor: parseFloat(easeFactor.toFixed(2)),
      dueDate,
      lastReviewed: todayStr,
    });

    setIsFlipped(false);
    if (currentIdx < filteredCards.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="SM-2 Spaced Repetition Flashcards"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 md:p-6"
    >
      <div className="relative w-full max-w-2xl bg-paper border-2 border-ink rounded-lg shadow-2xl overflow-hidden font-sans text-ink flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b-2 border-ink flex items-center justify-between bg-gold/10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-hand text-2xl md:text-3xl font-bold leading-tight">
                Spaced Repetition Flashcards
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-ink bg-paper font-bold">
                SM-2 Algorithm
              </span>
            </div>
            <p className="text-sm text-dim">
              {totalDueCount} cards due today · Flip to review formulas, definitions, and theorems
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl font-bold text-dim hover:text-ink leading-none px-2"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-3 border-b border-dashed border-ink/30 bg-paper/60 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <label htmlFor="sub-select" className="font-bold text-dim">
              Subject:
            </label>
            <select
              id="sub-select"
              value={selectedSubId}
              onChange={(e) => {
                setSelectedSubId(e.target.value);
                setCurrentIdx(0);
                setIsFlipped(false);
              }}
              className="p-1.5 bg-paper border border-ink rounded text-sm font-sans font-medium"
            >
              <option value="all">All Subjects (43 Units)</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.co} ({s.units.length} cards)
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer font-bold text-dim">
            <input
              type="checkbox"
              checked={filterDueOnly}
              onChange={(e) => {
                setFilterDueOnly(e.target.checked);
                setCurrentIdx(0);
                setIsFlipped(false);
              }}
              className="accent-ink"
            />
            Due for Review Only ({totalDueCount})
          </label>
        </div>

        {/* Card Viewport */}
        <div className="p-4 md:p-6 flex-1 flex flex-col justify-center items-center">
          {filteredCards.length > 0 && currentCard ? (
            <div className="w-full max-w-lg flex flex-col items-center">
              {/* Card Meta Indicator */}
              <div className="w-full flex items-center justify-between text-xs text-dim mb-2 font-mono">
                <span>
                  Card {currentIdx + 1} of {filteredCards.length} · {currentCard.subjectId.toUpperCase()} (U{currentCard.unitIndex + 1})
                </span>
                <span className="uppercase font-bold text-accentRed">
                  {currentCard.category}
                </span>
              </div>

              {/* Flippable Card Container */}
              <div
                onClick={() => setIsFlipped((f) => !f)}
                className="w-full min-h-[260px] p-6 bg-paper border-2 border-ink rounded-xl shadow-sketchy cursor-pointer hover:border-accentRed/80 transition-all flex flex-col justify-between select-none relative group"
              >
                {/* Category tag */}
                <div className="flex justify-between items-center text-xs text-dim">
                  <span className="font-hand font-bold text-base text-accentRed">
                    {currentCard.unitTitle}
                  </span>
                  <span className="text-xs text-dim/80 underline decoration-dotted">
                    {isFlipped ? 'Click to show front' : 'Click to flip'}
                  </span>
                </div>

                {/* Card Main Body */}
                <div className="my-auto py-4 text-center">
                  {!isFlipped ? (
                    <div>
                      <span className="text-xs font-mono tracking-widest uppercase text-dim block mb-2 font-semibold">
                        PROMPT / CONCEPT
                      </span>
                      <h3 className="font-hand text-2xl md:text-3xl font-bold text-ink leading-snug">
                        <KatexText htmlOrText={currentCard.front} />
                      </h3>
                    </div>
                  ) : (
                    <div className="text-left">
                      <span className="text-xs font-mono tracking-widest uppercase text-accentTeal block mb-2 font-semibold">
                        EXPLANATION / DERIVATION
                      </span>
                      <div className="text-sm md:text-base font-medium text-ink leading-relaxed whitespace-pre-line font-sans">
                        <KatexText htmlOrText={currentCard.back} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Progress Info */}
                <div className="flex items-center justify-between text-xs text-dim font-mono border-t border-dashed border-ink/20 pt-2">
                  <span>Interval: {cardProg.interval}d</span>
                  <span>Reps: {cardProg.repetition}</span>
                  <span>Ease: {cardProg.easeFactor}</span>
                </div>
              </div>

              {/* SM-2 Rating Buttons (visible once flipped) */}
              <div className="w-full mt-4">
                {isFlipped ? (
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => applyRating(1)}
                      className="py-2 px-1 border-[1.5px] border-accentRed bg-accentRed/10 text-accentRed rounded font-bold text-xs hover:bg-accentRed hover:text-paper transition-colors"
                    >
                      Again (1d)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyRating(3)}
                      className="py-2 px-1 border-[1.5px] border-gold bg-gold/15 text-ink rounded font-bold text-xs hover:bg-gold hover:text-paper transition-colors"
                    >
                      Hard ({Math.max(1, Math.round(cardProg.interval * 1.2))}d)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyRating(4)}
                      className="py-2 px-1 border-[1.5px] border-accentTeal bg-accentTeal/15 text-accentTeal rounded font-bold text-xs hover:bg-accentTeal hover:text-paper transition-colors"
                    >
                      Good ({Math.max(2, Math.round(cardProg.interval * cardProg.easeFactor))}d)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyRating(5)}
                      className="py-2 px-1 border-[1.5px] border-ink bg-ink/10 text-ink rounded font-bold text-xs hover:bg-ink hover:text-paper transition-colors"
                    >
                      Easy ({Math.max(4, Math.round(cardProg.interval * cardProg.easeFactor * 1.3))}d)
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="w-full py-2.5 bg-ink text-paper font-sans text-base font-bold rounded border-[1.5px] border-ink shadow-sketchy hover:bg-ink/90 transition-all"
                  >
                    Reveal Answer &amp; Formula (Space or Click)
                  </button>
                )}
              </div>

              {/* Quick prev/next navigation */}
              <div className="flex items-center justify-between w-full mt-3 text-xs text-dim">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentIdx((i) => (i > 0 ? i - 1 : filteredCards.length - 1));
                    setIsFlipped(false);
                  }}
                  className="hover:text-ink underline decoration-dotted"
                >
                  ← Previous Card
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentIdx((i) => (i < filteredCards.length - 1 ? i + 1 : 0));
                    setIsFlipped(false);
                  }}
                  className="hover:text-ink underline decoration-dotted"
                >
                  Next Card →
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="font-hand text-2xl font-bold mb-1">All Caught Up!</h3>
              <p className="text-xs text-dim max-w-xs mx-auto mb-4">
                No flashcards due right now. You can switch the filter to &quot;All Subjects&quot; to review cards in advance.
              </p>
              <button
                type="button"
                onClick={() => setFilterDueOnly(false)}
                className="px-4 py-2 bg-ink text-paper text-xs font-bold rounded"
              >
                View All 43 Unit Cards
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
