document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const body = document.body;

  // Buat loading overlay
  const loadingOverlay = document.createElement("div");
  loadingOverlay.id = "loadingOverlay";
  loadingOverlay.style.position = "fixed";
  loadingOverlay.style.top = "0";
  loadingOverlay.style.left = "0";
  loadingOverlay.style.width = "100%";
  loadingOverlay.style.height = "100%";
  loadingOverlay.style.background = "rgba(0,0,0,0.6)";
  loadingOverlay.style.display = "flex";
  loadingOverlay.style.justifyContent = "center";
  loadingOverlay.style.alignItems = "center";
  loadingOverlay.style.color = "white";
  loadingOverlay.style.fontSize = "22px";
  loadingOverlay.style.zIndex = "9999";
  loadingOverlay.style.display = "none";
  loadingOverlay.innerText = "✨ Mengirim pesanan...";
  body.appendChild(loadingOverlay);

  // Fungsi animasi confetti / partikel fantasy
  function spawnParticles() {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle-effect";
      particle.style.left = Math.random() * 100 + "vw";
      particle.style.top = "100vh";
      body.appendChild(particle);

      // Hapus setelah selesai
      setTimeout(() => particle.remove(), 3000);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const paket = document.getElementById("paket").value;
    const kontak = document.getElementById("kontak").value.trim();
    const fileInput = document.getElementById("bukti");
    const file = fileInput.files[0];

    if (!nama || !paket || !kontak || !file) {
      alert("Semua field wajib diisi!");
      return;
    }

    const webhookURL = "https://discord.com/api/webhooks/WEBHOOK_KAMU";

    // Tampilkan loading
    loadingOverlay.style.display = "flex";

    try {
      // Kirim teks dulu
      await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "EternalSMP Shop",
          embeds: [
            {
              title: "Pesanan Baru",
              color: 5763719,
              fields: [
                { name: "Nama", value: nama, inline: true },
                { name: "Paket", value: paket, inline: true },
                { name: "Kontak", value: kontak, inline: false }
              ],
              footer: { text: "EternalSMP Shop - Order System" },
              timestamp: new Date()
            }
          ]
        })
      });

      // Kirim file (gambar bukti transfer)
      const formData = new FormData();
      formData.append("file", file);

      await fetch(webhookURL, {
        method: "POST",
        body: formData
      });

      // Sukses → animasi
      loadingOverlay.style.display = "none";
      alert("Pesanan berhasil dikirim! Admin akan memverifikasi.");

      // Panggil partikel confetti
      spawnParticles();

      // Reset form dengan animasi
      form.classList.add("fade-out");
      setTimeout(() => {
        form.reset();
        form.classList.remove("fade-out");
        form.classList.add("fade-in");
      }, 500);
    } catch (error) {
      loadingOverlay.style.display = "none";
      alert("Terjadi kesalahan! Coba lagi.");
      console.error(error);
    }
  });
});
