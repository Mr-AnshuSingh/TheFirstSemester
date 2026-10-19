import { TimetableData, WeekCountdownItem } from '@/types/syllabus';

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

export const TT: TimetableData = {
 slots:['10:00–12:00','12:00–1:00','2:00–3:00','3:00–4:00','4:00–5:00'],
 days:['Mon','Tue','Wed','Thu','Fri','Sat'],
 full:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
 grid:[
  [{k:'pps',l:'PPS Lab',g:'G1',h:2},{k:'eic',l:'EIC'},{k:'ai',l:'IAI'},{k:'cfet',l:'CFET'},{k:'x',l:'Foreign Language'}],
  [{k:'beee',l:'BEE Lab',g:'G1',h:2},{k:'x',l:'Mentor–Mentee'},{k:'phy',l:'Physics'},{k:'math',l:'Math-I'},{k:'ai',l:'IAI'}],
  [{k:'lib',l:'Library',h:2},{k:'eic',l:'EIC'},{k:'beee',l:'BEEE'},{k:'math',l:'Math-I'},{k:'uhv',l:'UHV'}],
  [{k:'beee',l:'BEE Lab',g:'G2',h:2},{k:'eic',l:'EIC'},{k:'ai',l:'IAI'},{k:'cfet',l:'CFET'},{k:'phy',l:'Physics'}],
  [{k:'phy',l:'Physics Lab',g:'G1 & G2',h:2},{k:'lib',l:'Library'},{k:'beee',l:'BEEE'},{k:'math',l:'Math-I'},{k:'phy',l:'Physics'}],
  [{k:'pps',l:'PPS Lab',g:'G2',h:2},{k:'math',l:'Remedial (Math)'},{k:'uhv',l:'UHV'},{k:'cfet',l:'CFET'},{k:'beee',l:'BEEE'}]
 ]
};
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
