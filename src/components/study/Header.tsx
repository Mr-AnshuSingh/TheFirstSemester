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
}) => {
  const pct = totalTopicsAll ? (totalClearedAll / totalTopicsAll) * 100 : 0;
  return (
    <header id="hd" className="col-span-full flex items-center gap-4 px-4 py-2.5 border-b-2 border-ink bg-paper flex-wrap">
      <div id="brand" className="font-hand text-[30px] leading-none font-bold whitespace-nowrap">
        Semester I, unit by unit
        <small className="block font-sans text-[11px] font-medium text-dim mt-1">
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

      <div id="prog" className="min-w-[120px] text-right text-[11px] text-dim">
        <b className="block font-hand text-[22px] text-ink leading-none">
          {totalClearedAll}/{totalTopicsAll}
        </b>
        topics cleared
        <div className="bar">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>

      <button type="button" className="btn" onClick={onOpenNotesModal}>
        All notes
      </button>
      <button type="button" className="btn red" onClick={onOpenPlanModal}>
        Exam plan
      </button>
    </header>
  );
};
