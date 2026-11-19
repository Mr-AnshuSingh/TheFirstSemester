import { TimetableData, WeekCountdownItem, UniversityHoliday, BranchTimetable, TimetableCell } from '@/types/syllabus';

export const HUE: Record<string, string> = {
  beee: '#c7a14f',
  phy: '#5f9a95',
  math: '#b98a76',
  ai: '#7f9a68',
  cfet: '#b9ae6e',
  uhv: '#a89aa0',
  pps: '#9d9d94',
  eic: '#a98f7a',
  lib: '#8a867b',
  x: '#8a867b',
};

/**
 * Standard slot index to cell resolver supporting colSpan/duration
 */
export function getCellForSlot(
  row: TimetableCell[],
  slotIdx: number
): { cell: TimetableCell; cellIndex: number } | null {
  if (!row || slotIdx < 0) return null;
  let currentSlot = 0;
  for (let c = 0; c < row.length; c++) {
    const cell = row[c];
    const span = cell.h || 1;
    if (slotIdx >= currentSlot && slotIdx < currentSlot + span) {
      return { cell, cellIndex: c };
    }
    currentSlot += span;
  }
  return null;
}

/**
 * Primary Timetable: Mathematics & Computing (Room No: 14)
 * LNJPIT Chapra, Revised w.e.f. 29.10.2026, Session July–December 2026
 */
export const TT: TimetableData = {
  slots: ['10:00–11:00', '11:00–12:00', '12:00–1:00', '2:00–3:00', '3:00–4:00', '4:00–5:00'],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  full: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  grid: [
    // Monday
    [
      { k: 'ai', l: 'IAI', fac: 'Mr. Nauman Jawaid' },
      { k: 'cfet', l: 'CFET', fac: 'Miss. Aiswarya Singh' },
      { k: 'x', l: 'Foreign Language' },
      { k: 'ai', l: 'IAI', fac: 'Mr. Nauman Jawaid' },
      { k: 'pps', l: 'PPS Lab', h: 2, fac: 'Miss. Kripa Singh' },
    ],
    // Tuesday
    [
      { k: 'phy', l: 'Physics', fac: 'Dr. Niharika Kulshrestha' },
      { k: 'ai', l: 'IAI', fac: 'Mr. Nauman Jawaid' },
      { k: 'math', l: 'Math-I', fac: 'Dr. G.N. Tripathi' },
      { k: 'phy', l: 'Physics', fac: 'Dr. Niharika Kulshrestha' },
      { k: 'math', l: 'Math-I', fac: 'Dr. G.N. Tripathi' },
      { k: 'ai', l: 'IAI', fac: 'Mr. Nauman Jawaid' },
    ],
    // Wednesday
    [
      { k: 'beee', l: 'BEEE', fac: 'Mr. Vikash Kumar' },
      { k: 'uhv', l: 'UHV', fac: 'Mr. Ravi Ranajan' },
      { k: 'math', l: 'Math-I', fac: 'Dr. G.N. Tripathi' },
      { k: 'beee', l: 'BEEE', fac: 'Mr. Vikash Kumar' },
      { k: 'beee', l: 'BEEE Lab', h: 2, fac: 'Mr. Vikash Kumar' },
    ],
    // Thursday
    [
      { k: 'ai', l: 'IAI', fac: 'Mr. Nauman Jawaid' },
      { k: 'cfet', l: 'CFET', fac: 'Miss. Aiswarya Singh' },
      { k: 'phy', l: 'Physics', fac: 'Dr. Niharika Kulshrestha' },
      { k: 'ai', l: 'IAI', fac: 'Mr. Nauman Jawaid' },
      { k: 'cfet', l: 'CFET', fac: 'Miss. Aiswarya Singh' },
      { k: 'phy', l: 'Physics', fac: 'Dr. Niharika Kulshrestha' },
    ],
    // Friday
    [
      { k: 'math', l: 'Math-I', fac: 'Dr. G.N. Tripathi' },
      { k: 'beee', l: 'BEEE', fac: 'Mr. Vikash Kumar' },
      { k: 'phy', l: 'Physics', fac: 'Dr. Niharika Kulshrestha' },
      { k: 'beee', l: 'BEEE', fac: 'Mr. Vikash Kumar' },
      { k: 'math', l: 'Math-I', fac: 'Dr. G.N. Tripathi' },
      { k: 'phy', l: 'Physics', fac: 'Dr. Niharika Kulshrestha' },
    ],
    // Saturday
    [
      { k: 'beee', l: 'BEEE', fac: 'Mr. Vikash Kumar' },
      { k: 'cfet', l: 'CFET', fac: 'Miss. Aiswarya Singh' },
      { k: 'uhv', l: 'UHV', fac: 'Mr. Ravi Ranajan' },
      { k: 'uhv', l: 'UHV', fac: 'Mr. Ravi Ranajan' },
      { k: 'cfet', l: 'CFET', fac: 'Miss. Aiswarya Singh' },
      { k: 'beee', l: 'BEEE', fac: 'Mr. Vikash Kumar' },
    ],
  ],
};

