// pages/_middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip middleware for static files
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    return NextResponse.next();
  }

  const hasPaid = request?.cookies?.get('hasPaid');
  if (!hasPaid && !request.nextUrl.pathname.startsWith('/payment')) {
    return NextResponse.redirect(new URL('/payment', request.url));
  }

  return NextResponse.next();
}
