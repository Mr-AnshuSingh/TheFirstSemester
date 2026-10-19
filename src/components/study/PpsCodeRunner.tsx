'use client';

import React, { useState } from 'react';
import { PPS_EXPERIMENTS } from '@/data/ppsExperiments';

interface PpsCodeRunnerProps {
  unitIndex: number;
}

export const PpsCodeRunner: React.FC<PpsCodeRunnerProps> = ({ unitIndex }) => {
  const unitExps = PPS_EXPERIMENTS.filter((e) => e.unitIndex === unitIndex);
  const available = unitExps.length > 0 ? unitExps : PPS_EXPERIMENTS;
  const [selectedId, setSelectedId] = useState<string>(available[0].id);
  const [traceIdx, setTraceIdx] = useState<number>(0);
  const [hasRun, setHasRun] = useState<boolean>(true);

  const exp = available.find((e) => e.id === selectedId) || available[0];
  const currentFrame = exp.traceFrames[Math.min(traceIdx, exp.traceFrames.length - 1)];
  const codeLines = exp.code.split('\n');

  return (
    <div className="box mt-3 border-2 border-ink rounded-xl bg-paper p-3.5 shadow-sketch">
      <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
        <h4 className="font-hand text-2xl font-bold text-accentRed m-0">
          Interactive C/C++ Lab Visualizer (17 Experiments)
        </h4>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-ink text-paper">
          {exp.language} · {exp.codeNum}
        </span>
      </div>

      <div className="flex gap-1.5 flex-wrap mb-3">
        {PPS_EXPERIMENTS.map((item) => {
          const isCurrentUnit = item.unitIndex === unitIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                setTraceIdx(0);
                setHasRun(true);
              }}
              className={`px-2 py-1 text-xs font-bold border rounded transition ${
                item.id === exp.id
                  ? 'bg-accentRed text-white border-accentRed'
                  : isCurrentUnit
                  ? 'bg-[#fff9e8] border-ink text-ink'
                  : 'bg-paper2 border-dim/40 text-dim'
              }`}
            >
              {item.codeNum}
            </button>
          );
        })}
      </div>

      <div className="mb-2">
        <div className="font-bold text-sm text-ink">{exp.title}</div>
        <div className="text-xs text-dim leading-relaxed">{exp.problem}</div>
      </div>

      <div className="bg-[#1e1e1c] text-[#f6f0e1] rounded-lg p-3 font-mono text-xs overflow-x-auto leading-relaxed mb-3 border border-ink">
        {codeLines.map((line, idx) => {
          const lineNo = idx + 1;
          const active = hasRun && currentFrame?.line === lineNo;
          return (
            <div
              key={lineNo}
              className={`flex gap-3 px-1.5 py-0.5 rounded ${
                active ? 'bg-[#d4572b]/35 border-l-2 border-[#d49a14]' : ''
              }`}
            >
              <span className="text-gray-500 select-none w-5 text-right">{lineNo}</span>
              <pre className="whitespace-pre m-0">{line}</pre>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              setHasRun(true);
              setTraceIdx(0);
            }}
            className="btn red text-xs py-1 px-3"
          >
            ▶ Run / Reset
          </button>
          <button
            type="button"
            disabled={traceIdx === 0}
            onClick={() => setTraceIdx((i) => Math.max(0, i - 1))}
            className="btn text-xs py-1 px-2.5 disabled:opacity-40"
          >
            ← Prev Step
          </button>
          <button
            type="button"
            disabled={traceIdx >= exp.traceFrames.length - 1}
            onClick={() => setTraceIdx((i) => Math.min(exp.traceFrames.length - 1, i + 1))}
            className="btn text-xs py-1 px-2.5 disabled:opacity-40"
          >
            Step Forward →
          </button>
        </div>
        <span className="text-xs font-semibold text-dim">
          Step {traceIdx + 1} of {exp.traceFrames.length} (Line {currentFrame?.line})
        </span>
      </div>

      {currentFrame && (
        <div className="grid grid-cols-1 gap-2 mt-2">
          <div className="p-2.5 rounded bg-[#fff9e8] border border-ink text-xs">
            <strong className="text-accentTeal block mb-1">Stack / Memory Trace:</strong>
            <p className="text-ink mb-2">{currentFrame.explanation}</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(currentFrame.variables).map(([k, v]) => (
                <div
                  key={k}
                  className="px-2 py-1 rounded bg-paper2 border border-ink/40 font-mono text-[11px]"
                >
                  <span className="text-dim">{k}:</span>{' '}
                  <strong className="text-accentRed">{String(v)}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="p-2.5 rounded bg-[#1b1a17] text-[#e8e2d2] font-mono text-xs border border-ink">
            <div className="text-[10px] uppercase tracking-wider text-accentGold mb-1">
              Terminal Output (stdout) · Input: {exp.sampleInput}
            </div>
            <pre className="whitespace-pre-wrap m-0 text-emerald-300">
              {(currentFrame.stdout || exp.expectedOutput).replace(/\\n/g, '\n')}
            </pre>
          </div>

          <div className="text-xs text-dim bg-paper2 p-2 rounded border-l-4 border-accentGold">
            <strong className="text-ink">Viva Examiner Tip:</strong> {exp.vivaTip}
          </div>
        </div>
      )}
    </div>
  );
};
