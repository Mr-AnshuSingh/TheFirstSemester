'use client';

import React from 'react';
import { Subject } from '@/types/syllabus';

interface UnitSidebarProps {
  subject: Subject;
  activeUnitIndex: number;
  unitDoneCount: (uIdx: number) => number;
  onSelectUnit: (uIdx: number) => void;
}

export const UnitSidebar: React.FC<UnitSidebarProps> = ({
  subject,
  activeUnitIndex,
  unitDoneCount,
  onSelectUnit,
}) => {
  return (
    <aside id="units" aria-label="Units" className="border-r-2 border-ink overflow-y-auto p-3 bg-paper2">
      <h2 className="font-hand text-[26px] leading-tight mx-1 mb-0.5">{subject.name}</h2>
      <p className="text-sm text-dim mx-1 mb-3">
        {subject.code} · {subject.cr} credits · {subject.fac}
      </p>
      {subject.units.map((u, uIdx) => {
        const done = unitDoneCount(uIdx);
        const total = u.topics.length;
        return (
          <button
            key={uIdx}
            type="button"
            onClick={() => onSelectUnit(uIdx)}
            className={`un ${uIdx === activeUnitIndex ? 'on' : ''}`}
          >
            <div className="a">
              <i>{uIdx + 1}</i>
              <b>{u.t}</b>
            </div>
            <div className="b">
              <span>{u.h}</span>
              <span>
                {done}/{total}
              </span>
            </div>
            <div className="bar">
              <i style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
            </div>
          </button>
        );
      })}
    </aside>
  );
};
