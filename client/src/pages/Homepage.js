import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Import the CSS file for the homepage


const Homepage = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the Services page
  const handleServiceClick = () => {
    navigate('/services'); // Navigate to the '/services' route
  };

  // Function to handle navigation to the Dashboard
  const handleSignInClick = () => {
    navigate('/dashboard'); // Ensure you have this route defined
  };

  return (
    <div className="hero">
      
      <div className="hero-content">
        <h1 className="hero-title">We Make Your Cargo Transport Simple</h1>
        <p className="hero-subtitle">Get fast and reliable transport solutions.</p>
        {/* Button to navigate to Services */}
        <button className="hero-button" onClick={handleServiceClick}>
          Our Services
        </button>
        {/* Button to navigate to Dashboard */}
        <button className="hero-button" onClick={handleSignInClick}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Homepage;
