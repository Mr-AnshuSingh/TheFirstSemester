'use client';

import React from 'react';
import { Subject } from '@/types/syllabus';
import { SC } from '@/data/scenes';
import { WORKED } from '@/data/worked';
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
            .map((x) => '  - ' + (x[0] === '★' ? x.slice(1).trim() + '  [exam favourite]' : x))
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
            <p className="text-[13px] text-dim mt-1.5">
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
                </article>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
};