/**
 * Dedicated Mathematics & Computing Schedule
 * Lok Nayak Jai Prakash Institute of Technology (LNJPIT), Chapra
 * Session: July–December, 2026 (Revised Time Table w.e.f. 29.10.2026) · Room No: 14
 */
export const MNC_TIMETABLE: BranchTimetable = {
  branchId: 'mnc',
  branchName: 'Mathematics & Computing',
  room: 'Room No: 14',
  effectiveDate: '29.10.2026',
  session: 'July–December, 2026',
  slots: TT.slots,
  days: TT.days,
  full: TT.full,
  grid: TT.grid,
  faculty: [
    { sNo: 1, subject: 'Engineering Physics', shortForm: 'Physics', ltp: '3-0-2', hours: '3-0-2', faculty: 'Dr. Niharika Kulshrestha' },
    { sNo: 2, subject: 'Engineering Mathematics-I', shortForm: 'Math-I', ltp: '3-0-0', hours: '3-0-0', faculty: 'Dr. G.N. Tripathi' },
    { sNo: 3, subject: 'Programming for Problem Solving Lab', shortForm: 'PPS', ltp: '0-0-2', hours: '0-0-2', faculty: 'Miss. Kripa Singh' },
    { sNo: 4, subject: 'Introduction to AI', shortForm: 'IAI', ltp: '3-0-0', hours: '3-0-0', faculty: 'Mr. Nauman Jawaid' },
    { sNo: 5, subject: 'Basics of Electrical & Electronics Engineering', shortForm: 'BEEE', ltp: '3-0-2', hours: '3-0-2', faculty: 'Mr. Vikash Kumar' },
    { sNo: 6, subject: 'Computer Fundamentals & Emerging Technologies', shortForm: 'CFET', ltp: '3-0-0', hours: '3-0-0', faculty: 'Miss. Aiswarya Singh' },
    { sNo: 7, subject: 'Universal Human Values', shortForm: 'UHV', ltp: '2-0-0', hours: '2-0-0', faculty: 'Mr. Ravi Ranajan' },
    { sNo: 8, subject: 'Essence of Indian Constitution', shortForm: 'EIC', ltp: '3-0-0', hours: '0-0-0', faculty: 'Dr. Ghanashyam Kumar Prajapati' },
  ],
};

export const BRANCH_TIMETABLES: Record<string, BranchTimetable> = {
  mnc: MNC_TIMETABLE,
};

