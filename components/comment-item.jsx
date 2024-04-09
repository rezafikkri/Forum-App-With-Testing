import Image from 'next/image';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import SanitizeHTML from './sanitize-html';
import { isSignedInUserVoted } from '@/lib/utils';
import { useAppSelector } from '@/hooks/redux-hooks';

export default function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  onUpVote,
  onDownVote,
}) {
  dayjs.extend(relativeTime);

  const authUser = useAppSelector((states) => states.authUser);

  // process comment content markdown and html string for render
  const vfile = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content);

  function handleUpVote(e) {
    e.preventDefault();

    onUpVote({ commentId: id, upVotesBy, downVotesBy });
  }

  function handleDownVote(e) {
    e.preventDefault();

    onDownVote({ commentId: id, downVotesBy, upVotesBy });
  }

  return (
    <article className="bg-white border border-gray-300 p-4 mb-1.5 first:rounded-t-lg last:rounded-b-lg">
      <div className="mb-4">
        <div className="avatar items-center text-sm mb-2">
          <div className="w-5 rounded-full me-2">
            <Image alt={owner.name} src={owner.avatar} width={20} height={20} />
          </div>
          <div className="!aspect-auto">
            <span className="leading-none me-1">{owner.name}</span>
            <time className="text-gray-500 text-xs leading-nono">{`. ${dayjs().to(dayjs(createdAt))}`}</time>
          </div>
        </div>

        <SanitizeHTML
          className="prose text-gray-800 leading-normal max-w-none"
          html={String(vfile)}
        />
      </div>
      <div className="flex font-light text-gray-500 gap-4 text-sm">
        <button
          type="submit"
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
      </div>
    </article>
  );
}

const ownerShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export { commentItemShape };
