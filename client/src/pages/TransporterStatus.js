import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransportService from "../Services/TransportService.js";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, Paper } from "@mui/material";
import BackButton from "../components/BackButton.js";

const TransporterStatus = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for fetching offers
  const navigate = useNavigate();

  // Fetch all transport offers for the logged-in transporter
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await TransportService.getAllOffersForTransporter();
        setOffers(response); // Assuming the response is an array of offers
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transport offers. Please try again.");
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Handle clicking on a transport offer to view its details
  const handleOfferClick = (offerId) => {
    navigate(`/transport-detail/${offerId}`); // Redirect to the detail page with the offer ID
  };

  return (
    <Box sx={{ padding: 6, minHeight: "100vh", backgroundColor: "#e8f0fe" }}>
      <BackButton />
      <Paper elevation={6} sx={{ padding: 6, maxWidth: 900, margin: "0 auto", borderRadius: "12px" }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ color: "#3f51b5", fontWeight: "bold", fontSize: "2.5rem" }}>
          Transport Offers
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="150px">
            <CircularProgress size={80} thickness={4} />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" sx={{ fontSize: "1.5rem" }}>
            {error}
          </Typography>
        ) : offers.length > 0 ? (
          <List>
            {offers.map((offer) => (
              <ListItem
                button
                key={offer._id}
                onClick={() => handleOfferClick(offer._id)}
                sx={{
                  padding: 3,
                  marginBottom: 3,
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: 5,
                  "&:hover": {
                    backgroundColor: "#c5cae9",
                    boxShadow: 8,
                  },
                }}
              >
                <ListItemText
                  primary={<Typography sx={{ fontWeight: "bold", color: "#3f51b5", fontSize: "1.5rem" }}>{offer.goods?.name || "N/A"}</Typography>}
                  secondary={<Typography sx={{ fontSize: "1.25rem" }}>{`Status: ${offer.status}`}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography align="center" variant="h6">
            No transport offers available
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default TransporterStatus;
