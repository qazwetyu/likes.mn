import { NextResponse } from 'next/server';
import { adminDb } from '@/src/lib/firebase-admin';
import { createSMMOrder, SMM_SERVICES } from '@/src/lib/api/smm';
import { verifyBylPayment } from '@/src/lib/api/byl';
import { withRetry } from '@/src/lib/utils/retry';
import { createNotification } from '@/src/lib/services/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, orderId } = body;

    // Verify byl.mn payment with retry
    const paymentVerification = await withRetry(
      () => verifyBylPayment(token),
      { maxAttempts: 3, delay: 2000 }
    );
    
    if (paymentVerification.status === 'paid') {
      const orderRef = adminDb.collection('orders').doc(orderId);
      const orderDoc = await orderRef.get();
      
      if (!orderDoc.exists) {
        throw new Error('Order not found');
      }

      const order = orderDoc.data();

      // Create notification for successful payment
      await createNotification(
        'payment_success',
        orderId,
        `Payment received for order ${orderId}`
      );

      // Create SMM Raja order with retry
      const smmOrder = await withRetry(
        () => createSMMOrder({
          service: order.service === 'followers' ? SMM_SERVICES.FOLLOWERS : SMM_SERVICES.LIKES,
          link: order.username,
          quantity: order.amount
        }),
        { maxAttempts: 3, delay: 2000 }
      );

      // Update order status
      await orderRef.update({
        status: 'processing',
        smmOrderId: smmOrder.order,
        bylPaymentId: paymentVerification.paymentId,
        updatedAt: new Date().toISOString()
      });

      return NextResponse.json({ success: true });
    }

    // Create notification for failed payment
    await createNotification(
      'payment_failed',
      orderId,
      `Payment failed for order ${orderId}`
    );

    return NextResponse.json({ success: false, error: 'Payment not verified' });

  } catch (error) {
    console.error('Callback processing error:', error);
    
    // Create notification for processing error
    if (body?.orderId) {
      await createNotification(
        'payment_failed',
        body.orderId,
        `Error processing payment for order ${body.orderId}`
      );
    }

    return NextResponse.json(
      { success: false, error: 'Callback processing failed' },
      { status: 500 }
    );
  }
} 