'use client';

import { useAppSelector } from '@/hooks/redux-hooks';
import PropTypes from 'prop-types';
import CommentInput from './comment-input';
import CommentsList from './comments-list';

export default function Comments({ threadId }) {
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
      <CommentInput />
      <CommentsList comments={comments} />
    </section>
  );
}

Comments.propTypes = {
  threadId: PropTypes.string.isRequired,
};
