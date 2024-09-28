import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { CurrentUserProvider } from '../../src/contexts/CurrentUserContext';
import { axiosRes, axiosReq } from '../../src/api/axiosDefaults';
import axios from 'axios';
import * as router from 'react-router';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mocks
vi.mock('../../src/api/axiosDefaults', () => ({
  axiosRes: {
    get: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn()
      }
    }
  },
  axiosReq: {
    interceptors: {
      request: {
        use: vi.fn()
      }
    }
  }
}));
vi.mock('axios');
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('CurrentUserProvider', () => {
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  it('fetches and sets the current user on mount', async () => {
    const mockUser = { username: 'testuser' };
    axiosRes.get.mockResolvedValueOnce({ data: mockUser });

    await act(async () => {
      render(
        <CurrentUserProvider>
          <div>Test Child</div>
        </CurrentUserProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    expect(axiosRes.get).toHaveBeenCalledWith('dj-rest-auth/user/');
  });

  it('handles error when fetching current user', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    axiosRes.get.mockRejectedValueOnce(new Error('Failed to fetch user'));

    await act(async () => {
      render(
        <CurrentUserProvider>
          <div>Test Child</div>
        </CurrentUserProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleLogSpy.mockRestore();
  });

  it('sets up axios interceptors', async () => {
    await act(async () => {
      render(
        <CurrentUserProvider>
          <div>Test Child</div>
        </CurrentUserProvider>
      );
    });

    expect(axiosReq.interceptors.request.use).toHaveBeenCalled();
    expect(axiosRes.interceptors.response.use).toHaveBeenCalled();
  });

  it('refreshes token when necessary', async () => {
    vi.mock('../../src/utils/Utils', () => ({
      shouldRefreshToken: vi.fn().mockReturnValue(true),
    }));

    axios.post.mockResolvedValueOnce({});
    axiosRes.get.mockResolvedValueOnce({ data: {} });

    await act(async () => {
      render(
        <CurrentUserProvider>
          <div>Test Child</div>
        </CurrentUserProvider>
      );
    });

    const requestInterceptor = axiosReq.interceptors.request.use.mock.calls[0][0];
    await act(async () => {
      await requestInterceptor({});
    });

    expect(axios.post).toHaveBeenCalledWith('dj-rest-auth/token/refresh/');
  });

  it('handles token refresh error', async () => {
    vi.mock('../../src/utils/Utils', () => ({
      shouldRefreshToken: vi.fn().mockReturnValue(true),
    }));

    axios.post.mockRejectedValueOnce(new Error('Token refresh failed'));
    axiosRes.get.mockResolvedValueOnce({ data: { username: 'testuser' } });

    await act(async () => {
      render(
        <CurrentUserProvider>
          <div>Test Child</div>
        </CurrentUserProvider>
      );
    });

    const requestInterceptor = axiosReq.interceptors.request.use.mock.calls[0][0];
    await act(async () => {
      await requestInterceptor({});
    });

    expect(navigate).toHaveBeenCalledWith('/signin');
  });
});