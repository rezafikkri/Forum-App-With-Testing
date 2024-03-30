'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { asyncPreloadProccess } from '@/lib/isPreload/action';

export default function IsPreload() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProccess());
  }, [dispatch]);

  return null;
}
