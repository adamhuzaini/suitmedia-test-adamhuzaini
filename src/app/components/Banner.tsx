// src/components/Banner.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Banner() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="relative h-[60vh] w-full overflow-hidden"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        WebkitClipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)', // untuk Safari
      }}
    >
      {/* Background Image dengan Parallax */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <Image
          src="/b.jpg" // ganti dengan dynamic CMS path nanti
          alt="Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Teks Parallax */}
      <div
        className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center will-change-transform"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <h1 className="text-5xl font-bold">Ideas</h1>
        <p className="text-lg mt-2">Where all our great things begin</p>
      </div>
    </div>
  );
}
