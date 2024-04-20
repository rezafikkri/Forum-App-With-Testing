import {
  describe,
  test,
  expect,
  afterEach,
  beforeEach,
  beforeAll,
  vi,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import ThreadInput from './thread-input';
import StoreProvider from '../app/store-provider';

expect.extend(matchers);

/* Skenario testing
 *
 * - ThreadInput component
 *   - Should handle title typing correctly
 *   - Should handle category typing correctly
 *   - Should handle body typing correctly
 *   - Should call asyncCreateThread function when save button clicked
 */

describe('ThreadInput component', () => {
  beforeAll(() => {
    // create mock for next/navigation
    vi.mock('next/navigation', () => ({
      useRouter: () => ({
        push: () => {},
        replace: () => {},
        prefetch: () => {},
      }),
    }));
  });

  beforeEach(() => {
    render(
      <StoreProvider>
        <ThreadInput />
      </StoreProvider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('Should handle title typing correctly', async () => {
    // Arrange
    const titleInput = screen.getByPlaceholderText(/title/i);

    // Action
    await userEvent.type(titleInput, 'This is title');

    // Assert
    expect(titleInput).toHaveValue('This is title');
  });

  test('Should handle category typing correctly', async () => {
    // Arrange
    const categoryInput = screen.getByPlaceholderText(/category/i);

    // Action
    await userEvent.type(categoryInput, 'This is category');

    // Assert
    expect(categoryInput).toHaveValue('This is category');
  });

  test('Should handle body typing correctly', async () => {
    // Arrange
    const bodyInput = screen.getByPlaceholderText(/body/i);

    // Action
    await userEvent.type(bodyInput, 'This is body');

    // Assert
    expect(bodyInput).toHaveValue('This is body');
  });

  test('Should call asyncCreateThread function when save button clicked', async () => {
    // Arrange
    // create mock for asyncCreateThread function
    vi.mock('@/lib/threads/action', async (importOriginal) => {
      const mod = await importOriginal();
      return {
        ...mod,
        asyncCreateThread: vi.fn(() => async () => {}),
      };
    });

    const { asyncCreateThread } = await import('@/lib/threads/action');

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
    expect(asyncCreateThread).toHaveBeenCalled();
  });
});
