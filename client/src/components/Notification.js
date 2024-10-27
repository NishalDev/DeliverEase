// Notifications.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationService from "../Services/NotificationService";
import "../css/Notification.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications from the server
  const fetchNotifications = async () => {
    try {
      const data = await NotificationService.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch notifications. Please try again."
      );
    }
  };

  // Mark a notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await NotificationService.markAsRead(notificationId);
      setNotifications(notifications.filter((n) => n._id !== notificationId));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {error && <div className="error-message">{error}</div>}
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification._id} className="notification-item">
           
            <Link
              to={`/offers/${notification.relatedGood?._id}`}
              className="notification-link"
            >
              <span className="notification-message">{notification.message}</span>
            </Link>
            <button
              className="mark-as-read"
              onClick={() => handleMarkAsRead(notification._id)}
            >
              Mark as Read
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
