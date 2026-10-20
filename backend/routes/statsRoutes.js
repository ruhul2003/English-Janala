const express = require('express');
const router = express.Router();
const User = require('../models/User');
const QuizResult = require('../models/QuizResult');
const LearnedWord = require('../models/LearnedWord');
const SavedWord = require('../models/SavedWord');

/**
 * @route   POST /api/stats/quiz
 * @desc    Save quiz score and reward XP
 */
router.post('/quiz', async (req, res) => {
  try {
    const { userId, score, totalQuestions } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }

    const quiz = await QuizResult.create({
      userId,
      score: score || 0,
      totalQuestions: totalQuestions || 8,
    });

    if (score > 0) {
      await User.findOneAndUpdate(
        { email: userId },
        { $inc: { xp: score } },
        { upsert: true }
      );
    }

    return res.status(201).json({ success: true, quiz });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/stats/summary/:userId
 * @desc    Get user overall stats
 */
router.get('/summary/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const [user, learnedCount, savedCount, quizHistory] = await Promise.all([
      User.findOne({ email: userId }),
      LearnedWord.countDocuments({ userId }),
      SavedWord.countDocuments({ userId }),
      QuizResult.find({ userId }).sort({ createdAt: -1 }).limit(5),
    ]);

    return res.json({
      success: true,
      stats: {
        streak: user?.streak || 1,
        xp: user?.xp || 50,
        learnedWords: learnedCount,
        savedWords: savedCount,
        quizHistory,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
