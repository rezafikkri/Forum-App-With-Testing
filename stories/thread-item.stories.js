import ThreadItem from '@/components/thread-item';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';

const preloadedState = {
  authUser: {
    id: 'user-tRjjTfGgtdp409en',
    name: 'diantest',
    email: 'diantest@yahoo.com',
    avatar: 'https://ui-avatars.com/api/?name=diantest&background=random'
  },
};

export default {
  title: 'ThreadItem',
  component: ThreadItem,
  tags: ['autodocs'],
  decorators: [
    (story) => <Provider store={makeStore(preloadedState)}>{story()}</Provider>,
  ],
};

export const Default = {
  args: {
    id: 'id-1',
    title: 'Bootstrap Colors',
    body: 'Bootstrap’s color palette has continued to expand and become more nuanced in v5.3.0. We’ve added new variables for secondary and tertiary text and background colors, plus {color}-bg-subtle, {color}-border-subtle, and {color}-text-emphasis for our theme colors.',
    category: 'bootstrap',
    createdAt: '2021-06-21T07:00:00.000Z',
    owner: { name: 'RezaFikkri', avatar: 'https://ui-avatars.com/api/?name=diantest&background=random'},
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 2,
    onUpVote: () => {},
    onDownVote: () => {},
  },
};

/**
 * How up vote button can active? This is when **user signed in id** exists in `upVotesBy`
 * thread array.
 */
export const withUpVoteActive = {
  args: {
    id: 'id-1',
    title: 'Bootstrap Colors',
    body: 'Bootstrap’s color palette has continued to expand and become more nuanced in v5.3.0. We’ve added new variables for secondary and tertiary text and background colors, plus {color}-bg-subtle, {color}-border-subtle, and {color}-text-emphasis for our theme colors.',
    category: 'bootstrap',
    createdAt: '2021-06-21T07:00:00.000Z',
    owner: { name: 'RezaFikkri', avatar: 'https://ui-avatars.com/api/?name=diantest&background=random'},
    upVotesBy: ['user-tRjjTfGgtdp409en', 'users-2'],
    downVotesBy: [],
    totalComments: 2,
    onUpVote: () => {},
    onDownVote: () => {},
  },
};
