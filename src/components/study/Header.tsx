'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  Wrench,
  BookOpen,
  HelpCircle,
  FileText,
  Database,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
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
  onOpenClassesModal: () => void;
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
  onOpenClassesModal,
  onOpenCommandPalette,
  onOpenFlashcards,
  onOpenMockTest,
  onOpenFormulaSheet,
  onOpenBackupModal,
}) => {
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const toolsMenuRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLElement | null>(null);

  const pct = totalTopicsAll ? (totalClearedAll / totalTopicsAll) * 100 : 0;

  // Close tools dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    if (toolsOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [toolsOpen]);

  const scrollNudge = (direction: 'left' | 'right') => {
    if (scrollerRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      scrollerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <header id="hd" className="col-span-full flex flex-col border-b-2 border-ink bg-paper select-none z-30">
      {/* ROW 1: Brand, Search, Progress, Quick Actions & Tools */}
      <div className="flex items-center justify-between gap-2.5 px-3.5 py-1.5 border-b border-dashed border-ink/20 flex-wrap min-h-[44px]">
        {/* Brand with Application Logo */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt="The First Semester Logo"
            className="w-7 h-7 md:w-8 md:h-8 shrink-0 drop-shadow-xs"
            width={32}
            height={32}
            priority
          />
          <div id="brand" className="font-hand text-[22px] md:text-[24px] leading-none font-bold whitespace-nowrap">
            Semester I, unit by unit
            <small className="block font-sans text-xs font-medium text-dim mt-0.5">
              Mathematics &amp; Computing · LNJPIT Chapra · Group A
            </small>
          </div>
        </div>

        {/* Center / Right Control Cluster */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Spotlight Search */}
          <button
            type="button"
            className="btn flex items-center gap-1.5 text-xs md:text-sm font-medium"
            onClick={onOpenCommandPalette}
            title="Spotlight Search (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-dim" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline font-mono text-[11px] px-1 rounded border border-ink/40 bg-paper text-dim">
              Ctrl+K
            </kbd>
          </button>

          {/* Overall Progress Counter */}
          <div id="prog" className="min-w-[100px] text-right text-xs text-dim hidden lg:block">
            <div className="flex items-baseline justify-end gap-1.5">
              <b className="font-hand text-xl text-ink leading-none font-bold">
                {totalClearedAll}/{totalTopicsAll}
              </b>
              <span className="text-[11px]">cleared</span>
            </div>
            <div className="bar mt-0.5">
              <i style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Quick Schedule Badge */}
          <button
            type="button"
            className="btn gold text-xs md:text-sm flex items-center gap-1.5"
            onClick={onOpenClassesModal}
            title="Room 13 Class Schedule & 2026 University Holiday Calendar"
          >
            <span className="w-2 h-2 rounded-full bg-accentRed animate-ping inline-block" />
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Schedule</span>
          </button>

          {/* Tools Dropdown Menu */}
          <div ref={toolsMenuRef} className="relative">
            <button
              type="button"
              className={`btn flex items-center gap-1.5 text-xs md:text-sm font-medium ${
                toolsOpen ? 'bg-ink text-paper' : ''
              }`}
              onClick={() => setToolsOpen((prev) => !prev)}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              title="Study Tools & Hub"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Tools</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1.5 w-60 bg-paper border-2 border-ink rounded-lg shadow-sketchy p-1.5 z-50 flex flex-col gap-1 font-sans text-xs text-ink animate-fadeIn"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setToolsOpen(false);
                    onOpenFlashcards();
                  }}
                  className="flex items-center gap-2.5 p-2 rounded hover:bg-gold/15 text-left transition-colors font-medium"
                >
                  <Layers className="w-4 h-4 text-accentRed shrink-0" />
                  <div>
                    <strong className="block text-ink">Spaced Repetition Cards</strong>
                    <span className="text-[11px] text-dim">SM-2 formula &amp; concept flashcards</span>
                  </div>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setToolsOpen(false);
                    onOpenFormulaSheet();
                  }}
                  className="flex items-center gap-2.5 p-2 rounded hover:bg-gold/15 text-left transition-colors font-medium"
                >
                  <BookOpen className="w-4 h-4 text-accentTeal shrink-0" />
                  <div>
                    <strong className="block text-ink">Formula Sheet</strong>
                    <span className="text-[11px] text-dim">Quick equations reference across 43 units</span>
                  </div>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setToolsOpen(false);
                    onOpenMockTest();
                  }}
                  className="flex items-center gap-2.5 p-2 rounded hover:bg-gold/15 text-left transition-colors font-medium"
                >
                  <HelpCircle className="w-4 h-4 text-accentGold shrink-0" />
                  <div>
                    <strong className="block text-ink">Mock Test (20Q)</strong>
                    <span className="text-[11px] text-dim">Timed full-semester diagnostic test</span>
                  </div>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setToolsOpen(false);
                    onOpenNotesModal();
                  }}
                  className="flex items-center gap-2.5 p-2 rounded hover:bg-gold/15 text-left transition-colors font-medium"
                >
                  <FileText className="w-4 h-4 text-ink shrink-0" />
                  <div>
                    <strong className="block text-ink">All Notes &amp; PDF Export</strong>
                    <span className="text-[11px] text-dim">Full syllabus notes in simple English</span>
                  </div>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setToolsOpen(false);
                    onOpenBackupModal();
                  }}
                  className="flex items-center gap-2.5 p-2 rounded hover:bg-gold/15 text-left transition-colors font-medium border-t border-dashed border-ink/20 pt-1.5"
                >
                  <Database className="w-4 h-4 text-accentTeal shrink-0" />
                  <div>
                    <strong className="block text-ink">Backup &amp; Data Hub</strong>
                    <span className="text-[11px] text-dim">Export, restore or reset study data</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Primary Action Button: Exam Plan */}
          <button
            type="button"
            className="btn red font-bold text-xs md:text-sm px-3 py-1.5 shadow-sketchy"
            onClick={onOpenPlanModal}
            title="Six-Week Exam Countdown Plan"
          >
            Exam plan
          </button>
        </div>
      </div>

      {/* ROW 2: Dedicated Full-Width Subject Scroller */}
      <div className="relative flex items-center w-full bg-paper2/50 px-2 py-0.5 min-h-[36px] overflow-hidden">
        {/* Left Scroll Nudge Arrow */}
        <button
          type="button"
          onClick={() => scrollNudge('left')}
          className="p-1 rounded hover:bg-ink/10 text-dim hover:text-ink shrink-0 transition-colors hidden sm:flex items-center justify-center"
          title="Scroll subjects left"
          aria-label="Scroll subjects left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Horizontal Subjects Strip */}
        <nav
          ref={scrollerRef}
          id="subs"
          aria-label="Subjects"
          className="flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-1 py-0.5 px-1 scroll-smooth"
        >
          {subjects.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelectSubject(idx)}
              className={`chip shrink-0 ${idx === activeSubjectIndex ? 'on' : ''}`}
            >
              <i>{s.num}</i>
              <span>{s.co}</span>
              <em>
                {subjectDoneCount(idx)}/{s.topN}
              </em>
            </button>
          ))}
        </nav>

        {/* Right Scroll Nudge Arrow */}
        <button
          type="button"
          onClick={() => scrollNudge('right')}
          className="p-1 rounded hover:bg-ink/10 text-dim hover:text-ink shrink-0 transition-colors hidden sm:flex items-center justify-center"
          title="Scroll subjects right"
          aria-label="Scroll subjects right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
