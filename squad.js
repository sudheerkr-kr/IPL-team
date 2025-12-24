/*************************************************
 * CSK SQUAD SCRIPT
 * Filter + Player Detail Navigation
 *************************************************/

/* ===============================
   CURRENT FILTER STATE
================================*/
let currentFilter = "All";
let countryFilter = "All";

/* ===============================
   READ FILTER FROM URL
================================*/
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("role")) {
  currentFilter = urlParams.get("role");
}

/* ===============================
   PLAYERS DATA (FULL + SAFE)
================================*/
const players = [
  {
    id: "ms-dhoni",
    name: "MS Dhoni",
    role: "Wicket-Keeper",
    country: "India",
    jersey: 7,
    bat: "Right-hand",
    bowl: "—",
    debut: 2008,
    image: "ms-dhoni.png"
  },
  {
    id: "ruturaj-gaikwad",
    name: "Ruturaj Gaikwad",
    role: "Batsman",
    country: "India",
    jersey: 31,
    bat: "Right-hand",
    bowl: "—",
    debut: 2020,
    image: "ruturaj-gaikwad.png"
  },
  {
    id: "ravindra-jadeja",
    name: "Ravindra Jadeja",
    role: "All-Rounder",
    country: "India",
    jersey: 8,
    bat: "Left-hand",
    bowl: "Left-arm spin",
    debut: 2008,
    image: "ravindra-jadeja.png"
  },
  {
    id: "shivam-dube",
    name: "Shivam Dube",
    role: "All-Rounder",
    country: "India",
    jersey: 25,
    bat: "Left-hand",
    bowl: "Medium",
    debut: 2019,
    image: "shivam-dube.png"
  },
  {
    id: "moeen-ali",
    name: "Moeen Ali",
    role: "All-Rounder",
    country: "England",
    jersey: 18,
    bat: "Left-hand",
    bowl: "Off spin",
    debut: 2021,
    image: "moeen-ali.png"
  },
  {
    id: "matheesha-pathirana",
    name: "Matheesha Pathirana",
    role: "Bowler",
    country: "Sri Lanka",
    jersey: 99,
    bat: "Right-hand",
    bowl: "Fast",
    debut: 2022,
    image: "matheesha-pathirana.png"
  },
  {
    id: "deepak-chahar",
    name: "Deepak Chahar",
    role: "Bowler",
    country: "India",
    jersey: 90,
    bat: "Right-hand",
    bowl: "Swing",
    debut: 2018,
    image: "deepak-chahar.png"
  },
  {
    id: "tushar-deshpande",
    name: "Tushar Deshpande",
    role: "Bowler",
    country: "India",
    jersey: 20,
    bat: "Right-hand",
    bowl: "Medium-fast",
    debut: 2020,
    image: "tushar-deshpande.png"
  },
  {
    id: "rachin-ravindra",
    name: "Rachin Ravindra",
    role: "All-Rounder",
    country: "New Zealand",
    jersey: 11,
    bat: "Left-hand",
    bowl: "Spin",
    debut: 2024,
    image: "rachin-ravindra.png"
  },
  {
    id: "ajinkya-rahane",
    name: "Ajinkya Rahane",
    role: "Batsman",
    country: "India",
    jersey: 27,
    bat: "Right-hand",
    bowl: "—",
    debut: 2008,
    image: "ajinkya-rahane.png"
  },
  {
    id: "daryl-mitchell",
    name: "Daryl Mitchell",
    role: "All-Rounder",
    country: "New Zealand",
    jersey: 75,
    bat: "Right-hand",
    bowl: "Medium",
    debut: 2024,
    image: "daryl-mitchell.png"
  },
  {
    id: "shardul-thakur",
    name: "Shardul Thakur",
    role: "Bowler",
    country: "India",
    jersey: 54,
    bat: "Right-hand",
    bowl: "Medium-fast",
    debut: 2015,
    image: "shardul-thakur.png"
  },
  {
    id: "maheesh-theekshana",
    name: "Maheesh Theekshana",
    role: "Bowler",
    country: "Sri Lanka",
    jersey: 76,
    bat: "Right-hand",
    bowl: "Off spin",
    debut: 2022,
    image: "maheesh-theekshana.png"
  },
  {
    id: "mitchell-santner",
    name: "Mitchell Santner",
    role: "All-Rounder",
    country: "New Zealand",
    jersey: 74,
    bat: "Left-hand",
    bowl: "Left-arm spin",
    debut: 2019,
    image: "mitchell-santner.png"
  }
];

/* ===============================
   DOM ELEMENTS
================================*/
const grid = document.getElementById("playerGrid");
const buttons = document.querySelectorAll(".filters button");
const countryButtons = document.querySelectorAll(".country-filters button");
const searchInput = document.getElementById("searchInput");

/* ===============================
   SET ACTIVE ROLE BUTTON
================================*/
function setActiveButton(role) {
  buttons.forEach(button => {
    button.classList.remove("active");
    if (button.dataset.role === role) {
      button.classList.add("active");
    }
  });
}

/* ===============================
   RENDER PLAYERS GRID
================================*/
function renderPlayers(role) {
  grid.innerHTML = "";

  const query = searchInput ? searchInput.value.toLowerCase() : "";

  let filteredPlayers =
    role === "All"
      ? players
      : players.filter(p => p.role === role);

  // search filter
  if (query !== "") {
    filteredPlayers = filteredPlayers.filter(p =>
      p.name.toLowerCase().includes(query)
    );
  }

  // country filter
  if (countryFilter !== "All") {
    filteredPlayers = filteredPlayers.filter(p =>
      countryFilter === "India"
        ? p.country === "India"
        : p.country !== "India"
    );
  }

  filteredPlayers.forEach(player => {
    const card = document.createElement("div");
    card.className = "player-card";

    card.innerHTML = `
  <a href="player.html?name=${player.id}&from=${role}">
    <div class="img-wrap">
      <img src="assets/images/players/${player.image}" alt="${player.name}">
    </div>
    <div class="card-body">
      <h3>${player.name}</h3>
      <p>${player.role}</p>
      <span>${player.country}</span>
    </div>
  </a>
`;


    grid.appendChild(card);
  });
}

/* ===============================
   ROLE FILTER BUTTONS
================================*/
buttons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.role;
    history.replaceState(null, "", `?role=${currentFilter}`);
    setActiveButton(currentFilter);
    renderPlayers(currentFilter);
  });
});

/* ===============================
   COUNTRY FILTER BUTTONS
================================*/
countryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    countryFilter = btn.dataset.country;

    countryButtons.forEach(b => b.classList.remove("c-active"));
    btn.classList.add("c-active");

    renderPlayers(currentFilter);
  });
});

/* ===============================
   SEARCH INPUT
================================*/
if (searchInput) {
  searchInput.addEventListener("input", () => {
    renderPlayers(currentFilter);
  });
}

/* ===============================
   INITIAL LOAD
================================*/
setActiveButton(currentFilter);
renderPlayers(currentFilter);
