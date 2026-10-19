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

export const BEEE_UNIT4_TOPICS: Record<string, TopicContent> = {
  'beee:4:0': {
    explain: [
      'Computers do not count in base-10; they use binary (base-2: 0 and 1) because transistors are either OFF or ON.',
      'Octal (base-8) and Hexadecimal (base-16) are shorthand notations where 3 or 4 binary bits are packed into a single character for human readability.',
    ],
    definition:
      'Positional number systems express quantities using radix powers: Binary (base 2), Octal (base 8), Decimal (base 10), and Hexadecimal (base 16, digits 0–9 and A–F where A=10, F=15).',
    formula: 'N_b = \\sum_{i} d_i \\cdot b^i, \\quad 1 + 1 = 0 \\text{ (carry 1)}, \\quad 1 + 1 + 1 = 1 \\text{ (carry 1)}',
    steps: [
      'Binary (Base 2): digits {0, 1}. Weights: 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128.',
      'Hexadecimal (Base 16): digits {0–9, A, B, C, D, E, F}; each hex digit directly replaces a 4-bit nibble (e.g., (1111)₂ = (F)₁₆; (1010)₂ = (A)₁₆).',
      'Octal (Base 8): digits {0–7}; each octal digit directly replaces a 3-bit group.',
      'Conversion Decimal to Binary: successive division by 2, reading remainders from bottom to top (MSB to LSB).',
      'Binary Addition Rules: 0+0 = 0; 0+1 = 1; 1+0 = 1; 1+1 = 0 (carry 1); 1+1+1 = 1 (carry 1).',
    ],
    examAnswer: [
      'State the radix and symbols for Binary (2), Octal (8), Decimal (10), and Hexadecimal (16).',
      'Convert a decimal number to binary and hexadecimal with full division steps (e.g., (105)₁₀ = (1101001)₂ = (69)₁₆).',
      'State binary addition rules and perform binary arithmetic showing all carry bits.',
      'Explain 1’s complement and 2’s complement representation for negative binary numbers.',
    ],
    slip: 'Grouping bits from the left instead of from the binary point. When grouping binary into hex (4 bits) or octal (3 bits), always group outward from the binary point (leftwards for integer, rightwards for fraction).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'NUMBER SYSTEMS & 4-BIT HEX GROUPING', 'ta') +
        T(30, 45, 'Binary: (1 1 0 1  0 1 1 0)₂', 't') +
        R(30, 60, 65, 30, 'fa') + T(45, 80, '1 1 0 1', 'ta') +
        R(110, 60, 65, 30, 'fa') + T(125, 80, '0 1 1 0', 'ta') +
        LA(62, 95, 62, 120) + T(55, 135, '= D (13)', 'ta') +
        LA(142, 95, 142, 120) + T(138, 135, '= 6', 'ta') +
        T(55, 160, 'Hexadecimal Result: (D6)₁₆', 't') +
        T(210, 50, 'Binary Addition:', 't') +
        T(220, 75, '  1 0 1 1  (11)', 't') +
        T(220, 95, '+ 0 1 1 0  (6)', 't') +
        L(215, 105, 310, 105, 'l') +
        T(220, 125, '= 1 0 0 0 1  (17)', 'ta') +
        T(20, 180, 'Hex groups 4 bits   |   Octal groups 3 bits   |   1+1=0 (carry 1), 1+1+1=1 (carry 1)', 'ta')
      ),
      caption: 'Binary nibble grouping into Hexadecimal and binary addition with carry propagation.',
    },
  },
  'beee:4:1': {
    explain: [
      'Logic gates are the microscopic decision-makers inside every computer chip.',
      'While AND, OR, and NOT are the basic gates, NAND and NOR are celebrated as Universal Gates because you can build any computer circuit using only NAND or only NOR gates.',
    ],
    definition:
      'Logic gates are physical electronic devices implementing Boolean functions that perform logical operations on one or more binary inputs to produce a single binary output. NAND and NOR are universal gates capable of synthesizing any arbitrary logic function.',
    formula: 'Y = \\overline{A \\cdot B} \\quad (\\text{NAND}), \\quad Y = \\overline{A + B} \\quad (\\text{NOR}), \\quad \\text{NOT using NAND: } Y = \\overline{A \\cdot A} = \\overline{A}',
    steps: [
      'Basic Gates: AND (Y = A·B), OR (Y = A+B), NOT (Inverter, Y = A’).',
      'Derived Gates: NAND (Y = (A·B)’), NOR (Y = (A+B)’), XOR (Y = A⊕B = A’B + AB’), XNOR (Y = AB + A’B’).',
      'Universal Property of NAND: tying inputs together gives NOT; inverting NAND output gives AND; applying De Morgan’s gives OR (A + B = ((A+B)’)’ = (A’ · B’)’ = NAND(A’, B’)).',
      'Universal Property of NOR: tying inputs together gives NOT; inverting NOR output gives OR; applying De Morgan’s gives AND (A · B = ((A·B)’)’ = (A’ + B’)’ = NOR(A’, B’)).',
    ],
    examAnswer: [
      'Draw standard schematic symbols and write truth tables for all 7 gates: AND, OR, NOT, NAND, NOR, XOR, XNOR.',
      'Define why NAND and NOR are called Universal Gates.',
      'Show how to construct NOT, AND, and OR gates using only NAND gates with diagrams and Boolean algebra proofs.',
      'Show how to construct NOT, AND, and OR gates using only NOR gates.',
    ],
    slip: 'Confusing XOR truth table with XNOR truth table. XOR gives 1 when inputs are different (odd parity); XNOR gives 1 when inputs are identical (even parity).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'UNIVERSAL GATES (NAND & NOR SYNTHESIS)', 'ta') +
        T(30, 45, '1. NOT using NAND', 'ta') +
        L(20, 75, 50, 75) + L(50, 70, 50, 80) +
        P('M50 65 L65 65 A15 15 0 0 1 65 95 L50 95 Z', 'l') + C(83, 80, 3, 'l') +
        L(86, 80, 110, 80) + T(115, 83, 'Y = A’', 'ta') +
        T(180, 45, '2. AND using 2 NANDs', 'ta') +
        P('M180 65 L195 65 A15 15 0 0 1 195 95 L180 95 Z', 'l') + C(213, 80, 3, 'l') +
        L(216, 80, 240, 80) +
        P('M240 65 L255 65 A15 15 0 0 1 255 95 L240 95 Z', 'l') + C(273, 80, 3, 'l') +
        L(276, 80, 310, 80) + T(315, 83, 'Y = A·B', 'ta') +
        T(20, 150, '3. OR using 3 NANDs: Y = (A’·B’)’ = A + B (De Morgan)', 't') +
        T(20, 180, 'Universal property: NAND or NOR alone can synthesize any digital computer circuit', 'ta')
      ),
      caption: 'Universal logic synthesis: implementing NOT, AND, and OR functions using only NAND gates.',
    },
  },
  'beee:4:2': {
    explain: [
      'Boolean algebra is the mathematics of true/false logic, used to simplify tangled digital circuits into the fewest possible physical gates.',
      'De Morgan’s laws are the master keys: break the line, change the sign—meaning the complement of a product is the sum of complements, and vice-versa.',
    ],
    definition:
      'Boolean algebra is a branch of algebra where variables take only binary truth values {0, 1}, governed by identity, idempotence, complement, distributive laws, and De Morgan’s duality theorems.',
    formula: '\\overline{A \\cdot B} = \\overline{A} + \\overline{B}, \\quad \\overline{A + B} = \\overline{A} \\cdot \\overline{B}, \\quad A + A B = A \\quad (\\text{Absorption}), \\quad A + \\overline{A} B = A + B',
    steps: [
      'Identity Laws: A + 0 = A; A · 1 = A.',
      'Null Laws: A + 1 = 1; A · 0 = 0.',
      'Idempotent Laws: A + A = A; A · A = A.',
      'Complement Laws: A + A’ = 1; A · A’ = 0; (A’)’ = A (Involution).',
      'Distributive Law: A + BC = (A + B)(A + C); A(B + C) = AB + AC.',
      'Absorption Laws: A + AB = A; A(A + B) = A; A + A’B = A + B.',
      'De Morgan’s 1st Law: (A · B)’ = A’ + B’ (NAND equals Bubble-OR).',
      'De Morgan’s 2nd Law: (A + B)’ = A’ · B’ (NOR equals Bubble-AND).',
    ],
    examAnswer: [
      'State and prove De Morgan’s two laws using truth tables.',
      'State the Absorption laws: A + AB = A and A + A’B = A + B and prove algebraically.',
      'Simplify a given complex Boolean expression into minimal Sum-of-Products (SOP) form.',
      'Explain the engineering benefit of Boolean simplification (reduces IC gate count, reduces chip power consumption, cuts propagation delay).',
    ],
    slip: 'Claiming A + BC = AB + AC. The correct boolean distributive law is A + BC = (A + B)(A + C). Unlike ordinary algebra, OR distributes over AND.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'DE MORGAN’S THEOREMS & LOGIC EQUIVALENCE', 'ta') +
        T(30, 45, 'De Morgan 1: (A · B)’ = A’ + B’', 'ta') +
        P('M40 70 L60 70 A15 15 0 0 1 60 100 L40 100 Z', 'l') + C(78, 85, 3, 'l') +
        T(90, 88, '≡', 't') +
        P('M115 70 Q130 70 145 85 Q130 100 115 100 Q125 85 115 70 Z', 'l') +
        C(112, 75, 2.5, 'ta') + C(112, 95, 2.5, 'ta') +
        T(155, 88, 'Bubble-OR', 'ta') +
        T(30, 135, 'De Morgan 2: (A + B)’ = A’ · B’', 'ta') +
        P('M40 145 Q55 145 70 160 Q55 175 40 175 Q50 160 40 145 Z', 'l') + C(73, 160, 3, 'l') +
        T(85, 163, '≡', 't') +
        P('M115 145 L135 145 A15 15 0 0 1 135 175 L115 175 Z', 'l') +
        C(112, 150, 2.5, 'ta') + C(112, 170, 2.5, 'ta') +
        T(155, 163, 'Bubble-AND', 'ta') +
        T(20, 180, 'Rule: “Break the line, change the sign” (NAND = Inverted-input OR)', 'ta')
      ),
      caption: 'De Morgan’s duality theorems: NAND equals Bubble-OR and NOR equals Bubble-AND.',
    },
  },
  'beee:4:3': {
    explain: [
      'A seven-segment display arranges seven bar-shaped LEDs (labeled a through g) in a figure-8 layout to display numbers 0 to 9.',
      'By turning on specific segment combinations (e.g., lighting a, b, c, d, g forms the digit "3"), a BCD decoder chips translates 4-bit binary inputs into readable numerals.',
    ],
    definition:
      'A seven-segment display is an optoelectronic display device containing 7 independent LED segments arranged in a figure-eight configuration (plus optional decimal point dp) configured as common anode (CA) or common cathode (CC).',
    formula: '\\text{Common Anode: } 0 = \\text{ON}, \\ 1 = \\text{OFF}; \\quad \\text{Common Cathode: } 1 = \\text{ON}, \\ 0 = \\text{OFF}',
    steps: [
      'Segment Layout: 7 bars designated a, b, c, d, e, f, g (a: top, b: top-right, c: bottom-right, d: bottom, e: bottom-left, f: top-left, g: center).',
      'Common Anode (CA): all LED anodes tied to +V_CC; a segment lights up when its cathode input is pulled LOW (logic 0).',
      'Common Cathode (CC): all LED cathodes tied to ground (0V); a segment lights up when its anode input is pulled HIGH (logic 1).',
      'Displaying Digits: "0" = a,b,c,d,e,f (g OFF); "1" = b,c; "7" = a,b,c; "8" = all a–g ON.',
      'BCD-to-7-Segment Decoder (e.g., IC 7447 for CA, IC 7448 for CC): accepts 4-bit binary code (0000 to 1001) and decodes correct segment drive signals.',
    ],
    examAnswer: [
      'Draw the 7-segment display pinout diagram labeling segments a, b, c, d, e, f, g, and dp.',
      'Differentiate Common Anode (active-low drive) vs Common Cathode (active-high drive).',
      'Write the truth table showing segment states (a through g) for decimal digits 0 through 9.',
      'Name standard BCD to 7-segment decoder ICs (7447 for Common Anode, 7448 for Common Cathode).',
    ],
    slip: 'Confusing Common Anode with Common Cathode drive logic. For Common Anode (IC 7447), logic 0 turns a segment ON; for Common Cathode, logic 1 turns a segment ON.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SEVEN-SEGMENT DISPLAY CONFIGURATION', 'ta') +
        R(70, 45, 60, 100, 'fa') +
        R(80, 50, 40, 8, 'ta') + T(98, 48, 'a', 't') +
        R(122, 58, 8, 30, 'ta') + T(133, 75, 'b', 't') +
        R(122, 96, 8, 30, 'ta') + T(133, 112, 'c', 't') +
        R(80, 128, 40, 8, 'ta') + T(98, 145, 'd', 't') +
        R(70, 96, 8, 30, 'ta') + T(60, 112, 'e', 't') +
        R(70, 58, 8, 30, 'ta') + T(60, 75, 'f', 't') +
        R(80, 88, 40, 8, 'ta') + T(98, 86, 'g', 't') +
        C(140, 134, 4, 'ta') + T(148, 136, 'dp', 't') +
        T(180, 60, 'Common Anode (CA):', 't') +
        T(180, 78, 'Anodes tied to +5V (Active LOW)', 'ta') +
        T(180, 105, 'Common Cathode (CC):', 't') +
        T(180, 123, 'Cathodes tied to GND (Active HIGH)', 'ta') +
        T(20, 180, 'Digit 8 = all ON   |   Digit 0 = g OFF   |   Digit 1 = b,c ON   |   Driven by BCD IC 7447/7448', 'ta')
      ),
      caption: 'Seven-segment LED arrangement and Common Anode vs Common Cathode drive logic.',
    },
  },
  'beee:4:4': {
    explain: [
      'Instead of soldering thousands of individual transistors, resistors, and diodes together with wires, an Integrated Circuit (IC) etches an entire microscopic city of electronics onto a tiny silicon wafer chip.',
      'Digital ICs process 1s and 0s (microprocessors, memory), while analog ICs handle continuous real-world waves (operational amplifiers, audio chips).',
    ],
    definition:
      'An Integrated Circuit (IC) is a microscopic monolithic assembly of interconnected electronic components (transistors, diodes, resistors, capacitors) fabricated simultaneously onto a single semiconductor silicon substrate.',
    formula: '\\text{SSI } (<10 \\text{ gates}), \\ \\text{MSI } (10-100), \\ \\text{LSI } (10^2-10^4), \\ \\text{VLSI } (10^4-10^6), \\ \\text{ULSI } (>10^6 \\text{ transistors})',
    steps: [
      'Monolithic Fabrication: all components and interconnections are grown on a single silicon crystal using photolithography, diffusion, ion implantation, and metallization.',
      'Analog (Linear) ICs: process continuous varying signals; examples: Operational Amplifiers (Op-Amps like LM741), timers (NE555), voltage regulators, analog multipliers.',
      'Digital ICs: process discrete binary logic levels (0V and 5V); examples: logic gates (7400 series), microcontrollers, memory chips.',
      'Scale of Integration: SSI (Small Scale, <10 gates), MSI (Medium, 10–100), LSI (Large, 100–10,000), VLSI (Very Large, 10⁴–10⁶), ULSI (Ultra Large, >10⁶ transistors per chip).',
      'Key Advantages: miniature size, featherweight, ultra-low power consumption, high speed, extreme reliability (no loose solder joints), and mass-production low cost.',
    ],
    examAnswer: [
      'Define Integrated Circuit (IC) and contrast Analog ICs vs Digital ICs with 2 examples each.',
      'Classify ICs based on scale of integration: SSI, MSI, LSI, VLSI, ULSI with gate/transistor counts.',
      'List 4 major advantages of integrated circuits over discrete component circuits.',
      'State standard package types (DIP - Dual Inline Package, SMD - Surface Mount Device).',
    ],
    slip: 'Assuming inductors and high-value capacitors are easily fabricated inside standard ICs. Inductors and large capacitors (>50 pF) occupy massive silicon area and are almost always placed off-chip as discrete external components.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'INTEGRATED CIRCUITS (ANALOG VS DIGITAL)', 'ta') +
        R(50, 50, 100, 70, 'l') +
        C(70, 70, 6, 'ta') + C(90, 70, 6, 'ta') + C(110, 70, 6, 'ta') + C(130, 70, 6, 'ta') +
        C(70, 100, 6, 'ta') + C(90, 100, 6, 'ta') + C(110, 100, 6, 'ta') + C(130, 100, 6, 'ta') +
        T(60, 42, 'DIP-8 Package', 't') +
        T(180, 55, 'Analog ICs (Linear):', 't') +
        T(190, 75, '• Op-Amp LM741, Timer 555', 'ta') +
        T(190, 95, '• Continuous signals', 't') +
        T(180, 120, 'Digital ICs (Binary):', 't') +
        T(190, 140, '• 7400 Gates, Microprocessors', 'ta') +
        T(190, 158, '• Discrete 0 and 1 states', 't') +
        T(20, 180, 'Scale: SSI (<10) → MSI → LSI → VLSI (>10⁴) → ULSI (>10⁶ transistors on single die)', 'ta')
      ),
      caption: 'Integrated circuit packaging and classification: Analog (linear signals) vs Digital (binary logic).',
    },
  },
  'beee:4:5': {
    explain: [
      'Raw power supplies fluctuate when grid loads change, which can fry delicate microchips.',
      'IC 7805 and IC 7912 are 3-legged voltage regulator chips that act as electronic shock absorbers: 7805 outputs a rock-solid +5V for microcontrollers, while 7912 provides a clean -12V rail.',
    ],
    definition:
      'The 78xx and 79xx series are fixed three-terminal linear voltage regulator integrated circuits. The 78xx series provides positive regulated voltages (e.g., 7805 outputs +5V), while the 79xx series provides negative regulated voltages (e.g., 7912 outputs -12V).',
    formula: 'V_{\\text{out}}(7805) = +5.0 \\text{ V}, \\quad V_{\\text{out}}(7912) = -12.0 \\text{ V}, \\quad V_{\\text{in}} \\ge V_{\\text{out}} + 2\\text{V} \\quad (\\text{Dropout headroom})',
    steps: [
      'Pinout IC 7805 (Positive Regulator): Pin 1 = Input (unregulated +7V to +25V), Pin 2 = Common Ground (0V), Pin 3 = Regulated Output (+5V, up to 1.5A).',
      'Pinout IC 7912 (Negative Regulator): Pin 1 = Common Ground, Pin 2 = Input (negative unregulated), Pin 3 = Regulated Output (-12V). Note the pinout difference!',
      'Dropout Voltage: input voltage must be at least 2V higher than the regulated output (e.g., 7805 requires V_in ≥ 7V).',
      'Filter Capacitors: C_in (0.33 μF) prevents line inductive oscillations; C_out (0.1 μF) improves transient response.',
      'Built-in Protection: internal thermal overload shutdown, safe-area protection, and short-circuit current limiting make these chips virtually indestructible.',
    ],
    examAnswer: [
      'State the naming rule for 78xx (positive) and 79xx (negative) series and decode 7805 (+5V) and 7912 (-12V).',
      'Draw the complete connection diagram of IC 7805 showing Input, Ground, Output pins, and input/output bypass capacitors.',
      'Highlight the crucial pinout difference between 7805 (Pin 2 = GND) and 7912 (Pin 1 = GND).',
      'Explain dropout voltage and state minimum input voltage for IC 7805 (V_in ≥ 7V).',
    ],
    slip: 'Assuming 7912 has the same pinout as 7805. In 7805, Pin 1 is Input and Pin 2 is Ground; in 7912, Pin 1 is Ground and Pin 2 is Input! Swapping them burns the chip.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'VOLTAGE REGULATORS: IC 7805 (+5V) & IC 7912 (−12V)', 'ta') +
        R(40, 55, 100, 70, 'fa') +
        T(65, 85, 'IC 7805', 'ta') + T(55, 105, '(Positive +5V)', 't') +
        L(20, 90, 40, 90) + T(10, 85, '1: In', 't') +
        L(90, 125, 90, 150) + T(75, 162, '2: GND', 't') +
        L(140, 90, 160, 90) + T(165, 85, '3: Out (+5V)', 'ta') +
        R(210, 55, 100, 70, 'fa') +
        T(235, 85, 'IC 7912', 'ta') + T(225, 105, '(Negative −12V)', 't') +
        L(260, 125, 260, 150) + T(245, 162, '1: GND', 't') +
        L(190, 90, 210, 90) + T(180, 85, '2: In', 't') +
        L(310, 90, 330, 90) + T(315, 85, '3: Out (−12V)', 'ta') +
        T(20, 180, 'Requires V_in ≥ V_out + 2V (dropout headroom)   |   Built-in thermal & short-circuit protection', 'ta')
      ),
      caption: '3-terminal fixed voltage regulators: IC 7805 (+5V positive) vs IC 7912 (-12V negative) pinouts.',
    },
  },
  'beee:4:6': {
    explain: [
      'A digital multimeter (DMM) gives you numeric readings of resistance, voltage, and current.',
      'A Cathode Ray Oscilloscope (CRO) is an electrical television: it displays a live real-time graph of voltage versus time, letting you directly view wave shapes, frequencies, and phase shifts.',
    ],
    definition:
      'A digital multimeter (DMM) is a portable electronic measuring instrument combining voltmeter, ammeter, and ohmmeter functions. A Cathode Ray Oscilloscope (CRO) is a versatile electronic visual display instrument that plots voltage (Y-axis) versus time (X-axis).',
    formula: 'V_{\\text{p-p}} = (\\text{div}_y) \\times (\\text{Volts/Div}), \\quad T = (\\text{div}_x) \\times (\\text{Time/Div}), \\quad f = \\frac{1}{T}',
    steps: [
      'DMM: measures DC/AC voltage, DC/AC current, resistance, diode drops, and continuity using dual-slope integrating ADC; high input impedance (>10 MΩ) minimizes circuit loading.',
      'CRO Core Component: Cathode Ray Tube (CRT) containing Electron Gun (emits electron beam), Horizontal and Vertical Deflection Plates, and Fluorescent Phosphor Screen.',
      'Time Base Generator: applies a linear sawtooth voltage to horizontal deflection plates, sweeping the electron beam smoothly from left to right at constant speed.',
      'Vertical Deflection: unknown input signal v(t) is amplified and applied to vertical plates, deflecting the beam up and down.',
      'Measurement on CRO: Peak-to-peak voltage V_p-p = vertical divisions × Volts/Div knob setting.',
      'Period T = horizontal cycle divisions × Time/Div knob setting; frequency f = 1 / T.',
      'Lissajous Figures: applying two sine waves to X and Y plates simultaneously forms elliptical patterns used to measure frequency ratio and phase difference: sin φ = Y_0 / Y_m.',
    ],
    examAnswer: [
      'Draw the block diagram of a Cathode Ray Oscilloscope (CRO) showing CRT, vertical amplifier, time base generator, trigger circuit, and horizontal amplifier.',
      'Explain how voltage and frequency are measured from the CRO screen graticule.',
      'Explain the purpose of the time-base generator (provides linear sawtooth sweep voltage).',
      'Explain Lissajous figures and state the formula to calculate phase difference: sin φ = y₁ / y₂.',
    ],
    slip: 'Measuring period from peak-to-peak voltage divisions instead of horizontal divisions. Vertical divisions measure voltage (Volts/Div); horizontal divisions measure time (Time/Div).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'CATHODE RAY OSCILLOSCOPE (CRO) DISPLAY & GRATICULE', 'ta') +
        R(50, 45, 120, 95, 'fa') +
        L(50, 92, 170, 92, 'd') + L(110, 45, 110, 140, 'd') +
        P('M50 92 Q80 50 110 92 Q140 135 170 92', 'ta') +
        T(180, 60, '1. Voltage Measurement:', 't') +
        T(190, 78, 'V_p-p = (div_y) × Volts/Div', 'ta') +
        T(180, 105, '2. Frequency Measurement:', 't') +
        T(190, 123, 'Period T = (div_x) × Time/Div', 'ta') +
        T(190, 142, 'Frequency f = 1 / T', 't') +
        T(20, 180, 'Time base generator creates sawtooth sweep   |   Lissajous figures measure phase angle φ', 'ta')
      ),
      caption: 'CRO graticule display: measuring peak-to-peak voltage on Y-axis and wave period T on X-axis.',
    },
  },
  'beee:4:7': {
    explain: [
      'Sensors are the electronic senses of modern engineering: they convert real-world physical quantities (heat, pressure, light, movement) into electrical signals.',
      'A sensor detects physical change, while a transducer converts energy from one physical form into an electrical output.',
    ],
    definition:
      'A sensor detects changes in physical quantities (temperature, pressure, light, displacement), while a transducer converts non-electrical physical energy into proportional electrical signals (voltage, current, resistance).',
    formula: 'R_T = R_0 [1 + \\alpha(T - T_0)], \\quad \\text{Gauge Factor (GF)} = \\frac{\\Delta R / R}{\\Delta L / L} = 1 + 2\\nu + \\frac{\\Delta\\rho / \\rho}{\\varepsilon}',
    steps: [
      'Active Transducers: self-generating; produce an output voltage directly without needing external power (Thermocouple via Seebeck effect, Piezoelectric crystal, Solar cell).',
      'Passive Transducers: require an external power supply to produce measurable signal (Strain gauge, LVDT, Thermistor, Photodiode).',
      'Temperature Sensors: Thermistor (semiconductor with high negative temperature coefficient, NTC), RTD (Platinum PT100 with linear positive resistance), Thermocouple (dissimilar metals generate mV).',
      'Pressure & Strain Sensors: Strain Gauge (resistance changes with mechanical tension/compression: ΔR/R = GF · ε).',
      'Displacement Sensors: LVDT (Linear Variable Differential Transformer; converts linear core motion into differential AC output voltage).',
    ],
    examAnswer: [
      'Differentiate between a Sensor and a Transducer with examples.',
      'Classify transducers into Active vs Passive with 2 examples each.',
      'Explain working principle of LVDT (Linear Variable Differential Transformer) with diagram.',
      'Explain working of a resistance strain gauge and define Gauge Factor (GF).',
    ],
    slip: 'Confusing Thermistors with RTDs. RTDs (like Pt-100) are pure metals with positive temperature coefficient (PTC) and linear response; thermistors are metal-oxide semiconductors with large negative temperature coefficient (NTC).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'TRANSDUCER CLASSIFICATION & LVDT SENSOR', 'ta') +
        T(30, 45, 'Active (Self-Generating)', 'ta') +
        T(30, 65, '• Thermocouple (mV)', 't') +
        T(30, 85, '• Piezoelectric (Charge)', 't') +
        T(30, 105, '• Solar Cell (Photovoltaic)', 't') +
        T(190, 45, 'Passive (External Power)', 'ta') +
        T(190, 65, '• Strain Gauge (ΔR/R)', 't') +
        T(190, 85, '• LVDT (Displacement)', 't') +
        T(190, 105, '• Thermistor (NTC)', 't') +
        R(70, 125, 220, 25, 'fa') +
        T(80, 142, 'LVDT: Core motion shifts differential mutual voltages (V₁ − V₂)', 'ta') +
        T(20, 180, 'Transducers convert physical quantities (temp, force, displacement) into electrical signals.', 'ta')
      ),
      caption: 'Active vs passive transducer categories and LVDT linear displacement sensing principle.',
    },
  },
  'beee:4:8': {
    explain: [
      'Electricity cannot be stored in large quantities; it is generated at power plants, stepped up to extreme high voltages, sent across countrywide transmission towers, and stepped down for neighborhood homes.',
      'Stepping voltage up to 400,000 Volts slashes transmission current, saving massive amounts of power from being wasted as I²R heat in long cables.',
    ],
    definition:
      'The electrical power supply network consists of Generation (generating electricity at 11kV), Transmission (stepping up to 132kV/400kV for low-loss long-distance transit), and Distribution (stepping down to 11kV, 415V 3-phase, and 230V single-phase).',
    formula: 'P = VI \\cos\\phi \\implies I = \\frac{P}{V \\cos\\phi}, \\quad P_{\\text{loss}} = I^2 R = \\frac{P^2 R}{V^2 \\cos^2\\phi} \\propto \\frac{1}{V^2}',
    steps: [
      'Generation: thermal, hydroelectric, nuclear, solar, or wind power stations generate 3-phase AC at 11 kV (or 15.75 kV).',
      'Primary Transmission: step-up transformer raises voltage to Extra High Voltage (EHV: 132 kV, 220 kV, 400 kV, 765 kV) to slash current and I²R line losses.',
      'Secondary Transmission: receiving substation steps voltage down to 33 kV or 66 kV.',
      'Primary Distribution: city substation steps down to 11 kV for industrial feeders.',
      'Secondary Distribution: local pole-mounted distribution transformer steps down 11 kV to 415 V (line-to-line 3-phase) and 230 V (phase-to-neutral single-phase) for homes.',
      'Single-Line Diagram (SLD): standard engineering blueprint tracing energy from generator to consumer meter.',
    ],
    examAnswer: [
      'Draw the complete Single-Line Diagram (SLD) of an electrical power system from generating station to domestic consumer.',
      'Prove mathematically that line power loss is inversely proportional to square of transmission voltage: P_loss ∝ 1/V².',
      'Explain why AC is preferred over DC for generation and transmission (easy step-up/down using transformers, simple AC generator construction).',
      'List standard voltage levels at each stage: Generation (11kV), Transmission (132/400kV), Distribution (11kV, 415V, 230V).',
    ],
    slip: 'Believing higher voltage increases line losses. For a fixed power P, raising voltage V reduces current I = P/V; since losses scale as I²R, high voltage slashes transmission losses by 1/V².',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'POWER GENERATION, TRANSMISSION & DISTRIBUTION', 'ta') +
        C(50, 85, 18, 'l') + T(40, 88, 'Gen', 't') + T(30, 115, '11 kV', 't') +
        LA(68, 85, 105, 85) +
        R(105, 70, 30, 30, 'fa') + T(110, 88, 'Step Up', 'ta') +
        LA(135, 85, 205, 85) + T(145, 75, '400 kV (EHV Lines)', 'ta') +
        R(205, 70, 30, 30, 'fa') + T(210, 88, 'Subst.', 't') +
        LA(235, 85, 275, 85) + T(240, 75, '11 kV', 't') +
        R(275, 70, 30, 30, 'fa') + T(280, 88, 'Pole Tx', 'ta') +
        LA(305, 85, 340, 85) + T(310, 115, '230V / 415V', 'ta') +
        T(20, 155, 'Line Power Loss: P_loss = I²R ∝ 1 / V²', 'ta') +
        T(20, 180, 'High transmission voltage minimizes conductor size, I²R heating, and voltage drops.', 'ta')
      ),
      caption: 'Single-line layout: power generation at 11 kV, EHV transmission at 400 kV, and local distribution at 230 V.',
    },
  },
  'beee:4:9': {
    explain: [
      'Short circuits and electrical overloads can melt wiring and start catastrophic house fires.',
      'A fuse protects by melting a sacrificial wire once; a Miniature Circuit Breaker (MCB) uses bimetallic heat and magnetic coils to trip safely, resetting with the flick of a switch.',
    ],
    definition:
      'Electrical protection devices safeguard circuits against overcurrents and short-circuits: a Fuse provides sacrificial thermal interruption, an MCB (Miniature Circuit Breaker) provides resettable thermal-magnetic protection (<100A), and an MCCB (Molded Case Circuit Breaker) handles heavy industrial ratings (>100A to 2500A).',
    formula: 'I^2 t = \\text{constant} \\quad (\\text{Joule integral for fuse melting}), \\quad I_{\\text{rating}} \\ge 1.25 \\times I_{\\text{load}}',
    steps: [
      'Fuse: simple thin wire of low melting point alloy (tin-lead alloy or copper); excessive current melts the wire by Joule heating (I²R), permanently opening the circuit.',
      'MCB (Miniature Circuit Breaker): compact, resettable switch operating up to 100 A; features dual tripping mechanisms: 1. Bimetallic strip bends slowly under moderate sustained overloads (thermal trip); 2. Solenoid plunger instantly kicks open on massive short-circuits (magnetic trip within milliseconds).',
      'MCCB (Molded Case Circuit Breaker): heavy-duty circuit breaker for higher currents (up to 2500 A) with adjustable trip thresholds, used in industrial switchboards.',
      'Comparison: fuses are cheap but require manual rewiring; MCBs are fast, safe, indicate tripped state visually, and reset instantly without replacement.',
    ],
    examAnswer: [
      'Differentiate between a Fuse and an MCB across 5 parameters: operating principle, reusability, operating speed, visual indication, and cost.',
      'Explain the dual tripping mechanism of an MCB: Thermal trip (bimetallic strip for overload) and Magnetic trip (solenoid coil for short-circuit).',
      'Contrast MCB vs MCCB (current ratings, residential vs industrial use, fixed vs adjustable trip settings).',
      'State proper sizing criterion for fuses/MCBs based on continuous load current.',
    ],
    slip: 'Replacing a blown fuse with thick copper wire. A thick wire will not melt under fault current, which transfers the heat directly to house walls and ignites electrical fires.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'CIRCUIT PROTECTION: FUSE VS MCB DUAL-TRIP', 'ta') +
        T(30, 45, '1. Rewirable Fuse', 't') +
        P('M30 85 L60 85', 'l') + P('M60 85 Q75 70 90 85 T120 85', 'ta') + P('M120 85 L150 85', 'l') +
        T(40, 105, 'Melts once on overload', 't') +
        T(40, 120, 'Requires replacement', 't') +
        T(180, 45, '2. MCB Dual Mechanism', 'ta') +
        R(190, 60, 130, 70, 'fa') +
        T(200, 78, '• Thermal: Bimetal strip', 'ta') +
        T(205, 93, '(slow overload trip)', 't') +
        T(200, 110, '• Magnetic: Solenoid', 'ta') +
        T(205, 123, '(instant short-circuit)', 't') +
        T(20, 180, 'MCB trips safely and resets with a switch   |   MCCB handles industrial loads up to 2500A', 'ta')
      ),
      caption: 'Comparison of sacrificial fuse link and dual thermal-magnetic trip mechanism in modern MCBs.',
    },
  },
  'beee:4:10': {
    explain: [
      'If a live wire comes loose and touches the metal chassis of a washing machine, the entire machine becomes live at 230V—touching it would send lethal current through your heart.',
      'Earthing connects the metal body directly to a copper plate buried in moist earth, creating an ultra-low-resistance bypass that safely blows the fuse or trips the MCB in milliseconds.',
    ],
    definition:
      'Earthing is the process of connecting the non-current-carrying metallic frames of electrical appliances to the general mass of earth through an ultra-low-resistance conductor to prevent electric shock and fire hazards during insulation breakdown.',
    formula: 'R_{\\text{earth}} < 1 \\ \\Omega \\quad (\\text{Substations}), \\quad R_{\\text{earth}} < 5 \\ \\Omega \\quad (\\text{Domestic installations}), \\quad I_f = \\frac{V_{\\text{phase}}}{R_{\\text{earth}}}',
    steps: [
      'Purpose: 1. Protect human life from lethal shock; 2. Protect equipment by providing low-resistance fault path that rapidly trips protective MCBs; 3. Divert lightning surges harmlessly into ground.',
      'Mechanism: human body resistance is ~1,000 Ω. Proper earth resistance is < 1 to 5 Ω. Under fault, current overwhelmingly chooses the path of least resistance through the ground wire rather than through a human.',
      'Pipe Earthing: perforated GI (galvanized iron) pipe (38mm diameter, 2.5m long) driven vertically into ground, surrounded by alternating charcoal and salt layers to maintain moisture.',
      'Plate Earthing: copper plate (60cm × 60cm × 3.18mm) or GI plate buried vertically at least 3 meters deep in charcoal and salt bed.',
      'Watering Pipe: funnel with wire mesh provided to pour salt water periodically into the earth pit, ensuring low soil resistivity year-round.',
    ],
    examAnswer: [
      'Define Earthing and state its primary importance for electrical safety.',
      'Explain how earthing protects a person touching an appliance during a live-to-body insulation fault.',
      'Describe Pipe Earthing with neat labeled construction diagram (GI pipe, charcoal/salt layers, funnel).',
      'Describe Plate Earthing and state standard acceptable earth resistance values (substations < 1Ω, domestic < 5Ω).',
    ],
    slip: 'Confusing Neutral with Earth. The Neutral wire is the normal current-return conductor of an active electrical circuit; the Earth wire carries zero current during normal operation, conducting only during an accidental fault.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'EARTHING: SHOCK PROTECTION & EARTH PIT', 'ta') +
        R(30, 45, 100, 70, 'l') + T(40, 65, 'Appliance Body', 't') +
        L(30, 85, 130, 85, 'd') + T(40, 80, 'Fault to body', 'ta') +
        LA(80, 115, 80, 155) + T(90, 140, 'Earth wire', 'ta') +
        R(180, 45, 140, 95, 'fa') +
        T(190, 65, 'Pipe / Plate Pit:', 'ta') +
        T(195, 85, '• Perforated GI pipe', 't') +
        T(195, 105, '• Salt + Charcoal bed', 'ta') +
        T(195, 125, '• Resistance < 5 Ω', 't') +
        T(20, 180, 'Low earth resistance (<5Ω) diverts fault current from human body (~1000Ω) → trips MCB', 'ta')
      ),
      caption: 'Safety earthing: fault current diverted through low-resistance earth pit, preventing electric shock.',
    },
  },
};
