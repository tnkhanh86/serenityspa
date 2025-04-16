document.querySelector(".icon-menu").addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking
                if (navMenu) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.testimonial-item');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.style.display = 'none');
            slides[index].style.display = 'block';
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Show first slide
        showSlide(currentSlide);

        // Auto advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherAnswer) otherAnswer.style.maxHeight = null;
                        if (otherToggle) otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        if (toggle) toggle.innerHTML = '<i class="fas fa-minus"></i>';
                    } else {
                        answer.style.maxHeight = null;
                        if (toggle) toggle.innerHTML = '<i class="fas fa-plus"></i>';
                    }
                }
            });
        });
    }

    // Booking form validation and submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Add timestamp in GMT+7
            const now = new Date();
            const gmt7Time = new Date(now.getTime() + (7 * 60 * 60 * 1000));
            data.timestamp = gmt7Time.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

            // Validate phone number
            const phoneInput = document.getElementById('phone');
            const phoneRegex = /^\d+$/;
            if (!phoneRegex.test(phoneInput.value)) {
                alert('Please enter a valid phone number (numbers only)');
                return;
            }

            // Send data to Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbxp5kx8ceNrmqfVTefOEUe41pMS7WHkhs_Nk9OnkJoo7tgJva9spbt8kf1yV9-LU-cZ/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Booking submitted successfully! We will contact you shortly to confirm your appointment.');
                    bookingForm.reset();
                } else {
                    alert('Error submitting booking. Please try again or contact us directly.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error submitting booking. Please try again or contact us directly.');
            });
        });
    }

    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Add timestamp in GMT+7
            const now = new Date();
            const gmt7Time = new Date(now.getTime() + (7 * 60 * 60 * 1000));
            data.timestamp = gmt7Time.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

            // Validate phone number
            const phoneInput = document.getElementById('phone');
            const phoneRegex = /^\d+$/;
            if (!phoneRegex.test(phoneInput.value)) {
                alert('Please enter a valid phone number (numbers only)');
                return;
            }

            // Send data to Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbxp5kx8ceNrmqfVTefOEUe41pMS7WHkhs_Nk9OnkJoo7tgJva9spbt8kf1yV9-LU-cZ/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Message sent successfully! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('Error sending message. Please try again or contact us directly.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error sending message. Please try again or contact us directly.');
            });
        });
    }

    // Add fade-in animation to elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
});
