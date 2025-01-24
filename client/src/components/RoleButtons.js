import React from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@mui/material"; // Import Material-UI components

const RoleButtons = ({ onSelectRole }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
      <Button
        variant="contained"
        sx={{
          padding: "15px 30px", // Increased padding for larger buttons
          fontSize: "18px", // Increased font size
          borderRadius: 5, // Slightly rounder corners
          boxShadow: 3, // Increased box shadow for prominence
          textTransform: "capitalize",
          backgroundImage: "linear-gradient(45deg, #4fc3f7, #1976d2)", // Bright blue to royal blue
          "&:hover": {
            backgroundImage: "linear-gradient(45deg, #1976d2, #4fc3f7)", // Reverse on hover
            boxShadow: 4, // Stronger shadow on hover
          },
        }}
        onClick={() => onSelectRole("goodsOwner")}
      >
        Goods Owner
      </Button>
      <Button
        variant="contained"
        sx={{
          padding: "15px 30px", // Increased padding for larger buttons
          fontSize: "18px", // Increased font size
          borderRadius: 5, // Slightly rounder corners
          boxShadow: 3, // Increased box shadow for prominence
          textTransform: "capitalize",
          backgroundImage: "linear-gradient(45deg, #4fc3f7, #1976d2)", // Bright blue to royal blue
          "&:hover": {
            backgroundImage: "linear-gradient(45deg, #1976d2, #4fc3f7)", // Reverse on hover
            boxShadow: 4, // Stronger shadow on hover
          },
        }}
        onClick={() => onSelectRole("transporter")}
      >
        Transporter
      </Button>
    </Box>
  );
};

// PropTypes for validating props
RoleButtons.propTypes = {
  onSelectRole: PropTypes.func.isRequired, // Validate that onSelectRole is a required function
};

export default RoleButtons;
