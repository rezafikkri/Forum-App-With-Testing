'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import ThreadCardSkeleton from './thread-card-skeleton';
import {
  asyncReceiveDetailThread,
  clearDetailThreadActionCreator,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralVoteDetailThread,
} from '@/lib/detailThread/action';
import SanitizeHTML from './sanitize-html';
import { isSignedInUserVoted } from '@/lib/utils';
import Alert from './alert';

export default function ThreadCard({ id }) {
  dayjs.extend(relativeTime);

  const dispatch = useAppDispatch();
  const detailThread = useAppSelector((states) => states.detailThread);
  const [voteDetailThreadError, setVoteDetailThreadError] = useState(null);
  const authUser = useAppSelector((states) => states.authUser);

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));

    return () => {
      dispatch(clearDetailThreadActionCreator());
    };
  }, [id, dispatch]);

  if (detailThread === null) {
    return <ThreadCardSkeleton />;
  }

  const {
    id: threadId,
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
  } = detailThread;

  function resetVoteDetailThreadErrorState() {
    setVoteDetailThreadError(null);
  }

  function handleUpVoteDetailThread() {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteDetailThreadError('You must be signed in to upvote thread!');
      return false;
    }

    // check, if signed in user not upvote yet
    if (!upVotesBy.includes(authUser.id)) {
      // check, if signed in user has downvoted
      let isDownVoted = false;
      if (downVotesBy.includes(authUser.id)) isDownVoted = true;

      dispatch(asyncUpVoteDetailThread({ threadId, isDownVoted }));
    } else {
      dispatch(asyncNeutralVoteDetailThread({ threadId, target: 'up-vote' }));
    }

    return true;
  }

  function handleDownVoteDetailThread() {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteDetailThreadError('You must be signed in to downvote thread!');
      return false;
    }

    // check, if signed in user not downvote yet
    if (!downVotesBy.includes(authUser.id)) {
      // check, if signed in user has upvoted
      let isUpVoted = false;
      if (upVotesBy.includes(authUser.id)) isUpVoted = true;

      dispatch(asyncDownVoteDetailThread({ threadId, isUpVoted }));
    } else {
      dispatch(asyncNeutralVoteDetailThread({ threadId, target: 'down-vote' }));
    }

    return true;
  }

  // process body markdown and html string for render
  const vfile = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(body);

  return (
    <>
      <article className="bg-white border border-gray-300 p-5 rounded-xl">
        <div className="mb-7">
          <div className="avatar items-center text-sm text-gray-500">
            <div className="w-6 rounded-full me-1.5">
              <img src={owner.avatar} alt={owner.name} />
            </div>
            <span>{owner.name}</span>
          </div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <time className="text-sm text-gray-500 mb-3 block">{dayjs().to(dayjs(createdAt))}</time>
          <SanitizeHTML
            className="prose text-gray-800 prose-lg max-w-none leading-normal mb-5"
            html={String(vfile)}
          />
        </div>
        <div className="flex gap-4 text-gray-500 font-light">
          <div className="me-5">
            <i className="bi bi-hash" />
            <span>{category}</span>
          </div>

          <button
            type="button"
            className={isSignedInUserVoted({ authUser, votesBy: upVotesBy }) ? 'text-primary' : ''}
            onClick={handleUpVoteDetailThread}
          >
            <i className={`me-1 bi bi-arrow-up-circle${isSignedInUserVoted({ authUser, votesBy: upVotesBy }) ? '-fill' : ''}`} />
            <span>{upVotesBy.length}</span>
          </button>
          <button
            type="button"
            className={isSignedInUserVoted({ authUser, votesBy: downVotesBy }) ? 'text-primary' : ''}
            onClick={handleDownVoteDetailThread}
          >
            <i className={`me-1 bi bi-arrow-down-circle${isSignedInUserVoted({ authUser, votesBy: downVotesBy }) ? '-fill' : ''}`} />
            <span>{downVotesBy.length}</span>
          </button>
        </div>
      </article>
      {voteDetailThreadError && (
        <div className="toast">
          <Alert message={voteDetailThreadError} onClose={resetVoteDetailThreadErrorState} type="info" />
        </div>
      )}
    </>
  );
}

ThreadCard.propTypes = {
  id: PropTypes.string.isRequired,
};
