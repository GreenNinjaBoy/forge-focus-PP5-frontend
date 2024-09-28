import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import * as useCurrentUserModule from '../../src/hooks/useCurrentUser';
import { axiosReq } from '../../src/api/axiosDefaults';

// Mock the custom hooks and axios request
vi.mock('../../src/hooks/useCurrentUser');
vi.mock('../../src/api/axiosDefaults', () => ({
  axiosReq: {
    get: vi.fn()
  }
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('shows loading when checking authorization', async () => {
    vi.mocked(useCurrentUserModule.useCurrentUser).mockReturnValue({ username: 'testuser' });
    axiosReq.get.mockResolvedValue({ data: { is_owner: true } });

    render(
      <MemoryRouter initialEntries={['/protected/1']}>
        <Routes>
          <Route path="/protected/:id" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  it('redirects to /notauthorized when user is not signed in', async () => {
    vi.mocked(useCurrentUserModule.useCurrentUser).mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={['/protected/1']}>
        <Routes>
          <Route path="/protected/:id" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
          <Route path="/notauthorized" element={<div>Not Authorized</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Not Authorized')).toBeInTheDocument();
    });
  });

  it('redirects to /notauthorized when user is not authorized', async () => {
    vi.mocked(useCurrentUserModule.useCurrentUser).mockReturnValue({ username: 'testuser' });
    axiosReq.get.mockResolvedValue({ data: { is_owner: false } });

    render(
      <MemoryRouter initialEntries={['/protected/1']}>
        <Routes>
          <Route path="/protected/:id" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
          <Route path="/notauthorized" element={<div>Not Authorized</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Not Authorized')).toBeInTheDocument();
    });
  });

  it('renders children when user is authorized', async () => {
    vi.mocked(useCurrentUserModule.useCurrentUser).mockReturnValue({ username: 'testuser' });
    axiosReq.get.mockResolvedValue({ data: { is_owner: true } });

    render(
      <MemoryRouter initialEntries={['/protected/1']}>
        <Routes>
          <Route path="/protected/:id" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });
});