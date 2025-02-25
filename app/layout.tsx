import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/src/contexts/AuthContext";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "likes.mn - Instagram Growth Services",
  description: "Boost your Instagram presence with real followers and likes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 