import {
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

/**
 * Test scenario
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch action correctly and call api function correctly when sign in success
 *   - should dispatch action correctly, call api function currectly and throw error when sign
 *   in failed
 */

const fakeSignInResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._signIn = api.signIn;
  });

  afterEach(() => {
    api.signIn = api._signIn;
    // delete backup
    delete api._signIn;
  });

  test('should dispatch action correctly and call api function correctly when sign in success', async () => {
    // Arrange
    api.signIn = vi.fn(() => Promise.resolve(fakeSignInResponse));
    const dispatch = vi.fn();
    // Action
    await asyncSetAuthUser({ email: fakeSignInResponse.email, password: 'rahasia' })(dispatch);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.signIn).toHaveBeenCalledWith({ email: fakeSignInResponse.email, password: 'rahasia' });
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeSignInResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch action correctly, call api function currectly and throw error when sign in failed', async () => {
    // Arrange
    api.signIn = vi.fn(() => Promise.reject(fakeErrorResponse));
    const dispatch = vi.fn();
    // Action
    await expect(() => asyncSetAuthUser({
      email: fakeSignInResponse.email,
      password: 'rahasia',
    })(dispatch)).rejects.toThrowError(fakeErrorResponse.message);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.signIn).toHaveBeenCalledWith({ email: fakeSignInResponse.email, password: 'rahasia' });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
