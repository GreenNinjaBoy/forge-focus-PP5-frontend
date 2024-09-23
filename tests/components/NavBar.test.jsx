import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import MainNavbar from '../../src/components/NavBar';
import * as useCurrentUserModule from '../../src/hooks/useCurrentUser';
import axios from 'axios';
import * as reactRouterDom from 'react-router-dom';

// Mock the modules
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
  NavLink: vi.fn(({ children }) => children),
}));
vi.mock('axios');
vi.mock('../../src/hooks/useCurrentUser');
vi.mock('../../src/styles/MainNavBar.module.css', () => ({
  default: {
    Header: 'mockHeaderClass',
    navContainer: 'mockNavContainerClass',
    LogoName: 'mockLogoNameClass',
    iconGroup: 'mockIconGroupClass',
    icon: 'mockIconClass',
    backgroundIcon: 'mockBackgroundIconClass',
    NavLinks: 'mockNavLinksClass',
    navLink: 'mockNavLinkClass',
  },
}));

describe('MainNavbar', () => {
  const mockSetCurrentUser = vi.fn();
  const mockNavigate = vi.fn();
  const mockUseCurrentUser = vi.fn();
  const mockUseSetCurrentUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCurrentUser.mockReturnValue(null);
    mockUseSetCurrentUser.mockReturnValue(mockSetCurrentUser);
    useCurrentUserModule.useCurrentUser = mockUseCurrentUser;
    useCurrentUserModule.useSetCurrentUser = mockUseSetCurrentUser;
    vi.mocked(useCurrentUserModule.useCurrentUser).mockReturnValue(null);
    vi.mocked(useCurrentUserModule.useSetCurrentUser).mockReturnValue(mockSetCurrentUser);
    vi.mocked(reactRouterDom.useNavigate).mockReturnValue(mockNavigate);
  });

  it('renders correctly when user is logged out', () => {
    render(<MainNavbar />);

    expect(screen.getByText('Forge Focus')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  it('renders correctly when user is logged in', () => {
    vi.mocked(useCurrentUserModule.useCurrentUser).mockReturnValue({ username: 'testuser' });

    render(<MainNavbar />);

    expect(screen.getByText('Forge Focus')).toBeInTheDocument();
    expect(screen.getByText('Goals')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Signup')).not.toBeInTheDocument();
  });

  it('navigates to dashboard when logo is clicked and user is logged in', () => {
    vi.mocked(useCurrentUserModule.useCurrentUser).mockReturnValue({ username: 'testuser' });

    render(<MainNavbar />);

    fireEvent.click(screen.getByText('Forge Focus'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to home when logo is clicked and user is logged out', () => {
    render(<MainNavbar />);

    fireEvent.click(screen.getByText('Forge Focus'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('signs out the user when Sign Out is clicked', async () => {
    vi.mocked(useCurrentUserModule.useCurrentUser).mockReturnValue({ username: 'testuser' });
    vi.mocked(axios.post).mockResolvedValue({});

    render(<MainNavbar />);

    fireEvent.click(screen.getByText('Sign Out'));

    expect(axios.post).toHaveBeenCalledWith('dj-rest-auth/logout/');
    expect(mockSetCurrentUser).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});