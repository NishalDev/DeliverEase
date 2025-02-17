import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransportService from "../Services/TransportService.js"; // Import TransportService for API calls
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material"; // Material-UI components for styling
import Navigation1 from "../components/Navigation1.js";
import Footer from "./Footer.js";
const OfferApprovalPage = () => {
  const navigate = useNavigate();
  const { goodsId } = useParams(); // Get goodsId from the URL
  const [goodName, setGoodName] = useState(""); // State for good name
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API fetch
  const [error, setError] = useState(null); // Error state for handling fetch errors

  // Fetch the good name and offers using goodsId
  useEffect(() => {
    const fetchGoodNameAndOffers = async () => {
      try {
        const response = await TransportService.getOffersByGoods(goodsId); // Fetch offers by goodsId
        const goodData = response[0]; // Assuming the first response contains the good data
        setGoodName(goodData.goods.name); // Set the good name
        setOffers(response); // Set the offers
      } catch (err) {
        setError("Error fetching data. Please try again.");
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoodNameAndOffers();
  }, [goodsId]);

  const handlePayment = () => {
    // Redirect to PaymentPage.js, passing goodName and other data via location.state
    navigate("/payment", {
      state: {
        goodsId: goodsId,
        goodName: goodName,
        deliveryCharge: offers[0]?.deliveryCharge, // Assuming you have this data in the offers
      },
    });
  };

  return (
    <div>
      <Navigation1 />

      <Box sx={{ padding: 3, backgroundColor: "#fff", minHeight: "100vh" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}
        >
          Offer for {goodName}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ marginTop: 2, color: "#777" }}>
              Loading offers...
            </Typography>
          </Box>
        ) : error ? (
          <Typography
            color="error"
            variant="body1"
            sx={{ textAlign: "center", color: "#f44336" }}
          >
            {error}
          </Typography>
        ) : (
          <>
            {offers.length === 0 ? (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", color: "#777" }}
              >
                No offers available at the moment.
              </Typography>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {offers.map((offer, index) => (
                  <Card
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 2,
                      backgroundColor: "#f9f9f9",
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ color: "#333" }}>
                        {offer.transporterName}
                      </Typography>
                      <Typography
                        variant="h4" // Increased size for bigger font
                        sx={{
                          fontWeight: "bold", // Bold text
                          color: "#4CAF50", // Green color for emphasis
                          marginTop: 1,
                          textAlign: "center", // Center align the text
                          fontSize: "2rem", // Increase the font size
                        }}
                      >
                        Charge offered: ₹{offer.deliveryCharge}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
            <Box sx={{ textAlign: "center", marginTop: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
                sx={{
                  fontWeight: "bold",
                  color: "#000",
                  padding: "10px 20px",
                  borderRadius: 30,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  background: "linear-gradient(45deg, #FFD700, #ffffff)", // Gold to white gradient
                  "&:hover": {
                    background: "linear-gradient(45deg, #FFA500, #ffffff)", // Slightly darker gold for hover effect
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Proceed to Payment
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Footer/>
    </div>
  );
};

export default OfferApprovalPage;
