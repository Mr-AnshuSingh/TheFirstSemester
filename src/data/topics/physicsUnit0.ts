import { TopicContent, UnitStory } from '@/types/syllabus';

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

/* ---------- PHYSICS UNIT STORIES (6 Units) ---------- */
export const PHY_UNIT_STORIES: Record<string, UnitStory> = {
  'phy:0': {
    whatItIs:
      'Wave optics explains light as oscillating electromagnetic wavefronts that combine, bend around obstacles, and oscillate in specific spatial directions.',
    whyItMatters:
      'Interference and diffraction govern the absolute resolution limit of microscopes, telescopes, optical discs, lithography for computer chips, and laser measurement devices.',
    howItWorks:
      'Division of amplitude splits wavefronts using thin films (Newton rings, Michelson). Diffraction passes waves through aperture slits, producing sharp multi-beam interference patterns.',
  },
  'phy:1': {
    whatItIs:
      'Laser physics explores light amplification by stimulated emission, while fiber optics guides these coherent beams across glass cables via total internal reflection.',
    whyItMatters:
      'Every global internet cable, fiber-optic telecom trunk, laser surgery tool, and barcode scanner relies on population inversion, optical resonance, and fiber numerical aperture.',
    howItWorks:
      'Pumping elevates atoms to create a population inversion. Stimulated emission produces identical, in-phase photons. Light injected into an optical fiber within the acceptance cone bounces via total internal reflection.',
  },
  'phy:2': {
    whatItIs:
      'Electromagnetism unites electricity and magnetism into four Maxwell equations that describe charges, currents, dielectrics, magnetic materials, and traveling light waves.',
    whyItMatters:
      'Power generators, high-speed microchips, wireless 5G communications, radar systems, and electrical insulation design depend entirely on electromagnetic wave propagation and energy flux.',
    howItWorks:
      'Gauss laws quantify electric and magnetic fluxes. Faraday and Ampere-Maxwell laws reveal that changing magnetic fields produce curls of electric fields and vice-versa, forming self-propagating EM waves carrying Poynting energy flux.',
  },
  'phy:3': {
    whatItIs:
      'Quantum mechanics describes nature at subatomic scales where energy, momentum, and position exist as probabilistic matter waves rather than deterministic classical particles.',
    whyItMatters:
      'Without quantum tunneling and energy quantization, modern semiconductor transistors, flash memory, scanning tunneling microscopes, and quantum computers could not exist.',
    howItWorks:
      'Every particle carries a de Broglie wavelength. Schrödinger’s wave equation dictates how wave function Ψ propagates in space and time, with |Ψ|² yielding probability density. Confining a particle inside a box produces discrete energy levels.',
  },
  'phy:4': {
    whatItIs:
      'Solid-state physics categorizes materials into metals, semiconductors, and insulators based on bandgap theory, carrier transport (drift and diffusion), and nanoscale surface effects.',
    whyItMatters:
      'Every microchip, diode, transistor, LED, solar panel, and sensor is engineered by doping semiconductors and exploiting carrier drift, diffusion, and quantum confinement at the nanoscale.',
    howItWorks:
      'Doping creates n-type or p-type carriers. P-N junctions form depletion barriers that rectify currents. Nanoscale materials boast massive surface-to-volume ratios and tunable bandgaps due to quantum confinement.',
  },
  'phy:5': {
    whatItIs:
      'The engineering physics laboratory is the hands-on experimental validation of optics, semiconductor physics, laser transmission, and quantum phenomena.',
    whyItMatters:
      'Measuring physical constants like Planck’s constant h, the optical wavelength λ, and carrier concentration via the Hall effect develops rigorous precision engineering measurement skills.',
    howItWorks:
      'Students calibrate spectrometers, measure Newton ring diameters with traveling microscopes, map P-N diode IV curves, record Hall voltages, and evaluate optical fiber numerical apertures.',
  },
};

