"use client";

import { useEffect, useState } from 'react';
import { db } from '@/src/lib/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

interface Notification {
  id: string;
  type: string;
  orderId: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'notifications'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, []);

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'payment_success': return 'bg-green-50 text-green-800';
      case 'payment_failed': return 'bg-red-50 text-red-800';
      case 'order_completed': return 'bg-blue-50 text-blue-800';
      case 'order_failed': return 'bg-yellow-50 text-yellow-800';
      default: return 'bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg ${getNotificationStyle(notification.type)} ${
              !notification.read ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <p className="text-sm">{notification.message}</p>
            <p className="text-xs mt-1 text-gray-500">
              {new Date(notification.createdAt).toLocaleString('mn-MN')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 