export const DEFAULT_BRANCH_ID = 'mnc';
export const RULES: string[] = [
 'Read the whole paper for 5 minutes before writing a word. Mark the questions you can finish fastest.',
 'Start with your strongest section to bank marks and calm your hands.',
 'Numericals: write formula, then substitution, then the answer in a box with its unit.',
 'Draw the diagram before the explanation. Labels carry marks, so label every part.',
 'Give each question time in proportion to its marks. When time is up, move on.',
 'Leave two lines blank after every answer so you can add a missing point later.',
 'Show every step of a derivation; a wrong final line with correct steps still scores.',
 'For “differentiate between” questions, use a two-column table with at least four rows.',
 'Write units, signs and conclusions (“Hence rank = 3”). They are the easiest marks to forget.',
 'Last 10 minutes: reread numericals for sign and unit errors and add missing labels.'
];
export const WEEKS: WeekCountdownItem[] = [
 {w:'W−6',t:'Foundations',d:['Math-I Unit 1: rank, consistency, eigenvalues, 45 minutes every day','BEEE Unit 1: practise one mesh and one nodal problem daily','Wed Library slot: 20 Math-I problems from the class you attended on Tuesday','Sunday: start one formula sheet per subject and keep adding to it']},
 {w:'W−5',t:'Core numericals',d:['Math-I Unit 2 and 3: Rolle/Lagrange verification, Euler’s theorem, maxima–minima','BEEE Units 2 and 3: RLC phasor sums, transformer EMF and regulation','Physics Unit 1: Newton’s rings and grating derivations drawn from memory','Friday: write up the Physics lab record while the experiment is fresh']},
 {w:'W−4',t:'Derivation week',d:['Physics Units 2–4: Einstein coefficients, NA of fibre, particle in a box','Math-I Unit 4: change of order, polar/spherical coordinates, Beta–Gamma sums','BEEE Unit 4: rectifier waveforms, BJT characteristics, Zener regulator','Saturday remedial: bring every Math-I question you could not solve']},
 {w:'W−3',t:'Theory sweep',d:['CFET all five units: do 10 conversions and 5 complements every day','AI Units 1–3: trace one BFS, one A*, one alpha-beta, one resolution proof','UHV Units 1–3 and EIC Units 1–2: read once, make a one-page summary each','Thursday evening: first timed 90-minute Math-I paper']},
 {w:'W−2',t:'Close every gap',d:['AI Units 4–5: Bayes numericals, perceptron, k-means by hand','UHV Units 4–5, EIC Units 3–5: six amendments in one line each','Math-I Unit 5: verify Green, Stokes and Gauss on one example each','PPS Lab: write all 17 programs on paper once, then rehearse viva answers']},
 {w:'W−1',t:'Mock exam week',d:['One full timed paper per day, rotating subjects','Redraw every diagram from the Exam Diagrams section without looking','Finish the Free Marks list for each subject before anything else','Sleep before midnight; no new topics after Thursday']},
 {w:'Exam',t:'Execute',d:['Night before: read only the memory hooks and your formula sheets','Do not open a new topic; recheck what you already know','Morning: eat, arrive early, follow the ten exam-day rules','Between papers: five minutes of the next subject’s hooks, then rest']}
];

/**
 * Official Holiday Calendar 2026 for Government Engineering Colleges
 * University Holiday Calendar 2026
 * Ref: 1029 / 2025, दिनांक: 18/12/2025
 */
