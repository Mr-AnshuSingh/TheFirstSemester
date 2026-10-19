import { Subject } from '@/types/syllabus';

/* ---------- helpers: hand-drawn notebook SVG ---------- */
const S = (w: number, h: number, b: string) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${b}</svg>`;
const L = (a: number, b: number, c: number, d: number, k = 'l') => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${k}"/>`;
const escT = (s: string) => String(s).replace(/&(?!(lt|gt|amp);)/g, '&amp;').replace(/</g, '&lt;');
const T = (x: number, y: number, s: string, k = 't', an = 'start') => `<text x="${x}" y="${y}" class="${k}" text-anchor="${an}">${escT(s)}</text>`;
const P = (d: string, k = 'l', m = '') => `<path d="${d}" class="${k}" ${m}/>`;
const C = (x: number, y: number, r: number, k = 'l') => `<circle cx="${x}" cy="${y}" r="${r}" class="${k}"/>`;
const R = (x: number, y: number, w: number, h: number, k = 'l') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${k}"/>`;
const AR = 'marker-end="url(#ar)"';
const LA = (a: number, b: number, c: number, d: number, k = 'a') => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${k}" marker-end="url(#ar)"/>`;

export const SUBJECTS: Subject[] = [];
SUBJECTS.push({
id:'math',code:'100102',name:'Engineering Mathematics-I',co:'Math-I',sub:'42 h theory · 3-0-0 · plus Sat remedial',fac:'Dr. G.N. Tripathi',cr:3,
tag:'Highest effort, highest return. Earn it every single day.',
why:'Math-I is the only subject on your timetable with a remedial slot, and that is the department telling you where students lose marks. Every question is a method you can drill: same steps, new numbers. Skip two weeks and you cannot catch up the night before; practise 45 minutes daily and it becomes the most predictable paper you sit.',
eff:5,ret:4,tint:'#3b3a35',bg:'#1b1a17',call:'Daily practice buys rank',
units:[
{t:'Basic Linear Algebra',h:'8h',topics:[
'★ Elementary transformations; rank by Echelon form','★ Rank by Normal form','Linear dependence and independence of vectors in Rⁿ','★ Consistency of a system of linear equations','★ Eigenvalues and eigenvectors','★ Cayley–Hamilton theorem','Similarity of matrices and diagonalization','★ Quadratic form and canonical form'],
s:'Rank means how many rows are truly independent. If one row is just a copy of two others added up, it adds nothing, so it does not count. Row operations are like tidying a messy desk without throwing anything away: the answer stays the same, the picture gets clearer. An eigenvector is a direction that a matrix only stretches and never turns; the stretch factor is the eigenvalue.',
k:['Rank = number of non-zero rows left in echelon form','Consistent ⇔ r(A) = r([A|B]); unique if r = n, infinite if r < n, none if ranks differ','Characteristic equation: |A − λI| = 0','Sum of eigenvalues = trace; product = determinant','Cayley–Hamilton: A satisfies its own characteristic equation; multiply by A⁻¹ to get the inverse','Diagonalize: P⁻¹AP = D, columns of P are eigenvectors']},
{t:'Differential Calculus: Single Variable',h:'8h',topics:[
'Higher order derivatives and successive differentiation','★ Leibnitz’s theorem','★ Rolle’s theorem','★ Lagrange’s mean value theorem','Cauchy’s mean value theorem','★ Indeterminate forms; L’Hôpital rule','Tangents and normals of algebraic and polar curves','★ Curvature'],
s:'Mean value theorems say: if you drove from A to B smoothly, at some moment your speed equalled your average speed. Rolle is the special case where you came back to the start, so at some moment you were standing still. L’Hôpital is for fractions that look like 0/0: differentiate top and bottom separately and try again. Curvature tells you how sharply a road bends; a tight bend has a small circle that fits it.',
k:['Leibnitz: (uv)ₙ = Σ ⁿCᵣ uₙ₋ᵣ vᵣ','Rolle: f continuous on [a,b], differentiable on (a,b), f(a)=f(b) ⇒ f′(c)=0','Lagrange: f′(c) = [f(b) − f(a)]/(b − a)','L’Hôpital works only for 0/0 or ∞/∞; other forms must be converted first','Curvature κ = y₂ / (1 + y₁²)^(3/2); radius ρ = 1/κ','Polar: tan φ = r·dθ/dr']},
{t:'Differential Calculus: Several Variables',h:'9h',topics:[
'Partial differentiation','★ Euler’s theorem on homogeneous functions','Limit, continuity and differentiability of functions of several variables','★ Taylor’s theorem with various forms of remainder','Maclaurin’s theorem and related problems','★ Maxima and minima of several variables','★ Lagrange’s multiplier method'],
s:'A partial derivative asks how the answer changes when you nudge one input and freeze the rest, like turning only the bass knob. A homogeneous function scales cleanly: double every input and the output multiplies by 2ⁿ, and Euler’s theorem turns that into a formula. For maxima and minima, find where the surface is flat, then check its curvature to see whether you are on a hilltop, in a valley or on a saddle. Lagrange multipliers find the highest point of a hill while forced to walk along a fixed path.',
k:['Euler: x·fₓ + y·f_y = n·f','Second order: x²fₓₓ + 2xy·fₓᵧ + y²f_yy = n(n−1)f','Stationary: fₓ = 0 and f_y = 0; let r = fₓₓ, s = fₓᵧ, t = f_yy','rt − s² > 0 and r < 0 → maximum; rt − s² > 0 and r > 0 → minimum','rt − s² < 0 → saddle; rt − s² = 0 → test fails','Lagrange: build F = f + λφ, set Fₓ = F_y = F_z = 0 and φ = 0']},
{t:'Integral Calculus',h:'9h',topics:[
'★ Differentiation under the integral sign (Leibnitz’s rule)','★ Double integral','★ Change of order of integration','Double integral in polar co-ordinates','Triple integral','Triple integral in spherical and cylindrical polar co-ordinates','★ Beta function','★ Gamma function','Elliptic integral','Relation between Beta and Gamma functions; general properties'],
s:'A double integral adds up tiny boxes over a flat region, and a triple integral does it for a solid. Changing the order of integration is just slicing the same region the other way: draw the region first and read off the new limits from the picture. Polar, cylindrical and spherical coordinates are the right ruler when the shape is round. Beta and Gamma turn awkward integrals into a factorial-like lookup.',
k:['Leibnitz rule: d/dx ∫ₐ₍ₓ₎^b₍ₓ₎ f(x,t)dt = ∫ ∂f/∂x dt + f(x,b)·b′ − f(x,a)·a′','Polar: dx dy = r dr dθ','Cylindrical: dV = r dr dθ dz','Spherical: dV = r² sinθ dr dθ dφ','Γ(n+1) = nΓ(n); Γ(½) = √π; Γ(n+1) = n! for integer n','B(m,n) = Γ(m)Γ(n)/Γ(m+n) = 2∫₀^(π/2) sin^(2m−1)θ cos^(2n−1)θ dθ']},
{t:'Vector Calculus',h:'8h',topics:[
'★ Scalar and vector fields; gradient','★ Divergence and curl with physical meaning','Tangent plane; directional derivative','Line, surface and volume integrals','★ Green’s theorem: verification and evaluation','★ Stokes’ theorem: verification and evaluation','★ Gauss divergence theorem: verification and evaluation'],
s:'Gradient points uphill, as steep as it gets, and is always at right angles to the contour line. Divergence asks whether a field is a tap (spreading out) or a drain (sucking in) at a point. Curl asks whether a tiny paddle wheel placed there would spin. The three big theorems say the same thing in different clothes: what happens along the boundary equals what happens inside.',
k:['∇φ is normal to the surface φ = c; directional derivative = ∇φ · û','∇·(∇×F) = 0 and ∇×(∇φ) = 0','Green: ∮(P dx + Q dy) = ∬(∂Q/∂x − ∂P/∂y) dA','Stokes: ∮F·dr = ∬(∇×F)·n̂ dS','Gauss: ∯F·n̂ dS = ∭∇·F dV','To verify a theorem, compute both sides separately and show they match']}
],
dg:[
{svg:S(360,200,
 T(8,16,'REDUCE TO ECHELON FORM','ta')+
 T(10,50,'[ 2  1 −1 | 8 ]')+T(10,66,'[−3 −1  2 |−11]')+T(10,82,'[−2  1  2 | −3]')+
 L(112,66,150,66,'a" '+AR+' x="')+T(116,58,'R₂+³⁄₂R₁','t')+T(116,92,'R₃+R₁','t')+
 T(158,50,'[ 2  1  −1 | 8 ]')+T(158,66,'[ 0 ½   ½ | 1 ]')+T(158,82,'[ 0  2   1 | 5 ]')+
 L(262,66,298,66,'a" '+AR+' x="')+T(264,58,'R₃−4R₂','t')+
 T(10,130,'[ 2  1  −1 | 8 ]')+T(10,146,'[ 0 ½  ½ | 1 ]')+T(10,162,'[ 0  0  −1 | 1 ]')+
 C(14,130,0.1,'d')+P('M6 120 L120 120 L120 170 L6 170 Z','d')+
 T(140,134,'3 pivots → rank = 3','ta')+T(140,150,'z = −1, y = 3, x = 2','t')+T(140,166,'back-substitute upward','t')),
 c:'Row-reducing an augmented matrix to echelon form. Rank is the pivot count; solve from the bottom row up.'},
{svg:S(360,190,
 T(8,16,'CONSISTENCY DECISION','ta')+
 R(110,26,140,30)+T(180,46,'find r(A) and r(A|B)','t','middle')+
 L(180,56,180,76)+P('M180 76 L120 106 L180 136 L240 106 Z','l')+T(180,110,'equal?','t','middle')+
 L(120,106,60,106,'a" '+AR+' x="')+T(88,98,'no','ta','middle')+R(10,112,100,38)+T(60,128,'INCONSISTENT','t','middle')+T(60,142,'no solution','t','middle')+
 L(240,106,300,106,'a" '+AR+' x="')+T(270,98,'yes','ta','middle')+R(250,90,100,34,'l')+T(300,106,'CONSISTENT','t','middle')+
 L(300,124,300,142)+T(300,156,'r = n  unique','ta','middle')+T(300,172,'r < n  infinite','t','middle')),
 c:'Test r(A) against r(A|B), then compare r with the number of unknowns n.'},
{svg:S(360,190,
 T(8,16,'ROLLE / LAGRANGE, SEEN','ta')+
 P('M30 150 L330 150','l')+L(30,150,30,30)+
 P('M50 120 C110 40 170 30 220 70 C260 100 290 90 320 60','l')+
 L(50,120,320,60,'d')+L(120,36,250,78,'a')+C(184,52,3,'a')+
 T(184,28,'tangent ∥ chord at x = c','ta','middle')+T(50,168,'a','t','middle')+T(320,168,'b','t','middle')+
 L(50,150,50,120,'d')+L(320,150,320,60,'d')+T(184,168,'c','t','middle')+L(184,52,184,150,'d')),
 c:'Lagrange: somewhere between a and b the tangent is parallel to the chord. Rolle is the case with a flat chord.'},
{svg:S(360,190,
 T(8,16,'SECOND DERIVATIVE TEST','ta')+
 R(100,26,160,28)+T(180,44,'solve fₓ = 0, f_y = 0','t','middle')+L(180,54,180,72)+
 R(100,72,160,28)+T(180,90,'r = fₓₓ, s = fₓᵧ, t = f_yy','t','middle')+L(180,100,180,118)+
 R(100,118,160,28)+T(180,136,'compute rt − s²','t','middle')+
 L(130,146,50,164)+L(180,146,180,164)+L(230,146,310,164)+
 T(50,178,'>0, r<0 : MAX','ta','middle')+T(180,178,'<0 : SADDLE','t','middle')+T(310,178,'>0, r>0 : MIN','ta','middle')),
 c:'Classify a stationary point with rt − s². If it equals zero the test is silent and you must check by other means.'},
{svg:S(360,190,
 T(8,16,'CHANGE THE ORDER','ta')+
 L(30,160,170,160)+L(30,160,30,30)+P('M30 160 L150 40','l')+L(150,40,150,160,'d')+
 P('M30 160 L150 160 L150 40 Z','fa')+T(100,150,'R','t','middle')+
 T(40,28,'y','t')+T(176,164,'x','t')+
 L(60,100,120,100,'a" '+AR+' x="')+T(190,50,'dy-strip first:','ta')+T(190,68,'y: 0 → x,  x: 0 → a','t')+
 T(190,100,'swap: dx-strip first','ta')+T(190,118,'x: y → a,  y: 0 → a','t')+T(190,146,'always draw R before','t')+T(190,160,'rewriting the limits','t')),
 c:'Sketch the region, then read the new limits from horizontal strips instead of vertical ones.'},
{svg:S(360,190,
 T(8,16,'THE THREE THEOREMS','ta')+
 C(70,100,40,'l')+P('M40 100 A30 14 0 0 0 100 100','d')+L(30,100,110,100,'d')+T(70,146,'Green: loop → area','t','middle')+
 P('M160 130 C170 60 250 60 260 120','l')+P('M160 130 C190 150 240 150 260 120','l')+P('M165 125 C190 100 230 100 255 118','a')+T(210,160,'Stokes: loop → surface','t','middle')+
 P('M290 60 C330 40 350 90 330 130 C310 160 280 140 280 110 C275 85 280 70 290 60 Z','l')+T(318,100,'∇·F','ta','middle')+T(318,172,'Gauss: surface → volume','t','middle')),
 c:'Boundary quantity on the left of each theorem equals the interior quantity on the right.'}
],
ex:{q:['Reduce the matrix to echelon or normal form and find its rank [long]','Test consistency and solve the system by rank method [long]','Verify Cayley–Hamilton for a given matrix and find its inverse or a higher power [long]','Reduce a quadratic form to canonical form and state its nature [long]','Verify Rolle’s or Lagrange’s theorem for a given function and interval [short-long]','Apply Euler’s theorem or find maxima/minima, including Lagrange multipliers [long]','Change the order of integration and evaluate; use polar coordinates [long]','Evaluate an integral using Beta and Gamma functions [short]','Verify Green’s, Stokes’ or Gauss’ theorem for a given field and region [long]'],
a:['Write the formula or theorem in one line first; marks are given for the setup','Show every row operation next to its row (R₂ → R₂ + 3R₁)','Draw the region before you write any limits on a double integral','State the conclusion in a sentence: “Hence rank = 3, system is consistent, unique solution”'],
x:['Dropping a minus sign in row operations and carrying it through five lines','Using L’Hôpital on a form that is not 0/0 or ∞/∞','Forgetting that rt − s² = 0 means the test fails, not that it is a saddle','Writing limits of integration before drawing the region','Verifying a theorem by computing only one side']},
fm:['Verify Cayley–Hamilton and find A⁻¹','Verify Rolle’s / Lagrange’s theorem on an interval','Standard Beta–Gamma evaluations (Γ(½) = √π)','Verify Green’s / Stokes’ / Gauss’ theorem','Rank by echelon form for a 3×4 matrix'],
hook:'Pivots give rank. Flat first, curve second. Draw the region, then the limits. Boundary equals inside.'
});
SUBJECTS.push({
id:'phy',code:'100104',name:'Engineering Physics',co:'Physics',sub:'42 h theory · 3-0-2 · lab on Friday',fac:'Dr. Niharika Kulshrestha',cr:4,
tag:'Four credits and five derivation-heavy units. Learn the derivations as drawings.',
why:'Physics carries 4 credits (3 theory plus 1 lab), the joint-largest weight on your timetable. Its TSOs say “derive”, “find the wavelength”, “calculate energy levels”, so the paper rewards the same dozen derivations and formulas every year. Learn each one as a picture plus three lines of algebra, and use the Friday lab to lock in the numerical side.',
eff:4,ret:4,tint:'#363a3a',bg:'#171b1b',call:'Derive it, then draw it',
units:[
{t:'Wave Optics',h:'8h',topics:[
'★ Interference by division of amplitude','★ Newton’s rings experiment','★ Michelson interferometer','Fraunhofer diffraction: single and double slit','Fraunhofer diffraction: circular aperture','★ Diffraction grating','★ Rayleigh criterion and resolving power of a telescope','Polarization and double-refracting crystal','Nicol prism'],
s:'Interference is two waves meeting: crest on crest makes bright, crest on trough makes dark. Newton’s rings are what you get when a curved lens sits on flat glass, so the air gap grows steadily outward and bright and dark circles appear. A diffraction grating is thousands of narrow slits that sharpen the pattern so you can measure wavelength. The Rayleigh criterion says two stars are just separable when the peak of one falls on the first dark ring of the other.',
k:['Newton’s rings (dark, reflected): Dₙ² = 4nλR','λ = (D²ₙ₊ₚ − D²ₙ) / (4pR)','Single slit minima: a sinθ = mλ','Grating: (a + b) sinθ = nλ; highest visible order n < (a + b)/λ','Rayleigh, circular aperture: sinθ ≈ 1.22 λ/D','Michelson: 2d = Nλ, so λ = 2Δd/N for N fringe shifts']},
{t:'Lasers and Optical Fiber',h:'8h',topics:[
'Characteristics of laser light','★ Einstein’s A and B coefficients','Population inversion and pumping mechanism','Optical resonator','★ Ruby laser','★ He–Ne laser','Semiconductor laser','★ Structure of optical fibre; TIR, acceptance angle and numerical aperture','Types of optical fibre','Propagation mechanism and attenuation in fibre','Applications of optical fibres and fibre optic sensors'],
s:'A normal bulb sends out waves of every colour and every timing, like a crowd talking. A laser is a crowd chanting one word in perfect time. To get that, you need more atoms waiting in the high energy level than the low one (population inversion), so that one passing photon triggers a chain of identical copies. A fibre keeps light inside by total internal reflection, like a mirror-lined pipe, and only light entering within the acceptance cone gets trapped.',
k:['Three processes: absorption, spontaneous emission (A₂₁), stimulated emission (B₂₁)','Equilibrium result: B₁₂ = B₂₁ and A₂₁/B₂₁ = 8πhν³/c³','Spontaneous : stimulated = e^(hν/kT) − 1','Critical angle: sin θc = n₂/n₁','NA = √(n₁² − n₂²) = sin θ₀ (launch from air)','Attenuation α = (10/L) log₁₀(Pin/Pout) dB/km']},
{t:'Electromagnetism and Propagation of Waves',h:'8h',topics:[
'Electric fields and Gauss’ law','★ Dielectrics and capacitors; Gauss’ law in dielectric media','Magnetic fields','★ Magnetic materials: dia, para and ferromagnetic','★ Maxwell’s equations in integral form','Electromagnetic waves','★ Poynting theorem and Poynting vector'],
s:'A dielectric is an insulator whose atoms stretch into tiny dipoles inside an electric field. Those dipoles push back against the field, so the field inside becomes weaker and a capacitor can hold more charge. Magnetic materials differ by how their atoms respond: diamagnets push the field out weakly, paramagnets pull it in weakly, ferromagnets pull it in strongly and stay magnetised. Maxwell’s four equations are the whole story of electricity and magnetism, and together they predict light as a travelling wave.',
k:['Gauss in dielectric: ∮D·dA = q_free, with D = ε₀E + P = εE','C = K·C₀ (K is the dielectric constant)','Maxwell (integral): ∮E·dA = q/ε₀; ∮B·dA = 0; ∮E·dl = −dΦB/dt; ∮B·dl = μ₀(I + ε₀ dΦE/dt)','Wave speed c = 1/√(μ₀ε₀); E = cB','Poynting vector S = E × H, direction of energy flow','Average |S| = ½ ε₀ c E₀² in free space']},
{t:'Quantum Mechanics',h:'8h',topics:[
'Need for quantum mechanics','★ De Broglie hypothesis','★ Heisenberg uncertainty principle','Wave function and its characteristics','★ Schrödinger’s equation: time-dependent and time-independent','★ Particle in a box: energy eigenvalues and eigenfunctions','★ Potential barrier and tunnelling'],
s:'Small things like electrons behave like waves, so each one gets a wavelength set by its momentum. You cannot know both exactly where something is and exactly how fast it moves; this is not a flaw in the instrument but a property of waves. A particle trapped in a box can only hold wavelengths that fit, like a guitar string pinned at both ends, so its energy comes in steps. Tunnelling means the wave leaks a little way through a wall, so there is a small chance the particle appears on the other side.',
k:['λ = h/p = h/√(2mE); electron through V volts: λ ≈ 12.27/√V Å','Δx · Δp ≥ ħ/2','Wave function must be single-valued, finite, continuous and normalisable: ∫|ψ|²dx = 1','Box of width L: Eₙ = n²h²/(8mL²), ψₙ = √(2/L) sin(nπx/L)','Zero-point energy: n = 1, never zero','Tunnelling: T ≈ e^(−2κa) with κ = √(2m(V₀ − E))/ħ']},
{t:'Semiconductors and Nano-materials',h:'10h',topics:[
'Types of materials: metal, semiconductor and insulator','Intrinsic and extrinsic semiconductors; p-type and n-type','★ Diffusion, drift and Fermi level','Photodiode','P-N junction transistor','LED','★ Hall effect','★ Solar cell and its characteristics','Introduction to nanoscience and nanotechnology; significance of the nanoscale','Unique properties: bulk versus nanomaterials, surface-to-volume ratio, band gap change','Classification of nanostructured materials: 0D (quantum dot), 1D (nanowire)'],
s:'Metals have no gap between filled and empty energy levels, insulators have a wide gap, and semiconductors sit in between so a little heat or doping lets some electrons cross. Drift is carriers pushed by a field; diffusion is carriers spreading from crowded to empty regions, like perfume in a room. The Hall effect uses a sideways voltage to reveal whether the carriers are positive or negative and how many there are. At the nanoscale most atoms sit on the surface and electrons are squeezed, so the same material changes colour and conductivity.',
k:['Drift current density J = nqμE = σE','Diffusion: J = qD(dn/dx); Einstein relation D/μ = kT/q','Hall: V_H = BI/(nqt); R_H = 1/(nq); negative sign means electrons','Solar cell: FF = Pmax/(I_sc × V_oc); efficiency = Pmax/Pin','Intrinsic Fermi level lies near mid-gap; n-type moves up, p-type moves down','Surface-to-volume ratio rises as size falls']},
{t:'Engineering Physics Lab (LE 1–12)',h:'2h/wk',topics:[
'Diffraction grating','★ Newton’s ring experiment','Resolving power of telescope','Polarimeter','Numerical aperture of optical fibre (virtual lab)','Dielectric constant','★ Measurement of Planck’s constant','Stern–Gerlach experiment (virtual lab)','★ p-n junction I–V characteristic','★ Hall effect experiment','Energy band gap measurement','Changing nanoparticle size alters light absorption'],
s:'Each experiment is the theory unit made measurable. Write the formula, the observation table, one sample calculation and the percentage error in every record. In the viva, expect “what is the principle, what does the graph slope give, what are the sources of error”.',
k:['Newton’s rings: plot D² versus n, slope = 4λR','Photocell: stopping potential versus frequency, slope = h/e','Specific rotation S = θ/(l·c)','Four-probe: band gap from slope of ln ρ versus 1/T, E_g = 2k × slope','Syllabus lists LE-8 as Stern–Gerlach but its outcome mentions electron wavelength: confirm with your lab teacher']}
],
dg:[
{svg:S(360,200,
 T(8,16,'NEWTON’S RINGS','ta')+
 L(30,150,200,150)+P('M60 150 A70 70 0 0 1 170 150','l')+L(50,156,180,156)+
 L(115,24,115,70,'d')+T(124,34,'light','t')+L(115,70,115,82,'a" '+AR+' x="')+
 C(290,100,12,'l')+C(290,100,26,'l')+C(290,100,38,'l')+C(290,100,48,'l')+
 T(290,170,'dark centre, D grows as √n','t','middle')+T(115,176,'lens on glass → air wedge','t','middle')+
 T(30,190,'2t cosr = nλ (dark)  →  Dₙ² = 4nλR','ta')),
 c:'Setup and ring pattern. Rings crowd together as you move outward because the air gap grows faster.'},
{svg:S(360,190,
 T(8,16,'SINGLE-SLIT INTENSITY','ta')+
 L(20,150,340,150)+L(180,150,180,30,'d')+
 P('M30 150 C70 150 80 140 95 120 C110 140 120 150 140 150 C160 150 170 80 180 36 C190 80 200 150 220 150 C240 150 250 140 265 120 C280 140 290 150 330 150','l')+
 T(180,26,'central max','ta','middle')+L(140,150,140,162,'a')+L(220,150,220,162,'a')+
 T(140,174,'−λ/a','t','middle')+T(220,174,'+λ/a','t','middle')+T(300,100,'a sinθ = mλ','ta')+T(300,116,'minima','t')),
 c:'Central maximum is twice as wide as the others; first minima at sinθ = ±λ/a.'},
{svg:S(360,200,
 T(8,16,'EINSTEIN PROCESSES','ta')+
 L(30,60,100,60)+L(30,140,100,140)+T(104,64,'E₂','t')+T(104,144,'E₁','t')+C(65,140,5,'fa')+LA(65,134,65,66,'a')+T(65,100,'hν','ta','middle')+T(65,172,'absorption','t','middle')+
 L(140,60,210,60)+L(140,140,210,140)+C(175,60,5,'fa')+LA(175,66,175,134,'a')+P('M175 96 q10 -6 20 0 t20 0','a')+T(175,172,'spontaneous','t','middle')+
 L(250,60,320,60)+L(250,140,320,140)+C(285,60,5,'fa')+LA(240,70,285,70,'a')+LA(285,66,285,134,'a')+P('M285 100 q10 -6 20 0 t20 0','a')+T(285,172,'stimulated: 2 in-phase photons','t','middle')),
 c:'Three ways light and atoms exchange energy. Stimulated emission gives a clone, which is the “amplification” in laser.'},
{svg:S(360,200,
 T(8,16,'OPTICAL FIBRE, ACCEPTANCE CONE','ta')+
 R(110,70,220,50)+L(110,95,330,95,'d')+T(220,86,'core  n₁','t','middle')+T(220,114,'cladding  n₂ &lt; n₁','t','middle')+
 L(30,95,110,95,'d')+LA(30,40,110,95,'a')+LA(30,150,110,95,'t')+P('M70 70 A28 28 0 0 1 70 120','l')+T(46,98,'θ₀','ta','middle')+
 P('M110 95 L150 72 L190 118 L230 74 L270 116 L310 78','a')+
 T(180,160,'NA = sin θ₀ = √(n₁² − n₂²)','ta','middle')+T(180,178,'outside the cone: light leaks out','t','middle')),
 c:'Light entering inside angle θ₀ zig-zags by total internal reflection; outside the cone it escapes into the cladding.'},
{svg:S(360,200,
 T(8,16,'PARTICLE IN A BOX','ta')+
 L(70,30,70,170)+L(290,30,290,170)+L(70,170,290,170)+
 L(70,150,290,150,'d')+P('M70 150 Q180 112 290 150','a')+T(300,152,'n = 1','t')+
 L(70,100,290,100,'d')+P('M70 100 Q125 60 180 100 Q235 140 290 100','a')+T(300,102,'n = 2','t')+
 L(70,50,290,50,'d')+T(300,52,'n = 3','t')+
 T(180,186,'width L,  Eₙ = n²h²/8mL²  (1 : 4 : 9)','ta','middle')),
 c:'Allowed wavelengths fit L = nλ/2, so energy goes as n². The lowest level is not zero.'},
{svg:S(360,200,
 T(8,16,'HALL EFFECT GEOMETRY','ta')+
 P('M90 80 L250 80 L290 50 L130 50 Z','l')+P('M90 80 L90 130 L250 130 L250 80','l')+P('M250 130 L290 100 L290 50','l')+
 LA(40,105,90,105,'a')+T(40,96,'I','ta')+LA(150,160,150,134,'t')+T(158,170,'B (into/out of plate)','t')+
 L(110,86,110,126,'d')+T(300,92,'V_H','ta')+T(180,190,'V_H = BI/(nqt),  R_H = 1/(nq)','ta','middle')),
 c:'Current along the plate, field across it, voltage appears on the third axis. Its sign tells carrier type.'},
{svg:S(360,200,
 T(8,16,'SOLAR CELL I–V','ta')+
 L(50,30,50,160)+L(50,160,320,160)+T(30,40,'I','t')+T(324,164,'V','t')+
 P('M50 48 L220 48 C260 52 285 90 292 160','l')+R(50,48,200,112,'d')+R(50,70,176,90,'fa')+
 T(52,42,'I_sc','ta')+T(292,174,'V_oc','ta','middle')+C(226,70,4,'a')+T(236,66,'max power point','t')+
 T(150,126,'Pmax','ta','middle')+T(180,192,'FF = Pmax /(I_sc × V_oc)','ta','middle')),
 c:'Fill factor compares the shaded rectangle at max power with the dashed I_sc × V_oc rectangle.'}
],
ex:{q:['Derive Einstein’s A and B relations [long]','Newton’s rings: derive diameter of nth dark ring and describe measuring wavelength [long]','Describe construction and working of Ruby and He–Ne lasers with energy-level diagram [long]','Derive numerical aperture and acceptance angle of optical fibre [long]','State Maxwell’s equations in integral form with physical meaning [long]','Derive energy eigenvalues and eigenfunctions of a particle in a 1-D box [long]','Explain Hall effect and derive Hall coefficient [long]','Solar cell characteristics and fill factor [short]','Numericals: grating order, de Broglie wavelength, NA, resolving power [short]'],
a:['Draw the diagram first; most derivations start from a labelled figure','Write the starting law, then each algebra step on its own line','Give the final formula in a box with units','For numericals: formula → substitution → answer with unit'],
x:['Using D instead of D² (or radius instead of diameter) in Newton’s rings','Forgetting condition n₂ < n₁ for total internal reflection','Not normalising ψ, so the constant √(2/L) is missing','Mixing up the sign of V_H for n-type and p-type','Quoting a result without the figure that makes it believable']},
fm:['Einstein’s A–B coefficient derivation','Dₙ² = 4nλR for Newton’s rings','NA = √(n₁² − n₂²)','Particle in a box: Eₙ and ψₙ','Hall coefficient R_H = 1/(nq)','Maxwell’s four equations with meaning'],
hook:'Fits-in-the-box means energy steps. Dark ring is 4nλR. Clone the photon, trap the light.'
});
SUBJECTS.push({
id:'beee',code:'100111',name:'Basics of Electrical & Electronics Engineering',co:'BEEE',sub:'42 h theory · 3-0-2 · lab Tue/Thu',fac:'Mr. Vikash Kumar',cr:4,
tag:'Four credits, formula-driven, and the units are independent. Strong marks per hour.',
why:'BEEE is 4 credits (3 theory plus 1 lab) and the questions are the same few types: solve a circuit, draw a phasor diagram, write the EMF equation, draw a rectifier with waveforms. Units do not depend on each other, so you can score from any one of them even if another is shaky. The 16-experiment lab doubles as revision for the theory.',
eff:3,ret:5,tint:'#3a3830',bg:'#1b1913',call:'Formulas plus clean diagrams',
units:[
{t:'Basic Electrical Circuits',h:'8h',topics:[
'Resistance, inductance and capacitance as active and passive elements','Unilateral and bilateral, linear and nonlinear elements','★ Ohm’s law and Kirchhoff’s current and voltage laws','Series and parallel circuits; voltage and current sources; source transformation','★ Mesh analysis','★ Nodal analysis','★ Current divider and voltage divider rules','★ Star–delta transformation'],
s:'Kirchhoff’s current law says what flows into a junction must flow out, like water at a pipe joint. His voltage law says that if you walk once around any loop, the rises and drops add to zero. Mesh analysis writes the voltage law for each loop; nodal analysis writes the current law for each junction. Pick whichever gives fewer equations.',
k:['V = IR; KCL: ΣI = 0 at a node; KVL: ΣV = 0 around a loop','Voltage divider: V₁ = V·R₁/(R₁ + R₂)','Current divider: I₁ = I·R₂/(R₁ + R₂)','Δ → Y: R_a = R_ab·R_ca/(R_ab + R_bc + R_ca)','Y → Δ: R_ab = (R_aR_b + R_bR_c + R_cR_a)/R_c','Balanced: R_Δ = 3·R_Y; source transformation: V = IR, R switches series ↔ parallel']},
{t:'A.C. Circuits',h:'8h',topics:[
'Common signals and waveforms','★ Instantaneous, peak, average and RMS values','★ Peak factor and form factor','Phase difference; lagging, leading, in-phase; phasors in rectangular and polar form','★ Impedance, admittance, power factor and power triangle','Three-phase systems: necessity and advantages','Phase sequence; balanced and unbalanced supply and load'],
s:'RMS is the “DC-equivalent” of an AC wave: the steady voltage that would heat a heater equally. A phasor is just an arrow whose length is the size of the wave and whose angle is how far ahead or behind it is. In a coil, current lags voltage; in a capacitor, current leads. Power factor tells you how much of the current is doing useful work, and a low value means wasted current in the wires.',
k:['V_rms = Vm/√2 = 0.707 Vm; V_avg (half cycle) = 2Vm/π = 0.637 Vm','Form factor = V_rms/V_avg = 1.11; peak factor = Vm/V_rms = 1.414','X_L = 2πfL; X_C = 1/(2πfC); Z = √(R² + (X_L − X_C)²)','P = VI cosφ; Q = VI sinφ; S = VI; pf = cosφ = R/Z','Star: V_L = √3 V_ph, I_L = I_ph; delta: V_L = V_ph, I_L = √3 I_ph','Three-phase power: P = √3 V_L I_L cosφ']},
{t:'Basic Electrical Machines',h:'8h',topics:[
'Basic laws of electromagnetism','Self-inductance and mutual inductance','DC machines: principle, construction, classification and applications','★ Single-phase transformer: necessity, principle and construction','★ E.M.F. equation of transformer','★ Voltage ratio, current ratio and voltage regulation','Single-phase and three-phase induction motors: working principles','Applications of induction motors and fractional horsepower motors'],
s:'A transformer has two coils wound on one iron core. Change the current in one coil, and the changing magnetic field induces a voltage in the other, but only with alternating current. More turns on a coil means more voltage on it. A DC motor works because a wire carrying current inside a magnetic field feels a push; the commutator keeps flipping the current so the push stays in the same direction.',
k:['Faraday: e = −N dΦ/dt; Lenz: induced effect opposes the cause','E₁/E₂ = N₁/N₂ = V₁/V₂ = I₂/I₁ = K','EMF equation: E = 4.44 f N Φm (rms)','Regulation = (V_no-load − V_full-load)/V_no-load × 100%','DC motor back EMF: E_b = V − I_aR_a','Induction motor: N_s = 120f/P; slip s = (N_s − N)/N_s']},
{t:'Semiconductor Devices',h:'8h',topics:[
'Intrinsic and extrinsic semiconductors','p-n junction diode: construction and characteristics','Forward and reverse bias operation','Temperature effects and breakdown mechanisms','★ Half-wave rectifier','★ Full-wave rectifier','Filters','★ Zener diode as voltage regulator','★ BJT: PNP and NPN construction and operation','★ CE configuration as amplifier','Transistor as a switch'],
s:'A diode is a one-way valve for current. Forward bias opens the valve after about 0.7 V for silicon; reverse bias keeps it shut until breakdown. A rectifier uses that valve to chop the negative half of an AC wave, and a capacitor filter fills in the gaps. A Zener diode is built to survive reverse breakdown and holds its voltage steady there. A BJT is a tap controlled by a small base current: a little base current lets a large collector current flow.',
k:['Silicon cut-in ≈ 0.7 V, germanium ≈ 0.3 V','Half-wave: V_dc = Vm/π, V_rms = Vm/2, ripple factor 1.21, efficiency 40.6%, PIV = Vm','Full-wave: V_dc = 2Vm/π, V_rms = Vm/√2, ripple factor 0.48, efficiency 81.2%','I_E = I_B + I_C; β = I_C/I_B; α = I_C/I_E; β = α/(1 − α)','Switch: cut-off = OFF, saturation = ON; amplifier works in the active region','Zener regulator: series resistor takes the excess voltage']},
{t:'Digital, Analog Electronics, Measurement and Electrical Safety',h:'10h',topics:[
'Binary, octal and hexadecimal number systems; binary addition','★ Basic logic gates and universal gates','★ Boolean algebra','LEDs, seven-segment display and truth table','Overview of digital and analog integrated circuits','IC 7805 and IC 7912','Multimeter and CRO','Sensors and transducers','Generation, transmission and distribution of electrical power','★ Safe handling and prevention of electrical hazards; fuse, MCB and MCCB','★ Earthing: purpose, importance and methods'],
s:'NAND and NOR are called universal because any other gate can be built from just one of them. IC 7805 is a three-legged chip that gives a steady +5 V from a higher, noisy input; the 79 series does the same for negative voltages, so 7912 gives −12 V. A fuse protects by melting once; an MCB is a switch that trips and can be reset. Earthing gives a stray fault current an easy path into the ground instead of through a person.',
k:['De Morgan: (A·B)′ = A′ + B′; (A + B)′ = A′·B′','NOT from NAND: tie both inputs together','78xx = positive fixed regulator; 79xx = negative; 7805 → +5 V, 7912 → −12 V','Fuse: melts; MCB: thermal + magnetic trip, resettable; MCCB: higher current ratings','Earthing: low-resistance path for fault current, keeps body metal at ground potential','Power path: generation → step-up → transmission → step-down → distribution']},
{t:'BEEE Lab (LE 1–16)',h:'2h/wk',topics:[
'Identification of active and passive components; Ohm’s law verification','★ Kirchhoff’s laws in series and parallel circuits','★ Improvement of power factor using a capacitor','★ Voltage and turns ratios of a single-phase transformer','Identification of parts of DC and induction machines using cut-section models','V–I characteristics of a p-n junction diode','★ Half-wave and full-wave rectifiers with and without filters','Voltage regulator using a Zener diode','Input and output characteristics of CE BJT','★ Logic gates using universal gates','Signal parameters using a CRO','Identification of cables, wires and fuses','Operation of fuse, MCB and MCCB','Earthing techniques and electrical safety practices','Wiring of lamp and fan with regulator, with fuse/MCB protection','Handling of megger; measurement of earth resistance'],
s:'Each experiment repeats a theory unit with real meters. Know the circuit diagram, the observation table and what the graph should look like. Viva questions usually ask for the principle, a precaution, and what happens if you change one thing.',
k:['Ohm’s law: plot V against I, slope = R','Rectifier: output on CRO, compare ripple with and without capacitor','Transformer: V₁/V₂ should equal N₁/N₂','Power factor correction: capacitor current cancels part of the inductive current','Always connect earth first, and never touch a live terminal']}
],
dg:[
{svg:S(360,200,
 T(8,16,'STAR ⇄ DELTA','ta')+
 P('M60 40 L20 120 L100 120 Z','l')+T(60,34,'A','t','middle')+T(14,134,'B','t','middle')+T(106,134,'C','t','middle')+T(60,90,'R_AB R_BC R_CA','t','middle')+
 LA(115,80,150,80,'a')+LA(150,92,115,92,'a')+
 L(240,90,240,50)+L(240,90,205,120)+L(240,90,275,120)+C(240,90,3,'fa')+T(240,44,'A','t','middle')+T(198,134,'B','t','middle')+T(282,134,'C','t','middle')+T(252,76,'R_a','t')+T(214,108,'R_b','t')+T(262,110,'R_c','t')+
 T(180,164,'Δ → Y: R_a = R_AB R_CA / ΣΔ','ta','middle')+T(180,182,'equal arms: R_Δ = 3 R_Y','t','middle')),
 c:'Star–delta: product of the two resistors meeting at a terminal, divided by the sum of all three.'},
{svg:S(360,200,
 T(8,16,'SERIES RLC PHASORS','ta')+
 L(60,110,300,110,'d')+LA(60,110,180,110,'t')+T(120,126,'V_R = I R  (reference)','t','middle')+
 LA(180,110,180,40,'a')+T(190,60,'V_L = I X_L','ta')+LA(180,110,180,150,'t')+T(190,150,'V_C = I X_C','t')+
 LA(60,110,180,70,'a')+T(110,82,'V','ta')+P('M100 110 A40 40 0 0 0 96 96','l')+T(72,102,'φ','ta')+
 T(300,40,'X_L &gt; X_C : lagging','t','end')+T(300,56,'current lags V','t','end')),
 c:'Inductor voltage leads the current, capacitor voltage lags it. Net reactance sets the angle φ.'},
{svg:S(360,200,
 T(8,16,'POWER TRIANGLE','ta')+
 L(60,150,260,150)+L(260,150,260,50)+L(60,150,260,50,'a')+
 T(160,166,'P = VI cosφ  (kW, real)','t','middle')+T(272,100,'Q = VI sinφ','t')+T(272,116,'(kVAr)','t')+
 T(130,92,'S = VI (kVA)','ta','middle')+P('M96 150 A36 36 0 0 0 90 134','l')+T(110,140,'φ','ta')+
 T(180,190,'pf = cosφ = P/S = R/Z','ta','middle')),
 c:'Low power factor means big S for the same useful P: more current, more loss in the lines.'},
{svg:S(360,200,
 T(8,16,'SINGLE-PHASE TRANSFORMER','ta')+
 R(90,40,180,110)+R(130,70,100,50)+
 P('M104 56 q-12 6 0 12 t0 12 t0 12 t0 12 t0 12','l')+P('M256 56 q12 6 0 12 t0 12 t0 12 t0 12 t0 12','l')+
 L(60,70,104,56)+L(60,130,104,122)+L(300,70,256,56)+L(300,130,256,122)+
 T(40,104,'V₁ N₁','ta','middle')+T(320,104,'V₂ N₂','ta','middle')+T(180,98,'core, flux Φ','t','middle')+
 P('M130 70 L230 70 L230 120 L130 120 Z','a')+T(180,176,'E = 4.44 f N Φm,   V₁/V₂ = N₁/N₂','ta','middle')),
 c:'Two windings share one core. The changing flux induces voltage in the secondary in proportion to its turns.'},
{svg:S(360,200,
 T(8,16,'DIODE CHARACTERISTIC','ta')+
 L(180,30,180,170)+L(30,110,330,110)+T(334,114,'V','t')+T(186,34,'I','t')+
 P('M30 110 L180 110 C210 110 230 108 245 80 C255 55 262 40 266 30','a')+P('M180 110 L90 110 L90 150','l')+
 T(245,126,'0.7 V (Si)','t','middle')+T(90,164,'V_BR','t','middle')+T(250,50,'forward','ta')+T(60,100,'reverse leakage','t')+T(70,176,'breakdown','t')),
 c:'Forward: nothing until about 0.7 V, then rapid rise. Reverse: tiny leakage until breakdown.'},
{svg:S(360,210,
 T(8,16,'FULL-WAVE BRIDGE','ta')+
 P('M30 70 q15 -24 30 0 t30 0','l')+T(60,100,'input','t','middle')+L(90,70,130,70)+
 P('M130 70 L170 40 L210 70 L170 100 Z','l')+L(210,70,250,70)+L(170,40,170,30)+L(170,100,170,110)+
 P('M130 70 L170 100','l')+P('M170 40 L210 70','l')+
 T(170,128,'4 diodes','t','middle')+
 P('M250 100 q15 -26 30 0 q15 -26 30 0','a')+T(280,120,'output |sin|','t','middle')+
 P('M250 180 q15 -26 30 0 q15 -26 30 0','a')+P('M250 160 q15 -16 30 0 q15 -16 30 0','d')+T(280,198,'with filter C','t','middle')+
 T(30,150,'V_dc = 2Vm/π','ta')+T(30,168,'PIV = Vm','t')+T(30,184,'ripple 0.48','t')),
 c:'Bridge steers both half-cycles the same way through the load. A filter capacitor smooths the humps.'},
{svg:S(360,200,
 T(8,16,'BJT: REGIONS AND SWITCH','ta')+
 L(40,40,40,160)+L(40,160,200,160)+T(30,40,'I_C','t')+T(204,164,'V_CE','t')+
 P('M40 160 C50 90 70 70 200 66','a')+P('M40 160 C50 120 70 104 200 100','l')+P('M40 160 C50 140 70 134 200 132','l')+
 T(120,58,'active (amplifier)','ta')+T(48,150,'saturation (ON)','t')+T(130,150,'cut-off (OFF)','t')+
 T(280,60,'NPN','t','middle')+L(240,100,264,100)+L(264,80,264,120)+L(264,92,296,76)+LA(264,108,296,124,'a')+T(236,96,'B','t')+T(298,76,'C','t')+T(298,134,'E','t')),
 c:'I_C versus V_CE for different base currents. A switch uses only the extremes: fully ON or fully OFF.'},
{svg:S(360,210,
 T(8,16,'UNIVERSAL GATE: NAND','ta')+
 T(20,50,'NOT','ta')+L(20,70,50,70)+L(30,70,30,92)+R(50,60,40,32)+T(70,80,'NAND','t','middle')+L(30,92,50,82)+L(90,76,120,76)+T(130,80,'A′','t')+
 T(20,124,'AND','ta')+R(50,114,40,32)+T(70,134,'NAND','t','middle')+L(90,130,110,130)+R(110,120,26,20)+T(123,134,'NOT','t','middle')+
 T(200,50,'OR','ta')+T(200,70,'(A′·B′)′ = A + B','t')+T(200,88,'invert A, invert B,','t')+T(200,104,'then NAND them','t')+
 T(200,140,'NOR is the same idea:','t')+T(200,156,'also universal','t')+T(20,190,'De Morgan does all the conversion work','ta')),
 c:'Any gate can be built from NAND alone: tie inputs for NOT, NAND then NOT for AND, invert inputs then NAND for OR.'},
{svg:S(360,200,
 T(8,16,'EARTHING PATH','ta')+
 R(40,50,120,70)+T(100,90,'appliance','t','middle')+L(40,70,20,70)+L(20,70,20,170)+L(20,170,60,170)+
 L(60,170,60,184)+L(46,184,74,184)+L(52,190,68,190)+T(100,184,'earth pit','t')+
 P('M150 60 L190 40','a')+T(200,40,'fault: live touches body','ta')+LA(100,50,100,34,'a')+
 T(200,100,'fault current → earth wire','t')+T(200,116,'→ fuse/MCB trips','t')+T(200,150,'person stays at ~0 V','ta')),
 c:'The earth wire gives fault current an easy road to the ground so the protective device trips quickly.'}
],
ex:{q:['Find current in a branch using mesh or nodal analysis [long]','Convert a delta network to star and find equivalent resistance [long]','Derive RMS value, form factor and peak factor of a sine wave [long]','RLC series circuit numerical with phasor diagram, power triangle and power factor [long]','Derive EMF equation of a transformer; find voltage regulation [long]','Working of half-wave and full-wave rectifier with waveforms and ripple factor [long]','BJT in CE configuration as amplifier and as a switch [long]','Realise AND, OR, NOT using NAND only [short]','Fuse vs MCB vs MCCB; purpose and methods of earthing [short]'],
a:['Draw the circuit with every current direction marked before writing equations','Write KVL once per loop, then solve; present the final current boxed with unit','Draw waveforms aligned under the circuit for rectifier answers','Name the quantity, formula, substitution, answer, unit in that order'],
x:['Assigning a current direction and later flipping the sign without noting it','Using peak instead of RMS in power calculations','Forgetting √3 for line values in a star connection','Drawing a rectifier with no load resistor or no output waveform','Mixing 78xx with 79xx polarity']},
fm:['Delta to star conversion numerical','Derivation of RMS, form factor, peak factor','EMF equation of a transformer','Rectifier waveform with V_dc and ripple factor','NAND-only realisation of AND, OR, NOT','7805 = +5 V, 7912 = −12 V'],
hook:'Walk the loop, volts add to zero. Four-four-four f N phi. Bridge flips the half. Earth first.'
});
SUBJECTS.push({
id:'ai',code:'100105',name:'Introduction to AI',co:'AI',sub:'42 h theory · 3-0-0',fac:'Mr. Nauman Jawaid',cr:3,
tag:'Concept-heavy, trace-heavy, no heavy maths. Score by tracing algorithms on paper.',
why:'Its course outcomes begin with “explain”, “trace” and “perform manual inference”, which means the paper asks you to run algorithms by hand on small examples. Search (BFS, DFS, A*, alpha-beta) and logic (resolution, chaining) are the predictable heavy hitters. The rest is definitions you can recite in the same structure each time.',
eff:3,ret:4,tint:'#363936',bg:'#161a16',call:'Trace it by hand',
units:[
{t:'Introduction to Artificial Intelligence',h:'8h',topics:[
'What is AI; history and evolution','Foundations: philosophy, mathematics, cognitive science','★ Intelligent agents: agent–environment interaction and PEAS','★ Types of environments','★ Types of agents: simple reflex, model-based, goal-based, utility-based, learning','Overview of AI application domains across engineering disciplines'],
s:'An agent is anything that senses its surroundings and acts on them, like a thermostat or a self-driving car. PEAS is a checklist for describing one: how it is judged (Performance), where it works (Environment), what it can do (Actuators), what it can sense (Sensors). Environments are classified by questions like “can it see everything?” and “does the world change while it thinks?”. The five agent types are a ladder: from “if this then that” up to “learns from experience”.',
k:['PEAS = Performance measure, Environment, Actuators, Sensors','Environment axes: observable / partly, deterministic / stochastic, episodic / sequential, static / dynamic, discrete / continuous, single / multi-agent','Agent ladder: simple reflex → model-based → goal-based → utility-based → learning','Reflex agent has no memory; model-based keeps internal state','Utility-based picks the best action when goals alone are not enough']},
{t:'Problem Solving by Search',h:'9h',topics:[
'★ Problem formulation and state-space representation','★ Uninformed search: BFS and DFS','Uniform cost, depth-limited and iterative deepening search','★ Greedy best-first search','★ A* algorithm','★ Heuristic design: admissibility and consistency','Local search: hill climbing','Simulated annealing (concept)','★ Adversarial search: minimax','★ Alpha-beta pruning','Constraint satisfaction problems: concept and backtracking (overview)'],
s:'Search means exploring a tree of choices. BFS explores level by level, like ripples in a pond, so it always finds the shortest path in steps. DFS dives down one branch first, like exploring a maze with one hand on the wall. A* is smart BFS: it scores each option as “cost so far” plus “my optimistic guess to the goal” and always expands the lowest score. In two-player games, minimax assumes the opponent plays perfectly, and alpha-beta skips branches that cannot change the final decision.',
k:['A*: f(n) = g(n) + h(n)','Admissible: h(n) ≤ true cost h*(n); consistent: h(n) ≤ c(n, n′) + h(n′)','BFS: complete, optimal for equal step cost, O(bᵈ) time and space','DFS: O(bm) space, not guaranteed to find shortest path','Iterative deepening = DFS memory with BFS completeness','Alpha-beta: prune when α ≥ β; best case examines about b^(m/2) nodes']},
{t:'Knowledge Representation and Reasoning',h:'8h',topics:[
'Knowledge representation issues; propositional logic syntax and semantics','★ Inference in propositional logic: resolution','First-order predicate logic: syntax and quantifiers','★ Forward chaining','★ Backward chaining','Resolution in first-order logic (concept)','Semantic networks and frames','Rule-based (production) systems'],
s:'Logic lets a machine be certain. To prove a claim by resolution you assume the claim is false, add it to what you know, and keep combining clauses until you reach an obvious contradiction, the empty clause. Forward chaining starts from known facts and fires rules until the goal appears; backward chaining starts from the goal and asks “what would I need to prove first?”. A semantic network is a map of things and the links between them.',
k:['Modus ponens: from P and P → Q, conclude Q','Resolution: (A ∨ B) and (¬A ∨ C) give (B ∨ C)','To prove α: add ¬α to the KB, derive the empty clause','Forward chaining is data-driven; backward chaining is goal-driven','∀ usually pairs with →; ∃ usually pairs with ∧','Convert to CNF before resolving']},
{t:'Reasoning Under Uncertainty',h:'7h',topics:[
'Sources of uncertainty; review of probability theory','★ Bayes’ theorem and its application','★ Bayesian networks: representation and manual inference','Introduction to fuzzy logic and fuzzy sets','Certainty factors and rule-based uncertainty (overview)'],
s:'Bayes’ theorem updates a belief when new evidence arrives, like revising “it will rain” after you see dark clouds. A Bayesian network draws which things cause which, and each node stores how likely it is given its parents. Fuzzy logic replaces “hot or not hot” with a dial from 0 to 1, because real concepts like “warm” have soft edges.',
k:['P(A|B) = P(B|A)·P(A)/P(B)','P(B) = Σ P(B|Aᵢ)·P(Aᵢ)','Bayes net joint: P(x₁…xₙ) = Π P(xᵢ | parents(xᵢ))','Fuzzy: union = max, intersection = min, complement = 1 − μ','Membership value lies between 0 and 1']},
{t:'Introduction to Machine Learning and AI Applications',h:'10h',topics:[
'★ Machine learning paradigms: supervised, unsupervised, reinforcement','Regression and classification: linear regression, k-NN, decision trees','★ Clustering: k-means','★ Artificial neural networks: perceptron and basic architecture','Natural language processing','Computer vision','Expert systems: architecture and applications','Robotics and AI','Ethics, bias and responsible AI; societal impact; SDGs'],
s:'Supervised learning is studying with an answer key; unsupervised is sorting a pile of photos with no labels; reinforcement is learning a game by getting rewards and penalties. A perceptron is the simplest artificial neuron: multiply each input by a weight, add them up, and fire if the sum crosses a threshold. k-means groups points by repeatedly assigning each to the nearest centre and then moving the centre to the middle of its group. Bias in AI enters mostly through the data it was trained on.',
k:['Perceptron: y = step(Σ wᵢxᵢ + b); update w ← w + η(t − y)x','k-means: pick k centres → assign → recompute centres → repeat until stable','k-NN: majority vote among the k nearest points','Linear regression: choose the line that minimises squared error','Decision tree: split on the feature that best separates classes','Expert system = knowledge base + inference engine + user interface']}
],
dg:[
{svg:S(360,190,
 T(8,16,'AGENT AND ENVIRONMENT','ta')+
 R(30,60,100,70)+T(80,100,'AGENT','t','middle')+R(230,60,100,70)+T(280,100,'ENVIRONMENT','t','middle')+
 LA(230,76,130,76,'a')+T(180,70,'percepts (sensors)','t','middle')+LA(130,114,230,114,'a')+T(180,134,'actions (actuators)','t','middle')+
 T(180,170,'PEAS: Performance · Environment · Actuators · Sensors','ta','middle')),
 c:'Loop of percepts in and actions out. PEAS names the four things to describe.'},
{svg:S(360,210,
 T(8,16,'SEARCH ORDER ON ONE TREE','ta')+
 L(180,40,100,90)+L(180,40,260,90)+L(100,90,60,140)+L(100,90,140,140)+L(260,90,220,140)+L(260,90,300,140)+
 C(180,40,11,'fa')+T(180,44,'A','t','middle')+C(100,90,11,'fa')+T(100,94,'B','t','middle')+C(260,90,11,'fa')+T(260,94,'C','t','middle')+
 C(60,140,11)+T(60,144,'D','t','middle')+C(140,140,11)+T(140,144,'E','t','middle')+C(220,140,11)+T(220,144,'F','t','middle')+C(300,140,11)+T(300,144,'G','t','middle')+
 P('M30 118 C20 80 150 70 180 100 C230 120 330 110 330 160 C330 180 30 180 30 118','d')+T(180,196,'BFS: A B C D E F G   DFS: A B D E C F G','ta','middle')+T(332,34,'dashed = frontier','t','end')),
 c:'Same tree, different visiting order. BFS goes level by level; DFS goes down-left first.'},
{svg:S(360,210,
 T(8,16,'A* : f = g + h','ta')+
 C(40,100,12,'fa')+T(40,104,'S','t','middle')+C(150,50,12)+T(150,54,'A','t','middle')+C(150,150,12)+T(150,154,'B','t','middle')+C(280,100,12,'fa')+T(280,104,'G','t','middle')+
 L(52,94,138,56)+T(88,64,'1','t')+L(52,106,138,144)+T(88,138,'4','t')+L(162,56,268,94)+T(220,64,'5','t')+L(162,144,268,106)+T(220,138,'1','t')+
 T(150,32,'h = 5','t','middle')+T(150,184,'h = 1','t','middle')+T(280,128,'h = 0','t','middle')+
 T(180,204,'via A: 1+5 = 6   via B: 4+1 = 5  → expand B first','ta','middle')),
 c:'Pick the node with the lowest f = cost so far + estimate to goal. Write f beside every node in the exam.'},
{svg:S(360,210,
 T(8,16,'ALPHA-BETA PRUNING','ta')+
 R(160,30,40,22)+T(180,46,'MAX','t','middle')+
 L(170,52,90,92)+L(190,52,270,92)+
 R(70,92,40,22)+T(90,108,'MIN','t','middle')+R(250,92,40,22)+T(270,108,'MIN','t','middle')+
 L(80,114,50,150)+L(100,114,130,150)+L(260,114,230,150)+L(280,114,310,150,'d')+
 T(50,166,'3','ta','middle')+T(130,166,'5','t','middle')+T(230,166,'2','ta','middle')+T(310,166,'?','t','middle')+
 T(90,136,'3','t','middle')+T(270,136,'≤ 2','t','middle')+T(180,196,'MAX already has 3; 2 &lt; 3, so prune the “?” branch','ta','middle')),
 c:'Once a MIN node can only be 2 and MAX can already guarantee 3, the rest of that branch is irrelevant.'},
{svg:S(360,200,
 T(8,16,'RESOLUTION REFUTATION','ta')+
 T(20,50,'1. P ∨ Q','t')+T(20,68,'2. ¬P ∨ R','t')+T(20,86,'3. ¬Q ∨ R','t')+T(20,104,'4. ¬R  (negated goal)','ta')+
 T(190,50,'1 + 2 → Q ∨ R','t')+T(190,68,'+ 3 → R ∨ R = R','t')+T(190,86,'R + 4 → ⊥ (empty)','ta')+
 T(190,120,'contradiction, so R is proved','ta')+T(20,160,'steps: CNF → add ¬goal → resolve pairs','t')+T(20,176,'until the empty clause appears','t')),
 c:'Prove R by assuming ¬R and resolving until the empty clause appears.'},
{svg:S(360,200,
 T(8,16,'BAYESIAN NETWORK','ta')+
 C(90,50,22)+T(90,54,'Burglary','t','middle')+C(270,50,22)+T(270,54,'Earthquake','t','middle')+
 C(180,115,22,'fa')+T(180,119,'Alarm','t','middle')+C(90,175,0.1,'t')+
 LA(100,70,164,100,'a')+LA(260,70,196,100,'a')+
 C(100,176,16)+T(100,180,'John','t','middle')+C(260,176,16)+T(260,180,'Mary','t','middle')+
 LA(168,132,114,162,'a')+LA(192,132,248,162,'a')+
 T(180,198,'P(B,E,A,J,M) = P(B) P(E) P(A|B,E) P(J|A) P(M|A)','ta','middle')),
 c:'Arrows go from cause to effect; the joint probability is a product of each node given its parents.'},
{svg:S(360,190,
 T(8,16,'PERCEPTRON','ta')+
 T(20,50,'x₁','t')+T(20,100,'x₂','t')+T(20,150,'x₃','t')+
 LA(40,46,160,92,'t')+LA(40,96,160,100,'t')+LA(40,146,160,108,'t')+
 T(86,60,'w₁','ta')+T(86,92,'w₂','ta')+T(86,132,'w₃','ta')+
 C(180,100,26,'fa')+T(180,96,'Σ + b','t','middle')+T(180,110,'step','t','middle')+LA(206,100,300,100,'a')+T(310,104,'y')+
 T(180,180,'y = step(w₁x₁ + w₂x₂ + w₃x₃ + b)','ta','middle')),
 c:'Weighted sum, add bias, compare with a threshold.'}
],
ex:{q:['Describe an agent using PEAS and classify its environment [short-long]','Differentiate the five agent types with diagrams [long]','Trace BFS and DFS on a given tree/graph and compare them [long]','Trace A* search with f = g + h and check admissibility of h [long]','Alpha-beta pruning on a game tree: show values and pruned branches [long]','Prove a statement by resolution (convert to CNF first) [long]','Forward and backward chaining on a given knowledge base [long]','Bayes’ theorem numerical; build a simple Bayesian network [long]','Supervised vs unsupervised vs reinforcement; k-means steps; perceptron structure [short-long]'],
a:['Open every search answer with the data structure: queue for BFS, stack for DFS, priority queue for A*','Write node, g, h, f in a small table at each expansion','For logic: number every clause and note which two were resolved','State assumptions before a Bayes calculation (“let D be disease…”)'],
x:['Using an h that overestimates the cost and calling A* optimal','Expanding nodes in the wrong tie-break order without saying which rule you used','Forgetting to negate the goal in resolution','Mixing P(A|B) with P(B|A)','Listing ethics points with no example']},
fm:['PEAS description of a given agent','BFS and DFS traversal order on a given tree','A* on a small graph with f-values','Alpha-beta on a 3-level tree','Resolution proof with the negated goal','Bayes’ theorem numerical'],
hook:'Sense, think, act. Lowest f goes first. Negate the goal, empty clause wins. Bayes flips the condition.'
});
SUBJECTS.push({
id:'cfet',code:'100108',name:'Computer Fundamentals & Emerging Technologies',co:'CFET',sub:'42 h theory · 3-0-0',fac:'Miss. Aiswarya Singh',cr:3,
tag:'Jackpot. Low effort, high marks: conversions and diagrams are pure drill.',
why:'CFET is the cheapest 3 credits on your timetable. Unit 2 is fixed-method arithmetic (conversions, complements) that you can finish perfectly in an afternoon of practice, and the other units are definitions plus labelled diagrams. For a Mathematics & Computing student most of it will feel familiar, so protect your time for Math and Physics and let CFET pay for it.',
eff:2,ret:5,tint:'#3a3a30',bg:'#1a1a12',call:'Cheap marks, bank them early',
units:[
{t:'Fundamentals of Computer Systems',h:'8h',topics:[
'Classification of computers; functional units','★ CPU organisation and working','★ Memory architecture and hierarchy','★ CPU registers; impact of cache memory on performance','Motherboard and its components','★ Von Neumann architecture','Machine language, assembly language and high-level languages','★ Compiler versus interpreter'],
s:'A computer is a loop: fetch an instruction from memory, decode it, execute it, repeat. The CPU does the thinking, memory holds the work, and input/output connects to the world. Memory comes in layers, like a desk (registers), a bookshelf (cache), a library (RAM) and a warehouse (disk): the closer it is the faster it is, but the less of it you have. A compiler translates the whole book before you read; an interpreter translates one line at a time as you read.',
k:['Von Neumann: one memory holds both program and data; CPU = ALU + control unit + registers','Cycle: fetch → decode → execute','Hierarchy: registers → cache → RAM → secondary storage; faster means smaller and costlier','Cache cuts the average access time by serving repeated data quickly','Compiler: whole program, reports all errors after; interpreter: line by line, stops at first error']},
{t:'Data Representation',h:'8h',topics:[
'Data representation and number systems','★ Conversion between decimal and binary','★ Conversion among binary, octal and hexadecimal','★ Binary arithmetic: addition and subtraction','★ Signed numbers: 1’s complement','★ Signed numbers: 2’s complement','★ ASCII and Unicode','Data representation in memory'],
s:'Computers only have two digits, so everything becomes bits. To convert a decimal number to binary, keep dividing by 2 and read the remainders from the bottom up. Octal and hex are shortcuts: group the bits in threes for octal and in fours for hex. For negative numbers, 2’s complement means “flip every bit, then add 1”, and it lets the same adder do subtraction. A character is just a number that both sides agree to read as a letter, which is what ASCII and Unicode are.',
k:['Decimal → binary: divide by 2, read remainders upward; fractions: multiply by 2, read integers downward','Binary → hex: groups of 4 bits; binary → octal: groups of 3 bits','1’s complement: flip all bits; has two zeros','2’s complement: flip all bits, add 1; n-bit range −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1','Subtraction: A − B = A + (2’s complement of B), discard the carry out','ASCII: 7-bit, 128 characters; ‘A’ = 65 = 01000001, ‘a’ = 97; Unicode covers all scripts']},
{t:'Computer Software and Operating Systems',h:'9h',topics:[
'Introduction to software; types of software','System software','Application software','★ Operating system and its objectives','★ Types of OS: batch, time-sharing, distributed, real-time','★ Functions of OS: process management and memory management','CLI versus GUI','File system basics: Windows, Linux, macOS'],
s:'Software is the set of instructions; hardware obeys them. System software runs the machine (OS, compilers); application software does your jobs (browser, spreadsheet). The operating system is the manager in the middle: it shares the CPU between programs, hands out memory, and keeps your files organised. Batch runs jobs in bundles, time-sharing slices the CPU quickly so many users feel served at once, distributed spreads work over many computers, and real-time guarantees an answer within a deadline.',
k:['OS objectives: convenience, efficient use of hardware, ability to evolve','Process = a program in execution; states: new → ready → running → waiting → terminated','Memory management: allocate, track and free memory for processes','Batch: no interaction; time-sharing: quick slices; real-time: hard deadlines (airbags, medical)','CLI: type commands, fast and scriptable; GUI: icons and windows, easier to learn']},
{t:'Computer Networks and Internet Basics',h:'9h',topics:[
'Introduction to computer networks; importance of networking','Data transmission media and transmission across media','Data transmission in a network','★ Network types: LAN, WAN, MAN','★ Network topologies: star, bus, ring, mesh','Communication protocol','★ Network devices: hub, switch, router, modem, gateway','Wireless networking','★ Internet and IP address','TCP, UDP, HTTP, FTP, DNS, URL','Client–server architecture'],
s:'A network is computers connected so they can share things. A hub shouts every message to everyone, a switch whispers it only to the right device, and a router decides which network a message should go to next. An IP address is the postal address of a device; DNS is the phone book that turns a name like a website into that address. TCP is registered post (reliable, in order) and UDP is a postcard (fast, no guarantee).',
k:['LAN: building; MAN: city; WAN: country or world','Mesh with n nodes needs n(n−1)/2 links; star fails if the hub fails; bus fails if the cable breaks','Hub: broadcast; switch: forwards by MAC address; router: forwards by IP address; modem: modulates and demodulates; gateway: connects different protocols','IPv4: 32 bits as four numbers 0–255','TCP: reliable, connection-oriented; UDP: fast, connectionless','DNS: name → IP; URL = protocol + domain + path']},
{t:'Emerging Technologies',h:'8h',topics:[
'★ Internet of Things: concept, architecture and applications','★ Cyber security: terminologies and CIA triad','Types of cyber threats and countermeasures','Artificial Intelligence: introduction, agents and applications','Machine learning: learning paradigms and applications','★ Blockchain: distributed ledger, blocks, hashing and decentralisation','Data science: lifecycle and role of data in decision making'],
s:'IoT is everyday objects with sensors and internet access, like a smart bulb reporting to your phone. The CIA triad is the three goals of security: keep secrets secret (Confidentiality), keep data unaltered (Integrity), keep it reachable (Availability). A blockchain is a notebook shared by many people where each page carries the fingerprint (hash) of the page before it, so changing an old page breaks every page after it.',
k:['IoT layers: sensing → network → data processing → application','CIA triad: Confidentiality, Integrity, Availability','Block = data + hash + previous block’s hash','Decentralisation: no single owner; many copies of the ledger','Data science lifecycle: collect → clean → analyse → model → communicate','Countermeasures: encryption, firewall, antivirus, backups, strong authentication']}
],
dg:[
{svg:S(360,200,
 T(8,16,'VON NEUMANN MACHINE','ta')+
 R(110,36,150,70)+T(185,50,'CPU','t','middle')+R(124,58,50,34)+T(149,78,'ALU','t','middle')+R(196,58,50,34)+T(221,74,'Control','t','middle')+T(221,86,'unit','t','middle')+
 R(110,134,150,36)+T(185,156,'MEMORY: program + data','t','middle')+
 R(10,134,70,36)+T(45,156,'INPUT','t','middle')+R(290,134,60,36)+T(320,156,'OUTPUT','t','middle')+
 LA(185,106,185,134,'a')+LA(185,134,185,106,'a')+LA(80,152,110,152,'a')+LA(260,152,290,152,'a')),
 c:'One memory for both instructions and data. The CPU fetches, decodes and executes.'},
{svg:S(360,200,
 T(8,16,'MEMORY HIERARCHY','ta')+
 P('M180 30 L250 80 L110 80 Z','fa')+T(180,70,'registers','t','middle')+
 P('M110 80 L250 80 L280 110 L80 110 Z','l')+T(180,100,'cache','t','middle')+
 P('M80 110 L280 110 L310 140 L50 140 Z','l')+T(180,130,'RAM','t','middle')+
 P('M50 140 L310 140 L340 170 L20 170 Z','l')+T(180,160,'disk / SSD','t','middle')+
 LA(340,40,340,170,'t')+T(334,30,'bigger, slower, cheaper','t','end')+LA(20,170,20,40,'a')+T(26,30,'faster, costlier','ta')),
 c:'Top is fast and tiny; bottom is huge and slow. Cache hides the gap.'},
{svg:S(360,210,
 T(8,16,'CONVERSIONS BY HAND','ta')+
 T(16,44,'45 ÷ 2 = 22  r 1','t')+T(16,60,'22 ÷ 2 = 11  r 0','t')+T(16,76,'11 ÷ 2 =  5  r 1','t')+T(16,92,' 5 ÷ 2 =  2  r 1','t')+T(16,108,' 2 ÷ 2 =  1  r 0','t')+T(16,124,' 1 ÷ 2 =  0  r 1','t')+
 LA(150,120,150,50,'a')+T(160,90,'read upward','ta')+T(16,150,'45₁₀ = 101101₂','ta')+
 T(200,44,'101101 → 0010 1101','t')+T(200,62,'= 2D (hex)','ta')+T(200,86,'101 101 → 5 5','t')+T(200,104,'= 55 (octal)','ta')+T(16,186,'group from the right, pad zeros on the left','t')),
 c:'Divide by 2, read remainders upward. Then regroup bits in fours (hex) or threes (octal).'},
{svg:S(360,200,
 T(8,16,'2’S COMPLEMENT OF +5','ta')+
 T(20,56,'+5   =  0000 0101','t')+LA(60,66,60,86,'a')+T(72,80,'flip all bits','ta')+
 T(20,106,'       1111 1010','t')+LA(60,116,60,136,'a')+T(72,130,'add 1','ta')+
 T(20,156,'−5   =  1111 1011','ta')+
 T(220,56,'8-bit range','t')+T(220,74,'−128 … +127','ta')+T(220,100,'check:','t')+T(220,116,'5 + (−5) = 1 0000 0000','t')+T(220,132,'drop the carry → 0','ta')),
 c:'Flip then add 1. Adding a number to its 2’s complement gives zero once the carry out is dropped.'},
{svg:S(360,190,
 T(8,16,'FOUR TOPOLOGIES','ta')+
 C(60,60,5,'fa')+L(60,60,30,30)+L(60,60,90,30)+L(60,60,30,90)+L(60,60,90,90)+T(60,112,'star','t','middle')+
 L(130,60,210,60)+L(140,60,140,44)+L(165,60,165,44)+L(190,60,190,44)+T(170,112,'bus','t','middle')+
 C(270,34,6)+C(310,60,6)+C(270,90,6)+C(232,60,6)+P('M270 40 L304 56 M308 66 L274 88 M264 88 L236 66 M236 54 L264 38','l')+T(270,112,'ring','t','middle')+
 C(70,150,5)+C(120,150,5)+C(95,176,5)+C(95,134,5)+L(70,150,120,150,'d')+L(95,134,95,176,'d')+L(70,150,95,134)+L(120,150,95,134)+L(70,150,95,176)+L(120,150,95,176)+T(200,156,'mesh: n(n−1)/2 links','ta')),
 c:'Draw each with 4–6 nodes and mention its single point of failure.'},
{svg:S(360,190,
 T(8,16,'WHAT HAPPENS ON A URL','ta')+
 R(20,50,80,34)+T(60,72,'client','t','middle')+R(140,50,80,34)+T(180,72,'DNS','t','middle')+R(260,50,80,34)+T(300,72,'server','t','middle')+
 LA(100,60,140,60,'a')+T(120,48,'1 name?','t','middle')+LA(140,76,100,76,'a')+T(120,96,'2 IP','t','middle')+
 P('M60 84 L60 130 L300 130 L300 84','a','marker-end="url(#ar)"')+T(180,124,'3 HTTP request over TCP','t','middle')+
 T(180,150,'4 response (page) comes back','t','middle')+T(180,176,'client–server architecture','ta','middle')),
 c:'The client asks DNS for the IP, then talks to the server using HTTP over TCP.'},
{svg:S(360,170,
 T(8,16,'BLOCKCHAIN','ta')+
 R(20,50,90,60)+T(65,70,'Block 1','t','middle')+T(65,88,'data','t','middle')+T(65,102,'hash H1','ta','middle')+
 R(135,50,90,60)+T(180,70,'Block 2','t','middle')+T(180,88,'prev = H1','ta','middle')+T(180,102,'hash H2','ta','middle')+
 R(250,50,90,60)+T(295,70,'Block 3','t','middle')+T(295,88,'prev = H2','ta','middle')+T(295,102,'hash H3','ta','middle')+
 LA(110,80,135,80,'a')+LA(225,80,250,80,'a')+T(180,146,'edit Block 1 → H1 changes → chain breaks','t','middle')),
 c:'Each block stores the previous hash, so tampering is detectable.'}
],
ex:{q:['Convert numbers among decimal, binary, octal and hex [short, almost certain]','Find 1’s and 2’s complement and do signed subtraction [short-long]','Explain Von Neumann architecture with diagram [long]','Explain memory hierarchy and the role of cache and registers [long]','Compare compiler and interpreter [short]','Types of OS with examples; functions of OS [long]','Draw and compare network topologies; functions of network devices [long]','Difference between TCP and UDP; role of DNS [short]','IoT architecture, CIA triad, blockchain basics [short-long]'],
a:['Show every division step in a conversion; the working earns the marks','Write the bit width before doing complements (8-bit unless told otherwise)','Draw the diagram first, then 4–5 labelled points beneath it','Compare in a two-column table for “differentiate between” questions'],
x:['Reading remainders from the top instead of from the bottom','Forgetting to add 1 in 2’s complement','Dropping the leading zeros when grouping bits for hex','Confusing hub, switch and router roles','Listing OS types without an example for each']},
fm:['Decimal ↔ binary ↔ octal ↔ hex conversions','2’s complement representation and subtraction','Von Neumann diagram','Four topologies with advantages and disadvantages','Compiler vs interpreter table','CIA triad'],
hook:'Divide and read upward. Flip then add one. Hub shouts, switch whispers, router routes. Hash holds the chain.'
});
SUBJECTS.push({
id:'eic',code:'100110',name:'Essence of Indian Constitution',co:'Constitution',sub:'42 h theory · 3-0-0 · 0 credits',fac:'Dr. Ghanashyam Kumar Prajapati',cr:0,
tag:'Zero credits, so do not over-invest. Learn lists, article numbers and six amendments.',
why:'EIC carries 0 credits, so it cannot raise your SGPA, but it still sits on your timetable three times a week. Check with your department whether a pass is compulsory for the degree; if it is, treat it as a gate to clear with minimum hours, not a subject to master. Everything is lists and article numbers, which is why a single concentrated week before the exam is enough.',
eff:2,ret:1,tint:'#38342e',bg:'#1a1814',call:'Clear it with a short sprint',
units:[
{t:'Constitution and Preamble',h:'8h',topics:[
'Meaning of the Constitution of India','Historical perspective of the Constitution','★ Salient features and characteristics of the Constitution','★ Preamble to the Constitution'],
s:'A constitution is the rulebook for how a country is run and what the government may not do to its people. India’s was drafted by the Constituent Assembly, adopted on 26 November 1949 and came into force on 26 January 1950. The Preamble is the introduction that says who we are and what we promise: Sovereign, Socialist, Secular, Democratic, Republic, and justice, liberty, equality and fraternity for all.',
k:['Adopted 26 Nov 1949; in force 26 Jan 1950','Drafting Committee chaired by Dr. B. R. Ambedkar; Constituent Assembly president Dr. Rajendra Prasad','Preamble keywords: Sovereign, Socialist, Secular, Democratic, Republic','Preamble objectives: Justice, Liberty, Equality, Fraternity','“Socialist”, “Secular” and “integrity” were added by the 42nd Amendment (1976)','Features: longest written constitution, parliamentary system, federal with unitary bias, independent judiciary, fundamental rights']},
{t:'Fundamental Rights and Duties',h:'8h',topics:[
'★ Fundamental Rights under Part III','★ Fundamental Duties and their significance'],
s:'Fundamental Rights are the basic freedoms every person is guaranteed against the state, and you can go straight to the Supreme Court if they are violated. Fundamental Duties are what citizens owe in return; they are listed but cannot be enforced in court. There is a duty relevant to engineers too: to develop scientific temper, and to safeguard public property.',
k:['Part III, Articles 12–35','Equality 14–18; Freedom 19–22; against Exploitation 23–24; Religion 25–28; Cultural and Educational 29–30; Constitutional Remedies 32','Right to property no longer a Fundamental Right (44th Amendment, now Art. 300A)','Fundamental Duties: Part IV-A, Art. 51A, added by 42nd Amendment','Eleventh duty (education of children 6–14) added by 86th Amendment, 2002','Duties are not justiciable']},
{t:'Directive Principles',h:'8h',topics:[
'★ Relevance of Directive Principles of State Policy under Part IV','★ Different articles of State policy under Part IV'],
s:'Directive Principles are instructions to the government about the kind of society to build, such as fair wages and equal pay. Unlike Fundamental Rights, a court cannot force the government to follow them, but they are still “fundamental in the governance of the country”. When the two clash, courts try to balance them.',
k:['Part IV, Articles 36–51; not justiciable (Art. 37)','Classes of principles: socialistic, Gandhian, liberal-intellectual','Art. 39: adequate livelihood, equal pay for equal work, resources serving the common good','Art. 44: uniform civil code; Art. 48A: protect environment','Art. 31C allows laws for Art. 39(b),(c) to prevail over Arts. 14 and 19','Minerva Mills (1980): harmony between Parts III and IV is part of the basic structure']},
{t:'Governance',h:'9h',topics:[
'★ Governance under Part VI','★ State Legislature: Legislative Assembly and Legislative Council'],
s:'Part VI is how a state is run. The Governor is the head of the state, appointed by the President, but real power sits with the Chief Minister and the Council of Ministers. A state legislature always has a Legislative Assembly, elected directly by voters, and in some states, including Bihar, a second house, the Legislative Council. The Assembly is more powerful; the Council is a permanent house that can only delay certain laws.',
k:['Governor: Art. 153; Council of Ministers headed by the CM: Art. 163','State Legislature: Art. 168; Assembly 60–500 members (Art. 170)','Assembly term 5 years; Council is permanent, one-third retire every two years, members serve 6 years','Council size at most one-third of the Assembly and at least 40 (Art. 171)','A Council can be created or abolished by Parliament on the state’s request (Art. 169)','Money bills originate only in the Assembly']},
{t:'Amendments of the Constitution',h:'9h',topics:[
'★ Amendment of constitutional powers and procedure (Art. 368)','★ 42nd Amendment','★ 44th Amendment','74th Amendment','76th Amendment','86th Amendment','91st Amendment'],
s:'A constitution has to change with time, and Article 368 explains how. Some changes need only a simple majority, others need two-thirds of Parliament, and the most important ones also need half the state legislatures to agree. The six amendments in your syllabus are best remembered by one headline each.',
k:['Three routes: simple majority; special majority; special majority plus ratification by half the states','42nd (1976): “mini-constitution”, Preamble changes, Fundamental Duties','44th (1978): reversed several 42nd changes, removed property from Fundamental Rights','74th (1992): urban local bodies (municipalities)','76th (1994): placed Tamil Nadu’s reservation law in the Ninth Schedule','86th (2002): Art. 21A, free education for ages 6–14','91st (2003): ministers capped at 15% of house strength, tighter anti-defection law']}
],
dg:[
{svg:S(360,200,
 T(8,16,'FUNDAMENTAL RIGHTS MAP','ta')+
 R(110,30,140,30,'fa')+T(180,50,'Part III · Arts 12–35','ta','middle')+
 L(180,60,180,76)+L(40,76,320,76)+
 L(40,76,40,92)+L(110,76,110,92)+L(180,76,180,92)+L(250,76,250,92)+L(320,76,320,92)+
 R(8,92,64,40)+T(40,110,'Equality','t','middle')+T(40,124,'14–18','ta','middle')+
 R(78,92,64,40)+T(110,110,'Freedom','t','middle')+T(110,124,'19–22','ta','middle')+
 R(148,92,64,40)+T(180,106,'Against','t','middle')+T(180,118,'exploit.','t','middle')+T(180,128,'23–24','ta','middle')+
 R(218,92,64,40)+T(250,110,'Religion','t','middle')+T(250,124,'25–28','ta','middle')+
 R(288,92,64,40)+T(320,106,'Cultural,','t','middle')+T(320,118,'edu.','t','middle')+T(320,128,'29–30','ta','middle')+
 R(110,150,140,30)+T(180,170,'Remedies · Art. 32','ta','middle')),
 c:'Six groups of rights, with Article 32 as the enforcement route to the Supreme Court.'},
{svg:S(360,200,
 T(8,16,'THREE WAYS TO AMEND (ART. 368)','ta')+
 R(20,40,320,34)+T(180,62,'1  Simple majority (some provisions)','t','middle')+
 R(20,86,320,34)+T(180,108,'2  Special majority: ⅔ present and voting + majority of total','t','middle')+
 R(20,132,320,48,'fa')+T(180,152,'3  Special majority + ratification by','ta','middle')+T(180,168,'half of the state legislatures','ta','middle')),
 c:'Federal provisions need the strictest route.'},
{svg:S(360,200,
 T(8,16,'STATE LEGISLATURE (BIHAR TYPE)','ta')+
 R(110,30,140,30)+T(180,50,'Governor','t','middle')+L(180,60,180,76)+
 R(40,76,120,56)+T(100,94,'Legislative','t','middle')+T(100,108,'Assembly','ta','middle')+T(100,124,'60–500 · 5 yrs','t','middle')+
 R(200,76,120,56)+T(260,94,'Legislative','t','middle')+T(260,108,'Council','ta','middle')+T(260,124,'≤ ⅓ of Assembly','t','middle')+
 L(180,76,160,96)+L(180,76,200,96)+T(180,160,'direct election vs mostly indirect, permanent house','t','middle')+T(180,178,'Money bills start only in Assembly','ta','middle')),
 c:'The Assembly is the stronger house; the Council is permanent with one-third retiring every two years.'}
],
ex:{q:['Explain the Preamble and its key words [long]','Salient features of the Indian Constitution [long]','List Fundamental Rights with article numbers [long]','Fundamental Duties and their significance for an engineer [short-long]','Directive Principles: nature, classes and relation to Fundamental Rights [long]','Legislative Assembly versus Legislative Council [short-long]','Amendment procedure under Art. 368 [long]','Significance of 42nd, 44th, 74th, 76th, 86th, 91st Amendments [short]'],
a:['Start with the article range (“Part III, Arts 12–35”)','Group lists into the official categories rather than listing in random order','For amendments give year, number and one headline each'],
x:['Mixing up Parts III, IV and IV-A','Saying Fundamental Duties are enforceable','Putting 73rd and 74th Amendments in the wrong order of subject','Forgetting that “Socialist” and “Secular” came in 1976']},
fm:['Preamble keywords and objectives','Six Fundamental Rights with article ranges','Directive Principles vs Fundamental Rights table','Assembly vs Council comparison','Headline of each of the six amendments'],
hook:'Part III is rights, Part IV is directions, 51A is duties. Six amendments, six headlines.'
});
SUBJECTS.push({
id:'uhv',code:'100109',name:'Universal Human Values',co:'UHV',sub:'28 h theory · 2-0-0',fac:'Mr. Ravi Ranajan',cr:2,
tag:'Cheap 2 credits. Learn the framework once, then answer every question in the same shape.',
why:'UHV is 2 credits with no calculations. The whole course is one framework (Self and Body, relationship, society, nature, existence) and every question is a different view of it. Write each answer as definition, example from your own life, then conclusion, and it will score reliably with little revision time.',
eff:2,ret:3,tint:'#34382f',bg:'#171a13',call:'One framework, same answer shape',
units:[
{t:'Self-Exploration, Happiness and Prosperity',h:'5h',topics:[
'★ Self-Exploration as the process of value education','★ Continuous happiness and prosperity','★ Right understanding'],
s:'Self-exploration means checking for yourself, honestly, what you really want, instead of just accepting what others tell you. You test an idea by asking whether it is true to your natural acceptance (what feels right from inside) and whether it holds up in real life. Happiness is a lasting state of being in harmony; prosperity is the feeling of having enough, not the pile of things you own.',
k:['Process: natural acceptance + experiential validation','Basic human aspirations: continuous happiness and prosperity','Right understanding is the first step; relationship and physical facility follow','Happiness is a state of the self; physical facility is a need of the body']},
{t:'Relationship, Physical Facility and Human Being',h:'5h',topics:[
'★ Right understanding, relationship and physical facility','Happiness and prosperity in a given situation','★ Human being as co-existence of the sentient Self and the material Body'],
s:'A human is two things working together: the Self (the “I” that feels, thinks and wants) and the Body (the physical part that needs food and rest). The Self needs happiness; the Body needs physical facility. Trouble starts when we try to fill the Self’s need with things meant for the Body.',
k:['Self (I) needs: right understanding, relationship, happiness','Body needs: food, clothing, shelter, health: physical facility','Prosperity = right understanding + enough physical facility','Sanyam: right feeling and care for the Body; Swasthya: Body keeps healthy and acts as instrument']},
{t:'Values in Human Relationships and Harmony in Society',h:'5h',topics:[
'★ Values in human–human relationship','Importance of values in establishing harmonious relationships','★ Harmony in the society'],
s:'A relationship is a promise between two people to be fully fulfilled themselves and to fulfil the other. The foundation is trust: the assurance that the other person wishes me well. From there come respect, affection, care, guidance, reverence, glory, gratitude and love. Society is a family that has grown larger: when families are in harmony, the village, the nation and the world can be too.',
k:['Nine values: trust, respect, affection, care, guidance, reverence, glory, gratitude, love','Trust is the foundation value','Respect means right evaluation, treating the other as equal in potential','Family → community → nation → world family: harmony grows outward','Five dimensions of human endeavour: education, health, justice, production, exchange']},
{t:'Harmony in Nature and Existence',h:'6h',topics:[
'★ Harmony in nature','★ Interconnectedness and mutual fulfilment among the four orders of nature','Existence as co-existence of mutually interacting units in all-pervasive space','Holistic perception of harmony at all levels of existence'],
s:'Nature has four orders that depend on each other: material (soil, water), plant life, animals, and humans. Each order has its own role, and humans are the only ones who can understand and deliberately keep the balance. Everything that exists is a unit sitting in space and interacting with other units; seeing this as one connected whole is the holistic view.',
k:['Four orders: material (padartha), plant (pran), animal (jeev), human (gyan)','Mutual fulfilment: each order helps the others stay in balance','Recyclability and self-regulation are features of nature','Existence = units in space; co-existence is the basic fact','Human role: keep mutual fulfilment, not exploit']},
{t:'Implications of Holistic Understanding on Professional Ethics',h:'7h',topics:[
'★ Natural acceptance of human values','★ Definitiveness of ethical human conduct','Basis for humanistic education, humanistic constitution and humanistic universal order','★ Competence in professional ethics','★ Strategy for transition from present state to Universal Human Order: individual and society levels'],
s:'If you act from natural acceptance, your behaviour becomes predictable and trustworthy, and that is what “ethical conduct” really means. Professional ethics is then not a rulebook but a way of working: using technology to serve everyone, not harm some. The strategy to move toward a better society starts with people changing themselves, and then shaping education, systems and law around the same values.',
k:['Ethical conduct = living on natural acceptance, consistently','Competence in professional ethics: technology that is human-friendly, eco-friendly and serves everyone','Humanistic education → constitution → universal order','Individual strategy: self-exploration, right understanding, living it','Society strategy: spread value education, build systems that support harmony']}
],
dg:[
{svg:S(360,210,
 T(8,16,'FROM SELF TO EXISTENCE','ta')+
 C(180,110,18,'fa')+T(180,114,'Self','t','middle')+C(180,110,38)+T(180,152,'Family','t','middle')+C(180,110,58)+T(180,172,'Society','t','middle')+C(180,110,78,'d')+T(180,192,'Nature','t','middle')+
 T(300,60,'Existence','ta')+T(300,76,'co-existence in','t')+T(300,90,'all-pervasive space','t')),
 c:'Harmony grows outward: self, family, society, nature, then the whole of existence.'},
{svg:S(360,200,
 T(8,16,'SELF AND BODY','ta')+
 R(30,40,130,100,'fa')+T(95,64,'SELF (I)','ta','middle')+T(95,84,'needs happiness','t','middle')+T(95,100,'right understanding','t','middle')+T(95,116,'relationship','t','middle')+
 R(200,40,130,100)+T(265,64,'BODY','t','middle')+T(265,84,'needs physical','t','middle')+T(265,100,'facility: food,','t','middle')+T(265,116,'clothing, shelter','t','middle')+
 LA(160,90,200,90,'a')+LA(200,100,160,100,'a')+T(180,170,'prosperity = understanding + enough facility','ta','middle')),
 c:'The Self and Body are both needed. Mistaking the Body’s need for the Self’s is the root problem.'},
{svg:S(360,200,
 T(8,16,'FOUR ORDERS OF NATURE','ta')+
 R(40,140,280,36)+T(180,162,'material order (soil, water, air)','t','middle')+
 R(70,104,220,30)+T(180,124,'plant order','t','middle')+
 R(100,70,160,30)+T(180,90,'animal order','t','middle')+
 R(130,36,100,30,'fa')+T(180,56,'human order','ta','middle')+
 LA(330,160,330,40,'a')+T(326,30,'mutual fulfilment','ta','end')),
 c:'Each order supports the one above it and has its own role; humans carry the responsibility to maintain balance.'}
],
ex:{q:['What is self-exploration? Explain natural acceptance and experiential validation [long]','Differentiate happiness and prosperity; physical facility vs right understanding [long]','Explain the Self and Body as co-existence [long]','List and explain the values in human relationships (trust, respect…) [long]','Four orders of nature and mutual fulfilment [long]','Competence in professional ethics and strategy for transition [long]'],
a:['Define in one sentence, give one real-life example, conclude in one sentence','Use the framework words exactly: natural acceptance, experiential validation, mutual fulfilment','Draw the small diagram where one exists (Self–Body, four orders)'],
x:['Writing opinions without the framework vocabulary','Confusing happiness with pleasure or with physical facility','Listing the nine values without defining at least trust and respect','Giving only the individual strategy and forgetting the society level']},
fm:['Nine values in relationships','Self and Body table of needs','Four orders of nature','Natural acceptance and experiential validation','Competence in professional ethics'],
hook:'Self wants happiness, Body wants facility. Trust first, then the rest. Four orders, one balance.'
});
SUBJECTS.push({
id:'pps',code:'100112P',name:'Programming for Problem Solving Lab',co:'PPS Lab',sub:'17 experiments · 0-0-2 · Mon (G1) / Sat (G2)',fac:'Miss. Kripa Singh',cr:1,
tag:'One credit, but the programs are the foundation for every later subject. Write each by hand once.',
why:'PPS Lab is only 1 credit, so its marks are a small slice, but it is also the only place you learn to program, and a Mathematics & Computing degree runs on that. The syllabus lists 17 named programs, so the lab exam and viva will come from that exact list. Write each one by hand once, understand the flowchart, and the credit is safe.',
eff:3,ret:2,tint:'#363633',bg:'#171715',call:'17 programs, write each once',
units:[
{t:'Algorithmic Basics (LE 1–3)',h:'LE 1–3',topics:[
'★ LE-1 Algorithmic logic and basic I/O: area of shapes with type casting and a flowchart','★ LE-2 Decision making: grading system using if-else ladder and switch-case','★ LE-3 Iterative problem solving: primes up to N and Fibonacci using loops'],
s:'An algorithm is a recipe with no ambiguity. A flowchart is the recipe as a picture: oval for start and stop, box for a step, diamond for a yes/no question. In C, a decision is if/else, a repeated step is a loop, and type casting tells the computer to treat an int as a float before dividing, so 7/2 gives 3.5 instead of 3.',
k:['Flowchart: oval = start/stop, rectangle = process, diamond = decision, parallelogram = input/output','scanf needs the address operator: scanf("%d", &n)','(float)a/b converts before dividing; a/b with two ints truncates','switch needs break in each case','Prime check: loop i from 2 to √n; Fibonacci: next = a + b, then shift']},
{t:'Arrays and Strings (LE 4–6)',h:'LE 4–6',topics:[
'★ LE-4 1-D array: maximum/minimum using linear search; average','★ LE-5 2-D arrays: matrix multiplication and transpose','LE-6 Pointer arithmetic and strings: reverse a string; count vowels and consonants'],
s:'An array is a row of numbered boxes starting at 0. A 2-D array is a grid, and multiplying matrices means three nested loops. A string in C is an array of characters ending with a special zero character. A pointer is a variable that stores an address, so you can walk along an array by adding one.',
k:['Index runs 0 … n−1; array name is the address of its first element','Matrix multiply: C[i][j] += A[i][k] × B[k][j] inside three loops','Transpose: B[j][i] = A[i][j]','String ends with ’\\0’; reverse by swapping from both ends','Syllabus wording for LE-6 mixes “without pointer arithmetic” and “using pointers”: ask your lab teacher which is expected']},
{t:'Functions and Memory (LE 7–8)',h:'LE 7–8',topics:[
'★ LE-7 Recursion versus iteration: factorial and GCD','★ LE-8 Parameter passing: swap and array update by call by value and call by reference'],
s:'Recursion is a function that solves a big problem by calling itself on a smaller one; it must have a stopping case or it never ends. Call by value sends a photocopy of the variable, so changes inside the function are lost. Call by reference sends the address, so the function edits the original.',
k:['Recursion needs a base case: factorial(0) = 1','GCD (Euclid): gcd(a, b) = gcd(b, a % b); stops when b = 0','Call by value: function gets a copy; call by reference: function gets the address','Swap with pointers: temp = *a; *a = *b; *b = temp','Recursion uses extra stack space per call; iteration does not']},
{t:'Data Types and Files (LE 9–10)',h:'LE 9–10',topics:[
'★ LE-9 Structures and unions: employee payroll system and memory comparison','★ LE-10 File handling: write and read student records, keyword search'],
s:'A structure bundles related fields, like name, id and salary, into one record, and each field gets its own space. A union also holds several fields but they share one space, so only one is valid at a time and the union is only as big as its largest member. A file lets data survive after the program ends: open it, read or write, close it.',
k:['Structure size ≥ sum of members (padding); union size = largest member','Use sizeof() to compare both','File modes: "w" write (erases), "r" read, "a" append','Always check fopen() result for NULL and call fclose()','Use fprintf/fscanf for text records; fgets plus strstr for keyword search']},
{t:'OOP in C++: Foundations (LE 11–13)',h:'LE 11–13',topics:[
'★ LE-11 Classes and objects: Bank Account with private data and public functions','★ LE-12 Constructors and destructors: String class with default, parameterised and copy constructors','LE-13 Static members and friend functions'],
s:'A class is a blueprint and an object is a thing built from it. Encapsulation means the data is private and can only be changed through public functions, like an ATM that never lets you touch the vault. A constructor sets an object up when it is created, a destructor cleans up when it dies. A static member belongs to the class, so all objects share one copy.',
k:['Class members are private by default; struct members public by default','Constructor: same name as class, no return type; destructor: ~ClassName()','Copy constructor takes const ClassName&; needed when the class owns dynamic memory','Static member: one shared copy; defined once outside the class','Friend function can read private members but is not a member']},
{t:'OOP in C++: Advanced (LE 14–17)',h:'LE 14–17',topics:[
'★ LE-14 Inheritance: single, multiple, multilevel, hierarchical and hybrid','★ LE-15 Polymorphism: abstract class Shape, function overloading, operator overloading on complex numbers','LE-16 Exception handling: try, catch, throw (division by zero)','LE-17 Templates: function template max and class template pair'],
s:'Inheritance lets a new class reuse an old one, like a Dog class automatically getting everything from Animal. Polymorphism means one name, many behaviours: the same call draw() acts differently for a circle and a square. An abstract class has at least one pure virtual function and cannot be instantiated; it forces children to supply the behaviour. try/catch lets a program react to errors instead of crashing. A template writes the code once for any data type.',
k:['Five inheritance types: single, multiple, multilevel, hierarchical, hybrid (virtual base fixes the diamond problem)','Pure virtual function: virtual void draw() = 0;','Overloading: same name, different parameters; operator overloading: Complex operator+(Complex c)','try { … throw x; } catch (type e) { … }','template <typename T> T maxOf(T a, T b) { return a > b ? a : b; }']}
],
dg:[
{svg:S(360,210,
 T(8,16,'FLOWCHART SYMBOLS','ta')+
 R(20,40,70,26)+T(55,58,'START','t','middle')+L(55,66,55,82)+
 P('M30 82 L80 82 L72 112 L22 112 Z')+T(51,101,'read n','t','middle')+L(55,112,55,128)+
 P('M55 128 L100 154 L55 180 L10 154 Z')+T(55,158,'n &gt; 1 ?','t','middle')+
 LA(100,154,150,154,'a')+T(124,148,'yes','ta','middle')+R(150,138,90,32)+T(195,158,'process','t','middle')+
 T(270,60,'oval: start/stop','t')+T(270,80,'box: process','t')+T(270,100,'diamond: decision','t')+T(270,120,'slanted: I/O','t')+T(270,148,'always label yes / no','ta')),
 c:'Draw these four shapes exactly; arrows carry the flow.'},
{svg:S(360,200,
 T(8,16,'CALL BY VALUE vs REFERENCE','ta')+
 R(20,40,140,50)+T(90,56,'main: a = 5','t','middle')+T(90,76,'copy → function','t','middle')+R(20,100,140,40)+T(90,124,'f(int x): x = 9','t','middle')+T(90,160,'a still 5','ta','middle')+
 R(200,40,140,50)+T(270,56,'main: a = 5','t','middle')+T(270,76,'address &a → ptr','t','middle')+R(200,100,140,40)+T(270,124,'f(int *p): *p = 9','t','middle')+T(270,160,'a becomes 9','ta','middle')+
 LA(270,92,270,100,'a')),
 c:'Value passes a copy. Reference passes the address so the original changes.'},
{svg:S(360,200,
 T(8,16,'STRUCT vs UNION MEMORY','ta')+
 T(20,40,'struct { int i; float f; char c; }','t')+
 R(20,52,60,28)+T(50,70,'int 4','t','middle')+R(80,52,60,28)+T(110,70,'float 4','t','middle')+R(140,52,60,28)+T(170,70,'char 1+pad','t','middle')+T(210,70,'≥ 9 bytes','ta')+
 T(20,116,'union { int i; float f; char c; }','t')+
 R(20,128,60,28,'fa')+T(50,146,'shared','ta','middle')+T(100,146,'size = largest = 4 bytes','ta')+T(20,184,'check both with sizeof()','t')),
 c:'Structure fields sit side by side; union fields overlap in the same space.'},
{svg:S(360,210,
 T(8,16,'FIVE INHERITANCE TYPES','ta')+
 R(14,34,34,18)+T(31,47,'A','t','middle')+L(31,52,31,70)+R(14,70,34,18)+T(31,83,'B','t','middle')+T(31,106,'single','t','middle')+
 R(80,34,34,18)+T(97,47,'A','t','middle')+R(120,34,34,18)+T(137,47,'B','t','middle')+L(97,52,117,70)+L(137,52,117,70)+R(100,70,34,18)+T(117,83,'C','t','middle')+T(117,106,'multiple','t','middle')+
 R(172,34,34,18)+T(189,47,'A','t','middle')+L(189,52,189,70)+R(172,70,34,18)+T(189,83,'B','t','middle')+L(189,88,189,100)+R(172,100,34,18)+T(189,113,'C','t','middle')+T(189,136,'multilevel','t','middle')+
 R(236,34,34,18)+T(253,47,'A','t','middle')+L(253,52,238,70)+L(253,52,278,70)+R(222,70,34,18)+T(239,83,'B','t','middle')+R(262,70,34,18)+T(279,83,'C','t','middle')+T(259,106,'hierarchical','t','middle')+
 R(310,34,34,18)+T(327,47,'A','t','middle')+L(327,52,316,70)+L(327,52,342,70)+R(298,70,24,18)+T(310,83,'B','t','middle')+R(334,70,24,18)+T(346,83,'C','t','middle')+L(310,88,326,102)+L(346,88,330,102)+R(310,102,34,18)+T(327,115,'D','t','middle')+T(327,136,'hybrid','t','middle')+
 T(180,176,'diamond in hybrid → use virtual base class','ta','middle')),
 c:'Arrow direction: parent above, child below. Hybrid mixes two types and needs virtual inheritance.'}
],
ex:{q:['Write a C program from the 17-experiment list (area of shapes, grading, primes/Fibonacci, array search, matrix multiply, string reverse, factorial/GCD, swap, payroll struct/union, file I/O) [lab exam]','Draw the flowchart for your program [lab exam]','C++ program: Bank Account class, String class with constructors, static/friend, inheritance types, abstract Shape, operator overloading, try-catch, templates [lab exam]','Viva: call by value vs reference, struct vs union, constructor types, virtual function, why file must be closed [viva]'],
a:['Write algorithm, then flowchart, then code, then sample output','Run with at least two inputs including an edge case (0, negative, empty)','Be ready to explain every line you typed'],
x:['Missing & in scanf','Off-by-one in loops (using ≤ n for an array of size n)','Forgetting break in switch-case','Recursion without a base case','No fclose() or no NULL check on fopen()']},
fm:['LE-1 to LE-17 program list','Flowchart symbols and structure','Call by value vs reference','Struct vs union with sizeof','Five inheritance types','Constructor, destructor, virtual function definitions'],
hook:'Algorithm, flowchart, code, output. Ampersand in scanf. Base case first. Close the file.'
});
/* study order = where the credits are, then effort */
(function(){
 const order=['beee','phy','math','ai','cfet','uhv','pps','eic'];
 SUBJECTS.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
 SUBJECTS.forEach((s,i)=>{s.num=String(i+1).padStart(2,'0');s.topN=s.units.reduce((n,u)=>n+u.topics.length,0);});
})();
/* real timetable: Revised w.e.f. 28.09.26, Room 13 Ground Floor. Slots: 10-12, 12-1, 2-3, 3-4, 4-5 (break 1-2) */
