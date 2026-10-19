'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { SUBJECTS } from '@/data/subjects';
import { SC } from '@/data/scenes';
import { WORKED } from '@/data/worked';
import { TT, WEEKS, RULES, HUE } from '@/data/schedule';
import dynamic from 'next/dynamic';
import { KatexText } from '@/components/study/KatexRenderer';
import { Header } from '@/components/study/Header';
import { UnitSidebar } from '@/components/study/UnitSidebar';

const NotebookCanvas3D = dynamic(
  () => import('@/components/canvas/NotebookCanvas3D').then((m) => m.NotebookCanvas3D),
  {
    ssr: false,
    loading: () => (
      <section id="stage" className="relative min-w-0 min-h-0 overflow-hidden h-full">
        <div id="cv" className="flex items-center justify-center bg-paper text-dim font-hand text-lg">
          Loading 3D workspace...
        </div>
        <div id="ovt" className="absolute left-4 top-3.5 pointer-events-none max-w-[52%]">
          <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-accentRed">
            LNJPIT · Mathematics &amp; Computing
          </div>
          <h1 className="font-hand text-[32px] leading-[0.95] font-bold mt-0.5 text-ink">
            Semester I in 3D
          </h1>
        </div>
        <div id="cap" className="border-t-2 border-b-2 border-ink lg:absolute lg:bottom-4 lg:left-4 lg:right-4 p-3 bg-paper2">
          <h3 className="font-hand text-xl font-bold text-ink">Step 1: Setup &amp; Principle</h3>
          <p className="text-xs md:text-sm font-sans text-ink/90 leading-relaxed">
            Interactive 3D notebook and visual intuition for B.Tech Semester I, Group A at LNJPIT Chapra.
          </p>
        </div>
      </section>
    ),
  }
);
const SvgDiagramViewer = dynamic(
  () => import('@/components/study/SvgDiagramViewer').then((m) => m.SvgDiagramViewer),
  { loading: () => <div className="p-4 text-center font-hand text-dim">Loading diagrams...</div> }
);
const PpsCodeRunner = dynamic(
  () => import('@/components/study/PpsCodeRunner').then((m) => m.PpsCodeRunner)
);
const AiTutorPanel = dynamic(
  () => import('@/components/study/AiTutorPanel').then((m) => m.AiTutorPanel),
  { loading: () => <div className="p-4 text-center font-hand text-dim">Starting AI Tutor...</div> }
);
const UnitQuiz = dynamic(
  () => import('@/components/study/UnitQuiz').then((m) => m.UnitQuiz),
  { loading: () => <div className="p-4 text-center font-hand text-dim">Loading quiz...</div> }
);
const ExamPlanModal = dynamic(
  () => import('@/components/study/ExamPlanModal').then((m) => m.ExamPlanModal)
);
const ClassesScheduledModal = dynamic(
  () => import('@/components/study/ClassesScheduledModal').then((m) => m.ClassesScheduledModal)
);
const AllNotesModal = dynamic(
  () => import('@/components/study/AllNotesModal').then((m) => m.AllNotesModal)
);
const MockTestModal = dynamic(
  () => import('@/components/study/MockTestModal').then((m) => m.MockTestModal)
);
const FlashcardsModal = dynamic(
  () => import('@/components/study/FlashcardsModal').then((m) => m.FlashcardsModal)
);
const CommandPaletteModal = dynamic(
  () => import('@/components/study/CommandPaletteModal').then((m) => m.CommandPaletteModal)
);
const FormulaSheetModal = dynamic(
  () => import('@/components/study/FormulaSheetModal').then((m) => m.FormulaSheetModal)
);
const BackupModal = dynamic(
  () => import('@/components/study/BackupModal').then((m) => m.BackupModal)
);
import { ConfidenceLevel, FlashcardProgress } from '@/types/syllabus';
import { getTopicContent, getUnitStory } from '@/data/topicContent';
import {
  DEFAULT_STUDY_STATE,
  PersistedStudyState,
  loadStudyState,
  saveStudyState,
} from '@/lib/offlineStorage';

const TABS = ['Explain', '2D Diagrams', 'Notes', 'Topics', 'Quiz', 'Exam', 'AI Tutor'] as const;

