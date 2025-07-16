import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    // Harici görsellerin yükleneceği hostnameleri buraya ekleyin
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
   
    ],
  },
};

export default nextConfig;