/* ---------- TOPIC CONTENT: UNIT 0 (Wave Optics - 9 topics) ---------- */
export const PHY_UNIT0_TOPICS: Record<string, TopicContent> = {
  'phy:0:0': {
    explain: [
      'Division of amplitude splits an incoming light wave into two beams of lower intensity at a reflecting boundary.',
      'When the two reflected waves meet again, their relative path difference creates bright or dark interference fringes.',
    ],
    definition:
      'Interference by division of amplitude is the optical phenomenon where a single incident wave is divided into reflected and transmitted components at a boundary, which subsequently recombine to form interference patterns.',
    formula: '2\\mu t \\cos r = n\\lambda \\quad \\text{(dark fringe in thin film reflection with phase flip)}',
    steps: [
      'Incident ray hits the top surface of a thin film: part reflects (with π phase change if denser), part refracts.',
      'Refracted ray reflects from the bottom surface and emerges parallel to the first reflected ray.',
      'Geometric path difference equals 2μt cos r; adding λ/2 for Stokes’ reflection phase change yields total path difference Δ = 2μt cos r ± λ/2.',
      'Constructive interference occurs when 2μt cos r = (2n + 1)λ/2; destructive when 2μt cos r = nλ.',
    ],
    examAnswer: [
      'Define division of amplitude and contrast it with division of wavefront (Young double slit).',
      'Derive path difference: Δ = 2μt cos r - λ/2 using Stokes’ theorem for reflection at denser medium.',
      'State condition for bright fringes (2μt cos r = (2n - 1)λ/2) and dark fringes (2μt cos r = nλ).',
      'Mention why thin films appear colored in white light (different wavelengths satisfy brightness at different angles/thicknesses).',
    ],
    slip: 'Forgetting the λ/2 phase shift (Stokes’ relation) that occurs upon reflection at the top surface off an optically denser medium.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'DIVISION OF AMPLITUDE (THIN FILM)', 'ta') +
        L(30, 80, 330, 80, 'l') +
        L(30, 140, 330, 140, 'l') +
        R(30, 80, 300, 60, 'fa') +
        T(40, 115, 'Film (μ, thickness t)', 't') +
        LA(80, 30, 130, 80) +
        LA(130, 80, 180, 30) +
        LA(130, 80, 160, 140) +
        LA(160, 140, 210, 80) +
        LA(210, 80, 260, 30) +
        T(80, 45, 'Ray 1 (λ/2 flip)', 'ta') +
        T(240, 45, 'Ray 2', 't') +
        T(20, 175, 'Δ = 2μt cos(r) ± λ/2   (Interference between Ray 1 & Ray 2)', 'ta')
      ),
      caption: 'Division of amplitude: ray splits into reflected and refracted components across thin film boundaries.',
    },
  },
  'phy:0:1': {
    explain: [
      'Newton’s rings are concentric circular fringes formed when a convex lens rests on a flat glass plate.',
      'The air wedge between the lens and plate has circular symmetry; thickness increases radially outward, making rings crowd closer together.',
    ],
    definition:
      'Newton’s rings are circular interference fringes of equal thickness formed by division of amplitude within the variable-thickness air film enclosed between a plano-convex lens and an optically flat glass plate.',
    formula: 'D_n^2 = 4n\\lambda R \\quad \\text{and} \\quad \\lambda = \\frac{D_{n+p}^2 - D_n^2}{4pR}',
    steps: [
      'Air film thickness t relates to lens radius of curvature R by sagitta formula: t ≈ r² / (2R).',
      'For dark fringes in reflected light: 2t = nλ, so r² / R = nλ.',
      'Diameter D_n = 2r_n, which gives D_n² = 4nλR, proving D_n ∝ √n.',
      'To eliminate error in apex contact, take two rings n and n+p: λ = (D_{n+p}² - D_n²) / (4pR).',
    ],
    examAnswer: [
      'Draw the plano-convex lens on glass plate setup showing the circular air wedge.',
      'State why central spot is dark in reflected light: at center t = 0, but top reflection has π phase jump, giving path difference λ/2 (destructive).',
      'Write derivation showing D_n² = 4nλR for dark rings and D_n² = 2(2n - 1)λR for bright rings.',
      'State formula to determine wavelength λ using traveling microscope ring diameters.',
    ],
    slip: 'Writing D_n ∝ n instead of D_n ∝ √n. Because diameter grows as square root of order, rings crowd together as n increases.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'NEWTON’S RINGS SETUP & FRINGES', 'ta') +
        L(30, 140, 180, 140, 'l') +
        P('M40 140 A80 80 0 0 1 170 140', 'l') +
        T(90, 160, 'Lens on glass plate', 't') +
        LA(105, 30, 105, 80) +
        T(115, 50, 'Light (λ)', 'ta') +
        C(270, 95, 12, 'l') +
        C(270, 95, 26, 'l') +
        C(270, 95, 40, 'l') +
        C(270, 95, 54, 'l') +
        C(270, 95, 5, 'fa') +
        T(270, 165, 'Dark center; D ∝ √n', 't', 'middle') +
        T(20, 180, 'λ = (D²_{n+p} − D²_n) / (4pR)', 'ta')
      ),
      caption: 'Newton’s rings apparatus and resulting circular fringes with dark center and radial crowding.',
    },
  },
  'phy:0:2': {
    explain: [
      'The Michelson interferometer splits a light beam into two perpendicular arms with a half-silvered mirror.',
      'The beams bounce off separate plane mirrors, recombine, and form interference fringes whose shifts reveal micro-displacements.',
    ],
    definition:
      'The Michelson interferometer is an amplitude-splitting optical instrument that divides an incident beam into two perpendicular paths using a beam splitter and recombines them to measure wavelengths or nanoscale path shifts.',
    formula: '2d = N\\lambda \\implies \\lambda = \\frac{2\\Delta d}{N}',
    steps: [
      'Monochromatic light enters beam splitter G1 tilted at 45°; 50% reflects to mirror M1, 50% transmits through compensator plate G2 to mirror M2.',
      'Mirrors M1 and M2 reflect beams back to G1 where they recombine toward observing telescope T.',
      'Compensator plate G2 ensures both beams traverse identical glass thickness.',
      'Moving mirror M1 by distance Δd shifts N fringes across field of view: 2Δd = Nλ.',
    ],
    examAnswer: [
      'Draw schematic showing light source, beam splitter G1, compensator G2, fixed mirror M2, movable mirror M1, and telescope.',
      'Explain role of compensator plate G2 (equalizes optical path lengths in dispersive glass).',
      'State fringe conditions: circular fringes when mirrors are strictly perpendicular; localized straight fringes when slightly tilted.',
      'Give formula for wavelength determination: λ = 2Δd / N.',
    ],
    slip: 'Forgetting the factor of 2 in path change 2Δd (light travels back and forth along the shifted arm).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'MICHELSON INTERFEROMETER', 'ta') +
        R(160, 20, 60, 10, 'l') +
        T(165, 15, 'M1 (movable)', 't') +
        R(310, 80, 10, 60, 'l') +
        T(295, 75, 'M2 (fixed)', 't') +
        L(170, 70, 210, 110, 'ta') +
        T(135, 105, 'Splitter G1', 'ta') +
        L(240, 70, 260, 110, 'd') +
        T(240, 125, 'Compensator G2', 't') +
        LA(20, 90, 185, 90) +
        T(30, 80, 'Source S', 't') +
        LA(190, 90, 190, 170) +
        T(170, 180, 'Detector / Eye (λ = 2Δd / N)', 'ta')
      ),
      caption: 'Michelson interferometer: beam splitter G1 creates perpendicular arms with compensator G2.',
    },
  },
  'phy:0:3': {
    explain: [
      'Diffraction is the bending and spreading of light wavefronts when passing through narrow slits.',
      'In Fraunhofer diffraction, incident and diffracted rays are parallel (plane waves), producing a broad central maximum and smaller side peaks.',
    ],
    definition:
      'Fraunhofer diffraction is far-field diffraction where both the incident source and observation plane are effectively at infinite distances from the aperture, realized practically using converging lenses.',
    formula: 'a \\sin\\theta = m\\lambda \\quad \\text{(single-slit minima, } m = \\pm 1, \\pm 2, \\dots \\text{)}',
    steps: [
      'Plane wavefront of wavelength λ falls normally on a single slit of width a.',
      'Huygens secondary wavelets interfere; total amplitude is R = A (sin α / α) where α = (π a sin θ) / λ.',
      'Intensity I = I₀ (sin α / α)², reaching principal maximum I₀ at α = 0 (θ = 0).',
      'Minima occur when sin α = 0 with α ≠ 0, giving α = mπ ⇒ a sin θ = mλ.',
      'For double slit of separation d, intensity is modulated by two-beam interference: I = I₀ (sin α / α)² cos² β, where β = (π d sin θ) / λ.',
    ],
    examAnswer: [
      'Draw the intensity distribution curve showing central maximum of angular width 2λ/a flanked by secondary maxima.',
      'State condition for single-slit minima: a sin θ = mλ (m = ±1, ±2, ...).',
      'State double-slit formula I = 4I₀ (sin α / α)² cos² β and explain missing orders when d/a = (integer).',
      'Highlight that the central maximum carries ~85% of total energy.',
    ],
    slip: 'Confusing single-slit diffraction minima condition (a sin θ = mλ) with double-slit interference maxima condition (d sin θ = nλ).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'FRAUNHOFER SINGLE SLIT INTENSITY', 'ta') +
        L(20, 140, 340, 140, 'l') +
        L(180, 140, 180, 30, 'd') +
        P('M30 140 C70 140 80 132 95 120 C110 132 120 140 140 140 C160 140 170 80 180 35 C190 80 200 140 220 140 C240 140 250 132 265 120 C280 132 290 140 330 140', 'l') +
        T(180, 25, 'Central Max (width = 2λ/a)', 'ta', 'middle') +
        T(140, 155, '−λ/a', 't', 'middle') +
        T(220, 155, '+λ/a', 't', 'middle') +
        T(95, 155, '−2λ/a', 't', 'middle') +
        T(265, 155, '+2λ/a', 't', 'middle') +
        T(20, 180, 'Minima: a sin(θ) = mλ   |   Central peak is twice as wide as side lobes', 'ta')
      ),
      caption: 'Fraunhofer single-slit diffraction pattern: prominent central peak bounded by first minima at ±λ/a.',
    },
  },
  'phy:0:4': {
    explain: [
      'Diffraction through a circular hole forms a bright circular central disc called the Airy disc surrounded by faint concentric rings.',
      'This Airy disc sets the physical limit on how small a spot an ideal microscope or camera lens can focus light into.',
    ],
    definition:
      'Fraunhofer diffraction at a circular aperture produces an Airy pattern consisting of a central bright disc (Airy disc) containing ~84% of total power enclosed by concentric dark and bright rings.',
    formula: '\\sin\\theta_1 \\approx 1.22 \\frac{\\lambda}{D}',
    steps: [
      'Circular aperture of diameter D illuminated by normal plane wave of wavelength λ.',
      'Integrating Huygens wavelets over circular disk involves Bessel functions J₁(x).',
      'First dark ring occurs at the first zero of J₁(x) / x, which is at x = 3.832.',
      'Relating parameter x = (π D sin θ) / λ gives sin θ₁ = 3.832 / π · (λ / D) ≈ 1.22 λ / D.',
    ],
    examAnswer: [
      'Write the angular radius equation for the first dark ring: θ₁ ≈ 1.22 λ / D.',
      'State that the central bright spot is called the Airy disc and holds ~84% of total energy.',
      'Explain significance: determines the fundamental diffraction resolution limit of telescopes and camera lenses.',
    ],
    slip: 'Writing θ = λ/D instead of 1.22 λ/D (the 1.22 factor arises from circular geometry integration Bessel zeros).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'CIRCULAR APERTURE & AIRY DISC', 'ta') +
        C(100, 95, 45, 'l') +
        C(100, 95, 20, 'fa') +
        C(100, 95, 35, 'd') +
        T(100, 160, 'Airy Disc (~84% energy)', 't', 'middle') +
        L(180, 140, 340, 140, 'l') +
        P('M190 140 C220 140 235 130 245 125 C255 130 258 140 260 140 C265 140 270 50 280 35 C290 50 295 140 300 140 C302 140 305 130 315 125 C325 130 330 140 335 140', 'l') +
        T(280, 25, 'θ₁ = 1.22 λ / D', 'ta', 'middle') +
        T(20, 180, 'First dark ring angular radius: sin(θ₁) ≈ 1.22 λ / D (Aperture diameter D)', 'ta')
      ),
      caption: 'Circular aperture diffraction: central Airy disc and first diffraction minimum at 1.22 λ/D.',
    },
  },
  'phy:0:5': {
    explain: [
      'A diffraction grating consists of thousands of identical parallel slits ruled extremely close together on a transparent glass plate.',
      'Constructive interference from all slits creates ultra-sharp spectral lines, allowing precise separation and measurement of wavelengths.',
    ],
    definition:
      'A plane transmission diffraction grating is an optical device consisting of a large number N of equidistant parallel transparent slits separated by opaque spaces, used for spectral analysis.',
    formula: '(a + b) \\sin\\theta = n\\lambda \\quad \\text{and} \\quad \\text{Resolving Power} = \\frac{\\lambda}{d\\lambda} = nN',
    steps: [
      'Let slit width be a and opaque space width be b; grating element is d = a + b.',
      'Number of lines per inch is N_g, so (a + b) = 1 / N_g inches.',
      'Principal maxima condition: path difference between adjacent slits equals integer wavelengths: (a + b) sin θ = nλ (order n = 0, 1, 2, ...).',
      'Maximum visible order: n_max < (a + b) / λ (since sin θ ≤ 1).',
      'Resolving power of grating: R = λ / dλ = n · N_total.',
    ],
    examAnswer: [
      'State grating equation: (a + b) sin θ = nλ with definition of grating element (a + b).',
      'Derive formula for maximum number of orders: n_max = (a + b) / λ.',
      'Explain absent / missing spectra: if (a + b)/a = n/m, order n vanishes due to single-slit minimum.',
      'State expression for chromatic resolving power: R = nN.',
    ],
    slip: 'Using slit width a instead of grating element (a + b) in the grating equation.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'DIFFRACTION GRATING SPECTRA', 'ta') +
        L(40, 40, 40, 150, 'l') +
        L(40, 45, 40, 55, 'ta') +
        L(40, 65, 40, 75, 'ta') +
        L(40, 85, 40, 95, 'ta') +
        L(40, 105, 40, 115, 'ta') +
        L(40, 125, 40, 135, 'ta') +
        T(20, 165, 'Grating (a+b)', 't') +
        LA(40, 95, 200, 95) +
        T(210, 98, 'n = 0 (white central)', 't') +
        LA(40, 95, 200, 55) +
        T(210, 58, 'n = +1 (Blue → Red)', 'ta') +
        LA(40, 95, 200, 135) +
        T(210, 138, 'n = −1 (Blue → Red)', 'ta') +
        T(20, 180, '(a + b) sin(θ) = nλ   |   Resolving Power = λ / Δλ = nN', 'ta')
      ),
      caption: 'Diffraction grating: multiple slit interference separates polychromatic light into sharp spectral orders.',
    },
  },
  'phy:0:6': {
    explain: [
      'The Rayleigh criterion defines the exact boundary where two close point sources (like two stars) are just barely distinguishable.',
      'They are resolved when the center of the Airy disc of one source falls directly onto the first dark ring of the other.',
    ],
    definition:
      'Rayleigh’s criterion states that two point sources are just resolved by an optical system when the central maximum of the diffraction pattern of one coincides with the first diffraction minimum of the second.',
    formula: '\\theta_{\\min} = 1.22 \\frac{\\lambda}{D} \\quad \\text{and} \\quad \\text{Resolving Power} = \\frac{1}{\\theta_{\\min}} = \\frac{D}{1.22\\lambda}',
    steps: [
      'Consider two independent point sources emitting light of wavelength λ.',
      'Each forms an Airy disc of angular radius θ₁ = 1.22 λ / D through telescope objective of aperture D.',
      'When angular separation Δθ = 1.22 λ / D, intensity between the two peaks drops to ~81% of maximum value, creating a discernible dip.',
      'Resolving power of telescope is the reciprocal of minimum resolvable angle: RP = D / (1.22 λ).',
    ],
    examAnswer: [
      'Draw the three Rayleigh criterion curves: well resolved (Δθ > θ₁), just resolved (Δθ = θ₁ with 19% dip), and not resolved (Δθ < θ₁).',
      'State formula for limit of resolution of telescope: dθ = 1.22 λ / D.',
      'Write resolving power formula: RP = D / (1.22 λ) and explain why larger aperture telescopes give clearer images.',
    ],
    slip: 'Confusing limit of resolution (dθ, smaller is better) with resolving power (1/dθ, larger is better).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'RAYLEIGH CRITERION (JUST RESOLVED)', 'ta') +
        L(30, 140, 330, 140, 'l') +
        P('M50 140 C100 140 120 40 140 40 C160 40 180 140 230 140', 'l') +
        P('M150 140 C200 140 220 40 240 40 C260 40 280 140 330 140', 'ta') +
        L(140, 40, 140, 140, 'd') +
        L(240, 40, 240, 140, 'd') +
        T(190, 75, '~19% dip', 'ta', 'middle') +
        T(140, 155, 'Peak 1', 't', 'middle') +
        T(240, 155, 'Peak 2 (at Min 1)', 't', 'middle') +
        T(20, 180, 'Just resolved: Peak of A falls on Min 1 of B: Δθ = 1.22 λ / D', 'ta')
      ),
      caption: 'Rayleigh criterion: two sources are just resolved when first diffraction minimum aligns with adjacent peak.',
    },
  },
  'phy:0:7': {
    explain: [
      'Unpolarized light has electric field vectors vibrating randomly in all planes perpendicular to propagation.',
      'A double-refracting crystal (like calcite) splits this light into two mutually perpendicular polarized rays: ordinary (O-ray) and extraordinary (E-ray).',
    ],
    definition:
      'Double refraction (birefringence) is the optical property of anisotropic crystals (such as calcite or quartz) that splits an incident unpolarized light ray into two polarized rays vibrating in mutually orthogonal planes.',
    formula: '\\mu_o = \\frac{c}{v_o} \\quad \\text{and} \\quad \\mu_e(\\theta) = \\frac{c}{v_e(\\theta)}',
    steps: [
      'Incident unpolarized ray enters calcite crystal cut obliquely to optic axis.',
      'The Ordinary ray (O-ray) obeys Snell’s law in all directions; its wavefront is spherical with constant refractive index μ_o.',
      'The Extraordinary ray (E-ray) does not obey Snell’s law in general; its wavefront is an ellipsoid of revolution with variable index μ_e.',
      'Along the optic axis, both rays travel at identical speeds (v_o = v_e), so birefringence vanishes.',
      'In negative crystals (calcite): v_e > v_o, so μ_o > μ_e. In positive crystals (quartz): μ_e > μ_o.',
    ],
    examAnswer: [
      'Define polarization and distinguish polarized vs unpolarized light.',
      'Explain double refraction with neat diagram showing O-ray and E-ray paths in calcite.',
      'Contrast O-ray and E-ray across 4 points: Snell’s law validity, wavefront shape, vibration direction, and refractive index consistency.',
      'Define optic axis (direction along which O-ray and E-ray travel with equal velocity).',
    ],
    slip: 'Believing the optic axis is a physical line. It is a direction along which no double refraction occurs.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'DOUBLE REFRACTION IN CALCITE', 'ta') +
        R(100, 50, 160, 90, 'l') +
        T(110, 70, 'Calcite crystal (μ_o > μ_e)', 't') +
        LA(20, 95, 100, 95) +
        T(25, 85, 'Unpolarized', 't') +
        LA(100, 95, 260, 80) +
        T(265, 80, 'E-ray (dots, || optic axis)', 'ta') +
        LA(100, 95, 260, 115) +
        T(265, 120, 'O-ray (arrows, ⊥ optic axis)', 't') +
        T(20, 180, 'O-ray obeys Snell’s law; E-ray travels faster in calcite (μ_o > μ_e)', 'ta')
      ),
      caption: 'Double refraction in calcite splitting unpolarized ray into mutually perpendicular O-ray and E-ray.',
    },
  },
  'phy:0:8': {
    explain: [
      'A Nicol prism is an ingenious optical device made of calcite designed to produce plane-polarized light from natural light.',
      'It eliminates the O-ray completely by total internal reflection at a thin layer of Canada balsam, allowing only the pure E-ray to emerge.',
    ],
    definition:
      'A Nicol prism is an optical polarizing prism constructed from a calcite rhomb sliced diagonally and cemented with Canada balsam to eliminate the ordinary ray by total internal reflection while transmitting the extraordinary ray.',
    formula: '\\mu_o (1.658) > \\mu_{\\text{balsam}} (1.550) > \\mu_e (1.486)',
    steps: [
      'Calcite rhomb with length-to-breadth ratio 3:1 is cut along diagonal perpendicular to principal section.',
      'The cut faces are polished and cemented with Canada balsam (refractive index μ_b ≈ 1.55).',
      'For O-ray: entering balsam means traveling from denser calcite (μ_o = 1.658) to rarer balsam (μ_b = 1.55). At angle > critical angle (~69°), O-ray undergoes TIR and is absorbed by black coating.',
      'For E-ray: calcite index is ~1.486, rarer than balsam (1.55), so no TIR occurs; E-ray transmits through undeflected.',
    ],
    examAnswer: [
      'Draw the Nicol prism cross-section showing angles (68° and 112°), Canada balsam diagonal layer, and blackened sides.',
      'State refractive index values: μ_o = 1.658, μ_b = 1.550, μ_e = 1.486.',
      'Explain mechanism: O-ray suffers TIR at balsam layer because μ_o > μ_b; E-ray transmits because μ_e < μ_b.',
      'State applications as a polarizer and analyzer.',
    ],
    slip: 'Stating that both rays are transmitted. The O-ray undergoes total internal reflection and is absorbed in the blackened wall.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'NICOL PRISM STRUCTURE & TIR', 'ta') +
        P('M40 130 L100 50 L300 50 L240 130 Z', 'l') +
        L(100, 50, 240, 130, 'ta') +
        T(180, 85, 'Canada Balsam (μ=1.55)', 'ta') +
        LA(20, 90, 70, 90) +
        T(10, 80, 'Unpolarized', 't') +
        LA(70, 90, 160, 95) +
        LA(160, 95, 190, 130) +
        T(195, 140, 'O-ray totally reflected', 't') +
        LA(160, 95, 330, 80) +
        T(270, 70, 'Pure E-ray (polarized)', 'ta') +
        T(20, 180, 'μ_o (1.658) > μ_balsam (1.550) > μ_e (1.486) → TIR eliminates O-ray', 'ta')
      ),
      caption: 'Nicol prism: Canada balsam layer causes total internal reflection of O-ray while transmitting polarized E-ray.',
    },
  },
};
