import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../src/components/Footer';


describe('Footer', () => {
  it('renders the Footer component with correct text and links', () => {
    render(<Footer />);

    // Check for text content
    expect(screen.getByText(/Created by/i)).toBeInTheDocument();
    expect(screen.getByText(/Jamie Connell Student of code Institute/i)).toBeInTheDocument();
    expect(screen.getByText(/For Educational Purposes only/i)).toBeInTheDocument();
    expect(screen.getByText(/2024/i)).toBeInTheDocument();

    // Check for GitHub link
    const githubLink = screen.getByLabelText(/Visit my GitHub profile/i);
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/GreenNinjaBoy');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Check for LinkedIn link
    const linkedinLink = screen.getByLabelText(/Visit my linkedin profile/i);
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jamie-connell-995748193/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});