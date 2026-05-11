import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // This "next" parameter is key! 
  // It tells the route where to send the user after they are verified.
  // For password resets, it will be "/auth/update-password"
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    
    // Exchange the temporary code for a permanent session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Success! Send them to the intended page
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If something goes wrong, send them to an error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
