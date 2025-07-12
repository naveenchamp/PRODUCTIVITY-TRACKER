const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  domain: String,
  timeSpent: Number,
  userId: String,
  timestamp: Date
});

module.exports = mongoose.model("UsageLog", usageSchema);
