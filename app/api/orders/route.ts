import { NextResponse } from 'next/server';

const BYL_API_KEY = process.env.BYL_API_KEY;
const BYL_API_URL = 'https://byl.mn/api/v1/invoice';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { service, package: pkg, username } = body;

    // Create order in your database
    const order = {
      id: Date.now().toString(),
      service,
      amount: pkg.amount,
      price: pkg.price,
      username,
      status: 'pending'
    };

    // Create byl.mn invoice
    const bylResponse = await fetch(BYL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BYL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: pkg.price,
        orderId: order.id,
        description: `${pkg.amount} ${service === 'followers' ? 'Дагагч' : 'Лайк'} - ${username}`,
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/byl/callback`
      })
    });

    const bylData = await bylResponse.json();

    if (!bylResponse.ok) {
      throw new Error('Payment creation failed');
    }

    return NextResponse.json({
      success: true,
      paymentUrl: bylData.paymentUrl,
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