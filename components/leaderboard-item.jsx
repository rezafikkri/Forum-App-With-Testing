'use client';

import { useAppSelector } from '@/hooks/redux-hooks';
import PropTypes from 'prop-types';

export default function LeaderboardItem({ user, score, rank }) {
  const authUser = useAppSelector((states) => states.authUser);

  function setActive() {
    if (authUser?.id === user.id) return 'border-primary';
    return 'border-gray-300';
  }

  return (
    <article className="flex mb-2 text-lg items-center">
      <div className={`border ${setActive()} py-2.5 px-3 bg-white me-0.5 rounded-s-lg text-base`}>
        <span>{rank}</span>
      </div>
      <div className={`flex justify-between grow border ${setActive()} py-2 px-3 bg-white rounded-e-lg`}>
        <div className="avatar items-center">
          <div className="w-7 rounded-full me-1.5">
            <img src={user.avatar} alt={user.name} />
          </div>
          <span>{user.name}</span>
        </div>
        <div className="flex">
          <span className="me-1">{score}</span>
          <span className="text-gray-500">score</span>
        </div>
      </div>
    </article>
  );
}

const leaderboardUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const leaderboardItemShape = {
  user: PropTypes.shape(leaderboardUserShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
  rank: PropTypes.number.isRequired,
};
