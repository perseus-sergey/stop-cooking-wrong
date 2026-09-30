import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,

  devIndicators: false, // вимикає чорну іконку "N" у кутку
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
