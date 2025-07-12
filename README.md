PRODUCTIVITY-TRACKER

COMPANY: CODTECH IT SOLUTIONS

NAME: NAVEEN REDDY TIPPASANI

INTERN ID:CITS0D507

DOMAIN: FULL STACK DEVELOPMENT

DURATION: 4 WEEKS

MENTOR: NEELA SANTHOSH

#tells
# 📋 Productivity Tracker Chrome Extension

This Chrome extension tracks the time you spend on websites and displays daily usage data. It helps you stay productive by monitoring activity, syncing with a backend, and even blocking time-wasting sites.

## 🚀 Features

- 🕒 Tracks active time spent per domain
- 📦 Stores data in `chrome.storage.local`
- 🔁 Syncs with Node.js + MongoDB backend
- 📊 Shows daily usage summary in popup
- ⛔️ Auto-blocks websites (like YouTube/Instagram) after daily time limit
- 🔄 Resets tracking data daily
- 🔐 Supports data persistence across devices

📁 Folder Structure
chrome_ext/
├── background.js        # Tracks tab activity and syncs
├── popup.html           # Extension popup UI
├── popup.js             # JS logic to fetch/display time
├── manifest.json        # Extension metadata and permissions
├── icon.png             # App icon
└── README.md            # This file
🛠 Backend Setup (Optional but recommended)
Go to productivity-backend/ and install dependencies:

npm install
Set your .env:

bash
Copy
Edit
MONGO_URI=mongodb://localhost:27017/productivityDB
Start backend:

nodemon index.js
API will run at: http://localhost:5000

📌 Daily Reset and Blocking
Extension checks daily and resets site timers

If blocked site exceeds time limit (e.g. 60 minutes), it gets blocked for the rest of the day

🔒 Permissions
This extension uses:

tabs – To read the active tab's domain

storage – To persist time logs

host_permissions – To sync with your API (localhost)

📞 API Endpoints Used
POST /api/log-activity – Log a visit

GET /api/today – Fetch today’s activity

POST /api/test-insert – (Dev only) Insert test data

#Output:






