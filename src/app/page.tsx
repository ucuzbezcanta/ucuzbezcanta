// app/page.tsx

import HeroSection from "@/components/HeroSection";
import { fetchSlides, fetchFeaturedProducts } from "./lib/strapi"; // <-- fetchFeaturedProducts eklendi
import Link from 'next/link'; // Ürün kartları için Link bileşeni gerekli
import Image from 'next/image'; // Ürün kartları için Image bileşeni gerekli
import ValueProps from "@/components/ValueProps";

export default async function HomePage() {
  
  const slides = await fetchSlides();
  const featuredProducts = await fetchFeaturedProducts(); // <-- Öne çıkan ürünleri çekiyoruz

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection slides={slides} /> {/* HeroSection bileşenini buraya ekle */}

      <ValueProps/>
      
      {/* YENİ EKLENECEK KISIM: Öne Çıkan Ürünler Bölümü */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12"> {/* py-12 biraz boşluk sağlar */}
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
                      ₺{product.price.toFixed(2)}
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