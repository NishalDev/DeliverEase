import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import RoleButtons from "../components/RoleButtons";
import AuthService from "../Services/AuthService";
import { handleScroll } from "./scrollHandle.js"; // Import the scroll function
import "../css/main.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const handleRoleSelect = async (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);

    try {
      await AuthService.switchRole(selectedRole);
      const user = JSON.parse(localStorage.getItem("user"));
      user.role = selectedRole;
      localStorage.setItem("user", JSON.stringify(user));
      navigate(
        selectedRole === "goodsOwner"
          ? "/goods-dashboard"
          : "/transporter-dashboard"
      );
    } catch (error) {
      console.error("Error switching role:", error);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <BackButton />
      <header className="card full-page">
        <h1 className="hero-title">Welcome to Your Dashboard</h1>
        <p className="hero-subtitle">
          Manage your logistics tasks efficiently.
        </p>
      </header>
      <div className="card full-page">
        {role === null ? (
          <div>
            <h2 className="hero-title">Select Your Role</h2>
            <p className="hero-subtitle">Choose your role to get started</p>
            <RoleButtons onSelectRole={handleRoleSelect} />
          </div>
        ) : (
          <div>
            <h2 className="hero-title">Selected Role: {role}</h2>
            <p className="hero-subtitle">Redirecting to your dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
