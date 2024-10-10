import axios from "axios";

const API_URL = "http://localhost:5002/api/transporters";

const getAllGoods = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/available-goods`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching all goods:", error);
    throw error;
  }
};
const selectGood = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${API_URL}/offer/${id}`, {}, config);
    return response.data;
  } catch (error) {
    console.error("Error selecting good:", error);
    throw error;
  }
};

export default { selectGood, getAllGoods };
