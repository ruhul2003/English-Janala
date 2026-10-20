const mongoose = require('mongoose');

const SavedWordSchema = new mongoose.Schema(
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
    word: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    pronunciation: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

// Prevent duplicate saved words for the same user
SavedWordSchema.index({ userId: 1, wordId: 1 }, { unique: true });

module.exports = mongoose.models.SavedWord || mongoose.model('SavedWord', SavedWordSchema);
