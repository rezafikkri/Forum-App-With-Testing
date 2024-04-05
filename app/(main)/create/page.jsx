'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ThreadInput from '@/components/thread-input';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { asyncCreateThread } from '@/lib/threads/action';
import Alert from '@/components/alert';

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createThreadError, setCreateThreadError] = useState(null);

  function handleCreateThread({ title, category, body }) {
    dispatch(asyncCreateThread({ title, category, body }))
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        setCreateThreadError(error.message);
      });
  }

  function resetCreateThreadErrorState() {
    setCreateThreadError(null);
  }

  return (
    <>
      <h1 className="font-extrabold text-3xl mb-6 mt-20">Create Thread</h1>
      {createThreadError
        && <Alert message={createThreadError} onClose={resetCreateThreadErrorState} />}
      <ThreadInput onCreateThread={handleCreateThread} />
    </>
  );
}
