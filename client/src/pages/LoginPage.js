import React, { useState } from "react";
import AuthService from "../Services/AuthService.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login(email, password);

      // Clear old token or user data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const { token, user } = response.data;

      // Store the new token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the dashboard or relevant page
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Show error message if any */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
