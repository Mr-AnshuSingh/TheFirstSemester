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

export const PHY_UNIT1_TOPICS: Record<string, TopicContent> = {
  'phy:1:0': {
    explain: [
      'Normal light sources like incandescent bulbs emit photons randomly in all directions, colors, and phases.',
      'Laser light is extraordinary because all photons march together in lockstep: identical color, zero divergence, and perfect temporal/spatial phase.',
    ],
    definition:
      'Laser (Light Amplification by Stimulated Emission of Radiation) light is an intense optical beam characterized by high monochromaticity, high coherence, extreme directionality, and high brightness.',
    formula: '\\Delta\\nu \\to 0, \\quad \\text{Divergence } \\theta = 1.22 \\frac{\\lambda}{d}, \\quad \\text{Coherence length } L_c = \\frac{c}{\\Delta\\nu}',
    steps: [
      'Monochromaticity: emission occurs over an ultra-narrow spectral bandwidth Δλ ≈ 10⁻⁴ Å.',
      'Coherence: temporal coherence (constant phase over time, long L_c) and spatial coherence (constant phase across wavefront).',
      'Directionality: minimal beam divergence (divergence angle θ ≈ 10⁻³ radians) allowing travel to the Moon with minimal spreading.',
      'High Brightness / Intensity: massive power density focused into tiny spatial cross-sections.',
    ],
    examAnswer: [
      'List the 4 distinctive characteristics: Monochromaticity, Coherence, Directionality, Brightness.',
      'Contrast ordinary light (spontaneous, incoherent, divergent, broad spectrum) vs laser light (stimulated, coherent, parallel, ultra-narrow).',
      'Define coherence length L_c = c / Δν and state why coherence is crucial for holography and interferometry.',
    ],
    slip: 'Confusing temporal coherence (correlation between wave at time t and t+τ) with spatial coherence (correlation across different points on wavefront).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'ORDINARY LIGHT VS LASER BEAM', 'ta') +
        T(30, 45, 'Ordinary Bulb: Incoherent, Multi-λ', 't') +
        C(60, 95, 16, 'l') +
        LA(60, 95, 20, 70) + LA(60, 95, 20, 120) + LA(60, 95, 100, 70) + LA(60, 95, 100, 120) +
        T(200, 45, 'Laser: Coherent, Single-λ, Collimated', 'ta') +
        L(170, 75, 330, 75, 'ta') +
        L(170, 95, 330, 95, 'ta') +
        L(170, 115, 330, 115, 'ta') +
        P('M180 75 Q195 60 210 75 T240 75 T270 75 T300 75', 'a') +
        P('M180 95 Q195 80 210 95 T240 95 T270 95 T300 95', 'a') +
        P('M180 115 Q195 100 210 115 T240 115 T270 115 T300 115', 'a') +
        T(20, 175, 'Lockstep in-phase wave packets yield high coherence and extreme focus.', 'ta')
      ),
      caption: 'Ordinary divergent multi-phase emission vs laser collimated, in-phase coherent beam.',
    },
  },
  'phy:1:1': {
    explain: [
      'Einstein showed that light interacts with atoms in three ways: absorption, spontaneous emission, and stimulated emission.',
      'Stimulated emission is the secret of lasers: an incoming photon coaxes an excited atom to emit an exact duplicate twin photon.',
    ],
    definition:
      'Einstein’s A and B coefficients quantify the transition probabilities per unit time of spontaneous emission (A₂₁), stimulated absorption (B₁₂), and stimulated emission (B₂₁) between two atomic energy levels.',
    formula: 'B_{12} = B_{21} \\quad \\text{and} \\quad \\frac{A_{21}}{B_{21}} = \\frac{8\\pi h \\nu^3}{c^3}',
    steps: [
      'Rate of stimulated absorption: R_abs = N₁ B₁₂ u(ν).',
      'Rate of spontaneous emission: R_spon = N₂ A₂₁ (occurs without radiation field).',
      'Rate of stimulated emission: R_stim = N₂ B₂₁ u(ν).',
      'In thermal equilibrium: N₁ B₁₂ u(ν) = N₂ A₂₁ + N₂ B₂₁ u(ν).',
      'Solve for energy density: u(ν) = (A₂₁ / B₂₁) / [ (N₁/N₂)(B₁₂/B₂₁) - 1 ].',
      'Substitute Boltzmann distribution N₁/N₂ = e^{hν/kT} and compare with Planck’s law u(ν) = (8πhν³/c³) / (e^{hν/kT} - 1).',
      'Equating yields B₁₂ = B₂₁ and A₂₁ / B₂₁ = 8πhν³ / c³.',
    ],
    examAnswer: [
      'Define the 3 interaction processes with clear two-level energy diagrams (E₁ and E₂).',
      'Write the thermal equilibrium balance equation: N₁ B₁₂ u(ν) = N₂ [A₂₁ + B₂₁ u(ν)].',
      'Show full step-by-step comparison with Planck’s radiation formula.',
      'State both Einstein relations: B₁₂ = B₂₁ and A₂₁ / B₂₁ = 8πhν³ / c³.',
      'Highlight that ratio of spontaneous to stimulated emission is e^{hν/kT} - 1 (optical domain favors spontaneous at room temp, necessitating pumping).',
    ],
    slip: 'Forgetting that spontaneous emission rate depends only on N₂ and does NOT depend on radiation energy density u(ν).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'EINSTEIN’S THREE PROCESSES', 'ta') +
        L(30, 60, 110, 60, 'l') + L(30, 130, 110, 130, 'l') +
        T(30, 50, 'E₂', 't') + T(30, 145, 'E₁', 't') +
        C(70, 130, 5, 'fa') + LA(70, 130, 70, 70) + T(45, 100, 'hν', 'ta') +
        T(40, 165, 'Absorption', 't') +
        L(140, 60, 220, 60, 'l') + L(140, 130, 220, 130, 'l') +
        C(180, 60, 5, 'fa') + LA(180, 60, 180, 120) + LA(185, 95, 225, 95) +
        T(145, 165, 'Spontaneous A₂₁', 't') +
        L(250, 60, 330, 60, 'l') + L(250, 130, 330, 130, 'l') +
        C(290, 60, 5, 'fa') + LA(245, 75, 285, 75) + LA(290, 60, 290, 120) +
        LA(290, 75, 335, 75) + LA(290, 95, 335, 95) +
        T(250, 165, 'Stimulated B₂₁', 'ta') +
        T(20, 185, 'B₁₂ = B₂₁   |   A₂₁ / B₂₁ = 8πhν³ / c³ (Identical coherent photons)', 'ta')
      ),
      caption: 'Three radiative processes: absorption, random spontaneous emission, and coherent stimulated emission.',
    },
  },
  'phy:1:2': {
    explain: [
      'In normal matter at room temperature, almost all atoms sit in the low-energy ground state.',
      'To make a laser, we must pump energy into the system until more atoms occupy the higher excited state than the lower one—this inverted state is population inversion.',
    ],
    definition:
      'Population inversion is a non-equilibrium state of a medium in which the population density of an upper energy level (N₂) exceeds that of a lower energy level (N₁), i.e., N₂ > N₁.',
    formula: 'N_2 > N_1 \\quad \\implies \\quad \\frac{N_2}{N_1} = e^{-\\Delta E / kT} > 1 \\quad (T < 0 \\text{ effective negative temperature})',
    steps: [
      'In thermal equilibrium, Boltzmann statistics dictate N₂ = N₁ e^{-(E₂ - E₁)/kT} < N₁.',
      'Since N₁ > N₂, absorption normally dominates stimulated emission.',
      'To achieve N₂ > N₁, external energy must be supplied by a pumping mechanism (optical, electrical discharge, chemical).',
      'A metastable state with a long lifetime (τ ≈ 10⁻³ s vs normal 10⁻⁸ s) is essential to accumulate atoms in level E₂.',
      'Three-level and four-level energy schemes enable sustained population inversion.',
    ],
    examAnswer: [
      'Define population inversion and explain why it cannot be achieved in a two-level system under steady-state (pumping and stimulated emission balance at N₁ = N₂).',
      'Explain the role of a metastable state (acts as a storage reservoir due to forbidden transitions).',
      'Describe optical pumping (xenon flash lamp in ruby) and electrical discharge (electron collision in He-Ne).',
      'Explain why a 4-level laser is far more efficient than a 3-level laser (lower laser level E₁ is empty, requiring less pumping power).',
    ],
    slip: 'Assuming population inversion is possible in a simple two-level system under continuous pumping (absorption and stimulated rates become equal at N₁ = N₂).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'POPULATION INVERSION & 3-LEVEL SCHEME', 'ta') +
        L(40, 50, 140, 50, 'l') + T(40, 42, 'E₃ (pump level)', 't') +
        L(40, 95, 140, 95, 'ta') + T(40, 87, 'E₂ (metastable state, τ~1ms)', 'ta') +
        L(40, 150, 140, 150, 'l') + T(40, 162, 'E₁ (ground state)', 't') +
        LA(70, 150, 70, 55) + T(75, 125, 'Pump', 't') +
        LA(100, 55, 100, 90) + T(105, 75, 'Fast decay', 't') +
        LA(120, 95, 120, 145) + T(125, 125, 'Laser hν', 'ta') +
        R(180, 55, 160, 95, 'fa') +
        T(200, 80, 'Normal: N₁ >> N₂', 't') +
        T(200, 105, 'Inverted: N₂ > N₁', 'ta') +
        T(200, 130, 'Stimulated > Abs', 't') +
        T(20, 182, 'Metastable state traps atoms: N₂ > N₁ enables optical amplification', 'ta')
      ),
      caption: '3-level laser pumping scheme: excitation to E₃, non-radiative decay to metastable E₂, producing inversion N₂ > N₁.',
    },
  },
  'phy:1:3': {
    explain: [
      'Population inversion amplifies light, but we need an optical box to bounce photons back and forth through the medium repeatedly.',
      'An optical resonator consists of two parallel mirrors flanking the gain medium: one 100% reflective, the other partially transmitting to emit the laser beam.',
    ],
    definition:
      'An optical resonator (or optical cavity) is an arrangement of mirrors enclosing an active laser medium that provides positive optical feedback, sustaining standing waves and selecting longitudinal cavity modes.',
    formula: 'L = q \\frac{\\lambda}{2} \\implies \\nu_q = q \\frac{c}{2L}, \\quad \\Delta\\nu = \\frac{c}{2L}',
    steps: [
      'Two mirrors separated by cavity length L form a Fabry-Pérot interferometer.',
      'Photons traveling along the cavity axis reflect repeatedly through the inverted medium, building exponential gain e^{γ L}.',
      'Standing wave boundary conditions require an integer number of half-wavelengths to fit: L = q (λ / 2).',
      'The frequency spacing between adjacent longitudinal modes is Δν = c / (2L).',
      'Losses occur from transmission, diffraction, and absorption; threshold condition is reached when gain equals cavity loss (R₁ R₂ e^{2(g - α)L} = 1).',
    ],
    examAnswer: [
      'Draw the basic laser structure: active medium, pump source, and optical resonator (Mirror 100% and Mirror ~98%).',
      'Explain the dual function of the cavity: optical feedback (amplification) and frequency selection (mode selector).',
      'Derive the longitudinal mode spacing formula: Δν = c / (2L).',
      'State the round-trip laser threshold condition.',
    ],
    slip: 'Confusing longitudinal cavity modes (frequency standing waves along cavity length, Δν = c/2L) with transverse electromagnetic modes TEM_mn (intensity spatial profile across mirror face).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'OPTICAL RESONATOR CAVITY', 'ta') +
        R(20, 60, 10, 80, 'l') + T(10, 50, 'M1 (100% R)', 't') +
        R(330, 60, 10, 80, 'ta') + T(280, 50, 'M2 (98% R, output)', 'ta') +
        R(50, 70, 260, 60, 'fa') +
        T(110, 105, 'Active Gain Medium (N₂ > N₁)', 't') +
        LA(70, 100, 310, 100) +
        LA(310, 100, 70, 100) +
        LA(335, 100, 355, 100) +
        T(20, 180, 'Cavity length L = q(λ/2)   |   Longitudinal mode spacing Δν = c / (2L)', 'ta')
      ),
      caption: 'Optical resonator cavity: two mirrors establish optical feedback, outputting collimated laser emission.',
    },
  },
  'phy:1:4': {
    explain: [
      'The ruby laser was the world’s very first working laser, built by Theodore Maiman in 1960.',
      'It uses a pink synthetic ruby crystal rod (sapphire doped with 0.05% chromium ions) pumped by a helical xenon flash tube to emit intense deep red pulses at 694.3 nm.',
    ],
    definition:
      'The ruby laser is a three-level solid-state pulsed laser that utilizes an Al₂O₃ crystal doped with Cr³⁺ ions as the active medium, optically pumped by a xenon flash lamp to produce coherent red light at 694.3 nm.',
    formula: '\\lambda = 694.3 \\text{ nm} \\quad \\text{(Cr}^{3+} \\text{ transition } ^2E \\to ^4A_2\\text{)}',
    steps: [
      'Active medium: cylindrical sapphire rod (Al₂O₃) doped with ~0.05% Cr³⁺ ions, ends polished flat and parallel (one 100% silvered, one partially silvered).',
      'Pumping: helical xenon flash tube surrounds the rod, firing pulses of intense white-blue light (~550 nm and 400 nm).',
      'Excitation: Cr³⁺ ions absorb green-blue photons and jump from ground state ⁴A₂ to short-lived bands ⁴T₁ and ⁴T₂.',
      'Non-radiative decay: ions rapidly drop in ~10⁻⁸ s to the metastable state ²E without photon emission.',
      'Metastable lifetime is long (~3 ms); population inversion accumulates between ²E and ⁴A₂.',
      'Lasing: stimulated emission produces intense coherent red pulses at λ = 694.3 nm.',
    ],
    examAnswer: [
      'Draw the construction diagram: ruby rod, polished mirror ends, helical xenon flash lamp, cooling water jacket, and capacitor power supply.',
      'Draw the 3-level energy level diagram showing ⁴A₂ (ground), ⁴T₁, ⁴T₂ (pump bands), and ²E (metastable state).',
      'Specify laser emission wavelength: 694.3 nm (deep red).',
      'Explain why ruby operates in pulsed mode (three-level system requires depopulating over 50% of ground state, causing high thermal heating).',
    ],
    slip: 'Saying ruby laser is a continuous four-level laser. It is a three-level pulsed laser because its lower laser level is the ground state itself.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'RUBY LASER CONSTRUCTION & EMISSION', 'ta') +
        R(70, 75, 200, 35, 'fa') +
        T(100, 98, 'Ruby Rod (Al₂O₃ : Cr³⁺)', 't') +
        R(60, 70, 10, 45, 'l') + T(45, 65, '100% Refl', 't') +
        R(270, 70, 10, 45, 'ta') + T(260, 65, 'Part. Refl', 'ta') +
        P('M80 60 Q110 40 140 60 T200 60 T260 60', 'l') +
        P('M80 125 Q110 145 140 125 T200 125 T260 125', 'l') +
        T(120, 45, 'Helical Xenon Flash Lamp', 'ta') +
        LA(285, 92, 345, 92) +
        T(295, 110, '694.3 nm', 'ta') +
        T(20, 180, 'Cr³⁺ 3-level pulsed operation: optical pumping → red pulse at 694.3 nm', 'ta')
      ),
      caption: 'Ruby laser: synthetic sapphire crystal doped with Cr³⁺, excited by helical xenon flash tube.',
    },
  },
  'phy:1:5': {
    explain: [
      'The Helium-Neon (He-Ne) laser was the first continuous-wave gas laser, glowing with the familiar bright red beam seen in school labs and alignment tools.',
      'Helium atoms absorb electrical energy from an electric discharge and collide with Neon atoms, transferring energy with pinpoint resonance to make Neon lase at 632.8 nm.',
    ],
    definition:
      'The Helium-Neon laser is a continuous-wave four-level gas laser utilizing an electric discharge in a 10:1 mixture of He and Ne gas to achieve population inversion in neon via resonant collision, emitting at 632.8 nm.',
    formula: '\\lambda = 632.8 \\text{ nm} \\quad (\\text{Ne: } 3s \\to 2p \\text{ continuous red transition})',
    steps: [
      'Discharge tube contains a 10:1 ratio mixture of helium and neon at low pressure (~1 torr) between cathode and anode.',
      'Electric discharge fires electrons: e⁻ + He → He* (excited into metastable 2¹S and 2³S levels).',
      'Helium’s 2¹S level (20.61 eV) exactly matches Neon’s 3s level (20.66 eV) within thermal energy kT.',
      'Resonant collision transfers energy: He* + Ne → He + Ne* (populating Ne 3s and 2s levels).',
      'Population inversion forms between Ne 3s and 2p levels.',
      'Stimulated emission generates continuous red light at λ = 632.8 nm. Fast de-excitation from 2p to 1s to ground via tube walls resets the system.',
    ],
    examAnswer: [
      'Draw the schematic construction: glass tube, Brewster windows, external concave mirrors, anode/cathode, and gas mixture (He:Ne = 10:1).',
      'Draw the energy level diagram showing resonant collision transfer from He (2¹S) to Ne (3s₂).',
      'State laser transition wavelength: 632.8 nm (also mention infrared 1.15 μm and 3.39 μm transitions).',
      'Explain the purpose of Helium: acts as an efficient pumping agent to excite Neon atoms via resonant collisions.',
    ],
    slip: 'Saying Helium atoms emit the laser light. Helium only transfers excitation energy; Neon is the lasing atom.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'He-Ne GAS LASER & RESONANT TRANSFER', 'ta') +
        R(50, 70, 240, 40, 'l') +
        T(100, 95, 'He + Ne gas (10:1 ratio)', 't') +
        L(50, 70, 40, 110, 'ta') + L(290, 70, 300, 110, 'ta') +
        T(30, 60, 'Brewster window', 't') +
        R(20, 65, 8, 50, 'l') + R(320, 65, 8, 50, 'ta') +
        LA(330, 90, 355, 90) + T(300, 125, '632.8 nm', 'ta') +
        L(90, 110, 90, 130) + L(250, 110, 250, 130) +
        T(120, 140, 'High Voltage DC Discharge', 't') +
        T(20, 180, 'He (2¹S) resonant collision excites Ne (3s) → continuous red laser at 632.8 nm', 'ta')
      ),
      caption: 'He-Ne laser tube with Brewster windows and resonant collisional energy transfer mechanism.',
    },
  },
  'phy:1:6': {
    explain: [
      'A semiconductor laser (laser diode) is a tiny crystalline chip smaller than a grain of rice that emits coherent light directly from electrical current.',
      'Electrons and holes are pumped into a heavily doped P-N junction; when they recombine across the bandgap, photons stimulate identical photon emission.',
    ],
    definition:
      'A semiconductor diode laser is an optoelectronic device consisting of a heavily doped forward-biased P-N junction (typically GaAs) where optical gain is achieved by radiative recombination of injected carrier pairs across the bandgap.',
    formula: '\\lambda = \\frac{hc}{E_g} \\approx \\frac{1.24}{E_g \\text{ (in eV)}} \\ \\mu\\text{m}',
    steps: [
      'Fabricated from direct bandgap semiconductors like Gallium Arsenide (GaAs, E_g ≈ 1.44 eV) or InGaAsP.',
      'Under heavy forward bias, large densities of electrons and holes are injected into the thin active depletion region.',
      'Inversion occurs when the quasi-Fermi level separation exceeds the bandgap energy: ΔE_F = E_{Fc} - E_{Fv} > E_g.',
      'Injected electrons drop from conduction band to valence band, recombining with holes and emitting photons of energy hν ≈ E_g.',
      'Cleaved natural crystalline facets act as resonator mirrors, reflecting light back and forth for stimulated amplification.',
    ],
    examAnswer: [
      'Draw the heavily doped P-N junction structure showing the active depletion layer and cleaved mirror faces.',
      'Explain the condition for lasing: ΔE_F > E_g and direct bandgap semiconductor (indirect bandgap like Si/Ge cannot lase efficiently).',
      'Write the emission wavelength equation: λ = hc / E_g.',
      'State 3 key advantages over solid-state/gas lasers: ultra-compact size, high electrical efficiency (>30%), and direct electrical modulation.',
    ],
    slip: 'Claiming Silicon can be used to make laser diodes. Silicon has an indirect bandgap where transitions require phonons and produce heat, not light.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SEMICONDUCTOR DIODE LASER (GaAs)', 'ta') +
        R(70, 50, 200, 40, 'l') + T(130, 75, 'p-type GaAs', 't') +
        R(70, 90, 200, 15, 'fa') + T(105, 102, 'Active Depletion Region', 'ta') +
        R(70, 105, 200, 40, 'l') + T(130, 130, 'n-type GaAs', 't') +
        LA(40, 97, 65, 97) + T(10, 95, '+V (bias)', 't') +
        LA(275, 97, 345, 97) + T(285, 85, 'Coherent λ = hc/Eg', 'ta') +
        T(20, 180, 'Forward bias injects carriers; recombination emits photons between cleaved faces.', 'ta')
      ),
      caption: 'Direct bandgap semiconductor laser: carrier injection and recombination in the active junction layer.',
    },
  },
  'phy:1:7': {
    explain: [
      'An optical fiber is a hair-thin glass pipe that traps light inside using total internal reflection.',
      'Light can only stay trapped if it enters the fiber within a specific acceptance cone; the sharpness of this cone is measured by the Numerical Aperture.',
    ],
    definition:
      'An optical fiber is a cylindrical dielectric waveguide consisting of an inner core (index n₁) surrounded by an outer cladding (index n₂) where n₁ > n₂, transmitting light by total internal reflection.',
    formula: '\\text{NA} = \\sin\\theta_0 = \\sqrt{n_1^2 - n_2^2} = n_1 \\sqrt{2\\Delta}, \\quad \\Delta = \\frac{n_1 - n_2}{n_1}',
    steps: [
      'Fiber structure: cylindrical glass core of high refractive index n₁ encased in cladding of lower index n₂ (n₁ > n₂).',
      'At core-cladding boundary, critical angle is sin θ_c = n₂ / n₁.',
      'A ray launched from air (n₀ ≈ 1) at angle θ₀ refracts into the core at angle θ_r = 90° - θ_i.',
      'For total internal reflection at boundary: θ_i ≥ θ_c, meaning sin θ_r ≤ cos θ_c = √(1 - n₂²/n₁²).',
      'Snell’s law at entrance face: n₀ sin θ₀ = n₁ sin θ_r = n₁ √(1 - n₂²/n₁²) = √(n₁² - n₂²).',
      'Numerical Aperture (NA) = sin θ_{0,max} = √(n₁² - n₂²). Acceptance cone semi-angle is θ₀ = arcsin(NA).',
    ],
    examAnswer: [
      'Draw the fiber ray propagation diagram showing core, cladding, acceptance angle θ₀, and critical reflection θ_c.',
      'Derive the NA expression step by step: NA = sin θ₀ = √(n₁² - n₂²).',
      'Define fractional index difference Δ = (n₁ - n₂) / n₁ and express NA = n₁ √(2Δ).',
      'Explain physical meaning of NA (light-gathering ability of the optical fiber).',
    ],
    slip: 'Writing NA = n₁ - n₂ instead of √(n₁² - n₂²). NA is a trigonometric sine, always between 0 and 1.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'OPTICAL FIBER: TIR & ACCEPTANCE CONE', 'ta') +
        R(80, 50, 240, 25, 'l') + T(140, 68, 'Cladding (n₂)', 't') +
        R(80, 75, 240, 45, 'fa') + T(140, 102, 'Core (n₁ > n₂)', 'ta') +
        R(80, 120, 240, 25, 'l') + T(140, 138, 'Cladding (n₂)', 't') +
        LA(20, 115, 80, 97) +
        LA(80, 97, 160, 75) +
        LA(160, 75, 240, 120) +
        LA(240, 120, 310, 75) +
        T(20, 75, 'Acceptance cone θ₀', 't') +
        T(20, 180, 'NA = sin(θ₀) = √(n₁² − n₂²) = n₁√(2Δ)   |   TIR at core-cladding boundary', 'ta')
      ),
      caption: 'Optical fiber ray tracing: light enters within acceptance angle θ₀ and undergoes total internal reflection.',
    },
  },
  'phy:1:8': {
    explain: [
      'Optical fibers come in different designs depending on how wide the core is and whether the glass index changes abruptly or gradually.',
      'Single-mode fibers have tiny cores that allow only one direct light ray, while graded-index fibers use curved light paths to prevent signal spreading.',
    ],
    definition:
      'Optical fibers are classified based on refractive index profile (step-index vs graded-index) and mode propagation capacity (single-mode fiber vs multi-mode fiber).',
    formula: 'V = \\frac{2\\pi a}{\\lambda} \\sqrt{n_1^2 - n_2^2} = \\frac{2\\pi a}{\\lambda} \\text{NA} \\quad (V < 2.405 \\text{ for single-mode})',
    steps: [
      'Step-Index Single-Mode Fiber (SMF): narrow core diameter (8–10 μm); V < 2.405 ensures only the fundamental HE₁₁ mode propagates, eliminating modal dispersion.',
      'Step-Index Multi-Mode Fiber (MMF): wide core (50–100 μm); hundreds of modes travel along different zigzag paths, suffering large modal dispersion.',
      'Graded-Index (GRIN) Fiber: core refractive index decreases parabolically from center to cladding: n(r) = n₁ [1 - 2Δ(r/a)²]^{1/2}.',
      'In GRIN fibers, rays traveling farther from the axis encounter lower refractive index and travel faster, equalizing transit times and slashing dispersion.',
    ],
    examAnswer: [
      'Draw index profiles and ray trajectories for all 3 types: Step-Index SMF, Step-Index MMF, and Graded-Index MMF.',
      'Compare core diameters, bandwidths, and applications (SMF: long-haul telecom; MMF: short-distance LANs; GRIN: high-speed local networks).',
      'Define normalized frequency (V-number): V = (2πa / λ) NA and state condition for single-mode operation (V < 2.405).',
      'Explain how parabolic index in GRIN fibers reduces intermodal dispersion.',
    ],
    slip: 'Assuming graded-index fiber is single-mode. GRIN fibers are multi-mode fibers engineered specifically to minimize modal dispersion.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'TYPES OF OPTICAL FIBER', 'ta') +
        T(20, 45, '1. Step-Index SMF (core ~9μm)', 't') +
        L(30, 60, 160, 60, 'ta') +
        T(20, 95, '2. Step-Index MMF (zigzag paths)', 't') +
        P('M30 115 L60 105 L100 125 L140 105 L160 115', 'l') +
        T(190, 45, '3. Graded-Index (GRIN) Fiber', 'ta') +
        P('M190 85 Q220 65 250 85 T310 85', 'a') +
        T(190, 115, 'Parabolic index profile: n(r)', 't') +
        T(190, 135, 'Curved helical ray paths', 't') +
        T(20, 180, 'SMF has highest bandwidth (no modal dispersion); GRIN equalizes transit times.', 'ta')
      ),
      caption: 'Comparison of step-index SMF (single mode), step-index MMF (zigzag modes), and graded-index fiber.',
    },
  },
  'phy:1:9': {
    explain: [
      'As a light pulse travels through miles of glass fiber, it inevitably loses energy and fades out—this loss is called attenuation.',
      'Losses come from three main causes: Rayleigh scattering (light scattering off micro-bubbles), material absorption, and geometric bends in the cable.',
    ],
    definition:
      'Attenuation is the progressive loss of optical power suffered by an optical signal as it propagates along an optical fiber, measured in decibels per kilometer (dB/km).',
    formula: '\\alpha = \\frac{10}{L} \\log_{10} \\left( \\frac{P_{\\text{in}}}{P_{\\text{out}}} \\right) \\quad [\\text{dB/km}]',
    steps: [
      'Rayleigh Scattering Loss: microscopic density fluctuations frozen into the glass during cooling scatter light in all directions; α_R ∝ 1 / λ⁴ (dominates at short wavelengths).',
      'Absorption Losses: intrinsic absorption (electronic band transitions in UV, molecular silica vibrations in IR) and extrinsic absorption (OH⁻ ion impurity absorption peaks at 1380 nm).',
      'Bending Losses: macro-bends (curves with radius > fiber diameter) and micro-bends (microscopic kinks during cabling) cause ray angles to exceed critical angle and leak into cladding.',
      'Low-loss transmission windows: 1310 nm (zero dispersion window) and 1550 nm (minimum attenuation window ~0.2 dB/km).',
    ],
    examAnswer: [
      'State attenuation formula: α = (10/L) log₁₀(P_in / P_out) dB/km.',
      'Explain Rayleigh scattering and show its 1/λ⁴ dependence.',
      'Describe OH⁻ ion water peak absorption near 1.38 μm.',
      'Sketch the attenuation spectrum curve vs wavelength showing the two telecom transmission windows (1310 nm and 1550 nm).',
    ],
    slip: 'Forgetting the 10 multiplier in the decibel formula: it is 10 log₁₀(P_in/P_out), not ln(P_in/P_out).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'FIBER ATTENUATION VS WAVELENGTH', 'ta') +
        L(40, 140, 320, 140, 'l') + L(40, 140, 40, 30, 'l') +
        T(330, 145, 'λ (μm)', 't') + T(15, 30, 'dB/km', 't') +
        P('M45 40 C70 80 100 110 140 120 C160 123 180 100 200 110 C220 120 240 130 260 130 C290 120 310 70 315 40', 'l') +
        T(50, 70, 'Rayleigh ∝ 1/λ⁴', 't') +
        T(180, 85, 'OH⁻ peak (1.38μm)', 'ta') +
        C(200, 110, 4, 'fa') +
        T(240, 155, '1.55 μm min (0.2 dB/km)', 'ta') +
        C(260, 130, 4, 'fa') +
        T(20, 180, 'Key optical windows: 1310 nm (zero dispersion) and 1550 nm (min loss: 0.2 dB/km)', 'ta')
      ),
      caption: 'Spectral attenuation in silica fiber showing Rayleigh scattering tail, OH- absorption peak, and 1550 nm minimum.',
    },
  },
  'phy:1:10': {
    explain: [
      'Optical fibers do far more than transmit internet data; they make ultra-sensitive sensors that can measure temperature, pressure, strain, and acoustic waves.',
      'Because light inside a fiber changes its intensity, phase, or wavelength when disturbed by an external force, the fiber itself becomes the sensing device.',
    ],
    definition:
      'Fibre optic sensors are measurement transducers that detect physical quantities (temperature, pressure, strain, vibrations) by modulating the intensity, phase, polarization, or wavelength of guided light in an optical fiber.',
    formula: '\\Delta\\phi = \\frac{2\\pi}{\\lambda} (n \\Delta L + L \\Delta n)',
    steps: [
      'Intrinsic Sensors: the optical fiber itself serves as the sensing medium (e.g., Fiber Bragg Gratings, micro-bend pressure sensors).',
      'Extrinsic Sensors: the optical fiber merely acts as a light transmission conduit to and from an external sensing head.',
      'Intensity-Modulated Sensors: external mechanical pressure causes micro-bending in the core, causing guided light to radiate out into the cladding and reducing received intensity.',
      'Phase-Modulated / Interferometric Sensors: strain or temperature changes the fiber length ΔL and refractive index Δn (photo-elastic effect), shifting Mach-Zehnder interference fringes.',
      'Applications: structural health monitoring of bridges and airplane wings, down-hole oil well temperature sensing, and endoscopic biomedical imaging.',
    ],
    examAnswer: [
      'Classify fiber sensors into Intrinsic vs Extrinsic with clear definitions and examples.',
      'Explain the working principle of a micro-bend intensity sensor with a neat diagram.',
      'Explain phase-modulated sensors using the optical phase change formula: Δφ = (2π/λ)(n ΔL + L Δn).',
      'List 4 engineering applications: smart structural monitoring, medical endoscopes, defense gyroscopes, and high-voltage power line monitoring.',
    ],
    slip: 'Confusing intrinsic sensors (where the fiber itself changes properties under strain) with extrinsic sensors (where the fiber is only an input/output light cable).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'FIBER OPTIC SENSOR (MICRO-BEND PRINCIPLE)', 'ta') +
        L(30, 95, 110, 95, 'l') +
        P('M110 95 Q130 75 150 95 T190 95 T230 95', 'ta') +
        L(230, 95, 310, 95, 'l') +
        R(130, 55, 60, 15, 'l') + T(140, 50, 'Pressure (Force)', 'ta') +
        LA(160, 40, 160, 53) +
        T(20, 85, 'Laser In', 't') +
        LA(310, 95, 340, 95) +
        T(280, 85, 'Detector', 't') +
        T(140, 130, 'Light leaks at micro-bends', 't') +
        T(20, 180, 'Applied stress causes micro-bends → light leakage → intensity drop proportional to force', 'ta')
      ),
      caption: 'Micro-bend fiber optic sensor: mechanical force induces cladding leakage, measuring external pressure.',
    },
  },
};
