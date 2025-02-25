import { NextResponse } from 'next/server';
import { adminDb } from '@/src/lib/firebase-admin';
import { createNotification } from '@/src/lib/services/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, status } = body;

    // Verify webhook signature (implement based on SMM Raja's webhook security)
    
    const orderRef = adminDb.collection('orders')
      .where('smmOrderId', '==', order_id)
      .limit(1);
    
    const orderDocs = await orderRef.get();
    
    if (orderDocs.empty) {
      return NextResponse.json({ success: false, error: 'Order not found' });
    }

    const orderDoc = orderDocs.docs[0];
    const order = orderDoc.data();

    let newStatus = order.status;
    if (status === 'Completed') {
      newStatus = 'completed';
      await createNotification(
        'order_completed',
        orderDoc.id,
        `Order ${orderDoc.id} has been completed`
      );
    } else if (status === 'Failed') {
      newStatus = 'failed';
      await createNotification(
        'order_failed',
        orderDoc.id,
        `Order ${orderDoc.id} has failed`
      );
    }

    if (newStatus !== order.status) {
      await orderDoc.ref.update({
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
} 