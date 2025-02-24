"use client";

import { motion } from "framer-motion";
import { ShieldCheckIcon, BoltIcon, HeartIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Add automatic animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-20 px-4 bg-gradient-to-b from-purple-50 via-white to-white">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        
        {/* Main Title with improved spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 mb-12"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 text-gray-900 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span>Instagram</span>
            <span>дагагчаа</span>
            <motion.div 
              className="relative cursor-pointer"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.span
                className="text-gradient inline-block"
                initial={{ opacity: 1 }}
                animate={{ opacity: isHovered || isAnimating ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                өсгө
              </motion.span>
              <motion.span
                className="text-gradient absolute top-0 left-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered || isAnimating ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                нэм
              </motion.span>
            </motion.div>
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-medium px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            1000+ хэрэглэгч ашигласан. Таны ээлж ирлээ!
          </motion.p>
        </motion.div>

        {/* Instructions Box */}
        <div className="max-w-6xl w-full glass-card rounded-3xl p-6 mb-12">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Image - increased mobile height */}
            <div className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
              <img 
                src="/flag-review.png" 
                alt="Instagram Flag Review Setting" 
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Instructions - adjusted spacing */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-red-500">
                Дагагч нэмэхээс өмнө дараах алхмуудыг хийнэ үү:
              </h3>
              <div className="space-y-4">
                <div className="space-y-3">
                  <p className="font-semibold text-red-500 flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    Та тухайн тохиргоог унтраахгүй бол дагагч нэмэгдэхгүйг анхаарна уу!!
                  </p>
                  <p className="font-semibold text-red-500 flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    Private profile-тай бол дагагч нэмэгдэхгүйг анхаарна уу!
                  </p>
                </div>
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-gray-800">Инстаграм апп дээр өөрийн профайл руу орно</li>
                  <li className="text-gray-800">Дагагчид (Followers) хэсэг рүү орно</li>
                  <li className="text-gray-800">&ldquo;Flag for review&rdquo; гэсэн тохиргоог унтраана</li>
                  <li className="text-gray-500 italic">
                    Энэ тохиргоог та дараа нь хэзээ ч буцаан асааж болно
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Services Cards with improved layout */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full px-4 relative z-10">
          {/* Followers Service */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <UserGroupIcon className="h-10 w-10 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Инстаграм Дагагч </h2>
            </div>
            <p className="text-gray-600 mb-6">Дагагч нэмэн онлайн ертөнцөд өөрийгөө харуул</p>
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-500">Үнэ:</span>
              <span className="text-lg font-semibold text-purple-600">₮2,000 - ₮100,000</span>
            </div>
            <Link href="/services?type=followers" className="block">
              <motion.button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold group-hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Дагагчаа нэмүүлэх
              </motion.button>
            </Link>
          </motion.div>

          {/* Likes Service */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <HeartIcon className="h-10 w-10 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-900">Постны лайк</h2>
            </div>
            <p className="text-gray-600 mb-6">Постны лайкаа өсгөж, идэвхжүүл</p>
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-500">Үнэ:</span>
              <span className="text-lg font-semibold text-pink-600">₮1,000 - ₮50,000</span>
            </div>
            <Link href="/services?type=likes" className="block">
              <motion.button
                className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-3 rounded-full font-semibold group-hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Постны лайк нэмэх
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
          >
            Яагаад биднийг сонгох хэрэгтэй вэ?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheckIcon,
                title: "Найдвартай & Аюулгүй",
                description: "Жинхэнэ хаягууд , аюулгүй байдал"
              },
              {
                icon: BoltIcon,
                title: "Хурдан үйлчилгээ",
                description: "Хурдан үйлчилгээ, 24/7 онлайн туслах"
              },
              {
                icon: HeartIcon,
                title: "Итгэл даасан байдал",
                description: "Өндөр чанартай дагагч, лайкууд"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <feature.icon className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-200px" }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient"
          >
            Манай үйлчилгээний давуу талууд
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Олон хүнд хүрэхэд тусална",
                description: "Олон дагагчтай болсноор илүү олон хүнд хүрнэ"
              },
              {
                title: "Хандалтыг сайжруулна",
                description: "Өндөр идэвхжүүлэлт нь хандалт өсгөх алгоритмын гүйцэтгэлийг сайжруулна"
              },
              {
                title: "Итгэл үнэмшлийг бий болгох",
                description: "Олон дагагч нь илүү их итгэл үнэмшлийг бий болгоно"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 shadow-lg">
                    <span className="text-xl font-bold text-white">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-purple-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
          >
            Үйлчлүүлэгчдийн сэтгэгдэл
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ганзаяа",
                username: "хэрэглэгч нуухыг хүссэн",
                // image: "/testimonials/user1.jpg",
                rating: 5,
                review: "Миний дагагч 1000аас хэтэрчихлээ бүр санаа зовоод байна шүү",
                service: "1000 Дагагч",
                date: "2025.02.15"
              },
              {
                name: "Сарнай",
                username: "хэрэглэгч нуухыг хүссэн",
                // image: "/testimonials/user2.jpg",
                rating: 5,
                review: "Ёстой хурдан ордог юм байна аа.",
                service: "3000 Дагагч",
                date: "2025.02.10"
              },
              {
                name: "***onlineshop",
                username: "хэрэглэгч нуухыг хүссэн",
                // image: "/testimonials/user3.jpg",
                rating: 5,
                review: "Итгэхгүй байсан яг нэмэгддэг юм байна аа onlineshop дээрээ авлаа",
                service: "5000 Лайк",
                date: "2025.02.05"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 p-[2px]">
                   
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 mb-4">
                  &ldquo;{testimonial.review}&rdquo;
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <span>{testimonial.service}</span>
                  <span>{testimonial.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Replace the footer with the new component */}
      <Footer />
    </div>
  );
} 