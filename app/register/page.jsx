'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../../components/alert';
import RegisterInput from '../../components/register-input';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { asyncRegisterUser } from '../../lib/users/action';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [registerError, setRegisterError] = useState(null);

  function handleRegister({ name, email, password }) {
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
      <h1 className="font-extrabold text-3xl mb-8 pt-12">Register</h1>
      {registerError && <Alert message={registerError} onClose={resetRegisterErrorState} />}
      <RegisterInput onRegister={handleRegister} />
    </>
  );
}
