'use client';

import React, { useEffect, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';

export const ServiceWorkerRegistration: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      const registerSW = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            // Check if there is already a waiting worker
            if (registration.waiting) {
              setWaitingWorker(registration.waiting);
              setUpdateAvailable(true);
            }

            // Listen for new service worker installation
            registration.addEventListener('updatefound', () => {
              const installingWorker = registration.installing;
              if (!installingWorker) return;

              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setWaitingWorker(installingWorker);
                  setUpdateAvailable(true);
                }
              });
            });
          })
          .catch((error) => {
            console.warn('[PWA] Service worker registration failed:', error);
          });
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
        return () => window.removeEventListener('load', registerSW);
      }
    }
  }, []);

  const handleApplyUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  };

  if (!updateAvailable) return null;

  return (
    <aside
      role="alert"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[9999] max-w-sm bg-paper2 border-2 border-ink rounded-lg p-3 shadow-sketchy flex items-center justify-between gap-3 text-ink text-sm font-sans"
    >
      <div className="flex items-center gap-2">
        <RefreshCw className="w-4 h-4 text-accentRed animate-spin shrink-0" />
        <span className="leading-snug">
          <strong>Update available!</strong> Reload to apply latest notebook changes.
        </span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleApplyUpdate}
          className="px-2.5 py-1 text-xs font-bold font-mono bg-ink text-paper rounded hover:bg-ink/80 transition-colors shadow-xs"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => setUpdateAvailable(false)}
          aria-label="Dismiss update notification"
          className="p-1 text-dim hover:text-ink rounded hover:bg-ink/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
