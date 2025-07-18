import Image from 'next/image';
import { useState } from 'react';

interface Idea {
  id: number;
  title: string;
  small_image: { url: string }[];
  published_at: string;
}

export default function IdeaCard({ idea }: { idea: Idea }) {
  const [imageError, setImageError] = useState(false);

  // Ambil URL gambar pertama
  let imageUrl = idea.small_image?.[0]?.url;

  // Jika URL ada tapi tidak pakai http/https, tambahkan domain backend
  if (imageUrl && !imageUrl.startsWith('http')) {
    imageUrl = `https://suitmedia-backend.suitdev.com${imageUrl}`;
  }

  // Jika error atau tidak ada gambar, pakai placeholder
  if (!imageUrl || imageError) {
    imageUrl = '/placeholder.jpg';
  }

  const formattedDate = new Date(idea.published_at).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300">
      <div className="relative w-full aspect-video">
        <Image
          src={imageUrl}
          alt={idea.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 mb-2">{formattedDate}</p>
        <h3 className="font-semibold text-gray-800 line-clamp-3">{idea.title}</h3>
      </div>
    </div>
  );
}
