'use client';

import React, { useState } from 'react';
import { Subject, QuizQuestion } from '@/types/syllabus';
import { getQuestionsForUnit } from '@/data/quizBank';
import { KatexText } from './KatexRenderer';

interface UnitQuizProps {
  subject: Subject;
  unitIndex: number;
  onLaunchMockTest: () => void;
  onRecordResult?: (questionId: string, isCorrect: boolean) => void;
}

export const UnitQuiz: React.FC<UnitQuizProps> = ({
  subject,
  unitIndex,
  onLaunchMockTest,
  onRecordResult,
}) => {
  const questions = getQuestionsForUnit(subject.id, unitIndex);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const handleSelect = (q: QuizQuestion, optIdx: number) => {
    if (selectedAnswers[q.id] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
    setShowExplanations((prev) => ({ ...prev, [q.id]: true }));
    const isCorrect = optIdx === q.answer;
    if (onRecordResult) {
      onRecordResult(q.id, isCorrect);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanations({});
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.answer ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-4 font-sans text-ink">
      <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-ink/20">
        <div>
          <h3 className="font-hand text-2xl font-bold leading-tight">
            Unit Concept Check · {subject.co} U{unitIndex + 1}
          </h3>
          <p className="text-xs text-dim">
            Curated syllabus diagnostic questions · {questions.length} questions
          </p>
        </div>
        <div className="flex items-center gap-2">
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={resetQuiz}
              className="text-xs px-2.5 py-1 border-[1.5px] border-ink rounded font-hand bg-paper hover:bg-gold/20"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={onLaunchMockTest}
            className="text-xs px-2.5 py-1 border-[1.5px] border-accentRed bg-accentRed text-paper rounded font-bold hover:opacity-90"
          >
            Mock Test (20Q)
          </button>
        </div>
      </div>

      {answeredCount > 0 && (
        <div className="p-3 bg-paper border-[1.5px] border-ink rounded-lg shadow-sketchy flex items-center justify-between">
          <span className="font-hand text-lg font-bold">
            Score: {correctCount} / {questions.length} ({Math.round((correctCount / questions.length) * 100)}%)
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-dim">
            {correctCount === questions.length ? 'Unit Mastered' : 'Review Explanations Below'}
          </span>
        </div>
      )}

      {questions.map((q, idx) => {
        const userChoice = selectedAnswers[q.id];
        const isAnswered = userChoice !== undefined;
        const isCorrect = isAnswered && userChoice === q.answer;

        return (
          <div
            key={q.id}
            className={`p-3.5 bg-paper border-[1.5px] rounded-lg transition-colors ${
              !isAnswered
                ? 'border-ink shadow-sketchy'
                : isCorrect
                ? 'border-accentTeal/80 bg-accentTeal/5'
                : 'border-accentRed/80 bg-accentRed/5'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-dim font-mono">
                Q{idx + 1}
              </span>
              {isAnswered && (
                <span
                  className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                    isCorrect ? 'bg-accentTeal/20 text-accentTeal' : 'bg-accentRed/20 text-accentRed'
                  }`}
                >
                  {isCorrect ? 'Correct' : 'Needs Review'}
                </span>
              )}
            </div>

            <p className="font-medium text-sm text-ink mb-3 leading-relaxed">
              <KatexText htmlOrText={q.question} />
            </p>

            <div className="space-y-1.5">
              {q.options.map((opt, optIdx) => {
                const optLetter = String.fromCharCode(65 + optIdx);
                let optStyle = 'border-ink/30 hover:border-ink hover:bg-gold/10';

                if (isAnswered) {
                  if (optIdx === q.answer) {
                    optStyle = 'border-accentTeal bg-accentTeal/15 font-bold text-accentTeal';
                  } else if (optIdx === userChoice) {
                    optStyle = 'border-accentRed bg-accentRed/15 text-accentRed line-through';
                  } else {
                    optStyle = 'border-ink/20 opacity-50';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelect(q, optIdx)}
                    className={`w-full text-left p-2 rounded border-[1.5px] text-xs transition-all flex items-start gap-2.5 ${optStyle}`}
                  >
                    <span className="font-mono font-bold text-dim shrink-0">{optLetter}.</span>
                    <span className="flex-1">
                      <KatexText htmlOrText={opt} />
                    </span>
                  </button>
                );
              })}
            </div>

            {showExplanations[q.id] && (
              <div className="mt-3 p-2.5 bg-paper border-t border-dashed border-ink/30 text-xs text-ink/90 font-hand leading-relaxed">
                <span className="font-bold text-accentRed block mb-0.5 uppercase tracking-wide font-sans text-[11px]">
                  Reasoning & Marking Scheme:
                </span>
                <KatexText htmlOrText={q.explanation} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
