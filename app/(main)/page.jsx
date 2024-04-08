import Link from 'next/link';
import { cookies } from 'next/headers';
import ThreadsList from '@/components/threads-list';
import ThreadsFilter from '@/components/threads-filter';

export const metadata = {
  title: 'Threads',
};

export default function Page() {
  const signIn = cookies().get('signIn')?.value;

  return (
    <>
      <header className="mt-20 mb-9">
        <div className="flex justify-between mb-2">
          <h1 className="font-extrabold text-3xl">Threads</h1>
          {signIn && <Link href="/create" className="btn btn-primary btn-sm">Create Thread</Link>}
        </div>
        <div className="flex justify-between items-center">
          <ThreadsFilter />
        </div>
      </header>
      <ThreadsList />
    </>
  );
}
