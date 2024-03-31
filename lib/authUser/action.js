import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../api';
import { signOut } from '../server-actions';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const authUser = await api.signIn({ email, password });
      dispatch(setAuthUserActionCreator(authUser));

      return authUser;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await signOut();
      dispatch(unsetAuthUserActionCreator());
    } catch (error) {}

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
