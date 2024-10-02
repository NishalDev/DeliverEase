import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Dashboard.css'; // Import the CSS file for styling
import BackButton from '../components/BackButton';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Functions to handle button clicks and navigate to the respective pages
  const handleTrackClick = () => {
    navigate('/track'); // Navigate to the Track page
  };

  const handleManageClick = () => {
    navigate('/manage'); // Navigate to the ManageDashboard page
  };

  const handleHistoryClick = () => {
    navigate('/payment'); // Navigate to the Payment page
  };

  const handleSupportClick = () => {
    navigate('/customer-support'); // Navigate to the Customer Support page
  };

  return (
    <div className="dashboard">
        <BackButton /> {/* Add the Back Button here */}
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Your one-stop solution for all your logistics needs.</p>
      </header>

      <div className="dashboard-content">
        <div className="card">
          <h2>Parcel Tracking</h2>
          <p>Track your parcels in real-time and get updated status.</p>
          <button className="card-button" onClick={handleTrackClick}>
            Track Now
          </button>
        </div>

        <div className="card">
          <h2>Manage Deliveries</h2>
          <p>Effortlessly manage all your deliveries from a single platform.</p>
          <button className="card-button" onClick={handleManageClick}>
            Manage
          </button>
        </div>

        <div className="card">
          <h2>Payment History</h2>
          <p>View your payment history and invoices.</p>
          <button className="card-button" onClick={handleHistoryClick}>
            View History
          </button>
        </div>

        <div className="card">
          <h2>Customer Support</h2>
          <p>Need help? Contact our 24/7 customer support.</p>
          <button className="card-button" onClick={handleSupportClick}>
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
