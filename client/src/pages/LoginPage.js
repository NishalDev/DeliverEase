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
      const response = await AuthService.login(email, password); // Await the response from the login service
      // Assuming the response contains user details or a token
      console.log("Login response:", response);
      const user = response.data;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (user && user.token) {
        // Check if token is part of the user response
        // Store the user object in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Log the stored user data
        console.log(
          "User data stored in localStorage:",
          localStorage.getItem("user")
        );

        // Navigate to the dashboard after successful login
        navigate("/dashboard");
      } else {
        console.error("Token not found in the response");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
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
