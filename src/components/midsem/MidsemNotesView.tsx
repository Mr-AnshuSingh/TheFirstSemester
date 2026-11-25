'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  FileSpreadsheet,
  Filter,
  HelpCircle,
  Lightbulb,
  Printer,
  Sparkles,
  X,
} from 'lucide-react';
import type { MidsemCourse, MidsemUnit } from '@/data/midsemNotes';
import type { ExamSitting } from '@/data/midsemTimetable';
import { MidsemMathText } from './MidsemKatexRenderer';
import { MidsemQuickNotesSection } from './MidsemQuickNotesSection';
import { getDisplaySubjectShort } from './midsemTypes';

export interface MidsemNotesViewProps {
  course: MidsemCourse;
  units: MidsemUnit[];
  activeUnitNo: number;
  sitting?: ExamSitting;
  subView: 'cards' | 'handbook';
  onChangeSubView: (view: 'cards' | 'handbook') => void;
  focusAnchor?: string;
}

/**
 * Classify priority high-yield topics within a unit (capping stars so every
 * multi-topic unit retains Core Topics for the "★ High yield only" filter).
 */
function getUnitStarSet(unit: MidsemUnit, sitting?: ExamSitting): Set<number> {
  const total = unit.topics.length;
  if (total <= 1) return new Set([0]);
  const maxStars = Math.max(1, total - 1);
  const scored = unit.topics.map((top, idx) => {
    let score = idx === 0 ? 10 : 0;
    if (sitting?.keyFocus) {
      const kw = sitting.keyFocus
        .toLowerCase()
        .split(/[,()]+/)
        .map((s) => s.trim())
        .filter((w) => w.length >= 4);
      const h = top.heading.toLowerCase();
      if (kw.some((w) => h.includes(w) || w.split(/\s+/).some((tok) => tok.length >= 4 && h.includes(tok)))) {
        score += 5;
      }
    }
    if (top.keyFormula && top.keyFormula.length > 45) score += 2;
    return { idx, score };
  });
  scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
  return new Set(scored.slice(0, maxStars).map((s) => s.idx));
}

