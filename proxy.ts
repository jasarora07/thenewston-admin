import { createServerClient, type NextRequest } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // --- PROTECTED ROUTES LOGIC ---
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/calculate-financials') ||
    request.nextUrl.pathname.startsWith('/auth/update-password');

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/gate', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/calculate-financials/:path*',
    '/auth/update-password/:path*'
  ],
}
