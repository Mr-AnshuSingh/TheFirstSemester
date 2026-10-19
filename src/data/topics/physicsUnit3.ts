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

export const PHY_UNIT3_TOPICS: Record<string, TopicContent> = {
  'phy:3:0': {
    explain: [
      'By the end of the 19th century, classical physics claimed light was strictly a wave and atoms were miniature planetary systems.',
      'Classical physics failed catastrophically when explaining blackbody radiation (the ultraviolet catastrophe), the photoelectric effect, and atomic stability, forcing the birth of quantum theory.',
    ],
    definition:
      'The need for quantum mechanics arose from the breakdown of classical Newtonian mechanics and Maxwellian electrodynamics in explaining microscopic phenomena, including blackbody radiation spectra, the photoelectric effect, and discrete atomic emission lines.',
    formula: 'E = nh\\nu, \\quad h = 6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}, \\quad u(\\lambda)d\\lambda = \\frac{8\\pi hc}{\\lambda^5 (e^{hc/\\lambda kT} - 1)} d\\lambda',
    steps: [
      'Classical Rayleigh-Jeans law predicted radiation intensity u(ν) ∝ ν², meaning an incandescent oven should emit infinite ultraviolet energy ("Ultraviolet Catastrophe").',
      'Max Planck solved this in 1900 by postulating that atomic oscillators absorb and emit energy only in discrete packets called quanta: E = hν.',
      'Classical wave theory could not explain why photoelectric electron emission depends on light frequency rather than intensity, nor why emission is instantaneous.',
      'Einstein explained the photoelectric effect (1905) by proposing light travels as localized photon energy bullets: hν = K_max + Φ.',
      'Rutherford’s classical atom predicted that orbiting electrons would continuously radiate EM energy and spiral into the nucleus within 10⁻¹¹ seconds; Bohr introduced stationary non-radiating quantum orbits.',
    ],
    examAnswer: [
      'Explain the Ultraviolet Catastrophe with the Rayleigh-Jeans curve vs experimental blackbody curve.',
      'State Planck’s quantum hypothesis: atomic energy exchange is quantized in discrete steps E = nhν.',
      'List 3 experimental phenomena classical physics could not explain (blackbody radiation, photoelectric effect, Compton scattering, discrete line spectra).',
      'State Einstein’s photoelectric equation and define threshold frequency and work function.',
    ],
    slip: 'Thinking Planck proposed light travels as particles in free space. Planck only quantized the emission/absorption by atomic wall oscillators; Einstein later quantized the light field itself into photons.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'ULTRAVIOLET CATASTROPHE & PLANCK QUANTIZATION', 'ta') +
        L(40, 140, 320, 140, 'l') + L(40, 140, 40, 30, 'l') +
        T(325, 145, 'λ', 't') + T(15, 30, 'u(λ)', 't') +
        P('M45 35 Q60 110 80 135 L310 140', 'ta') +
        T(75, 45, 'Classical Rayleigh-Jeans (→ ∞ as λ→0)', 'ta') +
        P('M45 140 Q65 40 100 40 Q160 40 310 138', 'l') +
        T(115, 35, 'Planck Experimental (hν)', 't') +
        T(20, 180, 'Classical theory failed at short wavelengths; Planck quantized energy: E = nhν', 'ta')
      ),
      caption: 'Blackbody radiation: classical UV catastrophe vs Planck’s quantized radiation curve.',
    },
  },
  'phy:3:1': {
    explain: [
      'If light waves can behave like particles (photons), Louis de Broglie wondered: can material particles like electrons behave like waves?',
      'He proposed that every moving mass is guided by a pilot matter wave whose wavelength shrinks as momentum grows.',
    ],
    definition:
      'The de Broglie hypothesis states that matter exhibits dual wave-particle properties, where any moving particle of momentum p possesses an associated matter wavelength λ = h/p.',
    formula: '\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mE}} = \\frac{12.27}{\\sqrt{V}} \\ \\text{\\AA} \\quad \\text{(for electron accelerated by } V \\text{ volts)}',
    steps: [
      'For a photon: energy E = mc² and E = hν = hc / λ.',
      'Equating yields momentum p = mc = h / λ, which gives wavelength λ = h / p.',
      'De Broglie generalized this to material particles of mass m moving with velocity v: λ = h / (mv).',
      'In terms of kinetic energy E: since E = p² / (2m), momentum p = √(2mE), so λ = h / √(2mE).',
      'For an electron accelerated through potential V: E = eV. Substituting constants (m = 9.1×10⁻³¹ kg, e = 1.6×10⁻¹⁹ C, h = 6.626×10⁻³⁴ J·s) yields λ = 12.27 / √V Å.',
      'Davisson-Germer and G.P. Thomson confirmed electron wave nature experimentally through nickel crystal diffraction.',
    ],
    examAnswer: [
      'State the de Broglie dual-nature hypothesis and write the formula λ = h / p.',
      'Derive λ = h / √(2mE) and the numerical expression for an electron: λ = 12.27 / √V Å.',
      'Describe the Davisson-Germer electron diffraction experiment that experimentally validated matter waves.',
      'Explain why wave properties are imperceptible for everyday macroscopic bodies (massive m makes λ ~ 10⁻³⁴ m, far smaller than atomic spacing).',
    ],
    slip: 'Confusing matter waves with electromagnetic waves. Matter waves do not have an electric or magnetic field; they are probability waves associated with particle mass.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'DE BROGLIE MATTER WAVE & ELECTRON WAVELENGTH', 'ta') +
        C(70, 95, 12, 'fa') + T(65, 99, 'e⁻', 't') +
        LA(85, 95, 135, 95) + T(95, 85, 'v', 'ta') +
        P('M140 95 Q155 65 170 95 T200 95 T230 95 T260 95 T290 95 T320 95', 'l') +
        T(210, 65, 'Matter wave: λ = h / p', 'ta') +
        R(180, 115, 160, 45, 'fa') +
        T(190, 133, 'λ = 12.27 / √V  Å', 't') +
        T(190, 150, 'V = 54V → λ = 1.67 Å', 'ta') +
        T(20, 180, 'Moving particles possess wave nature; verified by Davisson-Germer crystal diffraction.', 'ta')
      ),
      caption: 'Moving particle accompanied by a de Broglie matter wave with wavelength λ = h/mv.',
    },
  },
  'phy:3:2': {
    explain: [
      'In our everyday world, you can know both the exact GPS coordinates and speedometer reading of a car.',
      'In the quantum world, particles are wave packets; pinning down the position squishes the wave, scattering the wavelengths and making momentum completely uncertain.',
    ],
    definition:
      'Heisenberg’s uncertainty principle states that it is fundamentally impossible to simultaneously measure both the exact position and momentum of a quantum particle with arbitrary precision, with the product of uncertainties bounded by ħ/2.',
    formula: '\\Delta x \\cdot \\Delta p_x \\ge \\frac{\\hbar}{2} = \\frac{h}{4\\pi}, \\quad \\Delta E \\cdot \\Delta t \\ge \\frac{\\hbar}{2}, \\quad \\Delta\\theta \\cdot \\Delta L \\ge \\frac{\\hbar}{2}',
    steps: [
      'A localized particle is mathematically represented as a wave packet superposition of multiple de Broglie plane waves.',
      'To make position uncertainty Δx small, waves of widely different wave numbers k must interfere, causing wide momentum spread Δp = ħ Δk.',
      'Fourier transform wave packet relationship yields Δx · Δk ≥ 1/2, multiplying by ħ gives Δx · Δp ≥ ħ/2.',
      'G-ray microscope thought experiment: observing an electron requires scattering a photon of wavelength λ. Resolving limit gives Δx ≈ λ / (2 sin θ); photon recoil transfers momentum Δp ≈ (h/λ) sin θ, producing Δx · Δp ≈ h.',
      'Proof that electrons cannot reside inside an atomic nucleus: for nuclear radius R ≈ 10⁻¹⁴ m, Δx gives Δp which corresponds to kinetic energy > 20 MeV (electrons emitted in beta decay have only 2–3 MeV).',
    ],
    examAnswer: [
      'State Heisenberg’s uncertainty principle in position-momentum and energy-time forms.',
      'Describe the gamma-ray microscope thought experiment illustrating the measurement disturbance.',
      'Prove why electrons cannot exist inside the nucleus using Δx ≈ 10⁻¹⁴ m and relativistic energy calculations.',
      'Explain natural spectral line broadening using energy-time uncertainty ΔE · Δt ≥ ħ/2.',
    ],
    slip: 'Attributing the uncertainty principle to clumsy measuring instruments. It is a fundamental property of matter wave packets, not an experimental measurement defect.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'HEISENBERG UNCERTAINTY PRINCIPLE', 'ta') +
        T(30, 45, 'Narrow Δx → Broad Δp', 'ta') +
        P('M40 95 Q60 60 70 95 Q80 130 90 95 Q100 60 110 95', 'l') +
        L(60, 105, 100, 105, 'ta') + T(65, 120, 'Small Δx', 'ta') +
        T(190, 45, 'Broad Δx → Sharp Δp', 't') +
        P('M180 95 Q195 85 210 95 T240 95 T270 95 T300 95 T330 95', 'l') +
        L(190, 105, 310, 105, 'd') + T(225, 120, 'Large Δx', 't') +
        R(120, 135, 160, 30, 'fa') +
        T(140, 155, 'Δx · Δp ≥ ħ/2', 'ta') +
        T(20, 182, 'Wave-packet localization enforces trade-off between position and momentum precision.', 'ta')
      ),
      caption: 'Heisenberg uncertainty: squeezing position space (small Δx) broadens momentum space (large Δp).',
    },
  },
  'phy:3:3': {
    explain: [
      'In quantum mechanics, a particle does not follow a definite railway track trajectory.',
      'Instead, its state is described by a mathematical wave function Ψ(x, t), whose squared height |Ψ|² tells you the probability of finding the particle at any point in space.',
    ],
    definition:
      'The wave function Ψ(x, t) is a complex-valued probability amplitude describing the quantum state of a particle, whose squared modulus |Ψ(x, t)|² represents the probability density of locating the particle per unit volume (Born interpretation).',
    formula: 'P(x) dx = |\\psi(x)|^2 dx = \\psi^*(x) \\psi(x) dx, \\quad \\int_{-\\infty}^{+\\infty} |\\psi(x)|^2 dx = 1',
    steps: [
      'Max Born interpretation (1926): the wave function Ψ itself is not directly measurable, but |Ψ|² = Ψ* Ψ represents probability density.',
      'Total probability of finding the particle somewhere in the entire universe must equal 100%: normalization condition ∫_{-∞}^{+∞} |Ψ|² dx = 1.',
      'Physical acceptability conditions (well-behaved wave function):',
      '1. Single-valued everywhere (a particle cannot have two different probabilities at one location).',
      '2. Finite everywhere (probability density cannot be infinite, ensuring square-integrability).',
      '3. Continuous everywhere, and its first spatial derivative dΨ/dx must be continuous (ensuring finite kinetic energy).',
    ],
    examAnswer: [
      'Define wave function Ψ and state Max Born’s statistical probability interpretation.',
      'Write the normalization condition in 1D and 3D: ∫ |Ψ|² dV = 1.',
      'List the 4 essential boundary conditions for a well-behaved wave function (continuous, single-valued, finite, continuous first derivative).',
      'Explain physical meaning of expectation value ⟨x⟩ = ∫ Ψ* x Ψ dx.',
    ],
    slip: 'Treating Ψ as a physical classical wave like sound or water. Ψ can be an imaginary complex number; only the squared modulus |Ψ|² is real and physically observable.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'WAVE FUNCTION & PROBABILITY DENSITY', 'ta') +
        L(40, 140, 320, 140, 'l') +
        P('M50 140 Q110 50 160 50 Q210 50 270 140', 'l') +
        T(160, 40, 'Wavefunction ψ(x)', 't', 'middle') +
        P('M80 140 Q130 75 160 75 Q190 75 240 140', 'ta') +
        T(160, 95, 'P(x) = |ψ(x)|²', 'ta', 'middle') +
        R(180, 110, 150, 45, 'fa') +
        T(190, 128, '∫ |ψ|² dx = 1', 't') +
        T(190, 145, 'Continuous & Finite', 'ta') +
        T(20, 180, 'Born interpretation: area under |ψ|² curve represents real physical probability.', 'ta')
      ),
      caption: 'Wave function amplitude ψ(x) and its associated probability density distribution |ψ(x)|².',
    },
  },
  'phy:3:4': {
    explain: [
      'Schrödinger’s wave equation is the quantum equivalent of Newton’s second law F = ma.',
      'It governs how matter waves evolve in time and space under the influence of potential energy fields, yielding discrete energy levels for bound particles.',
    ],
    definition:
      'Schrödinger’s equation is the fundamental differential wave equation of non-relativistic quantum mechanics that governs the spatial and temporal evolution of a particle’s wave function.',
    formula: 'i\\hbar \\frac{\\partial \\Psi}{\\partial t} = -\\frac{\\hbar^2}{2m} \\nabla^2 \\Psi + V \\Psi \\quad \\iff \\quad \\hat{H}\\psi = E\\psi \\quad \\text{(Time-independent)}',
    steps: [
      'Start with total classical energy: E = p² / (2m) + V(x).',
      'Associate quantum mechanical operators: momentum p̂ = -iħ (∂/∂x) and energy Ê = iħ (∂/∂t).',
      'Kinetic energy operator becomes p̂² / (2m) = - (ħ² / 2m) (∂²/∂x²).',
      'Substitute operators into energy equation acting on wave function Ψ(x, t): iħ (∂Ψ/∂t) = - (ħ² / 2m) (∂²Ψ/∂x²) + V(x)Ψ (Time-Dependent Schrödinger Equation).',
      'Use separation of variables: Ψ(x, t) = ψ(x) e^{-iEt/ħ}.',
      'Dividing through yields the Time-Independent Schrödinger Equation (TISE): d²ψ/dx² + (2m/ħ²)(E - V)ψ = 0, or Ĥψ = Eψ.',
    ],
    examAnswer: [
      'Derive the 1D Time-Dependent Schrödinger Equation using de Broglie relations and differential operators.',
      'Apply separation of variables to derive the Time-Independent Schrödinger Equation (TISE): d²ψ/dx² + (2m/ħ²)(E - V)ψ = 0.',
      'Define the Hamiltonian operator Ĥ = - (ħ²/2m) ∇² + V and state eigenvalue equation Ĥψ = Eψ.',
      'Explain significance: energy E appears as eigenvalues and ψ as eigenfunctions.',
    ],
    slip: 'Confusing the time-dependent equation (involves ∂/∂t and complex i) with the time-independent equation (purely spatial ordinary differential equation where E is constant energy eigenvalue).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SCHRÖDINGER WAVE EQUATION & OPERATORS', 'ta') +
        R(30, 45, 140, 95, 'fa') +
        T(40, 65, 'Time-Dependent (TDSE)', 'ta') +
        T(40, 90, 'iħ ∂Ψ/∂t = Ĥ Ψ', 't') +
        T(40, 115, 'Ê = iħ ∂/∂t', 't') +
        T(40, 130, 'p̂ = −iħ ∂/∂x', 't') +
        R(190, 45, 145, 95, 'fa') +
        T(200, 65, 'Time-Independent (TISE)', 'ta') +
        T(200, 90, 'Ĥ ψ = E ψ', 't') +
        T(200, 115, 'd²ψ/dx² +', 't') +
        T(200, 130, '(2m/ħ²)(E−V)ψ = 0', 't') +
        T(20, 180, 'Separation of variables Ψ(x,t) = ψ(x)e^{−iEt/ħ} yields stationary states with energy E.', 'ta')
      ),
      caption: 'Formulation of Schrödinger equations: operator substitutions and steady-state eigenvalue equation.',
    },
  },
  'phy:3:5': {
    explain: [
      'Trapping a quantum particle inside a box with impenetrable walls forces its matter wave to pin to zero at both edges, just like a vibrating guitar string.',
      'Because only whole numbers of half-wavelengths can fit inside the box, the particle can only possess specific discrete energy levels—energy is quantized.',
    ],
    definition:
      'A particle in a 1D box (infinite potential well) is a quantum system where a particle is confined between rigid boundaries at x = 0 and x = L (V = 0 inside, V = ∞ outside), leading to discrete energy eigenvalues and sinusoidal eigenfunctions.',
    formula: 'E_n = \\frac{n^2 h^2}{8mL^2} = \\frac{n^2 \\pi^2 \\hbar^2}{2mL^2}, \\quad \\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left( \\frac{n\\pi x}{L} \\right), \\quad n = 1, 2, 3, \\dots',
    steps: [
      'Potential profile: V(x) = 0 for 0 < x < L, and V(x) = ∞ for x ≤ 0 and x ≥ L.',
      'Inside well, TISE is: d²ψ/dx² + k²ψ = 0 where k = √(2mE) / ħ. General solution: ψ(x) = A sin kx + B cos kx.',
      'Boundary condition 1: at x = 0, ψ(0) = 0 ⇒ B = 0.',
      'Boundary condition 2: at x = L, ψ(L) = 0 ⇒ A sin kL = 0 ⇒ kL = nπ (n = 1, 2, 3, ...).',
      'Quantized energy: k = nπ/L ⇒ √(2mE)/ħ = nπ/L ⇒ E_n = n²π²ħ² / (2mL²) = n²h² / (8mL²).',
      'Normalization: ∫₀^L |ψ_n|² dx = 1 ⇒ A² ∫₀^L sin²(nπx/L) dx = A² (L/2) = 1 ⇒ A = √(2/L).',
      'Ground state energy is E₁ = h² / (8mL²) > 0; n = 0 is forbidden as it gives ψ = 0 everywhere (particle would not exist).',
    ],
    examAnswer: [
      'Setup the 1D infinite potential well problem with diagram and boundary conditions.',
      'Derive the normalized wavefunctions ψ_n(x) = √(2/L) sin(nπx/L) in full mathematical detail.',
      'Derive the energy eigenvalue formula E_n = n²h² / (8mL²).',
      'Sketch ψ_n(x) and |ψ_n(x)|² for n = 1, 2, 3 showing nodes.',
      'Explain zero-point energy E₁ and why n = 0 violates the Heisenberg uncertainty principle.',
    ],
    slip: 'Setting n = 0. In an infinite potential well, n must be a positive non-zero integer (n = 1, 2, 3, ...). At n = 0, the wave function vanishes identically everywhere.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'PARTICLE IN A 1D BOX (INFINITE WELL)', 'ta') +
        L(80, 20, 80, 140, 'l') + L(260, 20, 260, 140, 'l') +
        L(80, 140, 260, 140, 'l') +
        T(35, 80, 'V = ∞', 'ta') + T(275, 80, 'V = ∞', 'ta') +
        T(140, 155, '0 < x < L  (V=0)', 't') +
        P('M80 120 Q170 85 260 120', 'ta') + T(200, 110, 'n=1 (E₁)', 'ta') +
        P('M80 80 Q125 55 170 80 Q215 105 260 80', 'l') + T(200, 70, 'n=2 (E₂ = 4E₁)', 't') +
        P('M80 40 Q110 20 140 40 Q170 60 200 40 Q230 20 260 40', 'l') + T(200, 30, 'n=3 (E₃ = 9E₁)', 't') +
        T(20, 180, 'E_n = n²h² / (8mL²)   |   ψ_n = √(2/L) sin(nπx/L)   |   Ground energy E₁ > 0', 'ta')
      ),
      caption: 'Infinite potential box: standing wave solutions with quantized energy levels scaling as n².',
    },
  },
  'phy:3:6': {
    explain: [
      'In classical mechanics, a rolling ball lacking enough kinetic energy to clear a hill will always bounce back.',
      'In quantum mechanics, an electron hitting an energy barrier behaves as an exponentially decaying wave that can leak through and emerge on the other side—this is quantum tunneling.',
    ],
    definition:
      'Quantum tunneling is the wave-mechanical phenomenon whereby a quantum particle with energy E penetrates and traverses a finite potential energy barrier V₀ even though its kinetic energy is less than the barrier height (E < V₀).',
    formula: 'T \\approx e^{-2\\kappa a}, \\quad \\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}, \\quad T + R = 1',
    steps: [
      'Consider a rectangular potential barrier of height V₀ and width a, with incident particle energy E < V₀.',
      'Region I (x < 0, V = 0): wave is incident plus reflected plane wave: ψ_I = A e^{ik₁x} + B e^{-ik₁x} where k₁ = √(2mE) / ħ.',
      'Region II (0 < x < a, V = V₀): since E < V₀, wave vector is imaginary; solution is exponentially decaying: ψ_{II} = C e^{-κ x} + D e^{+κ x} where κ = √(2m(V₀ - E)) / ħ.',
      'Region III (x > a, V = 0): transmitted plane wave moving forward: ψ_{III} = F e^{ik₁x}.',
      'Matching boundary conditions for ψ and dψ/dx at x = 0 and x = a yields transmission coefficient T = |F/A|².',
      'For thick or high barriers (κ a >> 1): transmission probability drops exponentially: T ≈ 16(E/V₀)(1 - E/V₀) e^{-2κ a}.',
      'Applications: alpha radioactive decay, Scanning Tunneling Microscopy (STM), Zener and tunnel diodes, nuclear fusion in stars.',
    ],
    examAnswer: [
      'Define quantum tunneling and contrast classical vs quantum outcomes for E < V₀.',
      'Write Schrödinger’s equation in all 3 regions with solutions.',
      'Show that the wave inside the barrier does not oscillate but decays exponentially: ψ ∝ e^{-κ x}.',
      'State transmission coefficient formula T ≈ e^{-2κ a} with attenuation constant κ = √(2m(V₀ - E))/ħ.',
      'List 3 real-world engineering applications: STM atomic imaging, tunnel diodes, flash memory floating gate writing.',
    ],
    slip: 'Stating that the particle loses kinetic energy after tunneling. Its energy E remains strictly identical after emerging in Region III; only the wave amplitude and transmission probability decrease.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'QUANTUM BARRIER PENETRATION & TUNNELING', 'ta') +
        L(30, 140, 330, 140, 'l') +
        R(140, 50, 80, 90, 'fa') +
        T(150, 42, 'Barrier V₀', 'ta') +
        T(150, 75, 'E < V₀', 't') +
        P('M30 95 Q55 75 80 95 T140 95', 'l') + T(40, 85, 'Incident wave ψ_I', 't') +
        P('M140 95 Q175 120 220 130', 'ta') + T(145, 115, 'Decay e^{−κx}', 'ta') +
        P('M220 130 Q245 120 270 130 T320 130', 'l') + T(240, 115, 'Transmitted ψ_III (attenuated)', 't') +
        T(20, 180, 'Transmission coefficient: T ≈ e^{−2κa} where κ = √(2m(V₀ − E)) / ħ', 'ta')
      ),
      caption: 'Quantum tunneling: incident wave undergoes exponential decay within the barrier, emerging with reduced amplitude.',
    },
  },
};
