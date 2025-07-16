// components/ProductGallery.tsx
'use client'; // Bu dosyanın bir istemci bileşeni olduğunu belirtiyoruz

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProductGalleryProps {
  mainImageUrl: string;
  galleryImageUrls: string[];
  productName: string;
}

export default function ProductGallery({ mainImageUrl, galleryImageUrls, productName }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(mainImageUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ana görsel değiştiğinde (örneğin farklı bir ürüne geçildiğinde) state'i güncelle
  useEffect(() => {
    setCurrentImage(mainImageUrl);
  }, [mainImageUrl]);

  const allImages = [mainImageUrl, ...galleryImageUrls];

   const openModal = () => {
    console.log("Popup açılıyor, currentImage URL:", currentImage); // <-- BU SATIRI EKLEYİN
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Ürün Galeri Görselleri (Sol Kısım) - Mobil için yatay kaydırılabilir, Masaüstü için dikey */}
      {/* flex-col md:flex-col yerine mobil için flex, md için flex-col daha doğru */}
      <div className="md:col-span-1 flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-hidden pb-4 md:pb-0">
        {allImages.map((imageUrl, index) => (
          <div
            key={index}
            onClick={() => setCurrentImage(imageUrl)}
            className={`relative flex-shrink-0 w-24 h-24 md:w-full md:h-32 rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105 duration-200 
              ${currentImage === imageUrl ? 'border-2 border-indigo-600 ring-2 ring-indigo-600' : ''}
            `}
          >
            <Image
              src={imageUrl}
              alt={`${productName} galeri görseli ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 25vw, 15vw"
            />
          </div>
        ))}
      </div>

      {/* Ana Ürün Görseli (Orta Kısım) - Tıklanınca popup açar */}
      <div
        className="md:col-span-2 relative w-full h-80 md:h-[400px] rounded-lg overflow-hidden shadow-lg order-1 md:order-2 cursor-pointer animate-fade-in"
        onClick={openModal}
      >
        {currentImage ? (
          <Image
            src={currentImage}
            alt={productName}
            fill
            style={{ objectFit: 'contain' }}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="transition-opacity duration-500 ease-in-out"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-xl">
            Görsel Yok
          </div>
        )}
      </div>

      {/* Popup/Modal Görsel Gösterici */}
      {isModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    onClick={closeModal}
  >
    {/* Bu div'in boyutunu belirli bir oranda ayarlayalım */}
    {/* w-full max-w-4xl (veya daha büyük bir değer), h-4/5 (ekran yüksekliğinin %80'i) gibi */}
    {/* ya da aspect-video (16:9) gibi Tailwind'in hazır aspect oranlarını kullanalım */}
    <div 
        className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center bg-white rounded-lg shadow-xl overflow-hidden p-4" // p-4 dışarıdan padding versin
        onClick={(e) => e.stopPropagation()} // Modal içeriğine tıklanınca kapanmasın
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-800 text-3xl z-10 p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-colors"
      >
        &times;
      </button>
      {currentImage ? ( // Görsel yüklenemediğinde veya boş olduğunda hata almamak için kontrol
        <Image
          src={currentImage}
          alt={productName}
          fill // Kapsayıcıyı doldur
          style={{ objectFit: 'contain' }} // Görselin en-boy oranını koruyarak sığdır
          className="rounded-lg" // Artık shadow ve padding dış div'de olduğu için buraya sadece rounded ekleyebiliriz
          sizes="80vw" // Ekranın %80'ini kaplayacağını belirtir (modalın içine sığacak şekilde)
          priority // Popup'daki ana görsel olduğu için öncelik verelim
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-500 text-xl">
          Görsel Yüklenemedi
        </div>
      )}
    </div>
  </div>
)}
    </>
  );
}