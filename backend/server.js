require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'English Janala Backend API is running',
    database: 'MongoDB Atlas Khoj',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/words', require('./routes/wordRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 English Janala Backend Server running on port ${PORT}`);
  console.log(`🌐 Health check at: http://localhost:${PORT}/api/health`);
});
