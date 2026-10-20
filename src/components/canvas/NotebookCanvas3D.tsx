'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Builder, COL, PrimitiveItem, DynamicCallback, cos, sin, PI } from './Builder';
import { SceneDefinition, Vec3 } from '@/types/syllabus';

export interface NotebookCanvas3DProps {
  scene: SceneDefinition;
  subjectShortName: string;
  unitIndex: number;
  totalUnits: number;
  unitTitle: string;
  step: number;
  onStepChange: (nextStep: number) => void;
  initialSpin?: boolean;
  initialPlaying?: boolean;
  initialZoom?: number;
}

interface ProjectedEntity {
  it: PrimitiveItem;
  pp: [number, number, number, number][];
  d: number;
}

export const NotebookCanvas3D: React.FC<NotebookCanvas3DProps> = ({
  scene,
  subjectShortName,
  unitIndex,
  totalUnits,
  unitTitle,
  step,
  onStepChange,
  initialSpin = false,
  initialPlaying = true,
  initialZoom = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const capRef = useRef<HTMLDivElement | null>(null);
  const [spin, setSpin] = useState<boolean>(initialSpin);
  const [playing, setPlaying] = useState<boolean>(initialPlaying);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [slidersOpen, setSlidersOpen] = useState<boolean>(true);
  const [slidersVisible, setSlidersVisible] = useState<boolean>(true);

  // Mutable engine state stored in ref to avoid re-creating RAF loop on every frame
  const engineRef = useRef<{
    yaw: number;
    pitch: number;
    zoom: number;
    idle: number;
    time: number;
    last: number;
    step: number;
    stepT: number;
    spin: boolean;
    playing: boolean;
    drag: { x: number; y: number } | null;
    pinchDist: number | null;
    W: number;
    H: number;
    dpr: number;
    unit: number;
    ofsY: number;
    bg: HTMLCanvasElement | null;
    stat: PrimitiveItem[];
    dyns: DynamicCallback[];
    scene: SceneDefinition;
    params: Record<string, number>;
  }>({
    yaw: scene.cam?.yaw ?? -0.55,
    pitch: scene.cam?.pitch ?? 0.3,
    zoom: scene.cam?.zoom ?? initialZoom,
    idle: 0,
    time: 0,
    last: 0,
    step: 0,
    stepT: 0,
    spin: initialSpin,
    playing: initialPlaying,
    drag: null,
    pinchDist: null,
    W: 100,
    H: 100,
    dpr: 1,
    unit: 40,
    ofsY: 0,
    bg: null,
    stat: [],
    dyns: [],
    scene,
    params: {},
  });

  const [paramValues, setParamValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    if (scene.params) {
      for (const p of scene.params) {
        init[p.id] = p.defaultVal;
      }
    }
    return init;
  });

  // Sync React props to mutable ref
  useEffect(() => {
    const B = new Builder(scene.steps);
    scene.build(B);
    const eng = engineRef.current;
    eng.scene = scene;
    eng.stat = B.items;
    eng.dyns = B.dyns;
    eng.yaw = scene.cam?.yaw ?? -0.55;
    eng.pitch = scene.cam?.pitch ?? 0.3;
    eng.zoom = scene.cam?.zoom ?? 1;
    eng.idle = 0;
    eng.step = 0;
    eng.stepT = performance.now();

    const initParams: Record<string, number> = {};
    if (scene.params) {
      for (const p of scene.params) {
        initParams[p.id] = p.defaultVal;
      }
    }
    eng.params = initParams;
    setParamValues(initParams);
  }, [scene]);

  useEffect(() => {
    engineRef.current.params = paramValues;
  }, [paramValues]);

  useEffect(() => {
    engineRef.current.step = Math.max(0, Math.min(scene.steps.length - 1, step));
    engineRef.current.stepT = performance.now();
  }, [step, scene.steps.length]);

  useEffect(() => {
    engineRef.current.spin = spin;
  }, [spin]);

  useEffect(() => {
    engineRef.current.playing = playing;
  }, [playing]);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  const resetView = useCallback(() => {
    const eng = engineRef.current;
    eng.yaw = eng.scene.cam?.yaw ?? -0.55;
    eng.pitch = eng.scene.cam?.pitch ?? 0.3;
    eng.zoom = eng.scene.cam?.zoom ?? 1;
    eng.idle = 0;
  }, []);

  const handleZoom = useCallback((factor: number) => {
    const eng = engineRef.current;
    eng.zoom = Math.max(0.45, Math.min(3.2, eng.zoom * factor));
    eng.idle = 0;
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let rafId = 0;

    const rebuildPaperBackground = () => {
      const eng = engineRef.current;
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      eng.W = Math.max(10, r.width);
      eng.H = Math.max(10, r.height);
      cv.width = Math.round(eng.W * dpr);
      cv.height = Math.round(eng.H * dpr);
      eng.dpr = dpr;

      const b = document.createElement('canvas');
      b.width = cv.width;
      b.height = cv.height;
      const c = b.getContext('2d');
      if (c) {
        c.scale(dpr, dpr);
        c.fillStyle = COL.paper;
        c.fillRect(0, 0, eng.W, eng.H);
        c.fillStyle = 'rgba(120,100,60,.16)';
        for (let x = 18; x < eng.W; x += 26) {
          for (let y = 18; y < eng.H; y += 26) {
            c.fillRect(x, y, 1.6, 1.6);
          }
        }
      }
      eng.bg = b;
      if (capRef.current && window.innerWidth > 900) {
        eng.ofsY = Math.round(capRef.current.offsetHeight * 0.45);
      } else {
        eng.ofsY = 0;
      }
    };

    const proj = (
      p: Vec3,
      cs: { cy: number; sy: number; cp: number; sp: number }
    ): [number, number, number, number] => {
      const eng = engineRef.current;
      const x = p[0];
      const y = p[1] - (eng.scene.cam?.cy || 0);
      const z = p[2];
      const x1 = x * cs.cy + z * cs.sy;
      const z1 = -x * cs.sy + z * cs.cy;
      const y2 = y * cs.cp - z1 * cs.sp;
      const z2 = y * cs.sp + z1 * cs.cp;
      const D = 18;
      const dep = D - z2;
      const sc = D / Math.max(2, dep);
      return [
        eng.W / 2 + x1 * sc * eng.unit,
        eng.H / 2 - (eng.ofsY || 0) - y2 * sc * eng.unit,
        dep,
        sc,
      ];
    };

    const rough = (pts: number[][], seed: number, amp: number): [number, number][] => {
      const r: [number, number][] = [[pts[0][0], pts[0][1]]];
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1];
        const [x1, y1] = pts[i];
        const d = Math.hypot(x1 - x0, y1 - y0);
        const n = Math.max(1, Math.round(d / 26));
        for (let j = 1; j <= n; j++) {
          r.push([x0 + ((x1 - x0) * j) / n, y0 + ((y1 - y0) * j) / n]);
        }
      }
      let s = 0;
      return r.map((q, i) => {
        if (i) s += Math.hypot(q[0] - r[i - 1][0], q[1] - r[i - 1][1]);
        const a = r[Math.max(0, i - 1)];
        const b = r[Math.min(r.length - 1, i + 1)];
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const l = Math.hypot(dx, dy) || 1;
        const o = (sin(s * 0.06 + seed) + 0.6 * sin(s * 0.17 + seed * 1.7)) * amp;
        return [q[0] - (dy / l) * o, q[1] + (dx / l) * o];
      });
    };

    const tracePath = (pts: [number, number][], close?: boolean) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2;
        const my = (pts[i][1] + pts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      const l = pts[pts.length - 1];
      ctx.lineTo(l[0], l[1]);
      if (close) ctx.closePath();
    };

    const stroke = (
      pp: number[][],
      it: PrimitiveItem,
      w: number,
      col: string,
      lite: boolean,
      close?: boolean
    ) => {
      const sp = pp.map((p) => [p[0], p[1]]);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash(it.o.d ? it.o.d : []);
      ctx.strokeStyle = col;
      ctx.lineWidth = w;
      tracePath(rough(sp, it.id * 1.31, 1.2), close);
      ctx.stroke();
      if (!lite && w >= 1.6) {
        ctx.globalAlpha *= 0.5;
        ctx.lineWidth = w * 0.5;
        tracePath(rough(sp, it.id * 2.7 + 4, 1.7), close);
        ctx.stroke();
        ctx.globalAlpha /= 0.5;
      }
      ctx.setLineDash([]);
    };

    const drawItem = (e: ProjectedEntity, lite: boolean) => {
      const eng = engineRef.current;
      const it = e.it;
      const o = it.o;
      const pp = e.pp;
      const col = o.c || COL.ink;
      const zs = Math.max(0.75, Math.min(1.4, Math.sqrt(eng.zoom)));

      if (it.k === 'L') {
        stroke(pp, it, (o.w || 2.2) * zs, col, lite);
      } else if (it.k === 'A') {
        const [p, q] = pp;
        const dx = q[0] - p[0];
        const dy = q[1] - p[1];
        const l = Math.hypot(dx, dy);
        if (l < 2) return;
        const ux = dx / l;
        const uy = dy / l;
        const hl = Math.min(13 * zs, l * 0.6);
        const bx = q[0] - ux * hl;
        const by = q[1] - uy * hl;
        stroke([p, [bx, by, 0, 1]], it, (o.w || 2.4) * zs, col, lite);
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(q[0], q[1]);
        ctx.lineTo(bx - uy * hl * 0.42, by + ux * hl * 0.42);
        ctx.lineTo(bx + uy * hl * 0.42, by - ux * hl * 0.42);
        ctx.closePath();
        ctx.fill();
      } else if (it.k === 'P') {
        const sp = pp.map((p) => [p[0], p[1]]);
        if (o.f) {
          const alpha = typeof o.a === 'number' ? o.a : 0.2;
          ctx.globalAlpha *= alpha;
          ctx.fillStyle = o.f;
          ctx.beginPath();
          sp.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha /= alpha;
        }
        if (!o.nostroke) {
          stroke(pp.concat([pp[0]]), it, (o.w || 1.5) * zs, o.c || COL.ink, true);
        }
      } else if (it.k === 'D') {
        const sc = pp[0][3];
        const r = Math.max(3, (it.r || 0.2) * sc * eng.unit);
        const f = o.f || COL.ink;
        ctx.fillStyle = f;
        ctx.globalAlpha *= 0.88;
        ctx.beginPath();
        ctx.arc(pp[0][0], pp[0][1], r, 0, 2 * PI);
        ctx.fill();
        ctx.globalAlpha /= 0.88;
        const ring: number[][] = [];
        for (let i = 0; i <= 12; i++) {
          const a = (i / 12) * 2 * PI;
          ring.push([pp[0][0] + cos(a) * r, pp[0][1] + sin(a) * r, 0]);
        }
        stroke(ring, it, 1.4, COL.ink, true);
        ctx.fillStyle = 'rgba(255,255,255,.55)';
        ctx.beginPath();
        ctx.arc(pp[0][0] - r * 0.3, pp[0][1] - r * 0.3, r * 0.22, 0, 2 * PI);
        ctx.fill();
      }
    };

    const collect = (): PrimitiveItem[] => {
      const eng = engineRef.current;
      const out: PrimitiveItem[] = [];
      const cur = eng.step;
      const vis = (it: { only: boolean; step: number }) => (it.only ? it.step === cur : it.step <= cur);
      for (const it of eng.stat) {
        if (vis(it)) out.push(it);
      }
      for (const d of eng.dyns) {
        if (!vis(d)) continue;
        const b = new Builder(eng.scene.steps);
        b.idBase = 1e4 + d.step * 500;
        b.step = d.step;
        b.only = d.only;
        d.fn(eng.time, b, eng.params);
        for (const it of b.items) {
          it.step = d.step;
          it.only = d.only;
          out.push(it);
        }
      }
      return out;
    };

    const drawFrame = () => {
      const eng = engineRef.current;
      if (!eng.bg) rebuildPaperBackground();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (eng.bg) ctx.drawImage(eng.bg, 0, 0);
      ctx.setTransform(eng.dpr, 0, 0, eng.dpr, 0, 0);

      eng.unit = Math.min(eng.W / 14.5, eng.H / 9.2) * eng.zoom;
      const sway = eng.idle > 2.2 ? 0.2 * sin((eng.idle - 2.2) * 0.5) : 0;
      const yw = eng.yaw + sway;
      const cs = { cy: cos(yw), sy: sin(yw), cp: cos(eng.pitch), sp: sin(eng.pitch) };

      const items = collect();
      const lite = items.length > 900;
      const fade = Math.min(1, (performance.now() - eng.stepT) / 450);
      const list: ProjectedEntity[] = [];
      const texts: ProjectedEntity[] = [];

      for (const it of items) {
        const pp = it.pts.map((p) => proj(p, cs));
        let d = 0;
        pp.forEach((p) => (d += p[2]));
        d /= pp.length;
        const e: ProjectedEntity = { it, pp, d };
        (it.k === 'T' ? texts : list).push(e);
      }
      list.sort((a, b) => b.d - a.d);

      const cur = eng.step;
      for (const e of list) {
        ctx.globalAlpha = e.it.step === cur && cur > 0 ? fade : 1;
        drawItem(e, lite);
      }
      ctx.globalAlpha = 1;

      for (const e of texts) {
        const it = e.it;
        const o = it.o || {};
        ctx.globalAlpha = it.step === cur && cur > 0 ? fade : 1;
        const [x, y] = e.pp[0];
        const labelScale = Math.min(1.15, Math.max(0.8, eng.W / 900));
        const baseSz = o.sz || 20;
        const sz = Math.max(
          14,
          Math.round(baseSz * labelScale * Math.max(0.85, Math.min(1.25, Math.sqrt(eng.zoom))))
        );
        ctx.font = `${o.b ? 700 : 500} ${sz}px var(--font-caveat), Caveat, "Segoe Print", "Bradley Hand", cursive`;
        ctx.textAlign = (o.a as CanvasTextAlign) || 'center';
        ctx.textBaseline = 'middle';
        const tx = x + (o.dx || 0);
        const ty = y + (o.dy || 0);
        ctx.lineWidth = 5;
        ctx.strokeStyle = COL.paper;
        ctx.lineJoin = 'round';
        ctx.strokeText(it.str || '', tx, ty);
        ctx.fillStyle = o.c || COL.ink;
        ctx.fillText(it.str || '', tx, ty);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      const eng = engineRef.current;
      const dt = Math.min(0.05, (now - (eng.last || now)) / 1000);
      eng.last = now;
      if (eng.playing) eng.time += dt;
      if (!eng.drag) eng.idle += dt;
      if (eng.spin && !eng.drag) eng.yaw += dt * 0.35;
      drawFrame();
    };

    rebuildPaperBackground();
    rafId = requestAnimationFrame(loop);

    const onPointerDown = (e: PointerEvent) => {
      engineRef.current.drag = { x: e.clientX, y: e.clientY };
      cv.setPointerCapture(e.pointerId);
      engineRef.current.idle = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const eng = engineRef.current;
      if (!eng.drag) return;
      eng.yaw += (e.clientX - eng.drag.x) * 0.008;
      eng.pitch = Math.max(-1.35, Math.min(1.35, eng.pitch + (e.clientY - eng.drag.y) * 0.006));
      eng.drag = { x: e.clientX, y: e.clientY };
      eng.idle = 0;
    };

    const onPointerUp = () => {
      engineRef.current.drag = null;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const eng = engineRef.current;
      eng.zoom = Math.max(0.45, Math.min(3.2, eng.zoom * Math.exp(-e.deltaY * 0.0012)));
      eng.idle = 0;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        engineRef.current.pinchDist = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && engineRef.current.pinchDist) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const nextDist = Math.hypot(dx, dy);
        const ratio = nextDist / engineRef.current.pinchDist;
        engineRef.current.zoom = Math.max(0.45, Math.min(3.2, engineRef.current.zoom * ratio));
        engineRef.current.pinchDist = nextDist;
        engineRef.current.idle = 0;
      }
    };

    const onTouchEnd = () => {
      engineRef.current.pinchDist = null;
    };

    cv.addEventListener('pointerdown', onPointerDown);
    cv.addEventListener('pointermove', onPointerMove);
    cv.addEventListener('pointerup', onPointerUp);
    cv.addEventListener('pointercancel', onPointerUp);
    cv.addEventListener('wheel', onWheel, { passive: false });
    cv.addEventListener('touchstart', onTouchStart, { passive: true });
    cv.addEventListener('touchmove', onTouchMove, { passive: true });
    cv.addEventListener('touchend', onTouchEnd);

    const resizeObserver = new ResizeObserver(() => rebuildPaperBackground());
    resizeObserver.observe(cv);
    window.addEventListener('resize', rebuildPaperBackground);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', rebuildPaperBackground);
      cv.removeEventListener('pointerdown', onPointerDown);
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerup', onPointerUp);
      cv.removeEventListener('pointercancel', onPointerUp);
      cv.removeEventListener('wheel', onWheel);
      cv.removeEventListener('touchstart', onTouchStart);
      cv.removeEventListener('touchmove', onTouchMove);
      cv.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const currentStepObj = scene.steps[step] || scene.steps[0];
  const labStepIndex = scene.steps.findIndex(
    (s) =>
      s.t.toLowerCase().includes('live parameter lab') ||
      s.t.toLowerCase().includes('live:') ||
      s.t.toLowerCase().includes('live ')
  );
  const isLabStep = labStepIndex !== -1 ? step === labStepIndex : true;

  return (
    <section id="stage" className="relative min-w-0 min-h-0 overflow-hidden h-full">
      <canvas
        ref={canvasRef}
        id="cv"
        aria-label={`Interactive 3D diagram for ${unitTitle}`}
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing touch-none"
      />
      <div id="ovt" className="absolute left-4 top-3.5 pointer-events-none max-w-[52%]">
        <div className="text-xs font-mono font-bold tracking-[0.12em] uppercase text-accentRed">
          {subjectShortName} · unit {unitIndex + 1} of {totalUnits}
        </div>
        <h1 className="font-hand text-[30px] leading-[1.0] font-bold mt-0.5 text-ink">
          {unitTitle}
        </h1>
      </div>

      <div id="tools" className="absolute right-3.5 top-3.5 flex gap-1.5">
        <button
          type="button"
          onClick={() => setSpin((s) => !s)}
          aria-label="Toggle auto-spin"
          title="Spin 3D model"
          className={`tl ${spin ? 'on' : ''}`}
        >
          <svg viewBox="0 0 24 24">
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <path d="M21 3v6h-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause animation' : 'Play animation'}
          title="Pause or play motion"
          className={`tl ${!playing ? 'on' : ''}`}
        >
          {playing ? (
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14M16 5v14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M7 4l13 8-13 8z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={() => handleZoom(1.2)}
          aria-label="Zoom in"
          className="tl"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => handleZoom(1 / 1.2)}
          aria-label="Zoom out"
          className="tl"
        >
          −
        </button>
        <button
          type="button"
          onClick={resetView}
          aria-label="Reset camera view"
          title="Reset view"
          className="tl"
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 3v6h6" />
          </svg>
        </button>
      </div>

      <div
        id="hint"
        style={{ opacity: showHint ? 1 : 0 }}
        className="absolute right-4 top-14 font-hand text-lg text-dim pointer-events-none transition-opacity duration-500"
      >
        drag to turn it, scroll or pinch to zoom
      </div>

      {scene.params && scene.params.length > 0 && (
        <>
          {/* If current step is not the live lab step, show quick-jump badge */}
          {!isLabStep && labStepIndex !== -1 ? (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="absolute left-4 bottom-24 md:bottom-28 z-20"
            >
              <button
                type="button"
                onClick={() => onStepChange(labStepIndex)}
                className="flex items-center gap-2 bg-paper/95 border-[1.5px] border-ink rounded-lg px-3 py-1.5 text-sm font-hand font-bold shadow-sketchy hover:bg-gold/20 transition-all text-ink cursor-pointer"
                title="Jump to the interactive live lab step"
              >
                <span className="text-accentRed font-sans text-sm animate-pulse">⚡</span>
                <span>Live Experiment Lab on <strong>Step {labStepIndex + 1}</strong> · Click to open</span>
                <span className="text-xs font-mono px-1.5 py-0.5 rounded border border-ink/40 bg-gold/20">→</span>
              </button>
            </div>
          ) : slidersVisible ? (
            /* When on the live lab step: active real-time parameter sliders */
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="absolute left-4 bottom-24 md:bottom-28 z-20 max-w-[340px] w-[calc(100%-2rem)] md:w-80 bg-paper/95 border-[1.5px] border-ink rounded-lg p-3 shadow-sketchy backdrop-blur-xs font-hand"
            >
              <div className="flex items-center justify-between pb-1 mb-2 border-b border-dashed border-ink/30">
                <div className="flex items-center gap-1.5">
                  <span className="text-accentRed font-sans text-sm">⚡</span>
                  <span className="text-xs font-mono font-bold tracking-[0.14em] uppercase text-accentRed">
                    LIVE EXPERIMENT SLIDERS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const reset: Record<string, number> = {};
                      scene.params?.forEach((p) => {
                        reset[p.id] = p.defaultVal;
                      });
                      engineRef.current.params = reset;
                      setParamValues(reset);
                    }}
                    className="text-sm text-dim hover:text-ink underline decoration-dashed transition-colors"
                    title="Reset sliders to defaults"
                  >
                    reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlidersOpen((o) => !o)}
                    className="text-sm text-dim hover:text-ink font-sans px-1"
                    title={slidersOpen ? 'Collapse sliders' : 'Expand sliders'}
                  >
                    {slidersOpen ? '▲' : '▼'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlidersVisible(false)}
                    className="text-sm text-dim hover:text-ink font-sans px-1"
                    title="Hide slider panel"
                  >
                    ✕
                  </button>
                </div>
              </div>
              {slidersOpen && (
                <div className="space-y-2.5">
                  {scene.params.map((p) => {
                    const val = paramValues[p.id] ?? p.defaultVal;
                    return (
                      <div key={p.id} className="flex flex-col gap-1">
                        <div className="flex justify-between items-baseline text-sm">
                          <label htmlFor={`param-${p.id}`} className="font-bold text-ink">
                            {p.label}
                          </label>
                          <span className="font-bold text-accentRed text-sm font-mono">
                            {typeof val === 'number' && Number.isInteger(p.step) ? val : val.toFixed(2)} {p.unit}
                          </span>
                        </div>
                        <input
                          id={`param-${p.id}`}
                          type="range"
                          min={p.min}
                          max={p.max}
                          step={p.step}
                          value={val}
                          onChange={(e) => {
                            const num = parseFloat(e.target.value);
                            engineRef.current.params = {
                              ...(engineRef.current.params || {}),
                              [p.id]: num,
                            };
                            setParamValues((prev) => ({ ...prev, [p.id]: num }));
                          }}
                          className="w-full accent-ink cursor-pointer h-1.5 bg-ink/15 rounded-full"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Minimized toggle button to re-open sliders */
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="absolute left-4 bottom-24 md:bottom-28 z-20"
            >
              <button
                type="button"
                onClick={() => setSlidersVisible(true)}
                className="flex items-center gap-1.5 bg-paper/95 border-[1.5px] border-ink rounded-lg px-2.5 py-1 text-sm font-hand font-bold shadow-sketchy hover:bg-gold/20 transition-all text-ink cursor-pointer"
                title="Show experiment sliders"
              >
                <span className="text-accentRed font-sans">⚡</span>
                <span>Experiment Sliders</span>
              </button>
            </div>
          )}
        </>
      )}

      <div ref={capRef} id="cap">
        <div className="sn">
          <button
            type="button"
            className="sb"
            disabled={step === 0}
            onClick={() => onStepChange(step - 1)}
            aria-label="Previous step"
          >
            ←
          </button>
          <div className="dots">
            {scene.steps.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onStepChange(idx)}
                className={idx === step ? 'on' : idx < step ? 'done' : ''}
                title={s.t}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="sb"
            disabled={step === scene.steps.length - 1}
            onClick={() => onStepChange(step + 1)}
            aria-label="Next step"
          >
            →
          </button>
        </div>
        <h3>{currentStepObj.t}</h3>
        <p>{currentStepObj.d}</p>
      </div>
    </section>
  );
};
