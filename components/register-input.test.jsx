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
import RegisterInput from './register-input';

expect.extend(matchers);

/* Skenario testing
 *
 * - RegisterInput component
 *   - Should handle name typing correctly
 *   - Should handle email typing correctly
 *   - Should handle password typing correctly
 *   - Should call onRegister function when register button clicked
 */

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const nameInput = screen.getByLabelText('Name');

    // Action
    await userEvent.type(nameInput, 'Reza Sariful Fikri');

    // Assert
    expect(nameInput).toHaveValue('Reza Sariful Fikri');
  });

  test('Should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const emailInput = screen.getByLabelText('Email');

    // Action
    await userEvent.type(emailInput, 'fikkri@test.com');

    // Assert
    expect(emailInput).toHaveValue('fikkri@test.com');
  });

  test('Should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const passwordInput = screen.getByLabelText('Password');

    // Action
    await userEvent.type(passwordInput, 'rahasia');

    // Assert
    expect(passwordInput).toHaveValue('rahasia');
  });

  test('Should call onRegister function when register button clicked', async () => {
    // Arrange
    const mockOnRegister = vi.fn();
    render(<RegisterInput onRegister={mockOnRegister} />);
    const nameInput = screen.getByLabelText('Name');
    await userEvent.type(nameInput, 'Reza');
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'Reza@g.com');
    const passwordInput = screen.getByLabelText('Password');
    await userEvent.type(passwordInput, 'rahasia');
    const registerButton = screen.getByRole('button');

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockOnRegister).toBeCalledWith({
      name: 'Reza',
      email: 'Reza@g.com',
      password: 'rahasia',
    });
  });
});
