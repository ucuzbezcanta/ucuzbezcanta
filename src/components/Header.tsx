// app/components/Header.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {

    const [isOpen, setIsOpen] = useState(false); // Mobil menü açık/kapalı durumu
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); // Kategori dropdown açık/kapalı durumu (masaüstü için)
    const [isMobileCategoryDropdownOpen, setIsMobileCategoryDropdownOpen] = useState(false); // Kategori dropdown açık/kapalı durumu (mobil için)
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Mobil menü kapanırken kategori dropdown'ı da kapat
    if (isOpen) {
      setIsMobileCategoryDropdownOpen(false);
      setIsSearchOpen(false);
    }
  };

  const toggleCategoryDropdown = () => {
    setIsMobileCategoryDropdownOpen(!isMobileCategoryDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  }

  useEffect(() => {
    if(isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [isSearchOpen]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if(isSearchOpen && !isOpen) {
            const target = event.target as HTMLElement;
            const searchIcon = document.getElementById('search-icon');
            const searchContainer = document.getElementById('search-container');

            if ( searchIcon && searchContainer && 
                !searchIcon.contains(target) &&
                !searchContainer.contains(target)) {
                    setIsSearchOpen(false);
                }
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return() => {
        document.removeEventListener('mousedown',handleClickOutside);
    };
  }, [isSearchOpen, isOpen]);

  // Navigasyon linklerinin varyantları (mobil menü için)
  const navVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Tek tek link öğelerinin varyantları (mobil menü için)
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Dropdown menü varyantları
  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, scaleY: 0, originY: 0 },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      originY: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const,   
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scaleY: 0,
      originY: 0,
      transition: {
        duration: 0.15,
        ease: "easeIn" as const,
      },
    },
  };


  //Arama kutusu animasyon variants
  const searchBarVariants: Variants = {
    hidden: {width:0, opacity:0, transition:{duration:0.2, ease:"easeOut" as const}},
    visible: {width: "16rem", opacity:1, transition: {duration:0.3, ease:"easeOut" as const}},
    mobileVisible: {width: "calc(100% - 32px)", opacity:1, transition:{duration: 0.3, ease:"easeOut" as const}},
  };

