// === Loading Screen ===
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 1500);
});

// === Tombol Navigasi Halaman ===
document.getElementById("enter-button").addEventListener("click", () => {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
  document.getElementById("page2").classList.add("slide-animate");
  playClickSound();
});

// === Suara Klik ===
function playClickSound() {
  const audio = new Audio("click.mp3"); // pastikan file ada di folder
  audio.volume = 0.5;
  audio.play();
}

// === Navigasi Menu Game ===
const buttons = document.querySelectorAll(".game-button");
const sections = document.querySelectorAll(".section");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-target");

    sections.forEach((section) => {
      section.classList.remove("active");
    });

    const targetSection = document.getElementById(target);
    if (targetSection) {
      targetSection.classList.add("active");
      targetSection.scrollIntoView({ behavior: "smooth" });
    }

    playClickSound();
  });
});

// === Toggle Menu Mobile (Opsional) ===
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    playClickSound();
  });
}
