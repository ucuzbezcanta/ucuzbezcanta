import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchCategories } from "./lib/supabase";
import TopHeader from "@/components/TopHeader";
import Script from "next/script";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ucuzbezcanta",
  description: "Promosyon ham bez çanta üretimi",
};

// Buraya 'async' anahtar kelimesini ekliyoruz
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await fetchCategories(); // Şimdi 'await' burada sorunsuz kullanılabilir
  
  
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-280576298"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-280576298');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <TopHeader/>
        <Header categories={categories}/>
        {children}
        <Footer/>
        <CookieConsentBanner/>
      </body>
    </html>
  );
}