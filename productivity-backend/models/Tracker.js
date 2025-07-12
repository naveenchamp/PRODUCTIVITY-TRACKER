const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true
  },
  timeSpent: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    default: "anonymous"
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0) // normalized to day
  }
});

// Composite index to enforce uniqueness per user, domain, and date
trackerSchema.index({ domain: 1, userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Tracker", trackerSchema);