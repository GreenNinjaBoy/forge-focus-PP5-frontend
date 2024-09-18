// tests/About.test.jsx
import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../../src/pages/About';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('About', () => {
  it('renders the About component and interacts with the carousel and buttons', () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Check initial state
    expect(screen.getByRole('heading', { name: /Forge Focus/i })).toBeInTheDocument();
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();

    // Simulate carousel interaction
    const secondSlideIndicator = screen.getByRole('button', { name: /2/i });
    fireEvent.click(secondSlideIndicator);
    expect(screen.getByText(/About Forge Focus/i)).toBeInTheDocument();

    const thirdSlideIndicator = screen.getByRole('button', { name: /3/i });
    fireEvent.click(thirdSlideIndicator);
    expect(screen.getByText(/Creating Goals/i)).toBeInTheDocument();

    // Simulate button clicks
    const signUpButton = screen.getAllByText(/Sign Up/i)[0];
    fireEvent.click(signUpButton);
    expect(navigate).toHaveBeenCalledWith('/Signup');

    const signInButton = screen.getAllByText(/Sign Up/i)[1];
    fireEvent.click(signInButton);
    expect(navigate).toHaveBeenCalledWith('/Signin');
  });
});