import {
  describe,
  test,
  expect,
} from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

/**
 * Test scenario for threadsReducer
 *
 * - threadsReducer function
 *   - should return the current state when given by unknown action
 *   - should return the threads when given by RECEIVE_THREADS action
 *
 *   - should return the current state when given by UP_VOTE_THREAD action and payload
 *   threadId is not exists in threads
 *   - should return the current state when given by UP_VOTE_THREAD action, payload
 *   threadId is exists in threads and payload userId is exists in upVotesBy thread
 *   - should return the threads with new userId in upVotesBy thread when given
 *   UP_VOTE_THREAD action, payload threadId is exists in threads and payload userId
 *   is not exists in upVotesBy thread
 *
 *   - should return the current state when given by DOWN_VOTE_THREAD action and payload
 *   threadId is not exists in threads
 *   - should return the current state when given by DOWN_VOTE_THREAD action, payload
 *   threadId is exists in threads and payload userId is exists in downVotesBy thread
 *   - should return the threads with new userId in downVotesBy thread when given
 *   DOWN_VOTE_THREAD action, payload threadId is exists in threads and payload userId
 *   is not exists in downVotesBy
 *
 *
 *   - should return the current state when given by NEUTRAL_VOTE_THREAD action and payload
 *   threadId is not exists in threads
 *   - should return the current state when given by NEUTRAL_VOTE_THREAD action, payload
 *   threadId is exists in threads and payload target is not equal to 'up-vote' and 'down-vote'
 *
 *   - should return the current state when given by NEUTRAL_VOTE_THREAD action, payload
 *   threadId is exists in threads, payload target is equal to 'up-vote' and payload userId
 *   is not exists in upVotesBy thread
 *   - should return the threads with removed userId in upVotesBy thread when given by
 *   NEUTRAL_VOTE_THREAD action, payload threadId is exists in threads, payload target
 *   is equal to 'up-vote' and payload userId exists in upVotesBy thread
 *
 *   - should return the current state when given by NEUTRAL_VOTE_THREAD action, payload
 *   threadId is exists in threads, payload target is equal to 'down-vote' and payload userId
 *   is not exists in downVotesBy thread
 *   - should return the threads with removed userId in downVotesBy thread when given by
 *   NEUTRAL_VOTE_THREAD action, payload threadId is exists in threads, payload target
 *   is equal to 'down-vote' and payload userId exists in downVotesBy thread
 */

describe('threadsReducer function', () => {
  test('should return the initial state when given by unknown action', () => {
    // Arrange
    const currentState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the threads when given by RECEIVE_THREADS action', () => {
    // Arrange
    const currentState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threads);
  });

  test('should return the current state when given by UP_VOTE_THREAD action and payload threadId is not exists in threads', () => {
    // Arrange
    const currentState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'not found',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the current state when given by UP_VOTE_THREAD action, payload threadId is exists in threads and payload userId is exists in upVotesBy thread', () => {
    // Arrange
    const currentState = [
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: ['john_doe'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-2',
        userId: 'john_doe',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the threads with new userId in upVotesBy thread when given UP_VOTE_THREAD action, payload threadId is exists in threads and payload userId is not exists in upVotesBy', () => {
    // Arrange
    const currentState = [
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: ['john_doe'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-2',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...currentState[0],
        upVotesBy: [ ...currentState[0].upVotesBy, action.payload.userId ],
      },
    ]);
  });

  test('should return the current state when given by DOWN_VOTE_THREAD action and payload threadId is not exists in threads', () => {
    // Arrange
    const currentState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      },
    ];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'not found',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });
  
  test('should return the current state when given by DOWN_VOTE_THREAD action, payload threadId is exists in threads and payload userId is exists in downVotesBy thread', () => {
     // Arrange
    const currentState = [
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: ['john_doe'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-2',
        userId: 'john_doe',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);   
  });

  test('should return the threads with new userId in downVotesBy thread when given DOWN_VOTE_THREAD action, payload threadId is exists in threads and payload userId is not exists in downVotesBy', () => {
    // Arrange
    const currentState = [
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: ['john_doe'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-2',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...currentState[0],
        downVotesBy: [ ...currentState[0].downVotesBy, action.payload.userId ],
      },
    ]);
  });
  
  test('should return the current state when given by NEUTRAL_VOTE_THREAD action and payload threadId is not exists in threads', () => {
     // Arrange
    const currentState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'not found',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });
  
  test('should return the current state when given by NEUTRAL_VOTE_THREAD action, payload threadId is exists in threads and payload target is not equal to \'up-vote\' and \'down-vote\'', () => {
     // Arrange
    const currentState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        target: 'not found',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });
  
  test('should return the current state when given by NEUTRAL_VOTE_THREAD action, payload threadId is exists in threads, payload target is equal to \'up-vote\' and payload userId is not exists in upVotesBy thread', () => {
     // Arrange
    const currentState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['john_doe'],
        downVotesBy: [],
        totalComments: 0
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        target: 'up-vote',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the threads with removed userId in upVotesBy thread when given by NEUTRAL_VOTE_THREAD action, payload threadId is exists in threads, payload target is equal to \'up-vote\' and payload userId exists in upVotesBy thread', () => {
     // Arrange
    const currentState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['rezafikkri'],
        downVotesBy: [],
        totalComments: 0
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        target: 'up-vote',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...currentState[0],
        upVotesBy: [],
      }
    ]);
  });
  
  test('should return the current state when given by NEUTRAL_VOTE_THREAD action, payload threadId is exists in threads, payload target is equal to \'down-vote\' and payload userId is not exists in downVotesBy thread', () => {
     // Arrange
    const currentState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['john_doe'],
        totalComments: 0
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        target: 'down-vote',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the threads with removed userId in downVotesBy thread when given by NEUTRAL_VOTE_THREAD action, payload threadId is exists in threads, payload target is equal to \'down-vote\' and payload userId exists in downVotesBy thread', () => {
     // Arrange
    const currentState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['rezafikkri'],
        totalComments: 0
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        target: 'down-vote',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...currentState[0],
        downVotesBy: [],
      }
    ]);
  });
});
