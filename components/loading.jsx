'use client';

import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="sticky top-0 z-50">
      <LoadingBar
        className="absolute h-1 bg-primary"
        updateTime={100}
        maxProgress={95}
        progressIncrease={10}
      />
    </div>
  );
}

export default Loading;
