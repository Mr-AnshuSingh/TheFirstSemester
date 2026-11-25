export interface ChapterMapping {
  subjectCode: string;
  subjectShort: string;
  subjectTitle: string;
  unitNo: number;
  unitTitle: string;
  chapters: {
    chapterNo: number;
    title: string;
    topics: string[];
    weightage: string;
    examTips: string;
  }[];
}

export interface ReadinessPillar {
  id: string;
  label: string;
  weight: number;
  scope: 'core' | 'subject';
  subjectCode?: string;
}

export const READINESS_PILLARS: ReadinessPillar[] = [
  { id: 'p1', label: 'Unit 1 Fundamentals & Definitions Memorized', weight: 6, scope: 'core' },
  { id: 'p2', label: 'Unit 2 Core Derivations & Analytical Formulas Ready', weight: 7, scope: 'core' },
  { id: 'p3', label: 'Unit 3 (Electronics/Multivariable/Magnetism/Logic/AI) Mastered', weight: 8, scope: 'core' },
  { id: 'p4', label: 'Pencil Diagram Practice (Newton Rings, Bridge Rectifier, Saddle Surface, BJT)', weight: 7, scope: 'core' },
  { id: 'p5', label: '4-Box Numericals Format (Given, Formula, Calculation, Units)', weight: 7, scope: 'core' },
  { id: 'p6', label: 'Objective MCQs: 100% Accuracy on Standard BEU 1-Markers', weight: 7, scope: 'core' },
  { id: 'p7', label: 'Thevenin / Norton & Series RLC Resonance Numericals Solved', weight: 6, scope: 'subject', subjectCode: '100111' },
  { id: 'p8', label: 'Eigenvalues & Cayley-Hamilton Inverse A⁻¹ Steps Clear', weight: 7, scope: 'subject', subjectCode: '100102' },
  { id: 'p9', label: 'Leibnitz Theorem Proof for (sin⁻¹ x)² or Standard Forms', weight: 7, scope: 'subject', subjectCode: '100102' },
  { id: 'p10', label: 'Euler Theorem & Extrema rt - s² Multi-variable Rules', weight: 6, scope: 'subject', subjectCode: '100102' },
  { id: 'p11', label: 'Maxwell 4 Equations & Displacement Current Derivation Memorized', weight: 7, scope: 'subject', subjectCode: '100104' },
  { id: 'p12', label: 'AI Search Comparison (BFS vs DFS vs A* Admissibility)', weight: 6, scope: 'subject', subjectCode: '100105' },
  { id: 'p13', label: 'Alpha-Beta Pruning Cutoff Condition (α ≥ β) Trace Ready', weight: 6, scope: 'subject', subjectCode: '100105' },
  { id: 'p14', label: 'CFET 4-Variable K-Map & Number System Conversions Practiced', weight: 6, scope: 'subject', subjectCode: '100108' },
  { id: 'p15', label: 'UHV Trust on Intention vs Competence & 9 Values Articulated', weight: 5, scope: 'subject', subjectCode: '100109' },
];

