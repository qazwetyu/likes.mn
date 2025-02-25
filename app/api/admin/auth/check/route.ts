import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/utils/jwt';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const token = cookies().get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const verified = verifyToken(token);
    return NextResponse.json({ 
      isAuthenticated: Boolean(verified) 
    });

  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
} 