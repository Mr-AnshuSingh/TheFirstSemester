'use client';

import React, { useMemo, useState } from 'react';
import { Maximize2, Printer, X } from 'lucide-react';
import { escapeHtml, renderMidsemMathHtml } from './MidsemKatexRenderer';
import { MidsemMermaidFlowchart } from './MidsemMermaidFlowchart';

type Block =
  | { type: 'heading'; level: 1 | 2 | 3 | 4; text: string }
  | { type: 'hr' }
  | { type: 'code'; lang: string; code: string }
  | { type: 'mermaid'; code: string }
  | { type: 'math'; tex: string }
  | { type: 'image'; alt: string; src: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'table'; headers: string[]; alignments: ('left' | 'center' | 'right')[]; rows: string[][] }
  | { type: 'list'; items: { indent: number; ordered: boolean; marker: string; content: string[] }[] }
  | { type: 'paragraph'; text: string };

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells: string[] = [];
  let cur = '';
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === '\\' && trimmed[i + 1] === '|') {
      cur += '\\|';
      i++;
    } else if (trimmed[i] === '|') {
      cells.push(cur.trim());
      cur = '';
    } else {
      cur += trimmed[i];
    }
  }
  cells.push(cur.trim());
  return cells;
}

function isTableSeparator(line: string): boolean {
  const t = line.trim();
  if (!t.includes('|') || !t.includes('-')) return false;
  const cells = splitTableRow(t);
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

function parseTableAlignments(line: string): ('left' | 'center' | 'right')[] {
  return splitTableRow(line).map((c) => {
    if (c.startsWith(':') && c.endsWith(':')) return 'center';
    if (c.endsWith(':')) return 'right';
    return 'left';
  });
}

function renderInlineHtml(raw: string): string {
  if (!raw) return '';
  const mathTokens: string[] = [];
  const codeTokens: string[] = [];
  const MP = '___INLINE_MATH_';
  const CP = '___INLINE_CODE_';

  let text = raw.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex: string) => {
    const idx = mathTokens.length;
    mathTokens.push(renderMidsemMathHtml(`$$${tex}$$`));
    return `${MP}${idx}___`;
  });

  text = text.replace(/\$([^$\n]+?)\$/g, (_, tex: string) => {
    const idx = mathTokens.length;
    mathTokens.push(renderMidsemMathHtml(`$${tex}$`));
    return `${MP}${idx}___`;
  });

  text = text.replace(/`([^`\n]+)`/g, (_, code: string) => {
    const idx = codeTokens.length;
    codeTokens.push(
      `<code class="px-1.5 py-0.5 rounded bg-paper2 text-accentRed font-mono text-sm border border-hair/60">${escapeHtml(
        code
      )}</code>`
    );
    return `${CP}${idx}___`;
  });

  text = escapeHtml(text);
  text = text.replace(
    /\[([^\]]+)\]\((#[^)]+|https?:\/\/[^)]+)\)/g,
    '<a href="$2" class="text-accentTeal underline hover:text-accentRed font-medium">$1</a>'
  );
  text = text.replace(/\*\*\*([^*]+?)\*\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*\*([^*]+?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>');
  text = text.replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s).,;:!?]|$)/g, '$1<span class="font-medium text-ink">$2</span>');

  text = text.replace(/___INLINE_CODE_(\d+)___/g, (_, idxStr: string) => codeTokens[Number(idxStr)] || '');
  text = text.replace(/___INLINE_MATH_(\d+)___/g, (_, idxStr: string) => mathTokens[Number(idxStr)] || '');
  return text;
}

function parseMarkdownBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) { i++; continue; }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    const hMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (hMatch) {
      blocks.push({ type: 'heading', level: hMatch[1].length as 1 | 2 | 3 | 4, text: hMatch[2].trim() });
      i++;
      continue;
    }

    const fenceMatch = trimmed.match(/^```([a-zA-Z0-9_-]*)$/);
    if (fenceMatch) {
      const lang = (fenceMatch[1] || 'text').toLowerCase();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        buf.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++;
      if (lang === 'mermaid') blocks.push({ type: 'mermaid', code: buf.join('\n') });
      else blocks.push({ type: 'code', lang, code: buf.join('\n') });
      continue;
    }

    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      blocks.push({ type: 'image', alt: imgMatch[1], src: imgMatch[2] });
      i++;
      continue;
    }

    if (trimmed.startsWith('$$')) {
      if (trimmed.length > 4 && trimmed.endsWith('$$')) {
        blocks.push({ type: 'math', tex: trimmed.slice(2, -2).trim() });
        i++;
        continue;
      }
      const buf: string[] = [trimmed.slice(2)];
      i++;
      while (i < lines.length && !lines[i].trim().endsWith('$$')) {
        buf.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        buf.push(lines[i].trim().slice(0, -2));
        i++;
      }
      blocks.push({ type: 'math', tex: buf.join('\n').trim() });
      continue;
    }

    if (trimmed.startsWith('>')) {
      const qLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        qLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', lines: qLines });
      continue;
    }

    if (trimmed.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headers = splitTableRow(trimmed);
      const alignments = parseTableAlignments(lines[i + 1]);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().includes('|') && lines[i].trim() !== '') {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      blocks.push({ type: 'table', headers, alignments, rows });
      continue;
    }

    if (/^(\s*)(\*|-|\d+\.)\s+/.test(line)) {
      const items: { indent: number; ordered: boolean; marker: string; content: string[] }[] = [];
      while (i < lines.length) {
        const cur = lines[i];
        const curTrim = cur.trim();
        if (!curTrim) {
          const nextNonEmpty = lines.slice(i + 1).find((l) => l.trim() !== '');
          if (!nextNonEmpty || !(/^(\s*)(\*|-|\d+\.)\s+/.test(nextNonEmpty) || /^\s{2,}/.test(nextNonEmpty))) break;
          i++;
          continue;
        }
        const m = cur.match(/^(\s*)(\*|-|(\d+)\.)\s+(.*)$/);
        if (m) {
          items.push({
            indent: Math.floor(m[1].length / 2),
            ordered: Boolean(m[3]),
            marker: m[3] ? `${m[3]}.` : '•',
            content: [m[4]],
          });
          i++;
        } else if (cur.startsWith('  ') && items.length > 0) {
          if (curTrim.startsWith('```')) {
            const lang = curTrim.slice(3).trim();
            const fenceBuf: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
              fenceBuf.push(lines[i]);
              i++;
            }
            if (i < lines.length) i++;
            items[items.length - 1].content.push(`__CODE_BLOCK__${lang}__SEP__${fenceBuf.join('\n')}`);
          } else {
            items[items.length - 1].content.push(curTrim);
            i++;
          }
        } else break;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    const pLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim()) &&
      !/^#{1,4}\s+/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('$$') &&
      !lines[i].trim().startsWith('>') &&
      !/^!\[([^\]]*)\]\(([^)]+)\)$/.test(lines[i].trim()) &&
      !/^(\s*)(\*|-|\d+\.)\s+/.test(lines[i]) &&
      !(lines[i].includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
    ) {
      pLines.push(lines[i].trim());
      i++;
    }
    if (pLines.length) blocks.push({ type: 'paragraph', text: pLines.join(' ') });
    else i++;
  }
  return blocks;
}

