// app/iade/page.tsx

import React from 'react';

// Bu sayfa statik olarak oluşturulacak ve otomatik olarak önbelleğe alınacaktır.
// Sık güncellenmediği için 'revalidate' ayarına gerek yoktur.

const IadePolitikasiPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        İade ve Değişim Politikası
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Genel Koşullar
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Tek Tanıtım Şirketler Grubu olarak müşteri memnuniyetini en üst düzeyde tutmayı hedefliyoruz. Sipariş verdiğiniz ürünlerden herhangi bir sebeple memnun kalmamanız durumunda, aşağıda belirtilen koşullar çerçevesinde iade veya değişim yapabilirsiniz.
        </p>
        
      </section>

      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          İade Şartları
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Verilen siparişteki detaylarda karşılıklı yazılı anlaşmaya tarafımızca uyulmaması durumunda iade etme hakkınız vardır.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Fatura ile birlikte yasal süresi içerisinde yapılmayan iadeler kabul edilmeyecektir.
        </p>
      </section>

      

      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Değişim Politikası
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Ürün değişimi talepleriniz için de iade sürecindeki adımları izleyebilir ve istediğiniz ürünün stokta olup olmadığını sorgulayarak değişim talebinizi iletebilirsiniz. Değişim işlemi, iade koşullarının sağlanması ve yeni ürünün stok durumuna bağlı olarak gerçekleştirilecektir.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          İletişim
        </h2>
        <p className="text-gray-600 leading-relaxed">
          İade ve değişim politikamızla ilgili herhangi bir sorunuz için lütfen bizimle iletişime geçmekten çekinmeyin:
        </p>
        <ul className="text-gray-600 leading-relaxed mt-2">
          <li>**E-posta:** info@ucuzbezcanta.com</li>
          <li>**Telefon:** 0212 659 25 30</li>
          <li>**Adres:** Fetihtepe mh. Tepeüstü sk. No41A Beyoğlu - İstanbul</li>
        </ul>
      </section>

      <p className="text-sm text-gray-500 text-center mt-8">
        Tek tanıtım şirketler grubu - Son Güncelleme: 17 Temmuz 2025
      </p>
    </div>
  );
};

export default IadePolitikasiPage;