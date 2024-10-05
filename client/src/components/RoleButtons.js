import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./RoleButton.css"; // Create a separate CSS file for styling

const RoleButtons = ({ onSelectRole }) => {
  return (
    <div className="role-buttons">
      <button
        className="role-button"
        onClick={() => onSelectRole("goodsOwner")}
      >
        Goods Owner
      </button>
      <button
        className="role-button"
        onClick={() => onSelectRole("transporter")}
      >
        Transporter
      </button>
    </div>
  );
};

// PropTypes for validating props
RoleButtons.propTypes = {
  onSelectRole: PropTypes.func.isRequired, // Validate that onSelectRole is a required function
};

export default RoleButtons;
