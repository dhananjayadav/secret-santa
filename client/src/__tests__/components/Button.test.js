import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button/Button';

describe('Button Component', () => {
  it('renders with children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('triggers onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading spinner and disables the button when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button').querySelector('.button-loader')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
