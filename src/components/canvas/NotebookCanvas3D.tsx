'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Builder, COL, PrimitiveItem, DynamicCallback, cos, sin, PI } from './Builder';
import { SceneDefinition, SvgDiagram, Vec3 } from '@/types/syllabus';
import { SvgDiagramViewer, UnitDiagramItem } from '@/components/study/SvgDiagramViewer';
import { StageErrorBoundary } from './StageErrorBoundary';
import { BatteryCharging, BatteryLow, Zap, Link2, Check } from 'lucide-react';

export interface NotebookCanvas3DProps {
  scene: SceneDefinition;
  subjectShortName: string;
  unitIndex: number;
  totalUnits: number;
  unitTitle: string;
  mode?: '3d' | '2d';
  onModeChange?: (nextMode: '3d' | '2d') => void;
  step: number;
  onStepChange: (nextStep: number) => void;
  camera?: { yaw: number; pitch: number; zoom: number };
  onCameraChange?: (nextCamera: { yaw: number; pitch: number; zoom: number }) => void;
  sliderValues?: Record<string, number>;
  onSliderValuesChange?: (nextValues: Record<string, number>) => void;
  diagramIndex?: number;
  onDiagramIndexChange?: (nextIdx: number) => void;
  unitDiagrams?: UnitDiagramItem[];
  diagrams?: SvgDiagram[];
  batterySaver?: boolean;
  onToggleBatterySaver?: () => void;
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
  mode = '3d',
  onModeChange,
  step,
  onStepChange,
  camera,
  onCameraChange,
  sliderValues,
  onSliderValuesChange,
  diagramIndex = 0,
  onDiagramIndexChange,
  unitDiagrams = [],
  diagrams = [],
  batterySaver = false,
  onToggleBatterySaver,
  initialSpin = false,
  initialPlaying = true,
  initialZoom = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const capRef = useRef<HTMLDivElement | null>(null);

  // Fallback for diagrams if unitDiagrams is empty
  const activeDiagrams = useMemo<UnitDiagramItem[]>(() => {
    if (unitDiagrams.length > 0) return unitDiagrams;
    if (diagrams.length > 0) {
      return diagrams.map((dg, i) => ({
        title: `${subjectShortName} Diagram #${i + 1}`,
        svg: dg.svg,
        caption: dg.c,
      }));
    }
    return [];
  }, [unitDiagrams, diagrams, subjectShortName]);

