'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
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
          <div className="text-xs font-mono font-bold tracking-[0.12em] uppercase text-accentRed">
            LNJPIT · Mathematics &amp; Computing
          </div>
          <h1 className="font-hand text-[30px] leading-[1.0] font-bold mt-0.5 text-ink">
            Semester I in 3D
          </h1>
        </div>
        <div id="cap" className="border-t-2 border-b-2 border-ink lg:absolute lg:bottom-4 lg:left-4 lg:right-4 p-3 bg-paper2">
          <h3 className="font-hand text-2xl font-bold text-ink">Step 1: Setup &amp; Principle</h3>
          <p className="text-base font-sans text-ink/90 leading-relaxed">
            Interactive 3D notebook and visual intuition for B.Tech Semester I, Group A at LNJPIT Chapra.
          </p>
        </div>
      </section>
    ),
  }
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
  UnitViewState,
  loadStudyState,
  saveStudyState,
} from '@/lib/offlineStorage';
import { UnitDiagramItem } from '@/components/study/SvgDiagramViewer';

const TABS = ['Explain', 'Notes', 'Topics', 'Quiz', 'Exam', 'AI Tutor'] as const;

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
      let validSi = Math.min(SUBJECTS.length - 1, Math.max(0, loaded.at?.[0] || 0));
      let validUi = Math.min(
        SUBJECTS[validSi].units.length - 1,
        Math.max(0, loaded.at?.[1] || 0)
      );

      // Deep link parsing from URL search query
      let deepMode: '3d' | '2d' | null = null;
      let deepStep: number | null = null;
      if (typeof window !== 'undefined' && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const pSub = params.get('subject');
        const pUnit = params.get('unit');
        const pView = params.get('view');
        const pStep = params.get('step');

        if (pSub) {
          const foundSi = SUBJECTS.findIndex((s) => s.id === pSub || s.code === pSub);
          if (foundSi !== -1) validSi = foundSi;
        }
        if (pUnit) {
          const num = parseInt(pUnit, 10);
          if (!isNaN(num)) {
            if (num >= 1 && num <= SUBJECTS[validSi].units.length) validUi = num - 1;
            else if (num === 0) validUi = 0;
          }
        }
        if (pView === '2d' || pView === '3d') {
          deepMode = pView;
        }
        if (pStep) {
          const sNum = parseInt(pStep, 10);
          if (!isNaN(sNum)) {
            if (sNum >= 1) deepStep = sNum - 1;
            else if (sNum === 0) deepStep = 0;
          }
        }
      }

      setSi(validSi);
      setUi(validUi);

      if (deepMode || deepStep !== null) {
        const sKey = `${SUBJECTS[validSi].id}:${validUi}`;
        setSt((prev) => {
          const existing = prev.unitViews?.[sKey];
          return {
            ...prev,
            unitViews: {
              ...(prev.unitViews || {}),
              [sKey]: {
                mode: deepMode || existing?.mode || '3d',
                step: deepStep !== null ? deepStep : (existing?.step ?? 0),
                camera: existing?.camera || { yaw: -0.55, pitch: 0.3, zoom: 1 },
                sliderValues: existing?.sliderValues || {},
                diagramIndex: existing?.diagramIndex || 0,
              },
            },
          };
        });
      }

      // Auto-enable battery saver on low-power mobile devices
      if (
        typeof window !== 'undefined' &&
        navigator.hardwareConcurrency &&
        navigator.hardwareConcurrency <= 4 &&
        window.innerWidth < 600
      ) {
        setSt((prev) => (prev.batterySaver ? prev : { ...prev, batterySaver: true }));
      }

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
  const activeScene = useMemo(() => {
    return (
      SC[sceneKey] || {
        steps: [{ t: activeUnit.t, d: activeUnit.s }],
        build: () => {},
      }
    );
  }, [sceneKey, activeUnit.t, activeUnit.s]);
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

  // Unit-level view state (mode, step, camera, sliderValues, diagramIndex)
  const currentUnitView = useMemo<UnitViewState>(() => {
    const saved = st.unitViews?.[sceneKey];
    if (saved) return saved;
    const initParams: Record<string, number> = {};
    if (activeScene.params) {
      for (const p of activeScene.params) {
        initParams[p.id] = p.defaultVal;
      }
    }
    return {
      mode: '3d',
      step: 0,
      camera: {
        yaw: activeScene.cam?.yaw ?? -0.55,
        pitch: activeScene.cam?.pitch ?? 0.3,
        zoom: activeScene.cam?.zoom ?? 1,
      },
      sliderValues: initParams,
      diagramIndex: 0,
    };
  }, [st.unitViews, sceneKey, activeScene]);

  const updateUnitView = useCallback(
    (patch: Partial<UnitViewState>) => {
      persist((prev) => {
        const existing = prev.unitViews?.[sceneKey] || currentUnitView;
        const updated = { ...existing, ...patch };
        return {
          ...prev,
          unitViews: {
            ...(prev.unitViews || {}),
            [sceneKey]: updated,
          },
        };
      });
    },
    [sceneKey, currentUnitView, persist]
  );

  // Sync deep link query params to URL without reloading
  useEffect(() => {
    if (!isLoadedRef.current || typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('subject', activeSubject.id);
    url.searchParams.set('unit', String(ui + 1));
    url.searchParams.set('view', currentUnitView.mode);
    url.searchParams.set('step', String(currentUnitView.step + 1));
    window.history.replaceState(null, '', url.toString());
  }, [activeSubject.id, ui, currentUnitView.mode, currentUnitView.step]);

  // Current unit diagrams from topicContent in syllabus order
  const currentUnitDiagrams = useMemo<UnitDiagramItem[]>(() => {
    const list: UnitDiagramItem[] = [];
    activeUnit.topics.forEach((tStr, tIdx) => {
      const tc = getTopicContent(activeSubject.id, ui, tIdx);
      if (tc?.diagram?.svg) {
        list.push({
          title: tStr.replace(/^★\s*/, ''),
          svg: tc.diagram.svg,
          caption: tc.diagram.caption || tStr,
          redrawLabelMap: tc.diagram.redrawLabelMap,
        });
      }
    });
    if (list.length === 0 && activeSubject.dg && activeSubject.dg.length > 0) {
      activeSubject.dg.forEach((dg, i) => {
        list.push({
          title: `${activeSubject.co} Exam Diagram #${i + 1}`,
          svg: dg.svg,
          caption: dg.c,
        });
      });
    }
    return list;
  }, [activeSubject, ui, activeUnit]);

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

  // Close lightbox diagram preview on Escape
  useEffect(() => {
    if (!diagramModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDiagramModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [diagramModal]);

  return (
    <div id="app" className="grid h-screen grid-cols-1 lg:grid-cols-[272px_minmax(0,1fr)_440px] grid-rows-[auto_minmax(0,1fr)]">
      <a
        href="#study"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded-md focus:border-2 focus:border-gold font-bold shadow-lg"
      >
        Skip to study content
      </a>
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
        mode={currentUnitView.mode}
        onModeChange={(m) => updateUnitView({ mode: m })}
        step={currentUnitView.step}
        onStepChange={(s) => updateUnitView({ step: s })}
        camera={currentUnitView.camera}
        onCameraChange={(c) => updateUnitView({ camera: c })}
        sliderValues={currentUnitView.sliderValues}
        onSliderValuesChange={(vals) => updateUnitView({ sliderValues: vals })}
        diagramIndex={currentUnitView.diagramIndex}
        onDiagramIndexChange={(idx) => updateUnitView({ diagramIndex: idx })}
        unitDiagrams={currentUnitDiagrams}
        diagrams={activeSubject.dg}
        batterySaver={st.batterySaver ?? false}
        onToggleBatterySaver={() => persist((prev) => ({ ...prev, batterySaver: !prev.batterySaver }))}
      />

      <aside id="study" aria-label="Study this unit" className="border-l-2 border-ink flex flex-col min-h-0 bg-paper2">
        <div id="tabs" role="tablist" className="flex border-b-2 border-ink overflow-x-auto">
          {TABS.map((tLabel, idx) => {
            const activeTab = Math.min(st.tab, TABS.length - 1);
            return (
              <button
                key={tLabel}
                type="button"
                role="tab"
                aria-selected={activeTab === idx}
                onClick={() => persist((prev) => ({ ...prev, tab: idx }))}
                className={activeTab === idx ? 'on' : ''}
              >
                {tLabel}
              </button>
            );
          })}
        </div>

        <div id="tab-content" className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 0: EXPLAIN ("Understand it") */}
          {Math.min(st.tab, TABS.length - 1) === 0 && (
            <div className="space-y-5">
              {/* 3-Part Unit Big Picture Story */}
              {unitStory ? (
                <div className="box space-y-3 bg-paper p-4 rounded-lg border-[1.5px] border-ink shadow-sketchy">
                  <h4 className="font-hand text-xl font-bold text-accentRed pb-1 border-b border-dashed border-ink/20">
                    Unit Big Picture
                  </h4>
                  <div className="space-y-2 text-base text-ink/90 font-normal leading-relaxed font-sans">
                    <div>
                      <strong className="text-accentRed uppercase tracking-wider text-xs block font-mono font-bold">1. What It Is:</strong>
                      <p><KatexText htmlOrText={unitStory.whatItIs} /></p>
                    </div>
                    <div>
                      <strong className="text-accentRed uppercase tracking-wider text-xs block font-mono font-bold">2. Why It Matters:</strong>
                      <p><KatexText htmlOrText={unitStory.whyItMatters} /></p>
                    </div>
                    <div>
                      <strong className="text-accentRed uppercase tracking-wider text-xs block font-mono font-bold">3. How It Works:</strong>
                      <p><KatexText htmlOrText={unitStory.howItWorks} /></p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="box">
                  <h4>Unit Big Picture</h4>
                  <p className="text-base leading-relaxed text-ink/90 font-normal font-sans">
                    <KatexText htmlOrText={activeUnit.s} />
                  </p>
                </div>
              )}

              {/* Topics with Inline 2D Hand-drawn Diagrams */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1 border-b-2 border-ink">
                  <h4 className="font-hand text-xl font-bold">Topic-by-Topic Intuition &amp; 2D Diagrams</h4>
                  <span className="text-sm text-dim font-mono">{activeUnit.topics.length} topics</span>
                </div>

                {activeUnit.topics.map((top, tIdx) => {
                  const star = top.startsWith('★');
                  const cleanTitle = star ? top.slice(1).trim() : top;
                  const topicData = getTopicContent(activeSubject.id, ui, tIdx);

                  return (
                    <div key={tIdx} className="topic-card p-3.5 bg-paper border-[1.5px] border-ink rounded-lg shadow-sketchy space-y-2.5">
                      <div className="flex items-start justify-between gap-2 pb-1 border-b border-dashed border-ink/20">
                        <h5 className="font-hand text-xl font-bold text-ink leading-snug">
                          {star && <span className="text-accentRed mr-1">★</span>}
                          {cleanTitle}
                        </h5>
                        <span className="text-xs font-mono px-2 py-0.5 rounded border border-ink/30 bg-gold/10 text-dim shrink-0">
                          Topic {tIdx + 1}
                        </span>
                      </div>

                      {topicData ? (
                        <div className="text-base text-ink/90 leading-relaxed font-sans space-y-2">
                          {topicData.explain.map((sent, sIdx) => (
                            <p key={sIdx}><KatexText htmlOrText={sent} /></p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-dim not-italic">Concept overview being compiled...</p>
                      )}

                      {/* Inline 2D Diagram */}
                      {topicData?.diagram && (
                        <div className="mt-2 pt-2 border-t border-dashed border-ink/20">
                          <div
                            dangerouslySetInnerHTML={{ __html: topicData.diagram.svg }}
                            className="w-full bg-paper rounded border border-ink/20 p-2 overflow-x-auto [&_svg]:w-full [&_svg]:h-auto [&_svg_.l]:stroke-[#2b2a28] [&_svg_.l]:fill-none [&_svg_.l]:stroke-[1.8] [&_svg_.a]:stroke-[#c85025] [&_svg_.a]:fill-none [&_svg_.a]:stroke-[2.2] [&_svg_.d]:stroke-[#6b665b] [&_svg_.d]:fill-none [&_svg_.d]:stroke-dasharray-[4,3] [&_svg_.fa]:fill-[#f6e3b4] [&_svg_.fa]:stroke-[#2b2a28] [&_svg_.t]:fill-[#2b2a28] [&_svg_.t]:text-[13px] [&_svg_.ta]:fill-[#c85025] [&_svg_.ta]:font-bold [&_svg_.ta]:text-[13.5px]"
                          />
                          <p className="text-sm text-dim font-hand mt-1 not-italic text-center">
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
                  <div className="text-sm md:text-base font-mono bg-paper p-3.5 rounded-lg border-[1.5px] border-ink whitespace-pre-wrap leading-relaxed">
                    <KatexText htmlOrText={workedExample} />
                  </div>
                </div>
              )}

              {activeSubject.id === 'pps' && <PpsCodeRunner unitIndex={ui} />}
            </div>
          )}

          {/* TAB 1: NOTES ("Revise it fast, exam-ready") */}
          {Math.min(st.tab, TABS.length - 1) === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-1 border-b-2 border-ink">
                <div>
                  <h4 className="font-hand text-2xl font-bold">Exam Revision Notes · {activeSubject.co} U{ui + 1}</h4>
                  <p className="text-sm text-dim">Structured definition, formulas, steps, diagrams &amp; marking schemes</p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="text-sm px-3 py-1 border-[1.5px] border-ink rounded font-hand font-bold bg-paper hover:bg-gold/20"
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
                      <span className="text-xs font-mono text-dim">Topic {tIdx + 1}</span>
                    </div>

                    {topicData ? (
                      <div className="space-y-3.5 text-base">
                        {/* 1. Definition (1 line) */}
                        <div>
                          <span className="font-bold text-accentRed uppercase tracking-wider text-xs block font-mono">
                            1. DEFINITION
                          </span>
                          <p className="font-normal text-ink/90 leading-relaxed">
                            <KatexText htmlOrText={topicData.definition} />
                          </p>
                        </div>

                        {/* 2. Formula or rule (boxed) */}
                        {topicData.formula && (
                          <div>
                            <span className="font-bold text-dim uppercase tracking-wider text-xs block font-mono">
                              2. FORMULA / RULE
                            </span>
                            <div className="p-2.5 bg-gold/10 border-[1.5px] border-ink rounded font-mono text-base my-1.5">
                              <KatexText htmlOrText={topicData.formula} />
                            </div>
                          </div>
                        )}

                        {/* 3. Derivation or procedure steps */}
                        {topicData.steps && topicData.steps.length > 0 && (
                          <div>
                            <span className="font-bold text-dim uppercase tracking-wider text-xs block font-mono">
                              3. STEP-BY-STEP PROCEDURE / DERIVATION
                            </span>
                            <ul className="space-y-1.5 list-none pl-1 text-ink/90 text-base">
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
                            <span className="font-bold text-dim uppercase tracking-wider text-xs block font-mono">
                              4. EXAM DIAGRAM
                            </span>
                            <div
                              dangerouslySetInnerHTML={{ __html: topicData.diagram.svg }}
                              className="w-full bg-paper rounded border border-ink/20 p-2 my-1 overflow-x-auto [&_svg]:w-full [&_svg]:h-auto [&_svg_.l]:stroke-[#2b2a28] [&_svg_.l]:fill-none [&_svg_.l]:stroke-[1.8] [&_svg_.a]:stroke-[#c85025] [&_svg_.a]:fill-none [&_svg_.a]:stroke-[2.2] [&_svg_.d]:stroke-[#6b665b] [&_svg_.d]:fill-none [&_svg_.d]:stroke-dasharray-[4,3] [&_svg_.fa]:fill-[#f6e3b4] [&_svg_.fa]:stroke-[#2b2a28] [&_svg_.t]:fill-[#2b2a28] [&_svg_.t]:text-[13px] [&_svg_.ta]:fill-[#c85025] [&_svg_.ta]:font-bold [&_svg_.ta]:text-[13.5px]"
                            />
                          </div>
                        )}

                        {/* 5. Write this for full marks */}
                        <div>
                          <span className="font-bold text-accentTeal uppercase tracking-wider text-xs block font-mono">
                            5. WRITE THIS FOR FULL MARKS
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-base text-ink/90">
                            {topicData.examAnswer.map((ans, aIdx) => (
                              <li key={aIdx}><KatexText htmlOrText={ans} /></li>
                            ))}
                          </ul>
                        </div>

                        {/* 6. Common slip */}
                        <div className="p-2.5 bg-accentRed/10 border-l-2 border-accentRed rounded-r text-sm md:text-base text-accentRed font-normal">
                          <span className="font-bold font-mono uppercase text-xs block">COMMON EXAM SLIP:</span>
                          {topicData.slip}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-dim not-italic">Notes being compiled for this topic...</p>
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

          {/* TAB 2: TOPICS (Checklist + Diagram Thumbnails) */}
          {Math.min(st.tab, TABS.length - 1) === 2 && (
            <div>
              <div className="ct flex items-center justify-between">
                <span className="font-medium">{activeUnit.t}: {unitDoneCount(si, ui)}/{activeUnit.topics.length} cleared</span>
                <span className="text-xs text-dim normal-case">
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
                      <span className="tx text-base">
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
                          className="px-2 py-0.5 text-xs font-mono border border-ink/30 rounded bg-paper hover:bg-gold/20 text-dim hover:text-ink"
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

          {/* TAB 3: QUIZ */}
          {Math.min(st.tab, TABS.length - 1) === 3 && (
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

          {/* TAB 4: EXAM */}
          {Math.min(st.tab, TABS.length - 1) === 4 && (
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

          {/* TAB 5: AI TUTOR */}
          {Math.min(st.tab, TABS.length - 1) === 5 && (
            <AiTutorPanel
              subject={activeSubject}
              unitIndex={ui}
              stepIndex={currentUnitView.step}
              activeStep={activeScene.steps[currentUnitView.step] || activeScene.steps[0]}
              onSelectUnit={(idx) => selectSubjectUnit(si, idx)}
              onOpenNotes={() => persist((prev) => ({ ...prev, tab: 1 }))}
              onOpenQuiz={() => persist((prev) => ({ ...prev, tab: 3 }))}
              onSaveNote={(noteText) => {
                const key = `${activeSubject.id}:${ui}`;
                persist((prev) => {
                  const existing = prev.customNotes[key] || '';
                  const updated = existing
                    ? `${existing}\n\n---\n**AI Tutor Solution:**\n${noteText}`
                    : `**AI Tutor Solution:**\n${noteText}`;
                  return {
                    ...prev,
                    customNotes: {
                      ...prev.customNotes,
                      [key]: updated,
                    },
                  };
                });
              }}
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
        onOpenTutor={() => persist((prev) => ({ ...prev, tab: 6 }))}
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
          aria-labelledby="diagram-modal-title"
          onClick={() => setDiagramModal(null)}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-paper border-2 border-ink rounded-xl p-5 shadow-2xl space-y-3 font-sans text-ink"
          >
            <div className="flex items-center justify-between border-b border-dashed border-ink/30 pb-2">
              <h3 id="diagram-modal-title" className="font-hand text-2xl font-bold text-accentRed">
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
              className="w-full bg-paper rounded border border-ink/20 p-3 overflow-x-auto [&_svg]:w-full [&_svg]:h-auto [&_svg_.l]:stroke-[#2b2a28] [&_svg_.l]:fill-none [&_svg_.l]:stroke-[1.8] [&_svg_.a]:stroke-[#c85025] [&_svg_.a]:fill-none [&_svg_.a]:stroke-[2.2] [&_svg_.d]:stroke-[#555046] [&_svg_.d]:fill-none [&_svg_.d]:stroke-dasharray-[4,3] [&_svg_.fa]:fill-[#f6e3b4] [&_svg_.fa]:stroke-[#2b2a28] [&_svg_.t]:fill-[#2b2a28] [&_svg_.t]:text-xs [&_svg_.ta]:fill-[#c85025] [&_svg_.ta]:font-bold [&_svg_.ta]:text-xs"
            />
            <p className="text-sm font-hand text-dim not-italic text-center">
              {diagramModal.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
