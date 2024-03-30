'use client';

import { useAppSelector } from '@/hooks/redux-hooks';

export default function UnSignedInLayout({ children }) {
  const isPreload = useAppSelector((states) => states.isPreload);

  if (isPreload) return null;

  return (
    <main className="max-w-md mx-auto px-4 sm:px-8">{children}</main>
  );
}
