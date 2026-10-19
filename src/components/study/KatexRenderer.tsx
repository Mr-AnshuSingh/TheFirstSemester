'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * Automatically upgrades key syllabus mathematical expressions in `k` and `WORKED`
 * (such as Rank, Gamma, Beta, curl/divergence, Maxwell's equations, Schrödinger, etc.)
 * into crisp KaTeX textbook typography while preserving readable surrounding prose.
 */
const MATH_REPLACEMENTS: [RegExp, string][] = [
  [/\|A − λI\| = 0/g, '$\\det(A - \\lambda I) = 0$'],
  [/P⁻¹AP = D/g, '$P^{-1}AP = D$'],
  [/r\(A\) = r\(\[A\|B\]\)/g, '$\\text{Rank}(A) = \\text{Rank}([A\\,|\\,B])$'],
  [/\(uv\)ₙ = Σ ⁿCᵣ uₙ₋ᵣ vᵣ/g, '$(uv)_n = \\sum_{r=0}^{n} \\binom{n}{r} u_{n-r} v_r$'],
  [/f′\(c\) = \[f\(b\) − f\(a\)\]\/\(b − a\)/g, "$f'(c) = \\frac{f(b) - f(a)}{b - a}$"],
  [/κ = y₂ \/ \(1 \+ y₁²\)\^\(3\/2\)/g, '$\\kappa = \\frac{y_2}{(1 + y_1^2)^{3/2}}$'],
  [/x·fₓ \+ y·f_y = n·f/g, '$x\\frac{\\partial f}{\\partial x} + y\\frac{\\partial f}{\\partial y} = nf$'],
  [/x²fₓₓ \+ 2xy·fₓᵧ \+ y²f_yy = n\(n−1\)f/g, '$x^2 f_{xx} + 2xy f_{xy} + y^2 f_{yy} = n(n-1)f$'],
  [/rt − s²/g, '$rt - s^2$'],
  [/d\/dx ∫ₐ₍ₓ₎\^b₍ₓ₎ f\(x,t\)dt = ∫ ∂f\/∂x dt \+ f\(x,b\)·b′ − f\(x,a\)·a′/g, '$\\frac{d}{dx}\\int_{a(x)}^{b(x)} f(x,t)\\,dt = \\int_{a}^{b} \\frac{\\partial f}{\\partial x}\\,dt + f(x,b)b^\\prime - f(x,a)a^\\prime$'],
  [/dV = r² sinθ dr dθ dφ/g, '$dV = r^2 \\sin\\theta\\,dr\\,d\\theta\\,d\\phi$'],
  [/Γ\(n\+1\) = nΓ\(n\); Γ\(½\) = √π; Γ\(n\+1\) = n!/g, '$\\Gamma(n+1) = n\\Gamma(n),\\; \\Gamma(\\tfrac{1}{2}) = \\sqrt{\\pi},\\; \\Gamma(n+1) = n!$'],
  [/B\(m,n\) = Γ\(m\)Γ\(n\)\/Γ\(m\+n\) = 2∫₀\^\(π\/2\) sin\^\(2m−1\)θ cos\^\(2n−1\)θ dθ/g, '$B(m,n) = \\frac{\\Gamma(m)\\Gamma(n)}{\\Gamma(m+n)} = 2\\int_0^{\\pi/2} \\sin^{2m-1}\\theta\\cos^{2n-1}\\theta\\,d\\theta$'],
  [/∇·\(∇×F\) = 0 and ∇×\(∇φ\) = 0/g, '$\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0 \\text{ and } \\nabla \\times (\\nabla \\phi) = \\mathbf{0}$'],
  [/∮\(P dx \+ Q dy\) = ∬\(∂Q\/∂x − ∂P\/∂y\) dA/g, '$\\oint_C (P\\,dx + Q\\,dy) = \\iint_R \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dA$'],
  [/∮F·dr = ∬\(∇×F\)·n̂ dS/g, '$\\oint_C \\mathbf{F}\\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F})\\cdot \\hat{\\mathbf{n}}\\,dS$'],
  [/∯F·n̂ dS = ∭∇·F dV/g, '$\\oiint_S \\mathbf{F}\\cdot \\hat{\\mathbf{n}}\\,dS = \\iiint_V (\\nabla \\cdot \\mathbf{F})\\,dV$'],
  [/Dₙ² = 4nλR/g, '$D_n^2 = 4n\\lambda R$'],
  [/A₂₁\/B₂₁ = 8πhν³\/c³/g, '$\\frac{A_{21}}{B_{21}} = \\frac{8\\pi h\\nu^3}{c^3}$'],
  [/NA = √\(n₁² − n₂²\)/g, '$\\text{NA} = \\sqrt{n_1^2 - n_2^2}$'],
  [/∮E·dA = q\/ε₀; ∮B·dA = 0; ∮E·dl = −dΦB\/dt; ∮B·dl = μ₀\(I \+ ε₀ dΦE\/dt\)/g, '$\\oint \\mathbf{E}\\cdot d\\mathbf{A} = \\frac{q}{\\varepsilon_0},\\; \\oint \\mathbf{B}\\cdot d\\mathbf{A} = 0,\\; \\oint \\mathbf{E}\\cdot d\\mathbf{l} = -\\frac{d\\Phi_B}{dt},\\; \\oint \\mathbf{B}\\cdot d\\mathbf{l} = \\mu_0\\left(I + \\varepsilon_0\\frac{d\\Phi_E}{dt}\\right)$'],
  [/Δx · Δp ≥ ħ\/2/g, '$\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$'],
  [/Eₙ = n²h²\/\(8mL²\), ψₙ = √\(2\/L\) sin\(nπx\/L\)/g, '$E_n = \\frac{n^2 h^2}{8mL^2},\\; \\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)$'],
  [/E = 4\.44 f N Φm/g, '$E_{\\text{rms}} = 4.44\\,f\\,N\\,\\Phi_m$'],
  [/f\(n\) = g\(n\) \+ h\(n\)/g, '$f(n) = g(n) + h(n)$'],
  [/P\(A\|B\) = P\(B\|A\)·P\(A\)\/P\(B\)/g, '$P(A\\mid B) = \\frac{P(B\\mid A)P(A)}{P(B)}$'],
];

export function renderRichMathHtml(rawText: string): string {
  let processed = rawText;
  for (const [pattern, replacement] of MATH_REPLACEMENTS) {
    processed = processed.replace(pattern, replacement);
  }
  return processed.replace(/\$([^$]+)\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex, { throwOnError: false, displayMode: false });
    } catch {
      return tex;
    }
  });
}

export const KatexText: React.FC<{ htmlOrText: string; className?: string }> = ({
  htmlOrText,
  className,
}) => {
  const rendered = useMemo(() => renderRichMathHtml(htmlOrText), [htmlOrText]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: rendered }} />;
};
