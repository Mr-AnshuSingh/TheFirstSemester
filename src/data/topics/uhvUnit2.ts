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

/* ---------- UHV UNIT 2 TOPIC CONTENT (3 Topics) ---------- */
export const UHV_UNIT2_TOPICS: Record<string, TopicContent> = {
  'uhv:2:0': {
    explain: [
      'Human-to-human relationships are not arbitrary social contracts; they are governed by nine innate, universal feelings (values) that are naturally acceptable to the Self.',
      'Trust (Vishwas) is the foundational value without which no relationship can start, and Love (Prem) is the complete value embodying total harmony with all beings.',
    ],
    definition:
      'Values in human relationships are the nine distinct, naturally acceptable feelings in the Self towards other human beings that establish mutual fulfillment, respect, and emotional harmony.',
    formula: '\\text{Foundation: } \\text{Trust (Vishwas)} \\longrightarrow \\text{Complete Value: } \\text{Love (Prem)}',
    steps: [
      'The 9 Relational Values: 1. Trust (Vishwas), 2. Respect (Samman), 3. Affection (Sneha), 4. Care (Mamata), 5. Guidance (Vatsalya), 6. Reverence (Shraddha), 7. Glory (Gaurav), 8. Gratitude (Kritagyata), 9. Love (Prem).',
      'Trust (Vishwas): To be assured that the other person naturally intends my happiness and prosperity. Requires separating Intention (what one wants to do) from Competence (ability to do it).',
      'Respect (Samman): Right evaluation of the other. Respecting means recognizing that the other person is like me (Self + Body) with identical natural acceptance.',
      'Disrespect Forms: Over-evaluation (exaggeration/flattery), Under-evaluation (belittling/condescension), and Otherwise-evaluation (distorting identity based on wealth, caste, gender).',
      'Love (Prem): Feeling of relatedness to all entities; feeling that everyone is part of my extended family (Vasudhaiva Kutumbakam).',
    ],
    examAnswer: [
      'List all 9 universal values in human relationships in proper hierarchical sequence.',
      'Define Trust (Vishwas) and explain the critical distinction between Intention (Chahana) and Competence (Yogyata).',
      'Define Respect (Samman) as Right Evaluation, and contrast it with Over-evaluation, Under-evaluation, and Otherwise-evaluation.',
      'Explain Love (Prem) as the Complete Value (Purna Mulya).',
    ],
    slip: 'Never judge someone’s intention by their lack of competence; when someone makes a mistake, their competence failed, not their innate human intention to wish well.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE 9 VALUES IN HUMAN RELATIONSHIPS', 'ta') +
          R(20, 32, 95, 26, 'fa') +
          T(67, 49, '1. Trust (Vishwas ★)', 'ta', 'middle') +
          R(130, 32, 95, 26) +
          T(177, 49, '2. Respect (Samman)', 't', 'middle') +
          R(240, 32, 95, 26) +
          T(287, 49, '3. Affection (Sneha)', 't', 'middle') +
          R(20, 64, 95, 26) +
          T(67, 81, '4. Care (Mamata)', 't', 'middle') +
          R(130, 64, 95, 26) +
          T(177, 81, '5. Guidance (Vatsalya)', 't', 'middle') +
          R(240, 64, 95, 26) +
          T(287, 81, '6. Reverence (Shraddha)', 't', 'middle') +
          R(20, 96, 95, 26) +
          T(67, 113, '7. Glory (Gaurav)', 't', 'middle') +
          R(130, 96, 95, 26) +
          T(177, 113, '8. Gratitude (Kritagyata)', 't', 'middle') +
          R(240, 96, 95, 26, 'fa') +
          T(287, 113, '9. Love (Prem ★)', 'ta', 'middle') +
          R(20, 130, 315, 48) +
          T(30, 148, 'Trust is Foundation (Aadhar Mulya): Assurance on Intention', 'ta') +
          T(30, 164, 'Love is Complete Value (Purna Mulya): Feeling of kinship with all', 't')
      ),
      caption: 'The nine universal values in human relationships, starting from Trust and culminating in Love.',
    },
  },

  'uhv:2:1': {
    explain: [
      'Establishing harmonious relationships in families and workplaces requires resolving the fundamental psychological error: doubting the intention of others.',
      'We naturally judge ourselves by our good intentions, but we judge others by their imperfect competence; this asymmetric evaluation produces friction, resentment, and conflict.',
    ],
    definition:
      'Harmonious relational establishment is the conscious discipline of maintaining unwavering trust in the positive intention of others while compassionately supporting the development of their practical competence.',
    formula: '\\text{Harmony} \\iff \\text{Trust on Intention} + \\text{Mutual Development of Competence}',
    steps: [
      'The Asymmetric Trap: "When I do something wrong, it was an accident (my intention was good); when you do something wrong, you did it on purpose (your intention is bad)".',
      'Correct Clarity: Everyone’s natural acceptance is to be happy and to make others happy. Intention is naturally positive in all human beings.',
      'Addressing Mistakes: If someone hurts us, they lack competence or right understanding, not goodwill. The response should be patience and guidance, not anger or retaliation.',
      'Right Evaluation: Evaluating oneself and others objectively without ego (superiority complex) or depression (inferiority complex).',
      'Relational Harmony in Family: The family is the basic natural nursery where trust, care, and gratitude are learned and practiced daily.',
    ],
    examAnswer: [
      'Explain the Intention vs Competence dilemma and how it causes relationship breakdown.',
      'Show how doubting intention produces anger, opposition, and revenge.',
      'Explain the correct response when someone makes a mistake: helping improve their competence rather than attacking their intention.',
      'Explain why the family is considered the basic building block of a harmonious society.',
    ],
    slip: 'Do not justify bad behavior as "good competence"; we distinguish intention from competence so we can stay calm and help the person improve their competence, not to excuse harmful actions.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'INTENTION VERSUS COMPETENCE CLARITY', 'ta') +
          R(20, 36, 150, 75) +
          T(95, 54, 'Intention (Chahana)', 'ta', 'middle') +
          T(95, 72, 'Natural Acceptance', 't', 'middle') +
          T(95, 88, 'Always Good in All', 'ta', 'middle') +
          T(95, 102, 'Have 100% Trust!', 't', 'middle') +
          R(190, 36, 150, 75, 'fa') +
          T(265, 54, 'Competence (Yogyata)', 'ta', 'middle') +
          T(265, 72, 'Actual Execution Ability', 't', 'middle') +
          T(265, 88, 'May be lacking/flawed', 'ta', 'middle') +
          T(265, 102, 'Requires mutual help', 't', 'middle') +
          R(20, 124, 320, 48) +
          T(30, 144, 'Common Error: Doubting other\'s intention breeds opposition and anger', 'ta') +
          T(30, 160, 'Right Solution: Trust intention, help improve competence with patience', 't')
      ),
      caption: 'The vital distinction between innate positive intention and varying practical competence.',
    },
  },

  'uhv:2:2': {
    explain: [
      'Harmony in society is the natural outward expansion of harmony in the individual and family, culminating in a Universal Human Order (Sarvabhaum Vyavastha).',
      'It is sustained by four comprehensive human goals realized through five institutional dimensions of societal endeavor.',
    ],
    definition:
      'Societal harmony is the collective realization of comprehensive human goals—right understanding, prosperity, fearlessness, and co-existence—achieved through ethical institutional dimensions of education, health, justice, production, and exchange.',
    formula: '\\text{Human Goals} = \\text{Samadhan (Individual)} + \\text{Samridhi (Family)} + \\text{Abhay (Society)} + \\text{Sah-Astitva (Nature)}',
    steps: [
      '4 Comprehensive Human Goals: 1. Right Understanding (Samadhan) in every individual; 2. Prosperity (Samridhi) in every family; 3. Fearlessness / Trust (Abhay) in society; 4. Co-existence (Sah-Astitva) in nature.',
      'Dimension 1 (Shiksha-Sanskar): Education and value cultivation to instill right understanding.',
      'Dimension 2 (Swasthya-Sanyam): Health and self-regulation ensuring physical well-being.',
      'Dimension 3 (Nyaya-Suraksha): Justice in relationships and ecological preservation of nature.',
      'Dimension 4 (Utpadan-Karya): Eco-friendly production of necessary goods through labor.',
      'Dimension 5 (Vinimaya-Kosh): Fair exchange and non-exploitative storage of surplus for collective welfare.',
    ],
    examAnswer: [
      'List the 4 Comprehensive Human Goals: Samadhan, Samridhi, Abhay, Sah-Astitva.',
      'Detail the 5 Dimensions of Human Endeavor: Education-Sanskar, Health-Sanyam, Justice-Suraksha, Production-Work, Exchange-Storage.',
      'Define Abhay (Fearlessness) in society as the presence of mutual trust, not military intimidation.',
      'Explain the concept of Universal Human Order (Sarvabhaum Vyavastha) expanding from family order to world family.',
    ],
    slip: 'Do not define "Abhay" (fearlessness) as having powerful weapons or military deterrence; in value education, fearlessness means the total absence of suspicion and fear between citizens through mutual trust.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE 4 COMPREHENSIVE HUMAN GOALS', 'ta') +
          R(20, 36, 150, 40) +
          T(95, 52, '1. Samadhan (Resolution)', 'ta', 'middle') +
          T(95, 66, 'Right Understanding in Individual', 't', 'middle') +
          R(190, 36, 150, 40) +
          T(265, 52, '2. Samridhi (Prosperity)', 'ta', 'middle') +
          T(265, 66, 'Abundance in every Family', 't', 'middle') +
          R(20, 84, 150, 40) +
          T(95, 100, '3. Abhay (Fearlessness)', 'ta', 'middle') +
          T(95, 114, 'Mutual Trust in Society', 't', 'middle') +
          R(190, 84, 150, 40, 'fa') +
          T(265, 100, '4. Sah-Astitva (Co-existence)', 'ta', 'middle') +
          T(265, 114, 'Harmony in all Nature', 't', 'middle') +
          R(20, 134, 320, 42) +
          T(30, 152, '5 Societal Systems: Education · Health · Justice · Production · Exchange', 'ta') +
          T(30, 168, 'Family -> Village -> Nation -> Universal Human Order (World Family)', 't')
      ),
      caption: 'The four universal human goals supporting societal harmony and global co-existence.',
    },
  },
};
