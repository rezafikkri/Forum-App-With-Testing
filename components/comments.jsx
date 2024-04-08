'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/redux-hooks';
import CommentInput from './comment-input';
import CommentsList from './comments-list';

export default function Comments({ threadId, signIn }) {
  const comments = useAppSelector((states) => states.detailThread?.comments);

  return (
    <section className="mt-6 ps-5">
      <h3 className="text-lg font-medium mb-3">
        {!comments ? (
          <div className="skeleton h-5 w-28" />
        ) : (
          <>
            Comments
            <span className="badge badge-md badge-neutral ms-1">{comments.length}</span>
          </>
        )}
      </h3>
      {signIn ? (
        <CommentInput threadId={threadId} />
      ) : (
        <p className="text-gray-600">
          You must be
          <Link href="/sign-in" className="link link-neutral mx-1">Sign In</Link>
          to comment!
        </p>
      )}
      <CommentsList comments={comments} />
    </section>
  );
}

Comments.propTypes = {
  threadId: PropTypes.string.isRequired,
  signIn: PropTypes.string,
};
