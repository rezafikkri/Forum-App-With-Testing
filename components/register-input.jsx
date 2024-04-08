'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Alert from '@/components/alert';
import useInput from '../hooks/use-input';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { asyncRegisterUser } from '@/lib/users/action';

export default function RegisterInput() {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [registerError, setRegisterError] = useState(null);

  function handleRegister(e) {
    e.preventDefault();

    dispatch(asyncRegisterUser({ name, email, password }))
      .then(() => {
        router.push('/sign-in');
      }).catch((error) => {
        setRegisterError(error.message);
      });
  }

  function resetRegisterErrorState() {
    setRegisterError(null);
  }

  return (
    <>
      {registerError && <Alert message={registerError} onClose={resetRegisterErrorState} />}
      <form onSubmit={handleRegister} className="flex flex-col gap-y-1">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit" className="btn btn-primary mt-2">Register</button>
      </form>
      <p className="text-sm mt-2 text-center text-gray-700">
        <span>Already have an account? </span>
        <Link href="/sign-in" className="link link-neutral">Sign In</Link>
      </p>
    </>
  );
}
