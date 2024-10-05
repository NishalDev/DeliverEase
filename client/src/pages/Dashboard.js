import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import RoleButtons from "../components/RoleButtons"; // Import the RoleButtons component
import GoodsDashboard from "./GoodsDashboard";
import TransporterDashboard from "./TransporterDashboard";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  /*
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);*/

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);
    navigate(
      selectedRole === "goodsOwner"
        ? "/goods-dashboard"
        : "/transporter-dashboard"
    );
  };

  return (
    <div className="dashboard">
      <BackButton />
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Your one-stop solution for all your logistics needs.</p>
      </header>

      {role === null ? ( // Role selection if no role is selected
        <div className="role-selection">
          <h2 className="role-selection-header">Please Select Your Role</h2>
          <RoleButtons onSelectRole={handleRoleSelect} />{" "}
          {/* Use RoleButtons here */}
        </div>
      ) : (
        <div>
          <h2>Selected Role: {role}</h2>
          {/* Render the dashboard based on the selected role */}
          {role === "goodsOwner" ? (
            <GoodsDashboard />
          ) : (
            <TransporterDashboard />
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
