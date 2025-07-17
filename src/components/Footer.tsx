import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaAmilia, FaCcVisa, FaCcMastercard } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 mt-12">
            <div className="py-8 flex justify-center">
                <Link href="/" className="text-2xl font-bold text-blue-800">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={150}
                        height={50}
                        priority
                    />
                </Link>
            </div>

    {/* Orta Bölüm - 4 Sütun */}
      <div className="border-t border-b border-gray-200 py-10 px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto text-sm">
        
        {/* Hakkımızda */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Hakkımızda</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tek Tanıtım Şirketler Grubu, 15 yılı aşkın sektör tecrübesiyle promosyon ürünleri üzerine ar-ge ve inovasyon çalışmalarını sürdürmeye devam ediyor.
          </p>
        </div>
        
        {/* Linkler */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Linkler</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-600">Anasayfa</Link></li>
            <li><Link href="/hakkimizda" className="hover:text-blue-600">Hakkımızda</Link></li>
            <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
            <li><Link href="/iletisim" className="hover:text-blue-600">İletişim</Link></li>
          </ul>
        </div>

        {/* S.S.S. & Yasal */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Yardım</h4>
          <ul className="space-y-2">
            <li><Link href="/sss" className="hover:text-blue-600">Sıkça Sorulan Sorular</Link></li>
            
            <li><Link href="/iade" className="hover:text-blue-600">İade Politikası</Link></li>
           
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">İletişim</h4>
          <ul className="space-y-2 text-sm">
            <li><FaAmilia className="inline-block mr-2" /> info@tektanitim.com.tr</li>
            <li>+90 (212) 659 25 30</li>
            <li>Fetihtepe Mahallesi Tepe üstü Sk. No:41A Beyoğlu İstanbul, Türkiye</li>
          </ul>
        </div>
      </div>
      {/* Alt Bölüm - Sosyal + Ödeme */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-6 max-w-screen-xl mx-auto">
        {/* Sosyal */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://www.facebook.com/ucuzbezcanta" className="text-gray-500 hover:text-blue-600"><FaFacebookF size={20} /></a>
          <a href="https://www.x.com/ubcucuzbezcanta" className="text-gray-500 hover:text-blue-600"><FaTwitter size={20} /></a>
          <a href="https://www.instagram.com/ucuzbezcanta" className="text-gray-500 hover:text-blue-600"><FaInstagram size={20} /></a>
          <span className="sm:text-base text-[10px] text-qgray font-300">©2025
            <a href="#" rel="noreferrer" className="font-500 text-qblack mx-1">Tek Tanıtım Reklam</a>All rights reserved</span>
        </div>
        {/* Ödeme */}
        <div className="flex space-x-4">
          <FaCcVisa size={32} className="text-gray-500" />
          <FaCcMastercard size={32} className="text-gray-500" />
        </div>
      </div>
       
        </footer>
    )
}