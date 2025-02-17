import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransportService from "../Services/TransportService";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from "@mui/material";

const SetDeliveryPrice = () => {
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const { goodsId } = useParams();
  const navigate = useNavigate();

  // Handle form submission to set the delivery charge
  const handleSetPrice = async (e) => {
    e.preventDefault();

    if (!deliveryCharge || isNaN(deliveryCharge) || deliveryCharge <= 0) {
      alert("Please enter a valid delivery charge");
      return;
    }

    try {
      const data = {
        deliveryCharge: deliveryCharge,
        vehicleType: "truck", // Add the vehicle type or any other required fields here
      };

      await TransportService.offerTransport(goodsId, data);
      alert("Your offer has been submitted!");

      // Redirect to the transporter dashboard after successful submission
      navigate("/transporter-dashboard");
    } catch (error) {
      console.error("Error submitting the delivery offer:", error);
      alert("Failed to submit the delivery offer. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        padding: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Set Delivery Price
        </Typography>
        {/* <Typography variant="body1" gutterBottom>
          Enter the delivery charge for goods ID: <strong>{goodsId}</strong>
        </Typography> */}
        <form onSubmit={handleSetPrice}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Delivery Charge"
                variant="outlined"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(e.target.value)}
                placeholder="Enter delivery charge"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Offer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default SetDeliveryPrice;
