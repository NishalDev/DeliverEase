import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import BackButton from "../components/BackButton"; // Assuming BackButton is a custom component
import Navigation2 from "../components/Navigation2"; // Assuming this is a component with navigation links
import "../css/TransporterDashboard.css"; // Assuming custom styles are in this file

const TransporterDashboard = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const navigateToOfferGood = () => {
    navigate("/offer-good");
  };

  const navigateToTransportStatus = () => {
    navigate("/transport-status");
  };

  // const navigateToHistory = () => {
  //   navigate("/transport-history");
  // };

  return (
    <div>
      <Navigation2 />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: 4, fontWeight: "bold" }}
        >
          Transporter Dashboard
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
        >
          <Grid container spacing={3} justifyContent="center">
            {/* Offer Good Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                onClick={navigateToOfferGood}
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
                  Offer Good
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 300 }}>
                  Offer transport services and deliver goods.
                </Typography>
              </Button>
            </Grid>

            {/* Transport Status Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                onClick={navigateToTransportStatus}
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
                  Transport Status
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 300 }}>
                  Check the status of your transport services.
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default TransporterDashboard;
