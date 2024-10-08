import axios from "axios";

// Define the API URL
const API_URL = "http://localhost:5002/api/goods"; // Assuming the backend is running on the same server

// Function to fetch goods
const fetchGoods = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token; // Extract token from user object
    console.log("Token:", token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching goods:", error);
    throw error;
  }
};

// Function to add a new good with authentication
const addGood = async (goodData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token; // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    };

    const response = await axios.post(API_URL, goodData, config); // Pass config with headers
    return response.data;
  } catch (error) {
    console.error("Error adding new good:", error);
    throw error;
  }
};

// Function to update an existing good
const updateGood = async (id, goodData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token; // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    };

    const response = await axios.put(`${API_URL}/${id}`, goodData, config); // Pass config with headers
    return response.data;
  } catch (error) {
    console.error("Error updating good:", error);
    throw error;
  }
};
const deleteGood = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token; // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    };

    const response = await axios.delete(`${API_URL}/${id}`, config); // Pass config with headers
    return response.data;
  } catch (error) {
    console.error("Error deleting good:", error);
    throw error;
  }
};
// Export the service methods
export default { fetchGoods, addGood, updateGood, deleteGood };
