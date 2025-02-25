/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      punycode: false
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['jsonwebtoken', 'firebase-admin']
  }
}

module.exports = nextConfig 