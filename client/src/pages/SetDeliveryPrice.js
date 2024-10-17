// src/pages/SetDeliveryPrice.js
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransportService from "../Services/TransportService"; // Import your transport service

const SetDeliveryPrice = () => {
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const { goodsId } = useParams(); // Get the goodsId from the URL params
  const navigate = useNavigate();

  // Handle form submission to set the delivery charge
  // In SetDeliveryPrice.js
  const handleSetPrice = async (e) => {
    e.preventDefault();

    if (!deliveryCharge || isNaN(deliveryCharge) || deliveryCharge <= 0) {
      alert("Please enter a valid delivery charge");
      return;
    }

    try {
      // Create the data object with the required fields
      const data = {
        deliveryCharge: deliveryCharge,
        vehicleType: "truck", // Add the vehicle type or any other required fields here
      };

      // Call the API to offer transport for the given goodsId
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
    <div className="set-delivery-price-container">
      <h1>Set Delivery Price</h1>
      <form onSubmit={handleSetPrice}>
        <div className="form-group">
          <label htmlFor="deliveryCharge">Delivery Charge:</label>
          <input
            type="number"
            id="deliveryCharge"
            value={deliveryCharge}
            onChange={(e) => setDeliveryCharge(e.target.value)}
            placeholder="Enter delivery charge"
            required
          />
        </div>
        <button type="submit" className="btn">
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default SetDeliveryPrice;
