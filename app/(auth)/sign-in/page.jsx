import SignInInput from '@/components/sign-in-input';

export const metadata = {
  title: 'Sign In',
};

export default function Page() {
  return (
    <>
      <h1 className="font-extrabold text-3xl mb-2 pt-20">Sign In</h1>
      <p className="mb-6">Hi, welcome</p>
      <SignInInput />
    </>
  );
}
