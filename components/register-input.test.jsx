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
import RegisterInput from './register-input';
import StoreProvider from '../app/store-provider';
import { asyncRegisterUser } from '@/lib/users/action';

expect.extend(matchers);

/* Skenario testing
 *
 * - RegisterInput component
 *   - Should handle name typing correctly
 *   - Should handle email typing correctly
 *   - Should handle password typing correctly
 *   - Should call asyncRegisterUser function when register button clicked
 */

describe('RegisterInput component', () => {
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
        <RegisterInput />
      </StoreProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('Should handle name typing correctly', async () => {
    // Arrange
    const nameInput = screen.getByPlaceholderText(/Name/i);

    // Action
    await userEvent.type(nameInput, 'Reza Sariful Fikri');

    // Assert
    expect(nameInput).toHaveValue('Reza Sariful Fikri');
  });

  test('Should handle email typing correctly', async () => {
    // Arrange
    const emailInput = screen.getByPlaceholderText(/Email/i);

    // Action
    await userEvent.type(emailInput, 'fikkri@test.com');

    // Assert
    expect(emailInput).toHaveValue('fikkri@test.com');
  });

  test('Should handle password typing correctly', async () => {
    // Arrange
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    // Action
    await userEvent.type(passwordInput, 'rahasia');

    // Assert
    expect(passwordInput).toHaveValue('rahasia');
  });

  test('Should call asyncRegisterUser function when register button clicked', async () => {
    // Arrange
    // mock asyncRegisterUser function
    vi.mock('@/lib/users/action', async (importOriginal) => {
      const mod = await importOriginal();
      return {
        ...mod,
        asyncRegisterUser: vi.fn(() => async () => {}),
      };
    });

    const { asyncRegisterUser } = await import('@/lib/users/action');

    const nameInput = screen.getByPlaceholderText(/Name/i);
    await userEvent.type(nameInput, 'Reza Sariful Fikri');
    const emailInput = screen.getByPlaceholderText(/Email/i);
    await userEvent.type(emailInput, 'fikkri@test.com');
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    await userEvent.type(passwordInput, 'rahasia');
    const registerButton = screen.getByText('Register');

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(asyncRegisterUser).toHaveBeenCalledWith({
      name: 'Reza Sariful Fikri',
      email: 'fikkri@test.com',
      password: 'rahasia',
    });
  });
});
