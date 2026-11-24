// ============================================================================
// MID-SEMESTER EXAM MASTER REVISION DATA (BATCH 2026-2030, GROUP-A: M&C)
// Official Exam Subjects for Branch Mathematics & Computing (LNJPIT Chapra)
// Units 1, 2, and 3 for all 6 Exam Subjects: BEEE, Math-I, Physics, IAI, CFET, UHV
// ============================================================================

export interface MidsemTopic {
  heading: string;
  plainExplanation: string;
  keyFormula: string;
  examTip: string;
}

export interface MidsemProblem {
  q: string;
  solution: string;
}

export interface MidsemUnit {
  unitNo: number;
  title: string;
  summary: string;
  topics: MidsemTopic[];
  standardProblems: MidsemProblem[];
}

export interface MidsemCourse {
  code: string;
  short: string;
  title: string;
  color: string;
  units: MidsemUnit[];
}

export interface BeuQuestion {
  qNum: string;
  marks: number;
  q: string;
  sol: string;
  co?: string;
  bl?: string;
}

export interface BeuSection {
  name: string;
  questions: BeuQuestion[];
}

export interface BeuPaper {
  id: string;
  subject: string;
  code: string;
  title: string;
  colleges: string;
  fullMarks: number;
  timeHours: number;
  instructions: string;
  sections: BeuSection[];
}

export interface MidsemData {
  examStartDate: string;
  title: string;
  batch: string;
  courses: MidsemCourse[];
}

