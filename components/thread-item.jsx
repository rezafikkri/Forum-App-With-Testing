import Link from 'next/link';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { stripHtml, isSignedInUserVoted, stripMarkdown } from '@/lib/utils';
import { useAppSelector } from '@/hooks/redux-hooks';

export default function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
  onUpVote,
  onDownVote,
}) {
  dayjs.extend(relativeTime);

  const authUser = useAppSelector((states) => states.authUser);

  let stripedBody = stripHtml(body);
  stripedBody = stripMarkdown(stripedBody);
  const bodyCountChr = stripedBody.length;
  const dots = bodyCountChr <= 80 ? '' : '...';

  function handleUpVote(e) {
    e.stopPropagation();
    e.preventDefault();

    onUpVote({ threadId: id, upVotesBy, downVotesBy });
  }

  function handleDownVote(e) {
    e.stopPropagation();
    e.preventDefault();

    onDownVote({ threadId: id, downVotesBy, upVotesBy });
  }

  return (
    <article className="bg-white border border-gray-300 p-5 mb-1.5 first:rounded-t-xl last:rounded-b-xl">
      <Link href={`/threads/${id}`}>
        <div className="hover:cursor-pointer mb-4">
            <div className="avatar items-center text-sm text-gray-500">
              <div className="w-5 rounded-full me-1">
                <img src={owner.avatar} />
              </div>
              <span>{owner.name}</span>
            </div>
          
          <h2 className="text-xl font-bold leading-tight">{title}</h2>
          <p className="text-gray-700 leading-snug">{stripedBody.substring(0, 80) + dots}</p>
        </div>
      </Link>
      <div className="flex gap-3 text-gray-500 text-sm font-light">
        <div>
          <i className="bi bi-hash" />
          <span>{category}</span>
        </div>
        <div className="me-4">
          <i className="bi bi-clock me-1" />
          <time>{dayjs().to(dayjs(createdAt))}</time>
        </div>

        <button
          type="button"
          className={isSignedInUserVoted({ authUser, votesBy: upVotesBy }) ? 'text-primary' : ''}
          onClick={handleUpVote}
        >
          <i className={`me-1 bi bi-arrow-up-circle${isSignedInUserVoted({ authUser, votesBy: upVotesBy }) ? '-fill' : ''}`} />
          <span>{upVotesBy.length}</span>
        </button>
        <button
          type="button"
          className={isSignedInUserVoted({ authUser, votesBy: downVotesBy }) ? 'text-primary' : ''}
          onClick={handleDownVote}
        >
          <i className={`me-1 bi bi-arrow-down-circle${isSignedInUserVoted({ authUser, votesBy: downVotesBy }) ? '-fill' : ''}`} />
          <span>{downVotesBy.length}</span>
        </button>

        <div>
          <i className="bi bi-chat me-1" />
          <span>{totalComments}</span>
        </div>
      </div>
    </article>
  );
}

const ownerShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export { threadItemShape };
