# PRODUCTIVITY-TRACKER

**COMPANY**: CODTECH IT SOLUTIONS

**NAME**: NAVEEN REDDY TIPPASANI

**INTERN ID**:CITS0D507

**DOMAIN**: FULL STACK DEVELOPMENT

**DURATION**: 4 WEEKS

**MENTOR**: NEELA SANTHOSH

#tells
Productivity Tracker Chrome Extension is Chrome extension tracks the time you spend on websites and displays daily usage data. It helps you stay productive by monitoring activity, syncing with a backend, and even blocking time-wasting sites.
#Features
Tracks time spent on each website.
Stores data in chrome.storage.local.
Syncs with a Node.js + MongoDB backend.
Displays daily usage summary in the popup.
Auto-blocks sites (e.g., YouTube, Instagram) after daily limit.
Daily reset of usage stats.
Data persists across devices.
# Setup
Install dependencies:
npm install
Create .env with:
MONGO_URI=mongodb://localhost:27017/productivityDB
Start backend:
nodemon index.js
Runs at: http://localhost:5000
#Permissions Used
tabs – detect active tab
storage – store logs
host_permissions – sync with backend
#API Endpoints
POST /api/log-activity
GET /api/today
POST /api/test-insert (dev only)

## Output:

<img width="1895" height="857" alt="Image" src="https://github.com/user-attachments/assets/08e5bda4-f206-4c97-ae5e-7880e2f432ec" />
<img width="663" height="551" alt="Image" src="https://github.com/user-attachments/assets/68088908-abce-4473-97fe-20579a66dd48" />




