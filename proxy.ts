import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const orgId = request.headers.get('x-org-id') || request.cookies.get('orgId')?.value || 'default-org-id';
  
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-org-id', orgId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
  ],
};
