// tests/Home.test.jsx
import { describe, it, vi, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../src/pages/Home';
import { axiosReq } from '../src/api/axiosDefaults';
import * as currentUserHooks from '../src/hooks/useCurrentUser';

// Mock the modules
vi.mock('../src/api/axiosDefaults', () => ({
  axiosReq: {
    get: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

// Mock the custom hooks
vi.mock('../src/hooks/useCurrentUser', () => ({
  useCurrentUser: vi.fn(),
  useSetCurrentUser: vi.fn(),
}));

describe('Home', () => {
  it('renders the Home component and fetches user data', async () => {
    // Mock the custom hooks
    let mockCurrentUser = null;
    const mockSetCurrentUser = vi.fn((user) => {
      mockCurrentUser = user;
      console.log('Current user updated:', user);
    });

    currentUserHooks.useCurrentUser.mockImplementation(() => mockCurrentUser);
    currentUserHooks.useSetCurrentUser.mockReturnValue(mockSetCurrentUser);

    // Mock API responses
    axiosReq.get.mockImplementation((url) => {
      console.log('Mocked API call to:', url);
      if (url === 'dj-rest-auth/user/') {
        return Promise.resolve({ data: { username: 'testuser' } });
      } else if (url === '/goals/') {
        return Promise.resolve({ data: { results: [{ id: 1 }, { id: 2 }] } });
      } else if (url === '/tasks/') {
        return Promise.resolve({ data: { results: [{ id: 1, goals: null }, { id: 2, goals: null }] } });
      }
    });

    render(<Home />);

    console.log('Initial render complete');

    // Check if the loading state is displayed
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    console.log('Loading state verified');

    // Wait for the loading state to disappear and user data to be fetched
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      console.log('Loading state disappeared');
    });

    // Log the current state of the component
    console.log('Current DOM content:', document.body.innerHTML);

    // Wait for the user data to be displayed
    await waitFor(() => {
      const welcomeElement = screen.queryByText(/Welcome, testuser/i);
      console.log('Welcome element:', welcomeElement);
      expect(welcomeElement).toBeInTheDocument();
    }, { timeout: 5000 });

    // Check if the goals and tasks data are displayed
    expect(screen.getByText(/You currently have 2 goals/i)).toBeInTheDocument();
    expect(screen.getByText(/You currently have 2 tasks/i)).toBeInTheDocument();

    // Simulate button clicks
    await userEvent.click(screen.getByText(/Create New Goal/i));
    await userEvent.click(screen.getByText(/View Goals/i));
    await userEvent.click(screen.getByText(/Create New Task/i));
    await userEvent.click(screen.getByText(/View Tasks/i));

    console.log('Test completed successfully');
  });
});