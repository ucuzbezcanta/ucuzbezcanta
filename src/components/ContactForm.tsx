// components/ContactForm.tsx
"use client";
import React, { useState } from 'react';
import { saveContactMessage } from '@/app/lib/supabase';



export default function ContactForm() {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Gönderiliyor...');

    const result = await saveContactMessage(name, email, message);
    if (result.success) {
      setStatus('Mesajınız iletildi, teşekkür ederiz.');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus('Gönderilirken hata oluştu, lütfen tekrar deneyin.');
    }
  };
  

return (
    <div className="w-full max-w-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">İletişim Formu</h3>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <input
            type="text"
            placeholder="Adınızı Girin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Geçerli Bir E-posta Adresi Girin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <textarea
            placeholder="Mesajınızı Girin"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300"
        >
          Gönder
        </button>

        {status && (
          <p className="text-sm text-center mt-2">{status}</p>
        )}
      </form>
    </div>
  );
}