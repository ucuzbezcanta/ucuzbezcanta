// app/error.tsx
'use client'; // Bu bir Client Component olmalıdır

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void; // Hata durumunda uygulamayı yeniden denemek için fonksiyon
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Hata hakkında detayları bir loglama servisine gönderebilirsiniz (Sentry, LogRocket vb.)
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-red-50 text-red-800 p-8">
      <h1 className="text-9xl font-extrabold text-red-600 mb-4 animate-pulse">
        Oops!
      </h1>
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Bir Hata Oluştu!
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Beklenmedik bir sorunla karşılaşıldı. Lütfen daha sonra tekrar deneyin veya aşağıdaki seçenekleri kullanın.
      </p>
      <div className="flex gap-4">
        <button
          onClick={
            // Uygulamanın en son başarılı şekilde render edildiği noktadan yeniden başlamasını sağlar
            () => reset()
          }
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Tekrar Dene
        </button>
        <Link href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}