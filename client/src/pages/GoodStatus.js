import React, { useState, useEffect } from "react";
import GoodsService from "../Services/GoodsService"; // Assuming GoodsService handles API calls

const GoodStatus = () => {
  const [goods, setGoods] = useState([]); // List of goods
  const [selectedGood, setSelectedGood] = useState(null); // Selected good details
  const [error, setError] = useState("");

  // Fetch all goods owned by the user on component mount
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const goodsData = await GoodsService.fetchGoods(); // Fetch the list of goods
        setGoods(goodsData);
      } catch (err) {
        setError("Failed to fetch goods. Please try again.");
      }
    };

    fetchGoods();
  }, []);

  // Handle the selection of a good to display its details
  const handleGoodClick = async (goodId) => {
    setError(""); // Reset error message

    try {
      const response = await GoodsService.getGoodStatus(goodId); // Fetch good details
      setSelectedGood(response); // Set the selected good details
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch the good details. Please try again."
      );
    }
  };

  return (
    <div className="good-status-page">
      <h2>Goods List</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="goods-list">
        {goods.length > 0 ? (
          <ul>
            {goods.map((good) => (
              <li key={good._id} onClick={() => handleGoodClick(good._id)}>
                <button className="good-name-btn">{good.name}</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No goods available</p>
        )}
      </div>

      {selectedGood && (
        <div className="good-details">
          <h3>Good Details</h3>
          <p>
            <strong>Name:</strong> {selectedGood.name}
          </p>
          <p>
            <strong>Quantity:</strong> {selectedGood.quantity}
          </p>
          <p>
            <strong>Pickup Location:</strong> {selectedGood.pickupLocation}
          </p>
          <p>
            <strong>Dropoff Location:</strong> {selectedGood.dropoffLocation}
          </p>
          <p>
            <strong>Status:</strong> {selectedGood.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default GoodStatus;
