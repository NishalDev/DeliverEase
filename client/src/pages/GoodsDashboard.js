import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/GoodsDashboard.css"; // Assuming you will style the page with this file
import BackButton from "../components/BackButton";

const GoodsDashboard = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const navigateToAddGood = () => {
    navigate("/add-good");
  };

  const navigateToGoodStatus = () => {
    navigate("/good-status");
  };

  const navigateToHistory = () => {
    navigate("/history");
  };

  return (
    <div className="goods-dashboard">
      <BackButton />
      <Link to="/notifications">Notifications</Link>
      <h2>Goods Dashboard</h2>
      <div className="dashboard-options">
        <div className="dashboard-option" onClick={navigateToAddGood}>
          <h3>Add Good</h3>
          <p>Click here to add a new good to the list.</p>
        </div>
        <div className="dashboard-option" onClick={navigateToGoodStatus}>
          <h3>Good Status</h3>
          <p>Check the status of your goods.</p>
        </div>
        <div className="dashboard-option" onClick={navigateToHistory}>
          <h3>History</h3>
          <p>View the history of your goods and deliveries.</p>
        </div>
      </div>
    </div>
  );
};

export default GoodsDashboard;
