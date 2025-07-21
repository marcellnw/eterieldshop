// === KONFIGURASI ===
const WEBHOOK_URL = "https://discord.com/api/webhooks/1387401415831588984/ZPK_TEvECuB6TEiY3bkRkL4p2xqK9IHEEugoYtNbg_loZ4SK-2n2RFvktxYsrHKGrLDl";

// === AUDIO ===
const clickSound = new Audio("audio/click.mp3");
document.querySelectorAll("button, .rank-button, .menu-button").forEach(btn => {
  btn.addEventListener("click", () => clickSound.play());
});

// === NAVIGASI ANTAR HALAMAN ===
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(pageId).style.display = "block";
}

// === POPUP INFO ===
function showInfo(judul, isi) {
  document.getElementById("popupJudul").textContent = judul;
  document.getElementById("popupIsi").innerHTML = isi;
  document.getElementById("popup").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// === MODAL PEMESANAN ===
function openTopupModal(rank, price) {
  document.getElementById("product").value = rank;
  document.getElementById("price").value = price;
  document.getElementById("topupModal").style.display = "flex";
}
function closeTopupModal() {
  document.getElementById("topupForm").reset();
  document.getElementById("topupModal").style.display = "none";
}

// === SUBMIT TOPUP ===
document.getElementById("topupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const userId = document.getElementById("userId").value;
  const product = document.getElementById("product").value;
  const paymentMethod = document.getElementById("paymentMethod").value;
  const price = document.getElementById("price").value;
  const file = document.getElementById("buktiTransfer").files[0];

  if (!userId || !paymentMethod || !file) {
    alert("Mohon lengkapi semua field dan upload bukti transfer.");
    return;
  }

  const formData = new FormData();
  formData.append("content", `📥 **Top Up Masuk**
👤 ID: ${userId}
💎 Produk: ${product}
💳 Metode: ${paymentMethod}
💰 Harga: Rp${price}`);
  formData.append("file", file);

  fetch(WEBHOOK_URL, {
    method: "POST",
    body: formData
  })
  .then(res => {
    if (res.ok) {
      saveHistory({ userId, product, paymentMethod, price });
      renderHistory();
      closeTopupModal();
      showToast("✅ Top Up berhasil dikirim!");
    } else {
      alert("❌ Gagal mengirim data ke Discord.");
    }
  })
  .catch(() => alert("❌ Terjadi kesalahan koneksi ke Webhook."));
});

// === TAMPILKAN QRIS JIKA DIPILIH ===
document.getElementById("paymentMethod").addEventListener("change", function () {
  const qrisSection = document.getElementById("qrisSection");
  qrisSection.style.display = this.value === "QRIS" ? "block" : "none";
});

// === SISTEM RIWAYAT ===
function saveHistory(data) {
  const history = JSON.parse(localStorage.getItem("topupHistory")) || [];
  history.push({ ...data, time: new Date().toLocaleString() });
  localStorage.setItem("topupHistory", JSON.stringify(history));
}

function renderHistory() {
  const container = document.getElementById("riwayatContainer");
  const history = JSON.parse(localStorage.getItem("topupHistory")) || [];
  container.innerHTML = history.length
    ? history.reverse().map(item => `
      <div class="history-card">
        <p><strong>${item.product}</strong> - ${item.paymentMethod}</p>
        <p>ID: ${item.userId}</p>
        <p>Rp${item.price}</p>
        <p><em>${item.time}</em></p>
      </div>
    `).join("")
    : "<p>Belum ada riwayat top up.</p>";
}

// === TOAST NOTIFIKASI ===
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.opacity = 1;
  setTimeout(() => { toast.style.opacity = 0; }, 3000);
}

// === LOADING ===
window.addEventListener("load", () => {
  document.getElementById("loading").style.display = "none";
  renderHistory();
});
