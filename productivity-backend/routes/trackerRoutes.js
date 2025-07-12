// trackerRoutes.js
const express = require("express");
const router = express.Router();
const Tracker = require("../models/Tracker");

// ✅ GET /api/all – Fetch all tracker logs
router.get("/all", async (req, res) => {
  console.log("🔍 /api/all route HIT");
  try {
    const logs = await Tracker.find();
    res.status(200).json(logs);
  } catch (err) {
    console.error("❌ Error fetching logs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ POST /api/test-insert – Insert a sample record
router.post("/test-insert", async (req, res) => {
  try {
    const newLog = new Tracker({
      domain: "test.com",
      timeSpent: 120000,
      userId: "demoUser"
    });
    await newLog.save();
    res.send("✅ Inserted test log");
  } catch (err) {
    console.error("❌ Failed to insert test log:", err);
    res.status(500).send("Error inserting test log");
  }
});

// ✅ POST /api/log-activity – Log real activity from extension
router.post("/log-activity", async (req, res) => {
  const { domain, timeSpent, userId } = req.body;

  try {
    const newLog = new Tracker({ domain, timeSpent, userId });
    await newLog.save();
    res.status(201).json({ message: "✅ Activity logged" });
  } catch (err) {
    console.error("❌ Failed to log activity:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET /api/today – Get logs for today only
router.get("/today", async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  try {
    const todayLogs = await Tracker.find({ date: { $gte: start } });
    res.json(todayLogs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching today’s logs" });
  }
});

module.exports = router;