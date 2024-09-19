import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import * as hooks from '../../src/hooks/useCurrentUser';

// Mock child component
const MockChildComponent = () => <div>Protected Content</div>;

// Mock NotAuthorized component
const NotAuthorizedComponent = () => <div>Not Authorized</div>;

describe('ProtectedRoute', () => {
  const renderComponent = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MockChildComponent />
              </ProtectedRoute>
            } 
          />
          <Route path="/notauthorized" element={<NotAuthorizedComponent />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when user is authenticated', () => {
    vi.spyOn(hooks, 'useCurrentUser').mockReturnValue({ username: 'testuser' });
    renderComponent();
    expect(screen.getByText('Protected Content')).toBeDefined();
  });

  it('redirects to /notauthorized when user is not authenticated', () => {
    vi.spyOn(hooks, 'useCurrentUser').mockReturnValue(false);
    renderComponent();
    expect(screen.getByText('Not Authorized')).toBeDefined();
  });

  it('returns null when currentUser is null (loading state)', () => {
    vi.spyOn(hooks, 'useCurrentUser').mockReturnValue(null);
    const { container } = renderComponent();
    expect(container.firstChild).toBe(null);
  });
});