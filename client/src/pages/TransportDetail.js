import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransportService from "../Services/TransportService.js";
import BackButton from "../components/BackButton.js";
import { Typography, Box, Grid, Alert, Paper, CircularProgress } from "@mui/material";

const TransportDetail = () => {
  const { offerId } = useParams(); // Get the offer ID from the URL parameters
  const [offerDetails, setOfferDetails] = useState(null);
  const [error, setError] = useState("");

  // Fetch the transport offer details based on the offer ID
  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await TransportService.getOfferById(offerId);
        setOfferDetails(response);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Failed to fetch transport details. Please try again."
        );
      }
    };

    fetchOfferDetails();
  }, [offerId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5", // Similar background color to GoodDetailPage
        padding: 4,
      }}
    >
      <Paper
        sx={{
          maxWidth: 1000,
          width: "100%",
          padding: 4,
          boxShadow: 3,
          textAlign: "center",
          borderRadius: "12px",
          backgroundColor: "#ffffff", // Matching background color for consistency
        }}
      >
        <BackButton />
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: "#3f51b5", // Matching color for headings
            fontWeight: "bold",
            fontSize: "2rem", // Similar font size for the heading
          }}
        >
          Transport Offer Details
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {offerDetails ? (
          <Grid container spacing={3}>
            {/* Similar card-like box structure for each field */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#fafafa", // Light background color
                  borderRadius: "8px",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#757575",
                    fontWeight: "500",
                  }}
                >
                  Goods Name
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#212121",
                    fontWeight: "bold",
                  }}
                >
                  {offerDetails.goods?.name}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#757575",
                    fontWeight: "500",
                  }}
                >
                  Status
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#212121",
                    fontWeight: "bold",
                  }}
                >
                  {offerDetails.status}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#757575",
                    fontWeight: "500",
                  }}
                >
                  Delivery Charge
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#212121",
                    fontWeight: "bold",
                  }}
                >
                  {offerDetails.deliveryCharge}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#757575",
                    fontWeight: "500",
                  }}
                >
                  Vehicle Type
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#212121",
                    fontWeight: "bold",
                  }}
                >
                  {offerDetails.vehicleType}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#757575",
                    fontWeight: "500",
                  }}
                >
                  Tracking ID
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#212121",
                    fontWeight: "bold",
                  }}
                >
                  {offerDetails.trackingId}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#757575",
                    fontWeight: "500",
                  }}
                >
                  Current Location
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#212121",
                    fontWeight: "bold",
                  }}
                >
                  {offerDetails.currentLocation || "Not available"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#757575",
                    fontWeight: "500",
                  }}
                >
                  Delivery Start Time
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#212121",
                    fontWeight: "bold",
                  }}
                >
                  {offerDetails.deliveryStartTime
                    ? new Date(offerDetails.deliveryStartTime).toLocaleString()
                    : "Not started"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#757575",
                    fontWeight: "500",
                  }}
                >
                  Delivery End Time
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#212121",
                    fontWeight: "bold",
                  }}
                >
                  {offerDetails.deliveryEndTime
                    ? new Date(offerDetails.deliveryEndTime).toLocaleString()
                    : "Not completed"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : !error ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress size={80} thickness={5} /> {/* Loading spinner */}
          </Box>
        ) : null}
      </Paper>
    </Box>
  );
};

export default TransportDetail;
