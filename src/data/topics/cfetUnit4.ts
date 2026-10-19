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

/* ---------- CFET UNIT 4 TOPIC CONTENT (7 Topics) ---------- */
export const CFET_UNIT4_TOPICS: Record<string, TopicContent> = {
  'cfet:4:0': {
    explain: [
      'The Internet of Things (IoT) is a global network of physical devices embedded with electronics, sensors, actuators, and network connectivity.',
      'It enables everyday physical objects—from home thermostats and smart electric meters to factory conveyor belts and autonomous tractors—to collect and exchange data without direct human intervention.',
    ],
    definition:
      'The Internet of Things (IoT) is an interconnected system of physically embodied computing devices, mechanical sensors, and digital objects with unique identifiers capable of autonomous data telemetry over a network.',
    formula: '\\text{IoT Architecture} = \\text{Sensing Layer} \\longrightarrow \\text{Network Layer} \\longrightarrow \\text{Middleware} \\longrightarrow \\text{Application Layer}',
    steps: [
      'Sensing / Perception Layer: Physical hardware transducers (temperature, humidity, pressure, RFID tags, GPS, accelerometers) and actuators.',
      'Network Layer: Telecommunications pathways conveying telemetry to the cloud (Wi-Fi, Bluetooth Low Energy, Zigbee, LoRaWAN, 5G cellular).',
      'Data Processing / Middleware Layer: Cloud analytic platforms, time-series databases, and rule engines aggregating sensor streams in real time.',
      'Application Layer: End-user smart interfaces (Smart Home mobile apps, Industrial Predictive Maintenance dashboards, Smart Cities traffic routing).',
      'Industrial IoT (IIoT): Deploys machine-to-machine (M2M) communication to monitor factory yields, detect machinery bearing wear, and prevent industrial blackouts.',
    ],
    examAnswer: [
      'Define the Internet of Things (IoT) and explain its core operating principle.',
      'Draw and detail the 4-layer IoT architecture: Perception, Network, Processing, Application.',
      'List at least 3 major application domains: Smart Cities, Precision Agriculture, Healthcare monitoring.',
      'Discuss key challenges in IoT: Security vulnerabilities, battery power constraints, and data privacy.',
    ],
    slip: 'Do not think IoT is just smartphones and laptops; IoT specifically refers to non-traditional everyday physical objects (appliances, vehicles, streetlights, soil probes) endowed with sensing and connectivity.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'INTERNET OF THINGS (IoT) 4-LAYER ARCHITECTURE', 'ta') +
          R(20, 32, 320, 26, 'fa') +
          T(180, 50, '4. Application Layer (Smart Home, Fleet, Healthcare)', 'ta', 'middle') +
          LA(180, 58, 180, 70, 'a') +
          R(20, 70, 320, 26) +
          T(180, 88, '3. Middleware / Cloud Analytics Layer (Big Data, AI)', 't', 'middle') +
          LA(180, 96, 180, 108, 'a') +
          R(20, 108, 320, 26) +
          T(180, 126, '2. Network Layer (5G, LoRaWAN, Wi-Fi, Zigbee)', 'ta', 'middle') +
          LA(180, 134, 180, 146, 'a') +
          R(20, 146, 320, 26) +
          T(180, 164, '1. Perception Layer (Sensors: RFID, Temp, Accel, GPS)', 't', 'middle') +
          T(180, 184, 'Bridges physical reality with cloud analytical decision engines', 'ta', 'middle')
      ),
      caption: 'The standard 4-layer architectural stack of the Internet of Things.',
    },
  },

  'cfet:4:1': {
    explain: [
      'Cybersecurity is the practice of protecting computer systems, networks, programs, and data from digital attacks, unauthorized access, and damage.',
      'The foundational gold standard guiding all security policy design is the CIA Triad: Confidentiality, Integrity, and Availability.',
    ],
    definition:
      'Cybersecurity encompasses the collection of tools, policies, security concepts, and safeguards used to protect organizational cyber assets, centered on the CIA security triad.',
    formula: '\\text{The CIA Triad} = \\text{Confidentiality} + \\text{Integrity} + \\text{Availability}',
    steps: [
      'Confidentiality: Ensuring sensitive data is shielded from unauthorized access (enforced via AES/RSA encryption, multi-factor authentication, and role-based access control).',
      'Integrity: Guaranteeing data remains accurate, complete, and uncorrupted by unauthorized modification (enforced via cryptographic SHA hashes and digital signatures).',
      'Availability: Ensuring systems, networks, and applications are continuously accessible to authorized users when needed (enforced via redundant hardware, backups, and DDoS mitigation).',
      'Key Terminologies: Vulnerability (inherent software flaw), Threat (potential danger), Exploit (malicious technique taking advantage of vulnerability), Risk (probability of damage).',
      'Non-Repudiation: Guaranteeing that the sender of a message cannot later deny having sent it, verified through public-key digital signatures.',
    ],
    examAnswer: [
      'Draw the CIA Triad triangle and define all three pillars (Confidentiality, Integrity, Availability) with concrete examples.',
      'Differentiate Vulnerability, Threat, and Exploit with clear security examples.',
      'Explain how encryption guarantees confidentiality, while hashing guarantees integrity.',
      'Define Authentication, Authorization, and Non-repudiation.',
    ],
    slip: 'Do not confuse Authentication with Authorization: Authentication verifies WHO YOU ARE (passwords, biometrics); Authorization determines WHAT YOU ARE PERMITTED TO ACCESS (permissions, roles).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE CIA TRIAD OF INFORMATION SECURITY', 'ta') +
          P('M180 34 L270 140 L90 140 Z', 'l') +
          C(180, 34, 18, 'fa') +
          T(180, 38, 'C', 'ta', 'middle') +
          T(180, 16, 'Confidentiality (Encryption)', 't', 'middle') +
          C(90, 140, 18, 'fa') +
          T(90, 144, 'I', 'ta', 'middle') +
          T(60, 164, 'Integrity (Hashing)', 't') +
          C(270, 140, 18, 'fa') +
          T(270, 144, 'A', 'ta', 'middle') +
          T(210, 164, 'Availability (Redundancy)', 't') +
          T(180, 95, 'SECURE', 'ta', 'middle') +
          T(180, 110, 'SYSTEM', 't', 'middle') +
          T(180, 182, 'Vulnerability (Flaw) + Threat (Danger) = Risk (Impact)', 'ta', 'middle')
      ),
      caption: 'The classic CIA Triad triangle: Confidentiality, Integrity, and Availability.',
    },
  },

  'cfet:4:2': {
    explain: [
      'Modern computer systems face aggressive cyber threats designed to steal data, hold files hostage, or disrupt infrastructure.',
      'Defensive security requires combining technological safeguards, architectural design (Zero Trust), and operational protocols.',
    ],
    definition:
      'Cyber threats encompass malicious digital attacks aimed at compromising data integrity, stealing proprietary assets, or disabling operations, combated by multi-layered defense-in-depth countermeasures.',
    formula: '\\text{Defense-in-Depth} = \\text{Firewalls} + \\text{MFA} + \\text{Antivirus} + \\text{Patches} + \\text{Encryption} + \\text{Backups}',
    steps: [
      'Malware Types: Viruses (attach to files, require execution), Worms (self-replicating over networks), Trojans (disguised as benign software), Ransomware (encrypts files demanding ransom).',
      'Social Engineering: Phishing attacks tricking users into disclosing passwords via spoofed emails and fake authentication portals.',
      'Network Attacks: Denial of Service (DoS / DDoS floods servers with traffic), Man-in-the-Middle (MitM eavesdrops on communication lines).',
      'Web Attacks: SQL Injection (injecting malicious database commands into form fields), Cross-Site Scripting (XSS).',
      'Countermeasures: Multi-Factor Authentication (MFA), Next-Generation Firewalls, regular software patch management, Zero-Trust network architecture, immutable offline data backups.',
    ],
    examAnswer: [
      'Differentiate between a Computer Virus, a Worm, and a Trojan Horse.',
      'Explain Ransomware and how an organization can protect itself using the 3-2-1 backup strategy.',
      'Define Phishing and explain Multi-Factor Authentication (MFA) as an effective countermeasure.',
      'Explain Denial of Service (DoS) vs Distributed Denial of Service (DDoS) attacks.',
    ],
    slip: 'Do not confuse a virus with a worm: a virus requires human user action to execute the host program to spread, whereas a worm is autonomous and spreads across networks on its own.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'CYBER THREATS AND MULTI-LAYER DEFENSE', 'ta') +
          R(20, 36, 150, 75) +
          T(95, 54, 'Major Cyber Threats', 'ta', 'middle') +
          T(30, 72, '1. Ransomware / Malware', 't') +
          T(30, 88, '2. Phishing (Credentials)', 't') +
          T(30, 102, '3. DDoS (Traffic flood)', 'ta') +
          R(190, 36, 150, 75, 'fa') +
          T(265, 54, 'Defensive Countermeasures', 'ta', 'middle') +
          T(200, 72, '1. Multi-Factor Auth (MFA)', 't') +
          T(200, 88, '2. Firewalls & Antivirus', 't') +
          T(200, 102, '3. Offline 3-2-1 Backups', 'ta') +
          R(20, 124, 320, 48) +
          T(30, 144, 'Zero Trust Architecture: "Never Trust, Always Verify"', 'ta') +
          T(30, 160, 'Encryption + Immutable backups neutralize ransomware attacks', 't')
      ),
      caption: 'Overview of prevalent cyber threats and defense-in-depth protective countermeasures.',
    },
  },

  'cfet:4:3': {
    explain: [
      'Artificial Intelligence (AI) is the broad branch of computer science dedicated to building systems capable of performing tasks that traditionally require human intelligence.',
      'Coined at the 1956 Dartmouth Conference, modern AI centers on the concept of rational agents that perceive their environment and execute actions that maximize success.',
    ],
    definition:
      'Artificial Intelligence is the science and engineering of designing autonomous computational agents capable of sensing environments, reasoning logically, learning from data, and taking goal-directed actions.',
    formula: '\\text{Rational Agent} = \\text{Sensors (Percepts)} \\longrightarrow \\text{Program (Inference)} \\longrightarrow \\text{Actuators (Actions)}',
    steps: [
      'Alan Turing & The Turing Test (1950): Operational test evaluating whether a machine can exhibit conversational behavior indistinguishable from a human.',
      '1956 Dartmouth Conference: John McCarthy officially established "Artificial Intelligence" as a scientific discipline.',
      'PEAS Framework: Formally specifies an agent by Performance measure, Environment, Actuators, and Sensors.',
      'Agent Architectures: Simple Reflex (condition-action lookup), Model-Based (maintains internal state), Goal-Based (forward planning), Utility-Based (optimizes trade-offs), Learning Agents.',
      'Engineering Applications: Autonomous vehicles, medical diagnosis, smart electric grid dispatch, automated structural defect inspection.',
    ],
    examAnswer: [
      'Define Artificial Intelligence and state the rational agent definition.',
      'Explain the Turing Test and the 1956 Dartmouth conference.',
      'Define the PEAS framework and construct a complete PEAS table for an automated system (e.g. self-driving car).',
      'List at least 3 industrial applications of AI across engineering disciplines.',
    ],
    slip: 'Do not define AI as "making computers human"; modern AI focuses on rationality (mathematically maximizing expected performance under uncertainty), not mimicking human cognitive biases.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'ARTIFICIAL INTELLIGENCE & AGENT LOOP', 'ta') +
          R(20, 45, 100, 65) +
          T(70, 72, 'AGENT', 't', 'middle') +
          T(70, 92, 'Think / Plan', 'ta', 'middle') +
          R(240, 45, 100, 65, 'fa') +
          T(290, 72, 'ENVIRONMENT', 't', 'middle') +
          T(290, 92, 'Physical World', 'ta', 'middle') +
          LA(240, 60, 120, 60, 'a') +
          T(180, 52, 'Percepts (Sensors)', 'ta', 'middle') +
          LA(120, 95, 240, 95, 'a') +
          T(180, 110, 'Actions (Actuators)', 'ta', 'middle') +
          R(20, 130, 320, 44) +
          T(30, 150, 'PEAS: Performance Measure · Environment · Actuators · Sensors', 'ta') +
          T(30, 166, 'Goal: Maximize expected utility under uncertainty', 't')
      ),
      caption: 'The fundamental agent-environment closed loop and PEAS formal specification.',
    },
  },

  'cfet:4:4': {
    explain: [
      'Machine Learning (ML) is a core subfield of Artificial Intelligence where algorithms automatically learn predictive models from empirical training data without being explicitly hand-coded.',
      'Machine Learning divides into three primary paradigms: Supervised Learning (labeled training data), Unsupervised Learning (unlabeled pattern clustering), and Reinforcement Learning (reward-driven policies).',
    ],
    definition:
      'Machine Learning encompasses statistical algorithms that optimize operational performance on a given task through experience gained from datasets, spanning supervised, unsupervised, and reinforcement paradigms.',
    formula: '\\text{ML Paradigms: } \\text{Supervised (Labels)} + \\text{Unsupervised (Patterns)} + \\text{Reinforcement (Rewards)}',
    steps: [
      'Supervised Learning: Algorithm trained on input-output pairs $(x_i, y_i)$; learns mapping $f(x) \\to y$; Classification (spam detection, image recognition) and Regression (house price prediction).',
      'Unsupervised Learning: Algorithm receives unlabeled inputs $x_i$; discovers inherent groupings and latent features; Clustering (k-means customer segmentation) and Dimensionality Reduction (PCA).',
      'Reinforcement Learning (RL): Autonomous agent interacts with an environment in trial-and-error loop, maximizing cumulative numerical reward signals (AlphaGo, robotic arm manipulation).',
      'Deep Learning: Subset of ML using deep multi-layer neural networks (CNNs for vision, Transformers for language).',
    ],
    examAnswer: [
      'Construct a 3-column comparison table: Supervised vs Unsupervised vs Reinforcement Learning.',
      'Compare across: Input data type, Feedback signal, and Primary objective.',
      'Provide at least 2 practical application examples for each paradigm.',
      'Differentiate between Classification (discrete classes) and Regression (continuous values).',
    ],
    slip: 'Do not claim unsupervised learning has rewards; rewards exist exclusively in Reinforcement Learning; unsupervised learning receives zero external feedback.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'MACHINE LEARNING PARADIGMS', 'ta') +
          R(20, 36, 95, 80) +
          T(67, 54, 'Supervised', 'ta', 'middle') +
          T(67, 72, 'Labeled Data (x, y)', 't', 'middle') +
          T(67, 88, 'Direct feedback', 'ta', 'middle') +
          T(67, 102, 'Classify / Regress', 't', 'middle') +
          R(132, 36, 95, 80) +
          T(179, 54, 'Unsupervised', 'ta', 'middle') +
          T(179, 72, 'Unlabeled Data (x)', 't', 'middle') +
          T(179, 88, 'No feedback', 'ta', 'middle') +
          T(179, 102, 'Clustering / k-means', 't', 'middle') +
          R(245, 36, 95, 80, 'fa') +
          T(292, 54, 'Reinforcement', 'ta', 'middle') +
          T(292, 72, 'Environment MDP', 't', 'middle') +
          T(292, 88, 'Delayed Reward', 'ta', 'middle') +
          T(292, 102, 'Learn Policy pi(s)', 't', 'middle') +
          R(20, 126, 320, 48) +
          T(30, 146, 'Deep Learning utilizes multi-layered Artificial Neural Networks', 'ta') +
          T(30, 162, 'Foundational in modern vision (CNNs) and language models (Transformers)', 't')
      ),
      caption: 'The three foundational paradigms of Machine Learning and their operational feedback models.',
    },
  },

  'cfet:4:5': {
    explain: [
      'A blockchain is an open, decentralized distributed ledger that records transactions across a peer-to-peer network in an immutable, cryptographically verifiable sequence.',
      'Each block contains a batch of transactions, a timestamp, a cryptographic hash of its own contents, and the cryptographic hash of the immediately preceding block, forming an unbreakable tamper-evident chain.',
    ],
    definition:
      'A blockchain is a decentralized, distributed, public cryptographic ledger consisting of a growing list of records (blocks) linked together using cryptographic hashes, governed by consensus algorithms.',
    formula: '\\text{Block}_i = \\langle \\text{Data}, \\; \\text{Timestamp}, \\; \\text{Nonce}, \\; \\text{Hash}_{i-1}, \\; \\text{Hash}_i = \\text{SHA-256}(\\dots) \\rangle',
    steps: [
      'Anatomy of a Block: Block Number, Transaction Data, Nonce (random number for mining), Previous Block Hash, Current Block Hash.',
      'Cryptographic Hashing (SHA-256): A mathematical one-way function that maps arbitrary data into a fixed 256-bit hash. Any microscopic alteration completely changes the output hash (Avalanche Effect).',
      'Tamper-Evidence: Modifying an old transaction changes that block’s hash, breaking the link in every subsequent block; the network rejects the tampered chain.',
      'Decentralization: No central server or banking authority; identical copies of the entire ledger are synchronized across thousands of independent nodes.',
      'Consensus Mechanisms: Mathematical protocols ensuring all nodes agree on the valid chain: Proof of Work (PoW, computational mining) and Proof of Stake (PoS, validator collateral).',
    ],
    examAnswer: [
      'Define Blockchain and explain its 3 foundational pillars: Decentralization, Immutability, and Cryptographic Security.',
      'Draw a 3-block chain showing how Block 2 stores the hash of Block 1, and Block 3 stores the hash of Block 2.',
      'Explain how cryptographic hashing (SHA-256) detects tampering across the distributed ledger.',
      'Differentiate Proof of Work (PoW) from Proof of Stake (PoS).',
    ],
    slip: 'Do not confuse Blockchain with Bitcoin; Bitcoin is a specific cryptocurrency application built on blockchain technology, whereas blockchain is the underlying distributed ledger architecture applicable to logistics, healthcare, and voting.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'BLOCKCHAIN DISTRIBUTED LEDGER ARCHITECTURE', 'ta') +
          R(20, 36, 95, 80) +
          T(67, 52, 'Block 1', 'ta', 'middle') +
          T(67, 68, 'Prev: 0000', 't', 'middle') +
          T(67, 84, 'Data: Tx1..Tx5', 't', 'middle') +
          T(67, 102, 'Hash: 1A3F', 'ta', 'middle') +
          LA(115, 76, 132, 76, 'a') +
          R(132, 36, 95, 80, 'fa') +
          T(179, 52, 'Block 2', 'ta', 'middle') +
          T(179, 68, 'Prev: 1A3F', 'ta', 'middle') +
          T(179, 84, 'Data: Tx6..Tx9', 't', 'middle') +
          T(179, 102, 'Hash: 9C8B', 'ta', 'middle') +
          LA(227, 76, 245, 76, 'a') +
          R(245, 36, 95, 80) +
          T(292, 52, 'Block 3', 'ta', 'middle') +
          T(292, 68, 'Prev: 9C8B', 'ta', 'middle') +
          T(292, 84, 'Data: Tx10..Tx12', 't', 'middle') +
          T(292, 102, 'Hash: 4E7A', 'ta', 'middle') +
          R(20, 126, 320, 48) +
          T(30, 144, 'Tamper Detection: Changing Block 1 alters Hash 1A3F -> breaks Block 2', 'ta') +
          T(30, 160, 'Decentralized consensus (PoW / PoS) validates honest peer ledger copies', 't')
      ),
      caption: 'The immutable cryptographic block structure linking successive blocks via previous hash pointers.',
    },
  },

  'cfet:4:6': {
    explain: [
      'Data Science is a multidisciplinary field that combines domain expertise, programming skills, and mathematical statistics to extract actionable insights from structured and unstructured data.',
      'The data science lifecycle guides organizations through an iterative problem-solving pipeline, transforming raw telemetry into data-driven decision-making.',
    ],
    definition:
      'Data Science is the iterative discipline of capturing, cleaning, exploring, modeling, and interpreting massive complex data to optimize strategic decision-making and automate predictive forecasting.',
    formula: '\\text{Data Science} = \\text{Computer Science} + \\text{Math/Statistics} + \\text{Domain Business Expertise}',
    steps: [
      'Stage 1 (Problem Understanding): Formulating clear, measurable business questions and performance metrics.',
      'Stage 2 (Data Acquisition): Extracting data from SQL databases, web APIs, IoT sensors, and log files.',
      'Stage 3 (Data Cleaning & Wrangling): Handling missing values, removing outliers, normalizing numerical scales, and encoding categories.',
      'Stage 4 (Exploratory Data Analysis - EDA): Visualizing distributions, correlations, and anomalies using statistical charts.',
      'Stage 5 (Model Training & Deployment): Training machine learning algorithms, evaluating accuracy, and deploying models into production dashboards for strategic decisions.',
      'Analytics Hierarchy: Descriptive (what happened?), Diagnostic (why did it happen?), Predictive (what will happen?), Prescriptive (what should we do?).',
    ],
    examAnswer: [
      'Define Data Science and draw the Venn Diagram showing the intersection of Computer Science, Math/Statistics, and Domain Knowledge.',
      'Detail the 5 sequential phases of the Data Science Lifecycle.',
      'Explain the crucial role of Data Cleaning (typically consumes 70-80% of a data scientist’s project time).',
      'Differentiate between Descriptive, Predictive, and Prescriptive analytics.',
    ],
    slip: 'Do not assume data science is just running machine learning models; real-world data science is dominated by data cleaning, exploratory analysis, and translating analytical findings into practical business decisions.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'DATA SCIENCE ITERATIVE LIFECYCLE', 'ta') +
          R(15, 36, 60, 45) +
          T(45, 54, '1. Business', 't', 'middle') +
          T(45, 70, 'Goal', 'ta', 'middle') +
          LA(75, 58, 90, 58, 'a') +
          R(90, 36, 60, 45) +
          T(120, 54, '2. Data', 't', 'middle') +
          T(120, 70, 'Collect', 'ta', 'middle') +
          LA(150, 58, 165, 58, 'a') +
          R(165, 36, 60, 45, 'fa') +
          T(195, 54, '3. Clean', 't', 'middle') +
          T(195, 70, 'Wrangle', 'ta', 'middle') +
          LA(225, 58, 240, 58, 'a') +
          R(240, 36, 50, 45) +
          T(265, 54, '4. Model', 't', 'middle') +
          T(265, 70, 'ML / EDA', 'ta', 'middle') +
          LA(290, 58, 305, 58, 'a') +
          R(305, 36, 45, 45, 'fa') +
          T(327, 54, '5. Act', 't', 'middle') +
          T(327, 70, 'Deploy', 'ta', 'middle') +
          R(20, 110, 320, 60) +
          T(30, 130, 'Descriptive (What happened?) -> Diagnostic (Why?)', 't') +
          T(30, 146, 'Predictive (What will happen?) -> Prescriptive (What should we do?)', 'ta') +
          T(30, 162, 'Data Cleaning consumes ~80% of project effort', 't')
      ),
      caption: 'The 5-stage data science lifecycle from business problem to predictive model deployment.',
    },
  },
};
