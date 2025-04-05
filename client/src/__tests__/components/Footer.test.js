import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer/Footer';

describe('Footer component', () => {
  it('renders the footer text', () => {
    render(<Footer />);
    const textElement = screen.getByText(/This page is created by/i);
    expect(textElement).toBeInTheDocument();
  });

  it('contains the correct email link', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', 'mailto:dhananjay@gmail.com');
    expect(linkElement).toHaveTextContent('dhananjay2451@gmail.com');
  });

  it('has correct class names for styling', () => {
    render(<Footer />);
    const container = screen.getByText(/This page is created by/i).closest('div');
    expect(container).toHaveClass('footer-container');
    const link = screen.getByRole('link');
    expect(link).toHaveClass('footer-link');
  });
});
