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
  },
  // 11. CFET — Unit 1: 4-Variable K-Map 16-Cell Grid
  {
    id: "cfet_u1_kmap",
    subjectCode: "100108",
    subject: "CFET",
    unitNo: 1,
    title: "4-Variable Karnaugh Map (K-Map) 16-Cell Grid",
    caption: "Gray code ordered grid (00, 01, 11, 10) for AB (rows) and CD (columns). Groups of 1, 2, 4, 8, or 16 adjacent cells eliminate variables to yield minimal SOP expressions with corner wrap-around.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="300" y="24" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">16-Cell 4-Variable K-Map: F(A,B,C,D)</text>
      <!-- Row/Col Headers -->
      <line x1="70" y1="35" x2="130" y2="75" stroke="#2b2a28" stroke-width="1.5"/>
      <text x="80" y="65" fill="#1e6e67" font-size="11" font-weight="bold" font-family="sans-serif">AB \</text>
      <text x="105" y="48" fill="#9e3512" font-size="11" font-weight="bold" font-family="sans-serif">CD</text>
      <!-- CD Column Labels -->
      <text x="175" y="65" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">00</text>
      <text x="245" y="65" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">01</text>
      <text x="315" y="65" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">11</text>
      <text x="385" y="65" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">10</text>
      <!-- AB Row Labels -->
      <text x="110" y="102" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">00</text>
      <text x="110" y="137" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">01</text>
      <text x="110" y="172" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">11</text>
      <text x="110" y="207" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">10</text>
      <!-- 4x4 Grid -->
      <g fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5">
        <!-- Row 0: m0, m1, m3, m2 -->
        <rect x="140" y="80" width="70" height="35"/>
        <rect x="210" y="80" width="70" height="35"/>
        <rect x="280" y="80" width="70" height="35"/>
        <rect x="350" y="80" width="70" height="35"/>
        <!-- Row 1: m4, m5, m7, m6 -->
        <rect x="140" y="115" width="70" height="35"/>
        <rect x="210" y="115" width="70" height="35"/>
        <rect x="280" y="115" width="70" height="35"/>
        <rect x="350" y="115" width="70" height="35"/>
        <!-- Row 2: m12, m13, m15, m14 -->
        <rect x="140" y="150" width="70" height="35"/>
        <rect x="210" y="150" width="70" height="35"/>
        <rect x="280" y="150" width="70" height="35"/>
        <rect x="350" y="150" width="70" height="35"/>
        <!-- Row 3: m8, m9, m11, m10 -->
        <rect x="140" y="185" width="70" height="35"/>
        <rect x="210" y="185" width="70" height="35"/>
        <rect x="280" y="185" width="70" height="35"/>
        <rect x="350" y="185" width="70" height="35"/>
      </g>
      <!-- Minterm Indexes -->
      <g fill="#555046" font-size="9" font-family="sans-serif">
        <text x="144" y="93">m0</text><text x="214" y="93">m1</text><text x="284" y="93">m3</text><text x="354" y="93">m2</text>
        <text x="144" y="128">m4</text><text x="214" y="128">m5</text><text x="284" y="128">m7</text><text x="354" y="128">m6</text>
        <text x="144" y="163">m12</text><text x="214" y="163">m13</text><text x="284" y="163">m15</text><text x="354" y="163">m14</text>
        <text x="144" y="198">m8</text><text x="214" y="198">m9</text><text x="284" y="198">m11</text><text x="354" y="198">m10</text>
      </g>
      <!-- Highlighted Quad Grouping (m5, m7, m13, m15) -->
      <rect x="214" y="119" width="132" height="62" fill="#1e6e67" fill-opacity="0.25" stroke="#1e6e67" stroke-width="2.5" rx="6" stroke-dasharray="4 2"/>
      <text x="280" y="145" fill="#1e6e67" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">1</text>
      <!-- Legend box -->
      <rect x="435" y="75" width="150" height="135" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5" rx="6"/>
      <text x="510" y="95" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Minimization Rules</text>
      <text x="445" y="115" fill="#2b2a28" font-size="9.5" font-family="sans-serif">• Octet (8) eliminates 3 vars</text>
      <text x="445" y="135" fill="#2b2a28" font-size="9.5" font-family="sans-serif">• Quad (4) eliminates 2 vars</text>
      <text x="445" y="155" fill="#2b2a28" font-size="9.5" font-family="sans-serif">• Pair (2) eliminates 1 var</text>
      <text x="445" y="175" fill="#1e6e67" font-size="9.5" font-weight="bold" font-family="sans-serif">Quad term = B · D</text>
      <text x="445" y="195" fill="#555046" font-size="9" font-family="sans-serif">• 4 corners wrap-around</text>
    </svg>`
  },

  // 12. CFET — Unit 2: Von Neumann Architecture
  {
    id: "cfet_u2_von_neumann",
    subjectCode: "100108",
    subject: "CFET",
    unitNo: 2,
    title: "Von Neumann Architecture & Bus Structure",
    caption: "Classic stored-program computer model uniting CPU (Control Unit, ALU, Registers), Main Memory, and I/O over shared Address, Data, and Control System Buses.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="300" y="24" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Von Neumann Computer Architecture Model</text>
      <!-- CPU Block -->
      <rect x="25" y="45" width="180" height="145" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="6"/>
      <text x="115" y="65" fill="#9e3512" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Central Processing Unit (CPU)</text>
      <!-- ALU -->
      <rect x="40" y="78" width="150" height="30" fill="#f6f0e1" stroke="#2b2a28" stroke-width="1.5" rx="4"/>
      <text x="115" y="98" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Arithmetic Logic Unit (ALU)</text>
      <!-- Control Unit -->
      <rect x="40" y="115" width="150" height="30" fill="#f6f0e1" stroke="#2b2a28" stroke-width="1.5" rx="4"/>
      <text x="115" y="135" fill="#1e6e67" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Control Unit (CU)</text>
      <!-- Registers -->
      <rect x="40" y="152" width="150" height="26" fill="#f6f0e1" stroke="#2b2a28" stroke-width="1.5" rx="4"/>
      <text x="115" y="169" fill="#555046" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Registers (PC, IR, MAR, MDR)</text>
      <!-- System Bus -->
      <rect x="235" y="65" width="130" height="105" fill="#e6dcc3" stroke="#2b2a28" stroke-width="2" rx="4"/>
      <text x="300" y="85" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">SYSTEM BUSES</text>
      <rect x="245" y="95" width="110" height="18" fill="#f6f0e1" stroke="#9e3512" stroke-width="1" rx="2"/>
      <text x="300" y="108" fill="#9e3512" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">Control Bus (Control)</text>
      <rect x="245" y="120" width="110" height="18" fill="#f6f0e1" stroke="#1e6e67" stroke-width="1" rx="2"/>
      <text x="300" y="133" fill="#1e6e67" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">Address Bus (Uni-dir)</text>
      <rect x="245" y="145" width="110" height="18" fill="#f6f0e1" stroke="#b8810b" stroke-width="1" rx="2"/>
      <text x="300" y="158" fill="#b8810b" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">Data Bus (Bi-dir)</text>
      <!-- Interconnect lines -->
      <path d="M 205 115 L 235 115" stroke="#2b2a28" stroke-width="2.5" marker-end="url(#arrow)"/>
      <path d="M 365 115 L 395 115" stroke="#2b2a28" stroke-width="2.5"/>
      <!-- Main Memory Block -->
      <rect x="395" y="45" width="180" height="68" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="6"/>
      <text x="485" y="70" fill="#1e6e67" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Primary Memory (RAM)</text>
      <text x="485" y="90" fill="#555046" font-size="10" text-anchor="middle" font-family="sans-serif">Stored Program + Data</text>
      <!-- I/O Block -->
      <rect x="395" y="122" width="180" height="68" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="6"/>
      <text x="485" y="147" fill="#b8810b" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Input / Output Units</text>
      <text x="485" y="167" fill="#555046" font-size="10" text-anchor="middle" font-family="sans-serif">Keyboard, Monitor, Storage</text>
      <!-- Footnote on bottleneck -->
      <text x="300" y="215" fill="#9e3512" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">⚠️ Von Neumann Bottleneck: CPU throughput is strictly bounded by shared Memory Bus bandwidth</text>
    </svg>`
  },

  // 13. Physics — Unit 3: He-Ne Gas Laser 4-Level Transition
  {
    id: "phy_u3_hene_laser",
    subjectCode: "100104",
    subject: "Physics",
    unitNo: 3,
    title: "Helium-Neon (He-Ne) 4-Level Laser Energy Scheme",
    caption: "Resonant energy transfer from excited Helium metastable states (20.61 eV) to Neon 3s level creates population inversion. Lasing occurs at 632.8 nm (red light) via stimulated emission.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="300" y="24" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Helium-Neon (He-Ne) Laser Energy Level Diagram (632.8 nm)</text>
      <!-- Helium Column -->
      <rect x="40" y="38" width="220" height="185" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5" rx="6"/>
      <text x="150" y="58" fill="#9e3512" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Helium Atom (He)</text>
      <!-- He levels -->
      <line x1="60" y1="200" x2="240" y2="200" stroke="#2b2a28" stroke-width="2.5"/>
      <text x="50" y="204" fill="#555046" font-size="10" font-weight="bold" text-anchor="end" font-family="sans-serif">Ground</text>
      <line x1="60" y1="85" x2="240" y2="85" stroke="#9e3512" stroke-width="2.5"/>
      <text x="50" y="89" fill="#9e3512" font-size="10" font-weight="bold" text-anchor="end" font-family="sans-serif">20.61 eV</text>
      <text x="150" y="80" fill="#9e3512" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">2¹S Metastable State</text>
      <!-- Electric discharge pumping arrow -->
      <path d="M 100 195 L 100 90" stroke="#9e3512" stroke-width="2" stroke-dasharray="3 3"/>
      <polygon points="100,85 96,93 104,93" fill="#9e3512"/>
      <text x="105" y="145" fill="#9e3512" font-size="9" font-family="sans-serif">e⁻ collision pump</text>
      <!-- Resonant Transfer Arrow -->
      <path d="M 230 85 L 340 85" stroke="#1e6e67" stroke-width="3"/>
      <polygon points="345,85 337,81 337,89" fill="#1e6e67"/>
      <text x="285" y="78" fill="#1e6e67" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Resonant Transfer</text>
      <!-- Neon Column -->
      <rect x="340" y="38" width="220" height="185" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5" rx="6"/>
      <text x="450" y="58" fill="#1e6e67" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Neon Atom (Ne)</text>
      <!-- Ne levels -->
      <line x1="360" y1="200" x2="540" y2="200" stroke="#2b2a28" stroke-width="2.5"/>
      <text x="548" y="204" fill="#555046" font-size="10" font-family="sans-serif">Ground (1p)</text>
      <line x1="360" y1="85" x2="540" y2="85" stroke="#1e6e67" stroke-width="2.5"/>
      <text x="548" y="89" fill="#1e6e67" font-size="10" font-weight="bold" font-family="sans-serif">3s (20.66 eV)</text>
      <line x1="360" y1="135" x2="540" y2="135" stroke="#2b2a28" stroke-width="2"/>
      <text x="548" y="139" fill="#2b2a28" font-size="10" font-family="sans-serif">2p (18.70 eV)</text>
      <line x1="360" y1="170" x2="540" y2="170" stroke="#555046" stroke-width="1.5"/>
      <text x="548" y="174" fill="#555046" font-size="10" font-family="sans-serif">1s (16.70 eV)</text>
      <!-- Lasing transition 3s to 2p -->
      <path d="M 430 90 L 430 130" stroke="#9e3512" stroke-width="3"/>
      <polygon points="430,135 426,127 434,127" fill="#9e3512"/>
      <text x="440" y="112" fill="#9e3512" font-size="11" font-weight="bold" font-family="sans-serif">λ = 632.8 nm (Red Laser)</text>
      <!-- Spontaneous decay 2p to 1s -->
      <path d="M 430 138 L 430 165" stroke="#555046" stroke-width="1.5" stroke-dasharray="2 2"/>
      <text x="440" y="153" fill="#555046" font-size="9" font-family="sans-serif">Spontaneous decay</text>
      <!-- Wall de-excitation 1s to ground -->
      <path d="M 430 173 L 430 195" stroke="#1e6e67" stroke-width="1.5"/>
      <text x="440" y="188" fill="#1e6e67" font-size="8.5" font-family="sans-serif">Tubewall collision</text>
    </svg>`
  },

  // 14. Physics — Unit 3: Optical Fiber TIR & Acceptance Angle
  {
    id: "phy_u3_fiber_optic",
    subjectCode: "100104",
    subject: "Physics",
    unitNo: 3,
    title: "Optical Fiber Total Internal Reflection (TIR) & Acceptance Cone",
    caption: "Light entering core within acceptance angle θ_a undergoes total internal reflection at the core-cladding interface. Numerical Aperture NA = √(n₁² - n₂²) measures light gathering power.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="300" y="24" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Step-Index Optical Fiber: TIR &amp; Acceptance Angle Geometry</text>
      <!-- Cladding Top -->
      <rect x="180" y="45" width="380" height="40" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5"/>
      <text x="370" y="70" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Cladding (Refractive Index n₂ = 1.48)</text>
      <!-- Core Center -->
      <rect x="180" y="85" width="380" height="70" fill="#f6f0e1" stroke="#2b2a28" stroke-width="2"/>
      <text x="370" y="125" fill="#1e6e67" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Core (Refractive Index n₁ = 1.50, where n₁ > n₂)</text>
      <!-- Cladding Bottom -->
      <rect x="180" y="155" width="380" height="40" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5"/>
      <text x="370" y="180" fill="#555046" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Cladding (n₂ = 1.48)</text>
      <!-- Axis of fiber -->
      <line x1="20" y1="120" x2="570" y2="120" stroke="#555046" stroke-width="1.5" stroke-dasharray="5 3"/>
      <!-- Acceptance Cone at entrance (left) -->
      <polygon points="30,80 180,120 30,160" fill="#b8810b" fill-opacity="0.15" stroke="#b8810b" stroke-width="1.5" stroke-dasharray="3 2"/>
      <text x="80" y="105" fill="#b8810b" font-size="10" font-weight="bold" font-family="sans-serif">θ_a</text>
      <!-- Incident Ray -->
      <path d="M 40 90 L 180 120" stroke="#9e3512" stroke-width="2.5"/>
      <!-- Refracted ray inside core -->
      <path d="M 180 120 L 290 85" stroke="#9e3512" stroke-width="2.5"/>
      <!-- TIR at interface -->
      <path d="M 290 85 L 430 155 L 540 85" stroke="#9e3512" stroke-width="2.5"/>
      <!-- Normal at TIR point -->
      <line x1="290" y1="65" x2="290" y2="105" stroke="#2b2a28" stroke-width="1" stroke-dasharray="2 2"/>
      <text x="300" y="80" fill="#9e3512" font-size="11" font-weight="bold" font-family="sans-serif">ϕ > ϕ_c (TIR)</text>
      <!-- Formulas footer -->
      <rect x="30" y="202" width="540" height="28" fill="#efe7d2" stroke="#2b2a28" stroke-width="1" rx="4"/>
      <text x="300" y="221" fill="#1e6e67" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">NA = √(n₁² - n₂²) = sin(θ_a) · Fractional index: Δ = (n₁ - n₂) / n₁ · Critical angle: ϕ_c = sin⁻¹(n₂/n₁)</text>
    </svg>`
  },

  // 15. Introduction to AI — Unit 1: PEAS Agent Architecture
  {
    id: "iai_u1_peas_agent",
    subjectCode: "100105",
    subject: "IAI",
    unitNo: 1,
    title: "PEAS Intelligent Agent & Environment Interaction Loop",
    caption: "The agent perceives its environment through sensors and acts upon it through actuators. The PEAS model defines: Performance Measure, Environment, Actuators, and Sensors.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="300" y="24" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">PEAS Intelligent Agent Architecture &amp; Environment Interaction</text>
      <!-- Agent Boundary Box -->
      <rect x="40" y="45" width="230" height="150" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="155" y="68" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">INTELLIGENT AGENT</text>
      <!-- Sensors block -->
      <rect x="60" y="80" width="190" height="28" fill="#f6f0e1" stroke="#1e6e67" stroke-width="1.5" rx="4"/>
      <text x="155" y="99" fill="#1e6e67" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Sensors (Percepts)</text>
      <!-- Agent Program / State -->
      <rect x="60" y="116" width="190" height="34" fill="#f6f0e1" stroke="#2b2a28" stroke-width="1.5" rx="4"/>
      <text x="155" y="132" fill="#2b2a28" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Agent Program f : P* → A</text>
      <text x="155" y="145" fill="#555046" font-size="9" text-anchor="middle" font-family="sans-serif">Performance Evaluation</text>
      <!-- Actuators block -->
      <rect x="60" y="158" width="190" height="28" fill="#f6f0e1" stroke="#b8810b" stroke-width="1.5" rx="4"/>
      <text x="155" y="177" fill="#b8810b" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Actuators (Actions)</text>
      <!-- Environment Box -->
      <rect x="330" y="60" width="230" height="120" fill="#e6dcc3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="445" y="90" fill="#1e6e67" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">ENVIRONMENT</text>
      <text x="445" y="115" fill="#2b2a28" font-size="10.5" text-anchor="middle" font-family="sans-serif">• Fully vs Partially Observable</text>
      <text x="445" y="132" fill="#2b2a28" font-size="10.5" text-anchor="middle" font-family="sans-serif">• Deterministic vs Stochastic</text>
      <text x="445" y="149" fill="#2b2a28" font-size="10.5" text-anchor="middle" font-family="sans-serif">• Static vs Dynamic · Discrete/Cont.</text>
      <!-- Arrow: Environment to Sensors (Percepts) -->
      <path d="M 330 94 L 255 94" stroke="#1e6e67" stroke-width="2.5"/>
      <polygon points="250,94 258,90 258,98" fill="#1e6e67"/>
      <text x="292" y="86" fill="#1e6e67" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Percepts</text>
      <!-- Arrow: Actuators to Environment (Actions) -->
      <path d="M 250 172 L 325 172" stroke="#b8810b" stroke-width="2.5"/>
      <polygon points="330,172 322,168 322,176" fill="#b8810b"/>
      <text x="290" y="165" fill="#b8810b" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Actions</text>
      <!-- PEAS breakdown footer -->
      <text x="300" y="215" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">P: Performance Measure · E: Environment · A: Actuators · S: Sensors</text>
    </svg>`
  },

  // 16. Introduction to AI — Unit 2: Search Tree Comparison (BFS, DFS, A*)
  {
    id: "iai_u2_search_trees",
    subjectCode: "100105",
    subject: "IAI",
    unitNo: 2,
    title: "State Space Search Trees (BFS vs DFS vs A*)",
    caption: "BFS searches layer-by-layer using FIFO queue (O(b^d) space). DFS explores depth-first using LIFO stack (O(bm) space). A* guides exploration using evaluation function f(n) = g(n) + h(n).",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="300" y="24" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Search Strategies: BFS (FIFO) vs DFS (LIFO) vs A* (Heuristic)</text>
      <!-- Root Node -->
      <circle cx="200" cy="55" r="16" fill="#efe7d2" stroke="#2b2a28" stroke-width="2"/>
      <text x="200" y="60" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">S</text>
      <!-- Level 1 Nodes -->
      <line x1="188" y1="67" x2="130" y2="105" stroke="#2b2a28" stroke-width="2"/>
      <line x1="212" y1="67" x2="270" y2="105" stroke="#2b2a28" stroke-width="2"/>
      <circle cx="130" cy="115" r="14" fill="#f6f0e1" stroke="#1e6e67" stroke-width="2"/>
      <text x="130" y="119" fill="#1e6e67" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">A</text>
      <circle cx="270" cy="115" r="14" fill="#f6f0e1" stroke="#2b2a28" stroke-width="2"/>
      <text x="270" y="119" fill="#2b2a28" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">B</text>
      <!-- Level 2 Nodes -->
      <line x1="120" y1="126" x2="80" y2="165" stroke="#2b2a28" stroke-width="1.5"/>
      <line x1="140" y1="126" x2="175" y2="165" stroke="#2b2a28" stroke-width="1.5"/>
      <circle cx="80" cy="175" r="12" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5"/>
      <text x="80" y="179" fill="#555046" font-size="10" text-anchor="middle" font-family="sans-serif">C</text>
      <circle cx="175" cy="175" r="12" fill="#1e6e67" fill-opacity="0.3" stroke="#1e6e67" stroke-width="2"/>
      <text x="175" y="179" fill="#1e6e67" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">G</text>
      <line x1="260" y1="126" x2="225" y2="165" stroke="#2b2a28" stroke-width="1.5"/>
      <line x1="280" y1="126" x2="315" y2="165" stroke="#2b2a28" stroke-width="1.5"/>
      <circle cx="225" cy="175" r="12" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5"/>
      <text x="225" y="179" fill="#555046" font-size="10" text-anchor="middle" font-family="sans-serif">D</text>
      <circle cx="315" cy="175" r="12" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5"/>
      <text x="315" y="179" fill="#555046" font-size="10" text-anchor="middle" font-family="sans-serif">E</text>
      <!-- BFS Horizontal layer wave -->
      <path d="M 40 115 L 340 115" stroke="#1e6e67" stroke-width="1.5" stroke-dasharray="3 3"/>
      <text x="35" y="119" fill="#1e6e67" font-size="9" font-weight="bold" font-family="sans-serif">BFS Level 1</text>
      <!-- Summary Table Right Box -->
      <rect x="365" y="45" width="215" height="175" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5" rx="6"/>
      <text x="472" y="65" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Search Algorithm Complexity</text>
      <text x="375" y="88" fill="#1e6e67" font-size="10" font-weight="bold" font-family="sans-serif">BFS (Breadth-First):</text>
      <text x="385" y="103" fill="#2b2a28" font-size="9.5" font-family="sans-serif">Time: O(b^d) · Space: O(b^d) [High]</text>
      <text x="385" y="118" fill="#2b2a28" font-size="9.5" font-family="sans-serif">Complete: Yes · Optimal: Yes (unit cost)</text>
      <text x="375" y="138" fill="#b8810b" font-size="10" font-weight="bold" font-family="sans-serif">DFS (Depth-First):</text>
      <text x="385" y="153" fill="#2b2a28" font-size="9.5" font-family="sans-serif">Time: O(b^m) · Space: O(bm) [Linear]</text>
      <text x="385" y="168" fill="#2b2a28" font-size="9.5" font-family="sans-serif">Complete: No · Optimal: No</text>
      <text x="375" y="188" fill="#9e3512" font-size="10" font-weight="bold" font-family="sans-serif">A* Search: f(n) = g(n) + h(n)</text>
      <text x="385" y="205" fill="#1e6e67" font-size="9.5" font-weight="bold" font-family="sans-serif">Optimal when h(n) is Admissible</text>
    </svg>`
  },

  // 17. Mathematics-I — Unit 1: Normal Form [Ir | 0] & Rank
  {
    id: "math1_u1_rank_normal",
    subjectCode: "100102",
    subject: "Math-I",
    unitNo: 1,
    title: "Matrix Canonical Normal Form [I_r | 0] & Rank Subspaces",
    caption: "Every matrix of rank r transforms through elementary row and column operations into normal form. Rouché-Capelli Theorem governs system consistency: ρ(A) = ρ(A|B).",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="300" y="24" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Matrix Rank ρ(A) &amp; Canonical Normal Form [I_r 0; 0 0]</text>
      <!-- Normal Form Matrix Block -->
      <rect x="50" y="50" width="200" height="150" fill="#efe7d2" stroke="#2b2a28" stroke-width="2" rx="6"/>
      <!-- I_r block -->
      <rect x="65" y="65" width="85" height="65" fill="#1e6e67" fill-opacity="0.2" stroke="#1e6e67" stroke-width="2" rx="4"/>
      <text x="107" y="103" fill="#1e6e67" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">I_r</text>
      <text x="107" y="120" fill="#1e6e67" font-size="9" text-anchor="middle" font-family="sans-serif">(r × r Identity)</text>
      <!-- Zero Block Top Right -->
      <rect x="155" y="65" width="80" height="65" fill="#f6f0e1" stroke="#2b2a28" stroke-width="1.5" stroke-dasharray="3 2"/>
      <text x="195" y="103" fill="#555046" font-size="16" text-anchor="middle" font-family="sans-serif">0</text>
      <!-- Zero Block Bottom Left -->
      <rect x="65" y="135" width="85" height="50" fill="#f6f0e1" stroke="#2b2a28" stroke-width="1.5" stroke-dasharray="3 2"/>
      <text x="107" y="165" fill="#555046" font-size="16" text-anchor="middle" font-family="sans-serif">0</text>
      <!-- Zero Block Bottom Right -->
      <rect x="155" y="135" width="80" height="50" fill="#f6f0e1" stroke="#2b2a28" stroke-width="1.5" stroke-dasharray="3 2"/>
      <text x="195" y="165" fill="#555046" font-size="16" text-anchor="middle" font-family="sans-serif">0</text>
      <!-- Operations labels -->
      <text x="150" y="42" fill="#2b2a28" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">PAQ = [I_r 0; 0 0] → Rank = r</text>
      <!-- System Consistency Box (Right) -->
      <rect x="290" y="45" width="270" height="175" fill="#efe7d2" stroke="#2b2a28" stroke-width="1.5" rx="6"/>
      <text x="425" y="68" fill="#9e3512" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Rouché-Capelli System Consistency: AX = B</text>
      <!-- Condition 1 -->
      <rect x="305" y="80" width="240" height="32" fill="#f6f0e1" stroke="#9e3512" stroke-width="1.5" rx="4"/>
      <text x="315" y="96" fill="#9e3512" font-size="10" font-weight="bold" font-family="sans-serif">1. ρ(A) ≠ ρ(A|B) → Inconsistent</text>
      <text x="315" y="108" fill="#555046" font-size="9" font-family="sans-serif">No solution exists (parallel hyperplanes)</text>
      <!-- Condition 2 -->
      <rect x="305" y="120" width="240" height="32" fill="#f6f0e1" stroke="#1e6e67" stroke-width="1.5" rx="4"/>
      <text x="315" y="136" fill="#1e6e67" font-size="10" font-weight="bold" font-family="sans-serif">2. ρ(A) = ρ(A|B) = n (unknowns)</text>
      <text x="315" y="148" fill="#555046" font-size="9" font-family="sans-serif">Unique solution (Cramer's rule holds)</text>
      <!-- Condition 3 -->
      <rect x="305" y="160" width="240" height="42" fill="#f6f0e1" stroke="#b8810b" stroke-width="1.5" rx="4"/>
      <text x="315" y="176" fill="#b8810b" font-size="10" font-weight="bold" font-family="sans-serif">3. ρ(A) = ρ(A|B) = r &lt; n</text>
      <text x="315" y="190" fill="#555046" font-size="9" font-family="sans-serif">Infinitely many solutions (n - r free variables)</text>
    </svg>`
  },

  // 18. Universal Human Values — Unit 3: Harmony in Nature (4 Orders)
  {
    id: "uhv_u3_nature_harmony",
    subjectCode: "100109",
    subject: "UHV",
    unitNo: 3,
    title: "Harmony in Nature: Mutual Fulfillment of the 4 Orders",
    caption: "The four orders in nature (Material, Bio, Animal, Human) are naturally interconnected by mutual fulfillment (Parasparta). Human beings must live with right understanding to complete recyclability.",
    svg: `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="600" height="240" fill="#fcfaf3" stroke="#2b2a28" stroke-width="2" rx="8"/>
      <text x="300" y="24" fill="#9e3512" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Cyclic Harmony in Nature: Mutual Fulfillment (Parasparta)</text>
      <!-- 4 Order Circles -->
      <!-- Order 1: Material -->
      <circle cx="100" cy="115" r="42" fill="#efe7d2" stroke="#2b2a28" stroke-width="2"/>
      <text x="100" y="105" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Material Order</text>
      <text x="100" y="120" fill="#555046" font-size="9" text-anchor="middle" font-family="sans-serif">Padartha Avastha</text>
      <text x="100" y="133" fill="#2b2a28" font-size="8.5" text-anchor="middle" font-family="sans-serif">Soil, Water, Air</text>
      <!-- Order 2: Plant / Bio -->
      <circle cx="235" cy="65" r="42" fill="#efe7d2" stroke="#1e6e67" stroke-width="2"/>
      <text x="235" y="55" fill="#1e6e67" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Pranic / Bio</text>
      <text x="235" y="70" fill="#555046" font-size="9" text-anchor="middle" font-family="sans-serif">Prana Avastha</text>
      <text x="235" y="83" fill="#2b2a28" font-size="8.5" text-anchor="middle" font-family="sans-serif">Plants, Trees, Crops</text>
      <!-- Order 3: Animal -->
      <circle cx="370" cy="115" r="42" fill="#efe7d2" stroke="#b8810b" stroke-width="2"/>
      <text x="370" y="105" fill="#b8810b" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Animal Order</text>
      <text x="370" y="120" fill="#555046" font-size="9" text-anchor="middle" font-family="sans-serif">Jeeva Avastha</text>
      <text x="370" y="133" fill="#2b2a28" font-size="8.5" text-anchor="middle" font-family="sans-serif">Animals, Birds</text>
      <!-- Order 4: Human -->
      <circle cx="505" cy="115" r="42" fill="#f6f0e1" stroke="#9e3512" stroke-width="2.5"/>
      <text x="505" y="105" fill="#9e3512" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Human Order</text>
      <text x="505" y="120" fill="#555046" font-size="9" text-anchor="middle" font-family="sans-serif">Jnana Avastha</text>
      <text x="505" y="133" fill="#1e6e67" font-size="8.5" font-weight="bold" text-anchor="middle" font-family="sans-serif">Right Understanding</text>
      <!-- Interconnecting arrows -->
      <path d="M 142 110 L 195 78" stroke="#1e6e67" stroke-width="2"/>
      <path d="M 275 78 L 330 105" stroke="#b8810b" stroke-width="2"/>
      <path d="M 412 115 L 460 115" stroke="#9e3512" stroke-width="2"/>
      <!-- Cyclic feedback return loop -->
      <path d="M 505 160 C 420 220, 180 220, 100 160" stroke="#1e6e67" stroke-width="2.5" stroke-dasharray="4 2"/>
      <text x="300" y="195" fill="#1e6e67" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mutual Enrichment &amp; Cyclic Recyclability</text>
      <text x="300" y="222" fill="#555046" font-size="10" text-anchor="middle" font-family="sans-serif">Inherent Natural Property: Composition / Decomposition &amp; Self-Regulation</text>
    </svg>`
  },
];
