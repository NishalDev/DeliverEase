// src/components/Button.js
import React from 'react';
import './Button.css'; // We'll create this file for styling

const Button = ({ text, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
