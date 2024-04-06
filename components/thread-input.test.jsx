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
import ThreadInput from './thread-input';

expect.extend(matchers);

/* Skenario testing
 *
 * - ThreadInput component
 *   - Should handle title typing correctly
 *   - Should handle category typing correctly
 *   - Should handle body typing correctly
 *   - Should call onCreateThread function when save button clicked
 */

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput onCreateThread={() => {}} />);
    const titleInput = screen.getByPlaceholderText(/title/i);

    // Action
    await userEvent.type(titleInput, 'This is title');

    // Assert
    expect(titleInput).toHaveValue('This is title');
  });

  test('Should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput onCreateThread={() => {}} />);
    const categoryInput = screen.getByPlaceholderText(/category/i);

    // Action
    await userEvent.type(categoryInput, 'This is category');

    // Assert
    expect(categoryInput).toHaveValue('This is category');
  });

  test('Should handle body typing correctly', async () => {
    // Arrange
    render(<ThreadInput onCreateThread={() => {}} />);
    const bodyInput = screen.getByPlaceholderText(/body/i);

    // Action
    await userEvent.type(bodyInput, 'This is body');

    // Assert
    expect(bodyInput).toHaveValue('This is body');
  });

  test('Should call onCreateThread function when save button clicked', async () => {
    // Arrange
    const mockOnCreateThread = vi.fn();
    render(<ThreadInput onCreateThread={mockOnCreateThread} />);
    const titleInput = screen.getByPlaceholderText(/title/i);
    await userEvent.type(titleInput, 'This is title');
    const categoryInput = screen.getByPlaceholderText(/category/i);
    await userEvent.type(categoryInput, 'This is category');
    const bodyInput = screen.getByPlaceholderText(/body/i);
    await userEvent.type(bodyInput, 'This is body');
    const saveButton = screen.getByText('Save');

    // Action
    await userEvent.click(saveButton);

    // Assert
    expect(mockOnCreateThread).toBeCalledWith({
      title: 'This is title',
      category: 'This is category',
      body: 'This is body',
    });
  });
});
