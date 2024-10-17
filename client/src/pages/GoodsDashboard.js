import React, { useState, useEffect } from "react";
import GoodsService from "../Services/GoodsService"; // Import the GoodsService
//import "../css/main.css";
import "../css/GoodsDashboard.css";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
const GoodsDashboard = () => {
  const [goods, setGoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Flag to track if we're editing
  const [currentGoodId, setCurrentGoodId] = useState(null); // Holds the ID of the good being edited
  const [newGood, setNewGood] = useState({
    name: "",
    quantity: 1, // Default to 1 when adding a new good
    pickupLocation: "",
    dropoffLocation: "",
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

  // Handle search term input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle selecting a good for editing
  const handleEditGood = (id) => {
    const goodToEdit = goods.find((good) => good._id === id);
    setNewGood(goodToEdit); // Populate the form with the selected good's details
    setIsEditing(true); // Set to editing mode
    setCurrentGoodId(id); // Store the current good's ID
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGood({ ...newGood, [name]: value });
  };

  // Handle adding a new good or updating an existing good
  const handleAddOrUpdateGood = async (e) => {
    e.preventDefault();
    if (newGood.name && newGood.pickupLocation && newGood.dropoffLocation) {
      try {
        if (isEditing) {
          // If editing, update the good
          const updatedGood = await GoodsService.updateGood(
            currentGoodId,
            newGood
          );
          setGoods(
            goods.map((good) =>
              good._id === currentGoodId ? updatedGood : good
            )
          ); // Update the goods array
          setIsEditing(false); // Reset editing mode
          setCurrentGoodId(null); // Clear current good ID
        } else {
          // Otherwise, add a new good
          const addedGood = await GoodsService.addGood(newGood);
          setGoods([...goods, addedGood]); // Add the new good to the state
        }

        // Reset the form after adding or editing
        setNewGood({
          name: "",
          quantity: 1,
          pickupLocation: "",
          dropoffLocation: "",
        });
      } catch (error) {
        console.error("Error adding/updating good:", error);
      }
    }
  };

  // Handle deleting a good
  const handleDeleteGood = async (id) => {
    try {
      await GoodsService.deleteGood(id); // Call the delete service
      setGoods(goods.filter((good) => good._id !== id)); // Update the state
    } catch (error) {
      console.error("Error deleting good:", error);
    }
  };

  return (
    <div className="goods-dashboard">
      <BackButton />
      <h1>Goods Dashboard</h1>
      <div className="search-bar">
      <Link to="/check-good-status" className="nav-link">Check Good Status</Link>
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
                    <button onClick={() => handleEditGood(good._id)}>
                      Edit
                    </button>
                    
                    <button onClick={() => handleDeleteGood(good._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="add-good-form">
        <h2>{isEditing ? "Edit Good" : "Add New Good"}</h2>
        <form onSubmit={handleAddOrUpdateGood}>
          <input
            type="text"
            name="name"
            placeholder="Name of the Good"
            value={newGood.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />

          <div className="input-group">
            <label htmlFor="quantity" className="input-label">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              value={newGood.quantity}
              onChange={handleInputChange}
              min="1"
              required
              className="form-input"
            />
          </div>

          <input
            type="text"
            name="pickupLocation"
            placeholder="Pick up location"
            value={newGood.pickupLocation || ""}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="dropoffLocation"
            placeholder="Drop Off location"
            value={newGood.dropoffLocation || ""}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <button type="submit" className="submit-button">
            {isEditing ? "Update Good" : "Add Good"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoodsDashboard;
