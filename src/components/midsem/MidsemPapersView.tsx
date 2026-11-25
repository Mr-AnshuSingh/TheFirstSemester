'use client';

import React from 'react';
import { Award, FileText } from 'lucide-react';
import type { BeuPaper } from '@/data/midsemNotes';
import { MidsemMathText } from './MidsemKatexRenderer';

export const MidsemPapersView: React.FC<{ paper?: BeuPaper }> = ({ paper }) => {
  if (!paper) {
    return (
      <div className="border-2 border-dashed border-ink/40 bg-paper2 rounded-2xl p-8 text-center midsem-meta text-dim">
        No solved paper found for the selected subject.
      </div>
    );
  }

  return (
    <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 sm:p-6 shadow-sketch space-y-6">
      <div className="text-center border-b-2 border-ink pb-4 space-y-2">
        <div className="midsem-meta font-mono font-bold uppercase tracking-wider text-accentRed inline-flex items-center gap-1.5">
          <FileText className="w-4 h-4" aria-hidden="true" />
          <span>Bihar Engineering University, Patna · LNJPIT Chapra</span>
        </div>
        <h2 className="midsem-heading text-3xl sm:text-4xl text-ink">
          B.Tech 1st Semester Mid-Term Examination 2026
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 midsem-meta font-mono text-dim">
          <span><strong>Subject:</strong> {paper.subject} ({paper.code})</span>
          <span><strong>Branch:</strong> Mathematics &amp; Computing</span>
          <span><strong>Time:</strong> {paper.timeHours} Hours</span>
          <span><strong>Max Marks:</strong> {paper.fullMarks}</span>
        </div>
        <p className="midsem-body text-ink max-w-3xl mx-auto">
          <strong>Instructions: </strong>
          {paper.instructions}
        </p>
      </div>

      <div className="space-y-6">
        {paper.sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h3 className="midsem-meta font-mono font-bold text-accentTeal uppercase tracking-wider border-b-2 border-hair pb-1.5">
              {sec.name}
            </h3>
            {sec.questions.map((q) => (
              <div key={q.qNum} className="border-2 border-ink/40 bg-paper rounded-xl p-4 sm:p-5 shadow-sketchy space-y-3">
                <div className="flex flex-wrap items-center justify-between border-b border-hair pb-2 gap-2">
                  <span className="midsem-meta font-mono font-bold text-accentRed">
                    Question {q.qNum} {q.co ? `[${q.co}${q.bl ? ' · ' + q.bl : ''}]` : ''}
                  </span>
                  <span className="midsem-badge font-mono font-bold text-ink bg-paper3 px-2.5 py-0.5 rounded border border-ink/30">
                    {q.marks} Marks
                  </span>
                </div>

                <div className="midsem-body font-bold text-ink">
                  <MidsemMathText text={q.q} />
                </div>

                <div className="border-2 border-ink bg-paper3 p-4 rounded-xl space-y-1.5">
                  <div className="text-accentTeal font-mono uppercase midsem-meta font-bold flex items-center gap-1.5">
                    <Award className="w-4 h-4" aria-hidden="true" />
                    <span>Topper Model Solution</span>
                  </div>
                  <div className="midsem-body text-ink">
                    <MidsemMathText text={q.sol} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
