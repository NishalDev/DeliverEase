import User from "../models/User.js";
import generateToken from "../token/generateToken.js";

// Registration Controller
export const registerController = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    vehicleType,
    capacity,
    currentLocation,
  } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json("User already exists");
    }

    // Create user data object
    let userData = { username, email, password, role };

    // If role is 'transporter', add extra fields
    if (role === "transporter") {
      userData.vehicleType = vehicleType;
      userData.capacity = capacity;
      userData.currentLocation = currentLocation;
    }

    // Create user in the database
    const user = await User.create(userData);

    // Generate JWT token for the user
    const token = await generateToken(user._id);

    // Send back user details and token to client
    return res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not registered!" });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Generate JWT token for the user
    const token = generateToken(user._id);

    // Send back user details and token to client
    return res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const switchRole = async (req, res) => {
  const userId = req.user._id;
  const { role } = req.body; // Role to switch to

  try {
    // Validate role (make sure it's either 'goodsOwner' or 'transporter')
    if (!["goodsOwner", "transporter"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Find the user by ID and update the role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the role
    user.role = role;
    await user.save();

    return res.status(200).json({
      message: "Role updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error switching role:", error); // Log the error
    return res.status(500).json({ message: error.message });
  }
};
