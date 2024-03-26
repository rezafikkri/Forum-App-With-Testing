import { Open_Sans } from 'next/font/google';
import { Providers } from './Providers';
import './globals.css';
import Loading from '@/components/Loading';

const open_sans = Open_Sans({
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'Forum App With Testing',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={`${open_sans.className} bg-gray-50 h-screen text-gray-800`}>
        <Providers>
          <Loading />
          <main className="max-w-md mx-auto px-4 sm:px-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
