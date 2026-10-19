'use client';

import React, { useState } from 'react';
import { Subject, SceneStep, TutorResponsePayload } from '@/types/syllabus';
import { KatexText } from './KatexRenderer';

interface AiTutorPanelProps {
  subject: Subject;
  unitIndex: number;
  stepIndex: number;
  activeStep: SceneStep;
}

export const AiTutorPanel: React.FC<AiTutorPanelProps> = ({
  subject,
  unitIndex,
  stepIndex,
  activeStep,
}) => {
  const unit = subject.units[unitIndex];
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<TutorResponsePayload | null>(null);

  const askTutor = async (qText?: string) => {
    const query = (qText ?? question).trim();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: subject.id,
          unitIndex,
          stepIndex,
          question: query,
        }),
      });
      const data: TutorResponsePayload = await res.json();
      setResponse(data);
    } catch {
      setResponse({
        answer: `For ${subject.name} (${subject.code}) — Unit ${unitIndex + 1}: ${unit.t}, start by stating the core principle (${activeStep.t}): ${activeStep.d}`,
        markingSchemeSteps: subject.ex.a,
        formulaHighlight: unit.k.slice(0, 3),
        trapWarning: subject.ex.x[0] || 'Always write units and final conclusions clearly.',
        contextUsed: {
          subjectName: subject.name,
          subjectCode: subject.code,
          unitTitle: unit.t,
          activeStepTitle: activeStep.t,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box space-y-3">
      <div className="p-3 rounded-xl bg-paper border-2 border-ink shadow-sketch">
        <div className="text-[11px] font-bold uppercase tracking-wider text-accentRed">
          LNJPIT Chapra Context-Aware AI Doubt Solver (/api/tutor)
        </div>
        <div className="text-xs text-dim mt-0.5">
          Injected Context: <strong>{subject.co}</strong> ({subject.code}) · Unit {unitIndex + 1}:{' '}
          <strong>{unit.t}</strong> · Step {stepIndex + 1}: <em>{activeStep.t}</em>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {[
            `How do I write a full-marks 7-mark answer on "${activeStep.t}"?`,
            `Explain the key formula and derivation for ${unit.t}.`,
            `What are the common exam traps in ${unit.t}?`,
          ].map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setQuestion(preset);
                askTutor(preset);
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-paper2 hover:bg-ink hover:text-paper border border-ink/40 transition text-left"
            >
              {preset}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && askTutor()}
            placeholder={`Ask a doubt about ${unit.t}...`}
            className="flex-1 px-3 py-1.5 text-sm bg-[#fffdf7] border-[1.5px] border-ink rounded-lg"
          />
          <button
            type="button"
            onClick={() => askTutor()}
            disabled={loading}
            className="btn red text-xs px-3.5 py-1.5"
          >
            {loading ? 'Solving...' : 'Ask Tutor'}
          </button>
        </div>
      </div>

      {response && (
        <div className="p-3.5 rounded-xl bg-[#fff9e8] border-2 border-ink space-y-3 text-xs leading-relaxed">
          <div className="flex items-center justify-between pb-2 border-b border-ink/20">
            <span
              className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                response.isLiveAi
                  ? 'bg-amber-100 text-amber-900 border-amber-400'
                  : 'bg-paper text-dim border-ink/30'
              }`}
            >
              {response.isLiveAi ? 'Gemini 1.5 Flash Live' : 'Offline Syllabus Grounded'}
            </span>
            <span className="text-[11px] text-dim font-mono">
              {response.contextUsed.subjectCode} · Unit {unitIndex + 1}
            </span>
          </div>

          <div>
            <strong className="text-accentTeal uppercase tracking-wider block text-[11px] mb-1">
              University Marking-Scheme Answer:
            </strong>
            <p className="text-sm text-ink whitespace-pre-line">{response.answer}</p>
          </div>

          <div>
            <strong className="text-accentRed uppercase tracking-wider block text-[11px] mb-1">
              Key Formulas & Moves to Write on Paper:
            </strong>
            <ul className="keys">
              {response.formulaHighlight.map((f, i) => (
                <li key={i}>
                  <KatexText htmlOrText={f} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <strong className="text-ink uppercase tracking-wider block text-[11px] mb-1">
              Step-by-Step Full-Marks Rubric:
            </strong>
            <ol className="list-decimal pl-5 space-y-1">
              {response.markingSchemeSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>

          <div className="p-2 rounded bg-[#fff1e8] border border-accentRed text-ink">
            <strong className="text-accentRed">⚠️ Examiner Trap Alert:</strong>{' '}
            {response.trapWarning}
          </div>
        </div>
      )}
    </div>
  );
};
