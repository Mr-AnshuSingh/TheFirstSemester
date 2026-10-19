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

export const PHY_UNIT2_TOPICS: Record<string, TopicContent> = {
  'phy:2:0': {
    explain: [
      'An electric charge alters the space surrounding it, creating an electric field that exerts electrostatic force on other charges.',
      'Gauss’ law counts the total outward electric field flux passing through any closed imaginary surface and proves it equals the total enclosed charge divided by ε₀.',
    ],
    definition:
      'Gauss’ law of electrostatics states that the total outward electric flux through any closed Gaussian surface in free space is equal to 1/ε₀ times the net electric charge enclosed within that surface.',
    formula: '\\oint_S \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enclosed}}}{\\varepsilon_0} \\quad \\iff \\quad \\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0}',
    steps: [
      'Define electric field E = F / q (force per unit positive test charge).',
      'Electric flux through surface element dA is dΦ = E · dA = E dA cos θ.',
      'Choose a symmetric Gaussian surface (spherical for point charge, cylindrical for line charge, pillbox for sheet).',
      'By symmetry, electric field magnitude E is uniform over the surface and parallel to dA: ∮ E · dA = E · A.',
      'Equate E · A = Q_enc / ε₀ and solve for field E (e.g., for sphere: E · 4πr² = q / ε₀ ⇒ E = q / (4πε₀r²)).',
    ],
    examAnswer: [
      'State Gauss’ law in integral and differential form: ∮ E · dA = Q_enc / ε₀ and ∇ · E = ρ / ε₀.',
      'Derive Coulomb’s inverse-square law directly from Gauss’ law using a spherical Gaussian surface.',
      'State applications: field due to infinite line charge (E = λ / 2πε₀r) and infinite plane sheet (E = σ / 2ε₀).',
      'Explain why the electric field inside a hollow charged conductor in electrostatic equilibrium is zero.',
    ],
    slip: 'Forgetting that Gauss’ law applies only to closed surfaces (a 2D disk or open hemisphere cannot enclose a charge).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'GAUSS’ LAW (SPHERICAL SYMMETRY)', 'ta') +
        C(180, 95, 60, 'd') +
        T(180, 170, 'Gaussian Surface (radius r)', 't', 'middle') +
        C(180, 95, 8, 'fa') +
        T(180, 99, '+Q', 'ta', 'middle') +
        LA(180, 95, 180, 20) + LA(180, 95, 180, 165) +
        LA(180, 95, 95, 95) + LA(180, 95, 260, 95) +
        LA(180, 95, 120, 35) + LA(180, 95, 240, 155) +
        T(255, 85, 'Flux dΦ = E · dA', 'ta') +
        T(20, 182, '∮_S E · dA = Q_enc / ε₀   →   E(4πr²) = Q / ε₀   →   E = Q / (4πε₀r²)', 'ta')
      ),
      caption: 'Gauss’ law applied to a spherical Gaussian surface enclosing a central point charge Q.',
    },
  },
  'phy:2:1': {
    explain: [
      'A dielectric is an electrical insulator whose molecules stretch into microscopic dipoles when placed inside an electric field.',
      'These induced dipoles create an opposing internal field that weakens the total field, allowing capacitors with dielectrics to store far more charge.',
    ],
    definition:
      'Gauss’ law in dielectric media states that the total flux of the electric displacement vector D through any closed surface equals only the free charge enclosed, eliminating the need to explicitly calculate bound polarization charges.',
    formula: '\\oint_S \\vec{D} \\cdot d\\vec{A} = Q_{\\text{free}}, \\quad \\vec{D} = \\varepsilon_0 \\vec{E} + \\vec{P} = \\varepsilon \\vec{E}, \\quad C = K C_0',
    steps: [
      'An applied electric field E₀ polarizes dielectric atoms, displacing positive nuclei and electron clouds to form dipole moments p = q d.',
      'Polarization vector P is defined as dipole moment per unit volume: P = N p = ε₀ χ_e E.',
      'Polarization induces bound surface charge density σ_b = P · n̂, which generates an opposing internal field E_p = P / ε₀.',
      'Net field inside dielectric is reduced: E = E₀ - E_p = E₀ / K (where K = 1 + χ_e is the dielectric constant).',
      'Electric displacement D combines free and bound effects: D = ε₀ E + P = ε E. Gauss’ law simplifies to ∮ D · dA = Q_free.',
      'Capacitance increases by dielectric constant: C = K C₀ = K (ε₀ A / d).',
    ],
    examAnswer: [
      'Define Polarization vector P, Electric Displacement D, and Electric Susceptibility χ_e.',
      'Derive the fundamental constitutive relation: D = ε₀ E + P = ε₀(1 + χ_e)E = ε E.',
      'Write Gauss’ law in dielectric media in both integral (∮ D · dA = Q_free) and differential (∇ · D = ρ_free) forms.',
      'Explain how inserting a dielectric increases capacitor charge storage capacity by factor K.',
    ],
    slip: 'Confusing free charge Q_free (conducted onto metal plates by a battery) with bound polarization charge Q_bound (induced in dielectric atoms).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'DIELECTRIC POLARIZATION & CAPACITANCE', 'ta') +
        R(50, 45, 12, 100, 'l') + T(40, 95, '+σ', 'ta') +
        R(290, 45, 12, 100, 'l') + T(310, 95, '−σ', 'ta') +
        R(85, 50, 185, 90, 'fa') +
        T(135, 70, 'Dielectric (K = ε/ε₀)', 'ta') +
        T(100, 95, '+ -  + -  + -', 't') +
        T(100, 115, '+ -  + -  + -', 't') +
        LA(70, 60, 280, 60) + T(150, 55, 'Applied E₀', 't') +
        LA(260, 130, 95, 130) + T(150, 140, 'Internal E_p (bound)', 'ta') +
        T(20, 180, 'D = ε₀E + P = εE   |   E_net = E₀ / K   |   Capacitance C = K C₀', 'ta')
      ),
      caption: 'Dielectric polarization: molecular dipoles align to weaken internal field E_net and multiply capacitance by K.',
    },
  },
  'phy:2:2': {
    explain: [
      'A magnetic field is the region of magnetic force created by moving electric charges or electric currents.',
      'Because magnetic poles always come in north-south pairs and never as isolated single charges (monopoles), magnetic field lines form endless closed loops.',
    ],
    definition:
      'A magnetic field is a vector field B produced by moving electric currents or time-varying electric fields that exerts a Lorentz force F = q(v × B) on moving charges, with zero net divergence (no magnetic monopoles).',
    formula: '\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B}) \\quad \\text{and} \\quad \\oint_S \\vec{B} \\cdot d\\vec{A} = 0 \\iff \\nabla \\cdot \\vec{B} = 0',
    steps: [
      'Moving charge q with velocity v experiences magnetic Lorentz force F = q(v × B).',
      'Current-carrying wire element dl generates magnetic field dB via Biot-Savart law: dB = (μ₀ / 4π) (I dl × r̂) / r².',
      'For infinite straight conductor: B = μ₀ I / (2πr).',
      'Gauss’ law for magnetism: total magnetic flux through any closed surface is always zero (∮ B · dA = 0), proving magnetic monopoles do not exist.',
      'Work done by magnetic force on a free charge is strictly zero because F_B is always perpendicular to velocity v (F_B · v = 0).',
    ],
    examAnswer: [
      'State Lorentz force equation: F = q(E + v × B) and explain why magnetic force cannot change particle kinetic energy (only bends trajectory).',
      'State Biot-Savart law with vector equation and unit vector definition.',
      'Explain Gauss’ law for magnetism: ∮ B · dA = 0 (or ∇ · B = 0) and state its physical meaning (magnetic field lines have no start or end; no monopoles).',
    ],
    slip: 'Believing that a static magnetic field can speed up or slow down a charged particle. Since F ⊥ v, magnetic force does zero work (dW = F · dr = 0).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'MAGNETIC FIELD & ZERO MONOPOLES', 'ta') +
        R(130, 75, 100, 40, 'l') +
        R(130, 75, 50, 40, 'fa') +
        T(150, 100, 'N', 'ta') + T(205, 100, 'S', 't') +
        P('M150 75 C150 30 205 30 205 75', 'l') +
        P('M150 115 C150 160 205 160 205 115', 'l') +
        C(90, 95, 30, 'd') +
        T(40, 140, 'Closed surface S', 't') +
        T(20, 180, '∮_S B · dA = 0   (Lines form continuous loops; magnetic monopoles do not exist)', 'ta')
      ),
      caption: 'Magnetic field loops: flux entering any closed surface equals flux exiting, establishing ∇ · B = 0.',
    },
  },
  'phy:2:3': {
    explain: [
      'All materials react to magnetic fields depending on how their atomic electrons spin and orbit.',
      'Diamagnetic materials weakly repel fields, paramagnetic materials weakly attract fields, and ferromagnetic materials strongly snap into alignment, retaining magnetization.',
    ],
    definition:
      'Magnetic materials are classified into diamagnetic (negative susceptibility χ_m < 0), paramagnetic (small positive χ_m > 0), and ferromagnetic (large positive χ_m >> 1 with hysteresis) based on their atomic dipole alignment.',
    formula: '\\vec{B} = \\mu_0 (\\vec{H} + \\vec{M}) = \\mu_r \\mu_0 \\vec{H}, \\quad \\chi_m = \\frac{M}{H} = \\mu_r - 1',
    steps: [
      'Diamagnetism: atoms have paired electrons with zero net orbital dipole; an applied field induces opposing Lenz dipoles; χ_m is small, negative (~-10⁻⁵) and temperature-independent (Bi, Cu, H₂O).',
      'Paramagnetism: atoms possess permanent magnetic moments that point randomly due to thermal agitation; applied field weakly aligns them; χ_m is small, positive and obeys Curie’s law χ_m = C / T (Al, Pt, O₂).',
      'Ferromagnetism: strong quantum exchange interactions align atomic dipoles into magnetic domains; applied field easily aligns all domains; exhibits saturation and hysteresis (Fe, Co, Ni).',
      'Above the Curie temperature T_c, ferromagnetic domain order collapses into paramagnetic behavior.',
    ],
    examAnswer: [
      'Draw the comparative table: Diamagnetic vs Paramagnetic vs Ferromagnetic across 5 criteria (net atomic dipole, χ_m value, μ_r range, effect of temperature, behavior in non-uniform field).',
      'Draw the B-H hysteresis curve for ferromagnetic materials, labeling Retentivity (remanence B_r) and Coercivity (H_c).',
      'State Curie-Weiss law for ferromagnets above T_c: χ_m = C / (T - T_c).',
      'Differentiate soft magnetic materials (narrow hysteresis loop, low coercivity, for transformer cores) vs hard magnetic materials (wide loop, high coercivity, for permanent magnets).',
    ],
    slip: 'Saying diamagnetism depends on temperature. Diamagnetism is an orbital electromagnetic induction effect independent of thermal fluctuations.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'FERROMAGNETIC B-H HYSTERESIS LOOP', 'ta') +
        L(40, 95, 320, 95, 'l') + L(180, 20, 180, 170, 'l') +
        T(325, 100, 'H', 't') + T(185, 25, 'B', 't') +
        P('M180 95 Q230 90 280 40 L260 40 Q180 50 180 60 Q180 75 140 95 Q100 115 80 150 L100 150 Q180 140 180 130 Q180 115 220 95 Q260 75 280 40', 'ta') +
        T(185, 55, 'Retentivity (B_r)', 't') +
        T(100, 85, 'Coercivity (H_c)', 't') +
        T(20, 180, 'B = μ₀(H + M)   |   Retentivity = residual field   |   Coercivity = reverse field to demagnetize', 'ta')
      ),
      caption: 'Ferromagnetic B-H hysteresis loop showing domain saturation, retentivity (residual B_r), and coercivity (H_c).',
    },
  },
  'phy:2:4': {
    explain: [
      'James Clerk Maxwell unified all of electricity, magnetism, and optics into four master equations.',
      'By realizing that a changing electric field creates an invisible displacement current just like a wire carrying electrons, he proved light is an electromagnetic wave.',
    ],
    definition:
      'Maxwell’s equations in integral form are the four fundamental laws that govern classical electrodynamics, relating electric and magnetic fields to charge distributions, conduction currents, and time-varying field fluxes.',
    formula: '\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q}{\\varepsilon_0}, \\ \\oint \\vec{B} \\cdot d\\vec{A} = 0, \\ \\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi_B}{dt}, \\ \\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0\\left(I_c + \\varepsilon_0 \\frac{d\\Phi_E}{dt}\\right)',
    steps: [
      '1st (Gauss’ Law for Electricity): ∮ E · dA = Q_enc / ε₀ (Electric charges act as sources/sinks of electric field).',
      '2nd (Gauss’ Law for Magnetism): ∮ B · dA = 0 (No magnetic monopoles exist; magnetic field lines are continuous).',
      '3rd (Faraday’s Law of Induction): ∮ E · dl = -dΦ_B / dt (A time-varying magnetic flux induces a non-conservative electric field).',
      '4th (Ampere-Maxwell Law): ∮ B · dl = μ₀(I_c + I_d) where displacement current I_d = ε₀ dΦ_E / dt (A conduction current or changing electric flux induces a circulating magnetic field).',
      'Maxwell resolved Ampere’s capacitor contradiction: between charging capacitor plates, I_c = 0 but I_d = ε₀ d(E·A)/dt = dq/dt, maintaining total current continuity.',
    ],
    examAnswer: [
      'Write all four Maxwell equations in both integral and differential forms in standard table format.',
      'Explain Maxwell’s modification of Ampere’s law by detailing the capacitor charging paradox.',
      'Define displacement current density: J_d = ε₀ ∂E / ∂t.',
      'Explain physical meaning of each equation: Gauss-E (charge sources), Gauss-B (monopoles absent), Faraday (magnetic induction), Ampere-Maxwell (displacement current).',
    ],
    slip: 'Writing Ampere’s law without Maxwell’s displacement current term ε₀ dΦ_E / dt. Without this term, electromagnetic wave propagation is mathematically impossible.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'MAXWELL’S EQUATIONS & DISPLACEMENT CURRENT', 'ta') +
        R(80, 50, 10, 80, 'l') + R(160, 50, 10, 80, 'l') +
        LA(20, 90, 80, 90) + T(30, 80, 'I_c (wire)', 't') +
        LA(170, 90, 230, 90) + T(185, 80, 'I_c', 't') +
        LA(90, 90, 160, 90) + T(95, 75, 'I_d = ε₀ ∂E/∂t', 'ta') +
        T(100, 115, 'Capacitor gap', 't') +
        T(250, 55, '1. ∮E·dA = Q/ε₀', 't') +
        T(250, 80, '2. ∮B·dA = 0', 't') +
        T(250, 105, '3. ∮E·dl = −∂Φ_B/∂t', 't') +
        T(250, 130, '4. ∮B·dl = μ₀(I_c + I_d)', 'ta') +
        T(20, 180, 'Maxwell unified electricity, magnetism & optics: light speed c = 1 / √(μ₀ε₀)', 'ta')
      ),
      caption: 'Maxwell’s four integral laws and displacement current bridging the capacitor gap.',
    },
  },
  'phy:2:5': {
    explain: [
      'An electromagnetic wave is a self-sustaining traveling wave where oscillating electric and magnetic fields continuously regenerate each other.',
      'Electric and magnetic fields vibrate at 90 degrees to each other and 90 degrees to the direction of motion, speeding through the vacuum of space at 300,000 km/s.',
    ],
    definition:
      'An electromagnetic wave is a transverse, self-propagating wave composed of mutually orthogonal, oscillating electric and magnetic field vectors that propagate through vacuum at the speed of light c = 1/√(μ₀ε₀).',
    formula: 'c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} \\approx 3 \\times 10^8 \\text{ m/s}, \\quad E_0 = c B_0, \\quad \\frac{E}{B} = c',
    steps: [
      'Take curl of Faraday’s law: ∇ × (∇ × E) = -∂(∇ × B)/∂t.',
      'Use vector identity ∇ × (∇ × E) = ∇(∇·E) - ∇²E and substitute Maxwell’s vacuum equations (∇·E = 0 and ∇×B = μ₀ε₀ ∂E/∂t).',
      'Resulting wave equation: ∇²E = μ₀ε₀ ∂²E / ∂t², matching classical wave equation ∇²E = (1/v²) ∂²E / ∂t².',
      'Wave speed in vacuum is c = 1 / √(μ₀ε₀) = 2.998 × 10⁸ m/s, proving that light is an electromagnetic wave.',
      'Transverse nature: both E and B vectors are perpendicular to wave propagation vector k (E · k = 0, B · k = 0, E ⊥ B).',
    ],
    examAnswer: [
      'Derive the EM wave equation ∇²E - μ₀ε₀ ∂²E/∂t² = 0 from Maxwell’s equations in free space.',
      'Derive the velocity expression c = 1/√(μ₀ε₀) and calculate numerical value using μ₀ = 4π×10⁻⁷ and ε₀ = 8.854×10⁻¹².',
      'Draw the 3D wave diagram showing transverse orthogonal oscillations of E (y-axis) and B (z-axis) propagating along x-axis.',
      'State relation between peak amplitudes: E₀ / B₀ = c.',
    ],
    slip: 'Thinking EM waves require a physical medium like sound waves. EM waves travel through complete vacuum because fluctuating E and B fields sustain each other.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'TRANSVERSE ELECTROMAGNETIC WAVE', 'ta') +
        LA(30, 100, 330, 100) + T(335, 105, 'x (c)', 't') +
        LA(30, 100, 30, 20) + T(35, 25, 'y (E)', 'ta') +
        LA(30, 100, 10, 150) + T(15, 155, 'z (B)', 't') +
        P('M30 100 Q75 40 120 100 T210 100 T300 100', 'ta') +
        P('M30 100 Q75 130 120 100 T210 100 T300 100', 'l') +
        T(85, 55, 'E-field', 'ta') +
        T(85, 135, 'B-field', 't') +
        T(20, 180, 'E ⊥ B ⊥ k   |   Wave speed in vacuum: c = 1 / √(μ₀ε₀) = 3 × 10⁸ m/s   |   E = cB', 'ta')
      ),
      caption: 'Transverse electromagnetic wave: orthogonal electric field E and magnetic field B propagating along x.',
    },
  },
  'phy:2:6': {
    explain: [
      'Electromagnetic waves carry not just signals, but genuine physical energy across space.',
      'The Poynting vector calculates both the direction in which EM energy streams and the exact power pouring through each square meter of space.',
    ],
    definition:
      'The Poynting vector S represents the directional energy flux density (power per unit area) of an electromagnetic field, defined as the cross product of the electric and magnetic field vectors.',
    formula: '\\vec{S} = \\vec{E} \\times \\vec{H} = \\frac{1}{\\mu_0} (\\vec{E} \\times \\vec{B}), \\quad \\langle S \\rangle = \\frac{1}{2} \\varepsilon_0 c E_0^2 = \\frac{E_0^2}{2\\mu_0 c}',
    steps: [
      'Poynting theorem represents the conservation of energy for electrodynamics: -∂u/∂t = ∇ · S + J · E.',
      'Energy density of EM field: u = ½ ε₀ E² + ½ (1/μ₀) B².',
      'Work done on charges per unit volume is J · E (Ohmic heating / mechanical work).',
      '∇ · S represents the rate at which electromagnetic energy flows out of a closed volume.',
      'For plane harmonic wave E = E₀ cos(kx - ωt) and B = B₀ cos(kx - ωt): instantaneous S = (E₀ B₀ / μ₀) cos²(kx - ωt).',
      'Time-average Poynting flux: ⟨S⟩ = ½ (E₀ B₀ / μ₀) = ½ ε₀ c E₀² [W/m²].',
    ],
    examAnswer: [
      'State and prove Poynting’s theorem starting from Maxwell’s curl equations.',
      'Write Poynting vector formula S = E × H [W/m²] and state its physical significance.',
      'Derive the time-average energy flux formula for plane waves: ⟨S⟩ = ½ ε₀ c E₀².',
      'Explain Poynting vector direction in a DC current-carrying resistor (points radially inward, showing energy flows from field into wire as heat).',
    ],
    slip: 'Writing unit of Poynting vector as Joules instead of Watts per square meter (W/m² = J/(s·m²)).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'POYNTING VECTOR & ENERGY FLUX', 'ta') +
        LA(100, 100, 100, 30) + T(110, 40, 'E-field (y)', 'ta') +
        LA(100, 100, 30, 140) + T(35, 150, 'H-field (z)', 't') +
        LA(100, 100, 260, 100) + T(265, 95, 'S = E × H  (Energy Flow [W/m²])', 'ta') +
        R(180, 120, 160, 45, 'fa') +
        T(190, 138, '⟨S⟩ = ½ ε₀ c E₀²', 't') +
        T(190, 155, '= E₀² / (2 η₀)', 'ta') +
        T(20, 180, 'Poynting Theorem: −∂u/∂t = ∇·S + J·E (Energy conservation in EM fields)', 'ta')
      ),
      caption: 'Poynting vector S = E × H pointing in the direction of electromagnetic power transport.',
    },
  },
};
