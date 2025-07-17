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
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Pexels görselleri için
        port: '',
        pathname: '**', // Bu domaindeki tüm patikaları içer
      },
      {
        protocol: 'https',
        hostname: 'hpicacbgzxmvvsmwevmc.supabase.co', // <-- Burası sizin Supabase projenizin Storage URL'si olacak
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
   
    ],
  },
};

export default nextConfig;
