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

/* ---------- EIC UNIT STORIES (5 Units) ---------- */
export const EIC_UNIT_STORIES: Record<string, UnitStory> = {
  'eic:0': {
    whatItIs:
      'The Constitution of India is the supreme law of the land, drafted by the Constituent Assembly under Dr. B. R. Ambedkar, adopted on 26 November 1949, and brought into force on 26 January 1950.',
    whyItMatters:
      'It establishes the legal framework, distribution of powers among Executive, Legislature, and Judiciary, and limits state authority to safeguard democratic liberties and egalitarian social progress.',
    howItWorks:
      'The Preamble serves as the guiding compass declaring India a Sovereign, Socialist, Secular, Democratic Republic committed to Justice, Liberty, Equality, and Fraternity. The constitutional architecture balances parliamentary sovereignty with judicial review.',
  },
  'eic:1': {
    whatItIs:
      'Part III guarantees six fundamental rights (Articles 12–35) against arbitrary state action, while Part IV-A (Article 51A) prescribes eleven civic duties expected of every citizen.',
    whyItMatters:
      'Fundamental Rights ensure human dignity, free speech, equality before the law, and freedom from religious discrimination. Fundamental Duties instill civic responsibility, scientific temper, and environmental preservation.',
    howItWorks:
      'Rights are directly enforceable (justiciable) under Article 32 (Supreme Court) and Article 226 (High Courts) through constitutional prerogative writs. Duties are non-justiciable moral obligations that assist courts in interpreting constitutional statutes.',
  },
  'eic:2': {
    whatItIs:
      'Part IV (Articles 36–51) embodies affirmative socio-economic instructions directing the state to establish an egalitarian welfare society.',
    whyItMatters:
      'Political democracy (Fundamental Rights) remains hollow without economic democracy. DPSPs guide legislation towards reducing wealth inequality, securing living wages, and protecting public health and ecosystems.',
    howItWorks:
      'DPSPs are non-justiciable in court (Art. 37) but fundamental in the governance of the nation. The Supreme Court harmonizes Part III and Part IV as complementary wheels of the constitutional chariot.',
  },
  'eic:3': {
    whatItIs:
      'Part VI outlines state-level executive governance (Governor, Chief Minister, Council of Ministers) and state legislative institutions (Legislative Assembly and Legislative Council).',
    whyItMatters:
      'India’s quasi-federal structure delegates regional administration to states. Knowing how state bills pass, how ordinances are promulgated, and how bicameral state legislatures operate is vital for civic literacy.',
    howItWorks:
      'The Governor acts as constitutional head on the aid and advice of the Council of Ministers headed by the CM. The directly elected Legislative Assembly holds ultimate financial and legislative supremacy over the advisory Legislative Council.',
  },
  'eic:4': {
    whatItIs:
      'Article 368 empowers Parliament to amend the Constitution to adapt to changing societal needs without destroying its Basic Structure.',
    whyItMatters:
      'A rigid constitution snaps under revolution; an overly flexible constitution degrades into tyranny. Article 368 balances flexibility and rigidity, illustrated by pivotal amendments: 42nd, 44th, 74th, 76th, 86th, and 91st.',
    howItWorks:
      'Amendments follow three distinct procedural pathways: simple majority, special majority, and special majority with federal state ratification. Judicial review checks amendments against the Basic Structure doctrine.',
  },
};

