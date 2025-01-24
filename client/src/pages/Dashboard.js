import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Grid } from "@mui/material";
import RoleButtons from "../components/RoleButtons";
import AuthService from "../Services/AuthService";
import Navigation2 from "../components/Navigation2.js";
import Footer from "./Footer.js";
const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const handleRoleSelect = async (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);
    try {
      await AuthService.switchRole(selectedRole);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.role = selectedRole;
        localStorage.setItem("user", JSON.stringify(user));
      }
      navigate(
        selectedRole === "goodsOwner"
          ? "/goods-dashboard"
          : "/transporter-dashboard"
      );
    } catch (error) {
      console.error("Error switching role:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navigation2 />
      <Box sx={{ textAlign: "center", padding: 4, minHeight: "100vh" }}>
        <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: 10 }}>
         What are you up to?
        </Typography>

        {role === null ? (
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  height: "200px", // Adjusted height for better display
                  fontSize: "1.5rem",
                  padding: "1rem",
                  marginBottom: 2,
                  background: "linear-gradient(to right, #FFFACD, #FFFFFF)", // Light Gold to White Gradient
                  color: "black", // Black text for contrast
                  "&:hover": {
                    background: "linear-gradient(to right, #FFEB99, #F5F5F5)", // Lighter gradient on hover
                  },
                  display: "flex",
                  flexDirection: "column", // Aligning text vertically
                  justifyContent: "center", // Center content vertically
                  textTransform: "none", // Disable text transformation (no uppercase)
                }}
                onClick={() => handleRoleSelect("goodsOwner")}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Goods Owner
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 300 }}>
                  To request transporter and deliver goods to a place.
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  height: "200px", // Adjusted height for better display
                  fontSize: "1.5rem",
                  padding: "1rem",
                  marginBottom: 2,
                  background: "linear-gradient(to right, #FFFACD, #FFFFFF)", // Light Gold to White Gradient
                  color: "black", // Black text for contrast
                  "&:hover": {
                    background: "linear-gradient(to right, #FFEB99, #F5F5F5)", // Lighter gradient on hover
                  },
                  display: "flex",
                  flexDirection: "column", // Aligning text vertically
                  justifyContent: "center", // Center content vertically
                  textTransform: "none", // Disable text transformation (no uppercase)
                }}
                onClick={() => handleRoleSelect("transporter")}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Transporter
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 300 }}>
                  To offer transport services and deliver goods.
                </Typography>
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Selected Role: {role}
          </Typography>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default Dashboard;
