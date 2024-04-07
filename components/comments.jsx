'use client';

import { useAppSelector } from '@/hooks/redux-hooks';
import PropTypes from 'prop-types';
import CommentInput from './comment-input';
import CommentList from './comments-list';

export default function Comments({ threadId }) {

  return (
    <section className="mt-6 ps-5">
      <h3 className="text-lg font-medium mb-3">
        Comments
        <span className="badge badge-md badge-neutral ms-1">20</span>
      </h3>
      <CommentInput />
      <CommentList />
    </section>
  );
}

Comments.propTypes = {
  threadId: PropTypes.string.isRequired,
};
