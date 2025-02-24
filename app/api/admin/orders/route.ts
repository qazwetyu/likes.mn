import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Get orders from your database
    const orders = [
      // Example data - replace with actual database query
      {
        id: '1',
        service: 'followers',
        amount: 1000,
        price: 20000,
        username: 'example_user',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ];

    return NextResponse.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 