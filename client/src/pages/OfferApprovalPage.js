import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransportService from "../Services/TransportService.js"; // Import TransportService for API calls
import { Box, Button, Typography, CircularProgress, Card, CardContent } from "@mui/material"; // Material-UI components for styling

const OfferApprovalPage = () => {
  const navigate = useNavigate();
  const { goodsId } = useParams();  // Get goodsId from the URL
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
    <Box sx={{ padding: 3, backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Offer for Your Goods: {goodName}
      </Typography>
      
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Loading offers...
          </Typography>
        </Box>
      ) : error ? (
        <Typography color="error" variant="body1" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      ) : (
        <Box>
          {offers.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              No offers available at the moment.
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {offers.map((offer, index) => (
                <Card key={index} sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{offer.transporterName}</Typography>
                    <Typography variant="body1">
                      Estimated Delivery Time: {offer.deliveryTime}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold", // Bold font weight
                        color: "#4CAF50", // Green color for emphasis
                        marginTop: 1
                      }}
                    >
                      Delivery Charge: ₹{offer.deliveryCharge}
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
                padding: "10px 20px",
                borderRadius: 30,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OfferApprovalPage;
