import { NextResponse } from 'next/server';
import { adminDb } from '@/src/lib/firebase-admin';
import { createBylInvoice } from '@/lib/api/byl';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { service, package: pkg, username } = body;

    // Create order in Firebase
    const orderRef = adminDb.collection('orders').doc();
    const order = {
      id: orderRef.id,
      service,
      amount: pkg.amount,
      price: pkg.price,
      username,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await orderRef.set(order);

    // Create byl.mn invoice
    const bylInvoice = await createBylInvoice({
      amount: pkg.price,
      orderId: order.id,
      description: `${pkg.amount} ${service === 'followers' ? 'Дагагч' : 'Лайк'} - ${username}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/byl/callback`
    });

    // Update order with payment ID
    await orderRef.update({
      bylPaymentId: bylInvoice.id
    });

    return NextResponse.json({
      success: true,
      paymentUrl: bylInvoice.paymentUrl,
      orderId: order.id
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Order creation failed' },
      { status: 500 }
    );
  }
} 