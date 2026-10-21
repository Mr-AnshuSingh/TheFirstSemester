'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Eye, EyeOff, RotateCcw } from 'lucide-react';

export interface UnitDiagramItem {
  title: string;
  svg: string;
  caption: string;
  redrawLabelMap?: Record<string, string>;
}

export interface SvgDiagramViewerProps {
  diagrams: UnitDiagramItem[];
  subjectShortName: string;
  activeIdx: number;
  onSelectDiagram: (idx: number) => void;
  onSwitchTo3D?: () => void;
  redrawMode?: boolean;
  onToggleRedrawMode?: () => void;
}

export const SvgDiagramViewer: React.FC<SvgDiagramViewerProps> = ({
  diagrams,
  subjectShortName,
  activeIdx,
  onSelectDiagram,
  onSwitchTo3D,
  redrawMode = false,
  onToggleRedrawMode,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for lightbox & diagrams
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen && e.key === 'Escape') {
        e.preventDefault();
        setLightboxOpen(false);
        return;
      }
      // If user is typing in an input/textarea, ignore arrows
      const activeEl = document.activeElement;
      if (
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        activeEl?.getAttribute('contenteditable') === 'true'
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onSelectDiagram(Math.max(0, activeIdx - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onSelectDiagram(Math.min(diagrams.length - 1, activeIdx + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, activeIdx, diagrams.length, onSelectDiagram]);

  // Trap focus inside lightbox when open
  useEffect(() => {
    if (lightboxOpen && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [lightboxOpen]);

  // Empty state handling
  if (!diagrams || diagrams.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-paper">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-ink/40 flex items-center justify-center text-dim font-hand text-xl">
          2D
        </div>
        <h4 className="font-hand text-xl font-bold text-ink">No 2D Exam Diagrams for this Unit</h4>
        <p className="text-sm text-dim max-w-sm font-sans">
          This syllabus unit is best explored through the interactive 3D simulation and step-by-step notes.
        </p>
        {onSwitchTo3D && (
          <button
            type="button"
            onClick={onSwitchTo3D}
            className="btn red text-sm px-4 py-1.5 font-bold shadow-sm"
          >
            Switch to 3D Canvas
          </button>
        )}
      </div>
    );
  }

  const current = diagrams[Math.min(activeIdx, diagrams.length - 1)];

  // Process SVG for Redraw Mode if active
  const renderSvgContent = (rawSvg: string) => {
    if (!redrawMode) return rawSvg;
    // In Redraw mode: hide text labels for self-testing sketch practice
    return rawSvg.replace(/<text\b[^>]*>([\s\S]*?)<\/text>/gi, '');
  };

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-y-auto pt-3 pb-3 px-3 sm:px-5 bg-paper space-y-2">
      {/* 2D Viewer Controls Header with right clearance for floating #tools */}
      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-dashed border-ink/20 pb-1.5 pr-32 sm:pr-40 min-h-[40px]">
        <div className="min-w-0">
          <span className="text-[11px] font-mono font-bold uppercase text-accentRed tracking-wider block">
            2D Exam Sketchbook · {subjectShortName} ({activeIdx + 1}/{diagrams.length})
          </span>
          <h4 className="font-hand text-base sm:text-lg font-bold text-ink truncate m-0">
            {current.title}
          </h4>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Redraw Mode Practice Toggle */}
          {onToggleRedrawMode && (
            <button
              type="button"
              onClick={onToggleRedrawMode}
              className={`text-xs px-2.5 py-1 rounded font-mono font-bold border transition flex items-center gap-1 ${
                redrawMode
                  ? 'bg-accentRed text-paper border-accentRed'
                  : 'bg-paper text-dim border-ink/30 hover:text-ink hover:bg-gold/20'
              }`}
              title={redrawMode ? 'Exit Redraw Practice Mode' : 'Redraw Mode: Hide labels for memory sketch test'}
            >
              {redrawMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{redrawMode ? 'Redraw On' : 'Redraw'}</span>
            </button>
          )}

          {/* Lightbox Enlarge Button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="text-xs px-2.5 py-1 rounded font-mono font-bold border border-ink/30 bg-paper hover:bg-gold/20 text-ink flex items-center gap-1 transition"
            title="Tap to enlarge (Lightbox view)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enlarge</span>
          </button>
        </div>
      </div>

      {/* Main SVG Diagram Display Card with cleanly scaled text and proportional font */}
      <div
        className="relative p-3 sm:p-5 bg-paper border-2 border-ink rounded-xl shadow-sketch flex-1 flex flex-col justify-center items-center overflow-hidden cursor-zoom-in min-h-[220px]"
        onClick={() => setLightboxOpen(true)}
        title="Click to enlarge diagram"
      >
        <div
          className="w-full max-w-2xl flex-1 flex items-center justify-center overflow-auto [&_svg]:w-full [&_svg]:h-auto [&_svg]:max-h-[52vh] [&_svg]:overflow-visible [&_svg_.l]:stroke-[#2b2a28] [&_svg_.l]:fill-none [&_svg_.l]:stroke-[1.8] [&_svg_.a]:stroke-[#c85025] [&_svg_.a]:fill-none [&_svg_.a]:stroke-[2.2] [&_svg_.d]:stroke-[#555046] [&_svg_.d]:fill-none [&_svg_.d]:stroke-dasharray-[4,3] [&_svg_.fa]:fill-[#f6e3b4] [&_svg_.fa]:stroke-[#2b2a28] [&_svg_.t]:fill-[#2b2a28] [&_svg_.t]:font-sans [&_svg_.t]:text-[9.5px] [&_svg_.ta]:fill-[#c85025] [&_svg_.ta]:font-bold [&_svg_.ta]:font-sans [&_svg_.ta]:text-[10px]"
          dangerouslySetInnerHTML={{ __html: renderSvgContent(current.svg) }}
        />
        {redrawMode && (
          <div className="absolute top-2 right-2 bg-accentRed text-paper text-[10px] font-mono px-2 py-0.5 rounded font-bold shadow-sm">
            Redraw Mode Active: Labels Hidden
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="bg-paper max-w-4xl w-full rounded-2xl border-2 border-ink shadow-sketchy p-4 sm:p-6 space-y-4 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-ink/30 pb-2">
              <div className="min-w-0">
                <span className="text-xs font-mono text-accentRed font-bold uppercase tracking-wider">
                  2D Exam Diagram ({activeIdx + 1} of {diagrams.length})
                </span>
                <h3 className="font-hand text-xl sm:text-2xl font-bold text-ink truncate">
                  {current.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="btn text-xs px-2.5 py-1 flex items-center gap-1"
                aria-label="Close enlarged diagram"
              >
                <X className="w-4 h-4" />
                <span>Close (Esc)</span>
              </button>
            </div>

            <div
              className="p-4 bg-paper2 rounded-xl border border-ink/20 flex-1 overflow-auto flex items-center justify-center [&_svg]:w-full [&_svg]:h-auto [&_svg]:max-h-[65vh] [&_svg_.l]:stroke-[#2b2a28] [&_svg_.l]:fill-none [&_svg_.l]:stroke-[1.8] [&_svg_.a]:stroke-[#c85025] [&_svg_.a]:fill-none [&_svg_.a]:stroke-[2.2] [&_svg_.d]:stroke-[#555046] [&_svg_.d]:fill-none [&_svg_.d]:stroke-dasharray-[4,3] [&_svg_.fa]:fill-[#f6e3b4] [&_svg_.fa]:stroke-[#2b2a28] [&_svg_.t]:fill-[#2b2a28] [&_svg_.t]:font-sans [&_svg_.t]:text-[11.5px] [&_svg_.ta]:fill-[#c85025] [&_svg_.ta]:font-bold [&_svg_.ta]:font-sans [&_svg_.ta]:text-[12px]"
              dangerouslySetInnerHTML={{ __html: renderSvgContent(current.svg) }}
            />

            <p className="text-xs sm:text-sm text-dim font-sans italic border-t border-dashed border-ink/20 pt-2">
              <strong>Caption:</strong> {current.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
