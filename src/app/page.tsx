'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { SUBJECTS } from '@/data/subjects';
import { SC } from '@/data/scenes';
import { WORKED } from '@/data/worked';
import { TT, WEEKS, RULES, HUE } from '@/data/schedule';
import { NotebookCanvas3D } from '@/components/canvas/NotebookCanvas3D';
import { KatexText } from '@/components/study/KatexRenderer';
import { SvgDiagramViewer } from '@/components/study/SvgDiagramViewer';
import { PpsCodeRunner } from '@/components/study/PpsCodeRunner';
import { AiTutorPanel } from '@/components/study/AiTutorPanel';
import { Header } from '@/components/study/Header';
import { UnitSidebar } from '@/components/study/UnitSidebar';
import { ExamPlanModal } from '@/components/study/ExamPlanModal';
import { AllNotesModal } from '@/components/study/AllNotesModal';
import {
  DEFAULT_STUDY_STATE,
  PersistedStudyState,
  loadStudyState,
  saveStudyStateOptimistic,
} from '@/lib/offlineStorage';

const TABS = ['Explain', '2D Diagrams', 'Notes', 'Topics', 'Exam', 'AI Tutor'] as const;

export default function SemesterOnePage() {
  const [st, setSt] = useState<PersistedStudyState>(DEFAULT_STUDY_STATE);
  const [si, setSi] = useState<number>(0);
  const [ui, setUi] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);

  useEffect(() => {
    loadStudyState().then((loaded) => {
      setSt(loaded);
      const validSi = Math.min(SUBJECTS.length - 1, Math.max(0, loaded.at?.[0] || 0));
      const validUi = Math.min(
        SUBJECTS[validSi].units.length - 1,
        Math.max(0, loaded.at?.[1] || 0)
      );
      setSi(validSi);
      setUi(validUi);
    });
  }, []);

  const persist = useCallback((updater: (prev: PersistedStudyState) => PersistedStudyState) => {
    setSt((prev) => {
      const next = updater(prev);
      saveStudyStateOptimistic(next);
      return next;
    });
  }, []);

  const activeSubject = SUBJECTS[si];
  const activeUnit = activeSubject.units[ui];
  const sceneKey = `${activeSubject.id}:${ui}`;
  const activeScene = SC[sceneKey] || {
    steps: [{ t: activeUnit.t, d: activeUnit.s }],
    build: () => {},
  };
  const workedExample = WORKED[sceneKey];

  const isTopicDone = (subId: string, uIdx: number, tIdx: number) =>
    !!st.done[`${subId}:${uIdx}:${tIdx}`];

  const unitDoneCount = (subIdx: number, uIdx: number) => {
    const s = SUBJECTS[subIdx];
    return s.units[uIdx].topics.reduce(
      (acc, _, tIdx) => acc + (isTopicDone(s.id, uIdx, tIdx) ? 1 : 0),
      0
    );
  };

  const subjectDoneCount = (subIdx: number) => {
    const s = SUBJECTS[subIdx];
    return s.units.reduce((acc, _, uIdx) => acc + unitDoneCount(subIdx, uIdx), 0);
  };

  const totalTopicsAll = SUBJECTS.reduce((acc, s) => acc + (s.topN || 0), 0);
  const totalClearedAll = SUBJECTS.reduce((acc, _, idx) => acc + subjectDoneCount(idx), 0);

  const selectSubjectUnit = (nextSi: number, nextUi: number) => {
    setSi(nextSi);
    setUi(nextUi);
    setStep(0);
    persist((prev) => ({ ...prev, at: [nextSi, nextUi] }));
  };

  const toggleTopic = (topicKey: string, checked: boolean) => {
    persist((prev) => {
      const nextDone = { ...prev.done };
      if (checked) nextDone[topicKey] = 1;
      else delete nextDone[topicKey];
      return { ...prev, done: nextDone };
    });
  };

  return (
    <div id="app" className="grid h-screen grid-cols-1 lg:grid-cols-[272px_minmax(0,1fr)_440px] grid-rows-[auto_minmax(0,1fr)]">
      <Header
        subjects={SUBJECTS}
        activeSubjectIndex={si}
        subjectDoneCount={subjectDoneCount}
        totalClearedAll={totalClearedAll}
        totalTopicsAll={totalTopicsAll}
        onSelectSubject={(idx) => selectSubjectUnit(idx, 0)}
        onOpenNotesModal={() => setNotesModalOpen(true)}
        onOpenPlanModal={() => setPlanModalOpen(true)}
      />

      <UnitSidebar
        subject={activeSubject}
        activeUnitIndex={ui}
        unitDoneCount={(uIdx) => unitDoneCount(si, uIdx)}
        onSelectUnit={(uIdx) => selectSubjectUnit(si, uIdx)}
      />

      <NotebookCanvas3D
        scene={activeScene}
        subjectShortName={activeSubject.co}
        unitIndex={ui}
        totalUnits={activeSubject.units.length}
        unitTitle={activeUnit.t}
        step={step}
        onStepChange={setStep}
      />

      <aside id="study" aria-label="Study this unit" className="border-l-2 border-ink flex flex-col min-h-0 bg-paper2">
        <div id="tabs" role="tablist" className="flex border-b-2 border-ink overflow-x-auto">
          {TABS.map((tLabel, idx) => (
            <button
              key={tLabel}
              type="button"
              role="tab"
              aria-selected={st.tab === idx}
              onClick={() => persist((prev) => ({ ...prev, tab: idx }))}
              className={st.tab === idx ? 'on' : ''}
            >
              {tLabel}
            </button>
          ))}
        </div>

        <div id="tabbody" className="overflow-y-auto flex-1 p-4 min-h-0">
          {st.tab === 0 && (
            <>
              <div className="box">
                <h4>In simple English</h4>
                <div className="note hl">{activeUnit.s}</div>
              </div>
              <div className="box">
                <h4>Step by step, with the 3D diagram</h4>
                {activeScene.steps.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setStep(idx)}
                    className={`stp ${idx === step ? 'on' : ''}`}
                  >
                    <i>{idx + 1}</i>
                    <div>
                      <b>{p.t}</b>
                      <span>{p.d}</span>
                    </div>
                  </button>
                ))}
              </div>
              {workedExample && (
                <div className="box">
                  <h4>Worked example (KaTeX)</h4>
                  <div className="we">
                    <KatexText htmlOrText={workedExample} />
                  </div>
                </div>
              )}
              <div className="box">
                <h4>Key moves to learn cold</h4>
                <ul className="keys">
                  {activeUnit.k.map((kItem, idx) => (
                    <li key={idx}>
                      <KatexText htmlOrText={kItem} />
                    </li>
                  ))}
                </ul>
              </div>
              {activeSubject.id === 'pps' && <PpsCodeRunner unitIndex={ui} />}
            </>
          )}

          {st.tab === 1 && (
            <SvgDiagramViewer diagrams={activeSubject.dg} subjectShortName={activeSubject.co} />
          )}

          {st.tab === 2 && (
            <div className="space-y-4">
              <div className="box">
                <h4>Personal Unit Notes (Synced to Prisma / IndexedDB)</h4>
                <textarea
                  rows={5}
                  value={st.customNotes[`${activeSubject.id}:${ui}`] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    persist((prev) => ({
                      ...prev,
                      customNotes: { ...prev.customNotes, [`${activeSubject.id}:${ui}`]: val },
                    }));
                  }}
                  placeholder={`Write your own revision notes, viva questions, or lecturer hints for ${activeUnit.t}...`}
                  className="w-full p-2.5 text-sm bg-paper border-[1.5px] border-ink rounded-lg"
                />
              </div>
            </div>
          )}

          {st.tab === 3 && (
            <div>
              <div className="ct">
                {activeUnit.t}: {unitDoneCount(si, ui)}/{activeUnit.topics.length} cleared
              </div>
              {activeUnit.topics.map((t, idx) => {
                const star = t.startsWith('★');
                const label = star ? t.slice(1).trim() : t;
                const key = `${activeSubject.id}:${ui}:${idx}`;
                const checked = isTopicDone(activeSubject.id, ui, idx);
                return (
                  <label key={key} className="tk">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => toggleTopic(key, e.target.checked)}
                    />
                    <span className="bx">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <span className="tx">
                      {star && <span className="st">★</span>}
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {st.tab === 4 && (
            <div>
              <div className="box">
                <h4>Almost-guaranteed questions · {activeSubject.co}</h4>
                <ul className="xq">
                  {activeSubject.ex.q.map((q, i) => (
                    <li key={i} data-m={i + 1}>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="box">
                <h4>How to answer for full marks</h4>
                <ul className="xq">
                  {activeSubject.ex.a.map((a, i) => (
                    <li key={i} data-m={i + 1}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="box">
                <h4>Traps that cost marks</h4>
                <ul className="xq trap">
                  {activeSubject.ex.x.map((x, i) => (
                    <li key={i} data-m="!">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hook">
                <small>EXAM-MORNING CHANT</small>
                {activeSubject.hook}
              </div>
            </div>
          )}

          {st.tab === 5 && (
            <AiTutorPanel
              subject={activeSubject}
              unitIndex={ui}
              stepIndex={step}
              activeStep={activeScene.steps[step] || activeScene.steps[0]}
            />
          )}
        </div>
      </aside>

      <ExamPlanModal
        open={planModalOpen}
        subjects={SUBJECTS}
        labGroup={st.lab || 'G1'}
        examDate={st.exam || ''}
        onChangeLabGroup={(g) => persist((prev) => ({ ...prev, lab: g }))}
        onChangeExamDate={(d) => persist((prev) => ({ ...prev, exam: d }))}
        onClose={() => setPlanModalOpen(false)}
      />

      <AllNotesModal
        open={notesModalOpen}
        subjects={SUBJECTS}
        onClose={() => setNotesModalOpen(false)}
      />
    </div>
  );
}
