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

/* ---------- BEEE UNIT STORIES (6 Units) ---------- */
export const BEEE_UNIT_STORIES: Record<string, UnitStory> = {
  'beee:0': {
    whatItIs:
      'DC circuit analysis is the foundation of electrical engineering, modeling how currents flow and voltages distribute across networks of resistors, inductors, capacitors, and power sources.',
    whyItMatters:
      'Every electronic board, electric vehicle powertrain, home wiring system, and computer motherboard must obey conservation of charge (KCL) and conservation of energy (KVL).',
    howItWorks:
      'Mesh analysis translates KVL loops into matrix equations; Nodal analysis translates KCL junction balances into node voltages. Star-delta transformations and source conversions simplify complex bridge topologies into single equivalent loops.',
  },
  'beee:1': {
    whatItIs:
      'AC circuit theory analyzes voltages and currents that cycle sinusoidally in time, introducing complex impedance, phase angles, and vector phasors.',
    whyItMatters:
      'The entire electrical power grid worldwide runs on alternating current. Understanding power factor and reactive power is essential to avoid massive energy wastage and generator heating.',
    howItWorks:
      'Sinusoidal signals are converted into rotating phasor vectors. Resistors dissipate active power (kW), while inductors and capacitors exchange reactive power (kVAr). Balanced 3-phase systems provide steady rotating power with reduced copper wiring.',
  },
  'beee:2': {
    whatItIs:
      'Electrical machines convert electrical energy into mechanical power (motors) or convert mechanical torque into electricity (generators), linked via magnetic flux in transformers.',
    whyItMatters:
      'Transformers allow high-voltage transmission over hundreds of kilometers with minimal loss, while induction motors power 90% of all industrial factories, pumps, and electric trains.',
    howItWorks:
      'Faraday’s law of electromagnetic induction generates back-EMF in coils. Mutual induction in transformers steps voltages up or down according to turn ratios, while rotating magnetic fields drag induction motor rotors via slip.',
  },
  'beee:3': {
    whatItIs:
      'Solid-state semiconductor devices act as microscopic one-way check valves (diodes), voltage clamps (Zeners), and controllable current faucets (BJTs).',
    whyItMatters:
      'Without rectifiers to convert wall AC into steady DC, and transistors to amplify weak signals and switch digital bits, computers, smartphones, and power supplies could not exist.',
    howItWorks:
      'P-N diodes conduct forward current and block reverse voltage, powering half-wave and full-wave rectifiers. In active mode, small base current controls large collector current in bipolar transistors, serving as amplifiers or saturation switches.',
  },
  'beee:4': {
    whatItIs:
      'This unit covers digital logic gates, IC voltage regulators, oscilloscope instrumentation, and building-level electrical protection (fuses, MCBs, earthing).',
    whyItMatters:
      'Digital gates form the computational brain of microprocessors, while fuses, circuit breakers, and earthing prevent deadly electrical shocks and structural fires.',
    howItWorks:
      'Boolean algebra optimizes binary logic; universal gates (NAND/NOR) construct all logic operations. IC 7805/7912 regulate rock-solid ±5V/±12V supplies. Earthing diverts hazardous fault currents harmlessly into deep ground.',
  },
  'beee:5': {
    whatItIs:
      'The BEEE laboratory provides hands-on hardware training: connecting real voltmeters, ammeters, breadboards, oscilloscopes, machines, and safety circuits.',
    whyItMatters:
      'Practical engineering requires verifying theoretical formulas against real-world component tolerances, instrument loading effects, and electrical safety standards.',
    howItWorks:
      'Students verify Ohm’s and Kirchhoff’s laws on breadboards, observe rectifier ripples on CRO screens, wire star/delta transformer banks, plot transistor curves, and measure earth pit resistance using a Megger.',
  },
};

