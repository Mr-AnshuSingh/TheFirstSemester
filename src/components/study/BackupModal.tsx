'use client';

import React, { useState, useRef } from 'react';
import { Download, Copy, Check, FolderOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  PersistedStudyState,
  CURRENT_STORAGE_VERSION,
  isServerSyncEnabled,
  downloadStudyStateBackup,
  exportStudyStateAsJSON,
  validateAndParseImportJSON,
} from '@/lib/offlineStorage';
import { useModalA11y } from './useModalA11y';

interface BackupModalProps {
  open: boolean;
  onClose: () => void;
  currentState: PersistedStudyState;
  onImportState: (newState: PersistedStudyState) => void;
  onResetState: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  open,
  onClose,
  currentState,
  onImportState,
  onResetState,
}) => {
  const modalRef = useModalA11y(open, onClose);
  const [importText, setImportText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
    previewData?: PersistedStudyState;
  }>({ type: 'idle', message: '' });
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!open) return null;

  const totalCleared = Object.keys(currentState.done || {}).length;
  const totalNotes = Object.keys(currentState.customNotes || {}).length;
  const totalCards = Object.keys(currentState.flashcards || {}).length;

  const handleCopyJSON = async () => {
    try {
      const json = exportStudyStateAsJSON(currentState);
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      setImportText(text);
      validateInputText(text);
    };
    reader.readAsText(file);
  };

  const validateInputText = (text: string) => {
    const result = validateAndParseImportJSON(text);
    if (!result.valid || !result.data) {
      setImportStatus({
        type: 'error',
        message: result.error || 'Failed to validate JSON backup file.',
      });
    } else {
      const cleared = Object.keys(result.data.done || {}).length;
      const notes = Object.keys(result.data.customNotes || {}).length;
      setImportStatus({
        type: 'success',
        message: `Valid backup detected: ${cleared} topics cleared, ${notes} unit notes. Click "Apply Import" to restore.`,
        previewData: result.data,
      });
    }
  };

  const handleApplyImport = () => {
    if (importStatus.previewData) {
      onImportState(importStatus.previewData);
      setImportStatus({
        type: 'success',
        message: 'Backup successfully restored to IndexedDB and memory!',
      });
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="backup-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-paper rounded-xl border-2 border-ink shadow-sketchy p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-ink">
          <div>
            <h3 id="backup-modal-title" className="font-hand text-2xl font-bold text-ink">
              Study Data &amp; Persistence Hub
            </h3>
            <p className="text-xs text-dim font-mono">
              IndexedDB Primary · LocalStorage Fallback · Schema v{CURRENT_STORAGE_VERSION}
            </p>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-ink/40 font-bold text-lg hover:bg-paper2"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Current State Diagnostics Bar */}
        <div className="box bg-paper2 p-3 rounded-lg border-[1.5px] border-ink space-y-1.5 text-xs font-mono">
          <div className="flex justify-between items-center text-ink/90 font-bold border-b border-ink/10 pb-1">
            <span>STORAGE HEALTH &amp; ENGINE</span>
            <span className="text-xs px-2 py-0.5 rounded bg-accentGreen/20 text-accentGreen border border-accentGreen/40 font-semibold">
              {isServerSyncEnabled() ? 'Server Sync Enabled' : '100% Local-First Offline Mode'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1 font-sans">
            <div className="p-1.5 rounded border border-ink/20 bg-paper">
              <span className="text-lg font-hand font-bold block">{totalCleared}</span>
              <span className="text-xs text-dim">Topics Cleared</span>
            </div>
            <div className="p-1.5 rounded border border-ink/20 bg-paper">
              <span className="text-lg font-hand font-bold block">{totalNotes}</span>
              <span className="text-xs text-dim">Custom Notes</span>
            </div>
            <div className="p-1.5 rounded border border-ink/20 bg-paper">
              <span className="text-lg font-hand font-bold block">{totalCards}</span>
              <span className="text-xs text-dim">Cards Reviewed</span>
            </div>
          </div>
        </div>

        {/* Section 1: Export Backup */}
        <div className="space-y-2">
          <h4 className="font-hand text-lg font-bold text-accentRed">1. Export &amp; Backup Progress</h4>
          <p className="text-sm text-ink/80 leading-relaxed font-sans">
            Download your full study history, flashcards, confidence ratings, and custom notes as a portable JSON file.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn flex-1 py-2 font-sans text-sm font-semibold flex items-center justify-center gap-2"
              onClick={() => downloadStudyStateBackup(currentState)}
            >
              <Download className="w-4 h-4" />
              <span>Download Backup (.json)</span>
            </button>
            <button
              type="button"
              className="btn py-2 px-3 text-xs font-mono flex items-center gap-1.5"
              onClick={handleCopyJSON}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accentGreen" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-dim" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section 2: Import Backup */}
        <div className="space-y-2 pt-2 border-t border-dashed border-ink/30">
          <h4 className="font-hand text-lg font-bold text-accentGreen">2. Restore / Import Progress</h4>
          <p className="text-sm text-ink/80 leading-relaxed font-sans">
            Upload a previously exported backup file or paste JSON content directly. All data will be validated against schema v{CURRENT_STORAGE_VERSION} and migrated.
          </p>

          <input
            type="file"
            ref={fileInputRef}
            accept=".json,application/json"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="btn text-xs font-mono py-1.5 flex items-center gap-1.5"
              onClick={() => fileInputRef.current?.click()}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Browse File...</span>
            </button>
            <span className="text-sm text-dim self-center">or paste JSON below:</span>
          </div>

          <textarea
            rows={4}
            value={importText}
            onChange={(e) => {
              setImportText(e.target.value);
              validateInputText(e.target.value);
            }}
            placeholder="Paste your JSON backup payload here..."
            className="w-full p-2 text-sm font-mono bg-paper border border-ink/40 rounded focus:border-ink outline-none"
          />

          {importStatus.type === 'error' && (
            <div className="p-2.5 text-sm text-accentRed bg-accentRed/10 border border-accentRed/40 rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{importStatus.message}</span>
            </div>
          )}

          {importStatus.type === 'success' && (
            <div className="p-2.5 text-sm text-accentGreen bg-accentGreen/10 border border-accentGreen/40 rounded flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{importStatus.message}</span>
              </div>
              {importStatus.previewData && (
                <button
                  type="button"
                  className="btn red text-xs font-bold py-1 px-3 shrink-0"
                  onClick={handleApplyImport}
                >
                  Apply Import
                </button>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Reset Storage Option */}
        <div className="pt-2 border-t border-dashed border-ink/30 flex items-center justify-between">
          <span className="text-xs text-dim font-sans">
            Need a clean slate for next semester?
          </span>
          <button
            type="button"
            className="text-xs text-accentRed hover:underline font-mono font-semibold"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all study progress? This will clear all checked topics and notes from IndexedDB.')) {
                onResetState();
                onClose();
              }
            }}
          >
            Reset All Local Data
          </button>
        </div>
      </div>
    </div>
  );
};
