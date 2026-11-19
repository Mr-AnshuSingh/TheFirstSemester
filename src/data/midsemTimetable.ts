// ============================================================================
// LNJPIT CHAPRA — MID-SEMESTER EXAMINATION 2026 (REVISED ROUTINE)
// Ref No: LNJPIT/Exam/2026/852, Dated: 18.11.2026
// Branch: Mathematics & Computing (M&C) — Group A (Semester I)
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
    date: "2026-11-25",
    day: "Wednesday",
    sitting: "1st Sitting",
    timing: "11:00 AM – 01:00 PM",
    startTime: "2026-11-25T11:00:00+05:30",
    endTime: "2026-11-25T13:00:00+05:30",
    subjectCode: "100111",
    subjectShort: "BEEE",
    subjectTitle: "Basics of Electrical & Electronics Engineering",
    syllabusUnits: "Unit 1 (DC Circuits), Unit 2 (AC Circuits), Unit 3 (Diodes & BJT)",
    keyFocus: "Thevenin/Norton, Series RLC Resonance (Q-factor), Full-Wave Rectifiers & CE Transistor",
    color: "#06b6d4", // Cyan
    badge: "Day 1 · Morning",
  },
  {
    id: "math1_sitting",
    date: "2026-11-25",
    day: "Wednesday",
    sitting: "2nd Sitting",
    timing: "02:30 PM – 04:30 PM",
    startTime: "2026-11-25T14:30:00+05:30",
    endTime: "2026-11-25T16:30:00+05:30",
    subjectCode: "100102",
    subjectShort: "Math-I",
    subjectTitle: "Engineering Mathematics – I",
    syllabusUnits: "Unit 1 (Linear Algebra), Unit 2 (Single Var Calculus), Unit 3 (Multivariable Calculus)",
    keyFocus: "Rank & Consistency (AX=B), Cayley-Hamilton, Leibnitz Proofs, Euler's Theorem, Maxima/Minima (rt-s²)",
    color: "#8b5cf6", // Purple/Violet
    badge: "Day 1 · Afternoon",
  },
  {
    id: "physics_sitting",
    date: "2026-11-26",
    day: "Thursday",
    sitting: "1st Sitting",
    timing: "11:00 AM – 01:00 PM",
    startTime: "2026-11-26T11:00:00+05:30",
    endTime: "2026-11-26T13:00:00+05:30",
    subjectCode: "100103/100104",
    subjectShort: "Physics",
    subjectTitle: "Engineering Physics",
    syllabusUnits: "Unit 1 (Wave Optics), Unit 2 (Lasers & Fibers), Unit 3 (Electromagnetism & Magnetism)",
    keyFocus: "Newton's Rings (λ/R), Numerical Aperture (NA), Einstein A/B Ratio, Maxwell's 4 Equations & Poynting Vector",
    color: "#3b82f6", // Blue
    badge: "Day 2 · Morning",
  },
  {
    id: "iai_sitting",
    date: "2026-11-26",
    day: "Thursday",
    sitting: "2nd Sitting",
    timing: "02:30 PM – 04:30 PM",
    startTime: "2026-11-26T14:30:00+05:30",
    endTime: "2026-11-26T16:30:00+05:30",
    subjectCode: "100105/100106",
    subjectShort: "IAI",
    subjectTitle: "Introduction to AI",
    syllabusUnits: "Unit 1 (AI & Agents), Unit 2 (Search: BFS/DFS/A*), Unit 3 (Adversarial Search: Minimax)",
    keyFocus: "PEAS Framework, Learning Agent Architecture, A* Admissibility f(n)=g+h, Minimax with Alpha-Beta Cutoffs",
    color: "#ec4899", // Pink
    badge: "Day 2 · Afternoon",
  },
  {
    id: "cfet_sitting",
    date: "2026-11-27",
    day: "Friday",
    sitting: "1st Sitting",
    timing: "11:00 AM – 01:00 PM",
    startTime: "2026-11-27T11:00:00+05:30",
    endTime: "2026-11-27T13:00:00+05:30",
    subjectCode: "100108",
    subjectShort: "CFET",
    subjectTitle: "Computer Fundamentals & Emerging Technology",
    syllabusUnits: "Unit 1 (Architecture & Memory), Unit 2 (Data Representation), Unit 3 (Digital Logic & K-Maps)",
    keyFocus: "Von Neumann Bottleneck, Cache Access T_avg, 2's Complement Overflow, Universal NAND/NOR, 4-Variable K-Map & Full Adder",
    color: "#10b981", // Emerald
    badge: "Day 3 · Morning",
  },
  {
    id: "uhv_sitting",
    date: "2026-11-27",
    day: "Friday",
    sitting: "2nd Sitting",
    timing: "02:30 PM – 04:30 PM",
    startTime: "2026-11-27T14:30:00+05:30",
    endTime: "2026-11-27T16:30:00+05:30",
    subjectCode: "100109",
    subjectShort: "UHV",
    subjectTitle: "Universal Human Values",
    syllabusUnits: "Unit 1 (Value Education), Unit 2 (Self 'I' vs Body), Unit 3 (Family & Society)",
    keyFocus: "Natural Acceptance, Needs of 'I' vs Body, Sanyama & Swasthya, Trust on Intention vs Competence, 9 Relationship Values",
    color: "#f59e0b", // Amber
    badge: "Day 3 · Afternoon",
  },
];

export const LNJPIT_EXAM_NOTICE = {
  refNo: "LNJPIT/Exam/2026/852",
  date: "18.11.2026",
  college: "Lok Nayak Jai Prakash Institute of Technology (LNJPIT), Chapra",
  university: "Bihar Engineering University (BEU), Patna",
  branch: "Mathematics & Computing (M&C) — Group A (along with CSE)",
  session: "2026-2030 (1st Semester)",
  fullMarks: 20,
  timeDuration: "2 Hours (per sitting)",
  totalSubjects: 6,
};
