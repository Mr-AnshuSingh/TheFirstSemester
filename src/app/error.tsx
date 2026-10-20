'use client';

import React, { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log unexpected client-side runtime errors
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-paper2 border-2 border-ink rounded-xl p-8 shadow-sketchy space-y-4">
        <span className="font-mono text-sm font-bold uppercase tracking-wider text-accentRed block">
          Error · Something Went Wrong
        </span>
        <h1 className="font-hand text-3xl font-bold text-ink">
          Study Session Interrupted
        </h1>
        <p className="font-sans text-sm text-ink/80 leading-relaxed">
          An unexpected error occurred while rendering the 3D scene or study notes. Your progress is saved locally.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-2.5 bg-accentRed text-paper border-2 border-ink rounded-lg font-hand text-lg font-bold hover:bg-accentRed/90 transition-colors shadow-sketch"
          >
            Try Again
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-paper text-ink border-2 border-ink rounded-lg font-hand text-lg font-bold hover:bg-gold/20 transition-colors shadow-sketch"
          >
            Reload Notebook
          </button>
        </div>
      </div>
    </main>
  );
}
