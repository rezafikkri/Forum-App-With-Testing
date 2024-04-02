import { Open_Sans as OpenSans } from 'next/font/google';
import PropTypes from 'prop-types';
import StoreProvider from './store-provider';
import Loading from '../components/loading';
import IsPreload from './is-preload';
import './globals.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';

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
      <body className={`${openSans.className} bg-base-200 dark:bg-inherit min-h-screen text-gray-800`}>
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
