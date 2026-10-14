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
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],
  },
};

export default nextConfig;
