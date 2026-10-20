'use client';

import { useEffect, useRef } from 'react';

export function useModalA11y(open: boolean, onClose: () => void) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Save active element for focus restoration upon modal close
    if (typeof document !== 'undefined') {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Global Escape key closes the active modal
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      // 2. Tab trap inside dialog
      if (e.key === 'Tab' && modalRef.current) {
        const focusableSelectors = [
          'a[href]',
          'button:not([disabled])',
          'textarea:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ].join(', ');

        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
        ).filter((el) => el.offsetParent !== null || el.getClientRects().length > 0);

        if (focusableElementsLength(focusables) === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === modalRef.current) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus into modal
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = Array.from(focusables).find(
          (el) => el.offsetParent !== null || el.getClientRects().length > 0
        );
        if (first) {
          first.focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 40);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        // Small delay to ensure modal unmounted before restoring focus
        setTimeout(() => {
          try {
            previousFocusRef.current?.focus();
          } catch {
            // Ignore if element is no longer in DOM
          }
        }, 10);
      }
    };
  }, [open, onClose]);

  return modalRef;
}

function focusableElementsLength(arr: HTMLElement[]): number {
  return arr.length;
}
