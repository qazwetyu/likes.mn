/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
        querystring: false,
        url: false,
        string_decoder: false,
        buffer: false,
        timers: false
      };
    }
    return config;
  },
}

module.exports = nextConfig 