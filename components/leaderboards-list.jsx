'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import LeaderboardItem from './leaderboard-item';
import LeaderboardItemSkeleton from './leaderboard-item-skeleton';
import { asyncReceiveLeaderboards } from '@/lib/leaderboards/action';

export default function LeaderboardsList() {
  const dispatch = useAppDispatch();
  const leaderboards = useAppSelector((states) => states.leaderboards);
  const loadingBar = useAppSelector((states) => states.loadingBar);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <article>
      {leaderboards === null || (loadingBar.default !== 0 && leaderboards.length === 0) ? (
        <>
          <LeaderboardItemSkeleton />
          <LeaderboardItemSkeleton />
          <LeaderboardItemSkeleton />
          <LeaderboardItemSkeleton />
          <LeaderboardItemSkeleton />
        </>
      ) : leaderboards.map((leaderboard, index) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          {...leaderboard}
          rank={index + 1}
        />
      ))}
    </article>
  );
}
