import { NextResponse } from 'next/server';
import { adminDb } from '@/src/lib/firebase-admin';
import { createSMMOrder, SMM_SERVICES } from '@/src/lib/api/smm';
import { verifyBylPayment } from '@/src/lib/api/byl';
import { withRetry } from '@/src/lib/utils/retry';
import { createNotification } from '@/src/lib/services/notifications';

export async function POST(req: Request) {
  try {
    const { token, orderId } = await req.json();

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

      const orderData = orderDoc.data();
      if (!orderData) {
        throw new Error('Order data is empty');
      }

      // Create notification for successful payment
      await createNotification(
        'payment_success',
        orderId,
        `Payment received for order ${orderId}`
      );

      // Create SMM Raja order with retry
      const smmOrder = await withRetry(
        () => createSMMOrder({
          service: orderData.service === 'followers' ? SMM_SERVICES.FOLLOWERS : SMM_SERVICES.LIKES,
          link: orderData.username,
          quantity: orderData.amount
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
    
    const reqBody = await req.json().catch(() => ({}));
    
    // Create notification for processing error
    if (reqBody?.orderId) {
      await createNotification(
        'payment_failed',
        reqBody.orderId,
        `Error processing payment for order ${reqBody.orderId}`
      );
    }

    return NextResponse.json(
      { success: false, error: 'Callback processing failed' },
      { status: 500 }
    );
  }
} 