import { render, screen, fireEvent, waitFor, expect, it, describe, beforeEach } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import MainNavbar from '../../src/components/NavBar';
import * as useCurrentUserHooks from '../../src/hooks/useCurrentUser';
import axios from 'axios';

// Mock the custom hooks
vi.mock('../../src/hooks/useCurrentUser', () => ({
  useCurrentUser: vi.fn(),
  useSetCurrentUser: vi.fn(),
}));

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock axios
vi.mock('axios');

// Mock the useClickOutsideToggle hook
vi.mock('../../src/hooks/useClickOutsideToggle', () => ({
  default: () => ({
    expanded: false,
    setExpanded: vi.fn(),
    ref: { current: document.createElement('div') },
  }),
}));

describe('MainNavbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo', () => {
    useCurrentUserHooks.useCurrentUser.mockReturnValue(null);
    render(
      <Router>
        <MainNavbar />
      </Router>
    );
    expect(screen.getByText('Forge Focus')).toBeInTheDocument();
  });

  it('displays logged out links when user is not logged in', () => {
    useCurrentUserHooks.useCurrentUser.mockReturnValue(null);
    render(
      <Router>
        <MainNavbar />
      </Router>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  it('displays logged in links when user is logged in', () => {
    useCurrentUserHooks.useCurrentUser.mockReturnValue({ username: 'testuser' });
    render(
      <Router>
        <MainNavbar />
      </Router>
    );
    expect(screen.getByText('Goals')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Signup')).not.toBeInTheDocument();
  });

  it('handles sign out correctly', async () => {
    const mockSetCurrentUser = vi.fn();
    useCurrentUserHooks.useCurrentUser.mockReturnValue({ username: 'testuser' });
    useCurrentUserHooks.useSetCurrentUser.mockReturnValue(mockSetCurrentUser);
    axios.post.mockResolvedValue({});

    render(
      <Router>
        <MainNavbar />
      </Router>
    );

    fireEvent.click(screen.getByText('Sign Out'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('dj-rest-auth/logout/');
      expect(mockSetCurrentUser).toHaveBeenCalledWith(null);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('navigates to dashboard when logo is clicked and user is logged in', () => {
    useCurrentUserHooks.useCurrentUser.mockReturnValue({ username: 'testuser' });

    render(
      <Router>
        <MainNavbar />
      </Router>
    );

    fireEvent.click(screen.getByText('Forge Focus'));

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to home when logo is clicked and user is not logged in', () => {
    useCurrentUserHooks.useCurrentUser.mockReturnValue(null);

    render(
      <Router>
        <MainNavbar />
      </Router>
    );

    fireEvent.click(screen.getByText('Forge Focus'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});