export const MIDSEM_DATA: MidsemData = {
  examStartDate: "2026-11-27",
  title: "Mid-Semester Examination 2026",
  batch: "Batch 2026-2030 (Group A: Mathematics & Computing · LNJPIT Chapra)",
  courses: [
    // ------------------------------------------------------------------------
    // 1. BASICS OF ELECTRICAL & ELECTRONICS ENGINEERING (100111) — DAY 1 MORNING
    // ------------------------------------------------------------------------
    {
      code: "100111",
      short: "BEEE",
      title: "Basics of Electrical & Electronics Engineering",
      color: "#06b6d4",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: DC Circuits & Network Theorems",
          summary: "Covers KCL, KVL, Mesh/Nodal analysis, Thevenin, Norton, Superposition, Maximum Power Transfer theorem, and Star-Delta conversions.",
          topics: [
            {
              heading: "Kirchhoff's Laws & Circuit Analysis",
              plainExplanation: "KCL states that total current entering any node equals total current leaving it (conservation of charge). KVL states that algebraic sum of all voltages in any closed loop equals zero (conservation of energy).",
              keyFormula: "KCL: ∑ I_in = ∑ I_out.\nKVL: ∑ V_sources = ∑ I·R.\nSign rule: Traversing from - to + terminal adds +V; in direction of current across resistor adds -I·R.",
              examTip: "For circuits with 2 or more meshes, standard Mesh Analysis with matrix [R]·[I] = [V] is fastest and eliminates arithmetic mistakes."
            },
            {
              heading: "Thevenin's & Norton's Equivalent Circuits",
              plainExplanation: "Any linear two-terminal circuit can be simplified to a single voltage source V_th in series with R_th (Thevenin), or an equivalent current source I_N in parallel with R_th (Norton).",
              keyFormula: "Thevenin Load Current: I_L = V_th / (R_th + R_L).\nNorton Current: I_N = V_th / R_th (short circuit current).\nTo find R_th: Deactivate all independent sources (Voltage → Short 0V, Current → Open 0A).",
              examTip: "Always draw the simplified 2-component equivalent circuit diagram with clear terminal labels A and B before calculating I_L."
            },
            {
              heading: "Superposition & Maximum Power Transfer Theorems",
              plainExplanation: "Superposition applies to linear bilateral circuits: response with all sources active equals the sum of responses from each source acting alone. Maximum Power Transfer occurs when load resistance equals Thevenin source resistance.",
              keyFormula: "Maximum Power: R_L = R_th.\nP_max = (V_th)² / (4 · R_th).\nEfficiency at P_max is always exactly 50% (half energy lost in internal resistance).",
              examTip: "In Superposition, leave dependent sources intact! Only deactivate independent voltage and current sources."
            }
          ],
          standardProblems: [
            {
              q: "A DC source has open circuit voltage V_th = 24 V and internal resistance R_th = 6 Ω. Find the value of load resistor R_L for maximum power delivery, and calculate P_max.",
              solution: "1. For maximum power transfer: R_L = R_th = 6 Ω.\n2. Maximum power formula: P_max = V_th² / (4 · R_th) = (24)² / (4 × 6) = 576 / 24 = 24 Watts.\n3. Load current: I_L = 24 / (6 + 6) = 2 A. Power in load: I_L² · R_L = (2)² × 6 = 24 Watts."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: AC Circuits & Resonance",
          summary: "Covers single-phase AC waveforms, RMS and Average values, Phasors, Series RLC Resonance, Q-factor, and 3-Phase Star/Delta connections.",
          topics: [
            {
              heading: "Sinusoidal AC Waveforms & Values",
              plainExplanation: "Alternating current reverses direction periodically. Peak value V_m is the maximum height. RMS value is the equivalent DC value delivering equal heating power. Average value over a half cycle represents net charge transferred.",
              keyFormula: "V_rms = V_m / √2 ≈ 0.707 · V_m.\nV_avg = (2 · V_m) / π ≈ 0.637 · V_m.\nForm Factor k_f = V_rms / V_avg = 1.11.\nPeak Factor k_p = V_m / V_rms = 1.414.",
              examTip: "The 1.11 form factor applies exclusively to pure sinusoidal waves. For half-wave or triangular waves, re-derive using integration."
            },
            {
              heading: "Series RLC Resonance & Bandwidth",
              plainExplanation: "Resonance happens when inductive reactance X_L exactly cancels capacitive reactance X_C. At this frequency, circuit impedance is purely resistive, current reaches its maximum, and power factor is unity (cos φ = 1).",
              keyFormula: "Resonant Frequency: f_0 = 1 / (2π√(L·C)).\nImpedance at resonance: Z = R (minimum).\nQuality Factor: Q = (ω_0 · L) / R = (1 / R) · √(L / C).\nBandwidth: BW = f_0 / Q = R / (2πL).",
              examTip: "Series resonance is called voltage resonance (or acceptor circuit) because voltage across L or C can exceed total input voltage by factor Q."
            },
            {
              heading: "Balanced 3-Phase Systems: Star vs Delta",
              plainExplanation: "Three identical AC voltages separated by 120° phase angles. In Star (Y), line current equals phase current. In Delta (Δ), line voltage equals phase voltage.",
              keyFormula: "Star (Y): V_L = √3 · V_ph (leads by 30°), I_L = I_ph.\nDelta (Δ): V_L = V_ph, I_L = √3 · I_ph (lags by 30°).\nTotal 3-Phase Real Power: P = √3 · V_L · I_L · cos φ = 3 · V_ph · I_ph · cos φ.",
              examTip: "In numericals, unless stated otherwise, given 3-phase voltages and currents are always LINE-TO-LINE and RMS values."
            }
          ],
          standardProblems: [
            {
              q: "A series RLC circuit with R = 10 Ω, L = 0.1 H, and C = 10 µF is connected across a 230 V, 50 Hz AC supply. Find resonant frequency f_0, Q-factor, and current at resonance.",
              solution: "1. Resonant frequency: f_0 = 1 / [2π√(0.1 × 10×10⁻⁶)] = 1 / [2π√(10⁻⁶)] = 1 / (2π × 10⁻³) = 1000 / 6.283 = 159.15 Hz.\n2. Quality factor: Q = (1 / R) · √(L / C) = (1 / 10) · √(0.1 / 10⁻⁵) = (1/10) · √10000 = 100 / 10 = 10.\n3. Current at resonance: I_0 = V / R = 230 / 10 = 23 A (in phase with voltage)."
            }
          ]
        },
        {
          unitNo: 3,
          title: "Unit 3.0: Diodes & Semiconductor Devices (Electronics Module)",
          summary: "Covers P-N junction diode, Forward & Reverse bias, Half-wave & Bridge rectifiers (efficiency & ripple factor), Zener regulator, and BJT transistors (CE configuration).",
          topics: [
            {
              heading: "P-N Junction Diode & V-I Characteristics",
              plainExplanation: "Formed by joining p-type (holes) and n-type (electrons) semiconductors. Recombination creates a mobile-carrier-free depletion layer and a barrier potential (0.7V for Silicon, 0.3V for Germanium). Forward bias reduces barrier width allowing large current; reverse bias widens barrier stopping current except for microampere leakage.",
              keyFormula: "Diode Equation: I = I_0 · [exp(V / (η · V_T)) - 1].\nThermal Voltage at room temp (300 K): V_T = k·T / q ≈ 26 mV.\nBarrier Potential: V_0 = 0.7 V (Si), 0.3 V (Ge).",
              examTip: "Draw both forward (mA scale) and reverse (µA scale) curves on the same V-I axes, noting knee voltage and reverse breakdown."
            },
            {
              heading: "Rectifiers: Half-Wave vs Full-Wave Bridge",
              plainExplanation: "Rectification converts AC into pulsating DC. Half-wave uses 1 diode (conducts on positive half cycles). Full-wave Bridge uses 4 diodes in a bridge arrangement, conducting current through load in the same direction during both half cycles.",
              keyFormula: "Half-Wave: V_dc = V_m / π, Efficiency η = 40.6%, Ripple factor γ = 1.21, PIV = V_m.\nBridge Full-Wave: V_dc = (2·V_m) / π, Efficiency η = 81.2%, Ripple factor γ = 0.482, PIV = V_m.\nRipple Frequency: f_ripple = f_in (Half-Wave), 2·f_in (Full-Wave).",
              examTip: "Remember that Full-Wave Bridge rectifier has PIV = V_m, whereas Center-Tapped full-wave rectifier requires PIV = 2·V_m."
            },
            {
              heading: "Zener Diode Voltage Regulator & BJT Biasing",
              plainExplanation: "A Zener diode is heavily doped to produce a sharp reverse breakdown at voltage V_Z. Once in breakdown, voltage remains constant despite wide variations in input voltage or load current. A BJT (NPN/PNP) operates as an amplifier when emitter-base is forward biased and collector-base is reverse biased.",
              keyFormula: "Zener Current: I_Z = I_in - I_L.\nSeries Resistor: R_S = (V_in - V_Z) / (I_Z + I_L).\nBJT Current: I_E = I_B + I_C.\nCurrent Gains: α = I_C / I_E, β = I_C / I_B.\nFundamental Relation: β = α / (1 - α), α = β / (1 + β).",
              examTip: "In Common-Emitter (CE) configuration, remember the 3 operational regions: Active (amplification), Saturation (switch ON), and Cut-off (switch OFF)."
            }
          ],
          standardProblems: [
            {
              q: "A bridge rectifier delivers power to a 1 kΩ load from a 230 V (RMS), 50 Hz AC supply via a 10:1 step-down transformer. Calculate: (i) DC output voltage, (ii) DC load current, (iii) Rectification efficiency.",
              solution: "1. Secondary RMS voltage: V_2(rms) = 230 / 10 = 23 V.\n2. Peak secondary voltage: V_m = √2 × 23 = 32.53 V.\n3. DC output voltage: V_dc = (2 · V_m) / π = (2 × 32.53) / 3.1416 = 20.71 V.\n4. DC load current: I_dc = V_dc / R_L = 20.71 / 1000 = 20.71 mA.\n5. Rectification efficiency for bridge circuit: η = 81.2%."
            },
            {
              q: "In a common-emitter transistor circuit, base current I_B is 40 µA and collector current I_C is 4 mA. Calculate: (i) Common-emitter current gain β, (ii) Common-base current gain α, (iii) Emitter current I_E.",
              solution: "1. β = I_C / I_B = (4 × 10⁻³ A) / (40 × 10⁻⁶ A) = 100.\n2. α = β / (1 + β) = 100 / 101 = 0.9901.\n3. Emitter current: I_E = I_B + I_C = 0.04 mA + 4.0 mA = 4.04 mA."
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------------
    // 2. ENGINEERING MATHEMATICS - I (100102) — DAY 1 AFTERNOON
    // ------------------------------------------------------------------------
    {
      code: "100102",
      short: "Math-I",
      title: "Engineering Mathematics – I",
      color: "#8b5cf6",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Basic Linear Algebra",
          summary: "Covers row echelon form, rank of a matrix, consistency of linear equations (AX=B), eigenvalues, Cayley-Hamilton theorem, and quadratic forms.",
          topics: [
            {
              heading: "Rank of a Matrix & Echelon Form",
              plainExplanation: "The rank of a matrix is the total number of non-zero rows left after converting it into row echelon form using elementary row operations. In row echelon form, zero rows are at the bottom and pivots move strictly to the right.",
              keyFormula: "Rank ρ(A) = Number of non-zero rows in Row Echelon Form. For an m × n matrix, ρ(A) ≤ min(m, n).",
              examTip: "Always use elementary row operations only (R_i → R_i - k*R_j) when finding rank via Echelon form. Never mix column operations unless reducing to Normal form [I_r, 0; 0, 0]."
            },
            {
              heading: "Consistency of Linear Equations (AX = B)",
              plainExplanation: "To find if equations have solutions, write the augmented matrix [A | B] and reduce it to echelon form. Compare rank of A with rank of [A | B].",
              keyFormula: "1. ρ(A) ≠ ρ(A|B) → Inconsistent (No solution).\n2. ρ(A) = ρ(A|B) = n (unknowns) → Unique solution.\n3. ρ(A) = ρ(A|B) = r < n → Infinitely many solutions (with n - r free parameters).",
              examTip: "When asked for what values of λ and µ the system has unique, infinite, or no solutions, isolate the pivot in the last row and set it to zero or non-zero."
            },
            {
              heading: "Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem",
              plainExplanation: "Eigenvalues are special numbers λ for which A*X = λ*X. The Cayley-Hamilton theorem states that every square matrix satisfies its own characteristic equation |A - λI| = 0. Replacing λ with matrix A yields the null matrix.",
              keyFormula: "Characteristic Equation: |A - λI| = 0.\nCayley-Hamilton: Aⁿ + c₁·Aⁿ⁻¹ + ... + c_n·I = 0.\nInverse: A⁻¹ = (-1/c_n) · [Aⁿ⁻¹ + c₁·Aⁿ⁻² + ... + c_{n-1}·I].\nSum of eigenvalues = Trace(A). Product of eigenvalues = Det(A).",
              examTip: "Always verify eigenvalues by adding them: their sum must strictly equal the trace (sum of main diagonal elements) of matrix A."
            }
          ],
          standardProblems: [
            {
              q: "Find the values of a and b for which the system of equations x + y + z = 6, x + 2y + 3z = 10, x + 2y + az = b has: (i) No solution, (ii) Unique solution, (iii) Infinitely many solutions.",
              solution: "1. Augmented matrix [A|B]: [[1, 1, 1 | 6], [1, 2, 3 | 10], [1, 2, a | b]].\n2. Row operations:\n   R2 → R2 - R1 gives [0, 1, 2 | 4]\n   R3 → R3 - R2 gives [0, 0, a - 3 | b - 10].\n3. Analysis:\n   (i) No solution: a = 3 and b ≠ 10 (ρ(A) = 2, ρ(A|B) = 3).\n   (ii) Unique solution: a ≠ 3 (for any value of b, ρ(A) = ρ(A|B) = 3 = n).\n   (iii) Infinitely many solutions: a = 3 and b = 10 (ρ(A) = ρ(A|B) = 2 < 3)."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Differential Calculus – Single Variable",
          summary: "Covers successive differentiation, Leibnitz's Theorem, Rolle's, LMVT, Cauchy's Mean Value Theorems, Taylor/Maclaurin series, and Curvature.",
          topics: [
            {
              heading: "Leibnitz's Theorem for n-th Derivative",
              plainExplanation: "Used to differentiate the product of two functions n times. Choose u as the function whose derivatives don't vanish easily (like sin, cos, e^x), and v as the polynomial that terminates after few derivatives.",
              keyFormula: "(u · v)_n = u_n · v + ⁿC₁ · u_{n-1} · v₁ + ⁿC₂ · u_{n-2} · v₂ + ... + u · v_n.",
              examTip: "Whenever solving y = (sin⁻¹ x)², differentiate once, clear the denominator square root by squaring: (1 - x²)·(y₁)² = 4y, differentiate again, then apply Leibnitz."
            },
            {
              heading: "Mean Value Theorems: Rolle, LMVT & Cauchy",
              plainExplanation: "Rolle's theorem states that if f(a) = f(b) for a smooth curve, there is a horizontal tangent f'(c) = 0. LMVT generalizes this to secant slopes. Cauchy's theorem relates two functions f(x) and g(x).",
              keyFormula: "Rolle's Theorem: f'(c) = 0 for some c ∈ (a, b).\nLagrange's MVT: f'(c) = [f(b) - f(a)] / (b - a).\nCauchy's MVT: [f'(c) / g'(c)] = [f(b) - f(a)] / [g(b) - g(a)].",
              examTip: "Always state the 2 continuity and differentiability conditions clearly before finding c; writing them earns 2 free marks."
            },
            {
              heading: "Curvature & Radius of Curvature (ρ)",
              plainExplanation: "Curvature measures how sharply a curve bends at any point. Radius of curvature ρ is the radius of the circle that best matches the curve locally.",
              keyFormula: "Cartesian: ρ = [1 + (y₁)²]^(3/2) / |y₂|.\nParametric: ρ = (x'² + y'²)^(3/2) / (x'·y'' - y'·x'').\nPedal equation: ρ = r · (dr / dp).",
              examTip: "Radius of curvature ρ is always a positive physical length. Take absolute value of denominator if y₂ is negative."
            }
          ],
          standardProblems: [
            {
              q: "If y = (sin⁻¹ x)², prove that (1 - x²)·y_{n+2} - (2n + 1)x·y_{n+1} - n²·y_n = 0.",
              solution: "1. Given y = (sin⁻¹ x)².\n   y₁ = 2·sin⁻¹ x / √(1 - x²)  ==>  (1 - x²)·(y₁)² = 4y.\n2. Differentiate w.r.t x:\n   (1 - x²)·2y₁·y₂ - 2x·(y₁)² = 4y₁.\n   Divide by 2y₁: (1 - x²)·y₂ - x·y₁ - 2 = 0.\n3. Differentiate n times by Leibnitz's Theorem:\n   Term 1 [(1-x²)y₂]: (1-x²)y_{n+2} + n(-2x)y_{n+1} + [n(n-1)/2](-2)y_n.\n   Term 2 [-xy₁]: -[x·y_{n+1} + n·y_n].\n   Term 3 [-2]: 0.\n4. Collect terms:\n   (1 - x²)·y_{n+2} - [2nx + x]·y_{n+1} - [n(n-1) + n]·y_n = 0\n   ==> (1 - x²)·y_{n+2} - (2n + 1)x·y_{n+1} - n²·y_n = 0. (PROVED)"
            }
          ]
        },
        {
          unitNo: 3,
          title: "Unit 3.0: Differential Calculus – Multivariable",
          summary: "Covers partial derivatives, Euler's Theorem on homogeneous functions, Total derivatives, Jacobians, Taylor series in two variables, Maxima & Minima (rt - s²), and Lagrange multipliers.",
          topics: [
            {
              heading: "Partial Derivatives & Euler's Theorem",
              plainExplanation: "Partial differentiation treats all other variables as constants. A function f(x, y) is homogeneous of degree n if f(tx, ty) = tⁿ·f(x, y). Euler's theorem gives an immediate formula for the sum of weighted partial derivatives.",
              keyFormula: "First Order Euler Theorem: x · (∂u/∂x) + y · (∂u/∂y) = n · u.\nSecond Order Euler Theorem: x²·(∂²u/∂x²) + 2xy·(∂²u/∂x∂y) + y²·(∂²u/∂y²) = n(n - 1)·u.\nIf u = f(z) where z is homogeneous of degree n: x·(∂u/∂x) + y·(∂u/∂y) = n · [F(u) / F'(u)].",
              examTip: "If u = sin⁻¹[(x² + y²) / (x + y)], rewrite as z = sin u = (x²+y²)/(x+y), which is homogeneous of degree n = 1. Then x·u_x + y·u_y = 1 · tan u."
            },
            {
              heading: "Jacobians & Functional Dependence",
              plainExplanation: "Jacobian is the determinant of all first-order partial derivatives, representing the scaling factor during multivariable coordinate transformations. If Jacobian J = 0, the functions are functionally dependent.",
              keyFormula: "Jacobian J = ∂(u, v) / ∂(x, y) = |u_x  u_y; v_x  v_y| = u_x·v_y - u_y·v_x.\nReciprocal Property: J · J' = 1.\nChain Rule: ∂(u, v)/∂(r, θ) = [∂(u, v)/∂(x, y)] · [∂(x, y)/∂(r, θ)].\nFunctional Dependence: If ∂(u, v)/∂(x, y) = 0, then a relation f(u, v) = 0 exists.",
              examTip: "For polar coordinates x = r·cos θ, y = r·sin θ, always remember J = ∂(x, y)/∂(r, θ) = r."
            },
            {
              heading: "Maxima, Minima & Saddle Points (rt - s²)",
              plainExplanation: "Critical points occur where first partial derivatives vanish (f_x = 0, f_y = 0). The second derivative discriminant D = rt - s² determines whether the surface curves up (minimum), curves down (maximum), or forms a saddle pass.",
              keyFormula: "Let r = f_xx, s = f_xy, t = f_yy evaluated at critical point:\n1. If rt - s² > 0 and r < 0 → Local Maximum.\n2. If rt - s² > 0 and r > 0 → Local Minimum.\n3. If rt - s² < 0 → Saddle Point (neither max nor min).\n4. If rt - s² = 0 → Test Inconclusive.",
              examTip: "Always test rt - s² FIRST. Only check the sign of r if rt - s² > 0."
            }
          ],
          standardProblems: [
            {
              q: "If u = log[(x⁴ + y⁴) / (x + y)], prove that x·(∂u/∂x) + y·(∂u/∂y) = 3.",
              solution: "1. Let z = e^u = (x⁴ + y⁴) / (x + y).\n2. Test homogeneity: z(tx, ty) = [(tx)⁴ + (ty)⁴] / [tx + ty] = t³ · [(x⁴ + y⁴)/(x + y)] = t³ · z.\n   Hence z is homogeneous of degree n = 4 - 1 = 3.\n3. By Euler's Theorem on z: x·(∂z/∂x) + y·(∂z/∂y) = 3z.\n4. Since z = e^u: ∂z/∂x = e^u · (∂u/∂x) and ∂z/∂y = e^u · (∂u/∂y).\n5. Substitute: x·e^u·(∂u/∂x) + y·e^u·(∂u/∂y) = 3·e^u.\n   Dividing both sides by e^u: x·(∂u/∂x) + y·(∂u/∂y) = 3. (PROVED)"
            },
            {
              q: "Find the extreme values of f(x, y) = x³ + y³ - 3axy.",
              solution: "1. Stationary points: f_x = 3x² - 3ay = 0  ==>  y = x² / a.\n   f_y = 3y² - 3ax = 0  ==>  x = y² / a.\n   Substituting: x = (x² / a)² / a = x⁴ / a³  ==>  x(x³ - a³) = 0.\n   Critical points: (0, 0) and (a, a).\n2. Second derivatives: r = f_xx = 6x, s = f_xy = -3a, t = f_yy = 6y.\n3. Test at (0, 0): r = 0, s = -3a, t = 0 ==> rt - s² = 0 - 9a² = -9a² < 0.\n   Therefore, (0, 0) is a SADDLE POINT.\n4. Test at (a, a) (assuming a > 0): r = 6a, s = -3a, t = 6a.\n   rt - s² = (6a)(6a) - (-3a)² = 36a² - 9a² = 27a² > 0.\n   Since rt - s² > 0 and r = 6a > 0, the function has a LOCAL MINIMUM at (a, a).\n   Minimum value: f(a, a) = a³ + a³ - 3a³ = -a³."
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------------
    // 3. ENGINEERING PHYSICS (100103/100104) — DAY 2 MORNING
    // ------------------------------------------------------------------------
    {
      code: "100104",
      short: "Physics",
      title: "Engineering Physics",
      color: "#3b82f6",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Wave Optics (Interference & Diffraction)",
          summary: "Covers thin film interference, Newton's rings (wavelength & refractive index determination), Fraunhofer single/double slit diffraction, and Rayleigh criterion.",
          topics: [
            {
              heading: "Thin Film Interference & Newton's Rings",
              plainExplanation: "Light reflected from the upper and lower surfaces of a thin film interferes. At a denser boundary, a phase shift of π (path difference λ/2) occurs. In Newton's rings (air film between lens and glass plate), concentric circular dark and bright interference rings are produced with a central dark spot.",
              keyFormula: "Effective Path Difference: Δ = 2μt·cos r - λ/2.\nNewton's Rings Dark Ring Diameter: D_n² = 4·n·R·λ  ==>  D_n ∝ √n.\nBright Ring Diameter: D_n² = 2(2n - 1)·R·λ.\nWavelength of light: λ = (D_{n+p}² - D_n²) / (4·p·R).\nRefractive index of liquid: μ = (D_{n+p}² - D_n²)_air / (D_{n+p}² - D_n²)_liquid.",
              examTip: "In reflected light, the center of Newton's rings is always dark because at the point of contact film thickness t = 0, leaving path difference Δ = λ/2 (destructive interference)."
            },
            {
              heading: "Fraunhofer Diffraction: Single Slit & Grating",
              plainExplanation: "Diffraction is the bending of light around obstacles. In Fraunhofer single-slit diffraction, light waves from secondary wavelets interfere to produce a central bright maximum flanked by secondary maxima and minima.",
              keyFormula: "Single Slit Minima: a · sin θ = m · λ (m = ±1, ±2...).\nCentral Maximum Width: 2θ = 2λ / a, Linear width: 2β = (2λ·D) / a.\nDiffraction Grating Equation: (a + b) · sin θ = n · λ.\nRayleigh Criterion: Two spectral lines are just resolved when central maximum of one falls on the first minimum of the other.",
              examTip: "The central diffraction maximum has twice the angular width (2λ/a) of any secondary maximum (λ/a)."
            }
          ],
          standardProblems: [
            {
              q: "In a Newton's rings experiment, the diameter of the 4th and 12th dark rings are 0.40 cm and 0.70 cm respectively. Find the radius of curvature R of the lens if wavelength λ = 6000 Å.",
              solution: "1. Formula: λ = (D_{n+p}² - D_n²) / (4·p·R)  ==>  R = (D_{n+p}² - D_n²) / (4·p·λ).\n2. Given: n = 4, n+p = 12  ==>  p = 8.\n   D_4 = 0.40 cm, D_12 = 0.70 cm.\n   λ = 6000 Å = 6000 × 10⁻⁸ cm = 6 × 10⁻⁵ cm.\n3. Compute squared diameters: D_12² - D_4² = (0.70)² - (0.40)² = 0.49 - 0.16 = 0.33 cm².\n4. Substitute: R = 0.33 / [4 × 8 × (6 × 10⁻⁵)] = 0.33 / (1.92 × 10⁻³) = 171.88 cm (1.72 m)."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Lasers & Fiber Optics",
          summary: "Covers stimulated emission, Einstein's A & B coefficients, Population Inversion, He-Ne laser, Optical Fiber Total Internal Reflection, NA, and modes.",
          topics: [
            {
              heading: "Einstein's Coefficients & Population Inversion",
              plainExplanation: "LASER requires stimulated emission where an incident photon triggers an excited atom to emit an identical in-phase photon. Normal thermal equilibrium has more atoms in ground state; Population Inversion (pumping more atoms into higher metastable energy state) is required for amplification.",
              keyFormula: "Einstein Relation: B₁₂ = B₂₁ (Stimulated absorption = Stimulated emission probability).\nRatio: A₂₁ / B₂₁ = (8π·h·ν³) / c³  (Spontaneous-to-stimulated ratio ∝ ν³).\nPopulation Inversion: N₂ > N₁.",
              examTip: "State the 3 essential components of any laser: Active Medium, Pumping Source, and Resonant Optical Cavity."
            },
            {
              heading: "Optical Fibers & Numerical Aperture (NA)",
              plainExplanation: "Light travels through an optical fiber by Total Internal Reflection (TIR) inside a high-index core (n₁) surrounded by a lower-index cladding (n₂). Acceptance angle is the maximum cone angle for light to be guided.",
              keyFormula: "Critical Angle: θ_c = sin⁻¹(n₂ / n₁).\nNumerical Aperture: NA = √(n₁² - n₂²) ≈ n₁ · √(2Δ) where fractional index Δ = (n₁ - n₂) / n₁.\nAcceptance Angle: θ_a = sin⁻¹(NA) = sin⁻¹(√(n₁² - n₂²)).",
              examTip: "NA is dimensionless and measures the light gathering capacity of the fiber. It depends strictly on refractive indices, NOT fiber dimensions."
            }
          ],
          standardProblems: [
            {
              q: "Calculate the Numerical Aperture and Acceptance Angle of an optical fiber having core refractive index 1.55 and cladding refractive index 1.50.",
              solution: "1. Numerical Aperture: NA = √(n₁² - n₂²) = √[(1.55)² - (1.50)²] = √(2.4025 - 2.25) = √0.1525 ≈ 0.3905.\n2. Acceptance angle: θ_a = sin⁻¹(NA) = sin⁻¹(0.3905) = 22.98° ≈ 23°.\n3. Critical angle: θ_c = sin⁻¹(n₂ / n₁) = sin⁻¹(1.50 / 1.55) = sin⁻¹(0.9677) = 75.4°."
            }
          ]
        },
        {
          unitNo: 3,
          title: "Unit 3.0: Electromagnetism & Magnetic Materials",
          summary: "Covers Maxwell's four equations, Displacement Current derivation, Poynting vector (S = E × H), Dia/Para/Ferromagnetism, Domain theory, and B-H hysteresis loop.",
          topics: [
            {
              heading: "Maxwell's Equations & Displacement Current",
              plainExplanation: "Maxwell united electricity and magnetism into 4 equations. He noticed Ampere's circuital law violated charge continuity for time-varying fields (charging capacitor). He added the displacement current density J_d = ∂D/∂t, showing changing electric fields generate magnetic fields.",
              keyFormula: "1. ∇ · D = ρ_v (Gauss Electrostatics)\n2. ∇ · B = 0 (Gauss Magnetostatics — No monopoles)\n3. ∇ × E = -∂B/∂t (Faraday's Law)\n4. ∇ × H = J + ∂D/∂t (Ampere-Maxwell Law)\nDisplacement Current: I_d = ε₀ · (dΦ_E / dt).",
              examTip: "In capacitor dielectric, conduction current is 0, but displacement current I_d exactly equals external wire conduction current I_c, preserving continuity."
            },
            {
              heading: "Poynting Vector & Electromagnetic Waves",
              plainExplanation: "The Poynting vector S = E × H represents the rate of energy flow per unit area carried by an electromagnetic wave. In free space, EM waves travel at speed of light c = 1/√(μ₀ε₀) with electric and magnetic fields perpendicular to each other and propagation direction.",
              keyFormula: "Poynting Vector: S = E × H (Units: Watts/m²).\nTime-Averaged Power Density: <S> = ½ · E₀ · H₀ = E₀² / (2 · η₀).\nIntrinsic Wave Impedance: η₀ = √(μ₀ / ε₀) ≈ 377 Ω.\nSpeed of light: c = 1 / √(μ₀·ε₀) ≈ 3 × 10⁸ m/s.",
              examTip: "Show dimensional analysis: [E] = V/m, [H] = A/m ==> [S] = (V·A)/m² = W/m²."
            },
            {
              heading: "Magnetic Materials & B-H Hysteresis Loop",
              plainExplanation: "Materials are classified by susceptibility χ: Diamagnetic (χ < 0, repelled by magnet), Paramagnetic (χ > 0 small, Curie's law χ ∝ 1/T), and Ferromagnetic (spontaneous domains, high χ). The B-H curve shows magnetic lag; the enclosed loop area represents energy lost as heat per cycle.",
              keyFormula: "B = μ₀ · (H + M) = μ · H.\nSusceptibility: χ = M / H, Relative permeability: μ_r = 1 + χ.\nRetentivity (B_r): Remaining B when H = 0.\nCoercivity (H_c): Reverse H required to demagnetize material to B = 0.\nHysteresis Energy Loss per cycle = ∮ H · dB (Area of B-H loop).",
              examTip: "Soft magnets (transformer cores) have narrow B-H loops with low coercivity. Hard magnets (permanent magnets) have wide loops with high coercivity and high retentivity."
            }
          ],
          standardProblems: [
            {
              q: "A parallel plate capacitor with circular plates of radius 10 cm is charged by a current of 0.2 A. Calculate: (i) The displacement current between the plates, (ii) The rate of change of electric flux dΦ_E / dt.",
              solution: "1. By Maxwell's continuity principle: I_d = I_c = 0.2 A.\n2. Since I_d = ε₀ · (dΦ_E / dt):\n   dΦ_E / dt = I_d / ε₀ = 0.2 / (8.854 × 10⁻¹²)\n   = 2.26 × 10¹⁰ V·m/s (or N·m²/C·s)."
            },
            {
              q: "The electric field of a plane electromagnetic wave in free space is given by E = 100 · cos(ωt - kz) a_x V/m. Calculate: (i) Peak magnetic field H_0, (ii) Time-averaged Poynting vector <S>.",
              solution: "1. Peak magnetic field: H_0 = E_0 / η_0 = 100 / 377 = 0.265 A/m.\n2. Time-averaged Poynting vector:\n   <S> = ½ · E_0 · H_0 = ½ × 100 × 0.265 = 13.25 W/m² in the +z direction (a_z)."
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------------
    // 4. INTRODUCTION TO AI (100105/100106) — DAY 2 AFTERNOON
    // ------------------------------------------------------------------------
    {
      code: "100105",
      short: "IAI",
      title: "Introduction to AI",
      color: "#ec4899",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: AI Foundations & Intelligent Agents",
          summary: "Covers definitions of AI, Turing Test, Rationality, PEAS framework, Task Environments, and Agent Architectures (Simple reflex, Model-based, Goal, Utility, Learning agents).",
          topics: [
            {
              heading: "PEAS Framework & Environment Classification",
              plainExplanation: "PEAS specifies agent design: Performance measure, Environment, Actuators, Sensors. Environments are classified as: Observable vs Partially observable, Deterministic vs Stochastic, Episodic vs Sequential, Static vs Dynamic, Discrete vs Continuous, Single vs Multi-agent.",
              keyFormula: "Rational Agent Principle: For each possible percept sequence, select an action that maximizes its expected performance measure given evidence and built-in knowledge.",
              examTip: "In exams, draw a neat 4-column PEAS table (Performance, Environment, Actuators, Sensors) for whatever system is asked (Taxi driver, Medical diagnosis)."
            },
            {
              heading: "Agent Architectures: Reflex to Learning Agent",
              plainExplanation: "Simple reflex acts on current percept using IF-THEN rules. Model-based maintains internal state of unseen world. Goal-based plans paths to targets. Utility-based trades off conflicting preferences. Learning agents separate performance from self-improvement.",
              keyFormula: "Learning Agent Components:\n1. Critic: Evaluates performance against external standard.\n2. Learning Element: Makes improvements from feedback.\n3. Performance Element: Selects external actions.\n4. Problem Generator: Suggests exploratory actions.",
              examTip: "Always sketch the Learning Agent diagram showing sensors → critic → learning element → performance element → actuators loop."
            }
          ],
          standardProblems: [
            {
              q: "Construct a complete PEAS description for an Automated Vacuum Cleaner Agent and classify its environment.",
              solution: "1. Performance Measure: Cleanliness percentage, energy consumption, noise level, time taken.\n2. Environment: Room layout, carpet/wood floor, furniture obstacles, dirt distribution.\n3. Actuators: Drive wheels (forward, backward, turn), suction motor, brush, dirt disposal valve.\n4. Sensors: Bump sensors, infrared cliff detectors, dirt optical sensor, room boundary camera.\n5. Classification: Partially observable, Stochastic, Sequential, Dynamic, Continuous, Single-agent."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Problem Solving & Search Algorithms",
          summary: "Covers state space formulation, Uninformed Search (BFS, DFS, UCS, DLS, IDS), and Informed Search (Greedy Best-First, A* Search with Admissibility & Consistency).",
          topics: [
            {
              heading: "Uninformed (Blind) Search: BFS, DFS & UCS",
              plainExplanation: "BFS explores level by level using FIFO queue (complete, optimal, but exponential memory O(b^d)). DFS explores deep paths using LIFO stack (linear memory O(b·m), but incomplete). UCS expands lowest path cost node g(n) using priority queue.",
              keyFormula: "BFS: Time O(b^d), Space O(b^d) [Memory Bottleneck].\nDFS: Time O(b^m), Space O(b·m) [Memory Efficient].\nUniform Cost Search (UCS): Evaluates f(n) = g(n). Optimal when step cost ≥ ε > 0.",
              examTip: "Iterative Deepening Search (IDS) combines BFS optimality with DFS linear O(b·d) space complexity—highlight this comparison."
            },
            {
              heading: "Heuristic Search & A* Optimality",
              plainExplanation: "A* search evaluates nodes with f(n) = g(n) + h(n), where g(n) is path cost from start, and h(n) is estimated cost to goal. If h(n) is admissible (never overestimates true cost), A* is guaranteed to find the optimal path.",
              keyFormula: "Evaluation Function: f(n) = g(n) + h(n).\nAdmissibility Condition: 0 ≤ h(n) ≤ h*(n) for all nodes n.\nConsistency (Monotonicity): h(n) ≤ c(n, a, n') + h(n') (Triangle Inequality).",
              examTip: "Remember: Admissibility guarantees optimality for TREE search; Consistency guarantees optimality for GRAPH search."
            }
          ],
          standardProblems: [
            {
              q: "Compare BFS and DFS across Completeness, Optimality, Time Complexity, and Space Complexity.",
              solution: "1. Completeness: BFS is complete (if branching factor b is finite). DFS is incomplete (can loop forever in infinite paths).\n2. Optimality: BFS is optimal if all step costs are equal. DFS is non-optimal (returns first found path).\n3. Time Complexity: BFS is O(b^d) where d is solution depth. DFS is O(b^m) where m is maximum tree depth.\n4. Space Complexity: BFS is O(b^d) (stores all frontier nodes in RAM). DFS is O(b·m) (linear space, highly efficient)."
            }
          ]
        },
        {
          unitNo: 3,
          title: "Unit 3.0: Adversarial Search & Game Playing",
          summary: "Covers two-player zero-sum games, Minimax algorithm, Alpha-Beta pruning condition (α ≥ β) with cutoffs, evaluation functions, and horizon effect.",
          topics: [
            {
              heading: "Game Trees & Minimax Algorithm",
              plainExplanation: "Games like Chess or Tic-Tac-Toe are modeled as search trees with alternating MAX (our agent) and MIN (opponent) plies. Terminal leaves return utility scores (+1 win, 0 draw, -1 loss). Minimax assumes the opponent always plays optimally.",
              keyFormula: "Minimax Decision:\nMAX Node: V(s) = max_{a ∈ Actions(s)} V(Result(s, a)).\nMIN Node: V(s) = min_{a ∈ Actions(s)} V(Result(s, a)).\nTime: O(b^m), Space: O(b·m) (depth-first traversal).",
              examTip: "In Minimax tree drawings, indicate MAX nodes with triangles pointing UP (▲) and MIN nodes with triangles pointing DOWN (▼)."
            },
            {
              heading: "Alpha-Beta Pruning & Cutoff Condition",
              plainExplanation: "Alpha-Beta pruning computes identical optimal minimax decisions without examining subtrees that cannot influence the final outcome. α is the best value found so far for MAX; β is the best value for MIN. A branch is pruned whenever α ≥ β.",
              keyFormula: "Parameters:\nα = Highest utility found so far along path for MAX (initialized to -∞).\nβ = Lowest utility found so far along path for MIN (initialized to +∞).\nPruning Cutoff: Prune whenever α ≥ β.\nOptimal Time Complexity: O(b^(m/2)) with perfect move ordering (effectively doubles search depth).",
              examTip: "Cutoff occurs at a MIN node if child value ≤ α (Alpha cutoff). Cutoff occurs at a MAX node if child value ≥ β (Beta cutoff)."
            }
          ],
          standardProblems: [
            {
              q: "In a 2-ply game tree, root MAX has two children B and C (MIN nodes). B has children with values 3 and 5. C has first child 2. Using Alpha-Beta pruning, determine whether the second child of C must be evaluated.",
              solution: "1. At root MAX: initialize α = -∞, β = +∞.\n2. Evaluate node B (MIN):\n   - First child = 3: B's value becomes min(+∞, 3) = 3.\n   - Second child = 5: B's value remains min(3, 5) = 3.\n   - B returns 3 to root MAX. Root updates α = max(-∞, 3) = 3.\n3. Evaluate node C (MIN) with α = 3, β = +∞:\n   - First child = 2: C's value becomes min(+∞, 2) = 2, so β becomes 2.\n4. Check cutoff condition at C: α = 3, β = 2  ==>  α ≥ β (3 ≥ 2).\n5. Conclusion: Alpha cutoff occurs! The second child of C does NOT need to be evaluated because MAX will never choose node C over node B."
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------------
    // 5. COMPUTER FUNDAMENTALS & EMERGING TECHNOLOGY (100108) — DAY 3 MORNING
    // ------------------------------------------------------------------------
    {
      code: "100108",
      short: "CFET",
      title: "Computer Fundamentals & Emerging Technologies",
      color: "#10b981",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Computer Systems & Architecture",
          summary: "Covers Von Neumann architecture, CPU registers, system buses, Memory hierarchy, and Cache access time equations.",
          topics: [
            {
              heading: "Von Neumann Architecture & Bottleneck",
              plainExplanation: "Von Neumann architecture stores program data and instructions in the same physical memory space. CPU contains ALU, Control Unit, and Registers. The Von Neumann Bottleneck occurs because throughput is limited by the shared data/instruction bus.",
              keyFormula: "CPU Cycle: Fetch → Decode → Execute.\nRegisters: PC (Program Counter), IR (Instruction Register), MAR (Memory Address Register), MDR (Memory Data Register), AC (Accumulator).",
              examTip: "Draw the standard 5-box diagram: CPU (ALU + Control Unit + Registers) connected to Main Memory and I/O via Address, Data, and Control buses."
            },
            {
              heading: "Memory Hierarchy & Cache Memory Access Time",
              plainExplanation: "Memory is organized hierarchically: fast/expensive registers at the top, down to slow/cheap disk storage. Cache memory exploits temporal and spatial locality to bridge the CPU-memory speed gap.",
              keyFormula: "Average Access Time: T_avg = h · t_c + (1 - h) · t_m.\nWhere h = Cache Hit Ratio, t_c = Cache access time, t_m = Main memory access time.\nMiss Ratio: m = 1 - h.",
              examTip: "Temporal Locality: recently accessed item likely accessed again soon. Spatial Locality: items near current address likely accessed soon."
            }
          ],
          standardProblems: [
            {
              q: "A computer system has cache access time of 2 ns and main memory access time of 60 ns. Find average memory access time if hit ratio is: (i) 90%, (ii) 98%.",
              solution: "1. Formula: T_avg = h · t_c + (1 - h) · t_m.\n2. For h = 0.90:\n   T_avg = 0.90 × 2 + (1 - 0.90) × 60 = 1.8 + 6.0 = 7.8 ns.\n3. For h = 0.98:\n   T_avg = 0.98 × 2 + (1 - 0.98) × 60 = 1.96 + 1.2 = 3.16 ns.\n4. Takeaway: Improving hit ratio from 90% to 98% more than doubles memory speed!"
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Data Representation & Number Systems",
          summary: "Covers radix conversions (Binary, Octal, Hex), 1's and 2's complement arithmetic, IEEE 754 Floating Point format, and character encoding.",
          topics: [
            {
              heading: "Radix Conversions & 2's Complement Arithmetic",
              plainExplanation: "Numbers can be represented in base-2 (binary), base-8 (octal), base-10 (decimal), and base-16 (hexadecimal). Negative integers are stored using 2's complement (invert bits and add 1). Overflow occurs when adding two numbers of same sign produces opposite sign.",
              keyFormula: "2's Complement = (1's Complement) + 1.\nn-bit Signed Range: -2ⁿ⁻¹ to +(2ⁿ⁻¹ - 1).\nOverflow Condition: C_in ⊕ C_out = 1 at sign bit.",
              examTip: "2's complement is favored by CPU designers because it provides a unique zero (00000000) and subtracts numbers using the same hardware adder circuit."
            },
            {
              heading: "IEEE 754 Single-Precision Floating Point",
              plainExplanation: "Standard 32-bit format to represent real fractional numbers: 1 sign bit (S), 8 exponent bits (E) with bias 127, and 23 mantissa/fraction bits (M) with implicit leading 1.",
              keyFormula: "Value = (-1)^S · (1.M)₂ · 2^(E - 127).\nSign bit: 0 = Positive, 1 = Negative.\nBiased Exponent: E = true_exponent + 127.",
              examTip: "To convert decimal to IEEE 754: 1. Convert integer & fraction to binary. 2. Normalize to 1.M × 2^e. 3. Add 127 to e for E. 4. Pad M to 23 bits."
            }
          ],
          standardProblems: [
            {
              q: "Represent the decimal number -13.625 in IEEE 754 single-precision 32-bit floating point format.",
              solution: "1. Sign: Negative ==> S = 1.\n2. Convert 13.625 to binary:\n   Integer: 13 = 1101₂.\n   Fraction: 0.625 × 2 = 1.25 (1), 0.25 × 2 = 0.5 (0), 0.5 × 2 = 1.0 (1) ==> 0.101₂.\n   Combined: 13.625 = 1101.101₂.\n3. Normalize: 1.101101 × 2³.\n   True exponent e = 3. Biased exponent E = 3 + 127 = 130 = 10000010₂ (8 bits).\n4. Mantissa M: 101101 followed by seventeen 0s (23 bits).\n5. Full 32-bit binary: [1] [10000010] [10110100000000000000000].\n   Hex representation: C15A0000₁₆."
            }
          ]
        },
        {
          unitNo: 3,
          title: "Unit 3.0: Digital Logic & Boolean Algebra",
          summary: "Covers basic & universal gates (NAND/NOR), De Morgan's laws, SOP/POS forms, Karnaugh Maps (2, 3, 4 variables), and Combinational Adders.",
          topics: [
            {
              heading: "Universal Gates & De Morgan's Theorems",
              plainExplanation: "NAND and NOR are universal gates because any logic gate (NOT, AND, OR, XOR) can be constructed solely using them. De Morgan's theorems state that complement of product equals sum of complements, and complement of sum equals product of complements.",
              keyFormula: "De Morgan's 1st Law: (A · B)' = A' + B' (NAND = Bubbled OR).\nDe Morgan's 2nd Law: (A + B)' = A' · B' (NOR = Bubbled AND).\nRealizing NOT via NAND: Join both inputs: A NAND A = A'.\nRealizing AND via NAND: (A NAND B) followed by NOT = A·B.",
              examTip: "To realize OR gate using NAND: invert inputs A and B using NAND, then feed into 3rd NAND: (A' · B')' = A + B (needs 3 NAND gates)."
            },
            {
              heading: "K-Maps & Combinational Adders (Half & Full Adder)",
              plainExplanation: "Karnaugh Maps simplify Boolean expressions visually using Gray code cell adjacency. Group adjacent 1s in powers of 2 (pairs, quads, octets). Half Adder adds 2 bits; Full Adder adds 3 bits (including carry-in).",
              keyFormula: "Half Adder: Sum S = A ⊕ B, Carry C = A · B.\nFull Adder: Sum S = A ⊕ B ⊕ C_in, Carry C_out = A·B + C_in·(A ⊕ B).\nFull Adder = 2 Half Adders + 1 OR gate.",
              examTip: "Always label K-map rows and columns in Gray code: 00, 01, 11, 10. Notice that 11 comes before 10!"
            }
          ],
          standardProblems: [
            {
              q: "Minimize the Boolean function F(A, B, C, D) = ∑ m(0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14) using a 4-variable K-Map.",
              solution: "1. Set up 4×4 K-map with AB on rows and CD on columns.\n2. Plot 1s in cells: 0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14.\n3. Form optimal groups:\n   - Octet (rows 0, 1, cols 0, 1) + wrap around cells: Group of eight in cols 00 & 01 (C'D' and C'D): terms reduce to C'.\n   - Quad 1: Cells (0, 2, 4, 6) in rows 00 & 01 with cols 00 & 10: terms reduce to A'D'.\n   - Quad 2: Cells (4, 5, 12, 13) in rows 01 & 11 with cols 00 & 01: terms reduce to BC'.\n   - Quad 3: Cells (12, 13, 14, 15) with wrap around gives BD'.\n4. Minimal Simplified SOP Expression: F = C' + A'D' + BD'."
            }
          ]
        },
      {
        unitNo: 4,
        title: "Unit 4.0: Computer Networks & Internet Basics",
        summary: "Transmission media (guided vs unguided), network topologies (Star, Bus, Ring, Mesh), network devices (hub, switch, router, modem, gateway), IP addressing, protocols (TCP vs UDP 3-way handshake, HTTP, FTP, DNS, URL), and client-server architecture.",
        topics: [
          {
            heading: "Transmission Media: Guided (Wired) vs Unguided (Wireless)",
            plainExplanation: "Guided media guides signals through physical conduits: Twisted-pair (UTP/STP, low cost, LANs, prone to EMI), Coaxial cable (solid copper with shielding for broadband/CCTV), and Optical Fiber (silica glass transmitting light by Total Internal Reflection, ultra-high bandwidth, zero EMI, ideal for campus backbones). Unguided media transmits electromagnetic waves through air/vacuum: Radio waves (omnidirectional, penetrates walls), Microwaves (high frequency, strict line-of-sight, relay towers), and Infrared (short range, remote controls, cannot pass walls).",
            keyFormula: "NA = \\sqrt{n_1^2 - n_2^2}, \\quad \\theta_a = \\arcsin(NA), \\quad \\theta_c = \\arcsin(n_2/n_1)",
            examTip: "Always recommend Optical Fiber for inter-building campus links because of immunity to lightning and ground loop currents."
          },
          {
            heading: "Network Topologies: Star, Bus, Ring, and Mesh",
            plainExplanation: "Topology defines how nodes and links are arranged. Star topology connects all devices to a central switch (cable cut isolates only 1 PC, switch failure takes down all). Bus topology uses a single backbone with terminators (cheap, but single backbone break stops entire network). Ring topology passes tokens in a closed loop (no collisions, but node break stops ring). Mesh topology connects every node to others (N(N-1)/2 links, highest fault tolerance and reliability, used for internet backbones).",
            keyFormula: "\\text{Mesh Links} = \\frac{N(N-1)}{2}, \\quad \\text{Ports per node} = N - 1",
            examTip: "If asked which topology gives highest reliability, name Mesh topology because of multiple redundant alternate paths."
          },
          {
            heading: "Network Devices & TCP vs UDP 3-Way Handshake",
            plainExplanation: "Hubs broadcast to all ports at Physical Layer (high collisions). Switches forward frames intelligently at Data Link Layer using MAC address tables (separate collision domains). Routers route packets between different networks at Network Layer using IP addresses. Modems modulate digital to analog and demodulate back. Gateways translate between different protocol stacks. TCP is connection-oriented and reliable using 3-Way Handshake (SYN -> SYN-ACK -> ACK) for HTTP/FTP. UDP is connectionless and lightweight (8-byte header) for live streaming and gaming.",
            keyFormula: "Client --[SYN]--> Server --[SYN-ACK]--> Client --[ACK]--> ESTABLISHED",
            examTip: "In differences table, contrast TCP (minimum 20B header, reliable, ordered) vs UDP (8B header, no retransmissions, fast)."
          }
        ],
        standardProblems: [
          {
            q: "Differentiate between a Network Hub and a Switch. Why is a switch preferred in modern LANs?",
            solution: "1. Hub: Layer 1 (Physical) device. Broadcasts incoming data to all connected ports indiscriminately. High packet collisions, shared bandwidth.\n2. Switch: Layer 2 (Data Link) device. Inspects destination MAC address and forwards frames only to the designated port.\n3. Advantage: Creates separate collision domains per port, eliminates packet collisions, and maximizes dedicated bandwidth."
          }
        ]
      },
      {
        unitNo: 5,
        title: "Unit 5.0: Emerging Technologies (IoT, Cybersecurity, AI/ML, Blockchain)",
        summary: "IoT 3-layer architecture and smart systems, Cybersecurity CIA Triad (Confidentiality, Integrity, Availability), cyber threats, AI & intelligent agents, Machine Learning paradigms (supervised, unsupervised, reinforcement), Blockchain immutability & cryptographic hashing, and Data Science lifecycle.",
        topics: [
          {
            heading: "Cybersecurity CIA Triad & Threat Countermeasures",
            plainExplanation: "The CIA Triad is the cornerstone of information security: Confidentiality (data secrecy via AES-256 encryption and MFA), Integrity (accuracy and tamper-proofing via SHA-256 hashes and digital signatures), and Availability (uninterrupted uptime via redundant servers and DDoS mitigation). Common threats include Phishing, Ransomware, Man-in-the-Middle, and DDoS attacks.",
            keyFormula: "\\text{Security} = \\text{Confidentiality} + \\text{Integrity} + \\text{Availability}",
            examTip: "Give banking examples: OTP is Confidentiality, Transaction amount unaltered is Integrity, Netbanking online 24/7 is Availability."
          },
          {
            heading: "Blockchain: Distributed Ledgers & Cryptographic Hashing",
            plainExplanation: "A blockchain is a decentralized, distributed, public digital ledger. Each block contains transaction data, a nonce, its own SHA-256 hash, and the hash of the previous block. If any transaction in a past block is altered, its hash changes completely, invalidating all subsequent blocks. Consensus algorithms (Proof of Work) reject altered chains, ensuring immutability without a central bank.",
            keyFormula: "\\text{Block } N = \\{ \\text{Data}, \\text{Nonce}, \\text{Hash}_N = \\text{SHA256}(\\text{Data} + \\text{PrevHash} + \\text{Nonce}), \\text{PrevHash}_{N-1} \\}",
            examTip: "Explain how previous hash chaining creates tamper-evident security across peer-to-peer nodes."
          }
        ],
        standardProblems: [
          {
            q: "Differentiate between Supervised, Unsupervised, and Reinforcement Machine Learning with examples.",
            solution: "1. Supervised Learning: Model trains on labeled input-output pairs (e.g. Email spam classification, house price regression).\n2. Unsupervised Learning: Model identifies hidden patterns in unlabeled data without target labels (e.g. Customer segmentation using K-Means clustering).\n3. Reinforcement Learning: Agent learns optimal actions through trial-and-error using reward and penalty feedback (e.g. Self-driving cars, Chess/Go game engines)."
          }
        ]
      }
    ]
    },

    // ------------------------------------------------------------------------
    // 6. UNIVERSAL HUMAN VALUES (100109) — DAY 3 AFTERNOON
    // ------------------------------------------------------------------------
    {
      code: "100109",
      short: "UHV",
      title: "Universal Human Values",
      color: "#f59e0b",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Introduction to Value Education & Self Exploration",
          summary: "Covers need, basic guidelines, content and process of value education, self exploration, natural acceptance, and continuous happiness and prosperity.",
          topics: [
            {
              heading: "Need & Process of Value Education",
              plainExplanation: "Value education helps identify what is fundamentally valuable to human existence and how to fulfill it. It operates through self-exploration, where proposals are verified against innate Natural Acceptance, rather than accepted as dogmas.",
              keyFormula: "Process of Self Exploration:\nProposal → Verify via Natural Acceptance → Experiential Validation (Live accordingly) → Mutual Happiness with humans & Mutual Prosperity with nature.",
              examTip: "Natural Acceptance is invariant with time, age, and culture; it is uncorrupted by conditioning or peer pressure."
            },
            {
              heading: "Happiness, Prosperity & Physical Facilities",
              plainExplanation: "Happiness (Sukha) is being in harmony. Prosperity (Samridhi) is the feeling of having more physical facilities than required. Physical facilities are necessary for animals, but for humans they are necessary but NOT sufficient.",
              keyFormula: "Current Problem: Accumulation of wealth without right understanding leads to feeling deprived ('daridra') and exploitation.\nRight Order: Right Understanding (Individual) → Relationship Harmony (Family) → Physical Facilities (Nature).",
              examTip: "Clearly differentiate between Wealth (a physical quantity) and Prosperity (a qualitative feeling of abundance)."
            }
          ],
          standardProblems: [
            {
              q: "Why are physical facilities necessary but not sufficient for human happiness?",
              solution: "1. Physical facilities fulfill only physiological body needs (food for hunger, clothes for protection).\n2. Needs like respect, trust, affection, and peace belong to the conscious Self ('I') and cannot be satisfied with material objects.\n3. A person surrounded by luxury but lacking trust in relationships remains unhappy and insecure."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Harmony in the Human Being (Self 'I' and Body)",
          summary: "Covers human being as co-existence of conscious Self ('I') and material Body, needs and activities of 'I' vs Body, and Sanyama & Swasthya.",
          topics: [
            {
              heading: "Co-existence of Self ('I') and Body",
              plainExplanation: "A human being is a co-existence of the conscious Self ('I') and the physio-chemical Body. The Self is the Seer, Doer, and Enjoyer; the Body is an instrument.",
              keyFormula: "Needs of 'I': Qualitative (Trust, Respect), Continuous in time.\nNeeds of Body: Quantitative (Food, Shelter), Temporary in time.\nActivities of 'I': Desiring, Thinking, Expecting, Knowing, Assuming.\nActivities of Body: Breathing, Heartbeat (Recognizing and Fulfilling only).",
              examTip: "Draw the comparison table of 'I' vs Body across Needs, Quantity, Time, and Activities."
            },
            {
              heading: "Sanyama (Self-Regulation) & Swasthya (Health)",
              plainExplanation: "Sanyama is the feeling of responsibility in the conscious Self ('I') for nurturing, protecting, and rightly utilizing the Body. When Sanyama is present, Swasthya (sound health and harmonious organ functioning) naturally follows.",
              keyFormula: "Sanyama in 'I' leads to Swasthya in Body.\nThree aspects of care: Nurturing (balanced food), Protection (exercise/shelter), Right Utilization (engaging body in productive, noble work).",
              examTip: "Modern medicine treats sickness after it occurs; Sanyama ensures health proactively through daily discipline."
            }
          ],
          standardProblems: [
            {
              q: "Differentiate between the activities of the conscious Self ('I') and the material Body.",
              solution: "1. Activities of Self ('I'): Knowing (Janana), Assuming (Mannana), Recognizing (Pahachanna), and Fulfilling (Nirvaha Karna). These are conscious and cognitive.\n2. Activities of Body: Only Recognizing and Fulfilling. For instance, skin recognizes temperature and gets cold; it does not 'know' or 'assume'.\n3. The Self directs the Body; the Body acts as an instrument."
            }
          ]
        },
        {
          unitNo: 3,
          title: "Unit 3.0: Harmony in Family & Society",
          summary: "Covers values in relationships (Trust & Respect), Trust on Intention vs Competence, 9 relationship values, and the Comprehensive Human Goal (Akhand Samaj).",
          topics: [
            {
              heading: "Trust (Vishwas) & Respect (Samman)",
              plainExplanation: "Trust is the foundational value in relationships: assurance that the other person naturally intends my happiness. Distinguish between Intention (what one wants to do) and Competence (ability to do it). Disrespect occurs from improper evaluation.",
              keyFormula: "Trust on Intention is unconditional (Natural Acceptance is always for mutual good).\nDoubts arise when we judge others by their competence and ourselves by our intention.\nRespect = Right Evaluation (Sahi Mulyankan).\nDisrespect = Over-evaluation (flattery), Under-evaluation, or Otherwise-evaluation (discrimination based on body, wealth, or beliefs).",
              examTip: "When someone makes a mistake, doubt their COMPETENCE (and help them build skills), never doubt their fundamental INTENTION."
            },
            {
              heading: "The 9 Values & Comprehensive Human Goal",
              plainExplanation: "The 9 values guide family harmony, expanding outward into fearlessness (Abhay) in society and co-existence with nature, establishing an Undivided Society (Akhand Samaj) and Universal Human Order.",
              keyFormula: "9 Relationship Values:\n1. Trust (Vishwas) [Foundational]\n2. Respect (Samman)\n3. Affection (Sneha)\n4. Care (Mamata)\n5. Guidance (Vatsalya)\n6. Reverence (Shraddha)\n7. Glory (Gaurav)\n8. Gratitude (Kritagyata)\n9. Love (Prem) [Complete Value].\nComprehensive Human Goal: Samadhan (Individual) → Samridhi (Family) → Abhay (Society) → Sah-astitva (Nature).",
              examTip: "Love (Prem) is the feeling of relatedness to ALL human beings; it is the culmination of all other 8 values."
            }
          ],
          standardProblems: [
            {
              q: "Differentiate between 'Trust on Intention' and 'Trust on Competence' with a real-life example.",
              solution: "1. Intention is the fundamental desire to do good and be happy (innate Natural Acceptance).\n2. Competence is the practical ability to execute that intention successfully.\n3. Real-life example: When you accidentally break a glass, you say 'It slipped, I didn't mean to' (you trust your intention). When your roommate drops a glass, you assume 'You are careless' (you doubt their intention).\n4. Resolution: Recognizing that everyone's intention is good removes anger and encourages patient mentoring."
            }
          ]
        }
      ]
    }
  ]
};

// ============================================================================
// REAL 2026 BEU (BIHAR ENGINEERING UNIVERSITY) MID-SEMESTER EXAM PAPERS
// Transcribed & Solved from Sister Government Engineering Colleges:
// GEC Lakhisarai, GEC Bhojpur, GEC Aurangabad, LNJPIT Chapra (Batch 2026-2030)
// ============================================================================

export const BEU_REAL_PAPERS_2026: BeuPaper[] = [
  {
    "id": "beu_math1_2026",
    "subject": "Math-I",
    "code": "100102",
    "title": "Engineering Mathematics – I (Official Mid-Sem 2026)",
    "colleges": "LNJPIT Chapra & BEU Constituent Colleges",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "There are 6 questions in this paper. Attempt 5 questions in all. Question No. 1 is compulsory (4 Marks). Questions 2 to 6 carry 4 marks each (Attempt any 4 = 16 Marks).",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 4 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL2",
            "q": "The value of lim (x -> 0) (1 + x)^(1/x) is:\n(i) 1   (ii) 0   (iii) e   (iv) -e",
            "sol": "Answer: (iii) e\nExplanation: Let L = lim (x -> 0) (1 + x)^(1/x). Taking natural log: ln L = lim (x -> 0) ln(1 + x) / x = [0/0 indeterminate form]. Applying L'Hôpital's Rule: lim (x -> 0) [1/(1 + x)] / 1 = 1. Therefore, L = e¹ = e."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL1",
            "q": "If f(x) is continuous in [a, b], differentiable in (a, b), and f(a) = f(b), then there exists at least one value c in (a, b) such that f'(c) = 0. This statement represents:\n(i) Taylor's Theorem   (ii) Rolle's Theorem   (iii) Lagrange's MVT   (iv) Cauchy's MVT",
            "sol": "Answer: (ii) Rolle's Theorem\nExplanation: Exact standard statement of Rolle's theorem in differential calculus."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "co": "CO2",
            "bl": "BL2",
            "q": "In maxima and minima of functions of two variables f(x, y), if rt - s² < 0 at a critical point (a, b), the point is a:\n(i) Local Minimum   (ii) Saddle Point   (iii) Local Maximum   (iv) Point of Inconclusive Test",
            "sol": "Answer: (ii) Saddle Point\nExplanation: For Hessian matrix determinant rt - s² < 0, the eigenvalues have opposite signs; hence the surface curves upward in one direction and downward in another, creating a minimax saddle point."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "co": "CO3",
            "bl": "BL1",
            "q": "The eigenvalues of an upper triangular matrix A = [[3, 5], [0, 7]] are:\n(i) 0 and 5   (ii) 3 and 7   (iii) 15 and 0   (iv) 3 and 5",
            "sol": "Answer: (ii) 3 and 7\nExplanation: The characteristic equation is det(A - λI) = (3 - λ)(7 - λ) = 0. The eigenvalues of any triangular or diagonal matrix are precisely its main diagonal entries."
          }
        ]
      },
      {
        "name": "Section B — Analytical Problems & University Proofs (Attempt Any 4, 16 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 4,
            "co": "CO3",
            "bl": "BL3",
            "q": "Reduce the matrix A to its canonical Normal Form [I_r, 0; 0, 0] and determine its rank:\nA = [[1, 2, 3], [2, 4, 7], [3, 6, 10]]",
            "sol": "Step 1: Perform elementary row operations to create zeros in column 1 below row 1:\n  R2 -> R2 - 2*R1 gives [0, 0, 1]\n  R3 -> R3 - 3*R1 gives [0, 0, 1]\n  Matrix becomes: [[1, 2, 3], [0, 0, 1], [0, 0, 1]]\n\nStep 2: Eliminate row 3 using row 2:\n  R3 -> R3 - R2 gives [0, 0, 0]\n  Matrix becomes: [[1, 2, 3], [0, 0, 1], [0, 0, 0]]\n\nStep 3: Perform elementary column operations to clear entries to the right of A[1,1]:\n  C2 -> C2 - 2*C1 gives [[1, 0, 3], [0, 0, 1], [0, 0, 0]]\n  C3 -> C3 - 3*C1 gives [[1, 0, 0], [0, 0, 1], [0, 0, 0]]\n\nStep 4: Swap column 2 and column 3 to align identity block:\n  C2 <-> C3 gives [[1, 0, 0], [0, 1, 0], [0, 0, 0]] = [I_2, 0; 0, 0].\n\nConclusion: The matrix is reduced to normal form with an identity block of order 2. Hence, Rank rho(A) = 2."
          },
          {
            "qNum": "3",
            "marks": 4,
            "co": "CO3",
            "bl": "BL4",
            "q": "Investigate for what values of 'a' and 'b' the system of simultaneous linear equations:\nx + y + z = 6\nx + 2y + 3z = 10\nx + 2y + az = b\nhas: (i) No solution, (ii) A unique solution, (iii) Infinitely many solutions.",
            "sol": "Step 1: Write the augmented matrix [A|B]:\n  [[1, 1, 1 | 6], [1, 2, 3 | 10], [1, 2, a | b]]\n\nStep 2: Reduce to row echelon form using elementary row operations:\n  R2 -> R2 - R1  ==>  [0, 1, 2 | 4]\n  R3 -> R3 - R1  ==>  [0, 1, a - 1 | b - 6]\n  R3 -> R3 - R2  ==>  [0, 0, a - 3 | b - 10]\n  Echelon Matrix: [[1, 1, 1 | 6], [0, 1, 2 | 4], [0, 0, a - 3 | b - 10]]\n\nStep 3: Analyze Rouché-Capelli consistency conditions:\n  Case (i) No Solution:\n    Occurs when rho(A) != rho(A|B). If a - 3 = 0 and b - 10 != 0 (i.e., a = 3 and b != 10), then rho(A) = 2 while rho(A|B) = 3. System is inconsistent.\n\n  Case (ii) Unique Solution:\n    Occurs when rho(A) = rho(A|B) = number of unknowns (3). This requires a - 3 != 0 (i.e., a != 3, with any real value for b).\n\n  Case (iii) Infinitely Many Solutions:\n    Occurs when rho(A) = rho(A|B) < 3. This requires a - 3 = 0 and b - 10 = 0 (i.e., a = 3 and b = 10). Then rho(A) = rho(A|B) = 2 < 3, giving 1 free parameter."
          },
          {
            "qNum": "4",
            "marks": 4,
            "co": "CO1",
            "bl": "BL4",
            "q": "If y = (sin⁻¹ x)², prove using Leibnitz's Theorem that:\n(1 - x²) y_{n+2} - (2n + 1)x y_{n+1} - n² y_n = 0.\nHence find the value of y_n(0).",
            "sol": "Step 1: Differentiate y = (sin⁻¹ x)² once with respect to x:\n  y₁ = 2*(sin⁻¹ x) / sqrt(1 - x²)\n  Squaring both sides: (1 - x²)*(y₁)² = 4*(sin⁻¹ x)² = 4y\n\nStep 2: Differentiate again with respect to x:\n  (1 - x²)*2*y₁*y₂ - 2x*(y₁)² = 4*y₁\n  Dividing through by 2*y₁ (since y₁ != 0):\n  (1 - x²)*y₂ - x*y₁ - 2 = 0\n\nStep 3: Apply Leibnitz's Theorem for n-th derivative of a product D^n(u*v):\n  D^n[(1 - x²)*y₂] = (1 - x²)*y_{n+2} + n*(-2x)*y_{n+1} + [n*(n-1)/2]*(-2)*y_n\n                   = (1 - x²)*y_{n+2} - 2nx*y_{n+1} - n*(n-1)*y_n\n  D^n[x*y₁] = x*y_{n+1} + n*1*y_n\n  D^n[2] = 0\n\n  Combining all terms:\n  [(1 - x²)*y_{n+2} - 2nx*y_{n+1} - n*(n-1)*y_n] - [x*y_{n+1} + n*y_n] = 0\n  (1 - x²)*y_{n+2} - (2n + 1)x*y_{n+1} - [n*(n-1) + n]*y_n = 0\n  ==> (1 - x²)*y_{n+2} - (2n + 1)x*y_{n+1} - n²*y_n = 0  (PROVED)\n\nStep 4: Evaluate at x = 0:\n  y_{n+2}(0) = n² * y_n(0)\n  Base cases: y(0) = 0, y₁(0) = 0, y₂(0) = 2.\n  Since y₁(0) = 0, all odd derivatives at zero vanish: y_n(0) = 0 for all odd n.\n  For even derivatives (n = 2k):\n  y_{2k}(0) = 2 * (2k - 2)² * (2k - 4)² * ... * 4² * 2²."
          },
          {
            "qNum": "5",
            "marks": 4,
            "co": "CO2",
            "bl": "BL3",
            "q": "State Euler's Theorem on Homogeneous Functions. If u = tan⁻¹[(x³ + y³) / (x - y)], prove that:\nx*(∂u/∂x) + y*(∂u/∂y) = sin(2u).",
            "sol": "Step 1: Statement of Euler's Theorem:\n  If z = f(x, y) is a homogeneous function of x and y of degree n, then:\n  x*(∂z/∂x) + y*(∂z/∂y) = n*z.\n\nStep 2: Let z = tan(u) = (x³ + y³) / (x - y).\n  Test homogeneity by substituting x -> tx, y -> ty:\n  z(tx, ty) = [(tx)³ + (ty)³] / [tx - ty] = t³*(x³ + y³) / [t*(x - y)] = t² * z(x, y).\n  Therefore, z is a homogeneous function of degree n = 2.\n\nStep 3: Apply Euler's Theorem to z:\n  x*(∂z/∂x) + y*(∂z/∂y) = 2*z\n\nStep 4: Express partial derivatives of z in terms of u:\n  ∂z/∂x = sec²(u) * (∂u/∂x)\n  ∂z/∂y = sec²(u) * (∂u/∂y)\n\nStep 5: Substitute into Euler's equation:\n  x * [sec²(u) * (∂u/∂x)] + y * [sec²(u) * (∂u/∂y)] = 2 * tan(u)\n  sec²(u) * [x*(∂u/∂x) + y*(∂u/∂y)] = 2 * tan(u)\n  x*(∂u/∂x) + y*(∂u/∂y) = 2 * [tan(u) / sec²(u)] = 2 * [sin(u)/cos(u)] * cos²(u) = 2 * sin(u)*cos(u) = sin(2u).\n  (PROVED)"
          },
          {
            "qNum": "6",
            "marks": 4,
            "co": "CO3",
            "bl": "BL3",
            "q": "State the Cayley-Hamilton Theorem. Verify it for the matrix A = [[1, 2], [3, 4]] and hence calculate A⁻¹ and A⁴.",
            "sol": "Step 1: Statement of Cayley-Hamilton Theorem:\n  Every square matrix satisfies its own characteristic equation, i.e., if det(A - λI) = 0 is λⁿ + c_{n-1}λ^{n-1} + ... + c₀ = 0, then Aⁿ + c_{n-1}A^{n-1} + ... + c₀I = O.\n\nStep 2: Characteristic equation of A = [[1, 2], [3, 4]]:\n  det(A - λI) = |1 - λ, 2; 3, 4 - λ| = (1 - λ)(4 - λ) - 6 = λ² - 5λ - 2 = 0.\n\nStep 3: Verification (show A² - 5A - 2I = O):\n  A² = [[1, 2], [3, 4]] * [[1, 2], [3, 4]] = [[1*1 + 2*3, 1*2 + 2*4], [3*1 + 4*3, 3*2 + 4*4]] = [[7, 10], [15, 22]]\n  5A = [[5, 10], [15, 20]]\n  2I = [[2, 0], [0, 2]]\n  A² - 5A - 2I = [[7-5-2, 10-10-0], [15-15-0, 22-20-2]] = [[0, 0], [0, 0]] = O. (VERIFIED)\n\nStep 4: Compute A⁻¹:\n  Multiply A² - 5A - 2I = O by A⁻¹:\n  A - 5I - 2*A⁻¹ = O  ==>  2*A⁻¹ = A - 5I\n  A⁻¹ = (1/2) * [A - 5I] = (1/2) * [[[1, 2], [3, 4]] - [[5, 0], [0, 5]]] = (1/2) * [[-4, 2], [3, -1]]\n  A⁻¹ = [[-2, 1], [1.5, -0.5]].\n\nStep 5: Compute A⁴:\n  From A² = 5A + 2I:\n  A³ = 5A² + 2A = 5(5A + 2I) + 2A = 27A + 10I\n  A⁴ = 27A² + 10A = 27(5A + 2I) + 10A = 145A + 54I\n  145A = [[145, 290], [435, 580]], 54I = [[54, 0], [0, 54]]\n  A⁴ = [[199, 290], [435, 634]]."
          }
        ]
      }
    ]
  },
  {
    "id": "beu_beee_2026",
    "subject": "BEEE",
    "code": "100111",
    "title": "Basics of Electrical & Electronics Engineering (Official Mid-Sem 2026)",
    "colleges": "LNJPIT Chapra & GEC Aurangabad",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "There are 6 questions in this paper. Attempt 5 questions in all. Question No. 1 is compulsory (4 Marks). Questions 2 to 6 carry 4 marks each (Attempt any 4 = 16 Marks).",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 4 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL2",
            "q": "Under the condition of Maximum Power Transfer (R_L = R_th), the power transfer efficiency is:\n(i) 100%   (ii) 75%   (iii) 50%   (iv) 25%",
            "sol": "Answer: (iii) 50%\nExplanation: Efficiency η = P_L / P_total = [I²*R_L] / [I²*(R_th + R_L)]. When R_L = R_th, η = R_L / (2*R_L) = 1/2 = 50%. The other 50% is dissipated as internal heat in R_th."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL1",
            "q": "The Form Factor of a pure sinusoidal alternating voltage waveform is:\n(i) 1.414   (ii) 1.11   (iii) 0.707   (iv) 0.637",
            "sol": "Answer: (ii) 1.11\nExplanation: Form Factor k_f = V_rms / V_avg. For a sine wave, V_rms = V_m / √2 ≈ 0.707*V_m and V_avg = 2*V_m / π ≈ 0.637*V_m. Thus k_f = (V_m / √2) / (2*V_m / π) = π / (2√2) ≈ 1.11."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "co": "CO2",
            "bl": "BL2",
            "q": "In a series RLC resonant circuit at resonance frequency f₀, the overall power factor is:\n(i) Zero   (ii) 0.5 Lagging   (iii) Unity (1.0)   (iv) 0.8 Leading",
            "sol": "Answer: (iii) Unity (1.0)\nExplanation: At resonance, inductive reactance equals capacitive reactance (X_L = X_C). Net reactance X = 0, so total impedance Z = R (purely resistive). Voltage and current are completely in phase (phase angle φ = 0°, cos φ = 1)."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "co": "CO3",
            "bl": "BL1",
            "q": "The maximum theoretical rectification efficiency of a full-wave bridge rectifier is:\n(i) 40.6%   (ii) 50.0%   (iii) 81.2%   (iv) 98.6%",
            "sol": "Answer: (iii) 81.2%\nExplanation: Full-wave rectification efficiency η_max = 8 / π² ≈ 81.2% (exactly double that of a half-wave rectifier, 40.6%)."
          }
        ]
      },
      {
        "name": "Section B — Analytical Problems & Engineering Circuits (Attempt Any 4, 16 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 4,
            "co": "CO1",
            "bl": "BL3",
            "q": "State Thevenin's Theorem. In a DC network, a 24V independent voltage source feeds a bridge consisting of R1 = 6 Ω in series with parallel branches R2 = 12 Ω and R_L = 8 Ω. Determine the Thevenin equivalent circuit across R_L and compute the load current I_L.",
            "sol": "Step 1: Statement of Thevenin's Theorem:\n  Any linear, bilateral, two-terminal active resistive network can be replaced by an equivalent circuit consisting of a single voltage source V_th in series with an equivalent resistance R_th, where V_th is the open-circuit voltage across terminals AB and R_th is the resistance looking into AB with all independent sources deactivated.\n\nStep 2: Find Thevenin Voltage V_th across terminals AB (with R_L removed):\n  With R_L removed, the circuit is a simple series loop of source 24V with resistors R1 (6 Ω) and R2 (12 Ω).\n  V_th = V_AB = 24 * [R2 / (R1 + R2)] = 24 * [12 / (6 + 12)] = 24 * (12/18) = 16.0 V.\n\nStep 3: Find Thevenin Resistance R_th:\n  Deactivate the 24V source by replacing it with a short circuit.\n  Looking into terminals AB:\n  R_th = R1 || R2 = (6 * 12) / (6 + 12) = 72 / 18 = 4.0 Ω.\n\nStep 4: Calculate Load Current I_L:\n  Connect R_L = 8 Ω across the Thevenin equivalent:\n  I_L = V_th / (R_th + R_L) = 16.0 / (4.0 + 8.0) = 16 / 12 = 1.333 A (4/3 A).\n  Load Power P_L = I_L² * R_L = (1.333)² * 8 = 14.22 W."
          },
          {
            "qNum": "3",
            "marks": 4,
            "co": "CO2",
            "bl": "BL4",
            "q": "Derive expressions for the resonant frequency f₀, bandwidth BW, and Quality Factor Q in a series RLC circuit. A coil having resistance 10 Ω and inductance 0.1 H is connected in series with a 10 µF capacitor across a 230V, 50Hz supply. Determine f₀, Q-factor, and current at resonance.",
            "sol": "Step 1: Derivations:\n  In series RLC: Z = R + j(ωL - 1/ωC). Resonance occurs when imaginary part is zero:\n  ω₀L = 1 / (ω₀C)  ==>  ω₀² = 1 / (LC)  ==>  f₀ = 1 / [2π√(LC)].\n  Bandwidth Δω = ω₂ - ω₁ = R / L (rad/s) or BW = R / (2πL) (Hz).\n  Quality Factor Q = ω₀L / R = (1/R) * √(L/C).\n\nStep 2: Numerical Calculation:\n  Given: R = 10 Ω, L = 0.1 H, C = 10 µF = 10 × 10⁻⁶ F, V = 230 V.\n  (i) Resonant frequency f₀:\n      f₀ = 1 / [2π√(0.1 * 10×10⁻⁶)] = 1 / [2π√(10⁻⁶)] = 1 / [2π * 10⁻³] = 1000 / (2π) = 159.15 Hz.\n  (ii) Quality Factor Q:\n      Q = (1/R) * √(L/C) = (1/10) * √(0.1 / 10⁻⁵) = 0.1 * √(10000) = 0.1 * 100 = 10.0.\n  (iii) Current at resonance I₀:\n      At resonance, Z = R = 10 Ω.\n      I₀ = V / R = 230 / 10 = 23.0 A."
          },
          {
            "qNum": "4",
            "marks": 4,
            "co": "CO3",
            "bl": "BL3",
            "q": "Explain the working of a Full-Wave Bridge Rectifier with a neat circuit schematic diagram, input/output waveforms, and derive the mathematical expressions for DC output voltage (V_dc) and Ripple Factor (γ).",
            "sol": "Step 1: Circuit Configuration:\n  A bridge rectifier consists of four diodes D1, D2, D3, D4 arranged in a closed-loop bridge connected across the secondary of a step-down transformer and load resistor R_L.\n\nStep 2: Working Operation:\n  - Positive Half-Cycle (Terminal A positive, B negative):\n    Diodes D1 and D2 are forward biased, while D3 and D4 are reverse biased. Current flows from A -> D1 -> R_L (top to bottom) -> D2 -> B.\n  - Negative Half-Cycle (Terminal B positive, A negative):\n    Diodes D3 and D4 are forward biased, while D1 and D2 are reverse biased. Current flows from B -> D3 -> R_L (top to bottom) -> D4 -> A.\n  - Conclusion: Current flows through load R_L in the exact same direction during both half-cycles, achieving full-wave rectification.\n\nStep 3: Derivation of DC Output Voltage V_dc:\n  v(t) = V_m * sin(ωt) for 0 <= ωt <= π.\n  V_dc = (1/π) * ∫₀^π V_m*sin(θ) dθ = (V_m/π) * [-cos(θ)]₀^π = (V_m/π) * [1 - (-1)] = (2*V_m) / π ≈ 0.637*V_m.\n\nStep 4: Derivation of Ripple Factor γ:\n  V_rms = √[(1/π) * ∫₀^π V_m²*sin²(θ) dθ] = V_m / √2 ≈ 0.707*V_m.\n  Form Factor k_f = V_rms / V_dc = (V_m / √2) / (2*V_m / π) = π / (2√2) ≈ 1.11.\n  γ = √[k_f² - 1] = √[(1.11)² - 1] = √(1.2321 - 1) = √0.2321 ≈ 0.482 (48.2%)."
          },
          {
            "qNum": "5",
            "marks": 4,
            "co": "CO3",
            "bl": "BL4",
            "q": "Describe the operational principle of a Zener diode. Differentiate between Zener Breakdown and Avalanche Breakdown. Explain how a Zener diode maintains a constant output voltage as a Shunt Voltage Regulator against line and load variations.",
            "sol": "Step 1: Zener Diode Operational Principle:\n  A Zener diode is a heavily doped silicon p-n junction designed to operate reliably in the reverse breakdown region without damage. In forward bias, it acts as a normal diode; in reverse bias, once reverse voltage reaches breakdown voltage V_Z, the current increases sharply while voltage remains almost constant.\n\nStep 2: Comparison: Zener vs Avalanche Breakdown:\n  1. Doping Level: Zener is very heavily doped; Avalanche is lightly to moderately doped.\n  2. Depletion Width: Zener has a very narrow depletion layer (< 10 nm); Avalanche has a wide depletion layer.\n  3. Breakdown Voltage: Zener occurs below 5-6 V; Avalanche occurs above 6 V.\n  4. Physical Mechanism: Zener is quantum mechanical field emission (intense electric field ~10⁶ V/m ruptures covalent bonds directly); Avalanche is impact ionization (minority carriers accelerated by field collide with atoms releasing electron-hole pairs in chain reaction).\n  5. Temperature Coefficient: Zener has negative temp coefficient (V_Z decreases as temp rises); Avalanche has positive temp coefficient.\n\nStep 3: Working as Shunt Voltage Regulator:\n  - Circuit: Input DC voltage V_in connected in series with dropping resistor R_s and parallel Zener diode in reverse bias across load R_L.\n  - Line Regulation: If V_in increases, V_Z remains fixed at nominal voltage. The excess voltage drops across R_s (V_Rs = V_in - V_Z), causing Zener current I_Z to rise while load current I_L and load voltage V_L remain constant.\n  - Load Regulation: If load resistance R_L decreases, I_L increases. The Zener automatically sheds current (I_Z decreases) such that total series current I_s = I_Z + I_L remains constant, holding V_L = V_Z steady."
          },
          {
            "qNum": "6",
            "marks": 4,
            "co": "CO3",
            "bl": "BL3",
            "q": "Draw and explain the input and output V-I characteristics of an NPN Bipolar Junction Transistor (BJT) in Common Emitter (CE) configuration. Clearly define the Cutoff, Active, and Saturation regions, and derive the relationship: β = α / (1 - α).",
            "sol": "Step 1: Common Emitter (CE) Configuration:\n  Emitter terminal is common to both input (base-emitter) and output (collector-emitter) circuits.\n  - Input Characteristic: Plot of I_B vs V_BE for constant values of V_CE. Behaves like a forward-biased diode with knee voltage ~0.7V for Silicon. Increasing V_CE shifts curve slightly to the right due to Early Effect (base-width modulation).\n  - Output Characteristic: Plot of I_C vs V_CE for constant values of base current I_B.\n\nStep 2: Operational Regions on Output Curves:\n  1. Active Region: Emitter-Base Junction (EBJ) forward biased, Collector-Base Junction (CBJ) reverse biased. I_C is virtually independent of V_CE (horizontal curves): I_C ≈ β*I_B. Used for linear amplification.\n  2. Saturation Region: Both EBJ and CBJ are forward biased (V_CE < V_CE(sat) ≈ 0.2V). I_C rises sharply with small increases in V_CE. Used as closed electronic switch (ON).\n  3. Cutoff Region: Both EBJ and CBJ are reverse biased (I_B = 0, V_BE < 0.7V). Only tiny reverse leakage current I_CEO flows. Used as open electronic switch (OFF).\n\nStep 3: Derivation of β in terms of α:\n  By Kirchhoff's Current Law for BJT: I_E = I_B + I_C.\n  By definition of common base current gain: α = I_C / I_E  ==>  I_E = I_C / α.\n  By definition of common emitter current gain: β = I_C / I_B  ==>  I_B = I_C / β.\n  Substitute into KCL equation:\n  I_C / α = I_C / β + I_C\n  Divide entire equation by I_C:\n  1 / α = 1 / β + 1  ==>  1 / β = (1 / α) - 1 = (1 - α) / α\n  Inverting both sides:\n  β = α / (1 - α)  (PROVED)\n  (e.g., if α = 0.98, β = 0.98 / (1 - 0.98) = 0.98 / 0.02 = 49)."
          }
        ]
      }
    ]
  },
  {
    "id": "model_physics_2026",
    "subject": "Physics",
    "code": "100104",
    "title": "Engineering Physics (Official Mid-Sem 2026)",
    "colleges": "LNJPIT Chapra & BEU Constituent Colleges",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "There are 6 questions in this paper. Attempt 5 questions in all. Question No. 1 is compulsory (4 Marks). Questions 2 to 6 carry 4 marks each (Attempt any 4 = 16 Marks).",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 4 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL2",
            "q": "In Newton's rings experiment viewed under reflected light, the central fringe is:\n(i) Always Bright   (ii) Always Dark   (iii) Colored   (iv) Indeterminate",
            "sol": "Answer: (ii) Always Dark\nExplanation: At the point of physical contact between the lens and flat glass plate, film thickness t = 0. Reflection at the lower air-glass interface (rarer to denser) introduces an abrupt phase shift of π (equivalent to path difference λ/2). Net path difference Δ = 0 + λ/2 = λ/2, satisfying destructive interference."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "co": "CO2",
            "bl": "BL1",
            "q": "For light propagation through an optical fiber via Total Internal Reflection (TIR), the refractive indices of core (n₁) and cladding (n₂) must satisfy:\n(i) n₁ < n₂   (ii) n₁ > n₂   (iii) n₁ = n₂   (iv) n₁ * n₂ = 1",
            "sol": "Answer: (ii) n₁ > n₂\nExplanation: Total Internal Reflection requires the light ray to propagate from an optically denser medium (core, n₁) into an optically rarer medium (cladding, n₂) at an angle of incidence exceeding the critical angle θ_c."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "co": "CO3",
            "bl": "BL1",
            "q": "The Poynting vector S = E × H represents:\n(i) Electric charge density   (ii) Electromagnetic power flux density (W/m²)\n(iii) Magnetic energy storage   (iv) Wave velocity vector (m/s)",
            "sol": "Answer: (ii) Electromagnetic power flux density (W/m²)\nExplanation: The Poynting vector S measures the instantaneous directional rate of electromagnetic energy transfer per unit cross-sectional area, with SI units of Watts per square meter (W/m²)."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "co": "CO4",
            "bl": "BL2",
            "q": "The ratio of Einstein's coefficients of spontaneous emission to stimulated emission (A₂₁ / B₂₁) is proportional to:\n(i) ν   (ii) ν²   (iii) ν³   (iv) 1 / ν³",
            "sol": "Answer: (iii) ν³\nExplanation: From Planck's radiation law derivation, A₂₁ / B₂₁ = (8πhν³) / c³. Hence spontaneous emission dominates over stimulated emission at higher optical frequencies."
          }
        ]
      },
      {
        "name": "Section B — Analytical Problems & University Proofs (Attempt Any 4, 16 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 4,
            "co": "CO1",
            "bl": "BL4",
            "q": "Explain the experimental arrangement and theory of Newton's rings formed by reflected light. Prove that the diameters of dark rings are directly proportional to the square roots of natural numbers (D_n ∝ √n). In an experiment with a lens of radius of curvature R = 1.0 m and λ = 589 nm, find the diameter of the 16th dark ring.",
            "sol": "Step 1: Theory & Path Difference:\n  A plano-convex lens of large radius of curvature R is placed on an optically flat glass plate, trapping a wedge-shaped thin air film of thickness t.\n  For normal incidence in reflected light, effective path difference is:\n  Δ = 2μt*cos(r) + λ/2 = 2t + λ/2 (for air film μ = 1, cos r = 1).\n\nStep 2: Condition for Dark Rings (Destructive Interference):\n  Δ = (2n + 1)*(λ/2)  ==>  2t + λ/2 = (2n + 1)*(λ/2)  ==>  2t = n*λ.\n\nStep 3: Geometry of the Lens:\n  From circle chord geometry: r_n² = t*(2R - t) ≈ 2Rt  ==>  2t = r_n² / R = D_n² / (4R).\n  Equating both expressions for 2t:\n  D_n² / (4R) = n*λ  ==>  D_n² = 4n*R*λ  ==>  D_n = 2 * √(n*R*λ).\n  Since R and λ are constant: D_n ∝ √n. (PROVED: dark ring diameters are proportional to square roots of consecutive natural numbers).\n\nStep 4: Numerical Computation:\n  Given: R = 1.0 m = 100 cm, λ = 589 nm = 5.89 × 10⁻⁵ cm, n = 16.\n  D₁₆² = 4 * 16 * 100 * (5.89 × 10⁻⁵) = 64 * 100 * 5.89 × 10⁻⁵ = 0.37696 cm².\n  D₁₆ = √(0.37696) ≈ 0.614 cm (6.14 mm)."
          },
          {
            "qNum": "3",
            "marks": 4,
            "co": "CO2",
            "bl": "BL3",
            "q": "Define Numerical Aperture (NA) and Acceptance Angle (θ_a) of an optical fiber. Derive their mathematical expressions in terms of refractive indices of core (n₁) and cladding (n₂). An optical fiber has core index n₁ = 1.50 and cladding index n₂ = 1.46. Calculate: (i) Critical angle θ_c, (ii) Numerical Aperture, and (iii) Acceptance angle.",
            "sol": "Step 1: Derivations:\n  Let light enter the fiber from air (n₀ ≈ 1.0) at launching angle θ_a.\n  At entrance face: by Snell's law, n₀*sin(θ_a) = n₁*sin(r) = n₁*cos(φ), where φ is incidence angle at core-cladding boundary (r + φ = 90°).\n  For Total Internal Reflection at core-cladding interface: φ >= θ_c, where sin(θ_c) = n₂ / n₁.\n  At critical condition φ = θ_c:\n  cos(θ_c) = √(1 - sin² θ_c) = √(1 - (n₂/n₁)²) = √(n₁² - n₂²) / n₁.\n  Therefore:\n  sin(θ_a) = n₁*cos(θ_c) = n₁ * [√(n₁² - n₂²) / n₁] = √(n₁² - n₂²).\n  Acceptance Angle: θ_a = sin⁻¹(√(n₁² - n₂²)).\n  Numerical Aperture: NA = sin(θ_a) = √(n₁² - n₂²).\n\nStep 2: Numerical Calculation:\n  Given: n₁ = 1.50, n₂ = 1.46.\n  (i) Critical Angle θ_c:\n      θ_c = sin⁻¹(n₂ / n₁) = sin⁻¹(1.46 / 1.50) = sin⁻¹(0.9733) ≈ 76.74°.\n  (ii) Numerical Aperture NA:\n      NA = √(1.50² - 1.46²) = √(2.25 - 2.1316) = √0.1184 ≈ 0.3441.\n  (iii) Acceptance Angle θ_a:\n      θ_a = sin⁻¹(NA) = sin⁻¹(0.3441) ≈ 20.13°."
          },
          {
            "qNum": "4",
            "marks": 4,
            "co": "CO3",
            "bl": "BL4",
            "q": "Write Maxwell's four equations in differential and integral forms. Explain how Maxwell resolved the inconsistency in Ampere's Circuital Law by introducing the concept of Displacement Current.",
            "sol": "Step 1: Maxwell's Four Equations:\n  1. Gauss's Law for Electrostatics:\n     Differential: ∇ · D = ρ_v   |   Integral: ∮ D · dA = Q_enc\n  2. Gauss's Law for Magnetostatics:\n     Differential: ∇ · B = 0     |   Integral: ∮ B · dA = 0\n  3. Faraday's Law of Electromagnetic Induction:\n     Differential: ∇ × E = -∂B/∂t   |   Integral: ∮ E · dl = -dΦ_B/dt\n  4. Ampere-Maxwell Law:\n     Differential: ∇ × H = J + ∂D/∂t   |   Integral: ∮ H · dl = I_c + ∫ (∂D/∂t) · dA\n\nStep 2: Inconsistency in Ampere's Law:\n  Ampere's original law was ∇ × H = J.\n  Taking divergence of both sides: ∇ · (∇ × H) = ∇ · J. Since divergence of any curl is identically zero, this requires ∇ · J = 0 (steady currents).\n  However, the fundamental Equation of Continuity for time-varying charge is:\n  ∇ · J = -∂ρ/∂t != 0 (charge conservation).\n  This created a severe mathematical and physical contradiction during capacitor charging/discharging.\n\nStep 3: Maxwell's Modification (Displacement Current):\n  From Gauss's Law: ρ = ∇ · D. Differentiating with respect to time:\n  ∂ρ/∂t = ∂(∇ · D)/∂t = ∇ · (∂D/∂t).\n  Substituting into continuity equation: ∇ · J + ∇ · (∂D/∂t) = 0  ==>  ∇ · [J + ∂D/∂t] = 0.\n  Maxwell identified J_d = ∂D/∂t = ε₀*(∂E/∂t) as Displacement Current Density.\n  Physical Meaning: A time-varying electric field in a dielectric acts as a real current source producing a circulating magnetic field."
          },
          {
            "qNum": "5",
            "marks": 4,
            "co": "CO1",
            "bl": "BL4",
            "q": "Describe Fraunhofer diffraction produced by a single slit of width 'a'. Derive the mathematical expression for the resultant intensity distribution I = I₀ * [sin(β) / β]² and establish the conditions for principal maxima, minima, and secondary maxima.",
            "sol": "Step 1: Amplitude Derivation:\n  Let a plane wave of monochromatic light (wavelength λ) be incident normally on a slit AB of width 'a'. Divide the slit into N secondary wavelets, each of amplitude a₀ and phase difference dφ = (2π/λ)*dx*sin(θ).\n  The total resultant amplitude R obtained by vector addition is:\n  R = A₀ * [sin(β) / β], where β = (π*a*sin θ) / λ and A₀ = N*a₀.\n\nStep 2: Intensity Distribution:\n  Intensity I ∝ R² ==> I = I₀ * [sin(β) / β]².\n\nStep 3: Conditions for Maxima and Minima:\n  1. Central Principal Maximum (θ = 0):\n     As θ -> 0, β -> 0, lim (β -> 0) [sin(β) / β] = 1. Thus I = I₀ (maximum intensity at center).\n  2. Positions of Minima:\n     I = 0 when sin(β) = 0 and β != 0. This occurs at β = ±mπ (m = 1, 2, 3...).\n     (π*a*sin θ) / λ = ±mπ  ==>  a * sin(θ) = ±m*λ.\n  3. Secondary Maxima:\n     Differentiating I with respect to β and setting dI/dβ = 0 gives condition: tan(β) = β.\n     Roots obtained graphically are β ≈ ±1.43π, ±2.46π, ±3.47π...\n     Intensities of secondary maxima relative to central peak are: I₁/I₀ ≈ 4.5% (1/22), I₂/I₀ ≈ 1.6% (1/61), showing rapid decay."
          },
          {
            "qNum": "6",
            "marks": 4,
            "co": "CO4",
            "bl": "BL3",
            "q": "Explain the construction and working of a Helium-Neon (He-Ne) gas laser with a detailed 4-level energy level diagram. Explain the mechanism of population inversion, the role of Helium atoms, and state why optical resonator mirrors are required.",
            "sol": "Step 1: Construction:\n  - Discharge Tube: Quartz tube (~50 cm long, 5 mm bore) containing gas mixture of Helium and Neon in ratio 10:1 at low pressure (~1 mm of Hg).\n  - Optical Resonator: Two mirrors placed perpendicular to axis at ends—one 100% reflective flat mirror and one partially transmitting (~99%) concave mirror for laser output.\n  - Pumping Source: High-voltage DC electrical discharge (~1-2 kV) generates electrons.\n\nStep 2: Working Mechanism & Role of Helium Atoms:\n  1. Electron Collision: Fast discharge electrons collide with Ground-state Helium atoms: e⁻ + He -> He* (excited 2¹S and 2³S metastable states) + e⁻.\n  2. Resonant Energy Transfer: The metastable states of He (20.61 eV and 19.82 eV) closely match the 3s and 2s excited energy levels of Neon (20.66 eV and 19.78 eV). Through collision, energy transfers effortlessly: He* + Ne -> He + Ne*.\n  3. Population Inversion: This preferential pumping achieves population inversion in Neon between 3s (upper laser level) and 2p (lower laser level).\n  4. Laser Transitions: Transitions from 3s to 2p emit the famous red laser line at λ = 632.8 nm (6328 Å).\n  5. De-excitation: Ne atoms rapidly drop from 2p to 1s by spontaneous emission, then undergo radiationless collision with tube walls returning to ground state.\n\nStep 3: Role of Resonator Cavity:\n  The mirrors provide optical feedback, trapping photons traveling parallel to the tube axis to trigger sustained stimulated emission cascade while rejecting non-axial noise photons."
          }
        ]
      }
    ]
  },
  {
    "id": "model_iai_2026",
    "subject": "IAI",
    "code": "100105",
    "title": "Introduction to AI (Official Mid-Sem 2026)",
    "colleges": "LNJPIT Chapra & BEU Constituent Colleges",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "There are 6 questions in this paper. Attempt 5 questions in all. Question No. 1 is compulsory (4 Marks). Questions 2 to 6 carry 4 marks each (Attempt any 4 = 16 Marks).",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 4 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL1",
            "q": "PEAS framework in rational agent architecture stands for:\n(i) Performance Measure, Environment, Actuators, Sensors\n(ii) Perception, Entity, Action, State\n(iii) Program, Execution, Algorithm, Storage\n(iv) Probability, Estimation, Accuracy, System",
            "sol": "Answer: (i) Performance Measure, Environment, Actuators, Sensors\nExplanation: Standard 4-component specification framework for formulating task environments for intelligent agents (Russell & Norvig)."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "co": "CO2",
            "bl": "BL2",
            "q": "Which uninformed search algorithm is guaranteed to be optimal when all step costs are identical and positive?\n(i) Depth-First Search (DFS)   (ii) Breadth-First Search (BFS)\n(iii) Depth-Limited Search   (iv) Greedy Best-First Search",
            "sol": "Answer: (ii) Breadth-First Search (BFS)\nExplanation: BFS expands nodes strictly layer-by-layer by depth. When all path step costs are equal, the shallowest goal found is mathematically guaranteed to be the lowest cost optimal path."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "co": "CO2",
            "bl": "BL2",
            "q": "A heuristic function h(n) in A* tree search is admissible if:\n(i) h(n) > h*(n)   (ii) 0 <= h(n) <= h*(n)\n(iii) h(n) = infinity   (iv) h(n) decreases monotonically along every path",
            "sol": "Answer: (ii) 0 <= h(n) <= h*(n)\nExplanation: Admissibility means the heuristic never overestimates the actual true minimum cost h*(n) required to reach the goal from node n (optimistic estimate)."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "co": "CO3",
            "bl": "BL2",
            "q": "In Alpha-Beta pruning game-tree search, an alpha cutoff occurs when:\n(i) α < β   (ii) α >= β   (iii) α = 0   (iv) β = infinity",
            "sol": "Answer: (ii) α >= β\nExplanation: When the lower bound α for MAX exceeds or equals the upper bound β for MIN at any node, MIN will never allow play to reach this sub-branch because a better alternative already exists; hence evaluation stops."
          }
        ]
      },
      {
        "name": "Section B — Analytical Problems & Search Algorithms (Attempt Any 4, 16 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 4,
            "co": "CO1",
            "bl": "BL3",
            "q": "Specify the complete PEAS description table and classify the task environment (Observability, Determinism, Dynamism, Episodic/Sequential, Discrete/Continuous) for: (i) Autonomous Self-Driving Taxi, and (ii) Part-Picking Industrial Robot.",
            "sol": "Step 1: PEAS Specification Table:\n  (i) Autonomous Self-Driving Taxi:\n    - Performance Measure: Safety, passenger comfort, trip duration, fuel efficiency, adherence to traffic laws, profit.\n    - Environment: City roads, highways, traffic, pedestrians, changing weather, obstacles.\n    - Actuators: Steering wheel, accelerator, hydraulic brakes, turn signals, horn, display screen.\n    - Sensors: Video cameras, LiDAR, radar, ultrasonic sonar, GPS, speedometer, odometer, engine sensors.\n\n  (ii) Part-Picking Industrial Robot:\n    - Performance Measure: Percentage of parts sorted accurately, speed (parts/minute), zero damage to components.\n    - Environment: Conveyor belt, sorting bins, varied mechanical parts.\n    - Actuators: Robotic jointed arm, suction gripper, motor drives.\n    - Sensors: Overhead CCD camera, laser rangefinder, tactile pressure sensors.\n\nStep 2: Environment Classification:\n  1. Autonomous Taxi: Partially Observable, Stochastic, Dynamic, Sequential, Continuous, Multi-Agent.\n  2. Part-Picking Robot: Fully/Partially Observable, Deterministic/Stochastic, Dynamic (moving belt), Episodic, Continuous, Single-Agent."
          },
          {
            "qNum": "3",
            "marks": 4,
            "co": "CO2",
            "bl": "BL4",
            "q": "Compare Breadth-First Search (BFS), Depth-First Search (DFS), Uniform Cost Search (UCS), and Iterative Deepening Search (IDS) in tabular format across Completeness, Time Complexity, Space Complexity, and Optimality (assume branching factor b, depth d, and maximum depth m).",
            "sol": "Comparative Analysis Table:\n\n1. Breadth-First Search (BFS):\n   - Completeness: Yes (if b is finite)\n   - Time Complexity: O(b^d)\n   - Space Complexity: O(b^d) [Massive exponential RAM requirement]\n   - Optimality: Yes (if all step costs are equal)\n\n2. Depth-First Search (DFS):\n   - Completeness: No (fails in infinite depth or looped graph search without cycle detection)\n   - Time Complexity: O(b^m)\n   - Space Complexity: O(b*m) [Linear memory: major strength]\n   - Optimality: No (returns first goal found, which may be deep and expensive)\n\n3. Uniform Cost Search (UCS):\n   - Completeness: Yes (if all step costs >= ε > 0)\n   - Time Complexity: O(b^(1 + ⌊C*/ε⌋))\n   - Space Complexity: O(b^(1 + ⌊C*/ε⌋))\n   - Optimality: Yes (optimal for arbitrary non-negative step costs)\n\n4. Iterative Deepening Search (IDS):\n   - Completeness: Yes (if b is finite)\n   - Time Complexity: O(b^d)\n   - Space Complexity: O(b*d) [Combines linear space of DFS with optimality of BFS]\n   - Optimality: Yes (if all step costs are equal)"
          },
          {
            "qNum": "4",
            "marks": 4,
            "co": "CO2",
            "bl": "BL4",
            "q": "Explain the A* Search algorithm. Define the evaluation function f(n) = g(n) + h(n). Prove that A* Tree Search is guaranteed to return an optimal solution if the heuristic h(n) is admissible.",
            "sol": "Step 1: Evaluation Function Components:\n  - g(n): Exact accumulated path cost from start node to current node n.\n  - h(n): Estimated cost of cheapest path from n to the goal (heuristic).\n  - f(n) = g(n) + h(n): Estimated total cost of path through node n.\n\nStep 2: Proof of Optimality of A* Tree Search with Admissible Heuristic:\n  1. Let G₂ be a sub-optimal goal node in the priority queue (frontier), with path cost g(G₂) = f(G₂) = C₂ > C*, where C* is the optimal cost.\n  2. Let G₁ be an optimal goal node with g(G₁) = C*.\n  3. Suppose A* chose to expand sub-optimal goal G₂ before G₁. We will prove by contradiction that this is impossible.\n  4. At any time before G₁ is expanded, there must exist some unexpanded ancestor node 'n' of G₁ on the frontier.\n  5. For this node n: f(n) = g(n) + h(n) <= g(n) + h*(n) (since h is admissible, h(n) <= h*(n)).\n  6. Since g(n) + h*(n) = C* (the true cost of path through n to optimal goal):\n     f(n) <= C*.\n  7. Since G₂ is sub-optimal: C* < C₂ ==> f(n) <= C* < f(G₂).\n  8. Because A* always selects the node with the lowest f-value, node 'n' will strictly be expanded before G₂.\n  9. This applies to all ancestors of G₁, including G₁ itself. Hence, G₁ will be selected and expanded before G₂. Therefore, A* cannot terminate with a sub-optimal goal. (PROVED)"
          },
          {
            "qNum": "5",
            "marks": 4,
            "co": "CO3",
            "bl": "BL4",
            "q": "Explain the Minimax algorithm for two-player adversarial games. Describe how Alpha-Beta Pruning optimizes Minimax search without altering the final decision, and state its best-case time complexity.",
            "sol": "Step 1: Minimax Algorithm Concept:\n  In a two-player zero-sum game (MAX and MIN):\n  - MAX chooses moves that maximize the payoff: V(s) = max_{a} Minimax(Result(s, a)).\n  - MIN chooses moves that minimize MAX's payoff: V(s) = min_{a} Minimax(Result(s, a)).\n  Standard Minimax explores all b^m leaf states: Time Complexity O(b^m).\n\nStep 2: Alpha-Beta Pruning Mechanism:\n  Maintains two bounds during depth-first traversal:\n  - α (Alpha): The highest-value choice found so far along the path for MAX (initialized to -∞).\n  - β (Beta): The lowest-value choice found so far along the path for MIN (initialized to +∞).\n  Cutoff Rule: As search descends, α and β are passed down. At any MIN node, if the child's return value is <= α, MIN can force a value worse than what MAX already has secured elsewhere, so search prunes remaining siblings (Alpha Cutoff). At any MAX node, if the return value is >= β, search prunes remaining siblings (Beta Cutoff).\n  Condition: Whenever α >= β, cutoff occurs.\n\nStep 3: Best-Case Time Complexity:\n  With ideal move ordering (best moves evaluated first), branching factor effectively reduces to √b.\n  Time complexity drops from O(b^m) to O(b^(m/2)). This effectively doubles the searchable depth in the same computing time."
          },
          {
            "qNum": "6",
            "marks": 4,
            "co": "CO1",
            "bl": "BL3",
            "q": "Draw and explain the structural architecture of a Learning Agent. Describe the specific functions and interactions of its four distinct components: Critic, Learning Element, Performance Element, and Problem Generator.",
            "sol": "Step 1: Architectural Concept:\n  A Learning Agent decouples daily operational behavior from self-improvement mechanisms, allowing it to adapt to initially unknown environments.\n\nStep 2: The Four Core Components:\n  1. Critic:\n     - Observes agent behavior via environmental percepts and compares outcomes against an external fixed Performance Standard.\n     - Generates reward/penalty signals indicating how well the agent is achieving its objective.\n  2. Learning Element:\n     - Responsible for making lasting improvements.\n     - Takes the Critic's feedback and determines how the decision-making rules should be modified to score higher in the future.\n  3. Performance Element:\n     - The operational agent that acts in the world.\n     - Takes current sensor percepts and selects external actions using current learned policy.\n  4. Problem Generator:\n     - Suggests sub-optimal exploratory actions rather than purely exploitative ones.\n     - Forces the agent to experiment with novel pathways and discover superior long-term strategies.\n\nStep 3: Interaction Flow:\n  Sensors -> Percepts -> Critic (evaluates with Performance Standard) -> Feedback -> Learning Element -> Learning Goals -> Problem Generator -> Performance Element -> Actuators -> Environment."
          }
        ]
      }
    ]
  },
  {
    "id": "model_cfet_2026",
    "subject": "CFET",
    "code": "100108",
    "title": "Computer Fundamentals & Emerging Tech (Official Mid-Sem 2026)",
    "colleges": "LNJPIT Chapra & BEU Constituent Colleges",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "There are 6 questions in this paper. Attempt 5 questions in all. Question No. 1 is compulsory (4 Marks). Questions 2 to 6 carry 4 marks each (Attempt any 4 = 16 Marks).",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 4 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL3",
            "q": "If cache access time is 2 ns, main memory access time is 50 ns, and cache hit ratio is 0.90, the Average Memory Access Time (T_avg) is:\n(i) 6.8 ns   (ii) 5.0 ns   (iii) 52.0 ns   (iv) 47.0 ns",
            "sol": "Answer: (i) 6.8 ns\nExplanation: T_avg = h * t_c + (1 - h) * t_m = (0.90 * 2 ns) + (0.10 * 50 ns) = 1.8 ns + 5.0 ns = 6.8 ns."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL2",
            "q": "The 8-bit 2's complement representation of decimal integer -18 is:\n(i) 11101110   (ii) 00010010   (iii) 11101101   (iv) 10010010",
            "sol": "Answer: (i) 11101110\nExplanation: +18 in 8-bit binary is 00010010. Inverting all bits (1's complement) gives 11101101. Adding 1 gives 11101110."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "co": "CO2",
            "bl": "BL1",
            "q": "Which of the following logic gates are classified as Universal Gates?\n(i) AND & OR   (ii) NAND & NOR   (iii) XOR & XNOR   (iv) NOT & AND",
            "sol": "Answer: (ii) NAND & NOR\nExplanation: Universal gates can implement all three fundamental Boolean operations (NOT, AND, OR) without requiring any other gate type."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "co": "CO2",
            "bl": "BL1",
            "q": "According to De Morgan's theorem, (A · B)' is logically equivalent to:\n(i) A' · B'   (ii) A' + B'   (iii) A + B   (iv) (A + B)'",
            "sol": "Answer: (ii) A' + B'\nExplanation: The complement of a conjunction is the disjunction of the complements: (A · B)' = A' + B'."
          }
        ]
      },
      {
        "name": "Section B — Analytical Problems & Hardware Design (Attempt Any 4, 16 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 4,
            "co": "CO1",
            "bl": "BL3",
            "q": "Perform the following number conversions with complete steps:\n(i) Convert binary (110101.101)₂ into Octal and Hexadecimal.\n(ii) Represent decimal number -25.75 in IEEE 754 32-bit single-precision floating-point format.",
            "sol": "Step 1: (110101.101)₂ Conversion:\n  - To Octal (group in 3s from binary point):\n    Integer: (110)(101) = 6 5\n    Fraction: (101) = 5\n    Result: (65.5)₈.\n  - To Hexadecimal (group in 4s from binary point):\n    Integer: 0011 0101 = 3 5\n    Fraction: 1010 = A\n    Result: (35.A)₁₆.\n\nStep 2: IEEE 754 Single-Precision Format for -25.75:\n  - Sign bit S: 1 (since number is negative).\n  - Convert magnitude 25.75 to binary:\n    25 = 16 + 8 + 1 = (11001)₂\n    0.75 = 0.5 + 0.25 = (0.11)₂\n    25.75 = (11001.11)₂.\n  - Normalize in scientific form: 1.100111₂ × 2⁴ (Exponent e = 4).\n  - Biased Exponent E = e + 127 = 4 + 127 = 131 = (10000011)₂.\n  - Mantissa M (23 bits after leading 1): 10011100000000000000000.\n  - Final 32-bit pattern: 1 10000011 10011100000000000000000\n  - Hexadecimal representation: C1CE0000₁₆."
          },
          {
            "qNum": "3",
            "marks": 4,
            "co": "CO2",
            "bl": "BL4",
            "q": "Design a Full Adder circuit. Provide its complete truth table, derive the minimized Boolean expressions for Sum (S) and Carry-out (C_out) using Karnaugh maps, and draw the logic schematic diagram using two Half Adders and an OR gate.",
            "sol": "Step 1: Truth Table:\n  Inputs: A, B, C_in | Outputs: Sum (S), Carry (C_out)\n  (0, 0, 0) -> S=0, C_out=0\n  (0, 0, 1) -> S=1, C_out=0\n  (0, 1, 0) -> S=1, C_out=0\n  (0, 1, 1) -> S=0, C_out=1\n  (1, 0, 0) -> S=1, C_out=0\n  (1, 0, 1) -> S=0, C_out=1\n  (1, 1, 0) -> S=0, C_out=1\n  (1, 1, 1) -> S=1, C_out=1\n\nStep 2: Boolean Simplification:\n  - Sum S = Σm(1, 2, 4, 7) = A ⊕ B ⊕ C_in\n  - Carry C_out = Σm(3, 5, 6, 7) = A·B + B·C_in + A·C_in = A·B + C_in·(A ⊕ B)\n\nStep 3: Implementation using Two Half Adders and One OR Gate:\n  - Half Adder 1 takes inputs A and B:\n    Outputs: Sum₁ = A ⊕ B, Carry₁ = A · B\n  - Half Adder 2 takes inputs Sum₁ and C_in:\n    Outputs: Final Sum S = Sum₁ ⊕ C_in = (A ⊕ B) ⊕ C_in, Carry₂ = Sum₁ · C_in = (A ⊕ B) · C_in\n  - OR Gate combines Carry₁ and Carry₂:\n    Final Carry C_out = Carry₁ + Carry₂ = A·B + C_in·(A ⊕ B)."
          },
          {
            "qNum": "4",
            "marks": 4,
            "co": "CO1",
            "bl": "BL3",
            "q": "Draw and explain the block diagram of the classical Von Neumann Computer Architecture. Detail the role of CPU registers (PC, IR, MAR, MDR, Accumulator) and explain the physical cause and impact of the 'Von Neumann Bottleneck'.",
            "sol": "Step 1: Block Diagram Components:\n  1. Central Processing Unit (CPU):\n     - Arithmetic & Logic Unit (ALU): Executes arithmetic operations (+, -, *, /) and logical decisions (AND, OR, NOT).\n     - Control Unit (CU): Decodes instructions and generates control timing signals.\n     - Register File: High-speed temporary memory on the CPU die.\n  2. Shared Main Memory: Stores both program instructions and application data in a unified address space.\n  3. System Bus: Address Bus (unidirectional), Data Bus (bidirectional), and Control Bus.\n\nStep 2: CPU Special Purpose Registers:\n  - Program Counter (PC): Holds the memory address of the next instruction to be fetched.\n  - Memory Address Register (MAR): Holds the address in memory currently being read from or written to.\n  - Memory Data Register (MDR): Holds the actual data/instruction word read from or to be written to memory.\n  - Instruction Register (IR): Holds the currently executing instruction opcode during decoding.\n  - Accumulator (ACC): Stores intermediate ALU operational results.\n\nStep 3: The Von Neumann Bottleneck:\n  Because both program instructions and data share the exact same physical bus, the CPU cannot read an instruction and read/write user data simultaneously. Since CPU clock frequencies have increased exponentially while memory bus transfer speeds have grown much slower, the CPU spends idle cycles waiting for memory data. This throughput limitation is the Von Neumann Bottleneck."
          },
          {
            "qNum": "5",
            "marks": 4,
            "co": "CO4",
            "bl": "BL4",
            "q": "Compare Star, Mesh, Ring, and Bus network topologies in tabular format (Cabling cost, Fault tolerance, Bottlenecks, and Scalability). Distinguish between a physical MAC address and a logical IP address.",
            "sol": "Step 1: Network Topology Comparison Table:\n\n1. Mesh Topology:\n   - Cabling Cost: Extremely High [n*(n-1)/2 dedicated physical links]\n   - Fault Tolerance: Outstanding (single link failure affects only those 2 nodes)\n   - Bottlenecks: None (dedicated point-to-point lines)\n   - Scalability: Very Poor (adding nodes requires rewiring to every existing node)\n\n2. Star Topology:\n   - Cabling Cost: Moderate (each node runs single cable to central switch)\n   - Fault Tolerance: High for node cables; Catastrophic if central switch fails\n   - Bottlenecks: Central switch backplane bandwidth\n   - Scalability: Excellent (simply plug new device into switch port)\n\n3. Bus Topology:\n   - Cabling Cost: Lowest (single central coaxial backbone cable with terminators)\n   - Fault Tolerance: Very Poor (a single break in main backbone brings down entire network)\n   - Bottlenecks: Shared cable bandwidth; high packet collisions under load\n   - Scalability: Moderate\n\n4. Ring Topology:\n   - Cabling Cost: Low to Moderate (unidirectional token ring loop)\n   - Fault Tolerance: Poor (in single ring, failure of one node breaks loop)\n   - Bottlenecks: Token passing latency under heavy traffic\n   - Scalability: Difficult (disrupts ring to add nodes)\n\nStep 2: MAC Address vs IP Address:\n  - MAC Address (Media Access Control): 48-bit physical/hardware address burned permanently into NIC ROM at factory (Data Link Layer 2). Flat, non-routable address (e.g., 00:1A:2B:3C:4D:5E).\n  - IP Address (Internet Protocol): 32-bit (IPv4) or 128-bit (IPv6) logical network address assigned dynamically or statically by network administrator/DHCP (Network Layer 3). Hierarchical and globally routable."
          },
          {
            "qNum": "6",
            "marks": 4,
            "co": "CO4",
            "bl": "BL3",
            "q": "Differentiate between TCP and UDP protocols across Connection Setup, Reliability, Packet Header Overhead, Flow Control, and Common Applications. Explain the CIA Triad of Cybersecurity with concrete examples.",
            "sol": "Step 1: Comparison: TCP vs UDP:\n  1. Connection Type: TCP is Connection-Oriented (requires 3-way handshake SYN -> SYN-ACK -> ACK); UDP is Connectionless (fire-and-forget datagrams).\n  2. Reliability: TCP guarantees delivery through sequence numbers and ACKs; UDP provides best-effort delivery with no ACK and possible dropped packets.\n  3. Overhead: TCP has 20-60 byte header; UDP has a lightweight 8-byte header.\n  4. Speed: TCP is slower due to handshakes and retransmissions; UDP is extremely fast with minimal latency.\n  5. Flow & Congestion Control: TCP uses sliding window and congestion algorithms; UDP has zero flow/congestion control.\n  6. Applications: TCP used for Web (HTTP/HTTPS), File Transfer (FTP), Email (SMTP); UDP used for Real-time Video Streaming, Online Gaming, DNS, VoIP.\n\nStep 2: CIA Triad of Cybersecurity:\n  - Confidentiality: Protecting sensitive data from unauthorized interception (e.g., encrypting passwords and financial transactions with AES-256 / TLS).\n  - Integrity: Guaranteeing that data is authentic, accurate, and has not been maliciously tampered with in transit (e.g., cryptographic SHA-256 hashing and digital signatures).\n  - Availability: Ensuring authorized users have uninterrupted access to systems and networks when needed (e.g., deploying load balancers, redundant power, and anti-DDoS firewalls)."
          }
        ]
      }
    ]
  },
  {
    "id": "model_uhv_2026",
    "subject": "UHV",
    "code": "100109",
    "title": "Universal Human Values (Official Mid-Sem 2026)",
    "colleges": "LNJPIT Chapra & BEU Constituent Colleges",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "There are 6 questions in this paper. Attempt 5 questions in all. Question No. 1 is compulsory (4 Marks). Questions 2 to 6 carry 4 marks each (Attempt any 4 = 16 Marks).",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 4 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL2",
            "q": "The fundamental needs of the conscious Self ('I') are:\n(i) Quantitative and temporary   (ii) Qualitative and continuous in time\n(iii) Purely physiological        (iv) Material and consumptive",
            "sol": "Answer: (ii) Qualitative and continuous in time\nExplanation: The Self ('I') seeks happiness, respect, trust, and peace, which are qualitative in nature and demanded continuously, unlike bodily needs which are physical and temporary."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "co": "CO2",
            "bl": "BL1",
            "q": "The foundational value (moolya) in all human relationships is:\n(i) Wealth (Dhan)   (ii) Trust (Vishwas)   (iii) Power (Shakti)   (iv) Fear (Bhaya)",
            "sol": "Answer: (ii) Trust (Vishwas)\nExplanation: Trust—the assurance of mutual good intention—is the cornerstone foundation of every human relationship."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "co": "CO2",
            "bl": "BL2",
            "q": "Respect (Samman) is defined as:\n(i) Flattery & Praise   (ii) Right Evaluation (Samyak Mulyankan)\n(iii) Expensive Gifts   (iv) Submission to Authority",
            "sol": "Answer: (ii) Right Evaluation (Samyak Mulyankan)\nExplanation: Respect means evaluating a person as they are, without over-evaluation, under-evaluation, or otherwise-evaluation."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "co": "CO1",
            "bl": "BL1",
            "q": "The feeling of responsibility in the Self ('I') for nurturing, protecting, and rightly utilizing the Body is:\n(i) Sanyama (Self-regulation)   (ii) Swasthya (Health)\n(iii) Suvidha (Physical Facility)   (iv) Samadhan (Resolution)",
            "sol": "Answer: (i) Sanyama (Self-regulation)\nExplanation: Sanyama is the internal commitment of the Self to nurture and care for the Body, which directly results in physical health (Swasthya)."
          }
        ]
      },
      {
        "name": "Section B — Analytical Problems & Value Frameworks (Attempt Any 4, 16 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 4,
            "co": "CO1",
            "bl": "BL3",
            "q": "Explain the human being as a co-existence of the conscious Self ('I') and the material Body. Compare their Needs, Activities, and Response modes in tabular format.",
            "sol": "Co-existence of Self ('I') and Body Comparison Table:\n\n1. Needs:\n   - Self ('I'): Sukh (Happiness, Trust, Respect, Love) — Qualitative in nature, Continuous in time.\n   - Body: Suvidha (Food, Clothing, Shelter) — Quantitative in nature, Temporary/Periodic in time.\n\n2. Fulfillment:\n   - Self ('I'): Fulfilled through Right Understanding (Gyan) and Right Feelings (Bhava).\n   - Body: Fulfilled through Physical Facilities and material production.\n\n3. Activities:\n   - Self ('I'): Desiring (Iccha), Thinking (Vichara), Expecting (Asha) — Continuous.\n   - Body: Eating, Walking, Breathing, Heartbeat — Physiological/Physico-chemical.\n\n4. Response Mode:\n   - Self ('I'): Knowing (Janna), Assuming (Manna), Recognizing (Pahachanna), Fulfilling (Nirvaha Karna).\n   - Body: Only Recognizing and Fulfilling (purely conditioned physico-chemical response without consciousness)."
          },
          {
            "qNum": "3",
            "marks": 4,
            "co": "CO2",
            "bl": "BL4",
            "q": "Differentiate clearly between 'Trust on Intention' and 'Trust on Competence'. Explain how confusing competence with intention leads to anger, conflict, and breakdown of relationships.",
            "sol": "Step 1: Definitions:\n  - Intention (Natural Acceptance): What a human being naturally wants. At the level of intention, everyone naturally desires mutual happiness and well-being.\n  - Competence (Ability): The actual capability to translate good intention into successful practice.\n\nStep 2: The Core Error in Human Relationships:\n  - We judge ourselves by our intention ('I didn't mean to hurt you; it was just a mistake').\n  - We judge others by their competence/behavior ('You broke the promise; therefore you are malicious and cannot be trusted').\n\nStep 3: Consequence of the Confusion:\n  When someone makes a mistake due to lack of skill/competence, we mistakenly conclude that their intention is evil. This generates immediate irritation, anger, and hostility. Once intention is doubted, trust evaporates.\n\nStep 4: Right Approach:\n  Trusting intention unconditionally creates an attitude of mutual acceptance. When the other fails, we recognize it as a lack of competence, which evokes compassion and a desire to mentor and help them improve."
          },
          {
            "qNum": "4",
            "marks": 4,
            "co": "CO2",
            "bl": "BL4",
            "q": "Define Respect (Samman) as 'Right Evaluation'. Explain the three forms of differentiation/disrespect (Over-evaluation, Under-evaluation, and Otherwise-evaluation) prevalent in society based on body, physical facility, and beliefs.",
            "sol": "Step 1: Definition of Respect:\n  Samman = Samyak + Man (Right Evaluation). Respect means evaluating the other person exactly as they are—recognizing that the other is similar to me in wanting continuous happiness and right understanding.\n\nStep 2: The Three Distortions (Disrespect):\n  1. Over-Evaluation (Adhi-mulyankan): Evaluating someone higher than what they actually are (e.g., excessive flattery).\n  2. Under-Evaluation (Ava-mulyankan): Evaluating someone lower than what they actually are (e.g., belittling efforts).\n  3. Otherwise-Evaluation (Anya-mulyankan): Evaluating someone on irrelevant criteria (e.g., judging moral character based on clothing).\n\nStep 3: Common Bases of Differentiation in Society:\n  - Based on Body: Gender (male/female discrimination), Age, Physical strength, Skin complexion.\n  - Based on Physical Facility: Wealth (rich vs poor), Royal ancestry, Material possessions.\n  - Based on Beliefs: Isms (Capitalism vs Socialism), Religious sects, Dogmatic ideological affiliations.\n\nConclusion: These differentiations lead to discrimination, opposition, and social fragmentation."
          },
          {
            "qNum": "5",
            "marks": 4,
            "co": "CO3",
            "bl": "BL3",
            "q": "List the nine foundational feelings (values) in human relationships. Explain how harmony in the family expands into an Undivided Society (Akhand Samaj) and state the four Comprehensive Human Goals.",
            "sol": "Step 1: The Nine Values in Relationship (Sambandh):\n  1. Trust (Vishwas) — Foundational value\n  2. Respect (Samman) — Right evaluation\n  3. Affection (Sneha) — Feeling of being related\n  4. Care (Mamata) — Feeling of responsibility for nurturing the body\n  5. Guidance (Vatsalya) — Feeling of responsibility for developing the Self\n  6. Reverence (Shraddha) — Feeling of acceptance for excellence\n  7. Glory (Gaurav) — Feeling for those who lived for right understanding\n  8. Gratitude (Kritagyata) — Feeling for those who helped me\n  9. Love (Prem) — Complete value, feeling of relatedness to all.\n\nStep 2: Four Comprehensive Human Goals:\n  1. Right Understanding & Right Feelings in Every Individual (Samadhan)\n  2. Prosperity in Every Family (Samridhi)\n  3. Fearlessness / Trust in Society (Abhay)\n  4. Co-existence in Nature (Sah-astitva).\n\nStep 3: Expansion from Family to Undivided Society:\n  Living with these values begins in the family. As family members experience mutual fulfillment, trust naturally extends to neighbors, the community, nations, and all humanity, establishing an Undivided Society (Akhand Samaj)."
          },
          {
            "qNum": "6",
            "marks": 4,
            "co": "CO1",
            "bl": "BL3",
            "q": "Explain the concepts of Sanyama (Self-regulation) and Swasthya (Health). Outline the complete daily program for maintaining health of the body through proper food, daily routine, physical labor, exercise, and rest.",
            "sol": "Step 1: Definitions:\n  - Sanyama: The feeling of responsibility in the Self ('I') for nurturing, protecting, and rightly utilizing the Body.\n  - Swasthya (Health): The condition of the Body where all organs and systems function in harmony according to their natural design, and the Body acts as a fit instrument of the Self.\n\nStep 2: Program for Sanyama and Swasthya:\n  1. Nurturing of the Body (Poshan):\n     - Proper Food (Ahara): Selecting wholesome, natural, easily digestible, and balanced food at regular hours according to season and bodily constitution.\n  2. Protection of the Body (Sanrakshan):\n     - Proper Lifestyle & Daily Routine (Vihara): Waking early, personal hygiene, and regular sleep schedule.\n     - Physical Labor & Exercise (Shrama & Vyayama): Engaging in physical exertion to maintain metabolic fitness, muscle tone, and blood circulation.\n     - Asana & Pranayama: Yogic postures and breath regulation for internal organ vitality and nervous system balance.\n  3. Right Utilization of the Body (Sadyupayoga):\n     - Using physical faculties and sensory organs for productive work, societal service, and learning rather than sensory indulgence.\n  4. Rest & Recuperation (Vishrama & Upachara):\n     - Adequate sleep (6-8 hours) and restorative rest to rejuvenate cellular repair.\n     - Using natural remedies and medicine only when bodily balance is disturbed."
          }
        ]
      }
    ]
  }
];