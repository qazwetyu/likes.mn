import { NextResponse } from 'next/server';

const SMM_API_KEY = process.env.SMM_API_KEY;
const SMM_API_URL = process.env.SMM_API_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (status === 'paid') {
      // Get order details from your database
      const order = {
        // ... get order from database
      };

      // Create order in SMM API
      const smmResponse = await fetch(SMM_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SMM_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service: order.service,
          amount: order.amount,
          username: order.username
        })
      });

      if (!smmResponse.ok) {
        throw new Error('SMM API order creation failed');
      }

      // Update order status in your database
      // ... update order status to 'processing'
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Callback processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Callback processing failed' },
      { status: 500 }
    );
  }
} 