export default function SemesterOnePage() {
  const [st, setSt] = useState<PersistedStudyState>(DEFAULT_STUDY_STATE);
  const [si, setSi] = useState<number>(0);
  const [ui, setUi] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [notesModalOpen, setNotesModalOpen] = useState<boolean>(false);
  const [planModalOpen, setPlanModalOpen] = useState<boolean>(false);
  const [classesModalOpen, setClassesModalOpen] = useState<boolean>(false);
  const [mockTestModalOpen, setMockTestModalOpen] = useState<boolean>(false);
  const [flashcardsModalOpen, setFlashcardsModalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [formulaSheetModalOpen, setFormulaSheetModalOpen] = useState<boolean>(false);
  const [backupModalOpen, setBackupModalOpen] = useState<boolean>(false);
  const [diagramModal, setDiagramModal] = useState<{ svg: string; title: string; caption: string } | null>(null);
  const isLoadedRef = useRef<boolean>(false);

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
      isLoadedRef.current = true;
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

  // Pure React state updater; writes are debounced in the effect below
  const persist = useCallback((updater: (prev: PersistedStudyState) => PersistedStudyState) => {
    setSt(updater);
  }, []);

  // Phase 4: Debounced persistence effect (~500ms debounce)
  useEffect(() => {
    if (!isLoadedRef.current) return;
    const timer = setTimeout(() => {
      saveStudyState(st);
    }, 500);
    return () => clearTimeout(timer);
  }, [st]);

  // Immediate flush before tab close / unmount
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isLoadedRef.current) {
        saveStudyState(st);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [st]);

  const handleImportState = (newState: PersistedStudyState) => {
    setSt(newState);
    saveStudyState(newState);
    const validSi = Math.min(SUBJECTS.length - 1, Math.max(0, newState.at?.[0] || 0));
    const validUi = Math.min(
      SUBJECTS[validSi].units.length - 1,
      Math.max(0, newState.at?.[1] || 0)
    );
    setSi(validSi);
    setUi(validUi);
  };

  const handleResetState = () => {
    setSt(DEFAULT_STUDY_STATE);
    saveStudyState(DEFAULT_STUDY_STATE);
    setSi(0);
    setUi(0);
  };

  const activeSubject = SUBJECTS[si];
  const activeUnit = activeSubject.units[ui];
  const sceneKey = `${activeSubject.id}:${ui}`;
  const activeScene = SC[sceneKey] || {
    steps: [{ t: activeUnit.t, d: activeUnit.s }],
    build: () => {},
  };
  const workedExample = WORKED[sceneKey];
  const unitStory = getUnitStory(activeSubject.id, ui);

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
        onOpenClassesModal={() => setClassesModalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenFlashcards={() => setFlashcardsModalOpen(true)}
        onOpenMockTest={() => setMockTestModalOpen(true)}
        onOpenFormulaSheet={() => setFormulaSheetModalOpen(true)}
        onOpenBackupModal={() => setBackupModalOpen(true)}
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
          {/* TAB 0: EXPLAIN ("Understand it") */}
          {st.tab === 0 && (
            <div className="space-y-5">
              {/* 3-Part Unit Big Picture Story */}
              {unitStory ? (
                <div className="box space-y-3 bg-paper p-4 rounded-lg border-[1.5px] border-ink shadow-sketchy">
                  <h4 className="font-hand text-xl font-bold text-accentRed pb-1 border-b border-dashed border-ink/20">
                    Unit Big Picture
                  </h4>
                  <div className="space-y-2 text-xs md:text-sm text-ink/90 font-medium leading-relaxed font-sans">
                    <div>
                      <strong className="text-accentRed uppercase tracking-wider text-[11px] block font-mono">1. What It Is:</strong>
                      <p><KatexText htmlOrText={unitStory.whatItIs} /></p>
                    </div>
                    <div>
                      <strong className="text-accentRed uppercase tracking-wider text-[11px] block font-mono">2. Why It Matters:</strong>
                      <p><KatexText htmlOrText={unitStory.whyItMatters} /></p>
                    </div>
                    <div>
                      <strong className="text-accentRed uppercase tracking-wider text-[11px] block font-mono">3. How It Works:</strong>
                      <p><KatexText htmlOrText={unitStory.howItWorks} /></p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="box">
                  <h4>Unit Big Picture</h4>
                  <p className="text-sm leading-relaxed text-ink/90 font-medium font-sans">
                    <KatexText htmlOrText={activeUnit.s} />
                  </p>
                </div>
              )}

              {/* Topics with Inline 2D Hand-drawn Diagrams */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1 border-b-2 border-ink">
                  <h4 className="font-hand text-xl font-bold">Topic-by-Topic Intuition &amp; 2D Diagrams</h4>
                  <span className="text-xs text-dim font-mono">{activeUnit.topics.length} topics</span>
                </div>

                {activeUnit.topics.map((top, tIdx) => {
                  const star = top.startsWith('★');
                  const cleanTitle = star ? top.slice(1).trim() : top;
                  const topicData = getTopicContent(activeSubject.id, ui, tIdx);

                  return (
                    <div key={tIdx} className="topic-card p-3.5 bg-paper border-[1.5px] border-ink rounded-lg shadow-sketchy space-y-2.5">
                      <div className="flex items-start justify-between gap-2 pb-1 border-b border-dashed border-ink/20">
                        <h5 className="font-hand text-lg font-bold text-ink leading-snug">
                          {star && <span className="text-accentRed mr-1">★</span>}
                          {cleanTitle}
                        </h5>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-ink/30 bg-gold/10 text-dim shrink-0">
                          Topic {tIdx + 1}
                        </span>
                      </div>

                      {topicData ? (
                        <div className="text-xs md:text-sm text-ink/90 leading-relaxed font-sans space-y-1.5">
                          {topicData.explain.map((sent, sIdx) => (
                            <p key={sIdx}><KatexText htmlOrText={sent} /></p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-dim italic">Concept overview being compiled...</p>
                      )}

                      {/* Inline 2D Diagram */}
                      {topicData?.diagram && (
                        <div className="mt-2 pt-2 border-t border-dashed border-ink/20">
                          <div
                            dangerouslySetInnerHTML={{ __html: topicData.diagram.svg }}
                            className="w-full bg-paper rounded border border-ink/20 p-2 overflow-x-auto [&_svg]:w-full [&_svg]:h-auto [&_svg_.l]:stroke-[#2b2a28] [&_svg_.l]:fill-none [&_svg_.l]:stroke-[1.8] [&_svg_.a]:stroke-[#d4572b] [&_svg_.a]:fill-none [&_svg_.a]:stroke-[2.2] [&_svg_.d]:stroke-[#6b665b] [&_svg_.d]:fill-none [&_svg_.d]:stroke-dasharray-[4,3] [&_svg_.fa]:fill-[#f6e3b4] [&_svg_.fa]:stroke-[#2b2a28] [&_svg_.t]:fill-[#2b2a28] [&_svg_.t]:text-[11px] [&_svg_.ta]:fill-[#d4572b] [&_svg_.ta]:font-bold [&_svg_.ta]:text-[11.5px]"
                          />
                          <p className="text-[11px] text-dim font-hand mt-1 italic text-center">
                            Figure {ui + 1}.{tIdx + 1}: {topicData.diagram.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {workedExample && (
                <div className="box">
                  <h4>Exam Model Worked Problem</h4>
                  <div className="text-xs font-mono bg-paper p-3 rounded-lg border-[1.5px] border-ink whitespace-pre-wrap leading-relaxed">
                    <KatexText htmlOrText={workedExample} />
                  </div>
                </div>
              )}

              {activeSubject.id === 'pps' && <PpsCodeRunner unitIndex={ui} />}
            </div>
          )}

          {/* TAB 1: 2D DIAGRAMS GALLERY */}
          {st.tab === 1 && (
            <SvgDiagramViewer diagrams={activeSubject.dg} subjectShortName={activeSubject.co} />
          )}

          {/* TAB 2: NOTES ("Revise it fast, exam-ready") */}
          {st.tab === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-1 border-b-2 border-ink">
                <div>
                  <h4 className="font-hand text-2xl font-bold">Exam Revision Notes · {activeSubject.co} U{ui + 1}</h4>
                  <p className="text-xs text-dim">Structured definition, formulas, steps, diagrams &amp; marking schemes</p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="text-xs px-2.5 py-1 border-[1.5px] border-ink rounded font-hand font-bold bg-paper hover:bg-gold/20"
                >
                  Print Unit Notes
                </button>
              </div>

              {activeUnit.topics.map((top, tIdx) => {
                const star = top.startsWith('★');
                const cleanTitle = star ? top.slice(1).trim() : top;
                const topicData = getTopicContent(activeSubject.id, ui, tIdx);

                return (
                  <div key={tIdx} className="topic-card p-4 bg-paper border-[1.5px] border-ink rounded-lg shadow-sketchy space-y-3 font-sans">
                    <div className="flex items-baseline justify-between border-b border-dashed border-ink/30 pb-1">
                      <h5 className="font-hand text-xl font-bold text-ink">
                        {star && <span className="text-accentRed mr-1">★</span>}
                        {cleanTitle}
                      </h5>
                      <span className="text-[11px] font-mono text-dim">Topic {tIdx + 1}</span>
                    </div>

                    {topicData ? (
                      <div className="space-y-3 text-xs md:text-sm">
                        {/* 1. Definition (1 line) */}
                        <div>
                          <span className="font-bold text-accentRed uppercase tracking-wider text-[11px] block font-mono">
                            1. DEFINITION
                          </span>
                          <p className="font-medium text-ink/90 leading-relaxed">
                            <KatexText htmlOrText={topicData.definition} />
                          </p>
                        </div>

                        {/* 2. Formula or rule (boxed) */}
                        {topicData.formula && (
                          <div>
                            <span className="font-bold text-dim uppercase tracking-wider text-[11px] block font-mono">
                              2. FORMULA / RULE
                            </span>
                            <div className="p-2 bg-gold/10 border-[1.5px] border-ink rounded font-mono text-xs my-1">
                              <KatexText htmlOrText={topicData.formula} />
                            </div>
                          </div>
                        )}

                        {/* 3. Derivation or procedure steps */}
                        {topicData.steps && topicData.steps.length > 0 && (
                          <div>
                            <span className="font-bold text-dim uppercase tracking-wider text-[11px] block font-mono">
                              3. STEP-BY-STEP PROCEDURE / DERIVATION
                            </span>
                            <ul className="space-y-1 list-none pl-1 text-ink/90 text-xs">
                              {topicData.steps.map((stItem, sIdx) => (
                                <li key={sIdx} className="leading-relaxed">
                                  <KatexText htmlOrText={stItem} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* 4. 2D Diagram */}
                        {topicData.diagram && (
                          <div>
                            <span className="font-bold text-dim uppercase tracking-wider text-[11px] block font-mono">
                              4. EXAM DIAGRAM
                            </span>
                            <div
                              dangerouslySetInnerHTML={{ __html: topicData.diagram.svg }}
                              className="w-full bg-paper rounded border border-ink/20 p-2 my-1 overflow-x-auto [&_svg]:w-full [&_svg]:h-auto [&_svg_.l]:stroke-[#2b2a28] [&_svg_.l]:fill-none [&_svg_.l]:stroke-[1.8] [&_svg_.a]:stroke-[#d4572b] [&_svg_.a]:fill-none [&_svg_.a]:stroke-[2.2] [&_svg_.d]:stroke-[#6b665b] [&_svg_.d]:fill-none [&_svg_.d]:stroke-dasharray-[4,3] [&_svg_.fa]:fill-[#f6e3b4] [&_svg_.fa]:stroke-[#2b2a28] [&_svg_.t]:fill-[#2b2a28] [&_svg_.t]:text-[11px] [&_svg_.ta]:fill-[#d4572b] [&_svg_.ta]:font-bold [&_svg_.ta]:text-[11.5px]"
                            />
                          </div>
                        )}

                        {/* 5. Write this for full marks */}
                        <div>
                          <span className="font-bold text-accentTeal uppercase tracking-wider text-[11px] block font-mono">
                            5. WRITE THIS FOR FULL MARKS
                          </span>
                          <ul className="list-disc list-inside space-y-0.5 text-xs text-ink/90">
                            {topicData.examAnswer.map((ans, aIdx) => (
                              <li key={aIdx}><KatexText htmlOrText={ans} /></li>
                            ))}
                          </ul>
                        </div>

                        {/* 6. Common slip */}
                        <div className="p-2 bg-accentRed/10 border-l-2 border-accentRed rounded-r text-xs text-accentRed font-medium">
                          <span className="font-bold font-mono uppercase text-[10px] block">COMMON EXAM SLIP:</span>
                          {topicData.slip}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-dim italic">Notes being compiled for this topic...</p>
                    )}
                  </div>
                );
              })}

              {/* Free text personal notes */}
              <div className="box mt-6">
                <h4>Personal Student Notes (Synced to IndexedDB / Prisma)</h4>
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
                  placeholder={`Add personal lecturer tips, worked steps or doubts for ${activeUnit.t}...`}
                  className="w-full p-2.5 text-base font-hand bg-paper border-[1.5px] border-ink rounded-lg"
                />
              </div>
            </div>
          )}

          {/* TAB 3: TOPICS (Checklist + Diagram Thumbnails) */}
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
                const topicData = getTopicContent(activeSubject.id, ui, idx);

                return (
                  <div key={key} className="flex items-center justify-between gap-1 py-1.5 px-2 rounded hover:bg-gold/10 transition-colors">
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

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Diagram thumbnail button */}
                      {topicData?.diagram && (
                        <button
                          type="button"
                          onClick={() =>
                            setDiagramModal({
                              svg: topicData.diagram.svg,
                              title: label,
                              caption: topicData.diagram.caption,
                            })
                          }
                          className="px-1.5 py-0.5 text-[10px] font-mono border border-ink/30 rounded bg-paper hover:bg-gold/20 text-dim hover:text-ink"
                          title="Preview 2D Diagram"
                        >
                          2D Diagram
                        </button>
                      )}

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
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: QUIZ */}
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

          {/* TAB 5: EXAM */}
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

          {/* TAB 6: AI TUTOR */}
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
        onOpenClasses={() => setClassesModalOpen(true)}
        onOpenNotes={() => setNotesModalOpen(true)}
        onOpenFormulaSheet={() => setFormulaSheetModalOpen(true)}
        onOpenBackup={() => setBackupModalOpen(true)}
      />

      <FormulaSheetModal
        open={formulaSheetModalOpen}
        subjects={SUBJECTS}
        onClose={() => setFormulaSheetModalOpen(false)}
      />

      <BackupModal
        open={backupModalOpen}
        onClose={() => setBackupModalOpen(false)}
        currentState={st}
        onImportState={handleImportState}
        onResetState={handleResetState}
      />

      <ClassesScheduledModal
        open={classesModalOpen}
        labGroup={st.lab || 'G1'}
        onChangeLabGroup={(g) => persist((prev) => ({ ...prev, lab: g }))}
        onClose={() => setClassesModalOpen(false)}
      />

      {/* Lightbox Diagram Preview Modal */}
      {diagramModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setDiagramModal(null)}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-paper border-2 border-ink rounded-xl p-5 shadow-2xl space-y-3 font-sans text-ink"
          >
            <div className="flex items-center justify-between border-b border-dashed border-ink/30 pb-2">
              <h3 className="font-hand text-2xl font-bold text-accentRed">
                {diagramModal.title}
              </h3>
              <button
                type="button"
                onClick={() => setDiagramModal(null)}
                className="text-2xl font-bold text-dim hover:text-ink leading-none px-2"
                aria-label="Close diagram preview"
              >
                ✕
              </button>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: diagramModal.svg }}
              className="w-full bg-paper rounded border border-ink/20 p-3 overflow-x-auto [&_svg]:w-full [&_svg]:h-auto [&_svg_.l]:stroke-[#2b2a28] [&_svg_.l]:fill-none [&_svg_.l]:stroke-[1.8] [&_svg_.a]:stroke-[#d4572b] [&_svg_.a]:fill-none [&_svg_.a]:stroke-[2.2] [&_svg_.d]:stroke-[#6b665b] [&_svg_.d]:fill-none [&_svg_.d]:stroke-dasharray-[4,3] [&_svg_.fa]:fill-[#f6e3b4] [&_svg_.fa]:stroke-[#2b2a28] [&_svg_.t]:fill-[#2b2a28] [&_svg_.t]:text-[11px] [&_svg_.ta]:fill-[#d4572b] [&_svg_.ta]:font-bold [&_svg_.ta]:text-[11.5px]"
            />
            <p className="text-xs font-hand text-dim italic text-center">
              {diagramModal.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
