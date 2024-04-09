'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './comment-item';
import CommentItemSkeleton from './comment-item-skeleton';
import {
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncUpVoteComment,
} from '@/lib/detailThread/action';
import Alert from './alert';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

export default function CommentsList({ comments }) {
  const authUser = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();
  const [voteCommentError, setVoteCommentError] = useState(null);

  function resetVoteCommentErrorState() {
    setVoteCommentError(null);
  }

  function handleUpVoteComment({ commentId, upVotesBy, downVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteCommentError('You must be signed in to upvote comment!');
      return false;
    }

    // check, if signed in user not upvote yet
    if (!upVotesBy.includes(authUser.id)) {
      // check, if signed in user has downvoted
      let isDownVoted = false;
      if (downVotesBy.includes(authUser.id)) isDownVoted = true;

      dispatch(asyncUpVoteComment({ commentId, isDownVoted }));
    } else {
      dispatch(asyncNeutralVoteComment({ commentId, target: 'up-vote' }));
    }

    return true;
  }

  function handleDownVoteComment({ commentId, downVotesBy, upVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteCommentError('You must be signed in to downvote comment!');
      return false;
    }

    // check, if signed in user not downvote yet
    if (!downVotesBy.includes(authUser.id)) {
      // check, if signed in user has upvoted
      let isUpVoted = false;
      if (upVotesBy.includes(authUser.id)) isUpVoted = true;

      dispatch(asyncDownVoteComment({ commentId, isUpVoted }));
    } else {
      dispatch(asyncNeutralVoteComment({ commentId, target: 'down-vote' }));
    }

    return true;
  }

  return (
    <>
      <article className="mt-4">
        {!comments ? (
          <CommentItemSkeleton />
        ) : comments.map((comment) => (
          <CommentItem
            key={comment.id}
            {...comment}
            onUpVote={handleUpVoteComment}
            onDownVote={handleDownVoteComment}
          />
        ))}
      </article>
      {voteCommentError && (
        <div className="toast">
          <Alert message={voteCommentError} onClose={resetVoteCommentErrorState} type="info" />
        </div>
      )}
    </>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)),
};
