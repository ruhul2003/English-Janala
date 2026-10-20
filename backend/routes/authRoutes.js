const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * @route   POST /api/auth/sync
 * @desc    Sync user after Google / Better Auth login
 */
router.post('/sync', async (req, res) => {
  try {
    const { email, name, image } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const today = new Date().toISOString().slice(0, 10);
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: name || 'English Learner',
        image: image || null,
        streak: 1,
        xp: 50,
        lastActiveDate: today,
      });
    } else {
      // Check daily streak
      if (user.lastActiveDate !== today) {
        const last = new Date(user.lastActiveDate);
        const curr = new Date(today);
        const diffDays = Math.round((curr - last) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          user.streak += 1;
        } else if (diffDays > 1) {
          user.streak = 1;
        }
        user.lastActiveDate = today;
      }

      if (name && user.name !== name) user.name = name;
      if (image && user.image !== image) user.image = image;
      await user.save();
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error('Error syncing user:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/auth/profile/:email
 * @desc    Get user profile with streak and points
 */
router.get('/profile/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
