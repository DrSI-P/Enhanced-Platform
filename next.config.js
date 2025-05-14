/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_NAME: 'EdPsych Connect',
    APP_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['vercel.com', 'edpsychconnect.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
  },
  i18n: {
    locales: ['en', 'es', 'fr', 'de', 'zh', 'ar', 'ru', 'ja', 'hi', 'pt'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;