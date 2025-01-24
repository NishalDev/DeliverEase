import React, { useState } from "react";
import AuthService from "../Services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { Typography, TextField, Button, Alert } from "@mui/material";
import Navigation2 from "../components/Navigation2.js";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <Navigation2 />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(to top, #F3F6B2, #ffffff 40%)",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", color: "#333", marginBottom: "34px" }}
        >
          Sign in to your account
        </Typography>

        {error && (
          <Alert severity="error" style={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}

        {/* Email Field */}
        <div style={{ width: "300px", marginBottom: "16px" }}>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", marginBottom: "4px" }}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{ disableUnderline: true }}
            sx={{
              "& input": {
                borderBottom: "2px solid #999",
                transition: "border-color 0.3s ease-in-out",
              },
              "& input:hover": { borderBottom: "2px solid gold" },
              "& input:focus": { borderBottom: "2px solid gold" },
            }}
          />
        </div>

        {/* Password Field */}
        <div style={{ width: "300px", marginBottom: "16px" }}>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", marginBottom: "4px" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{ disableUnderline: true }}
            sx={{
              "& input": {
                borderBottom: "2px solid #999",
                transition: "border-color 0.3s ease-in-out",
              },
              "& input:hover": { borderBottom: "2px solid gold" },
              "& input:focus": { borderBottom: "2px solid gold" },
            }}
          />
        </div>

        <Button
          onClick={handleLogin}
          variant="contained"
          style={{
            backgroundColor: "#ffd700",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#E6B800" },
          }}
        >
          Login
        </Button>

        <Typography variant="body2" style={{ marginTop: "16px" }}>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "underline",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Register here
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default LoginPage;
