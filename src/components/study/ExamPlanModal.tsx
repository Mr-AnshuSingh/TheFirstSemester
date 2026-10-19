'use client';

import React from 'react';
import { Subject } from '@/types/syllabus';
import { WEEKS, RULES } from '@/data/schedule';

interface ExamPlanModalProps {
  open: boolean;
  subjects: Subject[];
  examDate: string;
  onChangeExamDate: (d: string) => void;
  onClose: () => void;
  labGroup?: 'G1' | 'G2';
  onChangeLabGroup?: (g: 'G1' | 'G2') => void;
}

export const ExamPlanModal: React.FC<ExamPlanModalProps> = ({
  open,
  subjects,
  examDate,
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
            <span>1</span>Six-week countdown
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
            <span>2</span>Free marks ({fmCount} questions)
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
            <span>3</span>Exam-day rules
          </h3>
          <ol className="rl">
            {RULES.map((r, ri) => (
              <li key={ri}>{r}</li>
            ))}
          </ol>
        </div>

        <div className="ms">
          <h3>
            <span>4</span>Memory hooks
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
