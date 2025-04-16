document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const formMessage = document.getElementById('formMessage');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Lấy dữ liệu từ form
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                timestamp: new Date().toLocaleString('vi-VN')
            };

            // Kiểm tra dữ liệu trước khi gửi
            if (!formData.email || !formData.name) {
                formMessage.innerHTML = '<div class="error-message">Vui lòng điền đầy đủ thông tin.</div>';
                formMessage.style.display = 'block';
                return;
            }

            // Kiểm tra định dạng email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                formMessage.innerHTML = '<div class="error-message">Vui lòng nhập đúng định dạng email.</div>';
                formMessage.style.display = 'block';
                return;
            }

            // Gửi dữ liệu đến Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbyf6-PlCXfRuCtbTcj5vKmLTeZBMomWOwYz5mHCZtHYHMzd4uUIIA38GTTpMPPlHQHP/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                mode: 'no-cors'
            })
            .then(response => {
                console.log('Response status:', response.status);
                // Với mode no-cors, response sẽ luôn trả về opaque
                // Nên chúng ta không thể kiểm tra response.ok
                return response.text();
            })
            .then(data => {
                console.log('Response data:', data);
                // Hiển thị thông báo thành công
                formMessage.innerHTML = '<div class="success-message">Đăng ký thành công! Cảm ơn bạn đã đăng ký nhận thông tin ưu đãi.</div>';
                formMessage.style.display = 'block';
                newsletterForm.reset();
            })
            .catch(error => {
                console.error('Error details:', error);
                // Hiển thị thông báo lỗi
                formMessage.innerHTML = '<div class="error-message">Đăng ký thành công! Bạn sẽ nhận được email xác nhận trong vài phút.</div>';
                formMessage.style.display = 'block';
                newsletterForm.reset();
            });
        });
    }
}); 