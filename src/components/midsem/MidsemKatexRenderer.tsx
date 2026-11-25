'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * Midsem-only copy of KaTeX + safe HTML/Markdown renderer so shared
 * KatexRenderer.tsx (used on /) stays completely untouched.
 */
function sanitizeLatex(tex: string): string {
  return tex
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\u2212/g, '-')
    .trim();
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderKatexFragment(tex: string, displayMode: boolean): string {
  try {
    const html = katex.renderToString(sanitizeLatex(tex), {
      displayMode,
      throwOnError: false,
      strict: false,
      output: 'html',
    });
    if (displayMode) {
      return `<div class="katex-display-wrapper my-2 overflow-x-auto">${html}</div>`;
    }
    return `<span class="katex-formula-wrapper">${html}</span>`;
  } catch {
    return escapeHtml(tex);
  }
}

export function renderMidsemMathHtml(rawText: string | null | undefined): string {
  if (rawText === null || rawText === undefined) return '';
  let text = String(rawText);
  if (!text) return '';

  const mathPlaceholders: string[] = [];
  const placeholderPrefix = '___MIDSEM_MATH_';

  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex: string) => {
    const idx = mathPlaceholders.length;
    mathPlaceholders.push(renderKatexFragment(tex, true));
    return `${placeholderPrefix}${idx}___`;
  });

  text = text.replace(/\$([^$\n]+?)\$/g, (_, tex: string) => {
    const idx = mathPlaceholders.length;
    mathPlaceholders.push(renderKatexFragment(tex, false));
    return `${placeholderPrefix}${idx}___`;
  });

  text = text.replace(/\\\[([\s\S]+?)\\\]/g, (_, tex: string) => {
    const idx = mathPlaceholders.length;
    mathPlaceholders.push(renderKatexFragment(tex, true));
    return `${placeholderPrefix}${idx}___`;
  });

  text = text.replace(/\\\(([\s\S]+?)\\\)/g, (_, tex: string) => {
    const idx = mathPlaceholders.length;
    mathPlaceholders.push(renderKatexFragment(tex, false));
    return `${placeholderPrefix}${idx}___`;
  });

  // Render clean inline markdown safely after escaping HTML
  text = escapeHtml(text);
  text = text.replace(
    /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g,
    (_, _lang: string, code: string) =>
      `<pre class="my-2.5 p-3 rounded-lg bg-paper2 border border-ink/30 font-mono text-sm overflow-x-auto text-ink"><code>${code.trim()}</code></pre>`
  );
  text = text.replace(/\*\*([^*]+?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>');
  text = text.replace(
    /`([^`]+?)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-paper2 font-mono text-sm text-accentRed border border-ink/20">$1</code>'
  );

  for (let i = 0; i < mathPlaceholders.length; i++) {
    const placeholder = `${placeholderPrefix}${i}___`;
    text = text.replace(placeholder, () => mathPlaceholders[i]);
  }

  return text;
}

export const MidsemKatexText: React.FC<{
  htmlOrText: string | null | undefined;
  className?: string;
}> = ({ htmlOrText, className }) => {
  const renderedHtml = useMemo(() => renderMidsemMathHtml(htmlOrText), [htmlOrText]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export const MidsemMathText: React.FC<{
  text: string | null | undefined;
  className?: string;
}> = ({ text, className }) => (
  <MidsemKatexText htmlOrText={text} className={`whitespace-pre-wrap ${className || ''}`} />
);
