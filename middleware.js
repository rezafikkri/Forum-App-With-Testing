/* eslint-disable consistent-return */
import { cookies } from 'next/headers';

export function middleware(request) {
  const signIn = cookies().get('signIn')?.value;

  if (
    signIn
    && (
      request.nextUrl.pathname.startsWith('/sign-in')
      || request.nextUrl.pathname.startsWith('/register')
    )
  ) {
    return Response.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
