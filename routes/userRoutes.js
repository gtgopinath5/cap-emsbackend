import express from 'express';
import {
  signupUser,
  loginUser,
  logoutUser,
  updateUser,
  getUserProfile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/userControllers.js';
import { protectRoute, adminRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Profile route (restricted to logged-in users)
router.get('/profile/:id', protectRoute, getUserProfile);

// User signup, login, and logout routes
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Update own user details
router.put('/update/:id', protectRoute, updateUser);

// Admin routes (protected by both protectRoute and adminRoute)
router.get('/', protectRoute, adminRoute, getAllUsers); // Get all users
router.get('/:id', protectRoute, adminRoute, getUserById); // Get user by ID
router.put('/:id', protectRoute, adminRoute, updateUserById); // Update user by ID
router.delete('/:id', protectRoute, adminRoute, deleteUserById); // Delete user by ID

export default router;
