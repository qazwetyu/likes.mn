"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Order {
  id: string;
  service: string;
  amount: number;
  price: number;
  username: string;
  status: string;
  createdAt: string;
}

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (status: string) => Promise<void>;
}

export default function OrderModal({ order, onClose, onUpdateStatus }: OrderModalProps) {
  if (!order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg p-6 max-w-lg w-full mx-4"
        >
          <h3 className="text-lg font-bold mb-4">Захиалгын дэлгэрэнгүй</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">ID</label>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Үйлчилгээ</label>
                <p className="font-medium">
                  {order.service === 'followers' ? 'Дагагч' : 'Лайк'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Хэрэглэгч</label>
                <p className="font-medium">{order.username}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Тоо</label>
                <p className="font-medium">{order.amount.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Үнэ</label>
                <p className="font-medium">₮{order.price.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Огноо</label>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleString('mn-MN')}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Төлөв</label>
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(e.target.value)}
                className="form-select"
              >
                <option value="pending">Хүлээгдэж буй</option>
                <option value="paid">Төлөгдсөн</option>
                <option value="processing">Боловсруулж байгаа</option>
                <option value="completed">Дууссан</option>
                <option value="failed">Амжилтгүй</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Хаах
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 