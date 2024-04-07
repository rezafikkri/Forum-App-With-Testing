'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/redux-hooks';
import Editor from './editor';

export default function CommentInput() {
  const authUser = useAppSelector((states) => states.authUser);
  const loadingBar = useAppSelector((states) => states.loadingBar);
  const [content, setContent] = useState('');

  if (loadingBar.default !== 0 && authUser === null) {
    return (
      <div className="skeleton rounded-lg h-20" />
    );
  }

  if (authUser === null) {
    return (
      <p className="text-gray-600">
        You must be
        <Link href="/sign-in" className="link link-neutral mx-1">Sign In</Link>
        to comment!
      </p>
    );
  }

  return (
    <form>
      <Editor value={content} onValueChange={setContent} placeholder="Enter your comment" />
      <div className="label">
        <span className="label-text-alt">
          The comment use
          <b> markdown language</b>
          <span>, if you don't understand, please read the </span>
          <Link
            href="https://www.markdownguide.org/basic-syntax"
            target="_blank"
            className="link link-neutral"
          >
            <span>markdown guide </span>
            <i className="bi bi-arrow-up-right" />.
          </Link>
        </span>
      </div>
    </form>
  );
}
