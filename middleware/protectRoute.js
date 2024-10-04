import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes and verify user authentication
const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from the "Authorization" header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object after finding them in the DB
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error in protectRoute:", err.message);
    res.status(500).json({ message: "Token is not valid" });
  }
};
// Middleware to check if user has admin privileges
const adminRoute = async (req, res, next) => {
  try {
    // Ensure req.user is available from protectRoute
    const user = req.user;

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user role is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden: Admin access only" });
    }

    next();
  } catch (error) {
    console.error("Error in adminRoute:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export { protectRoute, adminRoute };
