// src/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        lastScrollY > 50
          ? 'bg-orange-500/90 shadow-lg backdrop-blur-sm'
          : 'bg-orange-500'
      }`}
    >
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* PERBAIKAN: Logo dibungkus Link dan menggunakan width & height */}
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={150}      // Ganti dengan lebar ASLI gambar Anda untuk rasio
            height={50}      // Ganti dengan tinggi ASLI gambar Anda untuk rasio
            className="w-36 h-auto" // Atur LEBAR TAMPIL di sini, tinggi akan otomatis proporsional
            priority
          />
        </Link>
        <ul className="flex items-center gap-8 text-white font-medium hover: ">
          <li><Link href="/work">Work</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li className={isActive('/ideas') ? 'font-bold border-b-2' : ''}>
            <Link href="/ideas">Ideas</Link>
          </li>
          <li><Link href="/careers">Careers</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}