import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Navigation1 = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: "transparent", boxShadow: "none", padding: "0.5rem 2rem" }}
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

        {/* Icons Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Notification Icon */}
          <IconButton color="inherit">
            <NotificationsIcon sx={{ color: "#444" }} />
          </IconButton>

          {/* Profile Icon */}
          <IconButton color="inherit">
            <AccountCircleIcon sx={{ color: "#444" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation1;
