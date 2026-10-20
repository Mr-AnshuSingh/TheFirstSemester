'use client';

import React, { useState, useMemo } from 'react';
import { Subject } from '@/types/syllabus';
import { KatexText } from './KatexRenderer';
import { useModalA11y } from './useModalA11y';

interface FormulaSheetModalProps {
  open: boolean;
  subjects: Subject[];
  onClose: () => void;
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({
  open,
  subjects,
  onClose,
}) => {
  const modalRef = useModalA11y(open, onClose);
  const [query, setQuery] = useState<string>('');
  const [selectedSubId, setSelectedSubId] = useState<string>('all');

  const formulaGroups = useMemo(() => {
    return subjects
      .filter((s) => selectedSubId === 'all' || s.id === selectedSubId)
      .map((s) => ({
        subject: s,
        units: s.units.map((u, uIdx) => ({
          unitIndex: uIdx,
          unitTitle: u.t,
          formulas: u.k.filter((f) => {
            if (!query.trim()) return true;
            return (
              f.toLowerCase().includes(query.toLowerCase()) ||
              u.t.toLowerCase().includes(query.toLowerCase()) ||
              s.name.toLowerCase().includes(query.toLowerCase())
            );
          }),
        })).filter((ug) => ug.formulas.length > 0),
      })).filter((sg) => sg.units.length > 0);
  }, [subjects, selectedSubId, query]);

  if (!open) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Comprehensive Formula Sheet"
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 md:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-paper border-2 border-ink rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden font-sans text-ink"
      >
        {/* Header */}
        <div className="p-4 border-b-2 border-ink flex items-center justify-between bg-gold/10">
          <div>
            <h2 className="font-hand text-2xl md:text-3xl font-bold leading-tight">
              Formula &amp; Definition Quick Reference
            </h2>
            <p className="text-sm text-dim">
              Key mathematical theorems, physical relations, and electronic equations across 43 units
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="text-xs px-2.5 py-1 border-[1.5px] border-ink rounded bg-paper font-sans font-semibold hover:bg-gold/20"
            >
              Print Sheet
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-2xl font-bold text-dim hover:text-ink leading-none px-2"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-3 border-b border-dashed border-ink/30 bg-paper/80 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search formulas (e.g. curvature, Poynting, resonance, Euler, Beta)..."
              className="w-full p-2 bg-paper border border-ink rounded text-sm font-sans font-medium placeholder:text-dim/60"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-dim">Filter:</span>
            <select
              value={selectedSubId}
              onChange={(e) => setSelectedSubId(e.target.value)}
              className="p-1.5 bg-paper border border-ink rounded text-sm font-sans font-medium"
            >
              <option value="all">All 8 Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.co}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Formula lists */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {formulaGroups.length > 0 ? (
            formulaGroups.map(({ subject, units }) => (
              <div key={subject.id} className="space-y-4">
                <div className="flex items-baseline justify-between border-b-2 border-ink pb-1">
                  <h3 className="font-hand text-2xl font-bold text-accentRed">
                    {subject.name} ({subject.co})
                  </h3>
                  <span className="font-mono text-xs text-dim">
                    Code: {subject.code} · {subject.cr} Credits
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {units.map((u) => (
                    <div
                      key={u.unitIndex}
                      className="p-3.5 bg-paper border-[1.5px] border-ink rounded-lg shadow-sketchy"
                    >
                      <h4 className="font-hand text-lg font-bold text-ink mb-2 border-b border-dashed border-ink/20 pb-1">
                        Unit {u.unitIndex + 1}: {u.unitTitle}
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {u.formulas.map((fm, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 p-1.5 rounded hover:bg-gold/10 transition-colors font-medium leading-relaxed"
                          >
                            <span className="text-accentRed font-bold font-mono shrink-0">▪</span>
                            <span className="flex-1 font-mono text-sm">
                              <KatexText htmlOrText={fm} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 font-hand text-xl text-dim">
              No formulas matched your search query &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
