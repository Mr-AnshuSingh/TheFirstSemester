'use client';

import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient, User } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

/**
 * Checks whether Supabase project URL and anon/publishable key are configured in environment variables.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  return Boolean(url && key && url.trim().length > 0 && key.trim().length > 0);
}

/**
 * Returns the browser-side Supabase client singleton using @supabase/ssr.
 * Cookies are automatically synchronized with Server Components and middleware.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(url, key);
  }

  return supabaseInstance;
}

/**
 * Initiates Google OAuth Sign In through Supabase.
 * Redirects the user to Google OAuth consent screen and returns to /auth/callback.
 */
export async function signInWithGoogle(): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (!sb) {
    return {
      error: new Error(
        'Supabase credentials are not configured. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
      ),
    };
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  return { error: error ? new Error(error.message) : null };
}

/**
 * Retrieves the currently authenticated Supabase user.
 */
export async function getCurrentUser(): Promise<User | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.auth.getUser();
    if (error || !data.user) return null;
    return data.user;
  } catch {
    return null;
  }
}

/**
 * Signs the user in anonymously (instant 1-click access directly through Supabase with no external provider).
 */
export async function signInAnonymously(): Promise<{ error: Error | null; user?: User | null }> {
  const sb = getSupabase();
  if (!sb) {
    return {
      error: new Error(
        'Supabase credentials are not configured. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
      ),
    };
  }

  const { data, error } = await sb.auth.signInAnonymously();
  return {
    error: error ? new Error(error.message) : null,
    user: data?.user ?? null,
  };
}

/**
 * Signs the user out from Supabase Auth and clears session cookies.
 */
export async function signOutUser(): Promise<{ error: Error | null }> {
  const sb = getSupabase();
  if (!sb) return { error: null };
  const { error } = await sb.auth.signOut();
  return { error: error ? new Error(error.message) : null };
}

/**
 * Retrieves the active session access token for authenticated API requests.
 */
export async function getSessionToken(): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data } = await sb.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

/**
 * Subscribes to Supabase authentication state changes (sign in, sign out, token refresh).
 * Returns an unsubscribe teardown function.
 */
export function onAuthStateChange(callback: (user: User | null) => void): () => void {
  const sb = getSupabase();
  if (!sb) return () => {};

  const {
    data: { subscription },
  } = sb.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}
