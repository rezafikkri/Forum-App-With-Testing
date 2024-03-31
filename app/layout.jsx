import { Open_Sans as OpenSans } from 'next/font/google';
import PropTypes from 'prop-types';
import StoreProvider from './store-provider';
import './globals.css';
import Loading from '../components/loading';
import IsPreload from './is-preload';

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
    <html lang="en" data-theme="light" className="light">
      <body className={`${openSans.className} bg-gray-50 dark:bg-inherit min-h-screen text-gray-800`}>
        <StoreProvider>
          <Loading />
          <IsPreload />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
