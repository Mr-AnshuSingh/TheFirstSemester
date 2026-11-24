// ============================================================================
// OFFICIAL MID-SEM SOLVED PRACTICE QUESTIONS & QUESTION BANK
// Includes all Teacher's Guess Topics, Number Conversions, Complements,
// Architecture, Networks, Circuits, Calculus, Optics & CIA Triad
// ============================================================================

export interface MidsemPracticeItem {
  id: string;
  subject: string;
  courseCode: string;
  unitNo: number;
  title: string;
  question: string;
  category: string;
  marks: number;
  stepByStepSolution: string;
}

export const MIDSEM_PRACTICE_QUESTIONS: MidsemPracticeItem[] = [
  {
    "id": "cfet_conv_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 2,
    "title": "Fractional Binary to Decimal, Octal & Hexadecimal",
    "question": "Convert (101101101.001)₂ into:\ni. Decimal\nii. Octal\niii. Hexadecimal",
    "category": "Number System Conversions",
    "marks": 4,
    "stepByStepSolution": "**Given Binary Number:** $(101101101.001)_2$\n\n**Part (i): Binary to Decimal**\n- Integer part: $101101101_2$\n  $= 1\\cdot 2^8 + 0\\cdot 2^7 + 1\\cdot 2^6 + 1\\cdot 2^5 + 0\\cdot 2^4 + 1\\cdot 2^3 + 1\\cdot 2^2 + 0\\cdot 2^1 + 1\\cdot 2^0$\n  $= 256 + 0 + 64 + 32 + 0 + 8 + 4 + 0 + 1 = 365_{10}$\n- Fractional part: $.001_2$\n  $= 0\\cdot 2^{-1} + 0\\cdot 2^{-2} + 1\\cdot 2^{-3} = \\frac{1}{8} = 0.125_{10}$\n- Combining both: $(101101101.001)_2 = \\mathbf{365.125_{10}}$\n\n**Part (ii): Binary to Octal (Group in 3 bits from radix point)**\n- Integer part: $(101)(101)(101)_2 \\rightarrow 5, 5, 5$\n- Fractional part: $(.001)_2 \\rightarrow 1$\n- Result: $(101101101.001)_2 = \\mathbf{555.1_8}$\n\n**Part (iii): Binary to Hexadecimal (Group in 4 bits from radix point)**\n- Integer part: $(0001)(0110)(1101)_2 \\rightarrow 1, 6, 13(\\text{D})$\n- Fractional part: $(.0010)_2 \\rightarrow 2$\n- Result: $(101101101.001)_2 = \\mathbf{16D.2_{16}}$"
  },
  {
    "id": "cfet_conv_2",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 2,
    "title": "Decimal with Fraction to Binary, Octal & Hexadecimal",
    "question": "Convert (375.34)₁₀ into:\ni. Binary (up to 4 fractional bits)\nii. Octal (up to 3 fractional digits)\niii. Hexadecimal",
    "category": "Number System Conversions",
    "marks": 4,
    "stepByStepSolution": "**Given Decimal Number:** $(375.34)_{10}$\n\n**Step 1: Integer Part $(375)_{10}$**\n- Division by 2: $375/2 = 187(R1), 187/2 = 93(R1), 93/2 = 46(R1), 46/2 = 23(R0), 23/2 = 11(R1), 11/2 = 5(R1), 5/2 = 2(R1), 2/2 = 1(R0), 1/2 = 0(R1)$\n  Reading bottom-up: $375_{10} = 101110111_2$\n- Division by 8: $375/8 = 46(R7), 46/8 = 5(R6), 5/8 = 0(R5) \\rightarrow 567_8$\n- Division by 16: $375/16 = 23(R7), 23/16 = 1(R7), 1/16 = 0(R1) \\rightarrow 177_{16}$\n\n**Step 2: Fractional Part $(0.34)_{10}$**\n- For Binary: $0.34\\times 2 = 0.68(0), 0.68\\times 2 = 1.36(1), 0.36\\times 2 = 0.72(0), 0.72\\times 2 = 1.44(1) \\approx .0101_2$\n- For Octal: $0.34\\times 8 = 2.72(2), 0.72\\times 8 = 5.76(5), 0.76\\times 8 = 6.08(6) \\approx .256_8$\n- For Hex: $0.34\\times 16 = 5.44(5), 0.44\\times 16 = 7.04(7) \\approx .57_{16}$\n\n**Final Answers:**\ni. Binary: $\\mathbf{(101110111.0101)_2}$\nii. Octal: $\\mathbf{(567.256)_8}$\niii. Hexadecimal: $\\mathbf{(177.57)_{16}}$"
  },
  {
    "id": "cfet_comp_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 2,
    "title": "1's and 2's Complement Subtraction",
    "question": "Perform the following decimal subtractions using 8-bit 2's complement arithmetic:\ni. (+28) - (+15)\nii. (+15) - (+28)\nExplain how overflow is detected in 2's complement addition.",
    "category": "Signed Numbers & Complements",
    "marks": 4,
    "stepByStepSolution": "**Binary Representations (8-bit):**\n- $+28 = 00011100_2$\n- $+15 = 00001111_2$\n- $-15$ in 2's complement: 1's comp of $15 = 11110000$, add $1 \\rightarrow 11110001_2$.\n- $-28$ in 2's complement: 1's comp of $28 = 11100011$, add $1 \\rightarrow 11100100_2$.\n\n**Part (i): (+28) + (-15)**\n```\n    0 0 0 1 1 1 0 0   (+28)\n  + 1 1 1 1 0 0 0 1   (-15)\n  -----------------\n  1 0 0 0 0 1 1 0 1\n```\n- End-around carry generated is discarded in 2's complement.\n- Result: $\\mathbf{00001101_2 = +13_{10}}$ (Correct!)\n\n**Part (ii): (+15) + (-28)**\n```\n    0 0 0 0 1 1 1 1   (+15)\n  + 1 1 1 0 0 1 0 0   (-28)\n  -----------------\n    1 1 1 1 0 0 1 1\n```\n- No carry generated; sign bit is 1 (negative result in 2's complement).\n- Magnitude = 2's complement of $11110011$: Invert $\\rightarrow 00001100$, add $1 \\rightarrow 00001101_2 = 13_{10}$.\n- Result: $\\mathbf{-13_{10}}$ (Correct!)\n\n**Overflow Detection:**\nOverflow occurs when adding two numbers of the same sign produces a result of opposite sign. Hardware condition: $V = C_{in} \\oplus C_{out}$ at the MSB sign bit. If $V=1$, overflow has occurred."
  },
  {
    "id": "cfet_logic_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 3,
    "title": "Universal Gate Realization (NAND & NOR Only)",
    "question": "Prove that NAND and NOR gates are Universal Gates by implementing:\ni. NOT, AND, and OR gates using only NAND gates.\nii. NOT, AND, and OR gates using only NOR gates.",
    "category": "Digital Logic & Boolean Algebra",
    "marks": 4,
    "stepByStepSolution": "**1. Universal Property:** A gate is universal if any Boolean function can be constructed using only that gate type.\n\n**Part (i): Realizations using NAND Gates:**\n1. **NOT Gate:** Connect both inputs together: $A \\text{ NAND } A = (A \\cdot A)' = A'$. (Requires 1 NAND)\n2. **AND Gate:** Invert NAND output using a NOT(NAND): $[(A \\cdot B)']' = A \\cdot B$. (Requires 2 NANDs)\n3. **OR Gate:** Apply De Morgan's theorem $(A' \\cdot B')' = A'' + B'' = A + B$. Invert inputs $A$ and $B$, then feed into 3rd NAND. (Requires 3 NANDs)\n\n**Part (ii): Realizations using NOR Gates:**\n1. **NOT Gate:** Connect both inputs together: $A \\text{ NOR } A = (A + A)' = A'$. (Requires 1 NOR)\n2. **OR Gate:** Invert NOR output using a NOT(NOR): $[(A + B)']' = A + B$. (Requires 2 NORs)\n3. **AND Gate:** By De Morgan's theorem $(A' + B')' = A \\cdot B$. Invert inputs $A$ and $B$, then feed into 3rd NOR. (Requires 3 NORs)"
  },
  {
    "id": "cfet_kmap_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 3,
    "title": "4-Variable K-Map Minimization with Don't Cares",
    "question": "Simplify the Boolean function F(A, B, C, D) = ∑ m(1, 3, 7, 11, 15) + d(0, 2, 5) using a 4-variable Karnaugh Map. Write the minimal SOP expression and draw the logic circuit.",
    "category": "Digital Logic & Boolean Algebra",
    "marks": 4,
    "stepByStepSolution": "**Step 1: Set up 4-Variable K-Map (Rows: AB, Columns: CD in Gray Code 00, 01, 11, 10):**\n- Minterms (1s): 1, 3, 7, 11, 15\n- Don't Cares (X): 0, 2, 5\n\n**Step 2: Grouping:**\n- **Group 1 (Octet):** Cells (0, 1, 2, 3, 4, 5, 6, 7) or column 11:\n  - Column $CD = 11$ contains cells 3, 7, 15, 11 (all 1s).\n  - Column $CD = 01$ contains cells 1 (1), 5 (X).\n  - Combining cols $CD = 01$ and $CD = 11$ with don't cares:\n  - Quad 1 (Cells 3, 7, 11, 15): Eliminates $A$ and $B$, leaves $\\mathbf{CD}$.\n  - Quad 2 (Cells 1, 3, 5, 7): Cells where $A=0$ and $D=1$. Leaves $\\mathbf{A'D}$.\n  - Octet (Combining cells 0, 1, 2, 3 with don't cares 0, 2, 5):\n    Cells (0, 1, 2, 3) form a quad with $A'B'$.\n\n**Step 3: Optimal Minimal SOP Expression:**\n$$\\mathbf{F(A, B, C, D) = CD + A'D}$$\n*(Or factoring: $F = D(C + A')$)*\n\n**Step 4: Circuit Implementation:**\nTwo 2-input AND gates feeding into a 2-input OR gate."
  },
  {
    "id": "cfet_adder_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 3,
    "title": "Full Adder Design using Two Half Adders and One OR Gate",
    "question": "Design a Full Adder combinational circuit. Provide truth table, equations for Sum and Carry-out, and prove that a Full Adder can be constructed using two Half Adders and an OR gate.",
    "category": "Combinational Logic Design",
    "marks": 4,
    "stepByStepSolution": "**1. Truth Table:**\n| A | B | C_in | Sum (S) | Carry (C_out) |\n|---|---|------|---------|---------------|\n| 0 | 0 |  0   |    0    |       0       |\n| 0 | 0 |  1   |    1    |       0       |\n| 0 | 1 |  0   |    1    |       0       |\n| 0 | 1 |  1   |    0    |       1       |\n| 1 | 0 |  0   |    1    |       0       |\n| 1 | 0 |  1   |    0    |       1       |\n| 1 | 1 |  0   |    0    |       1       |\n| 1 | 1 |  1   |    1    |       1       |\n\n**2. Mathematical Expressions:**\n- $S = A \\oplus B \\oplus C_{in}$\n- $C_{out} = AB + C_{in}(A \\oplus B)$\n\n**3. Construction using 2 Half Adders + 1 OR Gate:**\n- **Half Adder 1:** Inputs $A, B$. Produces:\n  - $S_1 = A \\oplus B$\n  - $C_1 = A \\cdot B$\n- **Half Adder 2:** Inputs $S_1, C_{in}$. Produces:\n  - $\\text{Final Sum } S = S_1 \\oplus C_{in} = \\mathbf{A \\oplus B \\oplus C_{in}}$\n  - $C_2 = S_1 \\cdot C_{in} = (A \\oplus B) \\cdot C_{in}$\n- **OR Gate:** Inputs $C_1, C_2$. Produces:\n  - $\\text{Final Carry } C_{out} = C_1 + C_2 = \\mathbf{AB + C_{in}(A \\oplus B)}$\n*(Proved: Exactly 2 Half Adders and 1 OR Gate complete a Full Adder).*"
  },
  {
    "id": "cfet_cache_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 1,
    "title": "Cache Memory Access Time & Multi-Level Cache Speedup",
    "question": "A processor has a cache memory with access time 1.5 ns and main memory with access time 45 ns. Calculate:\ni. Average Memory Access Time (T_avg) when hit ratio h = 0.95.\nii. What hit ratio is required to achieve T_avg ≤ 3.0 ns?",
    "category": "Memory Systems",
    "marks": 4,
    "stepByStepSolution": "**Given:**\n- Cache access time $t_c = 1.5\\text{ ns}$\n- Main memory access time $t_m = 45\\text{ ns}$\n\n**Part (i): T_avg for h = 0.95**\nFormula: $T_{\\text{avg}} = h \\cdot t_c + (1 - h) \\cdot t_m$\n$$T_{\\text{avg}} = (0.95 \\times 1.5) + (1 - 0.95) \\times 45$$\n$$T_{\\text{avg}} = 1.425 + (0.05 \\times 45) = 1.425 + 2.25 = \\mathbf{3.675\\text{ ns}}$$\n\n**Part (ii): Required Hit Ratio for T_avg ≤ 3.0 ns**\n$$h \\cdot t_c + (1 - h) \\cdot t_m \\le 3.0$$\n$$h(1.5) + 45 - 45h \\le 3.0$$\n$$-43.5h \\le 3.0 - 45 = -42.0$$\n$$h \\ge \\frac{42.0}{43.5} \\approx \\mathbf{0.9655} \\quad (96.55\\%)$$\n\n**Conclusion:** A cache hit ratio of at least **96.55%** is strictly required."
  },
  {
    "id": "beee_semi_1",
    "subject": "BEEE",
    "courseCode": "100111",
    "unitNo": 3,
    "title": "Semiconductor Materials: Intrinsic vs Extrinsic & Doping",
    "question": "Differentiate between Intrinsic and Extrinsic semiconductors. Explain N-type and P-type semiconductors with doping mechanisms, majority/minority carriers, and Fermi energy level shifts.",
    "category": "Semiconductor Physics",
    "marks": 4,
    "stepByStepSolution": "**1. Intrinsic vs Extrinsic Semiconductors:**\n| Parameter | Intrinsic Semiconductor | Extrinsic Semiconductor |\n|---|---|---|\n| **Purity** | Extremely pure elemental crystal (Pure Si, Ge) | Doped with specific impurity atoms |\n| **Carriers** | $n_e = n_h = n_i$ (equal electron & hole density) | Unequal carrier concentrations ($n_e \\ne n_h$) |\n| **Conductivity** | Extremely poor at room temperature | High and tunable by controlling doping concentration |\n| **Temperature Dependence** | Conductivity increases exponentially with temperature | Dominated by extrinsic dopants over wide operating range |\n\n**2. N-Type Semiconductor:**\n- **Dopant:** Pentavalent impurity atoms (Phosphorus, Arsenic, Antimony) having 5 valence electrons.\n- **Mechanism:** 4 electrons form covalent bonds with silicon atoms; 5th electron becomes free for conduction at room temperature.\n- **Carriers:** Electrons are **Majority Carriers**; Holes are **Minority Carriers** ($n_e \\gg n_h$).\n- **Fermi Level:** Shifts upward towards the conduction band ($E_F$ lies just below $E_c$).\n\n**3. P-Type Semiconductor:**\n- **Dopant:** Trivalent impurity atoms (Boron, Aluminum, Gallium) having 3 valence electrons.\n- **Mechanism:** Creates a deficiency of one covalent electron, forming a hole that attracts neighboring electrons.\n- **Carriers:** Holes are **Majority Carriers**; Electrons are **Minority Carriers** ($n_h \\gg n_e$).\n- **Fermi Level:** Shifts downward towards the valence band ($E_F$ lies just below $E_v$)."
  },
  {
    "id": "beee_pn_1",
    "subject": "BEEE",
    "courseCode": "100111",
    "unitNo": 3,
    "title": "P-N Junction: Formation, Biasing & V-I Characteristics",
    "question": "Explain the formation of the depletion region and barrier potential in an open-circuited P-N junction. Describe its working under Forward and Reverse Bias conditions and sketch the complete V-I characteristics curve.",
    "category": "Semiconductor Diodes",
    "marks": 4,
    "stepByStepSolution": "**1. Formation of Depletion Layer & Barrier Potential:**\n- When P-type and N-type semiconductors are metallurgically joined, majority electrons from N diffuse into P, and majority holes from P diffuse into N.\n- Recombining carriers near the junction leave behind uncompensated immobile donor ions ($N_d^+$) on the N-side and immobile acceptor ions ($N_a^-$) on the P-side.\n- This immobile charge region free of mobile charge carriers is called the **Depletion Layer**.\n- The electric field between these ions creates a **Barrier Potential** $V_0$ ($0.7\\text{ V}$ for Silicon, $0.3\\text{ V}$ for Germanium) that halts further diffusion.\n\n**2. Forward Biasing:**\n- Positive terminal of DC source connected to P-side; Negative to N-side.\n- Applied voltage opposes and overcomes the barrier potential ($V > V_0$).\n- Depletion layer narrows sharply; once knee voltage ($0.7\\text{ V}$) is exceeded, current increases exponentially according to Shockley diode equation:\n  $$I = I_0 \\left[e^{V / (\\eta V_T)} - 1\\right]$$\n\n**3. Reverse Biasing:**\n- Positive terminal connected to N-side; Negative to P-side.\n- Applied voltage widens the depletion layer, increasing barrier height.\n- Majority carriers cannot cross. Only a tiny reverse saturation current $I_0$ (microamperes in Ge, nanoamperes in Si) flows due to thermally generated minority carriers.\n- If reverse voltage exceeds Breakdown Voltage $V_{BR}$, avalanche or Zener breakdown occurs."
  },
  {
    "id": "beee_rect_1",
    "subject": "BEEE",
    "courseCode": "100111",
    "unitNo": 3,
    "title": "Half-Wave vs Full-Wave Rectifier Derivations",
    "question": "Derive expressions for DC output voltage (V_dc), RMS output voltage (V_rms), Ripple Factor (γ), and Rectification Efficiency (η) for a Half-Wave Rectifier. Compare them with a Full-Wave Rectifier in tabular format.",
    "category": "Rectifiers & Power Supplies",
    "marks": 4,
    "stepByStepSolution": "**1. Derivations for Half-Wave Rectifier ($v(t) = V_m \\sin \\theta$ for $0 \\le \\theta \\le \\pi$):**\n- **DC Voltage ($V_{dc}$):**\n  $$V_{dc} = \\frac{1}{2\\pi} \\int_0^\\pi V_m \\sin\\theta\\,d\\theta = \\frac{V_m}{2\\pi} [-\\cos\\theta]_0^\\pi = \\mathbf{\\frac{V_m}{\\pi} \\approx 0.318 V_m}$$\n- **RMS Voltage ($V_{rms}$):**\n  $$V_{rms} = \\sqrt{\\frac{1}{2\\pi} \\int_0^\\pi V_m^2 \\sin^2\\theta\\,d\\theta} = \\frac{V_m}{\\sqrt{2\\pi}} \\sqrt{\\frac{\\pi}{2}} = \\mathbf{\\frac{V_m}{2} = 0.5 V_m}$$\n- **Form Factor & Ripple Factor:**\n  $$k_f = \\frac{V_{rms}}{V_{dc}} = \\frac{V_m / 2}{V_m / \\pi} = \\frac{\\pi}{2} \\approx 1.57$$\n  $$\\gamma = \\sqrt{k_f^2 - 1} = \\sqrt{(1.57)^2 - 1} = \\sqrt{2.467 - 1} = \\mathbf{1.21}$$\n- **Rectification Efficiency (\\eta):**\n  $$\\eta = \\frac{P_{dc}}{P_{ac}} = \\frac{I_{dc}^2 R_L}{I_{rms}^2 (r_f + R_L)} \\approx \\frac{(I_m/\\pi)^2}{(I_m/2)^2} = \\frac{4}{\\pi^2} = \\mathbf{40.6\\%}$$\n\n**2. Comparison Table:**\n| Parameter | Half-Wave Rectifier | Full-Wave Center-Tapped | Full-Wave Bridge |\n|---|---|---|---|\n| **Number of Diodes** | 1 | 2 | 4 |\n| **$V_{dc}$** | $V_m / \\pi$ | $2V_m / \\pi$ | $2V_m / \\pi$ |\n| **Ripple Factor $\\gamma$** | 1.21 | 0.482 | 0.482 |\n| **Max Efficiency $\\eta$** | 40.6% | 81.2% | 81.2% |\n| **Ripple Frequency** | $f_{in}$ | $2 f_{in}$ | $2 f_{in}$ |\n| **Peak Inverse Voltage (PIV)** | $V_m$ | $2 V_m$ | $V_m$ |"
  },
  {
    "id": "beee_zener_1",
    "subject": "BEEE",
    "courseCode": "100111",
    "unitNo": 3,
    "title": "Zener Diode as Shunt Voltage Regulator Numerical",
    "question": "A 10V Zener diode is used to regulate the voltage across a variable load resistor R_L from a DC input voltage varying between 20V and 30V. If minimum Zener current I_{Z(\\min)} = 5 mA, maximum rated Zener power P_{Z(\\max)} = 500 mW, and load current ranges from 0 to 20 mA, calculate:\ni. The optimal series resistance R_s\nii. The maximum power dissipated in R_s.",
    "category": "Voltage Regulators",
    "marks": 4,
    "stepByStepSolution": "**Given:**\n- Zener nominal voltage $V_Z = 10\\text{ V}$\n- Input voltage $V_{in} = 20\\text{ V}$ to $30\\text{ V}$\n- $I_{Z(\\min)} = 5\\text{ mA}$\n- $I_{Z(\\max)} = P_{Z(\\max)} / V_Z = 500\\text{ mW} / 10\\text{ V} = 50\\text{ mA}$\n- Load current $I_L = 0\\text{ to } 20\\text{ mA}$\n\n**Step 1: Calculate Series Dropping Resistor $R_s$**\nTo guarantee regulation under worst-case minimum input voltage ($V_{in(\\min)} = 20\\text{ V}$) and maximum load current ($I_{L(\\max)} = 20\\text{ mA}$):\n$$R_s \\le \\frac{V_{in(\\min)} - V_Z}{I_{Z(\\min)} + I_{L(\\max)}} = \\frac{20 - 10}{5\\text{ mA} + 20\\text{ mA}} = \\frac{10\\text{ V}}{25\\text{ mA}} = \\mathbf{400\\;\\Omega}$$\n\n**Step 2: Check Maximum Zener Current under $V_{in(\\max)} = 30\\text{ V}$ and No Load ($I_L = 0$):**\n$$I_{Z} = \\frac{V_{in(\\max)} - V_Z}{R_s} = \\frac{30 - 10}{400} = \\frac{20}{400} = 50\\text{ mA}$$\nSince $50\\text{ mA} \\le I_{Z(\\max)} (50\\text{ mA})$, the diode operates safely within maximum power limits.\n\n**Step 3: Maximum Power Dissipation in $R_s$:**\n$$P_{Rs(\\max)} = \\frac{(V_{in(\\max)} - V_Z)^2}{R_s} = \\frac{(20\\text{ V})^2}{400\\;\\Omega} = \\frac{400}{400} = \\mathbf{1.0\\text{ Watt}}$$"
  },
  {
    "id": "beee_bjt_1",
    "subject": "BEEE",
    "courseCode": "100111",
    "unitNo": 3,
    "title": "BJT CE Configuration & Proof of β = α / (1 - α)",
    "question": "Draw the circuit diagram and characteristic curves of an NPN Bipolar Junction Transistor (BJT) in Common Emitter (CE) configuration. Define Cutoff, Active, and Saturation regions, and derive the relationship:\nβ = α / (1 - α).",
    "category": "Transistor Electronics",
    "marks": 4,
    "stepByStepSolution": "**1. BJT CE Configuration:**\n- Emitter is common to input (Base-Emitter) and output (Collector-Emitter).\n- Input Characteristics: Plot of $I_B$ vs $V_{BE}$ for constant $V_{CE}$. (Looks like forward diode curve with knee at $\\approx 0.7\\text{ V}$).\n- Output Characteristics: Plot of $I_C$ vs $V_{CE}$ for constant values of base current $I_B$.\n\n**2. Three Operational Regions:**\n1. **Active Region:** Emitter-Base Junction (EBJ) forward biased, Collector-Base Junction (CBJ) reverse biased. $I_C \\approx \\beta I_B$ is nearly independent of $V_{CE}$. Used for linear amplifier operation.\n2. **Saturation Region:** Both EBJ and CBJ are forward biased ($V_{CE} < 0.2\\text{ V}$). Transistor acts as a closed switch (ON).\n3. **Cutoff Region:** Both EBJ and CBJ are reverse biased ($I_B = 0$). Only negligible reverse leakage current flows. Transistor acts as an open switch (OFF).\n\n**3. Derivation of $\\beta = \\alpha / (1 - \\alpha)$:**\nBy Kirchhoff's Current Law for BJT:\n$$I_E = I_B + I_C$$\nBy definition of Current Gains:\n$$\\alpha = \\frac{I_C}{I_E} \\implies I_E = \\frac{I_C}{\\alpha}$$\n$$\\beta = \\frac{I_C}{I_B} \\implies I_B = \\frac{I_C}{\\beta}$$\nSubstituting into KCL:\n$$\\frac{I_C}{\\alpha} = \\frac{I_C}{\\beta} + I_C$$\nDividing through by $I_C$:\n$$\\frac{1}{\\alpha} = \\frac{1}{\\beta} + 1 \\implies \\frac{1}{\\beta} = \\frac{1}{\\alpha} - 1 = \\frac{1 - \\alpha}{\\alpha}$$\nInverting both sides:\n$$\\mathbf{\\beta = \\frac{\\alpha}{1 - \\alpha}} \\quad \\text{and} \\quad \\mathbf{\\alpha = \\frac{\\beta}{1 + \\beta}}$$\n*(Hence Proved!)*"
  },
  {
    "id": "beee_rlc_1",
    "subject": "BEEE",
    "courseCode": "100111",
    "unitNo": 2,
    "title": "Series RLC Resonant Circuit & Q-Factor Derivation",
    "question": "A series RLC circuit has R = 8 Ω, L = 0.2 H, and C = 20 µF connected across a 200V, 50 Hz AC supply. Derive the formula for resonant frequency f_0 and determine:\ni. Resonant frequency f_0\nii. Impedance at resonance\niii. Current and power dissipated at resonance\niv. Quality Factor Q and Bandwidth BW.",
    "category": "AC Circuits & Resonance",
    "marks": 4,
    "stepByStepSolution": "**1. Derivation of Resonant Frequency ($f_0$):**\nImpedance of series RLC: $Z = R + j(\\omega L - 1/(\\omega C))$.\nAt resonance, imaginary reactive part equals zero: $\\omega_0 L = \\frac{1}{\\omega_0 C} \\implies \\omega_0^2 = \\frac{1}{LC}$.\n$$f_0 = \\mathbf{\\frac{1}{2\\pi \\sqrt{LC}}}$$\n\n**2. Numerical Calculation:**\n- Given: $R = 8\\;\\Omega$, $L = 0.2\\text{ H}$, $C = 20 \\times 10^{-6}\\text{ F}$, $V = 200\\text{ V}$.\n- **Part (i): Resonant Frequency $f_0$:**\n  $$LC = 0.2 \\times 20 \\times 10^{-6} = 4 \\times 10^{-6} \\implies \\sqrt{LC} = 2 \\times 10^{-3}$$\n  $$f_0 = \\frac{1}{2\\pi (2 \\times 10^{-3})} = \\frac{1000}{4\\pi} = \\mathbf{79.58\\text{ Hz}}$$\n- **Part (ii): Impedance at resonance:**\n  $$Z_0 = R = \\mathbf{8.0\\;\\Omega}$$\n- **Part (iii): Current and Power at resonance:**\n  $$I_0 = \\frac{V}{Z_0} = \\frac{200}{8} = \\mathbf{25.0\\text{ A}}$$\n  $$P = I_0^2 R = (25)^2 \\times 8 = 625 \\times 8 = \\mathbf{5000\\text{ W}} \\quad (5.0\\text{ kW})$$\n- **Part (iv): Quality Factor Q & Bandwidth BW:**\n  $$Q = \\frac{1}{R} \\sqrt{\\frac{L}{C}} = \\frac{1}{8} \\sqrt{\\frac{0.2}{20 \\times 10^{-6}}} = \\frac{1}{8} \\sqrt{10000} = \\frac{100}{8} = \\mathbf{12.5}$$\n  $$BW = \\frac{f_0}{Q} = \\frac{79.58}{12.5} = \\mathbf{6.37\\text{ Hz}}$$"
  },
  {
    "id": "math_matrix_1",
    "subject": "Math-I",
    "courseCode": "100102",
    "unitNo": 1,
    "title": "Matrix Rank Reduction to Normal Form [Ir, 0; 0, 0]",
    "question": "Reduce the matrix A into normal canonical form [I_r, 0; 0, 0] by elementary row and column operations and find its rank:\nA = [[1, 1, 2], [1, 2, 3], [0, 1, 1]]",
    "category": "Linear Algebra",
    "marks": 4,
    "stepByStepSolution": "**Given Matrix:**\n$$A = \\begin{bmatrix} 1 & 1 & 2 \\\\ 1 & 2 & 3 \\\\ 0 & 1 & 1 \\end{bmatrix}$$\n\n**Step 1: Elementary Row Operations:**\n- $R_2 \\rightarrow R_2 - R_1$:\n  $$\\begin{bmatrix} 1 & 1 & 2 \\\\ 0 & 1 & 1 \\\\ 0 & 1 & 1 \\end{bmatrix}$$\n- $R_3 \\rightarrow R_3 - R_2$:\n  $$\\begin{bmatrix} 1 & 1 & 2 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$$\n\n**Step 2: Elementary Column Operations:**\n- $C_2 \\rightarrow C_2 - C_1$ and $C_3 \\rightarrow C_3 - 2C_1$:\n  $$\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$$\n- $C_3 \\rightarrow C_3 - C_2$:\n  $$\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} = \\begin{bmatrix} I_2 & 0 \\\\ 0 & 0 \\end{bmatrix}$$\n\n**Conclusion:** The matrix is in Normal Form with identity matrix of order 2. Therefore, $\\mathbf{\\text{Rank } \\rho(A) = 2}$."
  },
  {
    "id": "math_cayley_1",
    "subject": "Math-I",
    "courseCode": "100102",
    "unitNo": 1,
    "title": "Cayley-Hamilton Theorem Verification and Inverse",
    "question": "State Cayley-Hamilton theorem. Verify it for matrix A = [[2, -1], [1, 3]] and hence compute A⁻¹ and A³.",
    "category": "Linear Algebra",
    "marks": 4,
    "stepByStepSolution": "**1. Statement:** Every square matrix satisfies its own characteristic equation $|A - \\lambda I| = 0$.\n\n**2. Characteristic Equation:**\n$$|A - \\lambda I| = \\begin{vmatrix} 2-\\lambda & -1 \\\\ 1 & 3-\\lambda \\end{vmatrix} = (2-\\lambda)(3-\\lambda) - (-1) = \\lambda^2 - 5\\lambda + 7 = 0$$\n\n**3. Verification ($A^2 - 5A + 7I = O$):**\n$$A^2 = \\begin{bmatrix} 2 & -1 \\\\ 1 & 3 \\end{bmatrix} \\begin{bmatrix} 2 & -1 \\\\ 1 & 3 \\end{bmatrix} = \\begin{bmatrix} 4-1 & -2-3 \\\\ 2+3 & -1+9 \\end{bmatrix} = \\begin{bmatrix} 3 & -5 \\\\ 5 & 8 \\end{bmatrix}$$\n$$5A = \\begin{bmatrix} 10 & -5 \\\\ 5 & 15 \\end{bmatrix}, \\quad 7I = \\begin{bmatrix} 7 & 0 \\\\ 0 & 7 \\end{bmatrix}$$\n$$A^2 - 5A + 7I = \\begin{bmatrix} 3-10+7 & -5-(-5)+0 \\\\ 5-5+0 & 8-15+7 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix} = O \\quad \\text{(VERIFIED!)}$$\n\n**4. Compute $A^{-1}$:**\nMultiply by $A^{-1}$:\n$$A - 5I + 7A^{-1} = O \\implies 7A^{-1} = 5I - A$$\n$$A^{-1} = \\frac{1}{7} \\left( \\begin{bmatrix} 5 & 0 \\\\ 0 & 5 \\end{bmatrix} - \\begin{bmatrix} 2 & -1 \\\\ 1 & 3 \\end{bmatrix} \\right) = \\mathbf{\\frac{1}{7} \\begin{bmatrix} 3 & 1 \\\\ -1 & 2 \\end{bmatrix}}$$\n\n**5. Compute $A^3$:**\nFrom $A^2 = 5A - 7I$:\n$$A^3 = 5A^2 - 7A = 5(5A - 7I) - 7A = 18A - 35I$$\n$$18A = \\begin{bmatrix} 36 & -18 \\\\ 18 & 54 \\end{bmatrix}, \\quad 35I = \\begin{bmatrix} 35 & 0 \\\\ 0 & 35 \\end{bmatrix}$$\n$$A^3 = \\mathbf{\\begin{bmatrix} 1 & -18 \\\\ 18 & 19 \\end{bmatrix}}$$"
  },
  {
    "id": "math_euler_1",
    "subject": "Math-I",
    "courseCode": "100102",
    "unitNo": 3,
    "title": "Euler's Theorem on Homogeneous Functions",
    "question": "If u = sin⁻¹[(x + y) / (√x + √y)], prove that:\nx (∂u/∂x) + y (∂u/∂y) = (1/2) tan u.",
    "category": "Multivariable Calculus",
    "marks": 4,
    "stepByStepSolution": "**Step 1: Transform to Homogeneous Function:**\nLet $z = \\sin u = \\frac{x + y}{\\sqrt{x} + \\sqrt{y}}$.\nTest homogeneity with $x \\rightarrow tx, y \\rightarrow ty$:\n$$z(tx, ty) = \\frac{tx + ty}{\\sqrt{tx} + \\sqrt{ty}} = \\frac{t(x + y)}{t^{1/2}(\\sqrt{x} + \\sqrt{y})} = t^{1 - 1/2} z = t^{1/2} z$$\nTherefore, $z$ is a homogeneous function of degree $\\mathbf{n = 1/2}$.\n\n**Step 2: Apply Euler's Theorem to z:**\n$$x \\frac{\\partial z}{\\partial x} + y \\frac{\\partial z}{\\partial y} = n z = \\frac{1}{2} z$$\n\n**Step 3: Relate Partial Derivatives of z to u:**\nSince $z = \\sin u$:\n$$\\frac{\\partial z}{\\partial x} = \\cos u \\frac{\\partial u}{\\partial x}, \\quad \\frac{\\partial z}{\\partial y} = \\cos u \\frac{\\partial u}{\\partial y}$$\n\n**Step 4: Substitute back:**\n$$x \\left(\\cos u \\frac{\\partial u}{\\partial x}\\right) + y \\left(\\cos u \\frac{\\partial u}{\\partial y}\\right) = \\frac{1}{2} \\sin u$$\nDividing both sides by $\\cos u$:\n$$\\mathbf{x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = \\frac{1}{2} \\frac{\\sin u}{\\cos u} = \\frac{1}{2} \\tan u}$$\n*(Hence Proved!)*"
  },
  {
    "id": "phy_laser_1",
    "subject": "Physics",
    "courseCode": "100104",
    "unitNo": 2,
    "title": "He-Ne Laser: Construction, Energy Level Diagram & Working",
    "question": "Explain the construction and working of a continuous-wave Helium-Neon (He-Ne) gas laser with a neat 4-level energy level diagram. Explain how population inversion is achieved and the role of Helium atoms.",
    "category": "Lasers & Optics",
    "marks": 4,
    "stepByStepSolution": "**1. Construction:**\n- Discharge tube: Narrow quartz tube (~50 cm long, 5 mm bore) containing gas mixture of Helium and Neon in **10:1 ratio** at low pressure (~1 mm Hg).\n- Optical Resonator: Highly reflective flat mirror (100%) at one end and a partially transmitting concave output mirror (99%) at the other end.\n- Pumping Source: High-voltage DC electric discharge (~1-2 kV).\n\n**2. Role of Helium Atoms:**\nHelium has a lighter atomic mass and is easily excited by electron collision to its long-lived metastable states $2^1S$ (20.61 eV) and $2^3S$ (19.82 eV):\n$$e^- + \\text{He} \\rightarrow \\text{He}^* + e^-$$\n\n**3. Resonant Collision Energy Transfer & Population Inversion:**\n- The excited levels of He closely match the $3s$ (20.66 eV) and $2s$ (19.78 eV) energy levels of Neon.\n- By atomic collision, energy is transferred with near 100% efficiency:\n  $$\\text{He}^* + \\text{Ne} \\rightarrow \\text{He} + \\text{Ne}^*$$\n- This preferential pumping populates the $3s$ upper laser level of Neon, while the $2p$ lower level remains nearly empty, creating **Population Inversion** between $3s$ and $2p$.\n\n**4. Laser Transitions:**\n- Radiative transition from $3s \\rightarrow 2p$ produces the characteristic red laser beam at wavelength $\\mathbf{\\lambda = 632.8\\text{ nm}}$ (6328 Å).\n- De-excitation: Ne atoms rapidly drop from $2p \\rightarrow 1s$ spontaneously, and then return to ground state via collision with the tube walls."
  },
  {
    "id": "phy_fiber_1",
    "subject": "Physics",
    "courseCode": "100104",
    "unitNo": 2,
    "title": "Optical Fiber Numerical Aperture & Acceptance Angle Derivation",
    "question": "Derive expressions for Numerical Aperture (NA) and Acceptance Angle (θ_a) of a step-index optical fiber in terms of core index n1 and cladding index n2. If core index is 1.52 and cladding index is 1.48, calculate NA, acceptance angle, and critical angle.",
    "category": "Fiber Optics",
    "marks": 4,
    "stepByStepSolution": "**1. Derivations:**\n- Light enters fiber core from air ($n_0 \\approx 1.0$) at incident angle $\\theta_a$.\n- By Snell's Law at entrance: $n_0 \\sin\\theta_a = n_1 \\sin r = n_1 \\cos\\phi$ (since $r + \\phi = 90^\\circ$, where $\\phi$ is the angle at the core-cladding boundary).\n- For Total Internal Reflection: $\\phi \\ge \\theta_c$, where $\\sin\\theta_c = n_2 / n_1$.\n- At threshold $\\phi = \\theta_c$:\n  $$\\cos\\theta_c = \\sqrt{1 - \\sin^2\\theta_c} = \\sqrt{1 - \\left(\\frac{n_2}{n_1}\\right)^2} = \\frac{\\sqrt{n_1^2 - n_2^2}}{n_1}$$\n- Substituting back:\n  $$\\sin\\theta_a = n_1 \\cos\\theta_c = \\sqrt{n_1^2 - n_2^2}$$\n  $$\\mathbf{NA = \\sqrt{n_1^2 - n_2^2}} \\quad \\text{and} \\quad \\mathbf{\\theta_a = \\sin^{-1}\\left(\\sqrt{n_1^2 - n_2^2}\\right)}$$\n\n**2. Numerical Calculation ($n_1 = 1.52, n_2 = 1.48$):**\n- **Numerical Aperture (NA):**\n  $$NA = \\sqrt{(1.52)^2 - (1.48)^2} = \\sqrt{2.3104 - 2.1904} = \\sqrt{0.1200} = \\mathbf{0.3464}$$\n- **Acceptance Angle (\\theta_a):**\n  $$\\theta_a = \\sin^{-1}(0.3464) = \\mathbf{20.27^\\circ}$$\n- **Critical Angle (\\theta_c):**\n  $$\\theta_c = \\sin^{-1}\\left(\\frac{1.48}{1.52}\\right) = \\sin^{-1}(0.9737) = \\mathbf{76.82^\\circ}$$"
  },
  {
    "id": "phy_maxwell_1",
    "subject": "Physics",
    "courseCode": "100104",
    "unitNo": 3,
    "title": "Maxwell's Equations & Displacement Current Density",
    "question": "State Maxwell's four equations in differential and integral forms. Show mathematically how Maxwell modified Ampere's circuital law using the Equation of Continuity to establish Displacement Current.",
    "category": "Electromagnetism",
    "marks": 4,
    "stepByStepSolution": "**1. Maxwell's 4 Equations:**\n1. $\\nabla \\cdot \\mathbf{D} = \\rho_v \\iff \\oint \\mathbf{D} \\cdot d\\mathbf{A} = Q_{enc}$ (Gauss's Law for Electrostatics)\n2. $\\nabla \\cdot \\mathbf{B} = 0 \\iff \\oint \\mathbf{B} \\cdot d\\mathbf{A} = 0$ (Gauss's Law for Magnetism - No magnetic monopoles)\n3. $\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t} \\iff \\oint \\mathbf{E} \\cdot d\\mathbf{l} = -\\frac{d\\Phi_B}{dt}$ (Faraday's Law of Induction)\n4. $\\nabla \\times \\mathbf{H} = \\mathbf{J} + \\frac{\\partial \\mathbf{D}}{\\partial t} \\iff \\oint \\mathbf{H} \\cdot d\\mathbf{l} = I_c + \\int \\frac{\\partial \\mathbf{D}}{\\partial t} \\cdot d\\mathbf{A}$ (Ampere-Maxwell Law)\n\n**2. Inconsistency in Ampere's Law:**\nAmpere's original equation was $\\nabla \\times \\mathbf{H} = \\mathbf{J}$. Taking divergence of both sides:\n$$\\nabla \\cdot (\\nabla \\times \\mathbf{H}) = \\nabla \\cdot \\mathbf{J} = 0$$\n*(Since divergence of any curl is identically zero).*\nHowever, by the fundamental charge continuity equation:\n$$\\nabla \\cdot \\mathbf{J} = -\\frac{\\partial \\rho}{\\partial t} \\ne 0$$\nThis was a severe contradiction for time-varying electric fields (such as inside a charging capacitor).\n\n**3. Maxwell's Resolution:**\nFrom Gauss's Law $\\rho = \\nabla \\cdot \\mathbf{D}$. Differentiating w.r.t time:\n$$\\frac{\\partial \\rho}{\\partial t} = \\nabla \\cdot \\left(\\frac{\\partial \\mathbf{D}}{\\partial t}\\right)$$\nSubstituting into continuity:\n$$\\nabla \\cdot \\mathbf{J} + \\nabla \\cdot \\left(\\frac{\\partial \\mathbf{D}}{\\partial t}\\right) = 0 \\implies \\nabla \\cdot \\left(\\mathbf{J} + \\frac{\\partial \\mathbf{D}}{\\partial t}\\right) = 0$$\nMaxwell defined $\\mathbf{J_d} = \\frac{\\partial \\mathbf{D}}{\\partial t} = \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}$ as **Displacement Current Density**, completely resolving the contradiction."
  },
  {
    "id": "ai_peas_1",
    "subject": "IAI",
    "courseCode": "100105",
    "unitNo": 1,
    "title": "PEAS Framework & Environment Classification for Self-Driving Car",
    "question": "Construct the complete PEAS specification table for an Autonomous Self-Driving Car. Classify its environment along all 6 core properties (Observability, Determinism, Dynamism, Episodic/Sequential, Discrete/Continuous, Single/Multi-Agent).",
    "category": "Intelligent Agents",
    "marks": 4,
    "stepByStepSolution": "**1. PEAS Specification Table:**\n- **Performance Measure (P):** Safety (collision prevention), adherence to traffic laws, passenger comfort, travel speed/time, fuel/battery efficiency.\n- **Environment (E):** Public asphalt roads, intersections, dynamic traffic (cars, trucks, bikes), pedestrians, weather conditions (rain, fog), road signs.\n- **Actuators (A):** Steering wheel servo, electric accelerator, ABS brakes, turn signals, display dashboard, audio horn.\n- **Sensors (S):** Multi-spectrum cameras, 360° LiDAR, radar scanners, ultrasonic parking sonar, GPS receiver, speedometer, inertial measurement unit (IMU).\n\n**2. Environment Classification:**\n1. **Partially Observable:** Sensor blind spots, occlusion by larger vehicles, weather degradation.\n2. **Stochastic:** Actions have non-deterministic outcomes (unpredictable pedestrian movements, skidding).\n3. **Dynamic:** The road environment continuously moves while the agent computes its trajectory.\n4. **Sequential:** Decisions made now (changing lanes) influence future states down the highway.\n5. **Continuous:** Steering angles, vehicle velocities, and distances vary continuously.\n6. **Multi-Agent:** Cooperates and competes with human drivers, who are also intelligent agents."
  },
  {
    "id": "ai_astar_1",
    "subject": "IAI",
    "courseCode": "100105",
    "unitNo": 2,
    "title": "A* Search Algorithm & Proof of Optimality",
    "question": "Explain A* Search algorithm. Define f(n) = g(n) + h(n). Prove mathematically that A* tree search is optimal if the heuristic h(n) is admissible.",
    "category": "Search Algorithms",
    "marks": 4,
    "stepByStepSolution": "**1. A* Evaluation Function:**\n$$f(n) = g(n) + h(n)$$\n- $g(n)$: Exact path cost accumulated from root to current node $n$.\n- $h(n)$: Estimated heuristic cost to reach goal from $n$.\n- $f(n)$: Estimated total cost of path passing through node $n$.\n- **Admissibility:** $0 \\le h(n) \\le h^*(n)$ (heuristic never overestimates true minimum cost $h^*$).\n\n**2. Proof of Optimality (Tree Search with Admissible Heuristic):**\n1. Let $G_1$ be an optimal goal with path cost $C^* = g(G_1) = f(G_1)$ (since $h(G_1) = 0$).\n2. Suppose A* chooses a sub-optimal goal $G_2$ with $g(G_2) = C_2 > C^*$.\n3. Consider the frontier at the moment $G_2$ is about to be selected. There must exist an unexpanded ancestor node $n$ of the optimal goal $G_1$ residing on the frontier.\n4. For this node $n$:\n   $$f(n) = g(n) + h(n) \\le g(n) + h^*(n) = C^* \\quad (\\text{by admissibility})$$\n5. Since $G_2$ is sub-optimal:\n   $$f(n) \\le C^* < g(G_2) = f(G_2)$$\n6. Because A* always expands the frontier node with minimum $f$-value, node $n$ will strictly be expanded before $G_2$.\n7. By induction, this holds for all ancestors leading to $G_1$, and ultimately for $G_1$ itself.\n8. Therefore, $G_1$ is selected and expanded before $G_2$. A* cannot terminate with a sub-optimal goal.\n*(Hence Proved: A* Tree Search is guaranteed optimal!)*"
  },
  {
    "id": "uhv_trust_1",
    "subject": "UHV",
    "courseCode": "100109",
    "unitNo": 3,
    "title": "Trust on Intention vs Competence & Relationship Breakdown",
    "question": "Distinguish between 'Trust on Intention' and 'Trust on Competence'. Explain how confusing competence with intention leads to anger, opposition, and relationship breakdown, and explain how to resolve it.",
    "category": "Human Values & Relationships",
    "marks": 4,
    "stepByStepSolution": "**1. Definitions:**\n- **Intention (Natural Acceptance):** What a person naturally desires and aspires for. At the level of intention, every human being naturally wants mutual happiness and prosperity.\n- **Competence (Ability):** The actual skill, discipline, and emotional capability to translate that good intention into practice.\n\n**2. The Fundamental Human Error:**\n- When evaluating ourselves, we evaluate by our **Intention** (*'I didn't intend to hurt you; I was just busy or tired'*).\n- When evaluating others, we evaluate by their **Competence / Behavior** (*'You didn't do what you promised; therefore you are malicious and cannot be trusted'*).\n\n**3. Consequence of the Confusion:**\nWhen the other person fails due to lack of competence, we mistakenly conclude that their intention is evil. Doubting intention generates irritation, anger, suspicion, and enmity. Once intention is questioned, communication breaks down.\n\n**4. Resolution:**\n- Have **unconditional trust on intention**—recognize that the other person naturally wants happiness just like me.\n- Treat behavioral failure as a **lack of competence**.\n- When we see lack of competence, it naturally evokes compassion and an attitude of mentoring and helping, rather than anger and resentment."
  },
  {
    "id": "uhv_sanyam_1",
    "subject": "UHV",
    "courseCode": "100109",
    "unitNo": 2,
    "title": "Co-existence of Self ('I') and Body (Needs & Activities)",
    "question": "Explain the human being as a co-existence of the conscious Self ('I') and the material Body. Compare their Needs, Activities, and Response modes in detailed tabular format.",
    "category": "Harmony in Self & Body",
    "marks": 4,
    "stepByStepSolution": "**Comparative Table: Self ('I') vs Material Body:**\n\n| Dimension | Conscious Self ('I') | Material Body |\n| :--- | :--- | :--- |\n| **1. Basic Needs** | Sukh (Happiness, Trust, Respect, Peace) | Suvidha (Food, Clothing, Shelter) |\n| **2. Quantity & Time** | Qualitative in nature; **Continuous** in time | Quantitative in nature; **Temporary / Periodic** in time |\n| **3. Fulfillment Mode** | Right Understanding and Right Feelings | Physico-chemical production and physical facilities |\n| **4. Core Activities** | Desiring (Iccha), Thinking (Vichara), Expecting (Asha) | Breathing, blood circulation, digestion, heartbeat |\n| **5. Cognitive Response** | **Knowing, Assuming, Recognizing, Fulfilling** | **Only Recognizing and Fulfilling** (pure physical conditioning) |\n| **6. Hierarchy** | The **Seer, Doer, and Enjoyer** (Conscious entity) | The **Instrument** used by the Self (Physico-chemical tool) |\n\n**Conclusion:** Conflating the continuous qualitative needs of 'I' with physical facilities leads to endless consumerism and inner void. True harmony is achieved when Sanyama in 'I' guides the health (Swasthya) of the Body."
  },
  {
    "id": "cfet_conv_3",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 2,
    "title": "Octal to Binary, Decimal & Hexadecimal",
    "question": "Convert (765.71)₈ into:\ni. Binary\nii. Decimal\niii. Hexadecimal",
    "category": "Number System Conversions",
    "marks": 4,
    "stepByStepSolution": "**Given Octal Number:** $(765.71)_8$\n\n**Part (i): Octal to Binary (Convert each octal digit to 3 binary bits)**\n- $7 \\rightarrow 111$\n- $6 \\rightarrow 110$\n- $5 \\rightarrow 101$\n- $.7 \\rightarrow .111$\n- $1 \\rightarrow 001$\n- Result: $(765.71)_8 = \\mathbf{(111110101.111001)_2}$\n\n**Part (ii): Octal to Decimal**\n- Integer: $7\\cdot 8^2 + 6\\cdot 8^1 + 5\\cdot 8^0 = 7(64) + 48 + 5 = 448 + 48 + 5 = 501_{10}$\n- Fraction: $7\\cdot 8^{-1} + 1\\cdot 8^{-2} = \\frac{7}{8} + \\frac{1}{64} = 0.875 + 0.015625 = 0.890625_{10}$\n- Result: $(765.71)_8 = \\mathbf{501.890625_{10}}$\n\n**Part (iii): Binary to Hexadecimal (Group 4 bits from radix point)**\n- Binary: $111110101.111001_2$\n- Group integer: $(0001)(1111)(0101)_2 \\rightarrow 1, 15(\\text{F}), 5$\n- Group fraction: $(.1110)(0100)_2 \\rightarrow 14(\\text{E}), 4$\n- Result: $(765.71)_8 = \\mathbf{(1F5.E4)_{16}}$"
  },
  {
    "id": "cfet_conv_4",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 2,
    "title": "Hexadecimal to Binary, Octal & Decimal",
    "question": "Convert (ABC.16)₁₆ into:\ni. Binary\nii. Octal\niii. Decimal",
    "category": "Number System Conversions",
    "marks": 4,
    "stepByStepSolution": "**Given Hexadecimal Number:** $(ABC.16)_{16}$\nNote: $\\text{A}=10, \\text{B}=11, \\text{C}=12$\n\n**Part (i): Hexadecimal to Binary (Convert each hex digit to 4 binary bits)**\n- $\\text{A} \\rightarrow 1010$\n- $\\text{B} \\rightarrow 1011$\n- $\\text{C} \\rightarrow 1100$\n- $.1 \\rightarrow .0001$\n- $6 \\rightarrow 0110$\n- Result: $(ABC.16)_{16} = \\mathbf{(101010111100.0001011)_2}$\n\n**Part (ii): Binary to Octal (Group in 3 bits)**\n- Integer: $(101)(010)(111)(100)_2 \\rightarrow 5, 2, 7, 4$\n- Fraction: $(.000)(101)(100)_2 \\rightarrow 0, 5, 4$\n- Result: $(ABC.16)_{16} = \\mathbf{(5274.054)_8}$\n\n**Part (iii): Hexadecimal to Decimal**\n- Integer: $10\\cdot 16^2 + 11\\cdot 16^1 + 12\\cdot 16^0 = 10(256) + 176 + 12 = 2560 + 188 = 2748_{10}$\n- Fraction: $1\\cdot 16^{-1} + 6\\cdot 16^{-2} = \\frac{1}{16} + \\frac{6}{256} = 0.0625 + 0.0234375 = 0.0859375_{10}$\n- Result: $(ABC.16)_{16} = \\mathbf{2748.0859375_{10}}$"
  },
  {
    "id": "cfet_arith_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 2,
    "title": "Binary Additions & Subtractions",
    "question": "Perform the following binary arithmetic operations with carry/borrow steps:\ni. (101)₂ + (110)₂\nii. (1010)₂ + (1011)₂\niii. (1101)₂ - (1010)₂\niv. (11011)₂ - (01110)₂\nv. (1011)₂ - (0101)₂",
    "category": "Binary Arithmetic",
    "marks": 4,
    "stepByStepSolution": "**Rules of Binary Addition:**\n$0+0=0,\\; 0+1=1,\\; 1+0=1,\\; 1+1=0$ (carry 1),$\\; 1+1+1=1$ (carry 1)\n\n**Rules of Binary Subtraction:**\n$0-0=0,\\; 1-0=1,\\; 1-1=0,\\; 0-1=1$ (with borrow 1 from next bit)\n\n---\n\n**Operation i: $(101)_2 + (110)_2$**\n```\n   1 0 1   (5)\n + 1 1 0   (6)\n -------\n 1 0 1 1   (11)\n```\n- Column 0: $1 + 0 = 1$\n- Column 1: $0 + 1 = 1$\n- Column 2: $1 + 1 = 0$ with Carry 1\n- Result: $\\mathbf{(1011)_2 = 11_{10}}$\n\n---\n\n**Operation ii: $(1010)_2 + (1011)_2$**\n```\n   1 0 1 0   (10)\n + 1 0 1 1   (11)\n ---------\n 1 0 1 0 1   (21)\n```\n- Column 0: $0 + 1 = 1$\n- Column 1: $1 + 1 = 0$ with Carry 1\n- Column 2: $0 + 0 + 1(\\text{carry}) = 1$\n- Column 3: $1 + 1 = 0$ with Carry 1\n- Result: $\\mathbf{(10101)_2 = 21_{10}}$\n\n---\n\n**Operation iii: $(1101)_2 - (1010)_2$**\n```\n   1 1 0 1   (13)\n - 1 0 1 0   (10)\n ---------\n   0 0 1 1   (3)\n```\n- Result: $\\mathbf{(0011)_2 = (11)_2 = 3_{10}}$\n\n---\n\n**Operation iv: $(11011)_2 - (01110)_2$**\n```\n   1 1 0 1 1   (27)\n - 0 1 1 1 0   (14)\n -----------\n   0 1 1 0 1   (13)\n```\n- Result: $\\mathbf{(01101)_2 = 13_{10}}$\n\n---\n\n**Operation v: $(1011)_2 - (0101)_2$**\n```\n   1 0 1 1   (11)\n - 0 1 0 1   (5)\n ---------\n   0 1 1 0   (6)\n```\n- Result: $\\mathbf{(0110)_2 = 6_{10}}$"
  },
  {
    "id": "cfet_cpu_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 1,
    "title": "CPU Organization, Functional Units & Von Neumann Architecture",
    "question": "Describe the Von Neumann computer architecture with a neat block diagram. Explain the roles of ALU, Control Unit, Registers, and explain the Von Neumann Bottleneck.",
    "category": "Computer Architecture",
    "marks": 4,
    "stepByStepSolution": "**1. Von Neumann Architecture Principle:**\nProposed by John von Neumann in 1945. It introduces the **Stored Program Concept**, where both program instructions and program data share the same physical memory space and common data bus.\n\n**2. Block Diagram Components:**\n- **Central Processing Unit (CPU):**\n  - **Arithmetic Logic Unit (ALU):** Performs all mathematical calculations (addition, subtraction, multiplication) and logical operations (AND, OR, NOT, comparisons).\n  - **Control Unit (CU):** The brain of the CPU. Coordinates all operations by issuing timing and control signals. Directs the Fetch-Decode-Execute cycle.\n  - **Internal Registers:** Ultra-fast temporary storage locations inside the CPU:\n    - *Program Counter (PC):* Stores address of the next instruction to fetch.\n    - *Memory Address Register (MAR):* Holds memory location being read/written.\n    - *Memory Data Register (MDR):* Holds actual data fetched from or written to memory.\n    - *Instruction Register (IR):* Holds currently executing instruction opcode.\n    - *Accumulator (AC):* Stores intermediate results of ALU operations.\n- **Main Memory (RAM):** Linear array of storage cells storing instructions and data.\n- **Input / Output (I/O) Interfaces:** Connects keyboard, mouse, monitor, storage disks.\n- **System Buses:**\n  - *Data Bus:* Bidirectional bus carrying actual data.\n  - *Address Bus:* Unidirectional bus specifying memory locations.\n  - *Control Bus:* Carries timing, read/write command signals.\n\n**3. The Working Process (Instruction Cycle):**\n1. **Fetch:** CU fetches instruction from RAM at address held in PC $\\rightarrow$ placed into IR $\\rightarrow$ PC increments.\n2. **Decode:** CU decodes opcode in IR into micro-operations.\n3. **Execute:** ALU executes operation; result stored in Accumulator or RAM.\n\n**4. The Von Neumann Bottleneck:**\nBecause both data and instructions share the single shared memory bus, the CPU cannot read an instruction and read/write data at the exact same clock cycle. Throughput is limited by memory bus speed, which is much slower than CPU core speed. This is mitigated using multi-level CPU caches (L1, L2, L3)."
  },
  {
    "id": "cfet_mem_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 1,
    "title": "Memory Architecture & Memory Hierarchy Diagram",
    "question": "Illustrate memory architecture and hierarchy in a computer system with a diagram. Analyze the trade-offs between speed, cost, and capacity from registers to secondary storage.",
    "category": "Memory Systems",
    "marks": 4,
    "stepByStepSolution": "**1. Memory Hierarchy Triangle (Top to Bottom):**\n\n```\n      /\\\n     /  \\        1. CPU Registers (< 1 KB, ~0.5 ns access, Highest cost/bit)\n    /----\\\n   /      \\      2. Cache Memory: L1 (32-64KB), L2 (256KB-1MB), L3 (8-32MB) (~1-10 ns)\n  /--------\\\n /          \\    3. Main Memory: Primary RAM (SRAM, DRAM) (8-32 GB, ~50-80 ns)\n/------------\\\n/              \\  4. Secondary Storage: NVMe SSD, SATA SSD, HDD (512 GB - 2 TB, ~10-100 µs / ms)\n/----------------\\\n/                  \\5. Tertiary / Offline Storage: External Disks, Optical (TBs, Lowest cost/bit)\n```\n\n**2. Hierarchy Characteristics:**\n- **Moving Down the Pyramid:**\n  - Access latency increases ($0.5\\text{ ns} \\rightarrow 10\\text{ ms}$, $10^7\\times$ slower).\n  - Storage capacity increases ($1\\text{ KB} \\rightarrow 2\\text{ TB}$).\n  - Cost per bit decreases drastically.\n- **Moving Up the Pyramid:**\n  - Access speed increases.\n  - Cost per byte increases.\n  - Capacity decreases due to silicon area and thermal limitations.\n\n**3. Role of Cache and Locality of Reference:**\nCache memory acts as a high-speed buffer between CPU and slow main memory. It exploits:\n- **Temporal Locality:** If a memory address is accessed, it is likely to be accessed again soon (loops, loop counters).\n- **Spatial Locality:** If an address is accessed, nearby addresses will likely be accessed next (sequential array access, contiguous code).\n- **Average Access Time Formula:**\n  $$T_{\\text{avg}} = h \\cdot t_c + (1 - h) \\cdot t_m$$\n  *(Where $h$ = hit ratio, $t_c$ = cache access time, $t_m$ = main memory access time).*"
  },
  {
    "id": "cfet_os_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 3,
    "title": "OS Architecture, Resource Manager & Process vs Program",
    "question": "Explain the architecture of an Operating System with a suitable diagram. Differentiate between a Process and a Program, and explain the 5-state process lifecycle.",
    "category": "Operating Systems",
    "marks": 4,
    "stepByStepSolution": "**1. Operating System Definition & Architecture:**\nAn Operating System is system software that acts as an intermediary between computer hardware and the user/applications.\n\n**Layered Architecture:**\n```\n  [ Users & Application Programs (Browser, Word, IDE) ]\n                     │  (API Calls)\n  [ System Calls Interface (fork, exec, read, write) ]\n                     │\n  [ OS Kernel: Process, Memory, Device & File Managers ]\n                     │\n  [ Device Drivers & Hardware Layer (CPU, RAM, Disks) ]\n```\n\n**2. Role as Resource Manager:**\n- **CPU Management:** Schedules which process gets CPU time using scheduling algorithms (FCFS, Round Robin).\n- **Memory Management:** Allocates and deallocates RAM blocks to processes, prevents memory collisions via paging.\n- **Device Management:** Manages I/O devices through device drivers, buffering, and spooling.\n- **File Management:** Manages file creation, deletion, directory tree hierarchy, and access permissions.\n\n**3. Difference Between Program and Process:**\n| Parameter | Program | Process |\n| :--- | :--- | :--- |\n| **Nature** | Passive entity stored on disk | Active entity in execution loaded in RAM |\n| **Lifespan** | Exists permanently until deleted | Exists dynamically from launch to termination |\n| **Resources** | Consumes only disk space | Consumes CPU time, RAM, registers, open files |\n| **Representation** | Executable file (`.exe`, binary) | Process Control Block (PCB) with PID, registers, stack, heap |\n\n**4. 5-State Process Lifecycle:**\n1. **New:** Process is created by OS.\n2. **Ready:** Process is loaded in RAM, waiting for CPU scheduler allocation.\n3. **Running:** Instructions are actively being executed on CPU core.\n4. **Waiting / Blocked:** Process paused waiting for I/O completion or event.\n5. **Terminated:** Execution finished; OS reclaims resources."
  },
  {
    "id": "cfet_net_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 4,
    "title": "Network Topologies Comparison (Star, Bus, Ring, Mesh)",
    "question": "Compare Star, Bus, Ring, and Mesh network topologies with diagrams, working mechanism, advantages, and disadvantages. Which topology is preferred for high reliability?",
    "category": "Computer Networks",
    "marks": 4,
    "stepByStepSolution": "**1. Topologies Overview:**\n\n| Topology | Working Mechanism | Advantages | Disadvantages | Best Application |\n| :--- | :--- | :--- | :--- | :--- |\n| **Star** | All nodes connect to central Switch/Hub | Easy to install, cable failure affects 1 node only | Central switch failure takes down whole network | Office LANs, College computer labs |\n| **Bus** | Single shared backbone cable with terminators at ends | Minimum cabling required, cheapest for small LANs | Backbone cut stops entire network; high data collisions | Small temporary setups, legacy Ethernet |\n| **Ring** | Nodes connected circularly; token passed unidirectionally | No packet collisions (token controlled); predictable | Break in ring disrupts network; high latency | Token Ring LANs, FDDI networks |\n| **Mesh** | Every node connected to other nodes ($N(N-1)/2$ links) | **Highest reliability**: multiple redundant paths, fault-tolerant | Highest cost, extremely complex wiring and maintenance | Internet backbones, military communications |\n\n**2. Why Mesh Topology is Preferred for High Reliability:**\nIn a full mesh topology with $N$ nodes, each node has a dedicated point-to-point link to every other node. If any link or node fails, routing protocols instantly redirect traffic through alternate paths without interrupting service.\n\n**3. Campus Recommendation:**\nFor communication between two buildings on a college campus:\n- **Recommended Medium:** **Optical Fibre Cable**.\n- **Reason:** Provides ultra-high bandwidth (>10 Gbps), immune to lightning/electromagnetic interference across open ground, low attenuation over kilometer distances."
  },
  {
    "id": "cfet_net_2",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 4,
    "title": "TCP vs UDP, 3-Way Handshake & Protocol Hierarchy",
    "question": "Differentiate between TCP and UDP protocols. Explain the TCP 3-Way Handshake mechanism with a diagram. Why is TCP preferred for HTTP/FTP while UDP is used in gaming/streaming?",
    "category": "Network Protocols",
    "marks": 4,
    "stepByStepSolution": "**1. TCP vs UDP Comparison:**\n| Parameter | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |\n| :--- | :--- | :--- |\n| **Connection** | Connection-Oriented (establishes link before sending) | Connectionless (sends packets directly) |\n| **Reliability** | Guaranteed delivery (retransmits lost packets) | No guaranteed delivery (packets may drop) |\n| **Ordering** | Guarantees ordered arrival of segments | Packets may arrive out-of-order |\n| **Header Size** | Minimum 20 Bytes (up to 60 Bytes) | Fixed small 8 Bytes header |\n| **Speed/Overhead** | Slower due to ACKs, flow control, windowing | Ultra-fast with minimum latency & zero overhead |\n| **Applications** | Web browsing (HTTP/S), Email (SMTP), File transfer (FTP) | Video streaming, VoIP calls, Online gaming, DNS |\n\n**2. TCP 3-Way Handshake Mechanism:**\nBefore transmitting payload data, TCP establishes a verified two-way synchronized connection:\n1. **Step 1 (SYN):** Client sends a segment with `SYN=1` and random initial sequence number `Seq = x`.\n2. **Step 2 (SYN-ACK):** Server receives SYN, allocates buffers, and responds with `SYN=1`, `ACK=1`, `Ack = x+1`, and server's sequence number `Seq = y`.\n3. **Step 3 (ACK):** Client sends `ACK=1`, `Ack = y+1`. Connection is now **ESTABLISHED**. Data transfer begins.\n\n**3. Why TCP for Web/File vs UDP for Gaming/Streaming:**\n- **Web & File Transfer (HTTP/FTP):** Even a single corrupted or missing bit corrupts an executable file, PDF, or financial transaction. Reliability and ordered delivery are paramount.\n- **Live Video & Gaming:** Packets must arrive within milliseconds. If a frame packet is dropped, retransmitting it 200 ms later is useless because the video has already progressed. Low latency is prioritized over retransmission."
  },
  {
    "id": "cfet_emg_1",
    "subject": "CFET",
    "courseCode": "100108",
    "unitNo": 5,
    "title": "Cybersecurity CIA Triad & Blockchain Architecture",
    "question": "Explain the CIA Triad in Cybersecurity with real-life examples. Also explain how Cryptographic Hashing and Distributed Ledgers maintain data immutability in Blockchain.",
    "category": "Emerging Technologies",
    "marks": 4,
    "stepByStepSolution": "**1. The CIA Triad in Cybersecurity:**\nThe core model for information security:\n- **Confidentiality:** Preventing unauthorized disclosure of sensitive data.\n  - *Mechanism:* End-to-end encryption (AES-256), access control lists, multi-factor authentication (MFA).\n  - *Example:* Bank account passwords and OTPs visible only to account holder.\n- **Integrity:** Ensuring data remains accurate, complete, and protected against unauthorized modification or deletion.\n  - *Mechanism:* SHA-256 cryptographic hashes, digital signatures, parity checks.\n  - *Example:* Financial ledger where transaction amounts cannot be tampered with in transit.\n- **Availability:** Ensuring authorized users have uninterrupted access to resources and services whenever needed.\n  - *Mechanism:* Redundant server clusters, automated data backups, DDoS mitigation.\n  - *Example:* University exam portal remaining online during peak registration hours.\n\n**2. Blockchain & Cryptographic Hashing Immutability:**\n- **Block Structure:** Each block contains:\n  1. Data (transaction records)\n  2. Nonce (proof-of-work number)\n  3. Hash of the Current Block (e.g. SHA-256 hash)\n  4. **Hash of the Previous Block** (links block to parent block)\n- **Why It Is Immutable:**\n  If an attacker alters even 1 byte in Block #2:\n  - Block #2's hash changes completely (avalanche effect).\n  - Block #3's 'Previous Hash' pointer becomes invalid, breaking the entire chain forward.\n  - In a distributed peer-to-peer network, consensus algorithms (Proof of Work) reject the fraudulent chain because 51% of honest nodes maintain the genuine ledger."
  },
  {
    "id": "beee_prac_1",
    "subject": "BEEE",
    "courseCode": "100111",
    "unitNo": 1,
    "title": "Thevenin's Theorem & Maximum Power Calculation",
    "question": "In a DC circuit, a 24V independent voltage source with series resistance 6Ω supplies a load resistor R_L. Find:\ni. Thevenin voltage V_th and Thevenin resistance R_th\nii. Value of R_L for maximum power transfer\niii. Maximum power delivered to the load.",
    "category": "DC Circuit Theorems",
    "marks": 4,
    "stepByStepSolution": "**Given Data:**\n- Voltage Source $V_s = 24\\text{ V}$\n- Internal Series Resistance $R_s = 6\\;\\Omega$\n\n**Step 1: Thevenin Equivalent Circuit:**\n- Open-circuit voltage across load terminals:\n  $$V_{th} = V_{oc} = 24\\text{ V}$$\n- Deactivate source (replace ideal voltage source with short circuit):\n  $$R_{th} = 6\\;\\Omega$$\n\n**Step 2: Condition for Maximum Power Transfer:**\nAccording to the Maximum Power Transfer Theorem:\n$$R_L = R_{th} = \\mathbf{6\\;\\Omega}$$\n\n**Step 3: Maximum Power Delivered:**\n- Load Current:\n  $$I_L = \\frac{V_{th}}{R_{th} + R_L} = \\frac{24}{6 + 6} = \\frac{24}{12} = 2\\text{ A}$$\n- Maximum Load Power:\n  $$P_{\\max} = I_L^2 \\cdot R_L = (2)^2 \\cdot 6 = 4 \\cdot 6 = \\mathbf{24\\text{ W}}$$\n- Using Direct Formula:\n  $$P_{\\max} = \\frac{V_{th}^2}{4 R_{th}} = \\frac{24^2}{4 \\cdot 6} = \\frac{576}{24} = \\mathbf{24\\text{ W}}$$"
  },
  {
    "id": "math_prac_1",
    "subject": "Math-I",
    "courseCode": "100102",
    "unitNo": 2,
    "title": "Leibnitz Theorem Proof for y = (sin⁻¹ x)²",
    "question": "If y = (sin⁻¹ x)², prove that:\n(1 - x²) y_{n+2} - (2n + 1)x y_{n+1} - n² y_n = 0\nusing Leibnitz Theorem for the n-th derivative of a product.",
    "category": "Differential Calculus",
    "marks": 4,
    "stepByStepSolution": "**Given:**\n$$y = (\\sin^{-1} x)^2$$\n\n**Step 1: First Derivative**\n$$y_1 = 2(\\sin^{-1} x) \\cdot \\frac{1}{\\sqrt{1 - x^2}}$$\nCross-multiplying and squaring both sides:\n$$(1 - x^2) y_1^2 = 4 (\\sin^{-1} x)^2 = 4y$$\n\n**Step 2: Differentiating Again with respect to x**\n$$(1 - x^2) \\cdot 2 y_1 y_2 + y_1^2 (-2x) = 4 y_1$$\nDividing throughout by $2y_1$ ($y_1 \\ne 0$):\n$$(1 - x^2) y_2 - x y_1 - 2 = 0$$\n\n**Step 3: Applying Leibnitz Theorem n times**\nRecall Leibnitz formula:\n$$(uv)_n = u_n v + \\binom{n}{1} u_{n-1} v_1 + \\binom{n}{2} u_{n-2} v_2 + \\dots$$\n\n1. For term $(1 - x^2) y_2$:\n   - Let $u = y_2$, $v = 1 - x^2$\n   - Term $= y_{n+2}(1 - x^2) + n y_{n+1}(-2x) + \\frac{n(n-1)}{2} y_n(-2) + 0$\n   - $= (1 - x^2) y_{n+2} - 2nx y_{n+1} - n(n-1) y_n$\n\n2. For term $-x y_1$:\n   - Let $u = y_1$, $v = x$\n   - Term $= -[y_{n+1} x + n y_n (1)] = -x y_{n+1} - n y_n$\n\n3. For constant term $-2$:\n   - $D^n(2) = 0$\n\n**Step 4: Combining All Terms**\n$$(1 - x^2) y_{n+2} - 2nx y_{n+1} - n(n-1) y_n - x y_{n+1} - n y_n = 0$$\n$$(1 - x^2) y_{n+2} - (2n + 1)x y_{n+1} - [n^2 - n + n] y_n = 0$$\n$$\\mathbf{(1 - x^2) y_{n+2} - (2n + 1)x y_{n+1} - n^2 y_n = 0}$$\n*(Hence Proved!)*"
  },
  {
    "id": "phy_prac_1",
    "subject": "Physics",
    "courseCode": "100103/104",
    "unitNo": 1,
    "title": "Newton's Rings: Proof of Central Dark Spot",
    "question": "In Newton's rings experiment under reflected light, prove that the central spot is dark. If the diameter of the 10th dark ring is 0.5 cm with lens radius R = 100 cm, calculate the wavelength of light used.",
    "category": "Wave Optics",
    "marks": 4,
    "stepByStepSolution": "**Part (i): Proof of Central Dark Spot**\n1. Path difference for thin film formed between plano-convex lens and glass plate:\n   $$\\Delta = 2\\mu t \\cos(r + \\theta) + \\frac{\\lambda}{2}$$\n   *(The extra $\\lambda/2$ arises due to Stokes' phase shift of $\\pi$ upon reflection at denser glass boundary).*\n2. For normal incidence ($r \\approx 0$) and air film ($\\mu = 1$):\n   $$\\Delta = 2t + \\frac{\\lambda}{2}$$\n3. At point of contact, film thickness $t = 0$:\n   $$\\Delta = 0 + \\frac{\\lambda}{2} = \\frac{\\lambda}{2}$$\n4. Path difference $\\Delta = \\frac{\\lambda}{2} = (2m + 1)\\frac{\\lambda}{2}$ with $m=0$, which is the condition for **destructive interference**.\n   Therefore, the central fringe is **always dark**.\n\n---\n\n**Part (ii): Numerical Calculation**\n- Given:\n  - Ring number $n = 10$\n  - Diameter $D_{10} = 0.5\\text{ cm} = 0.5 \\times 10^{-2}\\text{ m} = 5 \\times 10^{-3}\\text{ m}$\n  - Radius of curvature $R = 100\\text{ cm} = 1.0\\text{ m}$\n- Formula for dark ring diameter:\n  $$D_n^2 = 4n\\lambda R \\implies \\lambda = \\frac{D_n^2}{4nR}$$\n- Calculation:\n  $$\\lambda = \\frac{(5 \\times 10^{-3})^2}{4 \\times 10 \\times 1.0} = \\frac{25 \\times 10^{-6}}{40} = 0.625 \\times 10^{-6}\\text{ m} = \\mathbf{6250\\;\\text{Å}}$$"
  }
];
