'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Subject, SceneStep, TutorResponsePayload } from '@/types/syllabus';
import { KatexText } from './KatexRenderer';

interface AiTutorPanelProps {
  subject: Subject;
  unitIndex: number;
  stepIndex: number;
  activeStep: SceneStep;
}

interface DoubtHistoryItem {
  id: string;
  question: string;
  hasImage: boolean;
  timestamp: string;
  response: TutorResponsePayload;
}

export const AiTutorPanel: React.FC<AiTutorPanelProps> = ({
  subject,
  unitIndex,
  stepIndex,
  activeStep,
}) => {
  const unit = subject.units[unitIndex];
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<TutorResponsePayload | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<DoubtHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'solve' | 'history'>('solve');

  // Camera & live scanner states
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [isListening, setIsListening] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement>(null);

  // Compress image on client to max 1200px width/height and ~0.82 JPEG
  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
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
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Support Ctrl+V paste anywhere in this panel
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            compressImageFile(file).then((dataUrl) => {
              setAttachedImage(dataUrl);
            });
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Live Camera stream controls
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
      setCameraError('Camera access denied or unavailable. Use the "Upload / Snap" button below.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const openCameraModal = () => {
    setShowCameraModal(true);
    setTimeout(() => {
      startCamera(cameraFacing);
    }, 100);
  };

  const closeCameraModal = () => {
    stopCamera();
    setShowCameraModal(false);
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
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      setAttachedImage(dataUrl);
      closeCameraModal();
    }
  };

  // Voice speech-to-text
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

  // File upload handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file);
      setAttachedImage(dataUrl);
    } catch (err) {
      console.error('Failed to process image file:', err);
    }
    // reset input
    e.target.value = '';
  };

  // Main Ask / Solve doubt function
  const askTutor = async (qText?: string, imagePayload?: string | null) => {
    const query = (qText ?? question).trim();
    const currentImg = imagePayload !== undefined ? imagePayload : attachedImage;

    // Default question if only photo is attached
    const finalQuestion =
      query ||
      (currentImg
        ? `Please read the problem in the attached image, transcribe it, check each step, and solve it step-by-step with complete mathematical working.`
        : '');

    if (!finalQuestion) return;

    setLoading(true);
    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: subject.id,
          unitIndex,
          stepIndex,
          question: finalQuestion,
          ...(currentImg ? { image: currentImg } : {}),
        }),
      });
      const data: TutorResponsePayload = await res.json();
      setResponse(data);

      // Save to recent doubt session history
      setHistory((prev) => [
        {
          id: `doubt-${Date.now()}`,
          question: finalQuestion,
          hasImage: Boolean(currentImg),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          response: data,
        },
        ...prev.slice(0, 9),
      ]);
    } catch {
      const fallbackPayload: TutorResponsePayload = {
        answer: currentImg
          ? `📸 [Problem Photo Attached]\nFor ${subject.name} (${subject.code}) — Unit ${unitIndex + 1}: ${unit.t}\n\n1. Core Governing Principle (${activeStep.t}):\n${activeStep.d}\n\n2. Method to Solve:\n- Identify all given parameters and state governing formulas.\n- Carry out stepwise substitution with explicit units.\n- State final boxed result with units and sign.`
          : `For ${subject.name} (${subject.code}) — Unit ${unitIndex + 1}: ${unit.t}, start by stating the core principle (${activeStep.t}): ${activeStep.d}`,
        markingSchemeSteps: subject.ex.a,
        formulaHighlight: unit.k.slice(0, 3),
        trapWarning: subject.ex.x[0] || 'Always write units and final conclusions clearly.',
        contextUsed: {
          subjectName: subject.name,
          subjectCode: subject.code,
          unitTitle: unit.t,
          activeStepTitle: activeStep.t,
        },
        isLiveAi: false,
        source: 'offline_template',
      };
      setResponse(fallbackPayload);
    } finally {
      setLoading(false);
    }
  };

  const copySolutionToClipboard = () => {
    if (!response) return;
    const textToCopy = `[AI Doubt Solver Solution]\n${response.answer}\n\nKey Formulas:\n${response.formulaHighlight.join('\n')}\n\nMarking Scheme:\n${response.markingSchemeSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nExaminer Trap Alert:\n${response.trapWarning}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="box space-y-3">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
      <input
        ref={nativeCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Main Solver Card */}
      <div className="p-3.5 rounded-xl bg-paper border-2 border-ink shadow-sketch space-y-3">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-2 border-b border-dashed border-ink/20 pb-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">🎓</span>
              <h3 className="font-hand text-xl font-bold text-accentRed tracking-wide">
                AI Doubt Solver &amp; Tutor
              </h3>
            </div>
            <p className="text-[11px] text-dim font-sans mt-0.5">
              Camera Problem Solver · Step-by-Step Numericals &amp; Derivations · LaTeX Formatted
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('solve')}
              className={`text-xs px-2.5 py-1 rounded font-mono font-bold transition-colors ${
                activeTab === 'solve'
                  ? 'bg-ink text-paper'
                  : 'bg-paper2 text-dim hover:text-ink'
              }`}
            >
              Ask Doubt
            </button>
            {history.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`text-xs px-2.5 py-1 rounded font-mono font-bold transition-colors ${
                  activeTab === 'history'
                    ? 'bg-ink text-paper'
                    : 'bg-paper2 text-dim hover:text-ink'
                }`}
              >
                History ({history.length})
              </button>
            )}
          </div>
        </div>

        {/* Injected Syllabus Context Bar */}
        <div className="text-[11px] text-dim bg-paper2/70 p-2 rounded border border-ink/20 font-sans flex items-center justify-between flex-wrap gap-1">
          <div>
            Context: <strong>{subject.co}</strong> ({subject.code}) · Unit {unitIndex + 1}:{' '}
            <strong>{unit.t}</strong>
          </div>
          <span className="text-[10px] font-mono text-accentRed font-bold">
            Step {stepIndex + 1}: {activeStep.t}
          </span>
        </div>

        {activeTab === 'history' ? (
          /* Doubt History View */
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-ink font-hand text-lg">Recent Solved Doubts:</div>
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setResponse(item.response);
                  setActiveTab('solve');
                }}
                className="p-2.5 rounded-lg border border-ink/30 bg-[#fffdf7] hover:border-ink hover:shadow-sm cursor-pointer transition text-left space-y-1"
              >
                <div className="flex items-center justify-between text-[11px] text-dim font-mono">
                  <span>{item.hasImage ? '📸 Image Doubt' : '📝 Text Question'}</span>
                  <span>{item.timestamp}</span>
                </div>
                <div className="text-xs font-sans text-ink font-medium line-clamp-2">
                  {item.question}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Active Solver Section */
          <>
            {/* Attached Photo Preview */}
            {attachedImage && (
              <div className="p-2.5 rounded-lg bg-gold/10 border-[1.5px] border-ink/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={attachedImage}
                    alt="Problem attachment"
                    className="w-14 h-14 object-cover rounded border border-ink shadow-sm shrink-0 bg-paper"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-accentRed font-mono block">
                      📸 Problem Photo Attached
                    </span>
                    <span className="text-[11px] text-dim truncate block font-sans">
                      Ready for multi-modal OCR and step-by-step solving.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachedImage(null)}
                  className="px-2 py-1 text-xs font-mono font-bold text-accentRed bg-paper border border-accentRed/40 rounded hover:bg-accentRed hover:text-paper transition shrink-0"
                >
                  ✕ Remove
                </button>
              </div>
            )}

            {/* Smart Presets (Tailored when image is attached vs standard) */}
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
                      onClick={() => {
                        setQuestion(preset);
                        askTutor(preset);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-gold/15 hover:bg-ink hover:text-paper border border-ink/40 transition text-left font-sans"
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
                      onClick={() => {
                        setQuestion(preset);
                        askTutor(preset);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-paper2 hover:bg-ink hover:text-paper border border-ink/40 transition text-left font-sans"
                    >
                      {preset}
                    </button>
                  ))}
            </div>

            {/* Input & Action Controls */}
            <div className="space-y-2">
              <div className="relative">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      askTutor();
                    }
                  }}
                  rows={2}
                  placeholder={
                    attachedImage
                      ? `Add any specific instructions (e.g. "solve step 2 only", "find my mistake"), or click Solve...`
                      : `Ask any question, numerical, or snap a photo of paper/textbook... (Ctrl+V to paste screenshot)`
                  }
                  className="w-full px-3 py-2 text-xs md:text-sm bg-[#fffdf7] border-[1.5px] border-ink rounded-lg focus:outline-none focus:ring-1 focus:ring-ink font-sans resize-none"
                />
                {isListening && (
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono text-accentRed animate-pulse flex items-center gap-1 bg-paper px-1.5 py-0.5 rounded border border-accentRed/40">
                    <span className="w-2 h-2 rounded-full bg-accentRed inline-block" />
                    Listening...
                  </span>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Live WebCam Scanner Button */}
                  <button
                    type="button"
                    onClick={openCameraModal}
                    title="Open live camera viewfinder to snap problem photo"
                    className="btn px-2.5 py-1 text-xs flex items-center gap-1 bg-paper hover:bg-gold/20"
                  >
                    <span>📷</span>
                    <span>Camera</span>
                  </button>

                  {/* Native Mobile Camera / Direct Snap */}
                  <button
                    type="button"
                    onClick={() => nativeCameraInputRef.current?.click()}
                    title="Capture directly with phone camera"
                    className="btn px-2.5 py-1 text-xs flex items-center gap-1 bg-paper hover:bg-gold/20"
                  >
                    <span>📸</span>
                    <span>Snap Photo</span>
                  </button>

                  {/* Upload Image / Screenshot */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload problem photo or screenshot"
                    className="btn px-2.5 py-1 text-xs flex items-center gap-1 bg-paper hover:bg-gold/20"
                  >
                    <span>📁</span>
                    <span>Upload Image</span>
                  </button>

                  {/* Voice Input Button */}
                  <button
                    type="button"
                    onClick={toggleSpeechRecognition}
                    title="Speak your doubt via microphone"
                    className={`btn px-2.5 py-1 text-xs flex items-center gap-1 ${
                      isListening ? 'bg-accentRed text-paper' : 'bg-paper hover:bg-gold/20'
                    }`}
                  >
                    <span>🎤</span>
                    <span>{isListening ? 'Stop' : 'Voice'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-dim hidden sm:inline">
                    Ctrl+Enter to send
                  </span>
                  <button
                    type="button"
                    onClick={() => askTutor()}
                    disabled={loading || (!question.trim() && !attachedImage)}
                    className="btn red text-xs px-4 py-1.5 font-bold shadow-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-paper animate-ping inline-block" />
                        Solving...
                      </span>
                    ) : attachedImage ? (
                      '📸 Solve Photo Problem'
                    ) : (
                      'Ask Tutor'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Camera Live Viewfinder Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-ink/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-paper max-w-lg w-full rounded-xl border-2 border-ink shadow-sketchy p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-ink/30 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">📷</span>
                <h4 className="font-hand text-xl font-bold text-ink">
                  Capture Problem with Camera
                </h4>
              </div>
              <button
                type="button"
                onClick={closeCameraModal}
                className="btn text-xs px-2 py-0.5"
              >
                Close
              </button>
            </div>

            {cameraError ? (
              <div className="p-3 bg-[#fff1e8] rounded border border-accentRed text-xs space-y-2">
                <p className="text-accentRed font-bold">{cameraError}</p>
                <div className="flex gap-2">
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
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Framing Overlay Grid */}
                  <div className="absolute inset-4 border-2 border-dashed border-white/60 pointer-events-none rounded flex items-center justify-center">
                    <span className="bg-black/60 text-white text-[10px] font-mono px-2 py-1 rounded">
                      Align equation / problem inside frame
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={toggleCameraFacing}
                    className="btn text-xs px-2.5 py-1"
                  >
                    🔄 Switch Camera
                  </button>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="btn red text-sm font-hand font-bold px-5 py-2 shadow-sm"
                  >
                    📸 Snap Photo &amp; Attach
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Answer / Solution Card */}
      {response && (
        <div className="p-4 rounded-xl bg-[#fff9e8] border-2 border-ink shadow-sketch space-y-3.5 text-xs leading-relaxed animate-fadeIn">
          {/* Header Status Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-ink/20 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  response.isLiveAi
                    ? 'bg-amber-100 text-amber-900 border-amber-400'
                    : 'bg-paper text-dim border-ink/30'
                }`}
              >
                {response.isLiveAi ? 'Live Cloud AI (Multimodal)' : 'Offline Syllabus Grounded'}
              </span>
              {attachedImage && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accentRed/10 text-accentRed border border-accentRed/30">
                  📸 Vision Analyzed
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copySolutionToClipboard}
                className="btn text-xs px-2 py-0.5 bg-paper hover:bg-gold/20"
                title="Copy complete solution to clipboard"
              >
                {copied ? '✓ Copied!' : '📋 Copy Solution'}
              </button>
              <span className="text-[11px] text-dim font-mono">
                {response.contextUsed.subjectCode} · Unit {unitIndex + 1}
              </span>
            </div>
          </div>

          {/* Solution Body */}
          <div>
            <strong className="text-accentTeal uppercase tracking-wider block text-[11px] mb-1.5 font-mono">
              University Marking-Scheme Answer &amp; Derivation:
            </strong>
            <div className="text-sm text-ink whitespace-pre-line leading-relaxed font-sans bg-paper/60 p-3 rounded-lg border border-ink/20">
              <KatexText htmlOrText={response.answer} />
            </div>
          </div>

          {/* Key Formulas */}
          {response.formulaHighlight && response.formulaHighlight.length > 0 && (
            <div>
              <strong className="text-accentRed uppercase tracking-wider block text-[11px] mb-1 font-mono">
                Key Formulas &amp; Moves to Write on Paper:
              </strong>
              <ul className="keys space-y-1">
                {response.formulaHighlight.map((f, i) => (
                  <li key={i}>
                    <KatexText htmlOrText={f} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Step-by-Step Rubric */}
          {response.markingSchemeSteps && response.markingSchemeSteps.length > 0 && (
            <div>
              <strong className="text-ink uppercase tracking-wider block text-[11px] mb-1 font-mono">
                Step-by-Step Full-Marks Rubric:
              </strong>
              <ol className="list-decimal pl-5 space-y-1 text-dim">
                {response.markingSchemeSteps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Examiner Trap Warning */}
          {response.trapWarning && (
            <div className="p-2.5 rounded bg-[#fff1e8] border border-accentRed text-ink space-y-0.5">
              <strong className="text-accentRed font-bold font-mono text-[11px] block">
                ⚠️ EXAMINER TRAP ALERT:
              </strong>
              <p className="text-xs font-sans">{response.trapWarning}</p>
            </div>
          )}

          {/* Follow-up Prompts */}
          <div className="pt-2 border-t border-dashed border-ink/20 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-dim">Follow-up:</span>
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
                className="text-[10px] px-2 py-0.5 rounded bg-paper hover:bg-ink hover:text-paper border border-ink/30 transition font-sans"
              >
                {fu}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
