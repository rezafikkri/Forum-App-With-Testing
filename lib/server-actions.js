'use server';

import { cookies } from 'next/headers';
import api from './api';

export async function authenticate({ email, password }) {
  const response = await fetch(`${api.BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  // set session for use in middleware.js,
  // for protecting route (not realy protect, just make user cannot access some route, 
  // like /sign-in when user has signed in, real protect is in server with accessToken)
  cookies().set({
    name: 'isSignIn',
    value: true,
    httpOnly: true,
    path: '/',
  })

  return await response.json();
}
