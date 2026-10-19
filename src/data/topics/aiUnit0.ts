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

/* ---------- AI UNIT STORIES (5 Units) ---------- */
export const AI_UNIT_STORIES: Record<string, UnitStory> = {
  'ai:0': {
    whatItIs:
      'Artificial Intelligence is the science and engineering of designing rational computational agents—systems that perceive their environment through sensors, reason about internal and external states, and execute actions via actuators to achieve desired goals.',
    whyItMatters:
      'From autonomous driving and aircraft collision avoidance to algorithmic drug discovery and smart electrical grids, intelligent agents automate decision-making under uncertainty at speeds and scales beyond human capacity.',
    howItWorks:
      'Every agent is modeled by the PEAS framework (Performance measure, Environment, Actuators, Sensors). Agents evolve across five structural tiers: simple reflex (condition-action lookup), model-based (tracks hidden history), goal-based (forward planning), utility-based (balances trade-offs), and learning agents (self-improves through reward/critic loops).',
  },
  'ai:1': {
    whatItIs:
      'Problem solving by search models complex goals as navigating a directed graph of states, transitions, path costs, and goal conditions from an initial state to a target state.',
    whyItMatters:
      'GPS navigation routing, robotic motion planning, VLSI chip routing, puzzle solving, and game AI all boil down to graph search algorithms that find optimal or near-optimal solutions under strict memory and time limits.',
    howItWorks:
      'Uninformed algorithms explore blindly: BFS guarantees shortest hop paths using FIFO queues (high O(b^d) memory), while DFS plunges deeply with LIFO stacks (O(bm) memory). Informed algorithms use heuristics: Greedy Best-First pursues lowest h(n), while A* evaluates f(n) = g(n) + h(n), guaranteeing optimality if h is admissible. In adversarial games, Minimax with Alpha-Beta pruning evaluates optimal minimax values while discarding subtrees that cannot influence the final decision.',
  },
  'ai:2': {
    whatItIs:
      'Knowledge representation and reasoning formalizes human domain knowledge into symbolic logic structures (Propositional Logic, First-Order Predicate Logic, Horn Clauses, Semantic Nets) enabling machines to perform automated deduction and theorem proving.',
    whyItMatters:
      'Unlike black-box statistical models, logic-based reasoning systems provide 100% mathematically verifiable, explainable conclusions essential in legal compliance, safety-critical medical protocols, and formal software verification.',
    howItWorks:
      'Statements are converted into Conjunctive Normal Form (CNF). Resolution refutation negates the candidate query and repeatedly cancels complementary literals (A ∨ B and ¬A ∨ C yielding B ∨ C) until deriving the empty clause (contradiction). Forward chaining infers new facts from data, whereas backward chaining starts at the goal to trace supporting evidence.',
  },
  'ai:3': {
    whatItIs:
      'Reasoning under uncertainty provides probabilistic frameworks to make rational inferences when real-world data is noisy, incomplete, ambiguous, or partially observed.',
    whyItMatters:
      'Medical symptoms do not guarantee a single disease; weather readings carry instrument drift; sensor noise corrupts robot localization. Deterministic Boolean logic fails when observations have probabilities rather than absolutes.',
    howItWorks:
      'Bayes’ theorem updates prior probabilities into posterior beliefs upon observing evidence: P(H|E) = [P(E|H) · P(H)] / P(E). Bayesian Belief Networks represent conditional dependencies via Directed Acyclic Graphs, factorizing joint probability tables into compact local conditional distributions. Fuzzy logic replaces binary {0, 1} truth with continuous membership functions μ ∈ [0, 1].',
  },
  'ai:4': {
    whatItIs:
      'Machine Learning empowers computational models to extract patterns, formulate predictive decision boundaries, and optimize actions directly from data without hand-crafted symbolic rules.',
    whyItMatters:
      'Speech recognition, autonomous vision, natural language translation, fraud detection, and industrial robotics cannot be solved with hardcoded if-else statements due to combinatorial complexity.',
    howItWorks:
      'Learning divides into supervised (labeled data for classification and regression), unsupervised (clustering via k-means without labels), and reinforcement learning (reward-driven policies). Neural networks compute weighted sums passed through non-linear activation functions, updating weights via gradient descent. Modern deployment demands ethical considerations regarding algorithmic bias and data fairness.',
  },
};

