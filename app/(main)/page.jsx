'use client';

import ThreadsList from '@/components/threads-list';
import { useAppSelector } from '@/hooks/redux-hooks';
import Link from 'next/link';

export default function Home() {
  const authUser = useAppSelector((states) => states.authUser);

  return (
    <>
      <header className="mt-20 mb-9">
        <div className="flex justify-between mb-2">
          <h1 className="font-extrabold text-3xl">Threads</h1>
          {authUser && <Link href="/create" className="btn btn-primary btn-sm">Create Thread</Link>}
        </div>
        <div className="flex justify-between items-center">
          <p>200 threads</p>
          <div className="flex items-center">
            <span className="border-y border-s border-gray-300 bg-gray-50 h-8 flex px-3 items-center text-sm rounded-tl-lg rounded-bl-lg">Category</span>
            <select className="select select-bordered w-full select-sm rounded-bl-none rounded-tl-none">
              <option>all</option>
              <option>General</option>
              <option>Redux</option>
            </select>
          </div>
        </div>
      </header>
      <ThreadsList />
    </>
  );
}
