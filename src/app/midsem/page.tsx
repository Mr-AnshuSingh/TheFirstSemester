'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Play,
  Sliders,
  Target,
  Wrench,
} from 'lucide-react';
import './midsem.css';
import {
  BEU_REAL_PAPERS_2026,
  MIDSEM_DATA,
  type BeuPaper,
  type MidsemCourse,
  type MidsemUnit,
} from '@/data/midsemNotes';
import { MIDSEM_MCQS, type MidsemMcq } from '@/data/midsemMCQs';
import { MIDSEM_DIAGRAMS, type MidsemDiagram } from '@/data/midsemDiagrams';
import { LNJPIT_EXAM_NOTICE, LNJPIT_EXAM_SITTINGS, type ExamSitting } from '@/data/midsemTimetable';
import { MIDSEM_PRACTICE_QUESTIONS, type MidsemPracticeItem } from '@/data/midsemPracticeQues';
import {
  formatSittingShortDate,
  formatTimeRemaining,
  getDisplaySubjectShort,
  MIDSEM_MODES,
  MODE_GROUP_META,
  normalizeMode,
  normalizeSubjectCode,
  normalizeUnitNumber,
  pickSubjectSitting,
  PORTAL_STORAGE_KEY,
  type MidsemMode,
  type ModeGroupId,
  type PersistedPortalState,
} from '@/components/midsem/midsemTypes';
import { SYLLABUS_CHAPTER_MAPPINGS } from '@/components/midsem/midsemChapterMappings';
import { MidsemStickyBar } from '@/components/midsem/MidsemStickyBar';
import { MidsemNotesView } from '@/components/midsem/MidsemNotesView';
import {
  MidsemChaptersView,
  MidsemDiagramsView,
  MidsemPracticeQuestionsView,
} from '@/components/midsem/MidsemStudyExtras';
import type { MidsemSearchResult } from '@/components/midsem/midsemSearch';

const PanelLoader: React.FC<{ label?: string }> = ({ label = 'Loading module...' }) => (
  <div className="rounded-2xl border-2 border-ink/30 bg-paper2 p-8 text-center midsem-meta text-dim">
    {label}
  </div>
);

const LazyMcqBank = dynamic(
  () => import('@/components/midsem/MidsemMcqBank').then((m) => m.MidsemMcqBank),
  { loading: () => <PanelLoader label="Loading MCQ Bank..." /> }
);
const LazyMockSimulator = dynamic(
  () => import('@/components/midsem/MidsemMockSimulator').then((m) => m.MidsemMockSimulator),
  { loading: () => <PanelLoader label="Loading Mock Test Simulator..." /> }
);
const LazyPapersView = dynamic(
  () => import('@/components/midsem/MidsemPapersView').then((m) => m.MidsemPapersView),
  { loading: () => <PanelLoader label="Loading Solved Papers..." /> }
);
const LazyCalculators = dynamic(
  () => import('@/components/midsem/MidsemCalculators').then((m) => m.MidsemCalculators),
  { loading: () => <PanelLoader label="Loading Calculators..." /> }
);
const LazyPillarScore = dynamic(
  () => import('@/components/midsem/MidsemPillarScore').then((m) => m.MidsemPillarScore),
  { loading: () => <PanelLoader label="Loading 15-Pillar Predictor..." /> }
);

