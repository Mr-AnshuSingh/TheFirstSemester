// ============================================================================
// M&C MID-SEM REVISION: COMPREHENSIVE TICKABLE OBJECTIVE MCQ BANK
// 6 Official Exam Subjects · Units 1, 2, and 3 · BEU Sister College Exam Pattern
// ============================================================================

export interface MidsemMcq {
  id: string;
  courseCode: string;
  subject: "BEEE" | "Math-I" | "Physics" | "IAI" | "CFET" | "UHV";
  unitNo: 1 | 2 | 3;
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
  }
];
