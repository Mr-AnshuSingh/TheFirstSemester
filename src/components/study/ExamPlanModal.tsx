'use client';

import React from 'react';
import { Subject } from '@/types/syllabus';
import { TT, WEEKS, RULES, HUE } from '@/data/schedule';

interface ExamPlanModalProps {
  open: boolean;
  subjects: Subject[];
  labGroup: 'G1' | 'G2';
  examDate: string;
  onChangeLabGroup: (g: 'G1' | 'G2') => void;
  onChangeExamDate: (d: string) => void;
  onClose: () => void;
}

export const ExamPlanModal: React.FC<ExamPlanModalProps> = ({
  open,
  subjects,
  labGroup,
  examDate,
  onChangeLabGroup,
  onChangeExamDate,
  onClose,
}) => {
  if (!open) return null;

  const fmCount = subjects.reduce((n, s) => n + s.fm.length, 0);

  return (
    <div id="modal" role="dialog" aria-modal="true" aria-label="Exam plan" className="on">
      <div className="mw">
        <div className="mh">
          <div>
            <h2>Exam plan</h2>
            <p className="text-[13px] text-dim mt-1.5">
              From your real timetable (revised, w.e.f. 28.09.26, Room 13) and the Group A syllabus credits.
            </p>
          </div>
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="ms">
          <h3>
            <span>1</span>My real week
            <span className="seg">
              <button
                type="button"
                onClick={() => onChangeLabGroup('G1')}
                className={labGroup === 'G1' ? 'on' : ''}
              >
                G1
              </button>
              <button
                type="button"
                onClick={() => onChangeLabGroup('G2')}
                className={labGroup === 'G2' ? 'on' : ''}
              >
                G2
              </button>
            </span>
          </h3>
          <div className="sx">
            <table className="ttab">
              <thead>
                <tr>
                  <th />
                  <th colSpan={2}>10:00–12:00</th>
                  <th>12:00–1:00</th>
                  <th />
                  <th>2:00–3:00</th>
                  <th>3:00–4:00</th>
                  <th>4:00–5:00</th>
                </tr>
              </thead>
              <tbody>
                {TT.grid.map((row, d) => {
                  let slot = 0;
                  return (
                    <tr key={d}>
                      <th>{TT.days[d]}</th>
                      {row.map((c, ci) => {
                        const sp = c.h || 1;
                        const off = c.g && c.g !== labGroup && c.g !== 'G1 & G2';
                        const free = c.k === 'x' || c.k === 'lib';
                        const showBrk = slot === 3 && d === 0;
                        slot += sp;
                        return (
                          <React.Fragment key={ci}>
                            {showBrk && (
                              <td className="brk" rowSpan={6}>
                                BREAK 1–2
                              </td>
                            )}
                            <td
                              colSpan={sp}
                              className={`${free ? 'f' : ''}${off ? ' o' : ''}`}
                              style={{ '--c': HUE[c.k] || HUE.x } as React.CSSProperties}
                            >
                              {c.l}
                              {c.g && <small>{c.g} · 2 h</small>}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ms">
          <h3>
            <span>2</span>Six-week countdown
          </h3>
          <div className="xd">
            <label htmlFor="exam">My exam starts on</label>
            <input
              id="exam"
              type="date"
              value={examDate}
              onChange={(e) => onChangeExamDate(e.target.value)}
            />
          </div>
          {WEEKS.map((w) => (
            <div key={w.w} className="wk">
              <div>
                <b>{w.w}</b>
                <small>{w.t}</small>
              </div>
              <ul>
                {w.d.map((x, xi) => (
                  <li key={xi}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ms">
          <h3>
            <span>3</span>Free marks ({fmCount} questions)
          </h3>
          <div className="fm">
            {subjects.map((s) => (
              <div key={s.id} className="g">
                <h4>{s.co}</h4>
                <ul>
                  {s.fm.map((x, xi) => (
                    <li key={xi}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ms">
          <h3>
            <span>4</span>Exam-day rules
          </h3>
          <ol className="rl">
            {RULES.map((r, ri) => (
              <li key={ri}>{r}</li>
            ))}
          </ol>
        </div>

        <div className="ms">
          <h3>
            <span>5</span>Memory hooks
          </h3>
          {subjects.map((s) => (
            <div key={s.id} className="hk">
              <b>{s.co}</b>
              <span>{s.hook}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
