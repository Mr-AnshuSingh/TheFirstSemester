'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/types/syllabus';
import { getRandomMockQuestions } from '@/data/quizBank';
import { KatexText } from './KatexRenderer';

interface MockTestModalProps {
  open: boolean;
  onClose: () => void;
  onRecordWeakSpots?: (weakUnits: { subjectId: string; unitIndex: number }[]) => void;
}

export const MockTestModal: React.FC<MockTestModalProps> = ({
  open,
  onClose,
  onRecordWeakSpots,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60); // 25 mins

  // Reset or initialize test when modal opens
  useEffect(() => {
    if (open) {
      setQuestions(getRandomMockQuestions(20));
      setUserAnswers({});
      setCurrentIdx(0);
      setIsSubmitted(false);
      setSecondsRemaining(25 * 60);
    }
  }, [open]);

  // Timer countdown
  useEffect(() => {
    if (!open || isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open, isSubmitted]);

  if (!open) return null;

  const currentQ = questions[currentIdx];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (onRecordWeakSpots) {
      const weakList: { subjectId: string; unitIndex: number }[] = [];
      questions.forEach((q) => {
        if (userAnswers[q.id] !== q.answer) {
          weakList.push({ subjectId: q.subjectId, unitIndex: q.unitIndex });
        }
      });
      onRecordWeakSpots(weakList);
    }
  };

  const correctCount = questions.reduce(
    (acc, q) => acc + (userAnswers[q.id] === q.answer ? 1 : 0),
    0
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Semester-1 Mock Test"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 md:p-6"
    >
      <div className="relative w-full max-w-4xl bg-paper border-2 border-ink rounded-lg shadow-2xl max-h-[90vh] flex flex-col overflow-hidden font-sans text-ink">
        {/* Header */}
        <div className="p-4 border-b-2 border-ink flex items-center justify-between bg-gold/10">
          <div>
            <h2 className="font-hand text-2xl md:text-3xl font-bold leading-tight">
              Semester-I Comprehensive Mock Test
            </h2>
            <p className="text-sm text-dim">
              20 questions spanning all 8 subjects · Strict LNJPIT Group A syllabus weighting
            </p>
          </div>
          <div className="flex items-center gap-4">
            {!isSubmitted && (
              <div
                className={`font-mono font-bold text-sm px-3 py-1 rounded border-[1.5px] ${
                  secondsRemaining < 300
                    ? 'border-accentRed text-accentRed bg-accentRed/10 animate-pulse'
                    : 'border-ink text-ink bg-paper'
                }`}
              >
                Time: {timeFormatted}
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-2xl font-bold text-dim hover:text-ink leading-none px-2"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {!isSubmitted ? (
            /* Active Test Interface */
            <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6">
              {/* Question card */}
              {currentQ && (
                <div className="p-4 md:p-6 bg-paper border-[1.5px] border-ink rounded-lg shadow-sketchy">
                  <div className="flex items-center justify-between pb-2 mb-4 border-b border-dashed border-ink/20">
                    <span className="text-xs font-mono font-bold text-accentRed uppercase">
                      Question {currentIdx + 1} of {questions.length} · {currentQ.subjectId.toUpperCase()} (U{currentQ.unitIndex + 1})
                    </span>
                    <span className="text-xs text-dim">
                      {currentQ.unitTitle}
                    </span>
                  </div>

                  <h3 className="font-medium text-base md:text-lg mb-6 leading-relaxed">
                    <KatexText htmlOrText={currentQ.question} />
                  </h3>

                  <div className="space-y-2.5">
                    {currentQ.options.map((opt, optIdx) => {
                      const optLetter = String.fromCharCode(65 + optIdx);
                      const isSelected = userAnswers[currentQ.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(currentQ.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg border-[1.5px] text-sm transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'border-ink bg-gold/25 font-bold shadow-xs'
                              : 'border-ink/30 hover:border-ink hover:bg-gold/10'
                          }`}
                        >
                          <span className="font-mono font-bold text-dim shrink-0">{optLetter}.</span>
                          <span className="flex-1">
                            <KatexText htmlOrText={opt} />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation bar below question */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-dashed border-ink/20">
                    <button
                      type="button"
                      disabled={currentIdx === 0}
                      onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                      className="px-3 py-1.5 border-[1.5px] border-ink rounded font-sans text-sm font-semibold disabled:opacity-40"
                    >
                      ← Previous
                    </button>
                    <span className="text-xs font-mono text-dim">
                      {answeredCount} of {questions.length} answered
                    </span>
                    <button
                      type="button"
                      disabled={currentIdx === questions.length - 1}
                      onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
                      className="px-3 py-1.5 border-[1.5px] border-ink rounded font-sans text-sm font-semibold disabled:opacity-40"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* Sidebar: Question palette */}
              <div className="p-4 bg-gold/5 border-[1.5px] border-ink rounded-lg flex flex-col justify-between">
                <div>
                  <h4 className="font-hand text-lg font-bold mb-3">Question Palette</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, idx) => {
                      const isAnswered = userAnswers[q.id] !== undefined;
                      const isCurrent = idx === currentIdx;
                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setCurrentIdx(idx)}
                          className={`h-9 rounded font-mono text-xs font-bold border transition-all ${
                            isCurrent
                              ? 'border-2 border-accentRed bg-accentRed text-paper'
                              : isAnswered
                              ? 'border-ink bg-ink text-paper'
                              : 'border-ink/40 bg-paper text-ink hover:border-ink'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed border-ink/30 mt-6 space-y-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-2.5 bg-accentRed text-paper font-bold rounded border-[1.5px] border-ink shadow-sketchy hover:opacity-90"
                  >
                    Submit Test ({answeredCount}/{questions.length})
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Results & Diagnostic Analysis */
            <div className="space-y-6">
              {/* Score header */}
              <div className="p-5 bg-paper border-2 border-ink rounded-lg shadow-sketchy flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accentRed font-mono">
                    Official Test Scorecard
                  </span>
                  <h3 className="font-hand text-3xl font-bold mt-1">
                    Your Score: {correctCount} / {questions.length} (
                    {Math.round((correctCount / questions.length) * 100)}%)
                  </h3>
                  <p className="text-sm text-dim mt-1 leading-relaxed">
                    {correctCount >= 16
                      ? 'Distinction level mastery! Ready for university end-semester examinations.'
                      : correctCount >= 10
                      ? 'Solid foundation. Focus revision on marked weak spots below.'
                      : 'Needs revision. Review high-yield notes and question traps.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuestions(getRandomMockQuestions(20));
                    setUserAnswers({});
                    setCurrentIdx(0);
                    setIsSubmitted(false);
                    setSecondsRemaining(25 * 60);
                  }}
                  className="px-4 py-2 bg-ink text-paper font-hand text-lg font-bold rounded border-[1.5px] border-ink hover:bg-ink/90"
                >
                  Take Another Mock Test
                </button>
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-4">
                <h4 className="font-hand text-2xl font-bold border-b border-dashed border-ink/30 pb-1">
                  Full Question Review & Marking Schemes
                </h4>
                {questions.map((q, idx) => {
                  const userChoice = userAnswers[q.id];
                  const isCorrect = userChoice === q.answer;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 bg-paper border-[1.5px] rounded-lg ${
                        isCorrect ? 'border-accentTeal/80 bg-accentTeal/5' : 'border-accentRed/80 bg-accentRed/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold font-mono uppercase text-dim">
                          Q{idx + 1} · {q.subjectId.toUpperCase()} · {q.unitTitle}
                        </span>
                        <span
                          className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                            isCorrect ? 'bg-accentTeal/20 text-accentTeal' : 'bg-accentRed/20 text-accentRed'
                          }`}
                        >
                          {isCorrect ? 'Correct' : userChoice === undefined ? 'Unattempted' : 'Incorrect'}
                        </span>
                      </div>

                      <p className="text-sm font-medium mb-3">
                        <KatexText htmlOrText={q.question} />
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt, optIdx) => {
                          const optLetter = String.fromCharCode(65 + optIdx);
                          const isAnswerKey = optIdx === q.answer;
                          const isChosen = optIdx === userChoice;
                          let style = 'border-ink/20 text-dim';
                          if (isAnswerKey) {
                            style = 'border-accentTeal bg-accentTeal/15 font-bold text-accentTeal';
                          } else if (isChosen && !isCorrect) {
                            style = 'border-accentRed bg-accentRed/15 text-accentRed line-through';
                          }
                          return (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded border-[1.5px] text-sm flex items-start gap-2 ${style}`}
                            >
                              <span className="font-mono font-bold">{optLetter}.</span>
                              <span>
                                <KatexText htmlOrText={opt} />
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-2.5 bg-paper/90 border-t border-dashed border-ink/30 text-sm font-sans text-ink leading-relaxed">
                        <span className="font-bold text-accentRed font-sans text-xs uppercase block mb-0.5">
                          Step-by-Step Rationale:
                        </span>
                        <KatexText htmlOrText={q.explanation} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
