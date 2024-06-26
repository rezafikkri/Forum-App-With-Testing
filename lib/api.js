import { authenticate, fetchWithAuth } from './server-actions';

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;
    return user;
  }

  async function signIn({ email, password }) {
    const responseJson = await authenticate({ baseUrl: BASE_URL, email, password });
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;
    return user;
  }

  async function getOwnProfile() {
    const responseJson = await fetchWithAuth(`${BASE_URL}/users/me`);
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;
    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { users } } = responseJson;
    return users;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { threads } } = responseJson;
    return threads;
  }

  function getAllCategories(threads) {
    return {
      values: ['all', ...new Set(threads.map((thread) => thread.category))],
      selected: 'all',
    };
  }

  async function createThread({ title, category, body }) {
    const responseJson = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        category,
        body,
      }),
    });
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { thread } } = responseJson;
    return thread;
  }

  async function upVoteThread(threadId) {
    const responseJson = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return vote;
  }

  async function downVoteThread(threadId) {
    const responseJson = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return vote;
  }

  async function neutralVoteThread(threadId) {
    const responseJson = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return vote;
  }

  async function getDetailThread(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { detailThread } } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    return detailThread;
  }

  async function createComment({ threadId, content }) {
    const responseJson = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { comment } } = responseJson;
    return comment;
  }

  async function upVoteComment({ threadId, commentId }) {
    const responseJson = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return vote;
  }

  async function downVoteComment({ threadId, commentId }) {
    const responseJson = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return vote;
  }

  async function neutralVoteComment({ threadId, commentId }) {
    const responseJson = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return vote;
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { leaderboards } } = responseJson;
    return leaderboards;
  }

  return {
    register,
    signIn,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getAllCategories,
    createThread,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    getDetailThread,
    createComment,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboards,
  };
})();

export default api;
