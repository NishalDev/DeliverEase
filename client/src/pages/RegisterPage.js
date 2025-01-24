import React, { useState } from "react";
import AuthService from "../Services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { Typography, TextField, Button, Alert } from "@mui/material";
import Navigation2 from "../components/Navigation2.js";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      await AuthService.register(username, email, password);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div>
      {" "}
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
          Create a new account
        </Typography>

        {error && (
          <Alert severity="error" style={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}

        {/* Username Field */}
        <div style={{ width: "300px", marginBottom: "16px" }}>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", marginBottom: "4px" }}
          >
            Username
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          onClick={handleRegister}
          variant="contained"
          style={{
            backgroundColor: "#ffd700",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#E6B800" },
          }}
        >
          Register
        </Button>

        <Typography variant="body2" style={{ marginTop: "16px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "underline",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Login here
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default RegisterPage;
