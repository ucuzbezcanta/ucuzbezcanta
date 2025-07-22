// components/TopHeader.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const announcements = [
  "Tüm ürünlerde %15 indirim! Sınırlı süre için geçerlidir.",
  "Yeni koleksiyonumuzu keşfedin!",
  "Haftanın fırsatları başladı!",
];

const TopHeader: React.FC = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000); // Her 5 saniyede bir duyuru değişir
    return () => clearInterval(interval);
  }, []);

  const whatsappMessage = "Merhaba, sitenizden geliyorum ve bir sorum olacaktı.";
  const whatsappUrl = `https://wa.me/905339780835?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-gray-800 text-white py-2 px-4 text-sm flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
      {/* Sol Kısım: Sosyal Medya İkonları */}
      <div className="flex space-x-4"> {/* İkonlar arası boşluk arttırıldı */}
        <a href="https://facebook.com/ucuzbezcanta" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
          <FaFacebook size={18} />
        </a>
        <a href="https://twitter.com/ubcucuzbezcanta" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
          <FaTwitter size={18} />
        </a>
        <a href="https://instagram.com/ucuzbezcanta" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
          <FaInstagram size={18} />
        </a>
      </div>

      {/* Orta Kısım: Değişen Duyuru/İndirim Yazıları */}
      {/* Mobil ve masaüstü görünümde farklı taşma ve genişlik yönetimi */}
      <div className="flex-1 text-center overflow-hidden h-5 w-full sm:w-auto mt-2 sm:mt-0">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentAnnouncementIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="whitespace-nowrap truncate" 
          >
            {announcements[currentAnnouncementIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Sağ Kısım: WhatsApp İkonu */}
      <div className="mt-2 sm:mt-0"> {/* Mobil görünümde üst boşluk */}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-green-400 transition-colors">
          <FaWhatsapp size={18} />
          <span className="ml-1">WhatsApp Destek</span> {/* Metin ve ikon arası boşluk */}
        </a>
      </div>
    </div>
  );
};

export default TopHeader;