export const MidsemNotesView: React.FC<MidsemNotesViewProps> = ({
  course,
  units,
  activeUnitNo,
  sitting,
  subView,
  onChangeSubView,
  focusAnchor,
}) => {
  const shortName = getDisplaySubjectShort(course.code, course.short);
  const [highYieldOnly, setHighYieldOnly] = useState<boolean>(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Collapsible topic state: first topic of each displayed unit open by default
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const next: Record<string, boolean> = {};
    units.forEach((u) => {
      u.topics.forEach((_, tIdx) => {
        const key = `topic-${course.code}-u${u.unitNo}-${tIdx}`;
        next[key] = tIdx === 0 || focusAnchor === key;
      });
    });
    setOpenMap(next);
    if (focusAnchor && !focusAnchor.includes('::')) {
      requestAnimationFrame(() => {
        document.getElementById(focusAnchor)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }, [course.code, units, focusAnchor]);

  const toggleTopic = (key: string) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyFormula = async (key: string, formulaText: string) => {
    try {
      await navigator.clipboard.writeText(formulaText);
      setCopiedId(key);
      setTimeout(() => setCopiedId((cur) => (cur === key ? null : cur)), 2000);
    } catch {
      // Fallback copy unavailable in headless/insecure context
    }
  };

  const topicOutline = useMemo(() => {
    const items: { id: string; unitNo: number; heading: string; starred: boolean }[] = [];
    for (const u of units) {
      const starSet = getUnitStarSet(u, sitting);
      u.topics.forEach((top, tIdx) => {
        const starred = starSet.has(tIdx);
        if (highYieldOnly && !starred) return;
        items.push({
          id: `topic-${course.code}-u${u.unitNo}-${tIdx}`,
          unitNo: u.unitNo,
          heading: top.heading,
          starred,
        });
      });
    }
    return items;
  }, [units, course.code, sitting, highYieldOnly]);

  return (
    <div className="space-y-5">
      {/* Study Mode Action Strip */}
      <div className="midsem-noprint rounded-2xl border-2 border-ink bg-paper2 p-3.5 sm:p-4 shadow-sketch flex flex-wrap items-center justify-between gap-3">
        {/* Sub-view Switcher: Interactive Formula Cards vs Detailed Units 1-3 Handbook */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Notes format">
          <button
            type="button"
            aria-pressed={subView === 'cards'}
            onClick={() => onChangeSubView('cards')}
            className={`midsem-tap px-3.5 py-2 rounded-xl border-2 midsem-meta font-bold inline-flex items-center gap-2 transition-colors ${
              subView === 'cards'
                ? 'border-ink bg-ink text-paper shadow-sketchy'
                : 'border-ink/40 bg-paper text-ink hover:bg-paper3'
            }`}
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Topic Cards &amp; Formulas</span>
          </button>
          <button
            type="button"
            aria-pressed={subView === 'handbook'}
            onClick={() => onChangeSubView('handbook')}
            className={`midsem-tap px-3.5 py-2 rounded-xl border-2 midsem-meta font-bold inline-flex items-center gap-2 transition-colors ${
              subView === 'handbook'
                ? 'border-ink bg-ink text-paper shadow-sketchy'
                : 'border-ink/40 bg-paper text-ink hover:bg-paper3'
            }`}
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Units 1–3 Quick Handbook</span>
          </button>
        </div>

        {/* High Yield Filter & Per-Subject Cheat Sheet */}
        <div className="flex flex-wrap items-center gap-2">
          {subView === 'cards' && (
            <button
              type="button"
              aria-pressed={highYieldOnly}
              onClick={() => setHighYieldOnly((v) => !v)}
              className={`midsem-tap px-3.5 py-2 rounded-xl border-2 midsem-meta font-bold inline-flex items-center gap-1.5 transition-colors ${
                highYieldOnly
                  ? 'border-ink bg-accentRed text-paper shadow-sketchy'
                  : 'border-ink/40 bg-paper text-ink hover:bg-paper3'
              }`}
            >
              <Filter className="w-4 h-4" aria-hidden="true" />
              <span>★ High yield only</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setCheatSheetOpen(true)}
            className="midsem-tap px-3.5 py-2 rounded-xl border-2 border-ink bg-accentGold text-paper midsem-meta font-bold shadow-sketchy hover:opacity-95 inline-flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4" aria-hidden="true" />
            <span>{shortName} Cheat Sheet</span>
          </button>
        </div>
      </div>

      {/* Sub-view 1: Detailed Clean Units 1–3 Handbook */}
      {subView === 'handbook' ? (
        <MidsemQuickNotesSection
          activeSubjectCode={course.code}
          activeUnitNo={activeUnitNo}
          jumpTarget={focusAnchor}
        />
      ) : (
        /* Sub-view 2: Collapsible Topic Cards + Sticky Desktop Outline */
        <div className={`grid grid-cols-1 ${topicOutline.length > 0 ? 'lg:grid-cols-[minmax(0,1fr)_260px]' : ''} gap-6 items-start`}>
          <div className="space-y-6 min-w-0">
            {units.map((unit) => {
              const starSet = getUnitStarSet(unit, sitting);
              const filteredTopics = unit.topics
                .map((top, tIdx) => ({
                  top,
                  tIdx,
                  key: `topic-${course.code}-u${unit.unitNo}-${tIdx}`,
                  starred: starSet.has(tIdx),
                }))
                .filter((item) => !highYieldOnly || item.starred);

              return (
                <section
                  key={unit.unitNo}
                  aria-label={`Unit ${unit.unitNo}: ${unit.title}`}
                  className="border-2 border-ink bg-paper2 rounded-2xl p-4 sm:p-6 shadow-sketch"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-hair pb-3 mb-3">
                    <div>
                      <span className="midsem-badge font-mono uppercase tracking-wider text-accentRed font-bold block">
                        Unit {unit.unitNo} · {shortName}
                      </span>
                      <h2 className="midsem-heading text-3xl text-ink mt-0.5">
                        {unit.title}
                      </h2>
                    </div>
                    <span className="midsem-badge font-mono font-bold text-accentTeal bg-accentTeal/10 px-3 py-1 rounded-full border border-accentTeal/40">
                      {filteredTopics.length} Topics
                    </span>
                  </div>

                  {/* Summary (no italic reading text!) */}
                  <p className="midsem-body text-ink/90 mb-5">{unit.summary}</p>

                  {/* Collapsible Topic Cards */}
                  <div className="space-y-4">
                    {filteredTopics.map(({ top, tIdx, key, starred }) => {
                      const isOpen = Boolean(openMap[key]);
                      return (
                        <div
                          key={key}
                          id={key}
                          className="border-2 border-ink/50 bg-paper rounded-xl shadow-sketchy overflow-hidden"
                        >
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => toggleTopic(key)}
                            className="midsem-tap w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-paper3/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-8 h-8 rounded-full border-2 border-ink bg-accentGold/25 text-ink midsem-num text-xl inline-flex items-center justify-center shrink-0">
                                {tIdx + 1}
                              </span>
                              <h3 className="font-sans font-bold text-base sm:text-lg text-ink">
                                {top.heading}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {starred ? (
                                <span className="midsem-badge px-2.5 py-0.5 rounded-full border border-accentRed bg-accentRed/10 text-accentRed font-mono font-bold">
                                  ★ High Yield
                                </span>
                              ) : (
                                <span className="midsem-badge px-2.5 py-0.5 rounded-full border border-ink/30 bg-paper2 text-dim font-mono font-bold">
                                  Core Topic
                                </span>
                              )}
                              {isOpen ? (
                                <ChevronDown className="w-5 h-5 text-ink" aria-hidden="true" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-dim" aria-hidden="true" />
                              )}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-4 pb-4 pt-1 border-t border-hair/60 space-y-4">
                              <div className="midsem-body text-ink">
                                <MidsemMathText text={top.plainExplanation} />
                              </div>

                              {/* Clearly Boxed Formula Sheet with Copy Button */}
                              {top.keyFormula && (
                                <div className="p-3.5 rounded-xl border-2 border-ink bg-paper3 space-y-2">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="midsem-meta font-mono uppercase tracking-wider text-accentTeal font-bold inline-flex items-center gap-1.5">
                                      <Sparkles className="w-4 h-4" aria-hidden="true" /> High-Yield Formula Sheet
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyFormula(key, top.keyFormula || '')}
                                      className="midsem-tap inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 border-ink bg-paper hover:bg-paper2 midsem-meta font-bold text-ink"
                                    >
                                      {copiedId === key ? (
                                        <>
                                          <Check className="w-4 h-4 text-accentTeal" aria-hidden="true" />
                                          <span>Copied</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-4 h-4 text-ink" aria-hidden="true" />
                                          <span>Copy formulas</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <div className="midsem-body text-ink bg-paper p-3 rounded-lg border border-ink/40 overflow-x-auto">
                                    <MidsemMathText text={top.keyFormula} />
                                  </div>
                                </div>
                              )}

                              {/* Compact Non-Italic Topper Tip Callout */}
                              {top.examTip && (
                                <div className="p-3 rounded-xl border-l-4 border-accentGold bg-accentGold/10 text-ink midsem-meta flex items-start gap-2">
                                  <Lightbulb className="w-4 h-4 text-accentGold shrink-0 mt-0.5" aria-hidden="true" />
                                  <div>
                                    <strong className="font-bold text-ink">Topper Tip: </strong>
                                    <span>{top.examTip}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Unit Solved Numericals */}
                  {unit.standardProblems && unit.standardProblems.length > 0 && (
                    <div className="mt-6 pt-5 border-t-2 border-hair space-y-3">
                      <h3 className="midsem-heading text-2xl sm:text-3xl text-ink flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-accentRed shrink-0" aria-hidden="true" />
                        Unit {unit.unitNo} Standard Exam Numericals &amp; Solutions
                      </h3>
                      <div className="space-y-3">
                        {unit.standardProblems.map((prob, pIdx) => (
                          <div key={pIdx} className="border-2 border-ink/40 bg-paper rounded-xl p-4 space-y-3">
                            <div className="midsem-body font-bold text-ink">
                              Q{pIdx + 1}: <MidsemMathText text={prob.q} />
                            </div>
                            <div className="p-3.5 bg-paper3 rounded-lg border border-ink/30 midsem-body text-ink">
                              <strong className="text-accentTeal font-mono midsem-meta uppercase block mb-1">
                                Standard Solution:
                              </strong>
                              <MidsemMathText text={prob.solution} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Sticky Desktop "Jump to Topic" Sidebar */}
          {topicOutline.length > 0 && (
            <aside
              aria-label="Jump to topic"
              className="midsem-noprint hidden lg:block sticky top-[148px] rounded-2xl border-2 border-ink bg-paper2 p-4 shadow-sketch space-y-2 max-h-[calc(100vh-170px)] overflow-y-auto"
            >
              <div className="midsem-meta font-mono uppercase tracking-wider font-bold text-accentRed border-b border-hair pb-2">
                Jump to topic
              </div>
              <nav className="space-y-1">
                {topicOutline.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setOpenMap((prev) => ({ ...prev, [item.id]: true }));
                      requestAnimationFrame(() => {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      });
                    }}
                    className="midsem-tap w-full text-left px-2.5 py-2 rounded-lg hover:bg-paper3 transition-colors midsem-meta text-ink flex items-start gap-2"
                  >
                    <span className="midsem-badge font-mono font-bold text-accentTeal shrink-0 mt-0.5">
                      U{item.unitNo}
                    </span>
                    <span className="leading-snug">
                      {item.starred ? '★ ' : ''}
                      {item.heading}
                    </span>
                  </button>
                ))}
              </nav>
            </aside>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* PER-SUBJECT PRINTABLE FORMULA CHEAT SHEET (One Page Per Unit)         */}
      {/* ===================================================================== */}
      {cheatSheetOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-3 sm:p-6 print:static print:bg-white print:p-0"
          role="dialog"
          aria-modal="true"
          aria-label={`${shortName} Formula Cheat Sheet`}
          onClick={() => setCheatSheetOpen(false)}
        >
          <div
            className="bg-paper rounded-2xl border-2 border-ink max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-7 space-y-6 print:max-h-none print:max-w-none print:border-0 print:shadow-none print:rounded-none print:p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="midsem-noprint flex flex-wrap items-center justify-between gap-3 border-b-2 border-hair pb-4 sticky top-0 bg-paper z-10">
              <div>
                <span className="midsem-badge font-mono uppercase tracking-wider text-accentRed font-bold">
                  Printable Formula Cheat Sheet
                </span>
                <h2 className="midsem-heading text-3xl text-ink">
                  {shortName} ({course.code}) — All Units Formulas
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="midsem-tap px-4 py-2 rounded-xl border-2 border-ink bg-accentTeal text-paper midsem-meta font-bold shadow-sketchy inline-flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCheatSheetOpen(false)}
                  aria-label="Close cheat sheet"
                  className="midsem-tap p-2 rounded-xl border-2 border-ink bg-paper2 hover:bg-paper3 text-ink inline-flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {course.units.map((u) => (
              <section
                key={u.unitNo}
                className="cheat-sheet-unit midsem-print-break rounded-xl border-2 border-ink bg-paper p-5 space-y-4"
              >
                <div className="border-b-2 border-ink pb-2 flex items-baseline justify-between gap-2">
                  <div>
                    <span className="midsem-meta font-mono uppercase font-bold text-accentRed">
                      {shortName} ({course.code}) · Unit {u.unitNo}
                    </span>
                    <h3 className="midsem-heading text-3xl text-ink">{u.title}</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {u.topics
                    .filter((t) => Boolean(t.keyFormula))
                    .map((t, idx) => (
                      <div key={idx} className="midsem-avoid-break rounded-lg border border-ink/40 bg-paper2 p-3.5">
                        <div className="font-bold text-ink midsem-body mb-1.5">
                          {idx + 1}. {t.heading}
                        </div>
                        <div className="midsem-body bg-paper p-2.5 rounded border border-ink/25 overflow-x-auto">
                          <MidsemMathText text={t.keyFormula} />
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
