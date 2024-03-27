'use client';

import { Input, Button, Link } from '@nextui-org/react';
import PropTypes from 'prop-types';
import useInput from '../hooks/use-input';
import { NEXTUI_INPUT_PROPS } from '../lib/constants';

export default function SignInInput({ onSignIn }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleSubmit(e) {
    e.preventDefault();

    onSignIn({ email, password });
  }

  return (
    <>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChange}
          {...NEXTUI_INPUT_PROPS}
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={onPasswordChange}
          {...NEXTUI_INPUT_PROPS}
        />
        <Button type="submit" color="primary" radius="sm" size="lg">Sign In</Button>
      </form>
      <p className="text-sm mt-2 text-center text-gray-700">
        <span>Don&apos;t have an account? </span>
        <Link href="/register" size="sm">Register</Link>
      </p>
    </>
  );
}

SignInInput.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};
