// ============================================================================
// LNJPIT CHAPRA — MID-SEMESTER EXAMINATION 2026 (OFFICIAL REVISED ROUTINE)
// Ref No: Ex-2026/657, Dated: 24.11.2026
// Branch: Mathematics & Computing (M&C) + CSE — Group A (Semester I)
// ============================================================================

export interface ExamSitting {
  id: string;
  date: string; // YYYY-MM-DD
  day: string;
  sitting: "1st Sitting" | "2nd Sitting";
  timing: string;
  startTime: string; // ISO string for countdown
  endTime: string;
  subjectCode: string;
  subjectShort: string;
  subjectTitle: string;
  syllabusUnits: string;
  keyFocus: string;
  color: string;
  badge: string;
}

export const LNJPIT_EXAM_SITTINGS: ExamSitting[] = [
  {
    id: "beee_sitting",
    date: "2026-11-27",
    day: "Friday",
    sitting: "1st Sitting",
    timing: "11:00 AM – 01:00 PM",
    startTime: "2026-11-27T11:00:00+05:30",
    endTime: "2026-11-27T13:00:00+05:30",
    subjectCode: "100111",
    subjectShort: "BEEE",
    subjectTitle: "Basic of Electrical & Electronics Engineering",
    syllabusUnits: "Unit 1 (DC Circuits), Unit 2 (AC Circuits), Unit 3 (Diodes & BJT)",
    keyFocus: "Thevenin & Norton, Maximum Power Transfer, Series RLC Resonance (Q-factor), Full-Wave Bridge Rectifier & CE Transistor",
    color: "#06b6d4", // Cyan
    badge: "Day 1 · Morning",
  },
  {
    id: "math1_sitting",
    date: "2026-11-27",
    day: "Friday",
    sitting: "2nd Sitting",
    timing: "02:30 PM – 04:30 PM",
    startTime: "2026-11-27T14:30:00+05:30",
    endTime: "2026-11-27T16:30:00+05:30",
    subjectCode: "100102",
    subjectShort: "Math-I",
    subjectTitle: "Engineering Mathematics – I",
    syllabusUnits: "Unit 1 (Linear Algebra), Unit 2 (Differential Calculus-I), Unit 3 (Multivariable Calculus)",
    keyFocus: "Rank by Echelon Form, System Consistency (AX=B), Cayley-Hamilton & A⁻¹, Leibnitz Proof for (sin⁻¹x)², Euler's Theorem, Maxima/Minima (rt-s²)",
    color: "#8b5cf6", // Purple/Violet
    badge: "Day 1 · Afternoon",
  },
  {
    id: "physics_sitting",
    date: "2026-11-28",
    day: "Saturday",
    sitting: "1st Sitting",
    timing: "11:00 AM – 01:00 PM",
    startTime: "2026-11-28T11:00:00+05:30",
    endTime: "2026-11-28T13:00:00+05:30",
    subjectCode: "100103/104",
    subjectShort: "Physics",
    subjectTitle: "Engineering Physics",
    syllabusUnits: "Unit 1 (Wave Optics & Interference), Unit 2 (Lasers & Fibers), Unit 3 (Electromagnetism & Magnetism)",
    keyFocus: "Newton's Rings Dark Center Proof (λ/R), Einstein A & B Ratio, Numerical Aperture (NA), Maxwell's 4 Equations & Displacement Current",
    color: "#3b82f6", // Blue
    badge: "Day 2 · Morning",
  },
  {
    id: "iai_sitting",
    date: "2026-11-28",
    day: "Saturday",
    sitting: "2nd Sitting",
    timing: "02:30 PM – 04:30 PM",
    startTime: "2026-11-28T14:30:00+05:30",
    endTime: "2026-11-28T16:30:00+05:30",
    subjectCode: "100105/106",
    subjectShort: "IAI",
    subjectTitle: "Introduction to AI",
    syllabusUnits: "Unit 1 (AI Foundations & Agents), Unit 2 (Uninformed Search), Unit 3 (Informed Search & Games)",
    keyFocus: "PEAS Framework, Agent Environments, BFS vs DFS vs UCS, A* Admissibility Proof f(n)=g+h, Minimax with Alpha-Beta Pruning Cutoffs",
    color: "#ec4899", // Pink
    badge: "Day 2 · Afternoon",
  },
  {
    id: "cfet_sitting",
    date: "2026-11-30",
    day: "Monday",
    sitting: "1st Sitting",
    timing: "11:00 AM – 01:00 PM",
    startTime: "2026-11-30T11:00:00+05:30",
    endTime: "2026-11-30T13:00:00+05:30",
    subjectCode: "100108",
    subjectShort: "CFET",
    subjectTitle: "Computer Fundamental & Emerging Technology",
    syllabusUnits: "Unit 1 (CPU & Memory Architecture), Unit 2 (Data Representation & Number Conversions), Unit 3 (OS & Digital Logic), Unit 4 (Networks & Internet), Unit 5 (Emerging Tech: IoT, Cyber, AI/ML, Blockchain)",
    keyFocus: "Von Neumann Architecture, Memory Hierarchy, Fractional Base Conversions, 1's & 2's Complement Arithmetic, K-Maps, TCP/UDP 3-Way Handshake, Network Topologies, CIA Triad",
    color: "#10b981", // Emerald
    badge: "Day 3 · Morning",
  },
  {
    id: "uhv_sitting",
    date: "2026-11-30",
    day: "Monday",
    sitting: "2nd Sitting",
    timing: "02:30 PM – 04:30 PM",
    startTime: "2026-11-30T14:30:00+05:30",
    endTime: "2026-11-30T16:30:00+05:30",
    subjectCode: "100109",
    subjectShort: "UHV",
    subjectTitle: "Universal Human Values",
    syllabusUnits: "Unit 1 (Need for Value Education), Unit 2 (Self 'I' vs Body), Unit 3 (Harmony in Family & Society)",
    keyFocus: "Natural Acceptance, Co-existence of Sentient 'I' & Material Body, Sanyam & Swasthya, Trust on Intention vs Competence, 9 Relationship Values",
    color: "#f59e0b", // Amber
    badge: "Day 3 · Afternoon",
  },
];

export const LNJPIT_EXAM_NOTICE = {
  refNo: "Ex-2026/657",
  date: "24.11.2026",
  college: "Loknayak Jai Prakash Institute of Technology (LNJPIT), Chapra",
  university: "Bihar Engineering University (BEU), Patna",
  branch: "Group A (CSE + Mathematics & Computing)",
  session: "2026-2030 (1st Semester)",
  fullMarks: 20,
  timeDuration: "2:00 Hrs.",
  totalSubjects: 6,
  examStructure: "6 Questions in total, attempt 5 questions. Question 1 is compulsory (4 MCQs/1-markers = 4 Marks), Questions 2 to 6 are 4 Marks each (choose any 4 = 16 Marks). Total = 20 Marks.",
};
