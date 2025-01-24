import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import BackButton from "../components/BackButton";
import "../css/GoodsDashboard.css";
import Navigation2 from "../components/Navigation2.js";
import Notifications from "../components/Notification.js";
const GoodsDashboard = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const navigateToAddGood = () => {
    navigate("/add-good");
  };

  const navigateToGoodStatus = () => {
    navigate("/good-status");
  };

  // const navigateToHistory = () => {
  //   navigate("/history");
  // };

  return (
    <div>
      <Navigation2 />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        {/* <BackButton /> */}
        <Notifications />
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: 4, fontWeight: "bold" }}
        >
          Goods Dashboard
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
        >
          <Grid container spacing={3} justifyContent="center">
            {/* Add Good Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                onClick={navigateToAddGood}
                fullWidth
                sx={{
                  padding: "20px",
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: 2,
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
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Add Good
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 300 }}>
                  Click here to add a new good.
                </Typography>
              </Button>
            </Grid>

            {/* Good Status Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                onClick={navigateToGoodStatus}
                fullWidth
                sx={{
                  padding: "20px",
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: 2,
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
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Good Status
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 300 }}>
                  Check the status of your goods.
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default GoodsDashboard;
