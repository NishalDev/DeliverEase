import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import GoodsService from "../Services/GoodsService"; // Assuming GoodsService handles API calls
import "../css/GoodsDashboard.css"; // Import CSS file

const GoodStatus = () => {
  const [goods, setGoods] = useState([]); // List of goods
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

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

  // Handle the selection of a good to redirect to its detail page
  const handleGoodClick = (goodId) => {
    navigate(`/goods/${goodId}`); // Navigate to GoodDetailPage
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
    </div>
  );
};

export default GoodStatus;
