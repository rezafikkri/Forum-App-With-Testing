import { Open_Sans as OpenSans } from 'next/font/google';
import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import StoreProvider from './store-provider';
import Loading from '../components/loading';
import IsPreload from './is-preload';
import '../styles/globals.css';

const openSans = OpenSans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata = {
  title: {
    template: '%s | Forum App',
    default: 'Forum App',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="light">
      <body className={`${openSans.className} ${openSans.variable} bg-base-200 dark:bg-inherit min-h-screen text-gray-800`}>
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
