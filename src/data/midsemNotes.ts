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
  examStartDate: "2026-11-25",
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
  // 1. MATH-I
  {
    id: "beu_math1_2026",
    subject: "Math-I",
    code: "100102",
    title: "Engineering Mathematics – I (BEU Mid-Sem 2026)",
    colleges: "GEC Bhojpur & GEC Lakhisarai",
    fullMarks: 20,
    timeHours: 2,
    instructions: "Answer any five questions. Question No. 1 is compulsory.",
    sections: [
      {
        name: "Part A — Objective & Conceptual (Compulsory, 5 Marks)",
        questions: [
          {
            qNum: "1(a)",
            marks: 1,
            q: "The value of lim (x -> 0) (1 + x)^(1/x) is:\n(i) 1   (ii) 0   (iii) e   (iv) -e",
            sol: "Answer: (iii) e\nExplanation: Let L = lim (x -> 0) (1 + x)^(1/x). Taking natural log: ln L = lim (x -> 0) ln(1 + x) / x = [0/0 form]. By L'Hôpital's Rule: lim (x -> 0) [1/(1 + x)] / 1 = 1. Therefore, L = e¹ = e."
          },
          {
            qNum: "1(b)",
            marks: 1,
            q: "If f(x) is continuous in [a, b], f'(x) exists in (a, b) and f(a) = f(b), then there exists at least one value c in (a, b) such that f'(c) = 0. This is:\n(i) Taylor's theorem   (ii) Rolle's theorem   (iii) LMVT   (iv) Cauchy's theorem",
            sol: "Answer: (ii) Rolle's theorem\nExplanation: Exact statement of Rolle's theorem in differential calculus."
          },
          {
            qNum: "1(c)",
            marks: 1,
            q: "In Maxima & Minima of two variables, if rt - s² < 0, then the critical point is called:\n(i) Maxima   (ii) Saddle point   (iii) Minima   (iv) Inconclusive",
            sol: "Answer: (ii) Saddle point\nExplanation: When rt - s² < 0, the Hessian matrix has mixed eigenvalue signs, curving upwards in one direction and downwards in another."
          },
          {
            qNum: "1(d)",
            marks: 1,
            q: "The eigenvalues of the diagonal matrix diag(1, 2, 3) are:\n(i) 1, 2, 3   (ii) 1, 2, 5   (iii) 0, 1, 4   (iv) None of these",
            sol: "Answer: (i) 1, 2, 3\nExplanation: The characteristic equation is (1 - λ)(2 - λ)(3 - λ) = 0, so eigenvalues are precisely the diagonal entries."
          },
          {
            qNum: "1(e)",
            marks: 1,
            q: "Which operation is NOT an elementary row operation?\n(a) Swapping two rows   (b) Adding multiple of a row to another   (c) Multiplying a row by zero   (d) Multiplying a row by non-zero constant",
            sol: "Answer: (c) Multiplying a row by zero\nExplanation: Elementary operations must be reversible; multiplying by zero destroys information and rank."
          }
        ]
      },
      {
        name: "Section B — Short Analytical Problems & Derivations (Any Two, 7 Marks)",
        questions: [
          {
            qNum: "2",
            marks: 3.5,
            q: "Reduce the matrix A = [[1, 2, 3], [2, 4, 7], [3, 6, 10]] to Normal Form [I_r, 0; 0, 0] and determine its rank.",
            sol: "1. Apply row ops: R2 → R2 - 2R1: [0, 0, 1]; R3 → R3 - 3R1: [0, 0, 1]; R3 → R3 - R2: [0, 0, 0]. Matrix is [[1, 2, 3], [0, 0, 1], [0, 0, 0]].\n2. Apply column ops: C2 → C2 - 2C1, C3 → C3 - 3C1 gives [[1, 0, 0], [0, 0, 1], [0, 0, 0]].\n3. Swap C2 and C3: [[1, 0, 0], [0, 1, 0], [0, 0, 0]] = [I_2, 0; 0, 0].\n4. Rank ρ(A) = 2."
          },
          {
            qNum: "3",
            marks: 3.5,
            q: "Find the values of a and b such that the system of equations x + y + z = 6, x + 2y + 3z = 10, x + 2y + az = b has: (i) No solution, (ii) Unique solution, (iii) Infinitely many solutions.",
            sol: "1. Augmented matrix [A|B]: [[1, 1, 1 | 6], [1, 2, 3 | 10], [1, 2, a | b]].\n2. Row ops: R2 → R2 - R1 gives [0, 1, 2 | 4]; R3 → R3 - R2 gives [0, 0, a - 3 | b - 10].\n3. Analysis: (i) No solution: a = 3 and b ≠ 10 (ρ(A)=2, ρ(A|B)=3). (ii) Unique solution: a ≠ 3 (ρ(A)=ρ(A|B)=3=n). (iii) Infinitely many solutions: a = 3 and b = 10 (ρ(A)=ρ(A|B)=2 < 3)."
          }
        ]
      },
      {
        name: "Section C — Comprehensive University Proofs & Computations (Any One, 8 Marks)",
        questions: [
          {
            qNum: "4",
            marks: 8,
            q: "If y = (sin⁻¹ x)², prove that (1 - x²)y_{n+2} - (2n + 1)x y_{n+1} - n² y_n = 0. Hence evaluate y_n(0) for all n.",
            sol: "1. y = (sin⁻¹ x)² ==> y₁ = 2·sin⁻¹ x / √(1 - x²) ==> (1 - x²)(y₁)² = 4y.\n2. Differentiate again: (1 - x²)·2y₁y₂ - 2x(y₁)² = 4y₁ ==> (1 - x²)y₂ - x y₁ - 2 = 0.\n3. Apply Leibnitz's theorem n times: [(1 - x²)y_{n+2} - 2nx y_{n+1} - n(n-1)y_n] - [x y_{n+1} + n y_n] = 0 ==> (1 - x²)y_{n+2} - (2n + 1)x y_{n+1} - n² y_n = 0. (PROVED)\n4. At x = 0: y_{n+2}(0) = n² · y_n(0).\n   - For odd n: y₁(0) = 0 ==> y_n(0) = 0 for all odd n.\n   - For even n: y(0) = 0, y₂(0) = 2 ==> y_{2k}(0) = 2 · [(2k - 2)² · (2k - 4)² ... 2²]."
          }
        ]
      }
    ]
  },

  // 2. BEEE
  {
    id: "beu_beee_2026",
    subject: "BEEE",
    code: "100111",
    title: "Basics of Electrical & Electronics Engineering (BEU Mid-Sem 2026)",
    colleges: "GEC Aurangabad & LNJPIT Chapra",
    fullMarks: 20,
    timeHours: 2,
    instructions: "Answer any five questions. Question No. 1 is compulsory.",
    sections: [
      {
        name: "Part A — Objective & Conceptual (Compulsory, 5 Marks)",
        questions: [
          {
            qNum: "1(a)",
            marks: 1,
            q: "The maximum power transfer efficiency from source to load is:\n(i) 100%   (ii) 75%   (iii) 50%   (iv) 25%",
            sol: "Answer: (iii) 50%\nExplanation: Under R_L = R_th, equal power is dissipated across source internal resistance and load."
          },
          {
            qNum: "1(b)",
            marks: 1,
            q: "The Form Factor of a pure sinusoidal AC waveform is:\n(i) 1.414   (ii) 1.11   (iii) 0.707   (iv) 0.637",
            sol: "Answer: (ii) 1.11\nExplanation: k_f = V_rms / V_avg = (V_m / √2) / (2V_m / π) = π / (2√2) ≈ 1.11."
          },
          {
            qNum: "1(c)",
            marks: 1,
            q: "In a series RLC circuit at resonance, the power factor is:\n(i) 0   (ii) 0.5 lagging   (iii) 0.8 leading   (iv) Unity (1.0)",
            sol: "Answer: (iv) Unity (1.0)\nExplanation: At resonance X_L = X_C, so impedance Z = R is purely resistive, making voltage and current in phase (cos φ = 1)."
          },
          {
            qNum: "1(d)",
            marks: 1,
            q: "The maximum theoretical efficiency of a full-wave bridge rectifier is:\n(i) 40.6%   (ii) 50%   (iii) 81.2%   (iv) 100%",
            sol: "Answer: (iii) 81.2%\nExplanation: η_max = 8 / π² ≈ 81.2%."
          },
          {
            qNum: "1(e)",
            marks: 1,
            q: "If α = 0.98 for a transistor, its β value is:\n(i) 49   (ii) 50   (iii) 98   (iv) 100",
            sol: "Answer: (i) 49\nExplanation: β = α / (1 - α) = 0.98 / 0.02 = 49."
          }
        ]
      },
      {
        name: "Section B — Short Analytical Problems (Any Two, 7 Marks)",
        questions: [
          {
            qNum: "2",
            marks: 3.5,
            q: "A series RLC circuit has R = 5 Ω, L = 0.2 H, C = 20 µF. Find: (i) Resonant frequency f_0, (ii) Q-factor.",
            sol: "1. f_0 = 1 / [2π√(LC)] = 1 / [2π√(0.2 × 20×10⁻⁶)] = 1 / [2π√(4×10⁻⁶)] = 1000 / (4π) ≈ 79.58 Hz.\n2. Q = (1/R)·√(L/C) = (1/5)·√(0.2 / 20×10⁻⁶) = 0.2 · √10000 = 0.2 × 100 = 20."
          },
          {
            qNum: "3",
            marks: 3.5,
            q: "State Thevenin's Theorem and find the Thevenin equivalent circuit across terminals AB for a 12V source with 4Ω in series and 6Ω in parallel.",
            sol: "1. Thevenin's Theorem: Any linear two-terminal circuit can be replaced by an equivalent voltage source V_th in series with resistance R_th.\n2. V_th = Open circuit voltage across 6Ω: V_th = 12 × (6 / (4 + 6)) = 12 × 0.6 = 7.2 V.\n3. R_th = Deactivate 12V (short circuit): R_th = 4 || 6 = (4 × 6) / (4 + 6) = 2.4 Ω.\n4. Equivalent Circuit: V_th = 7.2 V in series with R_th = 2.4 Ω."
          }
        ]
      },
      {
        name: "Section C — Comprehensive University Proofs (Any One, 8 Marks)",
        questions: [
          {
            qNum: "4",
            marks: 8,
            q: "Explain the working of a Full-Wave Bridge Rectifier with a neat circuit diagram, input/output waveforms, and derive expressions for V_dc, RMS voltage, ripple factor, and rectification efficiency.",
            sol: "1. Circuit & Operation: 4 diodes D1-D4 arranged in a bridge. During positive half-cycle, D1 and D2 conduct in series with load. During negative half-cycle, D3 and D4 conduct, maintaining the same current direction through R_L.\n2. DC Voltage: V_dc = (1/π) ∫₀^π V_m·sin(ωt) d(ωt) = (2·V_m) / π ≈ 0.637·V_m.\n3. RMS Voltage: V_rms = √[(1/π) ∫₀^π V_m²·sin²(ωt) d(ωt)] = V_m / √2 ≈ 0.707·V_m.\n4. Ripple Factor: γ = √[(V_rms / V_dc)² - 1] = √[((V_m/√2) / (2V_m/π))² - 1] = √(π²/8 - 1) = √(1.2337 - 1) = 0.482.\n5. Efficiency: η = P_dc / P_ac = (I_dc²·R_L) / (I_rms²·(R_L + 2r_f)) ≈ 8 / π² = 81.2%."
          }
        ]
      }
    ]
  },

  // 3. PHYSICS
  {
    id: "model_physics_2026",
    subject: "Physics",
    code: "100104",
    title: "Engineering Physics (BEU Mid-Sem 2026 Model Paper)",
    colleges: "LNJPIT Chapra & BEU University Model",
    fullMarks: 20,
    timeHours: 2,
    instructions: "Answer any five questions. Question No. 1 is compulsory.",
    sections: [
      {
        name: "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        questions: [
          {
            qNum: "1(a)",
            marks: 1,
            q: "In Newton's rings experiment viewed under reflected light, the central fringe is:\n(i) Always Bright   (ii) Always Dark   (iii) Colored   (iv) Indeterminate",
            sol: "Answer: (ii) Always Dark\nExplanation: At point of contact t = 0; phase reversal of π at lower denser glass introduces path difference λ/2 (destructive interference)."
          },
          {
            qNum: "1(b)",
            marks: 1,
            q: "For light propagation through an optical fiber by TIR, the condition is:\n(i) n1 < n2   (ii) n1 > n2   (iii) n1 = n2   (iv) n1 · n2 = 1",
            sol: "Answer: (ii) n1 > n2\nExplanation: Total Internal Reflection requires core index n1 to strictly exceed cladding index n2."
          },
          {
            qNum: "1(c)",
            marks: 1,
            q: "The SI unit of the Poynting Vector S = E × H is:\n(i) Watts (W)   (ii) W/m²   (iii) Joules (J)   (iv) V/m",
            sol: "Answer: (ii) W/m²\nExplanation: The Poynting vector measures electromagnetic power flow per unit area."
          },
          {
            qNum: "1(d)",
            marks: 1,
            q: "The ratio of Einstein's coefficients A_21 / B_21 is proportional to:\n(i) ν   (ii) ν²   (iii) ν³   (iv) 1/ν",
            sol: "Answer: (iii) ν³\nExplanation: A_21 / B_21 = (8πhν³) / c³."
          },
          {
            qNum: "1(e)",
            marks: 1,
            q: "The angular half-width of the central maximum in single-slit Fraunhofer diffraction is:\n(i) λ / a   (ii) 2λ / a   (iii) a / λ   (iv) a · λ",
            sol: "Answer: (i) λ / a\nExplanation: The first minimum occurs when a·sin θ = λ ==> sin θ ≈ θ = λ / a. The full width is 2λ/a."
          }
        ]
      },
      {
        name: "Section B — Short Analytical Problems (Any Two, 7 Marks)",
        questions: [
          {
            qNum: "2",
            marks: 3.5,
            q: "Newton's rings are formed by light of wavelength 5890 Å between a lens and a flat glass plate. If diameter of 10th dark ring is 0.50 cm, calculate the radius of curvature of the lens.",
            sol: "1. Formula: D_n² = 4·n·R·λ  ==>  R = D_n² / (4·n·λ).\n2. D_10 = 0.50 cm, n = 10, λ = 5890 × 10⁻⁸ cm = 5.89 × 10⁻⁵ cm.\n3. R = (0.50)² / [4 × 10 × (5.89 × 10⁻⁵)] = 0.25 / (2.356 × 10⁻³) = 106.1 cm (1.06 m)."
          },
          {
            qNum: "3",
            marks: 3.5,
            q: "An optical fiber has core index n1 = 1.55 and cladding index n2 = 1.50. Calculate: (i) Critical angle, (ii) NA, (iii) Acceptance angle.",
            sol: "1. θ_c = sin⁻¹(n2 / n1) = sin⁻¹(1.50 / 1.55) = 75.4°.\n2. NA = √(n1² - n2²) = √(1.55² - 1.50²) = √0.1525 = 0.3905.\n3. θ_a = sin⁻¹(NA) = sin⁻¹(0.3905) = 23.0°."
          }
        ]
      },
      {
        name: "Section C — Comprehensive University Proofs (Any One, 8 Marks)",
        questions: [
          {
            qNum: "4",
            marks: 8,
            q: "State Maxwell's four equations in differential and integral forms. Explain how Maxwell modified Ampere's circuital law by introducing Displacement Current.",
            sol: "1. Maxwell's 4 Equations:\n   (i) ∇ · D = ρ_v  |  ∮ D·dA = Q_enc (Gauss Electrostatics)\n   (ii) ∇ · B = 0  |  ∮ B·dA = 0 (Gauss Magnetostatics)\n   (iii) ∇ × E = -∂B/∂t  |  ∮ E·dl = -dΦ_B/dt (Faraday's Law)\n   (iv) ∇ × H = J + ∂D/∂t  |  ∮ H·dl = I_c + I_d (Ampere-Maxwell Law)\n2. Limitation of Ampere's Law: ∇ · (∇ × H) = 0 requires ∇ · J = 0, but continuity equation requires ∇ · J = -∂ρ/∂t ≠ 0 for time-varying fields.\n3. Modification: From Gauss's law ρ = ∇ · D, taking time derivative gives ∂ρ/∂t = ∇ · (∂D/∂t). Substituting into continuity gives ∇ · [J + ∂D/∂t] = 0. Maxwell identified J_d = ∂D/∂t = ε₀(∂E/∂t) as displacement current density.\n4. Physical Significance: In capacitor dielectric, changing electric flux dΦ_E/dt generates magnetic fields identically to physical current."
          }
        ]
      }
    ]
  },

  // 4. IAI
  {
    id: "model_iai_2026",
    subject: "IAI",
    code: "100105",
    title: "Introduction to AI (BEU Mid-Sem 2026 Model Paper)",
    colleges: "LNJPIT Chapra & BEU University Model",
    fullMarks: 20,
    timeHours: 2,
    instructions: "Answer any five questions. Question No. 1 is compulsory.",
    sections: [
      {
        name: "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        questions: [
          {
            qNum: "1(a)",
            marks: 1,
            q: "PEAS in AI agent design stands for:\n(i) Performance, Environment, Actuators, Sensors\n(ii) Perception, Entity, Action, State\n(iii) Program, Execution, Algorithm, Storage\n(iv) Probability, Estimation, Accuracy, System",
            sol: "Answer: (i) Performance, Environment, Actuators, Sensors\nExplanation: Standard 4-component specification framework for intelligent agents."
          },
          {
            qNum: "1(b)",
            marks: 1,
            q: "Which search algorithm is guaranteed to be optimal when all step costs are equal?\n(i) DFS   (ii) BFS   (iii) Greedy Best-First   (iv) Depth-limited",
            sol: "Answer: (ii) BFS\nExplanation: BFS explores shallowest nodes first, guaranteeing shallowest (cheapest) path."
          },
          {
            qNum: "1(c)",
            marks: 1,
            q: "A heuristic function h(n) in A* search is admissible if:\n(i) h(n) > h*(n)   (ii) 0 ≤ h(n) ≤ h*(n)   (iii) h(n) = ∞   (iv) h(n) decreases monotonically",
            sol: "Answer: (ii) 0 ≤ h(n) ≤ h*(n)\nExplanation: Admissibility requires h(n) to never overestimate true cost to goal."
          },
          {
            qNum: "1(d)",
            marks: 1,
            q: "In Alpha-Beta pruning, search cutoff occurs when:\n(i) α < β   (ii) α ≥ β   (iii) α = 0   (iv) β = ∞",
            sol: "Answer: (ii) α ≥ β\nExplanation: When α ≥ β, the current branch is worse than an alternative already explored, so further evaluation is redundant."
          },
          {
            qNum: "1(e)",
            marks: 1,
            q: "The space complexity of Depth-First Search (DFS) with branching factor b and depth m is:\n(i) O(b^m)   (ii) O(b · m)   (iii) O(m^b)   (iv) O(1)",
            sol: "Answer: (ii) O(b · m)\nExplanation: DFS stores only the current path from root to leaf, requiring linear memory space."
          }
        ]
      },
      {
        name: "Section B — Short Analytical Problems (Any Two, 7 Marks)",
        questions: [
          {
            qNum: "2",
            marks: 3.5,
            q: "Construct a complete PEAS description table for an Automated Medical Diagnosis Expert System.",
            sol: "1. Performance Measure: Diagnostic accuracy rate, minimization of false negatives, treatment speed, cost efficiency.\n2. Environment: Hospital clinical setting, patient symptoms, lab test databases, drug interactions.\n3. Actuators: Screen display of diagnoses, printed prescriptions, electronic orders to labs.\n4. Sensors: Clinician keyboard inputs, patient vitals, digital lab reports, DICOM radiological images."
          },
          {
            qNum: "3",
            marks: 3.5,
            q: "Explain Alpha-Beta pruning with cutoff conditions and state its best-case time complexity.",
            sol: "1. Concept: Minimax traversal maintaining α (MAX's best score) and β (MIN's best score).\n2. Cutoff Condition: Whenever α ≥ β at any node, stop evaluating remaining children.\n3. Best-Case Complexity: With optimal move ordering, complexity reduces from O(b^m) to O(b^(m/2)), effectively doubling searchable depth."
          }
        ]
      },
      {
        name: "Section C — Comprehensive University Proofs (Any One, 8 Marks)",
        questions: [
          {
            qNum: "4",
            marks: 8,
            q: "Draw and explain the architectural schematic diagram of a Learning Agent. Describe the function of Critic, Learning Element, Performance Element, and Problem Generator.",
            sol: "1. Concept: A learning agent separates operational action selection from self-improvement.\n2. Four Components:\n   - Critic: Evaluates agent behavior against an external Performance Standard and provides reward/penalty feedback.\n   - Learning Element: Experiments and updates internal decision rules based on Critic feedback.\n   - Performance Element: Selects external actions based on percepts and updated knowledge.\n   - Problem Generator: Suggests sub-optimal exploratory actions to discover novel states.\n3. Flow: Sensors → Critic → Learning Element → Performance Element → Actuators."
          }
        ]
      }
    ]
  },

  // 5. CFET
  {
    id: "model_cfet_2026",
    subject: "CFET",
    code: "100108",
    title: "Computer Fundamentals & Emerging Tech (BEU Mid-Sem 2026 Model Paper)",
    colleges: "LNJPIT Chapra & BEU University Model",
    fullMarks: 20,
    timeHours: 2,
    instructions: "Answer any five questions. Question No. 1 is compulsory.",
    sections: [
      {
        name: "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        questions: [
          {
            qNum: "1(a)",
            marks: 1,
            q: "If cache access time is 2 ns, main memory access time is 50 ns, and hit ratio is 0.95, T_avg is:\n(i) 4.4 ns   (ii) 2.0 ns   (iii) 52 ns   (iv) 47.5 ns",
            sol: "Answer: (i) 4.4 ns\nExplanation: T_avg = 0.95 × 2 + (1 - 0.95) × 50 = 1.9 + 2.5 = 4.4 ns."
          },
          {
            qNum: "1(b)",
            marks: 1,
            q: "In an 8-bit 2's complement system, the range of signed integers is:\n(i) -128 to +127   (ii) -127 to +128   (iii) 0 to 255   (iv) -256 to +255",
            sol: "Answer: (i) -128 to +127\nExplanation: Range is -2^(n-1) to +(2^(n-1) - 1). For n=8, -128 to +127."
          },
          {
            qNum: "1(c)",
            marks: 1,
            q: "Which logic gates are classified as Universal Gates?\n(i) AND & OR   (ii) NAND & NOR   (iii) XOR & XNOR   (iv) NOT & AND",
            sol: "Answer: (ii) NAND & NOR\nExplanation: All Boolean operations can be synthesized solely from NAND or solely from NOR gates."
          },
          {
            qNum: "1(d)",
            marks: 1,
            q: "According to De Morgan's theorem, (A · B)' is equal to:\n(i) A' · B'   (ii) A' + B'   (iii) A + B   (iv) (A + B)'",
            sol: "Answer: (ii) A' + B'\nExplanation: First De Morgan's theorem."
          },
          {
            qNum: "1(e)",
            marks: 1,
            q: "A Half Adder can be constructed using:\n(i) One XOR and one AND gate   (ii) Two OR gates   (iii) One NAND gate   (iv) Two NOT gates",
            sol: "Answer: (i) One XOR and one AND gate\nExplanation: Sum S = A ⊕ B (XOR), Carry C = A · B (AND)."
          }
        ]
      },
      {
        name: "Section B — Short Analytical Problems (Any Two, 7 Marks)",
        questions: [
          {
            qNum: "2",
            marks: 3.5,
            q: "Convert decimal -13.625 into IEEE 754 single-precision 32-bit floating point format.",
            sol: "1. S = 1 (negative).\n2. 13.625 = 1101.101₂ = 1.101101₂ × 2³.\n3. Biased Exponent: E = 3 + 127 = 130 = 10000010₂.\n4. Mantissa M: 101101 followed by 17 zeros.\n5. Hex result: C15A0000₁₆."
          },
          {
            qNum: "3",
            marks: 3.5,
            q: "Explain the Von Neumann architecture and explain why the 'Von Neumann Bottleneck' occurs.",
            sol: "1. Architecture: Single shared memory for data and instructions, connected to CPU via Address, Data, and Control buses.\n2. Bottleneck: Because instructions and data share the same physical bus, CPU processing speed is limited by bus transfer throughput."
          }
        ]
      },
      {
        name: "Section C — Comprehensive University Proofs (Any One, 8 Marks)",
        questions: [
          {
            qNum: "4",
            marks: 8,
            q: "Design a Full Adder circuit. Give its truth table, Boolean expressions for Sum and Carry, and draw the logic diagram using two Half Adders and an OR gate.",
            sol: "1. Inputs: A, B, C_in. Outputs: Sum S, Carry C_out.\n2. Truth Table:\n   (0,0,0)->S=0,C=0; (0,0,1)->S=1,C=0; (0,1,0)->S=1,C=0; (0,1,1)->S=0,C=1;\n   (1,0,0)->S=1,C=0; (1,0,1)->S=0,C=1; (1,1,0)->S=0,C=1; (1,1,1)->S=1,C=1.\n3. Equations: Sum S = A ⊕ B ⊕ C_in. Carry C_out = A·B + C_in·(A ⊕ B).\n4. Hardware Implementation: Half Adder 1 adds A and B producing S1 = A ⊕ B and C1 = A·B. Half Adder 2 adds S1 and C_in producing Sum S = S1 ⊕ C_in and C2 = S1 · C_in. An OR gate combines C1 and C2 producing C_out = C1 + C2."
          }
        ]
      }
    ]
  },

  // 6. UHV
  {
    id: "model_uhv_2026",
    subject: "UHV",
    code: "100109",
    title: "Universal Human Values (BEU Mid-Sem 2026 Model Paper)",
    colleges: "LNJPIT Chapra & BEU University Model",
    fullMarks: 20,
    timeHours: 2,
    instructions: "Answer any five questions. Question No. 1 is compulsory.",
    sections: [
      {
        name: "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        questions: [
          {
            qNum: "1(a)",
            marks: 1,
            q: "The needs of the conscious Self ('I') are:\n(i) Quantitative and temporary   (ii) Qualitative and continuous   (iii) Physiological   (iv) Material",
            sol: "Answer: (ii) Qualitative and continuous\nExplanation: The Self seeks happiness, trust, and respect continuously."
          },
          {
            qNum: "1(b)",
            marks: 1,
            q: "The foundational value in human relationships is:\n(i) Wealth   (ii) Trust (Vishwas)   (iii) Fear   (iv) Power",
            sol: "Answer: (ii) Trust (Vishwas)\nExplanation: Trust is the assurance of mutual good intention."
          },
          {
            qNum: "1(c)",
            marks: 1,
            q: "Respect (Samman) is defined as:\n(i) Praise   (ii) Right evaluation   (iii) Gifts   (iv) Submission",
            sol: "Answer: (ii) Right evaluation\nExplanation: Evaluating properly without over- or under-evaluating."
          },
          {
            qNum: "1(d)",
            marks: 1,
            q: "The feeling of responsibility in 'I' for nurturing and protecting the Body is:\n(i) Sanyama   (ii) Swasthya   (iii) Suvidha   (iv) Samadhan",
            sol: "Answer: (i) Sanyama\nExplanation: Self-regulation that leads directly to physical Swasthya (health)."
          },
          {
            qNum: "1(e)",
            marks: 1,
            q: "The comprehensive human goal sequence is:\n(i) Samadhan → Samridhi → Abhay → Sah-astitva\n(ii) Wealth → Power → Expansion → Control\n(iii) Science → Industry → Economy → Trade\n(iv) Law → Order → Police → Court",
            sol: "Answer: (i) Samadhan → Samridhi → Abhay → Sah-astitva\nExplanation: Right understanding in individual, prosperity in family, fearlessness in society, co-existence in nature."
          }
        ]
      },
      {
        name: "Section B — Short Analytical Problems (Any Two, 7 Marks)",
        questions: [
          {
            qNum: "2",
            marks: 3.5,
            q: "Differentiate between 'Trust on Intention' and 'Trust on Competence'.",
            sol: "1. Intention is innate natural acceptance to want mutual happiness (always good).\n2. Competence is ability to translate intention into action.\n3. Trusting intention unconditionally removes anger and fosters mentoring."
          },
          {
            qNum: "3",
            marks: 3.5,
            q: "Distinguish between 'Prosperity' (Samridhi) and 'Accumulation of Wealth'.",
            sol: "1. Wealth is a physical quantity.\n2. Prosperity is the qualitative feeling of having more physical facility than needed.\n3. Accumulation without right understanding leads to insecurity and exploitation."
          }
        ]
      },
      {
        name: "Section C — Comprehensive University Proofs (Any One, 8 Marks)",
        questions: [
          {
            qNum: "4",
            marks: 8,
            q: "List and explain the 9 foundational values in human relationships and show how they lead to an Undivided Society (Akhand Samaj).",
            sol: "1. The 9 Values: Trust (Vishwas), Respect (Samman), Affection (Sneha), Care (Mamata), Guidance (Vatsalya), Reverence (Shraddha), Glory (Gaurav), Gratitude (Kritagyata), Love (Prem).\n2. Progression to Undivided Society: Practicing these values begins in the family, removing mistrust and fear (Abhay), naturally expanding into community and universal human order (Akhand Samaj)."
          }
        ]
      }
    ]
  }
];
