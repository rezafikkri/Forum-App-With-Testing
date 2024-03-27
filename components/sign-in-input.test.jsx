import {
  describe,
  test,
  expect,
  afterEach,
  vi,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import SignInInput from './sign-in-input';

expect.extend(matchers);

/* Skenario testing
 *
 * - SignInInput component
 *   - Should handle email typing correctly
 *   - Should handle password typing correctly
 *   - Should call onSignIn function when sign in button clicked
 */

describe('SignInInput component', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should handle email typing correctly', async () => {
    // Arrange
    render(<SignInInput onSignIn={() => {}} />);
    const emailInput = screen.getByLabelText('Email');

    // Action
    await userEvent.type(emailInput, 'fikkri@test.com');

    // Assert
    expect(emailInput).toHaveValue('fikkri@test.com');
  });

  test('Should handle password typing correctly', async () => {
    // Arrange
    render(<SignInInput onSignIn={() => {}} />);
    const passwordInput = screen.getByLabelText('Password');

    // Action
    await userEvent.type(passwordInput, 'rahasia');

    // Assert
    expect(passwordInput).toHaveValue('rahasia');
  });

  test('Should call onSignIn function when sign in button clicked', async () => {
    // Arrange
    const mockOnSignIn = vi.fn();
    render(<SignInInput onSignIn={mockOnSignIn} />);
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'Reza@g.com');
    const passwordInput = screen.getByLabelText('Password');
    await userEvent.type(passwordInput, 'rahasia');
    const signInButton = screen.getByRole('button');

    // Action
    await userEvent.click(signInButton);

    // Assert
    expect(mockOnSignIn).toBeCalledWith({
      email: 'Reza@g.com',
      password: 'rahasia',
    });
  });
});
