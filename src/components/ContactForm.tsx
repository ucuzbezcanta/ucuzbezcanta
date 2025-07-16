// components/ContactForm.tsx
import React from 'react';

export default function ContactForm() {
  return (
    <div className="w-full max-w-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">İletişim Formu</h3>
      <form className="space-y-4 w-full">
        <div>
          <input
            type="text"
            placeholder="Adınızı Girin"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Geçerli Bir E-posta Adresi Girin"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <textarea
            placeholder="Mesajınızı Girin"
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}