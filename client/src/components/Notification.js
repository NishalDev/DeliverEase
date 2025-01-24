import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationService from "../Services/NotificationService";
import { Box, Button, Typography, List, ListItem, CircularProgress } from "@mui/material"; // MUI components for better styling

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
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
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Loading notifications...
          </Typography>
        </Box>
      ) : error ? (
        <Typography color="error" variant="body1" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      ) : (
        <List sx={{ padding: 0 }}>
          {notifications.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              No new notifications
            </Typography>
          ) : (
            notifications.map((notification) => (
              <ListItem
                key={notification._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: notification.isRead ? "#e8e8e8" : "#fff",
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <Box>
                  <Link
                    to={`/offers/${notification.relatedGood?._id}`}
                    style={{
                      textDecoration: "none",
                      color: notification.isRead ? "#777" : "#000",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: notification.isRead ? "normal" : "bold",
                        color: notification.isRead ? "#777" : "#000",
                      }}
                    >
                      {notification.message}
                    </Typography>
                  </Link>
                </Box>
                {!notification.isRead && (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: "green",
                      borderColor: "green",
                      "&:hover": { borderColor: "green", backgroundColor: "#e8f5e9" },
                    }}
                    onClick={() => handleMarkAsRead(notification._id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </ListItem>
            ))
          )}
        </List>
      )}
    </Box>
  );
};

export default Notifications;
