'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavMenu() {
  const browserPath = usePathname();

  function isNavLinkActive(path) {
    if (path === browserPath) return 'text-primary';
    return '';
  }

  return (
    <ul className="flex gap-7">
      <li>
        <Link
          href="/"
          className={`hover:text-primary ${isNavLinkActive('/')}`}
        >
          Threads
        </Link>
      </li>
      <li>
        <Link
          href="/leaderboards"
          className={`hover:text-primary ${isNavLinkActive('/leaderboards')}`}
        >
          Leaderboards
        </Link></li>
    </ul>
  );
}
