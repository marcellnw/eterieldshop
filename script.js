document.addEventListener('DOMContentLoaded', () => {

    // Animasi muncul untuk Landing Page 1 (Desktop/PC)
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');

    if (window.innerWidth > 768) {
        heroTitle.style.animation = 'fadeIn 1.5s forwards, slideInFromRight 1s forwards';
        heroDescription.style.animation = 'fadeIn 1.5s 0.5s forwards, slideInFromRight 1s 0.5s forwards';
    }

    // Modal Formulir Pembelian
    const buyButtons = document.querySelectorAll('.buy-button');
    const modal = document.getElementById('purchase-form-modal');
    const closeButton = modal.querySelector('.close-button');
    const backButton = modal.querySelector('.back-button');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('show');
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    backButton.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Animasi saat scroll untuk Card Item, Donatur, dan QnA
    const cards = document.querySelectorAll('.card');
    const qnaItems = document.querySelectorAll('.qna-item');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('item-card')) {
                    entry.target.style.animation = 'fadeIn 1s forwards, translateY 1s forwards';
                } else if (entry.target.classList.contains('donatur-card')) {
                    entry.target.style.animation = 'fadeIn 1s forwards, slideInFromLeft 1s forwards';
                } else if (entry.target.classList.contains('sponsorship-card')) {
                    entry.target.style.animation = 'fadeIn 1s forwards, slideInFromRight 1s forwards';
                } else if (entry.target.classList.contains('qna-item')) {
                    entry.target.style.animation = 'fadeIn 1s forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
    qnaItems.forEach(qna => observer.observe(qna));

    // Fungsionalitas QnA
    const qnaQuestions = document.querySelectorAll('.qna-question');
    
    qnaQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isVisible = answer.style.display === 'block';
            
            // Tutup semua jawaban yang terbuka
            document.querySelectorAll('.qna-answer').forEach(ans => {
                ans.style.display = 'none';
            });
            
            // Buka jawaban yang dipilih jika sebelumnya tertutup
            if (!isVisible) {
                answer.style.display = 'block';
            }
        });
    });

    // Handle Form Submission (Discord Webhook)
    const purchaseForm = document.getElementById('purchase-form');
    purchaseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(purchaseForm);
        const name = formData.get('name');
        const gamertag = formData.get('gamertag');
        const item = formData.get('item');
        const payment = formData.get('payment-method');
        const proof = formData.get('proof');

        // Di sini Anda perlu memproses file gambar dan mengirimnya ke Discord Webhook
        // Ini membutuhkan backend server (Node.js, PHP, dll.) untuk menangani POST request dan file upload.
        // Contoh:
        // const webhookUrl = 'URL_DISCORD_WEBHOOK_ANDA';
        // fetch(webhookUrl, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         content: `Pembelian Baru!\nNama: ${name}\nGamertag: ${gamertag}\nItem: ${item}\nPembayaran: ${payment}`,
        //         embeds: [{
        //             title: "Bukti Transfer",
        //             image: { url: "URL_GAMBAR_YANG_SUDAH_DIUPLOAD" }
        //         }]
        //     }),
        //     headers: { 'Content-Type': 'application/json' }
        // }).then(response => {
        //     if (response.ok) {
        //         alert('Pembelian berhasil dikirim!');
        //         modal.classList.remove('show');
        //     } else {
        //         alert('Terjadi kesalahan saat mengirim.');
        //     }
        // });

        alert('Fitur pengiriman bukti via Discord belum diimplementasikan. Silakan gunakan tombol WhatsApp!');
    });
});
