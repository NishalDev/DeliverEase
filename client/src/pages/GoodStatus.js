import React, { useState } from "react";
import GoodsService from "../Services/GoodsService"; // Assuming GoodsService handles API calls

const GoodStatus = () => {
  const [goodId, setGoodId] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  // Handle form submission to fetch the good status
  const handleCheckStatus = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!goodId) {
      setError("Please enter a valid good ID");
      return;
    }

    try {
      const response = await GoodsService.getGoodStatus(goodId); // Fetch the status from the service
      setStatus(response.status); // Assuming the response contains the status field
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch the good status. Please try again."
      );
    }
  };

  return (
    <div className="good-status-page">
      <h2>Check Good Status</h2>
      <form onSubmit={handleCheckStatus}>
        <div className="form-group">
          <label htmlFor="goodId">Good ID</label>
          <input
            type="text"
            id="goodId"
            value={goodId}
            onChange={(e) => setGoodId(e.target.value)}
            placeholder="Enter the good ID"
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
            Status of Good (ID: {goodId}): <strong>{status}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default GoodStatus;
