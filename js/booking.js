document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-booking');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

// Validation rules
const validationRules = {
    fullName: {
        required: true,
        minLength: 2,
        message: 'Vui lòng nhập họ tên (ít nhất 2 ký tự)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Vui lòng nhập email hợp lệ'
    },
    phone: {
        required: true,
        pattern: /^[0-9]{10,11}$/,
        message: 'Vui lòng nhập số điện thoại hợp lệ (10-11 số)'
    },
    service: {
        required: true,
        message: 'Vui lòng chọn dịch vụ'
    },
    date: {
        required: true,
        message: 'Vui lòng chọn ngày'
    },
    time: {
        required: true,
        message: 'Vui lòng chọn giờ'
    },
    terms: {
        required: true,
        message: 'Vui lòng đồng ý với điều khoản và điều kiện'
    }
};

// Validate input
function validateInput(input, rules) {
    const value = input.type === 'checkbox' ? input.checked : input.value.trim();
    
    if (rules.required && !value) {
        return rules.message;
    }
    
    if (rules.minLength && value.length < rules.minLength) {
        return rules.message;
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
        return rules.message;
    }
    
    return '';
}

// Show error message
function showError(input, message) {
    const formGroup = input.closest('.form-booking__column');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('error');
}

// Remove error message
function removeError(input) {
    const formGroup = input.closest('.form-booking__column');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error');
}

// Validate form
function validateForm(form) {
    let isValid = true;
    
    Object.keys(validationRules).forEach(fieldName => {
        const input = form.querySelector(`[name="${fieldName}"]`);
        if (input) {
            const error = validateInput(input, validationRules[fieldName]);
            if (error) {
                showError(input, error);
                isValid = false;
            } else {
                removeError(input);
            }
        }
    });
    
    return isValid;
}

// Show notification
function showNotification(message, isSuccess = true) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    
    if (!validateForm(form)) {
        showNotification('Vui lòng kiểm tra lại thông tin', false);
        return;
    }
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Thêm thời gian gửi form
    data.timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    
    try {
        // Log dữ liệu trước khi gửi
        console.log('Sending data:', data);
        
        const response = await fetch('https://script.google.com/macros/s/AKfycbx9bohPlVI5nKIT8-tCtFII922-vQ2SyaV23XPX23t-djxJrSH8BdVz60FmUxiiDe9lhg/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        });
        
        // Log response
        console.log('Response:', response);
        
        // Since we're using no-cors mode, we can't access the response directly
        // We'll assume success if no error is thrown
        showNotification('Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
        form.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Có lỗi xảy ra. Vui lòng thử lại sau.', false);
    }
}

// Add styles for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background-color: #4CAF50;
    }
    
    .notification.error {
        background-color: #f44336;
    }
    
    .error-message {
        color: #f44336;
        font-size: 12px;
        margin-top: 5px;
    }
    
    .form-booking__input.error,
    .form-booking__select.error,
    .form-booking__textarea.error {
        border-color: #f44336;
    }
    
    .form-booking__checkbox.error {
        color: #f44336;
    }
`;
document.head.appendChild(style); 