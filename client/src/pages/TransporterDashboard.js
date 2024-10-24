import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/TransporterDashboard.css"; 
import BackButton from "../components/BackButton";
const TransporterDashboard = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const navigateToOfferGood = () => {
    navigate("/offer-good");
  };

  const navigateToTransportStatus = () => {
    navigate("/transport-status");
  };

  const navigateToHistory = () => {
    navigate("/transport-history");
  };

  return (
    <div className="transporter-dashboard">
      <BackButton />
      <Link to="/notifications">Notifications</Link>
      <h2>Transporter Dashboard</h2>
      <div className="dashboard-options">
        <div className="dashboard-option" onClick={navigateToOfferGood}>
          <h3>Offer Good</h3>
          <p>Click here to offer transport for available goods.</p>
        </div>
        <div className="dashboard-option" onClick={navigateToTransportStatus}>
          <h3>Transport Status</h3>
          <p>Check the status of your current transport offers.</p>
        </div>
        <div className="dashboard-option" onClick={navigateToHistory}>
          <h3>History</h3>
          <p>View the history of your transport activities.</p>
        </div>
      </div>
    </div>
  );
};

export default TransporterDashboard;
