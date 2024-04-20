import {
  describe,
  test,
  expect,
} from 'vitest';
import detailThreadReducer from './reducer';
import { ActionType } from './action';

/**
 * Test scenario for detailThreadReducer
 *
 * - detailThreadReducer function
 *   - should return the current state when given by unknown action
 *   - should return the detail thread when given by RECEIVE_DETAIL_THREAD action
 *   - should return null when given by CLEAR_THREAD action
 *
 *   - should return the current state when given by UP_VOTE_DETAIL_THREAD action and payload
 *   userId is exists in upVotesBy thread
 *   - should return the detail thread with new userId in upVotesBy thread when given by
 *   UP_VOTE_DETAIL_THREAD action and payload userId is not exists in upVotesBy thread
 *
 *   - should return the current state when given by DOWN_VOTE_DETAIL_THREAD action and payload
 *   userId is exists in downVotesBy thread
 *   - should return the detail thread with new userId in downVotesBy thread when given by
 *   DOWN_VOTE_DETAIL_THREAD action and payload userId is not exists in downVotesBy thread
 *
 *  - should return the current state when given by NEUTRAL_VOTE_DETAIL_THREAD action and payload
 *  target is not equal to 'up-vote' and 'down-vote'
 *  - should return the current state when given by NEUTRAL_VOTE_DETAIL_THREAD action, payload
 *  target is equal to 'up-vote' and payload userId is not exists in upVotesBy thread
 *  - should return the detail thread with removed userId in upVotesBy thread when given by
 *  NEUTRAL_VOTE_DETAIL_THREAD action, payload target is equal to 'up-vote' and payload userId is
 *  exists in upVotesBy thread
 *  - should return the current state when given by NEUTRAL_VOTE_DETAIL_THREAD action, payload
 *  target is equal to 'down-vote' and payload userId is not exists in downVotesBy thread
 *  - should return the detail thread with removed userId in downVotesBy thread when given
 *  by NEUTRAL_VOTE_DETAIL_THREAD action, payload target is equal to 'down-vote' and payload userId
 *  is exists in downVotesBy thread
 *
 *
 ** COMMENTS
 *  - should return the detail thread with new comment when given by CREATE_COMMENT action
 *
 *  - should return the current state when given by UP_VOTE_COMMENT action and payload commentId
 *  is not exists in comments
 *  - should return the current state when given by UP_VOTE_COMMENT action, payload commentId
 *  is exists in comments and payload userId is exists in upVotesBy comment
 *  - should return the detail thread with new userId in upVotesBy comment when given
 *  by UP_VOTE_COMMENT action, payload commentId is exists in comments and payload userId
 *  is not exists in upVotesBy comment
 *  - should return the current state when given by DOWN_VOTE_COMMENT action and payload
 *  commentId is not exists in comments
 *  - should return the current state when given by DOWN_VOTE_COMMENT action, payload commentId
 *  is exists in comments and payload userId is exists in downVotesBy comment
 *  - should return the detail thread with new userId in downVotesBy comment when given
 *  by DOWN_VOTE_COMMENT action, payload commentId is exists in comments and payload userId is not
 *  exists in downVotesBy comment
 *
 *
 *  - should return the current state when given by NEUTRAL_VOTE_COMMENT action and payload
 *  commentId is not exists in comments
 *  - should return the current state when given by NEUTRAL_VOTE_COMMENT action, payload commentId
 *  is exists in comments and payload target is not equal to 'up-vote' and 'down-vote'
 *
 *  - should return the current state when given by NEUTRAL_VOTE_COMMENT action, payload commentId
 *  is exists in comments, payload target is equal to 'up-vote' and payload userId is not exists
 *  in upVotesBy comment
 *  - should return the detail thread with removed userId in upVotesBy comment when given by
 *  NEUTRAL_VOTE_COMMENT action, payload commentId is exists in comments, payload target is equal to
 *  'up-vote' and payload userId is exists in upVotesBy comment
 *
 *  - should return the current state when given by NEUTRAL_VOTE_COMMENT action, payload commentId
 *  is exists in comments, payload target is equal to 'down-vote' and payload userId is not exists
 *  in downVotesBy comment
 *  - should return the detail thread with removed userId in downVotesBy comment when given by
 *  NEUTRAL_VOTE_COMMENT action, payload commentId is exists in comments, payload target is equal to
 *  'down-vote' and payload userId is exists in downVotesBy comment
 */

