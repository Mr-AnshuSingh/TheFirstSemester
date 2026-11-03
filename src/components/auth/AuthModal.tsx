'use client';

import React, { useState, useEffect } from 'react';
import { User, LogIn, LogOut, RefreshCw, CheckCircle2, AlertCircle, Cloud, ShieldCheck } from 'lucide-react';
import { getSupabase, isSupabaseConfigured, getCurrentUser } from '@/lib/supabaseClient';
import { useModalA11y } from '@/components/study/useModalA11y';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSyncSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onSyncSuccess }) => {
  const modalRef = useModalA11y(open, onClose);
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!open) return;
    setStatus({ type: 'idle', message: '' });

    if (configured) {
      getCurrentUser().then(setCurrentUser).catch(() => setCurrentUser(null));
    }
  }, [open, configured]);

  if (!open) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus({ type: 'error', message: 'Please enter both email and password.' });
      return;
    }

    const sb = getSupabase();
    if (!sb) {
      setStatus({ type: 'error', message: 'Supabase credentials are not configured in .env' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      if (isSignUp) {
        const { data, error } = await sb.auth.signUp({ email, password });
        if (error) throw error;
        setCurrentUser(data.user);
        setStatus({
          type: 'success',
          message: data.session ? 'Account created and signed in!' : 'Verification email sent. Please check your inbox.',
        });
      } else {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setCurrentUser(data.user);
        setStatus({ type: 'success', message: 'Signed in successfully! Cloud sync is active.' });
      }
      if (onSyncSuccess) onSyncSuccess();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Authentication failed';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const sb = getSupabase();
    if (!sb) return;
    setLoading(true);
    try {
      await sb.auth.signOut();
      setCurrentUser(null);
      setStatus({ type: 'success', message: 'Signed out. Study progress remains safely in your local IndexedDB.' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Sign out failed';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleManualSync = async () => {
    setSyncing(true);
    setStatus({ type: 'idle', message: '' });
    try {
      const sb = getSupabase();
      const token = (await sb?.auth.getSession())?.data.session?.access_token;
      if (!token) throw new Error('No active session token');

      const res = await fetch('/api/progress', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      setStatus({ type: 'success', message: 'Cloud progress synchronized with local study database!' });
      if (onSyncSuccess) onSyncSuccess();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Sync failed';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-paper rounded-xl border-2 border-ink shadow-sketchy p-5 space-y-4 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-ink">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-accentTeal" />
            <h3 id="auth-modal-title" className="font-hand text-2xl font-bold text-ink">
              Supabase Cloud Sync
            </h3>
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

        {/* Not Configured State */}
        {!configured ? (
          <div className="space-y-3">
            <div className="p-3 bg-gold/20 border border-gold rounded-lg text-xs leading-relaxed text-ink space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-sm text-ink">
                <AlertCircle className="w-4 h-4 text-accentGold" />
                <span>Supabase Keys Needed</span>
              </div>
              <p>
                To enable multi-device sync and PostgreSQL backups, add your Supabase credentials to your local <code>.env</code> file:
              </p>
              <pre className="p-2 bg-paper rounded border border-ink/20 font-mono text-[11px] overflow-x-auto select-all">
{`NEXT_PUBLIC_SUPABASE_URL=https://btmpmaidqhmbaqmxbpfj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-or-publishable-key
DATABASE_URL="postgresql://postgres.[ref]:[pass]@aws-0-...pooler.supabase.com:6543/postgres"`}
              </pre>
            </div>
            <p className="text-xs text-dim">
              Note: The platform is currently running in <strong>100% offline-first mode</strong>. All your notes, topic progress, and formulas are fully functional in IndexedDB!
            </p>
          </div>
        ) : currentUser ? (
          /* Logged In State */
          <div className="space-y-4">
            <div className="box bg-paper2 p-3.5 rounded-lg border border-ink/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-accentGreen font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Connected &amp; Synchronized</span>
              </div>
              <div className="font-mono text-ink">
                <strong>User:</strong> {currentUser.email}
              </div>
              <div className="text-dim text-[11px]">
                ID: {currentUser.id.slice(0, 12)}...
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleManualSync}
                disabled={syncing}
                className="btn flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="btn red py-2 px-3 text-xs font-semibold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <form onSubmit={handleAuth} className="space-y-3">
            <p className="text-xs text-ink/80 leading-relaxed">
              Sign in to sync your LNJPIT study progress, weak spots, and notes across all your phones and laptops.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-semibold block text-ink">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@lnjpit.ac.in"
                className="w-full p-2 text-sm bg-paper border border-ink/40 rounded focus:border-ink outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold block text-ink">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2 text-sm bg-paper border border-ink/40 rounded focus:border-ink outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full py-2.5 text-sm font-bold flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Connecting...' : isSignUp ? 'Create Supabase Account' : 'Sign In & Sync'}</span>
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setStatus({ type: 'idle', message: '' });
                }}
                className="text-xs text-accentTeal hover:underline font-medium"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </form>
        )}

        {/* Status notification */}
        {status.type === 'error' && (
          <div className="p-2.5 text-xs text-accentRed bg-accentRed/10 border border-accentRed/40 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{status.message}</span>
          </div>
        )}
        {status.type === 'success' && (
          <div className="p-2.5 text-xs text-accentGreen bg-accentGreen/10 border border-accentGreen/40 rounded flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{status.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

