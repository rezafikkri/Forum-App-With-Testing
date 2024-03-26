'use client'

import {NextUIProvider} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import StoreProvider from './StoreProvider';

export function Providers({children}) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <StoreProvider>
        {children}
      </StoreProvider>
    </NextUIProvider>
  );
}
