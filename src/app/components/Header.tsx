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

  const menuItems = [
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Ideas', path: '/ideas' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        lastScrollY > 50
          ? 'bg-orange-500/90 shadow-lg backdrop-blur-sm'
          : 'bg-orange-500'
      }`}
    >
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={150}
            height={50}
            className="w-36 h-auto"
            priority
          />
        </Link>
        <ul className="flex items-center gap-6 text-white font-medium">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`transition-all duration-200 pb-1 ${
                  isActive(item.path)
                    ? 'border-b-2 border-white font-semibold'
                    : 'hover:border-b-2 hover:border-white/70'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
