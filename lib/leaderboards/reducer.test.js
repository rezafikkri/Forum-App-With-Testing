import {
  describe,
  test,
  expect,
} from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

/**
 * Test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *   - should return the current state when given by unknown action
 *   - should return the leaderboards when given by RECEIVE_LEADERBOARDs action
 */

describe('leaderboardsReducer function', () => {
  test('should return the current state when given by unknown action', () => {
    // Arrange
    const currentState = [];
    const action = { type: 'unknown' };
    // Action
    const nextState = leaderboardsReducer(currentState, action);
    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the leaderboards when given by RECEIVE_LEADERBOARDs action', () => {
    // Arrange
    const currentState = [];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      },
    };
    // Action
    const nextState = leaderboardsReducer(currentState, action);
    // Assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
