'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Subject } from '@/types/syllabus';
import { PPS_EXPERIMENTS } from '@/data/ppsExperiments';

interface SearchItem {
  id: string;
  type: 'action' | 'subject' | 'unit' | 'topic' | 'pps';
  title: string;
  subtitle: string;
  badge: string;
  onSelect: () => void;
}

interface CommandPaletteModalProps {
  open: boolean;
  onClose: () => void;
  subjects: Subject[];
  onSelectSubjectUnit: (si: number, ui: number) => void;
  onOpenMockTest: () => void;
  onOpenFlashcards: () => void;
  onOpenPlan: () => void;
  onOpenNotes: () => void;
  onOpenFormulaSheet: () => void;
  onOpenBackup?: () => void;
  onOpenClasses?: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  open,
  onClose,
  subjects,
  onSelectSubjectUnit,
  onOpenMockTest,
  onOpenFlashcards,
  onOpenPlan,
  onOpenNotes,
  onOpenFormulaSheet,
  onOpenBackup,
  onOpenClasses,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Construct full searchable index
  const allItems: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [];

    // Quick Actions
    if (onOpenClasses) {
      list.push({
        id: 'act-classes',
        type: 'action',
        title: 'Open Classes Scheduled & BEU Patna Holiday Calendar',
        subtitle: 'Room 13 weekly class schedule, live running class, and 2026 holidays',
        badge: 'Schedule',
        onSelect: () => {
          onClose();
          onOpenClasses();
        },
      });
    }
    list.push({
      id: 'act-mock',
      type: 'action',
      title: 'Take 20-Question Mock Test',
      subtitle: 'Timed full-semester practice examination',
      badge: 'Action',
      onSelect: () => {
        onClose();
        onOpenMockTest();
      },
    });
    list.push({
      id: 'act-flashcards',
      type: 'action',
      title: 'Review Spaced Repetition Flashcards',
      subtitle: 'SuperMemo SM-2 interval memory drilling',
      badge: 'Action',
      onSelect: () => {
        onClose();
        onOpenFlashcards();
      },
    });
    list.push({
      id: 'act-formulas',
      type: 'action',
      title: 'View Formula Sheet & Reference Cards',
      subtitle: 'Aggregated mathematical and engineering formulas',
      badge: 'Action',
      onSelect: () => {
        onClose();
        onOpenFormulaSheet();
      },
    });
    list.push({
      id: 'act-plan',
      type: 'action',
      title: 'Open Exam Plan & Daily Planner',
      subtitle: 'Syllabus coverage tracker and timetable planner',
      badge: 'Action',
      onSelect: () => {
        onClose();
        onOpenPlan();
      },
    });
    list.push({
      id: 'act-notes',
      type: 'action',
      title: 'Open Comprehensive Revision Notes',
      subtitle: 'Combined print-ready notes across all subjects',
      badge: 'Action',
      onSelect: () => {
        onClose();
        onOpenNotes();
      },
    });
    if (onOpenBackup) {
      list.push({
        id: 'act-backup',
        type: 'action',
        title: 'Backup & Restore Study Progress (JSON)',
        subtitle: 'Export/import progress, diagnostics & offline persistence',
        badge: 'Action',
        onSelect: () => {
          onClose();
          onOpenBackup();
        },
      });
    }

    // Subjects & Units
    subjects.forEach((s, sIdx) => {
      list.push({
        id: `sub-${s.id}`,
        type: 'subject',
        title: `${s.co} · ${s.name}`,
        subtitle: `Code: ${s.code} · ${s.cr} Credits · ${s.units.length} Units`,
        badge: 'Subject',
        onSelect: () => {
          onClose();
          onSelectSubjectUnit(sIdx, 0);
        },
      });

      s.units.forEach((u, uIdx) => {
        list.push({
          id: `unit-${s.id}-${uIdx}`,
          type: 'unit',
          title: `${s.co} U${uIdx + 1}: ${u.t}`,
          subtitle: `${u.h} · ${u.topics.length} syllabus topics`,
          badge: 'Unit',
          onSelect: () => {
            onClose();
            onSelectSubjectUnit(sIdx, uIdx);
          },
        });

        // Topics
        u.topics.forEach((top, tIdx) => {
          const star = top.startsWith('★');
          const cleanTop = star ? top.slice(1).trim() : top;
          list.push({
            id: `top-${s.id}-${uIdx}-${tIdx}`,
            type: 'topic',
            title: cleanTop,
            subtitle: `${s.co} · Unit ${uIdx + 1}: ${u.t} ${star ? '(High Yield ★)' : ''}`,
            badge: star ? 'Topic ★' : 'Topic',
            onSelect: () => {
              onClose();
              onSelectSubjectUnit(sIdx, uIdx);
            },
          });
        });
      });
    });

    // PPS Experiments
    PPS_EXPERIMENTS.forEach((exp) => {
      list.push({
        id: `pps-${exp.id}`,
        type: 'pps',
        title: `PPS ${exp.codeNum}: ${exp.title}`,
        subtitle: `${exp.language} Code & Live Execution · Unit ${exp.unitIndex + 1}`,
        badge: 'PPS Lab',
        onSelect: () => {
          const ppsIdx = subjects.findIndex((s) => s.id === 'pps');
          if (ppsIdx >= 0) {
            onClose();
            onSelectSubjectUnit(ppsIdx, exp.unitIndex);
          }
        },
      });
    });

    return list;
  }, [
    subjects,
    onClose,
    onSelectSubjectUnit,
    onOpenMockTest,
    onOpenFlashcards,
    onOpenFormulaSheet,
    onOpenPlan,
    onOpenNotes,
    onOpenBackup,
    onOpenClasses,
  ]);

  // Filter items matching query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 15); // Show quick actions & top subjects first
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q)
      )
      .slice(0, 30);
  }, [allItems, query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((idx) => (idx < filteredItems.length - 1 ? idx + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((idx) => (idx > 0 ? idx - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].onSelect();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-16 md:pt-24 p-3"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-paper border-2 border-ink rounded-lg shadow-2xl overflow-hidden font-sans text-ink flex flex-col max-h-[75vh]"
      >
        {/* Search input bar */}
        <div className="p-3 border-b-2 border-ink flex items-center gap-2 bg-gold/10">
          <svg className="w-5 h-5 text-dim shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search subjects, units, 291 topics, code, actions... (↑↓ to navigate, Enter to select)"
            className="w-full bg-transparent outline-hidden text-sm md:text-base font-hand font-bold placeholder:text-dim/60"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border border-ink/40 bg-paper text-dim">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 divide-y divide-dashed divide-ink/10">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.onSelect}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-2.5 rounded cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-ink text-paper' : 'hover:bg-gold/15 text-ink'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-hand text-base font-bold truncate">
                      {item.title}
                    </div>
                    <div className={`text-xs truncate ${isSelected ? 'text-paper/80' : 'text-dim'}`}>
                      {item.subtitle}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border shrink-0 ${
                      isSelected
                        ? 'border-paper text-paper bg-paper/20'
                        : item.badge.includes('★')
                        ? 'border-accentRed text-accentRed bg-accentRed/10 font-bold'
                        : 'border-ink/30 text-dim bg-paper'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 font-hand text-lg text-dim">
              No matching topics, units or experiments found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2 border-t border-ink/20 bg-gold/5 flex items-center justify-between text-[11px] text-dim font-mono">
          <span>Tip: Press Ctrl+K anywhere to reopen</span>
          <span>{filteredItems.length} results</span>
        </div>
      </div>
    </div>
  );
};