export const UNIVERSITY_HOLIDAYS_2026: UniversityHoliday[] = [
  {
    id: 1,
    name: 'नववर्ष आरम्भ',
    englishName: "New Year's Day",
    startDate: '2026-01-01',
    endDate: '2026-01-01',
    daysDisplay: '01 जनवरी',
    dayOfWeek: 'गुरूवार (Thursday)',
    totalDays: 1,
  },
  {
    id: 2,
    name: 'मकर संक्रान्ति',
    englishName: 'Makar Sankranti',
    startDate: '2026-01-14',
    endDate: '2026-01-14',
    daysDisplay: '14 जनवरी',
    dayOfWeek: 'बुधवार (Wednesday)',
    totalDays: 1,
  },
  {
    id: 3,
    name: 'बसंत पंचमी / सरस्वती पूजा',
    englishName: 'Basant Panchami / Saraswati Puja',
    startDate: '2026-01-23',
    endDate: '2026-01-23',
    daysDisplay: '23 जनवरी',
    dayOfWeek: 'शुक्रवार (Friday)',
    totalDays: 1,
  },
  {
    id: 4,
    name: 'गणतंत्र दिवस',
    englishName: 'Republic Day',
    startDate: '2026-01-26',
    endDate: '2026-01-26',
    daysDisplay: '26 जनवरी',
    dayOfWeek: 'सोमवार (Monday)',
    totalDays: 1,
  },
  {
    id: 5,
    name: 'संत रविदास जयंती',
    englishName: 'Sant Ravidas Jayanti',
    startDate: '2026-02-01',
    endDate: '2026-02-01',
    daysDisplay: '01 फ़रवरी',
    dayOfWeek: 'रविवार (Sunday)',
    totalDays: 1,
    note: 'रविवार',
  },
  {
    id: 6,
    name: 'शब-ए-बरात',
    englishName: 'Shab-e-Barat',
    startDate: '2026-02-04',
    endDate: '2026-02-04',
    daysDisplay: '04 फ़रवरी',
    dayOfWeek: 'बुधवार (Wednesday)',
    totalDays: 1,
  },
  {
    id: 7,
    name: 'महाशिवरात्रि',
    englishName: 'Maha Shivratri',
    startDate: '2026-02-15',
    endDate: '2026-02-15',
    daysDisplay: '15 फ़रवरी',
    dayOfWeek: 'रविवार (Sunday)',
    totalDays: 1,
    note: 'रविवार',
  },
  {
    id: 8,
    name: 'होलिकादहन / होली',
    englishName: 'Holika Dahan / Holi',
    startDate: '2026-03-02',
    endDate: '2026-03-04',
    daysDisplay: '02 मार्च से 04 मार्च तक',
    dayOfWeek: 'सोमवार से बुधवार (Mon–Wed)',
    totalDays: 3,
  },
  {
    id: 9,
    name: 'ईद-उल-फितर (ईद)',
    englishName: 'Eid-ul-Fitr',
    startDate: '2026-03-21',
    endDate: '2026-03-21',
    daysDisplay: '21 मार्च',
    dayOfWeek: 'शनिवार (Saturday)',
    totalDays: 1,
  },
  {
    id: 10,
    name: 'बिहार दिवस',
    englishName: 'Bihar Diwas',
    startDate: '2026-03-22',
    endDate: '2026-03-22',
    daysDisplay: '22 मार्च',
    dayOfWeek: 'रविवार (Sunday)',
    totalDays: 1,
    note: 'रविवार',
  },
  {
    id: 11,
    name: 'सम्राट अशोक जयंती',
    englishName: 'Samrat Ashok Jayanti',
    startDate: '2026-03-26',
    endDate: '2026-03-26',
    daysDisplay: '26 मार्च',
    dayOfWeek: 'गुरूवार (Thursday)',
    totalDays: 1,
  },
  {
    id: 12,
    name: 'रामनवमी',
    englishName: 'Ram Navami',
    startDate: '2026-03-27',
    endDate: '2026-03-27',
    daysDisplay: '27 मार्च',
    dayOfWeek: 'शुक्रवार (Friday)',
    totalDays: 1,
  },
  {
    id: 13,
    name: 'महावीर जयंती',
    englishName: 'Mahavir Jayanti',
    startDate: '2026-03-31',
    endDate: '2026-03-31',
    daysDisplay: '31 मार्च',
    dayOfWeek: 'मंगलवार (Tuesday)',
    totalDays: 1,
  },
  {
    id: 14,
    name: 'गुड फ्राइडे',
    englishName: 'Good Friday',
    startDate: '2026-04-03',
    endDate: '2026-04-03',
    daysDisplay: '03 अप्रैल',
    dayOfWeek: 'शुक्रवार (Friday)',
    totalDays: 1,
  },
  {
    id: 15,
    name: 'डॉ० भीम राव अंबेडकर जयंती',
    englishName: 'Dr. B.R. Ambedkar Jayanti',
    startDate: '2026-04-14',
    endDate: '2026-04-14',
    daysDisplay: '14 अप्रैल',
    dayOfWeek: 'मंगलवार (Tuesday)',
    totalDays: 1,
  },
  {
    id: 16,
    name: 'वीर कुँवर सिंह जयंती',
    englishName: 'Veer Kunwar Singh Jayanti',
    startDate: '2026-04-23',
    endDate: '2026-04-23',
    daysDisplay: '23 अप्रैल',
    dayOfWeek: 'गुरूवार (Thursday)',
    totalDays: 1,
  },
  {
    id: 17,
    name: 'जानकी नवमी',
    englishName: 'Janki Navami',
    startDate: '2026-04-25',
    endDate: '2026-04-25',
    daysDisplay: '25 अप्रैल',
    dayOfWeek: 'शनिवार (Saturday)',
    totalDays: 1,
  },
  {
    id: 18,
    name: 'मई दिवस / श्रम दिवस / बुद्ध पूर्णिमा',
    englishName: 'May Day / Labour Day / Buddha Purnima',
    startDate: '2026-05-01',
    endDate: '2026-05-01',
    daysDisplay: '01 मई',
    dayOfWeek: 'शुक्रवार (Friday)',
    totalDays: 1,
  },
  {
    id: 19,
    name: 'ईद-उल-जोहा (बकरीद)',
    englishName: 'Eid-ul-Zoha (Bakrid)',
    startDate: '2026-05-28',
    endDate: '2026-05-28',
    daysDisplay: '28 मई',
    dayOfWeek: 'गुरूवार (Thursday)',
    totalDays: 1,
  },
  {
    id: 20,
    name: 'ग्रीष्मावकाश / मुहर्रम / कबीर जयंती',
    englishName: 'Summer Vacation / Muharram / Kabir Jayanti',
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    daysDisplay: '01 जून से 30 जून तक',
    dayOfWeek: 'सोमवार से मंगलवार (Mon–Tue)',
    totalDays: 30,
    note: '26 + 4 दिन रविवार (ग्रीष्मावकाश केवल शिक्षकों के लिए / मुहर्रम / कबीर जयंती)',
  },
  {
    id: 21,
    name: 'चेहल्लुम',
    englishName: 'Chehellum',
    startDate: '2026-08-04',
    endDate: '2026-08-04',
    daysDisplay: '04 अगस्त',
    dayOfWeek: 'मंगलवार (Tuesday)',
    totalDays: 1,
  },
  {
    id: 22,
    name: 'स्वतंत्रता दिवस',
    englishName: 'Independence Day',
    startDate: '2026-08-15',
    endDate: '2026-08-15',
    daysDisplay: '15 अगस्त',
    dayOfWeek: 'शनिवार (Saturday)',
    totalDays: 1,
  },
  {
    id: 23,
    name: 'हज़रत मोहम्मद साहब का जन्म दिवस',
    englishName: "Hazrat Mohammad's Birthday (Eid-e-Milad)",
    startDate: '2026-08-26',
    endDate: '2026-08-26',
    daysDisplay: '26 अगस्त',
    dayOfWeek: 'बुधवार (Wednesday)',
    totalDays: 1,
  },
  {
    id: 24,
    name: 'रक्षाबंधन',
    englishName: 'Raksha Bandhan',
    startDate: '2026-08-28',
    endDate: '2026-08-28',
    daysDisplay: '28 अगस्त',
    dayOfWeek: 'शुक्रवार (Friday)',
    totalDays: 1,
  },
  {
    id: 25,
    name: 'श्री कृष्ण जन्माष्टमी',
    englishName: 'Shri Krishna Janmashtami',
    startDate: '2026-09-04',
    endDate: '2026-09-04',
    daysDisplay: '04 सितम्बर',
    dayOfWeek: 'शुक्रवार (Friday)',
    totalDays: 1,
  },
  {
    id: 26,
    name: 'महात्मा गाँधी जयंती',
    englishName: 'Mahatma Gandhi Jayanti',
    startDate: '2026-10-02',
    endDate: '2026-10-02',
    daysDisplay: '02 अक्टूबर',
    dayOfWeek: 'शुक्रवार (Friday)',
    totalDays: 1,
  },
  {
    id: 27,
    name: 'दुर्गा पूजा',
    englishName: 'Durga Puja',
    startDate: '2026-10-17',
    endDate: '2026-10-20',
    daysDisplay: '17 अक्टूबर से 20 अक्टूबर',
    dayOfWeek: 'शनिवार से मंगलवार (Sat–Tue)',
    totalDays: 4,
    note: '03 + 01 दिन रविवार',
  },
  {
    id: 28,
    name: 'दीपावली / चित्रगुप्त पूजा / भाई दूज एवं छठ पूजा',
    englishName: 'Diwali / Chitragupta Puja / Bhai Dooj & Chhath Puja',
    startDate: '2026-11-08',
    endDate: '2026-11-16',
    daysDisplay: '08 नवम्बर से 16 नवम्बर',
    dayOfWeek: 'रविवार से सोमवार (Sun–Mon)',
    totalDays: 9,
    note: '07 + 02 दिन रविवार',
  },
  {
    id: 29,
    name: 'गुरुनानक जयंती / कार्तिक पूर्णिमा',
    englishName: 'Guru Nanak Jayanti / Kartik Purnima',
    startDate: '2026-11-24',
    endDate: '2026-11-24',
    daysDisplay: '24 नवम्बर',
    dayOfWeek: 'मंगलवार (Tuesday)',
    totalDays: 1,
  },
  {
    id: 30,
    name: 'क्रिसमस / शीतकालीन अवकाश',
    englishName: 'Christmas / Winter Vacation',
    startDate: '2026-12-25',
    endDate: '2026-12-31',
    daysDisplay: '25 दिसम्बर से 31 दिसम्बर',
    dayOfWeek: 'शुक्रवार से गुरूवार (Fri–Thu)',
    totalDays: 7,
    note: '06 + 01 दिन रविवार',
  },
];

