document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('salePopup');
    const closeButton = document.getElementById('closePopup');
    const subscribeForm = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');

    // Show popup when page loads
    setTimeout(() => {
        popup.classList.add('show');
    }, 1500); // Show popup after 1.5 seconds

    // Close popup when clicking the close button
    closeButton.addEventListener('click', function() {
        popup.classList.remove('show');
    });

    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('show');
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            popup.classList.remove('show');
        }
    });

    // Handle form submission
    subscribeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Vui lòng nhập email của bạn', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Email không hợp lệ', 'error');
            return;
        }

        try {
            // Save to localStorage first
            saveToLocalStorage(email);
            
            const response = await fetch('https://script.google.com/macros/s/AKfycbxp5kx8ceNrmqfVTefOEUe41pMS7WHkhs_Nk9OnkJoo7tgJva9spbt8kf1yV9-LU-cZ/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'no-cors', // Add this to handle CORS
                body: JSON.stringify({
                    email: email,
                    type: 'subscribe'
                })
            });

            // Since we're using no-cors mode, we can't read the response
            // But we can assume success if the request was sent
            showNotification('Đăng ký thành công! Chúng tôi đã gửi email xác nhận cho bạn.', 'success');
            emailInput.value = '';
            popup.classList.remove('show');
            
        } catch (error) {
            console.error('Error:', error);
            showNotification('Có lỗi xảy ra. Vui lòng thử lại sau.', 'error');
        }
    });

    // Email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Save to localStorage
    function saveToLocalStorage(email) {
        try {
            let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('subscribers', JSON.stringify(subscribers));
                console.log('Subscriber data saved to localStorage');
            }
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}); 