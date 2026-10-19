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

export const PHY_UNIT4_TOPICS: Record<string, TopicContent> = {
  'phy:4:0': {
    explain: [
      'Whether a substance conducts electricity depends on the size of the forbidden energy bandgap separating its valence electrons from the conduction highway.',
      'In metals the bands overlap, in insulators the gap is an uncrossable chasm (>5 eV), and in semiconductors the gap is narrow (~1 eV), easily bridged by heat or light.',
    ],
    definition:
      'Materials are classified into conductors (metals), semiconductors, and insulators according to band theory based on the magnitude of the forbidden energy bandgap E_g between the valence band (VB) and conduction band (CB).',
    formula: 'E_g(\\text{metal}) \\approx 0 \\text{ eV}, \\quad E_g(\\text{semiconductor}) \\approx 0.7 - 2 \\text{ eV}, \\quad E_g(\\text{insulator}) > 5 \\text{ eV}',
    steps: [
      'Valence Band (VB): lowest band filled with valence electrons; Conduction Band (CB): higher band where electrons move freely to conduct current.',
      'Forbidden Gap (E_g): forbidden energy interval separating VB and CB.',
      'Conductors (Metals like Cu, Al): CB and VB overlap (E_g = 0 eV) or CB is partially filled; copious free electrons conduct even at 0 K with positive temperature coefficient of resistance.',
      'Insulators (Diamond, Quartz): wide bandgap E_g > 5 eV; at ordinary temperatures, thermal energy kT is inadequate to excite electrons across the gap; resistivity is extremely high (10¹² Ω·m).',
      'Semiconductors (Si: E_g = 1.1 eV, Ge: E_g = 0.7 eV): small bandgap; behaves as an insulator at 0 K, but thermal excitation promotes electrons into CB at room temperature with negative temperature coefficient of resistance.',
    ],
    examAnswer: [
      'Draw the 3 comparative energy band diagrams side by side: Conductor (overlapping bands), Semiconductor (small gap ~1.1 eV), Insulator (wide gap > 5 eV).',
      'Compare conductivity ranges: Conductors (~10⁸ S/m), Semiconductors (10⁻⁴ to 10⁴ S/m), Insulators (<10⁻¹² S/m).',
      'Explain effect of temperature: resistance increases with T in metals (phonon collisions), but decreases with T in semiconductors (carrier generation).',
      'Give standard examples for each category (Cu/Al, Si/Ge, Diamond/Glass).',
    ],
    slip: 'Thinking semiconductors conduct at absolute zero. At 0 K, the conduction band is completely empty and semiconductors behave as perfect insulators.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'BANDGAP CLASSIFICATION OF MATERIALS', 'ta') +
        T(30, 45, '1. Conductor (Overlap)', 't') +
        R(30, 60, 80, 75, 'fa') + T(40, 100, 'VB & CB Overlap', 'ta') +
        T(40, 150, 'E_g ≈ 0 eV', 't') +
        T(140, 45, '2. Semiconductor', 't') +
        R(140, 60, 80, 25, 'l') + T(150, 77, 'CB', 't') +
        R(140, 110, 80, 25, 'fa') + T(150, 127, 'VB', 't') +
        T(145, 100, 'E_g ≈ 1.1 eV', 'ta') +
        T(250, 45, '3. Insulator', 't') +
        R(250, 60, 80, 20, 'l') + T(260, 75, 'CB', 't') +
        R(250, 120, 80, 20, 'fa') + T(260, 135, 'VB', 't') +
        T(255, 105, 'E_g > 5 eV (Huge)', 'ta') +
        T(20, 180, 'Bandgap decides electrical conductivity and temperature coefficient of resistance.', 'ta')
      ),
      caption: 'Energy band diagrams for conductors (overlapping), semiconductors (~1.1 eV), and insulators (>5 eV).',
    },
  },
  'phy:4:1': {
    explain: [
      'An intrinsic semiconductor is pure silicon crystal where electrons and holes can only be born in identical pairs by thermal vibrations.',
      'Extrinsic semiconductors are intentionally poisoned with trace impurities (doping): adding pentavalent phosphorus creates abundant free electrons (n-type), while trivalent boron creates missing electron pockets called holes (p-type).',
    ],
    definition:
      'Intrinsic semiconductors are chemically pure semiconductors where electron concentration equals hole concentration (n = p = n_i), whereas extrinsic semiconductors are doped with donor or acceptor impurities to create n-type (n >> p) or p-type (p >> n) conduction.',
    formula: 'n \\cdot p = n_i^2 \\quad \\text{(Law of Mass Action)}, \\quad \\sigma = q(n \\mu_n + p \\mu_p)',
    steps: [
      'Intrinsic Semiconductor: pure Si (Group IV) forms 4 covalent bonds. Thermal excitation breaks bonds, generating an electron in CB and leaving a hole in VB: n = p = n_i.',
      'Extrinsic Doping: adding Group V donor atoms (P, As, Sb) provides 5 valence electrons: 4 bond with Si, the 5th easily ionizes into CB at donor level E_d (n-type, electrons are majority carriers).',
      'Adding Group III acceptor atoms (B, Al, In) provides 3 valence electrons: accepts an electron from a neighboring bond creating a hole at acceptor level E_a (p-type, holes are majority carriers).',
      'Law of Mass Action: in thermal equilibrium, the product of electron and hole concentrations is constant: n · p = n_i².',
      'Total electrical conductivity: σ = q(n μ_n + p μ_p) where μ_n and μ_p are carrier mobilities.',
    ],
    examAnswer: [
      'Define intrinsic and extrinsic semiconductors and state the purpose of doping.',
      'Contrast n-type vs p-type: dopant valency (Group V vs Group III), majority/minority carriers, donor vs acceptor energy level positions.',
      'State and explain the Law of Mass Action: n · p = n_i².',
      'Write total conductivity equation σ = q(n μ_n + p μ_p) and explain why electron mobility μ_n is higher than hole mobility μ_p.',
    ],
    slip: 'Believing an n-type semiconductor is negatively charged overall. It is electrically neutral because positive donor ions balance the negative free conduction electrons.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'INTRINSIC VS EXTRINSIC (n-TYPE & p-TYPE)', 'ta') +
        T(30, 45, 'Pure Intrinsic: n = p = n_i', 't') +
        R(30, 60, 90, 20, 'l') + T(40, 75, 'CB: electrons', 't') +
        R(30, 110, 90, 20, 'fa') + T(40, 125, 'VB: holes', 't') +
        T(140, 45, 'n-Type (Group V Donor)', 'ta') +
        R(140, 60, 90, 20, 'l') + T(145, 75, 'CB: n >> p', 'ta') +
        L(140, 85, 230, 85, 'd') + T(150, 95, 'E_d donor level', 't') +
        R(140, 110, 90, 20, 'fa') +
        T(250, 45, 'p-Type (Group III Acceptor)', 'ta') +
        R(250, 60, 90, 20, 'l') +
        L(250, 105, 340, 105, 'd') + T(260, 100, 'E_a acceptor', 't') +
        R(250, 110, 90, 20, 'fa') + T(255, 125, 'VB: p >> n', 'ta') +
        T(20, 180, 'Law of Mass Action: n · p = n_i²   |   Doping creates majority carriers without net charge.', 'ta')
      ),
      caption: 'Energy band comparison of intrinsic semiconductor with n-type (donor level E_d) and p-type (acceptor level E_a).',
    },
  },
  'phy:4:2': {
    explain: [
      'Carriers move through semiconductors by two distinct mechanisms: drift (pushed by an electric field) and diffusion (spreading naturally from crowded to empty zones).',
      'The Fermi level acts as the thermodynamic chemical potential: the exact energy mark where the probability of finding an electron is exactly 50%.',
    ],
    definition:
      'Drift is carrier motion driven by an applied electric field (J_drift = σ E), diffusion is carrier motion driven by spatial concentration gradients (J_diff = q D dn/dx), and the Fermi energy E_F is the energy level with 50% occupation probability at any temperature.',
    formula: 'J_{\\text{total}} = q n \\mu_n E + q D_n \\frac{dn}{dx}, \\quad \\frac{D_n}{\\mu_n} = \\frac{kT}{q} \\quad (\\text{Einstein Relation}), \\quad f(E) = \\frac{1}{1 + e^{(E - E_F)/kT}}',
    steps: [
      'Drift Current: applied electric field E accelerates carriers with drift velocity v_d = μ E; current density J_drift = q(n μ_n + p μ_p) E.',
      'Diffusion Current: non-uniform carrier density causes random thermal spreading; current density J_{n,diff} = q D_n (dn/dx) and J_{p,diff} = -q D_p (dp/dx).',
      'Einstein Relation links diffusion and mobility: D / μ = kT / q = V_t (thermal voltage ≈ 26 mV at 300 K).',
      'Fermi-Dirac Distribution: f(E) = 1 / [1 + e^{(E - E_F)/kT}]; at E = E_F, f(E) = 1/2 for all temperatures.',
      'Fermi Level Positions: in intrinsic semiconductors, E_F lies near the exact center of the bandgap (E_Fi ≈ (E_c + E_v)/2); in n-type, E_F shifts upward near E_c; in p-type, E_F shifts downward near E_v.',
    ],
    examAnswer: [
      'Define drift and diffusion currents with mathematical equations and explain the negative sign in hole diffusion.',
      'State and prove the Einstein relation: D / μ = kT / q.',
      'Write Fermi-Dirac distribution function and show that f(E) = 1/2 at E = E_F.',
      'Sketch the Fermi level positions for intrinsic, n-type, and p-type semiconductors.',
    ],
    slip: 'Confusing drift (proportional to electric field E) with diffusion (proportional to density gradient dn/dx, occurs even with zero electric field).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'CARRIER TRANSPORT & FERMI LEVEL POSITIONS', 'ta') +
        T(30, 45, 'Drift: J = q n μ E', 't') +
        LA(40, 60, 110, 60) + T(50, 75, 'Field E pushes e⁻', 't') +
        T(30, 105, 'Diffusion: J = q D dn/dx', 't') +
        T(40, 125, 'High conc → Low conc', 'ta') +
        T(180, 45, 'Fermi Level Shifts E_F', 'ta') +
        R(180, 60, 150, 18, 'l') + T(190, 73, 'Conduction Band E_c', 't') +
        L(180, 85, 330, 85, 'ta') + T(190, 95, 'E_F (n-type near E_c)', 'ta') +
        L(180, 115, 330, 115, 'd') + T(190, 125, 'E_F (intrinsic mid-gap)', 't') +
        L(180, 145, 330, 145, 'a') + T(190, 140, 'E_F (p-type near E_v)', 'a') +
        R(180, 155, 150, 18, 'fa') + T(190, 168, 'Valence Band E_v', 't') +
        T(20, 182, 'Einstein relation: D/μ = kT/q   |   Fermi level position dictates majority carrier type.', 'ta')
      ),
      caption: 'Carrier drift/diffusion mechanisms and characteristic Fermi level E_F shifts across doping types.',
    },
  },
  'phy:4:3': {
    explain: [
      'A photodiode is a reverse-biased semiconductor P-N junction specially packaged behind a transparent optical window.',
      'When incoming light strikes the depletion zone, photons knock electrons free, creating electron-hole pairs that reverse-current flows in direct proportion to light brightness.',
    ],
    definition:
      'A photodiode is a reverse-biased semiconductor P-N junction diode that operates in the third quadrant of its I-V characteristics, converting incident optical radiation into an electrical photocurrent via internal photoelectric absorption.',
    formula: 'I_{\\text{total}} = I_0 (e^{qV/kT} - 1) - I_L \\approx -(I_0 + I_L), \\quad \\mathcal{R} = \\frac{I_L}{P_{\\text{opt}}} = \\frac{\\eta q}{h\\nu} \\ [\\text{A/W}]',
    steps: [
      'Structure: P-N junction operated strictly under reverse bias (V < 0) with an anti-reflection coated optical window.',
      'Incident light with photon energy hν ≥ E_g enters the wide reverse-biased depletion region.',
      'Photons break covalent bonds, generating electron-hole pairs in the high-field depletion zone.',
      'The strong built-in electric field sweeps electrons toward the n-region and holes toward the p-region before they can recombine.',
      'This generates a reverse photocurrent I_L that is directly proportional to incident optical power P_opt.',
      'Dark Current I_d: small residual leakage current flowing under reverse bias even in complete darkness.',
    ],
    examAnswer: [
      'Draw the construction diagram and circuit symbol of a photodiode under reverse bias.',
      'Draw the I-V characteristic curve in the third quadrant showing photocurrent scaling with illumination intensity.',
      'Explain why photodiodes are operated in reverse bias (fractional change in minority carrier current ΔI/I_min is far larger and more measurable than in forward bias).',
      'Define Responsivity: R = I_L / P_opt and Quantum Efficiency η.',
    ],
    slip: 'Connecting the photodiode in forward bias. In forward bias, massive diffusion current overwhelms the tiny light-generated photocurrent.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'PHOTODIODE OPERATION & III-QUADRANT I-V', 'ta') +
        R(40, 50, 50, 60, 'l') + T(55, 85, 'p', 't') +
        R(90, 50, 30, 60, 'fa') + T(95, 75, 'E-field', 'ta') +
        R(120, 50, 50, 60, 'l') + T(135, 85, 'n', 't') +
        LA(95, 20, 105, 45) + T(80, 20, 'Photons hν', 'ta') +
        L(40, 110, 40, 140) + L(170, 110, 170, 140) +
        L(40, 140, 95, 140) + L(120, 140, 170, 140) +
        R(95, 133, 25, 14, 'l') + T(98, 144, '− +', 't') +
        L(210, 85, 330, 85, 'l') + L(270, 30, 270, 150, 'l') +
        T(335, 90, 'V', 't') + T(275, 35, 'I', 't') +
        P('M210 100 L270 100', 'l') +
        P('M210 120 L270 120', 'ta') +
        P('M210 140 L270 140', 'ta') +
        T(215, 150, 'I_L ∝ Illumination', 'ta') +
        T(20, 180, 'Reverse bias: photons generate carrier pairs swept by junction field → linear I_L vs light', 'ta')
      ),
      caption: 'Photodiode: carrier generation in reverse-biased depletion layer and III-quadrant I-V characteristics.',
    },
  },
  'phy:4:4': {
    explain: [
      'A bipolar junction transistor (BJT) sandwiches three semiconductor regions (Emitter, Base, Collector) to form a controllable current valve.',
      'A trickle of current through the paper-thin base controls a massive flood of current from emitter to collector, acting as an amplifier or digital switch.',
    ],
    definition:
      'A BJT is a three-terminal, current-controlled active semiconductor device consisting of two back-to-back P-N junctions (Emitter-Base forward-biased, Collector-Base reverse-biased) where a small base current controls a large collector current.',
    formula: 'I_E = I_B + I_C, \\quad I_C = \\beta I_B + I_{CEO}, \\quad \\beta = \\frac{\\alpha}{1 - \\alpha}, \\quad \\alpha = \\frac{I_C}{I_E} < 1',
    steps: [
      'Construction (NPN): heavily doped Emitter (injects carriers), ultra-thin and lightly doped Base (minimizes recombination), moderately doped Collector (collects carriers).',
      'Biasing for Active Mode: E-B junction forward biased (low resistance), C-B junction reverse biased (high resistance).',
      'Emitter injects large density of electrons into Base.',
      'Because Base is extremely thin (~1 μm) and lightly doped, over 95–99% of injected electrons diffuse across without recombining with holes.',
      'These electrons enter the strong electric field of the reverse-biased C-B junction and are pulled into the Collector, forming I_C.',
      'Small base recombination current I_B controls large output collector current I_C: current gain β = I_C / I_B (typically 50–300).',
    ],
    examAnswer: [
      'Draw the NPN transistor physical structure showing relative doping and widths (Emitter heavily doped, Base thin/lightly doped, Collector large/moderately doped).',
      'Explain transistor action in active mode: forward-biased EB junction injects electrons; reverse-biased CB junction sweeps them into collector.',
      'State current relations: I_E = I_B + I_C and I_C = α I_E + I_CBO.',
      'Derive relationship between common-base gain α and common-emitter gain β: β = α / (1 - α).',
    ],
    slip: 'Treating the collector and emitter as interchangeable. The emitter is heavily doped to maximize carrier injection; the collector is physically larger to dissipate heat.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'BIPOLAR JUNCTION TRANSISTOR (NPN)', 'ta') +
        R(40, 50, 70, 65, 'l') + T(50, 85, 'Emitter (n⁺)', 't') +
        R(110, 50, 25, 65, 'fa') + T(112, 85, 'B (p)', 'ta') +
        R(135, 50, 95, 65, 'l') + T(150, 85, 'Collector (n)', 't') +
        LA(75, 115, 75, 140) + T(65, 155, 'I_E', 't') +
        LA(122, 115, 122, 140) + T(115, 155, 'I_B (small)', 'ta') +
        LA(185, 140, 185, 115) + T(175, 155, 'I_C (large)', 't') +
        T(250, 60, 'E-B: Forward biased', 't') +
        T(250, 80, 'C-B: Reverse biased', 't') +
        T(250, 105, 'I_E = I_B + I_C', 'ta') +
        T(250, 125, 'β = I_C / I_B ~ 100', 'ta') +
        T(20, 180, 'Base is ultra-thin & lightly doped: 99% of emitter electrons reach the collector.', 'ta')
      ),
      caption: 'NPN transistor construction: forward-biased emitter-base junction and reverse-biased collector junction.',
    },
  },
  'phy:4:5': {
    explain: [
      'A Light Emitting Diode (LED) converts electrical energy directly into light with high efficiency and zero heat wastage.',
      'Under forward bias, injected electrons fall from the conduction band into valence band holes, releasing their bandgap energy as photons.',
    ],
    definition:
      'A Light Emitting Diode (LED) is a heavily doped forward-biased P-N junction diode fabricated from direct bandgap compound semiconductors that emits incoherent optical radiation via spontaneous radiative electron-hole recombination.',
    formula: '\\lambda = \\frac{hc}{E_g} \\approx \\frac{1.24}{E_g \\text{ (in eV)}} \\ \\mu\\text{m}, \\quad \\eta_{\\text{ext}} = \\frac{\\text{photons emitted}}{\\text{electrons injected}}',
    steps: [
      'Fabricated from direct bandgap materials: GaAs (infrared), GaAsP (red/amber), GaN (blue), GaP (green).',
      'Under forward bias, external voltage reduces the depletion barrier height, injecting electrons into p-region and holes into n-region.',
      'In the active region, injected minority carriers spontaneously recombine across the bandgap.',
      'In direct bandgap materials, conduction band minimum aligns with valence band maximum at k = 0, so recombination conserves momentum and releases photons: hν ≈ E_g.',
      'In indirect materials (Si, Ge), transitions require lattice phonons and release heat, yielding negligible light.',
      'Emission wavelength is tuned by bandgap engineering: λ = hc / E_g.',
    ],
    examAnswer: [
      'Draw the forward-biased P-N junction diagram showing radiative electron-hole recombination.',
      'Explain why direct bandgap semiconductors (GaAs, GaN) are required for LEDs while indirect semiconductors (Si, Ge) cannot emit light.',
      'Write the emission wavelength equation: λ = hc / E_g.',
      'List 4 advantages of LEDs: low power consumption, long operating lifetime (>50,000 hrs), fast switching speed, and rugged solid-state durability.',
    ],
    slip: 'Saying LEDs can be made from pure Silicon. Silicon has an indirect bandgap where electron-hole recombination generates heat (phonons), not photons.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'LIGHT EMITTING DIODE (LED) PRINCIPLE', 'ta') +
        R(50, 50, 70, 70, 'l') + T(75, 90, 'p-type', 't') +
        R(120, 50, 20, 70, 'fa') + T(122, 65, 'Jxn', 'ta') +
        R(140, 50, 70, 70, 'l') + T(165, 90, 'n-type', 't') +
        LA(25, 85, 45, 85) + T(10, 85, '+V', 't') +
        LA(130, 85, 115, 85) +
        LA(130, 85, 170, 30) + LA(135, 75, 185, 25) +
        T(180, 25, 'Photons hν = E_g', 'ta') +
        R(240, 50, 100, 70, 'fa') +
        T(250, 70, 'Direct Bandgap', 'ta') +
        T(250, 90, 'GaAs: Red/IR', 't') +
        T(250, 110, 'GaN: Blue/UV', 't') +
        T(20, 180, 'Forward bias injects carriers; direct bandgap recombination emits light of λ = hc/E_g', 'ta')
      ),
      caption: 'LED operation: spontaneous radiative recombination across direct bandgap under forward bias.',
    },
  },
  'phy:4:6': {
    explain: [
      'When an electric current passes through a conductor placed inside a perpendicular magnetic field, moving carriers are shoved sideways by the Lorentz force.',
      'Charges pile up on one edge until an electric voltage builds up across the width—measuring this Hall voltage reveals whether carriers are electrons or holes, and counts how many exist per cubic centimeter.',
    ],
    definition:
      'The Hall effect is the production of a transverse potential difference (Hall voltage V_H) across an electrical conductor or semiconductor carrying an electric current when placed in a perpendicular magnetic field.',
    formula: 'V_H = \\frac{B I}{n q t}, \\quad R_H = \\frac{1}{n q} = \\frac{E_y}{J_x B_z}, \\quad \\mu_H = \\sigma |R_H|',
    steps: [
      'Consider a semiconductor slab of width w and thickness t carrying current I_x along x-axis inside magnetic field B_z along z-axis.',
      'Moving charge carriers of velocity v_x experience magnetic Lorentz force: F_m = q(v_x × B_z), deflecting them along y-axis.',
      'Charges accumulate on the side face, setting up a transverse Hall electric field E_H along y-axis.',
      'Charge buildup continues until the electric force balances the magnetic force: q E_H = q v_x B_z ⇒ E_H = v_x B_z.',
      'Since current density J_x = n q v_x, drift velocity is v_x = J_x / (n q).',
      'Hall field is E_H = (1 / nq) J_x B_z = R_H J_x B_z, where Hall coefficient is R_H = 1 / (n q).',
      'Hall voltage V_H = E_H · w = (B I) / (n q t). Sign of V_H indicates carrier type (negative for electrons, positive for holes).',
    ],
    examAnswer: [
      'Draw the 3D rectangular semiconductor slab showing current I, magnetic field B, carrier deflection, and Hall voltage V_H.',
      'Derive the Hall coefficient formula R_H = 1 / (nq) and Hall voltage V_H = (BI) / (nqt) from Lorentz force balance.',
      'List 4 major applications of Hall effect: determine semiconductor type (n or p), measure carrier concentration n = 1/(q R_H), measure carrier mobility μ_H = σ R_H, and design magnetic field sensors / gaussmeters.',
      'Explain why Hall effect is pronounced in semiconductors but negligible in metals (semiconductors have far lower carrier concentration n, making V_H thousands of times larger).',
    ],
    slip: 'Forgetting slab thickness t in the denominator: V_H = BI / (nqt). Hall voltage is inversely proportional to thickness, which is why thin films are used.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'HALL EFFECT & LORENTZ DEFLECTION', 'ta') +
        R(80, 50, 160, 75, 'fa') +
        T(100, 90, 'Semiconductor slab (t, w)', 't') +
        LA(20, 87, 80, 87) + T(30, 78, 'Current I_x', 't') +
        LA(160, 160, 160, 125) + T(170, 155, 'Magnetic Field B_z', 'ta') +
        LA(160, 87, 160, 55) + T(170, 65, 'Lorentz Force F_m', 'ta') +
        T(85, 65, '− − − − − (charges pile up)', 'ta') +
        T(85, 115, '+ + + + +', 't') +
        L(80, 50, 40, 50) + L(80, 125, 40, 125) +
        T(10, 92, 'V_H', 'ta') +
        T(20, 180, 'V_H = B I / (n q t)   |   Hall Coefficient R_H = 1 / (n q)   |   Sign gives carrier type', 'ta')
      ),
      caption: 'Hall effect: transverse voltage V_H generated by magnetic Lorentz force deflecting charge carriers.',
    },
  },
  'phy:4:7': {
    explain: [
      'A solar cell is a large-area P-N junction photodiode designed to generate electrical power directly from sunlight without batteries.',
      'Sunlight generates electron-hole pairs across the junction; the built-in barrier sweeps electrons into the n-side and holes into the p-side, driving DC current through an external load.',
    ],
    definition:
      'A solar cell is an un-biased semiconductor P-N junction photovoltaic device that operates in the fourth quadrant of its I-V curve, converting sunlight directly into electricity via the photovoltaic effect.',
    formula: '\\text{FF} = \\frac{P_{\\max}}{V_{oc} I_{sc}} = \\frac{V_m I_m}{V_{oc} I_{sc}}, \\quad \\eta = \\frac{P_{\\max}}{P_{\\text{in}}} = \\frac{V_{oc} I_{sc} \\text{FF}}{P_{\\text{in}}} \\times 100\\%',
    steps: [
      'Photogeneration: photons with energy hν ≥ E_g penetrate the thin emitter layer and create electron-hole pairs in and around the depletion region.',
      'Separation: the strong internal electric field sweeps electrons to the n-region and holes to the p-region, creating an open-circuit photo-voltage V_oc.',
      'Collection: metal grid fingers collect electrons while bottom contact collects holes, driving load current I.',
      'Short-Circuit Current (I_sc): maximum current when output terminals are shorted (V = 0).',
      'Open-Circuit Voltage (V_oc): maximum voltage across terminals when load resistance is infinite (I = 0).',
      'Fill Factor (FF): ratio of maximum deliverable power box (V_m · I_m) to theoretical maximum product (V_oc · I_sc); typically 0.7 to 0.85.',
    ],
    examAnswer: [
      'Draw the physical structure of a solar cell showing top finger metal grid, anti-reflective coating, thin n-layer, thick p-substrate, and back contact.',
      'Draw the fourth-quadrant I-V characteristic curve labeling I_sc, V_oc, and Maximum Power Point P_max (V_m, I_m).',
      'Define Fill Factor (FF = P_max / (V_oc · I_sc)) and Energy Conversion Efficiency (η = P_max / P_in).',
      'Explain why Silicon (E_g ≈ 1.1 eV) is the ideal semiconductor for terrestrial solar cells (matches solar spectrum peak).',
    ],
    slip: 'Confusing solar cell operation with photodiode operation. Photodiodes require external reverse bias battery power; solar cells operate with zero external bias as power generators.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SOLAR CELL IV CHARACTERISTIC & FILL FACTOR', 'ta') +
        L(40, 30, 320, 30, 'l') + L(40, 30, 40, 160, 'l') +
        T(330, 35, 'V', 't') + T(15, 160, 'I', 't') +
        T(45, 145, 'I_sc', 'ta') +
        P('M40 140 Q180 140 240 110 L280 30', 'ta') +
        T(285, 25, 'V_oc', 'ta') +
        R(40, 30, 195, 75, 'd') +
        T(150, 75, 'P_max = V_m · I_m', 't') +
        C(235, 105, 4, 'fa') + T(240, 115, 'MPP', 'ta') +
        T(20, 180, 'Fill Factor FF = P_max / (V_oc · I_sc)   |   Efficiency η = P_max / P_in', 'ta')
      ),
      caption: 'Solar cell IV curve in the fourth quadrant defining short-circuit current I_sc, open-circuit voltage V_oc, and MPP.',
    },
  },
  'phy:4:8': {
    explain: [
      'Nanoscience is the study of matter shrunk down to the scale of 1 to 100 nanometers—where objects are only a few tens to hundreds of atoms across.',
      'At this tiny scale, classical rules give way to quantum confinement, completely transforming a material’s color, strength, melting point, and electrical conductivity.',
    ],
    definition:
      'Nanoscience is the study and manipulation of materials at dimensions between approximately 1 and 100 nanometers, where novel quantum mechanical size-dependent phenomena emerge compared to bulk matter.',
    formula: '1 \\text{ nm} = 10^{-9} \\text{ m} = 10 \\text{ \\AA} \\quad (\\text{typical atom diameter } \\approx 0.1 - 0.3 \\text{ nm})',
    steps: [
      'Scale definition: nanoscale spans 1 nm to 100 nm (a human hair is ~80,000 nm thick).',
      'Transition from classical to quantum regime: when physical dimensions shrink below the de Broglie wavelength or exciton Bohr radius, quantum confinement takes over.',
      'Two primary synthesis paradigms: Top-down approach (carving bulk down via lithography, mechanical milling) and Bottom-up approach (assembling atomic clusters via sol-gel, chemical vapor deposition).',
      'Significance: enables Moore’s Law microprocessors (2nm/3nm gates), targeted cancer drug nanocarriers, ultra-strong carbon nanotube composites, and self-cleaning catalytic coatings.',
    ],
    examAnswer: [
      'Define nanoscale (1–100 nm) and nanoscience.',
      'Explain why nanoscale properties differ radically from bulk materials (quantum confinement and massive surface-to-volume ratio).',
      'Contrast Top-Down fabrication (etching/milling) vs Bottom-Up synthesis (molecular self-assembly/sol-gel).',
      'List 4 engineering applications: semiconductor nano-transistors, quantum dot displays, antibacterial silver nanoparticles, and carbon nanotube aerospace composites.',
    ],
    slip: 'Thinking nanomaterials are just fine powders with standard properties. At the nanoscale, fundamental physical properties like color, melting temperature, and chemical reactivity alter completely.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'THE NANOSCALE REGIME (1 nm to 100 nm)', 'ta') +
        L(30, 95, 330, 95, 'l') +
        L(50, 85, 50, 105) + T(40, 120, '0.1 nm (Atom)', 't') +
        L(140, 85, 140, 105, 'ta') + T(120, 80, '1 nm (DNA / Dot)', 'ta') +
        L(240, 85, 240, 105, 'ta') + T(220, 80, '100 nm (Virus)', 'ta') +
        L(310, 85, 310, 105) + T(280, 120, '100 μm (Hair)', 't') +
        R(140, 87, 100, 16, 'fa') +
        T(145, 100, 'NANOMATERIALS', 'ta') +
        T(20, 180, 'Scale 1–100 nm: quantum confinement dominates electronic and optical properties.', 'ta')
      ),
      caption: 'The nanoscale realm: bridging isolated single atoms with classical bulk macrostructures.',
    },
  },
  'phy:4:9': {
    explain: [
      'When you chop a solid block into microscopic nanoparticles, two dramatic transformations occur.',
      'First, the surface-to-volume ratio skyrockets so nearly all atoms sit on the surface, making nanoparticles super-reactive catalysts. Second, quantum confinement widens the bandgap, turning inert bulk gold into red/blue light emitters.',
    ],
    definition:
      'Nanomaterials exhibit unique size-dependent chemical and optical properties distinct from bulk matter due to dramatic increases in surface-to-volume ratio and quantum confinement widening of the effective energy bandgap.',
    formula: '\\frac{\\text{Surface Area}}{\\text{Volume}} = \\frac{6 a^2}{a^3} = \\frac{6}{a} \\propto \\frac{1}{R}, \\quad \\Delta E_g \\propto \\frac{1}{R^2}',
    steps: [
      'Surface-to-Volume Ratio: for a cube of side a, surface area is 6a² and volume is a³, giving ratio S/V = 6/a. As particle size shrinks from 10 μm to 1 nm, S/V increases by 10,000 times.',
      'Surface Atoms: in a bulk crystal, <1% of atoms sit on the surface; in a 3 nm nanoparticle, >50% of atoms sit on the surface with dangling bonds, causing extreme catalytic reactivity and lower melting points.',
      'Quantum Confinement: confining electron-hole pairs (excitons) in dimensions smaller than the exciton Bohr radius discretizes continuous energy bands into atomic-like levels.',
      'Bandgap Blue-Shift: effective bandgap expands as E_g(nano) = E_g(bulk) + (ħ²π² / 2m* R²). Smaller nanoparticles emit shorter, bluer wavelengths.',
    ],
    examAnswer: [
      'Derive the surface-to-volume ratio scaling law: S/V ∝ 1/R and explain why nanoparticles make superior chemical catalysts.',
      'Explain why the melting point of gold drops from 1064°C in bulk to <400°C for 2 nm particles (high fraction of surface atoms with fewer binding neighbors).',
      'Explain quantum confinement and show why effective bandgap widens with 1/R².',
      'Give example: bulk gold is chemically inert and yellow; gold nanoparticles are highly catalytic and appear vibrant ruby red.',
    ],
    slip: 'Assuming the energy bandgap narrows at the nanoscale. Quantum confinement squeezes the wave function, which forces the energy bandgap to widen (blue shift).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SURFACE-TO-VOLUME RATIO & BANDGAP EXPANSION', 'ta') +
        R(40, 50, 70, 70, 'l') +
        T(40, 135, 'Bulk Cube (a)', 't') +
        T(40, 150, 'S/V = 6 / a', 't') +
        LA(120, 85, 170, 85) +
        T(125, 75, 'Subdivide', 't') +
        R(180, 55, 20, 20, 'fa') + R(210, 55, 20, 20, 'fa') +
        R(180, 85, 20, 20, 'fa') + R(210, 85, 20, 20, 'fa') +
        T(180, 135, 'Nanoparticles (a/n)', 'ta') +
        T(180, 150, 'S/V explodes ∝ 1/R', 'ta') +
        T(250, 60, 'Quantum Confinement:', 't') +
        T(250, 85, 'E_g(R) = E_g(bulk) +', 'ta') +
        T(260, 105, 'ħ²π² / (2m* R²)', 'ta') +
        T(20, 180, 'Nano size increases surface reactivity and widens effective bandgap (blue-shift).', 'ta')
      ),
      caption: 'Surface-to-volume ratio scaling and quantum confinement bandgap widening in nanoparticles.',
    },
  },
  'phy:4:10': {
    explain: [
      'Nanostructures are classified by how many spatial dimensions are trapped at the nanoscale (less than 100 nm).',
      'A quantum well confines carriers in 1 direction (2D sheet), a nanowire in 2 directions (1D needle), and a quantum dot in all 3 directions (0D artificial atom).',
    ],
    definition:
      'Nanostructured materials are classified by the number of spatial dimensions outside the nanoscale into 0D (quantum dots, confined in all 3 dimensions), 1D (nanowires/nanotubes, 2 confined dimensions), 2D (nanosheets/quantum wells, 1 confined dimension), and 3D (bulk nanocomposites).',
    formula: '0\\text{D: } d_x, d_y, d_z < 100\\text{ nm}, \\quad 1\\text{D: } d_x, d_y < 100\\text{ nm}, d_z > 100\\text{ nm}, \\quad 2\\text{D: } d_z < 100\\text{ nm}',
    steps: [
      '0D Nanostructures (Quantum Dots, Nanoparticles): confined in all 3 dimensions; carriers have 0 degrees of freedom, creating sharp atom-like discrete delta-function density of states.',
      '1D Nanostructures (Nanowires, Nanotubes, Nanorods): confined in 2 dimensions, free to move along 1 dimension; density of states scales as E^{-1/2} (e.g., carbon nanotubes).',
      '2D Nanostructures (Quantum Wells, Graphene, Nanosheets): confined in 1 dimension (thickness < 100 nm), free in 2 dimensions; density of states forms a staircase function.',
      '3D Nanostructures: bulk materials with nanoscale grain structures or dispersed nanoparticles throughout.',
    ],
    examAnswer: [
      'Draw the classification table comparing 0D, 1D, 2D, and 3D nanostructures with number of confined dimensions and degrees of freedom.',
      'Sketch the density of states g(E) vs energy for 3D (continuous parabolic √E), 2D (staircase), 1D (spikes E^{-1/2}), and 0D (delta-function peaks).',
      'Give real-world examples: 0D (CdSe quantum dots for QLED TVs), 1D (Carbon nanotubes, Silicon nanowires), 2D (Graphene monolayers).',
    ],
    slip: 'Confusing 0D and 2D terminology. 0D means ZERO unconfined dimensions (confined in all 3 dimensions); 2D means carriers are free in TWO dimensions (confined in 1 dimension).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'CLASSIFICATION OF NANOSTRUCTURES', 'ta') +
        T(30, 45, '0D: Quantum Dot', 'ta') +
        C(60, 85, 18, 'fa') +
        T(30, 120, 'All 3 dims < 100nm', 't') +
        T(30, 135, 'Discrete states', 't') +
        T(140, 45, '1D: Nanowire / CNT', 'ta') +
        R(150, 75, 60, 16, 'fa') +
        T(140, 120, '2 dims < 100nm', 't') +
        T(140, 135, '1 free dimension', 't') +
        T(250, 45, '2D: Graphene / Well', 'ta') +
        P('M260 90 L300 70 L340 70 L300 90 Z', 'fa') +
        T(250, 120, '1 dim (thickness)', 't') +
        T(250, 135, '2 free dimensions', 't') +
        T(20, 180, 'Dimensionality controls density of states: 0D acts as artificial atom with discrete spectra.', 'ta')
      ),
      caption: 'Classification of nanostructured materials: 0D quantum dots, 1D nanowires, and 2D nanosheets.',
    },
  },
};
