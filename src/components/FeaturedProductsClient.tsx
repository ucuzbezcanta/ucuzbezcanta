// components/FeaturedProductsClient.tsx
'use client'; // Bu bileşen bir Client Component'tir

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Product arayüzünü tanımlayın
interface Product {
  id: string; // veya number, uuid
  name: string;
  slug: string;
  mainImageUrl: string | null;
  price: number;
  stock: number;
  // is_featured: boolean; // Bu prop'a burada ihtiyacımız yok, filtrelenmiş olarak geliyor
}

interface FeaturedProductsClientProps {
  initialProducts: Product[]; // Başlangıçta Sunucu Bileşeninden gelecek ürünler
}

export default function FeaturedProductsClient({ initialProducts }: FeaturedProductsClientProps) {
  const [displayedCount, setDisplayedCount] = useState(4); // Başlangıçta 4 ürün göster

  const handleLoadMore = () => {
    // Sonraki yüklemede 4 ürün daha göster, ancak toplam ürün sayısını aşma
    setDisplayedCount(prevCount => Math.min(prevCount + 4, initialProducts.length));
  };

  const productsToShow = initialProducts.slice(0, displayedCount);
  const hasMoreProducts = displayedCount < initialProducts.length;

  if (initialProducts.length === 0) {
    return null; // Ürün yoksa bu bölümü gösterme
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-8 text-center">
        En çok tercih edilenler
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productsToShow.map(product => (
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
                    priority
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

      {hasMoreProducts && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-gray-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:bg-blue-500"
          >
            Daha Fazla ({initialProducts.length - displayedCount} Ürün Daha)
          </button>
        </div>
      )}
    </section>
  );
}