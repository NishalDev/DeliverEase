import React, { useState } from "react";
import AuthService from "../Services/AuthService.js"; // Assuming this handles API calls
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("goodsOwner"); // Default role is goodsOwner
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !role) {
      setError("All fields are required");
      return;
    }

    try {
      await AuthService.register(username, email, password, role);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="goodsOwner">Goods Owner</option>
            <option value="transporter">Transporter</option>
          </select>
        </div>

        {/* Conditional fields for transporter */}
        {role === "transporter" && (
          <div>
            <div className="form-group">
              <label htmlFor="vehicleType">Vehicle Type</label>
              <input
                type="text"
                id="vehicleType"
                placeholder="Enter your vehicle type"
              />
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity (kg)</label>
              <input
                type="number"
                id="capacity"
                placeholder="Enter vehicle capacity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentLocation">Current Location</label>
              <input
                type="text"
                id="currentLocation"
                placeholder="Enter your current location"
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