return (
    <header className="bg-gradient-to-r from-[#323d42] to-[#3f778c] text-white p-4 shadow-xl relative z-20"> {/* relative ve z-index */}
      <nav className="container mx-auto flex justify-between items-center h-10"> {/* h-10 eklendi */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight">
          <Image
              src="/images/logo_white.png"
              alt="Logo"
              width={150}
              height={50}
              priority
          />
        </Link>

        {/* Desktop Menü ve Arama */}
        <div className="hidden md:flex items-center space-x-8"> {/* Menü ve arama ikonunu kapsayan div */}
          <ul className="flex space-x-8 text-lg items-center">
            <li>
              <Link href="/" className="hover:text-blue-200 transition-colors duration-300">
                Anasayfa
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="hover:text-blue-200 transition-colors duration-300">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-200 transition-colors duration-300">
                Blog
              </Link>
            </li>
            {/* Kategoriler Dropdown (Desktop) */}
            <li
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <span className="cursor-pointer hover:text-blue-200 transition-colors duration-300 flex items-center">
                Kategoriler
                <motion.svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  variants={{
                    closed: { rotate: 0 },
                    open: { rotate: 180 },
                  }}
                  animate={isCategoryDropdownOpen ? "open" : "closed"}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </motion.svg>
              </span>
              <AnimatePresence>
                {isCategoryDropdownOpen && categories.length > 0 && (
                  <motion.ul
                    className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-2 z-30"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/kategoriler/${category.slug}`}
                          className="block px-4 py-2 text-sm text-white hover:bg-blue-600 transition-colors duration-200"
                          onClick={() => setIsCategoryDropdownOpen(false)}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-blue-200 transition-colors duration-300">
                İletişim
              </Link>
            </li>
          </ul>

          {/* Masaüstü Arama İkonu ve Kutusu */}
          <div className="relative flex items-center">
            <button
              id="search-icon"
              onClick={toggleSearch}
              className="focus:outline-none text-white hover:text-blue-200 transition-colors duration-300"
              aria-label="Search"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  id="search-container"
                  className="absolute right-0 flex items-center bg-gray-700 rounded-md shadow-lg p-2"
                  variants={searchBarVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <input
                    type="text"
                    ref={searchInputRef}
                    placeholder="Ara..."
                    className="bg-transparent border-b border-blue-500 focus:outline-none text-white placeholder-blue-200 w-full px-2 py-1"
                  />
                  <button onClick={toggleSearch} className="ml-2 text-blue-200 hover:text-white focus:outline-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


        {/* Mobil Hamburger Butonu ve Arama İkonu */}
        <div className="md:hidden flex items-center space-x-4 z-20"> {/* Mobil ikonları bir arada tutan div */}
          <button
            onClick={toggleSearch}
            className="focus:outline-none text-white hover:text-blue-200 transition-colors duration-300"
            aria-label="Search"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
          <button
            onClick={toggleMenu}
            className="focus:outline-none relative w-8 h-8 flex flex-col justify-around"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-full h-1 bg-white rounded-full transition-all duration-300"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 },
              }}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
            ></motion.span>
            <motion.span
              className="block w-full h-1 bg-white rounded-full transition-all duration-300"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
            ></motion.span>
            <motion.span
              className="block w-full h-1 bg-white rounded-full transition-all duration-300"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -9 },
              }}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
            ></motion.span>
          </button>
        </div>
      </nav>

      {/* Mobil ve Masaüstü Arama Kutusu (Ana Header Altında - Masaüstüde menü ile aynı hizada olacak şekilde konumlandı) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="absolute top-full left-0 w-full p-4 bg-gray-700 shadow-xl flex items-center justify-center md:hidden" // Mobil görünümde tam genişlik
            variants={searchBarVariants}
            initial="hidden"
            animate="mobileVisible" // Mobil için farklı animasyon varyantı
            exit="hidden"
          >
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Ara..."
              className="bg-transparent border-b border-blue-500 focus:outline-none text-white placeholder-blue-200 w-full px-2 py-1"
            />
            <button onClick={toggleSearch} className="ml-2 text-blue-200 hover:text-white focus:outline-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobil Menü İçeriği */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-gray-700 bg-opacity-95 flex items-center justify-center z-10"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="flex flex-col space-y-6 text-2xl"
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li variants={itemVariants}>
                <Link href="/" onClick={toggleMenu} className="hover:text-blue-200 transition-colors duration-300">
                  Anasayfa
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link href="/hakkimizda" onClick={toggleMenu} className="hover:text-blue-200 transition-colors duration-300">
                  Hakkımızda
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link href="/blog" onClick={toggleMenu} className="hover:text-blue-200 transition-colors duration-300">
                  Blog
                </Link>
              </motion.li>
              {/* Kategoriler Dropdown (Mobil) */}
              <motion.li variants={itemVariants}>
                <div
                  className="cursor-pointer hover:text-blue-200 transition-colors duration-300 flex items-center justify-between"
                  onClick={toggleCategoryDropdown}
                >
                  Kategoriler
                  <motion.svg
                    className="w-6 h-6 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    variants={{
                      closed: { rotate: 0 },
                      open: { rotate: 180 },
                    }}
                    animate={isMobileCategoryDropdownOpen ? "open" : "closed"}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </motion.svg>
                </div>
                <AnimatePresence>
                  {isMobileCategoryDropdownOpen && categories.length > 0 && (
                    <motion.ul
                      className="mt-4 pl-4 space-y-4 text-xl"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {categories.map((category) => (
                        <motion.li key={category.id} variants={itemVariants}>
                          <Link
                            href={`/kategoriler/${category.slug}`}
                            onClick={toggleMenu}
                            className="block hover:text-blue-200 transition-colors duration-300"
                          >
                            {category.name}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link href="/iletisim" onClick={toggleMenu} className="hover:text-blue-200 transition-colors duration-300">
                  İletişim
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}