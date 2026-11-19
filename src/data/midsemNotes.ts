// ============================================================================
// MID-SEMESTER EXAM REVISION DATA (BATCH 2026-2030, GROUP-A: LNJPIT CHAPRA)
// Units 1 & 2 for all 7 Courses (Mathematics & Computing)
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
  batch: "Batch 2026-2030 (Group A: Mathematics & Computing)",
  courses: [
    {
      code: "100102",
      short: "Math-I",
      title: "Engineering Mathematics – I",
      color: "#6366f1",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Basic Linear Algebra",
          summary: "Covers row echelon form, rank, consistency of equations, eigenvalues, Cayley-Hamilton theorem, and quadratic forms.",
          topics: [
            {
              heading: "Rank of a Matrix & Echelon Form",
              plainExplanation: "The rank of a matrix is the total number of non-zero rows left after converting it into row echelon form using row operations. In row echelon form, all rows of zeros are at the bottom, and each leading non-zero number is to the right of the leading number in the row above it.",
              keyFormula: "Rank ρ(A) = Number of non-zero rows in Row Echelon Form. For an m × n matrix, ρ(A) ≤ min(m, n).",
              examTip: "Always use elementary row operations only (R_i → R_i - k*R_j) when finding rank via Echelon form. Never mix column operations unless reducing to Normal form [I_r, 0; 0, 0]."
            },
            {
              heading: "Consistency of Linear Equations (AX = B)",
              plainExplanation: "To find if equations have solutions, write the augmented matrix [A | B] and reduce it to echelon form. Compare rank of A with rank of [A | B].",
              keyFormula: "1. ρ(A) ≠ ρ(A|B) → No solution (Inconsistent).\n2. ρ(A) = ρ(A|B) = n (number of variables) → One unique solution.\n3. ρ(A) = ρ(A|B) = r < n → Infinite solutions (with n - r free parameters).",
              examTip: "If the question asks for what values of λ and μ the system has (i) unique, (ii) infinite, or (iii) no solution, find the pivot in the last row and set it to zero or non-zero."
            },
            {
              heading: "Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem",
              plainExplanation: "Eigenvalues are special numbers λ for which A*X = λ*X. The Cayley-Hamilton theorem says that any square matrix satisfies its own characteristic equation |A - λI| = 0. If you replace λ with matrix A, the result equals the zero matrix.",
              keyFormula: "Characteristic Equation: |A - λI| = 0.\nCayley-Hamilton: A^n + c_1*A^(n-1) + ... + c_n*I = 0.\nInverse: A^(-1) = (-1/c_n) * [A^(n-1) + c_1*A^(n-2) + ... + c_(n-1)*I].\nSum of eigenvalues = Trace(A). Product of eigenvalues = Det(A).",
              examTip: "To check your eigenvalues, quickly add them up. Their sum must equal the sum of diagonal elements of matrix A."
            },
            {
              heading: "Diagonalization & Quadratic Forms",
              plainExplanation: "A matrix A can be diagonalized if it has n independent eigenvectors. Form modal matrix P using eigenvectors; then P^(-1)*A*P = D, where D is diagonal containing the eigenvalues. A quadratic form is Q = X^T*A*X.",
              keyFormula: "Nature of Quadratic Form via Eigenvalues:\n- Positive Definite: All eigenvalues > 0.\n- Negative Definite: All eigenvalues < 0.\n- Positive Semi-definite: All ≥ 0 and at least one is 0.\n- Indefinite: Some positive and some negative.",
              examTip: "Make sure matrix A for quadratic form is symmetric: a_ij = (coefficient of x_i*x_j) / 2."
            }
          ],
          standardProblems: [
            {
              q: "Find the rank of A = [[1, 2, 3], [2, 4, 7], [3, 6, 10]].",
              solution: "Step 1: R2 → R2 - 2*R1 gives [0, 0, 1].\nStep 2: R3 → R3 - 3*R1 gives [0, 0, 1].\nStep 3: R3 → R3 - R2 gives [0, 0, 0].\nResult: 2 non-zero rows remain. Therefore, Rank ρ(A) = 2."
            },
            {
              q: "Verify Cayley-Hamilton theorem for A = [[1, 4], [2, 3]] and find A^(-1).",
              solution: "Step 1: Characteristic equation |A - λI| = 0 → (1 - λ)(3 - λ) - 8 = 0 → λ^2 - 4λ - 5 = 0.\nStep 2: By theorem, A^2 - 4A - 5I = 0.\nA^2 = [[9, 16], [8, 17]]. 4A = [[4, 16], [8, 12]]. 5I = [[5, 0], [0, 5]].\nA^2 - 4A - 5I = [[0, 0], [0, 0]]. Verified!\nStep 3: Multiply by A^(-1): A - 4I - 5*A^(-1) = 0 → A^(-1) = (A - 4I)/5 = [[-3/5, 4/5], [2/5, -1/5]]."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Differential Calculus: Single Variable",
          summary: "Covers Leibnitz theorem for n-th derivatives, Rolle's, Lagrange's, Cauchy's theorems, and radius of curvature.",
          topics: [
            {
              heading: "Leibnitz's Theorem for n-th Derivative",
              plainExplanation: "Leibnitz's theorem gives a direct formula to find the n-th derivative of a product of two functions u and v, similar to the binomial expansion.",
              keyFormula: "(u*v)_n = u_n*v + n*u_(n-1)*v_1 + [n(n-1)/2!]*u_(n-2)*v_2 + ... + u*v_n.",
              examTip: "Always choose 'v' as the term whose derivatives become zero after a few steps (like x^2 or x^3). Choose 'u' as the trigonometric or exponential function."
            },
            {
              heading: "Mean Value Theorems (Rolle, Lagrange, Cauchy)",
              plainExplanation: "These theorems connect the average rate of change over an interval to the slope of a tangent at some interior point.",
              keyFormula: "- Rolle's: If f(a) = f(b), then f'(c) = 0 for some c in (a, b).\n- Lagrange's (LMVT): f'(c) = [f(b) - f(a)] / (b - a).\n- Cauchy's (CMVT): f'(c) / g'(c) = [f(b) - f(a)] / [g(b) - g(a)].",
              examTip: "Check conditions first: function must be continuous on [a, b] and differentiable on (a, b)."
            },
            {
              heading: "Curvature & Radius of Curvature (ρ)",
              plainExplanation: "Curvature measures how sharply a curve bends at a given point. The radius of curvature ρ is the radius of the circle that fits the curve closest at that point.",
              keyFormula: "Cartesian formula: ρ = [1 + (y_1)^2]^(3/2) / |y_2|, where y_1 = dy/dx and y_2 = d^2y/dx^2.\nCurvature κ = 1 / ρ.",
              examTip: "Remember the numerator has power 3/2 and the denominator has the second derivative y_2."
            }
          ],
          standardProblems: [
            {
              q: "If y = x^2 * e^(3x), find y_n using Leibnitz's theorem.",
              solution: "Let u = e^(3x) and v = x^2.\nu_n = 3^n * e^(3x), u_(n-1) = 3^(n-1) * e^(3x), u_(n-2) = 3^(n-2) * e^(3x).\nv_1 = 2x, v_2 = 2, v_3 = 0.\nBy Leibnitz: y_n = u_n*v + n*u_(n-1)*v_1 + [n(n-1)/2]*u_(n-2)*v_2\n= 3^n * e^(3x) * x^2 + n * 3^(n-1) * e^(3x) * (2x) + [n(n-1)/2] * 3^(n-2) * e^(3x) * 2\n= 3^(n-2) * e^(3x) * [9x^2 + 6nx + n(n-1)]."
            }
          ]
        }
      ]
    },
    {
      code: "100104",
      short: "Physics",
      title: "Engineering Physics",
      color: "#8b5cf6",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Wave Optics",
          summary: "Covers Newton's rings, Fraunhofer diffraction, diffraction grating, Rayleigh's criterion, and polarization.",
          topics: [
            {
              heading: "Newton's Rings (Division of Amplitude)",
              plainExplanation: "A plano-convex lens placed on a flat glass plate creates an air wedge of increasing thickness. Light reflecting from the top and bottom of the air film interferes to produce concentric bright and dark rings.",
              keyFormula: "Dark rings diameter: D_n^2 = 4*n*R*λ → D_n ∝ √n.\nBright rings diameter: D_n^2 = 2(2n - 1)*R*λ → D_n ∝ √(2n - 1).\nWavelength formula: λ = (D_(n+p)^2 - D_n^2) / (4*p*R).",
              examTip: "Central spot in reflected light is dark because reflection at the glass plate causes an extra phase shift of π (path difference of λ/2)."
            },
            {
              heading: "Fraunhofer Single Slit Diffraction",
              plainExplanation: "When parallel light waves pass through a narrow slit of width 'a', secondary wavelets interfere to produce a wide central bright band bordered by weaker secondary maxima and minima.",
              keyFormula: "Minima condition: a * sin(θ) = m * λ (where m = ±1, ±2, ...).\nCentral maximum angular width: 2θ = 2λ / a.",
              examTip: "Note that in diffraction, a*sin(θ) = m*λ gives MINIMA, whereas in double-slit interference it gives MAXIMA."
            },
            {
              heading: "Resolving Power & Rayleigh's Criterion",
              plainExplanation: "Rayleigh's rule states that two spectral lines are just separated when the principal maximum of one falls exactly on the first minimum of the other.",
              keyFormula: "Telescope angular limit: θ = 1.22 * λ / D.\nResolving power of telescope = D / (1.22 * λ).\nGrating resolving power: λ / dλ = n * N (order × total lines).",
              examTip: "Higher telescope aperture D means smaller limit θ and higher resolving power."
            }
          ],
          standardProblems: [
            {
              q: "In a Newton's rings experiment, the diameter of the 4th dark ring is 4 mm and the 16th dark ring is 8 mm. If radius of curvature R = 1 meter, find the wavelength of light.",
              solution: "Given: n = 4, D_4 = 4 mm = 4 × 10^(-3) m. n+p = 16 → p = 12, D_16 = 8 mm = 8 × 10^(-3) m. R = 1 m.\nFormula: λ = (D_(n+p)^2 - D_n^2) / (4*p*R)\n= [(8 × 10^(-3))^2 - (4 × 10^(-3))^2] / (4 × 12 × 1)\n= [64 × 10^(-6) - 16 × 10^(-6)] / 48 = 48 × 10^(-6) / 48 = 10^(-6) m = 10,000 Å (or 1 μm)."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Lasers and Optical Fiber",
          summary: "Covers Einstein's A & B coefficients, population inversion, ruby/He-Ne lasers, optical fiber TIR, and numerical aperture.",
          topics: [
            {
              heading: "Einstein's A & B Coefficients",
              plainExplanation: "Einstein showed that three processes occur between two energy levels: spontaneous emission (A_21), stimulated absorption (B_12), and stimulated emission (B_21).",
              keyFormula: "1. B_12 = B_21 (probability of absorption equals probability of stimulated emission).\n2. A_21 / B_21 = (8 * π * h * ν^3) / c^3.",
              examTip: "Ratio A_21 / B_21 is proportional to ν^3. This proves that spontaneous emission strongly dominates at optical frequencies unless population inversion is forced."
            },
            {
              heading: "Conditions for Laser Action & Components",
              plainExplanation: "A laser requires three things: an active medium with a long-lived metastable state, a pumping source to achieve population inversion (N_2 > N_1), and a pair of mirrors (optical resonator) for feedback.",
              keyFormula: "Population Inversion: N_2 > N_1 (more atoms in higher energy state than lower state).",
              examTip: "Ruby laser is a 3-level pulsed solid-state laser (wavelength 694.3 nm). He-Ne laser is a 4-level continuous gas laser (wavelength 632.8 nm)."
            },
            {
              heading: "Optical Fiber: Acceptance Angle & Numerical Aperture",
              plainExplanation: "Light travels through an optical fiber using Total Internal Reflection (TIR) inside a dense core surrounded by a lower-index cladding (n_1 > n_2).",
              keyFormula: "Acceptance Angle θ_a: sin(θ_a) = √(n_1^2 - n_2^2).\nNumerical Aperture (NA) = sin(θ_a) = √(n_1^2 - n_2^2) ≈ n_1 * √(2Δ), where Δ = (n_1 - n_2) / n_1.",
              examTip: "NA is dimensionless and measures the light-collecting power of the optical fiber."
            }
          ],
          standardProblems: [
            {
              q: "Calculate the Numerical Aperture and Acceptance Angle of an optical fiber having core index n_1 = 1.55 and cladding index n_2 = 1.50.",
              solution: "NA = √(n_1^2 - n_2^2) = √(1.55^2 - 1.50^2) = √(2.4025 - 2.25) = √0.1525 ≈ 0.3905.\nAcceptance Angle θ_a = arcsin(NA) = arcsin(0.3905) ≈ 22.98°."
            }
          ]
        }
      ]
    },
    {
      code: "100111",
      short: "BEEE",
      title: "Basics of Electrical & Electronics Engineering",
      color: "#f59e0b",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Basic Electrical Circuits",
          summary: "Covers Ohm's law, KCL, KVL, mesh and nodal analysis, divider rules, and Star-Delta conversions.",
          topics: [
            {
              heading: "Circuit Elements & Basic Laws (KCL, KVL)",
              plainExplanation: "Active elements deliver net power (battery, source); passive elements consume or store energy (R, L, C). KCL says the sum of currents entering a junction is zero (conservation of charge). KVL says the sum of voltages around any closed loop is zero (conservation of energy).",
              keyFormula: "KCL: Σ I_in = Σ I_out.\nKVL: Σ V_sources = Σ (I * R) drops.",
              examTip: "Always mark loop current directions (clockwise) and write KVL systematically to avoid sign mistakes."
            },
            {
              heading: "Star-to-Delta and Delta-to-Star Conversion",
              plainExplanation: "Used to simplify 3-terminal resistor networks that are neither purely in series nor in parallel.",
              keyFormula: "Delta to Star (Δ → Y): R_A = (R_AB * R_CA) / (R_AB + R_BC + R_CA).\nStar to Delta (Y → Δ): R_AB = R_A + R_B + (R_A * R_B) / R_C.",
              examTip: "In Δ → Y, numerator is product of two adjacent resistors; denominator is sum of all three."
            },
            {
              heading: "Mesh and Nodal Analysis",
              plainExplanation: "Mesh analysis uses KVL on loops to find loop currents. Nodal analysis uses KCL at junctions to find unknown node voltages.",
              keyFormula: "Nodal equation at node 1: (V_1 - V_A)/R_1 + V_1/R_2 + (V_1 - V_2)/R_3 = 0.",
              examTip: "For N nodes, you need (N - 1) node equations. For B branches and N nodes, you need B - N + 1 mesh equations."
            }
          ],
          standardProblems: [
            {
              q: "Three resistors of 6 Ω each are connected in Delta. Find their equivalent Star resistances.",
              solution: "Since all Delta resistors are equal (R_Δ = 6 Ω):\nR_Y = (6 * 6) / (6 + 6 + 6) = 36 / 18 = 2 Ω each.\nRule: R_Star = R_Delta / 3."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: A.C. Circuits",
          summary: "Covers RMS, average, form and peak factors, phasors, impedance, power triangle, and 3-phase systems.",
          topics: [
            {
              heading: "AC Waveform Quantities & Factors",
              plainExplanation: "An alternating sinusoidal current i = I_m * sin(ωt) changes direction periodically. RMS value is the equivalent DC value that generates the same heating effect in a resistor.",
              keyFormula: "RMS Value: V_rms = V_m / √2 ≈ 0.707 * V_m.\nAverage Value: V_avg = 2 * V_m / π ≈ 0.637 * V_m (over half cycle).\nForm Factor k_f = V_rms / V_avg = (π / 2√2) ≈ 1.11.\nPeak Factor k_p = V_m / V_rms = √2 ≈ 1.414.",
              examTip: "All AC meters (voltmeters and ammeters) measure RMS values by default."
            },
            {
              heading: "Power Triangle & Power Factor",
              plainExplanation: "In AC circuits with inductance or capacitance, current and voltage are out of phase by angle φ. Power has three parts: Real power (does useful work), Reactive power (stored in magnetic/electric fields), and Apparent power (total capacity supplied).",
              keyFormula: "Real Power (P) = V * I * cos(φ) [Watts, W]\nReactive Power (Q) = V * I * sin(φ) [VAR]\nApparent Power (S) = V * I = √(P^2 + Q^2) [VA]\nPower Factor = cos(φ) = P / S = R / Z.",
              examTip: "Inductive circuits have a lagging power factor; capacitive circuits have a leading power factor."
            },
            {
              heading: "Three-Phase Star (Y) & Delta (Δ) Systems",
              plainExplanation: "3-phase power generates three equal sinusoidal voltages 120° apart. It provides continuous power and uses less copper conductor than single-phase.",
              keyFormula: "Star (Y): V_Line = √3 * V_Phase, and I_Line = I_Phase.\nDelta (Δ): V_Line = V_Phase, and I_Line = √3 * I_Phase.\nTotal Power (both): P = √3 * V_L * I_L * cos(φ).",
              examTip: "Remember: In Star, voltages differ by √3; in Delta, currents differ by √3."
            }
          ],
          standardProblems: [
            {
              q: "A series R-L circuit with R = 30 Ω and inductive reactance X_L = 40 Ω is connected across a 230 V, 50 Hz AC supply. Find impedance, current, and power factor.",
              solution: "Step 1: Impedance Z = √(R^2 + X_L^2) = √(30^2 + 40^2) = √(900 + 1600) = √2500 = 50 Ω.\nStep 2: Current I = V / Z = 230 / 50 = 4.6 A.\nStep 3: Power Factor cos(φ) = R / Z = 30 / 50 = 0.6 (lagging)."
            }
          ]
        },
        {
          unitNo: 4,
          title: "Unit 4.0: Semiconductor Materials, Diodes & Transistors (Teacher Focus)",
          summary: "Covers intrinsic and extrinsic semiconductors, P-N junction biasing, rectifiers, Zener diode regulator, and BJT transistors (PNP/NPN).",
          topics: [
            {
              heading: "Intrinsic & Extrinsic Semiconductors",
              plainExplanation: "Intrinsic semiconductors (pure Si, Ge) have equal electron and hole concentrations (n_i = p_i). Extrinsic semiconductors are doped: N-type (Group V pentavalent dopants like P, As, Sb add free conduction electrons), P-type (Group III trivalent dopants like B, Al, Ga create holes). Mass action law: n * p = n_i^2.",
              keyFormula: "Conductivity σ = e * (n * μ_e + p * μ_h)\nMass Action Law: n * p = n_i^2 (constant at fixed temperature)",
              examTip: "Always mention donor energy levels (just below conduction band in N-type) and acceptor energy levels (just above valence band in P-type)."
            },
            {
              heading: "P-N Junction: Working, Construction & Biasing",
              plainExplanation: "Formed by joining P-type and N-type crystals. Diffusion creates a depletion region of immobile ions and a built-in barrier potential (0.7V for Si, 0.3V for Ge). Forward bias (P to +, N to -) narrows depletion width and current rises exponentially. Reverse bias (P to -, N to +) widens depletion width, leaving only a tiny minority reverse saturation current I_s.",
              keyFormula: "Diode Equation: I = I_s * [exp(V / (η * V_T)) - 1]\nThermal voltage V_T = k*T / q ≈ 26 mV at 300 K.",
              examTip: "Draw both Forward Bias and Reverse Bias connection diagrams and the V-I characteristic curve showing knee voltage."
            },
            {
              heading: "Half-Wave & Full-Wave Rectifiers",
              plainExplanation: "Rectifiers convert AC into pulsating DC. Half-wave rectifies one half cycle using 1 diode. Center-tapped full-wave rectifies both half-cycles using 2 diodes and a center-tapped transformer. Bridge rectifier uses 4 diodes without requiring a center-tapped transformer.",
              keyFormula: "Half-Wave: Efficiency η = 40.6%, Ripple Factor γ = 1.21, PIV = V_m, Output Freq = f_in.\nFull-Wave: Efficiency η = 81.2%, Ripple Factor γ = 0.482, PIV = 2*V_m (Center-tapped) or V_m (Bridge), Output Freq = 2*f_in.",
              examTip: "Exam question: Derive ripple factor γ = √( (I_rms / I_dc)^2 - 1 ). For half wave γ=1.21; for full wave γ=0.482."
            },
            {
              heading: "Zener Diode: Working & Voltage Regulation",
              plainExplanation: "A heavily doped P-N junction with a very thin depletion layer that operates safely in the reverse breakdown region without damage. Used as a shunt voltage regulator because terminal voltage V_Z remains constant across broad variations in load current and line voltage.",
              keyFormula: "V_out = V_Z (constant)\nSeries Resistor R_s = (V_in_min - V_Z) / (I_Z_min + I_L_max)",
              examTip: "Two breakdown mechanisms: Zener breakdown (quantum tunneling at < 6V) and Avalanche breakdown (impact ionization at > 6V)."
            },
            {
              heading: "Bipolar Junction Transistors (BJT): NPN & PNP",
              plainExplanation: "A 3-terminal current-controlled device. Emitter is heavily doped to inject carriers; Base is ultra-thin and lightly doped; Collector is moderately doped and largest in area to dissipate heat. In NPN, conduction is mostly by high-mobility electrons. In PNP, conduction is by holes.",
              keyFormula: "Current Relation: I_E = I_B + I_C\nCommon Emitter Gain β = I_C / I_B\nCommon Base Gain α = I_C / I_E = β / (1 + β)",
              examTip: "For active amplification mode: Emitter-Base junction must be Forward Biased, and Collector-Base junction must be Reverse Biased."
            }
          ],
          standardProblems: [
            {
              q: "A full-wave rectifier uses a load resistance of 1 kΩ and receives 230 V RMS input with 10:1 transformer ratio. Find DC output voltage, DC current, and ripple factor.",
              solution: "Secondary RMS voltage V_s = 230 / 10 = 23 V.\nPeak voltage V_m = 23 * √2 = 32.53 V.\nDC output voltage V_dc = 2 * V_m / π = (2 * 32.53) / 3.1416 = 20.71 V.\nDC current I_dc = V_dc / R_L = 20.71 / 1000 = 20.71 mA.\nRipple factor γ for any full-wave rectifier = 0.482 (or 48.2%)."
            }
          ]
        },
        {
          unitNo: 5,
          title: "Unit 5.0: Digital Logic, Number Systems & Boolean Algebra (Teacher Focus)",
          summary: "Covers positional number conversions, 1's and 2's complement arithmetic, basic & universal logic gates, and Boolean theorems.",
          topics: [
            {
              heading: "Number Systems Conversions",
              plainExplanation: "Positional weighting allows converting between base 2 (Binary), base 8 (Octal), base 10 (Decimal), and base 16 (Hexadecimal). Radix point separates integer powers (r^0, r^1, ...) from fractional negative powers (r^-1, r^-2, ...).",
              keyFormula: "Dec to Bin: Repeated division by 2 (integers) & repeated multiplication by 2 (fractions).\nOctal to Hex: Octal → 3-bit binary → group into 4 bits → Hexadecimal.",
              examTip: "Always group fractional bits starting from the radix point moving left-to-right, padding trailing zeros if needed."
            },
            {
              heading: "Basic Logic Gates & Universal Gates",
              plainExplanation: "AND, OR, NOT are basic gates. NAND and NOR are universal gates because any Boolean expression or logic gate can be built exclusively using only NAND or only NOR gates. XOR gives 1 when inputs differ.",
              keyFormula: "NAND: Y = (A · B)'\nNOR: Y = (A + B)'\nXOR: Y = A ⊕ B = A'·B + A·B'\nXNOR: Y = A ⊙ B = A·B + A'·B'",
              examTip: "Remember: NOT = 1 NAND; AND = 2 NANDs; OR = 3 NANDs; NOR = 4 NANDs; XOR = 4 NANDs."
            },
            {
              heading: "Boolean Algebra & De Morgan's Laws",
              plainExplanation: "Mathematical rules for simplifying digital logic circuits. De Morgan's theorems state that the complement of a product equals the sum of complements, and complement of a sum equals product of complements.",
              keyFormula: "De Morgan 1: (A · B)' = A' + B'\nDe Morgan 2: (A + B)' = A' · B'\nAbsorption Law: A + A·B = A;  A·(A + B) = A\nConsensus Theorem: A·B + A'·C + B·C = A·B + A'·C",
              examTip: "Exam shortcut: Break the line, change the sign! Overbar broken across AND becomes OR with separate bars."
            }
          ],
          standardProblems: [
            {
              q: "Simplify the Boolean function F = A'B + AB + AB' using Boolean algebra laws.",
              solution: "F = A'B + AB + AB'\nGroup first two terms: (A' + A)·B + AB'\nSince (A' + A) = 1: 1·B + AB' = B + AB'\nBy distributive / absorption law: B + AB' = (B + A)·(B + B') = (B + A)·1 = A + B.\nBoxed Answer: F = A + B."
            }
          ]
        }
      ]
    },
    {
      code: "100105",
      short: "IAI",
      title: "Introduction to AI",
      color: "#ec4899",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Introduction to Artificial Intelligence",
          summary: "Covers definition, history, PEAS framework, environment classifications, and agent architectures.",
          topics: [
            {
              heading: "What is AI & Rational Agents",
              plainExplanation: "AI is the study of agents that receive inputs from their environment through sensors and take actions using actuators to maximize their performance measure (rational behavior).",
              keyFormula: "Agent Function f: P* → A (maps history of percepts to actions).",
              examTip: "Distinguish between 'Thinking Humanly' (cognitive modeling) and 'Acting Rationally' (maximizing expected performance)."
            },
            {
              heading: "The PEAS Framework",
              plainExplanation: "PEAS stands for Performance measure, Environment, Actuators, and Sensors. It defines the complete task specification for designing an intelligent agent.",
              keyFormula: "PEAS Components:\n- P: Metrics measuring success (accuracy, safety, speed).\n- E: External world the agent interacts with.\n- A: Output hardware/tools to execute actions.\n- S: Input devices to observe world state.",
              examTip: "Exam favorite: Write PEAS for an Automated Taxi Driver or Medical Diagnosis System."
            },
            {
              heading: "Agent Architectures",
              plainExplanation: "There are 5 basic types of agent architectures with increasing complexity: Simple reflex, Model-based reflex, Goal-based, Utility-based, and Learning agents.",
              keyFormula: "1. Simple Reflex: Condition-action rule (If percept then action).\n2. Model-based: Keeps internal state of unseen world.\n3. Goal-based: Evaluates if actions reach a target goal.\n4. Utility-based: Chooses between multiple goals using a preference curve.\n5. Learning: Critic + Learning element to self-improve.",
              examTip: "Simple reflex agents fail when the environment is partially observable (leads to infinite loops)."
            }
          ],
          standardProblems: [
            {
              q: "Write the PEAS description for an Automated Taxi Driver agent.",
              solution: "Performance: Safe arrival, speed, legal adherence, passenger comfort, fuel economy.\nEnvironment: City roads, pedestrians, weather, traffic signals, other cars.\nActuators: Steering, accelerator, brake, blinkers, horn, display.\nSensors: Cameras, radar, LiDAR, GPS, speedometer, accelerometer."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Problem Solving by Search",
          summary: "Covers state space, uninformed search (BFS, DFS, UCS, IDDFS), informed search (Greedy, A*), and Alpha-Beta pruning.",
          topics: [
            {
              heading: "Uninformed Search Strategies",
              plainExplanation: "Uninformed search has no information about how close a state is to the goal. It only knows how to generate successors.",
              keyFormula: "BFS: Uses Queue (FIFO), Complete: Yes, Optimal: Yes (if step cost=1), Time: O(b^d), Space: O(b^d).\nDFS: Uses Stack (LIFO), Complete: No, Optimal: No, Time: O(b^m), Space: O(b*m).\nIDDFS: Combines BFS completeness with DFS linear memory O(b*d).",
              examTip: "BFS runs out of memory on large problems. IDDFS is the preferred uninformed search method."
            },
            {
              heading: "Informed Search: A* Algorithm & Heuristics",
              plainExplanation: "A* evaluates nodes using f(n) = g(n) + h(n), where g(n) is actual cost so far and h(n) is estimated cost to goal.",
              keyFormula: "Evaluation Function: f(n) = g(n) + h(n).\n- Admissible Heuristic: 0 ≤ h(n) ≤ h*(n) (never overestimates real cost). Guarantees optimality in tree search.\n- Consistent (Monotonic): h(n) ≤ c(n, a, n') + h(n'). Guarantees optimality in graph search.",
              examTip: "If h(n) = 0 everywhere, A* becomes Uniform Cost Search (Dijkstra's algorithm)."
            },
            {
              heading: "Game Playing & Alpha-Beta Pruning",
              plainExplanation: "In a 2-player zero-sum game, Minimax picks moves to maximize player profit assuming the opponent plays to minimize it. Alpha-Beta pruning cuts branches that cannot affect the decision.",
              keyFormula: "α = Best value for MAX (starts at -∞).\nβ = Best value for MIN (starts at +∞).\nPruning Rule: Prune branch whenever α ≥ β.",
              examTip: "Alpha-Beta pruning does not change the final minimax value at the root; it only skips evaluating useless child nodes."
            }
          ],
          standardProblems: [
            {
              q: "Prove why an admissible heuristic guarantees optimal solutions in A* tree search.",
              solution: "Let G2 be a suboptimal goal with path cost g(G2) > C*, and G be an optimal goal with cost C*.\nSince G2 is a goal, h(G2) = 0, so f(G2) = g(G2) > C*.\nLet n be an unexpanded node on the path to optimal goal G. Because h is admissible: f(n) = g(n) + h(n) ≤ C*.\nTherefore, f(n) ≤ C* < f(G2).\nBecause A* always expands the node with minimum f-value, node n will always be expanded before G2. Hence, G2 can never be selected, guaranteeing optimal goal G is found first."
            }
          ]
        }
      ]
    },
    {
      code: "100108",
      short: "CFET",
      title: "Computer Fundamentals & Emerging Technologies",
      color: "#06b6d4",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Fundamentals of Computer Systems",
          summary: "Covers CPU organization, memory hierarchy, cache memory, Von Neumann architecture, and compiler vs interpreter.",
          topics: [
            {
              heading: "Von Neumann Architecture & Bottleneck",
              plainExplanation: "The Von Neumann model stores both instructions and data in the same physical memory. The CPU continuously repeats the Fetch-Decode-Execute cycle.",
              keyFormula: "Functional Units: CPU (ALU + Control Unit + Registers), Memory, Input Devices, Output Devices.\nVon Neumann Bottleneck: CPU computing speed is much faster than memory bus speed, causing the CPU to wait idle for data transfers.",
              examTip: "Modern CPUs mitigate the bottleneck using high-speed SRAM caches (L1, L2, L3) and prefetching."
            },
            {
              heading: "Memory Hierarchy & Cache Memory",
              plainExplanation: "Memory is arranged in levels balancing speed, cost, and capacity. The fastest, most expensive memories are smallest and placed nearest to the CPU core.",
              keyFormula: "Order (Fastest to Slowest): Registers (<1 ns) → L1/L2/L3 Cache (SRAM, 1-10 ns) → Main RAM (DRAM, 50-100 ns) → Secondary Storage (SSD/HDD, ms) → Offline Storage.",
              examTip: "Cache hit: CPU finds data in cache. Cache miss: Data must be fetched from slower RAM."
            },
            {
              heading: "Compiler vs. Interpreter",
              plainExplanation: "Both translate human-written code into machine code, but do so differently.",
              keyFormula: "- Compiler: Translates entire program at once into an executable binary (.exe). Faster run time; displays all syntax errors together (C, C++).\n- Interpreter: Translates and executes code line-by-line. Slower execution; stops immediately at the first error (Python, JavaScript).",
              examTip: "A compiled program does not need source code or compiler to run; an interpreted program requires the interpreter present."
            }
          ],
          standardProblems: [
            {
              q: "Compare Compiler, Interpreter, and Assembler.",
              solution: "Assembler: Converts Assembly language (mnemonics like MOV, ADD) into raw machine code (0s and 1s).\nCompiler: Converts high-level code to machine code in one single complete pass, creating a standalone executable.\nInterpreter: Reads high-level source line-by-line and executes it on the fly without building a standalone binary."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Data Representation & Number Systems",
          summary: "Covers base conversions, binary arithmetic, 1's and 2's complement, ASCII, and Unicode.",
          topics: [
            {
              heading: "Number Base Conversions",
              plainExplanation: "Computers use binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16).",
              keyFormula: "Binary to Octal: Group bits in 3s from the right (e.g., 101 110_2 = 56_8).\nBinary to Hex: Group bits in 4s from the right (e.g., 1101 1010_2 = DA_16).\nHex digits: 10=A, 11=B, 12=C, 13=D, 14=E, 15=F.",
              examTip: "Always group from right to left for integers, and left to right for fractional parts."
            },
            {
              heading: "2's Complement Representation & Arithmetic",
              plainExplanation: "Used in all modern computer processors to store signed negative integers. Subtraction A - B is simply performed as addition A + (2's complement of B).",
              keyFormula: "To find 2's complement:\n1. Write positive binary number.\n2. Invert all bits (0 → 1, 1 → 0) to get 1's complement.\n3. Add 1 to the LSB.\nShortcut: From right to left, keep bits same up to first '1', then invert all remaining bits.",
              examTip: "2's complement has only one representation for zero (00000000). 1's complement had two zeros (+0 and -0), which wasted space."
            },
            {
              heading: "ASCII vs. Unicode Character Encodings",
              plainExplanation: "Text is stored as numbers using standard encoding tables.",
              keyFormula: "ASCII: 7-bit code representing 128 standard English characters (codes 0 to 127). Extended ASCII is 8-bit (256 characters).\nUnicode (UTF-8, UTF-16): Variable-length encoding up to 32 bits that supports all world languages, symbols, and mathematical notation.",
              examTip: "Standard ASCII codes to memorize: 'A' = 65, 'a' = 97, '0' = 48."
            }
          ],
          standardProblems: [
            {
              q: "Subtract (7)_10 from (13)_10 using 8-bit 2's complement arithmetic.",
              solution: "+13 in binary = 00001101_2.\n+7 in binary = 00000111_2.\nFind -7 (2's complement of +7): Invert bits → 11111000, Add 1 → 11111001_2.\nNow add (+13) + (-7):\n  00001101\n+ 11111001\n----------\n (1)00000110\nDiscard the end carry bit: Result is 00000110_2 = +6 in decimal. Correct!"
            },
            {
              q: "[Teacher Practice PDF Q1] Convert (101101101.001)_2 into octal, decimal, and hexadecimal.",
              solution: "1. Octal (groups of 3 bits around point):\nInteger: 101 101 101 = 5 5 5_8.\nFractional: .001 = .1_8.\nResult: (555.1)_8.\n2. Decimal:\n512 + 128 + 64 + 16 + 4 + 1 + 1/8 = 365 + 0.125 = (365.125)_10.\n3. Hexadecimal (groups of 4 bits):\nInteger: 0001 0110 1101 = 1 6 D_16.\nFractional: .0010 = .2_16.\nResult: (16D.2)_16."
            },
            {
              q: "[Teacher Practice PDF Q3] Find 1's and 2's complement of (a) 1000101_2 and (b) 111001_2.",
              solution: "(a) For 1000101_2:\n1's complement: Invert all bits → 0111010_2.\n2's complement: Add 1 → 0111011_2.\n\n(b) For 111001_2:\n1's complement: Invert all bits → 000110_2.\n2's complement: Add 1 → 000111_2."
            }
          ]
        },
        {
          unitNo: 3,
          title: "Unit 3.0: Operating Systems & Process Management (Teacher Practice PDF)",
          summary: "Covers OS roles, types, process lifecycle, CPU scheduling algorithms, memory management, and CLI vs GUI.",
          topics: [
            {
              heading: "Operating System Architecture & Types",
              plainExplanation: "An OS acts as an intermediary between user applications and computer hardware, managing CPU, memory, I/O devices, and file systems. Major types: Batch Systems, Time-Sharing/Multitasking Systems, Distributed Systems, Real-Time Operating Systems (Hard & Soft RTOS), and Network OS.",
              keyFormula: "Core Functions: Process Management, Memory Management, File System Management, Device/IO Management, Security/Protection.",
              examTip: "Exam question: Real-time systems (RTOS) require guaranteed deterministic deadlines; time-sharing systems maximize user responsiveness."
            },
            {
              heading: "Process vs Program & 5-State Process Model",
              plainExplanation: "A program is a passive entity stored on disk (executable file). A process is an active instance of a program in execution with its own Program Counter, stack, data, and PCB (Process Control Block). The 5 states are: New, Ready, Running, Waiting (Blocked), and Terminated.",
              keyFormula: "States: New → Ready (admitted) ↔ Running (scheduler dispatch / interrupt) → Waiting (I/O event) → Ready (I/O done) → Terminated (exit).",
              examTip: "PCB contains: Process ID (PID), Process State, Program Counter, CPU registers, Memory management info, and List of open I/O files."
            },
            {
              heading: "CPU Scheduling Algorithms",
              plainExplanation: "Determines which process in the ready queue is allocated the CPU when running process yields or gets interrupted. Non-preemptive: process keeps CPU until it completes or blocks. Preemptive: OS can forcefully preempt a running process if a higher priority process arrives.",
              keyFormula: "1. FCFS (First-Come, First-Served): Non-preemptive, simple, suffers from Convoy Effect.\n2. SJF (Shortest Job First): Provably optimal average waiting time; preemptive version is SRTF (Shortest Remaining Time First).\n3. Round Robin (RR): Time quantum q slices CPU time among ready processes. Prevents starvation.\nTurnaround Time = Completion Time - Arrival Time\nWaiting Time = Turnaround Time - Burst Time",
              examTip: "Draw a clean horizontal Gantt chart showing start and end time stamps for every process; calculate average waiting time explicitly."
            },
            {
              heading: "Memory Management & Virtual Memory",
              plainExplanation: "Organizes RAM so multiple programs can coexist safely. Paging divides physical memory into fixed-size frames and logical memory into pages; avoids external fragmentation but has minor internal fragmentation. Segmentation divides memory into logical blocks (code, stack, heap). Virtual memory uses secondary storage as an extension of RAM using demand paging.",
              keyFormula: "Physical Address = Frame Number * Frame Size + Offset\nPage Fault: Attempting to access a page not currently in physical RAM.",
              examTip: "Paging solves external fragmentation completely. Page table base register (PTBR) and TLB (Translation Lookaside Buffer) speed up address translation."
            },
            {
              heading: "User Interfaces: CLI vs GUI",
              plainExplanation: "Command Line Interface (CLI) accepts typed text commands; consumes minimal memory, highly scriptable, faster for developers and system administrators. Graphical User Interface (GUI) uses windows, icons, menus, and pointers (WIMP); user-friendly, visual feedback, but requires higher memory and GPU/CPU resources.",
              keyFormula: "CLI: High speed, low memory, scriptable, steep learning curve (Bash, PowerShell).\nGUI: Intuitive, visual, multitasking friendly, heavy resource footprint (Windows, macOS).",
              examTip: "Compare CLI vs GUI on 4 parameters: Resource consumption, speed for experts, automation/scripting, and beginner friendliness."
            }
          ],
          standardProblems: [
            {
              q: "Three processes P1 (Burst=6ms, Arrival=0), P2 (Burst=4ms, Arrival=1), and P3 (Burst=2ms, Arrival=2) arrive in ready queue. Calculate average waiting time under non-preemptive FCFS.",
              solution: "Gantt Chart:\n[P1: 0 to 6] -> [P2: 6 to 10] -> [P3: 10 to 12]\nCompletion Times: P1 = 6, P2 = 10, P3 = 12.\nTurnaround Time (CT - AT):\nP1: 6 - 0 = 6 ms\nP2: 10 - 1 = 9 ms\nP3: 12 - 2 = 10 ms\nWaiting Time (TAT - BT):\nP1: 6 - 6 = 0 ms\nP2: 9 - 4 = 5 ms\nP3: 10 - 2 = 8 ms\nAverage Waiting Time = (0 + 5 + 8) / 3 = 13 / 3 = 4.33 ms."
            }
          ]
        }
      ]
    },
    {
      code: "100109",
      short: "UHV",
      title: "Universal Human Values",
      color: "#22c55e",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Self-Exploration, Happiness & Prosperity",
          summary: "Covers the process of self-exploration, natural acceptance, continuous happiness, and prosperity.",
          topics: [
            {
              heading: "Self-Exploration & Natural Acceptance",
              plainExplanation: "Self-exploration is the process of observing within ourselves what is naturally acceptable to us, rather than blindly accepting beliefs from outside.",
              keyFormula: "Two core mechanisms:\n1. Natural Acceptance (unconditional inner sense of what feels right).\n2. Experiential Validation (living according to it and observing harmony).",
              examTip: "Natural acceptance is invariant with time, place, and culture; beliefs change, but natural acceptance does not."
            },
            {
              heading: "Continuous Happiness and Prosperity",
              plainExplanation: "Happiness is a state of inner harmony and peace. Prosperity is the feeling of having more physical facilities than what is genuinely required.",
              keyFormula: "Needs of Human Being = Continuous Happiness (for the Self/I) + Physical Facilities (for the Body).",
              examTip: "Physical facilities are limited and quantitative; feelings of happiness and trust are qualitative and continuous."
            }
          ],
          standardProblems: [
            {
              q: "Differentiate between prosperity and wealth.",
              solution: "Wealth is simply a physical quantity (money, property). Prosperity is an internal feeling that one has more than enough physical resources to live well and nurture others. A wealthy person can still feel deprived if they greedily want more."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Relationship, Physical Facility & Human Being",
          summary: "Covers the co-existence of sentient 'Self' (I) and material 'Body', and the hierarchy of human needs.",
          topics: [
            {
              heading: "Human Being as Co-existence of Self ('I') and Body",
              plainExplanation: "A human being is not just a biological body; it is the conscious partnership of the conscious 'Self' (I) and the material 'Body'.",
              keyFormula: "Table of Differences:\n- Self ('I'): Conscious, needs respect & trust, continuous needs, activities: desire, thought, expectation.\n- Body: Material/Physico-chemical, needs food & shelter, temporary needs, activities: breathing, heart rate.",
              examTip: "Exam question: Explain 'I' as the seer, doer, and enjoyer, while Body is the instrument."
            },
            {
              heading: "Right Understanding, Relationship, and Physical Facility",
              plainExplanation: "Human fulfillment requires three things in correct priority order: 1. Right Understanding (in Self), 2. Harmonious Relationships (with humans), 3. Physical Facilities (with nature).",
              keyFormula: "Priority: Right Understanding → Relationship (Mutual Happiness) → Physical Facility (Mutual Prosperity).",
              examTip: "Focusing only on physical facility while ignoring relationships leads to exploitation and dissatisfaction."
            }
          ],
          standardProblems: [
            {
              q: "Why are physical facilities necessary but not sufficient for human happiness?",
              solution: "Physical facilities fulfill only biological needs (hunger, protection from weather). Mental and emotional needs like respect, trust, and purpose belong to the conscious Self ('I') and cannot be solved with material items."
            }
          ]
        }
      ]
    },
    {
      code: "100110",
      short: "EIC",
      title: "Essence of Indian Constitution",
      color: "#ef4444",
      units: [
        {
          unitNo: 1,
          title: "Unit 1.0: Constitution and Preamble",
          summary: "Covers historical perspective, meaning, salient features, and the Preamble of the Indian Constitution.",
          topics: [
            {
              heading: "Meaning & Historical Perspective",
              plainExplanation: "The Constitution is the supreme legal document that establishes the structure of government, defines powers, and protects citizen rights. Drafted by the Constituent Assembly under Dr. B.R. Ambedkar and adopted on 26 Nov 1949 (came into effect 26 Jan 1950).",
              keyFormula: "Key Features: Longest written constitution, blend of rigidity and flexibility, parliamentary form, federal system with unitary bias, independent judiciary.",
              examTip: "Remember the 42nd Constitutional Amendment Act (1976) added three key words to the Preamble: 'Socialist', 'Secular', and 'Integrity'."
            },
            {
              heading: "The Preamble to the Constitution",
              plainExplanation: "The Preamble is the introductory statement stating the guiding philosophy, source of authority, and objectives of the Constitution.",
              keyFormula: "Opening Words: 'WE, THE PEOPLE OF INDIA...'\nNature of State: Sovereign, Socialist, Secular, Democratic, Republic.\nObjectives: Justice (Social, Economic, Political), Liberty (Thought, Expression, Belief, Faith, Worship), Equality (Status, Opportunity), Fraternity.",
              examTip: "In the Kesavananda Bharati case (1973), the Supreme Court ruled that the Preamble IS part of the Constitution and can be amended without altering basic structure."
            }
          ],
          standardProblems: [
            {
              q: "Explain the four core objectives enshrined in the Preamble.",
              solution: "1. Justice: Fair distribution of social benefits, removal of economic disparities, and equal political rights.\n2. Liberty: Freedom of thought, belief, and expression necessary for individual growth.\n3. Equality: Absence of special privilege and equal opportunities for all citizens.\n4. Fraternity: A sense of common brotherhood assuring individual dignity and national unity."
            }
          ]
        },
        {
          unitNo: 2,
          title: "Unit 2.0: Fundamental Rights and Duties",
          summary: "Covers Part-III Fundamental Rights (Articles 12-35) and Part-IVA Fundamental Duties (Article 51A).",
          topics: [
            {
              heading: "Fundamental Rights (Part-III, Articles 12–35)",
              plainExplanation: "Basic civil and political freedoms guaranteed to citizens against arbitrary state action, enforceable directly by courts under Article 32.",
              keyFormula: "The 6 Fundamental Rights:\n1. Right to Equality (Articles 14–18)\n2. Right to Freedom (Articles 19–22)\n3. Right against Exploitation (Articles 23–24)\n4. Right to Freedom of Religion (Articles 25–28)\n5. Cultural and Educational Rights (Articles 29–30)\n6. Right to Constitutional Remedies (Article 32 - called the 'Heart and Soul' by Dr. Ambedkar).",
              examTip: "The Right to Property was removed from Fundamental Rights by the 44th Amendment (1978) and made a legal right under Article 300A."
            },
            {
              heading: "Fundamental Duties (Part-IVA, Article 51A)",
              plainExplanation: "Moral obligations of citizens to uphold national integrity and progress. Added by the 42nd Amendment (1976) on the recommendation of the Swaran Singh Committee.",
              keyFormula: "Total: 11 duties. Includes respecting the National Flag, cherishing freedom struggle ideals, protecting national heritage, and developing scientific temper. The 11th duty (education for children 6-14) was added by 86th Amendment (2002).",
              examTip: "Fundamental Duties are non-justiciable (cannot be directly enforced by courts, but serve as constitutional interpretation guides)."
            }
          ],
          standardProblems: [
            {
              q: "Why is Article 32 considered the 'Heart and Soul' of the Constitution?",
              solution: "A right without a remedy is useless. Article 32 gives every citizen the right to move directly to the Supreme Court for enforcement of fundamental rights through writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, and Certiorari). Without Article 32, other rights would be mere paper declarations."
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
// GEC Lakhisarai, GEC Bhojpur, GEC Aurangabad, GEC Samastipur (Batch 2026-2030)
// ============================================================================

export const BEU_REAL_PAPERS_2026: BeuPaper[] = [
  {
    "id": "beu_math1_2026",
    "subject": "Math-I",
    "code": "100102",
    "title": "Engineering Mathematics – I (BEU Mid-Sem 2026)",
    "colleges": "GEC Bhojpur & GEC Lakhisarai",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Answer any five questions. Question No. 1 is compulsory.",
    "sections": [
      {
        "name": "Part A — Objective & Conceptual (Compulsory, 5 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "q": "The value of lim (x -> 0) (1 + x)^(1/x) is:\n(i) 1   (ii) 0   (iii) e   (iv) -e",
            "sol": "Answer: (iii) e\nExplanation: Let L = lim (x -> 0) (1 + x)^(1/x). Taking natural log: ln L = lim (x -> 0) ln(1 + x) / x = [0/0 form]. By L'Hôpital's Rule: lim (x -> 0) [1/(1 + x)] / 1 = 1. Therefore, L = e^1 = e."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "q": "If f(x) is continuous in [a, b], f'(x) exists in (a, b) and f(a) = f(b), then there exists at least one value c (a < c < b) such that f'(c) = 0. This is called:\n(i) Taylor's theorem   (ii) Rolle's theorem   (iii) Lagrange's mean value theorem   (iv) None",
            "sol": "Answer: (ii) Rolle's theorem\nExplanation: This is the exact classical statement of Rolle's Theorem in differential calculus."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "q": "In Maxima & Minima of two variables, if rt - s^2 < 0, then the critical point is called:\n(i) Maxima at that point   (ii) Saddle point   (iii) Minima at that point   (iv) None of these",
            "sol": "Answer: (ii) Saddle point\nExplanation: Here r = f_xx, s = f_xy, t = f_yy. When Discriminant D = rt - s^2 < 0, the Hessian matrix has eigenvalues of opposite signs, meaning the surface curves up in one direction and down in another (a minimax / saddle point)."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "q": "The eigenvalues of the diagonal matrix diag(1, 2, 3) are:\n(i) 1, 2, 3   (ii) 1, 2, 5   (iii) 0, 1, 4   (iv) None of these",
            "sol": "Answer: (i) 1, 2, 3\nExplanation: The characteristic determinant of a diagonal matrix is |A - λI| = (1 - λ)(2 - λ)(3 - λ) = 0. Hence the eigenvalues are precisely the diagonal entries: λ = 1, 2, 3."
          },
          {
            "qNum": "1(e)",
            "marks": 1,
            "q": "Which operation is NOT an elementary row operation?\n(a) Swapping two rows   (b) Adding a multiple of one row to another   (c) Multiplying a row by zero   (d) Multiplying a row by a non-zero constant",
            "sol": "Answer: (c) Multiplying a row by zero\nExplanation: Elementary row operations must be reversible. Multiplying by zero destroys information and reduces row rank, so it is strictly prohibited."
          },
          {
            "qNum": "1(f)",
            "marks": 1,
            "q": "If f(x) = e^x and g(x) = e^(-x) are defined on [2, 3], find the value of c in Cauchy's mean value theorem:\n(a) 1.5   (b) 2.5   (c) 2.3   (d) 2.6",
            "sol": "Answer: (b) 2.5\nExplanation: By Cauchy's Mean Value Theorem: [f'(c) / g'(c)] = [f(3) - f(2)] / [g(3) - g(2)].\nf'(c) / g'(c) = e^c / (-e^-c) = -e^(2c).\n[f(3) - f(2)] / [g(3) - g(2)] = [e^3 - e^2] / [e^-3 - e^-2] = [e^2(e - 1)] / [e^-3(1 - e)] = -e^5.\nEquating: -e^(2c) = -e^5  ==>  2c = 5  ==>  c = 2.5. Since 2.5 lies in (2, 3), c = 2.5."
          }
        ]
      },
      {
        "name": "Part B — Numericals, Theorems & Derivations (15 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 5,
            "q": "State Cayley-Hamilton Theorem. Find the characteristic equation of matrix A = [[2, 1, 1], [0, 1, 0], [1, 1, 2]], and find A^-1 by Cayley-Hamilton. Also find the matrix represented by: P(A) = A^8 - 5A^7 + 7A^6 - 3A^5 + A^4 - 5A^3 + 8A^2 - 2A + I.",
            "sol": "Step 1: Statement of Cayley-Hamilton Theorem:\nEvery square matrix satisfies its own characteristic equation, i.e., if |A - λI| = 0 gives λ^n + c_{n-1}λ^{n-1} + ... + c_0 = 0, then A^n + c_{n-1}A^{n-1} + ... + c_0 I = O.\n\nStep 2: Characteristic Equation of A:\n|A - λI| = | [2-λ, 1, 1], [0, 1-λ, 0], [1, 1, 2-λ] | = (1 - λ) * [(2 - λ)^2 - 1] = 0\n(1 - λ) * [λ^2 - 4λ + 3] = 0  ==>  -(λ^3 - 5λ^2 + 7λ - 3) = 0\n==> Characteristic Equation: λ^3 - 5λ^2 + 7λ - 3 = 0.\n\nStep 3: By Cayley-Hamilton Theorem:\nA^3 - 5A^2 + 7A - 3I = O.\nMultiply by A^-1:\nA^2 - 5A + 7I - 3A^-1 = O  ==>  3A^-1 = A^2 - 5A + 7I.\nCompute A^2:\nA^2 = [[2,1,1],[0,1,0],[1,1,2]] * [[2,1,1],[0,1,0],[1,1,2]] = [[5,4,4],[0,1,0],[4,4,5]].\nA^2 - 5A + 7I = [[5,4,4],[0,1,0],[4,4,5]] - [[10,5,5],[0,5,0],[5,5,10]] + [[7,0,0],[0,7,0],[0,0,7]] = [[2,-1,-1],[0,3,0],[-1,-1,2]].\n==> A^-1 = (1/3) * [[2, -1, -1], [0, 3, 0], [-1, -1, 2]].\n\nStep 4: Reduce Polynomial P(A):\nGroup terms using (A^3 - 5A^2 + 7A - 3I = O):\nP(A) = A^5(A^3 - 5A^2 + 7A - 3I) + A(A^3 - 5A^2 + 7A - 3I) + A^2 + A + I\n= A^5(O) + A(O) + A^2 + A + I = A^2 + A + I.\nA^2 + A + I = [[5,4,4],[0,1,0],[4,4,5]] + [[2,1,1],[0,1,0],[1,1,2]] + [[1,0,0],[0,1,0],[0,0,1]]\n= [[8, 5, 5], [0, 3, 0], [5, 5, 8]].\n\nFinal Boxed Answer: P(A) = [[8, 5, 5], [0, 3, 0], [5, 5, 8]]."
          },
          {
            "qNum": "3",
            "marks": 5,
            "q": "Investigate for what values of λ and μ the system of linear equations:\nx + y + z = 6\nx + 2y + 3z = 10\nx + 2y + λz = μ\nhas: (i) No solution, (ii) A unique solution, (iii) Infinitely many solutions.",
            "sol": "Step 1: Form the Augmented Matrix [A | B]:\n[A | B] = [ [1, 1, 1 | 6], [1, 2, 3 | 10], [1, 2, λ | μ] ]\n\nStep 2: Elementary Row Operations to Row Echelon Form:\nR2 -> R2 - R1:\n[ [1, 1, 1 | 6], [0, 1, 2 | 4], [1, 2, λ | μ] ]\nR3 -> R3 - R1:\n[ [1, 1, 1 | 6], [0, 1, 2 | 4], [0, 1, λ-1 | μ-6] ]\nR3 -> R3 - R2:\n[ [1, 1, 1 | 6], [0, 1, 2 | 4], [0, 0, λ-3 | μ-10] ]\n\nStep 3: Analyze Consistency & Rank:\nCase (i) No Solution:\nSystem is inconsistent when Rank(A) != Rank(A | B).\nThis happens when λ - 3 = 0 and μ - 10 != 0.\n==> λ = 3 and μ != 10.\n\nCase (ii) Unique Solution:\nSystem has a unique solution when Rank(A) = Rank(A | B) = 3 (number of unknowns).\nThis happens when λ - 3 != 0 (regardless of value of μ).\n==> λ != 3 (μ can be any real number).\n\nCase (iii) Infinitely Many Solutions:\nSystem has infinite solutions when Rank(A) = Rank(A | B) < 3.\nThis happens when λ - 3 = 0 and μ - 10 = 0.\n==> λ = 3 and μ = 10."
          },
          {
            "qNum": "4",
            "marks": 5,
            "q": "If y = (sin^-1 x)^2, show that (1 - x^2)y_{n+2} - (2n + 1)x y_{n+1} - n^2 y_n = 0. Hence find (y_n)_0.",
            "sol": "Step 1: First and second derivatives:\ny = (sin^-1 x)^2\ny_1 = 2(sin^-1 x) * (1 / √(1 - x^2))\n==> √(1 - x^2) * y_1 = 2 sin^-1 x\nSquaring both sides:\n(1 - x^2) * (y_1)^2 = 4(sin^-1 x)^2 = 4y\nDifferentiate with respect to x:\n(1 - x^2) * 2y_1 y_2 + (-2x) * (y_1)^2 = 4y_1\nDivide throughout by 2y_1 (y_1 != 0):\n(1 - x^2)y_2 - x y_1 - 2 = 0\n\nStep 2: Apply Leibniz's Theorem for n-th derivative:\nD^n[(1 - x^2)y_2] - D^n[x y_1] - D^n[2] = 0\n[ (1 - x^2)y_{n+2} + n(-2x)y_{n+1} + (n(n-1)/2)(-2)y_n ] - [ x y_{n+1} + n(1)y_n ] = 0\n(1 - x^2)y_{n+2} - 2nx y_{n+1} - n(n-1)y_n - x y_{n+1} - n y_n = 0\n(1 - x^2)y_{n+2} - (2n + 1)x y_{n+1} - [n(n-1) + n]y_n = 0\n==> (1 - x^2)y_{n+2} - (2n + 1)x y_{n+1} - n^2 y_n = 0. (Proved!)\n\nStep 3: Evaluate at x = 0 to find (y_n)_0:\nSubstitute x = 0:\n(y_{n+2})_0 = n^2 * (y_n)_0\nAt x = 0:\ny(0) = 0 ==> (y_0)_0 = 0\ny_1(0) = 0 ==> (y_1)_0 = 0\ny_2(0) - 0 - 2 = 0 ==> (y_2)_0 = 2\nFor odd n: Since (y_1)_0 = 0, (y_3)_0 = 1^2*(y_1)_0 = 0 ==> (y_n)_0 = 0 for all odd n.\nFor even n: (y_2)_0 = 2, (y_4)_0 = 2^2*(y_2)_0 = 2^2 * 2, (y_6)_0 = 4^2*(y_4)_0 = 4^2 * 2^2 * 2\nIn general for n = 2m (even):\n(y_n)_0 = 2 * (n - 2)^2 * (n - 4)^2 * ... * 4^2 * 2^2."
          },
          {
            "qNum": "5",
            "marks": 5,
            "q": "If u = sin^-1((x + y)/(√x + √y)), prove that:\n(i) x (∂u/∂x) + y (∂u/∂y) = (1/2) tan u\n(ii) x^2 (∂^2 u/∂x^2) + 2xy (∂^2 u/∂x∂y) + y^2 (∂^2 u/∂y^2) = (-sin u cos 2u) / (4 cos^3 u).",
            "sol": "Step 1: Let z = sin u = (x + y)/(√x + √y).\nTest homogeneity: z(tx, ty) = (tx + ty)/(√(tx) + √(ty)) = t(x + y) / (t^(1/2)(√x + √y)) = t^(1/2) * z.\nThus, z is a homogeneous function of degree n = 1/2 in x and y.\n\nStep 2: Apply Euler's Theorem for z:\nx (∂z/∂x) + y (∂z/∂y) = n * z = (1/2) * z\nSince z = sin u:\n∂z/∂x = cos u * (∂u/∂x), and ∂z/∂y = cos u * (∂u/∂y)\nx (cos u ∂u/∂x) + y (cos u ∂u/∂y) = (1/2) sin u\nDivide by cos u:\n==> x (∂u/∂x) + y (∂u/∂y) = (1/2) tan u. (Part (i) Proved!)\n\nStep 3: Part (ii) using Euler's Deduction Formula:\nLet g(u) = (1/2) tan u.\nThen x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = g(u) * [g'(u) - 1].\ng'(u) = (1/2) sec^2 u.\ng(u) * [g'(u) - 1] = (1/2 tan u) * [1/2 sec^2 u - 1] = (sin u / 2 cos u) * [(1 - 2 cos^2 u) / (2 cos^2 u)]\nSince (1 - 2 cos^2 u) = -cos 2u:\n= (sin u * (-cos 2u)) / (4 cos^3 u) = (-sin u cos 2u) / (4 cos^3 u). (Part (ii) Proved!)"
          }
        ]
      }
    ]
  },
  {
    "id": "beu_beee_2026",
    "subject": "BEEE",
    "code": "100111",
    "title": "Basics of Electrical & Electronics Engineering (BEU Mid-Sem 2026)",
    "colleges": "GEC Lakhisarai",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Section A: Attempt any 6 out of 7 (1 mark each). Section B: Attempt any 7 out of 8 (2 marks each).",
    "sections": [
      {
        "name": "Section A — Objective / Short Answer (6 Marks)",
        "questions": [
          {
            "qNum": "Q1",
            "marks": 1,
            "q": "The power factor in an AC circuit is defined as the ratio of:\n(i) Active power to reactive power\n(ii) Apparent power to active power\n(iii) Active power to apparent power\n(iv) Apparent power to reactive power",
            "sol": "Answer: (iii) Active power to apparent power\nFormula: Power Factor (cos φ) = P / S = (Real Active Power in Watts) / (Total Apparent Power in VA) = R / Z."
          },
          {
            "qNum": "Q2",
            "marks": 1,
            "q": "A star-connected network has arms 3 Ω, 3 Ω, and 3 Ω. The equivalent delta resistance of each side is:\n(i) 3 Ω   (ii) 6 Ω   (iii) 9 Ω   (iv) 12 Ω",
            "sol": "Answer: (iii) 9 Ω\nCalculation: For three equal resistors in star R_Y = 3 Ω, the equivalent delta resistance is R_Δ = 3 * R_Y = 3 * 3 = 9 Ω."
          },
          {
            "qNum": "Q3",
            "marks": 1,
            "q": "A 12 V DC source feeds two series resistors of 2 Ω and 4 Ω. The voltage across the 4 Ω resistor is:\n(i) 4 V   (ii) 6 V   (iii) 8 V   (iv) 12 V",
            "sol": "Answer: (iii) 8 V\nCalculation: Total resistance R_total = 2 + 4 = 6 Ω. Current I = 12V / 6Ω = 2 A. Voltage across 4 Ω = I * R = 2 A * 4 Ω = 8 V."
          },
          {
            "qNum": "Q4",
            "marks": 1,
            "q": "Write two examples of unilateral and bilateral elements.",
            "sol": "Unilateral Elements (conduction depends on polarity): Diode, BJT Transistor.\nBilateral Elements (conduction same in both directions): Resistor, Inductor (or Capacitor)."
          },
          {
            "qNum": "Q5",
            "marks": 1,
            "q": "Which of the following elements of electrical engineering CANNOT be analysed using Ohm's law?\n(i) Resistor   (ii) Capacitor   (iii) Inductor   (iv) Transistor",
            "sol": "Answer: (iv) Transistor\nExplanation: Ohm's law V = IR applies only to linear, bilateral elements. Transistors are non-linear active semiconductor devices where V-I relationship is non-linear."
          },
          {
            "qNum": "Q6",
            "marks": 1,
            "q": "State Ohm's Law with proper mathematical expression and write its limitation.",
            "sol": "Statement: At constant temperature and physical dimensions, the current I flowing through a conductor is directly proportional to the potential difference V across its terminals: V = I * R (where R is resistance in Ohms).\nLimitations: Does not hold for non-linear devices (diodes, vacuum tubes, transistors), electrolytes, or when operating temperature varies."
          },
          {
            "qNum": "Q7",
            "marks": 1,
            "q": "Kirchhoff's Current Law (KCL) is based on the law of conservation of:\n(i) Energy   (ii) Charge   (iii) Momentum   (iv) Mass",
            "sol": "Answer: (ii) Charge\nExplanation: KCL states Σ I_in = Σ I_out at any junction; charge cannot accumulate or disappear at a node."
          }
        ]
      },
      {
        "name": "Section B — Short Answer / Numerical Questions (14 Marks)",
        "questions": [
          {
            "qNum": "Q1",
            "marks": 2,
            "q": "An unknown impedance of Z Ω is connected in series with (5 + j8) Ω. If the current in the circuit is I = 2.5∠-15° A and supply voltage is V = 50∠45° V, find the value of Z.",
            "sol": "Step 1: Total circuit impedance Z_total = V / I:\nZ_total = (50∠45°) / (2.5∠-15°) = (50 / 2.5) ∠ (45° - (-15°)) = 20∠60° Ω.\n\nStep 2: Convert to rectangular form:\nZ_total = 20 * (cos 60° + j sin 60°) = 20 * (0.5 + j 0.866) = (10 + j 17.32) Ω.\n\nStep 3: Solve for unknown Z:\nZ_total = Z + Z_known  ==>  Z = Z_total - (5 + j8)\nZ = (10 + j 17.32) - (5 + j 8) = (5 + j 9.32) Ω.\n\nFinal Boxed Answer: Z = (5 + j 9.32) Ω (or in polar form: 10.58∠61.79° Ω)."
          },
          {
            "qNum": "Q2",
            "marks": 2,
            "q": "Define and compare average value, RMS value, form factor, and peak factor for sinusoidal waveforms.",
            "sol": "1. Average Value (V_avg): Mean of all instantaneous values over half cycle = (2/π) * V_m ≈ 0.637 V_m.\n2. RMS Value (V_rms): Effective DC heating equivalent = V_m / √2 ≈ 0.707 V_m.\n3. Form Factor (k_f): Ratio of RMS to Average value = V_rms / V_avg = (V_m/√2) / (2V_m/π) = π / (2√2) ≈ 1.11.\n4. Peak Factor (k_p): Ratio of Peak to RMS value = V_m / V_rms = V_m / (V_m/√2) = √2 ≈ 1.414."
          },
          {
            "qNum": "Q3",
            "marks": 2,
            "q": "Explain the concept of phasors. How are sinusoidally varying voltages and currents represented using phasors?",
            "sol": "A phasor is a complex number / rotating vector that represents the amplitude (magnitude) and phase angle of a sinusoidal function with fixed frequency ω.\nIf v(t) = V_m * sin(ωt + θ), its phasor representation is V = (V_m / √2) ∠ θ (RMS phasor) or V_m ∠ θ (peak phasor).\nPhasors convert differential calculus equations in AC circuits into simple complex algebraic operations (Ohm's law in AC: V = I * Z)."
          },
          {
            "qNum": "Q5",
            "marks": 2,
            "q": "Explain Maximum Power Transfer theorem. Find the value of R_L at which maximum power is transferred to the load in the bridge circuit with 18V source, 5Ω, 6Ω, 4Ω, 12Ω resistors, and 30V source. Also find maximum power.",
            "sol": "Step 1: Statement:\nMaximum power is delivered from a linear source network to a load resistor R_L when R_L is equal to the Thevenin resistance R_th seen from the load terminals (R_L = R_th).\n\nStep 2: Find R_th across load terminals:\nDe-activate all independent voltage sources (replace with short circuits):\nLooking back from load R_L: R_th = 4 + [ (5 + 7) || 6 ] = 4 + [ 12 || 6 ] = 4 + (12 * 6)/(12 + 6) = 4 + 4 = 8 Ω.\n==> Value of R_L for maximum power = 8 Ω.\n\nStep 3: Maximum Power Formula:\nP_max = (V_th)^2 / (4 * R_th) Watts."
          },
          {
            "qNum": "Q6",
            "marks": 2,
            "q": "Explain Thevenin's and Norton's Theorems. How can one be derived from the other?",
            "sol": "Thevenin's Theorem: Any linear two-terminal DC network can be replaced by an equivalent voltage source V_th in series with resistance R_th.\nNorton's Theorem: Any linear two-terminal DC network can be replaced by an equivalent current source I_N in parallel with resistance R_N.\nInterconversion (Source Transformation):\nR_th = R_N = V_oc / I_sc\nV_th = I_N * R_th\nI_N = V_th / R_th."
          },
          {
            "qNum": "Q8",
            "marks": 2,
            "q": "Explain the terms: (a) Impedance, (b) Admittance, (c) Power triangle, (d) Impedance triangle.",
            "sol": "(a) Impedance (Z): Total opposition offered by AC circuit to current flow; Z = R + jX [Ohms, Ω].\n(b) Admittance (Y): Reciprocal of impedance; measure of ease of current flow; Y = 1/Z = G + jB [Siemens, S].\n(c) Power Triangle: Right-angled triangle with Real Power P = VI cos φ (horizontal, W), Reactive Power Q = VI sin φ (vertical, VAR), and Apparent Power S = VI (hypotenuse, VA). S^2 = P^2 + Q^2.\n(d) Impedance Triangle: Right-angled triangle with Resistance R (horizontal), Reactance X = X_L - X_C (vertical), and Impedance Z = √(R^2 + X^2) (hypotenuse). cos φ = R / Z."
          }
        ]
      }
    ]
  },
  {
    "id": "beu_cfet_2026",
    "subject": "CFET",
    "code": "100108",
    "title": "Computer Fundamentals & Emerging Technologies (BEU Mid-Sem 2026)",
    "colleges": "GEC Lakhisarai & GEC Aurangabad",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "All questions are compulsory. Show intermediate steps for all numericals.",
    "sections": [
      {
        "name": "Section A — Conceptual MCQs & Quick Answers (5 Marks)",
        "questions": [
          {
            "qNum": "1.A",
            "marks": 0.5,
            "q": "Which of the following is a volatile memory?\na) ROM   b) RAM   c) Hard disk   d) Flash drive",
            "sol": "Answer: b) RAM\nExplanation: RAM loses its stored data when power is switched off (volatile), whereas ROM, HDD, and flash drive retain data permanently."
          },
          {
            "qNum": "1.B",
            "marks": 0.5,
            "q": "In Von Neumann architecture, program and data are stored in:\na) Separate memories   b) Same memory   c) ROM   d) Cache",
            "sol": "Answer: b) Same memory\nExplanation: The defining characteristic of the Von Neumann architecture (stored-program concept) is that both instructions (program) and data share the same unified physical memory space and bus."
          },
          {
            "qNum": "1.C",
            "marks": 0.5,
            "q": "Which register holds the memory address of the next instruction to be fetched from RAM?\na) Memory Buffer Register (MBR)   b) Program Counter (PC)   c) Instruction Register (IR)   d) Accumulator (ACC)",
            "sol": "Answer: b) Program Counter (PC)\nExplanation: PC holds the address of the next sequential instruction to fetch. MBR holds data read from memory, IR holds the currently executing instruction, and ACC holds ALU intermediate results."
          },
          {
            "qNum": "1.D",
            "marks": 0.5,
            "q": "What is the 8-bit 2's complement representation of decimal integer -25?\na) 11100111   b) 11100110   c) 11100101   d) 10011001",
            "sol": "Answer: a) 11100111\nCalculation: +25 in 8-bit binary = 00011001_2.\nInvert all bits (1's complement) = 11100110_2.\nAdd 1 (2's complement) = 11100111_2."
          },
          {
            "qNum": "1.E",
            "marks": 0.5,
            "q": "Convert hexadecimal (4F.C)_16 into its equivalent octal representation:\na) (117.6)_8   b) (117.3)_8   c) (137.6)_8   d) (117.14)_8",
            "sol": "Answer: a) (117.6)_8\nCalculation:\nHex to Binary: 4 = 0100, F = 1111, C = 1100 ==> (0100 1111 . 1100)_2.\nRegroup in 3-bit octal clusters from radix point:\nInteger: 001 | 001 | 111 = 1 | 1 | 7.\nFraction: 110 | (0...) = 6.\nResult: (117.6)_8."
          },
          {
            "qNum": "1.F",
            "marks": 0.5,
            "q": "Standard ASCII uses how many bits to represent a character?\na) 5   b) 7   c) 8   d) 16",
            "sol": "Answer: b) 7\nExplanation: Standard ASCII uses 7 bits (allowing 2^7 = 128 characters from 0 to 127). Extended ASCII uses 8 bits."
          }
        ]
      },
      {
        "name": "Section B — Architecture, Memory & Number Systems (15 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 2,
            "q": "A computer system has a cache access time of 10 ns, main memory access time of 100 ns, and a cache hit ratio of 0.9. Calculate the average memory access time (T_avg).",
            "sol": "Given:\nCache access time (T_c) = 10 ns\nMain memory access time (T_m) = 100 ns\nCache hit ratio (h) = 0.9\nMiss ratio = 1 - h = 1 - 0.9 = 0.1\n\nFormula:\nT_avg = h * T_c + (1 - h) * T_m\n\nCalculation:\nT_avg = (0.9 * 10 ns) + (0.1 * 100 ns)\nT_avg = 9 ns + 10 ns = 19 ns.\n\nFinal Boxed Answer: Average Memory Access Time = 19 ns."
          },
          {
            "qNum": "3",
            "marks": 4,
            "q": "Consider the equation (123)_5 = (x8)_y with x and y as unknown. Find the number of possible solutions, and determine all valid (x, y) pairs.",
            "sol": "Step 1: Convert left side (123)_5 to Decimal:\n(123)_5 = 1 * 5^2 + 2 * 5^1 + 3 * 5^0 = 25 + 10 + 3 = 38_{10}.\n\nStep 2: Expand right side (x8)_y in base y:\n(x8)_y = x * y^1 + 8 * y^0 = x*y + 8.\n\nStep 3: Set up equation:\nx*y + 8 = 38  ==>  x * y = 30.\n\nStep 4: Check base and digit constraints:\n1. In base y, digit '8' appears. Therefore, the base must be strictly greater than 8: y >= 9.\n2. Non-zero leading digit x must satisfy: 1 <= x < y.\n3. x and y are positive integers whose product is 30.\n\nStep 5: Factor pairs of 30 where y >= 9:\n- Pair 1: y = 10  ==>  x = 30 / 10 = 3. Valid! (y = 10 >= 9 and x = 3 < 10).\n- Pair 2: y = 15  ==>  x = 30 / 15 = 2. Valid! (y = 15 >= 9 and x = 2 < 15).\n- Pair 3: y = 30  ==>  x = 30 / 30 = 1. Valid! (y = 30 >= 9 and x = 1 < 30).\n(Divisors y = 1, 2, 3, 5, 6 violate y >= 9).\n\nFinal Boxed Answer: There are exactly 3 possible solutions: (x, y) = (3, 10), (2, 15), and (1, 30)."
          },
          {
            "qNum": "4",
            "marks": 3,
            "q": "Subtract (18)_10 from (43)_10 using 8-bit 2's complement arithmetic. Show all binary steps.",
            "sol": "Step 1: Express (+43) and (+18) in 8-bit binary:\n+43 in binary: 43 = 32 + 8 + 2 + 1 = 00101011_2.\n+18 in binary: 18 = 16 + 2 = 00010010_2.\n\nStep 2: Find (-18) using 8-bit 2's complement:\n1's complement of 00010010 = 11101101_2.\nAdd 1: 11101101 + 1 = 11101110_2 = (-18)_{10}.\n\nStep 3: Perform addition (+43) + (-18):\n   00101011   (+43)\n + 11101110   (-18)\n -----------\n  100011001\n\nStep 4: Discard end-around carry:\nThe 9th bit (carry out of MSB) is discarded in 2's complement.\nResult = 00011001_2.\nVerification: 00011001_2 = 16 + 8 + 1 = 25_{10}.\nSince 43 - 18 = 25, the solution is correct.\n\nFinal Boxed Answer: Result = 00011001_2 (+25 in decimal)."
          },
          {
            "qNum": "5",
            "marks": 3,
            "q": "Convert decimal number (156)_10 into its binary, octal, and hexadecimal equivalents.",
            "sol": "1. Decimal to Binary (repeated division by 2):\n156 / 2 = 78 rem 0\n78 / 2 = 39 rem 0\n39 / 2 = 19 rem 1\n19 / 2 = 9 rem 1\n9 / 2 = 4 rem 1\n4 / 2 = 2 rem 0\n2 / 2 = 1 rem 0\n1 / 2 = 0 rem 1\n==> (156)_10 = (10011100)_2.\n\n2. Binary to Octal (cluster in 3 bits: 010 | 011 | 100):\n010 = 2, 011 = 3, 100 = 4\n==> (156)_10 = (234)_8.\n\n3. Binary to Hexadecimal (cluster in 4 bits: 1001 | 1100):\n1001 = 9, 1100 = 12 (C)\n==> (156)_10 = (9C)_16."
          },
          {
            "qNum": "6",
            "marks": 3,
            "q": "Differentiate between a Compiler and an Interpreter across 5 key comparison points.",
            "sol": "Comparison Table:\n1. Execution Process: Compiler translates the entire source code into machine object code at once before execution; Interpreter translates and executes line-by-line.\n2. Execution Speed: Compiled code runs significantly faster; Interpreted code runs slower because translation occurs on the fly.\n3. Memory Requirement: Compiler requires more memory to create target .exe/.obj file; Interpreter does not generate intermediate object code and needs less memory.\n4. Error Reporting: Compiler scans entire program and displays all syntax errors together at the end; Interpreter stops execution on the very first error encountered.\n5. Examples: C, C++, Rust (Compiled); Python, Ruby, JavaScript (Interpreted)."
          }
        ]
      }
    ]
  },
  {
    "id": "beu_ai_2026",
    "subject": "IAI",
    "code": "100105",
    "title": "Introduction to Artificial Intelligence (BEU Mid-Sem 2026)",
    "colleges": "GEC Lakhisarai",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Attempt any five questions. Question No. 1 is compulsory. (5 x 4 = 20 marks)",
    "sections": [
      {
        "name": "Question 1 — Objective MCQs (4 Marks)",
        "questions": [
          {
            "qNum": "1.1",
            "marks": 1,
            "q": "In the PEAS description of an intelligent agent, what does the letter 'A' stand for?\n(a) Automation   (b) Actuators   (c) Algorithms   (d) Architecture",
            "sol": "Answer: (b) Actuators\nExplanation: PEAS stands for Performance measure, Environment, Actuators, Sensors. Actuators are the output mechanisms (wheels, screen, grippers, steering) through which an agent changes its world."
          },
          {
            "qNum": "1.2",
            "marks": 1,
            "q": "What is the main objective of Artificial Intelligence (AI)?\n(a) To increase computer storage   (b) To develop machines that perform tasks requiring human-like intelligence   (c) To manufacture computer hardware   (d) To increase internet speed",
            "sol": "Answer: (b) To develop machines that can perform tasks requiring human-like intelligence\nExplanation: AI seeks to build rational agents capable of perceiving, learning, reasoning, and acting rationally."
          },
          {
            "qNum": "1.3",
            "marks": 1,
            "q": "Who is widely known as the 'Father of Artificial Intelligence'?\n(a) Alan Turing   (b) Charles Babbage   (c) John McCarthy   (d) Bill Gates",
            "sol": "Answer: (c) John McCarthy\nExplanation: John McCarthy coined the term 'Artificial Intelligence' at the Dartmouth Conference in 1956 and created the LISP programming language."
          },
          {
            "qNum": "1.4",
            "marks": 1,
            "q": "Which historical event is officially regarded as the birth of Artificial Intelligence as a distinct research field?\n(a) Proposal of Turing Test (1950)   (b) Dartmouth Summer Research Project on AI (1956)   (c) Development of Logic Theorist (1955)   (d) Conference on Neural Networks (1986)",
            "sol": "Answer: (b) Dartmouth Summer Research Project on AI (1956)\nExplanation: Organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon in 1956, where AI was formally christened as an independent scientific discipline."
          }
        ]
      },
      {
        "name": "Subjective Questions (Each 4 Marks)",
        "questions": [
          {
            "qNum": "IV",
            "marks": 4,
            "q": "Define the PEAS framework for intelligent agents. Specify the complete PEAS description for TWO real-world intelligent systems.",
            "sol": "Definition of PEAS:\nPEAS is the formal task specification framework used to design any rational agent:\n- P (Performance Measure): Metric evaluating the agent's degree of success.\n- E (Environment): The external context/world in which the agent operates.\n- A (Actuators): Devices through which the agent acts upon the environment.\n- S (Sensors): Input hardware through which the agent perceives world state.\n\nSystem 1: Automated Taxi Driver\n- P: Safety, journey speed, legal road compliance, passenger comfort, fuel efficiency.\n- E: City streets, traffic, pedestrians, weather conditions, road signals.\n- A: Steering wheel, accelerator pedal, brake, turn signals, horn, dashboard display.\n- S: Cameras, LiDAR, radar, ultrasonic sonar, GPS, speedometer, engine sensors.\n\nSystem 2: Automated Medical Diagnosis Expert System\n- P: Diagnostic accuracy, reduced treatment cost, minimized patient discomfort/risk.\n- E: Patients, hospital staff, medical imaging databases, laboratory systems.\n- A: Screen display of diagnoses, recommended prescription dosages, referral alerts.\n- S: Keyboard/touchscreen for symptom entry, lab blood tests, ECG/X-ray digital feeds."
          },
          {
            "qNum": "VI",
            "marks": 4,
            "q": "(a) Differentiate between Simple Reflex Agents and Model-Based Reflex Agents with neat block diagrams. (2.5 Marks)\n(b) Compare Goal-Based Agents and Utility-Based Agents. When is a utility agent preferred? (1.5 Marks)",
            "sol": "(a) Simple Reflex vs. Model-Based Reflex:\n- Simple Reflex Agent: Chooses actions solely based on the current percept, ignoring percept history. Works via Condition-Action rules (IF condition THEN action). Fails and enters infinite loops if environment is partially observable.\n- Model-Based Reflex Agent: Maintains an internal state tracking the unobserved aspects of the world. It uses knowledge of 'how the world evolves' and 'how agent actions affect the world' to update its internal state before selecting an action.\n\n(b) Goal-Based vs. Utility-Based:\n- Goal-Based: Has binary success criteria — evaluates whether a sequence of actions reaches the target goal state (e.g., reaching destination).\n- Utility-Based: Maps each state to a continuous real-valued utility score U(s). It evaluates trade-offs between competing goals (e.g. speed vs. safety vs. fuel economy) and chooses actions that maximize expected utility. Preferred in complex stochastic environments where multiple conflicting goals exist."
          },
          {
            "qNum": "VII",
            "marks": 4,
            "q": "Explain the Turing Test in detail. What is its core objective, and how does the interrogator evaluate intelligence? Draw a neat and labeled diagram showing the complete Turing Test configuration.",
            "sol": "1. Core Objective:\nProposed by Alan Turing in his 1950 paper 'Computing Machinery and Intelligence', the Turing Test provides an operational definition of machine intelligence: 'Can machines think?'\n\n2. Test Setup & Architecture:\n- Room A: An AI Machine / Computer.\n- Room B: A Human Respondent.\n- Room C: A Human Interrogator (Judge).\n- Communication is conducted strictly via text terminals (teletype / keyboard) to eliminate voice and physical appearance biases.\n\n3. Evaluation Criterion:\nThe interrogator poses questions to both entities without knowing who is in Room A or B. If the interrogator cannot reliably tell which is the machine and which is the human more than 30% of the time, the machine is said to have passed the Turing Test.\n\n4. Required Capabilities for Passing:\n- Natural Language Processing (NLP) to converse fluently.\n- Knowledge Representation to store facts.\n- Automated Reasoning to deduce answers and draw conclusions.\n- Machine Learning to adapt to new queries."
          }
        ]
      }
    ]
  },
  {
    "id": "beu_physics_2026",
    "subject": "Physics",
    "code": "100104",
    "title": "Engineering Physics (BEU Mid-Sem 2026)",
    "colleges": "GEC Lakhisarai",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Section A: 5 MCQs (1 mark each). Section B: Attempt any 5 descriptive questions (3 marks each).",
    "sections": [
      {
        "name": "Section A — Multiple Choice Questions (5 Marks)",
        "questions": [
          {
            "qNum": "1",
            "marks": 1,
            "q": "A major advantage of optical fibres in communication is:\n(a) Immunity to electromagnetic interference   (b) High electrical conductivity   (c) High resistance to bending   (d) None of these",
            "sol": "Answer: (a) Immunity to electromagnetic interference\nExplanation: Optical fibers transmit light pulses (photons) through dielectric glass/silica, meaning they carry zero electric current and are completely immune to EMI, lightning, and radio noise."
          },
          {
            "qNum": "2",
            "marks": 1,
            "q": "The refractive index of the core is ________ that of the cladding.\n(a) Less than   (b) Equal to   (c) Greater than   (d) Unrelated to",
            "sol": "Answer: (c) Greater than\nExplanation: Total Internal Reflection (TIR) requires light to travel from a denser medium to a rarer medium: n_core (n_1) > n_cladding (n_2)."
          },
          {
            "qNum": "3",
            "marks": 1,
            "q": "The SI unit of electric field is:\n(a) J/C   (b) N*m   (c) V/m   (d) C/m^2",
            "sol": "Answer: (c) V/m\nExplanation: Electric field E = -dV/dx has units of Volts per meter (V/m) or Newtons per Coulomb (N/C)."
          },
          {
            "qNum": "4",
            "marks": 1,
            "q": "The relation between magnetic flux density B, magnetic field intensity H, and magnetisation I is:\n(a) B = μ_0(H + I)   (b) B = μ_0(H - I)   (c) B = H + I   (d) B = μ_0 H I",
            "sol": "Answer: (a) B = μ_0(H + I)\nExplanation: Total magnetic flux density B is the sum of field in vacuum (μ_0 H) and contribution of aligned atomic magnetic dipoles (μ_0 I)."
          },
          {
            "qNum": "5",
            "marks": 1,
            "q": "The equation ∇ · E = ρ / ε_0 is:\n(a) Gauss's law for electricity   (b) Gauss's law for magnetism   (c) Faraday's law   (d) Ampère's law",
            "sol": "Answer: (a) Gauss's law for electricity\nExplanation: Maxwell's first equation in differential form represents Gauss's Law: divergence of electric field equals net charge density divided by permittivity."
          }
        ]
      },
      {
        "name": "Section B — Descriptive & Derivations (15 Marks)",
        "questions": [
          {
            "qNum": "7",
            "marks": 3,
            "q": "State and prove Gauss's law in electrostatics.",
            "sol": "Statement:\nThe total electric flux Φ_E through any closed Gaussian surface enclosing net charge Q_enc is equal to (1/ε_0) times the enclosed charge:\nΦ_E = ∮ E · dA = Q_enc / ε_0.\n\nProof for Point Charge q:\nSurround point charge q with a spherical Gaussian surface of radius r.\nAt every point on the sphere, E is directed radially outwards, collinear with area vector dA (θ = 0°):\n∮ E · dA = ∮ E dA cos 0° = E ∮ dA = E * (4πr^2).\nFrom Coulomb's Law: E = q / (4πε_0 r^2).\nSubstituting: Φ_E = [q / (4πε_0 r^2)] * (4πr^2) = q / ε_0. (Hence Proved!)"
          },
          {
            "qNum": "8",
            "marks": 3,
            "q": "What is an optical fibre? Name its three parts. State the principle on which an optical fibre works.",
            "sol": "1. Definition:\nAn optical fiber is a flexible, transparent cylindrical waveguide made of high-purity silica glass or plastic that guides light signals over long distances with minimal attenuation.\n\n2. Three Structural Parts:\n- Core: Central light-carrying region with higher refractive index n_1.\n- Cladding: Surrounding layer with slightly lower refractive index n_2 (n_1 > n_2) to trap light.\n- Buffer Coating / Jacket: External protective polymer sheath providing mechanical strength and moisture protection.\n\n3. Working Principle:\nOperates on the principle of Total Internal Reflection (TIR). Light launched into the core at an incident angle greater than the critical angle θ_c = sin^-1(n_2 / n_1) undergoes repeated reflections along the core without escaping into the cladding."
          },
          {
            "qNum": "11",
            "marks": 3,
            "q": "Explain Newton's rings experiment with a labeled optical diagram and derive expressions for the diameter of dark and bright rings.",
            "sol": "1. Principle & Optical Setup:\nA plano-convex lens of large radius of curvature R is placed on an optically flat glass plate, forming a thin wedge-shaped air film of thickness t varying from zero at the center.\nMonochromatic light of wavelength λ falls normally. Interference occurs between light reflected from bottom surface of lens and top surface of glass plate.\n\n2. Effective Path Difference (Stokes' Law):\nΔ = 2t + λ/2 (due to reflection at denser glass plate, a phase change of π occurs).\n\n3. Dark Rings Condition:\n2t + λ/2 = (2n + 1)λ/2  ==>  2t = nλ.\nFrom geometry of circle: t = r^2 / (2R) = D^2 / (8R).\nSubstituting: 2 * (D_n^2 / 8R) = nλ  ==>  D_n^2 = 4nλR  ==>  D_n = 2√(nλR).\n(Diameter of dark rings is proportional to square root of natural numbers: D_n ∝ √n).\n\n4. Bright Rings Condition:\n2t + λ/2 = nλ  ==>  2t = (2n - 1)λ/2  ==>  D_n^2 = 2(2n - 1)λR  ==>  D_n = √[2(2n - 1)λR].\n\n5. Center Ring:\nAt point of contact t = 0, Δ = λ/2, which is the destructive condition. Hence, the central spot is always DARK in reflected light."
          },
          {
            "qNum": "12",
            "marks": 3,
            "q": "What is diffraction of light? Name its two types. Differentiate between interference and diffraction across 4 parameters.",
            "sol": "1. Definition:\nThe bending of light waves around the sharp edges of an obstacle or narrow aperture and its spreading into the geometric shadow region.\n\n2. Two Types:\n- Fresnel Diffraction: Source and screen are at finite distances; incident wavefronts are spherical or cylindrical; no lenses required.\n- Fraunhofer Diffraction: Source and screen are at infinite distances (planar wavefronts); collimating and focusing lenses are required.\n\n3. Differences between Interference and Diffraction:\n- Cause: Interference is superposition of waves from two distinct coherent sources; Diffraction is superposition of secondary wavelets originating from different parts of the same wavefront.\n- Fringe Width: In interference, fringes are usually of equal width (β = λD/d); In diffraction, central maxima is twice as wide as secondary maxima.\n- Intensity Distribution: In interference, all bright fringes have equal intensity; In diffraction, intensity drops steeply for higher orders.\n- Dark Fringe Darkness: In interference, dark fringes are completely black (zero intensity); In diffraction, dark fringes are rarely completely dark."
          }
        ]
      }
    ]
  },
  {
    "id": "beu_uhv_2026",
    "subject": "UHV",
    "code": "100109",
    "title": "Universal Human Values (BEU Mid-Sem 2026)",
    "colleges": "GEC Lakhisarai & GEC Samastipur",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Question 1 is compulsory (MCQs). Attempt any 3 descriptive questions (5 marks each).",
    "sections": [
      {
        "name": "Question 1 — Objective MCQs (5 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "q": "What is the basic purpose of self-exploration?\nA. To earn more money   B. To understand oneself and verify values   C. To compete with others   D. To gain social recognition",
            "sol": "Answer: B. To understand oneself and verify values\nExplanation: Self-exploration observes what is naturally acceptable to oneself and aligns one's living with universal harmony."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "q": "Which of the following is a physical facility?\nA. Trust   B. Respect   C. Affection   D. Food",
            "sol": "Answer: D. Food\nExplanation: Food, clothing, and shelter are material/physico-chemical needs of the Body. Trust, respect, and affection are qualitative needs of the Self ('I')."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "q": "Respect for another person means:\nA. Judging them by wealth   B. Evaluating them by appearance   C. Right evaluation of the other as a human being   D. Treating them as inferior",
            "sol": "Answer: C. Right evaluation of the other as a human being\nExplanation: Respect (Samman) means right evaluation. Over-evaluation, under-evaluation, or otherwise-evaluation constitutes disrespect."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "q": "The outcome of justice at society level is:\nA. Universal Human Order   B. Coexistence in Nature   C. Undivided Society (Akhand Samaj)   D. Prosperity",
            "sol": "Answer: C. Undivided Society (Akhand Samaj)\nExplanation: Justice starting from family expands to society, ensuring fearlessness (Abhay) and an Undivided Society."
          },
          {
            "qNum": "1(e)",
            "marks": 1,
            "q": "Humanistic education primarily aims to develop:\nA. Technical skills without values   B. Competition among students   C. Right understanding and human values along with competence   D. The ability to earn money only",
            "sol": "Answer: C. Right understanding and human values along with competence\nExplanation: Holistic education balances 'What to do' (values & purpose) with 'How to do' (technical skills)."
          }
        ]
      },
      {
        "name": "Descriptive Questions (Each 5 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 5,
            "q": "Explain the concept of the human being as the co-existence of the sentient 'Self' (I) and the material 'Body' with suitable examples.",
            "sol": "Human Being = Co-existence of Self ('I') and Body.\n\nComparison Table:\n1. Needs:\n- Self ('I'): Happiness, respect, trust (Qualitative, Continuous).\n- Body: Food, clothes, shelter (Quantitative, Temporary/Physico-chemical).\n\n2. Fulfilling Entity:\n- Self ('I'): Fulfilled by Right Understanding and Right Feelings.\n- Body: Fulfilled by physical facilities and material production.\n\n3. Activities:\n- Self ('I'): Desiring, thinking, expecting, knowing, assuming, recognizing, fulfilling.\n- Body: Breathing, heartbeat, digestion (Only recognizing and fulfilling).\n\n4. Role:\n- Self ('I') is the Seer (Drashta), Doer (Karta), and Enjoyer (Bhokta).\n- Body is simply an instrument (Sadhan) used by the Self to interact with the material world."
          },
          {
            "qNum": "5",
            "marks": 5,
            "q": "Explain the importance of 'Trust' in human relationships and distinguish between Intention and Competence. How does lack of trust disrupt harmony?",
            "sol": "1. Definition of Trust (Vishwas):\nTrust is the foundational value in all human relationships. It is the assurance that the other person naturally wants my happiness and prosperity.\n\n2. Intention vs. Competence:\n- Intention: Natural acceptance (what a person genuinely wants to be). Our natural acceptance is always for mutual happiness.\n- Competence: The ability to translate good intentions into actual harmonious behavior.\n\n3. Common Mistake / Source of Conflict:\nWe evaluate ourselves on the basis of our INTENTION ('I meant well, it was just a mistake'), but we evaluate others on the basis of their COMPETENCE ('They broke the glass, they did it intentionally!').\nWhen we doubt the other person's intention, we feel angry and mistrustful. When we realize their intention is good but their competence is lacking, we respond with compassion and help them improve."
          }
        ]
      }
    ]
  },
  {
    "id": "model_math1_2026",
    "subject": "Math-I",
    "code": "100102",
    "title": "Engineering Mathematics – I (Antigravity Topper Model Paper 2026)",
    "colleges": "LNJPIT Chapra & BEU University Model",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Answer any five questions. Question No. 1 is compulsory.",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "q": "If A is an n x n non-singular matrix, the rank ρ(A) is equal to:\n(i) 0   (ii) 1   (iii) n   (iv) n - 1",
            "sol": "Answer: (iii) n\nExplanation: For any non-singular square matrix, the determinant |A| ≠ 0. Therefore, the highest order non-zero minor is of order n, which means rank ρ(A) = n."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "q": "According to Euler's Theorem for a homogeneous function u = f(x, y) of degree n, the value of x(∂u/∂x) + y(∂u/∂y) is:\n(i) u / n   (ii) n · u   (iii) n(n - 1)u   (iv) 0",
            "sol": "Answer: (ii) n · u\nExplanation: Euler's fundamental theorem states that for any homogeneous function u of degree n: x(∂u/∂x) + y(∂u/∂y) = n·u."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "q": "If the eigenvalues of a 2x2 matrix A are 2 and 5, then the determinant |A| is:\n(i) 7   (ii) 10   (iii) 2.5   (iv) 3",
            "sol": "Answer: (ii) 10\nExplanation: A fundamental property of eigenvalues is that the determinant of a matrix equals the product of its eigenvalues: |A| = λ1 · λ2 = 2 × 5 = 10."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "q": "The n-th derivative of e^(ax) · sin(bx + c) has magnitude factor:\n(i) (a² + b²)^(n/2)   (ii) (a + b)^n   (iii) a^n · b^n   (iv) a^n / b^n",
            "sol": "Answer: (i) (a² + b²)^(n/2)\nExplanation: Using successive differentiation: y_n = (a² + b²)^(n/2) · e^(ax) · sin(bx + c + nφ), where φ = arctan(b/a)."
          },
          {
            "qNum": "1(e)",
            "marks": 1,
            "q": "The radius of curvature ρ at any point on a circle of radius R is:\n(i) 1/R   (ii) R   (iii) 2πR   (iv) R²",
            "sol": "Answer: (ii) R\nExplanation: The curvature of a circle of radius R is constant everywhere and equal to 1/R. The radius of curvature ρ is the reciprocal of curvature: ρ = 1 / (1/R) = R."
          }
        ]
      },
      {
        "name": "Section B — Short Analytical Problems & Derivations (Any Two, 7 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 3.5,
            "q": "Reduce the matrix A = [[1, 2, 3], [2, 4, 7], [3, 6, 10]] to Normal Form [I_r, 0; 0, 0] and hence determine its rank.",
            "sol": "1. Initial Matrix: A = [[1, 2, 3], [2, 4, 7], [3, 6, 10]].\n2. Row operations:\n   R2 → R2 - 2R1: [0, 0, 1]\n   R3 → R3 - 3R1: [0, 0, 1]\n   R3 → R3 - R2 : [0, 0, 0]\n   Matrix is [[1, 2, 3], [0, 0, 1], [0, 0, 0]].\n3. Column operations:\n   C2 → C2 - 2C1: [[1, 0, 3], [0, 0, 1], [0, 0, 0]]\n   C3 → C3 - 3C1: [[1, 0, 0], [0, 0, 1], [0, 0, 0]]\n   Swap C2 and C3: [[1, 0, 0], [0, 1, 0], [0, 0, 0]] = [I_2, 0; 0, 0].\n4. Since the identity block is of size 2x2, Rank ρ(A) = 2."
          },
          {
            "qNum": "3",
            "marks": 3.5,
            "q": "Find the values of a and b such that the system of equations x + y + z = 6, x + 2y + 3z = 10, x + 2y + az = b has: (i) No solution, (ii) A unique solution, (iii) Infinitely many solutions.",
            "sol": "1. Augmented matrix [A | B]:\n   [[1, 1, 1 | 6], [1, 2, 3 | 10], [1, 2, a | b]].\n2. Apply row operations:\n   R2 → R2 - R1: [0, 1, 2 | 4]\n   R3 → R3 - R2: [0, 0, a - 3 | b - 10].\n3. Analysis using Rouche-Capelli Theorem:\n   (i) No solution: If a = 3 and b ≠ 10, then ρ(A) = 2 while ρ(A|B) = 3. Since ranks are unequal, system is inconsistent.\n   (ii) Unique solution: If a ≠ 3 (for any value of b), then ρ(A) = ρ(A|B) = 3 = number of unknowns n.\n   (iii) Infinitely many solutions: If a = 3 and b = 10, then ρ(A) = ρ(A|B) = 2 < 3. System is consistent with 1 degree of freedom."
          }
        ]
      },
      {
        "name": "Section C — Comprehensive University Proofs & Computations (Any One, 8 Marks)",
        "questions": [
          {
            "qNum": "4",
            "marks": 8,
            "q": "If y = (sin^(-1) x)², prove that (1 - x²)y_(n+2) - (2n + 1)x y_(n+1) - n² y_n = 0. Hence evaluate y_n(0) for all n.",
            "sol": "1. Given y = (sin^(-1) x)².\n   Differentiate w.r.t x: y1 = 2 sin^(-1) x / √(1 - x²) ⟹ (1 - x²)(y1)² = 4y.\n2. Differentiate again w.r.t x:\n   (1 - x²) 2 y1 y2 - 2x (y1)² = 4 y1.\n   Dividing by 2y1: (1 - x²) y2 - x y1 - 2 = 0.\n3. Apply Leibnitz's Theorem for n-th derivative on each term:\n   - Term 1: d^n/dx^n [(1 - x²) y2] = (1 - x²) y_(n+2) - 2nx y_(n+1) - n(n-1) y_n.\n   - Term 2: d^n/dx^n [x y1] = x y_(n+1) + n y_n.\n   - Term 3: d^n/dx^n [2] = 0.\n4. Combining:\n   [(1 - x²) y_(n+2) - 2nx y_(n+1) - n(n-1) y_n] - [x y_(n+1) + n y_n] = 0\n   ⟹ (1 - x²) y_(n+2) - (2n + 1)x y_(n+1) - n² y_n = 0. (PROVED)\n5. Evaluation at x = 0:\n   Putting x = 0: y_(n+2)(0) = n² y_n(0).\n   - For odd n: Since y1(0) = 0, y3(0) = 0, y5(0) = 0 ⟹ y_n(0) = 0 for all odd n.\n   - For even n: y(0) = 0, y2(0) = 2.\n     y4(0) = 2² · y2(0) = 2² · 2\n     y6(0) = 4² · y4(0) = 4² · 2² · 2\n     In general, for n = 2k (even): y_(2k)(0) = 2 · [(2k - 2)² · (2k - 4)² ... 2²]."
          }
        ]
      }
    ]
  },
  {
    "id": "model_physics_2026",
    "subject": "Physics",
    "code": "100103",
    "title": "Engineering Physics (Antigravity Topper Model Paper 2026)",
    "colleges": "LNJPIT Chapra & BEU University Model",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Answer any five questions. Question No. 1 is compulsory.",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "q": "In Newton's rings experiment viewed under reflected light, the central fringe is:\n(i) Always Bright   (ii) Always Dark   (iii) Uniformly Yellow   (iv) Half bright, half dark",
            "sol": "Answer: (ii) Always Dark\nExplanation: At the point of contact, film thickness t = 0. Due to reflection at the lower denser glass plate, a phase shift of π (path shift of λ/2) occurs by Stokes' relation, resulting in destructive interference (dark spot)."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "q": "An optical fiber has core refractive index n1 and cladding refractive index n2. For light propagation by Total Internal Reflection, the condition is:\n(i) n1 < n2   (ii) n1 > n2   (iii) n1 = n2   (iv) n1 · n2 = 1",
            "sol": "Answer: (ii) n1 > n2\nExplanation: Total Internal Reflection requires light to travel from an optically denser medium (core, n1) towards a rarer medium (cladding, n2), meaning n1 must strictly exceed n2."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "q": "The SI unit of the Poynting Vector S = E x H is:\n(i) Watts (W)   (ii) Watts per square meter (W/m²)   (iii) Joules (J)   (iv) Volts per meter (V/m)",
            "sol": "Answer: (ii) Watts per square meter (W/m²)\nExplanation: The Poynting vector represents the instantaneous electromagnetic power flux crossing a unit surface area perpendicular to the propagation direction, with units W/m²."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "q": "The ratio of Einstein's coefficients A_21 / B_21 is proportional to:\n(i) ν   (ii) ν²   (iii) ν³   (iv) 1/ν",
            "sol": "Answer: (iii) ν³\nExplanation: Einstein's derivation gives A_21 / B_21 = (8πhν³) / c³. This shows that spontaneous emission increases rapidly with the cube of transition frequency."
          },
          {
            "qNum": "1(e)",
            "marks": 1,
            "q": "In a single-slit Fraunhofer diffraction pattern, the angular half-width of the central maximum is:\n(i) λ / a   (ii) 2λ / a   (iii) a / λ   (iv) a · λ",
            "sol": "Answer: (i) λ / a\nExplanation: The first minimum occurs when a · sin θ = λ ⟹ sin θ ≈ θ = λ / a. The full angular width is 2θ = 2λ / a."
          }
        ]
      },
      {
        "name": "Section B — Short Analytical Problems & Derivations (Any Two, 7 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 3.5,
            "q": "Newton's rings are formed by light of wavelength 5890 Å between a plano-convex lens and a flat glass plate. If the diameter of the 10th dark ring is 0.50 cm, calculate the radius of curvature of the lens surface.",
            "sol": "1. Given Data:\n   - Wavelength λ = 5890 Å = 5.89 × 10^(-5) cm\n   - Order n = 10\n   - Diameter D_10 = 0.50 cm\n2. Governing Formula:\n   [ D_n² = 4 · n · R · λ ]\n3. Substitution:\n   (0.50)² = 4 × 10 × R × (5.89 × 10^(-5))\n   0.25 = 2.356 × 10^(-3) · R\n   R = 0.25 / (2.356 × 10^(-3)) = 106.11 cm.\n4. Final Result:\n   [ Radius of curvature R = 106.1 cm (1.06 m) ]"
          },
          {
            "qNum": "3",
            "marks": 3.5,
            "q": "An optical fiber has core refractive index n1 = 1.55 and cladding index n2 = 1.50. Calculate: (i) Critical angle at core-cladding boundary, (ii) Numerical Aperture (NA), (iii) Acceptance angle in air.",
            "sol": "1. Given: n1 = 1.55, n2 = 1.50, air n0 = 1.0.\n2. Critical angle:\n   θ_c = arcsin(n2 / n1) = arcsin(1.50 / 1.55) = arcsin(0.9677) ≈ 75.4°.\n3. Numerical Aperture (NA):\n   NA = √(n1² - n2²) = √(1.55² - 1.50²) = √(2.4025 - 2.25) = √0.1525 ≈ 0.3905.\n4. Acceptance angle θ_a:\n   θ_a = arcsin(NA) = arcsin(0.3905) ≈ 22.98°.\n5. Final Boxed Result:\n   [ θ_c = 75.4°, NA = 0.3905, θ_a = 23.0° ]"
          }
        ]
      },
      {
        "name": "Section C — Comprehensive University Proofs & Computations (Any One, 8 Marks)",
        "questions": [
          {
            "qNum": "4",
            "marks": 8,
            "q": "State Maxwell's four equations in differential and integral forms. Explain how Maxwell modified Ampère's circuital law by introducing the concept of Displacement Current.",
            "sol": "1. Maxwell's Four Equations:\n   (i) Gauss's Law (Electrostatics): ∇ · D = ρ  |  ∮ D · dA = Q_enclosed\n   (ii) Gauss's Law (Magnetism): ∇ · B = 0  |  ∮ B · dA = 0 (No magnetic monopoles)\n   (iii) Faraday's Law: ∇ × E = -∂B/∂t  |  ∮ E · dl = -dΦ_B/dt\n   (iv) Ampere-Maxwell Law: ∇ × H = J + ∂D/∂t  |  ∮ H · dl = I_c + I_d\n2. The Limitation of Original Ampere's Law:\n   Original law: ∇ × H = J. Taking divergence: ∇ · (∇ × H) = ∇ · J = 0.\n   However, the Continuity Equation of charge requires ∇ · J = -∂ρ/∂t ≠ 0 for time-varying fields.\n   In a charging capacitor, conduction current J stops at the capacitor plates, violating continuity.\n3. Maxwell's Modification:\n   From Gauss's Law: ρ = ∇ · D. Differentiating: ∂ρ/∂t = ∇ · (∂D/∂t).\n   Substituting into continuity: ∇ · J + ∇ · (∂D/∂t) = 0 ⟹ ∇ · [J + ∂D/∂t] = 0.\n   Maxwell identified J_d = ∂D/∂t = ε0(∂E/∂t) as the Displacement Current Density.\n4. Physical Significance:\n   Between capacitor plates, no real charges move, but the time-varying electric flux dΦ_E/dt generates an identical displacement current I_d = ε0(dΦ_E/dt), producing magnetic fields exactly like real conduction current."
          }
        ]
      }
    ]
  },
  {
    "id": "model_beee_2026",
    "subject": "BEEE",
    "code": "100111",
    "title": "Basics of Electrical & Electronics Engineering (Antigravity Topper Model Paper 2026)",
    "colleges": "LNJPIT Chapra & BEU University Model",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Answer any five questions. Question No. 1 is compulsory.",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "q": "For a BJT operating in the active amplification region, the junctions are biased as:\n(i) EB forward, CB reverse   (ii) EB reverse, CB forward   (iii) Both forward   (iv) Both reverse",
            "sol": "Answer: (i) EB forward, CB reverse\nExplanation: Forward bias across the Emitter-Base junction allows carriers to be injected into the base, while reverse bias across the Collector-Base junction sweeps them into the collector."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "q": "The relation between common-emitter current gain β and common-base current gain α is:\n(i) β = α / (1 + α)   (ii) β = α / (1 - α)   (iii) β = (1 - α) / α   (iv) α · β = 1",
            "sol": "Answer: (ii) β = α / (1 - α)\nExplanation: From IE = IB + IC and IC = α IE, IB = (1 - α)IE. Hence β = IC / IB = α / (1 - α)."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "q": "In a series RLC AC circuit at resonance, the circuit power factor is:\n(i) Zero   (ii) 0.707 lagging   (iii) 1.0 (Unity)   (iv) 0.5 leading",
            "sol": "Answer: (iii) 1.0 (Unity)\nExplanation: At resonance, inductive reactance XL equals capacitive reactance XC, cancelling net reactance (X = 0). Thus impedance Z = R is purely resistive, making cos φ = R / Z = 1.0."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "q": "The maximum power transfer efficiency from a DC source to a resistive load is:\n(i) 100%   (ii) 75%   (iii) 50%   (iv) 25%",
            "sol": "Answer: (iii) 50%\nExplanation: Maximum power occurs when RL = Rth. Since equal current flows through both, equal power is dissipated in internal resistance Rth as in load RL, giving efficiency η = 50%."
          },
          {
            "qNum": "1(e)",
            "marks": 1,
            "q": "A full-wave bridge rectifier has a rectification efficiency of approximately:\n(i) 40.6%   (ii) 50%   (iii) 81.2%   (iv) 95%",
            "sol": "Answer: (iii) 81.2%\nExplanation: Maximum theoretical efficiency for a full-wave rectifier is η = 8 / π² ≈ 81.2% (twice that of a half-wave rectifier, 40.6%)."
          }
        ]
      },
      {
        "name": "Section B — Short Analytical Problems & Derivations (Any Two, 7 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 3.5,
            "q": "A DC voltage source of 24 V with internal resistance 6 Ω is connected to a variable load resistor RL. Calculate: (i) Value of RL for maximum power transfer, (ii) Maximum power transferred to the load, (iii) Power dissipated inside the source.",
            "sol": "1. Given Data:\n   V_th = 24 V, R_th = 6 Ω.\n2. Maximum Power Condition:\n   By Maximum Power Transfer theorem, RL = R_th = 6 Ω.\n3. Maximum Power Formula:\n   P_max = (V_th)² / (4 · R_th) = (24)² / (4 × 6) = 576 / 24 = 24 W.\n4. Power inside source:\n   Current I = V_th / (R_th + RL) = 24 / (6 + 6) = 2 A.\n   P_source = I² · R_th = (2)² × 6 = 24 W.\n5. Boxed Result:\n   [ RL = 6 Ω, P_max = 24 W, P_internal = 24 W (Efficiency = 50%) ]"
          },
          {
            "qNum": "3",
            "marks": 3.5,
            "q": "In an NPN transistor connected in CE mode, the base current IB is 40 μA and the emitter current IE is 4.04 mA. Calculate: (i) Collector current IC, (ii) Current gain β, (iii) Current gain α.",
            "sol": "1. Given: IB = 40 μA = 0.04 mA, IE = 4.04 mA.\n2. Collector current:\n   IC = IE - IB = 4.04 mA - 0.04 mA = 4.00 mA.\n3. Current gain β:\n   β = IC / IB = 4.00 mA / 0.04 mA = 100.\n4. Current gain α:\n   α = IC / IE = 4.00 / 4.04 ≈ 0.9901 (or α = β / (1 + β) = 100 / 101 ≈ 0.9901).\n5. Boxed Result:\n   [ IC = 4.0 mA, β = 100, α = 0.9901 ]"
          }
        ]
      },
      {
        "name": "Section C — Comprehensive University Proofs & Computations (Any One, 8 Marks)",
        "questions": [
          {
            "qNum": "4",
            "marks": 8,
            "q": "Explain the working of a Full-Wave Bridge Rectifier with a neat circuit diagram and input/output waveforms. Derive expressions for DC load current (I_dc), RMS load current (I_rms), Rectification Efficiency (η), and Ripple Factor (γ).",
            "sol": "1. Circuit Arrangement:\n   Draw 4 diodes (D1, D2, D3, D4) connected in a closed bridge across transformer secondary AC voltage v(t) = Vm sin(ωt).\n2. Operation:\n   - Positive Half-Cycle (0 to π): D1 and D2 are forward-biased; current flows through load resistor RL from top to bottom.\n   - Negative Half-Cycle (π to 2π): D3 and D4 are forward-biased; current flows through RL in the EXACT same direction.\n3. Mathematical Derivations:\n   (i) DC Current: I_dc = (1/π) ∫[0 to π] Im sin(ωt) d(ωt) = 2Im / π ≈ 0.637 Im.\n   (ii) RMS Current: I_rms = √[(1/π) ∫[0 to π] (Im sin ωt)² d(ωt)] = Im / √2 ≈ 0.707 Im.\n   (iii) Rectification Efficiency η:\n        P_dc = (I_dc)² · RL = (2Im / π)² · RL\n        P_ac = (I_rms)² · (RL + 2rf) ≈ (Im / √2)² · RL\n        η = P_dc / P_ac = [(4Im² / π²) RL] / [(Im² / 2) RL] = 8 / π² ≈ 81.2%.\n   (iv) Ripple Factor γ:\n        γ = √[(I_rms / I_dc)² - 1] = √[((Im / √2) / (2Im / π))² - 1] = √[(π² / 8) - 1] = √(1.2337 - 1) ≈ 0.482.\n4. Boxed Conclusions:\n   [ Full-Wave Bridge: η = 81.2%, Ripple Factor γ = 0.482, PIV = Vm ]"
          }
        ]
      }
    ]
  },
  {
    "id": "model_cfet_2026",
    "subject": "CFET",
    "code": "100108",
    "title": "Computer Fundamentals & Emerging Tech (Antigravity Topper Model Paper 2026)",
    "colleges": "LNJPIT Chapra & BEU University Model",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Answer any five questions. Question No. 1 is compulsory.",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "q": "The Von Neumann bottleneck refers to the performance limitation caused by:\n(i) Lack of CPU registers   (ii) Shared system bus between CPU and memory   (iii) High cache miss rate   (iv) Slow magnetic hard drives",
            "sol": "Answer: (ii) Shared system bus between CPU and memory\nExplanation: Because instructions and data share a single physical communication bus, CPU execution speed is strictly throttled by the throughput rate of the memory bus."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "q": "The 8-bit two's complement of decimal number -1 is:\n(i) 10000001   (ii) 11111111   (iii) 00000001   (iv) 11111110",
            "sol": "Answer: (ii) 11111111\nExplanation: +1 in 8 bits = 00000001. Inverting bits gives 11111110. Adding 1 gives 11111111."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "q": "Which of the following logic gates is classified as a Universal Gate?\n(i) AND   (ii) OR   (iii) NAND   (iv) XOR",
            "sol": "Answer: (iii) NAND\nExplanation: NAND and NOR are universal gates because any Boolean combinational circuit (AND, OR, NOT, XOR, XNOR) can be implemented solely using either gate type."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "q": "According to De Morgan's Law, the expression (A + B)' is equivalent to:\n(i) A' + B'   (ii) A' · B'   (iii) A · B   (iv) (A · B)'",
            "sol": "Answer: (ii) A' · B'\nExplanation: De Morgan's second theorem states that the complement of a sum equals the product of the individual complements: (A + B)' = A' · B'."
          },
          {
            "qNum": "1(e)",
            "marks": 1,
            "q": "If a cache memory has access time 5 ns, main memory access time 60 ns, and hit ratio 0.95, the average access time is:\n(i) 7.75 ns   (ii) 5.0 ns   (iii) 32.5 ns   (iv) 12.0 ns",
            "sol": "Answer: (i) 7.75 ns\nExplanation: T_avg = h · t_c + (1 - h) · t_m = (0.95 × 5 ns) + (0.05 × 60 ns) = 4.75 ns + 3.0 ns = 7.75 ns."
          }
        ]
      },
      {
        "name": "Section B — Short Analytical Problems & Derivations (Any Two, 7 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 3.5,
            "q": "Solve the radix equation (123)_5 = (x8)_y for all possible integer values of digit x and base y.",
            "sol": "1. Convert LHS (123)_5 to Decimal:\n   1 × 5² + 2 × 5¹ + 3 × 5⁰ = 25 + 10 + 3 = 38_10.\n2. Express RHS (x8)_y in Decimal:\n   x · y¹ + 8 · y⁰ = x · y + 8.\n3. Equate:\n   x · y + 8 = 38 ⟹ x · y = 30.\n4. Base constraints:\n   Since digit '8' appears in base y, base y must be strictly greater than 8 (y ≥ 9). Digit x must satisfy 1 ≤ x < y.\n5. Valid integer factor pairs of 30 where y ≥ 9:\n   - Pair 1: y = 10 ⟹ x = 30 / 10 = 3 (Valid: 3 < 10)\n   - Pair 2: y = 15 ⟹ x = 30 / 15 = 2 (Valid: 2 < 15)\n   - Pair 3: y = 30 ⟹ x = 30 / 30 = 1 (Valid: 1 < 30)\n6. Boxed Result:\n   [ Three valid solutions: (x=3, y=10), (x=2, y=15), (x=1, y=30) ]"
          },
          {
            "qNum": "3",
            "marks": 3.5,
            "q": "Perform the subtraction (52)_10 - (29)_10 using 8-bit two's complement binary arithmetic. Verify your answer in decimal.",
            "sol": "1. Convert +52 to 8-bit binary:\n   52 = 32 + 16 + 4 = (00110100)_2.\n2. Convert +29 to 8-bit binary:\n   29 = 16 + 8 + 4 + 1 = (00011101)_2.\n3. Find 2's complement of +29:\n   1's complement = 11100010\n   Add 1          = 11100011 (represents -29).\n4. Add (+52) and (-29):\n     00110100 (+52)\n   + 11100011 (-29)\n   -----------\n   (1)00010111\n5. Discard end-around carry (1). Result is positive:\n   00010111_2 = 16 + 4 + 2 + 1 = 23_10.\n6. Verification: 52 - 29 = 23_10. Correct."
          }
        ]
      },
      {
        "name": "Section C — Comprehensive University Proofs & Computations (Any One, 8 Marks)",
        "questions": [
          {
            "qNum": "4",
            "marks": 8,
            "q": "Show how an Exclusive-OR (XOR) gate can be realized using the minimum number of 2-input NAND gates only. Draw the circuit diagram and derive the Boolean expression at each gate output.",
            "sol": "1. Boolean Equation of XOR: Y = A ⊕ B = A'B + AB'.\n2. Implementation requires exactly 4 two-input NAND gates:\n   - Gate 1 (Shared): Receives inputs A and B.\n     Output G1 = (A · B)' = A' + B'.\n   - Gate 2 (Upper): Receives input A and G1.\n     Output G2 = [A · G1]' = [A · (A' + B')]' = [A · B']' = A' + B.\n   - Gate 3 (Lower): Receives input B and G1.\n     Output G3 = [B · G1]' = [B · (A' + B')]' = [B · A']' = B' + A.\n   - Gate 4 (Output): Receives G2 and G3.\n     Output Y = [G2 · G3]' = [(A' + B) · (B' + A)]'\n              = [(A' + B)]' + [(B' + A)]'  (by De Morgan's Law)\n              = (A'' · B') + (B'' · A')\n              = AB' + A'B = A ⊕ B.\n3. Truth Table Verification:\n   A=0, B=0 ⟹ G1=1, G2=1, G3=1 ⟹ Y=0\n   A=0, B=1 ⟹ G1=1, G2=1, G3=0 ⟹ Y=1\n   A=1, B=0 ⟹ G1=1, G2=0, G3=1 ⟹ Y=1\n   A=1, B=1 ⟹ G1=0, G2=1, G3=1 ⟹ Y=0\n4. Boxed Result: [ Proved: 4 NAND gates realize XOR function Y = A ⊕ B ]"
          }
        ]
      }
    ]
  },
  {
    "id": "model_iai_2026",
    "subject": "IAI",
    "code": "100105",
    "title": "Introduction to Artificial Intelligence (Antigravity Topper Model Paper 2026)",
    "colleges": "LNJPIT Chapra & BEU University Model",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Answer any five questions. Question No. 1 is compulsory.",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "q": "An AI agent is formally said to be Rational if it:\n(i) Is omniscient and never makes a mistake   (ii) Selects actions that maximize expected performance given its percept history   (iii) Emulates human cognitive psychology   (iv) Has infinite memory",
            "sol": "Answer: (ii) Selects actions that maximize expected performance given its percept history\nExplanation: Rationality does not mean perfection or omniscience; it means doing the right thing to maximize expected success based on evidence provided by the percept sequence to date."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "q": "A heuristic function h(n) in A* search is called Admissible if for all nodes n:\n(i) h(n) ≥ h*(n)   (ii) 0 ≤ h(n) ≤ h*(n)   (iii) h(n) = g(n)   (iv) h(n) < 0",
            "sol": "Answer: (ii) 0 ≤ h(n) ≤ h*(n)\nExplanation: An admissible heuristic never overestimates the true cost to reach the goal from node n (it is optimistic), which guarantees that A* tree search finds the optimal path."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "q": "In the PEAS framework, the acronym letters stand for:\n(i) Program, Execution, Action, Sensor   (ii) Performance, Environment, Actuators, Sensors   (iii) Perception, Entity, Algorithm, System   (iv) Process, Environment, Agent, Software",
            "sol": "Answer: (ii) Performance, Environment, Actuators, Sensors\nExplanation: PEAS is the standard Russell-Norvig framework used to specify task environments."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "q": "Breadth-First Search (BFS) has an exponential space complexity of:\n(i) O(b · d)   (ii) O(b^d)   (iii) O(d²)   (iv) O(1)",
            "sol": "Answer: (ii) O(b^d)\nExplanation: BFS retains all generated nodes in memory (frontier/FIFO queue), resulting in space complexity O(b^d), where b is branching factor and d is goal depth. Memory exhaustion is its primary bottleneck."
          },
          {
            "qNum": "1(e)",
            "marks": 1,
            "q": "Alpha-Beta pruning improves Minimax game search without changing the final decision when:\n(i) α ≥ β   (ii) α < β   (iii) α + β = 0   (iv) α = 0",
            "sol": "Answer: (i) α ≥ β\nExplanation: Pruning occurs whenever the alpha value (best for MAX) becomes greater than or equal to beta (best for MIN), as the opposing player will never allow play to enter that branch."
          }
        ]
      },
      {
        "name": "Section B — Short Analytical Problems & Derivations (Any Two, 7 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 3.5,
            "q": "Construct a complete PEAS description table for an Automated Medical Diagnosis Expert System.",
            "sol": "1. Performance Measure:\n   - Diagnostic accuracy rate (sensitivity and specificity)\n   - Minimization of false negatives (undetected life-threatening diseases)\n   - Treatment cost efficiency and patient recovery speed\n2. Environment:\n   - Hospital setting, outpatient clinics, patient demographics, symptoms\n   - Pathological lab test databases, pharmaceutical interaction tables\n3. Actuators:\n   - Screen displaying recommended diagnoses and severity rankings\n   - Printed clinical prescriptions and follow-up consultation schedules\n   - Digital orders sent directly to radiology and pathology labs\n4. Sensors:\n   - Clinician keyboard/touchscreen entry of patient vitals and symptoms\n   - Digital DICOM imaging feeds (X-ray, MRI, CT scans)\n   - Electronic health record (EHR) network interfaces"
          },
          {
            "qNum": "3",
            "marks": 3.5,
            "q": "Compare Breadth-First Search (BFS) and Depth-First Search (DFS) across Completeness, Optimality, Time Complexity, and Space Complexity.",
            "sol": "1. Completeness:\n   - BFS: Complete (guaranteed to find goal if branching factor b is finite).\n   - DFS: Incomplete (can get trapped in infinite depth branches or cyclic loops).\n2. Optimality:\n   - BFS: Optimal (if all step costs are equal).\n   - DFS: Non-optimal (returns first path found, which may be deeply sub-optimal).\n3. Time Complexity:\n   - BFS: O(b^d) where d is depth of shallowest solution.\n   - DFS: O(b^m) where m is maximum depth of state space.\n4. Space Complexity:\n   - BFS: O(b^d) (stores all nodes in memory; severe memory bottleneck).\n   - DFS: O(b · m) (linear space; highly memory efficient)."
          }
        ]
      },
      {
        "name": "Section C — Comprehensive University Proofs & Computations (Any One, 8 Marks)",
        "questions": [
          {
            "qNum": "4",
            "marks": 8,
            "q": "Draw and explain the architectural schematic diagram of a Learning Agent. Describe the function of the Critic, Learning Element, Performance Element, and Problem Generator.",
            "sol": "1. Conceptual Overview:\n   A learning agent separates learning from acting, allowing it to initially operate in unfamiliar environments and improve performance over time.\n2. Four Core Components:\n   (i) Critic:\n       - Observes the environment through sensors and evaluates the agent's behavior against an external Performance Standard.\n       - Generates feedback signals ('reward' or 'penalty') indicating how well the agent is doing.\n   (ii) Learning Element:\n       - Responsible for making improvements based on feedback from the Critic.\n       - Experiments with learning goals to update internal condition-action rules and models.\n   (iii) Performance Element:\n       - Responsible for selecting external actions based on percepts (the operational agent program).\n       - Accepts suggestions from the Learning Element to modify its decision strategy.\n   (iv) Problem Generator:\n       - Suggests exploratory actions (sub-optimal in short term) that lead to novel experiences and new data.\n       - Prevents the agent from getting stuck in local optima by encouraging exploration.\n3. Feedback Loop Summary:\n   Sensors -> Critic (evaluates) -> Learning Element (updates) -> Performance Element (acts) -> Actuators -> Environment."
          }
        ]
      }
    ]
  },
  {
    "id": "model_uhv_2026",
    "subject": "UHV",
    "code": "100109",
    "title": "Universal Human Values (Antigravity Topper Model Paper 2026)",
    "colleges": "LNJPIT Chapra & BEU University Model",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Answer any five questions. Question No. 1 is compulsory.",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "q": "The needs of the conscious Self ('I') are characterized as:\n(i) Quantitative and temporary   (ii) Qualitative and continuous   (iii) Purely physiological   (iv) Materialistic",
            "sol": "Answer: (ii) Qualitative and continuous\nExplanation: The Self ('I') seeks feelings like happiness, respect, and peace continuously throughout life, unlike physical body needs which are temporary and quantifiable."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "q": "The foundational value in human-to-human relationships is:\n(i) Wealth   (ii) Power   (iii) Trust (Vishwas)   (iv) Fear",
            "sol": "Answer: (iii) Trust (Vishwas)\nExplanation: Trust is the foundational value in relationships; it is the assured feeling that the other person naturally intends my happiness and prosperity."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "q": "Right evaluation of another person as they actually are is defined as:\n(i) Over-evaluation   (ii) Respect (Samman)   (iii) Disregard   (iv) Flattery",
            "sol": "Answer: (ii) Respect (Samman)\nExplanation: Respect means right evaluation. Evaluating someone more than they are is over-evaluation (flattery); evaluating less is under-evaluation; both represent disrespect."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "q": "The feeling of responsibility in the Self ('I') for nurturing, protecting, and rightly utilizing the Body is:\n(i) Sanyama (Self-regulation)   (ii) Swasthya (Health)   (iii) Suvidha   (iv) Kama",
            "sol": "Answer: (i) Sanyama (Self-regulation)\nExplanation: Sanyama is the conscious commitment of the Self towards the upkeep and right utilization of the Body, which directly leads to physical Swasthya (Health)."
          },
          {
            "qNum": "1(e)",
            "marks": 1,
            "q": "The comprehensive human goal begins at the individual level with:\n(i) Wealth accumulation   (ii) Right Understanding (Samadhan)   (iii) Physical dominance   (iv) Legal contracts",
            "sol": "Answer: (ii) Right Understanding (Samadhan)\nExplanation: The 4-level human goal sequence is: Right Understanding (Individual) -> Prosperity (Family) -> Fearlessness (Society) -> Co-existence (Nature)."
          }
        ]
      },
      {
        "name": "Section B — Short Analytical Problems & Derivations (Any Two, 7 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 3.5,
            "q": "Differentiate between 'Trust on Intention' (Natural Acceptance) and 'Trust on Competence' using daily life examples.",
            "sol": "1. Trust on Intention:\n   - Intention is what a human being fundamentally wants to be (their innate natural acceptance to do good and be happy).\n   - Every individual's natural acceptance is to live in mutual happiness.\n2. Trust on Competence:\n   - Competence is the ability to translate that good intention into actual behavior and performance.\n   - Mistakes, anger, and failures occur solely due to lack of competence, NOT bad intention.\n3. Daily Life Example:\n   - When we make a mistake (e.g. accidentally breaking a glass), we defend ourselves saying: 'I didn't mean to do it' (we trust our intention).\n   - When someone else breaks a glass, we conclude: 'You did it deliberately' (we doubt their intention instead of their competence).\n4. Conclusion:\n   - True trust means recognizing the good intention of others unconditionally, while helping them build competence."
          },
          {
            "qNum": "3",
            "marks": 3.5,
            "q": "Distinguish between 'Prosperity' (Samridhi) and 'Accumulation of Wealth' (Suvidha-Sangraha). Why does accumulation without right understanding cause deprivation?",
            "sol": "1. Nature of Accumulation:\n   - Wealth is purely a physical quantity of material goods or money.\n   - Accumulation without right understanding has no defined upper limit.\n2. Nature of Prosperity:\n   - Prosperity is a qualitative FEELING of having or producing more physical facilities than required.\n3. Why Unlimited Accumulation Fails:\n   - If a person cannot identify how much physical facility is actually needed for their body, they feel insecure no matter how much they hoard.\n   - Such a person remains internally deprived ('daridra') despite owning vast wealth, often exploiting others and nature to acquire more."
          }
        ]
      },
      {
        "name": "Section C — Comprehensive University Proofs & Computations (Any One, 8 Marks)",
        "questions": [
          {
            "qNum": "4",
            "marks": 8,
            "q": "List and explain the 9 foundational values in human-to-human relationships. How does practicing these values lead to an Undivided Society (Akhand Samaj)?",
            "sol": "1. The 9 Values in Relationships:\n   (1) Trust (Vishwas) — Foundational value: assurance of mutual intention.\n   (2) Respect (Samman) — Right evaluation of the other human being.\n   (3) Affection (Sneha) — Acceptance of the other as one's relative.\n   (4) Care (Mamata) — Feeling of responsibility for nurturing the other's body.\n   (5) Guidance (Vatsalya) — Feeling of responsibility for nurturing the other's Self with right understanding.\n   (6) Reverence (Shraddha) — Feeling of acceptance for someone who has achieved excellence.\n   (7) Glory (Gaurav) — Feeling for those who made selfless efforts for human good.\n   (8) Gratitude (Kritagyata) — Feeling of acceptance for help received.\n   (9) Love (Prem) — Complete value: feeling of relatedness to all beings.\n2. Culmination in Undivided Society (Akhand Samaj):\n   - When these values are practiced starting within the Family, fearlessness (Abhay) develops.\n   - Harmony naturally expands from family to community to society, eliminating discrimination, exploitation, and conflict, realizing an Undivided Society."
          }
        ]
      }
    ]
  },
  {
    "id": "model_eic_2026",
    "subject": "EIC",
    "code": "100110",
    "title": "Effective Technical Communication (Antigravity Topper Model Paper 2026)",
    "colleges": "LNJPIT Chapra & BEU University Model",
    "fullMarks": 20,
    "timeHours": 2,
    "instructions": "Answer any five questions. Question No. 1 is compulsory.",
    "sections": [
      {
        "name": "Section A — Objective & Conceptual Fundamentals (Compulsory, 5 Marks)",
        "questions": [
          {
            "qNum": "1(a)",
            "marks": 1,
            "q": "Which of the following is NOT one of the standard '7 Cs' of technical communication?\n(i) Clarity   (ii) Conciseness   (iii) Complexity   (iv) Courtesy",
            "sol": "Answer: (iii) Complexity\nExplanation: The 7 Cs are Clarity, Conciseness, Concreteness, Correctness, Coherence, Completeness, and Courtesy. 'Complexity' is a communication barrier."
          },
          {
            "qNum": "1(b)",
            "marks": 1,
            "q": "In the Full-Block formal business letter format, all paragraphs are:\n(i) Indented by 5 spaces   (ii) Flush with the left margin without indent   (iii) Centered on the page   (iv) Right aligned",
            "sol": "Answer: (ii) Flush with the left margin without indent\nExplanation: In modern full-block style, every line (date, address, salutation, body paragraphs, and signature block) begins flush against the left margin."
          },
          {
            "qNum": "1(c)",
            "marks": 1,
            "q": "'Kinesics' in interpersonal technical communication studies:\n(i) Vocal pitch and pacing   (ii) Body posture, facial expressions, and gestures   (iii) Physical distance between speakers   (iv) Punctuation marks",
            "sol": "Answer: (ii) Body posture, facial expressions, and gestures\nExplanation: Kinesics is the study of non-verbal communication conveyed through body movements, facial expressions, and posture."
          },
          {
            "qNum": "1(d)",
            "marks": 1,
            "q": "Technical writing differs from general literary writing because technical writing is:\n(i) Highly emotional and fictional   (ii) Objective, factual, and unambiguous   (iii) Written in rhyming verse   (iv) Full of subjective metaphors",
            "sol": "Answer: (ii) Objective, factual, and unambiguous\nExplanation: Technical communication prioritizes precision, literal meaning, structured presentation, and factual verification over dramatic flair."
          },
          {
            "qNum": "1(e)",
            "marks": 1,
            "q": "Loud machinery noise in a workshop preventing an engineer from hearing safety instructions is classified as:\n(i) Semantic noise   (ii) Physical / Environmental noise   (iii) Psychological noise   (iv) Syntactic noise",
            "sol": "Answer: (ii) Physical / Environmental noise\nExplanation: Physical noise is any external acoustic or environmental disturbance in the physical transmission medium."
          }
        ]
      },
      {
        "name": "Section B — Short Analytical Problems & Derivations (Any Two, 7 Marks)",
        "questions": [
          {
            "qNum": "2",
            "marks": 3.5,
            "q": "Rewrite the following wordy and vague passage to adhere to the 7 Cs of effective technical communication:\n'Due to the undeniable fact that our electrical power generator experienced a totally unexpected catastrophic failure of technical nature at 14:00 hours, we are writing this letter to inform you that we could not complete the manufacturing process of the ordered items on time.'",
            "sol": "1. Identification of Clutter:\n   - 'Due to the undeniable fact that' ⟹ 'Because'\n   - 'totally unexpected catastrophic failure of technical nature' ⟹ 'generator failure'\n   - 'manufacturing process of the ordered items' ⟹ 'production of your order'\n2. Revised Concise Statement:\n   'Because of a generator failure at 14:00 hours, production of your order was delayed by two hours. Repairs are complete and delivery is scheduled for tomorrow at 10:00 AM.'"
          },
          {
            "qNum": "3",
            "marks": 3.5,
            "q": "Define non-verbal communication and explain Proxemics with workplace spatial zone classifications.",
            "sol": "1. Definition:\n   Non-verbal communication refers to the transmission of messages through vocal cues, body movements, and spatial distance without using written or spoken words.\n2. Proxemics (Study of Personal Space - Edward T. Hall):\n   (i) Intimate Zone (0 to 1.5 ft): Reserved for close family and confidential whispers.\n   (ii) Personal Zone (1.5 to 4 ft): Used for standard interpersonal conversations among colleagues.\n   (iii) Social Zone (4 to 12 ft): Used for formal business meetings and office interactions.\n   (iv) Public Zone (12 ft and beyond): Used for public speeches and auditorium lectures."
          }
        ]
      },
      {
        "name": "Section C — Comprehensive University Proofs & Computations (Any One, 8 Marks)",
        "questions": [
          {
            "qNum": "4",
            "marks": 8,
            "q": "Draft a formal Full-Block laboratory requisition email to your college Head of Department (HOD) requesting approval for microcontrollers and sensors for a Semester-1 engineering capstone project.",
            "sol": "To: hod.cse@lnjpit.ac.in\nCc: labincharge@lnjpit.ac.in\nDate: 19 November 2026\nSubject: Requisition: Microcontroller & Sensor Kits Approval for Capstone Project\n\nDear Dr. Sharma,\n\nI am writing on behalf of our Semester-1 Mathematics & Computing project team to formally request approval for the procurement of laboratory components for our autonomous IoT environmental monitoring project.\n\nThe required components are itemized below:\n1. Arduino Uno R3 Microcontroller Board — 2 units\n2. DHT22 High-Precision Temperature & Humidity Sensor — 2 units\n3. MQ-135 Air Quality Gas Sensor Module — 2 units\n4. Solderless Breadboards & Jumper Wire Assortment — 1 set\n\nThese components will be utilized in Hardware Lab-2 under the faculty supervision of Prof. Verma. All items will be returned in working order upon final project evaluation on 15 December 2026.\n\nKindly grant your approval so we may collect the components from the store room on Monday.\n\nThank you for your continuous support.\n\nSincerely,\n\nAryan Kumar\nRoll No: 260102045\nB.Tech (Mathematics & Computing), Semester-1\nLNJPIT Chapra"
          }
        ]
      }
    ]
  }
];
