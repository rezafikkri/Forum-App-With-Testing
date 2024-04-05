'use client';

import useInput from '@/hooks/use-input';
import { useState } from 'react';
import Link from 'next/link';
import Editor from './editor';

export default function ThreadInput() {
  const [title, handleTitleChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');
  const [body, setBody] = useState('');

  return (
    <form>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Title</span>
        </div>
        <input
          type="text"
          placeholder="Enter thread title"
          className="input input-bordered w-full"
          value={title}
          onChange={handleTitleChange}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Category</span>
        </div>
        <input
          type="text"
          placeholder="Enter thread category"
          className="input input-bordered w-full"
          value={category}
          onChange={handleCategoryChange}
        />
        <div className="label">
          <span className="label-text-alt">
            Category is optional, if left blank, then the default value of category is
            <b> general</b>
          </span>
        </div>
      </label>
      <label className="form-control w-full" data-color-mode="light">
        <div className="label">
          <span className="label-text">Body</span>
        </div>
      </label>
      <Editor value={body} onValueChange={setBody} placeholder="Enter thread body" />
      <div className="flex justify-end mt-4">
        <Link href="/" className="btn btn-outline me-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
}
