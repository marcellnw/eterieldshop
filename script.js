// ======== Audio Klik ========
const clickSound = new Audio("assets/audio/click.mp3");
document.querySelectorAll("button, a").forEach(el => {
  el.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

// ======== Scroll Smooth ========
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ======== Slider Otomatis ========
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
setInterval(nextSlide, 4000);
showSlide(currentSlide);

// ======== Form & LocalStorage + Preview ========
const form = document.querySelector("#orderForm");
const buktiInput = document.querySelector("#buktiTransfer");
const previewImg = document.querySelector("#previewImg");

buktiInput.addEventListener("change", () => {
  const file = buktiInput.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImg.src = reader.result;
      previewImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const game = document.querySelector("#game").value.trim();
  const id = document.querySelector("#userid").value.trim();
  const amount = document.querySelector("#amount").value.trim();
  const file = buktiInput.files[0];

  if (!name || !game || !id || !amount || !file) {
    alert("Mohon lengkapi semua kolom dan upload bukti transfer!");
    return;
  }

  // Simpan ke localStorage
  localStorage.setItem("eterield_data", JSON.stringify({ name, game, id, amount }));

  // Baca gambar base64
  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result;

    const payload = {
      content: `🛒 **Pesanan Baru dari Eterield Shop**\n\n**Nama:** ${name}\n**Game:** ${game}\n**User ID:** ${id}\n**Jumlah:** ${amount}`,
      embeds: [{
        title: "🧾 Bukti Transfer",
        image: { url: "attachment://bukti.jpg" }
      }]
    };

    const formData = new FormData();
    formData.append("payload_json", JSON.stringify(payload));
    formData.append("file", file, "bukti.jpg");

    try {
      await fetch("https://discord.com/api/webhooks/1387401415831588984/ZPK_TEvECuB6TEiY3bkRkL4p2xqK9IHEEugoYtNbg_loZ4SK-2n2RFvktxYsrHKGrLDl", {
        method: "POST",
        body: formData
      });

      alert("✅ Pesanan berhasil dikirim!");
      form.reset();
      previewImg.src = "";
      previewImg.style.display = "none";
    } catch (err) {
      alert("❌ Gagal mengirim pesanan. Coba lagi nanti.");
    }
  };

  reader.readAsDataURL(file);
});

// ======== Responsive Nav Toggle (opsional) ========
const toggleBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-menu");
toggleBtn?.addEventListener("click", () => {
  nav.classList.toggle("active");
});
