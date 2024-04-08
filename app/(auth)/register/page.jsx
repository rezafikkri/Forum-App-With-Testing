import RegisterInput from '@/components/register-input';

export const metadata = {
  title: 'Register',
};

export default function Page() {
  return (
    <>
      <h1 className="font-extrabold text-3xl mb-6 pt-20">Register</h1>
      <RegisterInput />
    </>
  );
}
