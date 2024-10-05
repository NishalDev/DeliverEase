import React, { useState, useEffect } from "react";
import GoodsService from "../Services/GoodsService"; // Import the GoodsService
import "./GoodsDashboard.css";
import BackButton from "../components/BackButton";

const GoodsDashboard = () => {
  const [goods, setGoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newGood, setNewGood] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
  });

  // Fetch goods from backend on component mount
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const goodsData = await GoodsService.fetchGoods(); // Fetch goods from the service
        setGoods(goodsData);
      } catch (error) {
        console.error("Error fetching goods:", error);
      }
    };

    fetchGoods();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGood({ ...newGood, [name]: value });
  };

  const handleAddGood = async (e) => {
    e.preventDefault();
    if (newGood.name && newGood.quantity > 0 && newGood.price > 0) {
      try {
        const addedGood = await GoodsService.addGood(newGood); // Add good using the service
        setGoods([...goods, addedGood]); // Update state with the newly added good
        setNewGood({ name: "", quantity: 0, price: 0, description: "" }); // Reset input fields
      } catch (error) {
        console.error("Error adding new good:", error);
      }
    }
  };

  return (
    <div className="goods-dashboard">
      <BackButton />
      <h1>Goods Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Goods..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="goods-list">
        <h2>Available Goods</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {goods
              .filter((good) =>
                good.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((good) => (
                <tr key={good._id}>
                  <td>{good.name}</td>
                  <td>{good.quantity}</td>
                  <td>${good.price}</td>
                  <td>{good.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="add-good-form">
        <h2>Add New Good</h2>
        <form onSubmit={handleAddGood}>
          <input
            type="text"
            name="name"
            placeholder="Good Name"
            value={newGood.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newGood.quantity}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newGood.price}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newGood.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Add Good</button>
        </form>
      </div>
    </div>
  );
};

export default GoodsDashboard;
