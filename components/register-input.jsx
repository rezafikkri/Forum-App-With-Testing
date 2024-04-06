'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
import useInput from '../hooks/use-input';

export default function RegisterInput({ onRegister }) {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({ name, email, password });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-1">
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

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
