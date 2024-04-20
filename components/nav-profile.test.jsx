import {
  describe,
  test,
  expect,
  vi,
  afterEach,
  beforeAll,
} from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { renderWithProviders } from './render-with-providers';
import NavProfile from './nav-profile';

expect.extend(matchers);

/**
 * Test scenario
 *
 * - NavProfile component
 *   - should skeleton loading present in document when authUser state is null
 *   - should avatar img and dropdown menu title present in document when authUser is not null
 *   - should call asyncUnsetAuthUser function when sign out button clicked
 */

describe('NavProfile component', () => {
  beforeAll(() => {
    // create mock for next/navigation
    vi.mock('next/navigation', () => {
      return {
        useRouter: () => ({
          push: () => {},
          replace: () => {},
          prefetch: () => {},
        }),
        usePathname: () => {},
      };
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('should skeleton loading present in document when authUser state is null', () => {
    // Arrange
    renderWithProviders(<NavProfile />, { authUser: null });
    const avatarSkeleton = screen.getByTestId('avatar-skeleton');
    const menuTitleSkeleton = screen.getByTestId('menu-title-skeleton');
    // Action
    // Assert
    expect(avatarSkeleton).toBeInTheDocument();
    expect(menuTitleSkeleton).toBeInTheDocument();
  });

  test('should avatar img and dropdown menu title present in document when authUser is not null', () => {
    // Arrange
    const authUser = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    renderWithProviders(<NavProfile />, {
      preloadedState: {
        authUser,
      },
    });
    const avatar = screen.getByAltText(authUser.name);
    const menuTitle = screen.getByText(`Signed in as ${authUser.email}`)
    // Action
    // Assert
    expect(avatar).toBeInTheDocument();
    expect(menuTitle).toBeInTheDocument();
  });

  test('should call asyncUnsetAuthUser function when sign out button clicked', async () => {
    // Arrange
    renderWithProviders(<NavProfile />);
    // create mock for asyncUnsetAuthUser function
    vi.mock('@/lib/authUser/action', async (importOriginal) => {
      const mod = await importOriginal();
      return {
        ...mod,
        asyncUnsetAuthUser: vi.fn(() => async () => {}),
      };
    });
    const { asyncUnsetAuthUser } = await import('@/lib/authUser/action');
    const signOutButton = screen.getByTestId('sign-out');
    // Action
    await userEvent.click(signOutButton);
    // Assert
    expect(asyncUnsetAuthUser).toHaveBeenCalled();
  });
});
