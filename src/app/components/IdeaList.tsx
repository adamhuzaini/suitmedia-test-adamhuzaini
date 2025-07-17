// src/components/IdeaList.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import IdeaCard from './IdeaCard';

interface Idea {
  id: number;
  title: string;
  small_image: { url: string }[];
  published_at: string;
}

// Wrapper untuk Suspense agar tidak error saat navigasi
export default function IdeaList() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading ideas...</div>}>
      <IdeaListContent />
    </Suspense>
  );
}

function IdeaListContent() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [meta, setMeta] = useState({ total: 0, last_page: 1 });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get('page') || '1');
  const perPage = Number(searchParams.get('perPage') || '10');
  const sortBy = searchParams.get('sort') || '-published_at';

  useEffect(() => {
    const fetchIdeas = async () => {
      const params = new URLSearchParams({
        'page[number]': page.toString(),
        'page[size]': perPage.toString(),
        'append[]': 'small_image',
        sort: sortBy,
      });

      try {
        // PERUBAHAN: Menambahkan method dan headers pada fetch
        const response = await fetch(`/api/ideas?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const data = await response.json();
        
        setIdeas(data.data || []);
        setMeta({
          total: data.meta?.total || 0,
          last_page: data.meta?.last_page || 1,
        });

      } catch (error) {
        console.error('Failed to fetch ideas:', error);
      }
    };

    fetchIdeas();
  }, [page, perPage, sortBy]);

  const handleFilterChange = (key: 'perPage' | 'sort', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set('page', '1'); // Kembali ke halaman 1 saat filter berubah
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > meta.last_page) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const showingStart = (page - 1) * perPage + 1;
  const showingEnd = Math.min(page * perPage, meta.total);

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <p className="text-gray-600">
          Showing {showingStart}-{showingEnd} of {meta.total}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="per-page" className="text-sm text-gray-600">Show per page:</label>
            <select
              id="per-page"
              value={perPage}
              onChange={(e) => handleFilterChange('perPage', e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm text-gray-600">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {ideas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
      </div>

      <div className="flex justify-center items-center mt-12 space-x-2">
        <button onClick={() => handlePageChange(1)} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">«</button>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">‹</button>
        <span className="px-4 py-2 bg-orange-500 text-white rounded-md">{page}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === meta.last_page} className="px-3 py-1 border rounded disabled:opacity-50">›</button>
        <button onClick={() => handlePageChange(meta.last_page)} disabled={page === meta.last_page} className="px-3 py-1 border rounded disabled:opacity-50">»</button>
      </div>
    </section>
  );
}