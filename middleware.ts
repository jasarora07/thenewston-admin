import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if you are trying to access the maintenance page itself to avoid a loop
  if (request.nextUrl.pathname === '/maintenance') {
    return NextResponse.next()
  }

  // Redirect everyone to the maintenance page
  return NextResponse.redirect(new URL('/maintenance', request.url))
}

// Only run this on your main pages
export const config = {
  matcher: ['/', '/economy', '/markets', '/stocks', '/crypto'],
}
