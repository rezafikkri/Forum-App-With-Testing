import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center pt-6">
      <Link href="/" className="no-underline">
        <Image
          src="/logo.svg"
          alt="Forum App Logo"
          width="35"
          height="35"
        />
      </Link>
      <div className="basis-full flex justify-between ms-7">
        <ul className="flex gap-7">
          <li><Link href="/" className="hover:text-primary">Threads</Link></li>
          <li><Link href="/leaderboards" className="hover:text-primary">Leaderboards</Link></li>
        </ul>
        <ul>
          <li><Link href="/sign-in" className="hover:text-primary">Sign In</Link></li>
        </ul>
      </div>
    </nav>
  );
}
