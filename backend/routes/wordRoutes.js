const express = require('express');
const router = express.Router();
const SavedWord = require('../models/SavedWord');
const LearnedWord = require('../models/LearnedWord');
const User = require('../models/User');

/**
 * @route   GET /api/words/saved/:userId
 * @desc    Get all saved words for a user
 */
router.get('/saved/:userId', async (req, res) => {
  try {
    const userId = req.params.userId?.trim();
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Valid userId is required' });
    }

    const saved = await SavedWord.find({ userId }).sort({ createdAt: -1 });
    return res.json({ success: true, count: saved.length, data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /api/words/saved
 * @desc    Bookmark/Save a word
 */
router.post('/saved', async (req, res) => {
  try {
    const { userId, wordId, word, meaning, pronunciation, level } = req.body;
    if (!userId || wordId === undefined || !word) {
      return res.status(400).json({ success: false, message: 'Missing required word data (userId, wordId, word)' });
    }

    const numericWordId = Number(wordId);
    const existing = await SavedWord.findOne({
      userId,
      $or: [{ wordId: numericWordId }, { wordId }],
    });

    if (existing) {
      // Toggle off if already saved
      await SavedWord.deleteOne({ _id: existing._id });
      return res.json({ success: true, action: 'removed', wordId: numericWordId || wordId });
    }

    const newSaved = await SavedWord.create({
      userId: String(userId).trim(),
      wordId: numericWordId || wordId,
      word: String(word).trim(),
      meaning: meaning ? String(meaning).trim() : '',
      pronunciation: pronunciation ? String(pronunciation).trim() : '',
      level: Number(level) || 1,
    });

    return res.status(201).json({ success: true, action: 'saved', data: newSaved });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   DELETE /api/words/saved/:userId/:wordId
 * @desc    Remove word from saved
 */
router.delete('/saved/:userId/:wordId', async (req, res) => {
  try {
    const { userId, wordId } = req.params;
    if (!userId || wordId === undefined) {
      return res.status(400).json({ success: false, message: 'userId and wordId are required' });
    }

    const numericWordId = Number(wordId);
    await SavedWord.deleteMany({
      userId,
      $or: [{ wordId: numericWordId }, { wordId: String(wordId) }],
    });

    return res.json({ success: true, message: 'Word removed from saved list' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /api/words/learned
 * @desc    Mark word as learned and award XP
 */
router.post('/learned', async (req, res) => {
  try {
    const { userId, wordId, points = 10 } = req.body;
    if (!userId || wordId === undefined) {
      return res.status(400).json({ success: false, message: 'userId and wordId are required' });
    }

    const safePoints = Math.min(Math.max(Number(points) || 10, 0), 100);
    const numericWordId = Number(wordId);

    const existing = await LearnedWord.findOne({
      userId,
      $or: [{ wordId: numericWordId }, { wordId }],
    });

    if (existing) {
      return res.json({ success: true, message: 'Already marked as learned' });
    }

    await LearnedWord.create({
      userId: String(userId).trim(),
      wordId: numericWordId || wordId,
      points: safePoints,
    });

    // Update user XP
    await User.findOneAndUpdate(
      { email: String(userId).trim() },
      { $inc: { xp: safePoints } },
      { new: true, upsert: true }
    );

    return res.json({ success: true, message: 'Word marked as learned', pointsAwarded: safePoints });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/words/learned/:userId
 * @desc    Get array of learned word IDs for user
 */
router.get('/learned/:userId', async (req, res) => {
  try {
    const userId = req.params.userId?.trim();
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Valid userId is required' });
    }

    const learned = await LearnedWord.find({ userId }).select('wordId');
    const wordIds = learned.map((l) => l.wordId);
    return res.json({ success: true, count: wordIds.length, data: wordIds });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
