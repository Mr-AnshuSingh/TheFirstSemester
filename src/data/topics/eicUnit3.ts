import { TopicContent } from '@/types/syllabus';

/* ---------- SVG Builder Helpers ---------- */
const S = (w: number, h: number, b: string) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" class="w-full h-auto">${b}</svg>`;
const L = (a: number, b: number, c: number, d: number, k = 'l') =>
  `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${k}"/>`;
const escT = (s: string) =>
  String(s).replace(/&(?!(lt|gt|amp);)/g, '&amp;').replace(/</g, '&lt;');
const T = (x: number, y: number, s: string, k = 't', an = 'start') =>
  `<text x="${x}" y="${y}" class="${k}" text-anchor="${an}">${escT(s)}</text>`;
const P = (d: string, k = 'l', m = '') =>
  `<path d="${d}" class="${k}" ${m}/>`;
const C = (x: number, y: number, r: number, k = 'l') =>
  `<circle cx="${x}" cy="${y}" r="${r}" class="${k}"/>`;
const R = (x: number, y: number, w: number, h: number, k = 'l') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${k}"/>`;
const LA = (a: number, b: number, c: number, d: number, k = 'a') =>
  `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${k}" marker-end="url(#ar)"/>`;

/* ---------- EIC UNIT 3 TOPIC CONTENT (2 Topics) ---------- */
export const EIC_UNIT3_TOPICS: Record<string, TopicContent> = {
  'eic:3:0': {
    explain: [
      'Part VI (Articles 152–237) of the Indian Constitution defines the machinery of State Governance, embodying the parliamentary executive model at the regional level.',
      'The Governor (Article 153) is the constitutional head of the state, appointed by the President of India and serving at the President’s pleasure.',
      'Real executive power is vested in the Chief Minister and Council of Ministers (Article 163), who aid and advise the Governor and are collectively responsible to the Legislative Assembly (Article 164).',
      'The Governor possesses legislative powers (ordinance-making under Article 213 during legislative recess) and discretionary powers (recommending President’s Rule under Article 356, reserving bills under Article 200).',
    ],
    definition:
      'Governance under Part VI structures the parliamentary executive of Indian states, establishing the Governor as the nominal constitutional head while entrusting real administrative authority to the democratically accountable Chief Minister and Council of Ministers.',
    formula: '\\text{State Governance} = \\text{Governor (Nominal/Union Link)} + \\text{Chief Minister \\& Council (Real Power)} \\xrightarrow{\\text{Art. 164}} \\text{Vidhan Sabha}',
    steps: [
      'Governor Appointment (Article 155): Appointed by the President; holds office for a 5-year term subject to presidential pleasure; must be an Indian citizen aged at least 35 years.',
      'Dual Constitutional Role: Acts as the nominal constitutional head of the state and serves as the representative of the Union Government.',
      'Chief Minister & Council of Ministers (Article 163): The Governor appoints the CM (leader of the majority party in Assembly) and other ministers on the CM’s advice.',
      'Collective Responsibility (Article 164): The Council of Ministers is collectively responsible to the directly elected Legislative Assembly.',
      'Ordinance Making (Article 213): Promulgates ordinances when the state legislature is in recess; ordinances have the force of an act but lapse within 6 weeks of legislature reassembly.',
    ],
    examAnswer: [
      'Explain the constitutional position, appointment, and executive powers of the Governor under Part VI.',
      'Describe the democratic relationship between the Governor and the Council of Ministers headed by the CM under Articles 163 and 164.',
      'Explain the ordinance-making power of the Governor under Article 213 and state its parliamentary limitations.',
      'Differentiate between the pardoning powers of the President (Article 72) and the Governor (Article 161).',
    ],
    slip: 'Asserting that the Governor can pardon a death sentence; under Indian constitutional law, only the President of India possesses the constitutional prerogative to grant a full pardon for death penalties.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'STATE EXECUTIVE ARCHITECTURE (PART VI)', 'ta') +
          // President of India (Top)
          R(100, 32, 160, 26, 'fa') +
          T(180, 49, 'President of India', 'ta', 'middle') +
          LA(180, 58, 180, 78, 'a') +
          T(185, 70, 'Appoints', 't') +
          // Governor Box
          R(85, 78, 190, 32) +
          T(180, 93, 'Governor (Art. 153)', 'ta', 'middle') +
          T(180, 104, 'Nominal Head · Rep. of Union', 't', 'middle') +
          // Aid and Advice connection
          LA(180, 110, 180, 130, 'a') +
          T(185, 122, 'Aid & Advice', 'ta') +
          // CM & Council of Ministers
          R(50, 130, 260, 32, 'fa') +
          T(180, 145, 'Chief Minister & Council of Ministers (Art. 163)', 'ta', 'middle') +
          T(180, 156, 'Real Executive Power · Collective Responsibility', 't', 'middle') +
          // Responsible to Assembly
          T(180, 180, 'Collective Responsibility to Legislative Assembly (Art. 164)', 'ta', 'middle')
      ),
      caption:
        'Figure 3.0: Dual role of the Governor as constitutional state head and Union representative, guided by the democratic Council of Ministers.',
    },
  },

  'eic:3:1': {
    explain: [
      'The State Legislature (Articles 168–212) is the regional lawmaking authority in Indian states.',
      'Most states have unicameral legislatures (Legislative Assembly only), but 6 states have bicameral legislatures with both a Legislative Assembly (Vidhan Sabha) and a Legislative Council (Vidhan Parishad): Bihar, Uttar Pradesh, Maharashtra, Karnataka, Andhra Pradesh, and Telangana.',
      'Legislative Assembly (Vidhan Sabha, Art. 170): Directly elected by voters; 60 to 500 members; 5-year term; holds absolute financial supremacy over money bills.',
      'Legislative Council (Vidhan Parishad, Art. 171): Permanent house (cannot be dissolved); members serve 6-year terms with 1/3 retiring every 2 years; advisory function with limited delaying power.',
      'Article 169 empowers Parliament to create or abolish a Legislative Council if the state Assembly passes a resolution by special majority.',
    ],
    definition:
      'The State Legislature is the representative lawmaking organ of a state, operating unicamerally via the Legislative Assembly (Vidhan Sabha) or bicamerally with an advisory Legislative Council (Vidhan Parishad).',
    formula: '\\text{Vidhan Sabha (Direct, 5y, Money Bills)} \\gg \\text{Vidhan Parishad (Permanent, 6y, Delay up to 4 months)}',
    steps: [
      'Bicameral States: Six Indian states currently maintain bicameral legislatures: Bihar, Uttar Pradesh, Maharashtra, Karnataka, Andhra Pradesh, and Telangana.',
      'Assembly Composition (Art. 170): Strength 60–500 members; 5-year duration unless dissolved earlier; speaker elected by members.',
      'Council Composition (Art. 171): Size capped between 40 and 1/3 of Assembly; 1/3 elected by MLAs, 1/3 by local bodies, 1/12 by teachers, 1/12 by graduates, and 1/6 nominated by Governor.',
      'Creation/Abolition (Art. 169): Parliament can abolish or create a Council upon a special majority resolution by the state Legislative Assembly.',
      'Legislative Asymmetry: Money bills originate exclusively in the Assembly; the Council can only delay ordinary bills for a maximum of 4 months (3 months initially + 1 month on second passage).',
    ],
    examAnswer: [
      'Compare the Legislative Assembly and Legislative Council in a comprehensive comparative table (Elections, Term, Strength, Financial powers).',
      'Explain the constitutional mechanism for creating or abolishing a State Legislative Council under Article 169.',
      'Detail the 5-tiered composition of the Legislative Council under Article 171.',
      'Explain why the Legislative Assembly is decisively more powerful than the Legislative Council in legislative and financial matters.',
    ],
    slip: 'Assuming the Legislative Council can veto an ordinary bill permanently like the Rajya Sabha; the Legislative Council can only delay an ordinary bill for at most 4 months total.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'STATE LEGISLATURE: ASSEMBLY VS COUNCIL', 'ta') +
          // Governor top
          R(110, 32, 140, 26) +
          T(180, 49, 'Governor (Art. 168)', 't', 'middle') +
          LA(150, 58, 95, 78, 'a') +
          LA(210, 58, 265, 78, 'a') +
          // Left: Legislative Assembly
          R(20, 78, 150, 68, 'fa') +
          T(95, 94, 'Legislative Assembly', 'ta', 'middle') +
          T(95, 108, '(Vidhan Sabha)', 'ta', 'middle') +
          T(95, 122, '• Directly Elected · 5 Yrs', 't', 'middle') +
          T(95, 136, '• Money Bills Originate Here', 't', 'middle') +
          // Right: Legislative Council
          R(190, 78, 150, 68) +
          T(265, 94, 'Legislative Council', 't', 'middle') +
          T(265, 108, '(Vidhan Parishad)', 't', 'middle') +
          T(265, 122, '• Permanent · 6 Yrs · 1/3 Retire', 't', 'middle') +
          T(265, 136, '• Max Delay: 4 Months', 't', 'middle') +
          // Bottom note
          R(20, 154, 320, 24) +
          T(180, 170, 'Bihar has Bicameral Legislature: Assembly (243) + Council (75)', 'ta', 'middle')
      ),
      caption:
        'Figure 3.1: Structural comparison between the directly elected, supreme Legislative Assembly and the permanent advisory Legislative Council.',
    },
  },
};
