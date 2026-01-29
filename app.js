// ================= DARK MODE TOGGLE =================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function () {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// ================= SMOOTH SCROLLING =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================= NAVIGATION HIGHLIGHT =================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.main-nav a');

function highlightNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ================= INTERSECTION OBSERVER =================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ================= CONTACT FORM =================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields!', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email!', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Message sent! Thanks for reaching out! 🎯', 'success');

        // Reset form
        contactForm.reset();
    });
}

// ================= NOTIFICATION SYSTEM =================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    const isDarkMode = body.classList.contains('dark-mode');

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? (isDarkMode ? '#22C55E' : '#4ecdc4') : (isDarkMode ? '#EF4444' : '#ff6b6b')};
        color: ${isDarkMode ? '#000000' : '#1a1a2e'};
        padding: 1rem 2rem;
        border-radius: 24px;
        border: 2px solid ${type === 'success' ? (isDarkMode ? '#16A34A' : '#2a9d8f') : (isDarkMode ? '#DC2626' : '#d63031')};
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ================= SCROLL EFFECTS =================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when scrolled
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ================= PROJECT CARD INTERACTIONS =================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ================= CONSOLE SIGNATURE =================
console.log(`
%c
╔═══════════════════════════════════════╗
║                10VIR                  ║
║      Made by Tanvir Islam Riyad       ║
╚═══════════════════════════════════════╝
`, 'color: #FF0000; font-family: monospace; font-size: 12px;');

// ================= DYNAMIC STYLES =================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .main-nav a.active {
        color: var(--accent-highlight);
        background: var(--bg-soft);
    }
    
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

console.log('✅ Portfolio initialized successfully!');
console.log('🌓 Dark mode toggle enabled!');