'use client';

import { useState } from 'react';
import Link from 'next/link';
import Editor from './editor';

export default function CommentInput() {
  const [content, setContent] = useState('');

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
