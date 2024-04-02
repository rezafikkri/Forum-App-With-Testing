import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import NavProfile from './nav-profile';
import NavMenu from './nav-menu';

export default function Navbar() {
  const signIn = cookies().get('signIn')?.value;

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
      <div className="basis-full flex justify-between items-center ms-7">
        <NavMenu />
        <ul className="leading-none">
          <li>
            {signIn ? (
              <NavProfile />
            ) : (
              <Link href="/sign-in" className="hover:text-primary">Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
