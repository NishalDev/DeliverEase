import React, { useState, useEffect } from "react";
//import TransportService from "../Services/TransportService"; // Use the same GoodsService for API calls
import "./TransporterDashboard.css";
import BackButton from "../components/BackButton";
import TransportService from "../Services/TransportService.js";

const TransporterDashboard = () => {
  const [goods, setGoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all goods from backend on component mount
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const goodsData = await TransportService.getAllGoods();
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        const filteredGoods = goodsData.filter(
          (good) => good.owner._id !== loggedInUser._id
        ); // Fetch all goods from the service
        setGoods(filteredGoods);
      } catch (error) {
        console.error("Error fetching goods:", error);
      }
    };

    fetchGoods();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSelectGood = async (id) => {
    try {
      const response = await TransportService.selectGood(id); // Await the API call
      if (response) {
        alert("You have selected the good for delivery!"); // Inform the transporter
        setGoods(goods.filter((good) => good._id !== id)); // Remove the selected good from the list
      }
    } catch (error) {
      console.error("Error selecting good:", error);
      alert("There was an error selecting the good. Please try again."); // Notify the user in case of error
    }
  };

  return (
    <div className="transporter-dashboard">
      <BackButton />
      <h1>Available Goods for Transport</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Goods..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="goods-list">
        <h2>Goods List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {goods
              .filter((good) =>
                good.name?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((good) => (
                <tr key={good._id}>
                  <td>{good.name}</td>
                  <td>{good.quantity}</td>
                  <td>{good.pickupLocation}</td>
                  <td>{good.dropoffLocation}</td>
                  <td>
                    <button onClick={() => handleSelectGood(good._id)}>
                      Select for Delivery
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransporterDashboard;