/* ---------- EIC UNIT 0 TOPIC CONTENT (4 Topics) ---------- */
export const EIC_UNIT0_TOPICS: Record<string, TopicContent> = {
  'eic:0:0': {
    explain: [
      'The Constitution of India is the supreme lex (paramount law) of the Indian nation, establishing the legal foundation from which all other laws derive validity.',
      'It codifies Constitutionalism — the principle that political governance must be strictly limited by legal restraints to prevent autocracy and arbitrary rule.',
      'It establishes the horizontal separation of powers among the Legislature (law-making), Executive (law-enforcement), and Judiciary (law-interpretation) with dynamic checks and balances.',
    ],
    definition:
      'The Constitution of India is the supreme organic fundamental law of the Republic of India that establishes the structure, procedures, powers, and duties of government institutions while guaranteeing fundamental rights and establishing citizen duties.',
    formula: '\\text{Constitution} = \\text{Executive} + \\text{Legislature} + \\text{Judiciary} + \\text{Civil Liberties} \\quad (\\text{Supreme Lex})',
    steps: [
      'Supreme Legal Groundnorm: Any statutory law, ordinance, or administrative order violating constitutional provisions is ultra vires and void under Article 13.',
      'Constitutionalism: Governance according to constitutional principles, preventing autocratic consolidation of power through legal limits.',
      'Separation of Powers: Legislature enacts statutes; Executive executes policy; Judiciary exercises judicial review to invalidate unconstitutional acts.',
      'Source of Sovereignty: Derives authority from the sovereign people of India as proclaimed in the Preamble.',
      'Living Instrument: Designed with flexibility to adapt to modern technological and societal evolutions while preserving core democratic values.',
    ],
    examAnswer: [
      'Define the Constitution of India and explain why it is referred to as the "Grundnorm" or supreme law.',
      'Explain the doctrine of Constitutionalism and limited government.',
      'Describe the horizontal separation of powers with mutual checks and balances.',
      'Differentiate between constitutional law and ordinary statutory law passed by Parliament.',
    ],
    slip: 'Never confuse constitutional law with ordinary Parliamentary statutes; ordinary legislation that conflicts with constitutional mandates is declared unconstitutional and void by the Supreme Court.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 3 PILLARS UNDER SUPREME CONSTITUTION', 'ta') +
          // Roof: Constitution of India
          R(30, 32, 300, 28, 'fa') +
          T(180, 50, 'CONSTITUTION OF INDIA (Supreme Lex)', 'ta', 'middle') +
          // 3 Pillars
          // Pillar 1: Legislature
          R(35, 68, 85, 70) +
          T(77, 86, 'LEGISLATURE', 'ta', 'middle') +
          T(77, 104, 'Parliament &', 't', 'middle') +
          T(77, 118, 'State Assemblies', 't', 'middle') +
          T(77, 130, '(Law Making)', 't', 'middle') +
          // Pillar 2: Executive
          R(137, 68, 85, 70) +
          T(179, 86, 'EXECUTIVE', 'ta', 'middle') +
          T(179, 104, 'President, PM &', 't', 'middle') +
          T(179, 118, 'Ministers', 't', 'middle') +
          T(179, 130, '(Enforcement)', 't', 'middle') +
          // Pillar 3: Judiciary
          R(240, 68, 85, 70) +
          T(282, 86, 'JUDICIARY', 'ta', 'middle') +
          T(282, 104, 'Supreme Court &', 't', 'middle') +
          T(282, 118, 'High Courts', 't', 'middle') +
          T(282, 130, '(Review/Guard)', 't', 'middle') +
          // Foundation
          R(30, 145, 300, 22, 'fa') +
          T(180, 160, 'Foundation: We, The People · Rule of Law · Checks & Balances', 'ta', 'middle') +
          T(180, 182, 'Art. 13: Laws inconsistent with Constitution are VOID', 't', 'middle')
      ),
      caption:
        'Figure 0.0: The constitutional architecture distributes sovereign authority among three coordinate branches under the Rule of Law.',
    },
  },

  'eic:0:1': {
    explain: [
      'The Constitution of India did not emerge overnight; it is the culmination of extensive historical evolution under British colonial rule and the Indian Independence Movement.',
      'The Government of India Act 1935 served as the primary administrative blueprint, contributing approximately 75% of the structural provisions (federal framework, governor office, emergency powers, judiciary).',
      'The Constituent Assembly was convened in December 1946 under the Cabinet Mission Plan, taking 2 years, 11 months, and 18 days to draft the document under Drafting Committee Chairman Dr. B. R. Ambedkar.',
    ],
    definition:
      'The historical perspective traces constitutional evolution through major colonial legislative milestones—culminating in the Government of India Act 1935—and the deliberations of the Constituent Assembly that enacted the 1950 Constitution.',
    formula: '\\text{GoI Act 1935} + \\text{Cabinet Mission 1946} + (2\\text{y } 11\\text{m } 18\\text{d Drafting}) \\longrightarrow 26\\text{ Jan 1950 Republic}',
    steps: [
      'Government of India Act 1935: Provided federal framework, provincial autonomy, bicameralism, Public Service Commissions, and administrative details.',
      'Cabinet Mission Plan (1946): Outlined the formation of the Constituent Assembly, indirectly elected by provincial legislative assemblies.',
      'First Session of Assembly: Met on 9 December 1946; Dr. Sachchidananda Sinha served as temporary chairman, followed by Dr. Rajendra Prasad as elected President.',
      'Drafting Committee: Appointed on 29 August 1947 with 7 members chaired by Dr. B. R. Ambedkar (the Chief Architect).',
      'Adoption & Commencement: Adopted on 26 November 1949 (Constitution Day); formally enforced on 26 January 1950 to honor the 1930 Purna Swaraj declaration.',
    ],
    examAnswer: [
      'Trace the constitutional development of India from the Government of India Act 1935 to 1950.',
      'Describe the role and key members of the Drafting Committee chaired by Dr. B. R. Ambedkar.',
      'Explain the historical significance of 26 January 1950 (commemorating the 1930 Purna Swaraj declaration at Lahore).',
      'Highlight the key administrative structures adopted directly from the Government of India Act 1935.',
    ],
    slip: 'Confusing Constitution Adoption Day (26 November 1949) with Commencement/Republic Day (26 January 1950); the bulk of the Constitution came into effect on 26 January 1950.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'CONSTITUTIONAL EVOLUTION TIMELINE', 'ta') +
          // Timeline Axis
          L(25, 95, 335, 95, 'l') +
          // Milestone 1: 1935
          C(45, 95, 6, 'fa') +
          T(45, 75, '1935', 'ta', 'middle') +
          R(15, 110, 60, 45) +
          T(45, 125, 'GoI Act', 'ta', 'middle') +
          T(45, 137, '1935', 't', 'middle') +
          T(45, 149, '75% Base', 't', 'middle') +
          // Milestone 2: 1946
          C(130, 95, 6, 'fa') +
          T(130, 75, 'Dec 1946', 'ta', 'middle') +
          R(100, 110, 60, 45) +
          T(130, 125, 'Constituent', 'ta', 'middle') +
          T(130, 137, 'Assembly', 't', 'middle') +
          T(130, 149, '1st Meeting', 't', 'middle') +
          // Milestone 3: 26 Nov 1949
          C(215, 95, 6, 'fa') +
          T(215, 75, '26 Nov 1949', 'ta', 'middle') +
          R(185, 110, 60, 45, 'fa') +
          T(215, 125, 'Adopted', 'ta', 'middle') +
          T(215, 137, 'Constitution', 't', 'middle') +
          T(215, 149, 'Day', 't', 'middle') +
          // Milestone 4: 26 Jan 1950
          C(305, 95, 6, 'fa') +
          T(305, 75, '26 Jan 1950', 'ta', 'middle') +
          R(275, 110, 60, 45, 'fa') +
          T(305, 125, 'Enacted', 'ta', 'middle') +
          T(305, 137, 'Republic', 't', 'middle') +
          T(305, 149, 'Purna Swaraj', 't', 'middle') +
          T(180, 178, 'Drafting Period: 2 Years, 11 Months, 18 Days', 'ta', 'middle')
      ),
      caption:
        'Figure 0.1: Chronological trajectory from the Government of India Act 1935 through Constituent Assembly drafting to Republic Day 1950.',
    },
  },

  'eic:0:2': {
    explain: [
      'The Indian Constitution is the longest written constitution of any sovereign country in the world, combining comprehensive administrative detail with constitutional principles.',
      'It draws from global legal sources: UK (Parliamentary system), USA (Fundamental Rights, Judicial Review), Ireland (Directive Principles), Canada (Federation with a strong Centre), and Australia (Concurrent List).',
      'It is uniquely "quasi-federal" (federal in form, unitary in spirit): in normal times, states enjoy legislative autonomy, but during national emergency (Art. 352), power centralizes completely into a unitary system.',
    ],
    definition:
      'Salient features are the defining structural characteristics of the Indian Constitution, including its written comprehensiveness, blend of rigidity and flexibility, quasi-federal framework, parliamentary democracy, independent judiciary, and secularism.',
    formula: '\\text{Indian Constitution} = \\text{Federal in Structure} + \\text{Unitary in Spirit (Quasi-Federal)} + \\text{Rigid} \\cap \\text{Flexible}',
    steps: [
      'Longest Written Constitution: Originally 395 Articles in 22 Parts and 8 Schedules; today expanded to over 448 Articles in 25 Parts and 12 Schedules.',
      'Blend of Rigidity and Flexibility: Some provisions require simple Parliamentary majority, others require special 2/3 majority, and federal amendments require ratification by 50% of state legislatures (Art. 368).',
      'Federal System with Unitary Bias: Described as "quasi-federal" by K.C. Wheare due to single constitution, integrated judiciary, All-India Services (IAS/IPS), and Governor appointments.',
      'Integrated and Independent Judiciary: Hierarchical pyramid with Supreme Court at apex, independent of executive interference.',
      'Single Citizenship & Universal Adult Suffrage: Grants uniform national citizenship without separate state citizenship; guarantees voting rights to all citizens aged 18 and older.',
    ],
    examAnswer: [
      'Enumerate and explain 8 salient features of the Indian Constitution.',
      'Explain what K.C. Wheare meant by describing the Indian Constitution as "quasi-federal".',
      'List the key international constitutional borrowings (UK, USA, Ireland, Canada, Australia).',
      'Explain how the Indian Constitution balances judicial supremacy with parliamentary sovereignty.',
    ],
    slip: 'Believing India has dual citizenship like the United States; India strictly provides Single Citizenship across all states and union territories.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'SALIENT FEATURES OF INDIAN CONSTITUTION', 'ta') +
          // Central Hub
          C(180, 105, 36, 'fa') +
          T(180, 102, 'SALIENT', 'ta', 'middle') +
          T(180, 114, 'FEATURES', 'ta', 'middle') +
          // Orbiting Nodes
          R(15, 36, 100, 24) +
          T(65, 52, 'Longest Written', 't', 'middle') +
          R(130, 32, 100, 24) +
          T(180, 48, 'Quasi-Federal', 'ta', 'middle') +
          R(245, 36, 100, 24) +
          T(295, 52, 'Parliamentary Gov', 't', 'middle') +
          R(15, 145, 100, 24) +
          T(65, 161, 'Integrated Courts', 't', 'middle') +
          R(130, 150, 100, 24) +
          T(180, 166, 'Secular State', 'ta', 'middle') +
          R(245, 145, 100, 24) +
          T(295, 161, 'Single Citizen', 't', 'middle') +
          // Connecting spokes
          L(65, 60, 150, 95, 'd') +
          L(180, 56, 180, 69, 'd') +
          L(295, 60, 210, 95, 'd') +
          L(65, 145, 150, 115, 'd') +
          L(180, 150, 180, 141, 'd') +
          L(295, 145, 210, 115, 'd')
      ),
      caption:
        'Figure 0.2: Core characteristics synthesizing global constitutional models into an integrated sovereign, quasi-federal democratic framework.',
    },
  },

  'eic:0:3': {
    explain: [
      'The Preamble is the preface, soul, and philosophical key to the Indian Constitution, embodying the ideals of Jawaharlal Nehru’s historic 1946 "Objectives Resolution".',
      'It declares the Nature of the Indian State through five cardinal adjectives: SOVEREIGN, SOCIALIST, SECULAR, DEMOCRATIC, REPUBLIC.',
      'It proclaims four noble Objectives: JUSTICE (Social, Economic, Political), LIBERTY (Thought, Expression, Belief, Faith, Worship), EQUALITY (Status and Opportunity), and FRATERNITY (Dignity and Unity).',
      'In the historic Kesavananda Bharati case (1973), the Supreme Court ruled that the Preamble is an integral part of the Constitution and can be amended under Art. 368 provided its Basic Structure is not destroyed.',
    ],
    definition:
      'The Preamble is the introductory philosophical manifesto of the Indian Constitution declaring the sovereign source of authority (the People) and codifying the cardinal principles, values, and objectives of the Republic.',
    formula: '\\text{Nature: } \\text{SOVEREIGN, SOCIALIST, SECULAR, DEMOCRATIC, REPUBLIC} \\quad \\Longleftrightarrow \\quad \\text{Goals: } \\text{Justice, Liberty, Equality, Fraternity}',
    steps: [
      'Source of Authority: "WE, THE PEOPLE OF INDIA..." designates popular sovereignty as the supreme source of constitutional power.',
      'Sovereignty: Absolute external independence and internal supreme legislative authority.',
      'Socialist & Secular: Added by the 42nd Constitutional Amendment Act of 1976 to articulate democratic socialism and equal respect for all religious faiths (Sarva Dharma Sambhava).',
      'Democratic Republic: Rulers are democratically elected by universal adult franchise; the Head of State (President) is an elected representative, never hereditary.',
      'Four Core Commitments: Justice (social, economic, political), Liberty of mind and faith, Equality of opportunity, and Fraternity securing national integrity.',
    ],
    examAnswer: [
      'Quote the key declarations of the Preamble and explain the meaning of each of the 5 nature keywords.',
      'Detail the four objectives guaranteed to all citizens (Justice, Liberty, Equality, Fraternity).',
      'Explain the 42nd Amendment changes to the Preamble (addition of "Socialist", "Secular", and "Integrity" in 1976).',
      'Discuss the landmark Kesavananda Bharati verdict regarding whether the Preamble is part of the Constitution and amendable.',
    ],
    slip: 'Asserting that "Socialist" and "Secular" were present in the original 1950 text; they were introduced later by the 42nd Amendment during the 1976 Emergency.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE ARCHITECTURE OF THE PREAMBLE', 'ta') +
          // Header: We The People
          R(30, 32, 300, 26, 'fa') +
          T(180, 49, 'WE, THE PEOPLE OF INDIA (Source of Power)', 'ta', 'middle') +
          // Nature of State
          R(30, 64, 300, 45) +
          T(180, 80, 'NATURE OF THE STATE:', 'ta', 'middle') +
          T(180, 96, 'SOVEREIGN · SOCIALIST* · SECULAR* · DEMOCRATIC · REPUBLIC', 't', 'middle') +
          // Objectives
          R(30, 115, 300, 45, 'fa') +
          T(180, 131, 'CORE OBJECTIVES GUARANTEED:', 'ta', 'middle') +
          T(180, 147, 'JUSTICE · LIBERTY · EQUALITY · FRATERNITY (Integrity*)', 't', 'middle') +
          // Footer Amendment Note
          T(180, 178, '* Added by 42nd Constitutional Amendment (1976) · Basic Structure', 't', 'middle')
      ),
      caption:
        'Figure 0.3: The structural framework of the Preamble setting forth the sovereign nature of the state and the four guaranteed constitutional objectives.',
    },
  },
};