/* ---------- TOPIC CONTENT: UNIT 0 (Basic Electrical Circuits - 8 topics) ---------- */
export const BEEE_UNIT0_TOPICS: Record<string, TopicContent> = {
  'beee:0:0': {
    explain: [
      'Active elements inject net electrical energy into a circuit (like batteries and generators), while passive elements absorb, dissipate, or store energy.',
      'A resistor converts electrical energy into heat, an inductor stores energy in a magnetic field, and a capacitor stores energy in an electrostatic field.',
    ],
    definition:
      'Active elements are circuit components capable of delivering average net electrical power to an external network (voltage and current sources), whereas passive elements (R, L, C) only absorb, dissipate, or store energy.',
    formula: 'v_R = i R, \\quad v_L = L \\frac{di}{dt}, \\quad i_C = C \\frac{dv}{dt}, \\quad w_L = \\frac{1}{2} L i^2, \\quad w_C = \\frac{1}{2} C v^2',
    steps: [
      'Resistor (R): linear passive element obeying Ohm’s law v = iR; dissipates power continuously as heat P = i²R.',
      'Inductor (L): passive storage element; voltage is proportional to rate of change of current v_L = L (di/dt); current cannot change instantaneously.',
      'Capacitor (C): passive storage element; current is proportional to rate of change of voltage i_C = C (dv/dt); voltage cannot change instantaneously.',
      'Active Elements: independent/dependent voltage and current sources capable of sustained energy injection (gain > 0).',
    ],
    examAnswer: [
      'Differentiate Active vs Passive elements with 2 examples each (Active: battery, generator, op-amp; Passive: R, L, C).',
      'Write the V-I relationships for R, L, and C: v = iR, v = L(di/dt), and i = C(dv/dt).',
      'State energy storage formulas: Inductor energy W_L = ½ L I² and Capacitor energy W_C = ½ C V².',
      'State boundary continuity conditions: current through an inductor cannot change instantaneously; voltage across a capacitor cannot change instantaneously.',
    ],
    slip: 'Assuming an inductor or capacitor is an active element because it discharges energy. They are strictly passive because they can only release energy previously absorbed from an external source.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'ACTIVE VS PASSIVE CIRCUIT ELEMENTS', 'ta') +
        C(60, 95, 20, 'l') + T(55, 99, 'V', 't') +
        T(40, 135, 'Active (Source)', 'ta') +
        LA(85, 95, 120, 95) +
        P('M125 95 L135 85 L145 105 L155 85 L165 105 L175 95', 'l') +
        T(135, 125, 'Resistor (R)', 't') +
        P('M195 95 Q205 75 215 95 T235 95 T255 95', 'ta') +
        T(205, 125, 'Inductor (L)', 'ta') +
        L(275, 80, 275, 110, 'l') + L(285, 80, 285, 110, 'l') +
        T(260, 125, 'Capacitor (C)', 't') +
        T(20, 180, 'R dissipates P=I²R   |   L stores ½LI² in magnetic field   |   C stores ½CV² in electric field', 'ta')
      ),
      caption: 'Active energy source driving passive elements: resistor (dissipator), inductor (magnetic), and capacitor (electric).',
    },
  },
  'beee:0:1': {
    explain: [
      'Linear elements follow a straight line V-I graph through the origin—double the voltage and the current doubles.',
      'Bilateral elements conduct current identically in both forward and reverse directions (like a simple resistor), whereas unilateral elements (like a diode) conduct in one direction and block the other.',
    ],
    definition:
      'A linear element satisfies the principles of superposition and homogeneity (straight line V-I curve passing through origin), whereas a bilateral element conducts identical current in both directions for equal applied voltage magnitude.',
    formula: 'f(a x_1 + b x_2) = a f(x_1) + b f(x_2) \\quad (\\text{Linearity}), \\quad Z(+V) = Z(-V) \\quad (\\text{Bilateral})',
    steps: [
      'Linear Element: V-I characteristic is a straight line through origin (R, L, C); obeys superposition.',
      'Non-linear Element: V-I curve is curved or exhibits threshold knee (diode, transistor, varistor); does not obey Ohm’s law.',
      'Bilateral Element: impedance is independent of current direction (resistors, inductors, capacitors).',
      'Unilateral Element: conducts easily in one direction and offers high impedance in reverse (semiconductor diode, SCR).',
    ],
    examAnswer: [
      'Define linear and non-linear elements with sketches of their V-I characteristics.',
      'Define bilateral and unilateral elements with circuit examples (Bilateral: resistor; Unilateral: P-N diode).',
      'State two conditions for linearity: Homogeneity f(kx) = k f(x) and Additivity f(x₁ + x₂) = f(x₁) + f(x₂).',
      'Explain why network theorems (Thevenin, Norton, Superposition) apply only to linear bilateral circuits.',
    ],
    slip: 'Confusing bilateral with linear. A component can be bilateral but non-linear (e.g., a DIAC conducts symmetrically in both directions but is non-linear).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'LINEAR VS NON-LINEAR & BILATERAL VS UNILATERAL', 'ta') +
        L(30, 95, 160, 95, 'l') + L(95, 30, 95, 160, 'l') +
        T(165, 100, 'V', 't') + T(90, 25, 'I', 't') +
        L(45, 145, 145, 45, 'ta') +
        T(35, 60, 'Linear & Bilateral', 'ta') +
        T(35, 75, '(Resistor R)', 't') +
        L(200, 95, 330, 95, 'l') + L(265, 30, 265, 160, 'l') +
        T(335, 100, 'V', 't') + T(260, 25, 'I', 't') +
        P('M205 97 L265 97 Q280 97 295 45', 'ta') +
        T(205, 60, 'Non-linear & Unilateral', 'ta') +
        T(205, 75, '(P-N Diode)', 't') +
        T(20, 180, 'Linear: straight line through origin   |   Bilateral: symmetric in Quadrants I and III', 'ta')
      ),
      caption: 'V-I characteristics comparing linear bilateral resistor with non-linear unilateral diode.',
    },
  },
  'beee:0:2': {
    explain: [
      'Ohm’s law states that current through a conductor is proportional to voltage as long as temperature remains steady.',
      'Kirchhoff’s Current Law (KCL) says total current entering a junction must equal current leaving, while Kirchhoff’s Voltage Law (KVL) says the sum of voltages around any closed loop must equal zero.',
    ],
    definition:
      'Ohm’s law states V = IR for a conductor at constant temperature. Kirchhoff’s Current Law (KCL) is based on conservation of electric charge (ΣI = 0 at any node), and Kirchhoff’s Voltage Law (KVL) is based on conservation of energy (ΣV = 0 around any closed loop).',
    formula: 'V = I R, \\quad \\sum_{k=1}^n I_k = 0 \\quad (\\text{KCL at node}), \\quad \\sum_{k=1}^m V_k = 0 \\quad (\\text{KVL in closed loop})',
    steps: [
      'Ohm’s Law: V = IR; valid only for linear conductors at constant temperature; fails for semiconductors, vacuum tubes, and electrolytes.',
      'KCL (Node Rule): algebraic sum of currents entering a junction equals zero: Σ I_in = Σ I_out. Represents conservation of charge.',
      'KVL (Loop Rule): algebraic sum of potential rises equals algebraic sum of potential drops around any closed loop: Σ V_sources = Σ I·R drops. Represents conservation of energy.',
      'Sign convention for KVL: traversing from - to + across a source is a potential rise (+V); traversing in the direction of current across a resistor is a drop (-IR).',
    ],
    examAnswer: [
      'State Ohm’s law, write V = IR, and state its limitations (fails for non-metallic and non-linear elements).',
      'State KCL with mathematical equation ΣI = 0 and specify that it represents conservation of electric charge.',
      'State KVL with mathematical equation ΣV = 0 and specify that it represents conservation of energy.',
      'Demonstrate KVL around a single loop containing two sources and two resistors with clear polarity signs.',
    ],
    slip: 'Confusing the physical basis: KCL is based on conservation of charge, while KVL is based on conservation of energy.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'KIRCHHOFF’S LAWS: KCL (NODE) & KVL (LOOP)', 'ta') +
        C(90, 95, 5, 'fa') + T(95, 105, 'Node', 't') +
        LA(30, 95, 85, 95) + T(35, 85, 'I₁', 't') +
        LA(90, 95, 90, 40) + T(95, 55, 'I₂', 'ta') +
        LA(90, 95, 145, 135) + T(135, 120, 'I₃', 'ta') +
        T(30, 145, 'KCL: I₁ = I₂ + I₃', 'ta') +
        R(210, 50, 100, 70, 'l') +
        T(240, 42, 'R₁', 't') + T(315, 85, 'R₂', 't') +
        T(185, 85, '+ E −', 'ta') +
        P('M245 75 A15 15 0 1 1 245 95', 'ta') + LA(245, 95, 235, 90) +
        T(230, 145, 'KVL: E − I R₁ − I R₂ = 0', 'ta') +
        T(20, 180, 'KCL: conservation of charge at nodes   |   KVL: conservation of energy in closed loops', 'ta')
      ),
      caption: 'KCL junction current balance and KVL closed-loop potential balance.',
    },
  },
  'beee:0:3': {
    explain: [
      'Resistors in series add directly because the same current flows through each; in parallel, conductances add because the same voltage sits across each.',
      'Source transformation allows you to swap an ideal voltage source with a series resistor into an equivalent current source with a parallel resistor, simplifying circuit meshes.',
    ],
    definition:
      'Series-parallel analysis combines resistors into single equivalents, while source transformation states that an ideal voltage source V in series with resistor R is electrically equivalent to an ideal current source I = V/R in parallel with the same resistor R.',
    formula: 'R_s = R_1 + R_2, \\quad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} \\implies R_p = \\frac{R_1 R_2}{R_1 + R_2}, \\quad I_s = \\frac{V_s}{R}, \\quad V_s = I_s R',
    steps: [
      'Series connection: identical current flows through each element; equivalent resistance is R_eq = R₁ + R₂ + ... + R_n.',
      'Parallel connection: identical voltage appears across each branch; equivalent resistance is R_eq = (R₁ R₂) / (R₁ + R₂).',
      'Ideal voltage source has zero internal resistance (R_int = 0); ideal current source has infinite internal resistance (R_int = ∞).',
      'Practical voltage source: ideal source V_s in series with internal resistance R.',
      'Source Transformation: replace series pair (V_s, R) with parallel pair (I_s, R) where I_s = V_s / R (arrow points toward positive voltage terminal).',
    ],
    examAnswer: [
      'State equivalent resistance formulas for series (R₁ + R₂) and parallel (R₁R₂ / (R₁ + R₂)).',
      'Define ideal vs practical voltage and current sources with internal resistance values.',
      'Explain source transformation with diagrams and state conversion formulas V_s = I_s R and I_s = V_s / R.',
      'Demonstrate how source transformation reduces a multi-source bridge network.',
    ],
    slip: 'Reversing current source arrow direction during source transformation. The arrow must always point toward the positive terminal of the voltage source.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SOURCE TRANSFORMATION EQUIVALENCE', 'ta') +
        C(60, 95, 18, 'l') + T(55, 99, 'V_s', 't') +
        P('M85 95 L95 85 L105 105 L115 85 L125 95', 'l') + T(98, 75, 'R', 't') +
        L(125, 95, 150, 95) + C(150, 95, 3, 'fa') + T(155, 98, 'A', 't') +
        L(60, 130, 150, 130) + C(150, 130, 3, 'fa') + T(155, 133, 'B', 't') +
        LA(165, 110, 195, 110) + LA(195, 115, 165, 115) +
        C(235, 112, 18, 'l') + LA(235, 122, 235, 102) + T(225, 90, 'I_s', 'ta') +
        L(205, 95, 290, 95) + L(205, 130, 290, 130) +
        P('M270 95 L260 105 L280 115 L260 125 L270 130', 'l') + T(285, 115, 'R', 't') +
        C(290, 95, 3, 'fa') + T(295, 98, 'A', 't') +
        C(290, 130, 3, 'fa') + T(295, 133, 'B', 't') +
        T(20, 180, 'Equivalence: I_s = V_s / R   |   Internal resistance R remains identical', 'ta')
      ),
      caption: 'Source transformation: practical voltage source (series R) converts to practical current source (parallel R).',
    },
  },
  'beee:0:4': {
    explain: [
      'Mesh analysis uses Kirchhoff’s Voltage Law to systematically solve planar circuits using imaginary circulating loop currents.',
      'By assigning a clockwise loop current to each window pane of the circuit, you write loop equations that solve all branch currents at once.',
    ],
    definition:
      'Mesh analysis (or loop current method) is a systematic network analysis technique for planar circuits that applies KVL to find independent fictitious circulating loop currents.',
    formula: '[R] [I] = [V] \\iff \\begin{bmatrix} R_{11} & -R_{12} \\\\ -R_{21} & R_{22} \\end{bmatrix} \\begin{bmatrix} I_1 \\\\ I_2 \\end{bmatrix} = \\begin{bmatrix} V_1 \\\\ V_2 \\end{bmatrix}',
    steps: [
      'Ensure circuit is planar (can be drawn on a flat surface without crossing wires).',
      'Identify number of independent meshes: M = B - N + 1 (Branches - Nodes + 1).',
      'Assign clockwise mesh currents I₁, I₂, ... I_M to each mesh.',
      'Write KVL for each mesh: sum of resistances in mesh 1 is self-resistance R₁₁; shared resistance with mesh 2 is mutual resistance R₁₂.',
      'Mesh 1 equation: R₁₁ I₁ - R₁₂ I₂ - ... = Σ V_sources (sources driving clockwise current are positive).',
      'Solve the matrix system [R][I] = [V] using Cramer’s rule or Gaussian elimination.',
      'If a current source is shared between two meshes, create a Supermesh by removing the current source and writing a combined KVL equation.',
    ],
    examAnswer: [
      'State the steps of mesh analysis and define self-resistance R_ii and mutual resistance R_ij.',
      'Write matrix form [R][I] = [V] for a 2-mesh network and show Cramer’s rule solution: I₁ = Δ₁ / Δ, I₂ = Δ₂ / Δ.',
      'Define a Supermesh and write its constraint equation when a current source is shared between two loops.',
      'Solve a numerical example for a 2-mesh circuit with given voltage sources and resistor values.',
    ],
    slip: 'Forgetting the negative sign on mutual resistance terms: off-diagonal elements in the resistance matrix are always -R_ij when all mesh currents are chosen in the same clockwise direction.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'TWO-MESH CIRCUIT ANALYSIS', 'ta') +
        R(50, 50, 240, 80, 'l') + L(170, 50, 170, 130, 'l') +
        T(100, 42, 'R₁', 't') + T(220, 42, 'R₂', 't') + T(180, 95, 'R₃ (shared)', 'ta') +
        T(30, 95, 'V₁', 't') + T(300, 95, 'V₂', 't') +
        P('M100 80 A15 15 0 1 1 100 100', 'ta') + LA(100, 100, 90, 95) + T(105, 93, 'I₁', 'ta') +
        P('M220 80 A15 15 0 1 1 220 100', 'ta') + LA(220, 100, 210, 95) + T(225, 93, 'I₂', 'ta') +
        T(20, 155, 'Mesh 1: (R₁ + R₃)I₁ − R₃I₂ = V₁', 't') +
        T(20, 175, 'Mesh 2: −R₃I₁ + (R₂ + R₃)I₂ = −V₂', 'ta')
      ),
      caption: 'Two-mesh circuit showing clockwise loop currents I₁ and I₂ with shared resistor R₃.',
    },
  },
  'beee:0:5': {
    explain: [
      'Nodal analysis uses Kirchhoff’s Current Law to find the unknown voltages at every junction in a circuit.',
      'By picking one node as the 0V ground reference, you write current sum equations for all other nodes and solve them simultaneously.',
    ],
    definition:
      'Nodal analysis (node-voltage method) is a systematic circuit analysis technique that applies KCL at all non-reference essential nodes to solve for independent node voltages.',
    formula: '[G] [V] = [I] \\iff \\begin{bmatrix} G_{11} & -G_{12} \\\\ -G_{21} & G_{22} \\end{bmatrix} \\begin{bmatrix} V_1 \\\\ V_2 \\end{bmatrix} = \\begin{bmatrix} I_1 \\\\ I_2 \\end{bmatrix}',
    steps: [
      'Count total essential nodes N in the circuit; select one common node as the ground reference (0 V).',
      'Identify (N - 1) independent non-reference nodes and label their voltages V₁, V₂, etc.',
      'Write KCL at each node: sum of conductances connected to node 1 is G₁₁; mutual conductance between node 1 and node 2 is G₁₂ = 1/R₁₂.',
      'Node 1 equation: G₁₁ V₁ - G₁₂ V₂ - ... = Σ I_injected (current sources injecting into node are positive).',
      'Solve matrix system [G][V] = [I] using Cramer’s rule.',
      'If a voltage source is connected between two non-reference nodes, form a Supernode by enclosing the source and writing a combined KCL equation.',
    ],
    examAnswer: [
      'State the steps of nodal analysis and define self-conductance G_ii and mutual conductance G_ij.',
      'Write the conductance matrix equation [G][V] = [I] for a 2-node circuit.',
      'Define a Supernode and write its constraint equation when an ideal voltage source connects two non-reference nodes: V_A - V_B = V_s.',
      'Explain how to decide between nodal analysis and mesh analysis (choose nodal if N - 1 < M, choose mesh if M < N - 1).',
    ],
    slip: 'Treating a known voltage source connected between a node and ground as an unknown node voltage. That node voltage is already fixed by the source.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'TWO-NODE NODAL ANALYSIS', 'ta') +
        C(110, 50, 5, 'fa') + T(105, 40, 'Node 1 (V₁)', 'ta') +
        C(230, 50, 5, 'fa') + T(225, 40, 'Node 2 (V₂)', 'ta') +
        P('M110 50 L160 50 L170 40 L180 60 L190 50 L230 50', 'l') + T(165, 32, 'R₂', 't') +
        P('M110 50 L110 80 L100 90 L120 100 L110 110 L110 140', 'l') + T(80, 95, 'R₁', 't') +
        P('M230 50 L230 80 L220 90 L240 100 L230 110 L230 140', 'l') + T(245, 95, 'R₃', 't') +
        L(50, 140, 290, 140, 'l') +
        L(170, 140, 170, 155) + L(160, 155, 180, 155) + L(165, 160, 175, 160) +
        T(185, 160, 'Ground (0V)', 't') +
        T(20, 180, 'Node 1: (G₁+G₂)V₁ − G₂V₂ = I_in   |   Node 2: −G₂V₁ + (G₂+G₃)V₂ = 0', 'ta')
      ),
      caption: 'Nodal analysis setup: independent nodes V₁ and V₂ referenced to common ground (0 V).',
    },
  },
  'beee:0:6': {
    explain: [
      'Voltage dividers and current dividers are mental shortcuts to find voltages and currents without writing full system equations.',
      'In a series chain, voltage divides in direct proportion to resistance; in a parallel branch, current divides in inverse proportion to resistance (more current picks the smaller resistor).',
    ],
    definition:
      'Voltage Divider Rule (VDR) states that voltage across any series resistor is proportional to its resistance, while Current Divider Rule (CDR) states that current through any parallel branch is inversely proportional to its branch resistance.',
    formula: 'V_1 = V_{\\text{total}} \\left( \\frac{R_1}{R_1 + R_2} \\right), \\quad I_1 = I_{\\text{total}} \\left( \\frac{R_2}{R_1 + R_2} \\right), \\quad I_2 = I_{\\text{total}} \\left( \\frac{R_1}{R_1 + R_2} \\right)',
    steps: [
      'Voltage Divider Rule (Series circuit): current I = V_total / (R₁ + R₂).',
      'Voltage drop across R₁ is V₁ = I R₁ = V_total · [R₁ / (R₁ + R₂)].',
      'Current Divider Rule (Parallel circuit): voltage V = I_total · R_parallel = I_total · [R₁R₂ / (R₁ + R₂)].',
      'Current through branch 1 is I₁ = V / R₁ = I_total · [R₂ / (R₁ + R₂)] (opposite resistor in numerator!).',
      'Current through branch 2 is I₂ = V / R₂ = I_total · [R₁ / (R₁ + R₂)].',
      'For general n parallel branches: I_k = I_total · [G_k / ΣG] where G_k = 1/R_k is conductance.',
    ],
    examAnswer: [
      'State Voltage Divider Rule with formula V₁ = V · R₁ / (R₁ + R₂) and show simple derivation.',
      'State Current Divider Rule with formula I₁ = I · R₂ / (R₁ + R₂) and show simple derivation.',
      'Emphasize the crucial difference: VDR puts the same resistor in numerator; CDR puts the opposite resistor in numerator.',
      'Solve a quick numerical problem for a 12V source with 4Ω and 8Ω resistors.',
    ],
    slip: 'Using R₁ in the numerator for the current divider: I₁ = I · R₁ / (R₁ + R₂). This is incorrect; CDR requires the opposite resistor R₂ in the numerator.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'VOLTAGE & CURRENT DIVIDER RULES', 'ta') +
        T(30, 45, '1. Voltage Divider (Series)', 't') +
        L(30, 95, 60, 95) + P('M60 95 L70 85 L80 105 L90 85 L100 95', 'l') + T(75, 75, 'R₁', 't') +
        L(100, 95, 120, 95) + P('M120 95 L130 85 L140 105 L150 85 L160 95', 'l') + T(135, 75, 'R₂', 't') +
        T(30, 130, 'V₁ = V · R₁ / (R₁ + R₂)', 'ta') +
        T(200, 45, '2. Current Divider (Parallel)', 't') +
        LA(200, 95, 230, 95) + T(205, 85, 'I_total', 't') +
        L(230, 65, 230, 125) +
        P('M230 65 L260 65 L270 55 L280 75 L290 65 L320 65', 'l') + T(275, 45, 'R₁ (I₁)', 't') +
        P('M230 125 L260 125 L270 115 L280 135 L290 125 L320 125', 'l') + T(275, 145, 'R₂ (I₂)', 't') +
        T(200, 175, 'I₁ = I · R₂ / (R₁ + R₂)  (opposite R!)', 'ta')
      ),
      caption: 'Voltage division across series resistors vs current division across parallel branches.',
    },
  },
  'beee:0:7': {
    explain: [
      'Bridge circuits often form three-terminal triangular loops (Delta, Δ) or three-terminal pronged forks (Star or Wye, Y).',
      'Star-Delta transformation allows you to swap a three-resistor triangle into an equivalent three-legged star without disturbing the rest of the circuit.',
    ],
    definition:
      'Star-Delta (Y-Δ) transformation is a mathematical equivalence technique used to convert a three-terminal delta-connected resistor network into a star-connected network, and vice-versa, preserving terminal impedances.',
    formula: 'R_a = \\frac{R_{ab} R_{ca}}{R_{ab} + R_{bc} + R_{ca}} \\quad (\\Delta \\to Y), \\quad R_{ab} = R_a + R_b + \\frac{R_a R_b}{R_c} \\quad (Y \\to \\Delta)',
    steps: [
      'Delta to Star (Δ → Y): each star resistor equals the product of the two adjacent delta resistors divided by the sum of all three delta resistors.',
      'R_a = (R_ab · R_ca) / (R_ab + R_bc + R_ca).',
      'R_b = (R_ab · R_bc) / (R_ab + R_bc + R_ca).',
      'R_c = (R_bc · R_ca) / (R_ab + R_bc + R_ca).',
      'Star to Delta (Y → Δ): R_ab = R_a + R_b + (R_a R_b / R_c), or R_ab = (R_aR_b + R_bR_c + R_cR_a) / R_opposite.',
      'Balanced case: if all three resistors are identical (R_Δ), then the equivalent star resistors are R_Y = R_Δ / 3, and R_Δ = 3 R_Y.',
    ],
    examAnswer: [
      'State the Delta-to-Star conversion formula: R_a = (R_ab R_ca) / ΣR_Δ.',
      'State the Star-to-Delta conversion formula: R_ab = R_a + R_b + (R_a R_b / R_c).',
      'State the balanced shortcut: R_Δ = 3 R_Y.',
      'Demonstrate how Star-Delta conversion unlocks an unbalanced Wheatstone bridge where series-parallel reduction fails.',
    ],
    slip: 'Confusing the two formulas. For Δ → Y, the denominator is the sum of all three delta resistors; for Y → Δ, the denominator is the single opposite star resistor.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'STAR ⇄ DELTA TRANSFORMATION', 'ta') +
        P('M80 50 L40 120 L120 120 Z', 'l') +
        T(80, 42, 'A', 't', 'middle') + T(30, 130, 'B', 't') + T(125, 130, 'C', 't') +
        T(50, 80, 'R_ab', 't') + T(110, 80, 'R_ca', 't') + T(80, 132, 'R_bc', 't', 'middle') +
        LA(140, 85, 175, 85) + LA(175, 95, 140, 95) +
        L(250, 95, 250, 55, 'ta') + L(250, 95, 215, 125, 'ta') + L(250, 95, 285, 125, 'ta') +
        C(250, 95, 3, 'fa') +
        T(250, 45, 'A', 't', 'middle') + T(205, 135, 'B', 't') + T(290, 135, 'C', 't') +
        T(258, 75, 'R_a', 'ta') + T(220, 105, 'R_b', 'ta') + T(275, 105, 'R_c', 'ta') +
        T(20, 180, 'Δ → Y: R_a = (R_ab · R_ca) / ΣR_Δ   |   Balanced case: R_Δ = 3 R_Y', 'ta')
      ),
      caption: 'Equivalence of Delta (triangle) and Star (Wye) terminal resistor configurations.',
    },
  },
};
