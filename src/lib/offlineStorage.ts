'use client';

export interface PersistedStudyState {
  done: Record<string, number>;
  exam: string;
  lab: 'G1' | 'G2';
  at: [number, number];
  tab: number;
  customNotes: Record<string, string>;
  flashcards: Record<string, { ease: number; interval: number; reps: number; lastRating: string }>;
}

const DB_NAME = 'lnjpit-semester1-pwa-db';
const STORE_NAME = 'user_state';
const LOCAL_KEY = 'semester-taken-apart-v1';

export const DEFAULT_STUDY_STATE: PersistedStudyState = {
  done: {},
  exam: '',
  lab: 'G1',
  at: [0, 0],
  tab: 0,
  customNotes: {},
  flashcards: {},
};

function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      return reject(new Error('IndexedDB unavailable'));
    }
    const req = window.indexedDB.open(DB_NAME, 1);
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

export async function loadStudyState(): Promise<PersistedStudyState> {
  // 1. Try IndexedDB first
  try {
    const db = await openIndexedDB();
    const idbData = await new Promise<PersistedStudyState | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get('root');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    if (idbData) return { ...DEFAULT_STUDY_STATE, ...idbData };
  } catch {
    // Fallback to localStorage
  }

  // 2. Fallback to localStorage key 'semester-taken-apart-v1' for backwards compatibility
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STUDY_STATE, ...parsed };
    }
  } catch {
    // Ignore storage errors
  }

  return DEFAULT_STUDY_STATE;
}

export async function saveStudyStateOptimistic(next: PersistedStudyState): Promise<void> {
  // 1. Immediate synchronous localStorage write
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
  } catch {
    // Ignore
  }

  // 2. Asynchronous IndexedDB write for offline PWA persistence
  try {
    const db = await openIndexedDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(next, 'root');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Ignore
  }

  // 3. Background sync to Next.js /api/progress Prisma SQLite backend
  try {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next),
    });
  } catch {
    // Offline mode: state is already safely persisted in IndexedDB
  }
}
