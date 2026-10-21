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

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderRichMathHtml(rawText: string | null | undefined): string {
  if (!rawText) return '';
  let processed = String(rawText);

  const KATEX_OPTIONS_DISPLAY = {
    displayMode: true,
    throwOnError: false,
    macros: { '\\oiint': '\\oint\\!\\oint' },
  };

  const KATEX_OPTIONS_INLINE = {
    displayMode: false,
    throwOnError: false,
    macros: { '\\oiint': '\\oint\\!\\oint' },
  };

  // 1. Display math $$...$$
  processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
    try {
      return `<div class="katex-display my-2 overflow-x-auto text-center">${katex.renderToString(tex.trim(), KATEX_OPTIONS_DISPLAY)}</div>`;
    } catch {
      return `<div class="katex-error my-2 font-mono text-xs text-accentRed">${escapeHtml(tex)}</div>`;
    }
  });

  // 2. Syllabus math substitutions
  for (const [pattern, replacement] of MATH_REPLACEMENTS) {
    processed = processed.replace(pattern, replacement);
  }

  // 3. Inline math $...$
  processed = processed.replace(/\$([^$\n]+?)\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex.trim(), KATEX_OPTIONS_INLINE);
    } catch {
      return `$${tex}$`;
    }
  });

  return processed;
}

/**
 * Safely parses markdown prose, syllabus KaTeX formulas, and prevents XSS.
 * Eliminates whitespace-pre-line KaTeX layout destruction.
 */
export function renderSafeMarkdownAndMathHtml(rawText: string | null | undefined): string {
  if (!rawText) return '';

  const mathPlaceholders: string[] = [];
  const placeholderPrefix = '___KATEX_PH_';

  const KATEX_OPTIONS_DISPLAY = {
    displayMode: true,
    throwOnError: false,
    macros: { '\\oiint': '\\oint\\!\\oint' },
  };

  const KATEX_OPTIONS_INLINE = {
    displayMode: false,
    throwOnError: false,
    macros: { '\\oiint': '\\oint\\!\\oint' },
  };

  let text = String(rawText);

  // 1. Extract Display Math $$...$$
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
    try {
      const rendered = katex.renderToString(tex.trim(), KATEX_OPTIONS_DISPLAY);
      const id = `${placeholderPrefix}${mathPlaceholders.length}___`;
      mathPlaceholders.push(`<div class="katex-display my-3 overflow-x-auto text-center">${rendered}</div>`);
      return id;
    } catch {
      const id = `${placeholderPrefix}${mathPlaceholders.length}___`;
      mathPlaceholders.push(`<pre class="font-mono text-xs my-2 text-accentRed">${escapeHtml(tex)}</pre>`);
      return id;
    }
  });

  // 2. Extract Inline Math $...$
  text = text.replace(/\$([^$\n]+?)\$/g, (_, tex) => {
    try {
      const rendered = katex.renderToString(tex.trim(), KATEX_OPTIONS_INLINE);
      const id = `${placeholderPrefix}${mathPlaceholders.length}___`;
      mathPlaceholders.push(rendered);
      return id;
    } catch {
      const id = `${placeholderPrefix}${mathPlaceholders.length}___`;
      mathPlaceholders.push(escapeHtml(tex));
      return id;
    }
  });

  // 3. Apply syllabus formula replacements if any raw syllabus notations are present
  for (const [pattern, replacement] of MATH_REPLACEMENTS) {
    text = text.replace(pattern, (match) => {
      try {
        const cleanTex = replacement.replace(/^\$|\$$/g, '');
        const rendered = katex.renderToString(cleanTex, KATEX_OPTIONS_INLINE);
        const id = `${placeholderPrefix}${mathPlaceholders.length}___`;
        mathPlaceholders.push(rendered);
        return id;
      } catch {
        return match;
      }
    });
  }

  // 4. Safe HTML escape on surrounding text
  text = escapeHtml(text);

  // 5. Code blocks ```lang\ncode\n```
  text = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, _lang, code) => {
    return `<pre class="my-2.5 p-3 rounded-lg bg-paper2/90 border border-ink/30 font-mono text-xs overflow-x-auto text-ink"><code>${code.trim()}</code></pre>`;
  });

  // 6. Inline code `code`
  text = text.replace(/`([^`\n]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-ink/10 font-mono text-xs text-accentRed font-semibold">$1</code>');

  // 7. Headings
  text = text.replace(/^### (.*$)/gim, '<h4 class="text-base font-bold font-hand text-accentRed mt-3.5 mb-1">$1</h4>');
  text = text.replace(/^## (.*$)/gim, '<h3 class="text-lg font-bold font-hand text-ink mt-4 mb-1.5 border-b border-dashed border-ink/20 pb-0.5">$1</h3>');
  text = text.replace(/^# (.*$)/gim, '<h2 class="text-xl font-bold font-hand text-ink mt-4 mb-2">$1</h2>');

  // 8. Blockquotes
  text = text.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-accentRed pl-3 py-1 my-2 bg-gold/10 text-ink/90 font-sans text-sm md:text-base">$1</blockquote>');

  // 9. Bold & Italic
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-ink">$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em class="italic text-ink/90">$1</em>');

  // 10. Split lines to parse unordered & ordered lists vs paragraphs
  const lines = text.split('\n');
  const outLines: string[] = [];
  let inUl = false;
  let inOl = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const ulMatch = line.match(/^[\s]*[-*]\s+(.*)$/);
    const olMatch = line.match(/^[\s]*\d+\.\s+(.*)$/);

    if (ulMatch) {
      if (inOl) {
        outLines.push('</ol>');
        inOl = false;
      }
      if (!inUl) {
        outLines.push('<ul class="list-disc pl-5 my-2 space-y-1 font-sans text-sm md:text-base">');
        inUl = true;
      }
      outLines.push(`<li>${ulMatch[1]}</li>`);
    } else if (olMatch) {
      if (inUl) {
        outLines.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        outLines.push('<ol class="list-decimal pl-5 my-2 space-y-1 font-sans text-sm md:text-base">');
        inOl = true;
      }
      outLines.push(`<li>${olMatch[1]}</li>`);
    } else {
      if (inUl) {
        outLines.push('</ul>');
        inUl = false;
      }
      if (inOl) {
        outLines.push('</ol>');
        inOl = false;
      }
      if (!line.trim()) {
        outLines.push('');
      } else if (line.startsWith('<h') || line.startsWith('<pre') || line.startsWith('<blockquote')) {
        outLines.push(line);
      } else {
        outLines.push(`<p class="my-1.5 leading-relaxed font-sans text-sm md:text-base text-ink/90">${line}</p>`);
      }
    }
  }

  if (inUl) outLines.push('</ul>');
  if (inOl) outLines.push('</ol>');

  text = outLines.join('\n');

  // 11. Re-inject KaTeX math placeholders
  for (let i = 0; i < mathPlaceholders.length; i++) {
    const placeholder = `${placeholderPrefix}${i}___`;
    text = text.replace(placeholder, mathPlaceholders[i]);
  }

  return text;
}

export const KatexText: React.FC<{ htmlOrText: string | null | undefined; className?: string }> = ({
  htmlOrText,
  className,
}) => {
  const rendered = useMemo(() => renderRichMathHtml(htmlOrText), [htmlOrText]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: rendered }} />;
};

export const SafeMarkdownText: React.FC<{ content: string | null | undefined; className?: string }> = ({
  content,
  className,
}) => {
  const rendered = useMemo(() => renderSafeMarkdownAndMathHtml(content), [content]);
  return <div className={className} dangerouslySetInnerHTML={{ __html: rendered }} />;
};
