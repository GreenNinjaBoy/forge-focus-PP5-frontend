import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../src/App';
import renderWithRouter from './Utils.test';

describe('App', () => {
  it('renders the App component', () => {
    renderWithRouter(<App />)
    
    screen.debug();
  })
})