'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Compass,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Maximize2,
  PenTool,
  X,
} from 'lucide-react';
import type { MidsemPracticeItem } from '@/data/midsemPracticeQues';
import type { MidsemDiagram } from '@/data/midsemDiagrams';
import type { ChapterMapping } from './midsemChapterMappings';
import { MidsemMathText } from './MidsemKatexRenderer';

export const MidsemPracticeQuestionsView: React.FC<{
  subjectShort: string;
  items: MidsemPracticeItem[];
  highlightId?: string;
}> = ({ subjectShort, items, highlightId }) => (
  <div className="space-y-6">
    <div className="border-2 border-ink bg-paper2 rounded-2xl p-4 sm:p-5 shadow-sketch flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="midsem-heading text-3xl text-ink">
          {subjectShort} Solved Practice Questions ({items.length})
        </h2>
        <p className="midsem-meta text-dim mt-0.5">
          Full step-by-step topper solutions covering derivations, numericals, 2&apos;s complements, K-Maps, and proofs.
        </p>
      </div>
      <span className="midsem-badge font-mono font-bold text-accentTeal px-3 py-1 bg-accentTeal/10 rounded-full border border-accentTeal/30">
        4 Marks Each
      </span>
    </div>

    {items.length === 0 ? (
      <div className="border-2 border-dashed border-ink/40 bg-paper2 rounded-xl p-8 text-center midsem-meta text-dim">
        No solved practice questions found for this unit filter.
      </div>
    ) : (
      items.map((p, idx) => (
        <article
          key={p.id}
          id={p.id}
          className={`border-2 rounded-2xl p-5 shadow-sketch transition-colors ${
            highlightId === p.id ? 'border-accentTeal bg-paper' : 'border-ink bg-paper2'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-hair pb-2.5 mb-3">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg border-2 border-ink bg-accentTeal text-paper midsem-num text-xl inline-flex items-center justify-center shrink-0">
                Q{idx + 1}
              </span>
              <div>
                <span className="midsem-badge font-mono font-bold text-accentRed uppercase block">
                  Unit {p.unitNo} · {p.category}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-ink">{p.title}</h3>
              </div>
            </div>
            <span className="midsem-badge font-mono font-bold text-ink bg-paper3 px-2.5 py-1 rounded border border-ink/40">
              {p.marks} Marks
            </span>
          </div>

          <div className="border-2 border-ink/30 bg-paper p-4 rounded-xl midsem-body text-ink mb-4">
            <MidsemMathText text={p.question} />
          </div>

          <div className="border-2 border-ink bg-paper3 p-4 rounded-xl">
            <div className="midsem-meta font-mono font-bold uppercase tracking-wider text-accentTeal mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Official Step-by-Step Topper Solution
            </div>
            <div className="midsem-body text-ink">
              <MidsemMathText text={p.stepByStepSolution} />
            </div>
          </div>
        </article>
      ))
    )}
  </div>
);

export const MidsemDiagramsView: React.FC<{
  subjectShort: string;
  activeUnitNo: number;
  diagrams: MidsemDiagram[];
}> = ({ subjectShort, activeUnitNo, diagrams }) => {
  const [globalHideLabels, setGlobalHideLabels] = useState(false);
  const [hideLabels, setHideLabels] = useState<Record<string, boolean>>({});
  const [modalDiagram, setModalDiagram] = useState<MidsemDiagram | null>(null);
  const [fullWidthLayout, setFullWidthLayout] = useState(true);

  return (
    <div className="space-y-6">
      <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 shadow-sketch flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg border-2 border-ink bg-accentTeal/15 text-ink inline-flex items-center justify-center">
              <ImageIcon className="w-5 h-5" aria-hidden="true" />
            </span>
            <h2 className="midsem-heading text-3xl text-ink">
              {subjectShort} Hand-Drawn Exam Schematics ({diagrams.length})
            </h2>
          </div>
          <p className="midsem-meta text-dim mt-1">
            Master compulsory 4-mark pencil diagrams. Toggle labels to test active recall before entering the exam hall.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={fullWidthLayout}
            onClick={() => setFullWidthLayout((v) => !v)}
            className="midsem-tap px-3.5 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper3 midsem-meta font-bold text-ink inline-flex items-center gap-1.5 transition-colors"
          >
            <Maximize2 className="w-4 h-4 text-accentTeal" aria-hidden="true" />
            <span>{fullWidthLayout ? 'Layout: Full Width' : 'Layout: 2-Column'}</span>
          </button>
          <button
            type="button"
            aria-pressed={globalHideLabels}
            onClick={() => setGlobalHideLabels((v) => !v)}
            className={`midsem-tap px-3.5 py-2 rounded-xl border-2 midsem-meta font-bold inline-flex items-center gap-2 transition-colors ${
              globalHideLabels
                ? 'border-accentRed bg-accentRed text-paper shadow-sketchy'
                : 'border-ink bg-paper text-ink hover:bg-paper3'
            }`}
          >
            {globalHideLabels ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
            <span>{globalHideLabels ? 'Labels Hidden (Testing Recall)' : 'Hide All Labels'}</span>
          </button>
          <span className="midsem-badge font-mono bg-paper px-3 py-1.5 rounded-lg border border-ink/40 font-bold text-accentTeal">
            Unit {activeUnitNo === 0 ? 'All' : activeUnitNo}
          </span>
        </div>
      </div>

      {diagrams.length === 0 ? (
        <div className="border-2 border-dashed border-ink/40 bg-paper2 rounded-xl p-8 text-center text-dim midsem-meta">
          No schematics found for this unit filter. Try selecting &ldquo;All&rdquo; units.
        </div>
      ) : (
        <div className={fullWidthLayout ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-1 lg:grid-cols-2 gap-6'}>
          {diagrams.map((d) => {
            const isLabelHidden = globalHideLabels || hideLabels[d.id] || false;
            return (
              <div
                key={d.id}
                className="border-2 border-ink bg-paper2 rounded-2xl p-5 shadow-sketch flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b-2 border-hair pb-2">
                    <div>
                      <span className="midsem-badge font-mono uppercase tracking-wider text-accentRed font-bold block">
                        Unit {d.unitNo} · {subjectShort}
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-ink mt-0.5">{d.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setModalDiagram(d)}
                      aria-label={`Zoom ${d.title}`}
                      className="midsem-tap p-2 rounded-xl border-2 border-ink bg-paper hover:bg-paper3 text-ink inline-flex items-center justify-center"
                    >
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div
                    className={`relative border-2 border-ink rounded-xl bg-paper overflow-hidden p-2 sm:p-3 shadow-inner ${
                      isLabelHidden ? '[&_text]:opacity-0 hover:[&_text]:opacity-100' : ''
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: d.svg }}
                      className="w-full [&_svg]:w-full [&_svg]:h-auto flex items-center justify-center select-none"
                    />
                    {isLabelHidden && (
                      <div className="midsem-badge absolute top-3 right-3 font-mono font-bold bg-accentRed text-paper px-2.5 py-0.5 rounded shadow">
                        Hover to reveal labels
                      </div>
                    )}
                  </div>

                  <p className="midsem-body text-ink/90">
                    <strong>Principle &amp; Analysis: </strong>
                    {d.caption}
                  </p>

                  <div className="p-3.5 rounded-xl border border-ink/30 bg-paper3 midsem-meta">
                    <div className="text-accentTeal font-mono font-bold uppercase mb-1 flex items-center gap-1.5">
                      <PenTool className="w-4 h-4" aria-hidden="true" /> 3-Minute Exam Sketching Technique
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-ink">
                      <li>Always sketch with sharp 2B pencil; write axis labels &amp; values in neat ink.</li>
                      <li>Mark coordinates, direction arrows, and cutoff boundaries before shading.</li>
                      <li>State the governing formula alongside the sketch to guarantee full 4 marks.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-hair flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    aria-pressed={isLabelHidden}
                    onClick={() => setHideLabels((prev) => ({ ...prev, [d.id]: !isLabelHidden }))}
                    className="midsem-tap px-3.5 py-2 rounded-xl border-2 border-ink/40 bg-paper midsem-meta font-bold text-ink hover:bg-paper3 inline-flex items-center gap-1.5"
                  >
                    {isLabelHidden ? (
                      <Eye className="w-4 h-4 text-accentTeal" aria-hidden="true" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-accentRed" aria-hidden="true" />
                    )}
                    <span>{isLabelHidden ? 'Show Labels' : 'Hide Labels'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalDiagram(d)}
                    className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-accentTeal text-paper midsem-meta font-bold shadow-sketchy inline-flex items-center gap-1.5"
                  >
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    <span>Full Size</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalDiagram && (
        <div
          className="fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={modalDiagram.title}
          onClick={() => setModalDiagram(null)}
        >
          <div
            className="border-2 border-ink bg-paper rounded-2xl max-w-7xl w-[96vw] p-4 sm:p-6 shadow-2xl max-h-[94vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-hair pb-3">
              <div>
                <span className="midsem-badge font-mono uppercase text-accentRed font-bold block">
                  Unit {modalDiagram.unitNo} · {subjectShort}
                </span>
                <h3 className="midsem-heading text-3xl text-ink">{modalDiagram.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalDiagram(null)}
                aria-label="Close diagram preview"
                className="midsem-tap p-2 rounded-xl border-2 border-ink bg-paper2 hover:bg-paper3 text-ink inline-flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="border-2 border-ink rounded-xl bg-paper2 p-3 sm:p-5 flex items-center justify-center overflow-x-auto">
              <div dangerouslySetInnerHTML={{ __html: modalDiagram.svg }} className="w-full [&_svg]:w-full [&_svg]:h-auto select-none" />
            </div>
            <div className="p-4 rounded-xl border-2 border-ink bg-paper3 midsem-body space-y-2">
              <p><strong>Technical Analysis: </strong>{modalDiagram.caption}</p>
              <p className="text-dim midsem-meta">
                <strong>BEU Exam Scoring Advice: </strong>
                Use sharp pencil for circuits &amp; curves, write all labels horizontally in neat script, and always write the governing formula directly beneath the diagram to score full 4/4 marks.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const MidsemChaptersView: React.FC<{
  subjectShort: string;
  mappings: ChapterMapping[];
}> = ({ subjectShort, mappings }) => (
  <div className="space-y-6">
    <div className="border-2 border-ink bg-paper2 rounded-2xl p-4 sm:p-5 shadow-sketch flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <h2 className="midsem-heading text-3xl text-ink flex items-center gap-2">
          <Compass className="w-6 h-6 text-accentTeal" aria-hidden="true" />
          {subjectShort} Chapter &amp; Topic Syllabus Breakdown
        </h2>
        <p className="midsem-meta text-dim mt-0.5">
          Detailed mapping of every exam concept, derivation, and numerical to its exact Unit and Chapter.
        </p>
      </div>
      <span className="midsem-badge font-mono bg-paper px-3 py-1.5 rounded-lg border border-ink/40 font-bold text-accentTeal">
        {mappings.length} Units Mapped
      </span>
    </div>

    {mappings.map((mapItem) => (
      <div key={mapItem.unitNo} className="border-2 border-ink bg-paper2 rounded-2xl p-5 shadow-sketch space-y-4">
        <div className="border-b-2 border-hair pb-2.5 flex items-center justify-between gap-2">
          <div>
            <span className="midsem-badge font-mono uppercase tracking-wider text-accentRed font-bold block">
              Unit {mapItem.unitNo}
            </span>
            <h3 className="midsem-heading text-3xl text-ink">{mapItem.unitTitle}</h3>
          </div>
          <span className="midsem-badge font-mono font-bold text-dim bg-paper3 px-2.5 py-1 rounded-md border border-ink/30">
            {mapItem.chapters.length} Chapters
          </span>
        </div>

        <div className="space-y-4">
          {mapItem.chapters.map((ch) => (
            <div key={ch.chapterNo} className="border-2 border-ink/40 bg-paper rounded-xl p-4 shadow-sketchy space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hair pb-2">
                <h4 className="font-bold text-base sm:text-lg text-ink flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md border border-ink bg-accentTeal text-paper midsem-num text-xl">
                    Ch {ch.chapterNo}
                  </span>
                  <span>{ch.title}</span>
                </h4>
                <span className="midsem-badge font-mono font-bold text-accentRed bg-accentRed/10 px-2.5 py-1 rounded border border-accentRed/30">
                  {ch.weightage}
                </span>
              </div>

              <div>
                <div className="midsem-badge font-mono uppercase text-dim font-bold mb-1.5">
                  Syllabus Concepts &amp; Derivations:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ch.topics.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-md border border-ink/30 bg-paper3 midsem-meta text-ink font-medium"
                    >
                      • {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-ink/30 bg-paper2 midsem-meta text-ink">
                <strong>Exam Preparation Strategy: </strong>
                {ch.examTips}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
