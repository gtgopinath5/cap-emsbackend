import express from "express";
import {
  markAttendance,
  getUserAttendance,
  updateAttendanceById,
  deleteAttendanceById,
  getAllAttendance,
} from "../controllers/attendanceController.js";
import { protectRoute, adminRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Mark attendance (restricted to logged-in users)
router.post("/", protectRoute, markAttendance);

// Get attendance records for logged-in user
router.get("/", protectRoute, getUserAttendance);

// Update attendance by ID (restricted to the admin)
router.put("/:id", protectRoute, adminRoute, updateAttendanceById);

// Delete attendance by ID (restricted to the admin)
router.delete("/:id", protectRoute, adminRoute, deleteAttendanceById);

// Get all attendance records (admin route)
router.get("/all", protectRoute, getAllAttendance);

export default router;
