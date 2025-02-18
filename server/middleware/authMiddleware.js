import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check for token in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Get token from header
      const decoded = jwt.verify(token, process.env.TOKEN_KEY); // Verify token

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password"); // Exclude password from user data
      next(); // Proceed to the next middleware/controller
    } catch (error) {
      console.error("Not authorized, token failed", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
