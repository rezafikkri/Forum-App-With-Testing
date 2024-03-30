'use client';

import Navbar from '@/components/navbar';
import { useAppSelector } from '@/hooks/redux-hooks';

export default function SignedInLayout({ children }) {
  const isPreload = useAppSelector((states) => states.isPreload);

  if (isPreload) return null;

  return (
    <>
      <header className="max-w-5xl mx-auto px-4 sm:px-8">
        <Navbar />
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-8">
        {children}
      </main>
      <footer className="max-w-5xl mx-auto px-4 sm:px-8"></footer>
    </>
  );
}
