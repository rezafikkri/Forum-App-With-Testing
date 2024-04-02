'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
import useInput from '../hooks/use-input';

export default function SignInInput({ onSignIn }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleSubmit(e) {
    e.preventDefault();

    onSignIn({ email, password });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 mt-4">
        <label className="input input-bordered flex items-center gap-2">
          <i className="bi bi-envelope-fill text-gray-500 leading-none"></i>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={onEmailChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <i className="bi bi-lock-fill text-gray-500 leading-none"></i>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
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

SignInInput.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};
