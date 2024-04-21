'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { asyncCreateThread } from '@/lib/threads/action';
import Alert from '@/components/alert';
import useInput from '@/hooks/use-input';
import Editor from './editor';

export default function ThreadInput() {
  const [title, handleTitleChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createThreadError, setCreateThreadError] = useState(null);

  function handleCreateThread(e) {
    e.preventDefault();

    dispatch(asyncCreateThread({ title, category, body }))
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        setCreateThreadError(error.message);
      });
  }

  function resetCreateThreadErrorState() {
    setCreateThreadError(null);
  }

  return (
    <>
      {createThreadError
        && <Alert message={createThreadError} onClose={resetCreateThreadErrorState} />}
      <form onSubmit={handleCreateThread}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Enter thread titlesssss"
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
        <div className="label">
          <span className="label-text-alt">
            The body thread uses
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
        <div className="flex justify-end mt-4">
          <Link href="/" className="btn btn-outline me-3">Cancel</Link>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </>
  );
}
