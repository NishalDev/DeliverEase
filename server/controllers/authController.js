import User from "../models/User.js";
import generateToken from "../token/generateToken.js";

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
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json("User already exists");
    }
    let userData = { username, email, password, role };

    if (role === "transporter") {
      userData.vehicleType = vehicleType;
      userData.capacity = capacity;
      userData.currentLocation = currentLocation;
    }

    const user = await User.create(userData);

    const token = await generateToken(user._id);

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

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not registered!" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }
    const token = generateToken(user._id);
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