/* ---------- AI UNIT 0 TOPIC CONTENT (6 Topics) ---------- */
export const AI_UNIT0_TOPICS: Record<string, TopicContent> = {
  'ai:0:0': {
    explain: [
      'Artificial Intelligence (AI) is the computational study of synthesizing rational behavior—building systems that perceive their environment, think, and take actions that maximize their probability of success.',
      'Historically classified into 4 quadrants: Thinking Humanly (cognitive modeling), Thinking Rationally (laws of thought/logic), Acting Humanly (Turing Test), and Acting Rationally (rational agents).',
      'The modern rational agent paradigm prioritizes acting rationally under uncertainty rather than mimicking human cognitive mistakes.',
    ],
    definition:
      'Artificial Intelligence is the science and engineering of making intelligent machines, especially intelligent computer programs, that can perceive, synthesize, infer information, and execute rational actions to achieve specified goals.',
    formula: '\\text{Rationality} \\iff \\max_{a \\in A} \\mathbb{E}[U(s\') \\mid \\text{percept sequence}]',
    steps: [
      'Turing Test (1950): Interrogator communicates via terminal with a machine and a human. If interrogator cannot reliably tell which is which, the machine passes.',
      'Dartmouth Workshop (1956): John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon coined "Artificial Intelligence".',
      'Symbolic AI Era (1950s-1970s): Logic Theorist, General Problem Solver (GPS), microworlds; suffered from combinatorial explosion.',
      'AI Winters (1974-1980, 1987-1993): Caused by overpromising, rigid rule bases, and compute limitations.',
      'Modern Deep Learning (2012-present): Convergence of massive datasets, GPUs, and multi-layer neural networks.',
    ],
    examAnswer: [
      'Define AI across Russell & Norvig’s 4 dimensions: Thinking Humanly vs Rationally; Acting Humanly vs Rationally.',
      'Explain the Turing Test and its necessary subfields (NLP, Knowledge Representation, Automated Reasoning, Machine Learning).',
      'Cite the Dartmouth Workshop (1956) where John McCarthy officially coined the discipline.',
      'State the modern rational agent paradigm: Acting rationally means selecting the action that maximizes expected utility.',
    ],
    slip: 'Do not confuse "thinking humanly" (matching human psychological errors and biases) with "acting rationally" (maximizing expected utility mathematically).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'AI HISTORICAL EVOLUTION & 4 QUADRANTS', 'ta') +
          R(20, 32, 150, 48) +
          T(95, 52, 'Thinking Humanly', 't', 'middle') +
          T(95, 68, '(Cognitive Science)', 'ta', 'middle') +
          R(190, 32, 150, 48) +
          T(265, 52, 'Thinking Rationally', 't', 'middle') +
          T(265, 68, '(Laws of Logic)', 'ta', 'middle') +
          R(20, 90, 150, 48) +
          T(95, 110, 'Acting Humanly', 't', 'middle') +
          T(95, 126, '(Turing Test)', 'ta', 'middle') +
          R(190, 90, 150, 48) +
          T(265, 110, 'Acting Rationally', 't', 'middle') +
          T(265, 126, '(Rational Agents ★)', 'ta', 'middle') +
          L(20, 158, 340, 158, 'l') +
          C(30, 158, 4, 'fa') +
          T(30, 174, '1950: Turing', 't') +
          C(110, 158, 4, 'fa') +
          T(110, 184, '1956: Dartmouth', 'ta') +
          C(190, 158, 4, 'fa') +
          T(190, 174, '1980s: Expert', 't') +
          C(270, 158, 4, 'fa') +
          T(270, 184, '2012: Deep Net', 'ta') +
          C(335, 158, 4, 'fa') +
          T(335, 174, 'Now', 't', 'end')
      ),
      caption: 'Historical timeline and 4-quadrant definition matrix of Artificial Intelligence.',
    },
  },

  'ai:0:1': {
    explain: [
      'Artificial Intelligence is built upon multi-disciplinary foundations: Philosophy (formal logic, theories of mind), Mathematics (logic, computability, probability), Economics (decision theory, game theory), Neuroscience (biological neurons), and Cognitive Science (human reasoning models).',
      'Mathematics supplied three pillars: Logic (Boole, Frege, Gödel), Computability (Turing machines, Church-Turing thesis), and Probability (Bayes).',
    ],
    definition:
      'Foundations of AI encompass the mathematical, philosophical, neurological, and computational principles that define knowledge representation, logical deduction, algorithmic tractability, and expected utility maximization.',
    formula: '\\text{AI} = \\text{Logic} + \\text{Computability} + \\text{Probability} + \\text{Utility Theory} + \\text{Neuro-Cognition}',
    steps: [
      'Philosophy: Solved how mind emerges from physical brain; established epistemology and formal syllogisms.',
      'Mathematics: Gödel showed true statements exist that cannot be proved; Turing proved undecidability of halting problem.',
      'Intractability & NP-Completeness: Cook and Karp showed exponential search cannot always be avoided, necessitating heuristics.',
      'Economics: von Neumann & Morgenstern formulated Expected Utility Theory: EU(a) = \\sum P(s\'|a,e) U(s\').',
      'Neuroscience: McCulloch & Pitts (1943) built the first mathematical model of biological synaptic thresholds.',
    ],
    examAnswer: [
      'List and elaborate at least 4 contributing disciplines: Philosophy, Mathematics, Economics, Neuroscience/Cognitive Science.',
      'For Mathematics: Mention Logic (Boolean/Predicate), Computability (Turing machines, NP-completeness), and Probability (Bayes).',
      'For Economics: Cite Decision Theory and von Neumann-Morgenstern Expected Utility Theory.',
      'For Neuroscience: Note the McCulloch-Pitts artificial neuron model (1943) simulating biological synaptic thresholds.',
    ],
    slip: 'Do not just write "computers make AI". AI is primarily a mathematical and cognitive framework; computing hardware is merely the execution substrate.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'INTERDISCIPLINARY PILLARS OF AI', 'ta') +
          C(180, 100, 36, 'fa') +
          T(180, 96, 'AI', 't', 'middle') +
          T(180, 110, 'CORE', 'ta', 'middle') +
          R(20, 26, 100, 34) +
          T(70, 48, 'Philosophy', 't', 'middle') +
          LA(110, 60, 150, 84, 'a') +
          R(240, 26, 100, 34) +
          T(290, 48, 'Mathematics', 't', 'middle') +
          LA(250, 60, 210, 84, 'a') +
          R(15, 136, 105, 34) +
          T(67, 158, 'Neuroscience', 't', 'middle') +
          LA(115, 140, 150, 116, 'a') +
          R(240, 136, 105, 34) +
          T(292, 158, 'Economics', 't', 'middle') +
          LA(245, 140, 210, 116, 'a') +
          T(180, 182, 'Logic · Computability · Utility · Neurons', 'ta', 'middle')
      ),
      caption: 'Interdisciplinary foundational pillars converging into modern Artificial Intelligence.',
    },
  },

  'ai:0:2': {
    explain: [
      'An agent is anything that perceives its environment through sensors and acts upon that environment through actuators.',
      'Rational agents act so as to achieve the best outcome or best expected outcome under uncertainty. PEAS (Performance measure, Environment, Actuators, Sensors) is the mandatory formal specification for any intelligent agent.',
    ],
    definition:
      'An intelligent agent is an autonomous entity that directs its activity towards achieving goals by perceiving its environment through sensors and executing actions via actuators. Its specification is formally defined using the PEAS framework.',
    formula: 'f: \\mathcal{P}^* \\longrightarrow \\mathcal{A}, \\quad \\text{Agent} = \\text{Architecture} + \\text{Program}',
    steps: [
      'Percept Sequence: Complete historical sequence of everything the agent has perceived (\\mathcal{P}^*).',
      'Rationality criteria: Depends on the performance measure, prior knowledge of environment, available actions, and percept sequence to date.',
      'Performance Measure: Objective external metric for measuring success, designed around desired environmental states (not internal agent motions).',
      'Automated Taxi PEAS: P = safe, fast, legal, comfortable, max profit; E = roads, traffic, pedestrians, weather; A = steering, accelerator, brake, horn; S = cameras, sonar, speedometer, GPS, accelerometer.',
      'Vacuum Cleaner PEAS: P = cleanliness, power efficiency, time; E = floor, obstacles, dirt; A = wheels, brushes, suction motor; S = bump sensor, dirt sensor, cliff sensor.',
    ],
    examAnswer: [
      'Draw the Agent-Environment feedback loop with Sensors, Percepts, Actuators, Actions.',
      'State the formula f: P* -> A and define Percept Sequence vs Instantaneous Percept.',
      'Define Rationality: maximizing expected performance measure, distinct from omniscience, clairvoyance, or success.',
      'Construct a complete 4-column PEAS table for an assigned system (e.g. Automated Taxi or Vacuum Cleaner).',
    ],
    slip: 'Do not confuse the agent function (mathematical abstract mapping) with the agent program (the concrete runnable code). Never design performance measures based on agent behavior; design them around real-world environmental outcomes.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'AGENT-ENVIRONMENT INTERACTION & PEAS', 'ta') +
          R(30, 40, 110, 90) +
          T(85, 68, 'AGENT', 't', 'middle') +
          T(85, 88, 'Agent Program', 'ta', 'middle') +
          T(85, 108, 'f: P* -> A', 't', 'middle') +
          R(220, 40, 110, 90) +
          T(275, 78, 'ENVIRONMENT', 't', 'middle') +
          T(275, 98, '(World / Domain)', 'ta', 'middle') +
          LA(220, 60, 140, 60, 'a') +
          T(180, 52, 'Sensors (Percepts)', 'ta', 'middle') +
          LA(140, 110, 220, 110, 'a') +
          T(180, 126, 'Actuators (Actions)', 'ta', 'middle') +
          R(20, 148, 320, 32) +
          T(30, 168, 'PEAS:', 'ta') +
          T(75, 168, 'Performance · Environment · Actuators · Sensors', 't')
      ),
      caption: 'Agent-Environment interaction loop and PEAS structural taxonomy.',
    },
  },

  'ai:0:3': {
    explain: [
      'The character of the environment largely dictates the design and complexity of the agent program.',
      'Russell & Norvig classify environments along six fundamental orthogonal dimensions: Observable, Deterministic, Episodic, Static, Discrete, and Single-agent.',
    ],
    definition:
      'Environment classification is the systematic categorization of an agent’s operating domain across observability, determinism, episodic nature, dynamism, discreteness, and agent population to dictate appropriate algorithmic architecture.',
    formula: '\\text{Hardest Environment} = \\text{Partially Observable} + \\text{Stochastic} + \\text{Sequential} + \\text{Dynamic} + \\text{Continuous} + \\text{Multi-Agent}',
    steps: [
      'Fully vs Partially Observable: Can sensors detect the complete environmental state at each point in time? (Chess = Fully; Driving = Partially).',
      'Deterministic vs Stochastic: Is next state completely determined by current state and action? (Chess = Deterministic; Taxi driving = Stochastic).',
      'Episodic vs Sequential: Does current decision affect future decisions? (Part inspection = Episodic; Maze = Sequential).',
      'Static vs Dynamic: Does environment change while agent is deliberating? (Crossword = Static; Driving = Dynamic).',
      'Discrete vs Continuous: Are states, time, and actions distinct or continuous? (Chess = Discrete; Steering = Continuous).',
      'Single-Agent vs Multi-Agent: Is agent acting alone or with competitors/collaborators? (Crossword = Single; Chess = Multi-agent).',
    ],
    examAnswer: [
      'List all 6 environment dimensions precisely.',
      'Define each dimension with both ends of the spectrum.',
      'Give a comparative matrix: Chess (Fully obs, Det, Seq, Semi-dynamic/Static, Disc, Multi) vs Autonomous Driving (Partially obs, Stoch, Seq, Dynamic, Cont, Multi).',
      'Conclude that the real world (driving, robotics) is the hardest possible combination.',
    ],
    slip: 'Do not classify an environment as "stochastic" just because the agent lacks full knowledge; if the underlying physical transition is strictly deterministic but hidden, it is partially observable, not stochastic.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE 6 TAXONOMIC DIMENSIONS OF ENVIRONMENTS', 'ta') +
          R(20, 30, 150, 40) +
          T(30, 46, 'Observability:', 'ta') +
          T(30, 62, 'Full vs Partial', 't') +
          R(190, 30, 150, 40) +
          T(200, 46, 'Determinism:', 'ta') +
          T(200, 62, 'Deterministic vs Stoch.', 't') +
          R(20, 78, 150, 40) +
          T(30, 94, 'Episodic vs Seq:', 'ta') +
          T(30, 110, 'Independent vs Linked', 't') +
          R(190, 78, 150, 40) +
          T(200, 94, 'Dynamism:', 'ta') +
          T(200, 110, 'Static vs Dynamic', 't') +
          R(20, 126, 150, 40) +
          T(30, 142, 'Discreteness:', 'ta') +
          T(30, 158, 'Discrete vs Continuous', 't') +
          R(190, 126, 150, 40) +
          T(200, 142, 'Agent Count:', 'ta') +
          T(200, 158, 'Single vs Multi-Agent', 't') +
          T(180, 182, 'Easiest: Fully Obs, Det, Episodic, Static, Discrete, Single', 'ta', 'middle')
      ),
      caption: 'The 6 fundamental environmental dimensions with representative domain classifications.',
    },
  },

  'ai:0:4': {
    explain: [
      'Agent programs are structured into five architectural tiers of increasing capability: Simple Reflex Agents, Model-Based Reflex Agents, Goal-Based Agents, Utility-Based Agents, and Learning Agents.',
      'Simple Reflex agents map directly via if-then rules; Model-Based agents track hidden state; Goal-Based agents plan trajectories; Utility-Based agents balance trade-offs; Learning agents adapt from experience.',
    ],
    definition:
      'Agent architectures define the internal control structure and decision pipeline of an agent program, ranging from stateless condition-action mappings to internal state tracking, goal planning, utility optimization, and adaptive self-learning.',
    formula: '\\text{Utility: } U: \\mathcal{S} \\to \\mathbb{R}, \\quad a^* = \\arg\\max_a \\sum_{s\'} P(s\' \\mid s, a) U(s\')',
    steps: [
      'Simple Reflex Agent: Direct condition-action rules. Memoryless; infinite loops in partially observable domains.',
      'Model-Based Reflex Agent: Maintains internal state reflecting hidden history using transition and sensor models.',
      'Goal-Based Agent: Evaluates whether future states achieve an explicit goal using forward search and planning.',
      'Utility-Based Agent: Maps states to a real-valued utility U(s), allowing trade-offs when conflicting goals exist.',
      'Learning Agent: Composed of Learning Element (makes improvements), Critic (evaluates performance), Learning Goals, and Performance Element (selects actions).',
    ],
    examAnswer: [
      'Enumerate the 5 agent types in strict hierarchical order.',
      'Draw clear block diagrams for Model-Based and Learning Agents (showing Critic, Learning Element, Performance Element, Problem Generator).',
      'State the crucial limitation of Simple Reflex agents (infinite loops when unobservable).',
      'Explain why Utility-Based agents are required instead of pure Goal-Based agents (trade-off optimization and handling uncertainty).',
    ],
    slip: 'In learning agents, remember that the "Critic" evaluates behavior against an EXTERNAL performance standard, NOT against the agent’s own internal preferences.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE 5 AGENT ARCHITECTURAL TIERS', 'ta') +
          R(20, 32, 140, 24) +
          T(90, 48, '1. Simple Reflex', 't', 'middle') +
          LA(160, 44, 200, 44, 'a') +
          T(210, 48, 'Condition-Action', 'ta') +
          R(20, 62, 140, 24) +
          T(90, 78, '2. Model-Based', 't', 'middle') +
          LA(160, 74, 200, 74, 'a') +
          T(210, 78, 'Internal State + History', 'ta') +
          R(20, 92, 140, 24) +
          T(90, 108, '3. Goal-Based', 't', 'middle') +
          LA(160, 104, 200, 104, 'a') +
          T(210, 108, 'Planning & Search', 'ta') +
          R(20, 122, 140, 24) +
          T(90, 138, '4. Utility-Based', 't', 'middle') +
          LA(160, 134, 200, 134, 'a') +
          T(210, 138, 'Trade-offs: Max U(s)', 'ta') +
          R(20, 152, 140, 26, 'fa') +
          T(90, 169, '5. Learning Agent', 't', 'middle') +
          LA(160, 165, 200, 165, 'a') +
          T(210, 169, 'Critic + Learning Element', 'ta')
      ),
      caption: 'The 5-tier evolutionary architectural ladder of intelligent agents.',
    },
  },

  'ai:0:5': {
    explain: [
      'Artificial Intelligence has transformed foundational engineering disciplines, enabling autonomous navigation, automated structural defect recognition, electrical grid load balancing, automated compiler optimization, and biomedical robotic interventions.',
      'Engineering AI bridges physical sensing (IoT/SCADA) with statistical pattern recognition and closed-loop control.',
    ],
    definition:
      'AI engineering applications represent the domain-specific integration of perception, reasoning, pattern recognition, and autonomous control algorithms into industrial, structural, mechanical, electrical, and computational systems.',
    formula: '\\text{Industrial Impact} = \\text{Perception (Vision/Sensors)} + \\text{Optimization} + \\text{Predictive Maintenance}',
    steps: [
      'Civil/Structural: Automated crack detection via UAV inspection drones and GAN-driven structural generative design.',
      'Electrical Engineering: SCADA smart grids use ML for peak load forecasting and dynamic solar/wind generation balancing.',
      'Mechanical Systems: Digital Twins predict Remaining Useful Life (RUL) of high-speed turbine bearings using vibration FFT analysis.',
      'Computer Engineering: Branch prediction, compiler loop unrolling, and automated fuzzing for software vulnerabilities.',
      'Biomedical Engineering: AlphaFold protein structure prediction and automated radiographic tumor segmentation.',
    ],
    examAnswer: [
      'Structure the answer across at least 4 engineering branches: Civil, Electrical, Mechanical, and Biomedical.',
      'Provide concrete engineering examples for each: e.g. RUL vibration analysis for mechanical, SCADA smart grid forecasting for electrical.',
      'Explain the role of Digital Twins: physics-based simulation paired with real-time sensor updates for predictive optimization.',
    ],
    slip: 'Do not give vague commercial examples like "e-commerce shopping recommendations". LNJPIT engineering exams require physical engineering examples (structural health, electrical distribution, robotics).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'CROSS-ENGINEERING APPLICATIONS OF AI', 'ta') +
          R(20, 32, 95, 60) +
          T(67, 52, 'Civil / Mech', 't', 'middle') +
          T(67, 70, 'Defect Detection', 'ta', 'middle') +
          T(67, 84, 'Digital Twins', 't', 'middle') +
          R(132, 32, 95, 60) +
          T(179, 52, 'Electrical', 't', 'middle') +
          T(179, 70, 'Smart Grids', 'ta', 'middle') +
          T(179, 84, 'Load Forecast', 't', 'middle') +
          R(245, 32, 95, 60) +
          T(292, 52, 'Comp Sci', 't', 'middle') +
          T(292, 70, 'Compilers', 'ta', 'middle') +
          T(292, 84, 'Auto-Sec / NLP', 't', 'middle') +
          R(75, 108, 100, 56) +
          T(125, 128, 'Biomedical', 't', 'middle') +
          T(125, 146, 'AlphaFold / MRI', 'ta', 'middle') +
          R(195, 108, 100, 56) +
          T(245, 128, 'Robotics', 't', 'middle') +
          T(245, 146, 'Path Planning', 'ta', 'middle') +
          T(180, 180, 'Core: Perception · Optimization · Autonomous Action', 'ta', 'middle')
      ),
      caption: 'Cross-disciplinary engineering applications powered by AI core technologies.',
    },
  },
};
