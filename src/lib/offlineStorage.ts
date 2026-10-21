import { FlashcardProgress, ConfidenceLevel } from '@/types/syllabus';

export const CURRENT_STORAGE_VERSION = 2;

export interface UnitViewState {
  mode: '3d' | '2d';
  step: number;
  camera: { yaw: number; pitch: number; zoom: number };
  sliderValues: Record<string, number>;
  diagramIndex: number;
}

export interface PersistedStudyState {
  version: number;
  done: Record<string, number>;
  confidence: Record<string, ConfidenceLevel>;
  weakSpots: Record<string, number>;
  exam: string;
  lab: 'G1' | 'G2';
  at: [number, number];
  tab: number;
  customNotes: Record<string, string>;
  flashcards: Record<string, FlashcardProgress>;
  unitViews?: Record<string, UnitViewState>;
  batterySaver?: boolean;
  lastMode?: '3d' | '2d';
  lastSavedAt?: string;
}

const DB_NAME = 'lnjpit-semester1-pwa-db';
const STORE_NAME = 'user_state';
const LOCAL_KEY = 'semester-taken-apart-v1';

export const DEFAULT_STUDY_STATE: PersistedStudyState = {
  version: CURRENT_STORAGE_VERSION,
  done: {},
  confidence: {},
  weakSpots: {},
  exam: '',
  lab: 'G1',
  at: [0, 0],
  tab: 0,
  customNotes: {},
  flashcards: {},
  unitViews: {},
  batterySaver: false,
  lastMode: '3d',
};

/**
 * Checks whether server synchronization is configured and enabled.
 * If no auth is configured, the app runs fully local-first and avoids network calls to /api/progress.
 */
export function isServerSyncEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const hasAuth = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const syncExplicit = process.env.NEXT_PUBLIC_ENABLE_SERVER_SYNC === 'true';
  return hasAuth || syncExplicit;
}

/**
 * Migrates arbitrary state objects from prior versions (or legacy unversioned data)
 * to CURRENT_STORAGE_VERSION with guaranteed structural integrity.
 */
export function migrateStudyState(raw: unknown): PersistedStudyState {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_STUDY_STATE, version: CURRENT_STORAGE_VERSION };
  }

  const obj = raw as Record<string, unknown>;
  const currentVer = typeof obj.version === 'number' ? obj.version : 1;
  const migrated: Record<string, unknown> = { ...obj };

  if (currentVer < 2) {
    migrated.version = CURRENT_STORAGE_VERSION;
    migrated.done = typeof obj.done === 'object' && obj.done !== null ? obj.done : {};
    migrated.confidence = typeof obj.confidence === 'object' && obj.confidence !== null ? obj.confidence : {};
    migrated.weakSpots = typeof obj.weakSpots === 'object' && obj.weakSpots !== null ? obj.weakSpots : {};
    migrated.customNotes = typeof obj.customNotes === 'object' && obj.customNotes !== null ? obj.customNotes : {};
    migrated.flashcards = typeof obj.flashcards === 'object' && obj.flashcards !== null ? obj.flashcards : {};
    migrated.lab = obj.lab === 'G2' ? 'G2' : 'G1';
    migrated.exam = typeof obj.exam === 'string' ? obj.exam : '';
    migrated.at = Array.isArray(obj.at) && obj.at.length === 2
      ? [Math.max(0, Number(obj.at[0]) || 0), Math.max(0, Number(obj.at[1]) || 0)]
      : [0, 0];
    migrated.tab = typeof obj.tab === 'number' ? Math.max(0, Math.min(5, obj.tab)) : 0;
  }

  // Clean confidence levels (strictly 0, 1, or 2)
  if (migrated.confidence && typeof migrated.confidence === 'object') {
    const cleanConf: Record<string, ConfidenceLevel> = {};
    for (const [k, v] of Object.entries(migrated.confidence as Record<string, unknown>)) {
      if (v === 1 || v === 2) {
        cleanConf[k] = v as ConfidenceLevel;
      }
    }
    migrated.confidence = cleanConf;
  }

  // Sanitize unitViews & batterySaver & lastMode
  migrated.unitViews = typeof obj.unitViews === 'object' && obj.unitViews !== null ? obj.unitViews : {};
  migrated.batterySaver = Boolean(obj.batterySaver);
  migrated.lastMode = obj.lastMode === '2d' || obj.lastMode === '3d' ? obj.lastMode : '3d';

  return {
    ...DEFAULT_STUDY_STATE,
    ...(migrated as unknown as PersistedStudyState),
    version: CURRENT_STORAGE_VERSION,
  };
}

