// src/app/page.tsx

import Header from '@/app/components/Header';
import Banner from '@/app/components/Banner';
import IdeaList from '@/app/components/IdeaList';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Banner />
      <IdeaList />
    </main>
  );
}