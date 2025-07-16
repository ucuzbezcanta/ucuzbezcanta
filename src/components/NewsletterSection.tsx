// components/NewsletterSection.tsx
import React from 'react';

export default function NewsletterSection() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="relative bg-blue-100 rounded-lg p-8 md:p-16 flex flex-col md:flex-row items-center justify-between text-center md:text-left overflow-hidden">
        {/* pattern-dots yerine özel bir ID verdik veya doğrudan style verebiliriz */}
        <div id="newsletter-pattern" className="absolute inset-0 opacity-40"></div> {/* ID ekledik */}
        
        {/* İçerik */}
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Son Fırsatlarımızdan Haberdar Olun
          </h2>
          <p className="text-gray-600 text-lg">
            Haber bültenimize abone olun
          </p>
        </div>

        {/* Form Alanı */}
        <div className="relative z-10 mt-8 md:mt-0 md:ml-8 flex flex-col sm:flex-row items-center w-full md:w-auto">
          <input
            type="email"
            placeholder="E-posta adresinizi buraya girin"
            className="w-full sm:w-80 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          />
          <button
            type="submit"
            className="mt-4 sm:mt-0 sm:ml-4 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto"
          >
            Abone Ol
          </button>
        </div>
      </div>
    </section>
  );
}