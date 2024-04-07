import PropTypes from 'prop-types';
import CommentItem from './comment-item';
import CommentItemSkeleton from './comment-item-skeleton';
import { commentItemShape } from './comment-item';

export default function CommentsList({ comments }) {
  return (
    <article className="mt-4">
      {!comments ? (
        <CommentItemSkeleton />
      ) : comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </article>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)),
};
