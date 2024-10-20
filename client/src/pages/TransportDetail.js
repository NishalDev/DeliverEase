import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransportService from "../Services/TransportService.js";

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
    <div className="transport-detail-page">
      <h2>Transport Offer Details</h2>
      {error && <div className="error-message">{error}</div>}
      {offerDetails ? (
        <div className="offer-info">
          <p><strong>Goods Name:</strong> {offerDetails.goods?.name}</p>
          <p><strong>Status:</strong> {offerDetails.status}</p>
          <p><strong>Delivery Charge:</strong> {offerDetails.deliveryCharge}</p>
          <p><strong>Vehicle Type:</strong> {offerDetails.vehicleType}</p>
          <p><strong>Tracking ID:</strong> {offerDetails.trackingId}</p>
          <p><strong>Current Location:</strong> {offerDetails.currentLocation || "Not available"}</p>
          <p><strong>Delivery Start Time:</strong> {offerDetails.deliveryStartTime ? new Date(offerDetails.deliveryStartTime).toLocaleString() : "Not started"}</p>
          <p><strong>Delivery End Time:</strong> {offerDetails.deliveryEndTime ? new Date(offerDetails.deliveryEndTime).toLocaleString() : "Not completed"}</p>
        </div>
      ) : (
        !error && <p>Loading transport details...</p>
      )}
    </div>
  );
};

export default TransportDetail;
