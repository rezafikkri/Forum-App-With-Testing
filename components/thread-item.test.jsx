import {
  describe,
  test,
  expect,
  vi,
  afterEach,
} from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { renderWithProviders } from './render-with-providers';
import ThreadItem from './thread-item';

expect.extend(matchers);

/**
 * Test scenario
 *
 * - ThreadItem component
 *   - should render correctly with none up-vote and down-vote button active when authUser id
 *   is not exists in upVotesBy and downVotesBy
 *   - should render correctly with up-vote button active and down-vote button inactive when
 *   authUser id is exists in upVotesBy
 *   - should call onUpVote function correctly when up-vote button clicked
 *   - should call onDownVote function correctly when down-vote button clicked
 */

describe('ThreadItem component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render correctly with none up-vote and down-vote button active when authUser id is not exists in upVotesBy and downVotesBy', () => {
    // Arrange
    const thread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const authUser = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const onUpVote = () => {};
    const onDownVote = () => {};
    renderWithProviders(
      <ThreadItem {...thread} onUpVote={onUpVote} onDownVote={onDownVote} />,
      {
        preloadedState: {
          authUser,
        },
      },
    );
    const avatar = screen.getByAltText(thread.owner.name);
    const title = screen.getByText(thread.title);
    const category = screen.getByText(thread.category);
    const upVoteButton = screen.getByTestId('up-vote');
    const downVoteButton = screen.getByTestId('down-vote');
    // Action
    // Assert
    expect(avatar).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(upVoteButton).not.toHaveClass('text-primary');
    expect(downVoteButton).not.toHaveClass('text-primary');
  });

  test('should render correctly with up-vote button active and down-vote button inactive when authUser id is exists in upVotesBy', () => {
    // Arrange
    const thread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['john_doe'],
      downVotesBy: [],
      totalComments: 0,
    };
    const authUser = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const onUpVote = () => {};
    const onDownVote = () => {};
    renderWithProviders(
      <ThreadItem {...thread} onUpVote={onUpVote} onDownVote={onDownVote} />,
      {
        preloadedState: {
          authUser,
        },
      },
    );
    const avatar = screen.getByAltText(thread.owner.name);
    const title = screen.getByText(thread.title);
    const category = screen.getByText(thread.category);
    const upVoteButton = screen.getByTestId('up-vote');
    const downVoteButton = screen.getByTestId('down-vote');
    // Action
    // Assert
    expect(avatar).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(upVoteButton).toHaveClass('text-primary');
    expect(downVoteButton).not.toHaveClass('text-primary');
  });

  test('should call onUpVote function correctly when up-vote button clicked', async () => {
    // Arrange
    const thread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const authUser = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const onUpVote = vi.fn();
    const onDownVote = () => {};
    renderWithProviders(
      <ThreadItem {...thread} onUpVote={onUpVote} onDownVote={onDownVote} />,
      {
        preloadedState: {
          authUser,
        },
      },
    );
    const upVoteButton = screen.getByTestId('up-vote');
    // Action
    await userEvent.click(upVoteButton);
    // Assert
    expect(onUpVote).toHaveBeenCalledWith({
      threadId: thread.id,
      upVotesBy: thread.upVotesBy,
      downVotesBy: thread.downVotesBy,
    });
  });

  test('should call onDownVote function correctly when down-vote button clicked', async () => {
    // Arrange
    const thread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: ['john_doe'],
      totalComments: 20,
    };
    const authUser = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const onUpVote = () => {};
    const onDownVote = vi.fn();
    renderWithProviders(
      <ThreadItem {...thread} onUpVote={onUpVote} onDownVote={onDownVote} />,
      {
        preloadedState: {
          authUser,
        },
      },
    );
    const downVoteButton = screen.getByTestId('down-vote');
    // Action
    await userEvent.click(downVoteButton);
    // Assert
    expect(onDownVote).toHaveBeenCalledWith({
      threadId: thread.id,
      upVotesBy: thread.upVotesBy,
      downVotesBy: thread.downVotesBy,
    });
  });
});
