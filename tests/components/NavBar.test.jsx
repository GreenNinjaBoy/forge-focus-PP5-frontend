// tests/MainNavbar.test.jsx
import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainNavbar from '../../src/components/NavBar';
import * as currentUserHooks from '../../src/hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('MainNavbar', () => {
  it('renders the MainNavbar component for logged out user', () => {
    vi.spyOn(currentUserHooks, 'useCurrentUser').mockReturnValue(null);
    vi.spyOn(currentUserHooks, 'useSetCurrentUser').mockReturnValue(vi.fn());

    render(
      <MemoryRouter>
        <MainNavbar />
      </MemoryRouter>
    );

    // Check for login link
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('renders the MainNavbar component for logged in user and handles interactions', () => {
    const mockSetCurrentUser = vi.fn();
    const navigate = vi.fn();
    vi.spyOn(currentUserHooks, 'useCurrentUser').mockReturnValue({ username: 'testuser' });
    vi.spyOn(currentUserHooks, 'useSetCurrentUser').mockReturnValue(mockSetCurrentUser);
    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <MainNavbar />
      </MemoryRouter>
    );

    // Check for dropdown menu
    expect(screen.getByText(/Menu/i)).toBeInTheDocument();

    // Simulate clicking the logo
    fireEvent.click(screen.getByText(/Forge Focus/i));
    expect(navigate).toHaveBeenCalledWith('/dashboard');

    // Simulate clicking the sign-out button
    fireEvent.click(screen.getByText(/Menu/i));
    fireEvent.click(screen.getByText(/Sign Out/i));
    expect(mockSetCurrentUser).toHaveBeenCalledWith(null);
    expect(navigate).toHaveBeenCalledWith('/');
  });
});