// app/not-found.tsx
import Link from 'next/link';
import { Metadata } from 'next';

// 404 sayfası için meta verisi
export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı - 404 | Ucuz Bez Çanta',
  description: 'Aradığınız sayfa bulunamadı. Lütfen ana sayfaya geri dönün veya diğer ürünlerimize göz atın.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 text-gray-800 p-8">
      <h1 className="text-9xl font-extrabold text-indigo-600 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Sayfa Bulunamadı
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Üzgünüz, aradığınız sayfa mevcut değil. Muhtemelen yanlış bir adres girdiniz veya sayfa taşınmış ya da silinmiş olabilir.
      </p>
      <Link href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}