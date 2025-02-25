import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status } = await req.json();

    const orderRef = adminDb.collection('orders').doc(id);
    await orderRef.update({
      status,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true,
      message: `Order ${id} status updated to ${status}`
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update status' },
      { status: 500 }
    );
  }
} 