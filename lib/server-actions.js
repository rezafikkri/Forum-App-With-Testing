'use server';

import { cookies } from 'next/headers';
import { decrypt, encrypt } from './encrypt-decrypt';

export async function fetchWithAuth(url, options = {}) {
  try {
    const encryptedSignIn = cookies().get('signIn')?.value;
    let accessToken = '';

    if (encryptedSignIn) {
      const signIn = JSON.parse(decrypt(encryptedSignIn));
      ({ accessToken } = signIn);
    }
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function authenticate({ baseUrl, email, password }) {
  try {
    const authResponse = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const authResponseJson = await authResponse.json();
    const { status, message } = authResponseJson;

    if (status === 'success') {
      const { data: { token } } = authResponseJson;
      const encrypted = encrypt(JSON.stringify({ accessToken: token })); // encrypt token
      // set session for use in middleware.js,
      // for protecting route (not realy protect, just make user cannot access some route,
      // like /sign-in when user has signed in, real protect is in server with accessToken)
      cookies().set({
        name: 'signIn',
        value: encrypted,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        path: '/',
      });

      // get user signed in data
      const authUserResponse = await fetch(`${baseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await authUserResponse.json();
    }

    return { status, message, data: {} };
  } catch (error) {
    throw new Error(error);
  }
}

export async function signOut() {
  cookies().delete('signIn');
}
