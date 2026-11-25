'use client';

import React, { useMemo } from 'react';

interface FlowNode {
  id: string;
  label: string;
  subgraphId?: string;
}

interface FlowEdge {
  from: string;
  to: string;
  label?: string;
  dashed: boolean;
  bidir: boolean;
}

interface SubgraphInfo {
  id: string;
  title: string;
  nodeIds: string[];
}

interface ParsedDiagram {
  direction: 'LR' | 'TD';
  nodes: Map<string, FlowNode>;
  nodeOrder: string[];
  edges: FlowEdge[];
  subgraphs: SubgraphInfo[];
}

function parseMermaidFlowchart(raw: string): ParsedDiagram {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('%%'));

  let direction: 'LR' | 'TD' = 'TD';
  if (lines[0]?.toLowerCase().startsWith('flowchart') || lines[0]?.toLowerCase().startsWith('graph')) {
    if (/\bLR\b|\bRL\b/i.test(lines[0])) direction = 'LR';
  }

  const nodes = new Map<string, FlowNode>();
  const nodeOrder: string[] = [];
  const edges: FlowEdge[] = [];
  const subgraphs: SubgraphInfo[] = [];
  const sgStack: SubgraphInfo[] = [];

  const registerNode = (token: string): string => {
    const trimmed = token.trim();
    const m = trimmed.match(/^([A-Za-z0-9_]+)\s*(?:\["([^"]*)"\]|\[([^\]]*)\]|\("([^"]*)"\)|\(([^)]*)\))?$/);
    const id = m ? m[1] : trimmed.replace(/[^A-Za-z0-9_]/g, '') || `N${nodeOrder.length}`;
    const rawLabel = m ? (m[2] ?? m[3] ?? m[4] ?? m[5] ?? '') : trimmed;
    const currentSg = sgStack[sgStack.length - 1];

    if (!nodes.has(id)) {
      nodes.set(id, { id, label: rawLabel || id, subgraphId: currentSg?.id });
      nodeOrder.push(id);
      if (currentSg && !currentSg.nodeIds.includes(id)) currentSg.nodeIds.push(id);
    } else if (rawLabel) {
      const existing = nodes.get(id)!;
      if (existing.label === existing.id) existing.label = rawLabel;
    }
    return id;
  };

  const edgeOpRx = /(<-->|-\.->|-->)(?:\|"?([^"|]*)"?\|)?/g;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const sgMatch = line.match(/^subgraph\s+([A-Za-z0-9_]+)(?:\s*\["([^"]*)"\]|\s+(.+))?$/);
    if (sgMatch) {
      const sg: SubgraphInfo = {
        id: sgMatch[1],
        title: (sgMatch[2] || sgMatch[3] || sgMatch[1]).trim(),
        nodeIds: [],
      };
      subgraphs.push(sg);
      sgStack.push(sg);
      continue;
    }
    if (line === 'end') {
      sgStack.pop();
      continue;
    }

    const parts: { text: string; op?: string; label?: string }[] = [];
    let lastIdx = 0;
    edgeOpRx.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = edgeOpRx.exec(line)) !== null) {
      parts.push({ text: line.slice(lastIdx, m.index).trim(), op: m[1], label: m[2]?.trim() });
      lastIdx = m.index + m[0].length;
    }
    if (parts.length > 0) {
      parts.push({ text: line.slice(lastIdx).trim() });
      for (let k = 0; k < parts.length - 1; k++) {
        const srcId = registerNode(parts[k].text);
        const dstId = registerNode(parts[k + 1].text);
        const op = parts[k].op || '-->';
        edges.push({
          from: srcId,
          to: dstId,
          label: parts[k].label,
          dashed: op === '-.->',
          bidir: op === '<-->',
        });
      }
    } else if (/^[A-Za-z0-9_]+\s*[\[(]/.test(line)) {
      registerNode(line);
    }
  }

  return { direction, nodes, nodeOrder, edges, subgraphs };
}

function wrapLabel(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let curr = '';
  for (const w of words) {
    if (!curr) curr = w;
    else if (curr.length + 1 + w.length <= maxChars) curr += ' ' + w;
    else {
      lines.push(curr);
      curr = w;
    }
  }
  if (curr) lines.push(curr);
  return lines.length ? lines : [''];
}

