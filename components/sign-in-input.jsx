'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@/components/alert';
import { useAppDispatch } from '@/hooks/redux-hooks';
import useInput from '../hooks/use-input';
import { asyncSetAuthUser } from '@/lib/authUser/action';

export default function SignInInput() {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [signInError, setSignInError] = useState(null);

  function handleSignIn(e) {
    e.preventDefault();

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
      {signInError && <Alert message={signInError} onClose={resetSignInErrorState} />}
      <form onSubmit={handleSignIn} className="flex flex-col gap-y-3 mt-4">
        <label className="input input-bordered flex items-center gap-2">
          <i className="bi bi-envelope-fill text-gray-500 leading-none"></i>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <i className="bi bi-lock-fill text-gray-500 leading-none"></i>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit" className="btn btn-primary mt-1">Sign In</button>
      </form>
      <p className="text-sm mt-2 text-center text-gray-700">
        <span>Don&apos;t have an account? </span>
        <Link href="/register" className="link link-neutral">Register</Link>
      </p>
    </>
  );
}
