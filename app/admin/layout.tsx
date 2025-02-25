"use client";

import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAuth } from "../../src/contexts/AuthContext";
import { auth } from "@/src/lib/firebase";
import "../globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gradient">
                likes.mn - Админ
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                Гарах
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 