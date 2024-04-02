import PropTypes from 'prop-types';
import ThreadItem from './thread-item';
import { threadItemShape } from './thread-item';
import { useAppSelector } from '@/hooks/redux-hooks';
import ThreadItemSkeleton from './thread-item-skeleton';

export default function ThreadsList({ threads }) {
  const loadingBar = useAppSelector((states) => states.loadingBar);

  return (
    <article>
      {(loadingBar.default !== 0) ? (
        <>
          <ThreadItemSkeleton />
          <ThreadItemSkeleton />
        </>
      ) : threads.map((thread) => ( 
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </article>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};
