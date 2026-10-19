import { TopicContent, UnitStory } from '@/types/syllabus';

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

/* ---------- UHV UNIT STORIES (5 Units) ---------- */
export const UHV_UNIT_STORIES: Record<string, UnitStory> = {
  'uhv:0': {
    whatItIs:
      'Universal Human Values introduces self-exploration as the foundational method of value education, enabling individuals to discover what is genuinely and intrinsically valuable to human beings.',
    whyItMatters:
      'Engineers master technical skill (how to do), but without value education (what to do and why), technology produces environmental degradation, resource exploitation, and human stress.',
    howItWorks:
      'Self-exploration operates through two internal mechanisms: Natural Acceptance (innate intuition of harmony) and Experiential Validation (verifying propositions in real-life living). This leads to continuous happiness and the feeling of prosperity.',
  },
  'uhv:1': {
    whatItIs:
      'This unit deconstructs the human being as the harmonious co-existence of two distinct entities: the conscious, sentient Self (“I”) and the physical, material Body.',
    whyItMatters:
      'Conflating the needs of the Self (happiness, respect, trust) with the needs of the Body (food, shelter, sensory pleasures) is the root cause of consumerist greed and perpetual dissatisfaction.',
    howItWorks:
      'The Self is the conscious seer, doer, and enjoyer needing qualitative, continuous harmony. The Body is a material instrument needing quantitative, temporary physical facilities. Sanyam (self-regulation) yields Swasthya (bodily health).',
  },
  'uhv:2': {
    whatItIs:
      'This unit explores the innate, universal values governing human-to-human relationships within family and society.',
    whyItMatters:
      'Material wealth cannot substitute for relational harmony. Mistrust, ego clashes, and exploitation destroy families, workplaces, and societal peace.',
    howItWorks:
      'Harmonious relationships rest on nine foundational values anchored by Trust (Vishwas, the foundation value) and culminating in Love (Prem, the complete value). Living these values expands harmony from the individual to family, society, and universal human order.',
  },
  'uhv:3': {
    whatItIs:
      'Nature is a self-regulated, harmonious whole comprising four interconnected orders: Material (padartha), Pranic/Plant (pran), Animal (jeev), and Human (gyan).',
    whyItMatters:
      'The first three orders naturally exhibit mutual fulfillment and ecological balance. Humans are the only order currently causing ecological crisis by failing to understand co-existence in all-pervasive space.',
    howItWorks:
      'Every entity in existence is an active, energized unit submerged in all-pervasive, calm space. Harmony in nature is maintained when human beings transition from ruthless exploitation to conscious mutual fulfillment.',
  },
  'uhv:4': {
    whatItIs:
      'Professional ethics is the practical manifestation of right understanding and human values in engineering practice, technology design, and management systems.',
    whyItMatters:
      'Without ethical competence, engineering education trains clever technicians who build predatory monopolies, pollute ecosystems, and weaponize software against human welfare.',
    howItWorks:
      'Ethical human conduct is definitive and universal because it originates from natural acceptance. The transition to a Universal Human Order requires self-evolution at the individual level paired with humanistic education, health, justice, production, and exchange systems at the societal level.',
  },
};

