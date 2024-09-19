import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Toast } from 'react-bootstrap'; // Add this import
import SuccessMessage from '../../src/components/SuccessMessage';
import * as hooks from '../../src/hooks/useGlobalSuccess';

// Mock the react-bootstrap module
vi.mock('react-bootstrap', () => {
  const Toast = ({ show, onClose, children, className }) => 
    show ? (
      <div data-testid="mock-toast" onClick={onClose} className={className}>
        {children}
      </div>
    ) : null;
  
  Toast.Header = ({ children, className }) => (
    <div data-testid="mock-toast-header" className={className}>{children}</div>
  );
  
  Toast.Body = ({ children, className }) => (
    <div data-testid="mock-toast-body" className={className}>{children}</div>
  );

  return { Toast };
});

// Mock the CSS module
vi.mock('../styles/Message.module.css', () => ({
  default: {
    Toast: 'mock-toast-class',
    Header: 'mock-header-class',
    Title: 'mock-title-class',
    Body: 'mock-body-class',
  },
}));

describe('SuccessMessage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders when showGlobalSuccess is true', () => {
    vi.spyOn(hooks, 'useShowGlobalSuccess').mockReturnValue(true);
    vi.spyOn(hooks, 'useGlobalSuccessMessage').mockReturnValue('Test success message');
    vi.spyOn(hooks, 'useSetShowGlobalSuccess').mockReturnValue(vi.fn());
    vi.spyOn(hooks, 'useSetGlobalSuccessMessage').mockReturnValue(vi.fn());

    render(<SuccessMessage />);
    
    expect(screen.getByTestId('mock-toast')).toBeDefined();
    expect(screen.getByTestId('mock-toast-header')).toBeDefined();
    expect(screen.getByText('Success!!')).toBeDefined();
    expect(screen.getByTestId('mock-toast-body')).toBeDefined();
    expect(screen.getByText('Test success message')).toBeDefined();
  });

  // ... rest of the test cases remain the same
});