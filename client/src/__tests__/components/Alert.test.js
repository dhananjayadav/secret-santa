import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from '../../components/Alert/Alert';

describe('Alert component', () => {
  it('renders the alert with children content', () => {
    render(<Alert>Test Alert Message</Alert>);
    expect(screen.getByText('Test Alert Message')).toBeInTheDocument();
  });

  it('can render JSX content inside', () => {
    render(
      <Alert>
        <h2>Heads up!</h2>
        <p>Something went wrong.</p>
      </Alert>
    );
    expect(screen.getByText('Heads up!')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