function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return reject(new Error('IndexedDB unavailable'));
    }
    const req = window.indexedDB.open(DB_NAME, 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Loads study state prioritizing IndexedDB as the primary store,
 * falling back to localStorage if IndexedDB is empty or inaccessible.
 */
export async function loadStudyState(): Promise<PersistedStudyState> {
  // 1. Try IndexedDB as primary store
  try {
    const db = await openIndexedDB();
    const idbData = await new Promise<unknown>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get('root');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    if (idbData) {
      const migrated = migrateStudyState(idbData);
      // Synchronize to localStorage as instant cache
      try {
        window.localStorage.setItem(LOCAL_KEY, JSON.stringify(migrated));
      } catch {
        // Ignore cache write error
      }
      return migrated;
    }
  } catch {
    // IndexedDB failed or unavailable, proceed to localStorage fallback
  }

  // 2. Fallback to localStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const migrated = migrateStudyState(parsed);
        // Persist migrated state to IndexedDB for future runs
        try {
          const db = await openIndexedDB();
          const tx = db.transaction(STORE_NAME, 'readwrite');
          tx.objectStore(STORE_NAME).put(migrated, 'root');
        } catch {
          // Ignore
        }
        return migrated;
      }
    }
  } catch {
    // Ignore storage parse errors
  }

  return DEFAULT_STUDY_STATE;
}

/**
 * Persists study state to IndexedDB (primary) and localStorage (fallback).
 * Optionally syncs with /api/progress if and only if server sync/auth is configured.
 */
export async function saveStudyState(next: PersistedStudyState): Promise<void> {
  const payload: PersistedStudyState = {
    ...next,
    version: CURRENT_STORAGE_VERSION,
    lastSavedAt: new Date().toISOString(),
  };

  // 1. IndexedDB write (Primary Store)
  try {
    const db = await openIndexedDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(payload, 'root');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Fallback continues
  }

  // 2. localStorage write (Synchronous fallback)
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(payload));
    }
  } catch {
    // Ignore storage quote errors
  }

  // 3. Conditional server sync (ONLY if auth/server sync is explicitly configured)
  if (isServerSyncEnabled()) {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Offline/local-first: state safely saved in IndexedDB & localStorage
    }
  }
}

// Backward-compatible alias for existing imports
export const saveStudyStateOptimistic = saveStudyState;

/* ---------- JSON Export / Import with Schema Validation ---------- */

export interface BackupExportPackage {
  app: string;
  schemaVersion: number;
  exportedAt: string;
  totalTopicsCleared: number;
  payload: PersistedStudyState;
}

/**
 * Serializes the study state into an exportable JSON package with metadata.
 */
export function exportStudyStateAsJSON(state: PersistedStudyState): string {
  const pkg: BackupExportPackage = {
    app: 'LNJPIT Semester I Study App (Mathematics & Computing)',
    schemaVersion: CURRENT_STORAGE_VERSION,
    exportedAt: new Date().toISOString(),
    totalTopicsCleared: Object.keys(state.done || {}).length,
    payload: {
      ...state,
      version: CURRENT_STORAGE_VERSION,
    },
  };
  return JSON.stringify(pkg, null, 2);
}

/**
 * Triggers a client-side download of the study state as a JSON file.
 */
export function downloadStudyStateBackup(state: PersistedStudyState): void {
  const jsonStr = exportStudyStateAsJSON(state);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `lnjpit-semester1-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Validates and parses an imported JSON string into a valid PersistedStudyState.
 */
export function validateAndParseImportJSON(rawText: string): {
  valid: boolean;
  data?: PersistedStudyState;
  error?: string;
} {
  if (!rawText || !rawText.trim()) {
    return { valid: false, error: 'Empty JSON input' };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch (err) {
    return { valid: false, error: `Invalid JSON syntax: ${String(err)}` };
  }

  if (!parsed || typeof parsed !== 'object') {
    return { valid: false, error: 'Imported payload must be an object' };
  }

  const obj = parsed as Record<string, unknown>;

  // Check if it's wrapped in a BackupExportPackage or is raw PersistedStudyState
  const candidate = (obj.payload && typeof obj.payload === 'object' ? obj.payload : obj) as Record<string, unknown>;

  // Validate essential properties
  if (candidate.done !== undefined && (typeof candidate.done !== 'object' || candidate.done === null)) {
    return { valid: false, error: 'Field "done" must be a key-value record' };
  }
  if (candidate.confidence !== undefined && (typeof candidate.confidence !== 'object' || candidate.confidence === null)) {
    return { valid: false, error: 'Field "confidence" must be a key-value record' };
  }

  const sanitized = migrateStudyState(candidate);
  return { valid: true, data: sanitized };
}
