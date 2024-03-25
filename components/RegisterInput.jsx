'use client'

import { Input, Button, Link } from '@nextui-org/react';
import useInput from '@/hooks/useInput';
import { NEXTUI_INPUT_PROPS } from '@/lib/constants';

export default function RegisterInput() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <>
      <form action="" className="flex flex-col gap-y-4">
        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={onNameChange}
          { ...NEXTUI_INPUT_PROPS }
        />
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChange}
          { ...NEXTUI_INPUT_PROPS }
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={onPasswordChange}
          { ...NEXTUI_INPUT_PROPS }
        />
        <Button color="primary" radius="sm" size="lg">Register</Button>
      </form>
      <p className="text-sm mt-2 text-center">
        <span>Already have an account? </span>
        <Link href="/signin" size="sm">Sign In</Link>
      </p>
    </>
  );
}
