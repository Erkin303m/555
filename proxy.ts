import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/admin/dashboard', '/admin/add', '/admin/edit']

export function proxy(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value === 'authenticated'
  const { pathname } = request.nextUrl

  if (protectedPaths.some(p => pathname.startsWith(p))) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  if (pathname === '/admin' && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
