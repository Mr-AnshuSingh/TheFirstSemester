import { TopicContent } from '@/types/syllabus';

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

export const BEEE_UNIT2_TOPICS: Record<string, TopicContent> = {
  'beee:2:0': {
    explain: [
      'All electric motors, generators, and transformers operate on two core laws: Faraday’s law of induction and Fleming’s hand rules.',
      'Faraday states that changing magnetic flux generates an electric voltage, while Lenz’s law ensures the induced voltage fights back against the change that created it.',
    ],
    definition:
      'Faraday’s laws of electromagnetic induction state that whenever magnetic flux linking a circuit changes, an electromotive force (EMF) is induced proportional to the rate of change of flux linkages, with polarity dictated by Lenz’s law (e = -N dΦ/dt).',
    formula: 'e = -N \\frac{d\\Phi}{dt}, \\quad F = B I l \\sin\\theta \\quad (\\text{Motor force}), \\quad e = B l v \\sin\\theta \\quad (\\text{Generator EMF})',
    steps: [
      'Faraday’s 1st Law: whenever magnetic flux linking a coil changes, an EMF is induced in it.',
      'Faraday’s 2nd Law: magnitude of induced EMF is directly proportional to rate of change of magnetic flux linkages: e = -N (dΦ/dt).',
      'Lenz’s Law: negative sign indicates that the direction of induced current opposes the flux change producing it (conservation of energy).',
      'Fleming’s Left-Hand Rule (Motors): Thumb = Motion/Force, Forefinger = Magnetic Field B, Center finger = Current I (FBI).',
      'Fleming’s Right-Hand Rule (Generators): gives direction of induced current when a conductor moves through a magnetic field.',
    ],
    examAnswer: [
      'State Faraday’s 1st and 2nd laws of electromagnetic induction with formula e = -N dΦ/dt.',
      'State Lenz’s law and explain why it is an inevitable consequence of the law of conservation of energy.',
      'Differentiate Fleming’s Left-Hand Rule (for electric motors) vs Fleming’s Right-Hand Rule (for electric generators).',
      'State the mechanical force on a current-carrying conductor: F = B I l sin θ.',
    ],
    slip: 'Confusing Fleming’s Left-Hand Rule (Motors: electrical in, mechanical out) with Fleming’s Right-Hand Rule (Generators: mechanical in, electrical out).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'ELECTROMAGNETIC LAWS (FARADAY & FLEMING)', 'ta') +
        P('M40 95 Q60 65 80 95 T120 95 T160 95', 'l') +
        T(70, 60, 'Coil (N turns)', 't') +
        R(180, 80, 50, 30, 'fa') + T(190, 100, 'N', 'ta') + T(215, 100, 'S', 't') +
        LA(240, 95, 175, 95) + T(190, 70, 'Motion v', 't') +
        T(20, 140, 'e = −N dΦ/dt  (Lenz opposes motion)', 'ta') +
        T(200, 140, 'Motors: Left Hand (FBI)', 't') +
        T(200, 155, 'Generators: Right Hand', 'ta') +
        T(20, 180, 'Faraday: flux change induces EMF   |   Lenz: polarity opposes the cause', 'ta')
      ),
      caption: 'Faraday’s induction law e = -N dΦ/dt and Fleming’s hand rules for motor and generator action.',
    },
  },
  'beee:2:1': {
    explain: [
      'Self-inductance is a coil’s internal stubbornness: when its own current changes, it produces a back-EMF fighting the change.',
      'Mutual inductance is magnetic team-working: changing current in a primary coil sends magnetic flux through an adjacent secondary coil, inducing voltage across it without any physical wire touching.',
    ],
    definition:
      'Self-inductance L is the property of a coil by which an EMF is induced in itself due to change of current through it (e = -L di/dt). Mutual inductance M is the property whereby a changing current in one coil induces an EMF in an adjacent magnetically coupled coil (e₂ = -M di₁/dt).',
    formula: 'e_1 = -L \\frac{di_1}{dt}, \\quad e_2 = -M \\frac{di_1}{dt}, \\quad L = \\frac{N^2 \\mu A}{l}, \\quad M = k \\sqrt{L_1 L_2} \\quad (k = \\text{coupling coeff})',
    steps: [
      'Self-inductance L: flux linkages per unit current: L = N Φ / I. Induced back-EMF is e = -L (di/dt) [unit: Henry (H)].',
      'For a solenoid of N turns, area A, and length l: L = μ₀ μ_r N² A / l.',
      'Mutual Inductance M: secondary flux linkages per unit primary current: M = N₂ Φ₂₁ / I₁; induced secondary EMF is e₂ = -M (di₁/dt).',
      'Coefficient of Coupling k: fraction of primary flux linking secondary: M = k √(L₁ L₂), where 0 ≤ k ≤ 1 (k ≈ 1 for iron-core transformers).',
      'Series combination of coupled inductors: L_eq = L₁ + L₂ ± 2M (+ for aiding flux, - for opposing flux).',
    ],
    examAnswer: [
      'Define Self-inductance L and Mutual inductance M with units (Henry) and EMF formulas.',
      'Derive the formula for self-inductance of a solenoid: L = μ N² A / l.',
      'Define the coefficient of coupling k = M / √(L₁ L₂) and explain what k = 1 and k = 0 mean physically.',
      'State the equivalent inductance of two series coupled coils: L_eq = L₁ + L₂ ± 2M.',
    ],
    slip: 'Thinking mutual inductance requires an electrical connection. Mutual inductance relies purely on shared magnetic flux linkages through air or iron; no direct electrical connection is needed.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SELF AND MUTUAL INDUCTANCE', 'ta') +
        P('M40 95 Q55 65 70 95 T100 95 T130 95', 'l') +
        T(50, 60, 'Primary L₁ (N₁)', 't') +
        P('M210 95 Q225 65 240 95 T270 95 T300 95', 'l') +
        T(220, 60, 'Secondary L₂ (N₂)', 't') +
        P('M90 75 Q170 35 250 75', 'ta') +
        T(140, 50, 'Shared Flux Φ₂₁', 'ta') +
        T(20, 140, 'e₁ = −L₁ (di₁/dt)', 't') +
        T(200, 140, 'e₂ = −M (di₁/dt)', 'ta') +
        T(20, 180, 'Coupling: M = k √(L₁ L₂)   |   Series aiding/opposing: L_eq = L₁ + L₂ ± 2M', 'ta')
      ),
      caption: 'Magnetic coupling: primary coil self-inductance L₁ and secondary induced mutual voltage via M.',
    },
  },
  'beee:2:2': {
    explain: [
      'A DC machine is a mechanical chameleon: supply electrical current and it rotates as a DC motor; spin its shaft mechanically and it outputs electrical current as a DC generator.',
      'The split-ring commutator is the mechanical brain: it continuously reverses internal coil connections so motor torque keeps pushing forward in the same direction.',
    ],
    definition:
      'A DC machine is an electromechanical energy converter that operates as a DC generator (mechanical to DC electrical via Fleming’s right-hand rule) or as a DC motor (DC electrical to mechanical via Lorentz force / Fleming’s left-hand rule), unified by a split-ring commutator.',
    formula: 'E_g = \\frac{P \\Phi Z N}{60 A} \\quad (\\text{Generator EMF}), \\quad V = E_b + I_a R_a \\quad (\\text{Motor}), \\quad T_e = \\frac{P \\Phi Z I_a}{2\\pi A} \\ [\\text{N}\\cdot\\text{m}]',
    steps: [
      'Major Construction Parts: Stator (Yoke, Field Poles, Field Windings), Rotor (Armature core with copper windings), Commutator (split copper segments), and Carbon Brushes.',
      'Commutator Action: in a generator, rectifies internal AC into external DC; in a motor, reverses armature current every half-turn to maintain unidirectional torque.',
      'EMF Equation: E = (P Φ Z N) / (60 A), where P = poles, Φ = flux/pole, Z = total conductors, N = RPM, A = parallel paths (A = 2 for wave winding, A = P for lap winding).',
      'DC Motor Back-EMF: E_b = V - I_a R_a; acts as a self-regulating electrical governor.',
      'Classification by Field Connection: Shunt motor (constant speed, for lathes/pumps), Series motor (massive starting torque, for electric trains/cranes), Compound motor (elevators).',
    ],
    examAnswer: [
      'Draw the cross-sectional diagram of a 4-pole DC machine labeling Yoke, Field Poles, Armature, Commutator, and Brushes.',
      'Derive the DC machine EMF equation: E = (P Φ Z N) / (60 A) defining lap (A = P) and wave (A = 2) windings.',
      'Explain the role of back-EMF E_b in DC motors and why starters (3-point starter) are required during startup.',
      'Contrast DC Shunt vs DC Series motors and state one primary application for each.',
    ],
    slip: 'Starting a DC series motor on no-load. A DC series motor on no-load accelerates dangerously to destructive runaway speeds because flux Φ ∝ I_a drops to near-zero.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'DC MACHINE CONSTRUCTION & COMMUTATOR', 'ta') +
        C(180, 95, 60, 'l') + T(150, 42, 'Yoke / Stator Frame', 't') +
        R(110, 80, 20, 30, 'fa') + T(112, 98, 'N', 'ta') +
        R(230, 80, 20, 30, 'fa') + T(232, 98, 'S', 't') +
        C(180, 95, 30, 'l') + T(165, 99, 'Armature', 't') +
        C(180, 95, 14, 'ta') + T(165, 120, 'Commutator', 'ta') +
        R(162, 91, 5, 8, 'l') + R(193, 91, 5, 8, 'l') +
        T(140, 145, 'Brushes', 't') +
        T(20, 180, 'EMF: E = PΦZN / (60A)   |   Commutator flips AC to DC   |   V = E_b + I_aR_a', 'ta')
      ),
      caption: 'Cross-section of a 2-pole DC machine showing stator field poles, rotating armature, and commutator brushes.',
    },
  },
  'beee:2:3': {
    explain: [
      'A transformer is a static electromagnetic device with zero moving parts that steps AC voltage up or down with incredible efficiency (>98%).',
      'It works because alternating current in the primary coil creates a surging magnetic flux through a laminated iron core, which threads through the secondary coil to induce voltage.',
    ],
    definition:
      'A single-phase transformer is a static electrical machine that transfers AC electrical energy from one circuit to another at the identical frequency through mutual electromagnetic induction, stepping voltage up or down.',
    formula: '\\frac{V_1}{V_2} = \\frac{E_1}{E_2} = \\frac{N_1}{N_2} = \\frac{I_2}{I_1} = \\frac{1}{K}, \\quad K = \\frac{N_2}{N_1} \\quad (\\text{Transformation Ratio})',
    steps: [
      'Necessity: electricity must be stepped up to 132kV/400kV for long-distance transmission to minimize I²R losses, then stepped down to 230V for safe home consumption.',
      'Working Principle: Faraday’s mutual induction. When AC voltage V₁ is applied to primary winding, it sets up an alternating magnetic flux Φ in the core.',
      'This flux links both primary and secondary windings, inducing self-EMF E₁ and mutual EMF E₂ without physical electrical contact.',
      'Construction Types: Core Type (windings encircle two vertical core legs) and Shell Type (core encloses the central winding leg).',
      'Core Lamination: core is assembled from thin silicon steel sheets (0.35 mm thick) insulated with varnish to suppress circulating eddy current losses.',
    ],
    examAnswer: [
      'Define a transformer, state its working principle, and explain why it cannot operate on steady DC (zero dΦ/dt causes coil to burn out as a short circuit).',
      'Draw Core-Type and Shell-Type transformer magnetic circuit diagrams.',
      'Explain why the core is laminated and made of silicon steel (laminations reduce eddy current loss; silicon steel reduces hysteresis loss).',
      'State transformation ratio K = N₂ / N₁ = V₂ / V₁ = I₁ / I₂.',
    ],
    slip: 'Connecting a transformer to a DC supply. Because DC has constant flux (dΦ/dt = 0), induced back-EMF is zero, causing massive DC current to melt the primary winding.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SINGLE-PHASE TRANSFORMER CORE & WINDINGS', 'ta') +
        R(90, 45, 180, 100, 'l') +
        R(125, 70, 110, 50, 'l') +
        T(140, 95, 'Laminated Core', 't') +
        P('M80 60 Q65 75 80 90 T80 120', 'ta') + T(40, 95, 'Primary N₁', 'ta') +
        P('M280 60 Q295 75 280 90 T280 120', 'l') + T(290, 95, 'Secondary N₂', 't') +
        P('M100 55 L260 55', 'ta') + LA(200, 55, 260, 55) +
        T(160, 48, 'Mutual Flux Φ', 'ta') +
        T(20, 180, 'Principle: Mutual induction   |   V₁/V₂ = N₁/N₂ = I₂/I₁   |   Zero moving parts (η > 98%)', 'ta')
      ),
      caption: 'Laminated magnetic core with primary winding N₁ and secondary winding N₂.',
    },
  },
  'beee:2:4': {
    explain: [
      'The transformer EMF equation calculates the exact voltage induced in every coil based on AC frequency, turns count, and peak core magnetic flux.',
      'The magic multiplier 4.44 comes from multiplying the 4 quarters of a sine wave cycle by the 1.11 sinusoidal form factor.',
    ],
    definition:
      'The EMF equation of a transformer mathematically relates the induced RMS voltage in primary (E₁) and secondary (E₂) windings to the supply frequency f, number of turns N, and maximum core flux Φ_m.',
    formula: 'E_1 = 4.44 f N_1 \\Phi_m, \\quad E_2 = 4.44 f N_2 \\Phi_m, \\quad \\Phi_m = B_m A_{\\text{core}}',
    steps: [
      'Let core magnetic flux be sinusoidal: Φ = Φ_m sin(2πft).',
      'By Faraday’s law, instantaneous induced EMF is e = -N (dΦ/dt) = -N d/dt [Φ_m sin(2πft)].',
      'Differentiating: e = -N Φ_m (2πf) cos(2πft) = 2πf N Φ_m sin(2πft - 90°).',
      'Maximum peak induced EMF is E_max = 2πf N Φ_m.',
      'RMS value is E = E_max / √2 = (2π / √2) f N Φ_m = √2 π f N Φ_m ≈ 4.44 f N Φ_m.',
      'Alternatively: average EMF per turn = 4 f Φ_m (flux changes from 0 to Φ_m in quarter period T/4 = 1/4f). Multiplying by Form Factor 1.11 gives RMS EMF per turn = 4.44 f Φ_m.',
      'Primary EMF: E₁ = 4.44 f N₁ Φ_m; Secondary EMF: E₂ = 4.44 f N₂ Φ_m.',
    ],
    examAnswer: [
      'Derive the transformer EMF equation E = 4.44 f N Φ_m using calculus differentiation.',
      'Provide the alternative derivation using average rate of flux change over quarter cycle and form factor k_f = 1.11.',
      'State that induced EMF lags flux by 90°.',
      'Calculate secondary voltage for a 50 Hz transformer given N₁ = 1000, N₂ = 200, and Φ_m = 0.03 Wb.',
    ],
    slip: 'Writing 4.0 f N Φ_m instead of 4.44 f N Φ_m. 4.0 gives average EMF; multiplying by form factor 1.11 gives the required RMS voltage 4.44.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'TRANSFORMER EMF DERIVATION & FLUX CYCLE', 'ta') +
        L(30, 95, 230, 95, 'l') + L(30, 30, 30, 160, 'l') +
        P('M30 95 Q65 30 100 95 Q135 160 170 95 Q205 30 240 95', 'ta') +
        T(80, 45, 'Flux Φ = Φ_m sin(ωt)', 'ta') +
        L(100, 30, 100, 95, 'd') + T(105, 35, 'T/4 = 1/(4f)', 't') +
        R(240, 45, 110, 95, 'fa') +
        T(245, 65, 'Average / turn:', 't') +
        T(245, 82, '4 f Φ_m', 'ta') +
        T(245, 105, 'RMS = 1.11 × Avg', 't') +
        T(245, 125, 'E = 4.44 f N Φ_m', 'ta') +
        T(20, 180, 'E₁ = 4.44 f N₁ Φ_m   |   E₂ = 4.44 f N₂ Φ_m   |   4.44 = 4 × Form Factor (1.11)', 'ta')
      ),
      caption: 'Flux waveform quarter-cycle change leading to RMS multiplier 4.44 in transformer EMF formula.',
    },
  },
  'beee:2:5': {
    explain: [
      'An ideal transformer maintains its output voltage perfectly whether it is sitting idle or powering a factory.',
      'A real transformer has internal resistance and leakage reactance in its windings, so output voltage drops as more load current is drawn—this drop is measured by Voltage Regulation.',
    ],
    definition:
      'Voltage regulation of a transformer is the fractional change in secondary terminal voltage from no-load (V_{2,NL}) to full-load (V_{2,FL}) expressed as a percentage of no-load voltage at a specified power factor.',
    formula: '\\% \\text{ Regulation} = \\frac{V_{2,\\text{NL}} - V_{2,\\text{FL}}}{V_{2,\\text{NL}}} \\times 100\\% \\approx \\frac{I_2(R_{02}\\cos\\phi_2 \\pm X_{02}\\sin\\phi_2)}{V_{2,\\text{NL}}} \\times 100\\%',
    steps: [
      'Transformation Ratio: K = N₂ / N₁ = E₂ / E₁ = I₁ / I₂.',
      'No-load condition: secondary current I₂ = 0, so secondary terminal voltage equals induced EMF: V_{2,NL} = E₂.',
      'On load: secondary current I₂ causes internal voltage drops across total equivalent winding resistance R₀₂ and leakage reactance X₀₂.',
      'Terminal voltage drops to V_{2,FL} = E₂ - I₂(R₀₂ + jX₀₂).',
      'Approximate voltage regulation formula: %VR = [I₂(R₀₂ cos φ₂ ± X₀₂ sin φ₂) / V_{2,NL}] × 100%.',
      'Sign rule: + for lagging power factor (inductive loads, terminal voltage drops); - for leading power factor (capacitive loads, terminal voltage can rise via Ferranti-like effect).',
      'Zero regulation condition (perfect constant voltage): occurs at leading power factor when tan φ₂ = -R₀₂ / X₀₂.',
    ],
    examAnswer: [
      'Define voltage regulation of a transformer and state its formula.',
      'Write the approximate formula %VR = [I₂(R₀₂ cos φ ± X₀₂ sin φ) / V₂] × 100% explaining + for lagging and - for leading loads.',
      'Derive the condition for zero voltage regulation (leading power factor: cos φ = X₀₂ / Z₀₂).',
      'Explain why a low voltage regulation value (1–3%) represents superior transformer performance.',
    ],
    slip: 'Using full-load voltage in the denominator instead of no-load voltage. Standard regulation is defined with respect to no-load rated voltage V_{2,NL}.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'TRANSFORMER VOLTAGE REGULATION VS LOAD', 'ta') +
        L(40, 140, 320, 140, 'l') + L(40, 140, 40, 30, 'l') +
        T(325, 145, 'I₂ (Load)', 't') + T(15, 30, 'V₂', 't') +
        L(40, 60, 300, 60, 'd') + T(45, 52, 'V_{2,NL} (No-load rated)', 't') +
        P('M40 60 Q180 60 300 95', 'ta') + T(220, 105, 'Lagging pf (Drop)', 'ta') +
        P('M40 60 Q180 60 300 40', 'l') + T(220, 35, 'Leading pf (Rise)', 't') +
        T(20, 180, '% Reg = (V_{NL} − V_{FL}) / V_{NL} × 100%   |   Lagging drops voltage; leading can rise', 'ta')
      ),
      caption: 'Terminal voltage V₂ variation with load current for lagging, unity, and leading power factor loads.',
    },
  },
  'beee:2:6': {
    explain: [
      'An induction motor is an electrical transformer whose secondary winding is mounted on a spinning axle.',
      'Three-phase currents fed into the stationary outer ring (stator) create a swirling magnetic hurricane rotating at synchronous speed; this dragging field pulls the rotor along behind it with a slight lag called slip.',
    ],
    definition:
      'An induction motor (asynchronous motor) is an AC motor where torque is produced by electromagnetic induction from the stator’s rotating magnetic field (RMF) into rotor conductors, running at a rotor speed N slightly below synchronous speed N_s.',
    formula: 'N_s = \\frac{120 f}{P} \\ [\\text{RPM}], \\quad s = \\frac{N_s - N}{N_s}, \\quad N = N_s(1 - s), \\quad f_r = s f',
    steps: [
      'Stator supplied by 3-phase AC currents produces a constant-magnitude Rotating Magnetic Field (RMF) of strength Φ = 1.5 Φ_m spinning at synchronous speed N_s = 120f / P.',
      'As the RMF sweeps past stationary rotor conductors, it cuts them, inducing rotor EMF and heavy circulating currents.',
      'By Lenz’s law, the rotor produces torque to oppose the relative motion—meaning the rotor chases the rotating magnetic field.',
      'Rotor can never reach synchronous speed N_s: if N = N_s, relative velocity would be zero, no flux would be cut, no current induced, and torque would vanish.',
      'Slip s represents the relative speed difference: s = (N_s - N) / N_s (typically 2% to 5% at full load; s = 1 at standstill).',
      'Single-phase induction motor: single-phase winding produces an oscillating pulsating field, not a rotating field; requires auxiliary winding with phase-split capacitor to start.',
    ],
    examAnswer: [
      'Explain how a 3-phase stator produces a constant-magnitude rotating magnetic field (RMF = 1.5 Φ_m) rotating at N_s = 120f/P.',
      'Define slip s = (N_s - N) / N_s and rotor current frequency f_r = s · f.',
      'Explain why an induction motor can never run at synchronous speed.',
      'Explain the Double Revolving Field Theory for single-phase induction motors (forward and backward revolving fields cancel at standstill, giving zero starting torque).',
    ],
    slip: 'Claiming an induction motor can run at synchronous speed N_s. If it reached N_s, relative motion would cease, induced rotor current would drop to zero, and the motor would immediately decelerate.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'INDUCTION MOTOR ROTATING MAGNETIC FIELD', 'ta') +
        C(180, 95, 60, 'l') + T(180, 25, 'Stator (3-Phase RMF)', 't', 'middle') +
        C(180, 95, 38, 'fa') + T(180, 99, 'Rotor (N)', 't', 'middle') +
        LA(180, 95, 230, 60) + T(210, 50, 'N_s = 120f/P', 'ta') +
        LA(180, 95, 205, 120) + T(210, 125, 'Rotor N', 't') +
        T(20, 155, 'Slip s = (N_s − N) / N_s  (2% to 5%)', 'ta') +
        T(20, 180, 'Rotor chases the 1.5 Φ_m rotating field but can never reach N_s (torque requires slip)', 'ta')
      ),
      caption: 'Stator Rotating Magnetic Field (N_s) inducing torque in the rotor running at speed N.',
    },
  },
  'beee:2:7': {
    explain: [
      'Induction motors are the workhorses of civilization, from giant 3-phase factory drives to the tiny fractional-horsepower motors powering ceiling fans and blenders.',
      'Because single-phase motors cannot start on their own, household appliances use capacitor-start techniques, shaded poles, or universal motors to kick off rotation.',
    ],
    definition:
      'Fractional Horsepower (FHP) motors are electric motors with power output ratings below 1 horsepower (746 Watts), typically single-phase motors engineered for domestic appliances and light machinery.',
    formula: '1 \\text{ HP} = 746 \\text{ W}, \\quad T_{\\text{start}} \\propto I_m I_a \\sin\\theta \\quad (\\theta \\approx 90^\\circ \\text{ with capacitor})',
    steps: [
      '3-Phase Squirrel Cage Induction Motor: rugged, brushless, zero sparking, low maintenance; drives industrial pumps, lathe machines, compressors, and electric trains.',
      'Capacitor-Start Induction Motor: capacitor in series with auxiliary starting winding creates 90° phase shift, producing high starting torque; centrifugal switch disconnects capacitor at 75% speed (refrigerators, water pumps).',
      'Permanent Split Capacitor (PSC) Motor: capacitor remains permanently connected; quiet and reliable (ceiling fans, air conditioner blowers).',
      'Shaded-Pole Motor: low starting torque, extremely cheap and reliable (small cooling fans, microwave turntables).',
      'Universal Motor: series-wound commutator motor operating on both AC and DC; runs at very high speeds > 10,000 RPM (kitchen mixer-grinders, vacuum cleaners, portable drills).',
    ],
    examAnswer: [
      'Define Fractional Horsepower (FHP) motors (< 1 HP / 746 W) and list 4 common household examples.',
      'Explain working of a Capacitor-Start Capacitor-Run motor with schematic diagram showing centrifugal switch.',
      'Explain working and applications of a Universal Motor (operates on AC/DC, high speed for food processors).',
      'Contrast 3-phase squirrel cage motors vs slip ring (wound rotor) induction motors (slip ring allows external resistance for massive starting torque).',
    ],
    slip: 'Confusing universal motors with induction motors. Universal motors have brushes and a commutator just like DC series motors, enabling them to run at ultra-high speeds on AC or DC.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'CAPACITOR-START INDUCTION MOTOR', 'ta') +
        C(180, 95, 30, 'fa') + T(170, 99, 'Rotor', 't') +
        P('M140 35 L140 60 L140 130 L140 155', 'l') +
        T(90, 95, 'Main Winding', 't') +
        P('M220 35 L220 50', 'ta') +
        R(215, 50, 10, 20, 'fa') + T(230, 65, 'Capacitor', 'ta') +
        P('M220 70 L220 85', 'ta') +
        L(215, 85, 225, 95, 'l') + T(230, 95, 'Switch', 't') +
        P('M220 95 L220 155', 'ta') + T(230, 130, 'Aux Winding', 'ta') +
        L(140, 35, 220, 35) + L(140, 155, 220, 155) +
        T(20, 180, 'Capacitor shifts aux current by ~90° → generates starting torque for ceiling fans & pumps', 'ta')
      ),
      caption: 'Capacitor-start single-phase induction motor with auxiliary winding and centrifugal switch.',
    },
  },
};
