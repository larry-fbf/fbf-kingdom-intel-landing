import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Match case explicitly: config redirects/matchers can be case-insensitive.
  // Never redirect /vip to itself or alter nested VIP/payment/API routes.
  if (request.nextUrl.pathname === '/VIP' || request.nextUrl.pathname === '/VIP/') {
    const destination = request.nextUrl.clone();
    destination.pathname = '/vip';
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/VIP'] };
