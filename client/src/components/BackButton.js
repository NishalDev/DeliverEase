import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/BackButton.css'; // Create a CSS file for styling

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      &#8592; Back
    </button>
  );
};

export default BackButton;
