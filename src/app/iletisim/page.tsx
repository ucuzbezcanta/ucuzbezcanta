import React from "react";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'İletişim | Ucuz Bez Çanta',
    description: 'Ucuz Bez Çanta ile iletişime geçin. İletişim bilgilerimiz, adresimiz ve online iletişim formumuz.',
    keywords: ['ucuz bez çanta iletişim', 'iletişim bilgileri', 'adres', 'telefon'],
    openGraph: {
      title: 'İletişim | Ucuz Bez Çanta',
      description: 'Ucuz Bez Çanta ile iletişime geçin. İletişim bilgilerimiz, adresimiz ve online iletişim formumuz.',
      url: 'https://www.ucuzbezcanta.com/iletisim',
      siteName: 'Ucuz Bez Çanta',
      images: [
        {
          url: 'https://ucuzbezcanta.com/images/logo.png',
          width: 1200,
          height: 630,
          alt: 'Ucuz bez çanta Logo Ana Görsel',
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
};

export default function IletisimPage() {
  return (
    <main className="pt-[80px] md:pt-[96px] flex flex-col space-y-12"> {/* Header boşluğu ve bölümler arası boşluk */}
      {/* Başlık Bölümü */}
      <section className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Bize Ulaşın</h1>
      </section>

      {/* İletişim Bilgileri ve Form Bölümü */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-18 items-start"> {/* items-start ile dikey hizalama */}
          {/* Sol Kısım: Konum ve Bizi Takip Edin */}
          <ContactInfo />

          {/* Sağ Kısım: İletişim Formu */}
          <ContactForm />
        </div>
      </section>

      {/* Harita Bölümü - Tam Genişlik */}
      <section className="w-full h-[400px] bg-gray-200"> {/* Harita için yer tutucu */}
        {/* Buraya Google Haritalar iframe'i veya başka bir harita bileşeni gelecek */}
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.05389328461!2d28.954052676307366!3d41.04595051710377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab0056d6fa5ad%3A0x64e792755325c3a3!2sUcuz%20Bez%20%C3%87anta!5e0!3m2!1str!2str!4v1752409927747!5m2!1str!2str" 
        width="100%" height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Konum Haritası">
        </iframe>
      </section>
    </main>
  );
}