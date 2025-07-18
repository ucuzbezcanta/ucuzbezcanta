// app/page.tsx

import HeroSection from "@/components/HeroSection";
// Sadece kullanılan fetch fonksiyonlarını import ediyoruz
import { fetchSlides, fetchFeaturedProducts } from "./lib/supabase"; // fetchBlogPosts ve fetchCategories kaldırıldı
import Link from 'next/link';
import Image from 'next/image';
import ValueProps from "@/components/ValueProps";
import Intro from "@/components/Intro";


export const revalidate = 60; // 60 saniye (1 dakika)

export default async function HomePage() {

  const slides = await fetchSlides();
  // categories ve blogPosts çekme satırları kaldırıldı, çünkü kullanılmıyorlar
  // const categories = await fetchCategories();
  const featuredProducts = await fetchFeaturedProducts();
  // const blogPosts = await fetchBlogPosts();

  return (
    
    <div className="flex flex-col min-h-screen">
      <Intro/>
      <HeroSection slides={slides || []} />

      <ValueProps/>

      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-8 text-center">
            En çok tercih edilenler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <Link href={`/urunler/${product.slug}`} key={product.id} className="block group">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  <div className="relative w-full h-60">
                    {product.mainImageUrl ? (
                      <Image
                        src={product.mainImageUrl}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="group-hover:opacity-80 transition-opacity duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                        Görsel Yok
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 truncate mb-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-indigo-600 mb-2">
                      {product.price.toFixed(2)} ₺ den başlayan fiyatlar
                    </p>
                    <p className="text-sm text-gray-600">Stok: {product.stock}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}