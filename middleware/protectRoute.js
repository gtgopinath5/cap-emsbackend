import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes and verify user authentication
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // Check if token is present
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by decoded ID and exclude password
    const user = await User.findById(decoded.userId).select("-password");

    // Attach user to request object
    req.user = user;

    next();
  } catch (err) {
    console.error("Error in protectRoute:", err.message);
    res.status(500).json({ message: err.message });
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
