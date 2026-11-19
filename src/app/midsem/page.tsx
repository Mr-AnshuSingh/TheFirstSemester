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
  Zap,
  Printer,
  ArrowLeft,
  Calculator,
  Sparkles,
  Filter,
  CheckSquare,
  Square,
  Cpu,
  Layers,
  Play,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';
import {
  MIDSEM_DATA,
  BEU_REAL_PAPERS_2026,
  MidsemCourse,
  MidsemUnit,
  BeuPaper,
} from '@/data/midsemNotes';
import { MIDSEM_MCQS, MidsemMcq } from '@/data/midsemMCQs';
import { MIDSEM_DIAGRAMS, MidsemDiagram } from '@/data/midsemDiagrams';
import { LNJPIT_EXAM_SITTINGS, LNJPIT_EXAM_NOTICE, ExamSitting } from '@/data/midsemTimetable';
import { KatexText } from '@/components/study/KatexRenderer';

type ViewTab = 'notes' | 'numericals' | 'mcq' | 'guess' | 'papers' | 'simulator' | 'predictor' | 'calculator';
type ThemeMode = 'notebook' | 'parchment';

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
  const [theme, setTheme] = useState<ThemeMode>('notebook');

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
      // Find target date
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
    if (thevR + thevRl <= 0) return { il: '0.000', pl: '0.000' };
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

  // Notebook Theme Palette Configurations
  const currentTheme = {
    notebook: {
      bg: 'bg-paper',
      text: 'text-ink',
      subtext: 'text-dim',
      headerBg: 'bg-paper/95',
      card: 'bg-paper2 border-2 border-ink shadow-sketchy',
      cardInner: 'bg-paper border-2 border-ink shadow-sketchy',
      box: 'border-2 border-ink shadow-sketchy',
      codeBox: 'bg-paper3 border-2 border-ink/40 text-ink',
      tipBox: 'bg-gold/15 border-2 border-accentGold/60 text-ink',
      pillActive: 'bg-accentRed text-paper border-2 border-ink shadow-sketch',
      pillInactive: 'bg-paper text-ink border-2 border-ink/40 hover:bg-paper3 hover:border-ink',
      tabActive: 'bg-paper text-ink border-2 border-ink shadow-sketch',
      tabInactive: 'text-dim hover:text-ink hover:bg-paper2 border-2 border-transparent',
    },
    parchment: {
      bg: 'bg-[#ede3cc]',
      text: 'text-[#2b2217]',
      subtext: 'text-[#5a4a35]',
      headerBg: 'bg-[#ede3cc]/95',
      card: 'bg-[#e2d5b8] border-2 border-[#3d3122] shadow-sketchy',
      cardInner: 'bg-[#f4ebd6] border-2 border-[#3d3122] shadow-sketchy',
      box: 'border-2 border-[#3d3122] shadow-sketchy',
      codeBox: 'bg-[#dacab0] border-2 border-[#3d3122]/40 text-[#2b2217]',
      tipBox: 'bg-[#e8c872]/25 border-2 border-[#b8810b]/70 text-[#2b2217]',
      pillActive: 'bg-[#9e3512] text-white border-2 border-[#3d3122] shadow-sketch',
      pillInactive: 'bg-[#f4ebd6] text-[#2b2217] border-2 border-[#3d3122]/40 hover:bg-[#dacab0]',
      tabActive: 'bg-[#f4ebd6] text-[#2b2217] border-2 border-[#3d3122] shadow-sketch',
      tabInactive: 'text-[#5a4a35] hover:text-[#2b2217] hover:bg-[#e2d5b8] border-2 border-transparent',
    },
  }[theme];

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-200 font-sans pb-24 overflow-x-hidden selection:bg-gold/30 selection:text-ink`}>
      {/* =========================================================================
          TOP COMMAND HUD (NOTEBOOK HEADER)
         ========================================================================= */}
      <header className={`sticky top-0 z-40 border-b-2 border-ink ${currentTheme.headerBg} backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 shadow-sketchy`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-3 flex-wrap">
          {/* Brand & Routine Info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Link
              href="/"
              className="btn flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs font-bold border-2 border-ink bg-paper2 hover:bg-ink hover:text-paper shadow-sketchy transition-colors shrink-0"
              title="Return to Main Notebook"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Sem-I</span>
              <span className="sm:hidden">Sem-I</span>
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-hand text-xl sm:text-2xl md:text-3xl font-bold text-ink flex items-center gap-1.5 leading-none">
                  <span className="text-accentRed">⚡ M&amp;C Mid-Sem Hub</span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full border-2 border-ink bg-gold/25 text-ink font-mono font-bold shadow-sketchy shrink-0">
                    2026
                  </span>
                </span>
                <span className="hidden md:inline-block text-xs font-semibold text-dim">
                  LNJPIT Chapra · Group A
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-dim truncate max-w-[250px] sm:max-w-md font-mono mt-0.5">
                Ref: {LNJPIT_EXAM_NOTICE.refNo} · Revised Routine: Nov 25–27, 2026
              </p>
            </div>
          </div>

          {/* Countdown, Theme & Quick Controls */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {/* Live Countdown Pill */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border-2 border-ink bg-paper2 text-ink font-mono text-[11px] sm:text-xs shadow-sketchy">
              <Clock className="w-3.5 h-3.5 animate-pulse text-accentRed" />
              <span className="hidden sm:inline text-dim font-bold">Starts:</span>
              <strong className="text-accentRed font-bold">{timeUntilNext || '25 Nov 2026'}</strong>
            </div>

            {/* Theme Toggle (Notebook, Parchment) */}
            <div className="flex items-center bg-paper2 border-2 border-ink rounded-lg p-0.5 text-xs shadow-sketchy">
              {(['notebook', 'parchment'] as ThemeMode[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded font-bold capitalize text-[11px] sm:text-xs transition-colors ${
                    theme === t
                      ? 'bg-ink text-paper shadow-xs'
                      : 'text-dim hover:text-ink'
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
              className="btn flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 border-2 border-ink bg-paper2 hover:bg-ink hover:text-paper text-xs text-ink font-bold shadow-sketchy transition-colors"
              title="Print A4 Clean Notes & Papers"
            >
              <Printer className="w-3.5 h-3.5 text-dim" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SITTING BANNER (OFFICIAL LNJPIT CHAPRA SCHEDULE)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 pt-4">
        <div className={`rounded-xl p-3 sm:p-4 ${currentTheme.card}`}>
          <div className="flex items-center justify-between gap-2 flex-wrap mb-2.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accentRed" />
              <span className="font-hand text-xl font-bold text-ink">
                Official Examination Schedule (Mathematics &amp; Computing Group A)
              </span>
            </div>
            <span className="text-[11px] text-dim font-mono font-bold">
              Full Marks: 20 · Time: 2 Hours per sitting · Revised Routine Nov 2026
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
                  className={`flex flex-col text-left p-2.5 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-ink bg-gold/30 shadow-sketch font-bold scale-[1.02]'
                      : 'border-ink/40 bg-paper hover:border-ink hover:bg-paper3 shadow-sketchy'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-dim font-mono mb-1">
                    <span>{sitting.day.slice(0, 3)}, {sitting.date.slice(5)}</span>
                    <span className="font-bold text-accentRed">{sitting.timing.split('–')[0].trim()}</span>
                  </div>
                  <strong className="font-hand text-lg font-bold text-ink leading-tight">
                    {sitting.subjectShort}
                  </strong>
                  <span className="text-[10px] text-dim truncate mt-0.5 font-mono">
                    {sitting.sitting} · {sitting.subjectCode}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUBJECT AND SCOPE STRIP
         ========================================================================= */}
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                  active ? currentTheme.pillActive : currentTheme.pillInactive
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-ink/30 shrink-0"
                  style={{ backgroundColor: course.color }}
                />
                <span className="font-hand text-lg leading-none">{course.short}</span>
                <span className={`text-[11px] font-mono ${active ? 'text-paper/90' : 'text-dim'}`}>
                  ({course.code})
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Unit Filter & Feature Tabs */}
        <div className="flex items-center justify-between gap-3 mt-3 flex-wrap border-b-2 border-ink/30 pb-3">
          {/* Unit Scope Filter */}
          <div className="flex items-center gap-1.5 bg-paper2 p-1 rounded-xl border-2 border-ink shadow-sketchy text-xs">
            <span className="text-dim px-2 font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-accentRed" />
              <span>Scope:</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveUnitNo(0)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                activeUnitNo === 0
                  ? 'bg-ink text-paper shadow-xs'
                  : 'text-dim hover:text-ink hover:bg-paper3'
              }`}
            >
              All Units (1, 2 &amp; 3)
            </button>
            {[1, 2, 3].map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setActiveUnitNo(u)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  activeUnitNo === u
                    ? 'bg-ink text-paper shadow-xs'
                    : 'text-dim hover:text-ink hover:bg-paper3'
                }`}
              >
                Unit {u}
              </button>
            ))}
          </div>

          {/* View Mode Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    isTabActive ? currentTheme.tabActive : currentTheme.tabInactive
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-accentRed" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTENT AREA
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 pt-6">
        {/* Active Subject Meta Card */}
        <div className={`p-5 rounded-2xl mb-6 flex items-start justify-between gap-4 flex-wrap ${currentTheme.card}`}>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs px-2.5 py-0.5 rounded-md font-mono font-bold border-2 border-ink bg-paper text-ink shadow-sketchy">
                Code: {currentCourse.code}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-mono font-semibold border-2 border-ink bg-gold/25 text-ink shadow-sketchy">
                {currentSitting?.day} · {currentSitting?.sitting} ({currentSitting?.timing})
              </span>
            </div>
            <h1 className="font-hand text-2xl sm:text-3xl font-bold text-ink">
              {currentCourse.title}
            </h1>
            <p className="text-xs text-dim mt-1">
              Focus: <span className="text-ink font-semibold">{currentSitting?.keyFocus}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <div className="text-[11px] text-dim uppercase tracking-wider font-mono font-bold">Exam Syllabus</div>
              <div className="text-sm font-bold text-accentRed font-mono">
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
              <section key={unit.unitNo} className={`p-5 sm:p-6 rounded-2xl ${currentTheme.card}`}>
                {/* Unit Header */}
                <div className="border-b-2 border-ink/30 pb-3 mb-5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h2 className="font-hand text-2xl sm:text-3xl font-bold text-ink flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg border-2 border-ink bg-accentTeal text-paper flex items-center justify-center text-sm font-bold shadow-sketchy">
                        {unit.unitNo}
                      </span>
                      <span>{unit.title}</span>
                    </h2>
                    <span className="text-xs font-mono font-bold text-dim bg-paper border-2 border-ink px-2.5 py-0.5 rounded-lg shadow-sketchy">
                      {unit.topics.length} Key Topics
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-dim mt-1.5 leading-relaxed">{unit.summary}</p>
                </div>

                {/* Inline SVG Diagrams for this Unit */}
                {currentDiagrams.filter((d) => d.unitNo === unit.unitNo).length > 0 && (
                  <div className="mb-6 space-y-4">
                    {currentDiagrams
                      .filter((d) => d.unitNo === unit.unitNo)
                      .map((diag) => (
                        <div key={diag.id} className={`p-4 rounded-xl ${currentTheme.cardInner}`}>
                          <div className="flex items-center justify-between text-xs font-bold text-ink mb-2">
                            <span className="font-hand text-lg">📐 Exam Schematic: {diag.title}</span>
                            <span className="text-[11px] font-mono border-2 border-ink/40 bg-paper2 px-2 py-0.5 rounded shadow-sketchy text-dim">
                              SVG Schematic
                            </span>
                          </div>
                          <div
                            className="overflow-x-auto rounded-xl border-2 border-ink bg-paper3 p-2 shadow-sketchy"
                            dangerouslySetInnerHTML={{ __html: diag.svg }}
                          />
                          <p className="text-xs text-dim mt-2 italic leading-relaxed">
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
                      className={`p-4 sm:p-5 rounded-xl ${currentTheme.cardInner} space-y-3`}
                    >
                      <h3 className="font-hand text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
                        <span className="text-accentRed">§ {tIdx + 1}.</span>
                        <span>{topic.heading}</span>
                      </h3>

                      {/* Plain Explanation */}
                      <p className="text-sm text-ink/90 leading-relaxed font-sans">
                        {topic.plainExplanation}
                      </p>

                      {/* Key Formula Box */}
                      <div className={`p-3.5 rounded-xl ${currentTheme.codeBox} text-xs sm:text-sm font-mono whitespace-pre-line leading-relaxed shadow-xs`}>
                        <div className="text-[10px] text-accentRed font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-accentRed" />
                          <span>Core Equations &amp; Formulas:</span>
                        </div>
                        <KatexText htmlOrText={topic.keyFormula} />
                      </div>

                      {/* Exam Tip Alert */}
                      <div className={`flex items-start gap-2.5 p-3 rounded-xl ${currentTheme.tipBox} text-xs leading-relaxed shadow-sketchy`}>
                        <Lightbulb className="w-4 h-4 text-accentGold shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-ink font-bold">Topper Exam Tip: </strong>
                          <span className="text-ink/90 font-medium">{topic.examTip}</span>
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
                <h2 className="font-hand text-2xl font-bold text-ink flex items-center gap-2 border-b-2 border-ink/30 pb-2">
                  <Target className="w-5 h-5 text-accentRed" />
                  <span>{unit.title} — Solved Problems</span>
                </h2>

                {unit.standardProblems.map((prob, pIdx) => (
                  <div
                    key={pIdx}
                    className={`p-5 rounded-2xl ${currentTheme.card} space-y-4 border-l-6 border-l-accentTeal`}
                  >
                    {/* Problem Statement */}
                    <div>
                      <span className="text-xs px-2.5 py-0.5 rounded font-mono font-bold border-2 border-ink bg-accentTeal text-paper shadow-sketchy">
                        Problem {unit.unitNo}.{pIdx + 1}
                      </span>
                      <h3 className="text-base font-bold text-ink mt-2">
                        {prob.q}
                      </h3>
                    </div>

                    {/* Step-by-Step Boxed Solution */}
                    <div className={`p-4 rounded-xl ${currentTheme.cardInner} space-y-2`}>
                      <div className="text-xs font-bold text-accentTeal uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-accentGreen" />
                        <span>Step-by-Step Derivation &amp; Solution (4-Box Format):</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-ink whitespace-pre-line leading-relaxed">
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
            <div className={`p-4 rounded-xl ${currentTheme.card} flex items-center justify-between gap-3 flex-wrap`}>
              <div>
                <h2 className="font-hand text-2xl font-bold text-ink flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accentRed" />
                  <span>Interactive CBT Objective Questions</span>
                </h2>
                <p className="text-xs text-dim mt-0.5 font-medium">
                  1-mark university questions · Instant green/red validation with detailed explanations
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Score Pill */}
                <div className="px-3.5 py-1.5 rounded-lg border-2 border-ink bg-paper text-xs font-mono font-bold text-ink shadow-sketchy">
                  <span className="text-dim">Score: </span>
                  <strong className="text-accentGreen">{mcqStats.correct}</strong>
                  <span className="text-dim"> / {mcqStats.attempted}</span>
                  <span className="text-accentRed ml-1.5 font-bold">({mcqStats.pct}%)</span>
                </div>

                {/* Filter Missed Button */}
                <button
                  type="button"
                  onClick={() => setOnlyMissed(!onlyMissed)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold border-2 transition-colors shadow-sketchy ${
                    onlyMissed
                      ? 'border-accentRed bg-accentRed text-paper'
                      : 'border-ink bg-paper text-ink hover:bg-paper3'
                  }`}
                >
                  {onlyMissed ? 'Showing Missed Only' : 'Filter Missed'}
                </button>

                {/* Reset Answers */}
                <button
                  type="button"
                  onClick={() => setUserAnswers({})}
                  className="p-1.5 rounded-lg border-2 border-ink bg-paper text-dim hover:text-ink hover:bg-paper3 shadow-sketchy"
                  title="Reset All Answers"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Questions List */}
            {filteredMcqs.length === 0 ? (
              <div className={`p-8 text-center rounded-xl border-2 border-ink bg-paper2 text-dim text-sm shadow-sketchy`}>
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
                      className={`p-5 rounded-2xl border-2 shadow-sketchy space-y-4 transition-all ${
                        hasAnswered
                          ? isCorrect
                            ? 'border-accentGreen bg-accentGreen/15'
                            : 'border-accentRed bg-accentRed/15'
                          : 'border-ink bg-paper'
                      }`}
                    >
                      {/* Question Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-md border-2 border-ink bg-paper2 text-ink flex items-center justify-center text-xs font-mono font-bold shadow-sketchy">
                            Q{idx + 1}
                          </span>
                          <span className="text-xs font-mono font-semibold text-dim">
                            Unit {q.unitNo} · {q.topic}
                          </span>
                        </div>
                        {hasAnswered && (
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-md border-2 flex items-center gap-1 shadow-sketchy ${
                              isCorrect
                                ? 'border-accentGreen bg-accentGreen text-paper'
                                : 'border-accentRed bg-accentRed text-paper'
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
                      <p className="text-sm sm:text-base font-bold text-ink">
                        {q.q}
                      </p>

                      {/* 4 Tickable Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedIdx === optIdx;
                          const isOptionCorrect = q.ans === optIdx;

                          let optionBtnClass = 'border-2 border-ink/40 bg-paper2 text-ink hover:border-ink hover:bg-paper3';
                          if (hasAnswered) {
                            if (isOptionCorrect) {
                              optionBtnClass = 'border-2 border-accentGreen bg-accentGreen/25 text-ink font-bold shadow-sketchy';
                            } else if (isOptionSelected) {
                              optionBtnClass = 'border-2 border-accentRed bg-accentRed/25 text-ink font-bold shadow-sketchy';
                            } else {
                              optionBtnClass = 'border-2 border-ink/20 bg-paper text-dim opacity-50';
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
                              className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs sm:text-sm transition-all shadow-sketchy ${optionBtnClass}`}
                            >
                              <span className="w-6 h-6 rounded-full border-2 border-ink flex items-center justify-center text-xs font-mono font-bold shrink-0 bg-paper">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="flex-1 leading-snug font-medium">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Drawer */}
                      {hasAnswered && (
                        <div className="p-3.5 rounded-xl border-2 border-ink/40 bg-gold/15 text-xs text-ink space-y-1 shadow-sketchy">
                          <strong className="text-accentRed font-bold flex items-center gap-1">
                            <Lightbulb className="w-4 h-4 text-accentGold" />
                            <span>Detailed Exam Explanation:</span>
                          </strong>
                          <p className="leading-relaxed text-ink/90 font-medium">{q.explanation}</p>
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
            <div className={`p-4 rounded-xl ${currentTheme.card} flex items-center justify-between gap-3 flex-wrap`}>
              <div>
                <h2 className="font-hand text-2xl font-bold text-ink flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accentGold" />
                  <span>BEU 2026 High-Probability Guess Questions</span>
                </h2>
                <p className="text-xs text-dim mt-0.5 font-medium">
                  Hand-picked based on question patterns from GEC Bhojpur, Lakhisarai, Aurangabad &amp; LNJPIT Chapra
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full border-2 border-ink bg-gold/30 text-ink font-mono font-bold shadow-sketchy">
                ⭐ 95% Yield
              </span>
            </div>

            {/* Guess Question Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 2-Mark Short Concept Questions */}
              <div className={`p-5 rounded-2xl ${currentTheme.card} space-y-3`}>
                <div className="flex items-center gap-2 text-xs font-bold text-accentTeal uppercase tracking-wider border-b-2 border-ink/20 pb-2">
                  <Zap className="w-4 h-4" />
                  <span>2 Marks — Rapid Definitions &amp; Formulae</span>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-ink">
                  <div className={`p-3 rounded-xl border-2 border-ink/30 bg-paper shadow-sketchy`}>
                    <strong className="text-ink block mb-1 font-bold text-sm">
                      1. State the condition for Maximum Power Transfer in DC circuits.
                    </strong>
                    <span className="text-dim font-medium">
                      R_L = R_th. The maximum power delivered is P_max = V_th² / (4·R_th) with 50% efficiency.
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border-2 border-ink/30 bg-paper shadow-sketchy`}>
                    <strong className="text-ink block mb-1 font-bold text-sm">
                      2. Define the rank of a matrix in terms of its row echelon form.
                    </strong>
                    <span className="text-dim font-medium">
                      The rank ρ(A) equals the number of non-zero rows after reducing A to row echelon form using elementary row operations.
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border-2 border-ink/30 bg-paper shadow-sketchy`}>
                    <strong className="text-ink block mb-1 font-bold text-sm">
                      3. Why is the center of Newton&apos;s rings dark under reflected light?
                    </strong>
                    <span className="text-dim font-medium">
                      At contact point t = 0, Stokes&apos; phase shift of π at denser glass boundary introduces path difference λ/2, causing destructive interference.
                    </span>
                  </div>
                </div>
              </div>

              {/* 5-Mark & 10-Mark Core Long Questions */}
              <div className={`p-5 rounded-2xl ${currentTheme.card} space-y-3`}>
                <div className="flex items-center gap-2 text-xs font-bold text-accentRed uppercase tracking-wider border-b-2 border-ink/20 pb-2">
                  <Award className="w-4 h-4" />
                  <span>5 &amp; 10 Marks — Derivations &amp; Schematics</span>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-ink">
                  <div className={`p-3 rounded-xl border-2 border-ink/30 bg-paper shadow-sketchy`}>
                    <strong className="text-ink block mb-1 font-bold text-sm">
                      1. Prove that for y = (sin⁻¹ x)², (1 - x²)y_(n+2) - (2n+1)x y_(n+1) - n² y_n = 0.
                    </strong>
                    <span className="text-dim font-medium">
                      Differentiate once: (1-x²)y₁² = 4y. Differentiate again: (1-x²)y₂ - xy₁ - 2 = 0. Apply Leibnitz n times.
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border-2 border-ink/30 bg-paper shadow-sketchy`}>
                    <strong className="text-ink block mb-1 font-bold text-sm">
                      2. Explain Full-Wave Bridge Rectifier with waveforms, V_dc, and ripple factor.
                    </strong>
                    <span className="text-dim font-medium">
                      Draw 4-diode diamond bridge. Derive V_dc = 2V_m/π, V_rms = V_m/√2, η = 81.2%, and γ = 0.482.
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border-2 border-ink/30 bg-paper shadow-sketchy`}>
                    <strong className="text-ink block mb-1 font-bold text-sm">
                      3. State Maxwell&apos;s 4 equations and derive the Displacement Current density J_d.
                    </strong>
                    <span className="text-dim font-medium">
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
              <div className={`p-6 sm:p-8 rounded-2xl ${currentTheme.card} space-y-6`}>
                {/* Paper Header */}
                <div className="border-b-2 border-ink/30 pb-4 text-center space-y-1.5">
                  <span className="text-xs px-3 py-1 rounded-full border-2 border-ink bg-paper text-ink font-mono font-bold shadow-sketchy inline-block">
                    {currentPaper.colleges}
                  </span>
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                    {currentPaper.title}
                  </h2>
                  <div className="text-xs text-dim font-mono flex items-center justify-center gap-4 pt-1 flex-wrap font-bold">
                    <span>Course Code: {currentPaper.code}</span>
                    <span>Full Marks: {currentPaper.fullMarks}</span>
                    <span>Time: {currentPaper.timeHours} Hours</span>
                  </div>
                  <p className="text-xs text-accentRed italic pt-1 font-medium">
                    Instructions: {currentPaper.instructions}
                  </p>
                </div>

                {/* Sections & Questions */}
                <div className="space-y-6">
                  {currentPaper.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-ink bg-paper px-3 py-1.5 rounded-lg border-2 border-ink shadow-sketchy inline-block">
                        {sec.name}
                      </div>

                      <div className="space-y-4">
                        {sec.questions.map((q, qIdx) => (
                          <div
                            key={qIdx}
                            className={`p-4 sm:p-5 rounded-xl ${currentTheme.cardInner} space-y-3`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                                <span className="text-accentRed font-mono font-bold">Q.{q.qNum}</span>
                                <span className="font-mono text-xs text-dim">
                                  [{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]
                                </span>
                              </h3>
                            </div>

                            <p className="text-xs sm:text-sm text-ink whitespace-pre-line leading-relaxed font-sans font-medium">
                              {q.q}
                            </p>

                            {/* Solved Answer */}
                            <div className={`p-3.5 rounded-xl border-2 border-accentTeal/50 bg-paper3 text-xs sm:text-sm font-mono text-ink whitespace-pre-line leading-relaxed shadow-xs`}>
                              <div className="text-[10px] text-accentTeal font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-accentGreen" />
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
              <div className={`p-8 text-center rounded-xl border-2 border-ink bg-paper2 text-dim text-sm shadow-sketchy`}>
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
            <div className={`p-6 sm:p-8 rounded-2xl ${currentTheme.card} space-y-5 text-center`}>
              <div className="inline-flex p-3 rounded-full border-2 border-ink bg-accentRed/10 text-accentRed mb-1 shadow-sketchy">
                <Clock className="w-8 h-8" />
              </div>
              <h2 className="font-hand text-2xl sm:text-3xl font-bold text-ink">
                15-Minute Rapid Mid-Sem Diagnostic Simulator
              </h2>
              <p className="text-xs text-dim max-w-lg mx-auto font-medium">
                Test your speed and accuracy on 10 randomized high-yield questions for {currentCourse.title}. Timed simulation replicates actual exam pressure.
              </p>

              {/* Timer Display */}
              <div className="py-2">
                <span className="font-mono text-5xl sm:text-6xl font-extrabold text-accentRed tracking-wider drop-shadow-xs">
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
                    className="btn red border-2 border-ink px-6 py-2.5 font-bold text-sm shadow-sketch transition-transform hover:scale-105"
                  >
                    <Play className="w-4 h-4 fill-white inline mr-1.5" />
                    <span>Start Timed Mock Test</span>
                  </button>
                ) : mockRunning ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMockSubmitted(true);
                      setMockRunning(false);
                    }}
                    className="btn border-2 border-ink bg-accentGreen text-paper hover:bg-ink hover:text-paper px-6 py-2.5 font-bold text-sm shadow-sketch transition-transform hover:scale-105"
                  >
                    <CheckCircle2 className="w-4 h-4 inline mr-1.5" />
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
                    className="btn border-2 border-ink bg-paper hover:bg-ink hover:text-paper px-6 py-2.5 font-bold text-sm shadow-sketch transition-transform hover:scale-105"
                  >
                    <RotateCcw className="w-4 h-4 inline mr-1.5" />
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
                      className={`p-5 rounded-2xl border-2 shadow-sketchy space-y-3 ${
                        mockSubmitted
                          ? correct
                            ? 'border-accentGreen bg-accentGreen/15'
                            : 'border-accentRed bg-accentRed/15'
                          : 'border-ink bg-paper'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-dim">
                        <span>Question {idx + 1} of 10</span>
                        <span>Unit {q.unitNo}</span>
                      </div>
                      <p className="text-sm font-bold text-ink">{q.q}</p>
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
                            className={`p-3 rounded-xl border-2 text-left text-xs transition-colors shadow-sketchy ${
                              userAns === oIdx
                                ? 'border-ink bg-accentTeal text-paper font-bold'
                                : 'border-ink/40 bg-paper2 text-ink hover:border-ink hover:bg-paper3'
                            } ${
                              mockSubmitted && q.ans === oIdx
                                ? 'border-accentGreen bg-accentGreen text-paper font-bold'
                                : ''
                            }`}
                          >
                            <span className="font-mono mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                      {mockSubmitted && (
                        <div className="text-xs text-ink pt-2 border-t-2 border-ink/20 font-medium">
                          <strong className="text-accentRed">Explanation: </strong>
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
            <div className={`p-6 sm:p-8 rounded-2xl ${currentTheme.card} space-y-4`}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-ink flex items-center gap-2">
                    <Award className="w-6 h-6 text-accentGold" />
                    <span>15-Pillar Full Marks (20/20) Readiness Audit</span>
                  </h2>
                  <p className="text-xs text-dim mt-0.5 font-medium">
                    Tick each item you have verified. Aim for 100% to guarantee full marks in Semester-I Mid-Sem exams.
                  </p>
                </div>
                {/* Readiness Meter */}
                <div className="text-right">
                  <div className="text-xs text-dim font-mono font-bold">Predicted Readiness</div>
                  <div className="font-mono text-3xl sm:text-4xl font-extrabold text-accentRed">
                    {totalPillarsScore}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-4 rounded-full border-2 border-ink bg-paper p-0.5 overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full bg-linear-to-r from-accentTeal via-accentGold to-accentRed transition-all duration-500"
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
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all shadow-sketchy ${
                        checked
                          ? 'border-accentGreen bg-accentGreen/15 text-ink'
                          : 'border-ink/40 bg-paper text-dim hover:border-ink hover:bg-paper3'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-accentGreen shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-dim shrink-0 mt-0.5" />
                      )}
                      <div className="text-xs">
                        <span className="font-bold text-ink block leading-snug">{pillar.label}</span>
                        <span className="text-[10px] text-dim font-mono font-medium">
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
            <div className={`p-6 rounded-2xl ${currentTheme.card} space-y-4`}>
              <h3 className="font-hand text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
                <Zap className="w-5 h-5 text-accentRed" />
                <span>Series RLC Resonant Frequency (f_0)</span>
              </h3>
              <p className="text-xs text-dim font-mono font-semibold">
                Formula: f_0 = 1 / [2π√(L · C)]
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-dim font-bold block mb-1">Inductance L (Henrys):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={rlcL}
                    onChange={(e) => setRlcL(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
                <div>
                  <label className="text-dim font-bold block mb-1">Capacitance C (µF):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rlcC}
                    onChange={(e) => setRlcC(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-ink bg-gold/20 text-center font-mono shadow-sketchy">
                <span className="text-xs text-dim font-semibold">Resonant Frequency f_0: </span>
                <strong className="text-lg text-accentRed font-bold">{rlcResonantFreq} Hz</strong>
              </div>
            </div>

            {/* 2. Thevenin Maximum Power Calculator */}
            <div className={`p-6 rounded-2xl ${currentTheme.card} space-y-4`}>
              <h3 className="font-hand text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
                <Cpu className="w-5 h-5 text-accentTeal" />
                <span>Thevenin &amp; Max Power Calculator</span>
              </h3>
              <p className="text-xs text-dim font-mono font-semibold">
                Formula: I_L = V_th / (R_th + R_L), P_L = I_L² · R_L
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-dim font-bold block mb-1">V_th (V):</label>
                  <input
                    type="number"
                    value={thevV}
                    onChange={(e) => setThevV(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
                <div>
                  <label className="text-dim font-bold block mb-1">R_th (Ω):</label>
                  <input
                    type="number"
                    value={thevR}
                    onChange={(e) => setThevR(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
                <div>
                  <label className="text-dim font-bold block mb-1">R_L (Ω):</label>
                  <input
                    type="number"
                    value={thevRl}
                    onChange={(e) => setThevRl(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-ink bg-gold/20 text-center font-mono flex items-center justify-around shadow-sketchy">
                <div>
                  <span className="text-[11px] text-dim block font-bold">Load Current I_L</span>
                  <strong className="text-sm text-accentTeal font-bold">{theveninPower.il} A</strong>
                </div>
                <div>
                  <span className="text-[11px] text-dim block font-bold">Load Power P_L</span>
                  <strong className="text-sm text-accentRed font-bold">{theveninPower.pl} W</strong>
                </div>
              </div>
            </div>

            {/* 3. Optical Fiber Numerical Aperture (NA) Calculator */}
            <div className={`p-6 rounded-2xl ${currentTheme.card} space-y-4`}>
              <h3 className="font-hand text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
                <Layers className="w-5 h-5 text-accentRed" />
                <span>Optical Fiber NA &amp; Acceptance Angle</span>
              </h3>
              <p className="text-xs text-dim font-mono font-semibold">
                Formula: NA = √(n₁² - n₂²), θ_a = arcsin(NA), θ_c = arcsin(n₂/n₁)
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-dim font-bold block mb-1">Core Index n1:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={fiberN1}
                    onChange={(e) => setFiberN1(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
                <div>
                  <label className="text-dim font-bold block mb-1">Cladding Index n2:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={fiberN2}
                    onChange={(e) => setFiberN2(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-ink bg-gold/20 text-center font-mono flex items-center justify-around shadow-sketchy">
                <div>
                  <span className="text-[11px] text-dim block font-bold">NA</span>
                  <strong className="text-sm text-accentRed font-bold">{fiberParams.na}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-dim block font-bold">Acceptance Angle</span>
                  <strong className="text-sm text-accentTeal font-bold">{fiberParams.thetaA}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-dim block font-bold">Critical Angle</span>
                  <strong className="text-sm text-ink font-bold">{fiberParams.thetaC}</strong>
                </div>
              </div>
            </div>

            {/* 4. Cache Average Access Time Calculator */}
            <div className={`p-6 rounded-2xl ${currentTheme.card} space-y-4`}>
              <h3 className="font-hand text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
                <Cpu className="w-5 h-5 text-accentTeal" />
                <span>Cache Memory Average Access Time</span>
              </h3>
              <p className="text-xs text-dim font-mono font-semibold">
                Formula: T_avg = h · t_c + (1 - h) · t_m
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-dim font-bold block mb-1">Hit Ratio h (0-1):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={cacheH}
                    onChange={(e) => setCacheH(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
                <div>
                  <label className="text-dim font-bold block mb-1">Cache t_c (ns):</label>
                  <input
                    type="number"
                    value={cacheTc}
                    onChange={(e) => setCacheTc(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
                <div>
                  <label className="text-dim font-bold block mb-1">Main t_m (ns):</label>
                  <input
                    type="number"
                    value={cacheTm}
                    onChange={(e) => setCacheTm(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border-2 border-ink bg-paper text-ink font-mono text-sm focus:border-accentRed focus:outline-none shadow-sketchy"
                  />
                </div>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-ink bg-gold/20 text-center font-mono shadow-sketchy">
                <span className="text-xs text-dim font-semibold">Average Memory Access Time T_avg: </span>
                <strong className="text-lg text-accentRed font-bold">{cacheTavg} ns</strong>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
