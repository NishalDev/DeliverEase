import axios from "axios";

// Define the API URL
const API_URL = "http://localhost:5002/api/goods";

// Function to fetch goods
const fetchGoods = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching goods:", error);
    throw error;
  }
};
const getAllGoods = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/all`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching all goods:", error);
    throw error;
  }
};

const addGood = async (goodData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, goodData, config);
    return response.data;
  } catch (error) {
    console.error("Error adding new good:", error);
    throw error;
  }
};

const updateGood = async (id, goodData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(`${API_URL}/${id}`, goodData, config);
    return response.data;
  } catch (error) {
    console.error("Error updating good:", error);
    throw error;
  }
};
const deleteGood = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting good:", error);
    throw error;
  }
};

export default { getAllGoods, fetchGoods, addGood, updateGood, deleteGood };
