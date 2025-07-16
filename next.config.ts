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
        protocol: 'https', // Canlıda HTTPS kullanıyoruz
        hostname: 'ucuzbezcanta.onrender.com', // Strapi'nizin ana host adı
        port: '', // Varsayılan HTTPS portu olduğu için boş bırakabiliriz
        pathname: '/uploads/**', // Strapi'nin görselleri /uploads altında sunulur
      },
   
    ],
  },
};

export default nextConfig;
