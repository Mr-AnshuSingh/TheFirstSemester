import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';
  const errorDescription = requestUrl.searchParams.get('error_description');

  if (errorDescription) {
    console.error('Supabase auth callback received error:', errorDescription);
    return NextResponse.redirect(new URL(`/?auth_error=${encodeURIComponent(errorDescription)}`, request.url));
  }

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      '';

    if (supabaseUrl && supabaseAnonKey) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      let redirectUrl = new URL(next, request.url);
      if (forwardedHost && !isLocalEnv) {
        redirectUrl = new URL(next, `https://${forwardedHost}`);
      }

      const response = NextResponse.redirect(redirectUrl);
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      });

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return response;
      }
      console.error('Supabase code exchange error:', error.message);
      return NextResponse.redirect(new URL(`/?auth_error=${encodeURIComponent(error.message)}`, request.url));
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
}