  const [spin, setSpin] = useState<boolean>(initialSpin);
  const [playing, setPlaying] = useState<boolean>(initialPlaying);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [slidersOpen, setSlidersOpen] = useState<boolean>(true);
  const [redrawMode, setRedrawMode] = useState<boolean>(false);
  const [canvasError, setCanvasError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyLink = useCallback(() => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const doFeedback = () => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(doFeedback).catch(doFeedback);
    } else {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        doFeedback();
      } catch {
        doFeedback();
      }
    }
  }, []);

  // Controlled mode state
  const stageMode = mode;
  const handleModeChange = useCallback(
    (nextMode: '3d' | '2d') => {
      onModeChange?.(nextMode);
    },
    [onModeChange]
  );

  // Keyboard shortcut D / d to toggle 3D and 2D mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        const target = e.target as HTMLElement | null;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target?.getAttribute('contenteditable') === 'true'
        ) {
          return;
        }
        e.preventDefault();
        handleModeChange(stageMode === '3d' ? '2d' : '3d');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stageMode, handleModeChange]);

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
    yaw: camera?.yaw ?? scene.cam?.yaw ?? -0.55,
    pitch: camera?.pitch ?? scene.cam?.pitch ?? 0.3,
    zoom: camera?.zoom ?? scene.cam?.zoom ?? initialZoom,
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

  // Keep camera state synced
  useEffect(() => {
    if (camera) {
      engineRef.current.yaw = camera.yaw;
      engineRef.current.pitch = camera.pitch;
      engineRef.current.zoom = camera.zoom;
    }
  }, [camera]);

  // Synchronize Scene definition & build static/dynamic primitives
  useEffect(() => {
    const B = new Builder(scene.steps);
    scene.build(B);
    const eng = engineRef.current;
    eng.scene = scene;
    eng.stat = B.items;
    eng.dyns = B.dyns;
    if (!camera) {
      eng.yaw = scene.cam?.yaw ?? -0.55;
      eng.pitch = scene.cam?.pitch ?? 0.3;
      eng.zoom = scene.cam?.zoom ?? 1;
    }
    eng.idle = 0;
    eng.step = step;
    eng.stepT = performance.now();

    const initParams: Record<string, number> = {};
    if (scene.params) {
      for (const p of scene.params) {
        initParams[p.id] = sliderValues?.[p.id] ?? p.defaultVal;
      }
    }
    eng.params = initParams;
  }, [scene, camera, sliderValues, step]);

  useEffect(() => {
    if (sliderValues) {
      engineRef.current.params = sliderValues;
    }
  }, [sliderValues]);

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
    const newYaw = eng.scene.cam?.yaw ?? -0.55;
    const newPitch = eng.scene.cam?.pitch ?? 0.3;
    const newZoom = eng.scene.cam?.zoom ?? 1;
    eng.yaw = newYaw;
    eng.pitch = newPitch;
    eng.zoom = newZoom;
    eng.idle = 0;
    onCameraChange?.({ yaw: newYaw, pitch: newPitch, zoom: newZoom });
  }, [onCameraChange]);

  const handleZoom = useCallback(
    (factor: number) => {
      const eng = engineRef.current;
      const newZoom = Math.max(0.45, Math.min(3.2, eng.zoom * factor));
      eng.zoom = newZoom;
      eng.idle = 0;
      onCameraChange?.({ yaw: eng.yaw, pitch: eng.pitch, zoom: newZoom });
    },
    [onCameraChange]
  );

  // Canvas Drawing & Lifecycle (Single Loop, ResizeObserver, Battery Saver)
  const rafIdRef = useRef<number>(0);
  const isLoopActiveRef = useRef<boolean>(false);
  const isOffscreenRef = useRef<boolean>(false);
  const lastFrameTimeRef = useRef<number>(0);
  const drawErrorCountRef = useRef<number>(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    // Non-compounding backing-store measurement
    const rebuildPaperBackground = () => {
      const eng = engineRef.current;
      const r = cv.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return; // Ignore 0x0

      const dpr = batterySaver ? 1 : Math.min(2, window.devicePixelRatio || 1);
      eng.W = Math.max(10, r.width);
      eng.H = Math.max(10, r.height);
      eng.dpr = dpr;

      cv.width = Math.round(eng.W * dpr);
      cv.height = Math.round(eng.H * dpr);

      // Apply non-compounding transform
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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
      eng.ofsY = 0;

      // Update test hook info
      if (typeof window !== 'undefined') {
        (window as any).__3dCanvasWidth = cv.width;
        (window as any).__3dCanvasHeight = cv.height;
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
        const w = (o.w || 1.8) * zs;
        if (o.f) {
          ctx.fillStyle = o.f;
          tracePath(
            pp.map((p) => [p[0], p[1]]),
            true
          );
          ctx.fill();
        }
        if (!o.nostroke) {
          stroke(pp, it, w, col, lite, false);
        }
      } else if (it.k === 'P') {
        const w = (o.w || 1.8) * zs;
        if (o.f) {
          ctx.fillStyle = o.f;
          tracePath(
            pp.map((p) => [p[0], p[1]]),
            true
          );
          ctx.fill();
        }
        if (!o.nostroke) {
          stroke(pp, it, w, col, lite, true);
        }
      } else if (it.k === 'T') {
        const pt = pp[0];
        const sc = pt[3];
        const sz = Math.max(11, Math.round((o.sz || 15) * zs * (0.8 + 0.3 * sc)));
        ctx.font = `${o.b ? 'bold ' : ''}${sz}px Caveat, cursive`;
        ctx.fillStyle = col;
        ctx.textAlign = (o.a as CanvasTextAlign) || 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(it.str || '', pt[0] + (o.dx || 0) * zs, pt[1] + (o.dy || 0) * zs);
      } else if (it.k === 'D') {
        const pt = pp[0];
        const r = Math.max(2, (it.r || 3) * zs * pt[3]);
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], r, 0, PI * 2);
        ctx.fill();
      } else if (it.k === 'A') {
        const w = (o.w || 2.2) * zs;
        stroke(pp, it, w, col, lite, false);
        const p1 = pp[pp.length - 1];
        const p0 = pp[pp.length - 2] || pp[0];
        const ang = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
        const ah = Math.max(7, 9 * zs);
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p1[0] - ah * cos(ang - 0.42), p1[1] - ah * sin(ang - 0.42));
        ctx.lineTo(p1[0] - ah * 0.4 * cos(ang), p1[1] - ah * 0.4 * sin(ang));
        ctx.lineTo(p1[0] - ah * cos(ang + 0.42), p1[1] - ah * sin(ang + 0.42));
        ctx.closePath();
        ctx.fill();
      }
    };

    const drawFrame = () => {
      try {
        const eng = engineRef.current;
        eng.unit = Math.min(eng.W, eng.H) * 0.082 * eng.zoom;

        const cy = cos(eng.yaw);
        const sy = sin(eng.yaw);
        const cp = cos(eng.pitch);
        const sp = sin(eng.pitch);
        const cs = { cy, sy, cp, sp };

        ctx.clearRect(0, 0, eng.W, eng.H);
        if (eng.bg) {
          ctx.drawImage(eng.bg, 0, 0, eng.W, eng.H);
        }

        const ents: ProjectedEntity[] = [];

        // Static primitives
        for (const it of eng.stat) {
          if (it.step > eng.step) continue;
          if (it.only && it.step !== eng.step) continue;
          ents.push({
            it,
            pp: it.pts.map((p) => proj(p, cs)),
            d: 0,
          });
        }

        // Dynamic primitives
        if (eng.dyns.length > 0) {
          const dB = new Builder(eng.scene.steps);
          dB.s(eng.step);
          for (const d of eng.dyns) {
            if (d.step > eng.step) continue;
            if (d.only && d.step !== eng.step) continue;
            d.fn(eng.time, dB, eng.params);
          }
          for (const it of dB.items) {
            ents.push({
              it,
              pp: it.pts.map((p) => proj(p, cs)),
              d: 0,
            });
          }
        }

        for (const e of ents) {
          let s = 0;
          for (const p of e.pp) s += p[2];
          e.d = s / (e.pp.length || 1);
        }
        ents.sort((a, b) => b.d - a.d);

        const lite = ents.length > 220;
        for (const e of ents) {
          drawItem(e, lite);
        }
        drawErrorCountRef.current = 0;
      } catch (err) {
        drawErrorCountRef.current += 1;
        if (drawErrorCountRef.current >= 3) {
          setCanvasError('Repeated canvas drawing error. Switched to 2D Exam Sketchbook.');
          handleModeChange('2d');
        }
      }
    };

    // Single rAF Loop with pausing & battery saver
    const loop = (now: number) => {
      if (stageMode === '2d' || document.hidden || isOffscreenRef.current) {
        isLoopActiveRef.current = false;
        if (typeof window !== 'undefined') {
          (window as any).__3dLoopActiveCount = 0;
        }
        return;
      }

      // 30 FPS Cap when Battery Saver is enabled
      if (batterySaver) {
        if (now - lastFrameTimeRef.current < 32) {
          rafIdRef.current = requestAnimationFrame(loop);
          return;
        }
      }
      lastFrameTimeRef.current = now;

      const eng = engineRef.current;
      if (!eng.last) eng.last = now;
      const dt = Math.min(0.06, (now - eng.last) / 1000);
      eng.last = now;

      if (eng.playing) eng.time += dt;
      if (!eng.drag) eng.idle += dt;
      if (eng.spin && !eng.drag) {
        eng.yaw += dt * 0.35;
        onCameraChange?.({ yaw: eng.yaw, pitch: eng.pitch, zoom: eng.zoom });
      }
      drawFrame();

      rafIdRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (isLoopActiveRef.current) return;
      if (stageMode === '2d' || document.hidden || isOffscreenRef.current) return;
      isLoopActiveRef.current = true;
      engineRef.current.last = performance.now();
      if (typeof window !== 'undefined') {
        (window as any).__3dLoopActiveCount = 1;
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
      isLoopActiveRef.current = false;
      if (typeof window !== 'undefined') {
        (window as any).__3dLoopActiveCount = 0;
      }
    };

    rebuildPaperBackground();
    startLoop();

    // Touch event variables for multi-touch pinch zoom & 1-finger rotate
    let touchStartDist: number | null = null;
    let touchStartZoom = 1;

    // Dedicated Touch Event Listeners (iOS Safari, Android Chrome, touchscreens)
    const onTouchStart = (e: TouchEvent) => {
      engineRef.current.idle = 0;
      if (e.touches.length === 1) {
        // Single finger: rotate model
        engineRef.current.drag = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchStartDist = null;
      } else if (e.touches.length >= 2) {
        // Two fingers: initialize pinch-to-zoom
        engineRef.current.drag = null;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.hypot(dx, dy);
        touchStartZoom = engineRef.current.zoom;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      engineRef.current.idle = 0;
      const eng = engineRef.current;
      const drag = eng.drag;
      if (e.touches.length === 1 && drag) {
        e.preventDefault();
        eng.yaw += (e.touches[0].clientX - drag.x) * 0.008;
        eng.pitch = Math.max(-1.35, Math.min(1.35, eng.pitch + (e.touches[0].clientY - drag.y) * 0.006));
        eng.drag = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        onCameraChange?.({ yaw: eng.yaw, pitch: eng.pitch, zoom: eng.zoom });
      } else if (e.touches.length >= 2 && touchStartDist && touchStartDist > 0) {
        e.preventDefault();
        engineRef.current.drag = null;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.hypot(dx, dy);
        if (currentDist > 0) {
          const ratio = currentDist / touchStartDist;
          const nextZoom = Math.max(0.45, Math.min(3.2, touchStartZoom * ratio));
          engineRef.current.zoom = nextZoom;
          onCameraChange?.({ yaw: engineRef.current.yaw, pitch: engineRef.current.pitch, zoom: nextZoom });
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Finger lifted, 1 finger left: resume drag
        engineRef.current.drag = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchStartDist = null;
      } else if (e.touches.length === 0) {
        engineRef.current.drag = null;
        touchStartDist = null;
      }
    };

    // Pointer Event Listeners (strictly mouse / pen)
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      engineRef.current.drag = { x: e.clientX, y: e.clientY };
      engineRef.current.idle = 0;
      try {
        cv.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const eng = engineRef.current;
      if (!eng.drag) return;
      eng.yaw += (e.clientX - eng.drag.x) * 0.008;
      eng.pitch = Math.max(-1.35, Math.min(1.35, eng.pitch + (e.clientY - eng.drag.y) * 0.006));
      eng.drag = { x: e.clientX, y: e.clientY };
      eng.idle = 0;
      onCameraChange?.({ yaw: eng.yaw, pitch: eng.pitch, zoom: eng.zoom });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      engineRef.current.drag = null;
      try {
        if (cv.hasPointerCapture(e.pointerId)) {
          cv.releasePointerCapture(e.pointerId);
        }
      } catch {}
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const eng = engineRef.current;
      const nextZoom = Math.max(0.45, Math.min(3.2, eng.zoom * Math.exp(-e.deltaY * 0.0012)));
      eng.zoom = nextZoom;
      eng.idle = 0;
      onCameraChange?.({ yaw: eng.yaw, pitch: eng.pitch, zoom: nextZoom });
    };

    // Attach listeners
    cv.addEventListener('touchstart', onTouchStart, { passive: false });
    cv.addEventListener('touchmove', onTouchMove, { passive: false });
    cv.addEventListener('touchend', onTouchEnd);
    cv.addEventListener('touchcancel', onTouchEnd);
    cv.addEventListener('pointerdown', onPointerDown);
    cv.addEventListener('pointermove', onPointerMove);
    cv.addEventListener('pointerup', onPointerUp);
    cv.addEventListener('pointercancel', onPointerUp);
    cv.addEventListener('wheel', onWheel, { passive: false });

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => rebuildPaperBackground());
    resizeObserver.observe(cv);
    window.addEventListener('resize', rebuildPaperBackground);

    // Page visibility change handler
    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (stageMode === '3d') {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // IntersectionObserver to pause loop when scrolled off-screen
    const intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isOffscreenRef.current = !entry.isIntersecting;
      if (!entry.isIntersecting) {
        stopLoop();
      } else if (stageMode === '3d' && !document.hidden) {
        startLoop();
      }
    });
    intersectionObserver.observe(cv);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
  }, [stageMode, batterySaver, onCameraChange, handleModeChange]);

  // Synchronize window test hooks for Playwright tests
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__3dCanvasReady = true;
      (window as any).__3dLoopActiveCount = stageMode === '3d' && isLoopActiveRef.current ? 1 : 0;
      (window as any).__3dCanvasWidth = canvasRef.current?.width || 0;
      (window as any).__3dCanvasHeight = canvasRef.current?.height || 0;
      (window as any).__3dLastStep = step;
      (window as any).__3dMode = stageMode;
      (window as any).__3dSliderValues = engineRef.current.params;
    }
  });

  const currentStepObj = scene.steps[step] || scene.steps[0];
  const currentDiagramObj = activeDiagrams[Math.min(diagramIndex, Math.max(0, activeDiagrams.length - 1))];
  const labStepIndex = scene.steps.findIndex(
    (s) =>
      s.t.toLowerCase().includes('live parameter lab') ||
      s.t.toLowerCase().includes('live:') ||
      s.t.toLowerCase().includes('live ')
  );
  const isLabStep = labStepIndex !== -1 ? step === labStepIndex : true;

  return (
    <StageErrorBoundary onFallbackTo2D={() => handleModeChange('2d')}>
      <section id="stage" ref={containerRef} className="h-full">
        {/* Error Notice if Repeated Canvas Errors occur */}
        {canvasError && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-amber-100 border border-amber-400 text-amber-900 text-xs px-3 py-1 rounded shadow flex items-center gap-2">
            <span>{canvasError}</span>
            <button
              type="button"
              onClick={() => setCanvasError(null)}
              className="font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Viewport: Renders both 3D Canvas (NEVER unmounted) and 2D Viewer without layout shift */}
        <div id="stage-viewport">
          {/* Persistent 3D Canvas */}
          <canvas
            ref={canvasRef}
            id="cv"
            aria-label={`Interactive 3D diagram for ${unitTitle}`}
            style={{
              visibility: stageMode === '3d' ? 'visible' : 'hidden',
              pointerEvents: stageMode === '3d' ? 'auto' : 'none',
            }}
          />

          {/* 3D Title Overlay */}
          <div
            id="ovt"
            style={{
              visibility: stageMode === '3d' ? 'visible' : 'hidden',
              pointerEvents: 'none',
            }}
          >
            <span className="k">
              {subjectShortName} · UNIT {unitIndex + 1} OF {totalUnits}
            </span>
            <h1>{unitTitle}</h1>
          </div>

          {/* 3D Interaction Hint */}
          <div
            id="hint"
            style={{
              opacity: stageMode === '3d' && showHint ? 1 : 0,
              visibility: stageMode === '3d' ? 'visible' : 'hidden',
              pointerEvents: 'none',
            }}
          >
            drag to turn it, scroll or pinch to zoom
          </div>

          {/* Persistent 2D SVG Diagram Viewer (overlaid when mode === '2d') */}
          <div
            style={{
              visibility: stageMode === '2d' ? 'visible' : 'hidden',
              pointerEvents: stageMode === '2d' ? 'auto' : 'none',
            }}
            className="absolute inset-0 w-full h-full"
          >
            <SvgDiagramViewer
              diagrams={activeDiagrams}
              subjectShortName={subjectShortName}
              activeIdx={diagramIndex}
              onSelectDiagram={(idx) => onDiagramIndexChange?.(idx)}
              onSwitchTo3D={() => handleModeChange('3d')}
              redrawMode={redrawMode}
              onToggleRedrawMode={() => setRedrawMode((r) => !r)}
            />
          </div>

          {/* Stage Tools Toolbar */}
          <div id="tools">
            {/* Segmented Control 3D | 2D with aria-pressed */}
            <div
              className="flex items-center rounded-full border-[1.5px] border-ink bg-paper p-0.5 shadow-sm"
              role="group"
              aria-label="Stage view mode"
            >
              <button
                type="button"
                onClick={() => handleModeChange('3d')}
                aria-pressed={stageMode === '3d'}
                title="Switch to 3D Canvas (Shortcut: D)"
                className={`px-3 py-1 text-xs font-hand font-bold rounded-full transition-colors ${
                  stageMode === '3d' ? 'bg-ink text-paper' : 'text-dim hover:text-ink'
                }`}
              >
                3D
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('2d')}
                aria-pressed={stageMode === '2d'}
                title="Switch to 2D Exam Sketchbook (Shortcut: D)"
                className={`px-3 py-1 text-xs font-hand font-bold rounded-full transition-colors ${
                  stageMode === '2d' ? 'bg-ink text-paper' : 'text-dim hover:text-ink'
                }`}
              >
                2D
              </button>
            </div>

            {/* Copy Link to this Unit ("Open this unit") */}
            <div className="relative">
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Open this unit"
                title={copiedLink ? 'Link copied to clipboard!' : 'Open this unit (copy link)'}
                className={`tl ${copiedLink ? 'on text-accentRed' : ''}`}
              >
                {copiedLink ? <Check className="w-4 h-4 text-accentRed" /> : <Link2 className="w-4 h-4" />}
              </button>
              {copiedLink && (
                <span className="absolute top-full mt-1.5 right-0 text-[11px] font-mono font-bold text-accentRed bg-paper border border-ink/40 px-2 py-0.5 rounded shadow-sketchy whitespace-nowrap animate-fade-in pointer-events-none z-20">
                  Link copied!
                </span>
              )}
            </div>

            {/* Battery Saver / Low Power Toggle */}
            {onToggleBatterySaver && (
              <button
                type="button"
                onClick={onToggleBatterySaver}
                aria-pressed={batterySaver}
                aria-label={batterySaver ? 'Battery Saver Active (30fps, 1x DPR)' : 'Toggle Battery Saver (caps 30fps)'}
                title={batterySaver ? 'Battery Saver Active (30fps, 1x DPR)' : 'Toggle Battery Saver (caps 30fps)'}
                className={`tl ${batterySaver ? 'on text-accentRed' : ''}`}
              >
                {batterySaver ? <BatteryCharging className="w-4 h-4 text-accentRed" /> : <BatteryLow className="w-4 h-4 text-ink" />}
              </button>
            )}

            {/* 3D-Exclusive Camera Tools */}
            {stageMode === '3d' && (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Live Parameter Dock (3D mode with scene parameters) */}
        {stageMode === '3d' && scene.params && scene.params.length > 0 ? (
          <div id="live-dock">
            {isLabStep ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-dashed border-ink/30">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-accentRed fill-current" />
                    <span className="text-xs font-mono font-bold tracking-[0.14em] uppercase text-accentRed">
                      LIVE EXPERIMENT PARAMETERS (STEP {labStepIndex + 1})
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
                        onSliderValuesChange?.(reset);
                      }}
                      className="text-xs font-mono text-dim hover:text-ink underline decoration-dashed transition-colors"
                      title="Reset sliders to defaults"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlidersOpen((o) => !o)}
                      className="text-xs font-mono text-dim hover:text-ink px-1.5 py-0.5 rounded border border-ink/30"
                      title={slidersOpen ? 'Collapse sliders' : 'Expand sliders'}
                    >
                      {slidersOpen ? '▲ Collapse' : '▼ Expand'}
                    </button>
                  </div>
                </div>
                {slidersOpen && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {scene.params.map((p) => {
                      const val = (sliderValues && sliderValues[p.id]) ?? p.defaultVal;
                      return (
                        <div key={p.id} className="flex flex-col gap-1">
                          <div className="flex justify-between items-baseline text-sm">
                            <label htmlFor={`param-${p.id}`} className="font-semibold text-ink font-sans text-sm">
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
                              const nextParams = {
                                ...(engineRef.current.params || {}),
                                [p.id]: num,
                              };
                              engineRef.current.params = nextParams;
                              onSliderValuesChange?.(nextParams);
                            }}
                            className="w-full accent-ink cursor-pointer h-2 bg-ink/15 rounded-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : labStepIndex !== -1 ? (
              <div className="flex items-center justify-between text-sm py-0.5">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-accentRed animate-pulse fill-current" />
                  <span className="font-sans text-sm font-semibold text-ink">
                    Interactive Live Lab on <strong>Step {labStepIndex + 1}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onStepChange(labStepIndex)}
                  className="btn py-1 px-3 text-xs font-sans font-bold text-accentRed hover:text-white hover:bg-accentRed transition-all"
                >
                  Jump to Lab →
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Unified Caption & Navigation Dots Bar */}
        <div ref={capRef} id="cap">
          <div className="sn">
            {stageMode === '3d' ? (
              <>
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
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="sb"
                  disabled={diagramIndex === 0}
                  onClick={() => onDiagramIndexChange?.(Math.max(0, diagramIndex - 1))}
                  aria-label="Previous diagram"
                >
                  ←
                </button>
                <div className="dots">
                  {activeDiagrams.map((d, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onDiagramIndexChange?.(idx)}
                      className={idx === diagramIndex ? 'on' : idx < diagramIndex ? 'done' : ''}
                      title={d.title}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="sb"
                  disabled={diagramIndex === activeDiagrams.length - 1}
                  onClick={() =>
                    onDiagramIndexChange?.(Math.min(activeDiagrams.length - 1, diagramIndex + 1))
                  }
                  aria-label="Next diagram"
                >
                  →
                </button>
              </>
            )}
          </div>

          <h2>{stageMode === '3d' ? currentStepObj.t : currentDiagramObj?.title || '2D Exam Diagram'}</h2>
          <p>{stageMode === '3d' ? currentStepObj.d : currentDiagramObj?.caption || ''}</p>
        </div>
      </section>
    </StageErrorBoundary>
  );
};
