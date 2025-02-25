"use client";

import { motion } from "framer-motion";
import { HeartIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { db } from '@/src/lib/firebase';

const services = [
  {
    id: "followers",
    title: "Instagram Дагагч",
    icon: UserGroupIcon,
    description: "Дагагч нэмэн онлайн ертөнцөд өөрийгөө харуул",
    packages: [
      { amount: 100, price: 2000 },
      { amount: 500, price: 10000 },
      { amount: 1000, price: 20000 },
      { amount: 3000, price: 60000 },
      { amount: 5000, price: 100000 },
    ]
  },
  {
    id: "likes",
    title: "Постны лайк",
    icon: HeartIcon,
    description: "Постны лайкаа өсгөж, идэвхжүүл",
    packages: [
      { amount: 100, price: 1000 },
      { amount: 500, price: 5000 },
      { amount: 1000, price: 10000 },
      { amount: 3000, price: 30000 },
      { amount: 5000, price: 50000 },
    ]
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedPackage, setSelectedPackage] = useState<null | { amount: number; price: number }>(null);
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !username) return;
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service: selectedService.id,
          package: selectedPackage,
          username
        })
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to byl.mn payment page
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Order creation failed');
      }

    } catch (error) {
      console.error('Payment error:', error);
      // Show error message to user
      alert('Төлбөр төлөх үед алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Үйлчилгээгээ сонгоно уу
        </motion.h1>
        <motion.p
          className="text-gray-600 text-center mb-16 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Та өөрийн хүссэн үйлчилгээгээ сонгон захиалга өгнө үү
        </motion.p>

        {/* Service Type Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => {
                setSelectedService(service);
                setSelectedPackage(null);
              }}
              className={`glass-card p-8 rounded-2xl transition-all ${
                selectedService.id === service.id 
                  ? "border-2 border-purple-500 shadow-lg" 
                  : "hover:border-gray-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <service.icon className={`h-10 w-10 ${
                  selectedService.id === service.id 
                    ? "text-purple-600" 
                    : "text-gray-600"
                }`} />
                <span className={`text-2xl font-bold ${
                  selectedService.id === service.id 
                    ? "text-gray-900" 
                    : "text-gray-600"
                }`}>
                  {service.title}
                </span>
              </div>
              <p className="text-gray-600 text-left">
                {service.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Package Selection */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Багцаа сонгоно уу
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {selectedService.packages.map((pkg) => (
              <motion.button
                key={pkg.amount}
                onClick={() => setSelectedPackage(pkg)}
                className={`glass-card p-6 rounded-xl text-center transition-all ${
                  selectedPackage?.amount === pkg.amount 
                    ? "border-2 border-purple-500 shadow-lg" 
                    : "hover:border-gray-300"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {pkg.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {selectedService.id === "followers" ? "Дагагч" : "Лайк"}
                </div>
                <div className="text-lg font-semibold text-purple-600">
                  ₮{pkg.price.toLocaleString()}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Username/Post Link Input */}
        <motion.form 
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card p-6 rounded-xl">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              {selectedService.id === "followers" 
                ? "Instagram хэрэглэгчийн нэр"
                : "Постны линк"}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={selectedService.id === "followers" 
                ? "username"
                : "https://www.instagram.com/p/..."}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors text-gray-900 placeholder-gray-400"
              required
            />
            <button
              type="submit"
              disabled={!selectedPackage || !username}
              className={`w-full mt-4 py-4 rounded-lg font-semibold text-white transition-all ${
                selectedPackage && username
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Төлбөр төлөх
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
} 