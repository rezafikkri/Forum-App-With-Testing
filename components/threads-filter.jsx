'use client';

import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import { setCategoryActionCreator } from '@/lib/categories/action';

export default function ThreadsFilter() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((states) => states.categories);
  const loadingBar = useAppSelector((states) => states.loadingBar);
  const threads = useAppSelector((states) => states.threads);

  let threadsLength = 0;
  if (threads !== null) {
    threadsLength = threads.length;
  }

  function handleCategoryChange(e) {
    dispatch(setCategoryActionCreator(e.target.value));
  }

  return (
    <>
      <p>
        {(threads === null || (loadingBar.default !== 0 && threadsLength === 0)) ? (
          <span className="skeleton h-4 w-28 inline-block" />
        ) : `${threadsLength} threads`}
      </p>
      <div className="flex items-center">
        <label
          className="border-y border-s border-gray-300 bg-gray-50 h-8 flex px-3 items-center text-sm rounded-tl-lg rounded-bl-lg"
          htmlFor="category"
        >
          Category
        </label>
        <select
          className="select select-bordered w-full select-sm rounded-bl-none rounded-tl-none min-w-28"
          id="category"
          value={categories.selected}
          onChange={handleCategoryChange}
        >
          {categories.values.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </>
  );
}
