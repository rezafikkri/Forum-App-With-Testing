'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@/components/alert';
import { useAppDispatch } from '@/hooks/redux-hooks';
import SignInInput from '@/components/sign-in-input';
import { asyncSetAuthUser } from '@/lib/authUser/action';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [signInError, setSignInError] = useState(null);

  function handleSignIn({ email, password }) {
    dispatch(asyncSetAuthUser({ email, password }))
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        setSignInError(error.message);
      });
  }

  function resetSignInErrorState() {
    setSignInError(null);
  }

  return (
    <>
      <h1 className="font-extrabold text-3xl mb-2 pt-20">Sign In</h1>
      <p className="mb-6">Hi, welcome</p>
      {signInError && <Alert message={signInError} onClose={resetSignInErrorState} />}
      <SignInInput onSignIn={handleSignIn} />
    </>
  );
}