/* ---------- UHV UNIT 0 TOPIC CONTENT (3 Topics) ---------- */
export const UHV_UNIT0_TOPICS: Record<string, TopicContent> = {
  'uhv:0:0': {
    explain: [
      'Self-exploration is the systematic process of observing within oneself to discover what is genuinely valuable and naturally acceptable.',
      'It is not a set of dogmas, moral preachings, or do’s and don’ts; rather, it is a proposal to be verified through one’s own Natural Acceptance and Experiential Validation.',
    ],
    definition:
      'Self-exploration is an introspective dialogical process of value education wherein proposals are investigated on the basis of natural acceptance and validated through living in mutual fulfillment with human beings and nature.',
    formula: '\\text{Self-Exploration} = \\text{Proposal} \\xrightarrow{\\text{Verify by}} \\text{Natural Acceptance} + \\text{Experiential Living}',
    steps: [
      'Content of Self-Exploration: Exploring what is my basic human desire (happiness and prosperity) and what is the program to fulfill it.',
      'Process Step 1: Whatever is stated is a Proposal; do not accept it as true just because it is written in books or spoken by elders.',
      'Process Step 2 (Natural Acceptance): Verify whether the proposal is naturally acceptable to your core conscience (unconditional, invariant inner voice).',
      'Process Step 3 (Experiential Validation): Live according to the proposal in mutual fulfillment with humans (mutual happiness) and with nature (mutual prosperity).',
      'Outcome: Realization and understanding replace blind belief, leading to internal harmony and definitive human conduct.',
    ],
    examAnswer: [
      'Define Self-Exploration as the core process of value education.',
      'Explain the two pillars of verification: Natural Acceptance (Sahaj Sweekriti) and Experiential Validation (Anubhavik Praman).',
      'Draw the complete Self-Exploration flow diagram: Proposal -> Natural Acceptance -> Experiential Living -> Mutual Happiness & Prosperity.',
      'Contrast Self-Exploration with conditioning/preachings (free from peer pressure, culture bias, and fear).',
    ],
    slip: 'Never define natural acceptance as personal whim or temporary desire; natural acceptance is invariant, universal, and uncorrupted by sensory conditioning or peer pressure.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'PROCESS OF SELF-EXPLORATION', 'ta') +
          R(20, 36, 120, 45) +
          T(80, 54, 'PROPOSAL', 't', 'middle') +
          T(80, 70, '(Do not assume/blindly believe)', 'ta', 'middle') +
          LA(140, 58, 175, 58, 'a') +
          R(175, 36, 165, 45, 'fa') +
          T(257, 54, 'Natural Acceptance', 't', 'middle') +
          T(257, 70, 'Innate · Unchanging · Universal', 'ta', 'middle') +
          LA(257, 81, 257, 105, 'a') +
          R(175, 105, 165, 45) +
          T(257, 122, 'Experiential Validation', 't', 'middle') +
          T(257, 138, 'Live in real-world relations', 'ta', 'middle') +
          LA(175, 127, 140, 127, 'a') +
          R(20, 105, 120, 45, 'fa') +
          T(80, 122, 'RIGHT UNDERSTANDING', 't', 'middle') +
          T(80, 138, 'Mutual Happiness & Prosperity', 'ta', 'middle') +
          T(180, 178, 'Verification requires both internal acceptance AND experiential living', 'ta', 'middle')
      ),
      caption: 'The dialogical cycle of self-exploration through natural acceptance and experiential living.',
    },
  },

  'uhv:0:1': {
    explain: [
      'Continuous happiness and prosperity are the two fundamental, universal aspirations of all human beings across all cultures and historical eras.',
      'Happiness is a state of internal harmony and being in peace with oneself; prosperity is the feeling of having more physical facility than is required.',
    ],
    definition:
      'Continuous happiness is a state of unbroken internal harmony and balance across all levels of human living, while prosperity is the conscious conviction of possessing more physical facilities than needed.',
    formula: '\\text{Human Aspiration} = \\text{Continuous Happiness (Sukh)} + \\text{Prosperity (Samridhi)}',
    steps: [
      'Happiness (Sukh): To be in a state of harmony. Whenever there is harmony in our thoughts, feelings, and relationships, we feel happy; disharmony creates unhappiness.',
      'Prosperity (Samridhi): Feeling of having more than required physical facility. Requires two parts: correctly assessing needs, and producing more through physical labor.',
      'Wealth vs Prosperity: Wealth is a material quantity of physical accumulation (money, goods); prosperity is a subjective feeling of abundance.',
      'Prevailing Fallacy (Animal Consciousness): Equating prosperity with infinite accumulation of physical wealth, leading to resource exploitation and fear of deprivation.',
      'Human Consciousness: Right understanding brings inner happiness; knowing bodily limits brings genuine prosperity and generosity.',
    ],
    examAnswer: [
      'Define Happiness and Prosperity in precise value education terminology.',
      'Differentiate clearly between Wealth (material accumulation) and Prosperity (the feeling of having enough).',
      'Explain the 2 prerequisites for feeling prosperous: 1. Correctly assessing bodily needs; 2. Producing more through eco-friendly labor.',
      'Explain why continuous physical accumulation without right understanding produces deprivation rather than prosperity.',
    ],
    slip: 'Do not confuse physical comfort or sensory pleasure (like eating ice cream) with continuous happiness; sensory pleasure is temporary and turns to discomfort if forced continuously.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'HAPPINESS (SUKH) & PROSPERITY (SAMRIDHI)', 'ta') +
          R(20, 36, 150, 85) +
          T(95, 54, 'Happiness (Sukh)', 'ta', 'middle') +
          T(95, 72, 'State of Inner Harmony', 't', 'middle') +
          T(95, 88, 'Continuous & Qualitative', 'ta', 'middle') +
          T(95, 104, 'Need of the Self (I)', 't', 'middle') +
          R(190, 36, 150, 85, 'fa') +
          T(265, 54, 'Prosperity (Samridhi)', 'ta', 'middle') +
          T(265, 72, 'Feeling of Having Enough', 't', 'middle') +
          T(265, 88, 'Correct Need Assessment', 'ta', 'middle') +
          T(265, 104, 'Need of the Body', 't', 'middle') +
          R(20, 130, 320, 45) +
          T(30, 150, 'Wealth != Prosperity: A billionaire lacking fulfillment feels deprived', 'ta') +
          T(30, 166, 'Prosperity naturally inspires sharing; greed stems from internal void', 't')
      ),
      caption: 'Distinction between qualitative inner happiness (Sukh) and the quantitative feeling of prosperity (Samridhi).',
    },
  },

  'uhv:0:2': {
    explain: [
      'Right understanding is the cognitive foundation of human living, enabling a person to see reality as it is—an interconnected whole characterized by harmony and co-existence.',
      'Human life operates across three primary dimensions: Right Understanding (in oneself), Relationship (with other human beings), and Physical Facility (with the rest of nature).',
    ],
    definition:
      'Right understanding is the clear perception of harmony and co-existence at all four levels of living: in oneself, in family, in society, and in nature/existence.',
    formula: '\\text{Priority Order: } \\text{Right Understanding} \\xrightarrow{\\text{Leads to}} \\text{Relationship (Mutual Happiness)} + \\text{Physical Facility (Mutual Prosperity)}',
    steps: [
      'Level 1: Harmony in oneself (between the Self and Body, thoughts, and desires).',
      'Level 2: Harmony in family (trust and respect in interpersonal relationships).',
      'Level 3: Harmony in society (fearlessness, justice, and universal human order).',
      'Level 4: Harmony in nature and existence (mutual fulfillment among all four natural orders).',
      'Correct Priority: 1. Right Understanding (first priority); 2. Relationship with human beings (second); 3. Physical facility with nature (third).',
    ],
    examAnswer: [
      'Define Right Understanding (Samyak Darshan) and list the 4 levels of human living.',
      'Draw the triangle/hierarchy of Right Understanding, Relationship, and Physical Facility with correct priorities.',
      'Explain what happens when physical facility is treated as the primary priority (produces exploitation, greed, and conflict).',
      'State how right understanding leads to mutual happiness with humans and mutual prosperity with nature.',
    ],
    slip: 'Never depict physical facility as evil or unnecessary; physical facility is essential for the body, but it is subordinate to right understanding and relationship.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE THREE PRIORITIES: UNDERSTANDING, RELATION, FACILITY', 'ta') +
          P('M180 34 L270 120 L90 120 Z', 'l') +
          C(180, 34, 18, 'fa') +
          T(180, 38, '1', 'ta', 'middle') +
          T(180, 16, 'Right Understanding (Self)', 't', 'middle') +
          C(90, 120, 18) +
          T(90, 124, '2', 't', 'middle') +
          T(60, 142, 'Relationship (Humans)', 'ta') +
          C(270, 120, 18) +
          T(270, 124, '3', 't', 'middle') +
          T(215, 142, 'Physical Facility (Nature)', 'ta') +
          T(180, 85, 'PRIORITY', 'ta', 'middle') +
          T(180, 168, '1 -> 2 yields Mutual Happiness; 1 -> 3 yields Mutual Prosperity', 't', 'middle') +
          T(180, 184, 'Without Right Understanding, physical facility leads to exploitation', 'ta', 'middle')
      ),
      caption: 'The fundamental priority structure: Right Understanding leading to harmonious relationships and physical facilities.',
    },
  },
};
