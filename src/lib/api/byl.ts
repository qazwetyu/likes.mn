export interface BylInvoice {
  amount: number;
  orderId: string;
  description: string;
  callbackUrl: string;
}

const BYL_API_URL = 'https://byl.mn/api/v1';

export async function createBylInvoice(invoice: BylInvoice) {
  try {
    const response = await fetch(`${BYL_API_URL}/invoice`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BYL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: invoice.amount,
        orderId: invoice.orderId,
        description: invoice.description,
        callbackUrl: invoice.callbackUrl
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create byl.mn invoice');
    }

    return response.json();
  } catch (error) {
    console.error('Byl.mn API error:', error);
    throw error;
  }
}

export async function verifyBylPayment(token: string) {
  try {
    const response = await fetch(`${BYL_API_URL}/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BYL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      throw new Error('Failed to verify byl.mn payment');
    }

    return response.json();
  } catch (error) {
    console.error('Byl.mn verification error:', error);
    throw error;
  }
} 