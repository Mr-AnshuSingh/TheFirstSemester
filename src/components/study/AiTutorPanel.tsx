'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Subject, SceneStep, TutorResponsePayload } from '@/types/syllabus';
import { buildUnitContext, buildOfflineTutorAnswer } from '@/lib/tutorContext';
import { getTopicContent } from '@/data/topicContent';
import { SafeMarkdownText, KatexText } from './KatexRenderer';
import {
  GraduationCap,
  Camera,
  Upload,
  Mic,
  MicOff,
  RefreshCw,
  Copy,
  Check,
  X,
  AlertTriangle,
  FileText,
  Sparkles,
  BookOpen,
  Brain,
  ChevronDown,
  Square,
  RotateCcw,
  Bookmark,
  Maximize2,
} from 'lucide-react';

export interface AiTutorPanelProps {
  subject: Subject;
  unitIndex: number;
  stepIndex: number;
  activeStep: SceneStep;
  onSelectUnit?: (unitIndex: number) => void;
  onOpenNotes?: () => void;
  onOpenQuiz?: () => void;
  onSaveNote?: (noteText: string) => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  unitKey: string;
  timestamp: string;
  image?: string | null;
  payload?: TutorResponsePayload;
  error?: string | null;
}

const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_RAW_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB raw limit

