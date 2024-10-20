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
const offerTransport = async (goodsId, data) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make sure to include necessary fields like deliveryCharge and vehicleType in 'data'
    const response = await axios.post(
      `${API_URL}/offer/${goodsId}`,
      data, // Data object must include required fields
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error offering transport:", error);
    throw error;
  }
};
const getOffersByGoods = async (goodsId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/offers/${goodsId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching offers:", error);
    throw error;
  }
};

const approveOffer = async (offerId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${API_URL}/offer/approve/${offerId}`,
      {},
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error approving offer:", error);
    throw error;
  }
};

const rejectOffer = async (offerId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${API_URL}/offer/reject/${offerId}`,
      {},
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting offer:", error);
    throw error;
  }
};

const getOfferStatus = async (offerId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${API_URL}/offer-status/${offerId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching offer status:", error);
    throw error;
  }
};
const getAllOffersForTransporter = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_URL}/my-offers`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching transport offers:", error);
    throw error;
  }
};
const getOfferById = async (offerId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_URL}/offer/${offerId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching transport offer:", error);
    throw error;
  }
};
export default {
  getAllOffersForTransporter,
  getOfferStatus,
  getOffersByGoods,
  approveOffer,
  rejectOffer,
  offerTransport,
  selectGood,
  getAllGoods,
  getOfferById,
};
