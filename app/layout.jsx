import { Open_Sans } from 'next/font/google';
import { Providers } from './Providers';
import './globals.css';

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
      <body className={open_sans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
