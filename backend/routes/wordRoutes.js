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
    const saved = await SavedWord.find({ userId: req.params.userId }).sort({ createdAt: -1 });
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
    if (!userId || !wordId || !word) {
      return res.status(400).json({ success: false, message: 'Missing required word data' });
    }

    const existing = await SavedWord.findOne({ userId, wordId });
    if (existing) {
      // Toggle off if already saved
      await SavedWord.deleteOne({ _id: existing._id });
      return res.json({ success: true, action: 'removed', wordId });
    }

    const newSaved = await SavedWord.create({
      userId,
      wordId,
      word,
      meaning,
      pronunciation,
      level: level || 1,
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
    await SavedWord.deleteOne({ userId, wordId: Number(wordId) });
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
    if (!userId || !wordId) {
      return res.status(400).json({ success: false, message: 'userId and wordId required' });
    }

    const existing = await LearnedWord.findOne({ userId, wordId });
    if (existing) {
      return res.json({ success: true, message: 'Already marked as learned' });
    }

    await LearnedWord.create({ userId, wordId, points });

    // Update user XP
    await User.findOneAndUpdate(
      { email: userId },
      { $inc: { xp: points } },
      { new: true, upsert: true }
    );

    return res.json({ success: true, message: 'Word marked as learned', pointsAwarded: points });
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
    const learned = await LearnedWord.find({ userId: req.params.userId }).select('wordId');
    const wordIds = learned.map((l) => l.wordId);
    return res.json({ success: true, count: wordIds.length, data: wordIds });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
