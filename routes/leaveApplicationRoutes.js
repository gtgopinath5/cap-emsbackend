import express from 'express';
import {
  createLeaveApplication,
  getAllLeaveApplications,
  getUserLeaveApplications,
  updateLeaveApplication,
  deleteLeaveApplication,
} from '../controllers/leaveApplicationController.js';
import { protectRoute, adminRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Route to create a new leave application (logged-in user)
router.post('/', protectRoute, createLeaveApplication);

// Route to get all leave applications (admin only)
router.get('/', protectRoute, getAllLeaveApplications);

// Route to get leave applications for logged-in user
router.get('/user', protectRoute, getUserLeaveApplications);

// Route to update leave application status (admin only)
router.put('/:id', protectRoute, adminRoute, updateLeaveApplication);

// Route to delete leave application (admin only)
router.delete('/:id', protectRoute, adminRoute, deleteLeaveApplication);

export default router;

