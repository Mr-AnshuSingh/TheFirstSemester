'use client';

import React, { useState } from 'react';
import { SvgDiagram } from '@/types/syllabus';

interface SvgDiagramViewerProps {
  diagrams: SvgDiagram[];
  subjectShortName: string;
}

export const SvgDiagramViewer: React.FC<SvgDiagramViewerProps> = ({
  diagrams,
  subjectShortName,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!diagrams || diagrams.length === 0) {
    return <p className="text-sm text-dim">No 2D exam diagrams for this subject.</p>;
  }

  const current = diagrams[Math.min(activeIdx, diagrams.length - 1)];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h4 className="font-hand text-2xl font-bold text-accentRed m-0">
          2D Exam Sketchbook · {subjectShortName}
        </h4>
        <div className="flex gap-1 flex-wrap">
          {diagrams.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`px-2.5 py-0.5 text-xs font-bold rounded-full border border-ink ${
                i === activeIdx ? 'bg-accentRed text-white border-accentRed' : 'bg-paper text-ink'
              }`}
            >
              #{i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-paper border-2 border-ink rounded-xl shadow-sketch">
        <div
          className="w-full overflow-x-auto [&_svg]:w-full [&_svg]:h-auto [&_svg_.l]:stroke-[#2b2a28] [&_svg_.l]:fill-none [&_svg_.l]:stroke-[1.8] [&_svg_.a]:stroke-[#d4572b] [&_svg_.a]:fill-none [&_svg_.a]:stroke-[2.2] [&_svg_.d]:stroke-[#6b665b] [&_svg_.d]:fill-none [&_svg_.d]:stroke-dasharray-[4,3] [&_svg_.fa]:fill-[#f6e3b4] [&_svg_.fa]:stroke-[#2b2a28] [&_svg_.t]:fill-[#2b2a28] [&_svg_.t]:text-[11px] [&_svg_.ta]:fill-[#d4572b] [&_svg_.ta]:font-bold [&_svg_.ta]:text-[11.5px]"
          dangerouslySetInnerHTML={{ __html: current.svg }}
        />
        <p className="mt-2.5 pt-2 border-t border-dashed border-ink/25 text-xs text-ink leading-relaxed">
          <strong className="text-accentTeal">Exam Sketch Caption:</strong> {current.c}
        </p>
      </div>
    </div>
  );
};
