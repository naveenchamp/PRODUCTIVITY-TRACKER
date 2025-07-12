let currentDomain = null;
let startTime = Date.now();
console.log("✅ background.js loaded");

const SOCIAL_LIMIT = 10 * 60 * 1000; // 10 mins
const socialSites = ["youtube.com", "instagram.com", "facebook.com", "twitter.com"];

resetBlocklistIfNeeded(); // Reset on startup

function resetBlocklistIfNeeded() {
  const today = new Date().toDateString();
  chrome.storage.local.get("lastReset", ({ lastReset }) => {
    if (lastReset !== today) {
      chrome.storage.local.set({ blockedSites: [], lastReset: today });
      console.log("🔁 Blocklist reset for new day");
    }
  });
}

function saveTime(domain, msSpent) {
  if (!domain || msSpent < 1000) return;

  chrome.storage.local.get(["blockedSites", domain], (result) => {
    const previousTime = result[domain] || 0;
    const newTime = previousTime + msSpent;

    // Update local time
    chrome.storage.local.set({ [domain]: newTime });

    // Check and block if over limit
    const isSocial = socialSites.some(s => domain.includes(s));
    if (isSocial && newTime >= SOCIAL_LIMIT) {
      const blockedSites = result.blockedSites || [];
      if (!blockedSites.includes(domain)) {
        blockedSites.push(domain);
        chrome.storage.local.set({ blockedSites });
        console.log(`🚫 ${domain} blocked`);
        syncBlocklist(blockedSites);
      }
    }

    // Sync to backend
    fetch("http://localhost:5000/api/log-activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain,
        timeSpent: msSpent,
        userId: "demoUser"
      })
    }).then(res => res.text())
      .then(data => console.log("✅ Synced:", data))
      .catch(err => console.error("❌ Sync failed", err));
  });
}

function handleTabSwitch(url) {
  const now = Date.now();
  const msSpent = now - startTime;
  if (currentDomain && msSpent > 1000) saveTime(currentDomain, msSpent);

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;
    if (!hostname.includes(".") || hostname === "extensions") return;

    currentDomain = hostname;
    startTime = now;
    console.log("🔁 Switched to:", hostname);
  } catch {
    currentDomain = null;
  }
}

function syncBlocklist(blockedSites) {
  fetch("http://localhost:5000/api/sync-blocklist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "demoUser",
      date: new Date().toISOString(),
      blockedSites
    })
  }).then(res => res.text())
    .then(data => console.log("✅ Blocklist synced:", data))
    .catch(err => console.error("❌ Blocklist sync failed", err));
}

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  if (tab.url) handleTabSwitch(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) handleTabSwitch(changeInfo.url);
});

chrome.runtime.onSuspend.addListener(() => {
  handleTabSwitch(null);
});
