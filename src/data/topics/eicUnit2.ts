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

/* ---------- EIC UNIT 2 TOPIC CONTENT (2 Topics) ---------- */
export const EIC_UNIT2_TOPICS: Record<string, TopicContent> = {
  'eic:2:0': {
    explain: [
      'Directive Principles of State Policy (DPSP) are contained in Part IV (Articles 36–51) of the Indian Constitution, inspired by the Irish Constitution.',
      'Dr. B. R. Ambedkar characterized them as "novel features" aimed at establishing economic democracy and transforming India into a Welfare State rather than a mere police state.',
      'Article 37 explicitly declares that DPSPs are non-justiciable (cannot be directly enforced by courts), yet they are "fundamental in the governance of the country" and it is the duty of the state to apply them in legislation.',
      'In the landmark Minerva Mills case (1980), the Supreme Court ruled that the Indian Constitution is founded on the bedrock of balance between Part III (Fundamental Rights) and Part IV (DPSPs)—neither may be subordinated to the other.',
    ],
    definition:
      'Directive Principles of State Policy are constitutional guidelines embodied in Part IV (Articles 36–51) that instruct the state to establish an egalitarian welfare order through socio-economic policies, functioning as the non-justiciable moral and legislative compass of governance.',
    formula: '\\text{Constitutional Harmony: } \\text{Part III (Civil Liberties)} \\xleftrightarrow{\\text{Minerva Mills (1980)}} \\text{Part IV (Socio-Economic Welfare)}',
    steps: [
      'Constitutional Welfare Mandate: Directs the state to promote welfare of the people by securing an egalitarian social order (Article 38).',
      'Non-Justiciability (Article 37): Courts cannot issue writs to force the state to execute a DPSP if state finances or resources do not permit.',
      'Fundamental in Governance: Imposes a permanent constitutional duty on Parliament and State Legislatures to embed these principles into statutory laws.',
      'Minerva Mills Harmonization (1980): The Supreme Court struck down provisions subordinating Part III to Part IV; both parts are complementary wheels of the constitutional chariot.',
      'Article 31C Shield: Laws enacted to implement Article 39(b) (resource distribution) and 39(c) (preventing concentration of wealth) are protected from challenge under Articles 14 and 19.',
    ],
    examAnswer: [
      'Explain the constitutional relevance and core philosophy of Directive Principles of State Policy under Part IV.',
      'Analyze Article 37: explain what "non-justiciable yet fundamental in the governance of the country" signifies.',
      'Discuss the historic conflict and judicial harmonization between Fundamental Rights and DPSPs (Minerva Mills case).',
      'Explain the constitutional shield provided by Article 31C to laws implementing Articles 39(b) and 39(c).',
    ],
    slip: 'Assuming DPSPs are legally useless because they are non-justiciable; they form the legal justification for landmark welfare statutes including the Maternity Benefit Act, MGNREGA, and Environmental Protection Acts.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'MINERVA MILLS (1980): THE TWO WHEELS', 'ta') +
          // Left Wheel: Part III
          C(90, 95, 45, 'fa') +
          C(90, 95, 30) +
          T(90, 90, 'Part III', 'ta', 'middle') +
          T(90, 104, 'Fundamental', 't', 'middle') +
          T(90, 116, 'Rights', 't', 'middle') +
          // Right Wheel: Part IV
          C(270, 95, 45, 'fa') +
          C(270, 95, 30) +
          T(270, 90, 'Part IV', 'ta', 'middle') +
          T(270, 104, 'Directive', 't', 'middle') +
          T(270, 116, 'Principles', 't', 'middle') +
          // Connecting Axle
          R(135, 90, 90, 12, 'fa') +
          T(180, 82, 'CONSTITUTIONAL AXLE', 'ta', 'middle') +
          T(180, 120, 'Golden Balance', 'ta', 'middle') +
          // Bottom Subtext
          R(20, 155, 320, 24) +
          T(180, 171, 'Minerva Mills: To give primacy to one over the other destroys the harmony', 't', 'middle')
      ),
      caption:
        'Figure 2.0: The Supreme Court (Minerva Mills 1980) established that Fundamental Rights and Directive Principles are twin wheels of the constitutional chariot.',
    },
  },

  'eic:2:1': {
    explain: [
      'The Articles under Part IV (Articles 36–51) are classified into three ideological categories: Socialistic, Gandhian, and Liberal-Intellectual.',
      'Socialistic Principles: Art. 38 (welfare order), Art. 39 (resource distribution [39b], preventing concentration of wealth [39c], equal pay for equal work [39d]), Art. 39A (free legal aid), Art. 41 (right to work/education), Art. 42 (maternity relief), Art. 43 (living wage).',
      'Gandhian Principles: Art. 40 (Village Panchayats), Art. 43 (cottage industries), Art. 43B (cooperatives), Art. 46 (educational interests of SC/ST), Art. 47 (prohibition of intoxicating drinks), Art. 48 (prohibition of cow slaughter).',
      'Liberal-Intellectual Principles: Art. 44 (Uniform Civil Code), Art. 45 (early childhood care), Art. 48A (environmental protection and wildlife safeguarding), Art. 50 (separation of judiciary from executive), Art. 51 (international peace).',
    ],
    definition:
      'The articles of State Policy represent an ideological synthesis of Socialistic, Gandhian, and Liberal-Intellectual directives that structure welfare programs, environmental conservation, local self-governance, and international diplomacy.',
    formula: '\\text{Part IV Articles} = \\text{Socialistic (38, 39, 41-43A)} + \\text{Gandhian (40, 43, 46-48)} + \\text{Liberal (44, 48A, 50, 51)}',
    steps: [
      'Socialistic Directives: Secure equitable resource allocation (Art. 39b), avoid monopolies (Art. 39c), ensure equal pay for equal work for men and women (Art. 39d), and provide free legal aid (Art. 39A).',
      'Gandhian Directives: Organize village panchayats as self-governing units (Art. 40), promote rural cottage industries (Art. 43), and ban intoxicants (Art. 47).',
      'Uniform Civil Code (Article 44): Directs the state to secure a uniform civil code for all citizens throughout India.',
      'Environmental Preservation (Article 48A): Added by the 42nd Amendment (1976), obligating the state to protect and improve the natural environment and safeguard forests and wildlife.',
      'Separation of Powers (Article 50): Commands the separation of the public judicial machinery from the executive branch.',
    ],
    examAnswer: [
      'Classify the Directive Principles into Socialistic, Gandhian, and Liberal-Intellectual groups with relevant article numbers.',
      'Detail the provisions of Article 39(b) and Article 39(c) regarding resource distribution and prevention of wealth concentration.',
      'Explain the constitutional mandates of Article 44 (Uniform Civil Code) and Article 48A (Environmental Protection).',
      'Describe the significance of Article 50 (Separation of Judiciary from Executive).',
    ],
    slip: 'Confusing article numbers (e.g. confusing Art. 44 Uniform Civil Code with Art. 40 Village Panchayats), or assuming that these three ideological labels are explicitly printed as section headings in the text of the Constitution.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 3 CLASSIFICATIONS OF DPSPs', 'ta') +
          // 3 Columns
          // Col 1: Socialistic
          R(15, 34, 105, 120) +
          T(67, 50, 'Socialistic', 'ta', 'middle') +
          T(67, 68, '• Art. 38: Welfare', 't', 'middle') +
          T(67, 82, '• Art. 39(b,c): Wealth', 't', 'middle') +
          T(67, 96, '• Art. 39(d): Equal pay', 't', 'middle') +
          T(67, 110, '• Art. 39A: Legal aid', 't', 'middle') +
          T(67, 124, '• Art. 41: Work/Edu', 't', 'middle') +
          T(67, 138, '• Art. 43: Living wage', 't', 'middle') +
          // Col 2: Gandhian
          R(127, 34, 105, 120, 'fa') +
          T(179, 50, 'Gandhian', 'ta', 'middle') +
          T(179, 68, '• Art. 40: Panchayats', 'ta', 'middle') +
          T(179, 82, '• Art. 43: Cottage Ind', 't', 'middle') +
          T(179, 96, '• Art. 43B: Cooperatives', 't', 'middle') +
          T(179, 110, '• Art. 46: SC/ST welfare', 't', 'middle') +
          T(179, 124, '• Art. 47: Ban liquor', 't', 'middle') +
          T(179, 138, '• Art. 48: Protect cows', 't', 'middle') +
          // Col 3: Liberal-Intellectual
          R(240, 34, 105, 120) +
          T(292, 50, 'Liberal-Intellectual', 'ta', 'middle') +
          T(292, 68, '• Art. 44: Uniform Code', 't', 'middle') +
          T(292, 82, '• Art. 45: Early child', 't', 'middle') +
          T(292, 96, '• Art. 48A: Environment', 'ta', 'middle') +
          T(292, 110, '• Art. 49: Monuments', 't', 'middle') +
          T(292, 124, '• Art. 50: Separate Jud.', 't', 'middle') +
          T(292, 138, '• Art. 51: World peace', 't', 'middle') +
          // Footer
          T(180, 178, 'Synthesis of socio-economic justice, indigenous values & modern rule of law', 'ta', 'middle')
      ),
      caption:
        'Figure 2.1: Tripartite classification of Directive Principles: Socialistic welfare, Gandhian rural reconstruction, and Liberal-intellectual reforms.',
    },
  },
};
