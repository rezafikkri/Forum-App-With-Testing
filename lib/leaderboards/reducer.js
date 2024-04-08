import { ActionType } from './action';

function leaderboardsReducer(leaderboards = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;

    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
