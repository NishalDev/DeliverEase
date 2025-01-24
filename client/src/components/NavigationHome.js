import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if the screen size is mobile

  return (
    <AppBar
      position="static"
      sx={{
        height: "72px",
        background: "linear-gradient(to right, #0288D1, #26C6DA, #FFC107)",
        // Gradient from blue to cyan
      }}
    >
      <Toolbar sx={{ minHeight: "72px", px: { xs: 2, sm: 3 } }}>
        {/* Logo */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontSize: { xs: "20px", sm: "28px" },
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            DeliverEase
          </Link>
        </Typography>

        {/* Navigation Links */}
        {!isMobile ? (
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              color="inherit"
              component={Link}
              to="/services"
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              About
            </Button>
            {/* <Button
              color="inherit"
              component={Link}
              to="/notifications"
              sx={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'capitalize' }}
            >
              Notifications
            </Button> */}
          </Box>
        ) : (
          <IconButton color="inherit" edge="end">
            <MenuIcon sx={{ fontSize: "28px" }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
