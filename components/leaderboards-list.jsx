'use client';

import LeaderboardItem from './leaderboard-item';
import LeaderboardItemSkeleton from './leaderboard-item-skeleton';

export default function LeaderboardsList() {
  return (
    <article>
      <LeaderboardItem />
      <LeaderboardItemSkeleton />
    </article>
  );
}
