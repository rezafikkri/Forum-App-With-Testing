'use client';

import { useAppSelector } from '@/hooks/redux-hooks';
import PropTypes from 'prop-types';

export default function ThreadsFilter({ threadsLength, categories, onCategoryChange }) {
  const loadingBar = useAppSelector((states) => states.loadingBar);

  return (
    <>
      <p>
        {(loadingBar.default !== 0) ? (
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
          onChange={onCategoryChange}
        >
          {categories.values.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </>
  );
}

const categoriesShape = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
};

ThreadsFilter.propTypes = {
  threadsLength: PropTypes.number.isRequired,
  categories: PropTypes.shape(categoriesShape).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};
