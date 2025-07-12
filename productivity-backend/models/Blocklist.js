const mongoose = require("mongoose");

const BlocklistSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  blockedSites: [String]
});

module.exports = mongoose.model("Blocklist", BlocklistSchema);
