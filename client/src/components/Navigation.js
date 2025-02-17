import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#222" }}
          component={Link} // This makes the Typography clickable like a link
          to="/" // Redirection to the homepage
        >
          {/* Darker Text for Elegance */}
          DeliverEase
        </Typography>

        {/* Center Links */}
        <Box sx={{ display: "flex", gap: "2rem" }}>
          <a href="/aboutus" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "#444", fontWeight: "500" }}>About Us</Button>{" "}
          </a>
          {/* Softer Black for Readability */}
          <a href="/features" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "#444", fontWeight: "500" }}>Features</Button>
          </a>
        </Box>

        {/* Right Buttons */}
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {/* Elegant Dark Button */}
          <a href="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#444", // Dark border
                color: "#444", // Dark Text
                "&:hover": { background: "#222", color: "#fff" }, // Darker on hover
              }}
            >
              Sign In
            </Button>
          </a>

          {/* Premium Gold Gradient Button */}
          <a href="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #FFD700, #E6B800)", // Gold Gradient
                color: "#202020",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(to right, #E6B800, #FFD700)",
                }, // Reverse gradient on hover
              }}
            >
              Get Started
            </Button>
          </a>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
