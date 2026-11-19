'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  BookOpen,
  CheckCircle2,
  XCircle,
  Award,
  Target,
  HelpCircle,
  FileText,
  ChevronRight,
  Zap,
  RefreshCw,
  Printer,
  ArrowLeft,
  Calculator,
  Sparkles,
  Filter,
  CheckSquare,
  Square,
  Cpu,
  Layers,
  GraduationCap,
  Play,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import {
  MIDSEM_DATA,
  BEU_REAL_PAPERS_2026,
  MidsemCourse,
  MidsemUnit,
  MidsemTopic,
  BeuPaper,
} from '@/data/midsemNotes';
import { MIDSEM_MCQS, MidsemMcq } from '@/data/midsemMCQs';
import { MIDSEM_DIAGRAMS, MidsemDiagram } from '@/data/midsemDiagrams';
import { LNJPIT_EXAM_SITTINGS, LNJPIT_EXAM_NOTICE, ExamSitting } from '@/data/midsemTimetable';
import { KatexText } from '@/components/study/KatexRenderer';

type ViewTab = 'notes' | 'numericals' | 'mcq' | 'guess' | 'papers' | 'simulator' | 'predictor' | 'calculator';
type ThemeMode = 'cyber' | 'noir' | 'matrix' | 'solar';

const READINESS_PILLARS = [
  { id: 'p1', label: 'Unit 1 Fundamentals & Definitions Memorized', weight: 6 },
  { id: 'p2', label: 'Unit 2 Core Derivations & Analytical Formulas Ready', weight: 7 },
  { id: 'p3', label: 'Unit 3 (Electronics/Multivariable/Magnetism/Logic/AI) Mastered', weight: 8 },
  { id: 'p4', label: 'Pencil Diagram Practice (Newton Rings, Bridge Rectifier, Saddle Surface, BJT)', weight: 7 },
  { id: 'p5', label: '4-Box Numericals Format (Given, Formula, Calculation, Units)', weight: 7 },
  { id: 'p6', label: 'Objective MCQs: 100% Accuracy on Standard BEU 1-Markers', weight: 7 },
  { id: 'p7', label: 'Thevenin / Norton & Series RLC Resonance Numericals Solved', weight: 6 },
  { id: 'p8', label: 'Eigenvalues & Cayley-Hamilton Inverse A⁻¹ Steps Clear', weight: 7 },
  { id: 'p9', label: 'Leibnitz Theorem Proof for (sin⁻¹ x)² or Standard Forms', weight: 7 },
  { id: 'p10', label: 'Euler Theorem & Extrema rt - s² Multi-variable Rules', weight: 6 },
  { id: 'p11', label: 'Maxwell 4 Equations & Displacement Current Derivation Memorized', weight: 7 },
  { id: 'p12', label: 'AI Search Comparison (BFS vs DFS vs A* Admissibility)', weight: 6 },
  { id: 'p13', label: 'Alpha-Beta Pruning Cutoff Condition (α ≥ β) Trace Ready', weight: 6 },
  { id: 'p14', label: 'CFET 4-Variable K-Map & IEEE 754 32-bit Conversion Practiced', weight: 6 },
  { id: 'p15', label: 'UHV Trust on Intention vs Competence & 9 Values Articulated', weight: 5 },
];

