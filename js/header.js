// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const menuIcon = document.querySelector('.icon-menu');
    const menuBody = document.querySelector('.menu__body');
    const body = document.body;
    let overlay;

    // Create overlay element
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    createOverlay();

    // Handle scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Toggle menu
    function toggleMenu() {
        body.classList.toggle('menu-open');
        
        if (body.classList.contains('menu-open')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    // Close menu when clicking outside
    function handleClickOutside(event) {
        if (body.classList.contains('menu-open') && 
            !menuBody.contains(event.target) && 
            !menuIcon.contains(event.target)) {
            toggleMenu();
        }
    }

    // Close menu when clicking on a menu link
    function handleMenuLinkClick() {
        if (body.classList.contains('menu-open')) {
            toggleMenu();
        }
    }

    // Add active class to current page link
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const menuLinks = document.querySelectorAll('.menu__link');
        
        menuLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath || 
                (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    menuIcon.addEventListener('click', toggleMenu);
    document.addEventListener('click', handleClickOutside);
    
    // Add click event to menu links
    document.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', handleMenuLinkClick);
    });

    // Initialize
    handleScroll();
    setActiveLink();
}); 