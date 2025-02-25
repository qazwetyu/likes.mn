"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

interface Order {
  id: string;
  service: string;
  amount: number;
  price: number;
  username: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}

interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  recentOrders: Order[];
}

export default function OrderTracker() {
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
    recentOrders: []
  });

  useEffect(() => {
    const ordersQuery = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      
      setStats({
        total: orders.length,
        pending: orders.filter(order => order.status === 'pending').length,
        processing: orders.filter(order => order.status === 'processing').length,
        completed: orders.filter(order => order.status === 'completed').length,
        failed: orders.filter(order => order.status === 'failed').length,
        recentOrders: orders.slice(0, 5)
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-medium text-gray-500">Нийт захиалга</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
      </div>
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-medium text-gray-500">Хүлээгдэж буй</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
      </div>
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-medium text-gray-500">Боловсруулж буй</h3>
        <p className="text-2xl font-bold text-purple-600">{stats.processing}</p>
      </div>
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-medium text-gray-500">Дууссан</h3>
        <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
      </div>
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-medium text-gray-500">Амжилтгүй</h3>
        <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
      </div>
    </div>
  );
} 