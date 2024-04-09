'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Editor from './editor';
import { useAppDispatch } from '@/hooks/redux-hooks';
import Alert from './alert';
import { asyncCreateComment } from '@/lib/detailThread/action';

export default function CommentInput({ threadId }) {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const [createCommentError, setCreateCommentError] = useState(null);

  function resetCreateCommentErrorState() {
    setCreateCommentError(null);
  }

  function handleCreateComment(e) {
    e.preventDefault();

    dispatch(asyncCreateComment({ threadId, content }))
      .then(() => {
        setContent('');
      })
      .catch((error) => {
        setCreateCommentError(error.message.replace('content', 'comment'));
      });
  }

  return (
    <>
      {createCommentError
        && <Alert message={createCommentError} onClose={resetCreateCommentErrorState} />}
      <form onSubmit={handleCreateComment}>
        <Editor value={content} onValueChange={setContent} placeholder="Enter your comment" />
        <div className="label">
          <span className="label-text-alt">
            The comment use
            <b> markdown language</b>
            <span>, if you don&apos;t understand, please read the </span>
            <Link
              href="https://www.markdownguide.org/basic-syntax"
              target="_blank"
              className="link link-neutral"
            >
              <span>markdown guide </span>
              <i className="bi bi-arrow-up-right" />
            </Link>
            .
          </span>
        </div>
        <div className="text-right mt-1">
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
    </>
  );
}

CommentInput.propTypes = {
  threadId: PropTypes.string.isRequired,
};
