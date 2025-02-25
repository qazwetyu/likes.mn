const SMM_API_URL = 'https://www.smmraja.com/api/v3';
const SMM_API_KEY = process.env.SMM_RAJA_API_KEY;

// Service IDs for different types of services
export const SMM_SERVICES = {
  FOLLOWERS: '3901', // Instagram Followers service ID
  LIKES: '1192'      // Instagram Likes service ID
};

interface SMMOrder {
  service: string; // Service ID from SMM Raja
  link: string;    // Instagram username or post URL
  quantity: number;
}

export async function createSMMOrder(order: SMMOrder) {
  try {
    const params = new URLSearchParams({
      key: SMM_API_KEY!,
      action: 'add',
      service: order.service,
      link: order.link,
      quantity: order.quantity.toString()
    });

    const response = await fetch(`${SMM_API_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to create SMM order');
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('SMM Raja API error:', error);
    throw error;
  }
}

export async function checkSMMOrder(orderId: string) {
  try {
    const params = new URLSearchParams({
      key: SMM_API_KEY!,
      action: 'status',
      order: orderId
    });

    const response = await fetch(`${SMM_API_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to check SMM order status');
    }

    return response.json();
  } catch (error) {
    console.error('SMM Raja status check error:', error);
    throw error;
  }
} 