// app/components/HeroSection.tsx

'use client'; // Client Component olarak işaretlendi

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string | null;
  buttonLink: string | null;
  imageUrl: string | null;
}

interface HeroSectionProps {
  slides: Slide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Otomatik slayt geçişi (isteğe bağlı, şimdilik sabit 5 saniye)
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000); // Her 7 saniyede bir slayt değişimi

    return () => clearInterval(timer); // Bileşen kaldırıldığında zamanlayıcıyı temizle
  }, [slides]);

  if (slides.length === 0) {
    return (
      <section className="h-screen bg-gray-200 flex items-center justify-center text-gray-700">
        <p>Hero slaytları yüklenemedi veya mevcut değil.</p>
      </section>
    );
  }

  const currentSlide = slides[currentSlideIndex];
  // Buraya console.log ekle!
  console.log("HeroSection render ediliyor - currentSlide:", currentSlide);
  console.log("currentSlide.imageUrl:", currentSlide?.imageUrl);

  // Metin ve buton için kademeli animasyon varyantları
  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Çocuk öğeler arasında 0.3 saniye gecikme
        delayChildren: 0.5, // Tüm container için başlangıç gecikmesi
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" as const } },
  };


  return (
    <section className="relative w-full h-[600px] overflow-hidden"> {/* Yükseklik ayarlandı */}
      <AnimatePresence initial={false} mode="wait">
        {currentSlide && (
          <motion.div
            key={currentSlide.id} // Slayt değiştiğinde animasyon tetiklenmesi için key
            className="absolute inset-0 flex items-center justify-center"
          >
            {currentSlide.imageUrl && (
              <motion.div
                className="absolute inset-0 z-0"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden" // Slayt çıkarken de kaybolma animasyonu
              >
                <Image
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={true} // İlk slayt için öncelik ver
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
                {/* Overlay (Görselin okunurluğunu artırmak için) */}
                <div className="absolute inset-0 bg-black opacity-40"></div>
              </motion.div>
            )}

            {/* İçerik */}
            <motion.div
              className="relative z-10 text-white text-center p-4 max-w-3xl mx-auto"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden" // Slayt değişirken metinlerin de kaybolma animasyonu
            >
              <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg" variants={itemVariants}>
                {currentSlide.title}
              </motion.h1>
              <motion.p className="text-lg md:text-xl mb-8 drop-shadow-md" variants={itemVariants}>
                {currentSlide.subtitle}
              </motion.p>
              {currentSlide.buttonText && currentSlide.buttonLink && (
                <motion.div variants={itemVariants}>
                  <Link
                    href={currentSlide.buttonLink}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {currentSlide.buttonText}
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slayt Navigasyon Butonları */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 p-3 rounded-full text-white hover:bg-opacity-50 transition-colors duration-300 z-20"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button
            onClick={() => setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 p-3 rounded-full text-white hover:bg-opacity-50 transition-colors duration-300 z-20"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </>
      )}

      {/* Nokta Göstergeler */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlideIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
}