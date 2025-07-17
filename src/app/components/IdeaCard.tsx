// src/components/IdeaCard.tsx

import Image from 'next/image';

interface Idea {
  id: number;
  title: string;
  small_image: { url: string }[];
  published_at: string;
}

export default function IdeaCard({ idea }: { idea: Idea }) {
  const imageUrl = idea.small_image?.[0]?.url || '/placeholder.jpg';
  
  const formattedDate = new Date(idea.published_at).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    // TAMBAHKAN STYLE OPACITY DI DIV PALING LUAR INI
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300"
      style={{ opacity: 1 }} // <-- INI BAGIAN YANG TERLEWAT
    >
      <div className="relative w-full aspect-video">
        <Image
          src={imageUrl}
          alt={idea.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          style={{ opacity: 1 }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 mb-2">{formattedDate}</p>
        <h3 className="font-semibold text-gray-800 line-clamp-3">
          {idea.title}
        </h3>
      </div>
    </div>
  );
}