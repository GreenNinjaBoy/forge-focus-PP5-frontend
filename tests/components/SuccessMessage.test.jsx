import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SuccessMessage from '../../src/components/SuccessMessage';
import * as hooks from '../../src/hooks/useGlobalSuccess';

// Mock the Bootstrap Toast component
vi.mock('react-bootstrap', () => ({
  Toast: ({ show, onClose, children }) => (
    show ? <div data-testid="mock-toast" onClick={onClose}>{children}</div> : null
  )
}));

describe('SuccessMessage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders when showGlobalSuccess is true', () => {
    vi.spyOn(hooks, 'useShowGlobalSuccess').mockReturnValue(true);
    vi.spyOn(hooks, 'useGlobalSuccessMessage').mockReturnValue('Test success message');
    vi.spyOn(hooks, 'useSetShowGlobalSuccess').mockReturnValue(vi.fn());
    vi.spyOn(hooks, 'useSetGlobalSuccessMessage').mockReturnValue(vi.fn());

    render(<SuccessMessage />);
    
    expect(screen.getByTestId('mock-toast')).toBeDefined();
    expect(screen.getByText('Success!!')).toBeDefined();
    expect(screen.getByText('Test success message')).toBeDefined();
  });

  it('does not render when showGlobalSuccess is false', () => {
    vi.spyOn(hooks, 'useShowGlobalSuccess').mockReturnValue(false);
    vi.spyOn(hooks, 'useGlobalSuccessMessage').mockReturnValue('');
    vi.spyOn(hooks, 'useSetShowGlobalSuccess').mockReturnValue(vi.fn());
    vi.spyOn(hooks, 'useSetGlobalSuccessMessage').mockReturnValue(vi.fn());

    render(<SuccessMessage />);
    
    expect(screen.queryByTestId('mock-toast')).toBeNull();
  });

  it('calls setShowGlobalSuccess and setGlobalSuccessMessage when closed', () => {
    const mockSetShowGlobalSuccess = vi.fn();
    const mockSetGlobalSuccessMessage = vi.fn();

    vi.spyOn(hooks, 'useShowGlobalSuccess').mockReturnValue(true);
    vi.spyOn(hooks, 'useGlobalSuccessMessage').mockReturnValue('Test success message');
    vi.spyOn(hooks, 'useSetShowGlobalSuccess').mockReturnValue(mockSetShowGlobalSuccess);
    vi.spyOn(hooks, 'useSetGlobalSuccessMessage').mockReturnValue(mockSetGlobalSuccessMessage);

    render(<SuccessMessage />);
    
    fireEvent.click(screen.getByTestId('mock-toast'));

    expect(mockSetShowGlobalSuccess).toHaveBeenCalledWith(false);
    expect(mockSetGlobalSuccessMessage).toHaveBeenCalledWith("");
  });
});