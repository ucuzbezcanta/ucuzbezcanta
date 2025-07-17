// components/ProductGallery.tsx
'use client';

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

  useEffect(() => {
    setCurrentImage(mainImageUrl);
  }, [mainImageUrl]);

  const allImages = [mainImageUrl, ...galleryImageUrls];

  const openModal = () => {
    // Bu console.log fonksiyonun dışında kalabilir
    // console.log("Popup açılıyor, currentImage URL:", currentImage);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="md:col-span-1 flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-hidden pb-4 md:pb-0">
        {allImages.map((imageUrl, index) => (
          <div
            key={index}
            onClick={() => setCurrentImage(imageUrl)}
            className={`relative flex-shrink-0 w-24 h-24 md:w-full md:h-32 rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105 duration-200
              ${currentImage === imageUrl ? 'border-2 border-indigo-600 ring-2 ring-indigo-600' : ''}
            `}
          >
            {/* JSX içinde console.log ifadeleri kaldırıldı */}
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

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center bg-white rounded-lg shadow-xl overflow-hidden p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-800 text-3xl z-10 p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-colors"
            >
              &times;
            </button>
            {currentImage ? (
              <Image
                src={currentImage}
                alt={productName}
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-lg"
                sizes="80vw"
                priority
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