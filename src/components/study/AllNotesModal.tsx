'use client';

import React from 'react';
import { Subject } from '@/types/syllabus';
import { SC } from '@/data/scenes';
import { WORKED } from '@/data/worked';
import { getTopicContent } from '@/data/topicContent';
import { KatexText } from './KatexRenderer';

interface AllNotesModalProps {
  open: boolean;
  subjects: Subject[];
  onClose: () => void;
}

export const AllNotesModal: React.FC<AllNotesModalProps> = ({ open, subjects, onClose }) => {
  if (!open) return null;

  const downloadTxt = () => {
    let t =
      'SEMESTER I NOTES: Mathematics & Computing, LNJPIT Chapra (Group A, 2026-2030)\n' +
      '='.repeat(70) +
      '\n\n';
    const strip = (x: string) => String(x).replace(/<br>/g, '\n').replace(/<[^>]+>/g, '');
    subjects.forEach((s) => {
      t += `\n## ${s.num}. ${s.name} (${s.code}, ${s.cr} credits, ${s.fac})\n${s.tag}\n${s.why}\n`;
      s.units.forEach((u, i) => {
        const sc = SC[`${s.id}:${i}`];
        const W = WORKED[`${s.id}:${i}`];
        t +=
          `\n### Unit ${i + 1}: ${u.t} (${u.h})\nTopics:\n` +
          u.topics
            .map((x, ti) => {
              const isStar = x[0] === '★';
              const tc = getTopicContent(s.id, i, ti);
              let line = '  - ' + (isStar ? x.slice(1).trim() + '  [exam favourite]' : x);
              if (tc) {
                line += `\n      * Definition: ${tc.definition}`;
                if (tc.formula) line += `\n      * Formula: ${tc.formula}`;
                if (tc.steps?.length) line += `\n      * Method: ${tc.steps.join(' -> ')}`;
                if (tc.slip) line += `\n      * Slip: ${tc.slip}`;
              }
              return line;
            })
            .join('\n') +
          `\n\nIn simple English: ${u.s}\n`;
        if (sc)
          t +=
            '\nStep by step:\n' +
            sc.steps.map((p, k) => `  ${k + 1}. ${p.t}: ${p.d}`).join('\n') +
            '\n';
        if (W) t += '\nWorked example: ' + strip(W) + '\n';
        t += '\nKey moves:\n' + u.k.map((k) => '  * ' + k).join('\n') + '\n';
      });
      t +=
        '\nAlmost-guaranteed questions:\n' +
        s.ex.q.map((x) => '  - ' + x).join('\n') +
        '\nHow to answer for full marks:\n' +
        s.ex.a.map((x) => '  - ' + x).join('\n') +
        '\nTraps:\n' +
        s.ex.x.map((x) => '  - ' + x).join('\n') +
        '\nExam-morning chant: ' +
        s.hook +
        '\n';
    });
    const blob = new Blob([t], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'semester-1-notes.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
  };

  return (
    <div id="nmodal" role="dialog" aria-modal="true" aria-label="All notes" className="on">
      <div className="mw">
        <div className="mh noprint">
          <div>
            <h2>All notes</h2>
            <p className="text-sm text-dim mt-1.5">
              Generated from your syllabus: simple-English notes, step-by-step explanations, worked examples, key formulas and exam traps for every unit.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button type="button" className="btn red" onClick={() => window.print()}>
              Print / save as PDF
            </button>
            <button type="button" className="btn" onClick={downloadTxt}>
              Download .txt
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        {subjects.map((s) => (
          <section key={s.id} id={`nn-${s.id}`} className="nsub">
            <h4>
              <span>{s.num}</span> {s.name}
            </h4>
            <p className="nm">
              {s.code} · {s.cr} credits · {s.fac} · {s.sub}
            </p>
            <p className="why">
              <b>{s.tag}</b> {s.why}
            </p>
            {s.units.map((un, u) => {
              const sc = SC[`${s.id}:${u}`];
              const W = WORKED[`${s.id}:${u}`];
              return (
                <article key={u} className="nun">
                  <h5>
                    Unit {u + 1}: {un.t} <small>{un.h}</small>
                  </h5>
                  <p className="nl">Syllabus topics (★ = exam favourite)</p>
                  <ul className="nt">
                    {un.topics.map((t, ti) =>
                      t[0] === '★' ? (
                        <li key={ti} className="s">
                          {t.slice(1).trim()}
                        </li>
                      ) : (
                        <li key={ti}>{t}</li>
                      )
                    )}
                  </ul>
                  <p className="nl">In simple English</p>
                  <p>{un.s}</p>
                  {sc?.steps && (
                    <>
                      <p className="nl">How it works, step by step</p>
                      <ol className="nst">
                        {sc.steps.map((p, pi) => (
                          <li key={pi}>
                            <b>{p.t}.</b> {p.d}
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                  {W && (
                    <>
                      <p className="nl">Worked example</p>
                      <div className="we">
                        <KatexText htmlOrText={W} />
                      </div>
                    </>
                  )}
                  <p className="nl">Key moves to learn cold</p>
                  <ul className="nt k">
                    {un.k.map((k, ki) => (
                      <li key={ki}>
                        <KatexText htmlOrText={k} />
                      </li>
                    ))}
                  </ul>
                  {un.topics.some((_, ti) => Boolean(getTopicContent(s.id, u, ti))) && (
                    <>
                      <p className="nl">Topic-by-Topic Exam Blueprint &amp; Diagrams</p>
                      <div className="space-y-4 my-3">
                        {un.topics.map((t, ti) => {
                          const tc = getTopicContent(s.id, u, ti);
                          if (!tc) return null;
                          const isStar = t.startsWith('★');
                          const tClean = isStar ? t.slice(1).trim() : t;
                          return (
                            <div key={ti} className="p-3 bg-paper2 rounded border border-rule/60 text-sm break-inside-avoid">
                              <div className="flex items-center gap-2 font-bold text-sm text-ink border-b border-rule/40 pb-1 mb-2">
                                {isStar && <span className="text-gold font-serif">★</span>}
                                <span>{ti + 1}. {tClean}</span>
                              </div>
                              <div className="mb-2">
                                <span className="font-semibold text-ink uppercase text-xs tracking-wide">Definition: </span>
                                <KatexText htmlOrText={tc.definition} />
                              </div>
                              {tc.formula && (
                                <div className="mb-2 p-1.5 bg-paper rounded border border-rule/50 text-sm font-mono text-ink">
                                  <span className="font-sans font-semibold text-ink uppercase text-xs tracking-wide">Formula: </span>
                                  <KatexText htmlOrText={tc.formula} />
                                </div>
                              )}
                              {tc.steps && tc.steps.length > 0 && (
                                <div className="mb-2">
                                  <span className="font-semibold text-ink uppercase text-xs tracking-wide block mb-0.5">Steps / Method:</span>
                                  <ol className="list-decimal pl-4 space-y-0.5 text-sm">
                                    {tc.steps.map((st, si) => (
                                      <li key={si}><KatexText htmlOrText={st} /></li>
                                    ))}
                                  </ol>
                                </div>
                              )}
                              {tc.diagram && (
                                <div className="my-2 p-2 bg-paper rounded border border-rule/40 flex flex-col items-center">
                                  <div
                                    className="w-full max-w-[340px] [&_svg]:w-full [&_svg]:h-auto text-ink"
                                    dangerouslySetInnerHTML={{ __html: tc.diagram.svg }}
                                  />
                                  <div className="text-xs text-dim mt-1 font-medium">
                                    Fig: {tc.diagram.caption}
                                  </div>
                                </div>
                              )}
                              {tc.examAnswer && tc.examAnswer.length > 0 && (
                                <div className="mb-1 text-ink/90">
                                  <span className="font-semibold text-accentTeal uppercase text-xs tracking-wide block mb-0.5">Write This for Full Marks:</span>
                                  <ul className="list-disc pl-4 space-y-0.5 text-sm">
                                    {tc.examAnswer.map((ans, ai) => (
                                      <li key={ai}><KatexText htmlOrText={ans} /></li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {tc.slip && (
                                <div className="mt-2 p-1.5 bg-accentRed/10 rounded border border-accentRed/30 text-sm text-accentRed">
                                  <b className="font-semibold">Common Exam Slip: </b>
                                  <KatexText htmlOrText={tc.slip} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
};
