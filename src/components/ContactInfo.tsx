import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function ContactInfo() {
    return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Konum</h3>
      <p className="text-gray-600 text-lg mb-6">
        Fetihtepe Mahallesi Tepe üstü Sokak No:41A <br />
        Beyoğlu - İstanbul (TR)
      </p>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bizi Takip Edin</h3>
      <div className="flex space-x-4 mb-6">
        <Link 
        href="/"
        className="text-gray-600 hover:text-blue-400 transition-colors duration-300">
            <FaFacebook size={24}/>
        </Link>
        <Link 
        href="/"
        className="text-gray-600 hover:text-blue-400 transition-colors duration-300">
            <FaTwitter size={24}/>
        </Link>
        <Link 
        href="/"
        className="text-gray-600 hover:text-blue-400 transition-colors duration-300">
            <FaInstagram size={24}/>
        </Link>

      </div>
      <p className="text-gray-500 text-sm">
        ©2024 Gizlilik Politikası
      </p>
    </div>
    
    );
}