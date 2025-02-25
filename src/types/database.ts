export interface Order {
  id: string;
  service: 'followers' | 'likes';
  amount: number;
  price: number;
  username: string;
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'failed';
  byl_payment_id?: string;
  smm_order_id?: string;
  created_at: string;
  updated_at: string;
} 