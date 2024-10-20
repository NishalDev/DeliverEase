import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransportService from "../Services/TransportService.js";

const TransporterStatus = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all transport offers for the logged-in transporter
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await TransportService.getAllOffersForTransporter();
        setOffers(response); // Assuming the response is an array of offers
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch transport offers. Please try again."
        );
      }
    };

    fetchOffers();
  }, []);

  // Handle clicking on a good name to view its transport details
  const handleGoodClick = (offerId) => {
    navigate(`/transport-detail/${offerId}`); // Redirect to the detail page with the offer ID
  };

  return (
    <div className="transporter-status-page">
      <h2>Transport Offers</h2>
      {error && <div className="error-message">{error}</div>}
      {offers.length === 0 && !error && (
        <p>No transport offers found for this transporter.</p>
      )}
      {offers.length > 0 && (
        <div className="offers-list">
          <ul>
            {offers.map((offer) => (
              <li
                key={offer._id}
                onClick={() => handleGoodClick(offer._id)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                <strong>Goods Name:</strong> {offer.goods?.name || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransporterStatus;
