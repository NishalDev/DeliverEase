import axios from "axios";

// Define the API URL
const API_URL = "http://localhost:5002/api/transporters";

// Function to fetch all goods for transporter dashboard
const getAllGoods = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token; // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    };
    const response = await axios.get(`${API_URL}/available-goods`, config); // Make sure this calls the correct endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching all goods:", error);
    throw error;
  }
};
const selectGood = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token; // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    };

    const response = await axios.post(`${API_URL}/offer/${id}`, {}, config); // Call select API
    return response.data;
  } catch (error) {
    console.error("Error selecting good:", error);
    throw error;
  }
};

export default { selectGood, getAllGoods }; // Ensure you export this function
