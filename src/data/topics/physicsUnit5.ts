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

export const PHY_UNIT5_TOPICS: Record<string, TopicContent> = {
  'phy:5:0': {
    explain: [
      'In this lab experiment, we mount a plane diffraction grating on the turntable of an optical spectrometer.',
      'By focusing the telescope onto diffracted spectral lines and reading the circular vernier scale on both sides, we calculate the exact wavelength of mercury emission lines.',
    ],
    definition:
      'The diffraction grating experiment determines the unknown wavelength of spectral lines emitted by a light source (such as mercury vapor) using a spectrometer and a diffraction grating of known ruling density.',
    formula: '\\lambda = \\frac{(a + b) \\sin\\theta}{n}, \\quad (a + b) = \\frac{2.54 \\text{ cm}}{N} \\quad (N = 15,000 \\text{ lines/inch})',
    steps: [
      'Level the spectrometer using spirit level; focus crosswire on distant object (Schuster’s method).',
      'Mount diffraction grating on central turntable strictly perpendicular to collimated beam.',
      'Observe central undiffracted image (n = 0) and record reference vernier angles V₁ and V₂.',
      'Swing telescope to left and right to observe first-order (n = 1) and second-order (n = 2) spectral lines (violet, green, yellow doublet).',
      'Calculate diffraction angle 2θ = |θ_left - θ_right|, hence obtain θ.',
      'Calculate wavelength λ = [(a + b) sin θ] / n.',
    ],
    examAnswer: [
      'State working formula: λ = [(a + b) sin θ] / n.',
      'List spectrometer adjustments in order: leveling turntable, collimator focusing, and normal incidence adjustment.',
      'Explain why readings are taken from both Vernier 1 and Vernier 2 (eliminates eccentricity error of the graduated circle).',
      'Identify key mercury wavelengths: Green (~546.1 nm), Yellow doublet (~577 nm and 579 nm).',
    ],
    slip: 'Forgetting to divide the angular difference by 2: reading between left and right spectral lines gives 2θ, not θ.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'SPECTROMETER DIFFRACTION GRATING EXPERIMENT', 'ta') +
        R(30, 85, 70, 20, 'l') + T(40, 98, 'Collimator', 't') +
        C(160, 95, 30, 'l') +
        L(160, 80, 160, 110, 'ta') + T(140, 75, 'Grating (a+b)', 'ta') +
        LA(100, 95, 155, 95) +
        LA(165, 95, 270, 95) + T(280, 98, 'n = 0 (Direct)', 't') +
        LA(165, 95, 260, 55) + T(270, 58, 'n = +1 (θ)', 'ta') +
        LA(165, 95, 260, 135) + T(270, 138, 'n = −1 (θ)', 'ta') +
        T(20, 180, 'λ = (a+b)sin(θ) / n   |   Vernier readings eliminate circular eccentricity error', 'ta')
      ),
      caption: 'Spectrometer layout for measuring spectral wavelengths with a transmission diffraction grating.',
    },
  },
  'phy:5:1': {
    explain: [
      'In this classic lab experiment, you look through a traveling microscope at a plano-convex lens resting on a flat glass plate under yellow sodium light.',
      'Measuring the left and right edges of 20 concentric dark rings gives ring diameters, whose squared differences plot a straight line to find the lens radius or sodium wavelength.',
    ],
    definition:
      'The Newton’s ring lab experiment determines the wavelength of monochromatic sodium light or the radius of curvature of a plano-convex lens by measuring ring diameters using a traveling microscope.',
    formula: '\\lambda = \\frac{D_{n+p}^2 - D_n^2}{4 p R}, \\quad R = \\frac{D_{n+p}^2 - D_n^2}{4 p \\lambda} \\quad (\\text{Slope of } D_n^2 \\text{ vs } n = 4\\lambda R)',
    steps: [
      'Clean lens and glass plate; illuminate with sodium lamp (λ = 5893 Å) reflected downwards by a 45° glass plate.',
      'Focus traveling microscope until sharp circular dark and bright interference rings are visible.',
      'Center the microscope crosswire on the central dark spot; move crosswire outward to 20th ring.',
      'Record micrometer readings for rings 20, 18, 16... down to 2 on left, then pass center and record rings 2, 4... 20 on right.',
      'Calculate diameter D_n = |reading_left - reading_right| for each order n.',
      'Plot D_n² versus ring number n: the graph is a straight line passing near origin with slope = 4λR.',
      'Calculate λ = slope / (4R) using known R measured by spherometer.',
    ],
    examAnswer: [
      'State formula: λ = (D_{n+p}² - D_n²) / (4pR).',
      'Explain role of 45° glass plate (directs light rays downward for strictly normal incidence).',
      'Explain why D_n² vs n graph is a straight line and how its slope gives 4λR.',
      'State why the center spot is dark in reflected light (Stokes’ phase reversal at glass air boundary).',
    ],
    slip: 'Measuring radius instead of diameter or reversing micrometer direction mid-measurement (introduces backlash error).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'NEWTON’S RINGS EXPERIMENT & D_n² VS n GRAPH', 'ta') +
        R(40, 50, 40, 70, 'l') + T(45, 90, 'Microscope', 't') +
        L(100, 70, 130, 100, 'ta') + T(90, 65, '45° Glass', 'ta') +
        L(80, 140, 160, 140, 'l') +
        P('M90 140 A60 60 0 0 1 150 140', 'l') +
        L(200, 140, 330, 140, 'l') + L(200, 140, 200, 40, 'l') +
        T(335, 145, 'n', 't') + T(185, 35, 'D_n²', 't') +
        L(210, 130, 310, 50, 'ta') +
        T(235, 75, 'Slope = 4λR', 'ta') +
        T(20, 180, 'λ = (D²_{n+p} − D²_n) / (4pR)   |   Straight line slope eliminates apex contact error', 'ta')
      ),
      caption: 'Traveling microscope setup and linear D_n² vs n plot used to compute sodium wavelength λ.',
    },
  },
  'phy:5:2': {
    explain: [
      'This experiment tests the optical limit of a telescope by viewing two narrow vertical black bars placed at the far end of the lab.',
      'By gradually shrinking an adjustable slit placed over the telescope objective until the two lines blur into a single smudge, we verify Rayleigh’s resolution criterion.',
    ],
    definition:
      'The resolving power of a telescope experiment measures the smallest angular separation between two distant objects that can just be distinguished as separate through the telescope objective.',
    formula: '\\theta = \\frac{d}{D}, \\quad \\theta_{\\text{theoretical}} = 1.22 \\frac{\\lambda}{a}, \\quad \\text{Resolving Power} = \\frac{a}{1.22\\lambda}',
    steps: [
      'Place two parallel vertical black slits of separation d on a well-illuminated frosted glass screen at distance D across the room.',
      'Mount an adjustable rectangular slit of variable width a over the telescope objective.',
      'Focus telescope on the two slits: two distinct bright lines are observed.',
      'Gradually narrow the slit width a until the two vertical lines just coalesce and merge into a single blurred image.',
      'Measure the slit width a at this just-resolved position using a micrometer screw gauge.',
      'Calculate experimental limit of resolution θ_exp = d / D and compare with theoretical value θ_theo = 1.22 λ / a.',
    ],
    examAnswer: [
      'Define resolving power of telescope and limit of resolution.',
      'State formula: Theoretical θ = 1.22 λ / a (or λ / a for rectangular slit) and Experimental θ = d / D.',
      'Explain how the experiment verifies Rayleigh’s criterion.',
      'Identify sources of error: inaccurate measurement of slit width a and human visual subjectivity in judging the merge point.',
    ],
    slip: 'Confusing distance D between telescope and object with the telescope focal length. D is the large distance (~3 to 5 meters) across the lab room.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'RESOLVING POWER OF TELESCOPE EXPERIMENT', 'ta') +
        L(30, 70, 30, 110, 'l') + L(40, 70, 40, 110, 'l') +
        T(15, 60, 'Double Slit (d)', 't') +
        LA(45, 90, 180, 90) + T(100, 80, 'Distance D (~5m)', 't') +
        R(180, 70, 20, 40, 'ta') + T(165, 60, 'Slit (a)', 'ta') +
        R(210, 65, 90, 50, 'l') + T(225, 95, 'Telescope', 't') +
        T(20, 180, 'Limit θ = d / D   |   Theoretical θ = 1.22 λ / a   |   Resolving Power = a / (1.22 λ)', 'ta')
      ),
      caption: 'Experimental setup: narrowing objective slit width a until distant slits separated by d merge.',
    },
  },
  'phy:5:3': {
    explain: [
      'A polarimeter measures how much an optically active liquid (like sugar syrup) twists the vibration plane of polarized light.',
      'Using a Laurent half-shade plate to match equal brightness across two halves of a circle, we calculate the specific rotation and sugar concentration.',
    ],
    definition:
      'The polarimeter experiment determines the specific rotation of an optically active substance (such as cane sugar solution) and measures unknown solution concentrations using polarized light.',
    formula: 'S = \\frac{\\theta}{l \\cdot c} \\quad [^\\circ / (\\text{dm}\\cdot\\text{g/cm}^3)], \\quad c = \\frac{\\theta}{l \\cdot S}',
    steps: [
      'Illuminate polarimeter with sodium lamp; light polarizes through fixed Nicol prism (polarizer).',
      'Passes through Laurent half-shade plate (semi-circular quartz plate of thickness λ/2) dividing field into two halves.',
      'Fill polarimeter tube of length l (decimeters) with pure distilled water; rotate analyzer until both halves show equal tint of darkness (zero reading θ₀).',
      'Replace water with cane sugar solution of known concentration c (g/cm³).',
      'Optical rotation shifts analyzer angle; rotate analyzer to restore equal tint condition (reading θ₁).',
      'Optical rotation angle is θ = |θ₁ - θ₀|; calculate specific rotation S = θ / (l · c).',
    ],
    examAnswer: [
      'State specific rotation formula: S = θ / (l · c) with units (°/(dm · g/cm³)).',
      'Explain the construction and purpose of the Laurent half-shade plate (divides field of view into two halves to replace subjective max/min judgment with sensitive equal-intensity comparison).',
      'Detail the procedure to eliminate zero error using pure distilled water.',
      'State specific rotation value for pure sucrose at room temperature (S ≈ +66.5° dm⁻¹ (g/cm³)⁻¹).',
    ],
    slip: 'Using polarimeter tube length l in centimeters instead of decimeters (1 dm = 10 cm).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'LAURENT HALF-SHADE POLARIMETER', 'ta') +
        R(30, 80, 20, 30, 'l') + T(20, 70, 'Polarizer', 't') +
        C(70, 95, 15, 'ta') + T(55, 70, 'Half-Shade', 'ta') +
        R(100, 85, 120, 20, 'fa') + T(115, 98, 'Sugar Tube (l dm)', 't') +
        R(240, 80, 20, 30, 'l') + T(230, 70, 'Analyzer', 't') +
        C(305, 95, 20, 'l') + L(305, 75, 305, 115, 'l') +
        T(285, 135, 'Equal Tint Match', 'ta') +
        T(20, 180, 'Specific Rotation: S = θ / (l · c)   |   Equal intensity tint yields precision angular match.', 'ta')
      ),
      caption: 'Polarimeter setup: Laurent half-shade plate creates two matched halves for precision rotation angle reading.',
    },
  },
  'phy:5:4': {
    explain: [
      'In this experiment (performed on optical bench or virtual lab), laser light emerges from an optical fiber tip in a conical beam.',
      'By projecting the light spot onto a screen at varying distances and measuring the spot diameter, we calculate the fiber’s Numerical Aperture.',
    ],
    definition:
      'The numerical aperture experiment measures the light-gathering capacity and acceptance cone angle of an optical fiber by projecting the far-field output beam onto a graduated screen.',
    formula: '\\text{NA} = \\sin\\theta_a = \\frac{W}{\\sqrt{4L^2 + W^2}} = \\frac{r}{\\sqrt{L^2 + r^2}} \\quad (W = 2r = \\text{spot diameter})',
    steps: [
      'Launch laser beam into one end of the optical fiber using microscopic objective lens.',
      'Mount output end of fiber perpendicular to a millimeter-graduated measurement screen at distance L.',
      'A circular red laser illumination spot of diameter W appears on the screen.',
      'Measure spot diameter W for varying screen distances L (e.g., L = 10 mm, 20 mm, 30 mm).',
      'Plot spot radius r = W/2 versus distance L; slope gives tan θ_a.',
      'Compute Numerical Aperture: NA = sin θ_a = r / √(L² + r²).',
      'Compare experimental NA with manufacturer core-cladding index specification NA = √(n₁² - n₂²).',
    ],
    examAnswer: [
      'State formula for NA in terms of spot radius r and distance L: NA = r / √(L² + r²).',
      'Draw the experimental ray-cone projection diagram showing fiber tip, distance L, and spot diameter W.',
      'Explain physical significance: NA determines light coupling efficiency from LED/laser into fiber core.',
      'Identify key sources of error: difficulty in discerning fuzzy circular spot edge (intensity drops as Gaussian profile).',
    ],
    slip: 'Using spot diameter W instead of spot radius r in the expression r / √(L² + r²).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'NUMERICAL APERTURE MEASUREMENT', 'ta') +
        R(30, 90, 80, 10, 'l') + T(30, 80, 'Fiber Tip', 't') +
        L(110, 95, 260, 45, 'ta') +
        L(110, 95, 260, 145, 'ta') +
        R(260, 35, 10, 120, 'fa') + T(275, 95, 'Screen', 't') +
        L(110, 95, 260, 95, 'd') +
        T(170, 90, 'L', 't') +
        L(250, 45, 250, 145, 'ta') + T(225, 125, 'W = 2r', 'ta') +
        T(20, 180, 'NA = sin(θ_a) = r / √(L² + r²)   |   Measures light-gathering acceptance cone', 'ta')
      ),
      caption: 'Far-field projection method for determining optical fiber Numerical Aperture NA.',
    },
  },
  'phy:5:5': {
    explain: [
      'This experiment measures the dielectric constant of solid insulating plates (glass, bakelite, mica) placed between the plates of a parallel-plate capacitor.',
      'By comparing capacitance with the dielectric inserted against air-filled capacitance using an AC bridge or resonance circuit, we calculate K = C / C₀.',
    ],
    definition:
      'The dielectric constant experiment measures the relative permittivity (dielectric constant K = ε_r) of solid insulating materials using a parallel-plate capacitor and capacitance bridge or LC resonance meter.',
    formula: 'K = \\varepsilon_r = \\frac{C}{C_0}, \\quad C_0 = \\frac{\\varepsilon_0 A}{d}, \\quad C = \\frac{K \\varepsilon_0 A}{d}',
    steps: [
      'Measure diameter of circular capacitor plates with vernier caliper to calculate area A = π D² / 4.',
      'Set plate separation d equal to sample slab thickness measured with micrometer screw gauge.',
      'Measure air capacitance C₀ with dielectric removed (or calculate C₀ = ε₀ A / d).',
      'Insert insulating dielectric slab (glass, mica, acrylic) firmly between plates to eliminate air gaps.',
      'Measure new capacitance C using digital LCR meter or de Sauty / Schering AC bridge.',
      'Calculate dielectric constant K = C / C₀.',
    ],
    examAnswer: [
      'State formula: K = C / C₀ and explain physical principle (dipole polarization reduces internal field, increasing charge storage).',
      'Describe apparatus: parallel plate capacitor with micrometer adjustment and digital LCR meter.',
      'Explain effect of air gaps between dielectric and plates (air gap forms series capacitor, reducing measured K below true value).',
      'List standard K values: Air ≈ 1.0, Bakelite ≈ 4–5, Glass ≈ 6–8, Water ≈ 80.',
    ],
    slip: 'Failing to eliminate air gaps between sample and capacitor plates, which leads to severely underestimated dielectric constants.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'DIELECTRIC CONSTANT MEASUREMENT', 'ta') +
        R(80, 50, 12, 90, 'l') + R(220, 50, 12, 90, 'l') +
        R(92, 50, 128, 90, 'fa') +
        T(115, 95, 'Sample Slab (K, d)', 'ta') +
        L(80, 95, 30, 95) + L(232, 95, 280, 95) +
        R(280, 75, 60, 40, 'l') + T(285, 98, 'LCR Meter', 't') +
        T(20, 180, 'K = C / C₀   |   Inserting dielectric multiplies capacitance by K = 1 + χ_e', 'ta')
      ),
      caption: 'Capacitance measurement setup for determining dielectric constant K = C / C₀.',
    },
  },
  'phy:5:6': {
    explain: [
      'In this experiment, light of different colors (frequencies) hits a photocell, knocking out photoelectrons.',
      'By applying a reverse stopping voltage V₀ just strong enough to choke the photocurrent to zero, we plot V₀ versus frequency ν; the slope of the straight line yields Planck’s constant h.',
    ],
    definition:
      'The measurement of Planck’s constant experiment uses a photoelectric vacuum cell illuminated by monochromatic filters of known wavelengths to determine h from the slope of stopping potential versus optical frequency.',
    formula: 'e V_0 = h \\nu - \\Phi \\implies V_0 = \\left( \\frac{h}{e} \\right) \\nu - \\frac{\\Phi}{e}, \\quad h = e \\times \\text{Slope}',
    steps: [
      'Illuminate phototube with light from mercury lamp filtered through optical color filters (yellow, green, blue, violet).',
      'Calculate light frequency ν = c / λ for each filter.',
      'Apply variable reverse retarding voltage to anode; observe photocurrent on sensitive nanoammeter.',
      'Increase reverse voltage until photocurrent drops precisely to zero; record stopping potential V₀.',
      'Repeat for all color filters to obtain stopping potentials V₀ for each frequency ν.',
      'Plot stopping potential V₀ (y-axis) versus frequency ν (x-axis): graph is a straight line.',
      'Measure slope = ΔV₀ / Δν; calculate Planck’s constant h = e × slope (e = 1.6×10⁻¹⁹ C).',
    ],
    examAnswer: [
      'State Einstein’s photoelectric equation: eV₀ = hν - Φ.',
      'Explain why stopping potential depends on frequency but is completely independent of light intensity.',
      'Draw the V₀ versus ν graph showing threshold frequency ν₀ as x-intercept and work function Φ/e as y-intercept.',
      'Calculate h = e × slope and compare with standard value h = 6.626 × 10⁻³⁴ J·s.',
    ],
    slip: 'Plotting V₀ against wavelength λ instead of frequency ν = c/λ. The graph against λ is hyperbolic, not a straight line.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'PLANCK’S CONSTANT: V₀ VS FREQUENCY ν', 'ta') +
        L(40, 140, 320, 140, 'l') + L(80, 160, 80, 30, 'l') +
        T(325, 145, 'ν (Hz)', 't') + T(60, 30, 'V₀ (V)', 't') +
        L(110, 140, 300, 40, 'ta') +
        T(115, 155, 'ν₀ (threshold)', 't') +
        T(200, 70, 'Slope = h / e', 'ta') +
        T(200, 90, 'h = e × Slope', 't') +
        L(80, 140, 80, 160, 'd') +
        T(20, 180, 'eV₀ = hν − Φ   |   Stopping potential is independent of intensity; slope gives h/e', 'ta')
      ),
      caption: 'Linear plot of stopping potential V₀ versus radiation frequency ν used to calculate Planck’s constant h.',
    },
  },
  'phy:5:7': {
    explain: [
      'The Stern-Gerlach experiment fired a beam of neutral silver atoms through an inhomogeneous magnetic field.',
      'Instead of smearing out across a continuous band as classical physics predicted, the beam split cleanly into two distinct tracks, proving electron spin is quantized into +½ and -½.',
    ],
    definition:
      'The Stern-Gerlach experiment demonstrates the spatial quantization of angular momentum and the existence of intrinsic electron spin (s = ½) by observing the discrete splitting of an atomic beam in an inhomogeneous magnetic field.',
    formula: 'F_z = -\\mu_z \\frac{\\partial B_z}{\\partial z} = -g_s \\mu_B m_s \\frac{\\partial B_z}{\\partial z}, \\quad m_s = \\pm \\frac{1}{2}',
    steps: [
      'Silver atoms vaporized in an electric oven emerge through collimating slits into high vacuum.',
      'The atomic beam passes between specially shaped magnet poles (one knife-edge, one grooved) creating strong field gradient ∂B_z / ∂z.',
      'Magnetic dipole moment of silver atom is due to single unpaired 5s valence electron: μ_z = -g_s μ_B m_s.',
      'Force on atom: F_z = μ_z (∂B_z / ∂z) = ± μ_B (∂B_z / ∂z).',
      'Classical theory predicted random dipole orientations, resulting in a continuous smudge on the detection plate.',
      'Experimentally, the beam split into exactly two discrete separated lines (m_s = +½ spin up, m_s = -½ spin down), proving space quantization.',
    ],
    examAnswer: [
      'Draw schematic: oven, collimator, knife-edge magnet poles, and detector plate showing two split beams.',
      'Explain the necessity of an inhomogeneous magnetic field (in a uniform field, net force is zero; a field gradient ∂B/∂z is required to exert net deflecting force).',
      'Contrast classical prediction (continuous vertical trace) vs quantum observation (two discrete spots).',
      'Explain significance: experimental discovery of intrinsic electron spin ½ and proof of spatial quantization.',
    ],
    slip: 'Claiming a uniform magnetic field can split the beam. In a uniform field, equal and opposite forces on the two poles cancel (F_net = 0); an inhomogeneous gradient ∂B/∂z is indispensable.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'STERN-GERLACH EXPERIMENT & SPIN QUANTIZATION', 'ta') +
        R(30, 85, 30, 20, 'l') + T(20, 80, 'Oven', 't') +
        LA(65, 95, 120, 95) + T(75, 85, 'Ag beam', 't') +
        P('M130 65 L170 50 L210 65 Z', 'ta') + T(145, 45, 'N (knife-edge)', 'ta') +
        R(130, 125, 80, 20, 'l') + T(150, 140, 'S (grooved)', 't') +
        LA(215, 90, 290, 65) + LA(215, 100, 290, 125) +
        R(295, 45, 10, 100, 'fa') +
        C(300, 65, 4, 'ta') + T(310, 68, 'Spin Up (+½)', 'ta') +
        C(300, 125, 4, 'ta') + T(310, 128, 'Spin Down (−½)', 'ta') +
        T(20, 180, 'Inhomogeneous field gradient ∂B_z/∂z splits beam into 2 discrete quantum spin states.', 'ta')
      ),
      caption: 'Stern-Gerlach apparatus: atomic beam splits into two discrete lines, proving electron spin quantization.',
    },
  },
  'phy:5:8': {
    explain: [
      'This lab experiment measures the forward and reverse current-voltage characteristics of a silicon or germanium P-N junction diode.',
      'In forward bias, current surges exponentially once the knee barrier (~0.7V for Si) is overcome; in reverse bias, current remains tiny until sharp avalanche/Zener breakdown.',
    ],
    definition:
      'The P-N junction diode experiment investigates semiconductor rectification by plotting current versus voltage in forward and reverse bias, determining the knee voltage (barrier potential V_k) and reverse breakdown voltage.',
    formula: 'I = I_0 \\left( e^{qV / \\eta kT} - 1 \\right), \\quad V_k(\\text{Si}) \\approx 0.7 \\text{ V}, \\quad V_k(\\text{Ge}) \\approx 0.3 \\text{ V}',
    steps: [
      'Forward Bias Setup: connect diode p-side to battery positive and n-side to battery negative through milliammeter and voltmeter.',
      'Increase forward voltage in 0.1 V steps; record forward voltage V_F and forward current I_F.',
      'Observe that current is negligible until knee voltage (0.7 V for Si, 0.3 V for Ge), beyond which current rises exponentially.',
      'Reverse Bias Setup: reverse battery polarities; insert microammeter (μA).',
      'Increase reverse voltage; record reverse voltage V_R and reverse saturation current I_R (~few μA).',
      'Calculate dynamic forward resistance r_d = ΔV_F / ΔI_F in the linear conduction region.',
    ],
    examAnswer: [
      'Draw the complete forward and reverse bias circuit diagrams with proper voltmeter and ammeter polarities.',
      'Draw the complete I-V characteristic curve across Quadrants I and III, labeling knee voltage V_k, reverse saturation current I₀, and breakdown voltage V_z.',
      'Compare silicon vs germanium: knee voltage (0.7 V vs 0.3 V) and reverse saturation current (nA vs μA).',
      'Calculate dynamic forward resistance: r_d = ΔV_F / ΔI_F.',
    ],
    slip: 'Using a milliammeter (mA) in the reverse bias circuit. Reverse saturation current is in microamperes (μA), so a milliammeter will read zero.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'P-N JUNCTION DIODE I-V CHARACTERISTIC', 'ta') +
        L(30, 100, 330, 100, 'l') + L(180, 20, 180, 170, 'l') +
        T(335, 105, 'V_F (V)', 't') + T(185, 25, 'I_F (mA)', 't') +
        T(10, 105, 'V_R', 't') + T(185, 165, 'I_R (μA)', 't') +
        P('M180 100 L230 100 Q250 100 270 30', 'ta') +
        T(220, 115, 'V_k ≈ 0.7V (Si)', 'ta') +
        P('M180 100 L90 105 L90 160', 'l') +
        T(60, 125, 'Breakdown V_z', 't') +
        T(100, 95, 'Reverse I₀', 't') +
        T(20, 180, 'I = I₀(e^{qV/kT} − 1)   |   Forward knee: 0.7V (Si) / 0.3V (Ge)   |   Dynamic r_d = ΔV/ΔI', 'ta')
      ),
      caption: 'Complete P-N junction diode I-V characteristic curve showing knee threshold and reverse breakdown.',
    },
  },
  'phy:5:9': {
    explain: [
      'In this laboratory experiment, a bismuth or germanium probe carrying a known DC current is inserted between the pole pieces of a powerful electromagnet.',
      'Measuring the tiny microvolt Hall voltage produced across the probe width determines the Hall coefficient, carrier density, and carrier mobility.',
    ],
    definition:
      'The Hall effect laboratory experiment experimentally determines the Hall coefficient R_H, carrier concentration n, and carrier mobility μ of a semiconductor probe by measuring transverse Hall voltage V_H inside a calibrated magnetic field B.',
    formula: 'R_H = \\frac{V_H \\cdot t}{I \\cdot B}, \\quad n = \\frac{1}{q |R_H|}, \\quad \\mu_H = \\sigma |R_H| = \\frac{l}{w \\cdot t \\cdot R} |R_H|',
    steps: [
      'Calibrate electromagnet using digital gaussmeter probe; plot magnetic field B (Gauss) versus magnetizing current I_m.',
      'Mount semiconductor sample probe (n-Ge or p-Ge of thickness t) between electromagnet pole pieces.',
      'Pass a constant probe current I (mA) through the sample; set magnetic field to zero to balance probe offset voltage.',
      'Turn on electromagnet; record transverse Hall voltage V_H (mV) for varying magnetic fields B.',
      'Plot Hall voltage V_H versus magnetic field B: graph is a straight line through the origin.',
      'Determine slope = V_H / B; calculate Hall coefficient R_H = (slope · t) / I.',
      'Calculate carrier concentration n = 1 / (q R_H) and mobility μ_H = σ R_H.',
    ],
    examAnswer: [
      'State the working formulas: R_H = (V_H · t) / (I · B) and n = 1 / (q R_H).',
      'Draw the circuit connection diagram showing electromagnet supply, constant current probe supply, and digital millivoltmeter.',
      'Explain how the sign of V_H reveals whether the semiconductor is n-type (negative) or p-type (positive).',
      'Explain zero-field offset voltage and how it is eliminated by reversing the magnetic field direction.',
    ],
    slip: 'Neglecting the zero-field potential difference caused by non-aligned Hall probe contacts. Always reverse the magnetic field to cancel this misalignment error: V_H = (V_forward - V_reverse) / 2.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'HALL EFFECT EXPERIMENT SETUP & GRAPH', 'ta') +
        R(40, 50, 40, 70, 'l') + T(45, 90, 'Pole N', 't') +
        R(130, 50, 40, 70, 'l') + T(135, 90, 'Pole S', 't') +
        R(90, 60, 30, 50, 'fa') + T(93, 85, 'Probe', 'ta') +
        L(200, 130, 320, 130, 'l') + L(200, 130, 200, 40, 'l') +
        T(325, 135, 'B (Gauss)', 't') + T(185, 35, 'V_H (mV)', 't') +
        L(200, 130, 300, 50, 'ta') +
        T(230, 75, 'Slope = V_H / B', 'ta') +
        T(20, 180, 'R_H = (V_H · t) / (I · B)   |   Carrier density n = 1 / (q R_H)   |   Mobility μ = σ R_H', 'ta')
      ),
      caption: 'Electromagnet pole setup and linear Hall voltage V_H versus magnetic field B plot.',
    },
  },
  'phy:5:10': {
    explain: [
      'In this experiment, a four-probe arrangement touches a germanium crystal heated inside an oven.',
      'As temperature rises, thermal energy kicks valence electrons across the bandgap into the conduction band; plotting log of resistance against 1/T yields the energy bandgap E_g.',
    ],
    definition:
      'The four-probe bandgap experiment determines the forbidden energy bandgap E_g of a semiconductor by measuring its electrical resistivity as a function of temperature over the intrinsic conduction range.',
    formula: '\\rho = \\rho_0 e^{E_g / 2kT} \\implies \\ln\\rho = \\ln\\rho_0 + \\frac{E_g}{2k} \\left(\\frac{1}{T}\\right), \\quad E_g = 2k \\times \\text{Slope}',
    steps: [
      'Four collinear, equally spaced tungsten probes touch the flat surface of a semiconductor crystal.',
      'Outer two probes pass a constant DC current I; inner two probes measure floating potential difference V (eliminates contact resistance error).',
      'Resistivity formula for probe spacing s: ρ = (V / I) · 2πs / f(w/s).',
      'Place sample inside an electric oven; heat to ~150°C.',
      'Record voltage V and temperature T (using thermocouple) as the oven slowly cools.',
      'Plot ln ρ (or log₁₀ ρ) on y-axis versus 1/T (in Kelvin⁻¹) on x-axis: intrinsic region yields a straight line with slope m = E_g / (2k).',
      'Calculate bandgap: E_g = 2k × slope = 2 × (8.617 × 10⁻⁵ eV/K) × slope.',
    ],
    examAnswer: [
      'Explain the crucial advantage of the Four-Probe method over a 2-probe method (eliminates probe-semiconductor contact resistance and spreading resistance).',
      'Derive the resistivity equation ρ = (V/I) · 2πs for semi-infinite crystal.',
      'Show that slope of ln ρ vs 1/T equals E_g / (2k).',
      'Calculate E_g for Germanium (~0.7 eV) from experimental slope.',
    ],
    slip: 'Forgetting to convert temperature to Kelvin: T(K) = T(°C) + 273.15. Using Celsius ruins the slope.',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'FOUR-PROBE METHOD & ln(ρ) VS 1/T GRAPH', 'ta') +
        R(30, 85, 140, 25, 'fa') + T(50, 102, 'Semiconductor Slab', 't') +
        L(50, 50, 50, 85, 'l') + L(80, 50, 80, 85, 'ta') +
        L(110, 50, 110, 85, 'ta') + L(140, 50, 140, 85, 'l') +
        T(35, 45, 'I In', 't') + T(135, 45, 'I Out', 't') +
        T(75, 45, 'V (inner)', 'ta') +
        L(200, 130, 330, 130, 'l') + L(200, 130, 200, 40, 'l') +
        T(315, 145, '1/T (K⁻¹)', 't') + T(185, 35, 'ln ρ', 't') +
        L(210, 120, 310, 50, 'ta') +
        T(235, 75, 'Slope = E_g / (2k)', 'ta') +
        T(20, 180, 'E_g = 2k × Slope (ln ρ vs 1/T)   |   Four-probe eliminates contact resistance errors', 'ta')
      ),
      caption: 'Four-probe collinear arrangement and Arrhenius ln ρ versus 1/T plot for measuring bandgap E_g.',
    },
  },
  'phy:5:11': {
    explain: [
      'In this experiment, colloidal solutions containing gold or semiconductor nanoparticles of different sizes are analyzed using a UV-Visible spectrophotometer.',
      'As nanoparticle size shrinks, quantum confinement widens the bandgap, causing the light absorption peak to shift dramatically toward the ultraviolet (blue shift).',
    ],
    definition:
      'The nanoparticle size-dependent light absorption experiment investigates quantum confinement and surface plasmon resonance by observing the spectral blue-shift in absorption peaks as nanoparticle diameter decreases.',
    formula: '\\Delta E_g = \\frac{\\hbar^2 \\pi^2}{2 \\mu R^2}, \\quad \\lambda_{\\text{peak}} = \\frac{hc}{E_g(R)} \\implies \\lambda_{\\text{peak}} \\propto R',
    steps: [
      'Synthesize colloidal semiconductor (CdS, CdSe) or metal (gold, silver) nanoparticles with varying reaction times to control cluster size R.',
      'Pour colloidal samples into quartz cuvettes; place in double-beam UV-Vis spectrophotometer.',
      'Scan absorbance across wavelength range 300 nm to 800 nm against reference solvent.',
      'Identify wavelength of maximum absorption peak λ_peak for each nanoparticle sample.',
      'Observe that smaller diameter nanoparticles exhibit absorption peaks at shorter wavelengths (blue-shifted).',
      'Compute effective bandgap E_g = hc / λ_peak; plot E_g versus 1/R² to confirm Brus equation for quantum confinement.',
    ],
    examAnswer: [
      'Explain quantum confinement and write the Brus formula: E_g(R) = E_g(bulk) + ħ²π²/(2μ R²) - 1.8e²/(4πε R).',
      'Define Surface Plasmon Resonance (SPR) in noble metal nanoparticles (collective oscillation of conduction electrons).',
      'Explain why shrinking nanoparticle size produces a blue-shift (smaller size increases energy gap between discrete states).',
      'Provide experimental evidence: CdSe quantum dots change fluorescent color from red to green to blue as size drops from 6 nm to 2 nm.',
    ],
    slip: 'Saying smaller particles absorb longer wavelengths (red shift). Smaller size means stronger confinement, wider bandgap, and shorter wavelength absorption (blue shift).',
    diagram: {
      svg: S(
        360,
        190,
        T(8, 16, 'NANOPARTICLE SIZE VS ABSORPTION BLUE-SHIFT', 'ta') +
        L(40, 140, 320, 140, 'l') + L(40, 140, 40, 30, 'l') +
        T(325, 145, 'λ (nm)', 't') + T(15, 30, 'Abs', 't') +
        P('M70 140 Q110 50 150 140', 'ta') + T(95, 45, '2 nm (Blue peak)', 'ta') +
        P('M130 140 Q180 60 230 140', 'l') + T(175, 55, '4 nm (Green)', 't') +
        P('M200 140 Q250 70 300 140', 'l') + T(245, 65, '6 nm (Red)', 't') +
        LA(250, 95, 120, 95) +
        T(140, 115, 'Blue shift as R shrinks', 'ta') +
        T(20, 180, 'Brus Equation: E_g expands as 1/R² → smaller nanoparticles absorb bluer wavelengths', 'ta')
      ),
      caption: 'UV-Vis absorption spectra showing quantum confinement blue-shift as nanoparticle radius R decreases.',
    },
  },
};
