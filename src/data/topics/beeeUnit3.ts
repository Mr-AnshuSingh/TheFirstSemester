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

export const BEEE_UNIT3_TOPICS: Record<string, TopicContent> = {
  'beee:3:0': {
    explain: [
      'Pure silicon has 4 valence electrons in every atom, locking all electrons into crystal bonds so it barely conducts electricity.',
      'Doping with Group V elements (phosphorus) creates free electrons (n-type), while doping with Group III elements (boron) creates missing-electron gaps called holes (p-type).',
    ],
    definition:
      'Intrinsic semiconductors are pure tetravalent elements (Si, Ge) with equal electron-hole concentrations (n = p = n_i). Extrinsic semiconductors are doped with trivalent (acceptor) or pentavalent (donor) atoms to tailor majority carrier conductivity.',
    formula: 'n \\cdot p = n_i^2, \\quad \\sigma = q(n \\mu_n + p \\mu_p), \\quad n_i(T) = A T^{3/2} e^{-E_g / 2kT}',
    steps: [
      'Intrinsic Silicon (Group IV): 4 covalent bonds; at 0 K, all electrons are locked (insulator); thermal energy creates electron-hole pairs.',
      'Extrinsic n-type: doped with pentavalent donors (P, As, Sb); 5th electron easily enters conduction band; electrons are majority carriers (n ≈ N_d >> p).',
      'Extrinsic p-type: doped with trivalent acceptors (B, Al, Ga); creates vacancy holes in valence band; holes are majority carriers (p ≈ N_a >> n).',
      'Law of Mass Action: n · p = n_i² holds in thermal equilibrium for both intrinsic and extrinsic crystals.',
    ],
    examAnswer: [
      'Define intrinsic and extrinsic semiconductors and explain the purpose of doping.',
      'Contrast n-type vs p-type: dopant valency, majority/minority carriers, and energy level diagrams.',
      'State the Law of Mass Action: n · p = n_i².',
      'Explain why an extrinsic semiconductor remains electrically neutral despite having majority free carriers.',
    ],
    slip: 'Thinking p-type semiconductor material carries a net positive electrostatic charge. It is electrically neutral because negative ionized acceptor cores balance the mobile positive holes.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SEMICONDUCTOR DOPING (n-TYPE & p-TYPE)', 'ta') +
        R(40, 50, 110, 80, 'l') +
        T(55, 75, 'n-Type (P donor)', 'ta') +
        T(55, 95, '• e⁻ majority', 't') +
        T(55, 115, '⊕ fixed donor ion', 't') +
        R(210, 50, 110, 80, 'l') +
        T(225, 75, 'p-Type (B acceptor)', 'ta') +
        T(225, 95, '○ hole majority', 't') +
        T(225, 115, '⊖ fixed acceptor ion', 't') +
        T(20, 180, 'n · p = n_i² (Mass Action)   |   Total crystal is electrically neutral in both types', 'ta')
      ),
      caption: 'Carrier doping: mobile majority carriers balanced by immobile ionic donor/acceptor cores.',
    },
  },
  'beee:3:1': {
    explain: [
      'When p-type and n-type silicon are joined in a single crystal, electrons and holes rush across the border and cancel each other out.',
      'This leaves behind an uncrossable wall of bare ions called the depletion region, which sets up a built-in barrier voltage (~0.7V for Silicon).',
    ],
    definition:
      'A P-N junction diode is a two-terminal semiconductor device formed by joining p-type and n-type regions, creating an internal space-charge depletion layer with a built-in potential barrier V_0 (~0.7V for Si, ~0.3V for Ge).',
    formula: 'V_0 = V_t \\ln\\left( \\frac{N_a N_d}{n_i^2} \\right), \\quad V_t = \\frac{kT}{q} \\approx 26 \\text{ mV at 300 K}',
    steps: [
      'Diffusion: majority electrons diffuse from n to p, and majority holes diffuse from p to n.',
      'Recombination near metallurgical junction leaves behind exposed immobile donor ions (+ on n-side) and acceptor ions (- on p-side).',
      'This forms a charge-depleted zone called the Depletion Layer.',
      'The uncovered ions generate a strong internal electric field pointing from n to p.',
      'Built-in barrier potential V_0 reaches equilibrium when the opposing drift current exactly balances the forward diffusion current (V_0 ≈ 0.7 V for Si, 0.3 V for Ge).',
    ],
    examAnswer: [
      'Draw the P-N junction cross-section showing depletion layer, immobile ions, and built-in electric field.',
      'Derive/state the built-in potential formula: V_0 = V_t ln(N_a N_d / n_i²).',
      'Explain how equilibrium is achieved (drift current balances diffusion current).',
      'State barrier potential values: 0.7V for Silicon and 0.3V for Germanium.',
    ],
    slip: 'Confusing depletion layer ions with free carriers. The depletion layer is depleted of all mobile free carriers, containing only fixed un-neutralized donor and acceptor ions.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'P-N JUNCTION DEPLETION LAYER', 'ta') +
        R(50, 50, 100, 75, 'l') + T(75, 85, 'p-side (Holes)', 't') +
        R(150, 50, 60, 75, 'fa') + T(152, 75, '− −  + +', 'ta') + T(152, 95, 'Depletion', 'ta') +
        R(210, 50, 100, 75, 'l') + T(235, 85, 'n-side (Electrons)', 't') +
        LA(200, 110, 160, 110) + T(155, 120, 'Built-in E₀', 'ta') +
        T(20, 155, 'Barrier Potential: V₀ ≈ 0.7 V (Si), 0.3 V (Ge)', 't') +
        T(20, 180, 'Diffusion of carriers leaves uncovered ions → internal field prevents further crossing', 'ta')
      ),
      caption: 'P-N junction depletion layer showing uncovered fixed ions and built-in electric field E₀.',
    },
  },
  'beee:3:2': {
    explain: [
      'Forward bias connects positive to the p-side, shrinking the barrier and letting thousands of carriers flood across like an open dam.',
      'Reverse bias connects negative to the p-side, pulling carriers away from the junction, widening the barrier, and choking current to a tiny nanoamp leakage.',
    ],
    definition:
      'Forward bias applies external voltage opposing the built-in barrier (p to +, n to -), narrowing the depletion layer and allowing exponential current flow. Reverse bias aids the barrier (p to -, n to +), widening depletion and blocking current.',
    formula: 'I = I_0 \\left( e^{V / \\eta V_t} - 1 \\right) \\quad (\\eta = 1 \\text{ for Ge, } 2 \\text{ for Si at low currents})',
    steps: [
      'Forward Bias (p +, n -): external field opposes built-in field; barrier height reduces to (V_0 - V); depletion width narrows.',
      'Once applied voltage exceeds knee voltage V_k (~0.7V for Si), majority carriers flood across junction; current rises exponentially.',
      'Reverse Bias (p -, n +): external field aids built-in field; barrier height expands to (V_0 + V_R); depletion layer widens.',
      'Majority carrier flow is completely blocked; only thermally generated minority carriers can cross, producing tiny reverse saturation current I_0.',
      'I_0 is practically independent of reverse voltage, but doubles roughly every 10°C rise in temperature.',
    ],
    examAnswer: [
      'Draw the forward bias circuit and reverse bias circuit with polarities.',
      'State Shockley diode equation: I = I_0 (e^{V / η V_t} - 1).',
      'Draw the complete I-V characteristic curve labeling knee voltage V_k and reverse saturation current I_0.',
      'Contrast forward resistance (~10–100 Ω) vs reverse resistance (> 1 MΩ).',
    ],
    slip: 'Thinking reverse current I_0 increases with reverse voltage. I_0 is saturated and almost independent of voltage; it depends primarily on temperature.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'FORWARD VS REVERSE BIAS OPERATION', 'ta') +
        T(30, 45, 'Forward Bias: Narrow barrier', 'ta') +
        R(30, 60, 40, 50, 'l') + R(70, 60, 15, 50, 'fa') + R(85, 60, 40, 50, 'l') +
        LA(20, 85, 30, 85) + T(10, 85, '+', 't') + LA(135, 85, 125, 85) + T(140, 85, '−', 't') +
        T(40, 125, 'Current flows exponentially', 't') +
        T(200, 45, 'Reverse Bias: Wide barrier', 't') +
        R(200, 60, 30, 50, 'l') + R(230, 60, 55, 50, 'fa') + R(285, 60, 30, 50, 'l') +
        LA(190, 85, 200, 85) + T(180, 85, '−', 't') + LA(325, 85, 315, 85) + T(330, 85, '+', 't') +
        T(205, 125, 'Blocked! Only leakage I₀', 'ta') +
        T(20, 180, 'Forward knee V_k ≈ 0.7 V (Si)   |   Reverse saturation current I₀ doubles every 10°C', 'ta')
      ),
      caption: 'Depletion width variation under forward bias (narrowed, high conduction) and reverse bias (widened, blocked).',
    },
  },
  'beee:3:3': {
    explain: [
      'Heat strongly impacts semiconductors: rising temperature creates more minority carrier pairs, causing reverse leakage current to double every 10°C.',
      'If you push reverse voltage too far, the diode breaks down by either Zener breakdown (quantum field ripping electrons free) or Avalanche breakdown (carrier bowling-ball collisions).',
    ],
    definition:
      'Diode temperature dependence causes forward knee voltage to drop by 2.5 mV/°C and reverse current to double every 10°C. Reverse breakdown occurs either by Zener mechanism (high electric field tunneling, <6V) or Avalanche mechanism (impact ionization, >6V).',
    formula: '\\frac{dV}{dT} \\approx -2.5 \\text{ mV/}^\\circ\\text{C}, \\quad I_0(T_2) = I_0(T_1) \\cdot 2^{(T_2 - T_1)/10}',
    steps: [
      'Temperature Effect on Forward Bias: barrier potential decreases as temperature rises; knee shifts left by ~ -2.5 mV/°C.',
      'Temperature Effect on Reverse Bias: thermal generation of electron-hole pairs increases; reverse leakage current doubles every 10°C.',
      'Zener Breakdown (< 6 V): occurs in heavily doped diodes with extremely thin depletion layer (<10 nm); intense electric field (>10⁶ V/m) directly pulls valence electrons out of covalent bonds by quantum tunneling; negative temperature coefficient.',
      'Avalanche Breakdown (> 6 V): occurs in lightly doped diodes with wide depletion layer; high reverse voltage accelerates minority carriers to massive kinetic energies; carriers smash into lattice atoms, knocking out secondary carriers via impact ionization (chain avalanche); positive temperature coefficient.',
    ],
    examAnswer: [
      'Explain temperature effects on forward knee voltage (-2.5 mV/°C) and reverse saturation current (doubles every 10°C).',
      'Differentiate Zener Breakdown vs Avalanche Breakdown across 5 parameters: doping level, depletion width, breakdown voltage range, operating mechanism (tunneling vs impact ionization), and temperature coefficient.',
      'State why Zener breakdown is reversible and non-destructive if current is limited by an external resistor.',
    ],
    slip: 'Assuming breakdown burns the diode instantly. Breakdown is fully reversible and non-destructive as long as external series resistance limits the power dissipation below P_max.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'BREAKDOWN MECHANISMS (ZENER VS AVALANCHE)', 'ta') +
        T(30, 45, '1. Zener (< 6V, Heavy Doping)', 'ta') +
        T(40, 70, 'Ultra-thin depletion layer', 't') +
        T(40, 90, 'Field > 10⁶ V/m pulls e⁻', 't') +
        T(40, 110, 'Quantum Tunneling', 'ta') +
        T(40, 130, 'Negative Temp Coeff', 't') +
        T(200, 45, '2. Avalanche (> 6V, Light Doping)', 't') +
        T(210, 70, 'Wide depletion layer', 't') +
        T(210, 90, 'High velocity collisions', 't') +
        T(210, 110, 'Impact Ionization', 'ta') +
        T(210, 130, 'Positive Temp Coeff', 't') +
        T(20, 180, 'Zener: direct field rupture (<6V)   |   Avalanche: carrier impact multiplication (>6V)', 'ta')
      ),
      caption: 'Comparison of Zener breakdown (quantum tunneling) and Avalanche breakdown (impact ionization).',
    },
  },
  'beee:3:4': {
    explain: [
      'A half-wave rectifier uses a single diode to convert AC into pulsing DC by letting the positive half-cycle pass and chopping off the negative half.',
      'Because it throws away half of the incoming energy wave, its maximum theoretical efficiency is only 40.6%, leaving a high ripple factor of 1.21.',
    ],
    definition:
      'A half-wave rectifier is an electronic circuit utilizing a single diode that conducts only during positive half-cycles of the AC input voltage, producing a pulsating unidirectional DC output with theoretical maximum efficiency of 40.6%.',
    formula: 'V_{\\text{dc}} = \\frac{V_m}{\\pi} \\approx 0.318 V_m, \\quad V_{\\text{rms}} = \\frac{V_m}{2}, \\quad \\gamma = \\sqrt{\\left(\\frac{V_{\\text{rms}}}{V_{\\text{dc}}}\\right)^2 - 1} = 1.21, \\quad \\eta_{\\max} = 40.6\\%, \\quad \\text{PIV} = V_m',
    steps: [
      'Circuit: step-down AC transformer secondary connected to single diode D in series with load resistor R_L.',
      'Positive Half-Cycle: diode is forward-biased, conducts, and full positive half-sine appears across load R_L: v_o = V_m sin(ωt).',
      'Negative Half-Cycle: diode is reverse-biased, blocks current, and output voltage is zero: v_o = 0.',
      'Average DC Voltage: V_dc = (1/2π) ∫₀^π V_m sin θ dθ = V_m / π ≈ 0.318 V_m.',
      'RMS Output Voltage: V_rms = √[(1/2π) ∫₀^π V_m² sin² θ dθ] = V_m / 2 = 0.5 V_m.',
      'Ripple Factor γ = √[(V_rms / V_dc)² - 1] = √[(π/2)² - 1] ≈ 1.21 (AC ripple exceeds DC output).',
      'Peak Inverse Voltage (PIV): maximum reverse voltage across non-conducting diode is PIV = V_m.',
    ],
    examAnswer: [
      'Draw the half-wave rectifier circuit diagram with transformer, single diode, and load resistor R_L.',
      'Draw input and output waveforms showing conduction only during positive half-cycles.',
      'Derive expressions for V_dc = V_m / π and V_rms = V_m / 2.',
      'Derive ripple factor γ = 1.21 and maximum efficiency η = 40.6% / (1 + r_f/R_L).',
      'State Peak Inverse Voltage: PIV = V_m.',
    ],
    slip: 'Writing V_rms = V_m / √2 for a half-wave rectifier. That is for a full sine wave; for half-wave rectification where the negative half is zero, V_rms = V_m / 2.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'HALF-WAVE RECTIFIER CIRCUIT & WAVEFORMS', 'ta') +
        R(30, 80, 20, 30, 'l') + T(15, 95, 'AC In', 't') +
        L(50, 80, 90, 80) +
        P('M90 70 L110 80 L90 90 Z', 'ta') + L(110, 70, 110, 90, 'ta') +
        L(110, 80, 160, 80) +
        P('M160 80 L160 90 L150 95 L170 105 L150 115 L160 120 L160 130', 'l') + T(175, 105, 'R_L', 't') +
        L(50, 110, 160, 130) +
        L(200, 60, 330, 60, 'l') + P('M200 60 Q215 30 230 60 Q245 90 260 60 Q275 30 290 60', 't') +
        T(205, 45, 'Input AC', 't') +
        L(200, 125, 330, 125, 'l') + P('M200 125 Q215 95 230 125 L260 125 Q275 95 290 125', 'ta') +
        T(205, 110, 'Output: V_dc = V_m / π', 'ta') +
        T(20, 180, 'Efficiency η_max = 40.6%   |   Ripple Factor γ = 1.21   |   PIV = V_m', 'ta')
      ),
      caption: 'Half-wave rectifier schematic and pulsating output waveform with 40.6% maximum efficiency.',
    },
  },
  'beee:3:5': {
    explain: [
      'A full-wave rectifier uses either two diodes with a center-tapped transformer or four diodes in a bridge to flip negative half-cycles into positive pulses.',
      'Because it utilizes both halves of the AC wave, its DC output and efficiency double to 81.2%, cutting the ripple factor down to 0.48.',
    ],
    definition:
      'A full-wave rectifier is an electronic circuit utilizing two center-tapped diodes or four bridge diodes that conducts during both halves of the AC cycle, producing a unidirectional output with 81.2% maximum efficiency and ripple factor of 0.48.',
    formula: 'V_{\\text{dc}} = \\frac{2 V_m}{\\pi} \\approx 0.637 V_m, \\quad V_{\\text{rms}} = \\frac{V_m}{\\sqrt{2}} \\approx 0.707 V_m, \\quad \\gamma = 0.482, \\quad \\eta_{\\max} = 81.2\\%',
    steps: [
      'Two Configurations: Center-Tapped (2 diodes, requires bulky center-tapped transformer, PIV = 2V_m) and Bridge Rectifier (4 diodes, standard transformer, PIV = V_m).',
      'Bridge Rectifier Operation: during positive half-cycle, diodes D₁ and D₃ conduct while D₂ and D₄ are reverse-biased.',
      'During negative half-cycle, diodes D₂ and D₄ conduct while D₁ and D₃ are reverse-biased.',
      'Current flows through load resistor R_L in the exact same direction during both half-cycles.',
      'Average DC Voltage: V_dc = 2 V_m / π ≈ 0.637 V_m (twice the half-wave rectifier).',
      'RMS Output Voltage: V_rms = V_m / √2 ≈ 0.707 V_m.',
      'Ripple Factor: γ = √[(V_rms / V_dc)² - 1] = √[(π / 2√2)² - 1] ≈ 0.482.',
      'Fundamental ripple frequency is 2f (100 Hz for a 50 Hz supply), making output smoothing filters far smaller and cheaper.',
    ],
    examAnswer: [
      'Draw the bridge rectifier circuit showing 4 diodes (D₁-D₄) and load R_L with current direction arrows for both half-cycles.',
      'Draw input AC and rectified full-wave output waveforms.',
      'Derive V_dc = 2 V_m / π and V_rms = V_m / √2.',
      'Derive ripple factor γ = 0.482 and maximum efficiency η = 81.2%.',
      'Contrast Center-Tapped vs Bridge rectifiers (Bridge requires no center-tap and has half the PIV rating).',
    ],
    slip: 'Writing PIV = V_m for a center-tapped rectifier. Center-tapped full-wave rectifiers require diodes rated for PIV = 2V_m; only the bridge rectifier has PIV = V_m.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'BRIDGE FULL-WAVE RECTIFIER & WAVEFORMS', 'ta') +
        P('M80 85 L110 55 L140 85 L110 115 Z', 'l') +
        T(105, 50, 'D₁', 't') + T(145, 85, 'D₂', 't') + T(105, 125, 'D₃', 't') + T(65, 85, 'D₄', 't') +
        L(40, 85, 80, 85) + L(140, 85, 180, 85) +
        L(110, 55, 110, 40) + L(110, 115, 110, 130) +
        L(200, 125, 330, 125, 'l') +
        P('M200 125 Q215 95 230 125 Q245 95 260 125 Q275 95 290 125 Q305 95 320 125', 'ta') +
        T(210, 90, 'Full-Wave: V_dc = 2V_m / π', 'ta') +
        T(210, 145, 'Ripple freq = 2f (100 Hz)', 't') +
        T(20, 180, 'Efficiency η_max = 81.2%   |   Ripple Factor γ = 0.482   |   Bridge PIV = V_m', 'ta')
      ),
      caption: 'Bridge full-wave rectifier and rectified output showing conduction across both half-cycles.',
    },
  },
  'beee:3:6': {
    explain: [
      'Rectified DC is not smooth; it pulses wildly between zero and peak voltage.',
      'Filters use capacitors placed across the load to store charge at peaks and release it during valleys, smoothing the pulsating bumps into a steady, flat DC line.',
    ],
    definition:
      'A filter is an electronic circuit connected between a rectifier and load resistor consisting of capacitors (in shunt) and/or inductors (in series) that removes AC ripple harmonics to provide steady DC voltage.',
    formula: 'V_{\\text{dc}} = V_m - \\frac{I_{\\text{dc}}}{4 f C} = V_m - \\frac{V_m}{4 f R_L C}, \\quad \\gamma \\approx \\frac{1}{4\\sqrt{3} f C R_L} \\quad (\\text{Full-wave capacitor filter})',
    steps: [
      'Need for Filters: rectifier output contains both DC average component and undesirable AC ripple harmonics.',
      'Shunt Capacitor Filter: capacitor C connected in parallel with load R_L.',
      'Charging: when diode conducts, capacitor charges rapidly to peak input voltage V_m.',
      'Discharging: when diode turns off, capacitor discharges slowly through load R_L with time constant τ = R_L C.',
      'If R_L C >> T/2, discharge is minimal before the next peak charges C again, maintaining high average DC voltage near V_m.',
      'Ripple factor for full-wave capacitor filter: γ = 1 / (4√3 f C R_L). Ripple decreases as capacitance C or load resistance R_L increases.',
      'Series Inductor Filter (L): opposes changes in current; ripple factor γ = R_L / (3√2 ωL); works best for heavy load currents (small R_L).',
      'LC Choke and π-Filters (C-L-C): combine low ripple with excellent voltage regulation.',
    ],
    examAnswer: [
      'Draw the circuit diagram of a full-wave rectifier with shunt capacitor filter.',
      'Draw the filtered output waveform showing capacitor charging and discharging cycles with peak-to-peak ripple V_r(p-p).',
      'State the ripple factor formula for full-wave capacitor filter: γ = 1 / (4√3 f C R_L).',
      'Explain why a capacitor filter is suited for light loads (high R_L) while an inductor filter is suited for heavy loads (low R_L).',
    ],
    slip: 'Thinking a capacitor filter improves under heavy load currents. Heavy load current (small R_L) discharges the capacitor rapidly, causing severe voltage sag and high ripple.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SHUNT CAPACITOR FILTER & SMOOTHING', 'ta') +
        L(30, 60, 90, 60) + L(30, 130, 90, 130) +
        T(15, 95, 'Rectifier', 't') +
        L(90, 60, 150, 60) + L(90, 130, 150, 130) +
        L(110, 80, 110, 110, 'ta') + L(120, 80, 120, 110, 'ta') + T(125, 95, 'Filter C', 'ta') +
        L(115, 60, 115, 80) + L(115, 110, 115, 130) +
        P('M150 70 L150 120', 'l') + T(155, 95, 'R_L', 't') +
        L(190, 125, 330, 125, 'l') +
        P('M190 60 Q210 30 230 60 Q250 30 270 60 Q290 30 310 60', 'd') +
        P('M200 45 L225 35 L260 55 L285 35 L320 55', 'ta') +
        T(205, 75, 'Filtered smooth DC (near V_m)', 'ta') +
        T(20, 180, 'Capacitor charges to V_m and discharges through R_L   |   Ripple γ ≈ 1 / (4√3 f C R_L)', 'ta')
      ),
      caption: 'Full-wave rectifier with shunt capacitor filter converting pulsating peaks into smooth DC.',
    },
  },
  'beee:3:7': {
    explain: [
      'A normal diode burns out if pushed past breakdown, but a Zener diode is specially doped to thrive in reverse breakdown.',
      'Once in breakdown, the Zener diode voltage clamps rock-solid at V_Z regardless of wild fluctuations in line input voltage or load current, making it an ideal voltage regulator.',
    ],
    definition:
      'A Zener diode is a heavily doped silicon P-N junction diode designed to operate continuously in its reverse breakdown region, maintaining an essentially constant terminal voltage V_Z across wide variations in load current and unregulated input voltage.',
    formula: 'V_L = V_Z = \\text{constant}, \\quad I_S = I_Z + I_L, \\quad R_S = \\frac{V_{\\text{in}} - V_Z}{I_S} = \\frac{V_{\\text{in}} - V_Z}{I_{Z,\\min} + I_L}',
    steps: [
      'Circuit: unregulated DC input voltage V_in connected across series current-limiting resistor R_s and parallel Zener diode D_Z in reverse bias across load R_L.',
      'Condition for Regulation: input voltage must exceed Zener breakdown rating: V_in > V_Z.',
      'Line Regulation (variable V_in, constant R_L): if V_in rises, excess voltage drops across R_s; Zener absorbs extra current (I_Z rises), keeping load voltage clamped at V_Z.',
      'Load Regulation (constant V_in, variable R_L): if load current I_L increases, Zener current I_Z automatically drops to maintain total current I_s = I_Z + I_L constant, keeping V_L = V_Z.',
      'Zener operating limits: Zener current must stay between minimum knee current I_{Z,min} and maximum power dissipation limit I_{Z,max} = P_{Z,max} / V_Z.',
    ],
    examAnswer: [
      'Draw the complete Zener diode voltage regulator circuit diagram with R_s, Zener diode, and load resistor R_L.',
      'Explain the working principle for Line Regulation (varying input voltage) and Load Regulation (varying load resistance).',
      'Derive the formula for series resistance: R_s = (V_{in,min} - V_Z) / (I_{Z,min} + I_{L,max}).',
      'Solve a numerical problem finding R_s and maximum Zener power dissipation given input voltage range and load current.',
    ],
    slip: 'Connecting the Zener diode in forward bias. In forward bias, a Zener diode acts like an ordinary silicon diode with a 0.7V drop; voltage regulation requires reverse breakdown operation.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'ZENER DIODE VOLTAGE REGULATOR', 'ta') +
        T(20, 85, 'Unregulated V_in', 't') +
        P('M90 75 L100 65 L110 85 L120 65 L130 75', 'l') + T(105, 55, 'R_s', 't') +
        L(40, 75, 90, 75) + L(130, 75, 200, 75) +
        L(200, 75, 200, 90) +
        P('M190 90 L210 90 L200 105 Z', 'ta') +
        P('M185 85 L190 90 L210 90 L215 95', 'ta') +
        L(200, 105, 200, 135) + T(160, 105, 'V_Z', 'ta') +
        L(200, 75, 270, 75) +
        P('M270 85 L270 125', 'l') + T(280, 105, 'R_L', 't') +
        L(40, 135, 270, 135) +
        T(280, 75, '+', 'ta') + T(280, 135, '−', 'ta') +
        T(290, 95, 'Regulated V_Z', 'ta') +
        T(20, 180, 'V_L clamped at V_Z   |   I_s = I_Z + I_L   |   R_s drops excess voltage (V_in − V_Z)', 'ta')
      ),
      caption: 'Zener shunt voltage regulator: clamps output voltage at V_Z despite input or load swings.',
    },
  },
  'beee:3:8': {
    explain: [
      'A Bipolar Junction Transistor (BJT) is a three-layer semiconductor sandwich with two P-N junctions: Emitter, Base, and Collector.',
      'A tiny current flowing through the middle Base terminal controls a massive flow of current from Emitter to Collector, acting as an electronic valve.',
    ],
    definition:
      'A Bipolar Junction Transistor (BJT) is a three-terminal, current-controlled semiconductor device consisting of two back-to-back P-N junctions (NPN or PNP) where conduction involves both majority and minority charge carriers.',
    formula: 'I_E = I_B + I_C, \\quad I_C = \\beta I_B + I_{CEO}, \\quad \\beta = \\frac{\\alpha}{1 - \\alpha}, \\quad \\alpha = \\frac{I_C}{I_E}',
    steps: [
      'Three Terminals: Emitter (heavily doped, injects carriers), Base (ultra-thin, lightly doped, controls transit), Collector (moderately doped, largest physical area, collects carriers).',
      'NPN vs PNP: NPN uses electrons as main carriers (higher mobility, faster switching, widely preferred); PNP uses holes.',
      'Active Mode Biasing: Emitter-Base (EB) junction is forward-biased; Collector-Base (CB) junction is reverse-biased.',
      'In NPN active mode: forward-biased EB junction injects large density of electrons from emitter into base.',
      'Because the base is extremely thin and lightly doped, over 95–99% of electrons diffuse across without recombining with holes.',
      'These electrons enter the reverse-biased CB depletion field and are swept into the collector, forming I_C.',
      'Common-Base Current Gain: α = I_C / I_E (typically 0.95 to 0.995).',
      'Common-Emitter Current Gain: β = I_C / I_B = α / (1 - α) (typically 50 to 300).',
    ],
    examAnswer: [
      'Draw circuit symbols and physical structure of NPN and PNP transistors with proper terminal labels and current directions.',
      'Explain transistor action in active mode with carrier flow diagrams.',
      'State current equation: I_E = I_B + I_C and derive β = α / (1 - α).',
      'Explain why NPN transistors are preferred over PNP transistors (electron mobility μ_n is ~2.5 to 3 times higher than hole mobility μ_p).',
    ],
    slip: 'Drawing the arrow on the collector terminal. In standard schematic symbols, the arrow is always on the Emitter, pointing in the direction of conventional current flow (outward for NPN, inward for PNP).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'BJT NPN STRUCTURE & CURRENT FLOW', 'ta') +
        R(40, 50, 70, 70, 'l') + T(48, 85, 'Emitter (n⁺)', 't') +
        R(110, 50, 20, 70, 'fa') + T(112, 85, 'B(p)', 'ta') +
        R(130, 50, 100, 70, 'l') + T(150, 85, 'Collector (n)', 't') +
        LA(75, 120, 75, 145) + T(65, 155, 'I_E', 't') +
        LA(120, 120, 120, 145) + T(115, 155, 'I_B', 'ta') +
        LA(180, 145, 180, 120) + T(175, 155, 'I_C', 't') +
        C(280, 85, 25, 'l') +
        L(270, 70, 270, 100) + L(255, 85, 270, 85) +
        L(270, 75, 295, 65) + L(270, 95, 295, 105) +
        LA(285, 100, 295, 105) +
        T(240, 85, 'B', 't') + T(295, 55, 'C', 't') + T(295, 120, 'E', 'ta') +
        T(20, 180, 'I_E = I_B + I_C   |   β = I_C / I_B = α / (1 − α)   |   Active: EB forward, CB reverse', 'ta')
      ),
      caption: 'NPN bipolar junction transistor construction, carrier transport, and circuit schematic symbol.',
    },
  },
  'beee:3:9': {
    explain: [
      'In the Common Emitter (CE) amplifier, a tiny millivolt audio signal fed into the base is magnified into a large multi-volt signal at the collector.',
      'The CE amplifier provides both high voltage gain and high current gain, with a characteristic 180° phase flip (an upward input crest produces a downward output trough).',
    ],
    definition:
      'A Common Emitter (CE) amplifier is a transistor configuration where the emitter is common to both input and output circuits, providing high voltage gain, high current gain, and a 180° phase reversal between input and output.',
    formula: 'A_v = -\\frac{\\beta R_C}{r_{\\text{in}}} = -g_m R_C, \\quad A_i = \\beta, \\quad A_p = A_v \\times A_i, \\quad \\Delta\\theta = 180^\\circ',
    steps: [
      'Circuit Setup: input AC signal coupled to Base via capacitor C_in; output taken from Collector via capacitor C_out; Emitter connected to common ground.',
      'DC Biasing: voltage divider bias (R₁, R₂) establishes stable Q-point in the active region; emitter resistor R_E provides thermal stability, bypassed by C_E.',
      'Input Characteristic: I_B versus V_BE for constant V_CE (looks like forward-biased diode with ~0.7V threshold).',
      'Output Characteristic: I_C versus V_CE for various constant I_B values, defining Cutoff, Active, and Saturation regions.',
      'Phase Inversion (180°): when input v_in increases positive, base current I_B rises, collector current I_C increases, causing larger voltage drop I_C R_C, which pulls collector output voltage v_out = V_CC - I_C R_C downward.',
    ],
    examAnswer: [
      'Draw the complete circuit diagram of a single-stage RC-coupled CE transistor amplifier with voltage divider bias.',
      'Draw input and output characteristics with operating regions labeled (Active, Cutoff, Saturation).',
      'Explain why CE configuration is most widely used for audio amplifiers (provides highest power gain A_p = A_v × A_i).',
      'Explain the reason for the 180° phase inversion between input and output voltages.',
    ],
    slip: 'Forgetting the 180° phase shift. CE amplifiers always invert the signal: when input goes positive, output swings negative.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'CE AMPLIFIER & 180° PHASE INVERSION', 'ta') +
        R(50, 45, 120, 85, 'l') +
        T(60, 65, 'R₁', 't') + T(60, 115, 'R₂', 't') + T(135, 60, 'R_C', 't') +
        C(110, 85, 12, 'l') +
        P('M10,85 Q20,70 30,85 T50,85', 'ta') + T(15, 65, 'v_in', 'ta') +
        P('M180,85 Q200,110 220,85 T260,85', 'ta') + T(220, 65, 'v_out (180° flip)', 'ta') +
        T(210, 130, 'High Voltage Gain A_v', 't') +
        T(210, 145, 'High Current Gain β', 't') +
        T(20, 180, 'CE gives highest power gain (A_p = A_v × A_i)   |   Output is inverted by 180°', 'ta')
      ),
      caption: 'Single-stage CE amplifier demonstrating amplification and 180° phase reversal.',
    },
  },
  'beee:3:10': {
    explain: [
      'In digital circuits and microprocessors, transistors are not used as smooth amplifiers; they are driven hard between completely OFF and completely ON.',
      'With zero base current, the transistor is in Cut-off (an open switch, $I_C = 0$); with heavy base current, it is in Saturation (a closed switch, $V_{CE} \\approx 0.2\\text{V}$).',
    ],
    definition:
      'A transistor operating as a switch functions in its two extreme non-linear states: Cut-off region (open switch, zero current, V_CE = V_CC) and Saturation region (closed switch, maximum current, V_CE ≈ 0.2V).',
    formula: '\\text{Cut-off (OFF): } I_B = 0, \\ I_C = 0, \\ V_{CE} = V_{CC}; \\quad \\text{Saturation (ON): } I_B \\ge \\frac{I_{C,\\text{sat}}}{\\beta}, \\ V_{CE} \\approx 0.2 \\text{ V}',
    steps: [
      'Cut-off Region (Switch OFF): input voltage V_in < 0.7 V; both EB and CB junctions are reverse-biased; base current I_B = 0 and collector current I_C = 0; output voltage equals supply: V_out = V_CE = V_CC.',
      'Saturation Region (Switch ON): input voltage V_in is high (>2V); both EB and CB junctions become forward-biased.',
      'Collector current reaches saturation maximum: I_{C,sat} ≈ (V_CC - V_{CE,sat}) / R_C ≈ V_CC / R_C.',
      'Collector-to-emitter voltage collapses to saturation knee: V_{CE,sat} ≈ 0.2 V (Si).',
      'Condition for Hard Saturation: base current must satisfy I_B ≥ I_{C,sat} / β_min to guarantee minimum power dissipation during ON state.',
      'Applications: digital logic inverters (NOT gates), relay drivers, LED blinkers, motor PWM switching.',
    ],
    examAnswer: [
      'Explain the working of a BJT as an electronic switch with circuit diagram.',
      'Define the two operating states: Cut-off (OFF, open circuit, V_CE = V_CC) and Saturation (ON, short circuit, V_CE ≈ 0.2V).',
      'State the design condition for hard saturation: I_B > I_{C,sat} / β.',
      'Explain how a BJT inverter implements the Boolean NOT function: V_in = Low (0V) gives V_out = High (5V); V_in = High (5V) gives V_out = Low (0.2V).',
    ],
    slip: 'Operating in the active region when designing a digital switch. If the base drive is too weak, the transistor stays in the active region where large V_CE and large I_C produce severe internal heating ($P = V_{CE} I_C$) that can burn the chip.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'TRANSISTOR AS AN ELECTRONIC SWITCH', 'ta') +
        T(30, 45, '1. OFF State (Cut-off)', 'ta') +
        T(30, 70, 'V_in = 0 V (Low)', 't') +
        T(30, 90, 'I_B = 0,  I_C = 0', 't') +
        T(30, 110, 'Switch = OPEN', 'ta') +
        T(30, 130, 'V_out = V_CC (High)', 't') +
        T(200, 45, '2. ON State (Saturation)', 'ta') +
        T(200, 70, 'V_in = 5 V (High)', 't') +
        T(200, 90, 'I_B ≥ I_{C,sat} / β', 't') +
        T(200, 110, 'Switch = CLOSED', 'ta') +
        T(200, 130, 'V_out = V_{CE,sat} ≈ 0.2V', 't') +
        T(20, 180, 'Digital Inverter (NOT Gate): Low In → High Out   |   High In → Low Out', 'ta')
      ),
      caption: 'BJT switching states: Cut-off (open circuit, V_out = V_CC) and Saturation (closed circuit, V_out ≈ 0.2V).',
    },
  },
};
