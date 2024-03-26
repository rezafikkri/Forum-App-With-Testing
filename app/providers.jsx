'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import StoreProvider from './store-provider';

export default function Providers({ children }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <StoreProvider>
        {children}
      </StoreProvider>
    </NextUIProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
