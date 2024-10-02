import Attendance from "../models/attendanceModel.js";

// Create attendance record
const markAttendance = async (req, res) => {
  try {
    const { date, status, remarks,shift } = req.body;
    const userId = req.user._id;

    const newAttendance = new Attendance({
      userId,
      date,
      status,
      shift,
      remarks,
    });

    await newAttendance.save();

    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error: error.message });
  }
};

// Get attendance records by user
const getUserAttendance = async (req, res) => {
  try {
    const userId = req.user._id;
    const attendance = await Attendance.find({ userId }).sort({ date: -1 });

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error: error.message });
  }
};

// Update attendance by ID
const updateAttendanceById = async (req, res) => {
  try {
    const { status, remarks, shift  } = req.body;
    const attendanceId = req.params.id;

    let attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    if (status) attendance.status = status;
    if (remarks) attendance.remarks = remarks;
    if (shift) attendance.shift = shift;

    const updatedAttendance = await attendance.save();

    res.status(200).json({ message: "Attendance updated", updatedAttendance });
  } catch (error) {
    res.status(500).json({ message: "Error updating attendance", error: error.message });
  }
};

// Delete attendance by ID
const deleteAttendanceById = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);

    if (!deletedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting attendance", error: error.message });
  }
};

// Get all attendance records (Admin)
const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate("userId", "name email");

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance records", error: error.message });
  }
};

export { markAttendance, getUserAttendance, updateAttendanceById, deleteAttendanceById, getAllAttendance };
