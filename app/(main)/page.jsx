'use client';

import ThreadsList from '@/components/threads-list';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { asyncPopulateUsersThreadsAndCategories } from '@/lib/shared/action';
import { setCategoryActionCreator } from '@/lib/categories/action';
import ThreadsFilter from '@/components/threads-filter';

export default function Home() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((states) => states.authUser);
  const users = useAppSelector((states) => states.users);
  const threads = useAppSelector((states) => states.threads);
  const categories = useAppSelector((states) => states.categories);

  function handleCategoryChange(e) {
    dispatch(setCategoryActionCreator(e.target.value));
  }

  useEffect(() => {
    dispatch(asyncPopulateUsersThreadsAndCategories());
  }, [dispatch]);

  let threadsList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
  }));

  // if category selected != all
  if (categories.selected !== 'all') {
    threadsList = threadsList.filter((thread) => thread.category === categories.selected);
  }

  return (
    <>
      <header className="mt-20 mb-9">
        <div className="flex justify-between mb-2">
          <h1 className="font-extrabold text-3xl">Threads</h1>
          {authUser && <Link href="/create" className="btn btn-primary btn-sm">Create Thread</Link>}
        </div>
        <div className="flex justify-between items-center">
          <ThreadsFilter
            categories={categories}
            threadsLength={threadsList.length}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </header>
      <ThreadsList threads={threadsList} />
    </>
  );
}
