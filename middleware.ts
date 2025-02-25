import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/utils/jwt';

export const config = {
  matcher: ['/admin/:path*'],
  runtime: 'nodejs'
};

export async function middleware(request: NextRequest) {
  try {
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPath = request.nextUrl.pathname === '/admin/login';
    const token = request.cookies.get('admin_token')?.value;

    if (isAdminPath) {
      if (isLoginPath) {
        if (token) {
          const verified = verifyToken(token);
          if (verified) {
            return NextResponse.redirect(new URL('/admin', request.url));
          }
        }
        return NextResponse.next();
      }

      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      const verified = verifyToken(token);
      if (verified) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
} 