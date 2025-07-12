// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trackerRoutes = require("./routes/trackerRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
console.log("✅ index.js running...");

// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
})();

// Test root route
app.get("/", (req, res) => {
  res.send("✅ API is working");
});

// Direct test route
app.get("/api/test-direct", (req, res) => {
  res.send("✅ Direct GET route works");
});

// Register routes
app.use("/api", trackerRoutes);

// 404 Fallback route
app.use((req, res) => {
  res.status(404).send("🚫 Route not found");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
