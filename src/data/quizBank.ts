import { QuizQuestion } from '@/types/syllabus';

export const QUIZ_BANK: QuizQuestion[] = [
  // ==========================================
  // MATHEMATICS-I (math) - 5 Units, 10 Questions
  // ==========================================
  // Unit 0: Basic Linear Algebra
  {
    id: 'q-math-0-1',
    subjectId: 'math',
    unitIndex: 0,
    unitTitle: 'Basic Linear Algebra',
    question: 'A system of linear equations AX = B is consistent if and only if which condition holds?',
    options: [
      'Rank of A equals rank of augmented matrix [A|B]',
      'Rank of A is greater than rank of augmented matrix [A|B]',
      'Determinant of A is strictly zero',
      'The number of equations exceeds the number of unknowns'
    ],
    answer: 0,
    explanation: 'By the Rouché-Capelli theorem, the system AX = B has a solution (is consistent) if and only if the rank of the coefficient matrix A equals the rank of the augmented matrix [A|B].'
  },
  {
    id: 'q-math-0-2',
    subjectId: 'math',
    unitIndex: 0,
    unitTitle: 'Basic Linear Algebra',
    question: 'If a 3×3 square matrix A has eigenvalues λ = 1, 2, and 3, what is the determinant of A?',
    options: [
      '6',
      '14',
      '5',
      '0'
    ],
    answer: 0,
    explanation: 'The determinant of any square matrix equals the product of its eigenvalues. Here, det(A) = 1 × 2 × 3 = 6.'
  },
  // Unit 1: Differential Calculus: Single Variable
  {
    id: 'q-math-1-1',
    subjectId: 'math',
    unitIndex: 1,
    unitTitle: 'Differential Calculus: Single Variable',
    question: 'Which condition is NOT required for Rolle\'s Theorem to be applicable on f(x) over [a, b]?',
    options: [
      'f(x) must be continuous on [a, b]',
      'f(x) must be differentiable on (a, b)',
      'f(a) must equal f(b)',
      'f\'(x) must be strictly positive everywhere on (a, b)'
    ],
    answer: 3,
    explanation: 'Rolle\'s Theorem requires continuity on [a, b], differentiability on (a, b), and f(a) = f(b). It guarantees that there exists at least one point c ∈ (a, b) where f\'(c) = 0.'
  },
  {
    id: 'q-math-1-2',
    subjectId: 'math',
    unitIndex: 1,
    unitTitle: 'Differential Calculus: Single Variable',
    question: 'What is the formula for the radius of curvature ρ of a Cartesian curve y = f(x)?',
    options: [
      'ρ = [1 + (y\')²]^(3/2) / |y"|',
      'ρ = |y"| / [1 + (y\')²]^(3/2)',
      'ρ = [1 + (y\')²]^(1/2) / y"',
      'ρ = y\' · y"'
    ],
    answer: 0,
    explanation: 'Curvature κ is defined as |y"| / [1 + (y\')²]^(3/2), and the radius of curvature ρ = 1/κ = [1 + (y\')²]^(3/2) / |y"|.'
  },
  // Unit 2: Differential Calculus: Several Variables
  {
    id: 'q-math-2-1',
    subjectId: 'math',
    unitIndex: 2,
    unitTitle: 'Differential Calculus: Several Variables',
    question: 'By Euler\'s theorem, if u(x, y) is a homogeneous function of degree n in x and y, then x(∂u/∂x) + y(∂u/∂y) equals:',
    options: [
      'n · u',
      'n(n - 1) · u',
      'u / n',
      '0'
    ],
    answer: 0,
    explanation: 'Euler\'s theorem on homogeneous functions states that x(∂u/∂x) + y(∂u/∂y) = n · u for any homogeneous function of degree n.'
  },
  {
    id: 'q-math-2-2',
    subjectId: 'math',
    unitIndex: 2,
    unitTitle: 'Differential Calculus: Several Variables',
    question: 'At a stationary point of f(x, y) where r = f_xx, s = f_xy, and t = f_yy, if rt - s² > 0 and r < 0, the function has:',
    options: [
      'A local maximum',
      'A local minimum',
      'A saddle point',
      'An indeterminate test'
    ],
    answer: 0,
    explanation: 'When rt - s² > 0, the surface has consistent curvature. If r < 0, the surface curves downwards in all directions, corresponding to a local maximum.'
  },
  // Unit 3: Integral Calculus
  {
    id: 'q-math-3-1',
    subjectId: 'math',
    unitIndex: 3,
    unitTitle: 'Integral Calculus',
    question: 'What is the value of the Gamma function at 1/2, Γ(1/2)?',
    options: [
      '√π',
      'π / 2',
      '1',
      'π'
    ],
    answer: 0,
    explanation: 'From the reflection formula or Gaussian integral substitution, Γ(1/2) = ∫₀^∞ t^(-1/2) e^(-t) dt = √π.'
  },
  {
    id: 'q-math-3-2',
    subjectId: 'math',
    unitIndex: 3,
    unitTitle: 'Integral Calculus',
    question: 'What is the relation between the Beta function B(m, n) and Gamma functions?',
    options: [
      'B(m, n) = Γ(m)Γ(n) / Γ(m + n)',
      'B(m, n) = Γ(m + n) / [Γ(m)Γ(n)]',
      'B(m, n) = Γ(m) · Γ(n)',
      'B(m, n) = [Γ(m) + Γ(n)] / Γ(m + n)'
    ],
    answer: 0,
    explanation: 'The fundamental relation connecting Beta and Gamma functions is B(m, n) = Γ(m)Γ(n) / Γ(m + n) for all m, n > 0.'
  },
  // Unit 4: Vector Calculus
  {
    id: 'q-math-4-1',
    subjectId: 'math',
    unitIndex: 4,
    unitTitle: 'Vector Calculus',
    question: 'For any smooth scalar field φ, what is the value of curl(grad φ), i.e., ∇ × (∇φ)?',
    options: [
      '0 (the zero vector)',
      '∇²φ',
      '|∇φ|²',
      'φ · n̂'
    ],
    answer: 0,
    explanation: 'The curl of any gradient field is identically zero because mixed second partial derivatives commute (Schwarz\'s theorem).'
  },
  {
    id: 'q-math-4-2',
    subjectId: 'math',
    unitIndex: 4,
    unitTitle: 'Vector Calculus',
    question: 'Gauss\' Divergence Theorem converts a closed surface integral ∯ F · n̂ dS into:',
    options: [
      'Volume integral ∭ (∇ · F) dV over the enclosed region',
      'Line integral ∮ F · dr around the boundary curve',
      'Surface integral ∬ (∇ × F) · n̂ dS',
      'Volume integral ∭ |F|² dV'
    ],
    answer: 0,
    explanation: 'Gauss\' Divergence Theorem states that the outward flux of a vector field across a closed surface equals the volume integral of its divergence: ∯ F · n̂ dS = ∭ (∇ · F) dV.'
  },

  // ==========================================
  // ENGINEERING PHYSICS (phy) - 6 Units, 12 Questions
  // ==========================================
  // Unit 0: Harmonic Oscillations & Waves
  {
    id: 'q-phy-0-1',
    subjectId: 'phy',
    unitIndex: 0,
    unitTitle: 'Harmonic Oscillations & Waves',
    question: 'In a damped harmonic oscillator with equation d²x/dt² + 2γ(dx/dt) + ω₀²x = 0, what condition produces critical damping?',
    options: [
      'γ = ω₀',
      'γ < ω₀',
      'γ > ω₀',
      'γ = 0'
    ],
    answer: 0,
    explanation: 'Critical damping occurs when the damping coefficient equals the natural frequency (γ = ω₀). The system returns to equilibrium as fast as possible without oscillating.'
  },
  {
    id: 'q-phy-0-2',
    subjectId: 'phy',
    unitIndex: 0,
    unitTitle: 'Harmonic Oscillations & Waves',
    question: 'How is the quality factor Q of an oscillating system related to energy loss per cycle?',
    options: [
      'Q = 2π × (Energy stored) / (Energy dissipated per cycle)',
      'Q = (Energy dissipated per cycle) / (Energy stored)',
      'Q = ω₀ / (2π × Energy stored)',
      'Q = 1 / (Energy stored × Energy dissipated)'
    ],
    answer: 0,
    explanation: 'The quality factor Q measures the sharpness of resonance and is defined as 2π times the ratio of total energy stored to energy lost per cycle (Q = 2π E / ΔE).'
  },
  // Unit 1: Wave Optics, Lasers & Optical Fibres
  {
    id: 'q-phy-1-1',
    subjectId: 'phy',
    unitIndex: 1,
    unitTitle: 'Wave Optics, Lasers & Optical Fibres',
    question: 'In an optical fibre with core refractive index n₁ and cladding refractive index n₂, what is the Numerical Aperture (NA)?',
    options: [
      'NA = √(n₁² - n₂²)',
      'NA = n₁ - n₂',
      'NA = √(n₁² + n₂²)',
      'NA = n₂ / n₁'
    ],
    answer: 0,
    explanation: 'The light gathering ability of an optical fibre is given by its Numerical Aperture NA = sin θ₀ = √(n₁² - n₂²).'
  },
  {
    id: 'q-phy-1-2',
    subjectId: 'phy',
    unitIndex: 1,
    unitTitle: 'Wave Optics, Lasers & Optical Fibres',
    question: 'Why is a population inversion necessary for laser operation?',
    options: [
      'To make stimulated emission exceed stimulated absorption',
      'To prevent spontaneous emission entirely',
      'To reduce the refractive index of the laser medium',
      'To cool down the active medium during pumping'
    ],
    answer: 0,
    explanation: 'Since the Einstein B coefficients for absorption and stimulated emission are equal, stimulated emission can dominate only when more atoms populate the higher energy state than the lower state (N₂ > N₁).'
  },
  // Unit 2: Electromagnetic Theory & Dielectrics
  {
    id: 'q-phy-2-1',
    subjectId: 'phy',
    unitIndex: 2,
    unitTitle: 'Electromagnetic Theory & Dielectrics',
    question: 'Which term did James Clerk Maxwell add to Ampère\'s Law to account for time-varying electric fields?',
    options: [
      'Displacement current density: J_d = ε₀(∂E/∂t)',
      'Ohmic conduction current: J_c = σE',
      'Magnetization current: J_m = ∇ × M',
      'Convective charge current: J = ρv'
    ],
    answer: 0,
    explanation: 'Maxwell added the displacement current density J_d = ∂D/∂t = ε₀(∂E/∂t) to Ampère\'s Circuital Law, ensuring continuity of total current and predicting electromagnetic waves.'
  },
  {
    id: 'q-phy-2-2',
    subjectId: 'phy',
    unitIndex: 2,
    unitTitle: 'Electromagnetic Theory & Dielectrics',
    question: 'What physical quantity is represented by the Poynting vector S = E × H?',
    options: [
      'Electromagnetic power flow per unit area (W/m²)',
      'Total electrostatic potential energy in space',
      'Magnetic flux density through the wavefront',
      'Electric displacement charge density'
    ],
    answer: 0,
    explanation: 'The Poynting vector S = E × H describes both the magnitude and direction of the rate of electromagnetic energy transfer per unit area (irradiance / power flux density).'
  },
  // Unit 3: Quantum Mechanics & Wave-Particle Duality
  {
    id: 'q-phy-3-1',
    subjectId: 'phy',
    unitIndex: 3,
    unitTitle: 'Quantum Mechanics & Wave-Particle Duality',
    question: 'What is the de Broglie wavelength λ of a non-relativistic particle of mass m and kinetic energy E?',
    options: [
      'λ = h / √(2mE)',
      'λ = h · √(2mE)',
      'λ = √(2mE) / h',
      'λ = h / (2mE)'
    ],
    answer: 0,
    explanation: 'Since momentum p = √(2mE), the de Broglie relation λ = h/p directly yields λ = h / √(2mE).'
  },
  {
    id: 'q-phy-3-2',
    subjectId: 'phy',
    unitIndex: 3,
    unitTitle: 'Quantum Mechanics & Wave-Particle Duality',
    question: 'For a particle of mass m confined in an infinite 1D potential well of width L, the quantized energy levels scale as:',
    options: [
      'E_n ∝ n²',
      'E_n ∝ n',
      'E_n ∝ √n',
      'E_n ∝ 1/n²'
    ],
    answer: 0,
    explanation: 'The stationary states of a 1D infinite square well have energies E_n = n²h² / (8mL²), meaning the energy levels are proportional to n² (1 : 4 : 9 : 16...).'
  },
  // Unit 4: Solid State & Semiconductor Physics
  {
    id: 'q-phy-4-1',
    subjectId: 'phy',
    unitIndex: 4,
    unitTitle: 'Solid State & Semiconductor Physics',
    question: 'Where is the Fermi energy level E_F located in an intrinsic semiconductor at absolute zero temperature (0 K)?',
    options: [
      'Exactly midway in the forbidden energy gap between valence and conduction bands',
      'Inside the conduction band',
      'At the top edge of the valence band',
      'Immediately below the donor level'
    ],
    answer: 0,
    explanation: 'In an undoped (intrinsic) semiconductor, the density of states is symmetric, placing the chemical potential (Fermi level) precisely halfway between the valence band maximum and conduction band minimum: E_F = (E_c + E_v)/2.'
  },
  {
    id: 'q-phy-4-2',
    subjectId: 'phy',
    unitIndex: 4,
    unitTitle: 'Solid State & Semiconductor Physics',
    question: 'What is the typical band gap of elemental Silicon at room temperature?',
    options: [
      '~1.1 eV',
      '~0.1 eV',
      '~5.5 eV',
      '0 eV'
    ],
    answer: 0,
    explanation: 'Silicon has an indirect bandgap of approximately 1.12 eV at 300 K, which makes it ideal for room-temperature electronic switching.'
  },
  // Unit 5: Nanomaterials & Superconductivity
  {
    id: 'q-phy-5-1',
    subjectId: 'phy',
    unitIndex: 5,
    unitTitle: 'Nanomaterials & Superconductivity',
    question: 'What phenomenon causes a superconductor to expel all internal magnetic flux lines when cooled below its critical temperature T_c?',
    options: [
      'Meissner effect',
      'Hall effect',
      'Seebeck effect',
      'Stark effect'
    ],
    answer: 0,
    explanation: 'The Meissner effect is the total expulsion of magnetic flux (B = 0) from the interior of a superconducting material as it transitions into the superconducting state.'
  },
  {
    id: 'q-phy-5-2',
    subjectId: 'phy',
    unitIndex: 5,
    unitTitle: 'Nanomaterials & Superconductivity',
    question: 'Why do nanomaterials exhibit dramatically different optical and catalytic properties compared to bulk materials?',
    options: [
      'Massive increase in surface-area-to-volume ratio and quantum confinement effects',
      'Loss of crystalline lattice structure',
      'Complete absence of valence electrons',
      'Increase in classical gravitational attraction between atoms'
    ],
    answer: 0,
    explanation: 'At nanoscale dimensions (<100 nm), a huge percentage of atoms reside at the surface, drastically increasing reactivity, while quantum confinement discretizes energy bands.'
  },

  // ==========================================
  // BASICS OF ELECTRICAL & ELECTRONICS (beee) - 6 Units, 12 Questions
  // ==========================================
  // Unit 0: DC Circuits
  {
    id: 'q-beee-0-1',
    subjectId: 'beee',
    unitIndex: 0,
    unitTitle: 'DC Circuits',
    question: 'Thevenin\'s theorem states that any linear bilateral two-terminal resistive network can be replaced by:',
    options: [
      'A single voltage source V_th in series with a single resistance R_th',
      'A single current source I_n in parallel with a conductance G_n',
      'An ideal transformer with turns ratio 1:1',
      'A bridge circuit of four equal resistors'
    ],
    answer: 0,
    explanation: 'Thevenin\'s theorem replaces any linear active network viewed from two terminals with an open-circuit equivalent voltage source V_th in series with the internal input resistance R_th.'
  },
  {
    id: 'q-beee-0-2',
    subjectId: 'beee',
    unitIndex: 0,
    unitTitle: 'DC Circuits',
    question: 'Maximum Power Transfer to a load resistor R_L occurs when R_L is chosen such that:',
    options: [
      'R_L = R_th (internal Thevenin resistance)',
      'R_L = 0 (short circuit)',
      'R_L = ∞ (open circuit)',
      'R_L = 2 · R_th'
    ],
    answer: 0,
    explanation: 'The Maximum Power Transfer Theorem proves that power delivered to a resistive load is maximized when the load resistance equals the Thevenin resistance of the driving network (R_L = R_th).'
  },
  // Unit 1: AC Circuits
  {
    id: 'q-beee-1-1',
    subjectId: 'beee',
    unitIndex: 1,
    unitTitle: 'AC Circuits',
    question: 'In a series R-L-C circuit at resonance, the net impedance is:',
    options: [
      'Purely resistive and equal to R (minimum impedance)',
      'Infinite (open circuit)',
      'Purely inductive (ωL)',
      'Purely capacitive (1/ωC)'
    ],
    answer: 0,
    explanation: 'At resonance, inductive reactance equals capacitive reactance (X_L = X_C). They cancel out completely in the impedance formula Z = √(R² + (X_L - X_C)²), leaving Z = R, which produces maximum current.'
  },
  {
    id: 'q-beee-1-2',
    subjectId: 'beee',
    unitIndex: 1,
    unitTitle: 'AC Circuits',
    question: 'What is the power factor cos φ in an AC circuit with resistance R and total impedance Z?',
    options: [
      'cos φ = R / Z',
      'cos φ = Z / R',
      'cos φ = X / R',
      'cos φ = R · Z'
    ],
    answer: 0,
    explanation: 'From the impedance triangle, cos φ = Adjacent / Hypotenuse = R / Z, representing the ratio of active power (W) to apparent power (VA).'
  },
  // Unit 2: Transformers & Rotating Machines
  {
    id: 'q-beee-2-1',
    subjectId: 'beee',
    unitIndex: 2,
    unitTitle: 'Transformers & Rotating Machines',
    question: 'What is the RMS induced electromotive force (EMF) equation in a transformer winding with N turns at frequency f and peak flux Φ_m?',
    options: [
      'E = 4.44 · f · N · Φ_m',
      'E = 2.22 · f · N · Φ_m',
      'E = 4 · f · N · Φ_m',
      'E = f · N / Φ_m'
    ],
    answer: 0,
    explanation: 'Average induced EMF is 4 f N Φ_m. Multiplying by the sine wave form factor (1.11) gives the RMS EMF: E = 1.11 × 4 f N Φ_m = 4.44 f N Φ_m.'
  },
  {
    id: 'q-beee-2-2',
    subjectId: 'beee',
    unitIndex: 2,
    unitTitle: 'Transformers & Rotating Machines',
    question: 'In a 3-phase induction motor running at rotor speed N with synchronous speed N_s, what is the fractional slip s?',
    options: [
      's = (N_s - N) / N_s',
      's = (N - N_s) / N',
      's = N / N_s',
      's = N_s / (N_s + N)'
    ],
    answer: 0,
    explanation: 'Slip is the fractional difference between the rotating magnetic stator field speed N_s and rotor mechanical speed N: s = (N_s - N) / N_s.'
  },
  // Unit 3: Semiconductor Devices & Diodes
  {
    id: 'q-beee-3-1',
    subjectId: 'beee',
    unitIndex: 3,
    unitTitle: 'Semiconductor Devices & Diodes',
    question: 'How is a Zener diode normally biased when employed as a steady voltage regulator in a power supply?',
    options: [
      'In reverse bias operating in the breakdown region',
      'In forward bias past the cut-in voltage',
      'In unbiased equilibrium',
      'In alternating forward-reverse pulses'
    ],
    answer: 0,
    explanation: 'A Zener diode exhibits a nearly constant terminal voltage across its breakdown region when reverse-biased, making it an excellent voltage stabilizer.'
  },
  {
    id: 'q-beee-3-2',
    subjectId: 'beee',
    unitIndex: 3,
    unitTitle: 'Semiconductor Devices & Diodes',
    question: 'What is the relationship between the common-emitter current gain β and common-base current gain α of a BJT?',
    options: [
      'β = α / (1 - α)',
      'β = α / (1 + α)',
      'β = (1 - α) / α',
      'β = α²'
    ],
    answer: 0,
    explanation: 'Since I_E = I_B + I_C and α = I_C/I_E while β = I_C/I_B, dividing yields β = α / (1 - α).'
  },
  // Unit 4: Operational Amplifiers
  {
    id: 'q-beee-4-1',
    subjectId: 'beee',
    unitIndex: 4,
    unitTitle: 'Operational Amplifiers',
    question: 'What is the voltage gain A_v of an ideal inverting op-amp circuit with input resistor R_1 and feedback resistor R_f?',
    options: [
      'A_v = -R_f / R_1',
      'A_v = 1 + R_f / R_1',
      'A_v = R_1 / R_f',
      'A_v = -R_1 / (R_1 + R_f)'
    ],
    answer: 0,
    explanation: 'Due to the virtual ground at the inverting terminal, input current is V_in / R_1 and flows through R_f to V_out, resulting in V_out = -(R_f / R_1) V_in.'
  },
  {
    id: 'q-beee-4-2',
    subjectId: 'beee',
    unitIndex: 4,
    unitTitle: 'Operational Amplifiers',
    question: 'Which of the following is an ideal characteristic of an operational amplifier?',
    options: [
      'Infinite open-loop gain and infinite input impedance',
      'Zero open-loop gain and infinite output impedance',
      'Zero common-mode rejection ratio (CMRR)',
      'Narrow bandwidth of only 1 kHz'
    ],
    answer: 0,
    explanation: 'An ideal op-amp possesses infinite open-loop gain (A_OL = ∞), infinite input resistance (R_in = ∞), zero output resistance (R_out = 0), infinite bandwidth, and infinite CMRR.'
  },
  // Unit 5: Electrical Measurements & Instrumentation
  {
    id: 'q-beee-5-1',
    subjectId: 'beee',
    unitIndex: 5,
    unitTitle: 'Electrical Measurements & Instrumentation',
    question: 'Why can a Permanent Magnet Moving Coil (PMMC) instrument NOT directly measure alternating current (AC)?',
    options: [
      'The deflecting torque reverses direction every half-cycle, averaging zero torque',
      'The permanent magnet demagnetizes on AC',
      'The coil experiences infinite resistance on AC',
      'The pointer burns out immediately'
    ],
    answer: 0,
    explanation: 'A PMMC meter deflection is proportional to average current. On sinusoidal AC, the average value over a full cycle is zero, causing the pointer to merely vibrate around zero without deflecting.'
  },
  {
    id: 'q-beee-5-2',
    subjectId: 'beee',
    unitIndex: 5,
    unitTitle: 'Electrical Measurements & Instrumentation',
    question: 'In a Wheatstone bridge with arms P, Q, R, and S, what is the balance condition when no current flows through the galvanometer?',
    options: [
      'P / Q = R / S',
      'P · Q = R · S',
      'P + Q = R + S',
      'P - Q = R - S'
    ],
    answer: 0,
    explanation: 'When the potentials on both sides of the galvanometer are equal, no current flows, which occurs when the ratio of adjacent bridge arms is equal: P / Q = R / S.'
  },

  // ==========================================
  // INTRODUCTION TO AI (ai) - 5 Units, 10 Questions
  // ==========================================
  // Unit 0: Foundations & Intelligent Agents
  {
    id: 'q-ai-0-1',
    subjectId: 'ai',
    unitIndex: 0,
    unitTitle: 'Foundations & Intelligent Agents',
    question: 'In AI agent architecture, what does the acronym PEAS represent?',
    options: [
      'Performance measure, Environment, Actuators, Sensors',
      'Planning, Execution, Action, Strategy',
      'Percepts, Evaluation, Algorithms, State',
      'Probabilistic, Empirical, Analytical, Symbolic'
    ],
    answer: 0,
    explanation: 'PEAS stands for Performance measure (how the agent is judged), Environment (external context), Actuators (output devices to act), and Sensors (input devices to perceive).'
  },
  {
    id: 'q-ai-0-2',
    subjectId: 'ai',
    unitIndex: 0,
    unitTitle: 'Foundations & Intelligent Agents',
    question: 'Which kind of agent maintains an internal world model to track aspects of the environment it cannot currently observe?',
    options: [
      'Model-based reflex agent',
      'Simple reflex agent',
      'Stateless reactive agent',
      'Random search agent'
    ],
    answer: 0,
    explanation: 'A model-based reflex agent maintains an internal state reflecting the unobserved history of the world to make decisions in partially observable environments.'
  },
  // Unit 1: Problem Solving & Search Strategies
  {
    id: 'q-ai-1-1',
    subjectId: 'ai',
    unitIndex: 1,
    unitTitle: 'Problem Solving & Search Strategies',
    question: 'What condition guarantees that the A* search algorithm is admissible and optimal on graphs?',
    options: [
      'The heuristic h(n) is admissible (never overestimates) and consistent (satisfies triangle inequality)',
      'The heuristic h(n) is strictly greater than the true remaining cost',
      'The search queue is implemented as a LIFO stack',
      'All edge costs are strictly negative'
    ],
    answer: 0,
    explanation: 'On graph searches, A* is guaranteed to return the optimal shortest path if its heuristic function h(n) never overestimates the true cost to the goal (admissible) and obeys the triangle inequality h(n) ≤ c(n, a, n\') + h(n\') (consistent).'
  },
  {
    id: 'q-ai-1-2',
    subjectId: 'ai',
    unitIndex: 1,
    unitTitle: 'Problem Solving & Search Strategies',
    question: 'In two-player game tree search with Alpha-Beta pruning, an alpha cutoff occurs at a MIN node when:',
    options: [
      'The current node\'s beta value becomes less than or equal to alpha (β ≤ α)',
      'The depth exceeds the maximum game limit',
      'The heuristic value is zero',
      'Both players choose cooperative strategies'
    ],
    answer: 0,
    explanation: 'Alpha represents the lower bound of score MAX can achieve. When a MIN node discovers an option with value ≤ α, MAX will never choose this branch, allowing all remaining siblings to be pruned.'
  },
  // Unit 2: Knowledge Representation & Logic
  {
    id: 'q-ai-2-1',
    subjectId: 'ai',
    unitIndex: 2,
    unitTitle: 'Knowledge Representation & Logic',
    question: 'What is the primary difference between forward chaining and backward chaining in an inference engine?',
    options: [
      'Forward chaining is data-driven (from facts to conclusions); backward chaining is goal-driven (from query to sub-goals)',
      'Forward chaining is used only for game playing; backward chaining only for NLP',
      'Forward chaining works only on negations; backward chaining only on disjunctions',
      'Forward chaining requires exponential space; backward chaining requires constant space'
    ],
    answer: 0,
    explanation: 'Forward chaining starts with known facts and triggers rules whose premises are satisfied to infer new facts. Backward chaining starts from a hypothesis (goal) and seeks supporting rules and facts.'
  },
  {
    id: 'q-ai-2-2',
    subjectId: 'ai',
    unitIndex: 2,
    unitTitle: 'Knowledge Representation & Logic',
    question: 'In propositional resolution refutation, proving a formula φ from knowledge base KB involves:',
    options: [
      'Adding ¬φ to KB converted to CNF and deriving the empty clause (contradiction □)',
      'Verifying all truth table rows are true',
      'Replacing every implication with an equivalence',
      'Finding an assignment where all variables are false'
    ],
    answer: 0,
    explanation: 'Resolution refutation is a proof by contradiction: we assume ¬φ is true alongside KB. If applying resolution rules yields the empty clause (□), the assumption is false and KB ⊨ φ.'
  },
  // Unit 3: Machine Learning & Neural Networks
  {
    id: 'q-ai-3-1',
    subjectId: 'ai',
    unitIndex: 3,
    unitTitle: 'Machine Learning & Neural Networks',
    question: 'What classic logical function cannot be learned by a single-layer perceptron with a linear decision boundary?',
    options: [
      'XOR (exclusive OR)',
      'AND',
      'OR',
      'NOT'
    ],
    answer: 0,
    explanation: 'As famously shown by Minsky and Papert in 1969, the XOR function is not linearly separable and therefore cannot be solved by a single-layer perceptron without hidden layers.'
  },
  {
    id: 'q-ai-3-2',
    subjectId: 'ai',
    unitIndex: 3,
    unitTitle: 'Machine Learning & Neural Networks',
    question: 'In machine learning gradient descent, what happens if the learning rate η is set excessively high?',
    options: [
      'The optimization can oscillate wildly and diverge away from the minimum',
      'The model converges to the global minimum in a single step',
      'The gradient of the loss function becomes identically zero',
      'The training dataset shrinks in memory'
    ],
    answer: 0,
    explanation: 'An oversized learning rate causes gradient descent to overshoot the valley of the cost function, causing divergence instead of convergence.'
  },
  // Unit 4: Natural Language, Ethics & Future of AI
  {
    id: 'q-ai-4-1',
    subjectId: 'ai',
    unitIndex: 4,
    unitTitle: 'Natural Language, Ethics & Future of AI',
    question: 'The Turing Test assesses machine intelligence based on:',
    options: [
      'Whether a human interrogator in blind text conversation cannot reliably distinguish machine from human responses',
      'The raw FLOPS calculation speed of the neural network processor',
      'Whether the machine can solve chess endgame puzzles under 3 seconds',
      'The physical resemblance of the android to human anatomy'
    ],
    answer: 0,
    explanation: 'Alan Turing proposed the Imitation Game (1950): if a human judge communicating via text cannot distinguish between a machine and a human, the machine exhibits intelligent behavior.'
  },
  {
    id: 'q-ai-4-2',
    subjectId: 'ai',
    unitIndex: 4,
    unitTitle: 'Natural Language, Ethics & Future of AI',
    question: 'Algorithmic bias in AI models most commonly arises from:',
    options: [
      'Historical biases, sampling skews, or unrepresentative demographics in training datasets',
      'Writing the code in Python instead of C++',
      'Using double precision floating point numbers',
      'Excessive cooling of GPU server racks'
    ],
    answer: 0,
    explanation: 'Machine learning systems learn directly from historical data; if the input data reflects systemic inequality or skewed sampling, the model reflects and amplifies those biases.'
  },

  // ==========================================
  // COMPUTER FUNDAMENTALS & EMERGING TECH (cfet) - 5 Units, 10 Questions
  // ==========================================
  // Unit 0: Computer Architecture & Organization
  {
    id: 'q-cfet-0-1',
    subjectId: 'cfet',
    unitIndex: 0,
    unitTitle: 'Computer Architecture & Organization',
    question: 'The classic Von Neumann computer architecture is fundamentally characterized by:',
    options: [
      'Storing both program instructions and user data in the same shared memory space',
      'Separate physical memory buses for instructions and data (Harvard architecture)',
      'Elimination of the arithmetic logic unit (ALU)',
      'Exclusively optical computing components'
    ],
    answer: 0,
    explanation: 'The hallmark of the Von Neumann architecture is a unified memory subsystem that holds both program code and data, accessed over a common bus.'
  },
  {
    id: 'q-cfet-0-2',
    subjectId: 'cfet',
    unitIndex: 0,
    unitTitle: 'Computer Architecture & Organization',
    question: 'In the CPU memory hierarchy, which memory tier provides the fastest access latency?',
    options: [
      'CPU Registers',
      'L1 Cache',
      'Main Memory (DRAM)',
      'Solid State Drive (NVMe SSD)'
    ],
    answer: 0,
    explanation: 'CPU registers reside directly inside the processor data path and operate within a single clock cycle (<1 ns), making them the fastest memory tier.'
  },
  // Unit 1: Data Representation & Digital Logic
  {
    id: 'q-cfet-1-1',
    subjectId: 'cfet',
    unitIndex: 1,
    unitTitle: 'Data Representation & Digital Logic',
    question: 'In 8-bit two\'s complement binary arithmetic, what decimal integer is represented by 11111011₂?',
    options: [
      '-5',
      '-11',
      '+251',
      '-7'
    ],
    answer: 0,
    explanation: 'Since the MSB is 1, it is negative. Inverting all bits gives 00000100₂ (4), and adding 1 yields 00000101₂ (5). Hence the number is -5.'
  },
  {
    id: 'q-cfet-1-2',
    subjectId: 'cfet',
    unitIndex: 1,
    unitTitle: 'Data Representation & Digital Logic',
    question: 'What is the hexadecimal representation of the binary byte 11011010₂?',
    options: [
      '0xDA',
      '0xCB',
      '0xEA',
      '0xD6'
    ],
    answer: 0,
    explanation: 'Group the 8 bits into two 4-bit nibbles: 1101₂ = 13 = D, and 1010₂ = 10 = A. Thus, 11011010₂ = 0xDA.'
  },
  // Unit 2: Operating Systems & Systems Software
  {
    id: 'q-cfet-2-1',
    subjectId: 'cfet',
    unitIndex: 2,
    unitTitle: 'Operating Systems & Systems Software',
    question: 'In operating system process scheduling, a process moves from the "Running" state to the "Waiting/Blocked" state when:',
    options: [
      'It initiates an I/O request or waits for an event/resource',
      'Its allocated CPU time slice expires',
      'It finishes normal execution',
      'It is preempted by a higher priority process'
    ],
    answer: 0,
    explanation: 'A running process transitions to Waiting when it cannot proceed until an external asynchronous event (such as disk I/O or keyboard input) finishes.'
  },
  {
    id: 'q-cfet-2-2',
    subjectId: 'cfet',
    unitIndex: 2,
    unitTitle: 'Operating Systems & Systems Software',
    question: 'What is the purpose of virtual memory paging in modern operating systems?',
    options: [
      'Allow processes to address more contiguous memory than physical RAM and prevent fragmentation',
      'Speed up CPU clock frequency',
      'Compress files on secondary storage',
      'Prevent network unauthorized packets'
    ],
    answer: 0,
    explanation: 'Paging maps non-contiguous frames of physical RAM into contiguous virtual address spaces per process, enabling process memory isolation and swap-to-disk support.'
  },
  // Unit 3: Computer Networks & Internet Technologies
  {
    id: 'q-cfet-3-1',
    subjectId: 'cfet',
    unitIndex: 3,
    unitTitle: 'Computer Networks & Internet Technologies',
    question: 'Which layer of the 7-layer OSI Reference Model is responsible for end-to-end reliable transmission and flow control?',
    options: [
      'Transport Layer (Layer 4)',
      'Network Layer (Layer 3)',
      'Data Link Layer (Layer 2)',
      'Session Layer (Layer 5)'
    ],
    answer: 0,
    explanation: 'The Transport Layer (Layer 4, e.g. TCP) manages end-to-end communication, segmentation, flow control, error recovery, and port multiplexing.'
  },
  {
    id: 'q-cfet-3-2',
    subjectId: 'cfet',
    unitIndex: 3,
    unitTitle: 'Computer Networks & Internet Technologies',
    question: 'What is a fundamental difference between TCP and UDP protocols?',
    options: [
      'TCP is connection-oriented and guarantees packet delivery; UDP is connectionless and best-effort',
      'TCP operates on Layer 2; UDP operates on Layer 7',
      'UDP encrypts all packets; TCP sends plaintext',
      'TCP is used only for real-time video streaming; UDP for banking transactions'
    ],
    answer: 0,
    explanation: 'TCP establishes a 3-way handshake and retransmits lost packets for reliable transfer, whereas UDP sends packets without handshakes or retransmissions for low-latency streaming.'
  },
  // Unit 4: Emerging Technologies & Cloud Computing
  {
    id: 'q-cfet-4-1',
    subjectId: 'cfet',
    unitIndex: 4,
    unitTitle: 'Emerging Technologies & Cloud Computing',
    question: 'Which cloud service model provides virtualized compute instances, storage, and networking where users manage their own OS and software?',
    options: [
      'Infrastructure as a Service (IaaS)',
      'Platform as a Service (PaaS)',
      'Software as a Service (SaaS)',
      'Function as a Service (FaaS)'
    ],
    answer: 0,
    explanation: 'IaaS (such as AWS EC2 or Google Compute Engine) provisions raw virtualized hardware infrastructure, leaving OS installation, patching, and application stacks to the customer.'
  },
  {
    id: 'q-cfet-4-2',
    subjectId: 'cfet',
    unitIndex: 4,
    unitTitle: 'Emerging Technologies & Cloud Computing',
    question: 'In blockchain architecture, what mechanism prevents malicious tampering with past transaction history?',
    options: [
      'Cryptographic hash pointers linking each block to the hash of the preceding block',
      'Centralized password authentication by an administrator',
      'Deleting old blocks every 24 hours',
      'Storing transactions as unencrypted CSV tables'
    ],
    answer: 0,
    explanation: 'Each block contains the SHA-256 cryptographic hash of its predecessor. Modifying any past transaction invalidates all subsequent block hashes, which is detected by the consensus network.'
  },

  // ==========================================
  // ESSENCE OF INDIAN CONSTITUTION (eic) - 5 Units, 10 Questions
  // ==========================================
  // Unit 0: Historical Background & Philosophy
  {
    id: 'q-eic-0-1',
    subjectId: 'eic',
    unitIndex: 0,
    unitTitle: 'Historical Background & Philosophy',
    question: 'Who served as the Chairman of the Drafting Committee of the Indian Constituent Assembly?',
    options: [
      'Dr. B.R. Ambedkar',
      'Dr. Rajendra Prasad',
      'Jawaharlal Nehru',
      'Sardar Vallabhbhai Patel'
    ],
    answer: 0,
    explanation: 'Dr. Bhimrao Ramji Ambedkar chaired the Drafting Committee appointed on 29 August 1947 and is acclaimed as the chief architect of the Indian Constitution.'
  },
  {
    id: 'q-eic-0-2',
    subjectId: 'eic',
    unitIndex: 0,
    unitTitle: 'Historical Background & Philosophy',
    question: 'Which three words were inserted into the Preamble of the Indian Constitution by the 42nd Constitutional Amendment Act of 1976?',
    options: [
      'Socialist, Secular, and Integrity',
      'Democratic, Republic, and Sovereign',
      'Liberty, Equality, and Fraternity',
      'Justice, Federalism, and Unity'
    ],
    answer: 0,
    explanation: 'The 42nd Amendment (1976) amended the Preamble description from "Sovereign Democratic Republic" to "Sovereign Socialist Secular Democratic Republic" and added "and integrity".'
  },
  // Unit 1: Fundamental Rights & Enforcement
  {
    id: 'q-eic-1-1',
    subjectId: 'eic',
    unitIndex: 1,
    unitTitle: 'Fundamental Rights & Enforcement',
    question: 'Under which Article can a citizen approach the Supreme Court directly for the enforcement of Fundamental Rights?',
    options: [
      'Article 32',
      'Article 226',
      'Article 14',
      'Article 356'
    ],
    answer: 0,
    explanation: 'Article 32 grants the Right to Constitutional Remedies, empowering citizens to move the Supreme Court directly via writs (Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari).'
  },
  {
    id: 'q-eic-1-2',
    subjectId: 'eic',
    unitIndex: 1,
    unitTitle: 'Fundamental Rights & Enforcement',
    question: 'Which Article guarantees Protection of Life and Personal Liberty ("No person shall be deprived of his life or personal liberty except according to procedure established by law")?',
    options: [
      'Article 21',
      'Article 19',
      'Article 15',
      'Article 25'
    ],
    answer: 0,
    explanation: 'Article 21 guarantees the fundamental right to life and personal liberty, expanded by judicial interpretation to encompass dignity, privacy, and clean environment.'
  },
  // Unit 2: Directive Principles & Fundamental Duties
  {
    id: 'q-eic-2-1',
    subjectId: 'eic',
    unitIndex: 2,
    unitTitle: 'Directive Principles & Fundamental Duties',
    question: 'Are the Directive Principles of State Policy (Part IV) legally enforceable by courts of law?',
    options: [
      'No, they are non-justiciable guidelines fundamental in the governance of the country',
      'Yes, citizens can file writs in the Supreme Court to force immediate legislation',
      'Yes, they take absolute legal precedence over all Fundamental Rights',
      'Only if approved by the Governor of the respective state'
    ],
    answer: 0,
    explanation: 'Article 37 explicitly declares that DPSP are non-justiciable (cannot be enforced by court orders), yet they remain fundamental principles guiding state policy.'
  },
  {
    id: 'q-eic-2-2',
    subjectId: 'eic',
    unitIndex: 2,
    unitTitle: 'Directive Principles & Fundamental Duties',
    question: 'In which Part and Article of the Constitution are Fundamental Duties inscribed?',
    options: [
      'Part IV-A, Article 51-A',
      'Part III, Article 19',
      'Part II, Article 9',
      'Part IX, Article 243'
    ],
    answer: 0,
    explanation: 'Fundamental Duties were added by the 42nd Amendment (1976) upon recommendations of the Swaran Singh Committee into Article 51-A of Part IV-A.'
  },
  // Unit 3: Union Government & Federal Structure
  {
    id: 'q-eic-3-1',
    subjectId: 'eic',
    unitIndex: 3,
    unitTitle: 'Union Government & Federal Structure',
    question: 'What is the constitutional status of the President of India?',
    options: [
      'De jure constitutional head of state acting on the aid and advice of the Council of Ministers (Article 74)',
      'Absolute executive monarch with unilateral lawmaking supremacy',
      'Leader of the opposition in the Lok Sabha',
      'Head of the civil service with judicial immunity'
    ],
    answer: 0,
    explanation: 'The President is the executive head of the Union of India, but operates constitutionally on the mandatory aid and advice of the Council of Ministers headed by the Prime Minister (Article 74).'
  },
  {
    id: 'q-eic-3-2',
    subjectId: 'eic',
    unitIndex: 3,
    unitTitle: 'Union Government & Federal Structure',
    question: 'Money Bills in the Parliament can only be introduced in:',
    options: [
      'Lok Sabha (with prior recommendation of the President)',
      'Rajya Sabha only',
      'Either House of Parliament interchangeably',
      'A joint sitting of both Houses'
    ],
    answer: 0,
    explanation: 'Article 109 specifies that a Money Bill cannot be introduced in the Rajya Sabha. It can only originate in the Lok Sabha upon recommendation of the President.'
  },
  // Unit 4: Judiciary & Constitutional Amendments
  {
    id: 'q-eic-4-1',
    subjectId: 'eic',
    unitIndex: 4,
    unitTitle: 'Judiciary & Constitutional Amendments',
    question: 'In which landmark case did the Supreme Court of India establish the "Basic Structure Doctrine"?',
    options: [
      'Kesavananda Bharati v. State of Kerala (1973)',
      'Golaknath v. State of Punjab (1967)',
      'Maneka Gandhi v. Union of India (1978)',
      'Minerva Mills v. Union of India (1980)'
    ],
    answer: 0,
    explanation: 'In Kesavananda Bharati (1973), a 13-judge constitutional bench ruled that Parliament can amend any part of the Constitution under Article 368, but cannot alter its "Basic Structure".'
  },
  {
    id: 'q-eic-4-2',
    subjectId: 'eic',
    unitIndex: 4,
    unitTitle: 'Judiciary & Constitutional Amendments',
    question: 'Which Article outlines the procedure for amending the Constitution of India?',
    options: [
      'Article 368',
      'Article 352',
      'Article 370',
      'Article 324'
    ],
    answer: 0,
    explanation: 'Part XX, Article 368 provides the power and procedure by which Parliament may amend the Constitution by special majority.'
  },

  // ==========================================
  // UNIVERSAL HUMAN VALUES (uhv) - 5 Units, 10 Questions
  // ==========================================
  // Unit 0: Introduction to Value Education
  {
    id: 'q-uhv-0-1',
    subjectId: 'uhv',
    unitIndex: 0,
    unitTitle: 'Introduction to Value Education',
    question: 'What is the primary method of value education advocated in UHV?',
    options: [
      'Self-exploration through natural acceptance and experiential validation',
      'Rote memorization of religious scriptures',
      'External preaching and moral policing',
      'Classroom punishment for rule violations'
    ],
    answer: 0,
    explanation: 'Value education in UHV operates through self-exploration: observing one\'s natural acceptance (what is naturally acceptable to all) and validating it through direct living experience.'
  },
  {
    id: 'q-uhv-0-2',
    subjectId: 'uhv',
    unitIndex: 0,
    unitTitle: 'Introduction to Value Education',
    question: 'In UHV, the basic human aspirations for all individuals are summarized as:',
    options: [
      'Continuous happiness and prosperity (Sukha and Samridhi)',
      'Accumulation of unlimited physical facilities (Suvidha)',
      'Domination over others through political power',
      'Ascetic isolation from society'
    ],
    answer: 0,
    explanation: 'All human beings fundamentally desire continuous happiness (Sukha) and a feeling of having more than required physical facilities (prosperity / Samridhi).'
  },
  // Unit 1: Harmony in the Human Being
  {
    id: 'q-uhv-1-1',
    subjectId: 'uhv',
    unitIndex: 1,
    unitTitle: 'Harmony in the Human Being',
    question: 'The human being is an integrated coexistence of:',
    options: [
      'The Self (\'I\', conscious entity) and the Body (material entity)',
      'Only the physical material body with no consciousness',
      'Two opposing brains fighting for dominance',
      'Genetic code and social media influence'
    ],
    answer: 0,
    explanation: 'A human being is the harmonious coexistence of the conscious Self (\'I\', which desires happiness and understanding) and the material Body (which requires physical facilities).'
  },
  {
    id: 'q-uhv-1-2',
    subjectId: 'uhv',
    unitIndex: 1,
    unitTitle: 'Harmony in the Human Being',
    question: 'What is "Sanyama" (Self-regulation) in relation to the Body?',
    options: [
      'The feeling of responsibility in the Self for nurturing, protecting, and rightly utilizing the Body',
      'Forced starvation and sleep deprivation',
      'Consuming medicines without dietary regulation',
      'Ignoring physical symptoms of fatigue'
    ],
    answer: 0,
    explanation: 'Sanyama is the self-regulation of the Self (\'I\') taking active responsibility for keeping the Body healthy (Swasthya) through proper nourishment, care, and usage.'
  },
  // Unit 2: Harmony in the Family & Society
  {
    id: 'q-uhv-2-1',
    subjectId: 'uhv',
    unitIndex: 2,
    unitTitle: 'Harmony in the Family & Society',
    question: 'What is recognized as the foundational value (Neev-Mulya) in human-to-human relationships?',
    options: [
      'Trust (Vishwas)',
      'Jealousy (Irshya)',
      'Competition (Spardha)',
      'Fear (Bhaya)'
    ],
    answer: 0,
    explanation: 'Trust (Vishwas) is the foundational value in relationships: the assurance that the other human being inherently wants my happiness and well-being.'
  },
  {
    id: 'q-uhv-2-2',
    subjectId: 'uhv',
    unitIndex: 2,
    unitTitle: 'Harmony in the Family & Society',
    question: 'Respect (Samman) at the level of the Self means:',
    options: [
      'Right evaluation (Samyak Mulyankan) without over-evaluation, under-evaluation, or otherwise-evaluation',
      'Flattering someone because of their wealthy status',
      'Submitting blindly to authority',
      'Giving expensive gifts on special occasions'
    ],
    answer: 0,
    explanation: 'Respect is right evaluation: recognizing the other person for who they truly are as a conscious human being, without differentiation based on body, wealth, or beliefs.'
  },
  // Unit 3: Harmony in Nature & Existence
  {
    id: 'q-uhv-3-1',
    subjectId: 'uhv',
    unitIndex: 3,
    unitTitle: 'Harmony in Nature & Existence',
    question: 'What are the four recognized orders in Nature?',
    options: [
      'Material order (Padartha), Pranic/Plant order (Prana), Animal order (Jiva), Human order (Gyana)',
      'Solid, Liquid, Gas, Plasma',
      'Minerals, Metals, Plastics, Electronics',
      'Sky, Earth, Water, Fire'
    ],
    answer: 0,
    explanation: 'Nature comprises four mutually enriching orders: Physical/Material order (soil, water), Bio/Pranic order (plants), Animal order, and Human order (knowledge-endowed).'
  },
  {
    id: 'q-uhv-3-2',
    subjectId: 'uhv',
    unitIndex: 3,
    unitTitle: 'Harmony in Nature & Existence',
    question: 'Nature is characterized by mutual fulfillment (Parasparta) and cyclicity (Avartansheelata). Human participation is harmonious when humans:',
    options: [
      'Enrich and preserve the ecological cycles rather than exploiting and depleting resources',
      'Deforest natural reserves to maximize short-term factory throughput',
      'Consume fossil fuels without recycling',
      'Eliminate all other species from urban habitats'
    ],
    answer: 0,
    explanation: 'In nature, the first three orders are naturally mutually enriching. Humans must align with this cyclicity by utilizing resources sustainably without causing ecological imbalance.'
  },
  // Unit 4: Implications on Professional Ethics
  {
    id: 'q-uhv-4-1',
    subjectId: 'uhv',
    unitIndex: 4,
    unitTitle: 'Implications on Professional Ethics',
    question: 'Professional ethics is naturally sustained when an engineer possesses:',
    options: [
      'Value competence (clarity of human purpose) alongside technical skill competence',
      'Only profit maximization skills regardless of environmental impact',
      'Strict legal compliance only when under threat of government audits',
      'A diploma without understanding safety protocols'
    ],
    answer: 0,
    explanation: 'True professional ethics stems from internal value clarity (understanding holistic human welfare) guiding technical competence to produce humane and sustainable solutions.'
  },
  {
    id: 'q-uhv-4-2',
    subjectId: 'uhv',
    unitIndex: 4,
    unitTitle: 'Implications on Professional Ethics',
    question: 'A truly eco-friendly, people-friendly production technology is one that is:',
    options: [
      'Cyclical, renewable, decentralized, and conducive to human well-being',
      'Depleting non-renewable resources at maximum speed',
      'Generates toxic non-biodegradable waste with zero recycling',
      'Centralized and dependent on child labor'
    ],
    answer: 0,
    explanation: 'Appropriate humane technology relies on local renewable resources, maintains cyclical processes with zero hazardous waste, and preserves human dignity.'
  },

  // ==========================================
  // PROGRAMMING FOR PROBLEM SOLVING LAB (pps) - 6 Units, 12 Questions
  // ==========================================
  // Unit 0: C Fundamentals & Data Types
  {
    id: 'q-pps-0-1',
    subjectId: 'pps',
    unitIndex: 0,
    unitTitle: 'C Fundamentals & Data Types',
    question: 'What is the format specifier used in printf to output an unsigned hexadecimal integer in uppercase in C?',
    options: [
      '%X',
      '%x',
      '%h',
      '%p'
    ],
    answer: 0,
    explanation: 'In C format strings, %X outputs hexadecimal in uppercase letters (A-F), whereas %x outputs lowercase letters.'
  },
  {
    id: 'q-pps-0-2',
    subjectId: 'pps',
    unitIndex: 0,
    unitTitle: 'C Fundamentals & Data Types',
    question: 'What will be the output of `printf("%d", 5 / 2);` in standard C?',
    options: [
      '2',
      '2.5',
      '3',
      '0'
    ],
    answer: 0,
    explanation: 'In C, dividing two integer constants performs integer truncation division, discarding the fractional part: 5 / 2 evaluates to 2.'
  },
  // Unit 1: Control Flow & Conditionals
  {
    id: 'q-pps-1-1',
    subjectId: 'pps',
    unitIndex: 1,
    unitTitle: 'Control Flow & Conditionals',
    question: 'What happens in a C `switch` statement if a matching `case` does NOT contain a `break` statement?',
    options: [
      'Execution falls through into the subsequent case statements until a break or end of switch is encountered',
      'The compiler raises a syntax error',
      'The program aborts with a segmentation fault',
      'The switch statement restarts from the beginning'
    ],
    answer: 0,
    explanation: 'In C, cases fall through sequentially by default unless explicitly terminated by a `break`, `return`, or `goto` statement.'
  },
  {
    id: 'q-pps-1-2',
    subjectId: 'pps',
    unitIndex: 1,
    unitTitle: 'Control Flow & Conditionals',
    question: 'What is the value of the ternary expression `x = (a > b) ? a : b;` when a = 7 and b = 12?',
    options: [
      '12',
      '7',
      '1',
      '0'
    ],
    answer: 0,
    explanation: 'Since 7 > 12 is false (0), the ternary operator evaluates and returns the expression after the colon, which is b (12).'
  },
  // Unit 2: Loops & Iterations
  {
    id: 'q-pps-2-1',
    subjectId: 'pps',
    unitIndex: 2,
    unitTitle: 'Loops & Iterations',
    question: 'What is the key difference between a `while` loop and a `do-while` loop in C?',
    options: [
      'A `do-while` loop executes its body at least once before testing the condition; a `while` loop checks the condition first',
      'A `while` loop cannot use integer counters',
      'A `do-while` loop cannot use `break` statements',
      'A `while` loop executes in parallel threads'
    ],
    answer: 0,
    explanation: '`while` is an entry-controlled loop (may execute 0 times if condition is initially false), whereas `do-while` is exit-controlled and always runs at least once.'
  },
  {
    id: 'q-pps-2-2',
    subjectId: 'pps',
    unitIndex: 2,
    unitTitle: 'Loops & Iterations',
    question: 'Inside a loop, what does the `continue` statement do?',
    options: [
      'Skips the remainder of the current iteration body and jumps to the loop update/condition check',
      'Terminates the entire loop immediately',
      'Resets the counter variable to zero',
      'Exits the program with code 0'
    ],
    answer: 0,
    explanation: '`continue` bypasses the remaining statements in the active loop iteration and transfers control to the increment step in `for` loops or condition test in `while` loops.'
  },
  // Unit 3: Arrays & String Manipulation
  {
    id: 'q-pps-3-1',
    subjectId: 'pps',
    unitIndex: 3,
    unitTitle: 'Arrays & String Manipulation',
    question: 'How are standard C strings terminated in memory?',
    options: [
      'With a null character `\\0` (ASCII value 0)',
      'With a newline character `\\n`',
      'With a space character \' \'',
      'With a special EOF token'
    ],
    answer: 0,
    explanation: 'In C, strings are null-terminated character arrays; standard library functions like `strlen` and `strcpy` rely on the terminating `\\0` byte to detect the end of the string.'
  },
  {
    id: 'q-pps-3-2',
    subjectId: 'pps',
    unitIndex: 3,
    unitTitle: 'Arrays & String Manipulation',
    question: 'Given declaration `int arr[5] = {10, 20, 30, 40, 50};`, what does `*(arr + 2)` evaluate to?',
    options: [
      '30',
      '20',
      '10',
      'Address of arr[2]'
    ],
    answer: 0,
    explanation: 'In C pointer arithmetic, `*(arr + i)` is exactly equivalent to `arr[i]`. Thus `*(arr + 2)` accesses element index 2, which is 30.'
  },
  // Unit 4: Functions & Pointers
  {
    id: 'q-pps-4-1',
    subjectId: 'pps',
    unitIndex: 4,
    unitTitle: 'Functions & Pointers',
    question: 'To modify the value of an external variable inside a function (pass-by-reference simulation in C), one must pass:',
    options: [
      'The memory address of the variable using the address-of operator `&` and accept it as a pointer `*`',
      'The variable name enclosed in quotation marks',
      'A copy of the variable by value',
      'The return value of sizeof()'
    ],
    answer: 0,
    explanation: 'Since C is strictly pass-by-value, passing the address `&x` and dereferencing the pointer parameter `*ptr` inside the function allows direct modification of the caller\'s variable.'
  },
  {
    id: 'q-pps-4-2',
    subjectId: 'pps',
    unitIndex: 4,
    unitTitle: 'Functions & Pointers',
    question: 'What is a "dangling pointer" in C programming?',
    options: [
      'A pointer that points to a memory location that has already been freed or deallocated',
      'A pointer initialized to NULL',
      'A pointer pointing to a read-only string literal',
      'A function pointer with no arguments'
    ],
    answer: 0,
    explanation: 'A dangling pointer points to invalid storage (e.g., after `free(ptr)` or when a local stack variable goes out of scope). Dereferencing it leads to undefined behavior.'
  },
  // Unit 5: Structures, Unions & File Handling
  {
    id: 'q-pps-5-1',
    subjectId: 'pps',
    unitIndex: 5,
    unitTitle: 'Structures, Unions & File Handling',
    question: 'What is the primary difference in memory allocation between a `struct` and a `union` in C?',
    options: [
      'In a struct, each member has its own separate memory; in a union, all members share the same overlapping memory space',
      'A union can store strings while a struct cannot',
      'A struct cannot be nested inside another struct',
      'A union allocates twice the sum of its member sizes'
    ],
    answer: 0,
    explanation: 'The size of a `struct` is at least the sum of the sizes of its members (plus padding), while the size of a `union` is equal to the size of its largest member, as members overlay the same storage.'
  },
  {
    id: 'q-pps-5-2',
    subjectId: 'pps',
    unitIndex: 5,
    unitTitle: 'Structures, Unions & File Handling',
    question: 'What file open mode should be used with `fopen()` to append new data to the end of an existing file without overwriting it?',
    options: [
      '"a"',
      '"w"',
      '"r"',
      '"w+"'
    ],
    answer: 0,
    explanation: 'Mode "a" (append) opens the file for writing at the end of the file. If the file exists, previous contents are preserved; if it does not exist, it is created.'
  }
];

export const getQuestionsForUnit = (subjectId: string, unitIndex: number): QuizQuestion[] => {
  return QUIZ_BANK.filter((q) => q.subjectId === subjectId && q.unitIndex === unitIndex);
};

export const getRandomMockQuestions = (count = 20): QuizQuestion[] => {
  const shuffled = [...QUIZ_BANK].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
