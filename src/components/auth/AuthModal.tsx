'use client';

import React, { useState, useEffect } from 'react';
import { User, LogIn, LogOut, CheckCircle2, AlertCircle, ShieldCheck, Mail, Key } from 'lucide-react';
import {
  getSupabase,
  isSupabaseConfigured,
  getCurrentUser,
  signInWithGoogle,
  signOutUser,
  onAuthStateChange,
} from '@/lib/supabaseClient';
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
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const configured = isSupabaseConfigured();

  // Load current user and listen to auth events
  useEffect(() => {
    if (!open) return;
    setStatus({ type: 'idle', message: '' });

    if (configured) {
      getCurrentUser().then(setCurrentUser).catch(() => setCurrentUser(null));
      const unsubscribe = onAuthStateChange((user) => {
        setCurrentUser(user);
        if (user && onSyncSuccess) onSyncSuccess();
      });
      return () => unsubscribe();
    }
  }, [open, configured, onSyncSuccess]);

  if (!open) return null;

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setStatus({ type: 'error', message: error.message });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Google authentication failed';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
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

    setEmailLoading(true);
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
        setStatus({ type: 'success', message: 'Signed in successfully!' });
      }
      if (onSyncSuccess) onSyncSuccess();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Authentication failed';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setEmailLoading(false);
    }
  };

  const handleSignOut = async () => {
    setEmailLoading(true);
    try {
      const { error } = await signOutUser();
      if (error) throw error;
      setCurrentUser(null);
      setStatus({ type: 'success', message: 'Signed out successfully. Study notes remain safe in local IndexedDB.' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Sign out failed';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setEmailLoading(false);
    }
  };

  const userFullName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.email?.split('@')[0] ||
    'Student';

  const userAvatar =
    currentUser?.user_metadata?.avatar_url ||
    currentUser?.user_metadata?.picture;

  const isGoogleUser =
    currentUser?.app_metadata?.provider === 'google' ||
    currentUser?.identities?.some((i) => i.provider === 'google');

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-paper rounded-xl border-2 border-ink shadow-sketchy p-5 space-y-4 font-sans text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-ink">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accentRed/10 border border-accentRed/30 flex items-center justify-center">
              <User className="w-4 h-4 text-accentRed" />
            </div>
            <div>
              <h3 id="auth-modal-title" className="font-hand text-2xl font-bold text-ink leading-tight">
                {currentUser ? 'Student Account' : 'Sign In'}
              </h3>
              <p className="text-xs text-dim font-sans">
                {currentUser ? 'Connected with Supabase' : 'Connect via Google or Email'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-ink/40 font-bold text-lg hover:bg-paper2 flex items-center justify-center transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Not Configured Notice */}
        {!configured ? (
          <div className="space-y-3">
            <div className="p-3 bg-gold/20 border border-gold rounded-lg text-xs leading-relaxed text-ink space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-sm text-ink">
                <AlertCircle className="w-4 h-4 text-accentGold" />
                <span>Supabase Configuration Notice</span>
              </div>
              <p>
                To enable Google sign-in and Supabase authentication, configure your Supabase credentials in your local <code>.env</code> file:
              </p>
              <pre className="p-2 bg-paper rounded border border-ink/20 font-mono text-[11px] overflow-x-auto select-all">
{`NEXT_PUBLIC_SUPABASE_URL="https://<your-project>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-anon-or-publishable-key>"`}
              </pre>
              <p className="text-[11px] text-ink/80 pt-1">
                <strong>Google Provider Setup:</strong> In your Supabase Dashboard, go to <em>Authentication → Providers → Google</em>, enable it, and enter your Google OAuth Client ID &amp; Secret.
              </p>
            </div>
            <p className="text-xs text-dim">
              Note: The platform is running in <strong>100% offline-first mode</strong>. All your notes, formula sheets, and study progress are stored in IndexedDB.
            </p>
          </div>
        ) : currentUser ? (
          /* Signed In View */
          <div className="space-y-4">
            <div className="box bg-paper2 p-4 rounded-xl border border-ink/30 space-y-3">
              <div className="flex items-center gap-3">
                {userAvatar ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={userAvatar}
                    alt={userFullName}
                    className="w-12 h-12 rounded-full border-2 border-ink object-cover shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accentRed text-paper font-hand text-2xl font-bold flex items-center justify-center border-2 border-ink shrink-0">
                    {userFullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-hand text-xl font-bold text-ink truncate leading-tight">
                      {userFullName}
                    </h4>
                  </div>
                  <p className="text-xs text-dim font-sans truncate">{currentUser.email}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold bg-accentGreen/15 text-accentGreen border border-accentGreen/30">
                      <ShieldCheck className="w-3 h-3" />
                      {isGoogleUser ? 'Google Account' : 'Supabase Auth'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-ink/20 flex items-center justify-between text-xs text-dim">
                <span>User ID:</span>
                <span className="font-mono text-[11px] truncate max-w-[180px]">
                  {currentUser.id}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={emailLoading}
                className="btn red flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{emailLoading ? 'Signing Out...' : 'Sign Out'}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn py-2 px-5 text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Sign In Options (Google First) */
          <div className="space-y-4">
            {/* Prominent Google Sign In Button */}
            <div>
              <button
                type="button"
                disabled={googleLoading}
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 px-4 rounded-lg border-2 border-ink bg-paper hover:bg-gold/15 transition-all flex items-center justify-center gap-3 font-semibold text-sm shadow-sketchy cursor-pointer disabled:opacity-50"
              >
                {googleLoading ? (
                  <span className="text-xs font-mono animate-pulse">Connecting to Google...</span>
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-dashed border-ink/30 w-full" />
              <span className="bg-paper px-2 text-[11px] font-mono text-dim uppercase tracking-wider relative">
                or with email
              </span>
            </div>

            {/* Email / Password Option */}
            <form onSubmit={handleEmailAuth} className="space-y-2.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold block text-ink flex items-center gap-1">
                  <Mail className="w-3 h-3 text-dim" />
                  <span>Email address</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@lnjpit.ac.in"
                  className="w-full p-2 text-xs sm:text-sm bg-paper2 border border-ink/40 rounded focus:border-ink outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold block text-ink flex items-center gap-1">
                  <Key className="w-3 h-3 text-dim" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2 text-xs sm:text-sm bg-paper2 border border-ink/40 rounded focus:border-ink outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={emailLoading}
                className="btn w-full py-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mt-1"
              >
                <LogIn className="w-4 h-4" />
                <span>{emailLoading ? 'Connecting...' : isSignUp ? 'Create Account' : 'Sign In with Email'}</span>
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
          </div>
        )}

        {/* Status notification */}
        {status.type === 'error' && (
          <div className="p-2.5 text-xs text-accentRed bg-accentRed/10 border border-accentRed/40 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="break-words">{status.message}</span>
          </div>
        )}
        {status.type === 'success' && (
          <div className="p-2.5 text-xs text-accentGreen bg-accentGreen/10 border border-accentGreen/40 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="break-words">{status.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
