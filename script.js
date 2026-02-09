// ===================================
// Smooth Scrolling
// ===================================
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

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ===================================
// Portfolio Navigation
// ===================================
const portfolioNav = document.querySelectorAll('.btn-nav');
const portfolioGrid = document.querySelector('.portfolio-grid');

if (portfolioNav.length > 0 && portfolioGrid) {
    let currentScroll = 0;
    const scrollAmount = 400;

    portfolioNav[0].addEventListener('click', () => {
        currentScroll = Math.max(0, currentScroll - scrollAmount);
        portfolioGrid.scrollTo({
            left: currentScroll,
            behavior: 'smooth'
        });
    });

    portfolioNav[1].addEventListener('click', () => {
        const maxScroll = portfolioGrid.scrollWidth - portfolioGrid.clientWidth;
        currentScroll = Math.min(maxScroll, currentScroll + scrollAmount);
        portfolioGrid.scrollTo({
            left: currentScroll,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Fixed CTA Button Visibility
// ===================================
const fixedCTA = document.querySelector('.btn-fixed-cta');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        fixedCTA.style.opacity = '1';
        fixedCTA.style.visibility = 'visible';
    } else {
        fixedCTA.style.opacity = '0';
        fixedCTA.style.visibility = 'hidden';
    }
    
    lastScrollTop = scrollTop;
});

// Initial state
fixedCTA.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
if (window.pageYOffset < 300) {
    fixedCTA.style.opacity = '0';
    fixedCTA.style.visibility = 'hidden';
}

// ===================================
// Parallax Effect for Hero Section
// ===================================
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    if (heroVisual) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===================================
// Counter Animation for Stats
// ===================================
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const number = parseInt(text.match(/\d+/)[0]);
                const suffix = text.replace(/\d+/, '');
                
                entry.target.classList.add('animated');
                animateCounter(statNumber, number);
                
                // Add suffix back after animation
                setTimeout(() => {
                    statNumber.innerHTML = number + suffix;
                }, 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// Bento Card Hover Effects
// ===================================
const bentoCards = document.querySelectorAll('.bento-card');

bentoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===================================
// Portfolio Item Hover Sound Effect (Optional)
// ===================================
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===================================
// Form Validation (if contact form exists)
// ===================================
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const email = this.querySelector('input[type="email"]');
        const message = this.querySelector('textarea');
        
        if (!email.value || !message.value) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Submit form (replace with actual submission logic)
        console.log('Form submitted:', {
            email: email.value,
            message: message.value
        });
        
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// ===================================
// Dark Mode Toggle (Optional Enhancement)
// ===================================
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 1050;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        toggle.querySelector('.material-symbols-outlined').textContent = isDark ? 'light_mode' : 'dark_mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        toggle.querySelector('.material-symbols-outlined').textContent = 'dark_mode';
    }
    
    document.body.appendChild(toggle);
};

// Uncomment to enable dark mode toggle
// createDarkModeToggle();

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Cursor Trail Effect (Premium Enhancement)
// ===================================
const createCursorTrail = () => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid var(--primary-color);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .bento-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Uncomment to enable custom cursor (desktop only)
// if (window.innerWidth > 768) {
//     createCursorTrail();
// }

console.log('Cybolink website loaded successfully!');
