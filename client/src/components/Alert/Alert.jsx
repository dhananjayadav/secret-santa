import React from 'react';
import './Alert.css';

const Alert = ({ message, onClose, children }) => {
  return (
    <div className="alert-overlay">
      <div className="alert">
        {children}
      </div>
    </div>
  );
};

export default Alert;