export const AiTutorPanel: React.FC<AiTutorPanelProps> = ({
  subject,
  unitIndex,
  stepIndex,
  activeStep,
  onSelectUnit,
  onOpenNotes,
  onOpenQuiz,
  onSaveNote,
}) => {
  const unit = subject.units[unitIndex];
  const unitKey = `${subject.id}:${unitIndex}`;

  // Per-unit in-memory chat threads
  const [threads, setThreads] = useState<Record<string, ChatMessage[]>>({});
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);
  const [unitMenuOpen, setUnitMenuOpen] = useState(false);
  const [showAllDiagrams, setShowAllDiagrams] = useState(false);
  const [diagramModal, setDiagramModal] = useState<{ svg: string; title: string; caption: string } | null>(null);

  // Camera & live scanner states
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [isListening, setIsListening] = useState(false);

  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const unitMenuRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active unit messages
  const currentMessages = useMemo(() => threads[unitKey] || [], [threads, unitKey]);

  // Current unit diagrams from topicContent in syllabus order
  const unitDiagrams = useMemo(() => {
    const list: { topicTitle: string; topicIndex: number; svg: string; caption: string }[] = [];
    unit.topics.forEach((topicStr, tIdx) => {
      const tc = getTopicContent(subject.id, unitIndex, tIdx);
      if (tc?.diagram?.svg) {
        list.push({
          topicTitle: topicStr.replace(/^★\s*/, ''),
          topicIndex: tIdx,
          svg: tc.diagram.svg,
          caption: tc.diagram.caption || topicStr,
        });
      }
    });
    return list;
  }, [subject.id, unitIndex, unit.topics]);

  // Client-side image compression: max 1600px width/height, 0.8 JPEG quality
  const compressImageFile = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
        reject(new Error(`Unsupported file format (${file.type || 'unknown'}). Please upload a JPG, PNG, or WebP image.`));
        return;
      }
      if (file.size > MAX_RAW_IMAGE_SIZE) {
        reject(new Error(`Image is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max raw size is 10MB.`));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = () => reject(new Error('Failed to load image into browser canvas.'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  }, []);

  // Ctrl+V paste support for images anywhere in this component
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            compressImageFile(file)
              .then((dataUrl) => {
                setAttachedImage(dataUrl);
                setApiError(null);
              })
              .catch((err: Error) => {
                setApiError(err.message);
              });
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [compressImageFile]);

  // Click outside listener to close "Change unit" menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (unitMenuRef.current && !unitMenuRef.current.contains(e.target as Node)) {
        setUnitMenuOpen(false);
      }
    };
    if (unitMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [unitMenuOpen]);

  // Stop generation helper
  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const closeCameraModal = useCallback(() => {
    stopCamera();
    setShowCameraModal(false);
  }, [stopCamera]);

  // Escape key handler: closes modals/menus and stops in-flight generation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (unitMenuOpen) {
          e.preventDefault();
          setUnitMenuOpen(false);
          return;
        }
        if (diagramModal) {
          e.preventDefault();
          setDiagramModal(null);
          return;
        }
        if (showCameraModal) {
          e.preventDefault();
          closeCameraModal();
          return;
        }
        if (loading) {
          e.preventDefault();
          stopGeneration();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unitMenuOpen, diagramModal, showCameraModal, loading, stopGeneration, closeCameraModal]);

  // Cleanup abort controller on unmount or unit switch
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      stopCamera();
    };
  }, [stopCamera]);

  // When subject or unitIndex changes, abort any ongoing in-flight request
  const prevUnitRef = useRef(unitKey);
  useEffect(() => {
    if (prevUnitRef.current !== unitKey) {
      prevUnitRef.current = unitKey;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
        setLoading(false);
      }
      setAttachedImage(null);
      setApiError(null);
    }
  }, [unitKey]);

  // Camera stream controls
  const startCamera = async (facing: 'environment' | 'user' = cameraFacing) => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setCameraError('Camera access denied or unavailable. Please grant camera permission or use "Upload Image".');
    }
  };

  const openCameraModal = () => {
    setShowCameraModal(true);
    setTimeout(() => {
      startCamera(cameraFacing);
    }, 100);
  };

  const toggleCameraFacing = () => {
    const newFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(newFacing);
    startCamera(newFacing);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setAttachedImage(dataUrl);
      closeCameraModal();
    }
  };

  // Speech-to-text
  const toggleSpeechRecognition = () => {
    const SpeechRec =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .webkitSpeechRecognition;

    if (!SpeechRec) {
      alert('Speech recognition is not supported in this browser. Please type your question.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setApiError(null);
      const dataUrl = await compressImageFile(file);
      setAttachedImage(dataUrl);
    } catch (err: any) {
      setApiError(err?.message || 'Failed to process image file.');
    }
    e.target.value = '';
  };

  // Main Ask / Solve doubt function
  const askTutor = async (qText?: string, imagePayload?: string | null) => {
    const query = (qText ?? question).trim();
    const currentImg = imagePayload !== undefined ? imagePayload : attachedImage;

    const finalQuestion =
      query ||
      (currentImg
        ? `Please read the problem in the attached image, transcribe it, check each step, and solve it step-by-step with complete mathematical working.`
        : '');

    if (!finalQuestion) return;

    // Capture target unit key at time of dispatch
    const targetUnitKey = unitKey;
    const targetSubject = subject;
    const targetUnitIndex = unitIndex;
    const targetUnit = unit;

    // Add user message to in-memory thread
    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: finalQuestion,
      unitKey: targetUnitKey,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: currentImg,
    };

    setThreads((prev) => ({
      ...prev,
      [targetUnitKey]: [...(prev[targetUnitKey] || []), userMsg],
    }));

    setQuestion('');
    setAttachedImage(null);
    setLoading(true);
    setApiError(null);

    // Abort previous in-flight request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const createFallback = (msg?: string): TutorResponsePayload => {
      const unitCtx = buildUnitContext(targetSubject.id, targetUnitIndex);
      const ans = unitCtx
        ? buildOfflineTutorAnswer(unitCtx, finalQuestion)
        : `### Academic Syllabus Solution\nUnit ${targetUnitIndex + 1}: ${targetUnit.t}\n\n${targetUnit.s}`;
      return {
        answer: ans,
        source: 'offline_template',
        isLiveAi: false,
        contextUsed: {
          subjectName: targetSubject.name,
          subjectCode: targetSubject.code,
          unitNumber: targetUnitIndex + 1,
          unitTitle: targetUnit.t,
        },
      };
    };

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          subjectId: targetSubject.id,
          unitIndex: targetUnitIndex,
          stepIndex,
          question: finalQuestion,
          ...(currentImg ? { image: currentImg } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data || !data.answer) {
        const errorMsg =
          data?.error ||
          (res.status === 429
            ? 'Rate limit exceeded: 15 questions per minute. Please pause for a moment.'
            : `Server responded with status ${res.status}. Displaying offline syllabus-grounded solution.`);
        setApiError(errorMsg);

        const fallbackPayload = createFallback();
        const assistantMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: fallbackPayload.answer,
          unitKey: targetUnitKey,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          payload: fallbackPayload,
          error: errorMsg,
        };

        setThreads((prev) => ({
          ...prev,
          [targetUnitKey]: [...(prev[targetUnitKey] || []), assistantMsg],
        }));
        return;
      }

      const responsePayload = data as TutorResponsePayload;
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: responsePayload.answer,
        unitKey: targetUnitKey,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        payload: responsePayload,
      };

      setThreads((prev) => ({
        ...prev,
        [targetUnitKey]: [...(prev[targetUnitKey] || []), assistantMsg],
      }));
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Request was canceled by user or unmount; ignore
        return;
      }
      const errorMsg = 'Network connection issue. Displaying offline syllabus-grounded solution.';
      setApiError(errorMsg);

      const fallbackPayload = createFallback();
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: fallbackPayload.answer,
        unitKey: targetUnitKey,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        payload: fallbackPayload,
        error: errorMsg,
      };

      setThreads((prev) => ({
        ...prev,
        [targetUnitKey]: [...(prev[targetUnitKey] || []), assistantMsg],
      }));
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  // Copy solution to clipboard as complete Markdown
  const copySolutionToClipboard = (payload: TutorResponsePayload) => {
    const textParts = [payload.answer];
    if (payload.formulaHighlight && payload.formulaHighlight.length > 0) {
      textParts.push(`\n### Key Formulas\n${payload.formulaHighlight.map((f) => `- ${f}`).join('\n')}`);
    }
    if (payload.markingSchemeSteps && payload.markingSchemeSteps.length > 0) {
      textParts.push(
        `\n### Step-by-Step Marking Scheme\n${payload.markingSchemeSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
      );
    }
    if (payload.trapWarning) {
      textParts.push(`\n### Examiner Trap Alert\n> ⚠️ ${payload.trapWarning}`);
    }
    const textToCopy = textParts.join('\n\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(payload.answer);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Save solution to unit notes
  const saveSolutionToNotes = (payload: TutorResponsePayload) => {
    if (!onSaveNote) return;
    onSaveNote(payload.answer);
    setSavedNoteId(payload.answer);
    setTimeout(() => setSavedNoteId(null), 2000);
  };

  return (
    <div className="box space-y-4 max-w-full">
      {/* Hidden File & Camera Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileUpload}
      />
      <input
        ref={nativeCameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Main Solver Card */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-paper border-2 border-ink shadow-sketch space-y-3">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-2 border-b border-dashed border-ink/20 pb-2.5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accentRed shrink-0" />
              <h3 className="font-hand text-xl sm:text-2xl font-bold text-accentRed tracking-wide truncate">
                AI Doubt Solver &amp; Tutor
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-dim font-sans mt-0.5">
              Unit-Level Syllabus Problem Solver · Step-by-Step Numericals &amp; Derivations · LaTeX
            </p>
          </div>

          {currentMessages.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setThreads((prev) => ({ ...prev, [unitKey]: [] }));
                setApiError(null);
              }}
              title="Clear this unit's chat history"
              className="text-xs px-2.5 py-1 rounded font-mono font-bold border border-ink/30 bg-paper2 hover:bg-gold/20 text-dim hover:text-ink shrink-0 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>

        {/* Unit Context Chip Bar with Keyboard-Accessible Change Unit Menu */}
        <div className="relative text-sm text-dim bg-paper2/80 p-2.5 rounded-lg border border-ink/20 font-sans flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <BookOpen className="w-4 h-4 text-accentTeal shrink-0" />
            <span className="text-xs sm:text-sm text-ink truncate">
              Context: <strong>{subject.name || subject.co}</strong> ({subject.code}) · Unit {unitIndex + 1}:{' '}
              <strong>{unit.t}</strong>
            </span>
          </div>

          {/* Change Unit Dropdown Button */}
          {onSelectUnit && (
            <div className="relative shrink-0" ref={unitMenuRef}>
              <button
                type="button"
                onClick={() => setUnitMenuOpen((prev) => !prev)}
                aria-expanded={unitMenuOpen}
                aria-haspopup="true"
                aria-label="Change syllabus unit"
                className="text-xs px-2.5 py-1 rounded font-mono font-bold bg-paper border border-ink/40 text-ink hover:bg-gold/20 transition flex items-center gap-1"
              >
                <span>Change unit</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${unitMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {unitMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-1.5 w-64 max-w-[calc(100vw-2rem)] bg-paper border-2 border-ink shadow-sketch rounded-lg z-30 p-1 space-y-0.5 animate-fadeIn"
                >
                  <div className="px-2 py-1 text-[11px] font-mono text-dim border-b border-ink/20 mb-1">
                    Select Unit for {subject.co}:
                  </div>
                  {subject.units.map((u, idx) => {
                    const isSelected = idx === unitIndex;
                    return (
                      <button
                        key={idx}
                        role="menuitem"
                        type="button"
                        onClick={() => {
                          onSelectUnit(idx);
                          setUnitMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded font-sans transition-colors flex items-center justify-between gap-1.5 ${
                          isSelected ? 'bg-ink text-paper font-bold' : 'hover:bg-gold/20 text-ink'
                        }`}
                      >
                        <span className="truncate">
                          Unit {idx + 1}: {u.t}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* API Error / Rate Limit Banner */}
        {apiError && (
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono flex items-start justify-between gap-2 animate-fadeIn">
            <div className="flex items-start gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="break-words">
                <span className="font-bold">Notice:</span> {apiError}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setApiError(null)}
              className="text-amber-700 hover:text-amber-900 p-0.5 shrink-0"
              aria-label="Dismiss notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Attached Photo Preview */}
        {attachedImage && (
          <div className="p-2.5 rounded-lg bg-gold/10 border-[1.5px] border-ink/40 flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={attachedImage}
                alt="Problem attachment preview"
                className="w-14 h-14 object-cover rounded border border-ink shadow-sm shrink-0 bg-paper"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-accentRed font-mono flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Problem Photo Attached</span>
                </span>
                <span className="text-xs sm:text-sm text-dim truncate block font-sans">
                  Ready for OCR and step-by-step mathematical working.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAttachedImage(null)}
              className="px-2.5 py-1 text-xs font-mono font-bold text-accentRed bg-paper border border-accentRed/40 rounded hover:bg-accentRed hover:text-paper transition shrink-0 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        )}

        {/* Smart Syllabus Presets */}
        <div className="flex flex-wrap gap-1.5">
          {attachedImage
            ? [
                `Solve this handwritten problem step-by-step with full workings.`,
                `Find where I made a mistake in this calculation and correct it.`,
                `Transcribe the formula in this image and derive it.`,
                `Provide the full-marks 7-mark university answer for this question.`,
              ].map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setQuestion(preset);
                    askTutor(preset);
                  }}
                  className="text-xs sm:text-sm px-3 py-1 rounded-full bg-gold/15 hover:bg-ink hover:text-paper border border-ink/40 transition text-left font-sans disabled:opacity-50"
                >
                  {preset}
                </button>
              ))
            : [
                `How do I write a full-marks 7-mark answer on "${activeStep.t}"?`,
                `Explain the key formula and derivation for ${unit.t}.`,
                `Solve a university-style numerical problem on ${unit.t}.`,
                `Explain this with a simple real-life analogy.`,
                `What are the common exam traps in ${unit.t}?`,
              ].map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setQuestion(preset);
                    askTutor(preset);
                  }}
                  className="text-xs sm:text-sm px-3 py-1 rounded-full bg-paper2 hover:bg-ink hover:text-paper border border-ink/40 transition text-left font-sans disabled:opacity-50"
                >
                  {preset}
                </button>
              ))}
        </div>

        {/* Input & Action Toolbar */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!loading && (question.trim() || attachedImage)) {
                    askTutor();
                  }
                }
              }}
              rows={2}
              placeholder={
                attachedImage
                  ? `Add specific instructions (e.g. "solve step 2 only"), or click Solve...`
                  : `Ask any question, numerical, or snap a photo of paper/textbook... (Ctrl+V to paste screenshot)`
              }
              className="w-full px-3 py-2 text-sm sm:text-base bg-[#fffdf7] border-[1.5px] border-ink rounded-lg focus:outline-none focus:ring-1 focus:ring-ink font-sans resize-none"
            />
            {isListening && (
              <span className="absolute bottom-2 right-2 text-xs font-mono text-accentRed animate-pulse flex items-center gap-1 bg-paper px-2 py-0.5 rounded border border-accentRed/40">
                <span className="w-2 h-2 rounded-full bg-accentRed inline-block" />
                Listening...
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Live WebCam Scanner Button */}
              <button
                type="button"
                onClick={openCameraModal}
                disabled={loading}
                title="Open live camera viewfinder to snap problem photo"
                className="btn px-2.5 sm:px-3 py-1 text-xs sm:text-sm flex items-center gap-1 bg-paper hover:bg-gold/20 disabled:opacity-50"
              >
                <Camera className="w-3.5 h-3.5 text-ink" />
                <span>Camera</span>
              </button>

              {/* Native Mobile Camera Snap */}
              <button
                type="button"
                onClick={() => nativeCameraInputRef.current?.click()}
                disabled={loading}
                title="Capture directly with phone camera"
                className="btn px-2.5 sm:px-3 py-1 text-xs sm:text-sm flex items-center gap-1 bg-paper hover:bg-gold/20 disabled:opacity-50"
              >
                <Camera className="w-3.5 h-3.5 text-ink" />
                <span>Snap Photo</span>
              </button>

              {/* Upload Image */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                title="Upload problem photo or screenshot (JPG, PNG, WebP)"
                className="btn px-2.5 sm:px-3 py-1 text-xs sm:text-sm flex items-center gap-1 bg-paper hover:bg-gold/20 disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5 text-ink" />
                <span>Upload Image</span>
              </button>

              {/* Voice Input */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                disabled={loading}
                title="Speak your doubt via microphone"
                className={`btn px-2.5 sm:px-3 py-1 text-xs sm:text-sm flex items-center gap-1 disabled:opacity-50 ${
                  isListening ? 'bg-accentRed text-paper' : 'bg-paper hover:bg-gold/20'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-ink" />}
                <span>{isListening ? 'Stop' : 'Voice'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-dim hidden md:inline">
                Enter to send, Shift+Enter for new line
              </span>

              {loading ? (
                <button
                  type="button"
                  onClick={stopGeneration}
                  className="btn px-4 py-1.5 text-sm bg-accentRed text-paper font-bold shadow-sm flex items-center gap-1.5 hover:bg-red-700 transition"
                  title="Stop generating response (Esc)"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => askTutor()}
                  disabled={!question.trim() && !attachedImage}
                  className="btn red text-sm px-4 py-1.5 font-bold shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {attachedImage ? (
                    <>
                      <Camera className="w-4 h-4" />
                      <span>Solve Photo Problem</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Ask Tutor</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Camera Live Viewfinder Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-ink/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-paper max-w-lg w-full rounded-xl border-2 border-ink shadow-sketchy p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-ink/30 pb-2">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-ink" />
                <h4 className="font-hand text-xl font-bold text-ink">Capture Problem with Camera</h4>
              </div>
              <button type="button" onClick={closeCameraModal} className="btn text-xs px-2 py-0.5">
                Close
              </button>
            </div>

            {cameraError ? (
              <div className="p-3 bg-[#fff1e8] rounded border border-accentRed text-xs space-y-2">
                <p className="text-accentRed font-bold">{cameraError}</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      closeCameraModal();
                      nativeCameraInputRef.current?.click();
                    }}
                    className="btn gold text-xs"
                  >
                    Use Native Mobile Camera
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeCameraModal();
                      fileInputRef.current?.click();
                    }}
                    className="btn text-xs"
                  >
                    Upload from Gallery
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative rounded-lg overflow-hidden border-2 border-ink bg-black aspect-video flex items-center justify-center">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  <div className="absolute inset-4 border-2 border-dashed border-white/60 pointer-events-none rounded flex items-center justify-center">
                    <span className="bg-black/60 text-white text-xs font-mono px-2 py-1 rounded">
                      Align equation / problem inside frame
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={toggleCameraFacing}
                    className="btn text-xs px-2.5 py-1 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Switch Camera</span>
                  </button>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="btn red text-sm font-hand font-bold px-5 py-2 shadow-sm flex items-center gap-1.5"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Snap Photo &amp; Attach</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2D Unit Diagram Preview Modal */}
      {diagramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-ink/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-paper max-w-xl w-full rounded-xl border-2 border-ink shadow-sketchy p-4 space-y-3 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-ink/30 pb-2">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-accentTeal shrink-0" />
                <h4 className="font-hand text-lg font-bold text-ink truncate">{diagramModal.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setDiagramModal(null)}
                className="btn text-xs px-2 py-0.5 shrink-0"
              >
                Close (Esc)
              </button>
            </div>
            <div
              className="p-3 bg-paper2 rounded-lg border border-ink/20 flex-1 overflow-auto flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: diagramModal.svg }}
            />
            <p className="text-xs text-dim font-sans italic">{diagramModal.caption}</p>
          </div>
        </div>
      )}

      {/* Chat Messages Region with aria-live="polite" */}
      <div
        aria-live="polite"
        className="space-y-4"
      >
        {/* Loading Skeleton Pulse when asking tutor */}
        {loading && (
          <div
            aria-busy="true"
            className="p-4 rounded-xl bg-paper2/60 border-2 border-dashed border-ink/30 animate-pulse space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accentRed animate-ping" />
                <span className="font-mono text-xs text-ink font-bold">
                  AI Tutor is analyzing Unit {unitIndex + 1} syllabus &amp; formulating solution...
                </span>
              </div>
              <button
                type="button"
                onClick={stopGeneration}
                className="text-xs font-mono font-bold text-accentRed underline p-1"
              >
                Stop
              </button>
            </div>
            <div className="h-4 bg-ink/10 rounded w-3/4" />
            <div className="h-4 bg-ink/10 rounded w-5/6" />
            <div className="h-16 bg-ink/5 rounded w-full" />
            <div className="h-4 bg-ink/10 rounded w-2/3" />
          </div>
        )}

        {/* Message Thread List (rendered in order, latest at bottom) */}
        {currentMessages.map((msg) => {
          if (msg.role === 'user') {
            return (
              <div key={msg.id} className="flex justify-end animate-fadeIn">
                <div className="max-w-[85%] bg-ink text-paper rounded-xl p-3 shadow-sm space-y-2 text-sm">
                  {msg.image && (
                    <div className="rounded overflow-hidden border border-paper/30 bg-black/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={msg.image} alt="User doubt attachment" className="max-h-48 object-contain w-full" />
                    </div>
                  )}
                  <p className="font-sans leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <div className="text-[10px] font-mono text-paper/70 text-right">{msg.timestamp}</div>
                </div>
              </div>
            );
          }

          // Assistant Response Card
          const payload = msg.payload;
          if (!payload) return null;

          return (
            <div
              key={msg.id}
              className="p-4 rounded-xl bg-[#fff9e8] border-2 border-ink shadow-sketch space-y-3.5 text-base leading-relaxed animate-fadeIn"
            >
              {/* Header Status Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-ink/20 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      payload.isLiveAi
                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                        : 'bg-paper text-dim border-ink/30'
                    }`}
                  >
                    {payload.isLiveAi ? 'Live Cloud AI (Multimodal)' : 'Offline Syllabus Grounded'}
                  </span>
                  {payload.source && payload.source !== 'offline_template' && (
                    <span className="text-[11px] font-mono text-dim px-2 py-0.5 rounded bg-paper border border-ink/20">
                      {payload.source}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Copy as Markdown Button */}
                  <button
                    type="button"
                    onClick={() => copySolutionToClipboard(payload)}
                    className="btn text-xs px-2.5 py-1 bg-paper hover:bg-gold/20 flex items-center gap-1"
                    title="Copy complete solution as Markdown"
                  >
                    {copiedId === payload.answer ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-accentTeal" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-ink" />
                        <span>Copy as Markdown</span>
                      </>
                    )}
                  </button>

                  {/* Save to My Notes Button */}
                  {onSaveNote && (
                    <button
                      type="button"
                      onClick={() => saveSolutionToNotes(payload)}
                      className="btn text-xs px-2.5 py-1 bg-paper hover:bg-gold/20 flex items-center gap-1"
                      title="Save answer to personal unit study notes"
                    >
                      {savedNoteId === payload.answer ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-accentTeal" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5 text-ink" />
                          <span>Save to My Notes</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Retry Button on Error/Fallback */}
                  {msg.error && (
                    <button
                      type="button"
                      onClick={() => askTutor(msg.content)}
                      className="btn text-xs px-2.5 py-1 bg-paper hover:bg-gold/20 flex items-center gap-1 text-accentRed"
                      title="Retry sending question to AI"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Solution Body */}
              <div>
                <strong className="text-accentTeal uppercase tracking-wider block text-xs mb-1.5 font-mono font-bold">
                  University Marking-Scheme Answer &amp; Derivation:
                </strong>
                <div className="text-base text-ink leading-relaxed font-sans bg-paper/70 p-4 rounded-lg border border-ink/20 shadow-sm overflow-x-auto">
                  <SafeMarkdownText content={payload.answer} />
                </div>
              </div>

              {/* Key Formulas */}
              {payload.formulaHighlight && payload.formulaHighlight.length > 0 && (
                <div>
                  <strong className="text-accentRed uppercase tracking-wider block text-xs mb-1 font-mono font-bold">
                    Key Formulas &amp; Moves to Write on Paper:
                  </strong>
                  <ul className="keys space-y-1 text-base font-mono">
                    {payload.formulaHighlight.map((f, i) => (
                      <li key={i}>
                        <KatexText htmlOrText={f} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step-by-Step Rubric */}
              {payload.markingSchemeSteps && payload.markingSchemeSteps.length > 0 && (
                <div>
                  <strong className="text-ink uppercase tracking-wider block text-xs mb-1 font-mono font-bold">
                    Step-by-Step Full-Marks Rubric:
                  </strong>
                  <ol className="list-decimal pl-5 space-y-1 text-dim text-sm md:text-base">
                    {payload.markingSchemeSteps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Examiner Trap Warning */}
              {payload.trapWarning && (
                <div className="p-3 rounded bg-[#fff1e8] border border-accentRed text-ink space-y-1">
                  <div className="flex items-center gap-1.5 text-accentRed font-bold font-mono text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>EXAMINER TRAP ALERT:</span>
                  </div>
                  <p className="text-sm md:text-base font-sans">{payload.trapWarning}</p>
                </div>
              )}

              {/* Unit-Level Diagrams Section: "From this unit's notes" */}
              {unitDiagrams.length > 0 && (
                <div className="pt-3 border-t border-dashed border-ink/20 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-accentTeal" />
                      <span className="font-hand text-base font-bold text-ink">
                        From this unit&apos;s notes ({unitDiagrams.length} diagrams)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {onOpenNotes && (
                        <button
                          type="button"
                          onClick={onOpenNotes}
                          className="btn text-xs px-2 py-0.5 bg-paper hover:bg-gold/20 flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3 text-ink" />
                          <span>Open in Notes</span>
                        </button>
                      )}
                      {onOpenQuiz && (
                        <button
                          type="button"
                          onClick={onOpenQuiz}
                          className="btn text-xs px-2 py-0.5 bg-paper hover:bg-gold/20 flex items-center gap-1"
                        >
                          <Brain className="w-3 h-3 text-ink" />
                          <span>Quiz this unit</span>
                        </button>
                      )}
                      {unitDiagrams.length > 4 && (
                        <button
                          type="button"
                          onClick={() => setShowAllDiagrams((prev) => !prev)}
                          className="text-xs font-mono font-bold text-accentRed underline px-1 py-0.5"
                        >
                          {showAllDiagrams ? 'Show less' : `Show all (${unitDiagrams.length})`}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Diagrams Thumbnail Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(showAllDiagrams ? unitDiagrams : unitDiagrams.slice(0, 4)).map((d, dIdx) => (
                      <button
                        key={dIdx}
                        type="button"
                        onClick={() =>
                          setDiagramModal({
                            svg: d.svg,
                            title: d.topicTitle,
                            caption: d.caption,
                          })
                        }
                        className="group text-left p-1.5 rounded-lg border border-ink/20 bg-paper hover:border-ink hover:shadow-sm transition flex flex-col justify-between"
                      >
                        <div
                          className="aspect-video w-full rounded bg-paper2 flex items-center justify-center overflow-hidden pointer-events-none p-1"
                          dangerouslySetInnerHTML={{ __html: d.svg }}
                        />
                        <div className="mt-1 flex items-center justify-between text-[11px] font-sans font-medium text-ink w-full">
                          <span className="truncate">{d.topicTitle}</span>
                          <Maximize2 className="w-3 h-3 text-dim group-hover:text-ink shrink-0 ml-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-up Prompts */}
              <div className="pt-2 border-t border-dashed border-ink/20 flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-mono text-dim">Follow-up:</span>
                {[
                  'Explain step 1 in more detail',
                  'Give me another similar numerical to practice',
                  'How to draw the diagram for this in exam?',
                ].map((fu, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuestion(fu);
                      askTutor(fu);
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-paper hover:bg-ink hover:text-paper border border-ink/30 transition font-sans"
                  >
                    {fu}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
