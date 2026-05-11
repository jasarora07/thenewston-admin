import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Force the landing page to the suite
  const next = searchParams.get('next') ?? '/calculate-financials'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (error) {
              // This can be ignored if the middleware is also handling cookies
            }
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // SUCCESS: The session is established.
      // We use origin + next to ensure the redirect stays on your domain.
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // FAIL: If code is missing or exchange fails, go to gate with error
  return NextResponse.redirect(`${origin}/auth/gate?error=Verification Handshake Failed`)
}
