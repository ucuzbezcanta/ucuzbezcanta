// components/NewsletterForm.tsx
"use client";

import React, { useState } from 'react';
import { saveNewsletterSubscriber } from '@/app/lib/supabase'; // Yeni fonksiyonumuzu import ediyoruz

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // Başarı/hata mesajları için
  const [isSubmitting, setIsSubmitting] = useState(false); // Gönderim durumunu yönetmek için

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Kaydediliyor...');

    const result = await saveNewsletterSubscriber(email);

    if (result.success) {
      setStatus(result.message || 'Abone oldunuz, teşekkür ederiz!');
      setEmail(''); // Başarılı olursa inputu temizle
    } else {
      setStatus(result.message || 'Bir hata oluştu, lütfen tekrar deneyin.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Haber Bültenimize Kaydolun
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          En son kampanyalardan, indirimli ürünlerden ve stoklu ürünlerden bilgi almak için abone olun.
          E-postalarımız ve Gizlilik Politikamız hakkında daha fazla bilgi edinin.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-lg mx-auto">
          <label htmlFor="email-address" className="sr-only">
            E-posta adresi
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="E-posta adresinizi girin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Kaydediliyor...' : 'Abone Ol'}
          </button>
        </form>
        {status && (
          <p className="mt-3 text-sm font-medium text-gray-700">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}