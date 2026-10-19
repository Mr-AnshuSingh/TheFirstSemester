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

/* ---------- UHV UNIT 3 TOPIC CONTENT (4 Topics) ---------- */
export const UHV_UNIT3_TOPICS: Record<string, TopicContent> = {
  'uhv:3:0': {
    explain: [
      'Nature is the magnificent collection of all physical, biological, and conscious entities existing in dynamic balance.',
      'Nature is inherently self-regulated (Swatah-Vyavastha) and operates on closed circular loops (Avartansheelata/Cyclicity), where the byproduct of one process is the lifeblood of another.',
      'Imbalance occurs solely when human beings, driven by profit and consumerism, superimpose linear extractive models on cyclical natural systems.',
    ],
    definition:
      'Harmony in nature is the innate, self-regulated condition of mutual coexistence, cyclicity, and equilibrium prevailing across all natural orders and physical phenomena.',
    formula: '\\text{Harmony in Nature} = \\text{Self-Regulation (Vyavastha)} + \\text{Cyclicity (Avartansheelata)} + \\text{Mutual Enrichment}',
    steps: [
      'Principle 1 — Self-Regulation (Swatah-Vyavastha): Ecosystems maintain their own balance (temperature, rainfall, soil fertility, predator-prey ratios) without human intervention.',
      'Principle 2 — Cyclicity / Recyclability (Avartansheelata): Materials flow in endless closed loops (water cycle, carbon cycle, nitrogen cycle, organic decomposition). There is zero permanent waste in nature.',
      'Four Natural Orders: Padartha (Material), Prana (Plant/Bio), Jeeva (Animal), and Jnana (Human).',
      'Human Disruption: Industrial production follows a linear model (Take -> Make -> Dump), generating non-biodegradable synthetic waste that breaks nature’s cycles.',
      'Engineering Solution: Circular economy, green design, renewable energy, and biomimicry that realign industrial systems with natural cyclicity.',
    ],
    examAnswer: [
      'Define Harmony in Nature highlighting Self-Regulation and Cyclicity.',
      'Explain the two foundational laws of nature: Recyclability (Avartansheelata) and Self-Regulation (Vyavastha).',
      'Contrast nature’s closed-loop cyclical flow with modern industry’s linear extractive model.',
      'Detail the responsibility of engineers in designing cradle-to-cradle sustainable systems.',
    ],
    slip: 'Never define harmony in nature as merely planting trees or cleaning litter; it requires fundamentally redesigning societal production methods to follow closed-loop natural cyclicity.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'NATURE CYCLICITY VS HUMAN LINEAR FLOW', 'ta') +
          // Natural Circular Cycle (Left)
          C(100, 105, 55, 'd') +
          R(75, 45, 50, 20, 'fa') +
          T(100, 59, 'Soil/Air', 'ta', 'middle') +
          R(125, 95, 50, 20) +
          T(150, 109, 'Plants', 't', 'middle') +
          R(75, 145, 50, 20) +
          T(100, 159, 'Animals', 't', 'middle') +
          R(25, 95, 50, 20) +
          T(50, 109, 'Decomp.', 't', 'middle') +
          P('M 125 55 A 55 55 0 0 1 150 95', 'a') +
          P('M 150 115 A 55 55 0 0 1 125 155', 'a') +
          P('M 75 155 A 55 55 0 0 1 50 115', 'a') +
          P('M 50 95 A 55 55 0 0 1 75 55', 'a') +
          T(100, 182, 'Closed Loop (Zero Waste)', 'ta', 'middle') +
          // Separator
          L(195, 30, 195, 175, 'd') +
          // Linear Human Extraction (Right)
          T(275, 40, 'Linear Extraction', 'ta', 'middle') +
          R(215, 60, 60, 22) +
          T(245, 75, 'Resource', 't', 'middle') +
          LA(275, 71, 295, 71, 'a') +
          R(295, 60, 55, 22, 'fa') +
          T(322, 75, 'Factory', 'ta', 'middle') +
          LA(322, 82, 322, 105, 'a') +
          R(295, 105, 55, 22) +
          T(322, 120, 'Product', 't', 'middle') +
          LA(322, 127, 322, 145, 'a') +
          R(275, 145, 75, 22) +
          T(312, 160, 'Landfill/Pollution', 't', 'middle') +
          T(280, 182, 'Broken Cycle (Crisis)', 't', 'middle')
      ),
      caption:
        'Figure 3.0: Natural harmony operates on closed-loop self-regulated cycles; human linear extraction creates waste and ecological crisis.',
    },
  },

  'uhv:3:1': {
    explain: [
      'All entities in nature are classified into four interconnected orders: Material, Pranic (Bio/Plant), Animal, and Human.',
      'The first three orders naturally demonstrate mutual fulfillment (Paraspar Poorakta) — each order nourishes and is nourished by the others.',
      'Human beings are endowed with the capacity for knowledge and understanding, but currently act as the sole disruptive order that extracts without returning mutual enrichment.',
    ],
    definition:
      'Interconnectedness and mutual fulfilment is the reciprocal, complementary relationship among the four orders of nature where the activity of each order enriches, regenerates, and sustains all other orders.',
    formula: '\\text{Mutual Fulfilment} = \\sum_{i=1}^4 \\text{Order}_i \\longleftrightarrow \\text{Order}_j \\quad (\\text{Reciprocal Enrichment})',
    steps: [
      'Order 1 — Material Order (Padartha Avastha): Soil, water, air, minerals. Activity: Composition and decomposition. Innateness: Existence (Vastu). Natural characteristic: Composition/Decomposition.',
      'Order 2 — Pranic/Plant Order (Prana Avastha): Grass, plants, trees, flora. Activity: Composition/decomposition + respiration/growth. Innateness: Existence + Growth (Pushti). Fulfills material order by producing organic soil and oxygen.',
      'Order 3 — Animal Order (Jeeva Avastha): Animals, birds, fish (Self + Body). Activity: Respiration + Selection/taste in Self. Innateness: Existence + Growth + Will to live in Self. Fulfills plant order via pollination and seed dispersal.',
      'Order 4 — Human Order (Jnana Avastha): Human beings (Self + Body). Activity: Knowing, assuming, recognizing, fulfilling. Innateness: Existence + Growth + Will to live + Desire for continuous happiness.',
      'The Gap: Material, Pranic, and Animal orders are mutually fulfilling. The Human Order currently extracts from all three without replenishing them.',
    ],
    examAnswer: [
      'Draw the comprehensive 4-orders table showing Order, Entities, Activity, Innateness, and Natural Characteristic.',
      'Explain how the Material, Pranic, and Animal orders exhibit natural mutual fulfillment.',
      'Analyze why the Human Order is currently failing in mutual fulfillment despite being the most conscious order.',
      'Explain how Right Understanding enables humans to restore mutual fulfillment with all four orders.',
    ],
    slip: 'Do not forget that animals also possess a conscious Self (“I”) with the will to live and sensory selection, but lack the faculty of self-exploration and universal understanding present in humans.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'MUTUAL FULFILMENT AMONG 4 ORDERS', 'ta') +
          // 4 Tiers / Orders
          R(40, 32, 280, 28, 'fa') +
          T(180, 50, '1. Human Order (Jnana Avastha) — Self + Body', 'ta', 'middle') +
          R(55, 68, 250, 26) +
          T(180, 85, '2. Animal Order (Jeeva Avastha) — Instinct + Body', 't', 'middle') +
          R(70, 102, 220, 26) +
          T(180, 119, '3. Pranic Order (Prana Avastha) — Plants & Bio', 't', 'middle') +
          R(85, 136, 190, 26) +
          T(180, 153, '4. Material Order (Padartha) — Soil, Air, Water', 't', 'middle') +
          // Arrows of mutual fulfilment on the sides
          LA(25, 149, 25, 115, 'a') +
          LA(25, 115, 25, 81, 'a') +
          T(18, 115, 'Enriches', 't', 'middle') +
          LA(335, 81, 335, 115, 'a') +
          LA(335, 115, 335, 149, 'a') +
          T(342, 115, 'Sustains', 't', 'middle') +
          // Top Human Relationship
          L(40, 46, 25, 81, 'd') +
          T(180, 178, 'Goal: Humans must live in mutual fulfilment, not one-way exploitation', 'ta', 'middle')
      ),
      caption:
        'Figure 3.1: The 4 orders of nature form a hierarchy of consciousness; the lower 3 are naturally mutually fulfilling, while humans must achieve conscious fulfillment.',
    },
  },

  'uhv:3:2': {
    explain: [
      'The entire physical and spiritual universe (Astitva) is nothing other than Co-existence (Sah-astitva).',
      'Existence consists of discrete, active, finite Units (Ikaian) submerged, encircled, and energized in infinite, all-pervasive, calm Space (Vyapak/Shunya).',
      'Because all units are submerged in space, existence is fundamentally in harmony; conflict is not an intrinsic law of the universe but an artifact of human delusion.',
    ],
    definition:
      'Existence as co-existence is the foundational ontological reality wherein active, finite units (both material and conscious) are eternally submerged in, energized by, and self-organized within all-pervasive, motionless space.',
    formula: '\\text{Existence (Astitva)} = \\text{Units (Ekai)} \\text{ submerged in } \\text{Space (Vyapak/Shunya)}',
    steps: [
      'Space (Vyapak/Shunya): All-pervasive (Sarva-vyapak), Infinite (Ananta), Transparent (Pardarshi), Motionless/Inactive (Kriya-shunya), and in Equilibrium (Samyavastha).',
      'Units (Ekai): Finite in size (Seemit), Active (Kriyasheel), Dynamic, Energized (Urjit), and Self-organized (Swavyavasthit).',
      'Submerged State (Dooba, Bheega, Ghyra): Units are soaked in space (drawing innate energy), encircled by space (distinct yet connected), and permeated by space.',
      'Classification of Units: Material Units (Jada Ekai — atoms, molecules, plants, animal bodies) and Conscious Units (Chaitanya Ekai — sentient Self “I”).',
      'Philosophical Implication: Rejecting the Darwinian dogma of "survival of the fittest" as the ultimate law; universal reality is grounded in harmonious co-existence.',
    ],
    examAnswer: [
      'Write the primary equation of reality: Existence = Units submerged in Space (Sah-astitva).',
      'Draw a 5-point comparison table between the attributes of Space and Units.',
      'Explain what it means for units to be energized, self-organized, and encircled in space.',
      'Contrast the worldview of "Struggle for Existence" with "Co-existence as Fundamental Reality".',
    ],
    slip: 'Never mistake Space (Vyapak/Shunya) for "nothingness" or empty vacuum; space is an omnipresent, inactive reality that maintains universal equilibrium and pervades every subatomic unit.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'EXISTENCE = UNITS IN ALL-PERVASIVE SPACE', 'ta') +
          // Outer Space boundary
          R(20, 28, 320, 145, 'd') +
          T(180, 44, 'All-Pervasive Space (Vyapak / Shunya)', 'ta', 'middle') +
          T(180, 58, 'Infinite · Transparent · Inactive · Equilibrium', 't', 'middle') +
          // Submerged Units
          // Material Unit 1
          C(75, 110, 26, 'fa') +
          T(75, 108, 'Material', 'ta', 'middle') +
          T(75, 120, 'Atoms/Rocks', 't', 'middle') +
          // Pranic Unit 2
          C(145, 110, 26) +
          T(145, 108, 'Plant/Bio', 't', 'middle') +
          T(145, 120, 'Cells/Flora', 't', 'middle') +
          // Animal Unit 3
          C(215, 110, 26) +
          T(215, 108, 'Animal', 't', 'middle') +
          T(215, 120, 'Body + Self', 't', 'middle') +
          // Conscious Human Self Unit 4
          C(285, 110, 26, 'fa') +
          T(285, 108, 'Human', 'ta', 'middle') +
          T(285, 120, 'Conscious I', 't', 'middle') +
          // Equilibrium connection
          L(101, 110, 119, 110, 'd') +
          L(171, 110, 189, 110, 'd') +
          L(241, 110, 259, 110, 'd') +
          T(180, 160, 'Every unit is energized & self-organized in space', 't', 'middle')
      ),
      caption:
        'Figure 3.2: Existence is the eternal co-existence of active, finite material and conscious units submerged in infinite, motionless space.',
    },
  },

  'uhv:3:3': {
    explain: [
      'Harmony is not a local or fragmented phenomenon; it forms an unbroken continuum across all levels of existence.',
      'A holistic perception recognizes that inner harmony within the individual radiates naturally into harmony in family, which aggregates into harmony in society, integrates with nature, and culminates in universal coexistence.',
      'Any breakdown at the societal or environmental level is ultimately rooted in internal contradictions within the individual human Self.',
    ],
    definition:
      'Holistic perception of harmony is the comprehensive understanding of universal order (Vyavastha) operating across five expanding concentric levels: Self, Family, Society, Nature, and Existence.',
    formula: '\\text{Individual Self} \\longrightarrow \\text{Family} \\longrightarrow \\text{Society} \\longrightarrow \\text{Nature} \\longrightarrow \\text{Universal Existence}',
    steps: [
      'Level 1 — Within the Self (I): Harmony between desires, thoughts, and expectations; alignment of thought with natural acceptance, achieving inner peace (Sukh).',
      'Level 2 — In the Family: Expression of the 9 relational values (trust, respect, affection) with family members, creating mutual happiness.',
      'Level 3 — In Society: Realizing the 4 comprehensive human goals: Right Understanding in every individual, Prosperity in every family, Fearlessness (Trust) in society, and Co-existence in nature.',
      'Level 4 — In Nature: Harmonious coexistence with material, plant, and animal orders through sustainable production, recycling, and conservation.',
      'Level 5 — In Existence: Realizing that all units coexist in all-pervasive space; feeling universal kinship (Vasudhaiva Kutumbakam) and participating in Universal Human Order.',
    ],
    examAnswer: [
      'Detail the 5 hierarchical levels of living from Self to Existence.',
      'Explain how internal contradictions within the individual lead to conflicts in family, society, and ecology.',
      'List the 4 comprehensive human goals at the societal level (Samadhan, Samridhi, Abhay, Sah-astitva).',
      'Describe the vision of Akhand Samaj (Undivided Society) and Sarvabhaum Vyavastha (Universal Human Order).',
    ],
    slip: 'Do not view the 5 levels as isolated compartments; they are interdependent concentric circles where outer harmony is impossible without inner individual harmony as the foundational core.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, '5 CONCENTRIC LEVELS OF HARMONY', 'ta') +
          // Concentric circles centered at (180, 105)
          C(180, 105, 75, 'd') +
          C(180, 105, 60) +
          C(180, 105, 45) +
          C(180, 105, 30) +
          C(180, 105, 15, 'fa') +
          T(180, 109, 'Self', 'ta', 'middle') +
          T(180, 80, 'Family', 't', 'middle') +
          T(180, 65, 'Society', 't', 'middle') +
          T(180, 50, 'Nature', 't', 'middle') +
          T(180, 36, 'Existence', 'ta', 'middle') +
          // Radiating arrows
          LA(180, 90, 180, 72, 'a') +
          LA(180, 72, 180, 57, 'a') +
          LA(180, 57, 180, 42, 'a') +
          LA(180, 42, 180, 26, 'a') +
          // Side Annotation
          T(290, 85, 'Level 1: Inner Peace', 't') +
          T(290, 100, 'Level 2: Relationship', 't') +
          T(290, 115, 'Level 3: Fearlessness', 't') +
          T(290, 130, 'Level 4: Balance', 't') +
          T(290, 145, 'Level 5: Co-existence', 'ta')
      ),
      caption:
        'Figure 3.3: Harmony expands outward in 5 concentric tiers: Self -> Family -> Society -> Nature -> Universal Existence.',
    },
  },
};
