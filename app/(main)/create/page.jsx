import ThreadInput from '@/components/thread-input';

export const metadata = {
  title: 'Create Thread',
};

export default function Page() {
  return (
    <>
      <h1 className="font-extrabold text-3xl mb-6 mt-20">Create Thread</h1>
      <ThreadInput />
    </>
  );
}