export const MidsemQuickMarkdownRenderer: React.FC<{
  markdown: string;
  onChapterPrint?: () => void;
  chapterLabel?: string;
}> = ({ markdown, onChapterPrint, chapterLabel }) => {
  const blocks = useMemo(() => parseMarkdownBlocks(markdown), [markdown]);
  const [zoomImg, setZoomImg] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="midsem-body space-y-3 text-ink">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'hr':
            return <hr key={idx} className="my-4 border-t border-hair/60" />;
          case 'heading': {
            if (block.level === 1) {
              return (
                <h2
                  key={idx}
                  className="midsem-heading text-3xl text-ink border-b-2 border-ink pb-2 mb-3"
                  dangerouslySetInnerHTML={{ __html: renderInlineHtml(block.text) }}
                />
              );
            }
            if (block.level === 2) {
              return (
                <div key={idx} className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink/25 pb-2 pt-1 mb-3">
                  <h3
                    className="midsem-heading text-2xl sm:text-3xl text-accentRed m-0"
                    dangerouslySetInnerHTML={{ __html: renderInlineHtml(block.text) }}
                  />
                  {onChapterPrint && (
                    <button
                      type="button"
                      onClick={onChapterPrint}
                      className="midsem-noprint midsem-tap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-ink/40 bg-paper2 hover:bg-paper3 midsem-meta font-bold text-ink"
                      title={`Print ${chapterLabel || 'chapter'} only`}
                    >
                      <Printer className="w-4 h-4 text-accentTeal" aria-hidden="true" />
                      <span>Print Chapter</span>
                    </button>
                  )}
                </div>
              );
            }
            if (block.level === 3) {
              return (
                <h4
                  key={idx}
                  className="font-sans text-lg font-bold text-accentTeal mt-4 mb-1.5"
                  dangerouslySetInnerHTML={{ __html: renderInlineHtml(block.text) }}
                />
              );
            }
            return (
              <h5
                key={idx}
                className="font-sans text-base font-bold text-ink mt-3 mb-1"
                dangerouslySetInnerHTML={{ __html: renderInlineHtml(block.text) }}
              />
            );
          }
          case 'mermaid':
            return <MidsemMermaidFlowchart key={idx} code={block.code} />;
          case 'code':
            return (
              <pre key={idx} className="midsem-avoid-break my-3 p-3.5 rounded-lg bg-paper2 border border-ink/30 font-mono text-sm overflow-x-auto text-ink leading-snug">
                <code>{block.code}</code>
              </pre>
            );
          case 'math':
            return (
              <div
                key={idx}
                className="midsem-avoid-break my-2.5 px-3 py-2 rounded-lg bg-paper2/60 border border-hair/60 overflow-x-auto text-center"
                dangerouslySetInnerHTML={{ __html: renderMidsemMathHtml(`$$${block.tex}$$`) }}
              />
            );
          case 'image':
            return (
              <figure key={idx} className="midsem-avoid-break my-4 rounded-2xl border-2 border-ink bg-paper2 p-3 sm:p-4 shadow-sketch">
                <div className="relative w-full overflow-x-auto rounded-xl border border-ink/25 bg-paper p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={block.src} alt={block.alt || 'Engineering diagram'} className="w-full h-auto block mx-auto rounded" />
                </div>
                <figcaption className="mt-2.5 flex items-center justify-between gap-2 pt-1 midsem-meta text-dim font-medium">
                  <span>{block.alt}</span>
                  <button
                    type="button"
                    onClick={() => setZoomImg({ src: block.src, alt: block.alt })}
                    className="midsem-noprint midsem-tap inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-ink/40 bg-paper hover:bg-paper3 text-ink font-bold"
                  >
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    <span>Full Size</span>
                  </button>
                </figcaption>
              </figure>
            );
          case 'blockquote':
            return (
              <blockquote key={idx} className="midsem-avoid-break my-3 pl-4 pr-3 py-2.5 rounded-r-lg border-l-4 border-accentGold bg-accentGold/10 text-ink space-y-1">
                {block.lines.map((ql, qIdx) => (
                  <p key={qIdx} dangerouslySetInnerHTML={{ __html: renderInlineHtml(ql) }} />
                ))}
              </blockquote>
            );
          case 'table':
            return (
              <div key={idx} className="midsem-avoid-break my-4 overflow-x-auto rounded-lg border-2 border-ink shadow-sketchy">
                <table className="w-full border-collapse text-left bg-paper">
                  <thead>
                    <tr className="bg-paper3 border-b-2 border-ink">
                      {block.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className={`px-3 py-2 font-bold text-ink border-r border-hair/60 last:border-r-0 text-${block.alignments[hIdx] || 'left'}`}
                          dangerouslySetInnerHTML={{ __html: renderInlineHtml(h) }}
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-hair/60 last:border-b-0 odd:bg-paper even:bg-paper2/45">
                        {block.headers.map((_, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-3 py-2 border-r border-hair/40 last:border-r-0 align-top text-${block.alignments[cIdx] || 'left'}`}
                            dangerouslySetInnerHTML={{ __html: renderInlineHtml(row[cIdx] || '') }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'list':
            return (
              <div key={idx} className="space-y-1.5 my-2">
                {block.items.map((item, itIdx) => (
                  <div key={itIdx} style={{ paddingLeft: `${Math.min(item.indent, 4) * 20}px` }} className="flex items-start gap-2.5">
                    <span className={`shrink-0 font-bold select-none mt-0.5 ${item.ordered ? 'text-accentTeal font-mono min-w-[1.5rem]' : 'text-accentRed'}`}>
                      {item.marker}
                    </span>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      {item.content.map((part, pIdx) => {
                        if (part.startsWith('__CODE_BLOCK__')) {
                          const [, rest] = part.split('__CODE_BLOCK__');
                          const sepIdx = rest.indexOf('__SEP__');
                          const codeText = sepIdx >= 0 ? rest.slice(sepIdx + 7) : rest;
                          return (
                            <pre key={pIdx} className="p-2.5 rounded-lg bg-paper2 border border-ink/30 font-mono text-sm overflow-x-auto text-ink">
                              <code>{codeText}</code>
                            </pre>
                          );
                        }
                        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
                          return (
                            <div
                              key={pIdx}
                              className="my-1 px-2.5 py-1.5 rounded bg-paper2/60 border border-hair/50 overflow-x-auto"
                              dangerouslySetInnerHTML={{ __html: renderMidsemMathHtml(part) }}
                            />
                          );
                        }
                        return <div key={pIdx} dangerouslySetInnerHTML={{ __html: renderInlineHtml(part) }} />;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          case 'paragraph':
            return <p key={idx} dangerouslySetInnerHTML={{ __html: renderInlineHtml(block.text) }} />;
        }
      })}

      {zoomImg && (
        <div
          className="midsem-noprint fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setZoomImg(null)}
        >
          <div
            className="bg-paper rounded-2xl border-2 border-ink max-w-7xl w-[96vw] max-h-[94vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-paper2 border-b-2 border-ink">
              <span className="font-bold midsem-meta text-ink">{zoomImg.alt || 'Diagram Preview'}</span>
              <button
                type="button"
                onClick={() => setZoomImg(null)}
                className="midsem-tap inline-flex items-center justify-center rounded-xl border-2 border-ink/30 bg-paper hover:bg-paper3 text-ink"
                aria-label="Close zoom preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 sm:p-5 overflow-auto flex-1 bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={zoomImg.src} alt={zoomImg.alt} className="w-full h-auto mx-auto block" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
