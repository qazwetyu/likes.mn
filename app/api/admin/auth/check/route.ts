import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    const token = cookies().get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    verify(token, JWT_SECRET);
    return NextResponse.json({ isAuthenticated: true });

  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
} 