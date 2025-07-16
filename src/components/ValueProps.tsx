import React from "react";

// İkonlar için basit SVG'ler kullanıyoruz. İsterseniz React Icons gibi bir kütüphane de kullanabilirsiniz.
const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM16 12V4H9l.344 2.146A3 3 0 018.82 9.5l-1.5 1.5A3 3 0 005 13.069V16h12v-3.069a3 3 0 00-1.074-2.203L16 9.5z" />
  </svg>
);

const LockClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5.98a2 2 0 012 2v5.98a2 2 0 01-2 2H7.01C5.895 12 5 11.105 5 9.98V7a2 2 0 012-2zm0 14h.01M7 11h7.98a2 2 0 012 2v7.98a2 2 0 01-2 2H7.01C5.895 22 5 21.105 5 19.98V14a2 2 0 012-2zm10-10h.01M17 11h5.98a2 2 0 012 2v7.98a2 2 0 01-2 2H17.01c-1.105 0-2-.895-2-2.02V14a2 2 0 012-2z" />
  </svg>
);


const ValueProps: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16 mt-12 mb-12 rounded-lg shadow-inner">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Ücretsiz Sevkiyat */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <TruckIcon />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tüm dünyaya gönderim</h3>
            <p className="text-gray-600 text-sm">İhracatlarımız devam ediyor.</p>
          </div>

          {/* Güvenli Ödeme */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <LockClosedIcon />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Güvenli Ödeme</h3>
            <p className="text-gray-600 text-sm">SSL sertifikalı güvenli ödeme altyapısı.</p>
          </div>

          {/* Özel İndirimler */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <TagIcon />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Özel Fırsatlar</h3>
            <p className="text-gray-600 text-sm">Abone olanlara özel indirimler ve kampanyalar.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;