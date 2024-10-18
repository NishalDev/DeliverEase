import React, { useState } from "react";
import TransportService from "../Services/TransportService.js"; // Assuming TransportService handles API calls

const TransporterStatus = () => {
  const [offerId, setOfferId] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  // Handle form submission to fetch the transport offer status
  const handleCheckStatus = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!offerId) {
      setError("Please enter a valid transport offer ID");
      return;
    }

    try {
      const response = await TransportService.getOfferStatus(offerId); // Fetch the status from the service
      setStatus(response.status); // Assuming the response contains the status field
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch the transport status. Please try again."
      );
    }
  };

  return (
    <div className="transporter-status-page">
      <h2>Check Transport Offer Status</h2>
      <form onSubmit={handleCheckStatus}>
        <div className="form-group">
          <label htmlFor="offerId">Transport Offer ID</label>
          <input
            type="text"
            id="offerId"
            value={offerId}
            onChange={(e) => setOfferId(e.target.value)}
            placeholder="Enter the transport offer ID"
            required
          />
        </div>
        <button type="submit" className="btn">
          Check Status
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {status && (
        <div className="status-info">
          <p>
            Status of Transport Offer (ID: {offerId}): <strong>{status}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default TransporterStatus;
