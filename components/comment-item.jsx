import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import SanitizeHTML from './sanitize-html';

export default function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
}) {
  dayjs.extend(relativeTime);

  // process comment content markdown and html string for render
  const vfile = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(content);

  return (
    <article className="bg-white border border-gray-300 p-4 mb-1.5 first:rounded-t-lg last:rounded-b-lg">
      <div className="mb-4">
        <div className="avatar items-center text-sm mb-2">
          <div className="w-7 rounded-full me-2">
            <img src={owner.avatar} alt={owner.name} />
          </div>
          <div className="!aspect-auto">
            <span className="block leading-none">{owner.name}</span>
            <time className="text-gray-500 text-xs">{dayjs().to(dayjs(createdAt))}</time>
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
        >
          <i className="bi bi-arrow-up-circle me-1" />
          <span>{upVotesBy.length}</span>
        </button>
        <button
          type="button"
        >
          <i className="bi bi-arrow-down-circle me-1" />
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
};

export { commentItemShape };
