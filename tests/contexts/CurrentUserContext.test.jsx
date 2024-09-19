import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { CurrentUserProvider } from '../../src/contexts/CurrentUserContext';
import axios from 'axios';
import * as axiosDefaults from '../../src/api/axiosDefaults';
import * as utils from '../../src/utils/Utils';
import { useNavigate } from 'react-router';

// Mock dependencies
vi.mock('axios');
vi.mock('../../src/api/axiosDefaults', () => ({
  axiosReq: {
    interceptors: {
      request: { use: vi.fn() },
    },
  },
  axiosRes: {
    interceptors: {
      response: { use: vi.fn() },
    },
    get: vi.fn(),
  },
}));
vi.mock('../../src/utils/Utils', () => ({
  shouldRefreshToken: vi.fn(),
  removeTokenTimestamp: vi.fn(),
}));
vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

const mockNavigate = vi.fn();

describe('CurrentUserProvider', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('fetches and sets the current user on mount', async () => {
    const mockUserData = { username: 'testuser' };
    axiosDefaults.axiosRes.get.mockResolvedValueOnce({ data: mockUserData });

    let renderedChildren;
    await act(async () => {
      render(
        <CurrentUserProvider>
          {(value) => {
            renderedChildren = value;
            return null;
          }}
        </CurrentUserProvider>
      );
    });

    await waitFor(() => {
      expect(axiosDefaults.axiosRes.get).toHaveBeenCalledWith('dj-rest-auth/user/');
      expect(renderedChildren).toEqual(mockUserData);
    });
  });

  it('handles error when fetching current user', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    axiosDefaults.axiosRes.get.mockRejectedValueOnce(new Error('Fetch error'));

    await act(async () => {
      render(<CurrentUserProvider>{() => null}</CurrentUserProvider>);
    });

    await waitFor(() => {
      expect(axiosDefaults.axiosRes.get).toHaveBeenCalledWith('dj-rest-auth/user/');
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleLogSpy.mockRestore();
  });

  it('sets up axios interceptors', async () => {
    render(<CurrentUserProvider>{() => null}</CurrentUserProvider>);

    expect(axiosDefaults.axiosReq.interceptors.request.use).toHaveBeenCalled();
    expect(axiosDefaults.axiosRes.interceptors.response.use).toHaveBeenCalled();
  });

  it('refreshes token when necessary', async () => {
    utils.shouldRefreshToken.mockReturnValueOnce(true);
    axios.post.mockResolvedValueOnce({});

    render(<CurrentUserProvider>{() => null}</CurrentUserProvider>);

    const requestInterceptor = axiosDefaults.axiosReq.interceptors.request.use.mock.calls[0][0];
    await requestInterceptor({});

    expect(axios.post).toHaveBeenCalledWith('dj-rest-auth/token/refresh/');
  });

  it('handles token refresh error', async () => {
    utils.shouldRefreshToken.mockReturnValueOnce(true);
    axios.post.mockRejectedValueOnce(new Error('Refresh error'));

    let renderedChildren;
    await act(async () => {
      render(
        <CurrentUserProvider>
          {(value) => {
            renderedChildren = value;
            return null;
          }}
        </CurrentUserProvider>
      );
    });

    const requestInterceptor = axiosDefaults.axiosReq.interceptors.request.use.mock.calls[0][0];
    await act(async () => {
      await requestInterceptor({});
    });

    expect(utils.removeTokenTimestamp).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/signin');
    expect(renderedChildren).toBeNull();
  });
});