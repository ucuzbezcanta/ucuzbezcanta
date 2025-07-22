// app/page.tsx

import HeroSection from "@/components/HeroSection";
// Sadece kullanılan fetch fonksiyonlarını import ediyoruz
import { fetchSlides, fetchFeaturedProducts } from "./lib/supabase"; // fetchBlogPosts ve fetchCategories kaldırıldı

import ValueProps from "@/components/ValueProps";
import Intro from "@/components/Intro";
import NewsletterForm from "@/components/NewsletterForm";
import FeaturedProductsClient from "@/components/FeaturedProductsClient";

import { Metadata } from "next";

export const revalidate = 60; // 60 saniye (1 dakika)


export const metadata: Metadata = {
    title: 'Ucuz bez çanta | Toptan Bez Çanta ve Promosyon Ürünleri',
    description: 'Ucuz Bez Çanta olarak toptan bez çanta, ham bez çanta, promosyon çanta ve bez kese üretiminde uygun fiyatlar ve hızlı teslimat sunuyoruz. Çevre dostu çözümler!',
    keywords: ['ucuz bez canta', 'toptan bez canta', 'ham bez canta', 'promosyon çanta', 'bez kese', 'çevre dostu çanta', 'çanta üretimi', 'baskılı bez çanta'],
    openGraph: {
      title: 'Ucuz Bez Çanta | Toptan Bez Çanta ve Promosyon Ürünleri',
      description: 'Ucuz Bez Çanta olarak toptan bez çanta, ham bez çanta, promosyon çanta ve bez kese üretiminde uygun fiyatlar ve hızlı teslimat sunuyoruz. Çevre dostu çözümler!',
      url: 'https://www.ucuzbezcanta.com',
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


export default async function HomePage() {

  const slides = await fetchSlides();
  const featuredProducts = await fetchFeaturedProducts();


  

  return (
    
    <div className="flex flex-col min-h-screen">
      <Intro/>
      <HeroSection slides={slides || []} />
      <FeaturedProductsClient initialProducts={featuredProducts}/>
      <ValueProps/>
      <NewsletterForm/>
      

    </div>
  );
}