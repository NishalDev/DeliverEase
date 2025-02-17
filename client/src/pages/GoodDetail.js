import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoodsService from "../Services/GoodsService"; // Assuming GoodsService handles API calls
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

const GoodDetailPage = () => {
  const { goodId } = useParams(); // Get the good ID from the URL parameters
  const [goodDetails, setGoodDetails] = useState(null);
  const [error, setError] = useState("");

  // Fetch the good details based on the good ID
  useEffect(() => {
    const fetchGoodDetails = async () => {
      try {
        const response = await GoodsService.getGoodStatus(goodId); // Fetch good details
        setGoodDetails(response);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch good details. Please try again."
        );
      }
    };

    fetchGoodDetails();
  }, [goodId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 4, // Increased padding for more space
      }}
    >
      <Card
        sx={{
          maxWidth: 800, // Increased width for a more spacious layout
          width: "100%",
          padding: 4,
          boxShadow: 3, // Enhanced box-shadow for better visual appeal
          textAlign: "center",
          borderRadius: "12px", // Rounded corners for a smoother design
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: "#3f51b5", fontWeight: "bold", fontSize: "2rem" }}
          >
            Good Details
          </Typography>
          {error ? (
            <Alert severity="error" sx={{ marginTop: 3, fontSize: "1.25rem" }}>
              {error}
            </Alert>
          ) : goodDetails ? (
            <Box sx={{ marginTop: 3 }}>
              {/* Key-Value Pairs Styled with Typography */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "2px solid #e0e0e0",
                    paddingBottom: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#757575", fontWeight: "500" }}
                  >
                    Name
                  </Typography>
                  <Typography
                    variant="h4" // Increased font size for the value
                    sx={{
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    {goodDetails.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "2px solid #e0e0e0",
                    paddingBottom: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#757575", fontWeight: "500" }}
                  >
                    Quantity
                  </Typography>
                  <Typography
                    variant="h4" // Increased font size for the value
                    sx={{
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    {goodDetails.quantity}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "2px solid #e0e0e0",
                    paddingBottom: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#757575", fontWeight: "500" }}
                  >
                    Pickup Location
                  </Typography>
                  <Typography
                    variant="h4" // Increased font size for the value
                    sx={{
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    {goodDetails.pickupLocation}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "2px solid #e0e0e0",
                    paddingBottom: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#757575", fontWeight: "500" }}
                  >
                    Dropoff Location
                  </Typography>
                  <Typography
                    variant="h4" // Increased font size for the value
                    sx={{
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    {goodDetails.dropoffLocation}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#757575", fontWeight: "500" }}
                  >
                    Status
                  </Typography>
                  <Typography
                    variant="h4" // Increased font size for the value
                    sx={{
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    {goodDetails.status}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
              <CircularProgress size={80} thickness={5} /> {/* Larger spinner */}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default GoodDetailPage;
