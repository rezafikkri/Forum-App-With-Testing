import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import SignInInput from './sign-in-input';
import StoreProvider from '../app/store-provider';

expect.extend(matchers);

/* Skenario testing
 *
 * - SignInInput component
 *   - Should handle email typing correctly
 *   - Should handle password typing correctly
 *   - Should call asyncSetAuthUser when sign in button clicked
 */

describe('SignInInput component', () => {
  beforeAll(() => {
    // create mock for next/navigation
    vi.mock('next/navigation', () => {
      return {
        useRouter: () => ({
          push: () => {},
          replace: () => {},
          prefetch: () => {},
        }),
      };
    });
  });

  beforeEach(() => {
    render(
      <StoreProvider>
        <SignInInput />
      </StoreProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('Should handle email typing correctly', async () => {
    // Arrange
    const emailInput = screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'fikkri@test.com');

    // Assert
    expect(emailInput).toHaveValue('fikkri@test.com');
  });

  test('Should handle password typing correctly', async () => {
    // Arrange
    const passwordInput = screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'rahasia');

    // Assert
    expect(passwordInput).toHaveValue('rahasia');
  });

  test('Should call asyncSetAuthUser when sign in button clicked', async () => {
    // Arrange
    // create mock for asyncSetAuthUser function
    vi.mock('@/lib/authUser/action', async (importOriginal) => {
      const mod = await importOriginal();
      return {
        ...mod,
        asyncSetAuthUser: vi.fn(() => async () => {}),
      };
    });

    const { asyncSetAuthUser } = await import('@/lib/authUser/action');

    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'fikkri@test.com');
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'rahasia');
    const signInButton = screen.getByText('Sign In');

    // Action
    await userEvent.click(signInButton);

    // Assert
    expect(asyncSetAuthUser).toHaveBeenCalledWith({
      email: 'fikkri@test.com',
      password: 'rahasia',
    });
  });
});
