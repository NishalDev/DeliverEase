import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransportService from "../Services/TransportService.js";
import BackButton from "../components/BackButton.js";
import "../css/TransporterDashboard.css"; // Ensure the path is correct

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
    <div className="transporter-dashboard">
      <BackButton/>
      <h2>Transport Offer Details</h2>
      {error && <div className="error-message">{error}</div>}
      {offerDetails ? (
        <div className="offer-info">
          <div className="offer-detail-item">
            <strong>Goods Name:</strong> {offerDetails.goods?.name}
          </div>
          <div className="offer-detail-item">
            <strong>Status:</strong> {offerDetails.status}
          </div>
          <div className="offer-detail-item">
            <strong>Delivery Charge:</strong> {offerDetails.deliveryCharge}
          </div>
          <div className="offer-detail-item">
            <strong>Vehicle Type:</strong> {offerDetails.vehicleType}
          </div>
          <div className="offer-detail-item">
            <strong>Tracking ID:</strong> {offerDetails.trackingId}
          </div>
          <div className="offer-detail-item">
            <strong>Current Location:</strong> {offerDetails.currentLocation || "Not available"}
          </div>
          <div className="offer-detail-item">
            <strong>Delivery Start Time:</strong> {offerDetails.deliveryStartTime ? new Date(offerDetails.deliveryStartTime).toLocaleString() : "Not started"}
          </div>
          <div className="offer-detail-item">
            <strong>Delivery End Time:</strong> {offerDetails.deliveryEndTime ? new Date(offerDetails.deliveryEndTime).toLocaleString() : "Not completed"}
          </div>
        </div>
      ) : (
        !error && <p>Loading transport details...</p>
      )}
    </div>
  );
};

export default TransportDetail;
