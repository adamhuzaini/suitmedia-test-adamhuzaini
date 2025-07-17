// src/components/Banner.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Banner() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="relative h-[50vh] w-full overflow-hidden"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
    >
      <div className="absolute inset-0 z-0">
  <Image
    src="/b.jpg" 
    alt="Banner"
    fill
    priority
    className="object-cover"
    style={{ transform: `translateY(${offsetY * 0.5}px)` }}
  />
  {/* UBAH BARIS DI BAWAH INI */}
  <div className="absolute inset-0 bg-black/40"></div>
</div>
      <div
        className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <h1 className="text-5xl font-bold">Ideas</h1>
        <p className="text-lg mt-2">Where all our great things begin</p>
      </div>
    </div>
  );
}