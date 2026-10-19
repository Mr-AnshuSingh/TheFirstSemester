import { WorkedExampleMap } from '@/types/syllabus';

export const WORKED: WorkedExampleMap = {
'math:0':'<b>Rank:</b> A = [[1,2,3],[2,4,6],[1,0,1]]. R₂ → R₂ − 2R₁ gives [0,0,0]; R₃ → R₃ − R₁ gives [0,−2,−2]. Two non-zero rows remain, so <b>rank = 2</b>.<br><b>Cayley–Hamilton:</b> A = [[1,2],[3,4]] has trace 5, det −2, so λ² − 5λ − 2 = 0 and A² − 5A − 2I = 0. Multiply by A⁻¹: A − 5I − 2A⁻¹ = 0, so A⁻¹ = (A − 5I)/2 = [[−2, 1],[1.5, −0.5]].',
'math:1':'<b>Lagrange</b> for f(x) = x² on [1, 3]: slope of chord = (9 − 1)/2 = 4. f′(c) = 2c = 4 gives c = 2, which lies in (1, 3). ✓ Verified.',
'math:2':'<b>Euler:</b> f = x³ + y³ is homogeneous of degree 3. x·fₓ + y·f_y = x(3x²) + y(3y²) = 3(x³ + y³) = 3f. ✓',
'math:3':'<b>Beta–Gamma:</b> ∫₀^(π/2) sin⁴θ cos²θ dθ = ½·B(5/2, 3/2) = ½·Γ(5/2)Γ(3/2)/Γ(4). With Γ(5/2) = 3√π/4, Γ(3/2) = √π/2, Γ(4) = 6: = ½ · (3π/8)/6 = <b>π/32</b>.',
'math:4':'<b>Green</b> for F = (xy, x²) round the unit square: ∮ = ∬(∂Q/∂x − ∂P/∂y)dA = ∬(2x − x)dA = ∫₀¹∫₀¹ x dx dy = <b>½</b>. Compute the line integral on the four edges separately and show it is also ½.',
'phy:0':'<b>Newton’s rings:</b> R = 100 cm, D₅ = 0.30 cm, D₁₅ = 0.52 cm, p = 10. λ = (D₁₅² − D₅²)/(4pR) = (0.2704 − 0.0900)/(4 × 10 × 100) = 4.51 × 10⁻⁵ cm ≈ <b>451 nm</b>.',
'phy:1':'<b>Fibre:</b> n₁ = 1.50, n₂ = 1.45. NA = √(1.50² − 1.45²) = √0.1475 = <b>0.384</b>; acceptance angle θ₀ = sin⁻¹(0.384) ≈ <b>22.6°</b>.',
'phy:3':'<b>De Broglie:</b> electron through 100 V: λ = 12.27/√100 = <b>1.227 Å</b>.<br><b>Box:</b> electron in L = 1 nm: E₁ = h²/(8mL²) ≈ <b>0.376 eV</b>, and E₂ = 4E₁ = 1.50 eV, E₃ = 9E₁ = 3.38 eV.',
'beee:0':'<b>Star–delta:</b> a delta with each side 30 Ω becomes a star with each arm R_Y = R_Δ/3 = <b>10 Ω</b>. <b>Divider:</b> 12 V across 4 Ω + 2 Ω gives V₄ = 12 × 4/6 = 8 V.',
'beee:1':'<b>Series RLC:</b> R = 30 Ω, X_L = 60 Ω, X_C = 20 Ω, V = 230 V. Z = √(30² + 40²) = 50 Ω; I = 230/50 = 4.6 A; pf = R/Z = 0.6 lagging; P = VI cosφ = 230 × 4.6 × 0.6 ≈ <b>635 W</b>.',
'beee:2':'<b>Transformer:</b> 2200 V / 220 V, N₁ = 1000 turns, 50 Hz. K = 220/2200, so N₂ = 100. From E = 4.44 f N Φm: Φm = 2200/(4.44 × 50 × 1000) ≈ <b>9.9 mWb</b>.',
'beee:3':'<b>Rectifier:</b> Vm = 10 V. Half-wave V_dc = Vm/π = <b>3.18 V</b>; full-wave V_dc = 2Vm/π = <b>6.37 V</b>. PIV = Vm = 10 V (bridge).',
'cfet:1':'<b>2’s complement of −18 (8-bit):</b> 18 = 00010010 → flip 11101101 → add 1 → <b>11101110</b>.<br><b>Convert 45:</b> 101101₂ = 55₈ = 2D₁₆.',
'ai:3':'<b>Bayes:</b> P(D) = 0.01, P(+|D) = 0.9, P(+|¬D) = 0.09. P(+) = 0.9 × 0.01 + 0.09 × 0.99 = 0.0981. P(D|+) = 0.009/0.0981 ≈ <b>0.092</b>.',
'pps:2':'<b>Trace factorial(3):</b> fact(3) = 3 × fact(2) = 3 × (2 × fact(1)) = 3 × 2 × (1 × fact(0)) = 3 × 2 × 1 × 1 = <b>6</b>. Base case: fact(0) = 1.'
};
