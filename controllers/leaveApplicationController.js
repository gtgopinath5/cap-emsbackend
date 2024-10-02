import LeaveApplication from '../models/leaveApplicationModel.js';

// Create a new leave application
const createLeaveApplication = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const userId = req.user._id;

    const newLeaveApplication = new LeaveApplication({
      userId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    const savedLeave = await newLeaveApplication.save();
    res.status(201).json(savedLeave);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the leave application' });
  }
};

// Get all leave applications (Admin only)
const getAllLeaveApplications = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find().populate('userId', 'name username email');
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching leave applications' });
  }
};

// Get leave applications for a specific user
const getUserLeaveApplications = async (req, res) => {
  try {
    const userId = req.user._id;
    const leaves = await LeaveApplication.find({ userId });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user leave applications' });
  }
};

// Update leave application (by ID)
const updateLeaveApplication = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const { status } = req.body;

    const leave = await LeaveApplication.findById(leaveId);
    if (!leave) return res.status(404).json({ error: 'Leave application not found' });

    if (status) leave.status = status;
    
    const updatedLeave = await leave.save();
    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the leave application' });
  }
};

// Delete leave application (by ID)
const deleteLeaveApplication = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const deletedLeave = await LeaveApplication.findByIdAndDelete(leaveId);
    if (!deletedLeave) return res.status(404).json({ error: 'Leave application not found' });

    res.status(200).json({ message: 'Leave application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the leave application' });
  }
};

export { createLeaveApplication, getAllLeaveApplications, getUserLeaveApplications, updateLeaveApplication, deleteLeaveApplication };
