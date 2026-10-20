import { WorkedExampleMap } from '@/types/syllabus';

/**
 * Full 43-unit syllabus-grounded worked university exam numericals and derivations.
 * All 8 subjects covered across Semester I (Mathematics & Computing, LNJPIT Chapra / AKU).
 * Standardized exam notation: given parameters, governing equation, substitutions, explicit units, and boxed conclusions.
 */
export const WORKED: WorkedExampleMap = {
  // ==========================================
  // 1. Engineering Mathematics-I (100102) — 5 Units
  // ==========================================
  'math:0':
    '<b>Rank of Matrix:</b> A = [[1, 2, 3], [2, 4, 6], [1, 0, 1]]. Row operations: R₂ → R₂ − 2R₁ gives [0, 0, 0]; R₃ → R₃ − R₁ gives [0, −2, −2]. Swapping R₂ and R₃ yields echelon form with 2 non-zero rows, hence <b>Rank(A) = 2</b>.<br><b>Cayley–Hamilton Theorem:</b> For A = [[1, 2], [3, 4]], characteristic equation is |A − λI| = λ² − 5λ − 2 = 0. By theorem, A² − 5A − 2I = 0. Multiplying by A⁻¹ gives A − 5I − 2A⁻¹ = 0, so <b>A⁻¹ = ½(A − 5I) = [[−2, 1], [1.5, −0.5]]</b>.',

  'math:1':
    '<b>Lagrange Mean Value Theorem:</b> For f(x) = x² on [1, 3], f is continuous on [1, 3] and differentiable on (1, 3). Slope of chord = [f(3) − f(1)] / (3 − 1) = (9 − 1)/2 = 4. Setting f′(c) = 2c = 4 yields <b>c = 2 ∈ (1, 3)</b>. Theorem verified.<br><b>Radius of Curvature:</b> For y = x³ at (1, 1), y₁ = 3x² = 3, y₂ = 6x = 6. ρ = (1 + y₁²)^(3/2) / y₂ = (1 + 9)^(3/2) / 6 = 10√10 / 6 = <b>(5√10)/3 ≈ 5.27</b>.',

  'math:2':
    '<b>Euler’s Theorem:</b> f(x, y) = x³ + y³ is homogeneous of degree n = 3. x·fₓ + y·f_y = x(3x²) + y(3y²) = 3(x³ + y³) = 3f. Verified.<br><b>Saddle vs Extrema:</b> For f(x, y) = x³ + y³ − 3xy: stationary points occur where fₓ = 3x² − 3y = 0 and f_y = 3y² − 3x = 0, giving (0, 0) and (1, 1). Derivatives: r = fₓₓ = 6x, s = fₓᵧ = −3, t = f_yy = 6y. At (0, 0): rt − s² = (0)(0) − 9 = −9 < 0 (<b>Saddle point</b>). At (1, 1): rt − s² = (6)(6) − 9 = 27 > 0 and r = 6 > 0 (<b>Local Minimum</b>, value = −1).',

  'math:3':
    '<b>Beta and Gamma Evaluation:</b> I = ∫₀^(π/2) sin⁴θ cos²θ dθ. Using B(m, n) = 2∫₀^(π/2) sin^(2m−1)θ cos^(2n−1)θ dθ with 2m−1 = 4 ⇒ m = 5/2 and 2n−1 = 2 ⇒ n = 3/2. I = ½·B(5/2, 3/2) = ½·[Γ(5/2)Γ(3/2) / Γ(4)]. With Γ(5/2) = (3/4)√π, Γ(3/2) = ½√π, Γ(4) = 6: I = ½ · [(3π/8) / 6] = <b>π/32</b>.<br><b>Change of Order of Integration:</b> I = ∫₀¹ ∫_y¹ x² cos(xy) dx dy. Region R: y ≤ x ≤ 1 for 0 ≤ y ≤ 1. Changing to vertical strips: 0 ≤ y ≤ x for 0 ≤ x ≤ 1. I = ∫₀¹ x² [∫₀^x cos(xy) dy] dx = ∫₀¹ x² [sin(x²)/x] dx = ½ ∫₀¹ 2x sin(x²) dx = <b>½(1 − cos 1) ≈ 0.230</b>.',

  'math:4':
    '<b>Green’s Theorem Verification:</b> For F = (xy, x²) around unit square [0, 1] × [0, 1]. Line integral: ∮(P dx + Q dy) along four edges evaluates to 0 + ½ + 0 + 0 = ½. Double integral: ∬_R (∂Q/∂x − ∂P/∂y) dA = ∬_R (2x − x) dA = ∫₀¹ ∫₀¹ x dx dy = [x²/2]₀¹ · [y]₀¹ = <b>½</b>. Both sides match.<br><b>Gauss Divergence:</b> For F = (x, y, z) over sphere x² + y² + z² = a², ∇·F = 1 + 1 + 1 = 3. ∯_S F·n̂ dS = ∭_V 3 dV = 3 · (4/3 π a³) = <b>4π a³</b>.',

  // ==========================================
  // 2. Engineering Physics (100104) — 6 Units
  // ==========================================
  'phy:0':
    '<b>Newton’s Rings (Wavelength):</b> Lens of radius R = 100 cm. Diameters of 5th and 15th dark rings are D₅ = 0.30 cm and D₁₅ = 0.52 cm (p = 10). λ = (D₁₅² − D₅²) / (4pR) = (0.2704 − 0.0900) / (4 × 10 × 100) = 0.1804 / 4000 = 4.51 × 10⁻⁵ cm = <b>451 nm</b>.<br><b>Diffraction Grating:</b> Grating has 5000 lines/cm. Grating element (a + b) = 1/5000 cm = 2 × 10⁻⁴ cm = 2000 nm. For λ = 600 nm, highest visible order n_max ≤ (a + b)/λ = 2000/600 = 3.33, so <b>highest visible order is n = 3</b>.',

  'phy:1':
    '<b>Optical Fibre Numerical Aperture:</b> Core n₁ = 1.50, cladding n₂ = 1.45. Numerical Aperture NA = √(n₁² − n₂²) = √(2.25 − 2.1025) = √0.1475 ≈ <b>0.384</b>. Acceptance angle in air θ₀ = sin⁻¹(0.384) ≈ <b>22.59°</b>.<br><b>Einstein’s Coefficients:</b> In thermal equilibrium at T = 300 K for green light (λ = 500 nm, ν = 6 × 10¹⁴ Hz), ratio of spontaneous to stimulated emission rate is A₂₁ / (B₂₁ · ρ(ν)) = e^(hν / kT) − 1. Here hν/kT = (6.626 × 10⁻³⁴ × 6 × 10¹⁴) / (1.38 × 10⁻²³ × 300) ≈ 96.0. Since e⁹⁶ ≫ 1, <b>spontaneous emission overwhelmingly dominates at optical frequencies without optical pumping</b>.',

  'phy:2':
    '<b>Poynting Vector & Radiation Intensity:</b> An electromagnetic plane wave in vacuum has electric field amplitude E₀ = 120 V/m. Magnetic field amplitude B₀ = E₀/c = 120 / (3 × 10⁸) = <b>4.0 × 10⁻⁷ T = 0.40 µT</b>.<br>Peak Poynting flux: S_max = E₀B₀/µ₀ = (120 × 4.0 × 10⁻⁷) / (4π × 10⁻⁷) = 120/π ≈ <b>38.20 W/m²</b>.<br>Time-average power density: ⟨S⟩ = ½ ε₀ c E₀² = ½ S_max ≈ <b>19.10 W/m²</b>. Total average power incident on a 2.5 m² solar panel = 19.10 × 2.5 = <b>47.75 W</b>.',

  'phy:3':
    '<b>De Broglie Wavelength:</b> Electron accelerated through potential V = 100 V: λ = h / √(2meV) = 12.27 / √100 = <b>1.227 Å = 0.1227 nm</b>.<br><b>Particle in a 1-D Box:</b> Electron confined in infinite well of width L = 1.0 nm. Ground state energy: E₁ = h² / (8mL²) = (6.626 × 10⁻³⁴)² / [8 × (9.109 × 10⁻³¹) × (1.0 × 10⁻⁹)²] = 6.025 × 10⁻²⁰ J = <b>0.376 eV</b>. Excited states: E₂ = 4E₁ = <b>1.504 eV</b>, E₃ = 9E₁ = <b>3.384 eV</b>. Zero-point energy is E₁ > 0 in agreement with Heisenberg uncertainty.',

  'phy:4':
    '<b>Hall Effect & Carrier Concentration:</b> Semiconductor strip of thickness t = 0.5 mm carries I = 15 mA in magnetic field B = 0.45 T. Transverse Hall voltage is V_H = −36 mV.<br>Hall coefficient: R_H = (V_H · t) / (B · I) = (−36 × 10⁻³ × 0.5 × 10⁻³) / (0.45 × 15 × 10⁻³) = <b>−2.67 × 10⁻³ m³/C</b>. Negative sign confirms <b>n-type majority carriers (electrons)</b>.<br>Carrier density: n = 1 / (|R_H| · e) = 1 / (2.67 × 10⁻³ × 1.602 × 10⁻¹⁹) = <b>2.34 × 10²¹ m⁻³</b>.<br><b>Solar Cell Fill Factor:</b> I_sc = 40 mA, V_oc = 0.60 V, P_max = 19.2 mW. FF = P_max / (I_sc × V_oc) = 0.0192 / (0.040 × 0.60) = 0.0192 / 0.0240 = <b>0.80 (80%)</b>.',

  'phy:5':
    '<b>Physics Lab (LE 1–12 Curvature & Energy Gap):</b> In Newton’s rings lab, a travelling microscope records D₄ = 0.282 cm and D₁₄ = 0.512 cm for λ = 589 nm (sodium lamp). Slope of D² vs n is S = (D₁₄² − D₄²) / (14 − 4) = (0.2621 − 0.0795) / 10 = 0.01826 cm² = 1.826 × 10⁻⁶ m².<br>Plano-convex lens curvature: R = S / (4λ) = (1.826 × 10⁻⁶) / (4 × 589 × 10⁻⁹) = <b>0.775 m = 77.5 cm</b>.<br>In semiconductor energy band gap experiment (Four-Probe): slope of ln(ρ) vs 1000/T is 4.15 K. E_g = 2k · slope = 2 × (8.617 × 10⁻⁵ eV/K) × 4150 K ≈ <b>0.715 eV (Germanium)</b>.',

  // ==========================================
  // 3. Basics of Electrical & Electronics Engineering (100111) — 6 Units
  // ==========================================
  'beee:0':
    '<b>Star–Delta Transformation:</b> Delta network with R_AB = 30 Ω, R_BC = 60 Ω, R_CA = 30 Ω. Equivalent star: ΣR = 30 + 60 + 30 = 120 Ω. Arm R_A = (R_AB · R_CA) / ΣR = (30 × 30) / 120 = <b>7.5 Ω</b>; R_B = (30 × 60) / 120 = <b>15.0 Ω</b>; R_C = (60 × 30) / 120 = <b>15.0 Ω</b>.<br><b>Mesh Analysis:</b> Two loops with V = 20 V driving R₁ = 4 Ω, R₂ = 6 Ω shared, R₃ = 2 Ω in loop 2 with 10 V opposing. Loop 1: (4 + 6)I₁ − 6I₂ = 20 ⇒ 10I₁ − 6I₂ = 20. Loop 2: −6I₁ + (6 + 2)I₂ = −10 ⇒ −6I₁ + 8I₂ = −10. Solving yields <b>I₁ = 2.27 A, I₂ = 0.45 A</b>. Current through shared resistor = I₁ − I₂ = <b>1.82 A</b>.',

  'beee:1':
    '<b>Series RLC Circuit & Power Triangle:</b> R = 30 Ω, L = 0.191 H (X_L = 2π(50)(0.191) = 60 Ω), C = 79.6 µF (X_C = 1 / [2π(50)(79.6 × 10⁻⁶)] = 40 Ω), V = 230 V, 50 Hz.<br>Net reactance: X = X_L − X_C = 60 − 40 = 20 Ω (inductive).<br>Impedance: Z = √(R² + X²) = √(30² + 20²) = √1300 ≈ <b>36.06 Ω</b>.<br>Current: I = V/Z = 230 / 36.06 ≈ <b>6.38 A (lagging)</b>.<br>Power factor: cosφ = R/Z = 30 / 36.06 = <b>0.832 lagging</b>.<br>Active power: P = VI cosφ = 230 × 6.38 × 0.832 ≈ <b>1221 W = 1.22 kW</b>.<br>Reactive power: Q = VI sinφ = 230 × 6.38 × 0.555 ≈ <b>814 VAr</b>; Apparent power: S = VI = 230 × 6.38 = <b>1467 VA</b>.',

  'beee:2':
    '<b>Transformer EMF Equation & Regulation:</b> Single-phase 2200 V / 220 V, 50 Hz transformer has core flux Φ_m = 0.015 Wb (15 mWb).<br>Primary turns: from E₁ = 4.44 f N₁ Φ_m: N₁ = 2200 / (4.44 × 50 × 0.015) = 2200 / 3.33 ≈ <b>661 turns</b>.<br>Secondary turns: N₂ = N₁ × (220 / 2200) = 661 / 10 ≈ <b>66 turns</b>.<br>Voltage regulation: at full load secondary terminal voltage drops to 211.2 V. Regulation = (V_NL − V_FL) / V_NL × 100% = (220 − 211.2) / 220 × 100% = 8.8 / 220 × 100% = <b>4.0%</b>.',

  'beee:3':
    '<b>Full-Wave Bridge Rectifier & Filter:</b> AC secondary voltage V_rms = 12 V (50 Hz) feeds a full-wave bridge rectifier with load R_L = 100 Ω.<br>Peak voltage: V_m = √2 × 12 = 16.97 V. Allowing two diode drops (2 × 0.7 V = 1.4 V): V_m(load) = 15.57 V.<br>DC output voltage: V_dc = 2V_m / π = (2 × 15.57) / π = <b>9.91 V</b>.<br>DC load current: I_dc = 9.91 / 100 = <b>99.1 mA</b>.<br>Ripple factor (unfiltered) = <b>0.482</b>; PIV rating per diode = V_m = <b>16.97 V</b>.<br>With filter capacitor C = 1000 µF: ripple voltage V_r(pp) = I_dc / (2fC) = 0.0991 / (2 × 50 × 10⁻³) = <b>0.99 V</b>.',

  'beee:4':
    '<b>IC 7805 Voltage Regulator & Fuse Sizing:</b> Unregulated DC input V_in = 12 V feeds an IC 7805 fixed linear regulator delivering I_L = 350 mA to a microcontroller circuit.<br>Output voltage: V_out = <b>+5.0 V</b>.<br>Power dissipated in IC: P_diss = (V_in − V_out) · I_L = (12 − 5) × 0.350 = <b>2.45 W</b> (requires clip-on heatsink, thermal resistance θ_ja ≤ 25 °C/W).<br>Fuse protection: rated at 1.5 × I_in(max) = 1.5 × 0.40 A = <b>600 mA fast-acting fuse</b>.<br><b>Earthing Resistance:</b> By IEEE standard, equipment protective earth loop resistance must satisfy R_earth ≤ V_touch / I_trip = 50 V / 30 mA = <b>1666 Ω</b>; utility substation target is <b>≤ 1.0 Ω</b>.',

  'beee:5':
    '<b>BEEE Lab (LE 1–16 Efficiency & Power Factor Correction):</b> In single-phase transformer test, open-circuit test gives iron loss P_i = 22 W; short-circuit test gives full-load copper loss P_cu = 34 W on a 1 kVA, 230 V unit.<br>Efficiency at full load, 0.8 pf lagging: Output = 1000 × 0.8 = 800 W.<br>Total losses = P_i + P_cu = 22 + 34 = 56 W.<br>Efficiency: η = [800 / (800 + 56)] × 100% = 800 / 856 × 100% = <b>93.46%</b>.<br>Maximum efficiency occurs where P_cu = P_i = 22 W at load fraction x = √(22/34) = 0.804 (<b>80.4% full load</b>).',

  // ==========================================
  // 4. Introduction to AI (100105) — 5 Units
  // ==========================================
  'ai:0':
    '<b>PEAS Specification & Environment Classification:</b> Formulate an <i>Automated Medical Diagnosis Expert Agent</i>:<br>• <b>Performance Measure:</b> Diagnostic accuracy rate (minimizing false negatives), average diagnosis time, patient outcome score, treatment cost economy.<br>• <b>Environment:</b> Clinical hospital database, patient electronic health records, live telemetry vitals (ECG, SpO₂).<br>• <b>Actuators:</b> Treatment recommendation report, prescription alert flag, automated lab order dispatch.<br>• <b>Sensors:</b> Keyboard medical history input, digital blood analyzer telemetry, DICOM radiology image feed.<br>• <b>Environment Characteristics:</b> <b>Partially observable</b> (hidden pathologies), <b>Stochastic</b> (individual biological variation), <b>Sequential</b> (interventions alter state), <b>Dynamic</b> (patient condition changes over time), <b>Continuous</b> (vitals are continuous signals).',

  'ai:1':
    '<b>A* Graph Search Execution:</b> Find shortest path from S to G using f(n) = g(n) + h(n).<br>Graph edges: S→A (cost 2), S→B (cost 4), A→C (cost 3), A→D (cost 5), B→D (cost 2), C→G (cost 4), D→G (cost 3).<br>Heuristics: h(S)=6, h(A)=4, h(B)=3, h(C)=3, h(D)=2, h(G)=0 (admissible: h ≤ h*).<br>1. Expand S: Open = {A: g=2, h=4, f=6; B: g=4, h=3, f=7}. Select <b>A</b> (min f = 6).<br>2. Expand A: Paths S→A→C (g=5, h=3, f=8), S→A→D (g=7, h=2, f=9). Open = {B: f=7, C: f=8, D: f=9}. Select <b>B</b> (f = 7).<br>3. Expand B: Path S→B→D gives g = 4 + 2 = 6 < 7. Update D: g=6, h=2, f=8. Open = {C: f=8, D: f=8}. Tie-break select <b>D</b>.<br>4. Expand D: Path S→B→D→G gives g = 6 + 3 = 9, h=0, f=9. Open = {C: f=8, G: f=9}. Select <b>C</b>.<br>5. Expand C: Path S→A→C→G gives g = 5 + 4 = 9, h=0, f=9. Goal G reached.<br><b>Optimal Path: S → B → D → G (or S → A → C → G) with minimal cost g = 9</b>.',

  'ai:2':
    '<b>Propositional Resolution Refutation:</b> Prove Q from Knowledge Base: (1) P, (2) P → R, (3) R → Q.<br>Step 1 (Convert to CNF):<br>Clause 1: P<br>Clause 2: ¬P ∨ R<br>Clause 3: ¬R ∨ Q<br>Step 2 (Negate Goal): Clause 4: ¬Q.<br>Step 3 (Resolution):<br>• Resolve Clause 1 (P) with Clause 2 (¬P ∨ R) ⇒ Clause 5: <b>R</b>.<br>• Resolve Clause 5 (R) with Clause 3 (¬R ∨ Q) ⇒ Clause 6: <b>Q</b>.<br>• Resolve Clause 6 (Q) with Clause 4 (¬Q) ⇒ <b>Empty clause ⊥ (Contradiction)</b>.<br><b>Conclusion:</b> Since refutation produces empty clause, Q is logically entailed by the KB.',

  'ai:3':
    '<b>Bayes’ Rule (Medical Test):</b> Disease prevalence P(D) = 0.01 ⇒ P(¬D) = 0.99. Sensitivity P(+|D) = 0.95 (true positive rate). False positive rate P(+|¬D) = 0.05.<br>Total probability of positive test: P(+) = P(+|D)·P(D) + P(+|¬D)·P(¬D) = (0.95 × 0.01) + (0.05 × 0.99) = 0.0095 + 0.0495 = 0.0590.<br>Posterior probability of disease given positive test: P(D|+) = [P(+|D)·P(D)] / P(+) = 0.0095 / 0.0590 ≈ <b>0.161 (16.1%)</b>.<br>Even with a 95% accurate test, an individual testing positive has only a 16.1% chance of disease due to low baseline prevalence.',

  'ai:4':
    '<b>Single-Layer Perceptron Weight Update:</b> Binary neuron with step activation (y = 1 if Σ wᵢxᵢ + b ≥ 0 else 0). Initial weights w₁ = 0.4, w₂ = −0.5, bias b = −0.2, learning rate η = 0.1. Training instance (x₁, x₂) = (1, 1) with target t = 1.<br>1. Net input: z = w₁x₁ + w₂x₂ + b = (0.4)(1) + (−0.5)(1) + (−0.2) = −0.3.<br>2. Output: y = step(−0.3) = 0.<br>3. Error: e = t − y = 1 − 0 = 1.<br>4. Weight updates (Δwᵢ = η · e · xᵢ):<br>• w₁_new = 0.4 + (0.1 × 1 × 1) = <b>0.5</b>.<br>• w₂_new = −0.5 + (0.1 × 1 × 1) = <b>−0.4</b>.<br>• b_new = −0.2 + (0.1 × 1) = <b>−0.1</b>.<br>Verification: z_new = (0.5)(1) + (−0.4)(1) − 0.1 = 0.0 ≥ 0 ⇒ y_new = 1 = t (Correct).',

  // ==========================================
  // 5. Computer Fundamentals & Emerging Tech (100108) — 5 Units
  // ==========================================
  'cfet:0':
    '<b>Memory Hierarchy & Effective Access Time (EMAT):</b> A computer system has L1 cache (access time t₁ = 1.5 ns, hit rate h₁ = 90%), L2 cache (t₂ = 8.0 ns, local hit rate h₂ = 85%), and main memory (t_m = 60 ns).<br>EMAT = t₁ + (1 − h₁) · [t₂ + (1 − h₂) · t_m].<br>L1 miss penalty = t₂ + (1 − 0.85) × 60 = 8.0 + (0.15 × 60) = 8.0 + 9.0 = 17.0 ns.<br>EMAT = 1.5 + (0.10 × 17.0) = 1.5 + 1.70 = <b>3.20 ns</b>.<br>Speedup over main memory alone = 60 ns / 3.20 ns ≈ <b>18.75×</b>.',

  'cfet:1':
    '<b>2’s Complement Arithmetic:</b> Compute 43 − 19 in 8-bit signed binary.<br>1. Convert +43: 43 = 32 + 8 + 2 + 1 = 00101011₂.<br>2. Convert +19: 19 = 16 + 2 + 1 = 00010011₂.<br>3. 2’s complement of 19: 1’s complement = 11101100₂; add 1 ⇒ <b>11101101₂</b> (−19).<br>4. Add 43 + (−19):<br>  00101011<br>+ 11101101<br>──────────<br> 100011000₂ (9 bits).<br>Discard end-around carry: result = <b>00011000₂ = 16 + 8 = 24₁₀</b> (Verified: 43 − 19 = 24).<br><b>Hex & Octal:</b> 0001 1000₂ = <b>18₁₆ = 30₈</b>.',

  'cfet:2':
    '<b>CPU Scheduling (FCFS vs Round Robin):</b> Processes arrive at t = 0: P₁ (burst 20 ms), P₂ (burst 4 ms), P₃ (burst 4 ms).<br>• <b>FCFS Gantt:</b> P₁ [0–20], P₂ [20–24], P₃ [24–28]. Waiting times: W(P₁) = 0, W(P₂) = 20, W(P₃) = 24 ms. Average Waiting Time = (0 + 20 + 24)/3 = <b>14.67 ms</b>.<br>• <b>Round Robin (q = 4 ms):</b> P₁ [0–4], P₂ [4–8], P₃ [8–12], P₁ [12–28].<br>Waiting times: W(P₁) = 0 + (12 − 4) = 8 ms, W(P₂) = 4 ms, W(P₃) = 8 ms.<br>Average Waiting Time = (8 + 4 + 8)/3 = <b>6.67 ms</b>.<br>Round Robin cuts average wait time by <b>54.5%</b> and eliminates process starvation.',

  'cfet:3':
    '<b>IPv4 Subnetting & Usable Hosts:</b> Given network address 192.168.1.0/24. Subnet into 4 departments of equal size.<br>1. Borrow bits: 2 bits borrowed (2² = 4 subnets). New prefix = /26 (mask 255.255.255.192).<br>2. Block size: 256 / 4 = 64 addresses per subnet. Usable hosts = 64 − 2 = <b>62 hosts/subnet</b>.<br>• <b>Subnet 0:</b> Network 192.168.1.0/26, Usable IPs 192.168.1.1–192.168.1.62, Broadcast 192.168.1.63.<br>• <b>Subnet 1:</b> Network 192.168.1.64/26, Usable IPs 192.168.1.65–192.168.1.126, Broadcast 192.168.1.127.<br>• <b>Subnet 2:</b> Network 192.168.1.128/26, Usable IPs 192.168.1.129–192.168.1.190, Broadcast 192.168.1.191.<br>• <b>Subnet 3:</b> Network 192.168.1.192/26, Usable IPs 192.168.1.193–192.168.1.254, Broadcast 192.168.1.255.',

  'cfet:4':
    '<b>Blockchain Hashing & Proof-of-Work:</b> Block n contains header fields: PreviousHash (H_(n−1)), MerkleRoot (M_n), Timestamp (T_n), and Nonce (N).<br>PoW condition: SHA-256(SHA-256(BlockHeader)) < Target.<br>With difficulty requiring 4 leading zeros: Nonce N = 1 yields hash `7f8a...` (Invalid). After iterating to N = 3841, hash evaluates to `0000a4b9...` (Valid block).<br><b>Immutability Principle:</b> If an adversary alters 1 byte in Block 1 transactions, MerkleRoot M₁ changes, altering H₁. Block 2 contains previous hash H₁; since H₁ changed, Block 2 becomes invalid, cascading down the chain and immediately alerting all decentralized nodes.',

  // ==========================================
  // 6. Universal Human Values (100109) — 5 Units
  // ==========================================
  'uhv:0':
    '<b>Self-Exploration Process & Happiness Evaluation:</b><br>• <b>Core Proposal:</b> "Continuous happiness is achieved solely through physical facility and material wealth."<br>• <b>Validation by Natural Acceptance:</b> When verified introspectively: physical facilities (food, shelter, vehicle) are necessary for bodily sustenance, but satiety is temporary. The Self naturally aspires for respect, trust, and continuous harmony, which cannot be satisfied by inanimate objects.<br>• <b>Experiential Validation:</b> Over-accumulation without relationship leads to anxiety and isolation; accumulation with right understanding leads to prosperity and sharing.<br>• <b>Exam Conclusion:</b> Continuous happiness requires <b>Right Understanding in the Self + Harmony in Relationships</b>, supported by adequate (not unlimited) physical facilities.',

  'uhv:1':
    '<b>Harmony in the Human Being (Self vs Body Matrix):</b><br>1. <b>Need:</b> Self (I) requires Respect, Trust, Knowledge (qualitative, continuous); Body requires Food, Clothing, Shelter (quantitative, temporary).<br>2. <b>Fulfilment:</b> Self needs are fulfilled through <b>Right Understanding and Right Feelings</b>; Body needs are fulfilled through <b>Physico-chemical facilities</b>.<br>3. <b>Activities:</b> Self engages in Desiring, Thinking, Expecting, Imagining (Conscious); Body engages in Breathing, Digesting, Circulation (Material instrument).<br>4. <b>Sanyam and Swasthya:</b> Sanyam is the feeling of responsibility in the Self for nurturing and protecting the Body; Swasthya is the resultant state where the Body functions harmoniously as a reliable instrument.',

  'uhv:2':
    '<b>Nine Values in Human Relationships & Trust Analysis:</b><br>1. <b>Trust (Vishwas) — The Foundation Value:</b> Complete assurance that the other person fundamentally wishes for my happiness and well-being.<br>2. <b>Intention vs Competence:</b><br>• <i>Intention</i>: What a person naturally aspires to do (consistently benevolent in all human beings).<br>• <i>Competence</i>: The ability to actualize that intention (often lacking due to conditioning).<br>3. <b>Resolution:</b> When another makes a mistake, separating their pure intention from their deficient competence prevents anger and enables constructive guidance.<br>4. <b>Universal Order:</b> Harmony in Family ⇒ Trust in Society ⇒ Fearlessness (Abhay) ⇒ Co-existence (Saha-astitva) in Universal Human Order.',

  'uhv:3':
    '<b>Harmony in Nature & The Four Orders:</b><br>1. <b>Material Order (Padartha):</b> Soil, minerals, water, gases — characterized by composition and decomposition.<br>2. <b>Pranic/Plant Order (Prana):</b> Vegetation, herbs — characterized by growth, respiration, and cellular life.<br>3. <b>Animal Order (Jeeva):</b> Animals, birds — characterized by sentient Self desiring survival alongside physical body.<br>4. <b>Human Order (Jnana):</b> Humans — characterized by potential for right understanding and conscious co-existence.<br>• <b>Mutual Fulfilment (Ubhay-Tripti):</b> First 3 orders exist in natural cyclical balance. Humans must align their technology and production to participate cyclically rather than extractively.',

  'uhv:4':
    '<b>Professional Ethics & Transition Strategy:</b><br>1. <b>Definitiveness of Ethical Conduct:</b> Living consistently based on Natural Acceptance across Values (Mulya), Policy (Niti), and Character (Charitra).<br>2. <b>Criteria for Ethical Engineering Technology:</b><br>• <i>People-friendly:</i> Promotes safety, health, and human dignity without exploitation.<br>• <i>Eco-friendly:</i> Utilizes renewable energy, cyclical raw materials, and produces zero persistent pollutants.<br>3. <b>Two-Tiered Transition Strategy:</b><br>• <i>Individual Level:</i> Self-exploration, right understanding, living with Sanyam in family.<br>• <i>Societal Level:</i> Value education in university curricula, ethical institutional governance, and humanistic public policy.',

  // ==========================================
  // 7. Programming for Problem Solving Lab (100112P) — 6 Units
  // ==========================================
  'pps:0':
    '<b>Algorithmic Prime Testing & Flowchart Logic (LE 1–3):</b> Algorithm to test if integer N is prime.<br>1. If N ≤ 1, return False. If N = 2 or N = 3, return True. If N % 2 == 0, return False.<br>2. For d = 3 to ⌊√N⌋ with step 2: if N % d == 0 return False.<br>3. For N = 37: √37 ≈ 6.08. Divisors tested: 3 (37%3 = 1 ≠ 0), 5 (37%5 = 2 ≠ 0). Loop terminates. <b>37 is prime (2 comparisons instead of 35)</b>.<br><b>Flowchart Shapes:</b> Oval (Start/End) → Parallelogram (Input N) → Diamond (Condition d ≤ √N) → Rectangle (Process d = d + 2) → Parallelogram (Print Prime).',

  'pps:1':
    '<b>Matrix Multiplication Algorithm (LE 4–6):</b> Matrix A (2×3) and B (3×2). Product C = A × B has size (2×2).<br>A = [[1, 2, 3], [4, 0, 1]], B = [[2, 1], [0, 3], [1, 4]].<br>• C₁₁ = (1×2) + (2×0) + (3×1) = 2 + 0 + 3 = <b>5</b>.<br>• C₁₂ = (1×1) + (2×3) + (3×4) = 1 + 6 + 12 = <b>19</b>.<br>• C₂₁ = (4×2) + (0×0) + (1×1) = 8 + 0 + 1 = <b>9</b>.<br>• C₂₂ = (4×1) + (0×3) + (1×4) = 4 + 0 + 4 = <b>8</b>.<br>Result C = [[5, 19], [9, 8]]. Triple nested loop complexity = O(rows_A × cols_B × cols_A) = 2 × 2 × 3 = <b>12 scalar multiplications</b>.',

  'pps:2':
    '<b>Recursion Trace & Stack Activation (LE 7–8):</b> Trace factorial(3) and gcd(48, 18).<br>• <b>factorial(3):</b> Push call fact(3) → needs 3 × fact(2) → push fact(2) → needs 2 × fact(1) → push fact(1) → needs 1 × fact(0) → push fact(0). Base case reached: fact(0) returns 1.<br>Unwinding stack: fact(1) = 1×1 = 1; fact(2) = 2×1 = 2; fact(3) = 3×2 = <b>6</b>.<br>• <b>Euclidean GCD:</b> gcd(48, 18) = gcd(18, 48 % 18 = 12) = gcd(12, 18 % 12 = 6) = gcd(6, 12 % 6 = 0). Base case b = 0 returns <b>6</b>.',

  'pps:3':
    '<b>Structure vs Union Memory Layout (LE 9–10):</b><br>```c\nstruct Emp { int id; float sal; char grade; };\nunion Data { int id; float sal; char grade; };\n```<br>On standard 32-bit aligned compiler: sizeof(int)=4, sizeof(float)=4, sizeof(char)=1.<br>• <b>Struct:</b> Fields stored sequentially: [id: 4B] + [sal: 4B] + [grade: 1B + 3B padding] = <b>12 bytes</b>.<br>• <b>Union:</b> All fields share base offset 0: size = max(4, 4, 1) = <b>4 bytes</b>.<br><b>File I/O Error Handling:</b> Always check `FILE *fp = fopen("emp.dat", "rb"); if (!fp) { perror("File error"); exit(1); }` and pair every successful fopen with `fclose(fp);`.',

  'pps:4':
    '<b>C++ Encapsulation & Deep Copy Constructor (LE 11–13):</b><br>```cpp\nclass String {\n  char* str;\npublic:\n  String(const char* s) { str = new char[strlen(s)+1]; strcpy(str, s); }\n  // Copy constructor (Deep Copy):\n  String(const String& o) { str = new char[strlen(o.str)+1]; strcpy(str, o.str); }\n  ~String() { delete[] str; }\n};\n```<br>If default shallow copy were used, copying `String s2 = s1;` would copy raw pointer address. When s1 is destroyed, its destructor frees the memory; when s2 is later destroyed, attempting to delete the same address triggers a fatal <b>double-free runtime segmentation fault</b>. Deep copy guarantees isolated memory management.',

  'pps:5':
    '<b>Runtime Polymorphism & Virtual Function Vtable (LE 14–17):</b><br>```cpp\nclass Shape { public: virtual double area() = 0; }; // Pure virtual\nclass Circle : public Shape { double r; public: Circle(double rad) : r(rad) {} double area() override { return 3.14159 * r * r; } };\nclass Rect : public Shape { double w, h; public: Rect(double a, double b) : w(a), h(b) {} double area() override { return w * h; } };\n```<br>Execution trace: `Shape* s = new Circle(7.0);` calls `s->area()`. Vptr resolves to Circle’s vtable entry, evaluating area = <b>153.94</b>. Pointing `s = new Rect(4, 6);` dynamically evaluates `s->area()` = <b>24.0</b> at runtime through dynamic dispatch.',

  // ==========================================
  // 8. Essence of Indian Constitution (100110) — 5 Units
  // ==========================================
  'eic:0':
    '<b>Preamble & 42nd Amendment Analysis:</b><br>1. <b>Adoption & Commencement:</b> Drafted by Constituent Assembly (Dr. B.R. Ambedkar, Drafting Committee Chair); adopted on <b>26 November 1949</b>; entered into full force on <b>26 January 1950</b>.<br>2. <b>The 42nd Amendment (1976):</b> Added three critical terms to the Preamble: <b>"Socialist"</b>, <b>"Secular"</b>, and <b>"and Integrity"</b>.<br>3. <b>Core Ideals:</b><br>• <i>Sovereign:</i> Complete internal and external supremacy.<br>• <i>Socialist:</i> Democratic socialism promoting elimination of poverty and income disparity.<br>• <i>Secular:</i> State treats all religions with equal respect without state religion.<br>• <i>Democratic Republic:</i> Elected executive and legislature under universal adult suffrage.<br>• <b>Four Objectives:</b> Justice, Liberty, Equality, and Fraternity.',

  'eic:1':
    '<b>Fundamental Rights & Article 32 Writs:</b> Part III (Articles 12–35) provides 6 broad Fundamental Rights. Article 32 guarantees the Right to Constitutional Remedies (termed the "Heart and Soul" of the Constitution by Dr. Ambedkar).<br><b>The Five Prerogative Writs:</b><br>1. <b>Habeas Corpus:</b> "To have the body" — releases persons subjected to illegal or arbitrary detention.<br>2. <b>Mandamus:</b> "We command" — orders a public official or body to perform a statutory duty.<br>3. <b>Prohibition:</b> Prohibits a lower court from exceeding its lawful jurisdiction.<br>4. <b>Certiorari:</b> Quashes an illegal or unconstitutional order issued by an inferior court/tribunal.<br>5. <b>Quo-Warranto:</b> Inquires into the legal legality of a person occupying a public office.',

  'eic:2':
    '<b>Directive Principles (Part IV) vs Fundamental Rights (Part III):</b><br>1. <b>Classification of DPSP (Articles 36–51):</b><br>• <i>Socialistic:</i> Art 39 (adequate livelihood, wealth distribution), Art 39A (equal justice and free legal aid), Art 41 (right to work).<br>• <i>Gandhian:</i> Art 40 (Village Panchayats), Art 43 (cottage industries), Art 47 (prohibition of intoxicating drinks).<br>• <i>Liberal-Intellectual:</i> Art 44 (Uniform Civil Code), Art 48A (environmental protection), Art 50 (separation of judiciary).<br>2. <b>Harmonization (*Minerva Mills case, 1980*):</b> Part III and Part IV are complementary; the Constitution is founded on the bedrock of balance between fundamental rights and directive principles.',

  'eic:3':
    '<b>Bicameral State Legislature (Bihar Governance):</b><br>1. <b>Legislative Assembly (Vidhan Sabha):</b> Directly elected by voters; 5-year term; strength 60–500 members (Bihar = 243). Real power over executive resides here.<br>2. <b>Legislative Council (Vidhan Parishad):</b> Permanent upper house; 1/3 members retire every 2 years; 6-year tenure; size capped at 1/3 of Assembly (minimum 40; Bihar = 75).<br>3. <b>Money Bills Distinction:</b> Money bills originate <i>only</i> in the Assembly on recommendation of Governor. Council can only delay for <b>maximum 14 days</b>; if not returned, bill passes automatically.',

  'eic:4':
    '<b>Constitutional Amendment Procedure (Article 368):</b><br>1. <b>Three Amendment Pathways:</b><br>• <i>Simple Majority:</i> Creation of states, quorum, official language (outside Art. 368).<br>• <i>Special Majority:</i> Majority of total membership + 2/3 of members present and voting in each House (e.g. Fundamental Rights, DPSP).<br>• <i>Special Majority + State Ratification:</i> For federal structure amendments (Presidential election, 7th Schedule lists, Judiciary), requires ratification by ≥ 50% of State Assemblies.<br>2. <b>Basic Structure Doctrine (*Kesavananda Bharati, 1973*):</b> Art. 368 does not grant power to destroy the basic structure (democracy, secularism, rule of law).<br>3. <b>Six Landmark Amendments:</b> 42nd (Mini-constitution, 1976), 44th (Property removed from FR, 1978), 74th (Municipalities, 1992), 76th (TN 69% quota in 9th schedule, 1994), 86th (Art. 21A education, 2002), 91st (Ministry capped at 15% of lower house, 2003).',
};
