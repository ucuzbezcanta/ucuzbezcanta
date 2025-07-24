// components/CookieConsentBanner.tsx
'use client';

import React from 'react';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

export default function CookieConsentBanner() {
  // onAccept için parametre tipi doğru (boolean)
  const handleAcceptCookie = (acceptedByScrolling: boolean) => {
    console.log(`Çerezler kabul edildi. Kaydırma ile mi kabul edildi? ${acceptedByScrolling}`);
    // Google Analytics, Hotjar gibi izleme kodlarını etkinleştirebilirsiniz.
  };

  // onDecline için parametreyi kaldırıyoruz, çünkü beklenen bu
  const handleDeclineCookie = () => { // Parametreyi kaldırdık
    console.log("Kullanıcı çerezleri reddetti.");
    // Reddedildiğinde analitikler veya reklam çerezleri yüklenmemelidir.
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Kabul Et"
      declineButtonText="Reddet"
      enableDeclineButton
      cookieName="ucuzbezcantaCookieConsent"
      style={{ background: "#2B3743", zIndex: 9999 }}
      buttonStyle={{ color: "#ffffff", fontSize: "15px", background: "#4CAF50" }}
      declineButtonStyle={{ color: "#ffffff", fontSize: "15px", background: "#f44336" }}
      contentStyle={{ flex: "1 0 200px", margin: "10px", textAlign: "left" }}
      containerClasses="flex items-center justify-between p-4 fixed bottom-0 left-0 w-full shadow-lg"
      buttonClasses="px-4 py-2 rounded-md font-bold transition-all duration-300 hover:scale-105 mr-2"
      declineButtonClasses="px-4 py-2 rounded-md font-bold transition-all duration-300 hover:scale-105"
      onAccept={handleAcceptCookie}
      onDecline={handleDeclineCookie} // Artık buraya da uymalı
      // debug={true}
      expires={365}
    >
      Web sitemiz, deneyiminizi geliştirmek ve hizmetlerimizi sunmak için çerezleri kullanır. Detaylı bilgi için{' '}
      <Link href="/cerez-politikasi" className="text-blue-300 hover:underline font-bold">
        Çerez Politikamızı
      </Link>{' '}inceleyebilirsiniz.
    </CookieConsent>
  );
}