export default function MidsemRevisionPage() {
  const [activeSubjectCode, setActiveSubjectCode] = useState<string>('100111'); // BEEE is 1st exam
  const [activeUnitNo, setActiveUnitNo] = useState<number>(0); // 0 = All Units, 1, 2, 3
  const [activeTab, setActiveTab] = useState<ViewTab>('notes');
  const [theme, setTheme] = useState<ThemeMode>('cyber');

  // MCQ state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [onlyMissed, setOnlyMissed] = useState<boolean>(false);

  // 15-Pillar Score Predictor state
  const [readinessChecks, setReadinessChecks] = useState<Record<string, boolean>>({
    'p1': true,
    'p2': true,
    'p3': true,
  });

  // Calculators state
  const [rlcL, setRlcL] = useState<number>(0.1);
  const [rlcC, setRlcC] = useState<number>(10);
  const [thevV, setThevV] = useState<number>(24);
  const [thevR, setThevR] = useState<number>(6);
  const [thevRl, setThevRl] = useState<number>(6);
  const [fiberN1, setFiberN1] = useState<number>(1.55);
  const [fiberN2, setFiberN2] = useState<number>(1.50);
  const [cacheH, setCacheH] = useState<number>(0.95);
  const [cacheTc, setCacheTc] = useState<number>(2);
  const [cacheTm, setCacheTm] = useState<number>(50);

  // Timed Mock Simulator state
  const [mockRunning, setMockRunning] = useState<boolean>(false);
  const [mockSecondsLeft, setMockSecondsLeft] = useState<number>(900); // 15 mins rapid sprint
  const [mockUserAnswers, setMockUserAnswers] = useState<Record<string, number>>({});
  const [mockSubmitted, setMockSubmitted] = useState<boolean>(false);

  // Countdown timer to next exam
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      // Find current or next sitting
      const targetDate = new Date('2026-11-25T11:00:00+05:30').getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeUntilNext('Exams in progress!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilNext(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer tick for Mock Simulator
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mockRunning && mockSecondsLeft > 0 && !mockSubmitted) {
      timer = setInterval(() => {
        setMockSecondsLeft((prev) => {
          if (prev <= 1) {
            setMockSubmitted(true);
            setMockRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mockRunning, mockSecondsLeft, mockSubmitted]);

  // Current course
  const currentCourse: MidsemCourse = useMemo(() => {
    return (
      MIDSEM_DATA.courses.find((c) => c.code === activeSubjectCode) ||
      MIDSEM_DATA.courses[0]
    );
  }, [activeSubjectCode]);

  // Filtered units
  const displayedUnits: MidsemUnit[] = useMemo(() => {
    if (activeUnitNo === 0) return currentCourse.units;
    return currentCourse.units.filter((u) => u.unitNo === activeUnitNo);
  }, [currentCourse, activeUnitNo]);

  // Filtered MCQs
  const filteredMcqs: MidsemMcq[] = useMemo(() => {
    return MIDSEM_MCQS.filter((m) => {
      const matchSubject = m.courseCode === currentCourse.code || m.subject === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || m.unitNo === activeUnitNo;
      if (!matchSubject || !matchUnit) return false;
      if (onlyMissed) {
        const userAns = userAnswers[m.id];
        return userAns !== undefined && userAns !== m.ans;
      }
      return true;
    });
  }, [currentCourse, activeUnitNo, onlyMissed, userAnswers]);

  // MCQ Stats
  const mcqStats = useMemo(() => {
    const totalAttempted = Object.keys(userAnswers).filter((id) =>
      MIDSEM_MCQS.some((m) => m.id === id && (m.courseCode === currentCourse.code || m.subject === currentCourse.short))
    ).length;
    let correct = 0;
    Object.entries(userAnswers).forEach(([id, ans]) => {
      const q = MIDSEM_MCQS.find((m) => m.id === id);
      if (q && q.ans === ans && (q.courseCode === currentCourse.code || q.subject === currentCourse.short)) {
        correct++;
      }
    });
    return {
      attempted: totalAttempted,
      correct,
      pct: totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0,
    };
  }, [userAnswers, currentCourse]);

  // Filtered diagrams
  const currentDiagrams: MidsemDiagram[] = useMemo(() => {
    return MIDSEM_DIAGRAMS.filter((d) => {
      const matchSubject = d.subjectCode === currentCourse.code || d.subject === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || d.unitNo === activeUnitNo;
      return matchSubject && matchUnit;
    });
  }, [currentCourse, activeUnitNo]);

  // Real paper for current course
  const currentPaper: BeuPaper | undefined = useMemo(() => {
    return BEU_REAL_PAPERS_2026.find(
      (p) => p.code === currentCourse.code || p.subject === currentCourse.short
    );
  }, [currentCourse]);

  // Sitting for current course
  const currentSitting: ExamSitting | undefined = useMemo(() => {
    return LNJPIT_EXAM_SITTINGS.find(
      (s) => s.subjectCode.includes(currentCourse.code) || s.subjectShort === currentCourse.short
    );
  }, [currentCourse]);

  // Calculate Readiness Score
  const totalPillarsScore = useMemo(() => {
    let score = 0;
    READINESS_PILLARS.forEach((p) => {
      if (readinessChecks[p.id]) score += p.weight;
    });
    return Math.min(100, score);
  }, [readinessChecks]);

  // Calculator computations
  const rlcResonantFreq = useMemo(() => {
    if (rlcL <= 0 || rlcC <= 0) return 0;
    const cFarads = rlcC * 1e-6;
    return (1 / (2 * Math.PI * Math.sqrt(rlcL * cFarads))).toFixed(2);
  }, [rlcL, rlcC]);

  const theveninPower = useMemo(() => {
    if (thevR + thevRl <= 0) return { il: 0, pl: 0 };
    const il = thevV / (thevR + thevRl);
    const pl = il * il * thevRl;
    return { il: il.toFixed(3), pl: pl.toFixed(3) };
  }, [thevV, thevR, thevRl]);

  const fiberParams = useMemo(() => {
    if (fiberN1 <= fiberN2) return { na: 'N/A (n1 must > n2)', thetaA: 'N/A', thetaC: 'N/A' };
    const naVal = Math.sqrt(fiberN1 * fiberN1 - fiberN2 * fiberN2);
    const thetaA = (Math.asin(Math.min(1, naVal)) * 180) / Math.PI;
    const thetaC = (Math.asin(fiberN2 / fiberN1) * 180) / Math.PI;
    return {
      na: naVal.toFixed(4),
      thetaA: `${thetaA.toFixed(2)}°`,
      thetaC: `${thetaC.toFixed(2)}°`,
    };
  }, [fiberN1, fiberN2]);

  const cacheTavg = useMemo(() => {
    return (cacheH * cacheTc + (1 - cacheH) * cacheTm).toFixed(3);
  }, [cacheH, cacheTc, cacheTm]);

  // Theme styling classes
  const themeClasses = {
    cyber: {
      bg: 'bg-[#090d16]',
      card: 'bg-[#0f172a]/90 border border-slate-700/60 shadow-xl backdrop-blur-md',
      cardHover: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
      text: 'text-slate-100',
      subtext: 'text-slate-400',
      accent: 'text-cyan-400',
      badge: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    },
    noir: {
      bg: 'bg-black',
      card: 'bg-zinc-950 border border-zinc-800 shadow-2xl',
      cardHover: 'hover:border-zinc-500',
      text: 'text-white',
      subtext: 'text-zinc-400',
      accent: 'text-amber-400',
      badge: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
      glow: 'shadow-[0_0_15px_rgba(255,255,255,0.08)]',
    },
    matrix: {
      bg: 'bg-[#041208]',
      card: 'bg-[#061e0d]/90 border border-emerald-800/60 shadow-xl backdrop-blur-md',
      cardHover: 'hover:border-emerald-400/60',
      text: 'text-emerald-100',
      subtext: 'text-emerald-400/80',
      accent: 'text-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    },
    solar: {
      bg: 'bg-slate-50',
      card: 'bg-white border border-slate-200 shadow-md',
      cardHover: 'hover:border-indigo-400',
      text: 'text-slate-900',
      subtext: 'text-slate-600',
      accent: 'text-indigo-600',
      badge: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      glow: 'shadow-sm',
    },
  }[theme];

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} transition-colors duration-300 font-sans pb-24`}>
      {/* TOP COMMAND HUD */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          {/* Brand & Routine Info */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs font-semibold transition-colors"
              title="Return to Main 3D Notebook"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sem-I</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-base sm:text-lg flex items-center gap-1.5">
                  <span className="text-cyan-400">⚡ M&amp;C Mid-Sem Hub</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono">
                    Batch 2026
                  </span>
                </span>
                <span className="hidden md:inline-block text-xs text-slate-400">
                  LNJPIT Chapra · Group A
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-md">
                Ref No: {LNJPIT_EXAM_NOTICE.refNo} · Revised Exam: Nov 25–27, 2026 (Units 1, 2 &amp; 3)
              </p>
            </div>
          </div>

          {/* Countdown & Quick Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Live Countdown Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
              <Clock className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span className="hidden sm:inline text-slate-400">Starts:</span>
              <strong className="text-cyan-300">{timeUntilNext || '25 Nov 2026'}</strong>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-lg p-0.5 text-xs">
              {(['cyber', 'noir', 'matrix', 'solar'] as ThemeMode[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`px-2 py-1 rounded capitalize font-medium transition-colors ${
                    theme === t
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Print A4 Mode */}
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-300 font-medium transition-colors"
              title="Print A4 Clean Notes & Papers"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* SITTING BANNER (OFFICIAL LNJPIT CHAPRA SCHEDULE) */}
      <section className="max-w-7xl mx-auto px-4 pt-4">
        <div className="rounded-xl border border-cyan-500/20 bg-linear-to-r from-cyan-950/30 via-slate-900/40 to-violet-950/30 p-3 sm:p-4 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-2.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Official Examination Schedule (Mathematics &amp; Computing Group A)
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Full Marks: 20 · Time: 2 Hours per sitting
            </span>
          </div>

          {/* Sittings Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {LNJPIT_EXAM_SITTINGS.map((sitting) => {
              const isSelected = activeSubjectCode === sitting.subjectCode || currentCourse.code.includes(sitting.subjectCode.slice(0, 6));
              return (
                <button
                  key={sitting.id}
                  type="button"
                  onClick={() => {
                    const matchedCourse = MIDSEM_DATA.courses.find(
                      (c) => c.code === sitting.subjectCode || sitting.subjectCode.includes(c.code)
                    );
                    if (matchedCourse) {
                      setActiveSubjectCode(matchedCourse.code);
                    }
                  }}
                  className={`flex flex-col text-left p-2.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/60 shadow-md shadow-cyan-500/10'
                      : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-1">
                    <span>{sitting.day.slice(0, 3)}, {sitting.date.slice(5)}</span>
                    <span className="font-mono text-cyan-400/90">{sitting.timing.split('–')[0].trim()}</span>
                  </div>
                  <strong className="text-sm font-bold text-slate-100 flex items-center gap-1">
                    {sitting.subjectShort}
                  </strong>
                  <span className="text-[10px] text-slate-400 truncate mt-0.5">
                    {sitting.sitting} · {sitting.subjectCode}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUBJECT AND UNIT STRIP */}
      <section className="max-w-7xl mx-auto px-4 pt-4">
        {/* Row 1: Subject Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MIDSEM_DATA.courses.map((course) => {
            const active = course.code === activeSubjectCode;
            return (
              <button
                key={course.code}
                type="button"
                onClick={() => {
                  setActiveSubjectCode(course.code);
                  setActiveUnitNo(0); // reset unit to All
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-md shadow-cyan-500/15'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: course.color }}
                />
                <span>{course.short}</span>
                <span className="text-[11px] font-mono text-slate-400">({course.code})</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Unit Filter & Feature Tabs */}
        <div className="flex items-center justify-between gap-3 mt-3 flex-wrap border-b border-slate-800/80 pb-3">
          {/* Unit Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 font-medium flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              <span>Scope:</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveUnitNo(0)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                activeUnitNo === 0
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Units (1, 2 &amp; 3)
            </button>
            {[1, 2, 3].map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setActiveUnitNo(u)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  activeUnitNo === u
                    ? 'bg-cyan-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Unit {u}
              </button>
            ))}
          </div>

          {/* View Mode Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none text-xs">
            {[
              { id: 'notes', label: 'Master Notes', icon: BookOpen },
              { id: 'numericals', label: 'Solved Numericals', icon: Target },
              { id: 'mcq', label: `CBT MCQs (${mcqStats.correct}/${mcqStats.attempted})`, icon: HelpCircle },
              { id: 'guess', label: 'Guess Questions', icon: Sparkles },
              { id: 'papers', label: 'BEU Solved Papers', icon: FileText },
              { id: 'simulator', label: 'Mock Exam', icon: Clock },
              { id: 'predictor', label: `Score Predictor (${totalPillarsScore}%)`, icon: Award },
              { id: 'calculator', label: 'Calculators', icon: Calculator },
            ].map((tab) => {
              const Icon = tab.icon;
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as ViewTab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                    isTabActive
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 pt-6">
        {/* Active Subject Meta Card */}
        <div className={`p-4 rounded-xl ${themeClasses.card} mb-6 flex items-start justify-between gap-4 flex-wrap`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-md font-mono font-bold bg-slate-800 text-cyan-400 border border-slate-700">
                Code: {currentCourse.code}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md font-mono bg-violet-950/60 text-violet-300 border border-violet-700/50">
                {currentSitting?.day} · {currentSitting?.sitting} ({currentSitting?.timing})
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
              {currentCourse.title}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Focus: <span className="text-slate-300 font-medium">{currentSitting?.keyFocus}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Exam Syllabus</div>
              <div className="text-sm font-bold text-cyan-300 font-mono">
                {activeUnitNo === 0 ? 'Units 1, 2 & 3 Full Coverage' : `Unit ${activeUnitNo} Deep Dive`}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: HIGH-YIELD MASTER NOTES (WITH INLINE SVG DIAGRAMS)
           ========================================================================= */}
        {activeTab === 'notes' && (
          <div className="space-y-8">
            {displayedUnits.map((unit) => (
              <section key={unit.unitNo} className={`p-5 sm:p-6 rounded-2xl ${themeClasses.card} ${themeClasses.glow}`}>
                {/* Unit Header */}
                <div className="border-b border-slate-800/80 pb-3 mb-5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-bold border border-cyan-500/30">
                        {unit.unitNo}
                      </span>
                      <span>{unit.title}</span>
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">
                      {unit.topics.length} Key Revision Topics
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{unit.summary}</p>
                </div>

                {/* Inline SVG Diagrams for this Unit */}
                {currentDiagrams.filter((d) => d.unitNo === unit.unitNo).length > 0 && (
                  <div className="mb-6 space-y-4">
                    {currentDiagrams
                      .filter((d) => d.unitNo === unit.unitNo)
                      .map((diag) => (
                        <div key={diag.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                          <div className="flex items-center justify-between text-xs font-semibold text-cyan-300 mb-2">
                            <span>📐 Exam Schematic: {diag.title}</span>
                            <span className="text-[11px] text-slate-400 font-mono">SVG 2D/3D Diagram</span>
                          </div>
                          <div
                            className="overflow-x-auto rounded-lg border border-slate-800/80 bg-slate-900/50"
                            dangerouslySetInnerHTML={{ __html: diag.svg }}
                          />
                          <p className="text-xs text-slate-400 mt-2 italic leading-relaxed">
                            💡 Caption: {diag.caption}
                          </p>
                        </div>
                      ))}
                  </div>
                )}

                {/* Topics in this Unit */}
                <div className="grid grid-cols-1 gap-5">
                  {unit.topics.map((topic, tIdx) => (
                    <article
                      key={tIdx}
                      className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3"
                    >
                      <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                        <span className="text-cyan-400">§ {tIdx + 1}.</span>
                        <span>{topic.heading}</span>
                      </h3>

                      {/* Plain Explanation */}
                      <p className="text-sm text-slate-300 leading-relaxed font-sans">
                        {topic.plainExplanation}
                      </p>

                      {/* Key Formula Box */}
                      <div className="p-3.5 rounded-lg bg-slate-950/80 border border-cyan-500/20 text-xs sm:text-sm font-mono text-cyan-200 whitespace-pre-line leading-relaxed">
                        <div className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-cyan-400" />
                          <span>Core Equations &amp; Formulas:</span>
                        </div>
                        <KatexText htmlOrText={topic.keyFormula} />
                      </div>

                      {/* Exam Tip Alert */}
                      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 font-semibold">Topper Exam Tip: </strong>
                          <span>{topic.examTip}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* =========================================================================
            TAB 2: STEP-BY-STEP SOLVED NUMERICALS (4-BOX LAYOUT)
           ========================================================================= */}
        {activeTab === 'numericals' && (
          <div className="space-y-6">
            {displayedUnits.map((unit) => (
              <div key={unit.unitNo} className="space-y-4">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span>{unit.title} — Solved Problems</span>
                </h2>

                {unit.standardProblems.map((prob, pIdx) => (
                  <div
                    key={pIdx}
                    className={`p-5 rounded-2xl ${themeClasses.card} space-y-4 border-l-4 border-l-cyan-500`}
                  >
                    {/* Problem Statement */}
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Problem {unit.unitNo}.{pIdx + 1}
                      </span>
                      <h3 className="text-base font-semibold text-slate-100 mt-2">
                        {prob.q}
                      </h3>
                    </div>

                    {/* Step-by-Step Boxed Solution */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Step-by-Step Derivation &amp; Solution (4-Box Format):</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-slate-300 whitespace-pre-line leading-relaxed">
                        <KatexText htmlOrText={prob.solution} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            TAB 3: INTERACTIVE CBT OBJECTIVE MCQS (TICKABLE WITH FEEDBACK)
           ========================================================================= */}
        {activeTab === 'mcq' && (
          <div className="space-y-6">
            {/* Header Score & Filter Bar */}
            <div className={`p-4 rounded-xl ${themeClasses.card} flex items-center justify-between gap-3 flex-wrap`}>
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <span>Interactive CBT Objective Questions</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  1-mark university questions · Instant green/red validation with detailed explanations
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Score Pill */}
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono">
                  <span className="text-slate-400">Score: </span>
                  <strong className="text-emerald-400">{mcqStats.correct}</strong>
                  <span className="text-slate-500"> / {mcqStats.attempted}</span>
                  <span className="text-cyan-400 ml-1.5 font-bold">({mcqStats.pct}%)</span>
                </div>

                {/* Filter Missed Button */}
                <button
                  type="button"
                  onClick={() => setOnlyMissed(!onlyMissed)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                    onlyMissed
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {onlyMissed ? 'Showing Missed Only' : 'Filter Missed'}
                </button>

                {/* Reset Answers */}
                <button
                  type="button"
                  onClick={() => setUserAnswers({})}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  title="Reset All Answers"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Questions List */}
            {filteredMcqs.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm">
                No questions found under this filter. Reset your filters to continue practicing.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMcqs.map((q, idx) => {
                  const selectedIdx = userAnswers[q.id];
                  const hasAnswered = selectedIdx !== undefined;
                  const isCorrect = hasAnswered && selectedIdx === q.ans;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl ${themeClasses.card} space-y-4 transition-all ${
                        hasAnswered
                          ? isCorrect
                            ? 'border-emerald-500/50 bg-emerald-950/10'
                            : 'border-rose-500/50 bg-rose-950/10'
                          : ''
                      }`}
                    >
                      {/* Question Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-slate-800 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold border border-slate-700">
                            Q{idx + 1}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            Unit {q.unitNo} · {q.topic}
                          </span>
                        </div>
                        {hasAnswered && (
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                              isCorrect
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" /> Incorrect
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      {/* Question Text */}
                      <p className="text-sm sm:text-base font-semibold text-slate-100">
                        {q.q}
                      </p>

                      {/* 4 Tickable Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedIdx === optIdx;
                          const isOptionCorrect = q.ans === optIdx;

                          let optionBtnClass = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900';
                          if (hasAnswered) {
                            if (isOptionCorrect) {
                              optionBtnClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold shadow-xs';
                            } else if (isOptionSelected) {
                              optionBtnClass = 'border-rose-500 bg-rose-500/20 text-rose-200 font-semibold';
                            } else {
                              optionBtnClass = 'border-slate-900 bg-slate-950/30 text-slate-500 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => {
                                setUserAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: optIdx,
                                }));
                              }}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs sm:text-sm transition-all ${optionBtnClass}`}
                            >
                              <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono shrink-0">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="flex-1 leading-snug">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Drawer (Shows upon answering) */}
                      {hasAnswered && (
                        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                          <strong className="text-cyan-300 font-semibold flex items-center gap-1">
                            <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Detailed Exam Explanation:</span>
                          </strong>
                          <p className="leading-relaxed text-slate-400">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 4: EXAM GUESS QUESTIONS (2M, 5M, 10M)
           ========================================================================= */}
        {activeTab === 'guess' && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl ${themeClasses.card} flex items-center justify-between gap-3`}>
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>BEU 2026 High-Probability Guess Questions</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hand-picked based on question patterns from GEC Bhojpur, Lakhisarai, Aurangabad &amp; LNJPIT Chapra
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                ⭐ 95% Yield
              </span>
            </div>

            {/* Guess Question Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 2-Mark Short Concept Questions */}
              <div className={`p-5 rounded-2xl ${themeClasses.card} space-y-3`}>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                  <Zap className="w-4 h-4" />
                  <span>2 Marks — Rapid Definitions &amp; Formulae</span>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-slate-100 block mb-1">
                      1. State the condition for Maximum Power Transfer in DC circuits.
                    </strong>
                    <span className="text-slate-400">
                      R_L = R_th. The maximum power delivered is P_max = V_th² / (4·R_th) with 50% efficiency.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-slate-100 block mb-1">
                      2. Define the rank of a matrix in terms of its row echelon form.
                    </strong>
                    <span className="text-slate-400">
                      The rank ρ(A) equals the number of non-zero rows after reducing A to row echelon form using elementary row operations.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-slate-100 block mb-1">
                      3. Why is the center of Newton&apos;s rings dark under reflected light?
                    </strong>
                    <span className="text-slate-400">
                      At contact point t = 0, Stokes&apos; phase shift of π at denser glass boundary introduces path difference λ/2, causing destructive interference.
                    </span>
                  </div>
                </div>
              </div>

              {/* 5-Mark & 10-Mark Core Long Questions */}
              <div className={`p-5 rounded-2xl ${themeClasses.card} space-y-3`}>
                <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                  <Award className="w-4 h-4" />
                  <span>5 &amp; 10 Marks — Derivations &amp; Schematics</span>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-slate-100 block mb-1">
                      1. Prove that for y = (sin⁻¹ x)², (1 - x²)y_(n+2) - (2n+1)x y_(n+1) - n² y_n = 0.
                    </strong>
                    <span className="text-slate-400">
                      Differentiate once: (1-x²)y₁² = 4y. Differentiate again: (1-x²)y₂ - xy₁ - 2 = 0. Apply Leibnitz n times.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-slate-100 block mb-1">
                      2. Explain Full-Wave Bridge Rectifier with waveforms, V_dc, and ripple factor.
                    </strong>
                    <span className="text-slate-400">
                      Draw 4-diode diamond bridge. Derive V_dc = 2V_m/π, V_rms = V_m/√2, η = 81.2%, and γ = 0.482.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-slate-100 block mb-1">
                      3. State Maxwell&apos;s 4 equations and derive the Displacement Current density J_d.
                    </strong>
                    <span className="text-slate-400">
                      Show Ampere law inconsistency with charge continuity. Introduce J_d = ∂D/∂t = ε₀(∂E/∂t).
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: AUTHENTIC 2026 BEU SOLVED EXAM PAPERS
           ========================================================================= */}
        {activeTab === 'papers' && (
          <div className="space-y-6">
            {currentPaper ? (
              <div className={`p-6 rounded-2xl ${themeClasses.card} space-y-6`}>
                {/* Paper Header */}
                <div className="border-b border-slate-800 pb-4 text-center space-y-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                    {currentPaper.colleges}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">
                    {currentPaper.title}
                  </h2>
                  <div className="text-xs text-slate-400 font-mono flex items-center justify-center gap-4 pt-1">
                    <span>Course Code: {currentPaper.code}</span>
                    <span>Full Marks: {currentPaper.fullMarks}</span>
                    <span>Time: {currentPaper.timeHours} Hours</span>
                  </div>
                  <p className="text-xs text-amber-300/90 italic pt-1">
                    Instructions: {currentPaper.instructions}
                  </p>
                </div>

                {/* Sections & Questions */}
                <div className="space-y-6">
                  {currentPaper.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                        {sec.name}
                      </div>

                      <div className="space-y-4">
                        {sec.questions.map((q, qIdx) => (
                          <div
                            key={qIdx}
                            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                                <span className="text-cyan-400">Q.{q.qNum}</span>
                                <span className="font-mono text-xs text-slate-400">
                                  [{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]
                                </span>
                              </h3>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                              {q.q}
                            </p>

                            {/* Solved Answer */}
                            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-emerald-500/20 text-xs sm:text-sm font-mono text-emerald-200 whitespace-pre-line leading-relaxed">
                              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Official Verified Topper Solution:</span>
                              </div>
                              <KatexText htmlOrText={q.sol} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm">
                No transcribed paper available for this subject yet.
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 6: TIMED MOCK EXAM SIMULATOR
           ========================================================================= */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl ${themeClasses.card} space-y-5 text-center`}>
              <div className="inline-flex p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-1">
                <Clock className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-100">
                15-Minute Rapid Mid-Sem Diagnostic Simulator
              </h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Test your speed and accuracy on 10 randomized high-yield questions for {currentCourse.title}. Timed simulation replicates actual exam pressure.
              </p>

              {/* Timer Display */}
              <div className="py-2">
                <span className="font-mono text-4xl sm:text-5xl font-extrabold text-cyan-300 tracking-wider">
                  {Math.floor(mockSecondsLeft / 60)
                    .toString()
                    .padStart(2, '0')}
                  :
                  {(mockSecondsLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                {!mockRunning && !mockSubmitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMockRunning(true);
                      setMockSecondsLeft(900);
                      setMockUserAnswers({});
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Start Timed Mock Test</span>
                  </button>
                ) : mockRunning ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMockSubmitted(true);
                      setMockRunning(false);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit &amp; View Result</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMockSubmitted(false);
                      setMockRunning(false);
                      setMockSecondsLeft(900);
                      setMockUserAnswers({});
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Simulator</span>
                  </button>
                )}
              </div>
            </div>

            {/* Questions while running or submitted */}
            {(mockRunning || mockSubmitted) && (
              <div className="space-y-4">
                {filteredMcqs.slice(0, 10).map((q, idx) => {
                  const userAns = mockUserAnswers[q.id];
                  const answered = userAns !== undefined;
                  const correct = answered && userAns === q.ans;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl ${themeClasses.card} space-y-3 ${
                        mockSubmitted
                          ? correct
                            ? 'border-emerald-500/50 bg-emerald-950/10'
                            : 'border-rose-500/50 bg-rose-950/10'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>Question {idx + 1} of 10</span>
                        <span>Unit {q.unitNo}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-100">{q.q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={mockSubmitted}
                            onClick={() => {
                              if (!mockSubmitted) {
                                setMockUserAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: oIdx,
                                }));
                              }
                            }}
                            className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                              userAns === oIdx
                                ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                                : 'border-slate-800 bg-slate-900/60 text-slate-400'
                            } ${
                              mockSubmitted && q.ans === oIdx
                                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                                : ''
                            }`}
                          >
                            <span className="font-mono mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                      {mockSubmitted && (
                        <div className="text-xs text-slate-300 pt-2 border-t border-slate-800">
                          <strong className="text-cyan-300">Explanation: </strong>
                          <span>{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 7: 15-PILLAR FULL MARKS SCORE PREDICTOR
           ========================================================================= */}
        {activeTab === 'predictor' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl ${themeClasses.card} space-y-4`}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>15-Pillar Full Marks (20/20) Readiness Audit</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tick each item you have verified. Aim for 100% to guarantee full marks in Semester-I Mid-Sem exams.
                  </p>
                </div>
                {/* Readiness Meter */}
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">Predicted Readiness</div>
                  <div className="text-2xl font-extrabold text-amber-400 font-mono">
                    {totalPillarsScore}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-cyan-500 via-amber-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${totalPillarsScore}%` }}
                />
              </div>

              {/* Checklist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
                {READINESS_PILLARS.map((pillar) => {
                  const checked = !!readinessChecks[pillar.id];
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() =>
                        setReadinessChecks((prev) => ({
                          ...prev,
                          [pillar.id]: !prev[pillar.id],
                        }))
                      }
                      className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-colors ${
                        checked
                          ? 'border-emerald-500/40 bg-emerald-950/20 text-slate-200'
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <div className="text-xs">
                        <span className="font-semibold block leading-snug">{pillar.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Pillar weight: +{pillar.weight}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 8: INTERACTIVE ENGINEERING CALCULATORS
           ========================================================================= */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Series RLC Resonant Frequency Calculator */}
            <div className={`p-5 rounded-2xl ${themeClasses.card} space-y-4`}>
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Series RLC Resonant Frequency (f_0)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Formula: f_0 = 1 / [2π√(L · C)]
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Inductance L (Henrys):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={rlcL}
                    onChange={(e) => setRlcL(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Capacitance C (µF):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rlcC}
                    onChange={(e) => setRlcC(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-center font-mono">
                <span className="text-xs text-slate-400">Resonant Frequency f_0: </span>
                <strong className="text-lg text-cyan-300">{rlcResonantFreq} Hz</strong>
              </div>
            </div>

            {/* 2. Thevenin Maximum Power Calculator */}
            <div className={`p-5 rounded-2xl ${themeClasses.card} space-y-4`}>
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Thevenin &amp; Max Power Calculator</span>
              </h3>
              <p className="text-xs text-slate-400">
                Formula: I_L = V_th / (R_th + R_L), P_L = I_L² · R_L
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">V_th (V):</label>
                  <input
                    type="number"
                    value={thevV}
                    onChange={(e) => setThevV(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">R_th (Ω):</label>
                  <input
                    type="number"
                    value={thevR}
                    onChange={(e) => setThevR(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">R_L (Ω):</label>
                  <input
                    type="number"
                    value={thevRl}
                    onChange={(e) => setThevRl(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-center font-mono flex items-center justify-around">
                <div>
                  <span className="text-[11px] text-slate-400 block">Load Current I_L</span>
                  <strong className="text-sm text-cyan-300">{theveninPower.il} A</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Load Power P_L</span>
                  <strong className="text-sm text-cyan-300">{theveninPower.pl} W</strong>
                </div>
              </div>
            </div>

            {/* 3. Optical Fiber Numerical Aperture (NA) Calculator */}
            <div className={`p-5 rounded-2xl ${themeClasses.card} space-y-4`}>
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Optical Fiber NA &amp; Acceptance Angle</span>
              </h3>
              <p className="text-xs text-slate-400">
                Formula: NA = √(n₁² - n₂²), θ_a = arcsin(NA), θ_c = arcsin(n₂/n₁)
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Core Index n1:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={fiberN1}
                    onChange={(e) => setFiberN1(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Cladding Index n2:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={fiberN2}
                    onChange={(e) => setFiberN2(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-center font-mono flex items-center justify-around">
                <div>
                  <span className="text-[11px] text-slate-400 block">NA</span>
                  <strong className="text-sm text-cyan-300">{fiberParams.na}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Acceptance Angle</span>
                  <strong className="text-sm text-cyan-300">{fiberParams.thetaA}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Critical Angle</span>
                  <strong className="text-sm text-cyan-300">{fiberParams.thetaC}</strong>
                </div>
              </div>
            </div>

            {/* 4. Cache Average Access Time Calculator */}
            <div className={`p-5 rounded-2xl ${themeClasses.card} space-y-4`}>
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Cache Memory Average Access Time</span>
              </h3>
              <p className="text-xs text-slate-400">
                Formula: T_avg = h · t_c + (1 - h) · t_m
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Hit Ratio h (0-1):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={cacheH}
                    onChange={(e) => setCacheH(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Cache t_c (ns):</label>
                  <input
                    type="number"
                    value={cacheTc}
                    onChange={(e) => setCacheTc(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Main t_m (ns):</label>
                  <input
                    type="number"
                    value={cacheTm}
                    onChange={(e) => setCacheTm(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                  />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-center font-mono">
                <span className="text-xs text-slate-400">Average Memory Access Time T_avg: </span>
                <strong className="text-lg text-cyan-300">{cacheTavg} ns</strong>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
