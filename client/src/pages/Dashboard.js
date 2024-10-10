import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import RoleButtons from "../components/RoleButtons"; // Import the RoleButtons component
import AuthService from "../Services/AuthService"; // Import the AuthService for API calls
import "../css/main.css";
//import ThreeScene from "../ThreeScene.js";
const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  // Handle role selection and navigate to the respective dashboard
  const handleRoleSelect = async (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);

    // Call the API to update the role in the backend
    try {
      await AuthService.switchRole(selectedRole); // Make the API call to switch role
      // Navigate based on selected role
      const user = JSON.parse(localStorage.getItem("user"));
      user.role = selectedRole; // Update the role
      localStorage.setItem("user", JSON.stringify(user));
      navigate(
        selectedRole === "goodsOwner"
          ? "/goods-dashboard"
          : "/transporter-dashboard"
      );
    } catch (error) {
      console.error("Error switching role:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="dashboard">
      <BackButton />
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Your one-stop solution for all your logistics needs.</p>
      </header>

      {role === null ? ( // Role selection screen
        <div className="role-selection">
          <h2 className="role-selection-header">Please Select Your Role</h2>
          <RoleButtons onSelectRole={handleRoleSelect} />{" "}
          {/* Use RoleButtons here */}
        </div>
      ) : (
        <div>
          <h2>Selected Role: {role}</h2>
          <p>Redirecting to your dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
