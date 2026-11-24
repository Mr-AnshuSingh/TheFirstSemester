// ============================================================================
// M&C MID-SEM REVISION: COMPREHENSIVE TICKABLE OBJECTIVE MCQ BANK
// 6 Official Exam Subjects · Units 1, 2, and 3 · BEU Sister College Exam Pattern
// ============================================================================

export interface MidsemMcq {
  id: string;
  courseCode: string;
  subject: "BEEE" | "Math-I" | "Physics" | "IAI" | "CFET" | "UHV";
  unitNo: number;
  topic: string;
  q: string;
  options: string[];
  ans: number; // 0-based index
  explanation: string;
}

export const MIDSEM_MCQS: MidsemMcq[] = [
  {
    "id": "beee_u1_q1",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 1,
    "topic": "DC Circuits: Maximum Power Transfer",
    "q": "Under Maximum Power Transfer condition, the efficiency of power transfer from a source with internal resistance R_th to load R_L is:",
    "options": [
      "100%",
      "75%",
      "50%",
      "25%"
    ],
    "ans": 2,
    "explanation": "At maximum power transfer, R_L = R_th. The power dissipated in source internal resistance equals power delivered to load: P_in = 2*P_load, yielding exactly 50% efficiency."
  },
  {
    "id": "beee_u1_q2",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 1,
    "topic": "DC Circuits: Thevenin vs Norton",
    "q": "The relationship between Norton current I_N, Thevenin voltage V_th, and Thevenin resistance R_th is:",
    "options": [
      "I_N = V_th * R_th",
      "I_N = V_th / R_th",
      "V_th = I_N / R_th",
      "R_th = V_th * I_N"
    ],
    "ans": 1,
    "explanation": "Norton's equivalent circuit is the source dual of Thevenin's equivalent. By source transformation, short-circuit current I_N = V_th / R_th."
  },
  {
    "id": "beee_u1_q3",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 1,
    "topic": "DC Circuits: Superposition Theorem",
    "q": "When applying the Superposition Theorem, independent ideal voltage sources are replaced by ____ and independent ideal current sources by ____:",
    "options": [
      "Short circuit, Open circuit",
      "Open circuit, Short circuit",
      "Infinite resistance, Zero resistance",
      "Their Norton duals"
    ],
    "ans": 0,
    "explanation": "Ideal voltage sources have zero internal impedance (replaced by a short circuit 0 V). Ideal current sources have infinite internal impedance (replaced by an open circuit 0 A)."
  },
  {
    "id": "beee_u2_q1",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 2,
    "topic": "AC Circuits: Form Factor",
    "q": "For a pure sinusoidal alternating voltage, the Form Factor is defined as the ratio of:",
    "options": [
      "Peak value to Average value",
      "RMS value to Average value (equals 1.11)",
      "Average value to RMS value",
      "Peak value to RMS value"
    ],
    "ans": 1,
    "explanation": "Form Factor k_f = V_rms / V_avg = (V_m / sqrt(2)) / (2*V_m / pi) = pi / (2*sqrt(2)) = 1.1107 ≈ 1.11."
  },
  {
    "id": "beee_u2_q2",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 2,
    "topic": "AC Circuits: Series Resonance",
    "q": "In a series RLC circuit at resonant frequency f_0, the impedance of the circuit is:",
    "options": [
      "Maximum and purely inductive",
      "Minimum and purely resistive (Z = R)",
      "Zero",
      "Purely capacitive"
    ],
    "ans": 1,
    "explanation": "At resonance, inductive reactance X_L cancels capacitive reactance X_C (X_L = X_C). Hence Z = sqrt(R^2 + (X_L - X_C)^2) = R, which is minimum, drawing maximum current."
  },
  {
    "id": "beee_u2_q3",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 2,
    "topic": "AC Circuits: 3-Phase Systems",
    "q": "In a balanced 3-phase Star (Y) connected supply, the relationship between line voltage V_L and phase voltage V_ph is:",
    "options": [
      "V_L = V_ph",
      "V_L = sqrt(3) * V_ph and leads by 30°",
      "V_L = V_ph / sqrt(3)",
      "I_L = sqrt(3) * I_ph"
    ],
    "ans": 1,
    "explanation": "In star connection, line voltage is the phasor difference of two phase voltages: V_RY = V_RN - V_YN = sqrt(3) * V_ph, leading the corresponding phase voltage by 30°."
  },
  {
    "id": "beee_u3_q1",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "Semiconductors: Rectifiers",
    "q": "The maximum rectification efficiency of a Full-Wave Bridge Rectifier is:",
    "options": [
      "40.6%",
      "50.0%",
      "81.2%",
      "100%"
    ],
    "ans": 2,
    "explanation": "Theoretical maximum efficiency of a full-wave rectifier is η_max = 8 / pi^2 ≈ 81.2%, which is exactly double that of a half-wave rectifier (40.6%)."
  },
  {
    "id": "beee_u3_q2",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "Semiconductors: Ripple Factor",
    "q": "The ripple factor of an ideal Full-Wave Rectifier without a filter is:",
    "options": [
      "1.21",
      "0.482",
      "0.00",
      "0.707"
    ],
    "ans": 1,
    "explanation": "Ripple factor γ = sqrt((V_rms/V_dc)^2 - 1) = sqrt(((V_m/sqrt(2)) / (2*V_m/pi))^2 - 1) = sqrt((pi^2 / 8) - 1) = sqrt(1.2337 - 1) = 0.482."
  },
  {
    "id": "beee_u3_q3",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "Semiconductors: Zener Diode",
    "q": "A Zener diode is operated in which region when utilized as a constant DC voltage regulator?",
    "options": [
      "Forward active bias",
      "Reverse breakdown region",
      "Cut-off region",
      "Thermal runaway"
    ],
    "ans": 1,
    "explanation": "A Zener diode exhibits a sharp, vertical breakdown at voltage V_Z under reverse bias. Its voltage remains virtually constant despite wide variations in load or input current."
  },
  {
    "id": "beee_u3_q4",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "Semiconductors: BJT Current Gain",
    "q": "If the common-base current gain α of a transistor is 0.98, its common-emitter current gain β is:",
    "options": [
      "49",
      "50",
      "98",
      "196"
    ],
    "ans": 0,
    "explanation": "β = α / (1 - α) = 0.98 / (1 - 0.98) = 0.98 / 0.02 = 49."
  },
  {
    "id": "math1_u1_q1",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 1,
    "topic": "Linear Algebra: Rank of Matrix",
    "q": "The rank of an m × n zero matrix is:",
    "options": [
      "1",
      "0",
      "min(m, n)",
      "Undetermined"
    ],
    "ans": 1,
    "explanation": "By definition, the rank of a null matrix is 0 because there are zero non-zero rows in its row echelon form."
  },
  {
    "id": "math1_u1_q2",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 1,
    "topic": "Linear Algebra: Cayley-Hamilton",
    "q": "If A is a 2×2 matrix with trace = 5 and det(A) = 6, then by Cayley-Hamilton Theorem, A satisfies:",
    "options": [
      "A^2 - 5A + 6I = 0",
      "A^2 + 5A + 6I = 0",
      "A^2 - 6A + 5I = 0",
      "A^2 + 6A - 5I = 0"
    ],
    "ans": 0,
    "explanation": "The characteristic equation of a 2x2 matrix is λ^2 - Trace(A)*λ + Det(A) = 0. Replacing λ with A gives A^2 - 5A + 6I = 0."
  },
  {
    "id": "math1_u1_q3",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 1,
    "topic": "Linear Algebra: Consistency",
    "q": "A linear system AX = B of n equations in n unknowns has infinitely many solutions if:",
    "options": [
      "ρ(A) ≠ ρ(A|B)",
      "ρ(A) = ρ(A|B) = n",
      "ρ(A) = ρ(A|B) = r < n",
      "det(A) ≠ 0"
    ],
    "ans": 2,
    "explanation": "By Rouche-Capelli theorem, when ρ(A) = ρ(A|B) = r < n, the system is consistent with (n - r) free parameters, generating infinitely many solutions."
  },
  {
    "id": "math1_u2_q1",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 2,
    "topic": "Single Variable Calculus: Rolle's Theorem",
    "q": "For f(x) = x*(x-3)^2 on [0, 3], the point c satisfying Rolle's theorem f'(c) = 0 is:",
    "options": [
      "c = 1",
      "c = 2",
      "c = 1.5",
      "c = 0.5"
    ],
    "ans": 0,
    "explanation": "f(0) = 0, f(3) = 0. f(x) = x*(x^2 - 6x + 9) = x^3 - 6x^2 + 9x. f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3). Setting f'(c) = 0 gives c = 1 and c = 3. Since c must lie in open interval (0, 3), c = 1."
  },
  {
    "id": "math1_u2_q2",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 2,
    "topic": "Single Variable Calculus: Radius of Curvature",
    "q": "The radius of curvature ρ for a curve y = f(x) in Cartesian coordinates is given by:",
    "options": [
      "(1 + y1^2)^(3/2) / y2",
      "(1 + y1^2) / y2^2",
      "y2 / (1 + y1^2)^(3/2)",
      "sqrt(1 + y1^2) / y2"
    ],
    "ans": 0,
    "explanation": "The standard Cartesian formula for radius of curvature is ρ = [1 + (dy/dx)^2]^(3/2) / |d^2y/dx^2| = (1 + y1^2)^(3/2) / y2."
  },
  {
    "id": "math1_u2_q3",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 2,
    "topic": "Single Variable Calculus: Leibnitz Theorem",
    "q": "Leibnitz's theorem is used to determine:",
    "options": [
      "The definite integral of rational functions",
      "The n-th derivative of the product of two functions",
      "The roots of a polynomial equation",
      "The limits of indeterminate forms"
    ],
    "ans": 1,
    "explanation": "Leibnitz's theorem generalizes the product rule: (u*v)_n = u_n*v + n*u_(n-1)*v_1 + (n(n-1)/2!)*u_(n-2)*v_2 + ... + u*v_n."
  },
  {
    "id": "math1_u3_q1",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 3,
    "topic": "Multivariable Calculus: Euler's Theorem",
    "q": "If u(x, y) = (x^3 + y^3) / (x + y), then x*(∂u/∂x) + y*(∂u/∂y) is equal to:",
    "options": [
      "u",
      "2u",
      "3u",
      "0"
    ],
    "ans": 1,
    "explanation": "Degree of numerator is 3, degree of denominator is 1, so u is homogeneous of degree n = 3 - 1 = 2. By Euler's Theorem, x*(∂u/∂x) + y*(∂u/∂y) = n*u = 2u."
  },
  {
    "id": "math1_u3_q2",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 3,
    "topic": "Multivariable Calculus: Extrema Condition",
    "q": "Let r = f_xx, s = f_xy, t = f_yy. At a stationary point where f_x = 0 and f_y = 0, a local MINIMUM occurs when:",
    "options": [
      "rt - s^2 > 0 and r > 0",
      "rt - s^2 > 0 and r < 0",
      "rt - s^2 < 0",
      "rt - s^2 = 0"
    ],
    "ans": 0,
    "explanation": "When discriminant D = rt - s^2 > 0, the Hessian matrix is definite. If r > 0, it is positive definite, indicating a local minimum."
  },
  {
    "id": "math1_u3_q3",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 3,
    "topic": "Multivariable Calculus: Jacobians",
    "q": "For transformation from Cartesian (x, y) to polar coordinates (r, θ) with x = r*cos θ, y = r*sin θ, the Jacobian J = ∂(x, y)/∂(r, θ) is:",
    "options": [
      "1",
      "r",
      "r^2",
      "1 / r"
    ],
    "ans": 1,
    "explanation": "J = |∂x/∂r, ∂x/∂θ; ∂y/∂r, ∂y/∂θ| = |cos θ, -r*sin θ; sin θ, r*cos θ| = r*(cos^2 θ + sin^2 θ) = r."
  },
  {
    "id": "phy_u1_q1",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 1,
    "topic": "Wave Optics: Newton's Rings",
    "q": "In Newton's rings experiment viewed under reflected light, the diameter of the n-th dark ring D_n is proportional to:",
    "options": [
      "n",
      "sqrt(n)",
      "n^2",
      "1 / sqrt(n)"
    ],
    "ans": 1,
    "explanation": "For reflected Newton's rings, D_n^2 = 4*n*R*λ ==> D_n = 2*sqrt(n*R*λ), which is directly proportional to sqrt(n) (square root of natural numbers)."
  },
  {
    "id": "phy_u1_q2",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 1,
    "topic": "Wave Optics: Thin Film Phase Change",
    "q": "When light reflects at the boundary of an optically denser medium (glass), the additional path difference introduced according to Stokes' relation is:",
    "options": [
      "λ",
      "λ / 2",
      "λ / 4",
      "0"
    ],
    "ans": 1,
    "explanation": "Reflection at a denser boundary causes an abrupt phase reversal of π radians, which corresponds to an additional path difference of λ / 2."
  },
  {
    "id": "phy_u1_q3",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 1,
    "topic": "Wave Optics: Single Slit Diffraction",
    "q": "In Fraunhofer single-slit diffraction of slit width 'a', the condition for the first principal minimum is:",
    "options": [
      "a * sin θ = λ / 2",
      "a * sin θ = λ",
      "a * sin θ = 2λ",
      "a * sin θ = 0"
    ],
    "ans": 1,
    "explanation": "The diffraction minima condition is a * sin θ = m*λ. For the first minimum (m = 1), a * sin θ = λ."
  },
  {
    "id": "phy_u2_q1",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 2,
    "topic": "Lasers: Einstein Coefficients",
    "q": "The ratio of Einstein's coefficient of spontaneous emission A_21 to stimulated emission B_21 is proportional to:",
    "options": [
      "ν",
      "ν^2",
      "ν^3",
      "Independent of frequency"
    ],
    "ans": 2,
    "explanation": "Einstein's relation states A_21 / B_21 = (8*pi*h*ν^3) / c^3, which is directly proportional to the cube of the transition frequency ν^3."
  },
  {
    "id": "phy_u2_q2",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 2,
    "topic": "Fiber Optics: Numerical Aperture",
    "q": "An optical fiber has core index n1 = 1.50 and cladding index n2 = 1.48. Its Numerical Aperture (NA) is approximately:",
    "options": [
      "0.244",
      "0.020",
      "0.150",
      "0.485"
    ],
    "ans": 0,
    "explanation": "NA = sqrt(n1^2 - n2^2) = sqrt(1.50^2 - 1.48^2) = sqrt(2.25 - 2.1904) = sqrt(0.0596) ≈ 0.2441."
  },
  {
    "id": "phy_u2_q3",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 2,
    "topic": "Lasers: He-Ne Laser",
    "q": "In a Helium-Neon (He-Ne) laser, the actual laser transition giving red light (632.8 nm) occurs between the energy levels of:",
    "options": [
      "Helium atoms only",
      "Neon atoms only",
      "Both Helium and Neon simultaneously",
      "The quartz discharge tube"
    ],
    "ans": 1,
    "explanation": "Helium atoms act as the pumping gas, transferring excitation energy via resonant collisions to Neon atoms. The lasing transition occurs exclusively between Ne energy levels."
  },
  {
    "id": "phy_u3_q1",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 3,
    "topic": "Electromagnetism: Displacement Current",
    "q": "The displacement current density J_d introduced by Maxwell is given by:",
    "options": [
      "J_d = σ * E",
      "J_d = ∂D / ∂t = ε0 * (∂E / ∂t)",
      "J_d = ∇ × H",
      "J_d = -∂B / ∂t"
    ],
    "ans": 1,
    "explanation": "To resolve the inconsistency in Ampere's circuital law and satisfy the continuity equation, Maxwell introduced J_d = ∂D/∂t = ε0*(∂E/∂t)."
  },
  {
    "id": "phy_u3_q2",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 3,
    "topic": "Electromagnetism: Poynting Vector",
    "q": "The Poynting Vector S = E × H physically represents:",
    "options": [
      "Total charge enclosed",
      "Instantaneous rate of electromagnetic energy flow per unit area (W/m²)",
      "Magnetic flux density",
      "Electric field polarization"
    ],
    "ans": 1,
    "explanation": "The Poynting vector S = E × H gives both the direction and power density (Watts/m²) of electromagnetic energy propagation."
  },
  {
    "id": "phy_u3_q3",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 3,
    "topic": "Magnetic Materials: Hysteresis Loss",
    "q": "The area enclosed by the B-H hysteresis loop represents:",
    "options": [
      "Total magnetic susceptibility",
      "Hysteresis energy loss per unit volume per cycle",
      "Curie temperature of the sample",
      "Permeability of free space"
    ],
    "ans": 1,
    "explanation": "The area of the B-H loop equals ∮ H dB, which is the thermal energy dissipated per unit volume of magnetic material during each magnetization cycle."
  },
  {
    "id": "iai_u1_q1",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 1,
    "topic": "AI Concepts: PEAS Framework",
    "q": "In the PEAS agent environment description, the four letters stand for:",
    "options": [
      "Performance, Environment, Actuators, Sensors",
      "Perception, Entity, Action, State",
      "Probability, Expectation, Accuracy, Strategy",
      "Program, Execution, Algorithm, Storage"
    ],
    "ans": 0,
    "explanation": "PEAS stands for Performance measure, Environment, Actuators, and Sensors—the standard specification framework for intelligent agents."
  },
  {
    "id": "iai_u1_q2",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 1,
    "topic": "Agent Architectures: Learning Agent",
    "q": "Which component in a Learning Agent is specifically responsible for suggesting exploratory actions to discover new experiences?",
    "options": [
      "Critic",
      "Learning Element",
      "Performance Element",
      "Problem Generator"
    ],
    "ans": 3,
    "explanation": "The Problem Generator suggests exploratory, sub-optimal actions that lead the agent to explore novel states and avoid getting trapped in local optima."
  },
  {
    "id": "iai_u1_q3",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 1,
    "topic": "Environment Properties",
    "q": "A chess playing game environment with a clock is classified as:",
    "options": [
      "Partially observable, Stochastic, Continuous",
      "Fully observable, Deterministic, Semi-dynamic, Discrete",
      "Episodic, Dynamic, Continuous",
      "Multi-agent, Inaccessible, Non-deterministic"
    ],
    "ans": 1,
    "explanation": "In chess, the whole board is visible (fully observable), moves follow exact rules (deterministic), clock ticks while player thinks (semi-dynamic), and moves occur on a grid (discrete)."
  },
  {
    "id": "iai_u2_q1",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Uninformed Search: Space Complexity",
    "q": "The primary practical limitation of Breadth-First Search (BFS) in large state spaces is its:",
    "options": [
      "Lack of completeness",
      "Severe exponential memory space consumption O(b^d)",
      "Sub-optimal path selection",
      "Failure on finite graphs"
    ],
    "ans": 1,
    "explanation": "BFS stores every generated node in memory queue, requiring O(b^d) space. For modest branching factors and depths, memory exhausts in seconds."
  },
  {
    "id": "iai_u2_q2",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Heuristic Search: A* Algorithm",
    "q": "A heuristic function h(n) in A* search is called 'Admissible' if:",
    "options": [
      "h(n) always overestimates the true cost to goal",
      "h(n) never overestimates the true cost to goal (0 <= h(n) <= h*(n))",
      "h(n) equals 0 for every node",
      "h(n) is monotonic non-decreasing along all paths"
    ],
    "ans": 1,
    "explanation": "Admissibility requires that h(n) never exceeds the true minimum cost h*(n) to reach the goal from node n, guaranteeing optimal solutions."
  },
  {
    "id": "iai_u2_q3",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Heuristic Search: Evaluation Function",
    "q": "In A* search, the node selected for expansion is the one with the minimum value of evaluation function f(n), where:",
    "options": [
      "f(n) = g(n) - h(n)",
      "f(n) = g(n) + h(n)",
      "f(n) = g(n) * h(n)",
      "f(n) = h(n) / g(n)"
    ],
    "ans": 1,
    "explanation": "f(n) = g(n) + h(n) estimates total cost of the cheapest solution path through node n, where g(n) is path cost so far and h(n) is estimated cost to goal."
  },
  {
    "id": "iai_u3_q1",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 3,
    "topic": "Adversarial Search: Minimax",
    "q": "In a two-player zero-sum game, the Minimax value at a MAX node with successor utilities [-3, 5, 2] is:",
    "options": [
      "-3",
      "2",
      "5",
      "0"
    ],
    "ans": 2,
    "explanation": "A MAX player chooses the action that maximizes the utility returned by MIN, so max(-3, 5, 2) = 5."
  },
  {
    "id": "iai_u3_q2",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 3,
    "topic": "Adversarial Search: Alpha-Beta Pruning",
    "q": "In Alpha-Beta pruning, the search branch is pruned (cutoff occurs) whenever:",
    "options": [
      "α < β",
      "α >= β",
      "α = 0",
      "β = +infinity"
    ],
    "ans": 1,
    "explanation": "When α >= β, the current state's outcome is already worse for one player than a previously evaluated choice, making further exploration redundant."
  },
  {
    "id": "iai_u3_q3",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 3,
    "topic": "Adversarial Search: Pruning Complexity",
    "q": "With optimal move ordering, Alpha-Beta pruning reduces the effective branching factor such that time complexity drops from O(b^m) to:",
    "options": [
      "O(m^b)",
      "O(b^(m/2))",
      "O(b * m)",
      "O(log(b^m))"
    ],
    "ans": 1,
    "explanation": "With perfect move ordering, alpha-beta examines only O(b^(m/2)) leaves, allowing search depth to effectively double within the same computational time."
  },
  {
    "id": "cfet_u1_q1",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 1,
    "topic": "Computer Architecture: Cache Formula",
    "q": "If cache access time t_c = 2 ns, main memory access time t_m = 50 ns, and hit ratio h = 0.95, average memory access time T_avg is:",
    "options": [
      "4.4 ns",
      "2.0 ns",
      "52 ns",
      "47.5 ns"
    ],
    "ans": 0,
    "explanation": "T_avg = h * t_c + (1 - h) * t_m = 0.95 * 2 + (1 - 0.95) * 50 = 1.9 + 0.05 * 50 = 1.9 + 2.5 = 4.4 ns."
  },
  {
    "id": "cfet_u1_q2",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 1,
    "topic": "Computer Architecture: Von Neumann Bottleneck",
    "q": "The 'Von Neumann Bottleneck' refers to the throughput limitation caused by:",
    "options": [
      "Lack of hard drive capacity",
      "Sharing a single system bus for both data transfers and instruction fetches between CPU and Memory",
      "Cache associativity collisions",
      "Instruction pipelining hazards"
    ],
    "ans": 1,
    "explanation": "Because instructions and data share the same physical bus in the Von Neumann architecture, CPU processing speed is limited by bus transfer throughput."
  },
  {
    "id": "cfet_u1_q3",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 1,
    "topic": "Computer Architecture: Locality",
    "q": "The principle that recently accessed memory locations are likely to be accessed again in the near future is termed:",
    "options": [
      "Spatial locality",
      "Temporal locality",
      "Associative locality",
      "Cache coherence"
    ],
    "ans": 1,
    "explanation": "Temporal locality states that an item referenced now is likely to be referenced again soon (e.g., loops and variables)."
  },
  {
    "id": "cfet_u2_q1",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 2,
    "topic": "Data Representation: 2's Complement",
    "q": "In an 8-bit 2's complement representation, the range of signed integers that can be stored is:",
    "options": [
      "-128 to +127",
      "-127 to +128",
      "0 to 255",
      "-256 to +255"
    ],
    "ans": 0,
    "explanation": "For an n-bit 2's complement system, range is -(2^(n-1)) to +(2^(n-1) - 1). For n = 8: -(2^7) to +(2^7 - 1) = -128 to +127."
  },
  {
    "id": "cfet_u2_q2",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 2,
    "topic": "Data Representation: Radix Conversion",
    "q": "The hexadecimal value (2F)_16 converted to binary is:",
    "options": [
      "0010 1111",
      "0010 1110",
      "0011 1111",
      "0001 1111"
    ],
    "ans": 0,
    "explanation": "Convert each hex digit to 4 binary bits: 2 -> 0010, F -> 1111. Combining gives 0010 1111."
  },
  {
    "id": "cfet_u2_q3",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 2,
    "topic": "Data Representation: IEEE 754",
    "q": "In the standard IEEE 754 single-precision 32-bit floating-point format, the number of bits allocated to Sign, Exponent, and Mantissa are:",
    "options": [
      "1, 8, 23",
      "1, 11, 52",
      "2, 8, 22",
      "1, 7, 24"
    ],
    "ans": 0,
    "explanation": "IEEE 754 single precision has 1 sign bit, 8 exponent bits (bias = 127), and 23 fraction/mantissa bits, totaling 32 bits."
  },
  {
    "id": "cfet_u3_q1",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 3,
    "topic": "Digital Logic: Universal Gates",
    "q": "Which of the following pairs of logic gates are classified as 'Universal Gates'?",
    "options": [
      "AND and OR",
      "NAND and NOR",
      "XOR and XNOR",
      "NOT and AND"
    ],
    "ans": 1,
    "explanation": "NAND and NOR are universal gates because any Boolean function and all basic logic gates (NOT, AND, OR) can be implemented using only NAND or only NOR gates."
  },
  {
    "id": "cfet_u3_q2",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 3,
    "topic": "Digital Logic: De Morgan's Law",
    "q": "According to De Morgan's theorem, the complement of a product (A * B)' is equal to:",
    "options": [
      "A' * B'",
      "A' + B'",
      "A + B",
      "(A + B)'"
    ],
    "ans": 1,
    "explanation": "First De Morgan's Theorem states: (A * B)' = A' + B' (NAND equals bubbled OR)."
  },
  {
    "id": "cfet_u3_q3",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 3,
    "topic": "Digital Logic: Combinational Adders",
    "q": "A Half Adder circuit can be constructed using which combination of basic logic gates?",
    "options": [
      "One AND gate and one OR gate",
      "One XOR gate (Sum) and one AND gate (Carry)",
      "Two OR gates",
      "One NAND gate only"
    ],
    "ans": 1,
    "explanation": "For a half adder with inputs A and B: Sum S = A ⊕ B (implemented by XOR gate) and Carry C = A * B (implemented by AND gate)."
  },
  {
    "id": "uhv_u1_q1",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 1,
    "topic": "Value Education: Basic Aspirations",
    "q": "According to the universal human value framework, the basic aspirations of all human beings are:",
    "options": [
      "Unlimited wealth and political power",
      "Continuous Happiness (Sukha) and Prosperity (Samridhi)",
      "Sensory enjoyment and competition",
      "Physical dominance over nature"
    ],
    "ans": 1,
    "explanation": "At the deepest level, every human being naturally aspires for continuous happiness and the feeling of prosperity."
  },
  {
    "id": "uhv_u1_q2",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 1,
    "topic": "Value Education: Self Exploration",
    "q": "The process of Value Education is primarily based on:",
    "options": [
      "Blind belief and rigid dogmas",
      "Self-exploration through Natural Acceptance and Experiential Validation",
      "Enforcement through legal penalties",
      "Rote memorization of moral codes"
    ],
    "ans": 1,
    "explanation": "Value education operates by proposing concepts that each student verifies through their own innate Natural Acceptance and living experience."
  },
  {
    "id": "uhv_u1_q3",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 1,
    "topic": "Value Education: Physical Facilities",
    "q": "For human beings, physical facilities (Suvidha) are:",
    "options": [
      "Both necessary and complete for total happiness",
      "Necessary but NOT sufficient",
      "Completely unnecessary",
      "The sole indicator of human excellence"
    ],
    "ans": 1,
    "explanation": "Physical facilities fulfill biological body requirements, so they are necessary. But emotional and relationship needs belong to the Self ('I'), making material facilities insufficient on their own."
  },
  {
    "id": "uhv_u2_q1",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 2,
    "topic": "Harmony in Human Being: Self vs Body",
    "q": "The needs of the conscious Self ('I') compared to the material Body are:",
    "options": [
      "Both quantitative and temporary",
      "Needs of 'I' are qualitative and continuous; needs of Body are quantitative and temporary",
      "Needs of 'I' are quantitative; needs of Body are qualitative",
      "Both physiological in nature"
    ],
    "ans": 1,
    "explanation": "The Self ('I') requires feelings like trust, respect, and peace continuously (qualitative). The Body requires quantifiable material items like food and clothing temporarily."
  },
  {
    "id": "uhv_u2_q2",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 2,
    "topic": "Harmony in Human Being: Sanyama & Swasthya",
    "q": "The feeling of responsibility in the conscious Self ('I') for nurturing, protecting, and rightly utilizing the Body is termed:",
    "options": [
      "Swasthya",
      "Sanyama (Self-regulation)",
      "Suvidha",
      "Samadhan"
    ],
    "ans": 1,
    "explanation": "Sanyama is the conscious commitment in 'I' to properly care for and direct the Body. When Sanyama is maintained, physical health (Swasthya) naturally results."
  },
  {
    "id": "uhv_u2_q3",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 2,
    "topic": "Harmony in Human Being: Conscious Activities",
    "q": "Which of the following activities belongs strictly to the conscious Self ('I') and NOT the material Body?",
    "options": [
      "Blood circulation",
      "Desiring, Thinking, and Expecting",
      "Digesting food",
      "Breathing air"
    ],
    "ans": 1,
    "explanation": "Desiring (Ichha), Thinking (Vichara), and Expecting (Asha) are conscious cognitive activities of the Self ('I'). Bodily functions are physio-chemical processes."
  },
  {
    "id": "uhv_u3_q1",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 3,
    "topic": "Harmony in Family: Foundational Value",
    "q": "The foundational value (Adharbhut Mulya) in human-to-human relationships is:",
    "options": [
      "Wealth",
      "Trust (Vishwas)",
      "Competition",
      "Legal Contract"
    ],
    "ans": 1,
    "explanation": "Trust is the foundational value. Without trust that the other person wants mutual happiness, genuine relationship cannot begin."
  },
  {
    "id": "uhv_u3_q2",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 3,
    "topic": "Harmony in Family: Respect (Samman)",
    "q": "According to the value framework, 'Respect' (Samman) is defined as:",
    "options": [
      "Giving expensive gifts",
      "Right evaluation (Sahi Mulyankan)",
      "Flattery and praise",
      "Blind obedience to hierarchy"
    ],
    "ans": 1,
    "explanation": "Respect is right evaluation. Over-evaluation (flattery) and under-evaluation (belittling) are both forms of disrespect."
  },
  {
    "id": "uhv_u3_q3",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 3,
    "topic": "Harmony in Society: Comprehensive Goal",
    "q": "The 4-level comprehensive human goal in society consists of:",
    "options": [
      "Power, Dominance, Industrialization, Globalization",
      "Right Understanding (Individual) -> Prosperity (Family) -> Fearlessness/Trust (Society) -> Co-existence (Nature)",
      "Accumulation of Wealth, Military Strength, Technology, Control",
      "Competition, Division of Labor, Profit Maximization, Consumption"
    ],
    "ans": 1,
    "explanation": "The human goal spans 4 levels: Samadhan (Right understanding in individual), Samridhi (Prosperity in family), Abhay (Fearlessness/Trust in society), and Sah-astitva (Co-existence with nature)."
  },
  {
    "id": "cfet_u1_mcq_1",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 1,
    "topic": "CPU Architecture: Von Neumann",
    "q": "The fundamental characteristic of the Von Neumann computer architecture is that:",
    "options": [
      "Data and instructions are stored in separate physical memories",
      "Data and instructions share the same memory and bus system",
      "Instructions are executed without using a control unit",
      "Registers are located outside the CPU core"
    ],
    "ans": 1,
    "explanation": "Von Neumann architecture is defined by the Stored Program Concept, where both program instructions and data share the same address space and memory bus."
  },
  {
    "id": "cfet_u1_mcq_2",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 1,
    "topic": "CPU Registers",
    "q": "Which CPU register holds the memory address of the next instruction to be fetched?",
    "options": [
      "Instruction Register (IR)",
      "Memory Data Register (MDR)",
      "Program Counter (PC)",
      "Accumulator (AC)"
    ],
    "ans": 2,
    "explanation": "The Program Counter (PC) stores the address of the next sequential instruction in RAM and automatically increments after fetching."
  },
  {
    "id": "cfet_u1_mcq_3",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 1,
    "topic": "Memory Hierarchy Latency",
    "q": "In the memory hierarchy, which storage component exhibits the lowest access latency (fastest speed)?",
    "options": [
      "L1 Cache",
      "Main Memory (DRAM)",
      "CPU Registers",
      "NVMe SSD"
    ],
    "ans": 2,
    "explanation": "CPU registers reside directly inside the execution datapath and take less than 1 clock cycle (~0.5 ns), faster than L1 cache (~1-2 ns) and DRAM (~50-80 ns)."
  },
  {
    "id": "cfet_u1_mcq_4",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 1,
    "topic": "Software Translators",
    "q": "A compiler differs from an interpreter because a compiler:",
    "options": [
      "Translates and executes source code line-by-line",
      "Translates the entire high-level program into object code at once",
      "Is only used for assembly language programs",
      "Requires no machine language output"
    ],
    "ans": 1,
    "explanation": "A compiler scans the entire source program and generates complete standalone machine code (object file), whereas an interpreter translates and executes line-by-line."
  },
  {
    "id": "cfet_u2_mcq_1",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 2,
    "topic": "Number Conversions: Octal to Hex",
    "q": "The octal number (765)₈ in hexadecimal representation is equal to:",
    "options": [
      "(1F5)₁₆",
      "(3E5)₁₆",
      "(1E5)₁₆",
      "(2F5)₁₆"
    ],
    "ans": 0,
    "explanation": "(765)₈ in binary is (111 110 101)₂. Grouping in 4s from right: (0001 1111 0101)₂ = (1 F 5)₁₆."
  },
  {
    "id": "cfet_u2_mcq_2",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 2,
    "topic": "Binary Arithmetic: 2's Complement",
    "q": "What is the 2's complement of the binary number (1000101)₂?",
    "options": [
      "0111010",
      "0111011",
      "1000110",
      "0111100"
    ],
    "ans": 1,
    "explanation": "1's complement of 1000101 is 0111010. Adding 1: 0111010 + 1 = 0111011."
  },
  {
    "id": "cfet_u2_mcq_3",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 2,
    "topic": "Signed Numbers: 2's Complement Range",
    "q": "For an 8-bit signed integer using 2's complement representation, the permissible numerical range is:",
    "options": [
      "-127 to +127",
      "-128 to +127",
      "-128 to +128",
      "0 to 255"
    ],
    "ans": 1,
    "explanation": "For n bits, 2's complement range is -2^(n-1) to +(2^(n-1) - 1). For n=8, this is -128 to +127."
  },
  {
    "id": "cfet_u2_mcq_4",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 2,
    "topic": "Character Encoding",
    "q": "Standard ASCII code uses ____ bits per character, while UTF-8 Unicode uses ____:",
    "options": [
      "7 bits; variable 1 to 4 bytes",
      "8 bits; fixed 16 bits",
      "16 bits; 32 bits",
      "7 bits; fixed 8 bits"
    ],
    "ans": 0,
    "explanation": "Standard ASCII defines 128 characters using 7 bits. UTF-8 is a backward-compatible variable-width encoding using 1 to 4 bytes (8 to 32 bits)."
  },
  {
    "id": "cfet_u3_mcq_1",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 3,
    "topic": "Operating Systems: Process vs Program",
    "q": "Which data structure is maintained by the operating system to store all execution information about an active process?",
    "options": [
      "File Control Block (FCB)",
      "Process Control Block (PCB)",
      "Interrupt Vector Table (IVT)",
      "Virtual Memory Page Directory"
    ],
    "ans": 1,
    "explanation": "The Process Control Block (PCB) stores process ID, program counter, register states, priority, memory limits, and open file lists."
  },
  {
    "id": "cfet_u3_mcq_2",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 3,
    "topic": "Operating Systems: Multitasking vs Multiprocessing",
    "q": "Multiprocessing differs fundamentally from multitasking because multiprocessing:",
    "options": [
      "Switches single CPU rapidly among multiple tasks",
      "Executes multiple processes concurrently on two or more physical CPU cores",
      "Does not require operating system scheduling",
      "Is limited strictly to batch jobs"
    ],
    "ans": 1,
    "explanation": "Multitasking shares a single processor via rapid time-slicing. Multiprocessing utilizes multiple physical CPUs or cores to execute instructions simultaneously in true parallel."
  },
  {
    "id": "cfet_u4_mcq_1",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 4,
    "topic": "Transmission Media: Guided vs Unguided",
    "q": "Which guided transmission medium is completely immune to electromagnetic interference (EMI) and radio frequency interference?",
    "options": [
      "Unshielded Twisted Pair (UTP)",
      "Shielded Twisted Pair (STP)",
      "Coaxial Cable",
      "Optical Fibre Cable"
    ],
    "ans": 3,
    "explanation": "Optical fibre transmits data using light pulses (photons) through silica glass based on total internal reflection, making it 100% immune to electrical/electromagnetic interference."
  },
  {
    "id": "cfet_u4_mcq_2",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 4,
    "topic": "Network Topologies: Fault Tolerance",
    "q": "In which network topology does the failure of a single cable or computer leave all other connected computers completely unaffected?",
    "options": [
      "Bus Topology",
      "Ring Topology",
      "Star Topology",
      "Daisy Chain Topology"
    ],
    "ans": 2,
    "explanation": "In a Star topology, every workstation has a dedicated point-to-point link to the central switch. A break in one link isolates only that computer, keeping the rest of the network operating."
  },
  {
    "id": "cfet_u4_mcq_3",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 4,
    "topic": "Networking Devices: Switch vs Hub",
    "q": "A network switch operates primarily at the ____ layer of the OSI model and forwards packets using ____:",
    "options": [
      "Physical Layer; IP addresses",
      "Data Link Layer; MAC addresses",
      "Network Layer; Port numbers",
      "Transport Layer; Checksums"
    ],
    "ans": 1,
    "explanation": "A switch is a Layer 2 (Data Link) device that maintains a MAC address table to forward frames directly to specific destination ports, eliminating collisions."
  },
  {
    "id": "cfet_u4_mcq_4",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 4,
    "topic": "Protocols: TCP 3-Way Handshake",
    "q": "The correct sequence of control packets in the TCP Three-Way Handshake is:",
    "options": [
      "ACK → SYN → SYN-ACK",
      "SYN → SYN-ACK → ACK",
      "SYN → ACK → SYN-ACK",
      "SYN-ACK → SYN → ACK"
    ],
    "ans": 1,
    "explanation": "To establish a TCP session, client sends SYN, server responds with SYN-ACK, and client acknowledges with ACK. Data transfer begins thereafter."
  },
  {
    "id": "cfet_u4_mcq_5",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 4,
    "topic": "Protocols: DNS Function",
    "q": "The primary function of the Domain Name System (DNS) in computer networks is to:",
    "options": [
      "Assign dynamic IP addresses to computers using DHCP",
      "Translate human-readable domain names into numerical IP addresses",
      "Encrypt data transmitted between client and web server",
      "Filter unauthorized packets at the network boundary"
    ],
    "ans": 1,
    "explanation": "DNS acts as the phonebook of the Internet, resolving alphanumeric domain names (like www.google.com) into machine-routable IP addresses."
  },
  {
    "id": "cfet_u5_mcq_1",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 5,
    "topic": "Cybersecurity: CIA Triad",
    "q": "Which pillar of the CIA Triad is violated if an attacker intercepts and modifies the amount in an online banking transaction?",
    "options": [
      "Confidentiality",
      "Integrity",
      "Availability",
      "Non-Repudiation"
    ],
    "ans": 1,
    "explanation": "Integrity guarantees that data has not been altered, tampered with, or falsified during transit or storage."
  },
  {
    "id": "cfet_u5_mcq_2",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 5,
    "topic": "Blockchain Immutability",
    "q": "In a blockchain, each block is cryptographically linked to the previous block through:",
    "options": [
      "The recipient's public key",
      "The cryptographic hash of the previous block's header",
      "The IP address of the mining node",
      "The digital certificate of the authority"
    ],
    "ans": 1,
    "explanation": "Each block contains the cryptographic hash (e.g., SHA-256) of the preceding block. Modifying any past transaction alters its hash, breaking the entire chain forward."
  },
  {
    "id": "cfet_u5_mcq_3",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 5,
    "topic": "Machine Learning Paradigms",
    "q": "Training a model using input features paired with known target ground-truth labels is called:",
    "options": [
      "Unsupervised Learning",
      "Supervised Learning",
      "Reinforcement Learning",
      "Self-Organizing Learning"
    ],
    "ans": 1,
    "explanation": "Supervised learning algorithms (such as Linear Regression, Decision Trees, SVM) learn from labeled training examples consisting of input-output pairs."
  },
  {
    "id": "beee_mcq_ext_1",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 2,
    "topic": "AC Circuits: Series Resonance",
    "q": "At series resonance in an RLC circuit, the circuit impedance is:",
    "options": [
      "Maximum and purely inductive",
      "Minimum and purely resistive (Z = R)",
      "Zero and purely capacitive",
      "Infinite with zero power factor"
    ],
    "ans": 1,
    "explanation": "At resonance, X_L = X_C, causing reactive impedance to cancel. Total impedance Z = R (minimum), resulting in maximum current at unity power factor."
  },
  {
    "id": "beee_mcq_ext_2",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "Electronics: Rectifier Ripple Factor",
    "q": "The ripple factor of a Full-Wave Bridge Rectifier without filter is approximately:",
    "options": [
      "1.21",
      "0.482",
      "0.812",
      "0.25"
    ],
    "ans": 1,
    "explanation": "Half-wave rectifier ripple factor is 1.21, whereas full-wave rectifier ripple factor is gamma = sqrt((V_rms/V_dc)^2 - 1) = 0.482."
  },
  {
    "id": "beee_mcq_ext_3",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "Semiconductors: Zener Diode",
    "q": "A Zener diode is operated in ____ bias when used as a voltage regulator:",
    "options": [
      "Forward bias with variable current",
      "Reverse bias in the breakdown region",
      "Unbiased equilibrium state",
      "Forward bias below knee voltage"
    ],
    "ans": 1,
    "explanation": "In reverse breakdown, Zener voltage V_Z remains essentially constant over a wide range of reverse current, providing steady voltage regulation."
  },
  {
    "id": "math_mcq_ext_1",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 1,
    "topic": "Linear Algebra: Cayley-Hamilton",
    "q": "The Cayley-Hamilton theorem states that:",
    "options": [
      "Every matrix has an inverse",
      "Every square matrix satisfies its own characteristic equation",
      "Determinant of an orthogonal matrix is always zero",
      "Eigenvalues are always real and distinct"
    ],
    "ans": 1,
    "explanation": "For characteristic equation |A - lambda*I| = 0, substituting matrix A gives A^n + c_{n-1} A^{n-1} + ... + c_0 I = 0."
  },
  {
    "id": "math_mcq_ext_2",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 3,
    "topic": "Multivariable: Maxima & Minima",
    "q": "For a stationary point (a,b) of f(x,y), if rt - s² > 0 and r < 0 (where r=f_xx, s=f_xy, t=f_yy), the point is a:",
    "options": [
      "Local Minimum",
      "Local Maximum",
      "Saddle Point",
      "Inconclusive test"
    ],
    "ans": 1,
    "explanation": "When discriminant rt - s^2 > 0 and r < 0 (second derivative negative), f(x,y) achieves a local maximum."
  },
  {
    "id": "phy_mcq_ext_1",
    "courseCode": "100103/104",
    "subject": "Physics",
    "unitNo": 1,
    "topic": "Wave Optics: Newton's Rings",
    "q": "In Newton's rings by reflected light, the diameter of the n-th dark ring is directly proportional to:",
    "options": [
      "Square of n",
      "Square root of n (sqrt(n))",
      "n",
      "1 / sqrt(n)"
    ],
    "ans": 1,
    "explanation": "The dark ring diameter is given by D_n^2 = 4n*lambda*R, so D_n = 2*sqrt(n*lambda*R) proportional to sqrt(n)."
  },
  {
    "id": "phy_mcq_ext_2",
    "courseCode": "100103/104",
    "subject": "Physics",
    "unitNo": 3,
    "topic": "Electromagnetism: Displacement Current",
    "q": "Maxwell introduced the displacement current density J_d = ε₀(∂E/∂t) to resolve the inconsistency in:",
    "options": [
      "Faraday's Law",
      "Ampere's Circuital Law",
      "Gauss's Law for Electrostatics",
      "Coulomb's Law"
    ],
    "ans": 1,
    "explanation": "Ampere's original law div(curl B) = div(mu_0 J) = 0 contradicted the continuity equation div J = -d rho/dt. Maxwell added displacement current."
  },
  {
    "id": "iai_mcq_ext_1",
    "courseCode": "100105/106",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Search: A* Admissibility",
    "q": "A heuristic function h(n) in A* search is called admissible if for every node n:",
    "options": [
      "h(n) >= h*(n) (overestimates true cost)",
      "h(n) <= h*(n) (never overestimates true cost)",
      "h(n) = 0 for all nodes",
      "h(n) is always negative"
    ],
    "ans": 1,
    "explanation": "An admissible heuristic never overestimates the actual minimal cost h*(n) to reach the goal from node n, guaranteeing A* tree-search optimality."
  },
  {
    "id": "iai_mcq_ext_2",
    "courseCode": "100105/106",
    "subject": "IAI",
    "unitNo": 3,
    "topic": "Adversarial Games: Alpha-Beta Pruning",
    "q": "In Alpha-Beta pruning, an adversarial branch is cut off (pruned) whenever:",
    "options": [
      "alpha < beta",
      "alpha >= beta",
      "alpha = 0",
      "beta = infinity"
    ],
    "ans": 1,
    "explanation": "Alpha represents the guaranteed minimum score for the Maximizer and Beta represents the maximum score for the Minimizer. When alpha >= beta, the opponent can force a worse outcome, so the branch is pruned."
  },
  {
    "id": "uhv_mcq_ext_1",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 2,
    "topic": "Self 'I' vs Body",
    "q": "In Universal Human Values, the need for respect and trust is a need of:",
    "options": [
      "The physical Body, which is quantitative and temporary",
      "The sentient Self ('I'), which is qualitative and continuous",
      "Both Body and Self equally in kilograms",
      "The external physical environment"
    ],
    "ans": 1,
    "explanation": "Feelings like Trust, Respect, and Happiness are qualitative needs of the conscious Self ('I') and are needed continuously, whereas physical facilities (food, shelter) are quantitative needs of the Body."
  },
  {
    "id": "uhv_mcq_ext_2",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 3,
    "topic": "Relationship: Trust",
    "q": "According to UHV, doubt usually arises in relationships when we confuse:",
    "options": [
      "Wealth with knowledge",
      "A person's natural intention with their present competence",
      "Physical health with mental state",
      "Right evaluation with over-evaluation"
    ],
    "ans": 1,
    "explanation": "Trust is assured when we see that the other person's fundamental intention (desire to make us happy) is naturally good, while their lack of ability is merely an issue of competence that can be improved."
  },
  {
    "id": "beee_u3_q14",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "Semiconductors: Law of Mass Action",
    "q": "According to the Law of Mass Action for a semiconductor in thermal equilibrium, the product of electron and hole concentrations is:",
    "options": [
      "np = ni",
      "np = ni²",
      "n/p = ni",
      "n + p = ni²"
    ],
    "ans": 1,
    "explanation": "The Law of Mass Action states that under thermal equilibrium, the product of majority and minority carrier densities is always constant and equals the square of intrinsic carrier concentration: n * p = n_i²."
  },
  {
    "id": "beee_u3_q15",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "P-N Junction: Barrier Potential Values",
    "q": "The barrier potential (knee voltage) at room temperature (300 K) is approximately:",
    "options": [
      "0.3 V for Si and 0.7 V for Ge",
      "0.7 V for Si and 0.3 V for Ge",
      "1.1 V for Si and 0.2 V for Ge",
      "0.1 V for both Si and Ge"
    ],
    "ans": 1,
    "explanation": "Silicon has a wider bandgap (~1.1 eV) resulting in a barrier potential of ~0.7 V, whereas Germanium has a narrower bandgap (~0.67 eV) giving a barrier potential of ~0.3 V."
  },
  {
    "id": "beee_u3_q16",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "Rectifiers: PIV Comparison",
    "q": "What is the Peak Inverse Voltage (PIV) rating for each diode in a Center-Tapped full wave rectifier compared to a Bridge full wave rectifier with peak transformer secondary voltage V_m?",
    "options": [
      "Center-tapped: V_m, Bridge: 2V_m",
      "Center-tapped: 2V_m, Bridge: V_m",
      "Both are V_m",
      "Both are 2V_m"
    ],
    "ans": 1,
    "explanation": "In a center-tapped full wave rectifier, the non-conducting diode experiences PIV = 2*V_m. In a bridge rectifier, the two non-conducting diodes share the reverse voltage loop such that each diode experiences PIV = V_m."
  },
  {
    "id": "beee_u3_q17",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "Zener Diode: Breakdown Mechanisms",
    "q": "Zener breakdown occurs predominantly in diodes with:",
    "options": [
      "Light doping and high breakdown voltage (> 6 V)",
      "Heavy doping and narrow depletion layer (< 6 V)",
      "Zero doping under forward bias",
      "Intrinsic semiconductors only"
    ],
    "ans": 1,
    "explanation": "Zener breakdown occurs in heavily doped junctions where the depletion layer is ultra-thin (< 10 nm). Intense electric field (~10^7 V/m) pulls valence electrons directly into the conduction band via quantum tunneling at V < 6 V."
  },
  {
    "id": "beee_u3_q18",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "BJT: Current Gain Relations",
    "q": "If the common-base current gain α of a transistor is 0.98, what is its common-emitter current gain β?",
    "options": [
      "49",
      "98",
      "50",
      "24.5"
    ],
    "ans": 0,
    "explanation": "The relationship is β = α / (1 - α) = 0.98 / (1 - 0.98) = 0.98 / 0.02 = 49."
  },
  {
    "id": "beee_u3_q19",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 3,
    "topic": "BJT: Early Effect",
    "q": "The Early Effect (base-width modulation) in a BJT is caused by:",
    "options": [
      "Increase in forward bias of base-emitter junction",
      "Increase in reverse bias of collector-base junction",
      "Decrease in temperature",
      "Doping the base heavily"
    ],
    "ans": 1,
    "explanation": "As the reverse bias across the collector-base junction increases, the collector depletion region expands further into the lightly doped base region, reducing the effective electrical base width W_b."
  },
  {
    "id": "beee_u2_q20",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 2,
    "topic": "AC Circuits: Power Factor at Resonance",
    "q": "In a series RLC AC circuit at resonance, the power factor is:",
    "options": [
      "0 lagging",
      "0 leading",
      "Unity (1.0)",
      "0.707 lagging"
    ],
    "ans": 2,
    "explanation": "At resonance, inductive reactance equals capacitive reactance (X_L = X_C). The total circuit impedance is purely resistive (Z = R), making phase angle φ = 0° and power factor cos φ = 1.0 (Unity)."
  },
  {
    "id": "beee_u2_q21",
    "courseCode": "100111",
    "subject": "BEEE",
    "unitNo": 2,
    "topic": "3-Phase Systems: Star vs Delta Relations",
    "q": "In a balanced 3-phase star (Y) connected load, the relation between line voltage V_L and phase voltage V_ph is:",
    "options": [
      "V_L = V_ph",
      "V_L = √3 * V_ph",
      "V_L = V_ph / √3",
      "V_L = 3 * V_ph"
    ],
    "ans": 1,
    "explanation": "In a star connection, line voltage is the phasor difference between two phase voltages: V_L = √3 * V_ph, while line current equals phase current (I_L = I_ph)."
  },
  {
    "id": "math_u1_q12",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 1,
    "topic": "Linear Algebra: Eigenvalue Properties",
    "q": "The sum of the eigenvalues of any square matrix A is always equal to:",
    "options": [
      "Determinant of A",
      "Trace of A (sum of main diagonal elements)",
      "Rank of A",
      "Zero"
    ],
    "ans": 1,
    "explanation": "By linear algebra properties: Sum of eigenvalues = Trace(A), and Product of eigenvalues = Det(A)."
  },
  {
    "id": "math_u1_q13",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 1,
    "topic": "Linear Algebra: Orthogonal Matrices",
    "q": "If matrix A is an orthogonal matrix (Aᵀ A = I), the value of its determinant det(A) is:",
    "options": [
      "0",
      "+1 or -1",
      "Infinity",
      "Any real number"
    ],
    "ans": 1,
    "explanation": "Since Aᵀ A = I, taking determinants gives det(Aᵀ)*det(A) = det(I) => [det(A)]² = 1, so det(A) = ±1."
  },
  {
    "id": "math_u1_q14",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 1,
    "topic": "Linear Algebra: Homogeneous Systems",
    "q": "A system of n homogeneous linear equations in n variables AX = O has a non-zero (non-trivial) solution if and only if:",
    "options": [
      "|A| ≠ 0",
      "|A| = 0",
      "Rank(A) = n",
      "Rank(A) > n"
    ],
    "ans": 1,
    "explanation": "AX = O has a non-trivial solution iff the coefficient matrix A is singular, meaning det(A) = 0 and Rank(A) < n."
  },
  {
    "id": "math_u1_q15",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 1,
    "topic": "Linear Algebra: Cayley-Hamilton Theorem",
    "q": "Cayley-Hamilton Theorem states that every square matrix satisfies its own:",
    "options": [
      "Matrix inverse equation",
      "Characteristic equation |A - λI| = 0",
      "Differential equation",
      "Rank normal form"
    ],
    "ans": 1,
    "explanation": "Cayley-Hamilton theorem states that if P(λ) = |A - λI| = 0 is the characteristic polynomial of matrix A, then P(A) = O."
  },
  {
    "id": "math_u2_q16",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 2,
    "topic": "Differential Calculus: Rolle's Theorem",
    "q": "Which condition is NOT required for Rolle's Theorem to hold on an interval [a, b]?",
    "options": [
      "f(x) is continuous on [a, b]",
      "f(x) is differentiable on (a, b)",
      "f(a) = f(b)",
      "f'(a) = f'(b)"
    ],
    "ans": 3,
    "explanation": "Rolle's theorem requires: (1) continuity on [a, b], (2) differentiability on (a, b), and (3) f(a) = f(b). It does NOT require f'(a) = f'(b)."
  },
  {
    "id": "math_u2_q17",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 2,
    "topic": "Differential Calculus: Cauchy's Mean Value Theorem",
    "q": "In Cauchy's Mean Value Theorem for f(x) and g(x) on [a, b], the value c satisfies:",
    "options": [
      "[f(b) - f(a)] / [g(b) - g(a)] = f'(c) / g'(c)",
      "[f(b) - f(a)] = f'(c) * (b - a)",
      "f(c) * g(c) = 0",
      "f'(c) + g'(c) = 0"
    ],
    "ans": 0,
    "explanation": "Cauchy's Mean Value Theorem states that [f(b) - f(a)] / [g(b) - g(a)] = f'(c) / g'(c) for some c ∈ (a, b)."
  },
  {
    "id": "math_u2_q18",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 2,
    "topic": "Differential Calculus: Taylor's Series",
    "q": "In the Taylor series expansion of f(x) about x = a, the coefficient of (x - a)ⁿ is:",
    "options": [
      "f⁽ⁿ⁾(a)",
      "f⁽ⁿ⁾(a) / n!",
      "f⁽ⁿ⁾(0) / n!",
      "n! * f⁽ⁿ⁾(a)"
    ],
    "ans": 1,
    "explanation": "Taylor series expansion formula is f(x) = ∑ [f⁽ⁿ⁾(a) / n!] * (x - a)ⁿ. The coefficient of (x - a)ⁿ is f⁽ⁿ⁾(a) / n!."
  },
  {
    "id": "math_u3_q19",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 3,
    "topic": "Multivariable Calculus: Euler's 2nd Order Theorem",
    "q": "If u(x, y) is a homogeneous function of degree n in x and y, then x² u_xx + 2xy u_xy + y² u_yy equals:",
    "options": [
      "n * u",
      "n(n - 1) * u",
      "n² * u",
      "(n - 1) * u"
    ],
    "ans": 1,
    "explanation": "Euler's theorem for second-order partial derivatives states: x²(∂²u/∂x²) + 2xy(∂²u/∂x∂y) + y²(∂²u/∂y²) = n(n - 1)u."
  },
  {
    "id": "math_u3_q20",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 3,
    "topic": "Multivariable Calculus: Saddle Point Condition",
    "q": "For a two-variable function f(x, y), let r = f_xx, s = f_xy, and t = f_yy. A stationary point is a Saddle Point if:",
    "options": [
      "rt - s² > 0 and r > 0",
      "rt - s² > 0 and r < 0",
      "rt - s² < 0",
      "rt - s² = 0"
    ],
    "ans": 2,
    "explanation": "When the discriminant rt - s² < 0, the stationary point is a saddle point (neither maximum nor minimum)."
  },
  {
    "id": "math_u2_q21",
    "courseCode": "100102",
    "subject": "Math-I",
    "unitNo": 2,
    "topic": "Limits: L'Hopital's Rule Condition",
    "q": "L'Hopital's Rule can be directly applied to evaluate limits only when the limit evaluates to indeterminate forms:",
    "options": [
      "0/0 or ∞/∞",
      "0 * ∞ or 1^∞",
      "∞ - ∞",
      "Any undefined fraction"
    ],
    "ans": 0,
    "explanation": "L'Hopital's rule directly applies strictly to 0/0 or (±∞)/(±∞). Other indeterminate forms (0*∞, 1^∞, ∞-∞) must first be algebraically transformed into 0/0 or ∞/∞."
  },
  {
    "id": "phy_u1_q12",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 1,
    "topic": "Wave Optics: Newton's Rings Dark Ring Diameter",
    "q": "In Newton's rings experiment under reflected light, the diameter of the n-th dark ring D_n is proportional to:",
    "options": [
      "n",
      "n²",
      "√n",
      "1 / √n"
    ],
    "ans": 2,
    "explanation": "For dark rings, D_n² = 4nλR => D_n = 2√(nλR) ∝ √n. The diameters of dark rings are proportional to square roots of natural numbers."
  },
  {
    "id": "phy_u1_q13",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 1,
    "topic": "Wave Optics: Single Slit Diffraction Minimum",
    "q": "In Fraunhofer diffraction at a single slit of width 'a' using light of wavelength λ, the condition for the first diffraction minimum is:",
    "options": [
      "a sin θ = λ / 2",
      "a sin θ = λ",
      "a sin θ = 2λ",
      "a sin θ = 0"
    ],
    "ans": 1,
    "explanation": "The condition for diffraction minima from a single slit is a * sin θ = m * λ (where m = ±1, ±2, ...). For the first minimum, m = 1, so a sin θ = λ."
  },
  {
    "id": "phy_u1_q14",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 1,
    "topic": "Wave Optics: Resolving Power of Diffraction Grating",
    "q": "The resolving power of a diffraction grating with total N lines in the n-th diffraction order is:",
    "options": [
      "n / N",
      "n * N",
      "N / n",
      "n² * N"
    ],
    "ans": 1,
    "explanation": "Resolving power RP = λ / dλ = n * N, where n is spectral order and N is total number of ruling lines on the grating."
  },
  {
    "id": "phy_u2_q15",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 2,
    "topic": "Lasers: He-Ne Laser Wavelength",
    "q": "The popular red laser output of a continuous-wave Helium-Neon (He-Ne) gas laser has a wavelength of:",
    "options": [
      "694.3 nm",
      "632.8 nm",
      "532.0 nm",
      "1064 nm"
    ],
    "ans": 1,
    "explanation": "The 3s → 2p radiative transition in Neon atoms produces the standard bright red laser line at λ = 632.8 nm (6328 Å)."
  },
  {
    "id": "phy_u2_q16",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 2,
    "topic": "Fiber Optics: Critical Angle for TIR",
    "q": "In an optical fiber with core refractive index n₁ and cladding refractive index n₂, total internal reflection occurs at the core-cladding boundary when angle of incidence φ satisfies:",
    "options": [
      "φ < sin⁻¹(n₂ / n₁)",
      "φ ≥ sin⁻¹(n₂ / n₁)",
      "φ = 0°",
      "φ ≤ sin⁻¹(n₁ / n₂)"
    ],
    "ans": 1,
    "explanation": "TIR occurs when light traveling in a denser medium (n₁) strikes boundary with rarer medium (n₂) at an angle equal to or greater than critical angle θ_c = sin⁻¹(n₂ / n₁)."
  },
  {
    "id": "phy_u2_q17",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 2,
    "topic": "Fiber Optics: V-Number and Single Mode Condition",
    "q": "A step-index optical fiber operates in a single mode if its normalized frequency (V-number) satisfies:",
    "options": [
      "V > 10.0",
      "V < 2.405",
      "V = 5.0",
      "V > 2.405"
    ],
    "ans": 1,
    "explanation": "The cut-off condition for higher-order modes in a step-index optical fiber is V < 2.405 (the first zero of Bessel function J₀). When V < 2.405, only the fundamental HE₁₁ mode propagates."
  },
  {
    "id": "phy_u3_q18",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 3,
    "topic": "Electromagnetism: Maxwell's 2nd Equation",
    "q": "Maxwell's equation ∇ · B = 0 physically signifies that:",
    "options": [
      "Electric charges do not exist",
      "Magnetic monopoles do not exist (magnetic flux lines are continuous closed loops)",
      "Magnetic fields are always zero",
      "Magnetic fields travel faster than light"
    ],
    "ans": 1,
    "explanation": "The vanishing divergence of magnetic flux density (∇ · B = 0) states that isolated magnetic poles (monopoles) do not exist in nature; every magnetic field line is closed."
  },
  {
    "id": "phy_u3_q19",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 3,
    "topic": "Electromagnetism: Poynting Vector",
    "q": "The Poynting vector S = E × H represents:",
    "options": [
      "Electric charge per unit volume",
      "Rate of electromagnetic energy flow per unit surface area (W/m²)",
      "Total force on a moving charge",
      "Magnetic dipole moment"
    ],
    "ans": 1,
    "explanation": "The Poynting vector S = E × H represents directional power density (rate of energy flux) carried by an electromagnetic wave, measured in Watts per square meter (W/m²)."
  },
  {
    "id": "phy_u3_q20",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 3,
    "topic": "Electromagnetism: Displacement Current",
    "q": "The displacement current between the plates of a charging capacitor is given by:",
    "options": [
      "I_d = ε₀ * (dΦ_E / dt)",
      "I_d = μ₀ * (dΦ_B / dt)",
      "I_d = V / R",
      "I_d = 0"
    ],
    "ans": 0,
    "explanation": "Displacement current arises from a time-varying electric flux: I_d = ε₀ * (dΦ_E / dt) = ∫ (∂D/∂t) · dA, introduced by Maxwell to satisfy charge conservation."
  },
  {
    "id": "phy_u3_q21",
    "courseCode": "100104",
    "subject": "Physics",
    "unitNo": 3,
    "topic": "Magnetic Materials: Curie-Weiss Law",
    "q": "Above the Curie temperature T_c, a ferromagnetic material transforms into a paramagnetic material whose susceptibility obeys:",
    "options": [
      "χ = C / T",
      "χ = C / (T - θ)",
      "χ = C * T",
      "χ = constant"
    ],
    "ans": 1,
    "explanation": "Above Curie temperature, ferromagnets transition to paramagnetic state governed by the Curie-Weiss Law: χ = C / (T - θ), where C is Curie constant and θ is paramagnetic Curie temperature."
  },
  {
    "id": "ai_u1_q12",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 1,
    "topic": "Intelligent Agents: PEAS Model",
    "q": "In the PEAS framework for intelligent agent task environments, the letter 'P' stands for:",
    "options": [
      "Processor",
      "Performance Measure",
      "Perception",
      "Planning"
    ],
    "ans": 1,
    "explanation": "PEAS stands for Performance Measure, Environment, Actuators, and Sensors."
  },
  {
    "id": "ai_u1_q13",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 1,
    "topic": "Intelligent Agents: Chess Environment",
    "q": "The task environment for a competitive game of Chess is best classified as:",
    "options": [
      "Partially observable, stochastic, continuous",
      "Fully observable, deterministic, discrete, sequential",
      "Fully observable, dynamic, continuous",
      "Partially observable, episodic, single-agent"
    ],
    "ans": 1,
    "explanation": "Chess is fully observable (both players see full board), deterministic (moves have exact rules), discrete (finite distinct board states), and sequential (current moves dictate future states)."
  },
  {
    "id": "ai_u2_q14",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Search: BFS Space Complexity",
    "q": "What is the memory (space) complexity of Breadth-First Search (BFS) with branching factor b and solution depth d?",
    "options": [
      "O(b * d)",
      "O(bᵈ)",
      "O(d)",
      "O(log d)"
    ],
    "ans": 1,
    "explanation": "BFS stores all expanded nodes in the frontier queue level by level. At depth d, there are O(bᵈ) nodes residing in memory, making its space complexity exponential O(bᵈ)."
  },
  {
    "id": "ai_u2_q15",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Search: DFS Space Complexity",
    "q": "The primary advantage of Depth-First Search (DFS) over Breadth-First Search (BFS) is:",
    "options": [
      "DFS is always guaranteed to find the shortest path",
      "DFS has linear space complexity O(b * m), requiring drastically less memory",
      "DFS never gets stuck in infinite loops",
      "DFS is optimal for all step costs"
    ],
    "ans": 1,
    "explanation": "DFS only needs to store nodes on the current path from root to leaf, plus unexpanded siblings. Its space complexity is linear O(b * m), where m is maximum search depth."
  },
  {
    "id": "ai_u2_q16",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Search: Uniform Cost Search (UCS)",
    "q": "Uniform Cost Search (UCS) expands nodes in order of:",
    "options": [
      "Lowest heuristic estimate h(n)",
      "Lowest accumulated path cost g(n)",
      "Highest depth d",
      "Random selection"
    ],
    "ans": 1,
    "explanation": "UCS expands the frontier node with minimum path cost g(n) from root. It is essentially Dijkstra's algorithm applied to state-space graphs."
  },
  {
    "id": "ai_u2_q17",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Heuristic Search: Admissibility Definition",
    "q": "A heuristic function h(n) in A* search is called 'Admissible' if:",
    "options": [
      "h(n) is always greater than true cost h*(n)",
      "h(n) never overestimates the true minimum cost to reach the goal: 0 ≤ h(n) ≤ h*(n)",
      "h(n) is always equal to 0",
      "h(n) is negative"
    ],
    "ans": 1,
    "explanation": "An admissible heuristic is an optimistic estimate: it never overestimates the true lowest path cost to the goal: 0 ≤ h(n) ≤ h*(n)."
  },
  {
    "id": "ai_u2_q18",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Heuristic Search: Consistency (Monotonicity)",
    "q": "A heuristic h(n) is consistent (monotonic) if for every node n and successor n' generated by action a:",
    "options": [
      "h(n) ≤ c(n, a, n') + h(n')",
      "h(n) ≥ c(n, a, n') + h(n')",
      "h(n) = h(n')",
      "h(n) + h(n') ≤ 1"
    ],
    "ans": 0,
    "explanation": "Consistency is the triangle inequality condition: estimated cost to goal from n cannot exceed step cost to n' plus estimated cost from n': h(n) ≤ c(n, a, n') + h(n')."
  },
  {
    "id": "ai_u2_q19",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Adversarial Search: Minimax Strategy",
    "q": "The Minimax algorithm assumes that the opponent:",
    "options": [
      "Makes random moves",
      "Plays sub-optimally",
      "Plays optimally to minimize MAX's payoff (zero-sum game)",
      "Cooperates with MAX"
    ],
    "ans": 2,
    "explanation": "Minimax operates in 2-player zero-sum games where the MIN opponent plays optimally to minimize MAX's utility (which maximizes MIN's utility)."
  },
  {
    "id": "ai_u2_q20",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 2,
    "topic": "Adversarial Search: Alpha-Beta Pruning Condition",
    "q": "In Alpha-Beta pruning, a subtree is pruned whenever:",
    "options": [
      "α < β",
      "α ≥ β",
      "α = 0",
      "β = ∞"
    ],
    "ans": 1,
    "explanation": "Alpha (α) is the best choice found so far for MAX (highest value), and Beta (β) is the best choice for MIN (lowest value). When α ≥ β, the current state can never be reached under rational play, so the remaining branches are pruned."
  },
  {
    "id": "ai_u1_q21",
    "courseCode": "100105",
    "subject": "IAI",
    "unitNo": 1,
    "topic": "Agent Architectures: Goal-based vs Reflex",
    "q": "Unlike a Simple Reflex Agent which acts purely on condition-action rules from current percept, a Goal-Based Agent:",
    "options": [
      "Has no sensors",
      "Combines goal descriptions with knowledge of future states to choose actions that achieve the goal",
      "Only uses random exploration",
      "Never stores historical state"
    ],
    "ans": 1,
    "explanation": "A goal-based agent considers not only current percepts but also goal definitions and models of the world to simulate consequences of actions before making decisions."
  },
  {
    "id": "cfet_u2_q28",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 2,
    "topic": "Number Systems: Base/Radix Definition",
    "q": "What is the base (radix) of the Hexadecimal number system and how many distinct symbols does it utilize?",
    "options": [
      "Base 8 with digits 0-7",
      "Base 10 with digits 0-9",
      "Base 16 with symbols 0-9 and A-F",
      "Base 2 with digits 0 and 1"
    ],
    "ans": 2,
    "explanation": "Hexadecimal has base 16. It uses 16 symbols: numbers 0 to 9 followed by letters A (10), B (11), C (12), D (13), E (14), and F (15)."
  },
  {
    "id": "cfet_u2_q29",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 2,
    "topic": "Signed Numbers: 2's Complement of -12",
    "q": "The 8-bit 2's complement representation of decimal number -12 is:",
    "options": [
      "11110100",
      "11110011",
      "00001100",
      "10001100"
    ],
    "ans": 0,
    "explanation": "+12 in 8-bit binary is 00001100. 1's complement = 11110011. Adding 1 gives 2's complement: 11110011 + 1 = 11110100."
  },
  {
    "id": "cfet_u3_q30",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 3,
    "topic": "Boolean Algebra: De Morgan's Law",
    "q": "According to De Morgan's Theorem, the complement of a sum (A + B)' is equivalent to:",
    "options": [
      "A' + B'",
      "A' · B'",
      "(A · B)'",
      "A · B"
    ],
    "ans": 1,
    "explanation": "De Morgan's first theorem states: (A + B)' = A' · B' (the complement of an OR is the AND of individual complements)."
  },
  {
    "id": "cfet_u3_q31",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 3,
    "topic": "Combinational Logic: Half Adder Equations",
    "q": "The Boolean equations for the Sum (S) and Carry (C) outputs of a Half Adder with inputs A and B are:",
    "options": [
      "S = A · B, C = A ⊕ B",
      "S = A ⊕ B, C = A · B",
      "S = A + B, C = A · B",
      "S = (A ⊕ B)', C = A + B"
    ],
    "ans": 1,
    "explanation": "A half adder produces Sum S = A ⊕ B (XOR gate) and Carry C = A · B (AND gate)."
  },
  {
    "id": "cfet_u3_q32",
    "courseCode": "100108",
    "subject": "CFET",
    "unitNo": 3,
    "topic": "Combinational Logic: Full Adder with Half Adders",
    "q": "How many Half Adders and OR gates are required to construct a 1-bit Full Adder?",
    "options": [
      "1 Half Adder and 1 OR gate",
      "2 Half Adders and 1 OR gate",
      "2 Half Adders and 2 OR gates",
      "3 Half Adders and 0 OR gates"
    ],
    "ans": 1,
    "explanation": "A full adder is constructed using exactly two Half Adders (first computes A ⊕ B and A·B; second computes final Sum and intermediate carry) and one 2-input OR gate to combine the two carry terms."
  },
  {
    "id": "uhv_u1_q12",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 1,
    "topic": "Value Education: Human Aspirations & Priorities",
    "q": "According to Universal Human Values, the correct priority order among Right Understanding, Relationship, and Physical Facilities is:",
    "options": [
      "1. Physical Facilities → 2. Relationship → 3. Right Understanding",
      "1. Right Understanding → 2. Relationship → 3. Physical Facilities",
      "1. Relationship → 2. Physical Facilities → 3. Right Understanding",
      "All three have equal random priority"
    ],
    "ans": 1,
    "explanation": "Priority 1 is Right Understanding in the Self; Priority 2 is Right Feelings in Relationships leading to Mutual Happiness; Priority 3 is Physical Facilities leading to Mutual Prosperity."
  },
  {
    "id": "uhv_u2_q13",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 2,
    "topic": "Harmony in Self & Body: Definition of Sanyama",
    "q": "'Sanyama' is defined in UHV as:",
    "options": [
      "Forceful fasting and asceticism",
      "The feeling of responsibility in the Self ('I') for nurturing, protecting, and rightly utilizing the Body",
      "Accumulating excess physical wealth",
      "Ignoring the physical body completely"
    ],
    "ans": 1,
    "explanation": "Sanyama (Self-regulation) is the natural feeling of responsibility in the conscious Self ('I') to nurture, protect, and rightly utilize the physical Body as an instrument."
  },
  {
    "id": "uhv_u2_q14",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 2,
    "topic": "Harmony in Self & Body: Swasthya",
    "q": "'Swasthya' (Health) of the body implies:",
    "options": [
      "Taking high doses of medicine daily",
      "All parts and organs of the Body act in harmony and perform their functions according to the instructions of 'I'",
      "Having heavy muscular physique",
      "Remaining completely stationary"
    ],
    "ans": 1,
    "explanation": "Swasthya is the state where every part and organ of the physical body acts in mutual coordination and health, obedient to the conscious Self ('I')."
  },
  {
    "id": "uhv_u3_q15",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 3,
    "topic": "Human Relationships: Foundational Value",
    "q": "Which value is recognized as the foundational (primary) value in all human relationships?",
    "options": [
      "Respect (Samman)",
      "Trust (Vishwas)",
      "Glory (Gaurav)",
      "Affection (Sneha)"
    ],
    "ans": 1,
    "explanation": "Trust (Vishwas) is the foundational value in relationships. Without unconditional trust on intention, no meaningful relationship or communication can stand."
  },
  {
    "id": "uhv_u3_q16",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 3,
    "topic": "Human Relationships: Respect (Samman) Definition",
    "q": "In Universal Human Values, 'Respect' (Samman) is precisely defined as:",
    "options": [
      "Showing fear and submissiveness to authority",
      "Right Evaluation (Rightly evaluating the other person without over, under, or otherwise evaluation)",
      "Flattering someone with praises",
      "Comparing someone with wealthy people"
    ],
    "ans": 1,
    "explanation": "Respect is defined as Right Evaluation (Yathartha Mulyankan). Evaluating someone as they are, without over-evaluation (Adhi-mulyankan), under-evaluation (Ava-mulyankan), or otherwise-evaluation (Anya-mulyankan)."
  },
  {
    "id": "uhv_u3_q17",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 3,
    "topic": "Human Relationships: Love (Prem)",
    "q": "The complete value (Purna Mulya) in human relationships that encompasses a feeling of relatedness to all human beings and nature is:",
    "options": [
      "Affection (Sneha)",
      "Love (Prem)",
      "Care (Mamta)",
      "Guidance (Vatsalya)"
    ],
    "ans": 1,
    "explanation": "Love (Prem) is the complete value (Purna Mulya). It is the feeling of unconditional oneness and kinship with each and every human being and all of existence."
  },
  {
    "id": "uhv_u1_q18",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 1,
    "topic": "Harmony at 4 Levels",
    "q": "Human living extends across four interconnected levels of existence. These four levels in correct order are:",
    "options": [
      "Individual (Self) → Family → Society → Nature/Existence",
      "Society → State → Country → World",
      "Body → Brain → Mind → Spirit",
      "Family → School → Workplace → Government"
    ],
    "ans": 0,
    "explanation": "UHV models living at 4 levels: 1. In the Individual (Self), 2. In the Family, 3. In the Society, 4. In Nature and Existence."
  },
  {
    "id": "uhv_u3_q19",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 3,
    "topic": "Societal Goals: Samadhan, Samridhi, Abhay, Sah-astitva",
    "q": "The comprehensive human goal at the societal level consists of:",
    "options": [
      "Industrialization, Urbanization, Wealth accumulation, Military power",
      "Right understanding (Samadhan) in every individual, Prosperity (Samridhi) in every family, Fearlessness/Trust (Abhay) in society, and Co-existence (Sah-astitva) with nature",
      "Winning political elections and expanding borders",
      "Maximizing GDP and consumer consumption"
    ],
    "ans": 1,
    "explanation": "The 4 universal human goals for society are: 1. Samadhan (Right Understanding) in individual, 2. Samridhi (Prosperity) in family, 3. Abhay (Trust/Fearlessness) in society, and 4. Sah-astitva (Co-existence) in nature."
  },
  {
    "id": "uhv_u2_q20",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 2,
    "topic": "Needs of Self vs Needs of Body",
    "q": "Compare the nature and duration of the needs of the conscious Self ('I') versus the material Body:",
    "options": [
      "Needs of 'I' are temporary; needs of Body are continuous",
      "Needs of 'I' are qualitative and continuous (happiness, trust); needs of Body are quantitative and temporary (food, clothes)",
      "Both 'I' and Body have identical physical needs",
      "Neither 'I' nor Body has any real needs"
    ],
    "ans": 1,
    "explanation": "Needs of 'I' (happiness, peace, respect) are qualitative and needed continuously. Needs of the Body (food, water, shelter) are quantitative, physical, and required periodically/temporarily."
  },
  {
    "id": "uhv_u1_q21",
    "courseCode": "100109",
    "subject": "UHV",
    "unitNo": 1,
    "topic": "Value Education: Natural Acceptance",
    "q": "'Natural Acceptance' (Sahaj Svikriti) in UHV has which of the following properties?",
    "options": [
      "It changes with time, age, and mood",
      "It depends on religious scriptures and prevailing social customs",
      "It is invariant with time, person, and place, residing constantly within every human being",
      "It can only be experienced after reaching old age"
    ],
    "ans": 2,
    "explanation": "Natural Acceptance is the intrinsic, universal faculty in every human being that is unconditional, uncorrupted by conditioning, and invariant across time, location, and culture."
  }
];
