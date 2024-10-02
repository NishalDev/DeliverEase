// src/pages/ManageDashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageDashboard.css'; // Import the CSS file for styling
import BackButton from '../components/BackButton';

const ManageDashboard = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the Goods Dashboard
  const handleGoodsDashboardClick = () => {
    navigate('/goods-dashboard'); // Navigate to Goods Dashboard
  };

  // Function to handle navigation to the Transporter Dashboard
  const handleTransporterDashboardClick = () => {
    navigate('/transporter-dashboard'); // Navigate to Transporter Dashboard
  };

  return (
    <div className="manage-dashboard">
         <BackButton /> {/* Add the Back Button here */}
      <h1>Manage Your Dashboards</h1>
      <p>Select a dashboard to manage your goods or transporters:</p>
      <div className="dashboard-buttons">
        <button className="dashboard-button" onClick={handleGoodsDashboardClick}>
          Go to Goods Dashboard
        </button>
        <button className="dashboard-button" onClick={handleTransporterDashboardClick}>
          Go to Transporter Dashboard
        </button>
      </div>
    </div>
  );
};

export default ManageDashboard;
