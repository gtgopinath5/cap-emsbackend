import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; 
import connectDB from './db/connectDb.js';
import userRoutes from './routes/userRoutes.js';
import leaveApplicationRoutes from './routes/leaveApplicationRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

dotenv.config();
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000' ,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Your routes
app.use('/api/users', userRoutes);
app.use('/api/leaveApplications', leaveApplicationRoutes);
app.use('/api/attendance', attendanceRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server starts at http://localhost:${PORT}`);
});