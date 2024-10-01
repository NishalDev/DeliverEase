// src/pages/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Home.css'; // Importing Home.css

const Homepage = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleGetStarted = () => {
    navigate('/goods-dashboard'); // Navigate to the GoodsDashboard page
  };

  return (
    <div className="home-container">
      <h1>Welcome to Deliverease</h1>
      <p>Your one-stop solution for delivery management!</p>
      <button className="button" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default Homepage;
