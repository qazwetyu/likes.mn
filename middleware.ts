import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export const config = {
  matcher: ['/admin/:path*'],
  runtime: 'nodejs'
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request: NextRequest) {
  try {
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPath = request.nextUrl.pathname === '/admin/login';
    const token = request.cookies.get('admin_token')?.value;

    if (isAdminPath) {
      if (isLoginPath) {
        if (token) {
          try {
            verify(token, JWT_SECRET);
            return NextResponse.redirect(new URL('/admin', request.url));
          } catch {
            return NextResponse.next();
          }
        }
        return NextResponse.next();
      }

      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      try {
        verify(token, JWT_SECRET);
        return NextResponse.next();
      } catch {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
} 