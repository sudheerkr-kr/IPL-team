/*************************************************
 * PLAYER DETAIL SCRIPT – FINAL COMBINED VERSION
 *************************************************/

/* ===============================
   READ URL PARAMETERS (ONCE)
================================*/
const params = new URLSearchParams(window.location.search);
const playerId = params.get("name");
const fromFilter = params.get("from") || "All";

/* ===============================
   FIND PLAYER DATA
   (CSK_PLAYERS must be loaded before this file)
================================*/
const player = CSK_PLAYERS.find(p => p.id === playerId);

/* ===============================
   GET CONTAINER
================================*/
const container = document.getElementById("playerDetail");

/* ===============================
   RENDER PLAYER DETAILS
================================*/
if (player) {
  container.innerHTML = `
    <div class="player-box">

      <img 
        src="${player.image}" 
        alt="${player.name}"
        loading="lazy"
      >

      <h1>${player.name}</h1>

      <p class="role">
        ${player.role} • ${player.country}
      </p>

      <!-- META DETAILS -->
      <div class="meta">
        <p><strong>Jersey:</strong> ${player.jersey || "—"}</p>
        <p><strong>Batting:</strong> ${player.bat || "—"}</p>
        <p><strong>Bowling:</strong> ${player.bowl || "—"}</p>
        <p><strong>IPL Debut:</strong> ${player.debut || "—"}</p>
      </div>

      <!-- BIO -->
      <p class="bio">
        ${player.bio || "A key member of the Chennai Super Kings squad."}
      </p>

      <!-- STATS -->
      <div class="stats">
        <div>
          <strong data-count="${player.matches || 0}">0</strong>
          <span>Matches</span>
        </div>
        <div>
          <strong data-count="${player.runs || 0}">0</strong>
          <span>Runs</span>
        </div>
        <div>
          <strong data-count="${player.wickets || 0}">0</strong>
          <span>Wickets</span>
        </div>
      </div>

      <!-- BACK BUTTON -->
      <a class="back-btn" href="squad.html?role=${fromFilter}">
        ← Back to Squad
      </a>

    </div>
  `;

  animateStats();
} else {
  container.innerHTML = "<p>Player not found</p>";
}

/* ===============================
   FIX NAVBAR BACK LINK (EXTRA SAFE)
================================*/
const backLink = document.querySelector(".nav-links a");
if (backLink) {
  backLink.href = `squad.html?role=${fromFilter}`;
}

/* ===============================
   STATS COUNT-UP ANIMATION
================================*/
function animateStats() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach(counter => {
    const target = +counter.dataset.count;
    let count = 0;

    const step = Math.max(1, Math.floor(target / 40));

    const interval = setInterval(() => {
      count += step;

      if (count >= target) {
        count = target;
        clearInterval(interval);
      }

      counter.textContent = count;
    }, 25);
  });
}
