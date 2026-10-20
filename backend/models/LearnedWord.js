const mongoose = require('mongoose');

const LearnedWordSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    wordId: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

LearnedWordSchema.index({ userId: 1, wordId: 1 }, { unique: true });

module.exports = mongoose.models.LearnedWord || mongoose.model('LearnedWord', LearnedWordSchema);
