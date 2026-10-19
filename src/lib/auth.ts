import { NextRequest } from 'next/server';

export interface AuthenticatedUser {
  userId: string;
  email?: string;
  provider?: string;
}

/**
 * Checks whether server-side authentication (Supabase Auth) is configured in the environment.
 * If credentials are not provided, the API runs in local-first mode and returns 501.
 */
export function isAuthConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  return Boolean(url && key && url.trim().length > 0 && key.trim().length > 0);
}

/**
 * Extracts the bearer token or auth cookie from the incoming HTTP request.
 */
export function extractAuthToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token) return token;
  }

  // Check Supabase session cookies
  const cookieToken =
    req.cookies.get('sb-access-token')?.value ||
    req.cookies.get('supabase-auth-token')?.value;

  if (cookieToken) return cookieToken;

  return null;
}

/**
 * Verifies the incoming request and returns the authenticated user object.
 * Returns null if authentication is missing or invalid.
 */
export async function getAuthenticatedUser(
  req: NextRequest
): Promise<AuthenticatedUser | null> {
  // Support safe test mocking during CI / local test execution
  if (process.env.NODE_ENV === 'test' || process.env.ALLOW_TEST_AUTH === 'true') {
    const testUserId = req.headers.get('x-test-user-id');
    if (testUserId && testUserId.trim().length > 0) {
      return { userId: testUserId.trim(), email: 'test@student.lnjpit.ac.in', provider: 'test' };
    }
  }

  if (!isAuthConfigured()) {
    return null;
  }

  const token = extractAuthToken(req);
  if (!token) {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  try {
    const cleanUrl = supabaseUrl.replace(/\/+$/, '');
    const res = await fetch(`${cleanUrl}/auth/v1/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseKey,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const userData = (await res.json()) as { id?: string; email?: string; app_metadata?: { provider?: string } };
    if (!userData || !userData.id) {
      return null;
    }

    return {
      userId: userData.id,
      email: userData.email,
      provider: userData.app_metadata?.provider || 'supabase',
    };
  } catch (err) {
    console.error('Error verifying Supabase authentication token:', err);
    return null;
  }
}
