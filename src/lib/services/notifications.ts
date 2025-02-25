import { adminDb } from '@/src/lib/firebase-admin';

type NotificationType = 'payment_success' | 'payment_failed' | 'order_completed' | 'order_failed';

interface Notification {
  type: NotificationType;
  orderId: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export async function createNotification(
  type: NotificationType,
  orderId: string,
  message: string
) {
  try {
    const notification: Notification = {
      type,
      orderId,
      message,
      createdAt: new Date().toISOString(),
      read: false
    };

    await adminDb.collection('notifications').add(notification);
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    await adminDb.collection('notifications')
      .doc(notificationId)
      .update({ read: true });
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
  }
} 