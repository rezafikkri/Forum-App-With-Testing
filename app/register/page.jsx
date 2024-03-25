import Alert from '@/components/Alert';
import RegisterInput from '@/components/RegisterInput';

export default function page() {
  return (
    <>
      <h1 className="font-extrabold text-3xl mb-8 pt-12">Register</h1>
      <Alert />
      <RegisterInput />
    </>
  );
}
