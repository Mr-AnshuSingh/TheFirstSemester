'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, FileText, Printer } from 'lucide-react';
import {
  QUICK_NOTES_MAP,
  type QuickNoteChapter,
  type QuickNoteUnit,
  type QuickSubjectId,
} from '@/data/notes';
import { MidsemQuickMarkdownRenderer } from './MidsemQuickNotesViewer';

const CODE_TO_QUICK_ID: Record<string, QuickSubjectId> = {
  '100102': 'maths',
  '100104': 'physics',
  '100111': 'beee',
  '100105': 'ai',
  '100108': 'cfet',
  '100109': 'uhv',
};

type PrintMode = 'none' | 'unit' | 'chapter' | 'subject';

export interface MidsemQuickNotesSectionProps {
  activeSubjectCode: string;
  activeUnitNo: number;
  jumpTarget?: string;
}

export const MidsemQuickNotesSection: React.FC<MidsemQuickNotesSectionProps> = ({
  activeSubjectCode,
  activeUnitNo,
  jumpTarget,
}) => {
  const quickId: QuickSubjectId = useMemo(() => {
    for (const [code, qid] of Object.entries(CODE_TO_QUICK_ID)) {
      if (activeSubjectCode.includes(code)) return qid;
    }
    return 'beee';
  }, [activeSubjectCode]);

  const subject = QUICK_NOTES_MAP[quickId];

  const [selectedUnitId, setSelectedUnitId] = useState<string>(subject.units[0].id);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [printMode, setPrintMode] = useState<PrintMode>('none');
  const [printChapterOverride, setPrintChapterOverride] = useState<string | null>(null);
  const [chapterPageBreaks, setChapterPageBreaks] = useState<boolean>(true);

  // Sync with unit bar when Units 1–3 or jumpTarget change
  useEffect(() => {
    if (jumpTarget && jumpTarget.includes('::')) {
      const [uId, chId] = jumpTarget.split('::');
      if (subject.units.some((u) => u.id === uId)) {
        setSelectedUnitId(uId);
        setSelectedChapterId(chId || 'all');
        requestAnimationFrame(() => {
          document.getElementById(chId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }
    if (activeUnitNo >= 1 && activeUnitNo <= 3) {
      const match = subject.units.find((u) => Number(u.unitNumber) === activeUnitNo);
      if (match) {
        setSelectedUnitId(match.id);
        setSelectedChapterId('all');
        return;
      }
    }
    if (activeUnitNo >= 4 && quickId === 'beee') {
      const hy = subject.units.find((u) => u.id === 'beee-high-yield');
      if (hy) {
        setSelectedUnitId(hy.id);
        setSelectedChapterId('all');
        return;
      }
    }
    if (!subject.units.some((u) => u.id === selectedUnitId)) {
      setSelectedUnitId(subject.units[0].id);
      setSelectedChapterId('all');
    }
  }, [subject, activeUnitNo, jumpTarget, quickId, selectedUnitId]);

  const activeUnit: QuickNoteUnit = useMemo(() => {
    return subject.units.find((u) => u.id === selectedUnitId) || subject.units[0];
  }, [subject, selectedUnitId]);

  useEffect(() => {
    const onAfterPrint = () => {
      setPrintMode('none');
      setPrintChapterOverride(null);
    };
    window.addEventListener('afterprint', onAfterPrint);
    return () => window.removeEventListener('afterprint', onAfterPrint);
  }, []);

  const triggerPrint = (mode: Exclude<PrintMode, 'none'>, chapterId?: string) => {
    setPrintMode(mode);
    setPrintChapterOverride(chapterId ?? null);
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.print();
      }, 60);
    });
  };

  const visibleChapters: QuickNoteChapter[] = useMemo(() => {
    if (selectedChapterId !== 'all') {
      return activeUnit.chapters.filter((c) => c.id === selectedChapterId);
    }
    return activeUnit.chapters;
  }, [activeUnit, selectedChapterId]);

  const printableUnits: { unit: QuickNoteUnit; chapters: QuickNoteChapter[] }[] = useMemo(() => {
    if (printMode === 'subject') {
      return subject.units.map((u) => ({ unit: u, chapters: u.chapters }));
    }
    if (printMode === 'chapter' && printChapterOverride) {
      const ch = activeUnit.chapters.find((c) => c.id === printChapterOverride);
      return [{ unit: activeUnit, chapters: ch ? [ch] : visibleChapters }];
    }
    if (printMode === 'unit') {
      return [{ unit: activeUnit, chapters: activeUnit.chapters }];
    }
    return [{ unit: activeUnit, chapters: visibleChapters }];
  }, [printMode, printChapterOverride, subject, activeUnit, visibleChapters]);

  return (
    <div className="space-y-5">
      {/* Handbook Unit & Chapter-Wise Print Controls */}
      <div className="midsem-noprint rounded-2xl border-2 border-ink bg-paper2 p-4 shadow-sketch space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hair pb-3">
          <div>
            <h2 className="midsem-heading text-2xl sm:text-3xl text-ink">
              {subject.shortLabel} Quick Study Handbook (Units 1–3)
            </h2>
            <p className="midsem-meta text-dim">
              Full derivations, tables, solved examples, flowcharts &amp; SVG diagrams with chapter-wise print support.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="midsem-tap inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-ink/40 bg-paper midsem-meta font-medium text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={chapterPageBreaks}
                onChange={(e) => setChapterPageBreaks(e.target.checked)}
                className="w-4 h-4 accent-accentTeal"
              />
              <span>New page per chapter</span>
            </label>
            <button
              type="button"
              onClick={() => triggerPrint('unit')}
              className="midsem-tap inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-ink bg-accentTeal text-paper midsem-meta font-bold shadow-sketchy"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>Print {activeUnit.pillLabel}</span>
            </button>
            <button
              type="button"
              onClick={() => triggerPrint('subject')}
              className="midsem-tap inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-ink bg-paper text-ink hover:bg-paper3 midsem-meta font-bold shadow-sketchy"
            >
              <FileText className="w-4 h-4 text-accentRed" aria-hidden="true" />
              <span>Print All {subject.shortLabel} Units</span>
            </button>
          </div>
        </div>

        {/* Handbook Unit Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="midsem-badge font-mono uppercase tracking-wider text-dim font-bold mr-1">
            Handbook Unit:
          </span>
          {subject.units.map((u) => {
            const active = u.id === activeUnit.id;
            return (
              <button
                key={u.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setSelectedUnitId(u.id);
                  setSelectedChapterId('all');
                }}
                className={`midsem-tap px-3.5 py-1.5 rounded-xl border-2 midsem-meta font-bold transition-colors ${
                  active
                    ? 'border-ink bg-ink text-paper shadow-sketchy'
                    : 'border-ink/40 bg-paper text-ink hover:bg-paper3'
                }`}
              >
                {u.pillLabel}
              </button>
            );
          })}
        </div>

        {/* Chapter Jump / Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-hair/60">
          <span className="midsem-badge font-mono uppercase tracking-wider text-dim font-bold mr-1 inline-flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-accentRed" aria-hidden="true" /> Chapters:
          </span>
          <button
            type="button"
            aria-pressed={selectedChapterId === 'all'}
            onClick={() => setSelectedChapterId('all')}
            className={`midsem-tap px-3 py-1.5 rounded-lg border-2 midsem-meta font-bold ${
              selectedChapterId === 'all'
                ? 'border-ink bg-accentRed text-paper'
                : 'border-ink/30 bg-paper text-ink hover:bg-paper3'
            }`}
          >
            All ({activeUnit.chapters.length})
          </button>
          {activeUnit.chapters.map((ch) => {
            const active = selectedChapterId === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedChapterId(active ? 'all' : ch.id)}
                className={`midsem-tap px-3 py-1.5 rounded-lg border-2 midsem-meta font-medium ${
                  active
                    ? 'border-ink bg-accentTeal text-paper font-bold'
                    : 'border-ink/30 bg-paper text-ink hover:bg-paper3'
                }`}
              >
                {ch.number}. {ch.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Printable Chapters Canvas */}
      <div id="quick-notes-printable" className="space-y-6">
        {printableUnits.map(({ unit, chapters }, uIdx) => (
          <article
            key={unit.id}
            className={`space-y-5 ${uIdx > 0 && printMode === 'subject' ? 'midsem-print-break' : ''}`}
          >
            <header className="midsem-avoid-break rounded-xl border-2 border-ink bg-paper p-5 shadow-sketch">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="midsem-badge font-mono uppercase tracking-wider font-bold text-accentRed">
                  {unit.subjectName} ({unit.subjectCode}) · Unit {unit.unitNumber}
                </span>
                <span className="midsem-badge font-mono font-bold px-2.5 py-0.5 rounded-full border border-ink/30 bg-paper2 text-dim">
                  {chapters.length} {chapters.length === 1 ? 'Chapter' : 'Chapters'}
                </span>
              </div>
              <h2 className="midsem-heading text-3xl sm:text-4xl text-ink leading-tight">
                {unit.standardTitle.replace(/^#\s*/, '')}
              </h2>
              <p className="midsem-meta text-dim mt-2">{unit.summary}</p>
            </header>

            {chapters.map((chapter, cIdx) => {
              const addBreak =
                cIdx > 0 && chapterPageBreaks && (printMode === 'unit' || printMode === 'subject');
              return (
                <div
                  key={chapter.id}
                  id={chapter.id}
                  className={`print-chapter-card rounded-xl border-2 border-ink bg-paper p-5 sm:p-6 shadow-sketch ${
                    addBreak ? 'midsem-print-break' : ''
                  }`}
                >
                  <MidsemQuickMarkdownRenderer
                    markdown={chapter.markdown}
                    chapterLabel={`Ch. ${chapter.number}: ${chapter.title}`}
                    onChapterPrint={() => triggerPrint('chapter', chapter.id)}
                  />
                </div>
              );
            })}
          </article>
        ))}
      </div>
    </div>
  );
};
