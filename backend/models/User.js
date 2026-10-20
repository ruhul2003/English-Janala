const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      default: 'English Learner',
    },
    image: {
      type: String,
      default: null,
    },
    streak: {
      type: Number,
      default: 1,
    },
    xp: {
      type: Number,
      default: 50,
    },
    lastActiveDate: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