export const MidsemMermaidFlowchart: React.FC<{ code: string }> = ({ code }) => {
  const layout = useMemo(() => {
    const parsed = parseMermaidFlowchart(code);
    const sgIds = new Set(parsed.subgraphs.map((s) => s.id));
    const resolveTarget = (id: string): string => {
      if (sgIds.has(id) && !parsed.nodes.has(id)) {
        const sg = parsed.subgraphs.find((s) => s.id === id);
        if (sg && sg.nodeIds.length > 0) return sg.nodeIds[0];
      }
      return id;
    };

    const resolvedEdges = parsed.edges
      .map((e) => ({ ...e, from: resolveTarget(e.from), to: resolveTarget(e.to) }))
      .filter((e) => parsed.nodes.has(e.from) && parsed.nodes.has(e.to) && e.from !== e.to);

    const adj = new Map<string, string[]>();
    const inDeg = new Map<string, number>();
    for (const id of parsed.nodeOrder) {
      if (sgIds.has(id) && parsed.nodes.get(id)?.label === id) continue;
      adj.set(id, []);
      inDeg.set(id, 0);
    }

    const activeIds = parsed.nodeOrder.filter((id) => inDeg.has(id));
    for (const e of resolvedEdges) {
      if (!adj.has(e.from) || !adj.has(e.to)) continue;
      adj.get(e.from)!.push(e.to);
      inDeg.set(e.to, (inDeg.get(e.to) || 0) + 1);
    }

    const level = new Map<string, number>();
    activeIds.forEach((id) => level.set(id, 0));
    const queue = activeIds.filter((id) => (inDeg.get(id) || 0) === 0);
    const seen = new Set<string>(queue);
    if (queue.length === 0 && activeIds.length > 0) {
      queue.push(activeIds[0]);
      seen.add(activeIds[0]);
    }

    let steps = 0;
    while (queue.length > 0 && steps < activeIds.length * 4) {
      steps++;
      const cur = queue.shift()!;
      const curLvl = level.get(cur) || 0;
      for (const nxt of adj.get(cur) || []) {
        if ((level.get(nxt) || 0) < curLvl + 1 && !seen.has(nxt + '->' + cur)) {
          level.set(nxt, Math.min(activeIds.length - 1, curLvl + 1));
          queue.push(nxt);
          seen.add(cur + '->' + nxt);
        }
      }
    }

    const layers = new Map<number, string[]>();
    for (const id of activeIds) {
      const l = level.get(id) || 0;
      if (!layers.has(l)) layers.set(l, []);
      layers.get(l)!.push(id);
    }

    const sortedLayers = Array.from(layers.keys()).sort((a, b) => a - b);
    const isLR = parsed.direction === 'LR';
    const maxChars = isLR ? 20 : 28;
    const nodeW = isLR ? 175 : 225;
    const padX = 24;
    const gapMain = isLR ? 66 : 48;
    const gapCross = isLR ? 26 : 32;

    const boxes = new Map<
      string,
      { x: number; y: number; w: number; h: number; lines: string[]; label: string }
    >();
    for (const id of activeIds) {
      const label = parsed.nodes.get(id)!.label;
      const lines = wrapLabel(label, maxChars);
      const h = Math.max(46, lines.length * 18 + 20);
      boxes.set(id, { x: 0, y: 0, w: nodeW, h, lines, label });
    }

    const maxCrossSpan = Math.max(
      1,
      ...sortedLayers.map((l) => {
        const ids = layers.get(l)!;
        if (isLR) return ids.reduce((s, id) => s + boxes.get(id)!.h, 0) + (ids.length - 1) * gapCross;
        return ids.length * nodeW + (ids.length - 1) * gapCross;
      })
    );

    let mainCursor = padX;
    for (const l of sortedLayers) {
      const ids = layers.get(l)!;
      if (isLR) {
        const totalH = ids.reduce((s, id) => s + boxes.get(id)!.h, 0) + (ids.length - 1) * gapCross;
        let yCur = padX + (maxCrossSpan - totalH) / 2;
        for (const id of ids) {
          const b = boxes.get(id)!;
          b.x = mainCursor;
          b.y = yCur;
          yCur += b.h + gapCross;
        }
        mainCursor += nodeW + gapMain;
      } else {
        const totalW = ids.length * nodeW + (ids.length - 1) * gapCross;
        let xCur = padX + (maxCrossSpan - totalW) / 2;
        let layerMaxH = 0;
        for (const id of ids) {
          const b = boxes.get(id)!;
          b.x = xCur;
          b.y = mainCursor;
          xCur += b.w + gapCross;
          if (b.h > layerMaxH) layerMaxH = b.h;
        }
        mainCursor += layerMaxH + gapMain;
      }
    }

    const totalW = (isLR ? mainCursor - gapMain : padX + maxCrossSpan) + padX;
    const totalH = (isLR ? padX + maxCrossSpan : mainCursor - gapMain) + padX;

    const sgRects = parsed.subgraphs
      .map((sg) => {
        const memberBoxes = sg.nodeIds.map((nid) => boxes.get(nid)).filter(Boolean) as {
          x: number;
          y: number;
          w: number;
          h: number;
        }[];
        if (!memberBoxes.length) return null;
        const minX = Math.min(...memberBoxes.map((b) => b.x)) - 12;
        const minY = Math.min(...memberBoxes.map((b) => b.y)) - 26;
        const maxX = Math.max(...memberBoxes.map((b) => b.x + b.w)) + 12;
        const maxY = Math.max(...memberBoxes.map((b) => b.y + b.h)) + 12;
        return { id: sg.id, title: sg.title, x: minX, y: Math.max(4, minY), w: maxX - minX, h: maxY - Math.max(4, minY) };
      })
      .filter(Boolean) as { id: string; title: string; x: number; y: number; w: number; h: number }[];

    const minPadTop = sgRects.length > 0 ? 18 : 0;
    if (minPadTop > 0) {
      boxes.forEach((b) => { b.y += minPadTop; });
      sgRects.forEach((s) => { s.y += minPadTop; });
    }

    return {
      isLR,
      width: Math.max(360, Math.ceil(totalW)),
      height: Math.max(140, Math.ceil(totalH + minPadTop)),
      activeIds,
      boxes,
      edges: resolvedEdges,
      sgRects,
    };
  }, [code]);

  if (!layout.activeIds.length) {
    return (
      <pre className="my-3 p-3 rounded-lg bg-paper2 border-2 border-hair font-mono text-sm overflow-x-auto text-ink">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div className="midsem-avoid-break my-4 rounded-xl border-2 border-ink bg-paper p-3 shadow-sketchy overflow-x-auto">
      <div className="midsem-badge font-mono uppercase tracking-wider text-dim font-bold mb-2">
        Concept Flow Diagram
      </div>
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="w-full h-auto mx-auto block"
        role="img"
        aria-label="Concept flowchart diagram"
      >
        <defs>
          <marker id="ms-arrow-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#1e6e67" />
          </marker>
          <marker id="ms-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#9e3512" />
          </marker>
        </defs>

        {layout.sgRects.map((sg) => (
          <g key={sg.id}>
            <rect x={sg.x} y={sg.y} width={sg.w} height={sg.h} rx={10} fill="#efe7d2" fillOpacity={0.55} stroke="#b8810b" strokeWidth={1.5} strokeDasharray="5 3" />
            <text x={sg.x + 12} y={sg.y + 18} fill="#9e3512" fontWeight="700" fontFamily="var(--font-caveat), cursive">
              {sg.title}
            </text>
          </g>
        ))}

        {layout.edges.map((e, idx) => {
          const fromBox = layout.boxes.get(e.from);
          const toBox = layout.boxes.get(e.to);
          if (!fromBox || !toBox) return null;
          let x1: number, y1: number, x2: number, y2: number;
          const forward = layout.isLR ? toBox.x >= fromBox.x : toBox.y >= fromBox.y;
          if (layout.isLR) {
            x1 = forward ? fromBox.x + fromBox.w : fromBox.x;
            y1 = fromBox.y + fromBox.h / 2;
            x2 = forward ? toBox.x : toBox.x + toBox.w;
            y2 = toBox.y + toBox.h / 2;
          } else {
            x1 = fromBox.x + fromBox.w / 2;
            y1 = forward ? fromBox.y + fromBox.h : fromBox.y;
            x2 = toBox.x + toBox.w / 2;
            y2 = forward ? toBox.y : toBox.y + toBox.h;
          }
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          const d = forward
            ? layout.isLR
              ? `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
              : `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`
            : layout.isLR
            ? `M ${x1} ${y1} Q ${mx} ${Math.max(y1, y2) + 46} ${x2} ${y2}`
            : `M ${x1} ${y1} Q ${Math.max(x1, x2) + 60} ${my} ${x2} ${y2}`;
          const labelX = forward ? mx : layout.isLR ? mx : Math.max(x1, x2) + 34;
          const labelY = forward ? my : layout.isLR ? Math.max(y1, y2) + 28 : my;

          return (
            <g key={`${e.from}-${e.to}-${idx}`}>
              <path
                d={d}
                fill="none"
                stroke={e.dashed ? '#9e3512' : '#1e6e67'}
                strokeWidth={2}
                strokeDasharray={e.dashed ? '6 4' : undefined}
                markerEnd={e.dashed ? 'url(#ms-arrow-red)' : 'url(#ms-arrow-end)'}
                markerStart={e.bidir ? 'url(#ms-arrow-end)' : undefined}
              />
              {e.label && (
                <g>
                  <rect
                    x={labelX - Math.min(115, e.label.length * 4 + 12)}
                    y={labelY - 12}
                    width={Math.min(230, e.label.length * 8 + 24)}
                    height={22}
                    rx={6}
                    fill="#f6f0e1"
                    stroke={e.dashed ? '#9e3512' : '#1e6e67'}
                    strokeWidth={1}
                  />
                  <text x={labelX} y={labelY + 4} textAnchor="middle" fill={e.dashed ? '#9e3512' : '#1e6e67'} fontWeight="700" fontFamily="var(--font-sans), sans-serif">
                    {e.label.length > 28 ? `${e.label.slice(0, 26)}…` : e.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {layout.activeIds.map((id) => {
          const b = layout.boxes.get(id)!;
          const startY = b.y + b.h / 2 - ((b.lines.length - 1) * 18) / 2 + 5;
          return (
            <g key={id}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={8} fill="#ffffff" stroke="#2b2a28" strokeWidth={2} />
              <text x={b.x + b.w / 2} y={startY} textAnchor="middle" fill="#2b2a28" fontWeight="600" fontFamily="var(--font-sans), sans-serif">
                {b.lines.map((ln, idx) => (
                  <tspan key={idx} x={b.x + b.w / 2} dy={idx === 0 ? 0 : 18}>
                    {ln}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
