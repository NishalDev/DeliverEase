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
    pickupLocation: "",
    dropoffLocation: "",
    //   image: null,
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
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setNewGood({ ...newGood, goodsImage: file });
  // };

  const handleAddGood = async (e) => {
    e.preventDefault();
    if (newGood.name && newGood.dropoffLocation && newGood.pickupLocation) {
      try {
        const formData = new FormData();
        formData.append("name", newGood.name);
        formData.append("quantity", newGood.quantity);
        formData.append("pickupLocation", newGood.pickupLocation);
        formData.append("dropoffLocation", newGood.dropoffLocation);
        //     formData.append("image", newGood.image); // Append the image

        const addedGood = await GoodsService.addGood(newGood); // Add good using the service
        setGoods([...goods, addedGood]); // Update state with the newly added good
        setNewGood({
          name: "",
          quantity: 1,
          pickupLocation: "",
          dropoffLocation: "",
          // image: null,
        }); // Reset input fields
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
              <th>pickupLocation</th>
              <th>dropoffLocation</th>
              {/* <th>image</th> */}
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
                  {/* <td>
                    {good.image && (
                      <img
                        src={good.image}
                        alt={good.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </td> */}
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
            placeholder="Name of the Good"
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
            min="1"
            required
          />
          <input
            type="text"
            name="pickupLocation"
            placeholder="Pick up location"
            value={newGood.pickupLocation || ""}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="dropoffLocation"
            placeholder="Drop Off location"
            value={newGood.dropoffLocation || ""}
            onChange={handleInputChange}
            required
          ></input>
          {/* <input
            type="file"
            name="goodsImage"
            accept="image/*"
            onChange={handleImageUpload}
            required
          /> */}

          <button type="submit">Add Good</button>
        </form>
      </div>
    </div>
  );
};

export default GoodsDashboard;
