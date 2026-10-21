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

// API Root & Documentation
app.get(['/', '/api'], (req, res) => {
  res.json({
    name: 'English Janala Backend API',
    version: '1.0.0',
    description: 'REST API for English Janala vocabulary learning platform',
    status: 'healthy',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        sync: 'POST /api/auth/sync',
        profile: 'GET /api/auth/profile/:email',
      },
      words: {
        savedList: 'GET /api/words/saved/:userId',
        saveWord: 'POST /api/words/saved',
        removeWord: 'DELETE /api/words/saved/:userId/:wordId',
        learnedList: 'GET /api/words/learned/:userId',
        markLearned: 'POST /api/words/learned',
      },
      stats: {
        summary: 'GET /api/stats/summary/:userId',
        recordQuiz: 'POST /api/stats/quiz',
      },
    },
  });
});

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

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Central Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 English Janala Backend Server running on port ${PORT}`);
  console.log(`🌐 Health check at: http://localhost:${PORT}/api/health`);
});