export default function MidsemRevisionPage() {
  const [activeSubjectCode, setActiveSubjectCode] = useState<string>('100111');
  const [activeUnitNo, setActiveUnitNo] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<MidsemMode>('notes');
  const [notesSubView, setNotesSubView] = useState<'cards' | 'handbook'>('cards');
  const [jumpTarget, setJumpTarget] = useState<string | undefined>(undefined);
  const [examPatternOpen, setExamPatternOpen] = useState<boolean>(false);
  const [savedResume, setSavedResume] = useState<PersistedPortalState | null>(null);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const mainRef = useRef<HTMLElement | null>(null);

  // Open Exam Pattern panel automatically on tablet/desktop viewports (>=768px), keep closed by default on phones
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setExamPatternOpen(true);
    }
  }, []);

  // Tick countdown once every 15s (keeps schedule countdown fresh without layout flicker)
  useEffect(() => {
    setNowMs(Date.now());
    const id = setInterval(() => setNowMs(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  // Hydrate from URL (?subject=&unit=&mode=) or validated localStorage
  useEffect(() => {
    let nextSubject = '100111';
    let nextUnit = 0;
    let nextMode: MidsemMode = 'notes';
    let nextSubView: 'cards' | 'handbook' = 'cards';
    let loadedResume: PersistedPortalState | null = null;

    try {
      const raw = localStorage.getItem(PORTAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          const validSubj = normalizeSubjectCode(parsed.subject);
          const courseObj = MIDSEM_DATA.courses.find((c) => c.code === (validSubj || '100111'));
          const allowedUnits = courseObj ? courseObj.units.map((u) => u.unitNo) : [1, 2, 3];
          const validUnit = normalizeUnitNumber(parsed.unit, allowedUnits);
          const validMode = normalizeMode(parsed.mode);
          const validSub = parsed.notesSubView === 'handbook' ? 'handbook' : 'cards';
          if (validSubj && validUnit !== null && validMode) {
            loadedResume = {
              subject: validSubj,
              unit: validUnit,
              mode: validMode,
              scrollY: typeof parsed.scrollY === 'number' && parsed.scrollY >= 0 ? parsed.scrollY : 0,
              notesSubView: validSub,
            };
          }
        }
      }
    } catch {
      // ignore corrupted localStorage
    }

    const params = new URLSearchParams(window.location.search);
    const paramSubj = normalizeSubjectCode(params.get('subject'));
    const paramMode = normalizeMode(params.get('mode'));
    const hasValidDeepLink = Boolean(paramSubj || paramMode || params.has('unit'));

    if (paramSubj) nextSubject = paramSubj;
    else if (!hasValidDeepLink && loadedResume) nextSubject = loadedResume.subject;

    const courseForUnit =
      MIDSEM_DATA.courses.find((c) => c.code === nextSubject) || MIDSEM_DATA.courses[0];
    const allowedUnits = courseForUnit.units.map((u) => u.unitNo);
    const paramUnit = normalizeUnitNumber(params.get('unit'), allowedUnits);

    if (paramUnit !== null) nextUnit = paramUnit;
    else if (!hasValidDeepLink && loadedResume) nextUnit = loadedResume.unit;

    if (paramMode) nextMode = paramMode;
    else if (!hasValidDeepLink && loadedResume) nextMode = loadedResume.mode;

    if (!hasValidDeepLink && loadedResume) {
      nextSubView = loadedResume.notesSubView;
    }

    setSavedResume(loadedResume);
    setActiveSubjectCode(nextSubject);
    setActiveUnitNo(nextUnit);
    setActiveMode(nextMode);
    setNotesSubView(nextSubView);
    setHydrated(true);
  }, []);

  // Sync URL with history.replaceState + persist state in localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      const nextUrl = `?subject=${encodeURIComponent(activeSubjectCode)}&unit=${activeUnitNo}&mode=${activeMode}`;
      if (window.location.search !== nextUrl) {
        window.history.replaceState(null, '', `/midsem${nextUrl}`);
      }
    } catch {
      // ignore history errors
    }

    const save = () => {
      try {
        const payload: PersistedPortalState = {
          subject: activeSubjectCode,
          unit: activeUnitNo,
          mode: activeMode,
          scrollY: Math.round(window.scrollY || 0),
          notesSubView,
        };
        localStorage.setItem(PORTAL_STORAGE_KEY, JSON.stringify(payload));
        setSavedResume(payload);
      } catch {
        // ignore quota errors
      }
    };
    save();
  }, [activeSubjectCode, activeUnitNo, activeMode, notesSubView, hydrated]);

  // Debounced scroll position tracking for Resume button
  useEffect(() => {
    if (!hydrated) return;
    let t: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (t) clearTimeout(t);
      t = setTimeout(() => {
        try {
          const payload: PersistedPortalState = {
            subject: activeSubjectCode,
            unit: activeUnitNo,
            mode: activeMode,
            scrollY: Math.round(window.scrollY || 0),
            notesSubView,
          };
          localStorage.setItem(PORTAL_STORAGE_KEY, JSON.stringify(payload));
          setSavedResume(payload);
        } catch {
          // ignore
        }
      }, 250);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, [activeSubjectCode, activeUnitNo, activeMode, notesSubView, hydrated]);

  const currentCourse: MidsemCourse = useMemo(() => {
    return (
      MIDSEM_DATA.courses.find(
        (c) => c.code === activeSubjectCode || activeSubjectCode.includes(c.code)
      ) || MIDSEM_DATA.courses[0]
    );
  }, [activeSubjectCode]);

  const shortName = getDisplaySubjectShort(currentCourse.code, currentCourse.short);
  const availableUnits = useMemo(() => currentCourse.units.map((u) => u.unitNo), [currentCourse]);

  const displayedUnits: MidsemUnit[] = useMemo(() => {
    if (activeUnitNo === 0) return currentCourse.units;
    return currentCourse.units.filter((u) => u.unitNo === activeUnitNo);
  }, [currentCourse, activeUnitNo]);

  // Subject & Unit MCQs (isolated cleanly so Mock Test is unaffected by search queries)
  const subjectUnitMcqs: MidsemMcq[] = useMemo(() => {
    return MIDSEM_MCQS.filter((m) => {
      const matchSubj =
        m.courseCode === currentCourse.code || m.subject === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || m.unitNo === activeUnitNo;
      return matchSubj && matchUnit;
    });
  }, [currentCourse, activeUnitNo]);

  const filteredPractice: MidsemPracticeItem[] = useMemo(() => {
    return MIDSEM_PRACTICE_QUESTIONS.filter((p) => {
      const matchSubj =
        p.courseCode === currentCourse.code || p.subject === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || p.unitNo === activeUnitNo;
      return matchSubj && matchUnit;
    });
  }, [currentCourse, activeUnitNo]);

  const currentDiagrams: MidsemDiagram[] = useMemo(() => {
    return MIDSEM_DIAGRAMS.filter((d) => {
      const matchSubj =
        d.subjectCode === currentCourse.code || d.subject === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || d.unitNo === activeUnitNo;
      return matchSubj && matchUnit;
    });
  }, [currentCourse, activeUnitNo]);

  const currentPaper: BeuPaper | undefined = useMemo(() => {
    return BEU_REAL_PAPERS_2026.find(
      (p) =>
        p.code === currentCourse.code ||
        p.subject === currentCourse.short ||
        currentCourse.code.includes(p.code)
    );
  }, [currentCourse]);

  const currentChapterMappings = useMemo(() => {
    return SYLLABUS_CHAPTER_MAPPINGS.filter((m) => {
      const matchSubj =
        m.subjectCode === currentCourse.code || m.subjectShort === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || m.unitNo === activeUnitNo;
      return matchSubj && matchUnit;
    });
  }, [currentCourse, activeUnitNo]);

  const currentSitting: ExamSitting | undefined = useMemo(
    () => pickSubjectSitting(currentCourse.code, LNJPIT_EXAM_SITTINGS),
    [currentCourse.code]
  );

  // Single-source countdown & date summary derived strictly from LNJPIT_EXAM_SITTINGS
  const sittingBadgeText = useMemo(() => {
    if (!currentSitting) return 'Schedule pending';
    const shortDate = formatSittingShortDate(currentSitting.date);
    const eta = hydrated
      ? formatTimeRemaining(currentSitting.startTime, currentSitting.endTime, nowMs)
      : 'Scheduled';
    return `Next sitting: ${getDisplaySubjectShort(currentSitting.subjectCode, currentSitting.subjectShort)} · ${shortDate} · ${currentSitting.timing} · ${eta}`;
  }, [currentSitting, hydrated, nowMs]);

  const handleSelectSubject = useCallback((code: string) => {
    setActiveSubjectCode(code);
    setActiveUnitNo(0);
    setJumpTarget(undefined);
  }, []);

  const handleSelectMode = useCallback((mode: MidsemMode) => {
    setActiveMode(mode);
    setJumpTarget(undefined);
  }, []);

  const handleContinueResume = () => {
    if (!savedResume) return;
    setActiveSubjectCode(savedResume.subject);
    setActiveUnitNo(savedResume.unit);
    setActiveMode(savedResume.mode);
    setNotesSubView(savedResume.notesSubView);
    if (savedResume.scrollY > 0) {
      window.scrollTo({ top: savedResume.scrollY, behavior: 'smooth' });
    } else {
      mainRef.current?.focus();
    }
  };

  const handleJumpToSearchResult = (res: MidsemSearchResult) => {
    setActiveSubjectCode(res.subjectCode);
    setActiveUnitNo(res.unitNo);
    setActiveMode(res.mode);
    if (res.notesSubView) setNotesSubView(res.notesSubView);
    setJumpTarget(res.topicAnchorId);
    requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });
  };

  const activeGroup: ModeGroupId = useMemo(
    () =>
      activeMode === 'notes' || activeMode === 'practice' || activeMode === 'diagrams' || activeMode === 'chapters'
        ? 'study'
        : activeMode === 'mcq' || activeMode === 'simulator' || activeMode === 'papers'
        ? 'practice'
        : 'tools',
    [activeMode]
  );

  const continueLabel = useMemo(() => {
    if (!savedResume) return null;
    const subjLabel = getDisplaySubjectShort(savedResume.subject);
    const unitLabel = savedResume.unit === 0 ? 'All Units' : `Unit ${savedResume.unit}`;
    const modeLabel =
      MIDSEM_MODES.find((m) => m.id === savedResume.mode)?.shortLabel || savedResume.mode;
    return `Continue: ${subjLabel} · ${unitLabel} · ${modeLabel}`;
  }, [savedResume]);

  return (
    <div className="midsem-shell min-h-screen pb-28 md:pb-12 selection:bg-accentGold/25">
      <a href="#midsem-main-content" className="midsem-skip-link">
        Skip to main content
      </a>

      {/* COMPACT TOP HEADER (Back link, Caveat title, Single-source Sitting Countdown, Resume) */}
      <header className="midsem-noprint border-b-2 border-hair bg-paper px-3 sm:px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="midsem-tap midsem-nowrap inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-ink bg-paper2 text-ink midsem-meta font-bold shadow-sketchy hover:bg-paper3"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Back to 3D Notebook</span>
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="midsem-badge font-mono uppercase tracking-wider text-accentRed font-bold">
                    LNJPIT Chapra · BEU Mid-Sem
                  </span>
                  <span className="midsem-badge inline-flex items-center px-2.5 py-0.5 rounded-full border border-ink bg-accentTeal/15 text-accentTeal font-bold">
                    Group A: M&amp;C
                  </span>
                </div>
                <h1 className="midsem-heading text-3xl sm:text-4xl text-ink leading-tight">
                  Mid-Semester Exam Portal 2026
                </h1>
              </div>
            </div>

            {/* Resume Action Chip */}
            {continueLabel && (
              <button
                type="button"
                onClick={handleContinueResume}
                className="midsem-tap inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-ink bg-accentGold text-paper midsem-meta font-bold shadow-sketchy hover:opacity-95"
              >
                <Play className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{continueLabel}</span>
              </button>
            )}
          </div>

          {/* Single-Source Sitting Countdown Card + Collapsible Exam Pattern */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 rounded-xl border-2 border-ink bg-paper2 p-3 shadow-sketchy">
            <div
              data-testid="next-sitting-card"
              className="flex items-center gap-2 midsem-meta font-mono font-bold text-ink"
            >
              <Clock className="w-4 h-4 text-accentRed shrink-0" aria-hidden="true" />
              <span>{sittingBadgeText}</span>
            </div>

            <button
              type="button"
              aria-expanded={examPatternOpen}
              onClick={() => setExamPatternOpen((o) => !o)}
              className="midsem-tap inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border border-ink/40 bg-paper hover:bg-paper3 midsem-meta font-bold text-ink lg:w-auto w-full"
            >
              <span className="inline-flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-accentRed" aria-hidden="true" />
                <span>Exam pattern &amp; official routine</span>
              </span>
              {examPatternOpen ? (
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>

          {examPatternOpen && (
            <div
              data-testid="exam-pattern-panel"
              className="rounded-xl border-2 border-ink bg-paper p-3.5 midsem-meta text-ink space-y-1.5"
            >
              <div className="font-mono font-bold uppercase text-accentRed">
                Official LNJPIT Timetable (Ref: {LNJPIT_EXAM_NOTICE.refNo}, Dated {LNJPIT_EXAM_NOTICE.date})
              </div>
              <p className="midsem-body text-ink">
                <strong>Pattern ({LNJPIT_EXAM_NOTICE.timeDuration}, {LNJPIT_EXAM_NOTICE.fullMarks} Marks):</strong>{' '}
                {LNJPIT_EXAM_NOTICE.examStructure}
              </p>
              {currentSitting && (
                <p className="midsem-meta text-dim">
                  <strong>{shortName} Routine Syllabus ({currentSitting.day}, {currentSitting.sitting}):</strong>{' '}
                  {currentSitting.syllabusUnits}
                </p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* STICKY 3-STEP FLOW BAR: SUBJECT -> UNIT -> MODE + SEARCH */}
      <MidsemStickyBar
        activeSubjectCode={currentCourse.code}
        activeUnitNo={activeUnitNo}
        availableUnits={availableUnits}
        activeMode={activeMode}
        onSelectSubject={handleSelectSubject}
        onSelectUnit={setActiveUnitNo}
        onSelectMode={handleSelectMode}
        onJumpToSearchResult={handleJumpToSearchResult}
        modeBadges={{
          notes: `${displayedUnits.length}U`,
          practice: `${filteredPractice.length}`,
          mcq: `${subjectUnitMcqs.length}`,
          diagrams: `${currentDiagrams.length}`,
        }}
      />

      {/* MAIN CONTENT */}
      <main
        id="midsem-main-content"
        ref={mainRef}
        tabIndex={-1}
        className="max-w-7xl mx-auto px-3 sm:px-4 pt-5 focus:outline-none"
      >
        <div
          role="tabpanel"
          id={`panel-${activeMode}`}
          aria-labelledby={`tab-${activeMode}`}
        >
          {activeMode === 'notes' && (
            <MidsemNotesView
              course={currentCourse}
              units={displayedUnits}
              activeUnitNo={activeUnitNo}
              sitting={currentSitting}
              subView={notesSubView}
              onChangeSubView={setNotesSubView}
              focusAnchor={jumpTarget}
            />
          )}

          {activeMode === 'practice' && (
            <MidsemPracticeQuestionsView
              subjectShort={shortName}
              items={filteredPractice}
              highlightId={jumpTarget}
            />
          )}

          {activeMode === 'diagrams' && (
            <MidsemDiagramsView
              subjectShort={shortName}
              activeUnitNo={activeUnitNo}
              diagrams={currentDiagrams}
            />
          )}

          {activeMode === 'chapters' && (
            <MidsemChaptersView subjectShort={shortName} mappings={currentChapterMappings} />
          )}

          {activeMode === 'mcq' && (
            <LazyMcqBank
              subjectCode={currentCourse.code}
              subjectShort={shortName}
              mcqs={subjectUnitMcqs}
              jumpMcqId={jumpTarget}
            />
          )}

          {activeMode === 'simulator' && (
            <LazyMockSimulator
              subjectCode={currentCourse.code}
              subjectShort={shortName}
              mcqs={subjectUnitMcqs}
            />
          )}

          {activeMode === 'papers' && <LazyPapersView paper={currentPaper} />}

          {activeMode === 'calculator' && <LazyCalculators />}

          {activeMode === 'predictor' && (
            <LazyPillarScore activeSubjectCode={currentCourse.code} />
          )}
        </div>
      </main>

      {/* THUMB-REACHABLE MOBILE BOTTOM DOCK (<768px) */}
      <nav
        aria-label="Mobile navigation"
        className="midsem-noprint md:hidden fixed bottom-0 left-0 right-0 z-40 border-t-2 border-ink bg-paper2/95 backdrop-blur-sm midsem-bottom-safe shadow-sketch"
      >
        <div className="grid grid-cols-4 gap-1 px-2 pt-1.5">
          {MODE_GROUP_META.map((grp) => {
            const isActive = activeGroup === grp.id;
            const Icon =
              grp.id === 'study' ? BookOpen : grp.id === 'practice' ? Target : Wrench;
            return (
              <button
                key={grp.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleSelectMode(grp.defaultMode)}
                className={`midsem-tap rounded-xl border-2 py-1.5 px-1 flex flex-col items-center justify-center gap-0.5 midsem-badge font-bold transition-colors ${
                  isActive
                    ? 'border-ink bg-ink text-paper'
                    : 'border-transparent bg-transparent text-ink hover:bg-paper3'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{grp.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              if (savedResume) handleContinueResume();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="midsem-tap rounded-xl border-2 border-ink bg-accentGold text-paper py-1.5 px-1 flex flex-col items-center justify-center gap-0.5 midsem-badge font-bold"
          >
            <Sliders className="w-4 h-4" aria-hidden="true" />
            <span>Continue</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
