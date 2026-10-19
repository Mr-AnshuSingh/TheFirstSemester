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
import { UnitQuiz } from '@/components/study/UnitQuiz';
import { MockTestModal } from '@/components/study/MockTestModal';
import { FlashcardsModal } from '@/components/study/FlashcardsModal';
import { CommandPaletteModal } from '@/components/study/CommandPaletteModal';
import { FormulaSheetModal } from '@/components/study/FormulaSheetModal';
import { ConfidenceLevel, FlashcardProgress } from '@/types/syllabus';
import {
  DEFAULT_STUDY_STATE,
  PersistedStudyState,
  loadStudyState,
  saveStudyStateOptimistic,
} from '@/lib/offlineStorage';

const TABS = ['Explain', '2D Diagrams', 'Notes', 'Topics', 'Quiz', 'Exam', 'AI Tutor'] as const;

export default function SemesterOnePage() {
  const [st, setSt] = useState<PersistedStudyState>(DEFAULT_STUDY_STATE);
  const [si, setSi] = useState<number>(0);
  const [ui, setUi] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [notesModalOpen, setNotesModalOpen] = useState<boolean>(false);
  const [planModalOpen, setPlanModalOpen] = useState<boolean>(false);
  const [mockTestModalOpen, setMockTestModalOpen] = useState<boolean>(false);
  const [flashcardsModalOpen, setFlashcardsModalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [formulaSheetModalOpen, setFormulaSheetModalOpen] = useState<boolean>(false);

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

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const getTopicConfidence = (subId: string, uIdx: number, tIdx: number): ConfidenceLevel =>
    st.confidence?.[`${subId}:${uIdx}:${tIdx}`] ?? 0;

  const cycleTopicConfidence = (subId: string, uIdx: number, tIdx: number) => {
    const key = `${subId}:${uIdx}:${tIdx}`;
    const cur = getTopicConfidence(subId, uIdx, tIdx);
    const next: ConfidenceLevel = cur === 0 ? 1 : cur === 1 ? 2 : 0;
    persist((prev) => {
      const nextConf = { ...(prev.confidence || {}) };
      if (next === 0) delete nextConf[key];
      else nextConf[key] = next;

      // If marked Mastered (2), auto-mark done
      const nextDone = { ...prev.done };
      if (next === 2) nextDone[key] = 1;

      return { ...prev, confidence: nextConf, done: nextDone };
    });
  };

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

  const handleUpdateFlashcardProgress = (cardId: string, prog: FlashcardProgress) => {
    persist((prev) => ({
      ...prev,
      flashcards: {
        ...(prev.flashcards || {}),
        [cardId]: prog,
      },
    }));
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
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenFlashcards={() => setFlashcardsModalOpen(true)}
        onOpenMockTest={() => setMockTestModalOpen(true)}
        onOpenFormulaSheet={() => setFormulaSheetModalOpen(true)}
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

        <div id="tab-content" className="flex-1 overflow-y-auto p-4 space-y-4">
          {st.tab === 0 && (
            <>
              <div className="box">
                <h4>Unit Core Intuition</h4>
                <p className="text-sm leading-relaxed text-ink/90 font-medium font-sans">
                  <KatexText htmlOrText={activeUnit.s} />
                </p>
              </div>
              {workedExample && (
                <div className="box">
                  <h4>Exam Model Worked Problem</h4>
                  <div className="text-xs font-mono bg-paper p-3 rounded-lg border-[1.5px] border-ink whitespace-pre-wrap leading-relaxed">
                    <KatexText htmlOrText={workedExample} />
                  </div>
                </div>
              )}
              <div className="box">
                <h4>High-Yield Key Takeaways</h4>
                <ul className="text-xs space-y-1.5 list-disc list-inside text-ink/90 font-mono">
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
                  rows={6}
                  value={st.customNotes[`${activeSubject.id}:${ui}`] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    persist((prev) => ({
                      ...prev,
                      customNotes: { ...prev.customNotes, [`${activeSubject.id}:${ui}`]: val },
                    }));
                  }}
                  placeholder={`Write your revision notes, viva insights, or teacher tips for ${activeUnit.t}...`}
                  className="w-full p-2.5 text-sm bg-paper border-[1.5px] border-ink rounded-lg font-hand text-base"
                />
              </div>
            </div>
          )}

          {st.tab === 3 && (
            <div>
              <div className="ct flex items-center justify-between">
                <span>{activeUnit.t}: {unitDoneCount(si, ui)}/{activeUnit.topics.length} cleared</span>
                <span className="text-[11px] text-dim normal-case">
                  Dot: ○ Unstudied · ◐ Familiar · ● Mastered
                </span>
              </div>
              {activeUnit.topics.map((t, idx) => {
                const star = t.startsWith('★');
                const label = star ? t.slice(1).trim() : t;
                const key = `${activeSubject.id}:${ui}:${idx}`;
                const checked = isTopicDone(activeSubject.id, ui, idx);
                const conf = getTopicConfidence(activeSubject.id, ui, idx);

                return (
                  <div key={key} className="flex items-center justify-between gap-1 py-1 px-1.5 rounded hover:bg-gold/10">
                    <label className="tk flex-1 cursor-pointer">
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
                      <span className="tx text-sm">
                        {star && <span className="st">★</span>}
                        {label}
                      </span>
                    </label>

                    {/* 3-State Confidence Dot */}
                    <button
                      type="button"
                      onClick={() => cycleTopicConfidence(activeSubject.id, ui, idx)}
                      className="w-6 h-6 rounded-full flex items-center justify-center border-[1.5px] border-ink bg-paper hover:bg-gold/20 shrink-0 transition-colors"
                      title={
                        conf === 2
                          ? 'Mastered (click to reset)'
                          : conf === 1
                          ? 'Familiar (click for Mastered)'
                          : 'Unstudied (click for Familiar)'
                      }
                      aria-label="Toggle confidence rating"
                    >
                      {conf === 2 ? (
                        <span className="w-3.5 h-3.5 rounded-full bg-accentTeal block" />
                      ) : conf === 1 ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-gold block" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-ink/25 block" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {st.tab === 4 && (
            <UnitQuiz
              subject={activeSubject}
              unitIndex={ui}
              onLaunchMockTest={() => setMockTestModalOpen(true)}
              onRecordResult={(qId, isCorrect) => {
                if (!isCorrect) {
                  persist((prev) => ({
                    ...prev,
                    weakSpots: {
                      ...(prev.weakSpots || {}),
                      [qId]: ((prev.weakSpots || {})[qId] || 0) + 1,
                    },
                  }));
                }
              }}
            />
          )}

          {st.tab === 5 && (
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

          {st.tab === 6 && (
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

      <MockTestModal
        open={mockTestModalOpen}
        onClose={() => setMockTestModalOpen(false)}
        onRecordWeakSpots={(weakList) => {
          persist((prev) => {
            const nextWeak = { ...(prev.weakSpots || {}) };
            weakList.forEach((w) => {
              const k = `${w.subjectId}:${w.unitIndex}`;
              nextWeak[k] = (nextWeak[k] || 0) + 1;
            });
            return { ...prev, weakSpots: nextWeak };
          });
        }}
      />

      <FlashcardsModal
        open={flashcardsModalOpen}
        subjects={SUBJECTS}
        progressMap={st.flashcards || {}}
        onUpdateProgress={handleUpdateFlashcardProgress}
        onClose={() => setFlashcardsModalOpen(false)}
      />

      <CommandPaletteModal
        open={commandPaletteOpen}
        subjects={SUBJECTS}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectSubjectUnit={(sIdx, uIdx) => selectSubjectUnit(sIdx, uIdx)}
        onOpenMockTest={() => setMockTestModalOpen(true)}
        onOpenFlashcards={() => setFlashcardsModalOpen(true)}
        onOpenPlan={() => setPlanModalOpen(true)}
        onOpenNotes={() => setNotesModalOpen(true)}
        onOpenFormulaSheet={() => setFormulaSheetModalOpen(true)}
      />

      <FormulaSheetModal
        open={formulaSheetModalOpen}
        subjects={SUBJECTS}
        onClose={() => setFormulaSheetModalOpen(false)}
      />
    </div>
  );
}
