import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveCategoriesActionCreator } from '../categories/action';

function asyncPopulateUsersThreadsAndCategories() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      const categories = api.getAllCategories(threads);

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveCategoriesActionCreator(categories));

      return { users, threads, categories };
    } catch (error) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateUsersThreadsAndCategories };
