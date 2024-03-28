/* eslint-disable consistent-return */

export function middleware(request) {
  const isSignIn = request.cookies.get('isSignIn')?.value;

  if (
    isSignIn
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
