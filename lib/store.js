import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import usersReducer from './users/reducer';
import authUserReducer from './authUser/reducer';
import { isPreloadReducer } from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import categoriesReducer from './categories/reducer';
import detailThreadReducer from './detailThread/reducer';
import leaderboardsReducer from './leaderboards/reducer';

export const makeStore = (preloadedState) => configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    categories: categoriesReducer,
    loadingBar: loadingBarReducer,
    detailThread: detailThreadReducer,
    leaderboards: leaderboardsReducer,
  },
  preloadedState,
});
