window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  nav.style.boxShadow =
    window.scrollY > 50 ? "0 4px 10px rgba(0,0,0,0.4)" : "none";
});
const btn = document.createElement("button");
btn.innerText = "🌙";
btn.style.position = "fixed";
btn.style.bottom = "20px";
btn.style.right = "20px";
btn.style.padding = "10px";
btn.style.zIndex = "9999";
document.body.appendChild(btn);

btn.onclick = () => {
  document.body.classList.toggle("dark");
};

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});
const t=document.createElement("button");
t.textContent="🌙"; t.style.cssText="position:fixed;right:20px;bottom:20px;z-index:999";
document.body.appendChild(t);

const saved=localStorage.getItem("theme");
if(saved==="dark") document.body.classList.add("dark");

t.onclick=()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark")?"dark":"light");
};
const matchDate = new Date("2025-03-22T19:30:00").getTime();
setInterval(()=>{
  const d=matchDate-Date.now();
  const h=Math.floor(d/36e5), m=Math.floor(d%36e5/6e4), s=Math.floor(d%6e4/1e3);
  document.getElementById("countdown").textContent =
    d>0?`${h}h ${m}m ${s}s`:"Live / Completed";
},1000);

/* ===== NEXT MATCH COUNTDOWN ===== */
const countdownEl = document.getElementById("countdown");

if (countdownEl) {
  const matchDate = new Date("2025-03-22T19:30:00").getTime();

  setInterval(() => {
    const now = Date.now();
    const diff = matchDate - now;

    if (diff <= 0) {
      countdownEl.innerText = "Match Live / Completed";
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.innerText =
      `${hours}h ${minutes}m ${seconds}s to go`;
  }, 1000);
}
/* ===== TEAM STATS COUNT-UP ===== */
const statNumbers = document.querySelectorAll(".stat-number");

statNumbers.forEach(stat => {
  const target = +stat.dataset.count;
  let current = 0;

  const increment = Math.ceil(target / 100);

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      stat.textContent = target;
      clearInterval(timer);
    } else {
      stat.textContent = current;
    }
  }, 25);
});


/* ===== GALLERY MODAL LOGIC ===== */
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");

function openModal(src) {
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  modal.style.display = "none";
}
/* ===== PAGE LOADER HIDE ===== */
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");

  if (loader) {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});
/* ===== THEME SWITCHER ===== */
const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
  toggleBtn.textContent = savedTheme === "dark" ? "🌕" : "🌙";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.body.classList.add("yellow");
    localStorage.setItem("theme", "yellow");
    toggleBtn.textContent = "🌙";
  } else {
    document.body.classList.remove("yellow");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "🌕";
  }
});
// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 60);
});
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});
