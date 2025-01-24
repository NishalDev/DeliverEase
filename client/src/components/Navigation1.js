import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navigation1 = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "transparent",
        boxShadow: "none",
        padding: "0.5rem 2rem",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* App Name */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#222" }}
          component={Link}
          to="/"
          style={{ textDecoration: "none" }}
        >
          DeliverEase
        </Typography>

        {/* Notification Icon with Image */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            component={Link}
            to="/notifications" // Redirection to /notifications
            sx={{
              color: "black",
              "&:hover": {
                color: "gray", // Color change on hover
              },
            }}
          >
            <img
              src="/assets/notification.png" // Path to your custom PNG icon
              alt="Notifications"
              style={{ width: 30, height: 30 }} // Adjust size as needed
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation1;