describe('detailThreadReducer function', () => {
  test('should return the current state when given by unknown action', () => {
    // Arrange
    const currentState = null;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the detail thread when given by RECEIVE_DETAIL_THREAD action', () => {
    // Arrange
    const currentState = null;
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  test('should return null when given by CLEAR_THREAD action', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.CLEAR_DETAIL_THREAD,
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  test('should return the current state when given by UP_VOTE_DETAIL_THREAD action and payload userId is exists in upVotesBy thread', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['rezafikkri'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.UP_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the detail thread with new userId in upVotesBy thread when given by UP_VOTE_DETAIL_THREAD action and payload userId is not exists in upVotesBy thread', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['rezafikkri'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.UP_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'adelina',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual({
      ...currentState,
      upVotesBy: [...currentState.upVotesBy, action.payload.userId],
    });
  });

  test('should return the current state when given by DOWN_VOTE_DETAIL_THREAD action and payload userId is exists in downVotesBy thread', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: ['rezafikkri'],
      comments: [],
    };
    const action = {
      type: ActionType.DOWN_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the detail thread with new userId in downVotesBy thread when given by DOWN_VOTE_DETAIL_THREAD action and payload userId is not exists in downVotesBy thread', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: ['rezafikkri'],
      comments: [],
    };
    const action = {
      type: ActionType.DOWN_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'adelina',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual({
      ...currentState,
      downVotesBy: [...currentState.downVotesBy, action.payload.userId],
    });
  });

  test('should return the current state when given by NEUTRAL_VOTE_DETAIL_THREAD action and payload target is not equal to \'up-vote\' and \'down-vote\'', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['adelina'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
      payload: {
        target: 'not found',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the current state when given by NEUTRAL_VOTE_DETAIL_THREAD action, payload target is equal to \'up-vote\' and payload userId is not exists in upVotesBy thread', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['adelina'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
      payload: {
        target: 'up-vote',
        userId: 'not found',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the detail thread with removed userId in upVotesBy thread when given by NEUTRAL_VOTE_DETAIL_THREAD action, payload target is equal to \'up-vote\' and payload userId is exists in upVotesBy thread', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['adelina'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
      payload: {
        target: 'up-vote',
        userId: 'adelina',
      },
    };

    // action
    const nextState = detailThreadReducer(currentState, action);

    // assert
    expect(nextState).toEqual({
      ...currentState,
      upVotesBy: [],
    });
  });

  test('should return the current state when given by NEUTRAL_VOTE_DETAIL_THREAD action, payload target is equal to \'down-vote\' and payload userId is not exists in downVotesBy thread', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['adelina'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
      payload: {
        target: 'down-vote',
        userId: 'not found',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the detail thread with removed userId in downVotesBy thread when given by NEUTRAL_VOTE_DETAIL_THREAD action, payload target is equal to \'down-vote\' and payload userId is exists in downVotesBy thread', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['adelina'],
      downVotesBy: ['rezafikkri'],
      comments: [],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
      payload: {
        target: 'down-vote',
        userId: 'rezafikkri',
      },
    };

    // action
    const nextState = detailThreadReducer(currentState, action);

    // assert
    expect(nextState).toEqual({
      ...currentState,
      downVotesBy: [],
    });
  });

  test('should return the detail thread with new comment when given by CREATE_COMMENT action', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.CREATE_COMMENT,
      payload: {
        comment: {
          id: 'comment-2',
          content: 'Ini adalah komentar kedua',
          createdAt: '2021-07-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // assert
    expect(nextState).toEqual({
      ...currentState,
      comments: [action.payload.comment, ...currentState.comments],
    });
  });

  test('should return the current state when given by UP_VOTE_COMMENT action and payload commentId is not exists in comments', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'not found',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the current state when given by UP_VOTE_COMMENT action, payload commentId is exists in comments and payload userId is exists in upVotesBy comment', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['rezafikkri'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the detail thread with new userId in upVotesBy comment when given by UP_VOTE_COMMENT action, payload commentId is exists in comments and payload userId is not exists in upVotesBy comment', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'adelina',
      },
    };
    // Action
    const nextState = detailThreadReducer(currentState, action);
    // Assert
    expect(nextState).toEqual({
      ...currentState,
      comments: [
        {
          ...currentState.comments[0],
          upVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  test('should return the current state when given by DOWN_VOTE_COMMENT action and payload commentId is not exists in comments', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'not found',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the current state when given by DOWN_VOTE_COMMENT action, payload commentId is exists in comments and payload userId is exists in downVotesBy comment', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['rezafikkri'],
        },
      ],
    };
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the detail thread with new userId in downVotesBy comment when given by DOWN_VOTE_COMMENT action, payload commentId is exists in comments and payload userId is not exists in downVotesBy comment', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'adelina',
      },
    };
    // Action
    const nextState = detailThreadReducer(currentState, action);
    // Assert
    expect(nextState).toEqual({
      ...currentState,
      comments: [
        {
          ...currentState.comments[0],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  test('should return the current state when given by NEUTRAL_VOTE_COMMENT action and payload commentId is not exists in comments', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'not found',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the current state when given by NEUTRAL_VOTE_COMMENT action, payload commentId is exists in comments and payload target is not equal to \'up-vote\' and \'down-vote\'', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        target: 'not found',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the current state when given by NEUTRAL_VOTE_COMMENT action, payload commentId is exists in comments, payload target is equal to \'up-vote\' and payload userId is not exists in upVotesBy comment', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['rezafikkri'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        target: 'up-vote',
        userId: 'not found',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the detail thread with removed userId in upVotesBy comment when given by NEUTRAL_VOTE_COMMENT action, payload commentId is exists in comments, payload target is equal to \'up-vote\' and payload userId is exists in upVotesBy comment', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['rezafikkri'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        target: 'up-vote',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual({
      ...currentState,
      comments: [
        {
          ...currentState.comments[0],
          upVotesBy: [],
        },
      ],
    });
  });

  test('should return the current state when given by NEUTRAL_VOTE_COMMENT action, payload commentId is exists in comments, payload target is equal to \'down-vote\' and payload userId is not exists in downVotesBy comment', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['rezafikkri'],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        target: 'down-vote',
        userId: 'not found',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  test('should return the detail thread with removed userId in downVotesBy comment when given by NEUTRAL_VOTE_COMMENT action, payload commentId is exists in comments, payload target is equal to \'down-vote\' and payload userId is exists in downVotesBy comment', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['rezafikkri'],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        target: 'down-vote',
        userId: 'rezafikkri',
      },
    };

    // Action
    const nextState = detailThreadReducer(currentState, action);

    // Assert
    expect(nextState).toEqual({
      ...currentState,
      comments: [
        {
          ...currentState.comments[0],
          downVotesBy: [],
        },
      ],
    });
  });
});
