import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoodsService from "../Services/GoodsService"; // Assuming GoodsService handles API calls
import '../css/GoodsDashboard.css'; // Import CSS file

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
    <div className="good-detail-page">
      <h2>Good Details</h2>
      {error && <div className="error-message">{error}</div>}
      {goodDetails ? (
        <div className="good-info">
          <p><strong>Name:</strong> {goodDetails.name}</p>
          <p><strong>Quantity:</strong> {goodDetails.quantity}</p>
          <p><strong>Pickup Location:</strong> {goodDetails.pickupLocation}</p>
          <p><strong>Dropoff Location:</strong> {goodDetails.dropoffLocation}</p>
          <p><strong>Status:</strong> {goodDetails.status}</p>
        </div>
      ) : (
        !error && <p>Loading good details...</p>
      )}
    </div>
  );
};

export default GoodDetailPage;