// Preserved verbatim from existing Mid-Sem Portal syllabus breakdown (fixing &apos; entities in JS strings)
export const SYLLABUS_CHAPTER_MAPPINGS: ChapterMapping[] = [
  // --- CFET (100108) ---
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 1,
    unitTitle: 'Fundamentals of Computing & Architecture',
    chapters: [
      {
        chapterNo: 1,
        title: 'Computer Evolution & Stored Program Concept',
        topics: ['Evolution of Computers (Generations 1-5)', 'Von Neumann Architecture Principle', 'Harvard vs Von Neumann Architecture', 'Von Neumann Bottleneck & Mitigations'],
        weightage: '4 Marks (Compulsory subparts or Q2)',
        examTips: 'Always draw the 4-box block diagram: CPU (ALU + CU + Registers), Memory, I/O, and System Bus.',
      },
      {
        chapterNo: 2,
        title: 'CPU Internal Organization & Registers',
        topics: ['Arithmetic Logic Unit (ALU)', 'Control Unit (Hardwired vs Microprogrammed)', 'Internal Registers: PC, MAR, MDR, IR, Accumulator', 'Fetch-Decode-Execute Cycle'],
        weightage: '4 Marks (Frequent)',
        examTips: 'Explain PC increment step and differentiate between MAR and MDR clearly.',
      },
      {
        chapterNo: 3,
        title: 'Memory Hierarchy, Cache & Secondary Storage',
        topics: ['Memory Hierarchy (Registers → Cache → RAM → SSD/HDD)', 'SRAM vs DRAM comparison', 'Cache Hit Ratio & Average Memory Access Time', 'ROM, PROM, EPROM, EEPROM', 'Compilers, Interpreters & Assemblers'],
        weightage: '4 Marks (Guaranteed Numerical/Concept)',
        examTips: 'Remember the T_avg = h·t_c + (1-h)·t_m numerical formula and the pyramid cost/speed order.',
      },
    ],
  },
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 2,
    unitTitle: 'Data Representation & Number Systems',
    chapters: [
      {
        chapterNo: 1,
        title: 'Number Systems & Base Conversions',
        topics: ['Binary, Octal, Decimal, Hexadecimal Radixes', 'Integer Radix Conversion (Repeated Division)', 'Fractional Radix Conversion (Repeated Multiplication)', 'Direct Binary-Octal (3-bit) and Binary-Hex (4-bit) Grouping'],
        weightage: '4 Marks (Guaranteed in Mid-Sem)',
        examTips: 'Group 3 bits from radix point for octal and 4 bits for hex. Always specify subscripts like (365.125)₁₀.',
      },
      {
        chapterNo: 2,
        title: "Signed Numbers & 2's Complement Arithmetic",
        topics: ['Signed-Magnitude representation', "1's Complement Representation", "2's Complement Subtraction Arithmetic", 'End-Around Carry Rules', 'Hardware Overflow Detection (V = Cin XOR Cout)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: "For 2's complement subtraction (+A) - (+B), compute 2's complement of B, add to A, and discard end carry.",
      },
      {
        chapterNo: 3,
        title: 'Floating Point & Character Encoding',
        topics: ['IEEE 754 32-Bit Single Precision Format (1s, 8e, 23m)', 'Normalized Scientific Representation', 'ASCII (7-bit & 8-bit)', 'Unicode & UTF-8 Encoding'],
        weightage: '1-4 Marks',
        examTips: 'Remember excess-127 exponent bias for IEEE 754 single precision.',
      },
    ],
  },
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 3,
    unitTitle: 'Operating Systems & Digital Logic (Combinational Circuits)',
    chapters: [
      {
        chapterNo: 1,
        title: 'Boolean Algebra & Universal Gates',
        topics: ['Basic Logic Gates (AND, OR, NOT, XOR, XNOR)', "De Morgan's Theorems & Boolean Laws", 'NAND & NOR Universal Gate Realizations', 'Canonical SOP & POS Forms'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Remember: 1 NAND for NOT, 2 NANDs for AND, 3 NANDs for OR.',
      },
      {
        chapterNo: 2,
        title: 'Karnaugh Map (K-Map) Simplification',
        topics: ['2, 3, 4-Variable K-Maps & Gray Code Ordering', "Don't Care Conditions (X)", 'Prime Implicants & Essential Prime Implicants', 'Wrap-around Adjacency Grouping'],
        weightage: '4 Marks (Guaranteed Exam Q)',
        examTips: 'Always label columns in Gray code order: 00, 01, 11, 10! Look for Octets first, then Quads, then Pairs.',
      },
      {
        chapterNo: 3,
        title: 'Combinational & OS Architecture',
        topics: ['Half Adder & Full Adder (using 2 Half Adders)', 'Multiplexers (4:1 MUX) & Decoders', 'Operating System Functions & Process States', 'CLI vs GUI Interfaces & Batch/Timesharing OS'],
        weightage: '4 Marks',
        examTips: 'Verify Full Adder S = A⊕B⊕Cin and Cout = AB + Cin(A⊕B). Draw process state diagram clearly.',
      },
    ],
  },
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 4,
    unitTitle: 'Computer Networks, Protocols & Internet',
    chapters: [
      {
        chapterNo: 1,
        title: 'OSI Model, TCP/IP & Network Topologies',
        topics: ['LAN, MAN, WAN Comparisons', '7-Layer OSI Model & Data Units', 'TCP/IP 4-Layer Suite', 'Network Topologies (Mesh, Star, Bus, Ring)'],
        weightage: '4 Marks',
        examTips: 'Use mnemonic "Please Do Not Throw Sausage Pizza Away" for OSI layers 1 to 7.',
      },
      {
        chapterNo: 2,
        title: 'TCP 3-Way Handshake, Routing & DNS',
        topics: ['TCP vs UDP Differences', 'SYN → SYN-ACK → ACK Connection Handshake', 'IPv4 vs IPv6 Addressing', 'HTTP, HTTPS, FTP, SMTP, DNS Protocols'],
        weightage: '4 Marks',
        examTips: 'Draw the TCP 3-way handshake timing chart between Client and Server.',
      },
    ],
  },
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 5,
    unitTitle: 'Cybersecurity & Emerging Technologies',
    chapters: [
      {
        chapterNo: 1,
        title: 'CIA Triad & Threat Landscape',
        topics: ['Confidentiality, Integrity, Availability (CIA Triad)', 'Malware Types (Ransomware, Trojan, Phishing, Worms)', 'Symmetric (AES) vs Asymmetric (RSA) Cryptography', 'Digital Signatures & Firewalls'],
        weightage: '4 Marks',
        examTips: 'Draw the CIA Triad triangle with real examples (Encryption for Confidentiality, Hashing for Integrity, RAID/Backups for Availability).',
      },
      {
        chapterNo: 2,
        title: 'Cloud, IoT, AI/ML & Blockchain',
        topics: ['Cloud Service Models: IaaS, PaaS, SaaS', 'IoT 4-Layer Architecture', 'Edge vs Cloud Computing', 'Blockchain Immutability & Cryptographic Hash Linking'],
        weightage: '4 Marks',
        examTips: 'Compare IaaS, PaaS, and SaaS with shared responsibility chart and industry examples (AWS EC2, Heroku, Gmail).',
      },
    ],
  },
  // --- BEEE (100111) ---
  {
    subjectCode: '100111',
    subjectShort: 'BEEE',
    subjectTitle: 'Basics of Electrical & Electronics Engineering',
    unitNo: 1,
    unitTitle: 'DC Circuits & Network Theorems',
    chapters: [
      {
        chapterNo: 1,
        title: "Kirchhoff's Laws, Mesh & Nodal Analysis",
        topics: ['KCL & KVL Fundamentals', 'Active vs Passive & Bilateral Elements', 'Mesh Analysis & Supermesh Equations', 'Nodal Analysis & Supernode Equations', 'Star-Delta (Y-Δ) Resistance Transformations'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Always clearly define current directions (mesh currents I_1, I_2 clockwise) before writing KVL equations.',
      },
      {
        chapterNo: 2,
        title: "Thevenin, Norton, Superposition & Maximum Power Transfer",
        topics: ["Thevenin's Theorem (V_th, R_th)", "Norton's Equivalent (I_N = V_th / R_th)", 'Superposition Theorem (Independent Sources)', 'Maximum Power Transfer Theorem (R_L = R_th, η = 50%)'],
        weightage: '4 Marks (Guaranteed Numerical)',
        examTips: 'To find R_th: turn off all independent voltage sources (short circuit) and current sources (open circuit).',
      },
    ],
  },
  {
    subjectCode: '100111',
    subjectShort: 'BEEE',
    subjectTitle: 'Basics of Electrical & Electronics Engineering',
    unitNo: 2,
    unitTitle: 'Single-Phase & Three-Phase AC Circuits',
    chapters: [
      {
        chapterNo: 1,
        title: 'Sinusoidal Waveforms, Phasors & Series RLC',
        topics: ['RMS, Average, Form Factor (1.11) & Peak Factor (1.414)', 'Phasor Algebra & Complex Impedance Z = R + j(X_L - X_C)', 'Series RLC Resonance (f_0 = 1 / [2π√(LC)], Q-Factor)', 'Active (P), Reactive (Q) & Apparent Power (S) Triangles'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Sketch the impedance triangle and power triangle neatly; specify lagging (X_L > X_C) vs leading (X_C > X_L).',
      },
      {
        chapterNo: 2,
        title: '3-Phase AC Systems (Star & Delta)',
        topics: ['Star Connection: V_L = √3 V_ph, I_L = I_ph', 'Delta Connection: V_L = V_ph, I_L = √3 I_ph', 'Three-Phase Power Formula: P = √3 V_L I_L cosφ', 'Two-Wattmeter Method for 3-Phase Power & Power Factor'],
        weightage: '4 Marks',
        examTips: 'Show vector phasor derivation for V_RY = V_R - V_Y = √3 V_ph ∠30° in Star systems.',
      },
    ],
  },
  {
    subjectCode: '100111',
    subjectShort: 'BEEE',
    subjectTitle: 'Basics of Electrical & Electronics Engineering',
    unitNo: 3,
    unitTitle: 'Transformers, Rotating Machines & Analog Semiconductors',
    chapters: [
      {
        chapterNo: 1,
        title: 'Single-Phase Transformers',
        topics: ['EMF Equation: E = 4.44 f N Φ_m', 'Ideal Transformer Ratios', 'Transformer Core (Hysteresis & Eddy) & Copper Losses', 'Condition for Max Efficiency (P_cu = P_i)'],
        weightage: '4 Marks',
        examTips: 'Specify RMS voltage ratio K = V_2/V_1 = N_2/N_1 = I_1/I_2 cleanly.',
      },
      {
        chapterNo: 2,
        title: 'P-N Junction Diode, Rectifiers & Zener Regulator',
        topics: ['Intrinsic vs Extrinsic (N-type, P-type)', 'P-N Junction Depletion Layer & Barrier Potential (0.7V Si)', 'Half-Wave Rectifier (η=40.6%, γ=1.21)', 'Full-Wave Bridge Rectifier (η=81.2%, γ=0.482, PIV=V_m)', 'Zener Voltage Regulator Design'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Draw the 4-diode bridge bridge cleanly showing current path for both positive and negative half-cycles.',
      },
      {
        chapterNo: 3,
        title: 'BJT NPN/PNP Transistors & Configurations',
        topics: ['BJT Emitter, Base, Collector Doping & Width', 'NPN vs PNP Operations & Active/Cutoff/Saturation Modes', 'CB, CE, CC Characteristics & α, β Equations (β = α/(1-α))', 'CE Amplifier DC Load Line & Q-Point'],
        weightage: '4 Marks',
        examTips: 'Check arrow direction: NPN points Outward ("Not Pointing iN"), PNP points Inward.',
      },
    ],
  },
  // --- Math-I (100102) ---
  {
    subjectCode: '100102',
    subjectShort: 'Math-I',
    subjectTitle: 'Engineering Mathematics – I',
    unitNo: 1,
    unitTitle: 'Matrices & Linear Algebra',
    chapters: [
      {
        chapterNo: 1,
        title: 'Rank of Matrix & System Consistency',
        topics: ['Row-Echelon Form & Elementary Transformations', 'Normal Form PAQ = [I_r 0; 0 0]', 'Rouche-Capelli Consistency Criterion: ρ(A) = ρ([A|B])', 'Homogeneous Linear Systems (Trivial vs Infinite Solutions)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Always convert matrix into upper triangular echelon form to inspect rank accurately before declaring consistency.',
      },
      {
        chapterNo: 2,
        title: 'Eigenvalues, Eigenvectors & Cayley-Hamilton',
        topics: ['Characteristic Equation |A - λI| = 0', 'Finding Eigenvectors (A - λI)X = 0', 'Cayley-Hamilton Theorem Verification', 'Matrix Inversion A⁻¹ and High Powers (A⁵, A⁻²) via C-H Theorem'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Verify your eigenvalues! The sum of eigenvalues equals the Trace (Σ a_ii) and the product equals Det(A).',
      },
    ],
  },
  {
    subjectCode: '100102',
    subjectShort: 'Math-I',
    subjectTitle: 'Engineering Mathematics – I',
    unitNo: 2,
    unitTitle: 'Differential Calculus – I',
    chapters: [
      {
        chapterNo: 1,
        title: 'Successive Differentiation & Leibnitz Theorem',
        topics: ['n-th Derivative Standard Formulas', "Leibnitz's Theorem: (uv)_n = Σ C(n,r) u_{n-r} v_r", 'Differential Equation Recurrence Proofs ((1-x²)y₂ - xy₁ - m²y = 0)', 'Evaluating y_n(0) via Parity Induction'],
        weightage: '4 Marks (Guaranteed Exam Q)',
        examTips: 'Choose u as the polynomial/power term (e.g., 1-x²) so its 3rd derivative vanishes cleanly.',
      },
      {
        chapterNo: 2,
        title: 'Mean Value Theorems & Taylor Series',
        topics: ["Rolle's Theorem", "Lagrange's Mean Value Theorem (LMVT)", "Cauchy's Mean Value Theorem (CMVT)", 'Taylor & Maclaurin Series Expansions'],
        weightage: '4 Marks',
        examTips: 'Verify all 3 hypotheses (Continuity on [a,b], Differentiability on (a,b)) before finding c.',
      },
      {
        chapterNo: 3,
        title: "L'Hopital's Rule, Asymptotes & Curvature",
        topics: ['Indeterminate Forms (0/0, ∞/∞, 0^0, 1^∞)', 'Asymptotes (Parallel & Oblique via Highest Degree Coefficients)', 'Radius of Curvature ρ = [1 + (y₁)²]^(3/2) / |y₂|'],
        weightage: '4 Marks',
        examTips: 'Use logarithmic substitution L = lim f(x)^g(x) → ln L = lim g(x) ln f(x) for exponential indeterminates.',
      },
    ],
  },
  {
    subjectCode: '100102',
    subjectShort: 'Math-I',
    subjectTitle: 'Engineering Mathematics – I',
    unitNo: 3,
    unitTitle: 'Multivariable Calculus (Calculus – II)',
    chapters: [
      {
        chapterNo: 1,
        title: "Partial Differentiation & Euler's Homogeneous Theorem",
        topics: ["First & Higher Partial Derivatives", "Euler's Theorem for Degree n: x ∂u/∂x + y ∂u/∂y = nu", 'Euler Corollary for Composite Functions', 'Total Derivative Chain Rule'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'If f(x,y) is not explicitly homogeneous (like u = sin⁻¹(...)), pass it through the inverse function first: z = sin u!',
      },
      {
        chapterNo: 2,
        title: 'Jacobians & Functional Dependence',
        topics: ['Jacobian Matrix J(u,v / x,y)', 'Chain Rule Property: J · J* = 1', 'Jacobian for Polar/Spherical Transforms (r, r²sinθ)', 'Functional Dependence Condition (J = 0)'],
        weightage: '4 Marks',
        examTips: 'For 3 variables, compute 3×3 determinant carefully along columns.',
      },
      {
        chapterNo: 3,
        title: 'Maxima, Minima & Lagrange Multipliers',
        topics: ['Stationary Points (p=0, q=0)', 'Second Derivative Test (r, s, t; rt - s² > 0 classification)', 'Saddle Points (rt - s² < 0)', "Lagrange's Method of Undetermined Multipliers F = f + λφ"],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Clearly write r = f_xx, s = f_xy, t = f_yy and check Δ = rt - s² at each critical point.',
      },
    ],
  },
  // --- Physics (100104) ---
  {
    subjectCode: '100104',
    subjectShort: 'Physics',
    subjectTitle: 'Engineering Physics',
    unitNo: 1,
    unitTitle: 'Wave Optics (Interference, Diffraction & Polarization)',
    chapters: [
      {
        chapterNo: 1,
        title: "Interference: Thin Films & Newton's Rings",
        topics: ["Coherent Sources & Stokes' Phase Shift π", 'Thin Film Interference Path Difference 2μt cos r', "Newton's Rings Dark Center & Ring Diameters D_n² = 4nλR", "Determination of Wavelength λ & Liquid Refractive Index μ"],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Always state that extra path difference λ/2 occurs at air-glass reflection, making zero-thickness center dark.',
      },
      {
        chapterNo: 2,
        title: 'Fraunhofer Diffraction & Diffraction Grating',
        topics: ['Single Slit Intensity I = I₀(sin α / α)²', 'Secondary Maxima Intensity Ratio (~4.5%)', 'Plane Transmission Diffraction Grating (a+b)sinθ = nλ', 'Rayleigh Criterion & Resolving Power (R = nN)'],
        weightage: '4 Marks',
        examTips: 'Remember grating element e = 1/N in cm when lines/cm is given!',
      },
      {
        chapterNo: 3,
        title: 'Polarization, Double Refraction & Nicol Prism',
        topics: ["Brewster's Law (tan i_p = μ) & Malus's Law (I = I₀cos²θ)", 'Double Refraction (O-ray vs E-ray)', 'Nicol Prism Principle (Total Internal Reflection via Canada Balsam)', 'Quarter Wave Plate (λ/4) & Half Wave Plate (λ/2)'],
        weightage: '4 Marks',
        examTips: 'Show Canada Balsam refractive index (1.55) lies strictly between n_o (1.658) and n_e (1.486) in Calcite.',
      },
    ],
  },
  {
    subjectCode: '100104',
    subjectShort: 'Physics',
    subjectTitle: 'Engineering Physics',
    unitNo: 2,
    unitTitle: 'Lasers & Fiber Optics',
    chapters: [
      {
        chapterNo: 1,
        title: 'Laser Physics & Einstein Coefficients',
        topics: ['Spontaneous vs Stimulated Emission', 'Population Inversion & Metastable States', 'Einstein Coefficients A₂₁, B₁₂, B₂₁ Proof', 'A₂₁/B₂₁ = 8πhν³/c³ Derivation'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Compare Boltzmann thermal equilibrium rate ratio with Planck radiation law cleanly.',
      },
      {
        chapterNo: 2,
        title: 'Ruby Laser (3-Level) vs He-Ne Laser (4-Level)',
        topics: ['Ruby Laser Construction (Cr³⁺ ions in Al₂O₃, 694.3 nm Pulsed)', 'He-Ne Gas Laser (10:1 Gas Ratio, Resonant Transfer, 632.8 nm CW)', '3-Level vs 4-Level Pumping Efficiency'],
        weightage: '4 Marks',
        examTips: 'Highlight why He-Ne operates continuously with narrow linewidth compared to pulsed Ruby laser.',
      },
      {
        chapterNo: 3,
        title: 'Optical Fibers: Acceptance Angle, NA & V-Number',
        topics: ['Total Internal Reflection (n₁ > n₂, θ > θ_c)', 'Numerical Aperture NA = √(n₁² - n₂²)', 'Acceptance Angle θ_a = sin⁻¹(NA)', 'Step-Index vs Graded-Index Fibers & V-Number M = V²/2'],
        weightage: '4 Marks (Guaranteed Numerical)',
        examTips: 'Ensure V < 2.405 condition for single-mode propagation is memorized.',
      },
    ],
  },
  {
    subjectCode: '100104',
    subjectShort: 'Physics',
    subjectTitle: 'Engineering Physics',
    unitNo: 3,
    unitTitle: 'Electromagnetism & Maxwell Equations',
    chapters: [
      {
        chapterNo: 1,
        title: 'Maxwell Equations & Displacement Current',
        topics: ["Ampere's Law Inconsistency in Charging Capacitor", 'Displacement Current J_d = ε₀ ∂E/∂t', "Maxwell's 4 Differential & Integral Equations", 'Physical Meaning of Gauss Law for E & B (No Monopoles)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Write all 4 equations cleanly side by side in both Differential (∇·, ∇×) and Integral (∮) forms.',
      },
      {
        chapterNo: 2,
        title: 'EM Wave Propagation & Poynting Vector',
        topics: ['Wave Equations in Free Space (∇²E = μ₀ε₀ ∂²E/∂t²)', 'Speed of Light Proof c = 1 / √(μ₀ε₀)', 'Transverse Nature Proof (k·E = 0, E ⊥ B ⊥ k)', 'Poynting Vector S = (1/μ₀)(E × B) & Wave Impedance 377 Ω'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Remember free space wave impedance Z₀ = √(μ₀/ε₀) = 376.7 ≈ 120π Ω.',
      },
    ],
  },
  // --- IAI / AI (100105) ---
  {
    subjectCode: '100105',
    subjectShort: 'AI',
    subjectTitle: 'Introduction to Artificial Intelligence',
    unitNo: 1,
    unitTitle: 'AI Foundations & Intelligent Agents',
    chapters: [
      {
        chapterNo: 1,
        title: 'Foundations of AI & Turing Test',
        topics: ['Thinking Humanly vs Acting Humanly', 'Thinking Rationally vs Acting Rationally (4 Categories)', 'Turing Test & 4 Required AI Capabilities', 'AI Evolution Timeline & Disciplines'],
        weightage: '4 Marks',
        examTips: 'Define Rationality carefully: maximizing expected performance measure given percept sequence and knowledge.',
      },
      {
        chapterNo: 2,
        title: 'Intelligent Agents, PEAS & Environments',
        topics: ['Rational Agents: Sensor → Agent Function → Actuator', 'PEAS Descriptor (Performance, Environment, Actuators, Sensors)', 'Environment Dimensions (Observable, Deterministic, Episodic, Static, Discrete, Multi-agent)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Design full PEAS tables for Autonomous Car, Medical Diagnosis, and Automated Trading.',
      },
      {
        chapterNo: 3,
        title: 'Five Classic Agent Architectures',
        topics: ['Simple Reflex Agent (Condition-Action Rules)', 'Model-Based Reflex Agent (Internal State)', 'Goal-Based Agent', 'Utility-Based Agent (Happy/Preferences)', 'Learning Agent (Critic, Learning Element, Performance, Problem Gen)'],
        weightage: '4 Marks',
        examTips: 'Always draw the Learning Agent feedback loop showing the Critic comparing environment feedback against standard.',
      },
    ],
  },
  {
    subjectCode: '100105',
    subjectShort: 'AI',
    subjectTitle: 'Introduction to Artificial Intelligence',
    unitNo: 2,
    unitTitle: 'Uninformed Search Strategies',
    chapters: [
      {
        chapterNo: 1,
        title: 'State-Space Problem Formulation & Search Metrics',
        topics: ['5 Components: Initial State, Actions, Transition, Goal Test, Path Cost', 'Search Tree vs Graph Search', '4 Evaluation Metrics: Completeness, Optimality, Time O(), Space O()'],
        weightage: '4 Marks',
        examTips: 'Define b (branching factor), d (shallowest goal depth), and m (max path depth).',
      },
      {
        chapterNo: 2,
        title: 'BFS, DFS, UCS & Iterative Deepening (IDDFS)',
        topics: ['Breadth-First Search (FIFO Queue, O(b^d) space)', 'Depth-First Search (LIFO Stack, O(bm) space)', 'Uniform Cost Search (Priority Queue by path cost g(n))', 'Depth-Limited & Iterative Deepening DFS (Optimal + Linear Space)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Show clearly why IDDFS gets O(bd) space benefit of DFS with completeness & optimality of BFS.',
      },
    ],
  },
  {
    subjectCode: '100105',
    subjectShort: 'AI',
    subjectTitle: 'Introduction to Artificial Intelligence',
    unitNo: 3,
    unitTitle: 'Informed Search & Adversarial Game Playing',
    chapters: [
      {
        chapterNo: 1,
        title: 'Heuristic Search: Greedy Best-First & A* Search',
        topics: ['Evaluation Function f(n) = g(n) + h(n)', 'Admissible Heuristic Condition (h(n) ≤ h*(n))', 'Consistency / Monotonicity Condition (h(n) ≤ c(n,n′) + h(n′))', '8-Puzzle Heuristics (Misplaced Tiles vs Manhattan Distance)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Remember: Manhattan Distance dominates Misplaced Tiles (h₂ ≥ h₁) and is always admissible!',
      },
      {
        chapterNo: 2,
        title: 'Adversarial Search: Minimax & Alpha-Beta Pruning',
        topics: ['2-Player Zero-Sum Games', 'Minimax Algorithm & Utility Propagation', 'Alpha (MAX lower bound) & Beta (MIN upper bound)', 'Pruning Cutoff Condition: α ≥ β'],
        weightage: '4 Marks (Guaranteed Tree Trace)',
        examTips: 'Trace tree strictly Left-to-Right DFS; show exact α, β values at each node and cross out pruned subtrees clearly.',
      },
    ],
  },
  // --- UHV (100109) ---
  {
    subjectCode: '100109',
    subjectShort: 'UHV',
    subjectTitle: 'Universal Human Values',
    unitNo: 1,
    unitTitle: 'Value Education, Self-Exploration & Happiness',
    chapters: [
      {
        chapterNo: 1,
        title: 'Need & Process of Self-Exploration',
        topics: ['Purpose & Guidelines of Value Education', 'Self-Exploration Dialogue ("What I am" vs "What I really want to be")', 'Natural Acceptance (Innate, Unchanging, Universal)', 'Experiential Validation (Behaviour & Work)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Emphasize that Self-Exploration uses proposals tested inside via Natural Acceptance, NOT blind imposition.',
      },
      {
        chapterNo: 2,
        title: 'Continuous Happiness & Prosperity',
        topics: ['Basic Human Aspirations: Sukh (Happiness) & Samridhi (Prosperity)', 'Prosperity vs Wealth Accumulation (Assessment of Need)', 'Right Understanding > Relationship > Physical Facilities Priority Order', 'Animal Consciousness vs Human Consciousness'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Clearly distinguish Wealth (merely physical money) vs Prosperity (feeling of having more than needed physical facility).',
      },
    ],
  },
  {
    subjectCode: '100109',
    subjectShort: 'UHV',
    subjectTitle: 'Universal Human Values',
    unitNo: 2,
    unitTitle: 'Harmony in the Human Being (Self & Body)',
    chapters: [
      {
        chapterNo: 1,
        title: 'Co-existence of Self ("I") and Body',
        topics: ["Human Being = Co-existence of Sentient 'I' (Consciousness) & Material Body", 'Qualitative Needs of I (Trust, Respect, Continuous) vs Quantitative Needs of Body (Food, Shelter, Temporary)', 'Activities of I (Desiring, Thinking, Selecting) vs Body (Breathing, Digesting)', "Self as Seer (Drashta), Doer (Karta), Enjoyer (Bhokta) & Body as Instrument"],
        weightage: '4 Marks (Guaranteed Table)',
        examTips: 'Always present the comparison table cleanly across Need, Fulfillment, Time-Nature, and Activity.',
      },
      {
        chapterNo: 2,
        title: 'Sanyam (Self-Regulation) & Swasthya (Health)',
        topics: ['Definition of Sanyam (Feeling of Responsibility toward Body)', 'Definition of Swasthya (Body acting per I + Harmony among Organs)', 'Nurturing (Poshan), Protection (Sanrakshan) & Right Utilization (Sadupayog)', 'Program for Ensuring Body Health (Ahar, Vihar, Vyayam, Pranayama)'],
        weightage: '4 Marks',
        examTips: 'Show how Sanyam naturally guarantees Swasthya in a cyclic cause-effect relationship.',
      },
    ],
  },
  {
    subjectCode: '100109',
    subjectShort: 'UHV',
    subjectTitle: 'Universal Human Values',
    unitNo: 3,
    unitTitle: 'Harmony in Family & Society (Justice & 9 Values)',
    chapters: [
      {
        chapterNo: 1,
        title: 'Justice (Nyaya) & Trust (Vishwas)',
        topics: ['Four Elements of Justice: Recognition, Fulfillment, Evaluation, Mutual Happiness', 'Foundational Value: Trust (Vishwas)', 'Intention (Chahana) vs Competence (Yogyata) Distinction', 'Why Doubting Intention Causes Anger & Reaction'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Explain clearly that everybody naturally intends mutual happiness; mistakes occur solely from lack of competence.',
      },
      {
        chapterNo: 2,
        title: 'Respect (Samman) & The 9 Values',
        topics: ['Respect Definition: Right Evaluation (Yathartha Mulyankan)', 'Disrespect Modes: Over-evaluation, Under-evaluation, Otherwise-evaluation', 'Nine Values in Relationships: Trust, Respect, Affection, Care, Guidance, Reverence, Glory, Gratitude, Love (Purna Mulya)', 'Comprehensive Human Goals: Samadhan, Samridhi, Abhay, Sah-astitva'],
        weightage: '4 Marks',
        examTips: 'Define Respect as Right Evaluation. Differentiate between Differentiation (based on body, wealth, beliefs) and Respect.',
      },
    ],
  },
];
