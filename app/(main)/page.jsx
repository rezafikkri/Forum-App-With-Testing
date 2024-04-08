'use client';

import ThreadsList from '@/components/threads-list';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { asyncPopulateUsersThreadsAndCategories } from '@/lib/shared/action';
import { setCategoryActionCreator } from '@/lib/categories/action';
import ThreadsFilter from '@/components/threads-filter';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '@/lib/threads/action';
import Alert from '@/components/alert';

export default function Page() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((states) => states.authUser);
  const users = useAppSelector((states) => states.users);
  const threads = useAppSelector((states) => states.threads);
  const categories = useAppSelector((states) => states.categories);
  const [voteThreadError, setVoteThreadError] = useState(null);

  function handleCategoryChange(e) {
    dispatch(setCategoryActionCreator(e.target.value));
  }

  function resetVoteThreadErrorState() {
    setVoteThreadError(null);
  }

  function handleUpVoteThread({ threadId, upVotesBy, downVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteThreadError('You must be signed in to upvote thread!');
      return false;
    }

    // check, if signed in user not upvote yet
    if (!upVotesBy.includes(authUser.id)) {
      // check, if signed in user has downvoted
      let isDownVoted = false;
      if (downVotesBy.includes(authUser.id)) isDownVoted = true;

      dispatch(asyncUpVoteThread({ threadId, isDownVoted }));
    } else {
      dispatch(asyncNeutralVoteThread({ threadId, target: 'up-vote' }));
    }

    return true;
  }

  function handleDownVoteThread({ threadId, downVotesBy, upVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteThreadError('You must be signed in to downvote thread!');
      return false;
    }

    // check, if signed in user not downvote yet
    if (!downVotesBy.includes(authUser.id)) {
      // check, if signed in user has upvoted
      let isUpVoted = false;
      if (upVotesBy.includes(authUser.id)) isUpVoted = true;

      dispatch(asyncDownVoteThread({ threadId, isUpVoted }));
    } else {
      dispatch(asyncNeutralVoteThread({ threadId, target: 'down-vote' }));
    }

    return true;
  }

  useEffect(() => {
    dispatch(asyncPopulateUsersThreadsAndCategories());
  }, [dispatch]);

  let threadsList = [];
  let threadsLength = 0;
  if (threads !== null) {
    threadsLength = threads.length;
    threadsList = threads.map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
    }));
  }

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
            threadsLength={threadsLength}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </header>
      <ThreadsList
        threads={threadsList}
        onUpVote={handleUpVoteThread}
        onDownVote={handleDownVoteThread}
      />
      {voteThreadError && (
        <div className="toast">
          <Alert message={voteThreadError} onClose={resetVoteThreadErrorState} type="info" />
        </div>
      )}
    </>
  );
}
