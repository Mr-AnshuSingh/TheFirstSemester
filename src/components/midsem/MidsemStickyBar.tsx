'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  Calculator,
  Compass,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Search,
  Target,
  Timer,
  X,
} from 'lucide-react';
import {
  MIDSEM_MODES,
  MIDSEM_SUBJECT_CHIPS,
  MODE_GROUP_META,
  type MidsemMode,
  type ModeGroupId,
} from './midsemTypes';
import { searchMidsemContent, type MidsemSearchResult } from './midsemSearch';

const MODE_ICONS: Record<MidsemMode, React.ComponentType<{ className?: string }>> = {
  notes: BookOpen,
  practice: HelpCircle,
  diagrams: ImageIcon,
  chapters: Compass,
  mcq: Target,
  simulator: Timer,
  papers: FileText,
  calculator: Calculator,
  predictor: Award,
};

export interface MidsemStickyBarProps {
  activeSubjectCode: string;
  activeUnitNo: number;
  availableUnits: number[];
  activeMode: MidsemMode;
  onSelectSubject: (code: string) => void;
  onSelectUnit: (unitNo: number) => void;
  onSelectMode: (mode: MidsemMode) => void;
  onJumpToSearchResult: (res: MidsemSearchResult) => void;
  modeBadges?: Partial<Record<MidsemMode, string>>;
}

