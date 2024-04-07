'use client';

import { useEffect } from 'react';
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
import { asyncReceiveDetailThread, clearDetailThreadActionCreator } from '@/lib/detailThread/action';
import SanitizeHTML from './sanitize-html';

export default function ThreadCard({ id }) {
  dayjs.extend(relativeTime);

  const dispatch = useAppDispatch();
  const detailThread = useAppSelector((states) => states.detailThread);

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
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
  } = detailThread;

  // process body markdown and html string for render
  const vfile = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(body);

  return (
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
      <div className="flex gap-5 text-gray-500 font-light">
        <div className="me-5">
          <i className="bi bi-hash" />
          <span>{category}</span>
        </div>

        <button
          type="button"
          className="text-primary"
        >
          <i className="me-1 bi bi-arrow-up-circle-fill" />
          <span>20</span>
        </button>
        <button
          type="button"
        >
          <i className="me-1 bi bi-arrow-down-circle" />
          <span>0</span>
        </button>
      </div>
    </article>
  );
}

ThreadCard.propTypes = {
  id: PropTypes.string.isRequired,
};
