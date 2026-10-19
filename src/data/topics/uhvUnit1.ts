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

/* ---------- UHV UNIT 1 TOPIC CONTENT (3 Topics) ---------- */
export const UHV_UNIT1_TOPICS: Record<string, TopicContent> = {
  'uhv:1:0': {
    explain: [
      'Human beings currently live under three distinct states regarding physical facilities and happiness.',
      'Transformation from Animal Consciousness (living purely for physical survival and accumulation) to Human Consciousness (living with right understanding, relational fulfillment, and prosperity) is the core goal of value education.',
    ],
    definition:
      'Human transformation is the cognitive progression from living in animal consciousness (preoccupied exclusively with physical facilities) to human consciousness (anchored in right understanding, mutual happiness, and mutual prosperity).',
    formula: '\\text{Human Consciousness} = \\text{Right Understanding} + \\text{Relationship} + \\text{Physical Facility}',
    steps: [
      'Category 1 (Sadhan-Viheen Dukhi-Daridra): Lacking physical facilities, materially deprived, and mentally unhappy.',
      'Category 2 (Sadhan-Sampann Dukhi-Daridra): Materially affluent, surrounded by abundant physical facility, yet mentally unhappy, fearful, and perpetually dissatisfied (predominant modern state).',
      'Category 3 (Sadhan-Sampann Sukhi-Samriddha): Having right understanding, harmonious relationships, and adequate physical facilities; happy, peaceful, and prosperous.',
      'Animal Consciousness: Operating solely on bodily instincts (food, sleep, fear, sex); sees life as competitive survival of the fittest.',
      'Human Consciousness: Recognizes the coexistence of Self and Body, prioritizing relationship and ecological harmony over boundless hoarding.',
    ],
    examAnswer: [
      'Detail the 3 categories of human condition: Sadhan-Viheen Dukhi-Daridra, Sadhan-Sampann Dukhi-Daridra, Sadhan-Sampann Sukhi-Samriddha.',
      'Explain why Category 2 (having wealth yet feeling unhappy and poor) represents the pathology of modern consumerism.',
      'Define Animal Consciousness vs Human Consciousness in value education terms.',
      'Explain the role of education in facilitating the transition to Category 3.',
    ],
    slip: 'Do not assume possessing wealth automatically places someone in Category 3; if an individual lacks right understanding and relationship, having immense physical wealth still leaves them in Category 2 (Sadhan-Sampann Dukhi-Daridra).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE THREE STATES OF HUMAN LIVING', 'ta') +
          R(20, 36, 95, 80) +
          T(67, 54, 'Category 1', 'ta', 'middle') +
          T(67, 72, 'Sadhan-Viheen', 't', 'middle') +
          T(67, 88, 'Dukhi-Daridra', 't', 'middle') +
          T(67, 102, 'Poor & Unhappy', 'ta', 'middle') +
          R(132, 36, 95, 80) +
          T(179, 54, 'Category 2', 'ta', 'middle') +
          T(179, 72, 'Sadhan-Sampann', 't', 'middle') +
          T(179, 88, 'Dukhi-Daridra', 't', 'middle') +
          T(179, 102, 'Rich yet Deprived', 'ta', 'middle') +
          R(245, 36, 95, 80, 'fa') +
          T(292, 54, 'Category 3', 'ta', 'middle') +
          T(292, 72, 'Sadhan-Sampann', 't', 'middle') +
          T(292, 88, 'Sukhi-Samriddha', 't', 'middle') +
          T(292, 102, 'Prosperous & Happy', 'ta', 'middle') +
          LA(115, 76, 132, 76, 'a') +
          LA(227, 76, 245, 76, 'a') +
          R(20, 126, 320, 48) +
          T(30, 144, 'Transition: Animal Consciousness (Cat 1/2) -> Human Consciousness (Cat 3)', 'ta') +
          T(30, 160, 'Requires Right Understanding + Mutually Fulfilling Relationships', 't')
      ),
      caption: 'Progression through the three states of human fulfillment: from deprivation to authentic prosperity.',
    },
  },

  'uhv:1:1': {
    explain: [
      'In any given life situation, true satisfaction arises from properly distinguishing between the qualitative, continuous needs of the Self and the quantitative, limited needs of the Body.',
      'Sensory pleasure (suvidha) is temporary and depends on external physical stimuli, whereas genuine happiness (sukh) is an internal state of harmony that can be continuous.',
    ],
    definition:
      'Situation-based happiness is the conscious realization that internal contentment and the feeling of prosperity are governed by one’s thoughts, understanding, and relationships, rather than the boundless accumulation of physical comforts.',
    formula: '\\text{Physical Facility} \\neq \\text{Continuous Happiness}; \\quad \\text{Suvidha (Sensation)} \\neq \\text{Sukh (Harmony)}',
    steps: [
      'Sensory Excitement (Bhoga): Deriving pleasure from taste, sight, touch, or sound. Inherently temporary; turning sensory pleasure into a continuous activity leads to disgust or pain.',
      'Continuous Sukh: Arises from right feelings (trust, respect, affection, gratitude); can be sustained 24 hours a day without saturation.',
      'Prosperity Assessment: Physical facilities have natural limits. A person needs a finite quantity of food (e.g. 3 meals), finite clothes, and finite shelter.',
      'Greed and Insecurity: Occur when an individual tries to fulfill the Self’s infinite need for happiness with the Body’s finite physical facilities.',
      'Right Balance: Use physical facilities as instruments for bodily health, while cultivating right understanding for inner peace.',
    ],
    examAnswer: [
      'Differentiate clearly between Sukh (Happiness) and Suvidha (Physical Comfort / Sensation).',
      'Explain with concrete daily examples why sensory pleasure cannot be continuous (e.g. eating favorite sweets beyond satiety).',
      'Describe how an engineer should correctly assess physical facility requirements for family and society.',
      'Explain the psychological root of greed: Attempting to satisfy the unlimited qualitative need of the Self using finite material objects.',
    ],
    slip: 'Never confuse happiness with momentary sensory excitement; sensory pleasure is fleeting and externally dependent, while happiness is internal harmony.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'SUKH (HAPPINESS) VERSUS SUVIDHA (PLEASURE)', 'ta') +
          R(20, 36, 150, 85) +
          T(95, 54, 'Sukh (Happiness)', 'ta', 'middle') +
          T(95, 72, 'State of Harmony in Self', 't', 'middle') +
          T(95, 88, 'Continuous & Qualitative', 'ta', 'middle') +
          T(95, 104, 'Internally Generated', 't', 'middle') +
          R(190, 36, 150, 85, 'fa') +
          T(265, 54, 'Suvidha (Comfort/Pleasure)', 'ta', 'middle') +
          T(265, 72, 'Sensory Body Stimulation', 't', 'middle') +
          T(265, 88, 'Temporary & Quantitative', 'ta', 'middle') +
          T(265, 104, 'Externally Dependent', 't', 'middle') +
          R(20, 130, 320, 45) +
          T(30, 150, 'Sensory pleasure turns into pain if forced continuously (e.g. overeating)', 'ta') +
          T(30, 166, 'Sukh (trust, love, respect) can be experienced continuously without fatigue', 't')
      ),
      caption: 'The fundamental dichotomy between internal continuous happiness (Sukh) and temporary sensory comfort (Suvidha).',
    },
  },

  'uhv:1:2': {
    explain: [
      'A human being is not merely a biological machine, nor an abstract ghost; it is the symbiotic co-existence of two distinct entities: the sentient, conscious Self (“I”) and the material, physical Body.',
      'The Self is the conscious Seer, Doer, and Enjoyer, while the Body acts as a physical instrument.',
      'Sanyam (Self-regulation) is the feeling of responsibility in the Self towards the Body, leading to Swasthya (physical health).',
    ],
    definition:
      'A human being is the co-existence of the conscious, non-material Self (\'I\', Jeevan) and the physiological material Body, interrelated through information exchange and self-regulation (Sanyam).',
    formula: '\\text{Human Being} = \\text{Self (\'I\', Conscious)} \\; \\longleftrightarrow \\; \\text{Body (Material Instrument)}',
    steps: [
      'Needs Comparison: Self needs Happiness, Trust, Respect (qualitative, continuous); Body needs Food, Shelter, Clothing (quantitative, temporary).',
      'Activities of Self: Desiring (Ichha), Thinking (Vichar), Expecting (Asha); Knowing (Janna), Assuming (Manna), Recognizing (Pahachanna), Fulfilling (Nirvaha Karna).',
      'Activities of Body: Breathing, blood circulation, digestion, reflex actions (physio-chemical material processes).',
      'Roles of the Self: The Seer (Drashta: the conscious observer), The Doer (Karta: the decision maker), The Enjoyer (Bhokta: the experiencer of results).',
      'Sanyam and Swasthya: Sanyam is the feeling of responsibility in the Self to nurture, protect, and rightly utilize the Body; Swasthya is the condition where the Body acts as an obedient instrument and bodily organs function in harmony.',
    ],
    examAnswer: [
      'Construct the classic 4-row comparison table between Self (\'I\') and Body across: Needs, Quantity, Time-continuity, and Activities.',
      'Explain the Self as Drashta (Seer), Karta (Doer), and Bhokta (Enjoyer).',
      'Define Sanyam (Self-regulation) and Swasthya (Health), and explain how Sanyam is the basis of Swasthya.',
      'Explain the difference between Knowing/Assuming (in Self) and Recognizing/Fulfilling (in Body).',
    ],
    slip: 'Never say the Body desires food or feels pain; the Body is a material sensor that generates physical signals, but it is the Self that conscious perceives hunger, pain, and enjoyment.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'CO-EXISTENCE OF SELF (\'I\') AND BODY', 'ta') +
          R(20, 36, 150, 85, 'fa') +
          T(95, 54, 'SELF (\'I\') - Conscious', 'ta', 'middle') +
          T(95, 72, 'Needs: Trust, Respect, Joy', 't', 'middle') +
          T(95, 88, 'Continuous & Qualitative', 'ta', 'middle') +
          T(95, 104, 'Seer · Doer · Enjoyer', 't', 'middle') +
          R(190, 36, 150, 85) +
          T(265, 54, 'BODY - Material', 'ta', 'middle') +
          T(265, 72, 'Needs: Food, Shelter, Rest', 't', 'middle') +
          T(265, 88, 'Temporary & Quantitative', 'ta', 'middle') +
          T(265, 104, 'Instrument (Sadhan)', 't', 'middle') +
          LA(170, 78, 190, 78, 'a') +
          LA(190, 88, 170, 88, 'a') +
          R(20, 130, 320, 45) +
          T(30, 150, 'Sanyam (Self-Regulation) in \'I\' -> Swasthya (Health) in Body', 'ta') +
          T(30, 166, 'Information exchange: \'I\' sends instructions, Body returns sensory data', 't')
      ),
      caption: 'The symbiotic co-existence of the conscious Self (\'I\') and the material Body as an instrument.',
    },
  },
};
