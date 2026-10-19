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

export const BEEE_UNIT5_TOPICS: Record<string, TopicContent> = {
  'beee:5:0': {
    explain: [
      'In this first lab experiment, students inspect real resistors, capacitors, inductors, diodes, and power supplies on the lab bench.',
      'Connecting a regulated DC power supply across a resistor and recording voltage V and current I plots a straight line, verifying Ohm’s law V = IR.',
    ],
    definition:
      'The Ohm’s law verification lab experiment physically identifies active components (power supplies) and passive components (R, L, C) and confirms linear proportionality between voltage and current across a metallic resistor.',
    formula: 'V = I R \\implies R = \\frac{V}{I} = \\frac{\\Delta V}{\\Delta I} = \\text{Slope of } V\\text{-}I \\text{ graph}',
    steps: [
      'Identify carbon composition resistors (color code bands: BBROYGBVGW), ceramic/electrolytic capacitors, and wire-wound inductors.',
      'Connect circuit: DC power supply in series with ammeter (mA), standard resistor R, and rheostat, with voltmeter connected in parallel across R.',
      'Vary power supply voltage in steps of 1V from 0 to 10V; record voltmeter reading V and ammeter reading I.',
      'Plot V on y-axis versus I on x-axis: graph is a straight line passing through origin.',
      'Calculate slope = ΔV / ΔI; compare experimental resistance with nominal color-code value.',
    ],
    examAnswer: [
      'Draw the complete circuit diagram for Ohm’s law verification showing ammeter in series and voltmeter in parallel.',
      'State Ohm’s law and explain why the V-I plot is a straight line through the origin.',
      'Explain how resistance is obtained from the slope: R = ΔV / ΔI.',
      'State 2 experimental precautions: ensure voltmeter has high internal resistance, do not leave current flowing continuously to avoid heating errors.',
    ],
    slip: 'Connecting the ammeter in parallel or the voltmeter in series. Ammeters have near-zero resistance and will short-circuit if placed in parallel; voltmeters have mega-ohm resistance and will block current if placed in series.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'OHM’S LAW VERIFICATION CIRCUIT & V-I GRAPH', 'ta') +
        C(50, 95, 18, 'l') + T(40, 99, 'DC', 't') +
        L(50, 77, 100, 77) +
        C(115, 77, 12, 'ta') + T(110, 81, 'mA', 'ta') +
        L(127, 77, 170, 77) +
        P('M170 77 L180 67 L190 87 L200 67 L210 77', 'l') + T(185, 57, 'Resistor R', 't') +
        L(210, 77, 240, 77) + L(240, 77, 240, 120) + L(50, 113, 240, 120) +
        L(170, 77, 170, 100) + L(210, 77, 210, 100) +
        C(190, 100, 12, 'l') + T(187, 104, 'V', 't') +
        L(270, 120, 340, 120, 'l') + L(270, 120, 270, 50, 'l') +
        L(275, 115, 335, 55, 'ta') + T(285, 75, 'Slope = R', 'ta') +
        T(20, 180, 'Voltmeter in parallel, Ammeter in series   |   Linear V-I slope yields resistance R', 'ta')
      ),
      caption: 'Breadboard circuit connections for Ohm’s law verification and linear V-I response curve.',
    },
  },
  'beee:5:1': {
    explain: [
      'This experiment tests Kirchhoff’s laws on a breadboard network with multiple loops and junctions.',
      'Summing all branch currents meeting at a junction proves KCL (ΣI = 0), while summing voltage drops around a complete loop proves KVL (ΣV = 0).',
    ],
    definition:
      'The Kirchhoff’s laws lab experiment physically validates KCL (conservation of electric charge at junctions) and KVL (conservation of electric energy in closed loops) using DC meters across multi-loop resistor networks.',
    formula: '\\sum I_{\\text{junction}} = 0 \\quad (\\text{KCL}), \\quad \\sum V_{\\text{loop}} = 0 \\quad (\\text{KVL})',
    steps: [
      'Construct a two-loop circuit on a breadboard with three resistors (R₁, R₂, R₃) powered by two DC power supplies (V₁, V₂).',
      'Verification of KCL: connect DC milliammeter in each of the three branches meeting at central node A; record currents I₁, I₂, and I₃; verify I₁ + I₂ = I₃ within instrument tolerance.',
      'Verification of KVL: connect voltmeter across each component around Loop 1 (Source 1, R₁, and R₃); record voltages V₁, V_{R1}, and V_{R3}; verify algebraic sum V₁ - V_{R1} - V_{R3} = 0.',
      'Repeat voltage measurements for Loop 2 and the outer perimeter loop.',
    ],
    examAnswer: [
      'Draw the 2-loop experimental circuit diagram labeling junctions, meters, and component values.',
      'Present experimental observation tables for KCL verification (currents meeting at node) and KVL verification (voltage loop sums).',
      'State the physical laws underlying KCL (charge conservation) and KVL (energy conservation).',
      'Explain percentage error calculation between theoretical circuit equations and experimental meter readings.',
    ],
    slip: 'Ignoring meter polarity signs. Voltages and currents must be added with correct algebraic signs (rises vs drops, entering vs leaving) or sums will not equal zero.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'KIRCHHOFF’S LAWS LAB EXPERIMENT', 'ta') +
        R(50, 50, 240, 80, 'l') + L(170, 50, 170, 130, 'l') +
        T(90, 42, 'R₁', 't') + T(220, 42, 'R₂', 't') + T(180, 95, 'R₃', 'ta') +
        T(30, 95, 'V₁', 't') + T(300, 95, 'V₂', 't') +
        C(170, 50, 4, 'fa') + T(165, 40, 'Node A', 'ta') +
        T(20, 155, 'KCL Check at Node A: I₁ + I₂ = I₃  (Charge conserved)', 'ta') +
        T(20, 175, 'KVL Check Loop 1: V₁ − I₁R₁ − I₃R₃ = 0  (Energy conserved)', 't')
      ),
      caption: 'Experimental two-loop breadboard circuit verifying node current balance (KCL) and loop voltage balance (KVL).',
    },
  },
  'beee:5:2': {
    explain: [
      'Inductive factory loads (like motors and transformers) draw lagging reactive power, causing power factor to drop to poor values like 0.6 lagging.',
      'Connecting a parallel power capacitor injects leading reactive current that cancels out the lagging motor current, pulling the power factor close to unity (0.95–1.0).',
    ],
    definition:
      'The power factor improvement experiment demonstrates how connecting a parallel shunt capacitor across an inductive load reduces the total current drawn from the supply and improves the power factor cos φ toward unity.',
    formula: 'C = \\frac{P (\\tan\\phi_1 - \\tan\\phi_2)}{\\omega V^2}, \\quad I_C = V \\omega C, \\quad \\vec{I}_{\\text{new}} = \\vec{I}_L + \\vec{I}_C',
    steps: [
      'Connect an inductive load (choke coil in series with lamp) to 230V AC supply through wattmeter, voltmeter, and ammeter.',
      'Record initial readings without capacitor: V, I₁, P; calculate uncorrected power factor cos φ₁ = P / (V I₁).',
      'Connect a variable capacitor bank in parallel with the inductive load.',
      'Gradually increase capacitance C; record new supply current I₂ and wattmeter reading P.',
      'Observe that supply current I₂ decreases significantly while real power P remains constant.',
      'Calculate improved power factor cos φ₂ = P / (V I₂) and plot power factor versus capacitance C.',
    ],
    examAnswer: [
      'Draw the complete circuit diagram with wattmeter, voltmeter, ammeter, choke load, and parallel capacitor.',
      'Draw the phasor diagram showing how leading capacitor current I_C cancels lagging reactive component I_L sin φ₁.',
      'Derive the formula for required capacitance: C = P(tan φ₁ - tan φ₂) / (ω V²).',
      'List 3 economic benefits of power factor correction: reduced electricity billing penalties, lower I²R cable losses, reduced transformer kVA loading.',
    ],
    slip: 'Over-compensating the load with too large a capacitor. Adding excessive capacitance makes the circuit leading, which increases current again and causes voltage over-boosting.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'POWER FACTOR IMPROVEMENT PHASOR DIAGRAM', 'ta') +
        LA(60, 120, 240, 120) + T(245, 123, 'Voltage V (reference)', 't') +
        LA(60, 120, 180, 160) + T(185, 165, 'Uncorrected I₁ (lagging)', 't') +
        LA(180, 160, 180, 130) + T(190, 145, 'I_C (Capacitor leading)', 'ta') +
        LA(60, 120, 180, 130) + T(140, 110, 'I_new (smaller)', 'ta') +
        T(20, 180, 'C = P(tan φ₁ − tan φ₂) / (ωV²)   |   Capacitor cancels lagging reactive current', 'ta')
      ),
      caption: 'Phasor cancellation: leading capacitor current I_C reduces net supply current and improves power factor.',
    },
  },
  'beee:5:3': {
    explain: [
      'In this experiment, students measure the input and output voltages of a single-phase transformer on no-load.',
      'The ratio of primary to secondary voltage matches the ratio of winding turns, verifying the fundamental transformation ratio K = V₂ / V₁ = N₂ / N₁.',
    ],
    definition:
      'The transformer ratio experiment measures primary voltage V₁, secondary voltage V₂, and primary/secondary currents under varying loads to determine transformation ratio K, turns ratio N₁/N₂, and efficiency.',
    formula: 'K = \\frac{V_2}{V_1} = \\frac{N_2}{N_1} = \\frac{I_1}{I_2}, \\quad \\% \\text{ Error} = \\frac{|K_{\\text{meas}} - K_{\\text{rated}}|}{K_{\\text{rated}}} \\times 100\\%',
    steps: [
      'Connect primary winding of 1-phase transformer (e.g., 230V/115V) to AC supply through variac (autotransformer) and primary voltmeter V₁.',
      'Connect secondary winding to secondary voltmeter V₂ on open-circuit (no-load).',
      'Increase primary voltage in steps of 20V from 0 to rated 230V; record primary V₁ and secondary V₂.',
      'Calculate voltage ratio K = V₂ / V₁ for each step; verify K is constant and equal to rated ratio (e.g., K = 0.5 for step-down).',
      'Connect resistive load bank to secondary; connect ammeters A₁ and A₂; verify current ratio I₁ / I₂ ≈ K.',
    ],
    examAnswer: [
      'Draw the circuit diagram showing variac, primary voltmeter V₁, secondary voltmeter V₂, and transformer core.',
      'State transformation ratio formula: K = V₂ / V₁ = N₂ / N₁.',
      'Present experimental observation table showing constant K across varying applied voltages.',
      'Explain polarity test (additive vs subtractive polarity) for connecting transformer windings.',
    ],
    slip: 'Exceeding rated primary voltage. Applying voltage higher than rated primary voltage drives the iron core into deep magnetic saturation, drawing huge magnetizing currents.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'TRANSFORMER TURNS RATIO EXPERIMENT', 'ta') +
        R(30, 80, 30, 30, 'l') + T(20, 75, 'Variac', 't') +
        L(60, 80, 100, 80) + L(60, 110, 100, 110) +
        C(85, 95, 12, 'l') + T(80, 99, 'V₁', 't') +
        R(100, 60, 30, 70, 'fa') + T(105, 98, 'N₁', 'ta') +
        R(140, 60, 10, 70, 'l') + R(155, 60, 10, 70, 'l') + T(145, 50, 'Core', 't') +
        R(170, 60, 30, 70, 'fa') + T(175, 98, 'N₂', 'ta') +
        L(200, 80, 240, 80) + L(200, 110, 240, 110) +
        C(225, 95, 12, 'l') + T(220, 99, 'V₂', 't') +
        T(20, 180, 'Transformation Ratio: K = V₂ / V₁ = N₂ / N₁ = I₁ / I₂ (Constant on no-load)', 'ta')
      ),
      caption: 'Experimental setup for measuring voltage and turns ratio of a single-phase transformer.',
    },
  },
  'beee:5:4': {
    explain: [
      'In this visual identification lab, students examine real cut-section models of DC motors and 3-phase induction motors with cutaway metal casings.',
      'Students trace the physical parts: stator poles, rotating armature, copper commutator bars, carbon brushes, and squirrel cage rotor bars.',
    ],
    definition:
      'The electrical machines identification experiment studies the internal mechanical and electromagnetic components of DC machines and 3-phase induction motors using cut-section educational demonstration models.',
    formula: '\\text{DC Machine: Yoke } + \\text{ Poles } + \\text{ Armature } + \\text{ Commutator } + \\text{ Brushes}; \\quad \\text{Induction: Stator } + \\text{ Squirrel Cage Rotor}',
    steps: [
      'DC Machine Cut-Section: inspect cast iron/steel Yoke (outer magnetic frame), laminated field poles with field windings, rotating slotted armature core, cylindrical copper segment commutator, and spring-loaded carbon brushes.',
      'Trace commutator segments insulated with mica; observe brush holders and rocker arm assembly.',
      '3-Phase Induction Motor Cut-Section: inspect stator frame with 3-phase distributed windings placed in skewed stator slots.',
      'Inspect Squirrel Cage Rotor: heavy aluminum or copper bars short-circuited at both ends by sturdy end-rings, mounted with cooling fan blades.',
      'Inspect Slip Ring (Wound) Rotor: 3-phase star-connected rotor winding brought out to three copper slip rings on the shaft.',
    ],
    examAnswer: [
      'List 5 major parts of a DC machine and state the engineering function of each.',
      'Explain the construction of a squirrel cage rotor (thick copper/aluminum bars shorted by end rings, skewed slots to reduce cogging/noise).',
      'Explain the construction of a slip ring induction motor and explain why external resistors are connected.',
      'Contrast the mechanical function of a commutator (DC machine) vs slip rings (AC machine).',
    ],
    slip: 'Confusing commutator segments (split copper wedges with mica insulation) with slip rings (continuous solid smooth metal rings).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'MACHINE CUT-SECTION PARTS (DC VS INDUCTION)', 'ta') +
        T(30, 45, '1. DC Machine Parts', 'ta') +
        T(40, 70, '• Yoke (Frame)', 't') +
        T(40, 88, '• Field Poles & Windings', 't') +
        T(40, 106, '• Armature Core (Slotted)', 't') +
        T(40, 124, '• Commutator (Mica insulated)', 'ta') +
        T(40, 142, '• Carbon Brushes', 't') +
        T(200, 45, '2. 3-Phase Induction Parts', 'ta') +
        T(210, 70, '• Stator Core (Laminated)', 't') +
        T(210, 88, '• 3-Phase Distributed Windings', 't') +
        T(210, 106, '• Squirrel Cage Rotor Bars', 'ta') +
        T(210, 124, '• End Rings (Short-circuiting)', 'ta') +
        T(210, 142, '• Cooling Fan & Bearings', 't') +
        T(20, 180, 'Commutator flips current mechanically in DC   |   Squirrel cage has no brushes or slip rings', 'ta')
      ),
      caption: 'Key mechanical and electrical components of DC machines and 3-phase induction motors.',
    },
  },
  'beee:5:5': {
    explain: [
      'In this experiment, students wire a silicon diode on a circuit board and measure current for step-by-step increases in forward and reverse voltage.',
      'Plotting the numbers produces the classic diode curve: near-zero current until the 0.7V knee, followed by an exponential surge.',
    ],
    definition:
      'The P-N junction diode experiment plots the forward and reverse bias V-I characteristics on graph paper, determining the static/dynamic forward resistance and knee voltage V_k.',
    formula: 'r_d = \\frac{\\Delta V_F}{\\Delta I_F} \\quad (\\text{Dynamic forward resistance}), \\quad r_s = \\frac{V_F}{I_F} \\quad (\\text{Static resistance})',
    steps: [
      'Forward Bias: connect regulated 0–5V DC supply in series with 1kΩ protective resistor, diode (p to +, n to -), and 0–50mA milliammeter; connect digital voltmeter across diode.',
      'Increase forward voltage in steps of 0.1V from 0 to 1.0V; record V_F and I_F.',
      'Reverse Bias: connect 0–30V DC supply, reverse diode connections (p to -, n to +), and replace milliammeter with 0–100μA microammeter.',
      'Increase reverse voltage in steps of 2V from 0 to 20V; record V_R and I_R.',
      'Plot V_F vs I_F in Quadrant I and V_R vs I_R in Quadrant III on millimeter graph paper.',
      'Measure knee voltage V_k from the forward curve tangent (≈ 0.7V for Si).',
      'Compute dynamic resistance r_d = ΔV_F / ΔI_F in the linear conduction zone.',
    ],
    examAnswer: [
      'Draw the circuit diagrams for both forward bias (mA meter) and reverse bias (μA meter).',
      'Draw the complete V-I curve in Quadrants I and III labeling knee voltage V_k, dynamic resistance r_d, and reverse saturation current I_0.',
      'Define dynamic resistance r_d = ΔV/ΔI and static resistance r_s = V/I.',
      'State nominal knee voltage: 0.7V for Silicon and 0.3V for Germanium.',
    ],
    slip: 'Connecting the power supply directly across the diode without a current-limiting resistor. Without a protective resistor (e.g., 1kΩ), forward current exceeds maximum rating within milliseconds of crossing the 0.7V knee.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'P-N DIODE EXPERIMENTAL CIRCUIT & V-I PLOT', 'ta') +
        C(50, 85, 15, 'l') + T(40, 88, '0-5V', 't') +
        P('M75 85 L85 75 L95 95 L105 75 L115 85', 'l') + T(90, 65, '1 kΩ', 't') +
        P('M125 75 L145 85 L125 95 Z', 'ta') + L(145, 75, 145, 95, 'ta') +
        C(170, 85, 10, 'l') + T(165, 88, 'mA', 't') +
        L(180, 85, 200, 85) + L(50, 115, 200, 115) +
        L(240, 115, 330, 115, 'l') + L(270, 35, 270, 140, 'l') +
        P('M270 115 L290 115 Q305 115 320 45', 'ta') +
        T(280, 130, 'V_k ≈ 0.7V', 'ta') +
        T(20, 180, 'Protective series resistor prevents burnout   |   Dynamic resistance: r_d = ΔV_F / ΔI_F', 'ta')
      ),
      caption: 'Lab circuit configuration for measuring diode characteristics and resultant knee threshold curve.',
    },
  },
  'beee:5:6': {
    explain: [
      'In this experiment, students view AC rectification live on an oscilloscope screen.',
      'Connecting a single diode produces half-wave pulses, a bridge produces full-wave pulses, and hooking up a capacitor filter smooths the ripples into a flat DC line.',
    ],
    definition:
      'The rectifier lab experiment constructs half-wave and full-wave bridge rectifiers, observes output waveforms on a Cathode Ray Oscilloscope (CRO), and measures ripple factor with and without shunt capacitor filters.',
    formula: '\\gamma = \\frac{V_{\\text{ac}}}{V_{\\text{dc}}} = \\frac{\\sqrt{V_{\\text{rms}}^2 - V_{\\text{dc}}^2}}{V_{\\text{dc}}}, \\quad V_{\\text{ac}} = \\text{RMS ripple on AC voltmeter}',
    steps: [
      'Connect secondary of 12-0-12V step-down transformer to single diode and load resistor R_L (half-wave circuit).',
      'Connect oscilloscope Channel 1 across transformer secondary (input sine wave) and Channel 2 across R_L (rectified output).',
      'Measure peak input voltage V_m, DC output voltage using DC voltmeter (V_dc = V_m/π), and AC ripple using true-RMS AC meter.',
      'Calculate experimental ripple factor γ = V_ac / V_dc; verify γ ≈ 1.21.',
      'Re-wire circuit as a 4-diode bridge rectifier; measure full-wave output; verify γ ≈ 0.48.',
      'Connect a 100 μF capacitor in parallel with R_L; observe on CRO how ripple shrinks; measure reduced ripple factor.',
    ],
    examAnswer: [
      'Draw the experimental circuit diagram of bridge rectifier with CRO connection and capacitor filter.',
      'Draw the waveforms observed on CRO: input AC, unfiltered full-wave output, and filtered smooth DC.',
      'State formula for experimental ripple factor calculation: γ = V_ac / V_dc.',
      'Present comparison table of ripple factor and DC voltage: Half-wave (1.21), Full-wave (0.48), Full-wave with C filter (<0.1).',
    ],
    slip: 'Connecting the CRO ground clip to an unisolated terminal in a bridge rectifier, which shorts out one of the bridge diodes through mains earth ground.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'RECTIFIER LAB: CRO WAVEFORMS WITH/WITHOUT FILTER', 'ta') +
        T(30, 45, '1. Input AC (Sine)', 't') +
        P('M30 80 Q50 55 70 80 Q90 105 110 80 Q130 55 150 80', 'l') +
        T(200, 45, '2. Full-Wave Unfiltered (γ = 0.48)', 'ta') +
        P('M200 80 Q215 55 230 80 Q245 55 260 80 Q275 55 290 80 Q305 55 320 80', 'ta') +
        T(100, 115, '3. Filtered with Shunt Capacitor C (Ripple < 0.1)', 'ta') +
        L(80, 145, 280, 145, 'd') +
        P('M80 140 L105 132 L140 142 L165 132 L200 142 L225 132 L260 142', 'ta') +
        T(20, 180, 'Capacitor eliminates AC ripple harmonics   |   CRO directly reveals peak-to-peak ripple V_r', 'ta')
      ),
      caption: 'CRO waveforms showing conversion from AC sine wave to unfiltered rectified bumps and filtered smooth DC.',
    },
  },
  'beee:5:7': {
    explain: [
      'In this experiment, students build a Zener voltage regulator and test how well it maintains output voltage when input voltage or load resistance changes.',
      'Plotting load voltage against input voltage shows voltage climbing steadily up to the Zener voltage, where it clamps flat like a shelf.',
    ],
    definition:
      'The Zener diode regulator lab experiment determines line regulation (% change in V_out for change in V_in) and load regulation (% change in V_out for change in I_load) in the reverse breakdown region.',
    formula: '\\% \\text{Line Reg} = \\frac{\\Delta V_{\\text{out}}}{\\Delta V_{\\text{in}}} \\times 100\\%, \\quad \\% \\text{Load Reg} = \\frac{V_{\\text{NL}} - V_{\\text{FL}}}{V_{\\text{FL}}} \\times 100\\%',
    steps: [
      'Connect circuit: variable DC power supply, series resistor R_s (e.g., 470Ω), reverse-biased Zener diode (e.g., 5.1V or 6.2V rating), and decade resistance load box R_L.',
      'Line Regulation Test: set load R_L constant at 1kΩ; vary input voltage V_in from 0 to 15V in 1V steps; record output voltage V_out across load.',
      'Observe that V_out increases linearly until V_in reaches V_Z, beyond which V_out remains strictly clamped at V_Z.',
      'Load Regulation Test: fix input voltage V_in constant at 10V; vary load resistance R_L from 100Ω to 2kΩ; record load current I_L and load voltage V_out.',
      'Plot V_out versus V_in (Line Regulation) and V_out versus I_L (Load Regulation).',
    ],
    examAnswer: [
      'Draw the complete experimental circuit diagram with series resistor R_s, Zener diode, and load resistance R_L.',
      'Draw the Line Regulation curve (V_out vs V_in) showing sharp clamping at V_Z.',
      'Draw the Load Regulation curve (V_out vs I_L) showing flat regulation until minimum Zener current is reached.',
      'Calculate percentage line regulation and load regulation from experimental data.',
    ],
    slip: 'Selecting series resistance R_s too large. If R_s is too large, the voltage drop I_s R_s starves the Zener diode of current, dropping it out of the reverse breakdown regulation region.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'ZENER REGULATOR: LINE & LOAD REGULATION GRAPHS', 'ta') +
        L(40, 130, 160, 130, 'l') + L(40, 130, 40, 40, 'l') +
        T(150, 140, 'V_in', 't') + T(20, 45, 'V_out', 't') +
        L(40, 130, 80, 80, 'l') + L(80, 80, 150, 80, 'ta') +
        T(85, 70, 'Clamped at V_Z', 'ta') +
        T(40, 155, 'Line Regulation (const R_L)', 't') +
        L(210, 130, 330, 130, 'l') + L(210, 130, 210, 40, 'l') +
        T(320, 140, 'I_L', 't') + T(190, 45, 'V_out', 't') +
        L(210, 80, 300, 80, 'ta') + L(300, 80, 325, 125, 'l') +
        T(220, 70, 'V_out = V_Z (flat)', 'ta') +
        T(210, 155, 'Load Regulation (const V_in)', 't') +
        T(20, 180, 'Zener clamps output flat despite input voltage swings or load current demands.', 'ta')
      ),
      caption: 'Experimental line regulation (V_out vs V_in) and load regulation (V_out vs I_L) curves.',
    },
  },
  'beee:5:8': {
    explain: [
      'In this experiment, students plot the family of input and output curves for an NPN transistor in Common Emitter configuration.',
      'The output graph reveals how a tiny microamp change in base current lifts the collector current up to higher horizontal plateaus, demonstrating current amplification.',
    ],
    definition:
      'The BJT Common Emitter (CE) experiment plots input characteristics (I_B vs V_BE at constant V_CE) and output characteristics (I_C vs V_CE at constant I_B) to determine current gain β, input resistance r_i, and output resistance r_o.',
    formula: '\\beta = \\left. \\frac{\\Delta I_C}{\\Delta I_B} \\right|_{V_{CE}=\\text{const}}, \\quad r_i = \\left. \\frac{\\Delta V_{BE}}{\\Delta I_B} \\right|_{V_{CE}=\\text{const}}, \\quad r_o = \\left. \\frac{\\Delta V_{CE}}{\\Delta I_C} \\right|_{I_B=\\text{const}}',
    steps: [
      'Connect NPN transistor (e.g., BC547) in CE configuration with separate variable base supply (0–2V) and collector supply (0–15V).',
      'Input Characteristics: set V_CE constant at 1V; vary V_BE in steps of 0.05V; record base current I_B (μA); repeat for V_CE = 5V and 10V.',
      'Output Characteristics: set base current I_B constant at 20 μA; vary V_CE in steps of 0.5V from 0 to 10V; record collector current I_C (mA).',
      'Repeat output measurements for I_B = 40 μA, 60 μA, 80 μA, and 100 μA.',
      'Plot input and output curve families on graph paper.',
      'Identify operating regions: Saturation (V_CE < 0.2V), Cut-off (I_B = 0), and Active region (horizontal plateau lines).',
      'Calculate current gain β = ΔI_C / ΔI_B from output characteristics in the active region.',
    ],
    examAnswer: [
      'Draw the complete CE transistor characterization circuit diagram showing meters for I_B (μA), V_BE (V), I_C (mA), and V_CE (V).',
      'Draw the family of output characteristics (I_C vs V_CE) labeling Active, Cutoff, and Saturation regions.',
      'Calculate current gain β from output characteristics: β = ΔI_C / ΔI_B.',
      'Calculate input dynamic resistance r_i = ΔV_BE / ΔI_B and output resistance r_o = ΔV_CE / ΔI_C.',
    ],
    slip: 'Measuring base current in milliamperes. Base current in small-signal BJTs is in microamperes (μA); using a milliammeter will register near-zero readings.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'BJT CE OUTPUT CHARACTERISTICS & GAIN β', 'ta') +
        L(40, 140, 320, 140, 'l') + L(40, 140, 40, 30, 'l') +
        T(325, 145, 'V_CE (V)', 't') + T(15, 30, 'I_C (mA)', 't') +
        P('M40 140 L50 70 L300 70', 'ta') + T(305, 73, 'I_B = 80 μA', 't') +
        P('M40 140 L50 90 L300 90', 'ta') + T(305, 93, 'I_B = 60 μA', 't') +
        P('M40 140 L50 110 L300 110', 'ta') + T(305, 113, 'I_B = 40 μA', 't') +
        P('M40 140 L50 130 L300 130', 'l') + T(305, 133, 'I_B = 20 μA', 't') +
        L(50, 140, 50, 30, 'd') + T(45, 25, 'Sat', 't') +
        T(150, 50, 'Active Region: β = ΔI_C / ΔI_B', 'ta') +
        T(20, 180, 'Saturation (V_CE < 0.2V)   |   Active (flat curves)   |   Cut-off (I_B = 0)', 'ta')
      ),
      caption: 'BJT common-emitter output characteristics family showing saturation knee and active region plateaus.',
    },
  },
  'beee:5:9': {
    explain: [
      'In this digital lab experiment, students use a single quad 2-input NAND chip (IC 7400) to build NOT, AND, OR, NOR, and XOR gates.',
      'Checking LED output lights against input toggle switches verifies that a single universal chip can build all digital logic.',
    ],
    definition:
      'The universal gates experiment physically constructs and tests basic logic functions (NOT, AND, OR, XOR) using only quad 2-input NAND gates (IC 7400) or quad 2-input NOR gates (IC 7402) on a digital trainer board.',
    formula: '\\text{IC 7400: Quad 2-input NAND}, \\quad \\text{Pin 14} = V_{CC} (+5\\text{V}), \\quad \\text{Pin 7} = \\text{GND}',
    steps: [
      'Mount IC 7400 on digital trainer kit; connect Pin 14 to +5V V_CC and Pin 7 to ground.',
      'NOT Gate: tie pins 1 and 2 together to input switch A; connect pin 3 output to indicator LED.',
      'AND Gate: connect NAND gate 1 output (pin 3) to both inputs of NAND gate 2 (pins 4 and 5); output at pin 6 is Y = A·B.',
      'OR Gate: invert input A using gate 1, invert input B using gate 2, feed outputs into gate 3; output is Y = (A’·B’)’ = A + B.',
      'Record truth tables by testing all binary input combinations (00, 01, 10, 11) and observing LED states.',
    ],
    examAnswer: [
      'Draw the pinout diagram of IC 7400 (Quad 2-input NAND gate) showing Pin 14 V_CC and Pin 7 GND.',
      'Draw the IC wiring diagrams for realizing NOT, AND, and OR gates using only IC 7400.',
      'Present the truth tables verified experimentally on the trainer kit.',
      'Explain how IC 7400 realizes XOR logic using exactly 4 NAND gates.',
    ],
    slip: 'Leaving Pin 14 (V_CC) or Pin 7 (GND) unconnected. Digital TTL chips will behave erratically or output floating garbage if power supply pins are not properly wired.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'IC 7400 (QUAD 2-INPUT NAND) PINOUT & WIRING', 'ta') +
        R(90, 45, 180, 100, 'fa') +
        T(135, 75, 'IC 7400', 'ta') + T(120, 95, 'Quad 2-Input NAND', 't') +
        T(100, 40, '14: V_CC (+5V)', 'ta') + T(100, 160, '7: GND (0V)', 't') +
        T(20, 70, 'Gate 1: In 1, 2 → Out 3', 't') +
        T(20, 90, 'Gate 2: In 4, 5 → Out 6', 't') +
        T(20, 110, 'Gate 3: In 9, 10 → Out 8', 't') +
        T(20, 130, 'Gate 4: In 12, 13 → Out 11', 't') +
        T(20, 180, 'Universal synthesis: single IC 7400 builds NOT (1 gate), AND (2 gates), OR (3 gates)', 'ta')
      ),
      caption: 'IC 7400 pin configuration and universal logic implementation on digital trainer kit.',
    },
  },
  'beee:5:10': {
    explain: [
      'In this experiment, students connect a signal function generator to an oscilloscope to measure amplitude, frequency, and phase difference.',
      'Feeding two sine waves into Channel 1 and Channel 2 in X-Y mode displays twisting Lissajous figures (circles, ellipses, diagonals) that measure phase angle.',
    ],
    definition:
      'The CRO signal measurement experiment determines AC wave parameters (peak-to-peak voltage V_p-p, time period T, frequency f) and measures phase difference φ between two signals using Lissajous patterns in X-Y mode.',
    formula: 'V_{p-p} = N_y \\times (\\text{Volts/Div}), \\quad f = \\frac{1}{N_x \\times (\\text{Time/Div})}, \\quad \\sin\\phi = \\frac{y_1}{y_2} \\quad (\\text{Lissajous ellipse})',
    steps: [
      'Connect function generator output to CRO Channel 1 using BNC cable; set waveform to sinusoidal 1 kHz.',
      'Adjust Volts/Div and Time/Div knobs to display 2 full stable cycles on the screen.',
      'Count vertical divisions between positive and negative peaks: V_p-p = divisions × Volts/Div.',
      'Count horizontal divisions for one full cycle: T = divisions × Time/Div; calculate frequency f = 1/T.',
      'Phase Measurement (Lissajous Method): connect source 1 to CH1 (X) and phase-shifted source 2 to CH2 (Y); switch CRO to X-Y mode.',
      'Measure vertical intercept y₁ (where ellipse cuts y-axis) and maximum height y₂; compute phase angle φ = arcsin(y₁ / y₂).',
      'Observe: straight diagonal line means φ = 0° or 180°; perfect circle means φ = 90° with equal amplitudes.',
    ],
    examAnswer: [
      'Explain how peak-to-peak voltage V_p-p and frequency f are measured using CRO graticule scale.',
      'Explain Lissajous figures and derive the phase measurement formula: sin φ = y₁ / y₂.',
      'Sketch Lissajous patterns for phase angles: 0° (diagonal line), 45° (ellipse), 90° (circle), and 180° (opposite diagonal).',
      'State 2 advantages of CRO over digital multimeter (displays wave shape, measures high frequencies > 20 MHz).',
    ],
    slip: 'Forgetting to check the calibration (CAL) knob on the Volts/Div and Time/Div controls. If the red variable vernier CAL knob is not clicked fully into detent position, division scale readings will be completely inaccurate.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'LISSAJOUS FIGURES FOR PHASE MEASUREMENT (X-Y MODE)', 'ta') +
        T(30, 45, 'φ = 0° (In-Phase)', 't') +
        L(30, 110, 80, 60, 'ta') +
        T(120, 45, 'φ = 90° (Circle)', 'ta') +
        C(155, 85, 25, 'ta') +
        T(220, 45, 'φ = 45° (Ellipse)', 't') +
        P('M230 100 Q255 60 280 70 Q305 80 280 100 Q255 110 230 100 Z', 'l') +
        T(220, 140, 'sin φ = y₁ / y₂', 'ta') +
        T(20, 180, 'X-Y mode: straight line = 0°/180°   |   Circle = 90°   |   Ellipse = intermediate phase φ', 'ta')
      ),
      caption: 'Lissajous patterns in CRO X-Y mode for phase difference evaluation between two AC waves.',
    },
  },
  'beee:5:11': {
    explain: [
      'In this practical session, students handle real physical spools of single-strand wires, multi-strand flexible cables, armored power cables, and rewirable fuse carriers.',
      'Students learn standard color codes: Brown/Red for Live, Blue/Black for Neutral, and Green/Yellow for Earth.',
    ],
    definition:
      'The cable and fuse identification lab trains engineering students to categorize conductor types (solid vs stranded, copper vs aluminum), insulation ratings (PVC, XLPE), cable armoring, standard wire gauges (SWG), and fuse ratings.',
    formula: '\\text{Color Codes (India/IEC): Live = Brown / Red}, \\ \\text{Neutral = Blue / Black}, \\ \\text{Earth = Green / Yellow}',
    steps: [
      'Conductor Materials: Copper (high conductivity, domestic wiring) vs Aluminum (lightweight, overhead distribution).',
      'Solid wire (single rigid conductor) vs Stranded / Flexible cable (multiple twisted thin strands for bending flexibility).',
      'Armored Cable: heavy industrial cable with inner insulation, galvanized steel wire armor (mechanical protection), and outer PVC sheath.',
      'Wire Gauge: Standard Wire Gauge (SWG); higher gauge number means thinner conductor diameter (e.g., 14 SWG is thicker than 22 SWG).',
      'Rewirable Kit-Kat Fuses: porcelain base and carrier with replaceable tinned copper fuse element.',
      'HRC (High Rupturing Capacity) Fuses: sealed ceramic body packed with quartz sand; ruptures short-circuit currents up to 100 kA without external flame or explosion.',
    ],
    examAnswer: [
      'State standard color codes for single-phase 3-wire domestic electrical installations (Live, Neutral, Earth).',
      'Differentiate between flexible stranded wire and solid wire.',
      'Explain the construction and safety advantages of an HRC (High Rupturing Capacity) fuse.',
      'Explain the relationship between wire gauge (SWG) and conductor current-carrying capacity.',
    ],
    slip: 'Connecting the fuse on the neutral wire instead of the live wire. A fuse must always be connected on the live/phase conductor; if installed on neutral, blowing the fuse still leaves the appliance alive at 230V.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'CABLE STRUCTURE & STANDARD COLOR CODES', 'ta') +
        R(50, 60, 120, 50, 'fa') +
        T(65, 85, 'Copper Core', 't') +
        R(40, 55, 140, 60, 'l') + T(140, 50, 'PVC Sheath', 't') +
        T(200, 55, 'Standard Wiring Colors:', 'ta') +
        T(210, 75, '• Live (Phase): Red / Brown', 'ta') +
        T(210, 95, '• Neutral: Black / Blue', 't') +
        T(210, 115, '• Earth: Green / Yellow', 'ta') +
        T(20, 155, 'HRC Fuse: ceramic tube packed with quartz sand (up to 100 kA rupturing)', 't') +
        T(20, 180, 'Safety rule: Fuse and switches must ALWAYS be placed on the LIVE wire, never on neutral', 'ta')
      ),
      caption: 'Three-core electrical cable construction, standard insulation color coding, and HRC fuse.',
    },
  },
  'beee:5:12': {
    explain: [
      'This lab experiment tests the operational tripping behavior of fuses, Miniature Circuit Breakers (MCBs), and Molded Case Circuit Breakers (MCCBs).',
      'Students trigger simulated overloads and short-circuits to observe the thermal bimetallic bend and the instant magnetic trip coil in action.',
    ],
    definition:
      'The circuit breaker operation experiment demonstrates the protective tripping characteristics of rewirable fuses, MCBs (thermal-magnetic mechanism up to 100A), and MCCBs (industrial adjustable trip up to 2500A) under overload and short-circuit conditions.',
    formula: 't_{\\text{trip}} \\propto \\frac{1}{I^2} \\quad (\\text{Inverse-time thermal curve}), \\quad t_{\\text{magnetic}} < 10 \\text{ ms}',
    steps: [
      'Mount standard C-curve 16A MCB on DIN rail of test bench; connect to variable current injection transformer.',
      'Overload Test: inject 1.5× rated current (24A); observe thermal trip delay (~30 to 60 seconds as bimetal strip heats and deflects).',
      'Short-Circuit Test: inject 5× to 10× rated current (high surge); observe instantaneous magnetic solenoid trip (<10 ms).',
      'Observe visual ON/OFF trip indicator toggle switch; reset MCB manually by flipping switch upward.',
      'Compare with rewirable fuse: fuse melts irreversibly; requires circuit isolation, unscrewing carrier, and rewiring.',
      'Inspect cut-section MCCB model: observe arc chutes (splitter plates that quench electrical arcs) and adjustable magnetic trip dials.',
    ],
    examAnswer: [
      'Explain the dual operating mechanism of an MCB: Thermal trip (bimetal for moderate overloads) and Magnetic trip (solenoid for short-circuits).',
      'Contrast Fuse vs MCB vs MCCB across current ratings, operating speed, and reusability.',
      'Explain the function of arc chutes inside circuit breakers.',
      'Explain why MCB C-curve is chosen for domestic loads with inductive appliances (fans, refrigerators).',
    ],
    slip: 'Confusing MCB tripping curves. B-curve trips at 3–5× rated current (resistive loads); C-curve trips at 5–10× rated current (inductive loads with starting inrush current); D-curve trips at 10–20× (heavy industrial motors).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'MCB INTERNAL TRIPPING MECHANISM', 'ta') +
        R(40, 50, 130, 80, 'fa') +
        T(50, 75, 'Bimetal Strip', 'ta') + T(50, 95, '(Thermal Overload)', 't') +
        T(50, 115, 'Deflects slowly', 't') +
        R(190, 50, 130, 80, 'fa') +
        T(200, 75, 'Magnetic Solenoid', 'ta') + T(200, 95, '(Short-Circuit)', 't') +
        T(200, 115, 'Trips in < 10 ms', 't') +
        T(20, 155, 'Arc Chute: metal splitter plates extinguish electrical switching arcs', 't') +
        T(20, 180, 'Resettable lever restores power immediately after fault clearance (zero rewiring)', 'ta')
      ),
      caption: 'MCB dual protective elements: slow thermal bimetallic strip and instant magnetic solenoid trip.',
    },
  },
  'beee:5:13': {
    explain: [
      'In this safety lab, students inspect real outdoor pipe earthing and plate earthing pits.',
      'Students learn how alternating layers of crushed charcoal and salt maintain ground moisture, ensuring fault currents safely discharge into the earth.',
    ],
    definition:
      'The earthing techniques lab experiment covers the physical installation and maintenance of pipe earthing and plate earthing systems, soil resistivity treatment, and electrical shock safety procedures.',
    formula: 'R_{\\text{plate}} = \\frac{\\rho}{4} \\sqrt{\\frac{\\pi}{A}}, \\quad R_{\\text{pipe}} = \\frac{\\rho}{2\\pi l} \\ln\\left( \\frac{4l}{d} \\right)',
    steps: [
      'Inspect Pipe Earthing pit: galvanized iron (GI) pipe (38mm diameter, 2.5m long) drilled with holes.',
      'Bedding: pipe is surrounded by alternate layers of charcoal (retains moisture) and salt (provides ions to lower soil resistivity) up to 15cm thick.',
      'Funnel with wire mesh is fitted at top for periodic watering to maintain low earth resistance during dry summer months.',
      'Inspect Plate Earthing: copper plate (60cm × 60cm × 3.18mm) or GI plate (60cm × 60cm × 6.35mm) buried vertically at depth > 3 meters.',
      'Connect heavy GI/copper earth continuity conductor from appliance metal frame to earth pit.',
      'Verify earth continuity: measure voltage between Phase and Earth (should equal ~230V) and between Neutral and Earth (should be < 2V).',
    ],
    examAnswer: [
      'Draw the complete labeled cross-sectional diagram of Pipe Earthing showing pipe dimensions, charcoal/salt layers, and watering funnel.',
      'Draw Plate Earthing installation diagram with standard plate dimensions.',
      'Explain the purpose of salt and charcoal in the earth pit.',
      'Explain the simple multimeter test to verify domestic earthing (V_Phase-Earth ≈ 230V, V_Neutral-Earth < 2V).',
    ],
    slip: 'Burying the earth plate horizontally. Earth plates must always be buried vertically on edge to maximize contact with soil and prevent water pooling.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'PIPE EARTHING PIT CROSS-SECTION', 'ta') +
        L(50, 45, 170, 45, 'l') + T(75, 40, 'Ground Level', 't') +
        R(95, 45, 30, 95, 'fa') + T(98, 95, 'GI Pipe', 'ta') +
        R(75, 75, 20, 65, 'l') + R(125, 75, 20, 65, 'l') +
        T(78, 110, 'Salt + Charcoal', 't') +
        T(200, 60, '1. GI Pipe (38mm dia, 2.5m long)', 't') +
        T(200, 80, '2. Charcoal + Salt Bed (15cm)', 'ta') +
        T(200, 100, '3. Watering funnel with mesh', 't') +
        T(200, 120, '4. Resistance: < 5 Ω (home)', 'ta') +
        T(20, 180, 'Salt lowers soil resistivity   |   Charcoal holds moisture   |   Funnel allows watering', 'ta')
      ),
      caption: 'Detailed cross-section of a pipe earthing pit showing GI pipe and moisture-retaining salt/charcoal bed.',
    },
  },
  'beee:5:14': {
    explain: [
      'In this practical wiring exercise, students assemble a complete domestic switchboard on a wooden board.',
      'Wiring a light bulb and a ceiling fan with an electronic speed regulator, students ensure the switch and MCB are wired into the live wire for electrical safety.',
    ],
    definition:
      'The domestic installation wiring experiment trains students in single-phase consumer wiring of lighting and ceiling fan circuits with electronic speed regulators, controlled by one-way switches and protected by an MCB.',
    formula: '\\text{Wiring Rule: Phase } \\to \\text{ MCB } \\to \\text{ Switch } \\to \\text{ Appliance } \\to \\text{ Neutral}',
    steps: [
      'Mount wooden wiring board with 16A MCB, two one-way switches, socket outlet, electronic fan regulator, ceiling rose, and batten lamp holder.',
      'Phase (Live) Connection: incoming Phase wire connects directly to MCB input; MCB output loops to bottom terminals of all control switches.',
      'Lamp Circuit: top terminal of switch 1 connects to one terminal of lamp holder; other lamp terminal connects to common Neutral bus bar.',
      'Fan Circuit: top terminal of switch 2 connects in series with electronic fan regulator; regulator output connects to fan phase lead; fan neutral connects to Neutral bus.',
      'Earth Connection: Green earth wire loops to 3-pin socket earth pin and fan metal canopy.',
      'Safety Check: verify with neon test screwdriver that switch disconnects the Phase conductor when turned OFF.',
    ],
    examAnswer: [
      'Draw the complete schematic wiring diagram for a lamp and ceiling fan with electronic regulator, 2 switches, and an MCB.',
      'State the fundamental rule of domestic wiring: switches and protective devices must always be placed on the Phase/Live wire.',
      'Explain the purpose of the 3-pin socket earth pin (longer and thicker for early earth connection and safety).',
      'Explain how an electronic fan regulator controls speed (triac phase control chops the AC sine wave to reduce RMS voltage).',
    ],
    slip: 'Wiring the switch on the neutral wire. The lamp will still turn on and off, but when OFF, the lamp socket remains live at 230V, creating a deadly shock hazard for anyone changing the light bulb.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'DOMESTIC WIRING: LAMP & FAN WITH REGULATOR', 'ta') +
        L(30, 60, 70, 60, 'ta') + T(20, 55, 'Phase (Live)', 'ta') +
        R(70, 50, 25, 20, 'fa') + T(75, 63, 'MCB', 'ta') +
        L(95, 60, 130, 60) +
        L(130, 60, 130, 110) +
        L(130, 60, 160, 60) + L(130, 110, 160, 110) +
        T(165, 65, 'Switch 1', 't') + T(165, 115, 'Switch 2', 't') +
        L(210, 60, 250, 60) + C(265, 60, 12, 'l') + T(260, 65, 'Lamp', 't') +
        L(210, 110, 230, 110) + R(230, 100, 25, 20, 'fa') + T(235, 113, 'Reg', 'ta') +
        L(255, 110, 280, 110) + C(295, 110, 12, 'l') + T(290, 115, 'Fan', 't') +
        L(277, 60, 330, 60) + L(307, 110, 330, 110) + L(330, 60, 330, 140) +
        L(30, 140, 330, 140) + T(20, 135, 'Neutral', 't') +
        T(20, 180, 'Phase feeds MCB & switches   |   Neutral returns common   |   Switches on Phase wire!', 'ta')
      ),
      caption: 'Single-phase consumer circuit: MCB protection, one-way switches, electronic regulator, and common neutral return.',
    },
  },
  'beee:5:15': {
    explain: [
      'A standard multimeter cannot measure insulation resistance or ground pit resistance because its tiny 9V battery cannot punch through high resistances.',
      'A Megger generates a high DC test voltage (500V or 1000V) using an internal hand-cranked generator, measuring mega-ohms of insulation integrity and verifying ground pit safety.',
    ],
    definition:
      'A Megger (megohmmeter) is a specialized high-voltage testing instrument used to measure high insulation resistance of electrical cables, motor windings, and transformer coils, as well as earth electrode resistance using the fall-of-potential method.',
    formula: 'R_{\\text{insulation}} \\ge 1 \\text{ M}\\Omega \\quad (\\text{Standard rule: } > 1 \\text{ M}\\Omega \\text{ per } 1000\\text{V operating voltage})',
    steps: [
      'Megger Construction: permanent magnet moving coil (PMMC) ratio meter with two coils (Current/Deflecting coil and Voltage/Pressure coil) powered by a built-in hand-cranked DC magneto (500V or 1000V) turned at 160 RPM.',
      'Cable Insulation Test: connect Line (L) terminal to cable core conductor and Earth (E) terminal to outer metal sheath; crank handle at 160 RPM; read insulation resistance directly on dial (should be > 1 MΩ to 100 MΩ).',
      'Guard Terminal (G): connected to cable insulation surface to bypass surface leakage currents around the deflecting coil.',
      'Earth Resistance Measurement (Fall-of-Potential Method): uses 4-terminal Earth Tester Megger; drives current through earth electrode E and auxiliary current spike C; measures voltage with potential spike P at 61.8% distance.',
      'Compute earth resistance: R_E = V / I.',
    ],
    examAnswer: [
      'Explain the working principle of a Megger (ratio meter with deflecting and control coils; reading independent of generator speed).',
      'Explain how a Megger measures cable insulation resistance with diagram showing Line, Earth, and Guard terminals.',
      'Explain the purpose of the Guard (G) terminal in a Megger (eliminates surface leakage current errors).',
      'Describe the Fall-of-Potential method for measuring earth electrode resistance using auxiliary spikes.',
    ],
    slip: 'Touching the test leads while cranking a Megger. A Megger outputs a high test voltage of 500V to 1000V DC which can give a painful electric shock.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'MEGGER INSULATION TESTER & GUARD TERMINAL', 'ta') +
        R(50, 50, 120, 80, 'fa') +
        T(75, 75, 'MEGGER', 'ta') +
        T(65, 95, '500V / 1000V', 't') +
        T(60, 115, 'Crank: 160 RPM', 't') +
        L(170, 65, 220, 65) + T(185, 55, 'Line (L)', 'ta') +
        L(170, 90, 220, 90) + T(185, 82, 'Guard (G)', 't') +
        L(170, 115, 220, 115) + T(185, 125, 'Earth (E)', 't') +
        R(220, 55, 80, 20, 'l') + T(235, 68, 'Cable Core', 't') +
        R(220, 80, 80, 45, 'l') + T(230, 105, 'Outer Sheath', 't') +
        T(20, 155, 'Acceptable insulation: > 1 MΩ (Safe > 10 MΩ)', 't') +
        T(20, 180, 'Guard terminal G bypasses surface leakage   |   Earth tester measures pit resistance (<5Ω)', 'ta')
      ),
      caption: 'Megger high-voltage insulation test showing Line (L), Earth (E), and surface Guard (G) connections.',
    },
  },
};
