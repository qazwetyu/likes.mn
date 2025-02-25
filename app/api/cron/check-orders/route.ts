import { NextResponse } from 'next/server';
import { adminDb } from '@/src/lib/firebase-admin';
import { checkSMMOrder } from '@/src/lib/api/smm';

export async function GET(req: Request) {
  try {
    // Get all processing orders
    const ordersRef = adminDb.collection('orders');
    const processingOrders = await ordersRef
      .where('status', '==', 'processing')
      .get();

    const updates = processingOrders.docs.map(async (doc) => {
      const order = doc.data();
      
      if (!order.smmOrderId) return;

      const smmStatus = await checkSMMOrder(order.smmOrderId);

      let newStatus = order.status;
      if (smmStatus.status === 'Completed') {
        newStatus = 'completed';
      } else if (smmStatus.status === 'Failed') {
        newStatus = 'failed';
      }

      if (newStatus !== order.status) {
        await doc.ref.update({
          status: newStatus,
          updatedAt: new Date().toISOString()
        });
      }
    });

    await Promise.all(updates);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Order status check error:', error);
    return NextResponse.json(
      { success: false, error: 'Status check failed' },
      { status: 500 }
    );
  }
} 