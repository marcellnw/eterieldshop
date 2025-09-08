document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");

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

    alert("Pesanan berhasil dikirim! Admin akan memverifikasi.");
    form.reset();
  });
});
