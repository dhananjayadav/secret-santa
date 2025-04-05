import React from 'react';
import './Alert.css';

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Alert;