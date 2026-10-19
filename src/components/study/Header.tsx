'use client';

import React from 'react';
import { Subject } from '@/types/syllabus';

interface HeaderProps {
  subjects: Subject[];
  activeSubjectIndex: number;
  subjectDoneCount: (idx: number) => number;
  totalClearedAll: number;
  totalTopicsAll: number;
  onSelectSubject: (idx: number) => void;
  onOpenNotesModal: () => void;
  onOpenPlanModal: () => void;
  onOpenCommandPalette: () => void;
  onOpenFlashcards: () => void;
  onOpenMockTest: () => void;
  onOpenFormulaSheet: () => void;
  onOpenBackupModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  subjects,
  activeSubjectIndex,
  subjectDoneCount,
  totalClearedAll,
  totalTopicsAll,
  onSelectSubject,
  onOpenNotesModal,
  onOpenPlanModal,
  onOpenCommandPalette,
  onOpenFlashcards,
  onOpenMockTest,
  onOpenFormulaSheet,
  onOpenBackupModal,
}) => {
  const pct = totalTopicsAll ? (totalClearedAll / totalTopicsAll) * 100 : 0;
  return (
    <header id="hd" className="col-span-full flex items-center gap-3 px-4 py-2 border-b-2 border-ink bg-paper flex-wrap">
      <div id="brand" className="font-hand text-[28px] leading-none font-bold whitespace-nowrap">
        Semester I, unit by unit
        <small className="block font-sans text-[11px] font-medium text-dim mt-0.5">
          Mathematics &amp; Computing · LNJPIT Chapra · Group A
        </small>
      </div>

      <nav id="subs" aria-label="Subjects" className="flex gap-1.5 overflow-x-auto flex-1 py-0.5">
        {subjects.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelectSubject(idx)}
            className={`chip ${idx === activeSubjectIndex ? 'on' : ''}`}
          >
            <i>{s.num}</i>
            {s.co}
            <em>
              {subjectDoneCount(idx)}/{s.topN}
            </em>
          </button>
        ))}
      </nav>

      <div id="prog" className="min-w-[110px] text-right text-[11px] text-dim hidden sm:block">
        <b className="block font-hand text-[20px] text-ink leading-none">
          {totalClearedAll}/{totalTopicsAll}
        </b>
        topics cleared
        <div className="bar">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          className="btn flex items-center gap-1"
          onClick={onOpenCommandPalette}
          title="Spotlight Search (Ctrl+K)"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden lg:inline font-mono text-[9px] px-1 rounded border border-ink/40 bg-paper text-dim">
            Ctrl+K
          </kbd>
        </button>

        <button type="button" className="btn hidden md:inline-flex" onClick={onOpenFlashcards}>
          Cards
        </button>
        <button type="button" className="btn hidden md:inline-flex" onClick={onOpenFormulaSheet}>
          Formulas
        </button>
        <button type="button" className="btn hidden sm:inline-flex" onClick={onOpenMockTest}>
          Mock (20Q)
        </button>
        <button type="button" className="btn" onClick={onOpenNotesModal}>
          All notes
        </button>
        <button type="button" className="btn" onClick={onOpenBackupModal} title="Backup & Restore Data">
          Backup
        </button>
        <button type="button" className="btn red" onClick={onOpenPlanModal}>
          Exam plan
        </button>
      </div>
    </header>
  );
};
