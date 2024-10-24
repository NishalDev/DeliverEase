// NotificationService.js
import axios from "axios";

const API_URL = "http://localhost:5002/api/notifications";

// Fetch notifications for the current user
const getNotifications = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Mark a notification as read
const markAsRead = async (notificationId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_URL}/${notificationId}/mark-as-read`, {}, config);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

export default {
  getNotifications,
  markAsRead,
};
