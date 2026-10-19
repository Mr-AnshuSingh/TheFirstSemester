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

/* ---------- EIC UNIT 1 TOPIC CONTENT (2 Topics) ---------- */
export const EIC_UNIT1_TOPICS: Record<string, TopicContent> = {
  'eic:1:0': {
    explain: [
      'Fundamental Rights are guaranteed in Part III (Articles 12–35) of the Constitution, termed the "Magna Carta of India".',
      'They protect individuals from arbitrary state encroachment, establishing a "government of laws and not of men".',
      'They are justiciable: citizens can directly petition the Supreme Court under Article 32 or High Courts under Article 226 through prerogative writs.',
      'Six broad groups: Right to Equality (Arts 14–18), Right to Freedom (Arts 19–22), Right against Exploitation (Arts 23–24), Freedom of Religion (Arts 25–28), Cultural & Educational Rights (Arts 29–30), and Right to Constitutional Remedies (Art 32).',
      'The Right to Property (Art 31) was deleted as a fundamental right by the 44th Amendment (1978) and made a legal right under Article 300A.',
    ],
    definition:
      'Fundamental Rights are basic civil liberties guaranteed under Part III (Articles 12–35) that protect human dignity and equality against state encroachment, directly enforceable through constitutional prerogative writs under Article 32.',
    formula: '\\text{Part III} = \\text{Equality (14-18)} + \\text{Freedom (19-22)} + \\text{Anti-Exploit (23-24)} + \\text{Religion (25-28)} + \\text{Culture (29-30)} + \\text{Remedies (32)}',
    steps: [
      'Right to Equality (Articles 14–18): Equality before law (14), prohibition of discrimination (15), equal opportunity in public jobs (16), abolition of untouchability (17), abolition of titles (18).',
      'Right to Freedom (Articles 19–22): Six democratic freedoms (19), protection regarding conviction (20), Protection of Life & Personal Liberty (21), Right to Education (21A), protection against arrest (22).',
      'Right against Exploitation (Articles 23–24): Prohibition of human trafficking and forced labor (23), prohibition of employment of children under 14 in hazardous work (24).',
      'Right to Freedom of Religion (Articles 25–28): Freedom of conscience and profession (25), managing religious affairs (26), tax exemption (27), religious instruction (28).',
      'Cultural & Educational Rights (Articles 29–30): Protection of minority language/script (29), right of minorities to establish educational institutions (30).',
      'Article 32 Remedies (5 Writs): Habeas Corpus (release illegal detainee), Mandamus (command official duty), Prohibition, Certiorari (quash order), Quo Warranto (challenge authority).',
    ],
    examAnswer: [
      'Enumerate the six groups of Fundamental Rights with their exact constitutional article spans.',
      'Explain the scope of Article 21 (Right to Life) and how it was broadened in the landmark Maneka Gandhi case (1978).',
      'Describe the 5 prerogative writs issued under Article 32 and explain why Dr. Ambedkar called Article 32 the "Heart and Soul of the Constitution".',
      'Explain the removal of the Right to Property from Part III by the 44th Constitutional Amendment Act of 1978.',
    ],
    slip: 'Treating the Right to Property as an active fundamental right (it is now an ordinary legal right under Art. 300A), or assuming fundamental rights are absolute without reasonable state restrictions.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'FUNDAMENTAL RIGHTS (PART III, ARTS 12–35)', 'ta') +
          // 6 Right Categories Grid
          R(15, 34, 100, 36) +
          T(65, 49, 'Equality', 'ta', 'middle') +
          T(65, 62, 'Arts. 14–18', 't', 'middle') +
          R(130, 34, 100, 36) +
          T(180, 49, 'Freedom', 'ta', 'middle') +
          T(180, 62, 'Arts. 19–22 (21A)', 't', 'middle') +
          R(245, 34, 100, 36) +
          T(295, 49, 'Exploitation', 'ta', 'middle') +
          T(295, 62, 'Arts. 23–24', 't', 'middle') +
          R(15, 78, 100, 36) +
          T(65, 93, 'Religion', 'ta', 'middle') +
          T(65, 106, 'Arts. 25–28', 't', 'middle') +
          R(130, 78, 100, 36) +
          T(180, 93, 'Culture & Edu', 'ta', 'middle') +
          T(180, 106, 'Arts. 29–30', 't', 'middle') +
          R(245, 78, 100, 36, 'fa') +
          T(295, 93, 'Remedies', 'ta', 'middle') +
          T(295, 106, 'Article 32', 'ta', 'middle') +
          // Bottom Article 32 Writs Callout
          R(15, 124, 330, 48, 'fa') +
          T(180, 140, 'ARTICLE 32: "HEART & SOUL" — 5 WRITS', 'ta', 'middle') +
          T(180, 158, 'Habeas Corpus · Mandamus · Prohibition · Certiorari · Quo Warranto', 't', 'middle') +
          T(180, 182, 'Direct access to Supreme Court for enforcement', 't', 'middle')
      ),
      caption:
        'Figure 1.0: The six fundamental rights under Part III anchored by the prerogative writ remedies under Article 32.',
    },
  },

  'eic:1:1': {
    explain: [
      'Fundamental Duties are codified in Part IV-A, Article 51A of the Indian Constitution.',
      'They were not included in the original 1950 constitution; they were recommended by the Swaran Singh Committee and inserted by the 42nd Amendment Act in 1976 (originally 10 duties).',
      'The 11th duty was added by the 86th Constitutional Amendment Act in 2002, obligating parents to provide educational opportunities to children aged 6 to 14.',
      'Fundamental Duties are non-justiciable (cannot be directly enforced by writ), but they serve as a constitutional compass for citizens and aid the judiciary in interpreting legislative validity.',
      'Specific engineering and technological relevance: Art. 51A(h) enjoins citizens to develop "scientific temper, humanism and the spirit of inquiry and reform", while Art. 51A(g) mandates environmental protection.',
    ],
    definition:
      'Fundamental Duties are codified moral, civic, and patriotic obligations under Part IV-A (Article 51A) that exhort Indian citizens to protect sovereignty, preserve cultural and natural heritage, foster scientific temper, and safeguard public property.',
    formula: '\\text{Part IV-A (Art. 51A)} = 10 \\text{ Duties (42nd CAA, 1976)} + 1 \\text{ Duty (86th CAA, 2002)} = 11 \\text{ Total Duties}',
    steps: [
      'Historical Origin: Recommended by the Swaran Singh Committee; inspired by the Constitution of the USSR.',
      '42nd Amendment Act (1976): Added Part IV-A and Article 51A containing clauses (a) to (j).',
      '86th Amendment Act (2002): Added clause (k), requiring parents/guardians to provide education for children between 6 and 14 years.',
      'Non-Justiciability: Unlike Fundamental Rights, duties cannot be directly enforced via court writs; however, Parliament enforces them through statutory laws (e.g. Wildlife Protection Act, National Honour Act).',
      'Duty for Engineers: Clause (h) mandates developing scientific temper, inquiry, and humanism, and Clause (g) commands ecological preservation and compassion for all living creatures.',
    ],
    examAnswer: [
      'Detail the origins of Fundamental Duties: Swaran Singh Committee, 42nd Amendment (1976), and USSR inspiration.',
      'List at least 6 important Fundamental Duties codified under Article 51A.',
      'Explain the significance of Article 51A(h) (scientific temper) and Article 51A(g) (environmental protection) for engineering professionals.',
      'Explain why Fundamental Duties are non-justiciable and how the judiciary uses them to evaluate statutory validity.',
    ],
    slip: 'Claiming that Fundamental Duties can be enforced in court with writs like Fundamental Rights; they are strictly non-justiciable moral duties.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'FUNDAMENTAL DUTIES (PART IV-A, ART. 51A)', 'ta') +
          // Header box
          R(30, 32, 300, 32, 'fa') +
          T(180, 48, '42nd CAA (1976) · Swaran Singh Committee · USSR', 'ta', 'middle') +
          T(180, 59, '10 Original Duties + 1 Added in 2002 (86th CAA) = 11 Total', 't', 'middle') +
          // 4 Featured Duties
          R(20, 74, 150, 42) +
          T(95, 90, 'Art. 51A(a): Respect Flag', 'ta', 'middle') +
          T(95, 104, 'Constitution & Anthem', 't', 'middle') +
          R(190, 74, 150, 42, 'fa') +
          T(265, 90, 'Art. 51A(g): Environment', 'ta', 'middle') +
          T(265, 104, 'Forests, lakes & wildlife', 't', 'middle') +
          R(20, 122, 150, 42, 'fa') +
          T(95, 138, 'Art. 51A(h): Scientific Temper', 'ta', 'middle') +
          T(95, 152, 'Humanism & inquiry', 't', 'middle') +
          R(190, 122, 150, 42) +
          T(265, 138, 'Art. 51A(k): Education', 'ta', 'middle') +
          T(265, 152, 'Duty of parent (6–14 yrs)', 't', 'middle') +
          // Footer
          T(180, 182, 'Non-Justiciable: Guides judicial interpretation and citizen ethics', 'ta', 'middle')
      ),
      caption:
        'Figure 1.1: The 11 Fundamental Duties under Article 51A highlighting scientific temper (h) and ecological stewardship (g) for engineers.',
    },
  },
};
