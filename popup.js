document.addEventListener("DOMContentLoaded", () => {
  const timeContainer = document.getElementById("timeData");
  const detailsButton = document.getElementById("showDetailsBtn");

  if (!timeContainer) return;

  chrome.storage.local.get(null, (data) => {
    timeContainer.innerHTML = '';

    if (!data || Object.keys(data).length === 0) {
      timeContainer.textContent = 'No activity yet.';
      return;
    }

    for (const [key, value] of Object.entries(data)) {
      if (key === "lastReset" || key === "blockedSites") continue;

      const entry = document.createElement("div");
      entry.className = "entry";
      entry.innerHTML = `
        <span class="domain">${key}</span><br>
        <span class="time">${(value / 60000).toFixed(2)} mins</span>
      `;
      timeContainer.appendChild(entry);
    }
  });

  // Handle "Show details" button click
  detailsButton.addEventListener("click", () => {
    window.open("http://localhost:3000/", "_blank");
  });
});
