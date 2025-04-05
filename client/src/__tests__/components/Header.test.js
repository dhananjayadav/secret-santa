import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header/Header';

describe('Header component', () => {
  it('renders the header element', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<Header />);
    const title = screen.getByText(/Secret Santa/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('🎁 Secret Santa');
  });

  it('has the correct class names', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    const heading = screen.getByText(/Secret Santa/i);
    expect(header).toHaveClass('app-header');
    expect(heading).toHaveClass('app-header-logo');
  });
});
