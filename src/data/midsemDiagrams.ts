// ============================================================================
// M&C MID-SEM SVG DIAGRAM BANK (2D & PSEUDO-3D EXAM SCHEMATICS)
// High-Yield Visualizations for All 6 Official Subjects · Units 1, 2, and 3
// Styled for the Authentic Engineering Notebook & Graph Paper Theme
// ============================================================================

export interface MidsemDiagram {
  id: string;
  subjectCode: string;
  subject: string;
  unitNo: 1 | 2 | 3;
  title: string;
  caption: string;
  svg: string;
}

export const MIDSEM_DIAGRAMS: MidsemDiagram[] = [
  // 1. BEEE — Unit 1: Thevenin Equivalent
  {
    id: "beee_u1_thevenin",
    subjectCode: "100111",
    subject: "BEEE",
    unitNo: 1,
    title: "Thevenin & Norton Equivalent Circuits",
    caption: "Any linear two-terminal DC network reduces to V_th in series with R_th, or I_N = V_th/R_th in parallel with R_th.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- Thevenin Box -->
      <rect x="30" y="30" width="250" height="180" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="6"/>
      <text x="155" y="55" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Thevenin Equivalent Circuit</text>
      <!-- Source V_th -->
      <circle cx="80" cy="120" r="22" fill="#f6f0e1" stroke="#9e3512" stroke-width="2"/>
      <text x="80" y="125" fill="#9e3512" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">V_th</text>
      <!-- R_th Resistor -->
      <path d="M 102 120 L 130 120 L 140 105 L 150 135 L 160 105 L 170 135 L 180 120 L 210 120" fill="none" stroke="#2b2a28" stroke-width="2.5"/>
      <text x="160" y="96" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">R_th</text>
      <!-- Terminals A and B -->
      <circle cx="210" cy="120" r="4" fill="#9e3512"/>
      <text x="225" y="115" fill="#9e3512" font-size="12" font-weight="bold" font-family="sans-serif">A</text>
      <path d="M 80 142 L 80 180 L 210 180" fill="none" stroke="#2b2a28" stroke-width="2"/>
      <circle cx="210" cy="180" r="4" fill="#9e3512"/>
      <text x="225" y="185" fill="#9e3512" font-size="12" font-weight="bold" font-family="sans-serif">B</text>
      <text x="155" y="200" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">I_L = V_th / (R_th + R_L)</text>
      
      <!-- Norton Box -->
      <rect x="320" y="30" width="250" height="180" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="6"/>
      <text x="445" y="55" fill="#1e6e67" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Norton Equivalent Circuit</text>
      <!-- Source I_N -->
      <circle cx="370" cy="120" r="22" fill="#f6f0e1" stroke="#1e6e67" stroke-width="2"/>
      <path d="M 370 132 L 370 108 M 365 115 L 370 108 L 375 115" fill="none" stroke="#1e6e67" stroke-width="2.5"/>
      <text x="370" y="155" fill="#1e6e67" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">I_N</text>
      <!-- Lines and Parallel Resistor -->
      <path d="M 370 98 L 370 80 L 500 80" fill="none" stroke="#2b2a28" stroke-width="2"/>
      <path d="M 370 142 L 370 180 L 500 180" fill="none" stroke="#2b2a28" stroke-width="2"/>
      <path d="M 445 80 L 445 105 L 435 115 L 455 125 L 435 135 L 455 145 L 445 155 L 445 180" fill="none" stroke="#2b2a28" stroke-width="2.5"/>
      <text x="475" y="135" fill="#2b2a28" font-size="11" font-weight="bold" font-family="sans-serif">R_N = R_th</text>
      <!-- Terminals A and B -->
      <circle cx="500" cy="80" r="4" fill="#1e6e67"/>
      <text x="515" y="85" fill="#1e6e67" font-size="12" font-weight="bold" font-family="sans-serif">A</text>
      <circle cx="500" cy="180" r="4" fill="#1e6e67"/>
      <text x="515" y="185" fill="#1e6e67" font-size="12" font-weight="bold" font-family="sans-serif">B</text>
      <text x="445" y="200" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">I_N = V_th / R_th</text>
    </svg>`
  },

  // 2. BEEE — Unit 2: Series RLC Resonance
  {
    id: "beee_u2_rlc_resonance",
    subjectCode: "100111",
    subject: "BEEE",
    unitNo: 2,
    title: "Series RLC Resonance & Current Curve",
    caption: "At resonance f_0 = 1/(2π√LC), X_L = X_C, impedance drops to Z = R (minimum), and current reaches maximum peak I_0 = V/R with unity power factor.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- Axes -->
      <line x1="60" y1="200" x2="550" y2="200" stroke="#2b2a28" stroke-width="2"/>
      <line x1="60" y1="200" x2="60" y2="30" stroke="#2b2a28" stroke-width="2"/>
      <text x="540" y="220" fill="#555046" font-size="11" font-weight="bold" font-family="sans-serif">Frequency f (Hz)</text>
      <text x="50" y="25" fill="#555046" font-size="11" font-weight="bold" font-family="sans-serif">Current I (A)</text>
      <!-- Resonance Bell Curve -->
      <path d="M 80 195 Q 230 190 280 110 T 310 50 T 340 110 Q 390 190 530 195" fill="none" stroke="#1e6e67" stroke-width="3"/>
      <!-- Resonant Peak -->
      <line x1="310" y1="50" x2="310" y2="200" stroke="#9e3512" stroke-dasharray="4,4" stroke-width="1.75"/>
      <circle cx="310" cy="50" r="5" fill="#9e3512"/>
      <text x="310" y="40" fill="#9e3512" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">I_max = V / R</text>
      <text x="310" y="218" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">f_0 = 1 / (2π√LC)</text>
      <!-- Half-Power Line -->
      <line x1="180" y1="95" x2="440" y2="95" stroke="#b8810b" stroke-dasharray="3,3" stroke-width="1.75"/>
      <text x="100" y="98" fill="#b8810b" font-size="10" font-weight="bold" font-family="sans-serif">I_max / √2</text>
      <!-- Cutoff Frequencies f1 and f2 -->
      <line x1="265" y1="95" x2="265" y2="200" stroke="#b8810b" stroke-dasharray="2,2" stroke-width="1.5"/>
      <text x="265" y="215" fill="#b8810b" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">f_1</text>
      <line x1="355" y1="95" x2="355" y2="200" stroke="#b8810b" stroke-dasharray="2,2" stroke-width="1.5"/>
      <text x="355" y="215" fill="#b8810b" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">f_2</text>
      <text x="475" y="115" fill="#2b2a28" font-size="11" font-weight="bold" font-family="sans-serif">BW = f_2 - f_1 = R / (2πL)</text>
      <text x="475" y="135" fill="#2b2a28" font-size="11" font-weight="bold" font-family="sans-serif">Q = f_0 / BW = (1/R)·√(L/C)</text>
    </svg>`
  },

  // 3. BEEE — Unit 3: Bridge Rectifier
  {
    id: "beee_u3_rectifier",
    subjectCode: "100111",
    subject: "BEEE",
    unitNo: 3,
    title: "Full-Wave Bridge Rectifier & Output Waveform",
    caption: "4 diodes bridge configuration delivers full-wave DC with maximum efficiency η = 81.2% and ripple factor γ = 0.482 without center-tapped transformer.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- Left: Diamond Bridge -->
      <g transform="translate(60, 40)">
        <polygon points="90,10 160,80 90,150 20,80" fill="#efe7d2" stroke="#2b2a28" stroke-width="2"/>
        <!-- D1 -->
        <polygon points="50,45 60,35 60,55" fill="#9e3512"/>
        <line x1="50" y1="35" x2="50" y2="55" stroke="#9e3512" stroke-width="2"/>
        <text x="45" y="30" fill="#2b2a28" font-size="10" font-weight="bold" font-family="sans-serif">D1</text>
        <!-- D2 -->
        <polygon points="120,45 130,35 130,55" fill="#9e3512"/>
        <line x1="120" y1="35" x2="120" y2="55" stroke="#9e3512" stroke-width="2"/>
        <text x="135" y="30" fill="#2b2a28" font-size="10" font-weight="bold" font-family="sans-serif">D2</text>
        <!-- D3 -->
        <polygon points="50,115 60,105 60,125" fill="#9e3512"/>
        <line x1="50" y1="105" x2="50" y2="125" stroke="#9e3512" stroke-width="2"/>
        <text x="45" y="135" fill="#2b2a28" font-size="10" font-weight="bold" font-family="sans-serif">D3</text>
        <!-- D4 -->
        <polygon points="120,115 130,105 130,125" fill="#9e3512"/>
        <line x1="120" y1="105" x2="120" y2="125" stroke="#9e3512" stroke-width="2"/>
        <text x="135" y="135" fill="#2b2a28" font-size="10" font-weight="bold" font-family="sans-serif">D4</text>
        <text x="90" y="170" fill="#2b2a28" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Bridge Network</text>
      </g>
      <!-- Right: Pulsating DC Waveform -->
      <g transform="translate(300, 40)">
        <text x="140" y="20" fill="#1e6e67" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Full-Wave Rectified Output (V_dc)</text>
        <line x1="20" y1="120" x2="260" y2="120" stroke="#2b2a28" stroke-width="1.75"/>
        <line x1="20" y1="120" x2="20" y2="30" stroke="#2b2a28" stroke-width="1.75"/>
        <!-- Pulses -->
        <path d="M 20 120 Q 55 40 90 120 Q 125 40 160 120 Q 195 40 230 120" fill="none" stroke="#1e6e67" stroke-width="2.5"/>
        <!-- DC Average Line -->
        <line x1="20" y1="69" x2="250" y2="69" stroke="#b8810b" stroke-dasharray="4,3" stroke-width="2"/>
        <text x="180" y="62" fill="#b8810b" font-size="11" font-weight="bold" font-family="sans-serif">V_dc = 2V_m / π</text>
        <text x="140" y="150" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">η = 81.2% · Ripple γ = 0.482 · PIV = V_m</text>
      </g>
    </svg>`
  },

  // 4. MATH-I — Unit 2: Rolle's & LMVT
  {
    id: "math1_u2_rolle",
    subjectCode: "100102",
    subject: "Math-I",
    unitNo: 2,
    title: "Rolle's & Lagrange's Mean Value Theorems",
    caption: "Geometric interpretation: Rolle's theorem guarantees horizontal tangent f'(c)=0; LMVT guarantees tangent parallel to secant slope [f(b)-f(a)]/(b-a).",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- Left: Rolle's Theorem -->
      <g transform="translate(40, 30)">
        <text x="110" y="20" fill="#9e3512" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Rolle's Theorem: f'(c) = 0</text>
        <line x1="20" y1="160" x2="220" y2="160" stroke="#2b2a28" stroke-width="1.75"/>
        <line x1="20" y1="160" x2="20" y2="30" stroke="#2b2a28" stroke-width="1.75"/>
        <!-- Curve with f(a) = f(b) -->
        <path d="M 40 120 Q 115 30 190 120" fill="none" stroke="#1e6e67" stroke-width="2.5"/>
        <!-- Horizontal Tangent at Peak -->
        <line x1="75" y1="75" x2="155" y2="75" stroke="#9e3512" stroke-width="2"/>
        <circle cx="115" cy="75" r="4" fill="#9e3512"/>
        <line x1="115" y1="75" x2="115" y2="160" stroke="#9e3512" stroke-dasharray="3,3"/>
        <text x="115" y="175" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">x = c</text>
        <circle cx="40" cy="120" r="3.5" fill="#2b2a28"/>
        <circle cx="190" cy="120" r="3.5" fill="#2b2a28"/>
        <text x="40" y="175" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">a</text>
        <text x="190" y="175" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">b</text>
      </g>
      <!-- Right: LMVT -->
      <g transform="translate(320, 30)">
        <text x="110" y="20" fill="#1e6e67" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Lagrange's MVT: Parallel Tangent</text>
        <line x1="20" y1="160" x2="220" y2="160" stroke="#2b2a28" stroke-width="1.75"/>
        <line x1="20" y1="160" x2="20" y2="30" stroke="#2b2a28" stroke-width="1.75"/>
        <!-- Curve -->
        <path d="M 40 135 Q 100 45 190 80" fill="none" stroke="#2b2a28" stroke-width="2.5"/>
        <!-- Secant Chord -->
        <line x1="40" y1="135" x2="190" y2="80" stroke="#b8810b" stroke-dasharray="3,3" stroke-width="2"/>
        <!-- Parallel Tangent -->
        <line x1="55" y1="100" x2="165" y2="60" stroke="#9e3512" stroke-width="2"/>
        <circle cx="105" cy="78" r="4" fill="#9e3512"/>
        <line x1="105" y1="78" x2="105" y2="160" stroke="#9e3512" stroke-dasharray="3,3"/>
        <text x="105" y="175" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">x = c</text>
      </g>
    </svg>`
  },

  // 5. MATH-I — Unit 3: Saddle Point & Hessian Extrema
  {
    id: "math1_u3_saddle",
    subjectCode: "100102",
    subject: "Math-I",
    unitNo: 3,
    title: "Saddle Point & Multivariable Extrema (rt - s²)",
    caption: "Discriminant D = rt - s²: positive D with r>0 gives local minimum; positive D with r<0 gives local maximum; negative D (rt - s² < 0) proves a saddle point.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- 3D Saddle Mesh Simulation -->
      <g transform="translate(60, 30)">
        <text x="120" y="20" fill="#2b2a28" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Saddle Surface z = x² - y²</text>
        <path d="M 40 130 Q 120 70 200 130" fill="none" stroke="#1e6e67" stroke-width="2"/>
        <path d="M 60 110 Q 120 90 180 110" fill="none" stroke="#b8810b" stroke-width="1.5"/>
        <path d="M 80 140 Q 120 160 160 140" fill="none" stroke="#2b2a28" stroke-width="2"/>
        <path d="M 120 70 Q 120 115 120 160" fill="none" stroke="#9e3512" stroke-dasharray="3,3" stroke-width="2"/>
        <circle cx="120" cy="115" r="5" fill="#9e3512"/>
        <text x="135" y="120" fill="#9e3512" font-size="11" font-weight="bold" font-family="sans-serif">Saddle Point (0,0)</text>
      </g>
      <!-- Right: Decision Tree Box -->
      <g transform="translate(320, 35)">
        <rect x="0" y="0" width="240" height="170" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="6"/>
        <text x="120" y="25" fill="#2b2a28" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Hessian Criteria (D = rt - s²)</text>
        <text x="15" y="55" fill="#1e6e67" font-size="11" font-weight="bold" font-family="sans-serif">✓ D &gt; 0, r &gt; 0 ➔ Local Minimum</text>
        <text x="15" y="80" fill="#2b2a28" font-size="11" font-weight="bold" font-family="sans-serif">✓ D &gt; 0, r &lt; 0 ➔ Local Maximum</text>
        <text x="15" y="105" fill="#9e3512" font-size="11" font-weight="bold" font-family="sans-serif">✗ D &lt; 0 ➔ SADDLE POINT</text>
        <text x="15" y="130" fill="#b8810b" font-size="11" font-weight="bold" font-family="sans-serif">? D = 0 ➔ Inconclusive</text>
        <text x="15" y="155" fill="#555046" font-size="10" font-weight="bold" font-family="sans-serif">r = f_xx, s = f_xy, t = f_yy</text>
      </g>
    </svg>`
  },

  // 6. PHYSICS — Unit 1: Newton's Rings
  {
    id: "phy_u1_newton_rings",
    subjectCode: "100104",
    subject: "Physics",
    unitNo: 1,
    title: "Newton's Rings Setup & Fringe Pattern",
    caption: "Interference in wedge air film between plano-convex lens and glass plate. Reflected center is always dark. Dark ring diameter D_n² = 4nRλ.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- Left: Optical Lens on Flat Plate -->
      <g transform="translate(40, 40)">
        <text x="110" y="20" fill="#2b2a28" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Apparatus (Wedge Air Film)</text>
        <!-- Flat Glass Plate -->
        <rect x="20" y="130" width="180" height="20" fill="#e6dcc3" stroke="#2b2a28" stroke-width="1.5" rx="2"/>
        <text x="110" y="145" fill="#2b2a28" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Flat Glass Plate</text>
        <!-- Plano-Convex Lens Curved Surface -->
        <path d="M 30 70 L 190 70 C 170 120, 130 130, 110 130 C 90 130, 50 120, 30 70 Z" fill="#efe7d2" stroke="#1e6e67" stroke-width="2"/>
        <text x="110" y="95" fill="#1e6e67" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Plano-Convex Lens (R)</text>
        <circle cx="110" cy="130" r="3.5" fill="#9e3512"/>
        <text x="110" y="120" fill="#9e3512" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">t = 0 (Dark Point)</text>
      </g>
      <!-- Right: Concentric Rings Pattern -->
      <g transform="translate(340, 30)">
        <text x="110" y="15" fill="#1e6e67" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Concentric Interference Rings</text>
        <!-- Circular Rings -->
        <circle cx="110" cy="100" r="75" fill="none" stroke="#2b2a28" stroke-width="2"/>
        <circle cx="110" cy="100" r="60" fill="none" stroke="#1e6e67" stroke-width="3"/>
        <circle cx="110" cy="100" r="50" fill="none" stroke="#2b2a28" stroke-width="2"/>
        <circle cx="110" cy="100" r="38" fill="none" stroke="#1e6e67" stroke-width="3"/>
        <circle cx="110" cy="100" r="26" fill="none" stroke="#2b2a28" stroke-width="2"/>
        <circle cx="110" cy="100" r="14" fill="none" stroke="#1e6e67" stroke-width="3"/>
        <!-- Central Dark Spot -->
        <circle cx="110" cy="100" r="7" fill="#2b2a28" stroke="#9e3512" stroke-width="2"/>
        <text x="110" y="195" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Dark: D_n ∝ √n · Bright: D_n ∝ √(2n-1)</text>
      </g>
    </svg>`
  },

  // 7. PHYSICS — Unit 3: B-H Curve & Displacement Current
  {
    id: "phy_u3_bh_curve",
    subjectCode: "100104",
    subject: "Physics",
    unitNo: 3,
    title: "B-H Hysteresis Loop & Maxwell Displacement Current",
    caption: "Ferromagnetic B-H loop area measures thermal hysteresis loss per cycle ∮ H dB. Displacement current I_d = ε₀(dΦ/dt) preserves continuity inside capacitor dielectric.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- Left: B-H Curve -->
      <g transform="translate(40, 25)">
        <text x="110" y="15" fill="#9e3512" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">B-H Hysteresis Loop</text>
        <line x1="20" y1="100" x2="200" y2="100" stroke="#2b2a28" stroke-width="1.75"/>
        <line x1="110" y1="10" x2="110" y2="190" stroke="#2b2a28" stroke-width="1.75"/>
        <text x="195" y="95" fill="#2b2a28" font-size="11" font-weight="bold" font-family="sans-serif">H</text>
        <text x="115" y="20" fill="#2b2a28" font-size="11" font-weight="bold" font-family="sans-serif">B</text>
        <!-- Hysteresis Loop -->
        <path d="M 110 50 C 150 52, 170 65, 170 70 C 170 85, 130 90, 110 150 C 70 148, 50 135, 50 130 C 50 115, 90 110, 110 50 Z" fill="#9e3512" fill-opacity="0.12" stroke="#9e3512" stroke-width="2.5"/>
        <circle cx="110" cy="65" r="3.5" fill="#b8810b"/>
        <text x="115" y="65" fill="#b8810b" font-size="10" font-weight="bold" font-family="sans-serif">B_r (Retentivity)</text>
        <circle cx="75" cy="100" r="3.5" fill="#1e6e67"/>
        <text x="40" y="92" fill="#1e6e67" font-size="10" font-weight="bold" font-family="sans-serif">-H_c (Coercivity)</text>
      </g>
      <!-- Right: Displacement Current in Capacitor -->
      <g transform="translate(320, 25)">
        <text x="120" y="15" fill="#1e6e67" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Displacement Current I_d</text>
        <!-- Capacitor Plates -->
        <rect x="70" y="45" width="12" height="110" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="2"/>
        <rect x="160" y="45" width="12" height="110" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="2"/>
        <!-- Electric Flux Lines -->
        <line x1="85" y1="65" x2="155" y2="65" stroke="#9e3512" stroke-width="1.75" stroke-dasharray="3,3"/>
        <line x1="85" y1="95" x2="155" y2="95" stroke="#9e3512" stroke-width="1.75" stroke-dasharray="3,3"/>
        <line x1="85" y1="125" x2="155" y2="125" stroke="#9e3512" stroke-width="1.75" stroke-dasharray="3,3"/>
        <text x="120" y="100" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">dΦ_E / dt</text>
        <!-- Current Arrows -->
        <text x="35" y="95" fill="#1e6e67" font-size="11" font-weight="bold" font-family="sans-serif">I_c →</text>
        <text x="180" y="95" fill="#1e6e67" font-size="11" font-weight="bold" font-family="sans-serif">→ I_c</text>
        <text x="120" y="185" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">I_d = ε₀ · (dΦ_E / dt) = I_c</text>
      </g>
    </svg>`
  },

  // 8. IAI — Unit 3: Minimax & Alpha-Beta Cutoffs
  {
    id: "iai_u3_alphabeta",
    subjectCode: "100105",
    subject: "IAI",
    unitNo: 3,
    title: "Minimax Game Tree & Alpha-Beta Pruning Cutoff",
    caption: "Alpha-Beta condition α ≥ β prunes unneeded branches without affecting the root decision, cutting time complexity to O(b^(m/2)).",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- Root Node MAX -->
      <polygon points="300,30 280,60 320,60" fill="#9e3512" stroke="#2b2a28" stroke-width="2"/>
      <text x="300" y="52" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">3</text>
      <text x="330" y="45" fill="#9e3512" font-size="11" font-weight="bold" font-family="sans-serif">MAX (α=3)</text>
      <!-- Edges to MIN -->
      <line x1="290" y1="60" x2="180" y2="90" stroke="#2b2a28" stroke-width="2"/>
      <line x1="310" y1="60" x2="420" y2="90" stroke="#2b2a28" stroke-width="2"/>
      <!-- Left MIN Node -->
      <polygon points="180,120 160,90 200,90" fill="#1e6e67" stroke="#2b2a28" stroke-width="2"/>
      <text x="180" y="105" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">3</text>
      <!-- Right MIN Node with Cutoff -->
      <polygon points="420,120 400,90 440,90" fill="#1e6e67" stroke="#2b2a28" stroke-width="2"/>
      <text x="420" y="105" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">≤2</text>
      <text x="455" y="105" fill="#1e6e67" font-size="11" font-weight="bold" font-family="sans-serif">MIN (β=2)</text>
      <!-- Leaves of Left Node -->
      <line x1="170" y1="120" x2="130" y2="160" stroke="#2b2a28" stroke-width="1.5"/>
      <line x1="190" y1="120" x2="230" y2="160" stroke="#2b2a28" stroke-width="1.5"/>
      <rect x="115" y="160" width="30" height="25" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5" rx="4"/>
      <text x="130" y="177" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">3</text>
      <rect x="215" y="160" width="30" height="25" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5" rx="4"/>
      <text x="230" y="177" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">5</text>
      <!-- Leaves of Right Node -->
      <line x1="410" y1="120" x2="370" y2="160" stroke="#2b2a28" stroke-width="1.5"/>
      <rect x="355" y="160" width="30" height="25" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5" rx="4"/>
      <text x="370" y="177" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">2</text>
      <!-- Cutoff Branch -->
      <line x1="430" y1="120" x2="470" y2="160" stroke="#9e3512" stroke-dasharray="3,3" stroke-width="2"/>
      <rect x="455" y="160" width="30" height="25" fill="#e6dcc3" stroke="#9e3512" stroke-dasharray="2,2" rx="4"/>
      <text x="470" y="177" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">?</text>
      <text x="470" y="205" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">PRUNED (α ≥ β)</text>
    </svg>`
  },

  // 9. CFET — Unit 3: Full Adder Logic Circuit
  {
    id: "cfet_u3_full_adder",
    subjectCode: "100108",
    subject: "CFET",
    unitNo: 3,
    title: "Full Adder Circuit (2 Half Adders + OR Gate)",
    caption: "Full Adder sums inputs A, B, and C_in. Sum S = A ⊕ B ⊕ C_in, Carry C_out = AB + C_in(A ⊕ B). Implemented using two XORs, two ANDs, and one OR gate.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- Block Diagram -->
      <g transform="translate(60, 40)">
        <!-- Half Adder 1 -->
        <rect x="20" y="30" width="130" height="110" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="6"/>
        <text x="85" y="55" fill="#1e6e67" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Half Adder 1</text>
        <text x="5" y="65" fill="#2b2a28" font-size="11" font-weight="bold" font-family="sans-serif">A →</text>
        <text x="5" y="105" fill="#2b2a28" font-size="11" font-weight="bold" font-family="sans-serif">B →</text>
        <text x="120" y="75" fill="#1e6e67" font-size="11" font-weight="bold" font-family="sans-serif">S1</text>
        <text x="120" y="125" fill="#b8810b" font-size="11" font-weight="bold" font-family="sans-serif">C1</text>
        <!-- Half Adder 2 -->
        <rect x="210" y="30" width="130" height="110" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="6"/>
        <text x="275" y="55" fill="#9e3512" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Half Adder 2</text>
        <text x="165" y="105" fill="#2b2a28" font-size="11" font-weight="bold" font-family="sans-serif">C_in →</text>
        <!-- Sum Output -->
        <line x1="340" y1="65" x2="460" y2="65" stroke="#1e6e67" stroke-width="2.5"/>
        <text x="470" y="70" fill="#1e6e67" font-size="13" font-weight="bold" font-family="sans-serif">SUM (S)</text>
        <!-- Carry OR Gate -->
        <polygon points="400,120 440,140 400,160" fill="#b8810b" stroke="#2b2a28" stroke-width="2"/>
        <text x="410" y="145" fill="#ffffff" font-size="10" font-weight="bold" font-family="sans-serif">OR</text>
        <line x1="150" y1="125" x2="400" y2="130" stroke="#b8810b" stroke-width="2"/>
        <line x1="340" y1="125" x2="400" y2="150" stroke="#b8810b" stroke-width="2"/>
        <line x1="440" y1="140" x2="480" y2="140" stroke="#b8810b" stroke-width="2.5"/>
        <text x="490" y="145" fill="#b8810b" font-size="13" font-weight="bold" font-family="sans-serif">C_out</text>
      </g>
      <text x="300" y="210" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Full Adder = 2 Half Adders + 1 OR Gate · S = A ⊕ B ⊕ C_in · C_out = AB + C_in(A ⊕ B)</text>
    </svg>`
  },

  // 10. UHV — Unit 2: Self ('I') and Body Co-existence
  {
    id: "uhv_u2_self_body",
    subjectCode: "100109",
    subject: "UHV",
    unitNo: 2,
    title: "Co-existence of Self ('I') and Body",
    caption: "The human being is a co-existence of conscious Self ('I') (continuous, qualitative needs) and material Body (temporary, quantitative needs), harmonized by Sanyama.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <!-- Self Box -->
      <rect x="50" y="30" width="220" height="175" fill="#efe7d2" stroke="#b8810b" stroke-width="2" rx="6"/>
      <text x="160" y="55" fill="#b8810b" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Conscious Self ('I')</text>
      <text x="70" y="85" fill="#2b2a28" font-size="11" font-weight="500" font-family="sans-serif">• Need: Happiness, Respect, Trust</text>
      <text x="70" y="110" fill="#2b2a28" font-size="11" font-weight="500" font-family="sans-serif">• Quality: Qualitative &amp; Continuous</text>
      <text x="70" y="135" fill="#2b2a28" font-size="11" font-weight="500" font-family="sans-serif">• Activities: Desiring, Thinking, Knowing</text>
      <text x="70" y="160" fill="#1e6e67" font-size="11" font-weight="bold" font-family="sans-serif">• Role: Seer, Doer, Enjoyer</text>
      <text x="160" y="190" fill="#b8810b" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Conscious Domain (Chetana)</text>
      
      <!-- Body Box -->
      <rect x="330" y="30" width="220" height="175" fill="#efe7d2" stroke="#1e6e67" stroke-width="2" rx="6"/>
      <text x="440" y="55" fill="#1e6e67" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Material Body</text>
      <text x="350" y="85" fill="#2b2a28" font-size="11" font-weight="500" font-family="sans-serif">• Need: Food, Clothing, Shelter</text>
      <text x="350" y="110" fill="#2b2a28" font-size="11" font-weight="500" font-family="sans-serif">• Quality: Quantitative &amp; Temporary</text>
      <text x="350" y="135" fill="#2b2a28" font-size="11" font-weight="500" font-family="sans-serif">• Activities: Breathing, Heartbeat</text>
      <text x="350" y="160" fill="#9e3512" font-size="11" font-weight="bold" font-family="sans-serif">• Role: Instrument</text>
      <text x="440" y="190" fill="#1e6e67" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Physio-Chemical (Jada)</text>
      
      <!-- Interaction Link -->
      <path d="M 270 115 L 330 115" stroke="#9e3512" stroke-width="2"/>
      <polygon points="325,110 335,115 325,120" fill="#9e3512"/>
      <polygon points="275,110 265,115 275,120" fill="#9e3512"/>
      <text x="300" y="105" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Sanyama</text>
    </svg>`
  }
];
