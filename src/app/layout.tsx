import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchCategories } from "./lib/strapi";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header categories={categories}/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}