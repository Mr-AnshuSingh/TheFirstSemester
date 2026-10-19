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

/* ---------- UHV UNIT 4 TOPIC CONTENT (5 Topics) ---------- */
export const UHV_UNIT4_TOPICS: Record<string, TopicContent> = {
  'uhv:4:0': {
    explain: [
      'Natural Acceptance (Sahaj Svikriti) is the innate, unconditioned intuitive compass in every human consciousness that recognizes what is naturally right, harmonious, and fulfilling.',
      'Unlike fleeting desires, sensory pleasures, or societal conditionings, natural acceptance remains constant across time, geography, culture, and individual personalities.',
      'Aligning one’s life with natural acceptance generates continuous inner harmony (Sukh), while actions contradicting it inevitably cause cognitive dissonance, guilt, and stress.',
    ],
    definition:
      'Natural acceptance is the invariant, intrinsic human faculty that unconditionally recognizes universal human values and harmonic relationships, operating independently of social conditioning, fear, or sensory allure.',
    formula: '\\text{Natural Acceptance (Sahaj Svikriti)} = \\text{Invariant} \\cap \\text{Universal} \\cap \\text{Harmonious} \\neq \\text{Sensory Preference}',
    steps: [
      'Property 1 — Invariant with Time: Truth, trust, compassion, and respect were naturally acceptable thousands of years ago, remain so today, and will remain so forever.',
      'Property 2 — Invariant with Space/Culture: It does not alter between countries, races, or continents; no human naturally desires to be mistrusted, enslaved, or exploited.',
      'Property 3 — Invariant with Individual: Regardless of past conditioning or habits, deep down every human desires mutual happiness and peace.',
      'Property 4 — Self-Evident & Autonomous: It needs no external police, religious threat, or reward; it is verified spontaneously from within.',
      'Ethical Metric: Whenever contemplating a decision, verifying it against natural acceptance provides immediate moral clarity.',
    ],
    examAnswer: [
      'Define Natural Acceptance (Sahaj Svikriti) with its 4 defining characteristics (Time, Place, Individual invariance, Self-evidence).',
      'Distinguish between Natural Acceptance and Sensory Desires / Preconditionings.',
      'Explain how Natural Acceptance acts as an internal moral compass in engineering and technology decisions.',
      'Give an example illustrating how violating natural acceptance produces psychological distress and conflict.',
    ],
    slip: 'Never confuse Natural Acceptance with societal habits or popular trends; what majority people currently do may be corrupted by consumerist conditioning, but Natural Acceptance remains pure and uncorrupted inside.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'NATURAL ACCEPTANCE VS CONDITIONING', 'ta') +
          // Left Box: Conditioning & Desires
          R(20, 32, 150, 140) +
          T(95, 52, 'Conditioning / Desires', 'ta', 'middle') +
          T(95, 72, '• Changes with time & age', 't', 'middle') +
          T(95, 88, '• Driven by senses & ego', 't', 'middle') +
          T(95, 104, '• Dependent on peer views', 't', 'middle') +
          T(95, 120, '• Causes inner conflict', 't', 'middle') +
          T(95, 145, 'Result: Anxiety & Stress', 't', 'middle') +
          // Right Box: Natural Acceptance
          R(190, 32, 150, 140, 'fa') +
          T(265, 52, 'Natural Acceptance', 'ta', 'middle') +
          T(265, 72, '• Invariant across time', 't', 'middle') +
          T(265, 88, '• Universal to all humans', 't', 'middle') +
          T(265, 104, '• Self-evident & internal', 't', 'middle') +
          T(265, 120, '• Promotes harmony', 't', 'middle') +
          T(265, 145, 'Result: Lasting Peace (Sukh)', 'ta', 'middle') +
          // Bottom connection
          L(170, 102, 190, 102, 'd')
      ),
      caption:
        'Figure 4.0: Natural acceptance is the universal, unconditioned internal guide to harmony, contrasting with fluctuating sensory desires and social conditioning.',
    },
  },

  'uhv:4:1': {
    explain: [
      'Ethical human conduct (Manavya Acharan) is not an elusive, subjective ideal; when rooted in right understanding and natural acceptance, human behavior becomes definitive, dependable, and universally harmonious.',
      'Definitiveness means that just as the properties of gold or water are predictable and unvarying, the conduct of an enlightened human being is reliably mutually fulfilling.',
      'Ethical conduct is constituted by three inseparable dimensions: Values (Mulya), Policy (Niti), and Character (Charitra).',
    ],
    definition:
      'Definitiveness of ethical human conduct is the consistent, predictable, and mutually fulfilling expression of human living comprising ethical values in relationship (Mulya), ethical policy in resource utilization (Niti), and ethical character in living (Charitra).',
    formula: '\\text{Ethical Conduct} = \\text{Mulya (Values)} + \\text{Niti (Policy)} + \\text{Charitra (Character)}',
    steps: [
      'Pillar 1 — Mulya (Values): Living with the 9 relational values (Trust, Respect, Affection, Care, etc.) in human relationships, ensuring mutual happiness.',
      'Pillar 2 — Niti (Policy): Principles for resource usage — Artha Niti (enrichment of wealth/resources), Dharma Niti (protection and rightful allocation), and Raj Niti (administration and justice).',
      'Pillar 3 — Charitra (Character): Sva-Nari/Sva-Purush (chastity and loyalty in marital bond), Sva-Dhana (wealth generated through rightful bodily labor, never exploitation), and Dayapurna Vyavahar (compassionate behavior towards all creatures).',
      'Universal Definitiveness: Removes situational hypocrisy, bribery, and coercion; conduct is naturally guided by inner harmony rather than external fear of punishment.',
      'Societal Outcome: When conduct is definitive, fearlessness and trust permeate the community, establishing an undivided society (Akhand Samaj).',
    ],
    examAnswer: [
      'Define Definitiveness of Ethical Human Conduct (Nischit Manavya Acharan).',
      'Explain the tripartite framework: Mulya (Values), Niti (Policy), and Charitra (Character).',
      'Detail the 3 cardinal rules of Charitra: Sva-Dhana, Marital Fidelity, and Dayapurna Vyavahar.',
      'Contrast definitive conduct based on right understanding with rule-based compliance enforced by penal law.',
    ],
    slip: 'Never think ethical conduct requires legal surveillance or external policing; true ethical conduct is definitive because it stems effortlessly from one’s own inner realization and natural acceptance.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 3 PILLARS OF ETHICAL CONDUCT', 'ta') +
          // Central Triangle / Nodes
          // Top Node: Mulya (Values)
          R(110, 32, 140, 32, 'fa') +
          T(180, 48, '1. MULYA (Values)', 'ta', 'middle') +
          T(180, 59, '9 Relational Feelings', 't', 'middle') +
          // Bottom Left: Niti (Policy)
          R(25, 115, 140, 38) +
          T(95, 131, '2. NITI (Policy)', 'ta', 'middle') +
          T(95, 144, 'Artha · Dharma · Raj', 't', 'middle') +
          // Bottom Right: Charitra (Character)
          R(195, 115, 140, 38) +
          T(265, 131, '3. CHARITRA (Character)', 'ta', 'middle') +
          T(265, 144, 'Sva-Dhana · Loyalty · Mercy', 't', 'middle') +
          // Connecting lines
          L(145, 64, 95, 115, 'a') +
          L(215, 64, 265, 115, 'a') +
          L(165, 134, 195, 134, 'd') +
          // Central Label
          C(180, 100, 16, 'fa') +
          T(180, 104, 'Ethic', 'ta', 'middle') +
          T(180, 178, 'Result: Universal, Definitive & Predictable Conduct', 'ta', 'middle')
      ),
      caption:
        'Figure 4.1: Ethical human conduct is definitively formed by the integration of Values (Mulya), Policy (Niti), and Character (Charitra).',
    },
  },

  'uhv:4:2': {
    explain: [
      'To sustain ethical living across generations, right understanding must be institutionalized into educational, constitutional, and societal systems.',
      'Humanistic education transforms students from self-centered consumers into socially and ecologically responsible citizens.',
      'A humanistic constitution guarantees the fulfillment of fundamental human goals, laying the blueprint for a Universal Human Order (Sarvabhaum Vyavastha).',
    ],
    definition:
      'Humanistic systems are institutional architectures (education, constitution, governance) designed to nurture right understanding, protect human dignity, ensure ecological balance, and sustain an undivided global society.',
    formula: '\\text{Humanistic Education} \\longrightarrow \\text{Humanistic Constitution} \\longrightarrow \\text{Universal Human Order (Sarvabhaum Vyavastha)}',
    steps: [
      'Humanistic Education (Manavya Shiksha): Integrates values with technical and scientific skills (what to do + how to do); transitions society from animal to human consciousness.',
      'Humanistic Constitution (Manavya Sambhidhan): Legal architecture that replaces conflict-management and exploitation with frameworks guaranteeing Right Understanding, Prosperity, Fearlessness, and Co-existence.',
      'Five Dimensions of Societal Order: 1. Education-Sanskar, 2. Health-Sanyam, 3. Production-Work, 4. Justice-Suraksha, 5. Exchange-Storage.',
      'Akhand Samaj (Undivided Society): A societal state free from communal, racial, or national hostilities, where every individual feels related to everyone else.',
      'Sarvabhaum Vyavastha (Universal Human Order): A federated, decentralized global structure from village council (Gram Sabha) to world council, living in total ecological harmony.',
    ],
    examAnswer: [
      'Define Humanistic Education, Humanistic Constitution, and Universal Human Order.',
      'Detail the 5 core dimensions of human order: Education-Sanskar, Health-Sanyam, Production-Work, Justice-Suraksha, Exchange-Storage.',
      'Contrast conventional litigation/punishment-based legal systems with a Humanistic Constitution.',
      'Explain the progression from individual self-evolution to Akhand Samaj (Undivided Society).',
    ],
    slip: 'Do not think a humanistic constitution merely adds welfare schemes to existing corporate capitalism; it reorients the fundamental premise of governance from profit maximization to human and ecological fulfillment.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 5 DIMENSIONS OF UNIVERSAL HUMAN ORDER', 'ta') +
          // 5 horizontal blocks
          R(15, 34, 155, 32, 'fa') +
          T(92, 48, '1. Education - Sanskar', 'ta', 'middle') +
          T(92, 59, 'Right understanding in all', 't', 'middle') +
          R(190, 34, 155, 32) +
          T(267, 48, '2. Health - Sanyam', 't', 'middle') +
          T(267, 59, 'Bodily health & discipline', 't', 'middle') +
          R(15, 76, 155, 32) +
          T(92, 90, '3. Production - Work', 't', 'middle') +
          T(92, 101, 'Eco-friendly prosperity', 't', 'middle') +
          R(190, 76, 155, 32) +
          T(267, 90, '4. Justice - Suraksha', 't', 'middle') +
          T(267, 101, 'Fearlessness & safety', 't', 'middle') +
          R(100, 118, 160, 32, 'fa') +
          T(180, 132, '5. Exchange - Storage', 'ta', 'middle') +
          T(180, 143, 'Mutual service, no hoarding', 't', 'middle') +
          // Final Goal
          LA(180, 150, 180, 166, 'a') +
          T(180, 180, 'Universal Human Order (Sarvabhaum Vyavastha)', 'ta', 'middle')
      ),
      caption:
        'Figure 4.2: The 5 societal dimensions work synergistically to build an undivided society and universal human order.',
    },
  },

  'uhv:4:3': {
    explain: [
      'Professional ethics in engineering and technology is the capability to conduct professional work in a manner that is both people-friendly (Manav-Anukool) and eco-friendly (Prakriti-Anukool).',
      'A technologist must never divorce technical expertise from human consequence; building predatory algorithms, planned obsolescence, and polluting manufacturing reflects ethical incompetence.',
      'True professional competence balances economic viability with human welfare and long-term ecological sustainability.',
    ],
    definition:
      'Competence in professional ethics is the practical ability of an engineer or professional to conceptualize, design, and implement technologies and systems that uphold human dignity, social justice, and cyclical ecological balance.',
    formula: '\\text{Ethical Competence} = \\text{Technical Mastery} \\times (\\text{People-Friendly} + \\text{Eco-Friendly Design})',
    steps: [
      'Criterion 1 — People-Friendly (Manav-Anukool): Technologies must enhance human well-being, promote physical health, respect mental autonomy, protect privacy, and eliminate exploitation.',
      'Criterion 2 — Eco-Friendly (Prakriti-Anukool): Systems must be renewable, energy-efficient, recyclable, non-toxic, and cyclic (cradle-to-cradle lifecycle).',
      'Unethical Industry Malpractices: Planned obsolescence, addictive dark patterns, spyware/surveillance capitalism, toxic environmental dumping, deceptive advertising, and military weaponization.',
      'Root Cause of Malpractice: Prevailing myth that profit maximization and cutthroat competition are the sole purpose of enterprise (prevailing animal consciousness).',
      'Role of the Ethical Engineer: Resisting unethical corporate pressure, upholding public safety, designing repairable open architectures, and championing sustainable engineering.',
    ],
    examAnswer: [
      'Define Competence in Professional Ethics and distinguish it from mere legal compliance.',
      'State and explain the two foundational criteria of ethical technology: People-friendly and Eco-friendly.',
      'Enumerate 4 major unethical practices prevalent in modern computing and engineering industries.',
      'Explain how an engineer equipped with right understanding approaches technical design and corporate ethics.',
    ],
    slip: 'Never believe that "technology is neutral and ethics is purely up to the end user"; choices made during code development, algorithmic optimization, and material selection inherently embody ethical consequences.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'DUAL PILLARS OF ETHICAL TECHNOLOGY', 'ta') +
          // Roof: Competence in Professional Ethics
          R(30, 32, 300, 28, 'fa') +
          T(180, 50, 'COMPETENCE IN PROFESSIONAL ETHICS', 'ta', 'middle') +
          // Pillar 1: People-Friendly
          R(45, 68, 125, 75) +
          T(107, 85, 'People-Friendly', 'ta', 'middle') +
          T(107, 102, '• User Privacy & Safety', 't', 'middle') +
          T(107, 116, '• Non-addictive Design', 't', 'middle') +
          T(107, 130, '• Social Empowerment', 't', 'middle') +
          // Pillar 2: Eco-Friendly
          R(190, 68, 125, 75) +
          T(252, 85, 'Eco-Friendly', 'ta', 'middle') +
          T(252, 102, '• Circular & Recyclable', 't', 'middle') +
          T(252, 116, '• Renewable Energy', 't', 'middle') +
          T(252, 130, '• Zero Toxic Waste', 't', 'middle') +
          // Foundation
          R(30, 149, 300, 24, 'fa') +
          T(180, 165, 'Foundation: Right Understanding & Universal Human Values', 'ta', 'middle')
      ),
      caption:
        'Figure 4.3: Professional ethics rests upon two complementary pillars: People-friendly social design and Eco-friendly environmental sustainability.',
    },
  },

  'uhv:4:4': {
    explain: [
      'Transitioning from the current state of consumerism, environmental collapse, and social distrust to a Universal Human Order requires a systematic, two-pronged roadmap.',
      'Change cannot occur through top-down enforcement alone, nor through isolated personal morality; it demands simultaneous transformation at the Individual Level and the Societal Level.',
      'The strategy is evolutionary and voluntary, grounded completely in educational realization rather than coercive legislation or revolutionary violence.',
    ],
    definition:
      'The strategy for transition is the structured, multi-level roadmap that systematically guides human civilization from animal consciousness (competition and exploitation) to human consciousness (collaboration and mutual fulfillment).',
    formula: '\\text{Transition Roadmap} = \\text{Individual Evolution (Self-Exploration)} + \\text{Societal Transformation (Systems \& Education)}',
    steps: [
      'Current State: Dominated by Animal Consciousness, consumerism, resource depletion, mental anxiety, broken families, and geopolitical strife.',
      'Target State: Universal Human Order (Sarvabhaum Vyavastha) characterized by prosperity, fearlessness, harmony, and ecological rejuvenation.',
      'Individual Level Strategy: Step 1: Self-exploration and natural acceptance; Step 2: Living with Sanyam towards body; Step 3: Practicing values in family; Step 4: Producing adequate physical facilities through labor and experiencing prosperity.',
      'Societal Level Strategy: Step 1: Value education integrated from primary school to university; Step 2: Living demonstration models (eco-villages, sustainable businesses); Step 3: Legal, economic, and constitutional policy reform.',
      'Guiding Principle: Education and self-awareness drive genuine lasting change; external policing only suppresses symptoms without curing the root pathology.',
    ],
    examAnswer: [
      'Contrast the Present State of human society with the Desired Universal Human Order.',
      'Detail the step-by-step transition roadmap at the Individual Level.',
      'Detail the step-by-step transition roadmap at the Societal Level.',
      'Explain why policy reform without value education fails to produce sustainable change.',
    ],
    slip: 'Never propose coercive laws, revolutionary violence, or technological techno-utopianism as the transition strategy; genuine transformation can only arise through voluntary education and awakening natural acceptance.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'ROADMAP TO UNIVERSAL HUMAN ORDER', 'ta') +
          // Individual Track (Top)
          T(20, 42, 'Individual Track', 'ta') +
          R(20, 48, 85, 26) +
          T(62, 64, 'Self-Exploration', 't', 'middle') +
          LA(105, 61, 125, 61, 'a') +
          R(125, 48, 85, 26) +
          T(167, 64, 'Family Harmony', 't', 'middle') +
          LA(210, 61, 230, 61, 'a') +
          R(230, 48, 85, 26, 'fa') +
          T(272, 64, 'Prosperity (Lab.)', 'ta', 'middle') +
          // Societal Track (Bottom)
          T(20, 102, 'Societal Track', 'ta') +
          R(20, 108, 85, 26) +
          T(62, 124, 'Value Education', 't', 'middle') +
          LA(105, 121, 125, 121, 'a') +
          R(125, 108, 85, 26) +
          T(167, 124, 'Demo Models', 't', 'middle') +
          LA(210, 121, 230, 121, 'a') +
          R(230, 108, 85, 26, 'fa') +
          T(272, 124, 'System Policy', 'ta', 'middle') +
          // Convergence to Universal Order
          LA(315, 61, 335, 85, 'a') +
          LA(315, 121, 335, 95, 'a') +
          R(240, 150, 110, 32, 'fa') +
          T(295, 165, 'Universal Human Order', 'ta', 'middle') +
          T(295, 176, '(Sarvabhaum Vyavastha)', 't', 'middle') +
          T(100, 165, 'Mutual Reinforcement', 't', 'middle')
      ),
      caption:
        'Figure 4.4: The transition strategy synergizes individual self-exploration with societal value education and policy transformation.',
    },
  },
};
