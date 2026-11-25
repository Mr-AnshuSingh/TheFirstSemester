'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { CheckSquare, RotateCcw, Square } from 'lucide-react';
import { READINESS_PILLARS } from './midsemChapterMappings';
import { PILLARS_STORAGE_KEY } from './midsemTypes';

export const MidsemPillarScore: React.FC<{ activeSubjectCode: string }> = ({
  activeSubjectCode,
}) => {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PILLARS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          setChecks(parsed);
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(PILLARS_STORAGE_KEY, JSON.stringify(checks));
    } catch {
      // ignore storage errors
    }
  }, [checks, hydrated]);

  const maxWeight = useMemo(
    () => READINESS_PILLARS.reduce((acc, p) => acc + p.weight, 0),
    []
  );

  const earnedWeight = useMemo(
    () => READINESS_PILLARS.reduce((acc, p) => (checks[p.id] ? acc + p.weight : acc), 0),
    [checks]
  );

  const pct = Math.min(100, Math.round((earnedWeight / maxWeight) * 100));
  const projectedMarks = Math.round((earnedWeight / maxWeight) * 20);

  const corePillars = READINESS_PILLARS.filter((p) => p.scope === 'core');
  const subjectPillars = READINESS_PILLARS.filter((p) => p.scope === 'subject');

  return (
    <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 sm:p-6 shadow-sketch space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-hair pb-4">
        <div>
          <h2 className="midsem-heading text-3xl text-ink">15-Pillar Mid-Sem Marks Predictor</h2>
          <p className="midsem-meta text-dim mt-0.5">
            Check off each preparation pillar below. Note: existing pillar weights sum to {maxWeight} total points across core + subject-specific tasks (Needs Teacher Check).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="midsem-num text-4xl text-accentTeal">{projectedMarks} / 20 Marks</div>
            <div className="midsem-meta font-mono text-dim">
              {earnedWeight} / {maxWeight} weight pts ({pct}%)
            </div>
          </div>
          <button
            type="button"
            onClick={() => setChecks({})}
            className="midsem-tap px-3 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper3 midsem-meta font-bold text-ink inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="w-full h-4 bg-paper rounded-full border-2 border-ink overflow-hidden p-0.5">
        <div className="h-full bg-accentTeal rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>

      {/* Group 1: Core Pillars (All Subjects) */}
      <div className="space-y-2.5">
        <h3 className="midsem-meta font-mono uppercase font-bold text-accentRed">
          Core Exam Strategy Pillars (All Subjects)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {corePillars.map((p) => {
            const isChecked = Boolean(checks[p.id]);
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={isChecked}
                onClick={() => setChecks((prev) => ({ ...prev, [p.id]: !isChecked }))}
                className={`midsem-tap p-3.5 rounded-xl border-2 text-left transition-colors flex items-start gap-3 ${
                  isChecked
                    ? 'border-accentTeal bg-accentTeal/15 shadow-sketchy'
                    : 'border-ink/35 bg-paper hover:bg-paper3'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-accentTeal shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <Square className="w-5 h-5 text-dim shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div>
                  <div className={`midsem-meta font-bold ${isChecked ? 'text-ink' : 'text-ink/80'}`}>
                    {p.label}
                  </div>
                  <div className="midsem-badge font-mono text-dim">Weight: +{p.weight} pts</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Group 2: Subject-Specific Milestones */}
      <div className="space-y-2.5 pt-2 border-t border-hair">
        <h3 className="midsem-meta font-mono uppercase font-bold text-accentTeal">
          Subject-Specific Exam Milestones (Current Subject Highlighted)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {subjectPillars.map((p) => {
            const isChecked = Boolean(checks[p.id]);
            const matchesSubject = p.subjectCode && activeSubjectCode.includes(p.subjectCode);
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={isChecked}
                onClick={() => setChecks((prev) => ({ ...prev, [p.id]: !isChecked }))}
                className={`midsem-tap p-3.5 rounded-xl border-2 text-left transition-colors flex items-start gap-3 ${
                  isChecked
                    ? 'border-accentTeal bg-accentTeal/15 shadow-sketchy'
                    : matchesSubject
                    ? 'border-accentGold bg-accentGold/10 hover:bg-paper3'
                    : 'border-ink/35 bg-paper hover:bg-paper3'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-accentTeal shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <Square className="w-5 h-5 text-dim shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div>
                  <div className={`midsem-meta font-bold ${isChecked ? 'text-ink' : 'text-ink/80'}`}>
                    {p.label}
                  </div>
                  <div className="midsem-badge font-mono text-dim">
                    Weight: +{p.weight} pts {matchesSubject ? '· Current Subject' : ''}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
