import { NextRequest, NextResponse } from 'next/server';

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthPage = path === '/login' || path === '/register';

  // NextAuth v5 sets session cookie with these names
  const sessionToken =
    req.cookies.get('authjs.session-token') ||
    req.cookies.get('__Secure-authjs.session-token');

  if (!sessionToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
