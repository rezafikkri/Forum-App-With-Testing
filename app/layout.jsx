import { Open_Sans as OpenSans } from 'next/font/google';
import PropTypes from 'prop-types';
import Providers from './providers';
import './globals.css';
import Loading from '../components/loading';

const openSans = OpenSans({
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
      <body className={`${openSans.className} bg-gray-50 h-screen text-gray-800`}>
        <Providers>
          <Loading />
          <main className="max-w-md mx-auto px-4 sm:px-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