export const MidsemStickyBar: React.FC<MidsemStickyBarProps> = ({
  activeSubjectCode,
  activeUnitNo,
  availableUnits,
  activeMode,
  onSelectSubject,
  onSelectUnit,
  onSelectMode,
  onJumpToSearchResult,
  modeBadges = {},
}) => {
  const subjectRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const searchWrapRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const activeGroup: ModeGroupId = useMemo(() => {
    return MIDSEM_MODES.find((m) => m.id === activeMode)?.group || 'study';
  }, [activeMode]);

  const searchResults = useMemo(
    () => searchMidsemContent(searchQuery, activeSubjectCode, 10),
    [searchQuery, activeSubjectCode]
  );

  // Scroll active subject pill cleanly into center on small viewports
  useEffect(() => {
    const el = subjectRefs.current[activeSubjectCode];
    if (el && typeof el.scrollIntoView === 'function') {
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({
        inline: 'center',
        block: 'nearest',
        behavior: reduced ? 'auto' : 'smooth',
      });
    }
  }, [activeSubjectCode]);

  // Close search popover on outside click or Escape
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Arrow-key navigation inside tablist
  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number, list: typeof MIDSEM_MODES) => {
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % list.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + list.length) % list.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = list.length - 1;
    if (nextIdx !== null) {
      e.preventDefault();
      const target = list[nextIdx];
      onSelectMode(target.id);
      requestAnimationFrame(() => tabRefs.current[target.id]?.focus());
    }
  };

  const unitOptions = useMemo(() => {
    const set = new Set<number>([0, 1, 2, 3]);
    availableUnits.forEach((u) => set.add(u));
    return Array.from(set)
      .filter((u) => u === 0 || availableUnits.includes(u))
      .sort((a, b) => a - b);
  }, [availableUnits]);

  return (
    <div
      className="midsem-noprint sticky top-0 z-30 border-b-2 border-ink bg-paper2/95 backdrop-blur-sm shadow-sketch"
      role="region"
      aria-label="Mid-Sem 3-step subject, unit, and mode selector"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 space-y-2.5">
        {/* STEP 1: SUBJECT CHIPS (Horizontally scrollable on phones, active scrolled into view) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="midsem-badge font-mono font-bold uppercase tracking-wider text-accentRed shrink-0">
              1. Subject
            </span>
            <div
              className="midsem-chip-rail flex items-center gap-1.5 overflow-x-auto py-0.5 flex-1"
              role="group"
              aria-label="Select subject"
            >
              {MIDSEM_SUBJECT_CHIPS.map((subj) => {
                const selected =
                  activeSubjectCode === subj.code || activeSubjectCode.includes(subj.code);
                return (
                  <button
                    key={subj.code}
                    ref={(el) => {
                      subjectRefs.current[subj.code] = el;
                    }}
                    type="button"
                    aria-pressed={selected}
                    title={`${subj.fullTitle} (${subj.code})`}
                    onClick={() => onSelectSubject(subj.code)}
                    className={`midsem-tap midsem-nowrap shrink-0 px-3 py-1.5 rounded-xl border-2 text-left transition-colors inline-flex items-center gap-1.5 ${
                      selected
                        ? 'border-ink bg-accentTeal text-paper shadow-sketchy font-bold'
                        : 'border-ink/40 bg-paper text-ink hover:bg-paper3 hover:border-ink'
                    }`}
                  >
                    <span className="midsem-heading text-[22px] leading-none">
                      {subj.displayShort}
                    </span>
                    <span
                      className={`midsem-badge font-mono ${
                        selected ? 'text-paper/90' : 'text-dim'
                      }`}
                    >
                      {subj.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEARCH FIELD (Jumps directly to matching formula, topic, or MCQ) */}
          <div ref={searchWrapRef} className="relative w-full lg:w-[320px] shrink-0">
            <Search
              className="w-4 h-4 text-dim absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Search formulas, topics, and MCQs"
              placeholder="Search formulas, topics, MCQs..."
              value={searchQuery}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              className="midsem-tap midsem-meta w-full pl-9 pr-9 py-2 rounded-xl border-2 border-ink bg-paper text-ink placeholder:text-dim"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setSearchQuery('');
                  setSearchOpen(false);
                }}
                className="midsem-tap absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-lg text-dim hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {searchOpen && searchQuery.trim().length >= 2 && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-[360px] overflow-y-auto rounded-xl border-2 border-ink bg-paper shadow-sketch p-2 space-y-1"
                role="listbox"
                aria-label="Search results"
              >
                {searchResults.length === 0 ? (
                  <div className="midsem-meta p-3 text-center text-dim">
                    No matching formulas, topics, or MCQs for &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  searchResults.map((res) => (
                    <button
                      key={res.id}
                      type="button"
                      role="option"
                      aria-selected={false}
                      onClick={() => {
                        onJumpToSearchResult(res);
                        setSearchOpen(false);
                      }}
                      className="midsem-tap w-full text-left p-2.5 rounded-lg border border-hair/60 hover:border-ink hover:bg-paper2 transition-colors flex flex-col gap-0.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="midsem-badge font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-paper3 text-ink border border-ink/30">
                          {res.kind} · {res.subjectShort} {res.unitNo > 0 ? `U${res.unitNo}` : 'U4–5'}
                        </span>
                      </div>
                      <span className="font-bold text-ink midsem-meta">{res.title}</span>
                      <span className="midsem-badge text-dim line-clamp-1">{res.snippet}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* STEP 2 & 3: UNIT CHIPS + GROUPED MODE SELECTOR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-t border-hair/60 pt-2">
          {/* STEP 2: UNIT CHIPS */}
          <div className="flex items-center gap-1.5 overflow-x-auto midsem-chip-rail shrink-0" role="group" aria-label="Select unit">
            <span className="midsem-badge font-mono font-bold uppercase tracking-wider text-accentTeal shrink-0 mr-0.5">
              2. Unit
            </span>
            {unitOptions.map((u) => {
              const selected = activeUnitNo === u;
              return (
                <button
                  key={u}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelectUnit(u)}
                  className={`midsem-tap midsem-nowrap shrink-0 px-3 py-1 rounded-lg border-2 font-bold midsem-meta transition-colors ${
                    selected
                      ? 'border-ink bg-accentGold text-paper shadow-sketchy'
                      : 'border-ink/40 bg-paper text-ink hover:bg-paper3'
                  }`}
                >
                  {u === 0 ? 'All' : `Unit ${u}`}
                </button>
              );
            })}
          </div>

          {/* STEP 3: GROUPED MODE SELECTOR (Study · Practice · Tools) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0 flex-1 md:justify-end">
            <div className="flex items-center gap-1 shrink-0" aria-label="Mode category">
              <span className="midsem-badge font-mono font-bold uppercase tracking-wider text-dim mr-0.5">
                3. Mode
              </span>
              {MODE_GROUP_META.map((grp) => {
                const isActiveGrp = activeGroup === grp.id;
                return (
                  <button
                    key={grp.id}
                    type="button"
                    aria-pressed={isActiveGrp}
                    onClick={() => {
                      if (!isActiveGrp) onSelectMode(grp.defaultMode);
                    }}
                    className={`midsem-tap midsem-nowrap px-2.5 py-1 rounded-lg border text-left midsem-badge font-mono font-bold uppercase transition-colors ${
                      isActiveGrp
                        ? 'border-ink bg-ink text-paper'
                        : 'border-ink/30 bg-paper text-dim hover:text-ink hover:bg-paper3'
                    }`}
                  >
                    {grp.label}
                  </button>
                );
              })}
            </div>

            {/* Active Group Modes Tablist (with Arrow-Key Accessibility) */}
            <div
              role="tablist"
              aria-label="Mid-Sem study modes"
              className="midsem-chip-rail flex items-center gap-1.5 overflow-x-auto py-0.5"
            >
              {MIDSEM_MODES.map((m, idx) => {
                const Icon = MODE_ICONS[m.id];
                const isSelected = activeMode === m.id;
                const badge = modeBadges[m.id];
                // On mobile show modes matching the active group; on xl desktop show all or current group cleanly!
                const matchesGroup = m.group === activeGroup;
                return (
                  <button
                    key={m.id}
                    ref={(el) => {
                      tabRefs.current[m.id] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${m.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${m.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => onSelectMode(m.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx, MIDSEM_MODES)}
                    className={`midsem-tap midsem-nowrap shrink-0 px-3 py-1 rounded-xl border-2 transition-colors inline-flex items-center gap-1.5 ${
                      matchesGroup ? 'inline-flex' : 'hidden 2xl:inline-flex'
                    } ${
                      isSelected
                        ? 'border-ink bg-paper text-ink shadow-sketch font-bold'
                        : 'border-ink/30 bg-paper2 text-dim hover:text-ink hover:bg-paper3 hover:border-ink'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-ink shrink-0" aria-hidden="true" />
                    <span className="midsem-tab-label text-ink">{m.label}</span>
                    {badge && (
                      <span className="midsem-badge font-mono px-1.5 py-0.5 rounded-full border border-ink/30 bg-paper3 text-ink font-bold">
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
