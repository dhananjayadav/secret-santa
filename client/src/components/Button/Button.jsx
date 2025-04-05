import React from 'react';
import './Button.css';

const Button = ({ children, onClick, loading = false, disabled = false, className = '' }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className="button-loader" /> : children}
    </button>
  );
};

export default Button;