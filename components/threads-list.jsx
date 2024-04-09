'use client';

import { useEffect, useState } from 'react';
import ThreadItem from './thread-item';
import ThreadItemSkeleton from './thread-item-skeleton';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '@/lib/threads/action';
import { asyncPopulateUsersThreadsAndCategories } from '@/lib/shared/action';
import Alert from '@/components/alert';
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';

export default function ThreadsList() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((states) => states.authUser);
  const users = useAppSelector((states) => states.users);
  const threads = useAppSelector((states) => states.threads);
  const categories = useAppSelector((states) => states.categories);
  const [voteThreadError, setVoteThreadError] = useState(null);
  const loadingBar = useAppSelector((states) => states.loadingBar);

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

  // different of variable threads vs threadsList
  // threads is variable only contains thread
  // than threadList is variable contains thread and owner of thread
  let threadsList = [];
  if (threads !== null) {
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
      <article>
        {(threads === null || (loadingBar.default !== 0 && threads.length === 0)) ? (
          <>
            <ThreadItemSkeleton />
            <ThreadItemSkeleton />
          </>
        ) : threadsList.map((thread) => (
          <ThreadItem
            key={thread.id}
            {...thread}
            onUpVote={handleUpVoteThread}
            onDownVote={handleDownVoteThread}
          />
        ))}
      </article>
      {voteThreadError && (
        <div className="toast">
          <Alert message={voteThreadError} onClose={resetVoteThreadErrorState} type="info" />
        </div>
      )}
    </>
  );
}
