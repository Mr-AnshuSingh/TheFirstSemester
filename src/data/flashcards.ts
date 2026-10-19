import { Flashcard } from '@/types/syllabus';

export const FLASHCARDS: Flashcard[] = [
  // Mathematics-I (5 units)
  {
    id: 'fc-math-0',
    subjectId: 'math',
    unitIndex: 0,
    unitTitle: 'Basic Linear Algebra',
    front: 'Cayley–Hamilton Theorem & Matrix Inverses',
    back: 'Every square matrix A satisfies its own characteristic equation: |A − λI| = 0. To calculate A⁻¹, multiply the equation by A⁻¹ and isolate A⁻¹ in terms of powers of A.',
    category: 'theorem'
  },
  {
    id: 'fc-math-1',
    subjectId: 'math',
    unitIndex: 1,
    unitTitle: 'Differential Calculus: Single Variable',
    front: 'Leibnitz Theorem for n-th Derivative of a Product',
    back: '(uv)ₙ = ∑ᵣ₌₀ⁿ (ⁿCᵣ) uₙ₋ᵣ vᵣ = uₙv + n uₙ₋₁v₁ + [n(n-1)/2!] uₙ₋₂v₂ + ... + uvₙ',
    category: 'formula'
  },
  {
    id: 'fc-math-2',
    subjectId: 'math',
    unitIndex: 2,
    unitTitle: 'Differential Calculus: Several Variables',
    front: 'Second Derivative Test for Several Variables',
    back: 'Let r = f_xx, s = f_xy, t = f_yy at stationary point.\n• rt − s² > 0 and r < 0: Local Maximum\n• rt − s² > 0 and r > 0: Local Minimum\n• rt − s² < 0: Saddle Point\n• rt − s² = 0: Test Inconclusive',
    category: 'definition'
  },
  {
    id: 'fc-math-3',
    subjectId: 'math',
    unitIndex: 3,
    unitTitle: 'Integral Calculus',
    front: 'Beta and Gamma Relation & Values',
    back: 'B(m, n) = Γ(m)Γ(n) / Γ(m + n)\nΓ(1/2) = √π\nΓ(n + 1) = n Γ(n) = n! for integer n\nB(m, n) = 2 ∫₀^(π/2) sin^(2m-1)θ cos^(2n-1)θ dθ',
    category: 'formula'
  },
  {
    id: 'fc-math-4',
    subjectId: 'math',
    unitIndex: 4,
    unitTitle: 'Vector Calculus',
    front: 'Stokes’ Theorem & Gauss Divergence Theorem',
    back: 'Stokes: ∮ F · dr = ∬ (∇ × F) · n̂ dS (circulation around boundary = curl through surface)\nGauss: ∯ F · n̂ dS = ∭ (∇ · F) dV (outward flux through closed surface = divergence through volume)',
    category: 'theorem'
  },

  // Engineering Physics (6 units)
  {
    id: 'fc-phy-0',
    subjectId: 'phy',
    unitIndex: 0,
    unitTitle: 'Harmonic Oscillations & Waves',
    front: 'Quality Factor Q of Oscillating Systems',
    back: 'Q = 2π × (Energy stored / Energy lost per cycle) = ω₀ / (2γ) = ω₀ / (Δω_FWHM)\nHigh Q means sharp resonance and minimal energy dissipation.',
    category: 'definition'
  },
  {
    id: 'fc-phy-1',
    subjectId: 'phy',
    unitIndex: 1,
    unitTitle: 'Wave Optics, Lasers & Optical Fibres',
    front: 'Numerical Aperture (NA) & Acceptance Angle',
    back: 'NA = sin θ₀ = √(n₁² − n₂²)\nAcceptance Angle: θ₀ = arcsin(√(n₁² − n₂²))\nFractional index difference: Δ = (n₁ − n₂)/n₁\nNA ≈ n₁ √(2Δ)',
    category: 'formula'
  },
  {
    id: 'fc-phy-2',
    subjectId: 'phy',
    unitIndex: 2,
    unitTitle: 'Electromagnetic Theory & Dielectrics',
    front: 'Maxwell\'s 4 Equations in Differential Form',
    back: '1. ∇ · D = ρ (Gauss\'s Law for E)\n2. ∇ · B = 0 (No magnetic monopoles)\n3. ∇ × E = −∂B/∂t (Faraday\'s Law)\n4. ∇ × H = J + ∂D/∂t (Ampere-Maxwell Law with displacement current)',
    category: 'formula'
  },
  {
    id: 'fc-phy-3',
    subjectId: 'phy',
    unitIndex: 3,
    unitTitle: 'Quantum Mechanics & Wave-Particle Duality',
    front: 'Particle in a 1D Box Wavefunction & Energy',
    back: 'ψₙ(x) = √(2/L) sin(nπx / L) for 0 ≤ x ≤ L\nEₙ = n²h² / (8mL²) = n²π²ħ² / (2mL²)\nEnergy ratios: 1 : 4 : 9 : 16. Lowest state n = 1 has non-zero ground-state energy.',
    category: 'formula'
  },
  {
    id: 'fc-phy-4',
    subjectId: 'phy',
    unitIndex: 4,
    unitTitle: 'Solid State & Semiconductor Physics',
    front: 'Fermi–Dirac Distribution & Band Gaps',
    back: 'f(E) = 1 / [1 + exp((E − E_F)/(k_B T))]\nAt T = 0 K, states below E_F are completely filled (f=1) and above are empty (f=0).\nSilicon bandgap: ~1.12 eV. Germanium: ~0.67 eV.',
    category: 'definition'
  },
  {
    id: 'fc-phy-5',
    subjectId: 'phy',
    unitIndex: 5,
    unitTitle: 'Nanomaterials & Superconductivity',
    front: 'Meissner Effect & London Penetration Depth',
    back: 'Meissner Effect: Perfect diamagnetism inside a superconductor (B = 0, χ = −1).\nMagnetic fields decay inside the surface over London penetration depth λ_L: B(x) = B₀ exp(−x/λ_L).',
    category: 'theorem'
  },

  // BEEE (6 units)
  {
    id: 'fc-beee-0',
    subjectId: 'beee',
    unitIndex: 0,
    unitTitle: 'DC Circuits',
    front: 'Thevenin and Norton Equivalents',
    back: 'Thevenin: V_th (open-circuit voltage across terminals) in series with R_th (internal resistance with independent sources zeroed).\nNorton: I_n = V_th / R_th (short-circuit current) in parallel with R_th.',
    category: 'theorem'
  },
  {
    id: 'fc-beee-1',
    subjectId: 'beee',
    unitIndex: 1,
    unitTitle: 'AC Circuits',
    front: 'Series R-L-C Resonance & Power Factor',
    back: 'Resonant frequency: f₀ = 1 / [2π √(LC)]\nAt resonance: X_L = X_C, Z = R (minimum), I is maximum, cos φ = 1 (unity power factor).\nPower factor cos φ = R / Z.',
    category: 'formula'
  },
  {
    id: 'fc-beee-2',
    subjectId: 'beee',
    unitIndex: 2,
    unitTitle: 'Transformers & Rotating Machines',
    front: 'Transformer Induced EMF & Turns Ratio',
    back: 'E₁ = 4.44 f N₁ Φ_m\nE₂ = 4.44 f N₂ Φ_m\nTransformation ratio: K = V₂/V₁ = N₂/N₁ = I₁/I₂\nInduction motor synchronous speed: N_s = 120f / P, slip s = (N_s − N)/N_s',
    category: 'formula'
  },
  {
    id: 'fc-beee-3',
    subjectId: 'beee',
    unitIndex: 3,
    unitTitle: 'Semiconductor Devices & Diodes',
    front: 'BJT Current Equations and Configurations',
    back: 'I_E = I_B + I_C\nα = I_C / I_E, β = I_C / I_B\nβ = α / (1 − α)\nOperating regions: Active (amplifier, EB forward, CB reverse), Saturation (closed switch), Cut-off (open switch).',
    category: 'definition'
  },
  {
    id: 'fc-beee-4',
    subjectId: 'beee',
    unitIndex: 4,
    unitTitle: 'Operational Amplifiers',
    front: 'Op-Amp Inverting and Non-Inverting Gain',
    back: 'Inverting: V_out / V_in = −R_f / R₁ (virtual ground at inverting terminal)\nNon-Inverting: V_out / V_in = 1 + R_f / R₁\nVoltage Follower (buffer): V_out / V_in = 1',
    category: 'formula'
  },
  {
    id: 'fc-beee-5',
    subjectId: 'beee',
    unitIndex: 5,
    unitTitle: 'Electrical Measurements & Instrumentation',
    front: 'PMMC Meter vs Moving Iron (MI)',
    back: 'PMMC: Measures DC only, linear scale, magnetic damping, high sensitivity.\nMoving Iron (MI): Measures both AC and DC (RMS), non-linear cramped scale at start, air friction damping.',
    category: 'definition'
  },

  // AI (5 units)
  {
    id: 'fc-ai-0',
    subjectId: 'ai',
    unitIndex: 0,
    unitTitle: 'Foundations & Intelligent Agents',
    front: 'PEAS Framework & Agent Types',
    back: 'PEAS: Performance measure, Environment, Actuators, Sensors.\nAgent Hierarchy:\n1. Simple reflex (condition-action)\n2. Model-based (internal state)\n3. Goal-based (target planning)\n4. Utility-based (preference optimization)\n5. Learning agent (performance self-improvement)',
    category: 'definition'
  },
  {
    id: 'fc-ai-1',
    subjectId: 'ai',
    unitIndex: 1,
    unitTitle: 'Problem Solving & Search Strategies',
    front: 'A* Algorithm Admissibility & Consistency',
    back: 'Evaluation function: f(n) = g(n) + h(n)\ng(n): cost from start to n; h(n): estimated cost from n to goal.\nAdmissible: h(n) ≤ h*(n) (never overestimates).\nConsistent (monotonic): h(n) ≤ c(n, a, n\') + h(n\'). Guarantees optimal path on graphs without re-opening nodes.',
    category: 'theorem'
  },
  {
    id: 'fc-ai-2',
    subjectId: 'ai',
    unitIndex: 2,
    unitTitle: 'Knowledge Representation & Logic',
    front: 'Forward vs Backward Chaining',
    back: 'Forward chaining: Data-driven. Starts from known ground facts, fires matching rules, adds conclusions to facts until goal is derived.\nBackward chaining: Goal-driven. Starts from goal hypothesis, seeks rules concluding the goal, recursively proves required sub-goals.',
    category: 'definition'
  },
  {
    id: 'fc-ai-3',
    subjectId: 'ai',
    unitIndex: 3,
    unitTitle: 'Machine Learning & Neural Networks',
    front: 'Perceptron Learning & Linear Separability',
    back: 'Single-layer perceptron: y = f(∑ w_i x_i + b)\nConvergence theorem: If training data is linearly separable, perceptron learning rule converges to zero training error in finite steps.\nLimitation: Cannot learn non-linearly separable logic functions like XOR without hidden layers.',
    category: 'theorem'
  },
  {
    id: 'fc-ai-4',
    subjectId: 'ai',
    unitIndex: 4,
    unitTitle: 'Natural Language, Ethics & Future of AI',
    front: 'Turing Test & Algorithmic Fairness',
    back: 'Turing Test: Imitation game where human interrogator communicates via text with human and machine. If judge cannot tell them apart > 30% of the time, machine passes.\nAI Bias: Arises from training dataset skew, measurement errors, or feedback loops. Requires auditing across demographic sub-groups.',
    category: 'definition'
  },

  // CFET (5 units)
  {
    id: 'fc-cfet-0',
    subjectId: 'cfet',
    unitIndex: 0,
    unitTitle: 'Computer Architecture & Organization',
    front: 'Von Neumann Architecture & Fetch-Decode-Execute',
    back: 'Von Neumann: Shared memory holds both program instructions and user data.\nCPU instruction cycle:\n1. Fetch (PC -> MAR -> Memory -> MBR -> IR, PC++)\n2. Decode (Control Unit decodes opcode)\n3. Execute (ALU performs computation or branch)\n4. Store (Result written to register or memory)',
    category: 'definition'
  },
  {
    id: 'fc-cfet-1',
    subjectId: 'cfet',
    unitIndex: 1,
    unitTitle: 'Data Representation & Digital Logic',
    front: 'Two\'s Complement Rule & Range',
    back: 'To negate a number: invert all bits (one\'s complement) and add 1.\nRange of n-bit signed integer: −2ⁿ⁻¹ to +2ⁿ⁻¹ − 1\nFor 8 bits: −128 to +127.\nSubtraction A − B is implemented in hardware as A + (2\'s complement of B).',
    category: 'formula'
  },
  {
    id: 'fc-cfet-2',
    subjectId: 'cfet',
    unitIndex: 2,
    unitTitle: 'Operating Systems & Systems Software',
    front: 'Process States & Virtual Memory Paging',
    back: '5-State Process Model: New -> Ready <-> Running -> Terminated (or Running -> Waiting -> Ready).\nVirtual Memory: Translates virtual addresses to physical addresses via Page Tables. Avoids external memory fragmentation and isolates process memory spaces.',
    category: 'definition'
  },
  {
    id: 'fc-cfet-3',
    subjectId: 'cfet',
    unitIndex: 3,
    unitTitle: 'Computer Networks & Internet Technologies',
    front: 'OSI 7 Layers vs TCP/IP Protocol Suite',
    back: 'OSI 7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.\nTCP vs UDP:\n• TCP: Connection-oriented, 3-way handshake (SYN, SYN-ACK, ACK), reliable, flow control.\n• UDP: Connectionless, unreliable, low-overhead, ideal for real-time media and DNS.',
    category: 'definition'
  },
  {
    id: 'fc-cfet-4',
    subjectId: 'cfet',
    unitIndex: 4,
    unitTitle: 'Emerging Technologies & Cloud Computing',
    front: 'Cloud Service Models: IaaS, PaaS, SaaS',
    back: '• IaaS (Infrastructure as a Service): Raw virtual compute, storage, networking (AWS EC2, GCE).\n• PaaS (Platform as a Service): Managed runtime environment and deployment platform (Vercel, Heroku).\n• SaaS (Software as a Service): Ready-to-use end-user software (Google Docs, Office 365).',
    category: 'definition'
  },

  // EIC (5 units)
  {
    id: 'fc-eic-0',
    subjectId: 'eic',
    unitIndex: 0,
    unitTitle: 'Historical Background & Philosophy',
    front: 'Key Preamble Pillars & Drafting Assembly',
    back: 'Drafting Committee Chairman: Dr. B.R. Ambedkar.\nConstitution adopted: 26 November 1949; in effect: 26 January 1950.\nPreamble Pillars: Sovereign, Socialist, Secular, Democratic, Republic; Justice, Liberty, Equality, Fraternity.',
    category: 'definition'
  },
  {
    id: 'fc-eic-1',
    subjectId: 'eic',
    unitIndex: 1,
    unitTitle: 'Fundamental Rights & Enforcement',
    front: 'Article 32 & The Five Constitutional Writs',
    back: 'Article 32: Right to Constitutional Remedies ("Heart and Soul of the Constitution").\nWrits:\n1. Habeas Corpus: Produce the detained person\n2. Mandamus: Command a public official to perform duty\n3. Prohibition: Restrain inferior tribunal from exceeding jurisdiction\n4. Certiorari: Quash order of inferior body\n5. Quo Warranto: By what legal authority holds office',
    category: 'definition'
  },
  {
    id: 'fc-eic-2',
    subjectId: 'eic',
    unitIndex: 2,
    unitTitle: 'Directive Principles & Fundamental Duties',
    front: 'DPSP (Part IV) vs Fundamental Duties (Part IV-A)',
    back: 'DPSP (Articles 36–51): Non-justiciable socio-economic guidelines for the State borrowed from the Irish Constitution.\nFundamental Duties (Article 51-A): Added by 42nd Amendment (1976), 11 duties reminding citizens of civic responsibilities.',
    category: 'definition'
  },
  {
    id: 'fc-eic-3',
    subjectId: 'eic',
    unitIndex: 3,
    unitTitle: 'Union Government & Federal Structure',
    front: 'Parliamentary Executive & Article 74',
    back: 'Article 74: There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President, who shall act in accordance with such advice.\nMoney Bills: Article 110, can only originate in Lok Sabha with President\'s prior consent.',
    category: 'theorem'
  },
  {
    id: 'fc-eic-4',
    subjectId: 'eic',
    unitIndex: 4,
    unitTitle: 'Judiciary & Constitutional Amendments',
    front: 'Basic Structure Doctrine & Article 368',
    back: 'Kesavananda Bharati case (1973): Parliament has wide powers to amend the Constitution under Article 368, but cannot alter or destroy the "Basic Structure" (Supremacy of Constitution, Rule of Law, Judicial Review, Secularism, Federalism).',
    category: 'theorem'
  },

  // UHV (5 units)
  {
    id: 'fc-uhv-0',
    subjectId: 'uhv',
    unitIndex: 0,
    unitTitle: 'Introduction to Value Education',
    front: 'Self-Exploration Process & Natural Acceptance',
    back: 'Value education proceeds via Self-Exploration: verifying proposals on the basis of Natural Acceptance (innate human desire for harmony) and validating them through living behavior (experiential validation), not through dogmatic beliefs.',
    category: 'definition'
  },
  {
    id: 'fc-uhv-1',
    subjectId: 'uhv',
    unitIndex: 1,
    unitTitle: 'Harmony in the Human Being',
    front: 'Coexistence of Self (\'I\') and Body',
    back: 'Human = \'I\' (Conscious Self) + Body (Material Physio-chemical).\n• \'I\' needs: Continuous happiness, understanding, feelings (trust, respect) — qualitative.\n• Body needs: Food, clothes, shelter (physical facilities) — quantitative and limited.\nSanyama: Self-regulation of \'I\' to protect and nurture the Body.',
    category: 'definition'
  },
  {
    id: 'fc-uhv-2',
    subjectId: 'uhv',
    unitIndex: 2,
    unitTitle: 'Harmony in the Family & Society',
    front: '9 Values in Human Relationships',
    back: '1. Trust (Vishwas) — Foundational value\n2. Respect (Samman) — Right evaluation\n3. Affection (Sneha)\n4. Care (Vatsalya)\n5. Guidance (Shraddha)\n6. Reverence (Gaurav)\n7. Glory (Kritagyata)\n8. Gratitude\n9. Love (Prema) — Complete value',
    category: 'definition'
  },
  {
    id: 'fc-uhv-3',
    subjectId: 'uhv',
    unitIndex: 3,
    unitTitle: 'Harmony in Nature & Existence',
    front: 'Four Orders of Nature & Cyclicity',
    back: '1. Material order (Soil, minerals) — Composition/Decomposition\n2. Bio/Plant order (Trees, plants) — Growth and Respiration\n3. Animal order (Animals, birds) — Feeling of Self + Will to live\n4. Human order — Knowledge-endowed, seeking continuous happiness\nMutual fulfillment: Humans must ensure sustainability rather than exploitation.',
    category: 'definition'
  },
  {
    id: 'fc-uhv-4',
    subjectId: 'uhv',
    unitIndex: 4,
    unitTitle: 'Implications on Professional Ethics',
    front: 'Holistic Technology & Universal Human Order',
    back: 'Professional competence must be guided by value competence: producing technology that is eco-friendly (cyclical, zero hazardous waste), people-friendly (decentralized, preserving human dignity), and sustainable across generations.',
    category: 'viva'
  },

  // PPS Lab (6 units)
  {
    id: 'fc-pps-0',
    subjectId: 'pps',
    unitIndex: 0,
    unitTitle: 'C Fundamentals & Data Types',
    front: 'C Data Types, Sizes and Modifiers',
    back: 'Standard 64-bit systems:\n• char: 1 byte (−128 to 127)\n• int: 4 bytes (−2³¹ to 2³¹−1)\n• float: 4 bytes (IEEE 754 single)\n• double: 8 bytes (IEEE 754 double)\n• pointer: 8 bytes (stores memory address)\nInteger truncation: 7 / 2 = 3; (float)7 / 2 = 3.5',
    category: 'viva'
  },
  {
    id: 'fc-pps-1',
    subjectId: 'pps',
    unitIndex: 1,
    unitTitle: 'Control Flow & Conditionals',
    front: 'Switch-Case Rules & Short-Circuit Evaluation',
    back: 'Switch-Case: Expression must be integer/character. Cases without `break` fall through into subsequent cases.\nShort-circuit:\n• in `A && B`: if A is 0, B is never evaluated.\n• in `A || B`: if A is 1, B is never evaluated.',
    category: 'viva'
  },
  {
    id: 'fc-pps-2',
    subjectId: 'pps',
    unitIndex: 2,
    unitTitle: 'Loops & Iterations',
    front: 'While vs Do-While & Infinite Loop Gotchas',
    back: 'while (cond) {}: Entry-controlled, checks condition before entering body.\ndo {} while (cond);: Exit-controlled, always executes at least once.\nOff-by-one errors: `for(i=0; i<=n; i++)` runs n+1 times.\n`break` terminates loop; `continue` jumps to increment step.',
    category: 'viva'
  },
  {
    id: 'fc-pps-3',
    subjectId: 'pps',
    unitIndex: 3,
    unitTitle: 'Arrays & String Manipulation',
    front: 'Array Memory Layout & Null Terminator',
    back: 'Array name decays to pointer to first element: `arr == &arr[0]`.\nPointer arithmetic: `*(arr + i) == arr[i]`.\nC Strings: Null-terminated character arrays (`\\0`, ASCII 0).\nA string of length L requires an array of size at least L + 1 to store `\\0`.',
    category: 'viva'
  },
  {
    id: 'fc-pps-4',
    subjectId: 'pps',
    unitIndex: 4,
    unitTitle: 'Functions & Pointers',
    front: 'Call by Value vs Reference & Pointer Traps',
    back: 'C is strictly call-by-value. Pass-by-reference is simulated by passing pointer addresses `&x` and dereferencing with `*ptr`.\nDangling pointer: Pointer pointing to deallocated/freed memory.\nMemory leak: Allocated heap memory (`malloc`) not released with `free()`.',
    category: 'viva'
  },
  {
    id: 'fc-pps-5',
    subjectId: 'pps',
    unitIndex: 5,
    unitTitle: 'Structures, Unions & File Handling',
    front: 'Structure Padding & File Modes',
    back: 'struct: Members have separate memory offsets, padded to word boundaries (alignment).\nunion: All members share the same starting memory address; size equals largest member.\nFile modes: "r" (read), "w" (overwrite/create), "a" (append/preserve existing).',
    category: 'viva'
  }
];

export const getFlashcardsForSubject = (subjectId?: string): Flashcard[] => {
  if (!subjectId) return FLASHCARDS;
  return FLASHCARDS.filter((f) => f.subjectId === subjectId);
};
