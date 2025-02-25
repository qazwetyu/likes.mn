import { NextResponse } from 'next/server';
import { adminDb } from '@/src/lib/firebase-admin';
import { createBylInvoice } from '@/src/lib/api/byl';
import { checkSMMOrder } from '@/src/lib/api/smm';

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

// Add status check when fetching orders
export async function GET(req: Request) {
  try {
    // Check status of processing orders on each request
    const processingOrders = await adminDb.collection('orders')
      .where('status', '==', 'processing')
      .get();

    // Update order statuses
    const updates = processingOrders.docs.map(async (doc) => {
      const order = doc.data();
      if (!order.smmOrderId) return;

      try {
        const smmStatus = await checkSMMOrder(order.smmOrderId);
        
        if (smmStatus.status === 'Completed' || smmStatus.status === 'Failed') {
          await doc.ref.update({
            status: smmStatus.status.toLowerCase(),
            updatedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error(`Failed to check order ${doc.id}:`, error);
      }
    });

    await Promise.all(updates);

    // Return orders as normal
    return NextResponse.json({
      success: true,
      orders: processingOrders.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 